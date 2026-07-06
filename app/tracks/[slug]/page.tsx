import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JobRow } from "@/components/job-row";
import { LabCard } from "@/components/lab-card";
import { ClubCard } from "@/components/club-card";
import { SectionHeading } from "@/components/section-heading";
import { ArrowUpRight } from "@/components/icons";
import { clubsForTrack, jobsForTrack, labsForTrack } from "@/lib/data";
import { majorName } from "@/lib/majors";
import { TRACK_BY_SLUG, TRACKS } from "@/lib/tracks";

export const dynamicParams = false;

export function generateStaticParams() {
  return TRACKS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const track = TRACK_BY_SLUG.get(slug);
  if (!track) return {};
  return {
    title: `${track.name} track`,
    description: `${track.role} — the four-year ladder of jobs, labs and clubs from Fayetteville.`,
  };
}

export default async function TrackPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const track = TRACK_BY_SLUG.get(slug);
  if (!track) notFound();

  const jobs = jobsForTrack(track).slice(0, 6);
  const labs = labsForTrack(track).slice(0, 6);
  const clubs = clubsForTrack(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="kicker">Career track</p>
      <h1 className="font-display mt-2 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
        <span className="italic text-cardinal">{track.name}</span>
      </h1>
      <p className="mt-2 font-mono text-xs uppercase tracking-wider text-ink-soft">{track.role}</p>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">{track.hook}</p>

      <div className="mt-8 border-2 border-ink bg-paper-2 p-6 sm:p-8">
        <p className="kicker">The honest read</p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink">{track.reality}</p>
        <p className="mt-4 flex flex-wrap gap-2">
          {track.majors.map((m) => (
            <Link
              key={m}
              href={`/majors/${m}`}
              className="border border-line bg-paper px-2.5 py-1 font-mono text-[11px] tracking-wide text-ink-soft hover:border-ink hover:text-ink"
            >
              {majorName(m)}
            </Link>
          ))}
        </p>
      </div>

      {/* The ladder */}
      <section className="mt-14">
        <SectionHeading kicker="The ladder" title="Four years, four moves" />
        <ol className="grid gap-4 lg:grid-cols-4">
          {track.ladder.map((step, i) => (
            <li key={step.when} className="relative border border-line bg-paper p-5">
              <p className="font-display text-3xl font-black text-cardinal">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-faint">{step.when}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.what}</p>
              {step.links && step.links.length > 0 ? (
                <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                  {step.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-cardinal hover:underline"
                    >
                      {l.label} <ArrowUpRight className="size-3" />
                    </Link>
                  ))}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      {clubs.length > 0 ? (
        <section className="mt-14">
          <SectionHeading
            kicker="Step one is free"
            title="Clubs that feed this track"
            aside={
              <Link href="/clubs" className="link-sweep inline-flex items-center gap-1 font-medium text-cardinal">
                All clubs <ArrowUpRight className="size-4" />
              </Link>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-14">
        <SectionHeading
          kicker="Earn while you climb"
          title="Listings that fit this track"
          aside={
            <Link href="/jobs" className="link-sweep inline-flex items-center gap-1 font-medium text-cardinal">
              Full board <ArrowUpRight className="size-4" />
            </Link>
          }
        />
        {jobs.length > 0 ? (
          <div className="border-t border-line">
            {jobs.map((job) => (
              <JobRow key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p className="border border-dashed border-line-strong px-6 py-10 text-sm text-ink-soft">
            No tagged listings at the moment — the labs and clubs below are the move.
          </p>
        )}
      </section>

      {labs.length > 0 ? (
        <section className="mt-14">
          <SectionHeading
            kicker="The unlisted market"
            title="Labs on this path"
            aside={
              <Link href="/labs" className="link-sweep inline-flex items-center gap-1 font-medium text-cardinal">
                Full directory <ArrowUpRight className="size-4" />
              </Link>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {labs.map((lab) => (
              <LabCard key={lab.id} lab={lab} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
