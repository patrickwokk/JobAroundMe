# Monetization — if/when traffic arrives

Two principles first, because they're the moat:

1. **Students never pay.** The product is trust with 19-year-olds; charging them burns it.
2. **Student data is never sold.** Analytics stay aggregate (GoatCounter counts pages, not people).

## Do nothing until the numbers say otherwise

Costs are $0 (GitHub Pages + Actions + public APIs), so there is no pressure to monetize early.
GoatCounter is wired in now precisely so decisions come from data:

- **< 2,000 monthly visitors** — build trust, ignore money.
- **2,000–10,000** — turn on donations; test one employer placement.
- **> 10,000 or > 40% weekly return rate** — you have leverage; pick lanes deliberately.

## Lanes, in order of fit

| Lane | Who pays | Why it works here | Effort |
|---|---|---|---|
| **Featured listings** | NWA employers | Garver, Movista, Ozark IC compete with Walmart for the same students. A "Featured" slot at the top of a major page — clearly labeled, still meaningful-work-only — is classic job-board economics. | Low: one `featured: true` field + a Stripe payment link |
| **Sponsored career tracks** | Big NWA employers | "The Supply Chain track, presented by J.B. Hunt" — branded education, not ads. High-trust, high-ticket. | Medium: sales conversation |
| **Referral-drive sponsorship** | Employers + bootcamps | August/January referral drives (see Connect) with a sponsor banner. | Low |
| **Digest sponsorship** | Local businesses | Once the weekly-new-listings email exists, one tasteful sponsor line. Newsletter CPMs are honest money. | Medium: needs the digest first |
| **Donations** | Alumni, parents | GitHub Sponsors/Ko-fi link in the footer: "keep this free for students". | Trivial |
| **University partnership** | UofA units | Career Connections or a college licenses the pipeline/board for their own pages. This converts the project from tolerated to endorsed — worth more than the check. | High: relationship work |

**Avoid:** programmatic ads (trust-destroying, pennies), selling contact lists (fatal, possibly
FERPA-adjacent), charging for referrals (destroys the reciprocity culture that makes Connect work).

## Logging that exists today

- GoatCounter pageviews per page → which majors/tracks earn traffic (set `GOATCOUNTER_CODE` repo
  variable; see README).
- GitHub traffic graphs (repo views/clones) and Discussions counts.
- "Report filled" / "Suggest a listing" issue volume — the truest engagement metric this site has.
