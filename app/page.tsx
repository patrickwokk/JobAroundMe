import Link from "next/link";
import { Ticker } from "@/components/ticker";
import { SectionHeading } from "@/components/section-heading";
import { MajorCard } from "@/components/major-card";
import { JobRow } from "@/components/job-row";
import { LabCard } from "@/components/lab-card";
import { ArrowUpRight, Bolt, Briefcase, Building, Flask } from "@/components/icons";
import { HIRING_SIGNAL_LABS, LIVE_LABS, META, VISIBLE_JOBS, majorCounts } from "@/lib/data";
import { MAJOR_GROUPS } from "@/lib/majors";
import { TRACKS } from "@/lib/tracks";
import { fmtDate } from "@/lib/format";

export default function HomePage() {
  const freshPostings = VISIBLE_JOBS.filter((j) => !j.evergreen).slice(0, 5);
  const teaserLabs = HIRING_SIGNAL_LABS.slice(0, 3);

  return (
    <>
      <Ticker />

      {/* ————— Hero ————— */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <p className="kicker">University of Arkansas · Fayetteville</p>
            <h1 className="font-display mt-4 text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Work that <span className="italic text-cardinal">counts</span>
              <span className="text-cardinal">.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Campus jobs, professor-led research labs, and Northwest Arkansas internships
              that actually build your resume — verified on a schedule, sorted by your major.
              No barista shifts. No login. No noise.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 bg-cardinal px-5 py-3 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:bg-cardinal-deep"
              >
                Browse the listings <ArrowUpRight className="size-4" />
              </Link>
              <a
                href="#majors"
                className="inline-flex items-center gap-2 border border-ink px-5 py-3 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-ink hover:text-paper"
              >
                Start with your major
              </a>
            </div>
          </div>

          <aside className="border-2 border-ink bg-paper-2 p-6" aria-label="Today's numbers">
            <p className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">
              The board · {fmtDate(META.lastRefreshed)}
            </p>
            <dl className="mt-4 space-y-4">
              <div className="flex items-baseline justify-between border-b border-line pb-4">
                <dt className="text-sm text-ink-soft">Open listings</dt>
                <dd className="font-display text-4xl font-black">{META.counts.openJobs}</dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-line pb-4">
                <dt className="text-sm text-ink-soft">Research lab sites</dt>
                <dd className="font-display text-4xl font-black">{LIVE_LABS.length}</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-sm text-ink-soft">Labs showing recruiting signals</dt>
                <dd className="font-display text-4xl font-black text-cardinal">{HIRING_SIGNAL_LABS.length}</dd>
              </div>
            </dl>
            <p className="mt-5 text-xs leading-relaxed text-ink-faint">
              Sources: the U of A careers feed, {LIVE_LABS.length} lab websites, and a
              hand-reviewed NWA internship list. Filled listings sweep off automatically.
            </p>
          </aside>
        </div>
      </section>

      {/* ————— Majors ————— */}
      <section id="majors" className="mx-auto max-w-6xl scroll-mt-8 px-4 py-16 sm:px-6">
        <SectionHeading
          kicker="No. 1 — Start here"
          title={
            <>
              What do you <span className="italic text-cardinal">study</span>?
            </>
          }
          aside={<span>Each page pairs jobs with labs in your field</span>}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MAJOR_GROUPS.map((group, i) => (
            <MajorCard key={group.slug} group={group} index={i} counts={majorCounts(group.slug)} />
          ))}
        </div>
      </section>

      {/* ————— Career tracks ————— */}
      <section className="border-t border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            kicker="No. 2 — Or start from the ending"
            title={
              <>
                Where are you <span className="italic text-cardinal">headed</span>?
              </>
            }
            aside={
              <Link href="/tracks" className="link-sweep inline-flex items-center gap-1 font-medium text-cardinal">
                All {TRACKS.length} tracks <ArrowUpRight className="size-4" />
              </Link>
            }
          />
          <p className="-mt-2 mb-8 max-w-2xl text-sm leading-relaxed text-ink-soft">
            Wall Street. Big tech. Med school. Each track lays out the four-year ladder of
            jobs, labs and clubs — from Fayetteville, specifically — that gets you there.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRACKS.slice(0, 6).map((track) => (
              <Link
                key={track.slug}
                href={`/tracks/${track.slug}`}
                className="lift group border border-line bg-paper p-5 hover:border-line-strong"
              >
                <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">{track.role}</p>
                <h3 className="font-display mt-2 text-xl font-black tracking-tight">
                  {track.name}
                  <ArrowUpRight className="ml-1.5 inline size-4 text-cardinal opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Three doors ————— */}
      <section className="border-y-2 border-ink bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="kicker">No. 3 — Three doors in</p>
          <h2 className="font-display mt-2 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
            Every opportunity here fits one of three shapes.
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden border border-paper/20 bg-paper/20 sm:grid-cols-3">
            {[
              {
                icon: Briefcase,
                title: "On-campus paychecks",
                copy: "Extra help, part-time and work-study jobs inside university departments — scraped straight from the U of A careers system, built around class schedules.",
                stat: `${META.counts.onCampus} listings`,
                href: "/jobs?where=on-campus",
              },
              {
                icon: Flask,
                title: "Professor-led labs",
                copy: "Most research jobs are never posted — you email the professor. We keep a campus-wide directory of lab sites, and help you write that email.",
                stat: `${LIVE_LABS.length} labs`,
                href: "/labs",
              },
              {
                icon: Building,
                title: "NWA internships",
                copy: "Walmart, J.B. Hunt, Tyson, Garver, museums and startups — a hand-reviewed shortlist of internship programs within a 30-minute drive of campus.",
                stat: `${META.counts.nwa} programs`,
                href: "/jobs?where=nwa",
              },
            ].map((door) => (
              <Link key={door.title} href={door.href} className="group bg-ink p-7 transition-colors hover:bg-cardinal-deep">
                <door.icon className="size-6 text-cardinal group-hover:text-paper" />
                <h3 className="font-display mt-4 text-xl font-bold">{door.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/70">{door.copy}</p>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-wider text-paper/90">
                  {door.stat} <ArrowUpRight className="ml-1 inline size-3.5" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Fresh postings ————— */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          kicker="No. 4 — Fresh off the feed"
          title="Newest campus postings"
          aside={
            <Link href="/jobs" className="link-sweep inline-flex items-center gap-1 font-medium text-cardinal">
              All {VISIBLE_JOBS.length} listings <ArrowUpRight className="size-4" />
            </Link>
          }
        />
        <div className="border-t border-line">
          {freshPostings.map((job) => (
            <JobRow key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* ————— Labs teaser ————— */}
      <section className="border-t border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <SectionHeading
            kicker="No. 5 — The hidden market"
            title={
              <>
                Professors don&apos;t post jobs. <span className="italic text-cardinal">They answer emails.</span>
              </>
            }
            aside={
              <Link href="/labs" className="link-sweep inline-flex items-center gap-1 font-medium text-cardinal">
                Full directory <ArrowUpRight className="size-4" />
              </Link>
            }
          />
          <p className="-mt-2 mb-8 max-w-2xl text-sm leading-relaxed text-ink-soft">
            These {LIVE_LABS.length} lab sites are checked on every refresh — the ones below are
            currently signalling that they recruit students. Use <em>Draft intro</em> to
            generate a professional first email in thirty seconds.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teaserLabs.map((lab) => (
              <LabCard key={lab.id} lab={lab} />
            ))}
          </div>
        </div>
      </section>

      {/* ————— Freshness promise ————— */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 border-2 border-ink bg-paper p-7 sm:grid-cols-[auto_1fr] sm:p-9">
          <Bolt className="size-8 text-cardinal" />
          <div>
            <h2 className="font-display text-2xl font-black tracking-tight sm:text-3xl">
              Dead listings are the enemy.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
              Every refresh re-checks every source. A posting that disappears from the U of A feed
              gets flagged within days and swept off within two weeks — and anyone can report a
              filled position with one click. Last sweep: {fmtDate(META.lastRefreshed)}.
            </p>
            <Link
              href="/how-it-works"
              className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-cardinal hover:underline"
            >
              How listings stay honest <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
