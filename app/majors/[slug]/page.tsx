import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JobRow } from "@/components/job-row";
import { LabCard } from "@/components/lab-card";
import { ClubCard } from "@/components/club-card";
import { RememberMajor } from "@/components/remember-major";
import { SectionHeading } from "@/components/section-heading";
import { PageHeader } from "@/components/page-header";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { ANY_MAJOR_JOBS, clubsForMajor, jobsTaggedFor, labsForMajor } from "@/lib/data";
import { MAJOR_BY_SLUG, MAJOR_GROUPS } from "@/lib/majors";
import { TRACKS } from "@/lib/tracks";
import { ui } from "@/lib/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return MAJOR_GROUPS.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const group = MAJOR_BY_SLUG.get(slug);
  if (!group) return {};
  return {
    title: `${group.name} — jobs, labs & clubs`,
    description: `Campus jobs, research labs, clubs and NWA internships for ${group.name} students at the University of Arkansas.`,
  };
}

export default async function MajorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const group = MAJOR_BY_SLUG.get(slug);
  if (!group) notFound();

  const jobs = jobsTaggedFor(slug);
  const labs = labsForMajor(slug);
  const clubs = clubsForMajor(slug);
  const tracks = TRACKS.filter((t) => t.majors.includes(slug));
  const nwa = jobs.filter((j) => j.category === "nwa");

  const linkAside = (href: string, label: string) => (
    <Link href={href} className="inline-flex items-center gap-1 font-medium text-accent hover:underline">
      {label} <ArrowRight className="size-4" />
    </Link>
  );

  return (
    <>
      <RememberMajor slug={slug} />
      <PageHeader kicker={group.college} title={group.name} lede={group.blurb}>
        <p className="mt-5 flex flex-wrap gap-2">
          {group.examples.map((m) => (
            <span key={m} className={ui.chip}>
              {m}
            </span>
          ))}
        </p>
        <dl className="mt-8 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
          {[
            { n: jobs.length, label: "Listings for you" },
            { n: labs.length, label: "Labs in your field" },
            { n: clubs.length, label: "Clubs to join" },
          ].map((s) => (
            <div key={s.label} className="bg-surface px-4 py-4">
              <dd className="text-2xl font-bold tabular-nums">{s.n}</dd>
              <dt className="mt-0.5 text-xs text-fg-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </PageHeader>

      <div className={`${ui.container} py-12`}>
        <section>
          <SectionHeading kicker="Listings" title="Jobs and internships for your field" aside={linkAside(`/jobs?major=${slug}`, "Filter the full board")} />
          {jobs.length > 0 ? (
            <div className="space-y-3">
              {jobs.map((job) => (
                <JobRow key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-line-strong px-6 py-10 text-sm text-fg-muted">
              Nothing tagged specifically right now — the open-to-any-major listings and the labs below are all fair game.
            </p>
          )}
          <p className="mt-4 text-sm text-fg-muted">
            Plus{" "}
            <Link href={`/jobs?major=${slug}`} className={ui.link}>
              {ANY_MAJOR_JOBS.length} listings open to any major
            </Link>{" "}
            — tutoring, campus offices, transit, temp pools.
          </p>
        </section>

        {labs.length > 0 ? (
          <section className="mt-16">
            <SectionHeading
              kicker="Research labs"
              title="Labs that need your skills"
              description="Professors answer specific emails — use Draft intro to write one in thirty seconds."
              aside={linkAside(`/labs?major=${slug}`, "All labs")}
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {labs.map((lab) => (
                <LabCard key={lab.id} lab={lab} />
              ))}
            </div>
          </section>
        ) : null}

        {clubs.length > 0 ? (
          <section className="mt-16">
            <SectionHeading kicker="Clubs" title="Clubs that build momentum" aside={linkAside(`/clubs?major=${slug}`, "All clubs")} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {clubs.slice(0, 6).map((club) => (
                <ClubCard key={club.id} club={club} />
              ))}
            </div>
          </section>
        ) : null}

        {tracks.length > 0 ? (
          <section className="mt-16">
            <SectionHeading kicker="Career tracks" title="Where this major can take you" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tracks.map((track) => (
                <Link key={track.slug} href={`/tracks/${track.slug}`} className={`group block p-5 ${ui.card} ${ui.cardHover}`}>
                  <h3 className="flex items-center justify-between gap-3 text-lg font-semibold tracking-tight">
                    {track.name}
                    <ArrowUpRight className="size-4 shrink-0 text-fg-subtle transition-colors group-hover:text-accent" />
                  </h3>
                  <p className="mt-1.5 text-sm text-fg-muted">{track.role}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className={`mt-16 p-6 sm:p-8 ${ui.card}`}>
          <p className={ui.kicker}>A plan for this semester</p>
          <h2 className="mt-1.5 text-2xl font-bold tracking-tight">Three moves that compound</h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Take one paycheck job",
                copy: "It proves reliability and funds your semester without wrecking your GPA.",
              },
              {
                title: "Email two labs",
                copy: "Research hours become your first real bullet point — and a recommendation letter.",
              },
              {
                title: nwa.length > 0 ? `Apply to the ${nwa.length} NWA program${nwa.length === 1 ? "" : "s"} here` : "Apply to NWA internships",
                copy: "Do it by October for next summer — big programs fill their intern classes early.",
              },
            ].map((step, i) => (
              <li key={step.title}>
                <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand-wash text-sm font-semibold text-accent">
                  {i + 1}
                </span>
                <p className="mt-3 font-semibold">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-fg-muted">{step.copy}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
