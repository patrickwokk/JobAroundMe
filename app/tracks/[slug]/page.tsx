import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JobRow } from "@/components/job-row";
import { LabCard } from "@/components/lab-card";
import { ClubCard } from "@/components/club-card";
import { SectionHeading } from "@/components/section-heading";
import { PageHeader } from "@/components/page-header";
import { ArrowRight } from "@/components/icons";
import { clubsForTrack, jobsForTrack, labsForTrack } from "@/lib/data";
import { majorName } from "@/lib/majors";
import { TRACK_BY_SLUG, TRACKS } from "@/lib/tracks";
import { ui } from "@/lib/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return TRACKS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const track = TRACK_BY_SLUG.get(slug);
  if (!track) return {};
  return {
    title: `${track.name} — career track`,
    description: `${track.role}: the four-year ladder of jobs, labs and clubs from Fayetteville.`,
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
    <>
      <PageHeader kicker="Career track" title={track.name} lede={track.hook}>
        <p className="mt-5 flex flex-wrap items-center gap-2 text-sm">
          <span className="font-medium text-fg">Destination:</span>
          <span className="text-fg-muted">{track.role}</span>
        </p>
      </PageHeader>

      <div className={`${ui.container} py-12`}>
        <div className={`p-6 sm:p-8 ${ui.card}`}>
          <p className={ui.kicker}>The honest read</p>
          <p className="mt-3 max-w-3xl leading-relaxed text-fg-muted">{track.reality}</p>
          <p className="mt-5 flex flex-wrap gap-2">
            {track.majors.map((m) => (
              <Link key={m} href={`/majors/${m}`} className={`${ui.chip} hover:border-line-strong hover:text-fg`}>
                {majorName(m)}
              </Link>
            ))}
          </p>
        </div>

        <section className="mt-16">
          <SectionHeading kicker="The ladder" title="Four years, four moves" />
          <ol className="grid gap-4 lg:grid-cols-4">
            {track.ladder.map((step, i) => (
              <li key={step.when} className={`relative flex flex-col p-5 ${ui.card}`}>
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm font-semibold">{step.when}</span>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-fg-muted">{step.what}</p>
                {step.links && step.links.length > 0 ? (
                  <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line pt-3">
                    {step.links.map((l) => (
                      <Link key={l.href} href={l.href} className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline">
                        {l.label} <ArrowRight className="size-3" />
                      </Link>
                    ))}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </section>

        {clubs.length > 0 ? (
          <section className="mt-16">
            <SectionHeading
              kicker="Step one is free"
              title="Clubs that feed this track"
              aside={
                <Link href="/clubs" className="inline-flex items-center gap-1 font-medium text-accent hover:underline">
                  All clubs <ArrowRight className="size-4" />
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

        <section className="mt-16">
          <SectionHeading
            kicker="Earn while you climb"
            title="Listings that fit this track"
            aside={
              <Link href="/jobs" className="inline-flex items-center gap-1 font-medium text-accent hover:underline">
                Full board <ArrowRight className="size-4" />
              </Link>
            }
          />
          {jobs.length > 0 ? (
            <div className="space-y-3">
              {jobs.map((job) => (
                <JobRow key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-line-strong px-6 py-10 text-sm text-fg-muted">
              No matching listings right now — the labs and clubs on this page are the move.
            </p>
          )}
        </section>

        {labs.length > 0 ? (
          <section className="mt-16">
            <SectionHeading
              kicker="The unlisted market"
              title="Labs on this path"
              aside={
                <Link href="/labs" className="inline-flex items-center gap-1 font-medium text-accent hover:underline">
                  Full directory <ArrowRight className="size-4" />
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
    </>
  );
}
