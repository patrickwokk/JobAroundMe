import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { MajorCard } from "@/components/major-card";
import { LabCard } from "@/components/lab-card";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { WordRotor } from "@/components/word-rotor";
import { WelcomeBack } from "@/components/welcome-back";
import { MajorPicker } from "@/components/major-picker";
import { Rings } from "@/components/rings";
import { TYPE_LABEL } from "@/components/job-row";
import { ArrowRight, ArrowUpRight, Bolt, Bookmark, Compass, Flask, Mail, Signal, Users } from "@/components/icons";
import { CLUBS, HIRING_SIGNAL_LABS, LIVE_LABS, META, VISIBLE_JOBS, majorCounts } from "@/lib/data";
import { MAJOR_GROUPS } from "@/lib/majors";
import { TRACKS } from "@/lib/tracks";
import { fmtDate } from "@/lib/format";
import { ui } from "@/lib/ui";

const STEPS = [
  {
    Icon: Compass,
    title: "Tell Jam what you study",
    copy: "Pick your major or a career goal. Everything narrows to the work that builds your resume.",
  },
  {
    Icon: Bookmark,
    title: "Save what fits",
    copy: "Bookmark listings right on your device. No account, no login, nothing to sign up for.",
  },
  {
    Icon: Mail,
    title: "Apply at the source",
    copy: "Every listing links to the official posting. For research labs, Jam drafts the email to the professor.",
  },
];

