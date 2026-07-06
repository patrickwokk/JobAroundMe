import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { majorShortName } from "@/lib/majors";
import { TRACKS } from "@/lib/tracks";

export const metadata: Metadata = {
  title: "Career Tracks",
  description:
    "Destination-first guides: the four-year ladder of campus jobs, research labs and clubs that gets a University of Arkansas student to a specific career.",
};

export default function TracksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="kicker">Career Tracks</p>
      <h1 className="font-display mt-2 text-4xl font-black tracking-tight sm:text-5xl">
        Start from the ending<span className="text-cardinal">.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
        Majors tell you what to study. Tracks tell you what to <em>do</em>: pick the career
        you&apos;re aiming at and get the four-year ladder of jobs, labs and clubs — from
        Fayetteville, specifically — that gets you there.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TRACKS.map((track, i) => (
          <Link
            key={track.slug}
            href={`/tracks/${track.slug}`}
            className="lift group flex flex-col border border-line bg-paper p-6 hover:border-line-strong"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[11px] tracking-wider text-ink-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex gap-2 font-mono text-[10px] uppercase tracking-wider text-cardinal">
                {track.majors.slice(0, 2).map((m) => (
                  <span key={m}>{majorShortName(m)}</span>
                ))}
              </span>
            </div>
            <h2 className="font-display mt-3 text-2xl font-black tracking-tight">
              {track.name}
              <ArrowUpRight className="ml-1.5 inline size-5 text-cardinal opacity-0 transition-opacity group-hover:opacity-100" />
            </h2>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-soft">{track.role}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{track.hook}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
