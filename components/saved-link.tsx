"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readSaved, SAVED_EVENT } from "@/lib/saved";
import { Bookmark } from "@/components/icons";

/** Header shortcut to /saved with a live count. */
export function SavedLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(readSaved().length);
    sync();
    window.addEventListener(SAVED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(SAVED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return (
    <Link
      href="/saved"
      aria-label={count > 0 ? `Saved listings (${count})` : "Saved listings"}
      title="Saved listings"
      className="relative inline-flex size-9 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-muted hover:text-fg"
    >
      <Bookmark className="size-[18px]" />
      {count > 0 ? (
        <span className="absolute right-1 top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold leading-4 text-white tabular-nums">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
