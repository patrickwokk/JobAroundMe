# Maintaining Jam

Jam is designed to run itself. This page is everything a maintainer needs — most of it is "nothing."

## What runs on its own ($0, forever)

| When | What | Where |
|---|---|---|
| Every day, ~6am Central | Scrape the U of A careers feed, check every program link, probe every lab site, sweep stale listings, commit data, redeploy | `.github/workflows/refresh.yml` |
| Every push to `main` | Run tests, build, deploy to GitHub Pages | `.github/workflows/deploy.yml` |
| Every pull request | Tests (including curated-data validation) + full build | `.github/workflows/ci.yml` |
| Jan 10 & Aug 10 | Open a "Semester review" checklist issue | `.github/workflows/semester-review.yml` |
| Monthly | Dependabot PR bumping GitHub Actions versions | `.github/dependabot.yml` |

Built-in safety nets:

- **Push retries.** If GitHub hiccups mid-push (it happened once, Sept 2026), the bot rebases and retries.
- **Blip tolerance.** A lab site is hidden only after 3 consecutive failed checks.
- **Honest staleness.** If the refresh ever stops, the site shows a banner after 3 days.
- **Keep-alive.** The refresh re-enables its own schedule so GitHub's 60-day inactivity pause never triggers.

## When GitHub emails you

The refresh run **fails on purpose** when a source needs a human — the data is still committed and the
site still deploys. Open the failed run; its summary table says which source and why.

| Message | Likely cause | Fix |
|---|---|---|
| `Workday scrape failed` / `returned 0 listings` | The university changed its careers site | Inspect `pipeline/sources/workday.ts` against the live site's network requests |
| `N program URLs failed` | Many links failing at once = runner network blip | Usually clears next day; if not, check the URLs |
| `Curated data has problems` | A bad edit to `data/curated/*.json` | The message names the file, row and field |
| `Only N lab sites reachable` | Network blip on the runner | Clears next day |

To re-run immediately: Actions → *Refresh listings* → **Run workflow**.

## Routine tasks

**Take down a filled listing** — add its id (shown in the report) to `data/overrides.json`:

```json
{ "workday:R0087670": { "status": "filled", "note": "confirmed by dept", "at": "2026-11-01" } }
```

**Add or remove a lab, club, or program** — edit `data/curated/labs.json`, `clubs.json`, or
`programs.json`. Run `bun test` before pushing; it validates every field.

**Semester review** — the reminder issue has a checklist. About 20 minutes, twice a year.

## Configuration

All owner settings live in **`lib/site.ts`**:

| Setting | Purpose |
|---|---|
| `CONTACT_EMAIL` | Project inbox for "report filled" / "suggest a listing". Use a dedicated address. Empty → GitHub issues. |
| `DISCORD_INVITE_URL` | Referral Board invite. Empty → /connect shows "opening soon". |

Repository variables (Settings → Secrets and variables → Actions → Variables):

| Variable | Purpose |
|---|---|
| `CUSTOM_DOMAIN` | e.g. `jam.example.org`. Also set the domain under Settings → Pages. |
| `GOATCOUNTER_CODE` | Turns on cookie-free, aggregate visit counting ([goatcounter.com](https://www.goatcounter.com)). |

Site URLs are derived from wherever the repo lives — moving it to a GitHub organization needs no code changes.

## Brand assets

The logo mark lives in `components/logo.tsx`. After changing it, mirror the geometry in
`scripts/brand-assets.ts` and run `bun run brand` to regenerate the favicon, app icons and social card.
