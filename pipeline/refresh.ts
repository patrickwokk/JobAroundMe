import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { Job, SiteMeta, SourceHealth } from "../lib/types";
import { loadJobs, loadOverrides, mergeScraped, saveJobs, sweep, type ScrapedJob } from "./lib/store";
import { isStudentHoldable, scrapeWorkday } from "./sources/workday";
import { LAB_HIDE_AFTER_FAILURES, probeLabs } from "./sources/labsites";
import { validateCurated } from "./validate";

/**
 * Refresh everything, then report health:
 *   1. validate hand-curated data
 *   2. scrape Workday postings (auto-expiring)
 *   3. re-assert curated programs (evergreen) and check their URLs
 *   4. sweep lifecycle + apply manual overrides
 *   5. probe lab sites
 *   6. write data/meta.json — including `issues`, which fail the scheduled
 *      workflow (so GitHub emails the owner) without blocking the data commit
 *
 * Run: bun run refresh   (runs daily via .github/workflows/refresh.yml)
 */

type CuratedProgram = Omit<ScrapedJob, "source" | "evergreen">;

const issues: string[] = [];

function curatedPrograms(): ScrapedJob[] {
  const raw = readFileSync(path.join(process.cwd(), "data", "curated", "programs.json"), "utf8");
  const programs = JSON.parse(raw) as CuratedProgram[];
  return programs.map((p) => ({ ...p, id: `curated:${p.id}`, source: "curated", evergreen: true }));
}

/** Returns ids whose URL looks dead. 403s count as alive (bot-blocking sites). */
async function checkProgramUrls(jobs: ScrapedJob[]): Promise<string[]> {
  console.log(`  programs: checking ${jobs.length} curated URLs…`);
  const dead: string[] = [];
  for (const job of jobs) {
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 10_000);
      const res = await fetch(job.applyUrl, {
        redirect: "follow",
        signal: ctrl.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        },
      });
      clearTimeout(timer);
      if (res.status >= 400 && res.status !== 403) {
        dead.push(job.id);
        console.warn(`  programs: ${job.id} → HTTP ${res.status} (${job.applyUrl})`);
      }
    } catch {
      dead.push(job.id);
      console.warn(`  programs: ${job.id} → unreachable (${job.applyUrl})`);
    }
    await Bun.sleep(150);
  }
  return dead;
}

function writeMeta(jobs: Job[], labCount: number, sources: NonNullable<SiteMeta["sources"]>): SiteMeta {
  const visible = jobs.filter((j) => j.status === "open" || j.status === "stale");
  const meta: SiteMeta = {
    lastRefreshed: new Date().toISOString(),
    counts: {
      jobs: jobs.length,
      openJobs: visible.length,
      labs: labCount,
      nwa: visible.filter((j) => j.category === "nwa").length,
      onCampus: visible.filter((j) => j.category === "on-campus").length,
      research: visible.filter((j) => j.category === "research").length,
    },
    sources,
    issues,
  };
  writeFileSync(path.join(process.cwd(), "data", "meta.json"), JSON.stringify(meta, null, 2) + "\n");
  return meta;
}

/** Markdown summary on the workflow run page. */
function writeStepSummary(meta: SiteMeta): void {
  const file = process.env.GITHUB_STEP_SUMMARY;
  if (!file || !meta.sources) return;
  const row = (name: string, s: SourceHealth) =>
    `| ${name} | ${s.ok ? "✅" : "⚠️"} | ${s.count}${s.total ? ` / ${s.total}` : ""} | ${(s.failing ?? []).join(", ") || "—"} |`;
  const lines = [
    "## Jam refresh",
    "",
    `**${meta.counts.openJobs}** visible listings · ${meta.counts.labs} labs`,
    "",
    "| Source | Status | Count | Failing |",
    "|---|---|---|---|",
    row("Workday postings", meta.sources.workday),
    row("Curated program URLs", meta.sources.programs),
    row("Lab sites", meta.sources.labs),
    "",
    meta.issues && meta.issues.length > 0 ? `### Needs attention\n\n- ${meta.issues.join("\n- ")}` : "No issues.",
  ];
  appendFileSync(file, lines.join("\n") + "\n");
}

console.log("Jam refresh · " + new Date().toISOString());

console.log("\n[1/4] Curated data");
const validation = validateCurated();
if (validation.length > 0) {
  issues.push(`Curated data has ${validation.length} problem(s): ${validation.slice(0, 5).join("; ")}`);
  console.error("  " + validation.join("\n  "));
} else {
  console.log("  valid");
}

console.log("\n[2/4] Workday (UAF external career site)");
const previous = loadJobs();
const prevOpenWorkday = previous.filter((j) => j.source === "workday" && j.status === "open").length;
let workdayJobs: ScrapedJob[] = [];
let workdayOk = true;
try {
  workdayJobs = await scrapeWorkday();
} catch (err) {
  workdayOk = false;
  issues.push(`Workday scrape failed (previous data kept): ${String(err)}`);
  console.error("  workday: scrape failed, keeping previous data —", String(err));
}
if (workdayOk && workdayJobs.length === 0 && prevOpenWorkday >= 3) {
  // Missing listings only age (stale at 4 days), so nothing disappears yet — but a human should look.
  workdayOk = false;
  issues.push(`Workday returned 0 listings (previously ${prevOpenWorkday} open) — the API may have changed.`);
}

console.log("\n[3/4] Curated programs");
const programs = curatedPrograms();
const deadPrograms = process.env.SKIP_URL_CHECK === "1" ? [] : await checkProgramUrls(programs);
if (deadPrograms.length > Math.max(3, programs.length * 0.3)) {
  issues.push(`${deadPrograms.length} of ${programs.length} program URLs failed — likely a network problem on the runner.`);
}

// Re-apply the eligibility rule to stored listings too, so tightening it cleans up old data.
const eligible = previous.filter((j) => j.source !== "workday" || isStudentHoldable(j.title, j.tags?.[0]));
if (eligible.length < previous.length) {
  console.log(`  eligibility: dropped ${previous.length - eligible.length} stored listing(s) a student couldn't hold`);
}
const merged = mergeScraped(eligible, [...workdayJobs, ...programs]);
const { jobs, transitions } = sweep(merged, loadOverrides());
if (transitions.length > 0) console.log("  lifecycle:", transitions.join(" · "));
saveJobs(jobs);

console.log("\n[4/4] Lab sites");
const labs = await probeLabs();
const labsAlive = labs.filter((l) => l.activity?.alive).length;
const labsHidden = labs.filter((l) => (l.activity?.failStreak ?? 0) >= LAB_HIDE_AFTER_FAILURES).map((l) => l.id);
if (labsAlive < labs.length * 0.5) {
  issues.push(`Only ${labsAlive} of ${labs.length} lab sites reachable — likely a network problem on the runner.`);
}

const meta = writeMeta(jobs, labs.length, {
  workday: { ok: workdayOk, count: workdayJobs.length },
  programs: { ok: deadPrograms.length === 0, count: programs.length - deadPrograms.length, total: programs.length, failing: deadPrograms },
  labs: { ok: labsHidden.length === 0, count: labsAlive, total: labs.length, failing: labsHidden },
});
writeStepSummary(meta);

const open = jobs.filter((j) => j.status === "open").length;
console.log(`\nDone. ${open} open listings (${workdayJobs.length} scraped + ${programs.length} curated) · ${labsAlive}/${labs.length} labs reachable.`);
if (issues.length > 0) console.warn(`\nNeeds attention:\n  - ${issues.join("\n  - ")}`);
