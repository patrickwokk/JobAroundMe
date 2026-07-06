# Connect v2 — the Razorback Referral Network blueprint

The pilot runs on GitHub Discussions (free, spam-resistant, zero ops). This document is the
build plan for when the board outgrows it — measured by: >30 referral asks/month, or students
asking for company filters.

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

## Why not just Discord?

Discord is where communities chat; referrals need *searchable, structured, slow* posts with
accountability. Discussions → purpose-built board is the right ladder. A Discord can complement
later for social glue.
