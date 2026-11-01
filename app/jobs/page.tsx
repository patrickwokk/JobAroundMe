import type { Metadata } from "next";
import { Suspense } from "react";
import { JobsExplorer } from "@/components/jobs-explorer";
import { PageHeader } from "@/components/page-header";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "Every verified student role: on-campus part-time and extra-help jobs, research assistantships, and Northwest Arkansas internship programs.",
};

export default function JobsPage() {
  return (
    <>
      <PageHeader
        kicker="Jobs"
        title="Every opening, one board"
        lede="Live postings from the U of A careers system plus internship programs reviewed by hand. Everything links to its original source — that's where you apply."
      />
      <div className={`${ui.container} py-10`}>
        <Suspense>
          <JobsExplorer />
        </Suspense>
      </div>
    </>
  );
}
