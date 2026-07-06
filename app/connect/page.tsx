import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { ArrowUpRight, Check, Mail } from "@/components/icons";
import { DISCUSSIONS_URL, REPO_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Connect & Referrals",
  description:
    "The Razorback referral network: students and NWA insiders trading intros, referrals and straight answers — free and spam-resistant.",
};

const RITUALS = [
  {
    title: "Give first",
    copy: "Interning somewhere? Post an intro: where you work, what you'd tell a sophomore, whether you can refer. Ten minutes of your senior year changes someone's junior year.",
  },
  {
    title: "Ask specifically",
    copy: "\"Can anyone refer me to J.B. Hunt's tech internship? Here's my resume and why I fit\" gets answers. \"Anyone hiring?\" doesn't. Specific asks are answerable asks.",
  },
  {
    title: "Close the loop",
    copy: "Got the interview? The offer? Post the win and pay the referral forward next cycle. The board runs on visible reciprocity.",
  },
];

export default function ConnectPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="kicker">Connect · Pilot</p>
      <h1 className="font-display mt-2 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
        Referrals beat resumes<span className="text-cardinal">.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
        Most NWA internships are won the way jobs everywhere are won: someone inside said a name.
        The Connect board is where U of A students, interns and alumni trade intros and referrals —
        in public, with real accountability, for free.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={DISCUSSIONS_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-cardinal px-5 py-3 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:bg-cardinal-deep"
        >
          Open the referral board <ArrowUpRight className="size-4" />
        </a>
        <a
          href={`${REPO_URL}/blob/main/docs/CONNECT.md`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border border-ink px-5 py-3 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-ink hover:text-paper"
        >
          Read the v2 blueprint
        </a>
      </div>

      <section className="mt-14">
        <SectionHeading kicker="House rules" title="Three rituals keep it useful" />
        <div className="grid gap-4 lg:grid-cols-3">
          {RITUALS.map((r, i) => (
            <div key={r.title} className="border border-line bg-paper p-6">
              <p className="font-display text-3xl font-black text-cardinal">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="font-display mt-2 text-xl font-bold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-2">
        <div className="border-2 border-ink bg-paper-2 p-7">
          <p className="kicker">Why GitHub Discussions (for now)</p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
            {[
              "Free forever at any scale — no servers, no ads, no data resale.",
              "Real accounts with history make spam and fake recruiters expensive.",
              "Public asks create public accountability; referral hand-offs move to DMs.",
              "Threads are searchable — next year's students inherit this year's answers.",
            ].map((line) => (
              <li key={line} className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-moss" />
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-ink-faint">
            Yes, it asks for a GitHub account — engineering students have one, and for everyone
            else it&apos;s two minutes and permanently useful. Friction that filters is a feature
            in a referral network.
          </p>
        </div>
        <div className="border border-line bg-paper p-7">
          <p className="kicker">Where this goes · v2</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            When the board outgrows Discussions, the blueprint in the repo describes a purpose-built
            network — still $0 at student scale:
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-cardinal" />
              <span>
                <strong className="text-ink">@uark.edu-verified profiles</strong> — magic-link
                sign-in restricted to campus emails, so every member is provably a student, staffer, or
                recent grad.
              </span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-cardinal" />
              <span>
                <strong className="text-ink">An opt-in insider directory</strong> — filter by
                company and major: &ldquo;who&apos;s at Walmart Tech from EECS?&rdquo; — with asks
                and offers as structured posts, not scrolling chat.
              </span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-cardinal" />
              <span>
                <strong className="text-ink">Karma that means something</strong> — completed
                referrals and closed loops, counted publicly. Blind&apos;s candor, minus the
                anonymity that breeds its toxicity.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
