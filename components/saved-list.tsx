"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ALL_JOBS, VISIBLE_JOBS } from "@/lib/data";
import { readSaved, SAVED_EVENT } from "@/lib/saved";
import { ui } from "@/lib/ui";
import { JobRow } from "@/components/job-row";
import { ArrowRight, Bookmark } from "@/components/icons";

export function SavedList() {
  const [ids, setIds] = useState<string[] | null>(null);

  useEffect(() => {
    const sync = () => setIds(readSaved());
    sync();
    window.addEventListener(SAVED_EVENT, sync);
    return () => window.removeEventListener(SAVED_EVENT, sync);
  }, []);

  if (ids === null) return <div className="py-16" aria-hidden />;

  const savedSet = new Set(ids);
  const live = VISIBLE_JOBS.filter((j) => savedSet.has(j.id));
  const gone = ALL_JOBS.filter((j) => savedSet.has(j.id) && (j.status === "expired" || j.status === "filled"));

  if (ids.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-line-strong px-6 py-16 text-center">
        <span className="mx-auto inline-flex size-11 items-center justify-center rounded-full bg-muted text-fg-muted">
          <Bookmark className="size-5" />
        </span>
        <p className="mt-4 text-lg font-semibold">Nothing saved yet</p>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-fg-muted">
          Tap <span className="font-medium text-fg">Save</span> on any listing and it lives here — on this device, no
          account needed.
        </p>
        <Link href="/jobs" className={`${ui.btnPrimary} mt-6`}>
          Browse jobs <ArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="pb-4 text-sm text-fg-muted">
        <span className="font-semibold text-fg tabular-nums">{live.length}</span> saved listing
        {live.length === 1 ? "" : "s"}
      </p>
      {live.length > 0 ? (
        <div className="space-y-3">
          {live.map((job) => (
            <JobRow key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-line-strong px-6 py-10 text-sm text-fg-muted">
          Everything you saved has since left the board. Fresh ones are waiting on the{" "}
          <Link href="/jobs" className={ui.link}>
            jobs page
          </Link>
          .
        </p>
      )}
      {gone.length > 0 ? (
        <div className="mt-8 rounded-xl border border-line bg-subtle p-5">
          <p className="text-sm font-semibold text-warn">No longer on the board</p>
          <ul className="mt-2 space-y-1 text-sm text-fg-muted">
            {gone.map((j) => (
              <li key={j.id}>
                {j.title} — {j.org} <span className="text-fg-subtle">({j.status})</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
