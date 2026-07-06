import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { Job, SiteMeta } from "../lib/types";
import { loadJobs, loadOverrides, mergeScraped, saveJobs, sweep, type ScrapedJob } from "./lib/store";
import { scrapeWorkday } from "./sources/workday";
import { probeLabs } from "./sources/labsites";

/**
 * Refresh everything:
 *   1. scrape Workday postings (auto-expiring)
 *   2. re-assert curated programs (evergreen)
 *   3. sweep lifecycle + apply manual overrides
 *   4. probe lab sites
 *   5. write data/meta.json
 *
 * Run: bun run refresh   (also runs on a schedule via GitHub Actions)
 */

type CuratedProgram = Omit<ScrapedJob, "source" | "evergreen">;

function curatedPrograms(): ScrapedJob[] {
  const raw = readFileSync(path.join(process.cwd(), "data", "curated", "programs.json"), "utf8");
  const programs = JSON.parse(raw) as CuratedProgram[];
  return programs.map((p) => ({ ...p, id: `curated:${p.id}`, source: "curated", evergreen: true }));
}

async function probeProgramUrls(jobs: ScrapedJob[]): Promise<void> {
  console.log(`  programs: checking ${jobs.length} curated URLs…`);
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
        console.warn(`  programs: ${job.id} → HTTP ${res.status} (${job.applyUrl})`);
      }
    } catch {
      console.warn(`  programs: ${job.id} → unreachable (${job.applyUrl})`);
    }
    await Bun.sleep(150);
  }
}

function writeMeta(jobs: Job[], labCount: number): void {
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
  };
  writeFileSync(path.join(process.cwd(), "data", "meta.json"), JSON.stringify(meta, null, 2) + "\n");
}

console.log("JobAroundMe refresh · " + new Date().toISOString());

console.log("\n[1/3] Workday (UAF external career site)");
let workdayJobs: ScrapedJob[] = [];
try {
  workdayJobs = await scrapeWorkday();
} catch (err) {
  console.error("  workday: scrape failed, keeping previous data —", String(err));
}

console.log("\n[2/3] Curated programs");
const programs = curatedPrograms();
if (process.env.SKIP_URL_CHECK !== "1") await probeProgramUrls(programs);

const merged = mergeScraped(loadJobs(), [...workdayJobs, ...programs]);
const { jobs, transitions } = sweep(merged, loadOverrides());
if (transitions.length > 0) console.log("  lifecycle:", transitions.join(" · "));
saveJobs(jobs);

console.log("\n[3/3] Lab sites");
const labs = await probeLabs();

writeMeta(jobs, labs.length);

const open = jobs.filter((j) => j.status === "open").length;
console.log(`\nDone. ${open} open listings (${workdayJobs.length} scraped + ${programs.length} curated) · ${labs.length} labs.`);
