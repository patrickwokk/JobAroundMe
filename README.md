<p align="center">
  <img src="public/icon-192.png" width="72" height="72" alt="Jam logo" />
</p>

<h1 align="center">Jam — Job Around Me</h1>

<p align="center">
  Campus jobs, professor-led research labs, clubs and Northwest Arkansas internships that build a real resume —<br />
  verified daily, sorted by major, free for every University of Arkansas student.
</p>

---

Most U of A students never find out how much resume-building work sits within a 30-minute radius of
campus: hourly and extra-help jobs inside university departments, research labs that take
undergraduates but never post openings, and internship programs at the Fortune-scale companies
headquartered next door. Jam puts all of it in one place — no login, no generic listings, no noise.

## What makes it different

- **Major-first and destination-first.** Pick what you study, or pick where you're headed (finance,
  software, medicine…) and get a four-year ladder of jobs, labs and clubs from Fayetteville.
- **The unlisted market.** Professors don't post research jobs. Jam keeps a campus-wide directory of
  lab websites, checks them daily for recruiting signals, and drafts the intro email with you.
- **Clubs as career infrastructure.** The organizations where internships circulate first, by major.
- **A meaning filter.** Curated programs must genuinely strengthen a resume.
- **Freshness you can audit.** Every listing shows when it was last verified; dead ones remove themselves.
- **Private by design.** No accounts, no ads, no tracking cookies. Saved listings stay on the device.

## How listings stay honest

| State | Meaning | What happens |
|---|---|---|
| `open` | Seen at its source on the latest daily refresh | Shown with a "Verified" badge |
| `stale` | Missing from its source for 4+ days | Still shown, flagged "Recheck" |
| `expired` | Missing for 14+ days | Removed automatically |
| `filled` | Reported filled and confirmed | Removed via `data/overrides.json` |

## Architecture

```
app/                     Next.js (App Router) — fully static export, light + dark themes
components/              UI: listings board, lab cards + email composer, explorers, logo
lib/                     Types, majors, career tracks, data access, site config (lib/site.ts)
data/
  jobs.json · labs.json · meta.json     Generated daily by the pipeline
  overrides.json                         Hand-edited: take filled listings down
  curated/{programs,labs,clubs}.json     Hand-curated, validated in CI
pipeline/
  refresh.ts             Orchestrator: validate → scrape → sweep → probe → health report
  sources/workday.ts     U of A careers site (public Workday JSON API)
  sources/labsites.ts    Lab probes: reachability, latest WordPress post, recruiting signals
  lib/store.ts           Upsert + lifecycle sweep
  validate.ts            Curated-data validation
scripts/brand-assets.ts  Renders favicon, app icons and the social card from the logo mark
.github/workflows/       refresh (daily) · deploy · ci · semester-review
```

## Running it

Requires [Bun](https://bun.sh).

```bash
bun install
bun run dev        # http://localhost:3000
bun run refresh    # re-scrape every source and rewrite data/
bun test           # pipeline logic + curated-data validation
bun run build      # static production build in out/
```

## Operations

Everything runs on free GitHub infrastructure — Actions for the daily refresh, Pages for hosting.
See **[MAINTAINING.md](MAINTAINING.md)** for the runbook (what runs itself, what emails you, and the
twice-a-year review) and **[CONTRIBUTING.md](CONTRIBUTING.md)** to add a lab, club or program.

Planning notes: [docs/GROWTH.md](docs/GROWTH.md) · [docs/CONNECT.md](docs/CONNECT.md) ·
[docs/MONETIZATION.md](docs/MONETIZATION.md) (parked).

## Disclaimer

Jam is an independent project, not affiliated with or endorsed by the University of Arkansas. Every
listing links to its original source — always apply there. Scrapers are rate-limited and read only
public pages.
