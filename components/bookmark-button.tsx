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
      onClick={() => setSaved(toggleSaved(jobId))}
      aria-pressed={saved}
      aria-label={saved ? `Remove "${title}" from saved` : `Save "${title}"`}
      title={saved ? "Saved — click to remove" : "Save for later"}
      className={`relative z-10 inline-flex items-center gap-1.5 border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
        saved
          ? "border-cardinal bg-cardinal text-paper"
          : "border-line-strong text-ink-soft hover:border-cardinal hover:text-cardinal"
      }`}
    >
      <Bookmark className="size-3.5" fill={saved ? "currentColor" : "none"} />
      {saved ? "Saved" : "Save"}
    </button>
  );
}
