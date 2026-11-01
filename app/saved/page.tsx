import type { Metadata } from "next";
import { SavedList } from "@/components/saved-list";
import { PageHeader } from "@/components/page-header";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Saved",
  description: "Listings you bookmarked — stored on your device, no account needed.",
};

export default function SavedPage() {
  return (
    <>
      <PageHeader
        kicker="Saved"
        title="Your shortlist"
        lede="Saved on this device only — no account, nothing sent anywhere. If a saved listing is filled or expires, it moves to a list below instead of silently disappearing."
      />
      <div className={`${ui.container} py-10`}>
        <SavedList />
      </div>
    </>
  );
}
