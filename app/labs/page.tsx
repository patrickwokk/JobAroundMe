import type { Metadata } from "next";
import { Suspense } from "react";
import { LabsExplorer } from "@/components/labs-explorer";
import { PageHeader } from "@/components/page-header";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Research labs",
  description:
    "A campus-wide directory of professor-led research labs at the University of Arkansas — checked daily, with recruiting signals surfaced.",
};

export default function LabsPage() {
  return (
    <>
      <PageHeader
        kicker="Research labs"
        title="The unlisted job market"
        lede="U of A professors run funded labs across campus, and most never post openings — the way in is a short, specific email. This directory gathers their scattered lab sites, flags the ones recruiting, and drafts that first email with you."
      />
      <div className={`${ui.container} py-10`}>
        <Suspense>
          <LabsExplorer />
        </Suspense>
      </div>
    </>
  );
}
