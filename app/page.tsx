import Link from "next/link";
import { Ticker } from "@/components/ticker";
import { SectionHeading } from "@/components/section-heading";
import { MajorCard } from "@/components/major-card";
import { JobRow } from "@/components/job-row";
import { LabCard } from "@/components/lab-card";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { WordRotor } from "@/components/word-rotor";
import { WelcomeBack } from "@/components/welcome-back";
import { ArrowUpRight, Bolt, Bookmark, Flask, Signal } from "@/components/icons";
import { CLUBS, HIRING_SIGNAL_LABS, LIVE_LABS, META, VISIBLE_JOBS, majorCounts } from "@/lib/data";
import { MAJOR_GROUPS } from "@/lib/majors";
import { TRACKS } from "@/lib/tracks";
import { fmtDate } from "@/lib/format";

export default function HomePage() {
  const freshPostings = VISIBLE_JOBS.filter((j) => !j.evergreen).slice(0, 5);
  const tickerTitles = freshPostings.slice(0, 3);
  const teaserLabs = HIRING_SIGNAL_LABS.slice(0, 3);

  return (
    <>
      <Ticker />

      {/* ————— Hero ————— */}
      <section className="grain relative overflow-hidden border-b border-line">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-24">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-moss">
              <span className="pulse-dot size-1.5 rounded-full bg-moss" aria-hidden />
              Live — refreshed daily
            </span>
            <span className="kicker">University of Arkansas · Fayetteville</span>
          </div>

          <h1 className="font-display mt-7 text-[clamp(3.4rem,9.5vw,7.75rem)] font-black leading-[0.98] tracking-tight">
            Work that
            <br />
            <span className="italic text-cardinal">
              <WordRotor words={["counts.", "compounds.", "publishes.", "pays.", "refers."]} />
            </span>
          </h1>

          <div className="mt-9 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
                Campus jobs, professor-led labs, clubs, and Northwest Arkansas internships that
                actually build a resume — verified on a schedule, sorted by your major and where
                you&apos;re headed. No barista shifts. No login. No noise.
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
              <WelcomeBack />
            </div>

            <div className="border-l-2 border-cardinal pl-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                Fresh off the feed · {fmtDate(META.lastRefreshed)}
              </p>
              <ul className="mt-3 space-y-2.5">
                {tickerTitles.map((j) => (
                  <li key={j.id} className="text-sm leading-snug">
                    <span className="font-medium">{j.title}</span>
                    {j.pay ? <span className="font-mono text-xs text-moss"> · {j.pay}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <dl className="mt-14 grid grid-cols-3 divide-x divide-line border-y-2 border-ink">
            {[
              { n: META.counts.openJobs, label: "open listings, verified" },
              { n: LIVE_LABS.length, label: "research lab sites probed" },
              { n: HIRING_SIGNAL_LABS.length, label: "labs signalling they recruit" },
            ].map((s) => (
              <div key={s.label} className="px-4 py-6 text-center sm:text-left">
                <dd className="font-display text-4xl font-black sm:text-5xl">
                  <CountUp value={s.n} />
                </dd>
                <dt className="mt-1 text-xs text-ink-soft">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ————— Bento: the whole board ————— */}
      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <SectionHeading
              kicker="No. 1 — The whole board"
              title={
                <>
                  Five tools. One goal: a resume with <span className="italic text-cardinal">proof</span> on it.
                </>
              }
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-6">
            <Reveal className="md:col-span-4">
              <Link href="/jobs" className="lift group flex h-full flex-col bg-ink p-7 text-paper">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl font-black tracking-tight">The Listings</h3>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-paper/60">
                    {META.counts.openJobs} open
                  </span>
                </div>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-paper/70">
                  Scraped from the U of A careers feed and hand-curated NWA programs. Dead
                  listings sweep themselves off.
                </p>
                <ul className="mt-5 space-y-2 border-t border-paper/15 pt-4">
                  {freshPostings.slice(0, 3).map((j) => (
                    <li key={j.id} className="flex items-baseline justify-between gap-4 text-sm">
                      <span className="truncate">{j.title}</span>
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-paper/50">
                        {j.pay ?? "on campus"}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-5 font-mono text-[11px] uppercase tracking-wider text-cardinal-wash">
                  Open the board <ArrowUpRight className="ml-1 inline size-3.5" />
                </p>
              </Link>
            </Reveal>

            <Reveal className="md:col-span-2" delay={80}>
              <Link href="/labs" className="lift group flex h-full flex-col bg-cardinal p-7 text-paper">
                <Flask className="size-6" />
                <h3 className="font-display mt-4 text-2xl font-black tracking-tight">The Labs</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/85">
                  {LIVE_LABS.length} professor-led lab sites, probed on every refresh.{" "}
                  {HIRING_SIGNAL_LABS.length} are signalling they recruit students right now.
                </p>
                <p className="mt-auto pt-5 font-mono text-[11px] uppercase tracking-wider">
                  Draft an intro email in 30s <ArrowUpRight className="ml-1 inline size-3.5" />
                </p>
              </Link>
            </Reveal>

            <Reveal className="md:col-span-2">
              <Link href="/tracks" className="lift group flex h-full flex-col border border-line bg-paper p-7">
                <h3 className="font-display text-2xl font-black tracking-tight">The Tracks</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Destination-first: pick the career, get the four-year ladder.
                </p>
                <p className="mt-4 flex flex-wrap gap-1.5">
                  {TRACKS.slice(0, 4).map((t) => (
                    <span key={t.slug} className="border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                      {t.name}
                    </span>
                  ))}
                </p>
                <p className="mt-auto pt-5 font-mono text-[11px] uppercase tracking-wider text-cardinal">
                  All {TRACKS.length} tracks <ArrowUpRight className="ml-1 inline size-3.5" />
                </p>
              </Link>
            </Reveal>

            <Reveal className="md:col-span-2" delay={80}>
              <Link href="/clubs" className="lift group flex h-full flex-col border border-line bg-paper p-7">
                <h3 className="font-display text-2xl font-black tracking-tight">The Clubs</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {CLUBS.length} organizations where internships circulate before they&apos;re posted —
                  tagged by major.
                </p>
                <p className="mt-auto pt-5 font-mono text-[11px] uppercase tracking-wider text-cardinal">
                  Join momentum <ArrowUpRight className="ml-1 inline size-3.5" />
                </p>
              </Link>
            </Reveal>

            <Reveal className="md:col-span-2" delay={160}>
              <Link href="/connect" className="lift group flex h-full flex-col bg-ink p-7 text-paper">
                <Signal className="size-6 text-cardinal" />
                <h3 className="font-display mt-4 text-2xl font-black tracking-tight">Connect</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/70">
                  The Referral Board: students and NWA insiders trading intros and referrals.
                </p>
                <p className="mt-auto pt-5 font-mono text-[11px] uppercase tracking-wider text-cardinal-wash">
                  Referrals beat resumes <ArrowUpRight className="ml-1 inline size-3.5" />
                </p>
              </Link>
            </Reveal>

            <Reveal className="md:col-span-6">
              <Link
                href="/how-it-works"
                className="lift group flex flex-wrap items-center gap-x-8 gap-y-3 border-2 border-ink bg-paper px-7 py-5"
              >
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
                  <Bolt className="size-4 text-cardinal" /> The freshness contract
                </span>
                <span className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
                  <span className="text-moss">Open</span> →
                  <span className="text-amber-note">Stale after 4 days unseen</span> →
                  <span className="text-ink-faint">Swept after 14</span> →
                  <span className="text-cardinal">Reported filled? Gone same day</span>
                </span>
                <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-cardinal">
                  How it works <ArrowUpRight className="ml-1 inline size-3.5" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ————— Majors ————— */}
      <section id="majors" className="mx-auto max-w-6xl scroll-mt-8 px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading
            kicker="No. 2 — Start here"
            title={
              <>
                What do you <span className="italic text-cardinal">study</span>?
              </>
            }
            aside={<span>Each page pairs jobs with labs and clubs in your field</span>}
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MAJOR_GROUPS.map((group, i) => (
            <Reveal key={group.slug} delay={(i % 4) * 60}>
              <MajorCard group={group} index={i} counts={majorCounts(group.slug)} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————— Tracks strip ————— */}
      <section className="border-t border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <SectionHeading
              kicker="No. 3 — Or start from the ending"
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
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRACKS.slice(0, 6).map((track, i) => (
              <Reveal key={track.slug} delay={(i % 3) * 70}>
                <Link
                  href={`/tracks/${track.slug}`}
                  className="lift group block border border-line bg-paper p-5 hover:border-line-strong"
                >
                  <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">{track.role}</p>
                  <h3 className="font-display mt-2 text-xl font-black tracking-tight">
                    {track.name}
                    <ArrowUpRight className="ml-1.5 inline size-4 text-cardinal opacity-0 transition-opacity group-hover:opacity-100" />
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Fresh postings ————— */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading
            kicker="No. 4 — Fresh off the feed"
            title="Newest campus postings"
            aside={
              <span className="inline-flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                  <Bookmark className="size-3.5" /> Save any of them — no account
                </span>
                <Link href="/jobs" className="link-sweep inline-flex items-center gap-1 font-medium text-cardinal">
                  All {VISIBLE_JOBS.length} listings <ArrowUpRight className="size-4" />
                </Link>
              </span>
            }
          />
        </Reveal>
        <Reveal>
          <div className="border-t border-line">
            {freshPostings.map((job) => (
              <JobRow key={job.id} job={job} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ————— Labs teaser ————— */}
      <section className="border-t border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
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
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teaserLabs.map((lab, i) => (
              <Reveal key={lab.id} delay={(i % 3) * 70}>
                <LabCard lab={lab} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Giant CTA ————— */}
      <section className="grain border-t-2 border-ink bg-ink py-20 sm:py-28">
        <Link
          href="/jobs"
          className="text-outline-paper font-display block px-4 text-center text-[clamp(2.6rem,8vw,6.75rem)] font-black leading-none tracking-tight"
        >
          Find work that counts.
        </Link>
        <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-wider text-paper/50">
          Free for students, forever · refreshed every morning
        </p>
      </section>
    </>
  );
}
