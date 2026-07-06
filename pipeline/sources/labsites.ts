import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { Lab, LabActivity } from "../../lib/types";

/**
 * Probes the curated directory of professor-led lab sites (many are on the
 * wordpressua.uark.edu multisite). Labs rarely post "jobs" — instead we record:
 *  - whether the site is alive
 *  - the latest post (via the WordPress REST API when available)
 *  - "hiring signals": pages that mention joining / openings / recruiting
 */

const UA = "JobAroundMe/1.0 (student research-lab directory; github.com/JobAroundMe)";
const HIRING = /join (?:the |our )?(?:lab|team|group)|we are (?:recruiting|hiring)|open(?:ings| positions?)|positions? available|looking for (?:motivated )?(?:undergraduate|graduate|phd)? ?students|prospective students/i;

type CuratedLab = Omit<Lab, "activity">;

async function fetchWithTimeout(url: string, ms = 12_000): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, {
      redirect: "follow",
      signal: ctrl.signal,
      headers: { "User-Agent": UA, Accept: "text/html,application/json;q=0.9,*/*;q=0.8" },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function latestWpPost(siteUrl: string): Promise<Pick<LabActivity, "wordpress" | "lastPostAt" | "lastPostTitle">> {
  const base = siteUrl.replace(/\/+$/, "");
  try {
    const res = await fetchWithTimeout(`${base}/wp-json/wp/v2/posts?per_page=1&_fields=date,title`, 10_000);
    if (!res.ok) return {};
    const posts = (await res.json()) as Array<{ date?: string; title?: { rendered?: string } }>;
    if (!Array.isArray(posts) || posts.length === 0) return { wordpress: true };
    const title = (posts[0].title?.rendered ?? "")
      .replace(/<[^>]+>/g, "")
      .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
      .replace(/&amp;/g, "&")
      .trim();
    return { wordpress: true, lastPostAt: posts[0].date, lastPostTitle: title || undefined };
  } catch {
    return {};
  }
}

async function probeLab(lab: CuratedLab): Promise<Lab> {
  const activity: LabActivity = { checkedAt: new Date().toISOString(), alive: false };
  try {
    const res = await fetchWithTimeout(lab.url);
    activity.alive = res.status < 400;
    if (activity.alive) {
      const html = await res.text();
      activity.hiringSignal = HIRING.test(html.replace(/<[^>]+>/g, " "));
      const wp = await latestWpPost(lab.url);
      Object.assign(activity, wp);
    }
  } catch {
    activity.alive = false;
  }
  return { ...lab, activity };
}

async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]);
      await Bun.sleep(150);
    }
  });
  await Promise.all(workers);
  return results;
}

export async function probeLabs(): Promise<Lab[]> {
  const curatedPath = path.join(process.cwd(), "data", "curated", "labs.json");
  const curated = JSON.parse(readFileSync(curatedPath, "utf8")) as CuratedLab[];
  console.log(`  labs: probing ${curated.length} lab sites…`);
  const labs = await mapLimit(curated, 5, probeLab);

  const dead = labs.filter((l) => !l.activity?.alive);
  if (dead.length > 0) {
    console.warn(`  labs: ${dead.length} sites unreachable → ${dead.map((l) => l.id).join(", ")}`);
  }
  const wp = labs.filter((l) => l.activity?.wordpress).length;
  const hiring = labs.filter((l) => l.activity?.hiringSignal).length;
  console.log(`  labs: ${labs.length - dead.length} alive · ${wp} WordPress · ${hiring} with hiring signals`);

  writeFileSync(path.join(process.cwd(), "data", "labs.json"), JSON.stringify(labs, null, 2) + "\n");
  return labs;
}
