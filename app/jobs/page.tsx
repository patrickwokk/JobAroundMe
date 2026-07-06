import type { Metadata } from "next";
import { Suspense } from "react";
import { JobsExplorer } from "@/components/jobs-explorer";

export const metadata: Metadata = {
  title: "The Listings",
  description:
    "Every verified student-holdable opening: on-campus part-time and extra-help jobs, research assistantships, and NWA internship programs.",
};

export default function JobsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="kicker">The Listings</p>
      <h1 className="font-display mt-2 text-4xl font-black tracking-tight sm:text-5xl">
        Every opening, one board<span className="text-cardinal">.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
        Live postings scraped from the U of A careers system, plus standing programs we review by
        hand. Everything links to its original source — apply there.
      </p>
      <div className="mt-8">
        <Suspense>
          <JobsExplorer />
        </Suspense>
      </div>
    </div>
  );
}
