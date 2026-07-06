import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JobRow } from "@/components/job-row";
import { LabCard } from "@/components/lab-card";
import { ClubCard } from "@/components/club-card";
import { SectionHeading } from "@/components/section-heading";
import { ArrowUpRight } from "@/components/icons";
import { ANY_MAJOR_JOBS, clubsForMajor, jobsTaggedFor, labsForMajor } from "@/lib/data";
import { MAJOR_BY_SLUG, MAJOR_GROUPS } from "@/lib/majors";
import { TRACKS } from "@/lib/tracks";

export const dynamicParams = false;

export function generateStaticParams() {
  return MAJOR_GROUPS.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const group = MAJOR_BY_SLUG.get(slug);
  if (!group) return {};
  return {
    title: `${group.name} — jobs & labs`,
    description: `Campus jobs, research labs and NWA internships for ${group.name} students at the University of Arkansas.`,
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="kicker">{group.college}</p>
      <h1 className="font-display mt-2 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
        For <span className="italic text-cardinal">{group.name}</span> students
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">{group.blurb}</p>
      <p className="mt-4 flex flex-wrap gap-2">
        {group.examples.map((m) => (
          <span key={m} className="border border-line bg-paper-2 px-2.5 py-1 font-mono text-[11px] tracking-wide text-ink-soft">
            {m}
          </span>
        ))}
      </p>

      <div className="mt-8 grid grid-cols-3 divide-x divide-line border-y-2 border-ink">
        {[
          { n: jobs.length, label: "listings tagged for you" },
          { n: labs.length, label: "labs in your field" },
          { n: ANY_MAJOR_JOBS.length, label: "more open to any major" },
        ].map((s) => (
          <div key={s.label} className="px-4 py-5 text-center sm:text-left">
            <p className="font-display text-3xl font-black sm:text-4xl">{s.n}</p>
            <p className="mt-1 text-xs text-ink-soft">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="mt-14">
        <SectionHeading
          kicker="Section A"
          title="Listings for your field"
          aside={
            <Link href={`/jobs?major=${slug}`} className="link-sweep inline-flex items-center gap-1 font-medium text-cardinal">
              Filter the full board <ArrowUpRight className="size-4" />
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
            Nothing explicitly tagged right now — but {ANY_MAJOR_JOBS.length} open-to-any-major
            listings and the labs below are all fair game.
          </p>
        )}
        <p className="mt-4 text-sm text-ink-soft">
          Plus{" "}
          <Link href={`/jobs?major=${slug}`} className="font-medium text-cardinal underline-offset-2 hover:underline">
            {ANY_MAJOR_JOBS.length} listings open to any major
          </Link>{" "}
          — tutoring desks, ticket offices, transit, temp pools.
        </p>
      </section>

      <section className="mt-14">
        <SectionHeading
          kicker="Section B"
          title={
            <>
              Labs that need <span className="italic text-cardinal">your</span> skills
            </>
          }
          aside={<span>Use “Draft intro” — professors answer specific emails</span>}
        />
        {labs.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {labs.map((lab) => (
              <LabCard key={lab.id} lab={lab} />
            ))}
          </div>
        ) : (
          <p className="border border-dashed border-line-strong px-6 py-10 text-sm text-ink-soft">
            No labs mapped to this group yet — browse the{" "}
            <Link href="/labs" className="text-cardinal underline-offset-2 hover:underline">
              full directory
            </Link>
            , or suggest one from the footer.
          </p>
        )}
      </section>

      {clubs.length > 0 ? (
        <section className="mt-14">
          <SectionHeading
            kicker="Section C"
            title="Clubs that build momentum"
            aside={
              <Link href={`/clubs?major=${slug}`} className="link-sweep inline-flex items-center gap-1 font-medium text-cardinal">
                All clubs <ArrowUpRight className="size-4" />
              </Link>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clubs.slice(0, 6).map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </section>
      ) : null}

      {tracks.length > 0 ? (
        <section className="mt-14">
          <SectionHeading kicker="Section D" title="Tracks that start here" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track) => (
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
        </section>
      ) : null}

      <section className="mt-14 border-2 border-ink bg-paper-2 p-7 sm:p-9">
        <p className="kicker">The play</p>
        <h2 className="font-display mt-2 text-2xl font-black tracking-tight sm:text-3xl">
          A semester-long plan that works
        </h2>
        <ol className="mt-6 grid gap-6 text-sm leading-relaxed text-ink-soft sm:grid-cols-3">
          <li>
            <span className="font-display text-2xl font-black text-cardinal">1.</span>
            <p className="mt-1">
              <strong className="text-ink">Take one paycheck job</strong> from the listings — it proves
              reliability and funds your semester without wrecking your GPA.
            </p>
          </li>
          <li>
            <span className="font-display text-2xl font-black text-cardinal">2.</span>
            <p className="mt-1">
              <strong className="text-ink">Email two labs</strong> from Section B with the intro
              composer. Research hours become your first real bullet point — and a recommendation letter.
            </p>
          </li>
          <li>
            <span className="font-display text-2xl font-black text-cardinal">3.</span>
            <p className="mt-1">
              <strong className="text-ink">Apply to {nwa.length > 0 ? `the ${nwa.length} NWA program${nwa.length === 1 ? "" : "s"} here` : "NWA internships"}</strong>{" "}
              by October for next summer — big programs fill their intern classes early.
            </p>
          </li>
        </ol>
      </section>
    </div>
  );
}
