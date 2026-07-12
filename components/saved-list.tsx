"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ALL_JOBS, VISIBLE_JOBS } from "@/lib/data";
import { readSaved, SAVED_EVENT } from "@/lib/saved";
import { JobRow } from "@/components/job-row";
import { ArrowUpRight } from "@/components/icons";

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
  const gone = ALL_JOBS.filter(
    (j) => savedSet.has(j.id) && (j.status === "expired" || j.status === "filled"),
  );

  if (ids.length === 0) {
    return (
      <div className="border border-dashed border-line-strong px-6 py-16 text-center">
        <p className="font-display text-xl font-bold">Nothing saved yet.</p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
          Hit <span className="font-mono text-[11px] uppercase tracking-wider">Save</span> on any
          listing and it lives here — on this device, no account needed.
        </p>
        <Link
          href="/jobs"
          className="mt-6 inline-flex items-center gap-2 bg-cardinal px-5 py-3 font-mono text-xs uppercase tracking-wider text-paper hover:bg-cardinal-deep"
        >
          Browse the listings <ArrowUpRight className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="pb-4 font-mono text-xs tracking-wide text-ink-soft">
        {live.length} saved listing{live.length === 1 ? "" : "s"}
      </p>
      {live.length > 0 ? (
        <div className="border-t border-line">
          {live.map((job) => (
            <JobRow key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <p className="border border-dashed border-line-strong px-6 py-10 text-sm text-ink-soft">
          Everything you saved has since left the board — the lifecycle worked, just not in your
          favor. Fresh ones await on the <Link href="/jobs" className="text-cardinal underline-offset-2 hover:underline">listings page</Link>.
        </p>
      )}
      {gone.length > 0 ? (
        <div className="mt-8 border-l-2 border-amber-note pl-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-amber-note">
            No longer on the board
          </p>
          <ul className="mt-2 space-y-1 text-sm text-ink-soft">
            {gone.map((j) => (
              <li key={j.id}>
                {j.title} — {j.org} <span className="text-ink-faint">({j.status})</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
