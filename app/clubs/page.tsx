import type { Metadata } from "next";
import { Suspense } from "react";
import { ClubsExplorer } from "@/components/clubs-explorer";

export const metadata: Metadata = {
  title: "The Clubs",
  description:
    "Student organizations at the University of Arkansas that actually build a resume — professional chapters, competition teams, and industry pipelines, sorted by major.",
};

export default function ClubsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="kicker">The Clubs</p>
      <h1 className="font-display mt-2 text-4xl font-black tracking-tight sm:text-5xl">
        Momentum you can join<span className="text-cardinal">.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
        Before anyone hires you, a club will take you. These are the organizations where
        internships circulate early, competition teams become resume lines, and upperclassmen
        hand down their referrals. Org names shift year to year — every card links into{" "}
        <a
          href="https://hogsync.uark.edu/club_signup"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-cardinal underline-offset-2 hover:underline"
        >
          HogSync
        </a>
        , the official directory, to find the active chapter.
      </p>
      <div className="mt-8">
        <Suspense>
          <ClubsExplorer />
        </Suspense>
      </div>
    </div>
  );
}
