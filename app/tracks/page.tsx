import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ArrowRight } from "@/components/icons";
import { majorShortName } from "@/lib/majors";
import { TRACKS } from "@/lib/tracks";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Career tracks",
  description:
    "Destination-first guides: the four-year ladder of campus jobs, research labs and clubs that gets a University of Arkansas student to a specific career.",
};

export default function TracksPage() {
  return (
    <>
      <PageHeader
        kicker="Career tracks"
        title="Start from where you want to end up"
        lede="Majors tell you what to study. Tracks tell you what to do — pick a career and get the four-year ladder of jobs, labs and clubs, from Fayetteville specifically, that gets you there."
      />
      <div className={`${ui.container} grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3`}>
        {TRACKS.map((track) => (
          <Link key={track.slug} href={`/tracks/${track.slug}`} className={`group flex flex-col p-6 ${ui.card} ${ui.cardHover}`}>
            <p className="text-xs font-medium text-fg-subtle">{track.majors.slice(0, 3).map(majorShortName).join(" · ")}</p>
            <h2 className="mt-2 text-xl font-bold tracking-tight">{track.name}</h2>
            <p className="mt-1 text-sm font-medium text-fg-muted">{track.role}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">{track.hook}</p>
            <p className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
              See the plan <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
