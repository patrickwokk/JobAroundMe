import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { ArrowUpRight, Check } from "@/components/icons";
import { LIVE_LABS, META } from "@/lib/data";
import { MAJOR_GROUPS } from "@/lib/majors";
import { TRACKS } from "@/lib/tracks";
import { REPO_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "For Employers",
  description:
    "Reach University of Arkansas students where they actually look for meaningful work — featured listings and sponsored career tracks for NWA employers.",
};

const EMPLOYER_INQUIRY_URL = `${REPO_URL}/issues/new?template=employer-inquiry.yml`;

const OFFERS = [
  {
    name: "Featured listing",
    what: "Your internship or student role pinned at the top of the relevant major pages, clearly labeled, for a semester.",
    fit: "Right for one open role you need strong applicants for.",
  },
  {
    name: "Sponsored career track",
    what: "“The Supply Chain track, presented by ___” — your brand on the guide students read when deciding what to become. Content stays independent.",
    fit: "Right for building a durable pipeline, not filling one seat.",
  },
  {
    name: "Referral-drive sponsor",
    what: "Back the August and January referral pushes on the Connect board — the two weeks a year when every student is looking at once.",
    fit: "Right for brand presence with the most motivated cohort.",
  },
];

export default function EmployersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="kicker">For Employers</p>
      <h1 className="font-display mt-2 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
        Hire the students who did the work<span className="text-cardinal">.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
        JobAroundMe is where University of Arkansas students look for work that builds a
        resume — campus jobs, research labs, and Northwest Arkansas internships, organized by
        major and career goal. If you hire students or interns in NWA, this is your audience,
        pre-filtered for ambition.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-px border-2 border-ink bg-line sm:grid-cols-4">
        {[
          { n: String(MAJOR_GROUPS.length), label: "major groups covered" },
          { n: String(TRACKS.length), label: "career-track guides" },
          { n: String(LIVE_LABS.length), label: "research labs indexed" },
          { n: "Daily", label: "listing refresh cadence" },
        ].map((s) => (
          <div key={s.label} className="bg-paper px-4 py-5">
            <p className="font-display text-3xl font-black">{s.n}</p>
            <p className="mt-1 text-xs text-ink-soft">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="mt-14">
        <SectionHeading kicker="What's on offer" title="Placement, not ads" />
        <div className="grid gap-4 lg:grid-cols-3">
          {OFFERS.map((o, i) => (
            <div key={o.name} className="flex flex-col border border-line bg-paper p-6">
              <p className="font-display text-3xl font-black text-cardinal">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="font-display mt-2 text-xl font-bold">{o.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{o.what}</p>
              <p className="mt-4 border-t border-line pt-3 text-xs italic text-ink-faint">{o.fit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-2 border-ink bg-paper-2 p-7 sm:p-9">
        <p className="kicker">The ground rules</p>
        <ul className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-ink-soft">
          {[
            "Students never pay and never see ads. Employers buy placement in front of students — never data about them.",
            "Everything sponsored is labeled. Trust is the product; we don't spend it.",
            "The meaning filter applies to paid listings too: if a role wouldn't strengthen a student's resume, money doesn't change the answer.",
            "Sponsorship revenue funds keeping the board free, fresh and independent.",
          ].map((line) => (
            <li key={line} className="flex gap-2.5">
              <Check className="mt-0.5 size-4 shrink-0 text-moss" />
              {line}
            </li>
          ))}
        </ul>
        <a
          href={EMPLOYER_INQUIRY_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex items-center gap-2 bg-cardinal px-5 py-3 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:bg-cardinal-deep"
        >
          Start an employer conversation <ArrowUpRight className="size-4" />
        </a>
        <p className="mt-3 text-xs text-ink-faint">
          Opens a short inquiry form — we&apos;ll follow up. Data refreshed {new Date(META.lastRefreshed).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/Chicago" })}.
        </p>
      </section>
    </div>
  );
}
