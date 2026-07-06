import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { ArrowUpRight } from "@/components/icons";
import { META } from "@/lib/data";
import { fmtDate } from "@/lib/format";
import { REPO_URL, suggestListingUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Where JobAroundMe listings come from, how freshness is verified, and how filled positions come off the board.",
};

const LIFECYCLE = [
  { state: "Open", tone: "border-moss text-moss", copy: "Seen at its source on the latest refresh. Shown with a “Verified” stamp." },
  { state: "Stale", tone: "border-amber-note text-amber-note", copy: "Missing from its source for 4+ days. Still shown, flagged “recheck”." },
  { state: "Expired", tone: "border-ink-faint text-ink-faint", copy: "Missing for 14+ days. Removed from the board automatically." },
  { state: "Filled", tone: "border-cardinal text-cardinal", copy: "Reported by a student or maintainer. Removed immediately via override." },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="kicker">How It Works</p>
      <h1 className="font-display mt-2 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
        Boring plumbing, honest board<span className="text-cardinal">.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
        A job board is only as good as its worst listing. Here is exactly where everything comes
        from and how dead listings get taken down. Last refresh: {fmtDate(META.lastRefreshed)}.
      </p>

      <section className="mt-14">
        <SectionHeading kicker="Part 1" title="Three sources, one board" />
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="border border-line bg-paper p-6">
            <p className="font-mono text-[11px] uppercase tracking-wider text-cardinal">Scraped · every refresh</p>
            <h3 className="font-display mt-2 text-xl font-bold">U of A careers feed</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              The university posts hourly, extra-help and part-time openings on its public Workday
              careers site. The pipeline pulls every Fayetteville posting, keeps the
              student-holdable ones, auto-tags majors from the duties text, and links you to the
              official application.
            </p>
          </div>
          <div className="border border-line bg-paper p-6">
            <p className="font-mono text-[11px] uppercase tracking-wider text-cardinal">Probed · every refresh</p>
            <h3 className="font-display mt-2 text-xl font-bold">Professor lab sites</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Labs don&apos;t post jobs — so we maintain a directory of their scattered websites
              (many on the university&apos;s WordPress network). Each refresh confirms every site is
              reachable, reads its latest post, and scans for recruiting language like
              &ldquo;join the lab&rdquo; or &ldquo;positions available.&rdquo;
            </p>
          </div>
          <div className="border border-line bg-paper p-6">
            <p className="font-mono text-[11px] uppercase tracking-wider text-cardinal">Curated · reviewed by hand</p>
            <h3 className="font-display mt-2 text-xl font-bold">NWA programs &amp; campus staples</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Standing internship programs (Walmart, J.B. Hunt, Tyson, Garver, Crystal Bridges…)
              and evergreen campus doors (RazorTemps, UREC, Handshake). Every URL is re-checked
              automatically; the descriptions are written and pruned by a human.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading
          kicker="Part 2"
          title={
            <>
              How a listing <span className="italic text-cardinal">comes down</span>
            </>
          }
          aside={<span>The answer to “is this still open?”</span>}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LIFECYCLE.map((step, i) => (
            <div key={step.state} className={`border-2 bg-paper p-5 ${step.tone.split(" ")[0]}`}>
              <p className="font-mono text-[11px] tracking-wider text-ink-faint">{String(i + 1).padStart(2, "0")}</p>
              <p className={`font-display mt-1 text-2xl font-black ${step.tone.split(" ")[1]}`}>{step.state}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.copy}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-3 border-l-2 border-cardinal pl-5 text-sm leading-relaxed text-ink-soft">
          <p>
            <strong className="text-ink">Scraped postings expire themselves.</strong> When the
            university takes a posting down, the next refresh notices it&apos;s missing. Four days
            unseen → flagged. Fourteen days → gone. No zombie listings.
          </p>
          <p>
            <strong className="text-ink">Standing programs don&apos;t expire</strong> — they&apos;re
            re-verified (URL reachable) on every refresh and pruned by hand when a program ends. When
            RevUnit shut down, it came off this list; that&apos;s the standard.
          </p>
          <p>
            <strong className="text-ink">Anyone can pull the fire alarm.</strong> Every listing has a
            “Report filled” link that opens a pre-filled GitHub issue. A maintainer adds one line to{" "}
            <code className="bg-paper-3 px-1 py-0.5 font-mono text-xs">data/overrides.json</code> and
            the listing disappears on the next build — overrides beat every other rule.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading kicker="Part 3" title="Frequently asked" />
        <div className="divide-y divide-line border-y border-line">
          {[
            {
              q: "Why not just use Handshake?",
              a: "You should — it's the official portal and some on-campus jobs only live there (it requires your UARK login, so we can't index it; we link to it instead). JobAroundMe adds what Handshake doesn't have: the public careers feed, the invisible research-lab market, and a filtered NWA shortlist — with no login, sorted by major.",
            },
            {
              q: "Why isn't every listing tagged to a major?",
              a: "Tags come from the posting's own duties text. A ticket-office job legitimately fits anyone, so it's shown as “open to any major” instead of pretending precision. Labs are tagged by hand.",
            },
            {
              q: "A professor's lab isn't here. Can I add it?",
              a: "Yes — that's the point. Suggest it with the link below (or a pull request to data/curated/labs.json) and it joins the automated checks.",
            },
            {
              q: "Is this an official University of Arkansas site?",
              a: "No. It's an independent student project. Every listing links to its original source — always apply there, and trust the source over this site if they ever disagree.",
            },
          ].map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 font-display text-lg font-bold tracking-tight">
                {item.q}
                <span className="font-mono text-sm text-cardinal transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={suggestListingUrl()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-cardinal px-5 py-3 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:bg-cardinal-deep"
          >
            Suggest a listing <ArrowUpRight className="size-4" />
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-ink px-5 py-3 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-ink hover:text-paper"
          >
            Read the source
          </a>
        </div>
      </section>
    </div>
  );
}
