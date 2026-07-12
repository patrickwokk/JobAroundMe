import type { Metadata } from "next";
import { SavedList } from "@/components/saved-list";

export const metadata: Metadata = {
  title: "Saved",
  description: "Listings you bookmarked — stored on your device, no account needed.",
};

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="kicker">Saved</p>
      <h1 className="font-display mt-2 text-4xl font-black tracking-tight sm:text-5xl">
        Your shortlist<span className="text-cardinal">.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
        Saved on this device — no account, nothing sent anywhere. If a saved listing gets filled
        or expires, it moves to the graveyard below instead of silently vanishing.
      </p>
      <div className="mt-8">
        <SavedList />
      </div>
    </div>
  );
}
