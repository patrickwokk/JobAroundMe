import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { Job, Overrides } from "../../lib/types";

const DATA_DIR = path.join(process.cwd(), "data");
const JOBS_PATH = path.join(DATA_DIR, "jobs.json");
const OVERRIDES_PATH = path.join(DATA_DIR, "overrides.json");

/** Days without being seen at the source before a posting is flagged stale. */
export const STALE_DAYS = 4;
/** Days without being seen before a posting is expired (hidden from the site). */
export const EXPIRE_DAYS = 14;

/** A listing as produced by a source, before lifecycle fields are attached. */
export type ScrapedJob = Omit<Job, "firstSeenAt" | "lastSeenAt" | "status">;

export function loadJobs(): Job[] {
  if (!existsSync(JOBS_PATH)) return [];
  return JSON.parse(readFileSync(JOBS_PATH, "utf8")) as Job[];
}

export function loadOverrides(): Overrides {
  if (!existsSync(OVERRIDES_PATH)) return {};
  return JSON.parse(readFileSync(OVERRIDES_PATH, "utf8")) as Overrides;
}

/**
 * Upsert freshly scraped listings into the current set.
 * - new listing      → firstSeen = now, status open
 * - seen again       → lastSeen bumped, status revived to open
 * - missing this run → left untouched (the sweep ages it out)
 */
export function mergeScraped(
  current: Job[],
  scraped: ScrapedJob[],
  nowIso: string = new Date().toISOString(),
): Job[] {
  const byId = new Map(current.map((j) => [j.id, j]));
  for (const s of scraped) {
    const prev = byId.get(s.id);
    byId.set(s.id, {
      ...prev,
      ...s,
      firstSeenAt: prev?.firstSeenAt ?? nowIso,
      lastSeenAt: nowIso,
      status: "open",
    });
  }
  return [...byId.values()];
}

/**
 * Age out postings the source no longer lists, then apply manual overrides.
 * Evergreen programs are exempt from aging; overrides always win.
 */
export function sweep(
  jobs: Job[],
  overrides: Overrides,
  nowMs: number = Date.now(),
): { jobs: Job[]; transitions: string[] } {
  const transitions: string[] = [];
  const swept = jobs.map((job) => {
    let status = job.status;
    if (!job.evergreen) {
      const ageDays = (nowMs - Date.parse(job.lastSeenAt)) / 86_400_000;
      if (ageDays > EXPIRE_DAYS) status = "expired";
      else if (ageDays > STALE_DAYS) status = "stale";
    }
    const override = overrides[job.id];
    if (override) status = override.status;
    if (status !== job.status) {
      transitions.push(`${job.id}: ${job.status} -> ${status}`);
    }
    return { ...job, status };
  });
  return { jobs: swept, transitions };
}

export function saveJobs(jobs: Job[]): void {
  mkdirSync(DATA_DIR, { recursive: true });
  const sorted = [...jobs].sort(
    (a, b) => b.firstSeenAt.localeCompare(a.firstSeenAt) || a.id.localeCompare(b.id),
  );
  writeFileSync(JOBS_PATH, JSON.stringify(sorted, null, 2) + "\n");
}
