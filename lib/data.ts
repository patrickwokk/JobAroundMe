import jobsRaw from "@/data/jobs.json";
import labsRaw from "@/data/labs.json";
import metaRaw from "@/data/meta.json";
import clubsRaw from "@/data/curated/clubs.json";
import type { Club, Job, Lab, SiteMeta, Track } from "./types";

export const ALL_JOBS = jobsRaw as unknown as Job[];
export const LABS = labsRaw as unknown as Lab[];
export const META = metaRaw as unknown as SiteMeta;
export const CLUBS = clubsRaw as unknown as Club[];

/** Listings shown on the site: open, plus stale (flagged, pending expiry). */
export const VISIBLE_JOBS = sortJobs(ALL_JOBS.filter((j) => j.status === "open" || j.status === "stale"));

/** Fresh postings first (newest), then standing programs (alphabetical). */
export function sortJobs(jobs: Job[]): Job[] {
  return [...jobs].sort((a, b) => {
    if (!!a.evergreen !== !!b.evergreen) return a.evergreen ? 1 : -1;
    if (!a.evergreen) {
      const aT = Date.parse(a.postedAt ?? a.firstSeenAt);
      const bT = Date.parse(b.postedAt ?? b.firstSeenAt);
      if (aT !== bT) return bT - aT;
    }
    return a.title.localeCompare(b.title);
  });
}

/** Jobs explicitly tagged for a major group. */
export function jobsTaggedFor(slug: string): Job[] {
  return VISIBLE_JOBS.filter((j) => j.majors.includes(slug));
}

/** Jobs open to any major (no specific tags). */
export const ANY_MAJOR_JOBS = VISIBLE_JOBS.filter((j) => j.majors.length === 0);

export function labsForMajor(slug: string): Lab[] {
  return LABS.filter((l) => l.majors.includes(slug) && l.activity?.alive !== false);
}

export const LIVE_LABS = LABS.filter((l) => l.activity?.alive !== false);

export const HIRING_SIGNAL_LABS = LIVE_LABS.filter((l) => l.activity?.hiringSignal);

export function majorCounts(slug: string): { jobs: number; labs: number } {
  return { jobs: jobsTaggedFor(slug).length, labs: labsForMajor(slug).length };
}

export function clubsForMajor(slug: string): Club[] {
  return CLUBS.filter((c) => c.majors.includes(slug));
}

export function clubsForTrack(slug: string): Club[] {
  return CLUBS.filter((c) => c.tracks.includes(slug));
}

/** Employer-matched programs pinned first, then listings tagged to the track's majors. */
export function jobsForTrack(track: Track): Job[] {
  const pinned = VISIBLE_JOBS.filter((j) =>
    track.employerMatch.some((e) => j.org.toLowerCase().includes(e.toLowerCase())),
  );
  const pinnedIds = new Set(pinned.map((j) => j.id));
  const tagged = VISIBLE_JOBS.filter(
    (j) => !pinnedIds.has(j.id) && j.majors.some((m) => track.majors.includes(m)),
  );
  return [...pinned, ...tagged];
}

export function labsForTrack(track: Track): Lab[] {
  return LIVE_LABS.filter((l) => l.majors.some((m) => track.majors.includes(m)));
}
