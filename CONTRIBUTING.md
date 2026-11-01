# Contributing to Jam

The most valuable contributions are **data**: a lab students should know about, a club that opens
doors, an internship program worth the effort. No coding required.

## Add a lab, club, or program

1. Edit the right file in `data/curated/`:
   - `labs.json` — professor-led research labs (name, PI, department, majors, research areas, URL)
   - `clubs.json` — student organizations (name, majors, career tracks, why it builds a resume)
   - `programs.json` — standing internship programs and campus job channels
2. Copy an existing entry as a template. `majors` uses the slugs in `lib/majors.ts`
   (`[]` means "any major"); club `tracks` use the slugs in `lib/tracks.ts`.
3. Open a pull request. CI validates every field and builds the site — if something's off,
   the check tells you exactly which row and field.

**The bar for inclusion:** would this genuinely strengthen a student's resume? Generic retail and
food-service roles don't make the list — that's the point of Jam.

## Report a filled listing

Use the **Report filled** link on the listing. Maintainers add it to `data/overrides.json`.

## Code changes

```bash
bun install
bun run dev        # http://localhost:3000
bun test           # pipeline logic + curated data validation
bun run build      # typecheck, lint, static export
```

Keep pages static (no server), keep student data on the student's device, and match the existing
design tokens in `app/globals.css` — `lib/ui.ts` holds the shared class recipes.
