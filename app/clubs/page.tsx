import type { Metadata } from "next";
import { Suspense } from "react";
import { ClubsExplorer } from "@/components/clubs-explorer";
import { PageHeader } from "@/components/page-header";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Clubs",
  description:
    "Student organizations at the University of Arkansas that build a resume — professional chapters, competition teams and industry pipelines, sorted by major.",
};

export default function ClubsPage() {
  return (
    <>
      <PageHeader
        kicker="Clubs"
        title="Momentum you can join"
        lede={
          <>
            Before anyone hires you, a club will take you. These are the organizations where internships circulate
            early, competition teams become resume lines, and upperclassmen pass along referrals. Names change year to
            year, so every card links into{" "}
            <a href="https://hogsync.uark.edu/club_signup" target="_blank" rel="noreferrer" className={ui.link}>
              HogSync
            </a>{" "}
            to find the active chapter.
          </>
        }
      />
      <div className={`${ui.container} py-10`}>
        <Suspense>
          <ClubsExplorer />
        </Suspense>
      </div>
    </>
  );
}
