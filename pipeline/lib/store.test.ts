import { describe, expect, test } from "bun:test";
import type { Job } from "../../lib/types";
import { EXPIRE_DAYS, mergeScraped, STALE_DAYS, sweep, type ScrapedJob } from "./store";

const DAY = 86_400_000;
const NOW = Date.parse("2026-11-01T12:00:00Z");
const iso = (daysAgo: number) => new Date(NOW - daysAgo * DAY).toISOString();

function scraped(id: string, extra: Partial<ScrapedJob> = {}): ScrapedJob {
  return {
    id,
    title: `Job ${id}`,
    org: "University of Arkansas",
    category: "on-campus",
    type: "part-time",
    majors: [],
    location: "Fayetteville, AR",
    blurb: "A job.",
    applyUrl: "https://example.com",
    source: "workday",
    ...extra,
  };
}

function job(id: string, lastSeenDaysAgo: number, extra: Partial<Job> = {}): Job {
  return { ...scraped(id), firstSeenAt: iso(30), lastSeenAt: iso(lastSeenDaysAgo), status: "open", ...extra };
}

describe("mergeScraped", () => {
  test("new listings start open with first/last seen = now", () => {
    const [j] = mergeScraped([], [scraped("a")], iso(0));
    expect(j.status).toBe("open");
    expect(j.firstSeenAt).toBe(iso(0));
    expect(j.lastSeenAt).toBe(iso(0));
  });

  test("seen again keeps firstSeen, bumps lastSeen, revives stale", () => {
    const [j] = mergeScraped([job("a", 6, { status: "stale" })], [scraped("a")], iso(0));
    expect(j.firstSeenAt).toBe(iso(30));
    expect(j.lastSeenAt).toBe(iso(0));
    expect(j.status).toBe("open");
  });

  test("listings missing from a run are left untouched", () => {
    const merged = mergeScraped([job("gone", 2)], [scraped("new")], iso(0));
    expect(merged.find((j) => j.id === "gone")?.lastSeenAt).toBe(iso(2));
  });
});

describe("sweep", () => {
  test(`flags stale after ${STALE_DAYS} days and expires after ${EXPIRE_DAYS}`, () => {
    const { jobs } = sweep([job("fresh", 1), job("stale", STALE_DAYS + 1), job("old", EXPIRE_DAYS + 1)], {}, NOW);
    expect(jobs.map((j) => j.status)).toEqual(["open", "stale", "expired"]);
  });

  test("evergreen programs never age out", () => {
    const { jobs } = sweep([job("prog", 90, { evergreen: true, source: "curated" })], {}, NOW);
    expect(jobs[0].status).toBe("open");
  });

  test("manual overrides win over everything", () => {
    const { jobs, transitions } = sweep([job("a", 0)], { a: { status: "filled" } }, NOW);
    expect(jobs[0].status).toBe("filled");
    expect(transitions).toEqual(["a: open -> filled"]);
  });
});
