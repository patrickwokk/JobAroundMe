import type { Metadata } from "next";
import { LabsExplorer } from "@/components/labs-explorer";

export const metadata: Metadata = {
  title: "The Labs",
  description:
    "A campus-wide directory of professor-led research lab websites at the University of Arkansas — checked automatically, with recruiting signals surfaced.",
};

export default function LabsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="kicker">The Labs</p>
      <h1 className="font-display mt-2 text-4xl font-black tracking-tight sm:text-5xl">
        The unlisted job market<span className="text-cardinal">.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
        U of A professors run funded research labs across campus — and most never post openings.
        The way in is a short, specific email. This directory gathers their scattered lab sites in
        one place, flags the ones showing recruiting signals, and drafts that first email with you.
      </p>
      <div className="mt-8">
        <LabsExplorer />
      </div>
    </div>
  );
}
