"use client";

import { useEffect, useState } from "react";
import { readSaved, SAVED_EVENT, toggleSaved } from "@/lib/saved";
import { Bookmark } from "@/components/icons";

export function BookmarkButton({ jobId, title }: { jobId: string; title: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sync = () => setSaved(readSaved().includes(jobId));
    sync();
    window.addEventListener(SAVED_EVENT, sync);
    return () => window.removeEventListener(SAVED_EVENT, sync);
  }, [jobId]);

  return (
    <button
      type="button"
      onClick={() => setSaved(toggleSaved(jobId))}
      aria-pressed={saved}
      aria-label={saved ? `Remove "${title}" from saved` : `Save "${title}"`}
      className={`relative z-10 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
        saved
          ? "border-transparent bg-brand-wash text-accent"
          : "border-line-strong text-fg-muted hover:border-fg-subtle hover:text-fg"
      }`}
    >
      <Bookmark className="size-3.5" fill={saved ? "currentColor" : "none"} />
      {saved ? "Saved" : "Save"}
    </button>
  );
}
