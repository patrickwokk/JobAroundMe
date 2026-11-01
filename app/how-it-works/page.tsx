import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/badge";
import { ArrowUpRight } from "@/components/icons";
import { LIVE_LABS, META } from "@/lib/data";
import { fmtDate } from "@/lib/format";
import { REPO_URL, suggestHref } from "@/lib/site";
import { ui } from "@/lib/ui";
import type { SourceHealth } from "@/lib/types";

export const metadata: Metadata = {
  title: "How it works",
  description: "Where Jam's listings come from, how freshness is verified daily, and how filled positions come off the board.",
};

const LIFECYCLE = [
  { state: "Open", tone: "ok" as const, copy: "Seen at its source on the latest daily refresh. Shown with a “Verified” badge." },
  { state: "Stale", tone: "warn" as const, copy: "Missing from its source for 4+ days. Still shown, flagged “Recheck.”" },
  { state: "Expired", tone: "neutral" as const, copy: "Missing for 14+ days. Removed from the board automatically." },
  { state: "Filled", tone: "accent" as const, copy: "Reported by a student or maintainer. Removed on the next refresh." },
];

const FAQ = [
  {
    q: "Is Jam an official University of Arkansas site?",
    a: "No. Jam is an independent project maintained by a member of the U of A community who wants students to find this work earlier. Every listing links to its original source — always apply there, and trust the source if the two ever disagree.",
  },
  {
    q: "Why not just use Handshake?",
    a: "You should — it's the official portal, and some on-campus jobs live only there (it requires your UARK login, so Jam can't index it). Jam adds what Handshake doesn't: the public careers feed in one clean view, the research-lab market that never posts openings, and a reviewed shortlist of Northwest Arkansas internships — with no login, sorted by major.",
  },
  {
    q: "Why isn't every listing tagged to a major?",
    a: "Tags come from each posting's own duties text. A ticket-office job genuinely fits anyone, so it's shown as “open to any major” rather than pretending to a precision it doesn't have. Labs and programs are tagged by hand.",
  },
  {
    q: "Does Jam cost anything or collect my data?",
    a: "No and no. There are no accounts, no ads and no tracking cookies. Saved listings stay on your device. See the privacy page for the details.",
  },
  {
    q: "A lab, club or program is missing. Can I add it?",
    a: "Please do — that's how the directory grows. Use “Suggest a listing” at the bottom of any page and it joins the daily checks.",
  },
];

function StatusRow({ name, detail, health }: { name: string; detail: string; health?: SourceHealth }) {
  const ok = health?.ok ?? true;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-fg-subtle">{detail}</p>
      </div>
      <Badge tone={ok ? "ok" : "warn"}>
        <span className={`size-1.5 rounded-full ${ok ? "bg-ok" : "bg-warn"}`} aria-hidden />
        {ok ? "Operational" : "Degraded"}
      </Badge>
    </div>
  );
}

export default function HowItWorksPage() {
  const s = META.sources;
  const suggest = suggestHref();
  return (
    <>
      <PageHeader
        kicker="How it works"
        title="Boring plumbing, honest board"
        lede={`A job board is only as good as its worst listing. Here's exactly where everything comes from and how dead listings come down. Last refresh: ${fmtDate(META.lastRefreshed)}.`}
      />

      <div className={`${ui.container} py-12`}>
        <section>
          <SectionHeading kicker="System status" title="Checked every morning" />
          <div className={`divide-y divide-line ${ui.card}`}>
            <StatusRow
              name="U of A careers feed"
              detail={s ? `${s.workday.count} student-holdable postings found on the latest run` : "Scraped daily"}
              health={s?.workday}
            />
            <StatusRow
              name="Curated program links"
              detail={s ? `${s.programs.count} of ${s.programs.total} links verified` : "Verified daily"}
              health={s?.programs}
            />
            <StatusRow
              name="Research lab sites"
              detail={s ? `${s.labs.count} of ${s.labs.total} reachable today · ${LIVE_LABS.length} listed` : "Probed daily"}
              health={s?.labs}
            />
          </div>
        </section>

        <section className="mt-16">
          <SectionHeading kicker="Sources" title="Three sources, one board" />
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                tag: "Scraped daily",
                title: "U of A careers feed",
                copy: "The university posts hourly, extra-help and part-time openings on its public careers site. Jam pulls every Fayetteville posting, keeps the ones a current student could hold, tags majors from the duties text, and links you to the official application.",
              },
              {
                tag: "Probed daily",
                title: "Professor lab sites",
                copy: "Labs don't post jobs, so Jam keeps a directory of their scattered websites. Each day it confirms every site is reachable, reads its latest post, and looks for recruiting language like “join the lab” or “positions available.”",
              },
              {
                tag: "Reviewed by hand",
                title: "NWA programs & campus staples",
                copy: "Standing internship programs (Walmart, J.B. Hunt, Tyson, Garver, Crystal Bridges…) and evergreen campus doors. Every link is re-checked daily; the descriptions are written and pruned by a person.",
              },
            ].map((c) => (
              <div key={c.title} className={`p-6 ${ui.card}`}>
                <p className="text-xs font-semibold text-accent">{c.tag}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{c.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <SectionHeading kicker="Lifecycle" title="How a listing comes down" description="The answer to “is this still open?”" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LIFECYCLE.map((step, i) => (
              <div key={step.state} className={`p-5 ${ui.card}`}>
                <div className="flex items-center justify-between">
                  <Badge tone={step.tone}>{step.state}</Badge>
                  <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{step.copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 max-w-3xl space-y-3 text-sm leading-relaxed text-fg-muted">
            <p>
              <strong className="font-semibold text-fg">Scraped postings expire themselves.</strong> When the university
              takes a posting down, the next refresh notices. Four days unseen → flagged. Fourteen → gone.
            </p>
            <p>
              <strong className="font-semibold text-fg">Standing programs are re-verified daily</strong> and pruned by
              hand when a program ends.
            </p>
            <p>
              <strong className="font-semibold text-fg">Anyone can flag a filled listing.</strong> Every listing has a
              “Report filled” link; confirmed reports come off the board on the next refresh.
            </p>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading kicker="About Jam" title="Why this exists" />
            <div className="space-y-3 text-sm leading-relaxed text-fg-muted">
              <p>
                Students at the University of Arkansas are surrounded by resume-building work — campus jobs, funded
                research labs, and some of the most sought-after internship programs in the country, all within a
                30-minute drive. Most of it is scattered across dozens of sites, and the best of it is never posted at
                all.
              </p>
              <p>
                Jam — Job Around Me — puts it in one place. It&apos;s built and maintained independently by a member of
                the U of A community, and it&apos;s free for students, permanently.
              </p>
            </div>
          </div>
          <div>
            <SectionHeading kicker="FAQ" title="Questions, answered" />
            <div className={`divide-y divide-line ${ui.card}`}>
              {FAQ.map((item) => (
                <details key={item.q} className="group px-5 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
                    {item.q}
                    <span className="text-lg leading-none text-fg-subtle transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          {suggest ? (
            <a href={suggest} target="_blank" rel="noreferrer" className={ui.btnPrimary}>
              Suggest a listing <ArrowUpRight className="size-4" />
            </a>
          ) : null}
          <Link href="/privacy" className={ui.btnSecondary}>
            Privacy
          </Link>
          {REPO_URL ? (
            <a href={REPO_URL} target="_blank" rel="noreferrer" className={ui.btnSecondary}>
              Open source <ArrowUpRight className="size-4" />
            </a>
          ) : null}
        </div>
      </div>
    </>
  );
}
