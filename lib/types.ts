/**
 * Core data model for JobAroundMe.
 *
 * Two kinds of listings live side by side:
 *  - "postings"  — real openings scraped from a source (Workday). They expire
 *                  automatically when the source stops listing them.
 *  - "programs"  — standing opportunities (internship programs, student teams,
 *                  temp pools). Marked `evergreen`, reviewed by hand, never
 *                  auto-expired.
 */

export type JobCategory = "on-campus" | "research" | "nwa";

export type JobType =
  | "part-time"
  | "extra-help"
  | "work-study"
  | "internship"
  | "research-assistant"
  | "program";

/** Lifecycle used to take listings off the board once they're gone/filled. */
export type JobStatus = "open" | "stale" | "filled" | "expired";

export type JobSource = "workday" | "curated" | "lab-site";

export interface Job {
  id: string;
  title: string;
  org: string;
  category: JobCategory;
  type: JobType;
  /** Major-group slugs this is most relevant to. Empty array = open to any major. */
  majors: string[];
  location: string;
  pay?: string;
  /** 1–2 sentence plain-text summary shown on the card. */
  blurb: string;
  applyUrl: string;
  source: JobSource;
  /** Standing program — exempt from the freshness sweep. */
  evergreen?: boolean;
  postedAt?: string;
  firstSeenAt: string;
  lastSeenAt: string;
  status: JobStatus;
  tags?: string[];
}

export interface LabActivity {
  checkedAt: string;
  alive: boolean;
  /** Site is a WordPress install whose REST API we could read. */
  wordpress?: boolean;
  lastPostAt?: string;
  lastPostTitle?: string;
  /** Page mentions joining/openings/recruiting students. */
  hiringSignal?: boolean;
}

export interface Lab {
  id: string;
  name: string;
  /** Principal investigator / director. Empty string when not confirmed. */
  pi: string;
  department: string;
  majors: string[];
  areas: string[];
  url: string;
  /** How students typically get in — almost always a short, direct email. */
  contactHint?: string;
  activity?: LabActivity;
}

export interface MajorGroup {
  slug: string;
  name: string;
  shortName: string;
  college: string;
  blurb: string;
  /** Example majors covered by this group. */
  examples: string[];
  /** Lowercase keywords used by the pipeline to auto-tag scraped jobs. */
  keywords: string[];
}

export interface SiteMeta {
  lastRefreshed: string;
  counts: {
    jobs: number;
    openJobs: number;
    labs: number;
    nwa: number;
    onCampus: number;
    research: number;
  };
}

export interface OverrideEntry {
  status: JobStatus;
  note?: string;
  at?: string;
}

export type Overrides = Record<string, OverrideEntry>;