export default function HomePage() {
  const fresh = VISIBLE_JOBS.filter((j) => !j.evergreen).slice(0, 4);
  const teaserLabs = HIRING_SIGNAL_LABS.slice(0, 3);

  return (
    <>
      {/* ————— Hero ————— */}
      <section className="relative overflow-hidden border-b border-line">
        {/* Phones: only the outer arcs peek from the corner. Desktop: centered behind the board preview. */}
        <Rings className="pointer-events-none absolute -right-[30rem] -top-[34rem] size-[56rem] text-line [mask-image:radial-gradient(circle,black_35%,transparent_72%)] lg:-right-40 lg:-top-80" />
        {/* minmax(0,…) so a long truncated listing title can't widen its column past the viewport */}
        <div className={`${ui.container} relative grid gap-14 pb-16 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:items-center lg:gap-12 lg:pb-24`}>
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-2.5 pr-3 text-xs font-medium text-fg-muted shadow-[var(--elev-1)]">
              <span className="pulse-dot size-1.5 rounded-full bg-ok" aria-hidden />
              Updated {fmtDate(META.lastRefreshed)} · {META.counts.openJobs} open listings
            </p>

            <h1 className="mt-6 text-[clamp(2.75rem,6.2vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.04em]">
              Work that
              <br />
              <span className="font-serif font-medium italic tracking-[-0.02em] text-accent">
                <WordRotor words={["counts.", "pays.", "publishes.", "compounds.", "gets you hired."]} />
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
              <span className="font-semibold text-fg">Jam</span> — Job Around Me — brings together the campus jobs,
              professor-led research labs, clubs and Northwest Arkansas internships that build a real resume. Verified
              daily, sorted by your major, free for every U of A student.
            </p>

            <MajorPicker />

            <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link href="/jobs" className="group inline-flex items-center gap-1 font-medium text-fg-muted hover:text-fg">
                Browse all jobs <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/labs" className="group inline-flex items-center gap-1 font-medium text-fg-muted hover:text-fg">
                Explore research labs <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </p>
            <WelcomeBack />
          </div>

          {/* Live board preview — real listings, rendered like the product it is */}
          <div className="relative min-w-0 lg:pl-4">
            <div className={`${ui.card} overflow-hidden shadow-[var(--elev-2)]`}>
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <p className="text-sm font-semibold">Fresh on Jam</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ok">
                  <span className="size-1.5 rounded-full bg-ok" aria-hidden />
                  Verified {fmtDate(META.lastRefreshed)}
                </span>
              </div>
              <ul className="divide-y divide-line">
                {fresh.map((j) => (
                  <li key={j.id}>
                    <a
                      href={j.applyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-subtle"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{j.title}</span>
                        <span className="block truncate text-xs text-fg-subtle">
                          {j.org} · {j.location}
                        </span>
                      </span>
                      <span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-xs font-medium tabular-nums text-fg-muted">
                        {j.pay ?? TYPE_LABEL[j.type]}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              {/* Right-aligned: the floating labs card overlaps this row's left side on wide screens. */}
              <Link
                href="/jobs"
                className="flex items-center justify-end gap-1.5 border-t border-line bg-subtle px-5 py-3 text-sm font-medium text-accent transition-colors hover:bg-muted"
              >
                See all {VISIBLE_JOBS.length} listings <ArrowRight className="size-4" />
              </Link>
            </div>
            <Link
              href="/labs"
              className={`${ui.card} absolute -bottom-7 -left-3 hidden items-center gap-3 py-3 pl-3 pr-4 shadow-[var(--elev-2)] transition-transform hover:-translate-y-0.5 sm:flex lg:-left-6`}
            >
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-brand-wash text-accent">
                <Flask className="size-[18px]" />
              </span>
              <span>
                <span className="block text-sm font-semibold tabular-nums">{HIRING_SIGNAL_LABS.length} labs recruiting</span>
                <span className="block text-xs text-fg-subtle">out of {LIVE_LABS.length} checked today</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ————— Numbers ————— */}
      <section className="border-b border-line bg-subtle">
        <dl className={`${ui.container} grid grid-cols-2 gap-y-8 py-10 sm:grid-cols-4`}>
          {[
            { n: META.counts.openJobs, label: "Open listings" },
            { n: LIVE_LABS.length, label: "Research labs indexed" },
            { n: CLUBS.length, label: "Career-building clubs" },
            { n: TRACKS.length, label: "Career track guides" },
          ].map((s) => (
            <div key={s.label} className="px-1">
              <dd className="text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
                <CountUp value={s.n} />
              </dd>
              <dt className="mt-1 text-sm text-fg-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* ————— Bento: the whole toolkit ————— */}
      <section className={`${ui.container} py-20`}>
        <Reveal>
          <SectionHeading
            kicker="Everything in one place"
            title="Five ways in. One goal: a resume with proof on it."
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4">
            <Link href="/jobs" className="group flex h-full flex-col rounded-2xl bg-night p-7 text-night-fg transition-transform hover:-translate-y-0.5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-night-muted">The board</p>
                  <h3 className="mt-1 text-2xl font-bold tracking-tight">Every opening, verified</h3>
                </div>
                <span className="rounded-full border border-night-line px-2.5 py-1 text-xs font-medium tabular-nums text-night-muted">
                  {META.counts.openJobs} open
                </span>
              </div>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-night-muted">
                On-campus, research and Northwest Arkansas roles from the U of A careers system plus hand-reviewed
                programs. Filled listings come down on their own.
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-night-line pt-5">
                {fresh.slice(0, 3).map((j) => (
                  <li key={j.id} className="flex items-baseline justify-between gap-4 text-sm">
                    <span className="truncate">{j.title}</span>
                    <span className="shrink-0 text-xs tabular-nums text-night-muted">{j.pay ?? "On campus"}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold">
                Browse jobs <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </p>
            </Link>
          </Reveal>

          <Reveal className="md:col-span-2" delay={80}>
            <Link href="/labs" className="group flex h-full flex-col rounded-2xl bg-brand p-7 text-white transition-transform hover:-translate-y-0.5">
              <Flask className="size-6" />
              <h3 className="mt-5 text-2xl font-bold tracking-tight">The unlisted market</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                {LIVE_LABS.length} professor-led labs, checked daily — {HIRING_SIGNAL_LABS.length} signalling they
                recruit. Jam drafts the intro email in 30 seconds.
              </p>
              <p className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold">
                Find a lab <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </p>
            </Link>
          </Reveal>

          {[
            {
              href: "/tracks",
              Icon: Compass,
              title: "Career tracks",
              copy: "Pick the destination — finance, software, medicine — and get a four-year plan from Fayetteville.",
              cta: `All ${TRACKS.length} tracks`,
            },
            {
              href: "/clubs",
              Icon: Users,
              title: "Clubs that open doors",
              copy: `${CLUBS.length} organizations where internships and research spots circulate before they're posted.`,
              cta: "Explore clubs",
            },
          ].map((tile, i) => (
            <Reveal key={tile.href} className="md:col-span-2" delay={i * 80}>
              <Link href={tile.href} className={`group flex h-full flex-col p-7 ${ui.card} ${ui.cardHover} rounded-2xl`}>
                <tile.Icon className="size-6 text-accent" />
                <h3 className="mt-5 text-xl font-bold tracking-tight">{tile.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{tile.copy}</p>
                <p className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-accent">
                  {tile.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </p>
              </Link>
            </Reveal>
          ))}

          <Reveal className="md:col-span-2" delay={160}>
            <Link href="/connect" className="group flex h-full flex-col rounded-2xl bg-night p-7 text-night-fg transition-transform hover:-translate-y-0.5">
              <Signal className="size-6 text-accent" />
              <h3 className="mt-5 text-xl font-bold tracking-tight">Referral Board</h3>
              <p className="mt-2 text-sm leading-relaxed text-night-muted">
                Students, interns and alumni trading intros and referrals. Referrals beat resumes.
              </p>
              <p className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold">
                Connect <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </p>
            </Link>
          </Reveal>

          <Reveal className="md:col-span-6">
            <Link
              href="/how-it-works"
              className={`group flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl px-6 py-5 ${ui.card} ${ui.cardHover}`}
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold">
                <Bolt className="size-4 text-accent" /> The freshness promise
              </span>
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-fg-muted">
                <span className="font-medium text-ok">Verified daily</span>
                <span className="text-fg-subtle">→</span>
                <span className="font-medium text-warn">flagged after 4 days unseen</span>
                <span className="text-fg-subtle">→</span>
                <span>removed after 14</span>
                <span className="text-fg-subtle">→</span>
                <span className="font-medium text-accent">reported filled? gone the same day</span>
              </span>
              <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-fg-muted group-hover:text-fg">
                How it works <ArrowRight className="size-4" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ————— How it works ————— */}
      <section className="border-y border-line bg-subtle">
        <div className={`${ui.container} py-20`}>
          <Reveal>
            <SectionHeading kicker="How Jam works" title="Three steps. No account." />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div className={`h-full p-6 ${ui.card}`}>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-wash text-accent">
                      <step.Icon className="size-5" />
                    </span>
                    <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Majors ————— */}
      <section id="majors" className={`${ui.container} scroll-mt-20 py-20`}>
        <Reveal>
          <SectionHeading
            kicker="Start with your major"
            title="Jobs, labs and clubs — sorted by what you study"
            aside={
              <Link href="/jobs" className="inline-flex items-center gap-1 font-medium text-accent hover:underline">
                Or browse everything <ArrowRight className="size-4" />
              </Link>
            }
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MAJOR_GROUPS.map((group, i) => (
            <Reveal key={group.slug} delay={(i % 4) * 50}>
              <MajorCard group={group} counts={majorCounts(group.slug)} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————— Tracks ————— */}
      <section className="border-y border-line bg-subtle">
        <div className={`${ui.container} py-20`}>
          <Reveal>
            <SectionHeading
              kicker="Or start from the destination"
              title="Where are you headed?"
              description="Each track lays out the four-year ladder of jobs, labs and clubs — from Fayetteville, specifically — that gets you there."
              aside={
                <Link href="/tracks" className="inline-flex items-center gap-1 font-medium text-accent hover:underline">
                  All {TRACKS.length} tracks <ArrowRight className="size-4" />
                </Link>
              }
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRACKS.slice(0, 6).map((track, i) => (
              <Reveal key={track.slug} delay={(i % 3) * 60}>
                <Link href={`/tracks/${track.slug}`} className={`group block h-full p-5 ${ui.card} ${ui.cardHover}`}>
                  <h3 className="flex items-center justify-between gap-3 text-lg font-semibold tracking-tight">
                    {track.name}
                    <ArrowUpRight className="size-4 shrink-0 text-fg-subtle transition-colors group-hover:text-accent" />
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{track.role}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Labs ————— */}
      <section className={`${ui.container} py-20`}>
        <Reveal>
          <SectionHeading
            kicker="The hidden market"
            title="Professors don't post jobs. They answer emails."
            description={`Jam checks ${LIVE_LABS.length} lab websites every day. These are signalling that they recruit students right now.`}
            aside={
              <Link href="/labs" className="inline-flex items-center gap-1 font-medium text-accent hover:underline">
                Full lab directory <ArrowRight className="size-4" />
              </Link>
            }
          />
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teaserLabs.map((lab, i) => (
            <Reveal key={lab.id} delay={i * 70}>
              <LabCard lab={lab} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ————— Closing CTA ————— */}
      <section className={ui.container}>
        <div className="relative overflow-hidden rounded-3xl bg-night px-6 py-16 text-center text-night-fg sm:px-12 sm:py-20">
          <Rings className="pointer-events-none absolute left-1/2 top-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 text-night-line [mask-image:radial-gradient(circle,black_30%,transparent_70%)]" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-[-0.03em] sm:text-5xl">
              Your next resume line is closer than you think.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-night-muted">
              Five minutes on Jam this week beats five hours on a generic job site next semester.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/jobs" className={`${ui.btnPrimary} h-11 px-5`}>
                Browse jobs <ArrowRight className="size-4" />
              </Link>
              <Link href="/labs" className={`${ui.btnNight} h-11 px-5`}>
                Find a lab
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
