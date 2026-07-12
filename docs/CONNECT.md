# Connect v2 — the Razorback Referral Network blueprint

The pilot runs as a **dedicated Discord server** (students already live there; real-time;
identity-light; free at any scale), with GitHub Discussions retained as the searchable public
archive. Channel map: `#intros`, `#referral-asks`, `#referral-offers`, `#wins`, `#this-week`
(freshest listings, auto-postable from the RSS feed later).

Setup is a one-time, three-minute owner task: create the server with those five channels,
create a non-expiring invite, paste it into `DISCORD_INVITE_URL` in `lib/site.ts`, and push —
the /connect page flips from "opening soon" to "the board is open."

This document is the build plan for when the board outgrows chat — measured by: >30 referral
asks/month, or students asking for company filters.

## Product

Blind's useful core is *insiders answering candidly*. Its failure mode is anonymity → toxicity.
For students, flip the design: **verified identity, visible reciprocity.**

1. **Verified membership.** Sign-in via magic link, restricted to `@uark.edu` (plus manually
   approved alumni). No passwords, no scraping surface, provably campus.
2. **Insider directory (opt-in).** "Who's at Walmart Global Tech from EECS?" — filter members by
   company × major × grad year. Every profile lists what they're open to: referrals, resume
   reads, 15-minute calls.
3. **Asks & offers as structured posts.** An ask = target company + role link + resume + one-line
   fit. An offer = company + capacity ("2 referrals this cycle"). Matching is a filter, not an
   algorithm.
4. **Reciprocity karma.** Closed loops ("interview landed", "referred 3 students") count publicly.
   Karma unlocks nothing — it just makes generosity visible, which is enough.
5. **Seasonal rhythm.** August (fall recruiting) and January (summer scramble) get "referral
   drives" — timed pushes when demand actually exists.

## Stack (still $0 at student scale)

| Piece | Choice | Free-tier ceiling |
|---|---|---|
| App | Next.js on Vercel Hobby | non-commercial, plenty for a campus |
| Auth + DB | Supabase (magic links, Postgres, RLS) | 50k MAU, 500 MB — years of headroom |
| Email | Resend free tier for magic links + digest | 3k emails/mo |
| Moderation | 2–3 student moderators + report button | human |

Domain-restricted auth is one Supabase setting (`email domain allowlist`) plus a trigger that
rejects non-uark signups with an alumni-request path.

## Safety rails

- Real names required; company affiliation self-attested but challengeable.
- No compensation-negotiation channel at launch (that's where moderation cost explodes).
- Referral hand-offs happen in email/DM — the platform never stores resumes long-term.
- Code of conduct: one strike for recruiters posing as students; permanent ban.

## Why Discord first, and what it doesn't solve

Discord wins the pilot because adoption beats architecture: a referral board nobody joins helps
nobody, and students join Discords daily. What it doesn't give you — searchable slow posts,
verified campus identity, structured asks — is exactly the v2 list above. The GitHub archive
covers searchability in the meantime; verification stays social (mods watch for recruiters
posing as students) until v2 makes it cryptographic.
