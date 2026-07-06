# JobAroundMe

**Meaningful student work at the University of Arkansas — campus jobs, professor-led research labs, and Northwest Arkansas internships, sorted by major.**

Most U of A students never find out how much resume-building work exists within a 30-minute radius of Old Main: hourly and extra-help jobs inside university departments, research labs that hire undergrads but never post openings, and internship programs at the Fortune-scale companies headquartered next door. JobAroundMe puts all of it on one board — no login, no barista listings, no noise.

## What's different from LinkedIn / Indeed / Handshake

1. **Major-first.** Pick what you study; get the jobs *and* the labs that build your specific resume.
2. **The unlisted market.** Professors don't post research jobs — students email their way in. This repo maintains a campus-wide directory of lab websites (many on the `wordpressua.uark.edu` network), probes each one automatically for reachability and recruiting signals, and generates a professional intro email for you.
3. **Meaning filter.** Curated NWA entries are limited to programs that give real career experience (Walmart Tech, J.B. Hunt, Tyson, Garver Launch, Crystal Bridges, semiconductor startups at the research park…). Generic retail shifts don't make the list.
4. **Freshness you can audit.** Every listing shows when it was last verified, and the lifecycle below removes dead ones automatically.

## How listings come down (lifecycle management)

The worst thing a job board can do is show filled jobs. Three mechanisms prevent that:

| State | Meaning | What happens |
|---|---|---|
| `open` | Seen at its source on the latest refresh | Shown with a "Verified" stamp |
| `stale` | Missing from its source for 4+ days | Still shown, flagged "recheck" |
| `expired` | Missing for 14+ days | Hidden from the board automatically |
| `filled` | Reported by a human | Hidden immediately via override |

- **Scraped postings** (from the U of A careers feed) age out on their own: the sweep in [pipeline/lib/store.ts](pipeline/lib/store.ts) compares each listing's `lastSeenAt` against the thresholds above on every refresh.
- **Standing programs** (`evergreen: true`) never auto-expire, but every URL is re-checked on each refresh and dead ones are flagged in the logs for human pruning. (RevUnit was dropped from the initial dataset this way — it shut down in 2023.)
- **Manual overrides win over everything.** Every listing has a *Report filled* link that opens a pre-filled GitHub issue. A maintainer adds one entry to [data/overrides.json](data/overrides.json):

```json
{ "workday:R0087670": { "status": "filled", "note": "confirmed by dept", "at": "2026-07-06" } }
```

…and the listing disappears on the next build.

## Architecture

```
app/                    Next.js 15 (App Router, Tailwind v4) — fully static
components/             Editorial UI: listings board, lab cards, email composer
lib/                    Types, major taxonomy, data access
data/
  jobs.json             Generated — merged listings with lifecycle state
  labs.json             Generated — lab directory + probe results
  meta.json             Generated — refresh timestamp and counts
  overrides.json        Hand-edited kill switch (filled/expired overrides)
  curated/programs.json Hand-curated standing programs (campus + NWA)
  curated/labs.json     Hand-curated lab directory (URL, PI, majors, areas)
pipeline/
  refresh.ts            Orchestrator: scrape → merge → sweep → probe → meta
  sources/workday.ts    U of A Fayetteville public careers API (Workday CXS)
  sources/labsites.ts   Lab-site prober: reachability, WordPress REST latest
                        post, recruiting-signal detection
  lib/store.ts          Upsert + lifecycle sweep (4d stale / 14d expire)
  lib/match.ts          Keyword → major-group auto-tagging
.github/workflows/
  refresh.yml           Daily cron: re-scrape, sweep, commit data changes
```

**Data sources**

| Source | Method | Cadence |
|---|---|---|
| U of A careers site (Workday) | Public JSON API, filtered to student-holdable Fayetteville roles | Every refresh |
| 33 professor lab sites | HTTP probe + WordPress REST API + recruiting-language scan | Every refresh |
| NWA internships & campus programs | Hand-curated, URL-verified automatically | Human-reviewed |

Handshake is linked (it's the official on-campus portal) but not scraped — it sits behind UARK login.

## Running it

Requires [Bun](https://bun.sh).

```bash
bun install
bun run dev        # site at http://localhost:3000
bun run refresh    # re-scrape all sources, sweep lifecycle, rewrite data/
bun run build      # static production build
```

The included GitHub Action runs `bun run refresh` daily and commits data changes, so the deployed site stays current without a server or database.

## Contributing

- **A listing is filled** → use its *Report filled* link, or PR an entry to `data/overrides.json`.
- **A lab is missing** → PR it into `data/curated/labs.json` (name, PI, department, majors, areas, URL). It joins the automated checks on the next refresh.
- **A meaningful NWA program is missing** → PR `data/curated/programs.json`. The bar: would this line strengthen a student resume?

## Roadmap

- More colleges' lab directories (Fulbright physics/chemistry, Walton research centers)
- Department contact pages as a fallback when a lab has no site
- Optional email digest of new postings per major
- Deploy target: any static host (Vercel/Netlify/Pages) — the build is fully static

## Disclaimer

An independent student project, not an official University of Arkansas site. Every listing links to its original source — always apply there. Scrapers are rate-limited and hit only public pages.
