import type { JobType } from "../../lib/types";
import { matchMajors } from "../lib/match";
import type { ScrapedJob } from "../lib/store";

/**
 * Scrapes the University of Arkansas, Fayetteville external career site
 * (Workday). The same public JSON API the career site's own UI calls.
 *
 * We keep listings a currently-enrolled student could actually hold:
 * part-time / hourly / extra-help / temporary / student-titled positions
 * in Fayetteville — and drop faculty and full-time staff searches.
 */

const BASE = "https://uasys.wd5.myworkdayjobs.com";
const CXS = `${BASE}/wday/cxs/uasys/UAF_External_Career_Site`;
const UA = "JobAroundMe/1.0 (student job aggregator; github.com/JobAroundMe)";

interface ListPosting {
  title: string;
  externalPath: string;
  locationsText?: string;
  postedOn?: string;
  bulletFields?: string[];
}

interface JobDetail {
  title: string;
  jobDescription?: string;
  timeType?: string;
  jobReqId?: string;
  externalUrl?: string;
  location?: string;
}

const STUDENT_TITLE = /extra help|hourly|student|work[- ]study|part[- ]time|temporary|intern(?!al)|assistant|aide|tutor|grader/i;
const NEVER = /faculty|professor|instructor|lecturer|adjunct|postdoc|post-doc|dean|provost|chancellor|director|coach|physician|full[- ]time/i;

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": UA,
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return (await res.json()) as T;
}

async function listAll(): Promise<ListPosting[]> {
  const pageSize = 20;
  const first = await fetchJson<{ total: number; jobPostings: ListPosting[] }>(
    `${CXS}/jobs`,
    { method: "POST", body: JSON.stringify({ appliedFacets: {}, limit: pageSize, offset: 0, searchText: "" }) },
  );
  const all = [...first.jobPostings];
  for (let offset = pageSize; offset < first.total; offset += pageSize) {
    const page = await fetchJson<{ jobPostings: ListPosting[] }>(`${CXS}/jobs`, {
      method: "POST",
      body: JSON.stringify({ appliedFacets: {}, limit: pageSize, offset, searchText: "" }),
    });
    all.push(...page.jobPostings);
    await Bun.sleep(250);
  }
  return all;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function toBlurb(description: string): string {
  const text = stripHtml(description);
  // The boilerplate login banner precedes every UA posting; cut to the duties section when present.
  const duties = text.match(/Summary of Job Duties:?\s*(.{40,})/i);
  const body = duties ? duties[1] : text.replace(/^.*?(apply|posting)\s*\.?\s*/i, "");
  const cut = body.slice(0, 240);
  return cut.length < body.length ? cut.replace(/\s+\S*$/, "") + "…" : cut;
}

function findPay(description: string): string | undefined {
  const text = stripHtml(description);
  const m = text.match(/\$\s?\d[\d,.]*(?:\s?[-–]\s?\$?\s?\d[\d,.]*)?\s?(?:per hour|\/\s?hour|\/\s?hr|hourly)/i);
  return m ? m[0].replace(/\s+/g, " ") : undefined;
}

function postedAtFrom(postedOn?: string): string | undefined {
  if (!postedOn) return undefined;
  const now = Date.now();
  if (/today/i.test(postedOn)) return new Date(now).toISOString();
  if (/yesterday/i.test(postedOn)) return new Date(now - 86_400_000).toISOString();
  const days = postedOn.match(/(\d+)\+?\s*Days?/i);
  if (days) return new Date(now - Number(days[1]) * 86_400_000).toISOString();
  return undefined;
}

function jobTypeFrom(title: string): JobType {
  if (/extra help/i.test(title)) return "extra-help";
  if (/work[- ]study/i.test(title)) return "work-study";
  if (/intern(?!al)/i.test(title)) return "internship";
  return "part-time";
}

export async function scrapeWorkday(): Promise<ScrapedJob[]> {
  const postings = await listAll();
  console.log(`  workday: ${postings.length} total postings on UAF external site`);

  const candidates = postings.filter(
    (p) => (p.locationsText ?? "").includes("Fayetteville") && !NEVER.test(p.title),
  );

  const jobs: ScrapedJob[] = [];
  for (const p of candidates) {
    await Bun.sleep(200);
    let detail: JobDetail;
    try {
      const wrapper = await fetchJson<{ jobPostingInfo: JobDetail }>(`${CXS}/job${p.externalPath.replace(/^\/job/, "")}`);
      detail = wrapper.jobPostingInfo;
    } catch (err) {
      console.warn(`  workday: detail failed for ${p.title}: ${String(err)}`);
      continue;
    }

    const isPartTime = detail.timeType?.toLowerCase() === "part time";
    const studentTitled = STUDENT_TITLE.test(p.title);
    if (!isPartTime && !studentTitled) continue;
    if (NEVER.test(detail.title)) continue;

    const description = detail.jobDescription ?? "";
    const reqId = detail.jobReqId ?? p.bulletFields?.[0] ?? p.externalPath;
    const blurb = toBlurb(description);
    jobs.push({
      id: `workday:${reqId}`,
      title: detail.title,
      org: "University of Arkansas",
      category: "on-campus",
      type: jobTypeFrom(detail.title),
      // Only the title + duties summary — full descriptions carry boilerplate
      // (benefits, EEO) that false-matches half the majors on campus.
      majors: matchMajors(`${detail.title} ${blurb}`),
      location: detail.location ?? "Fayetteville, AR",
      pay: findPay(description),
      blurb,
      applyUrl: detail.externalUrl ?? `${BASE}/UAF_External_Career_Site${p.externalPath}`,
      source: "workday",
      postedAt: postedAtFrom(p.postedOn),
      tags: detail.timeType ? [detail.timeType.toLowerCase()] : undefined,
    });
  }
  console.log(`  workday: kept ${jobs.length} student-holdable listings`);
  return jobs;
}
