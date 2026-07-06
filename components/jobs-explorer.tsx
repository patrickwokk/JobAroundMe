"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Job, JobCategory, JobType } from "@/lib/types";
import { VISIBLE_JOBS } from "@/lib/data";
import { MAJOR_GROUPS } from "@/lib/majors";
import { JobRow } from "@/components/job-row";
import { Search, XMark } from "@/components/icons";

const CATEGORIES: Array<{ value: JobCategory | "all"; label: string }> = [
  { value: "all", label: "Everywhere" },
  { value: "on-campus", label: "On campus" },
  { value: "research", label: "Research" },
  { value: "nwa", label: "NWA" },
];

const TYPES: Array<{ value: JobType | "all"; label: string }> = [
  { value: "all", label: "All types" },
  { value: "part-time", label: "Part-time" },
  { value: "extra-help", label: "Extra help" },
  { value: "work-study", label: "Work-study" },
  { value: "internship", label: "Internship" },
  { value: "research-assistant", label: "Research" },
  { value: "program", label: "Program" },
];

export function JobsExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [query, setQuery] = useState("");

  const major = params.get("major") ?? "all";
  const category = (params.get("where") ?? "all") as JobCategory | "all";
  const type = (params.get("type") ?? "all") as JobType | "all";

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === "all") next.delete(key);
    else next.set(key, value);
    router.replace(next.size > 0 ? `${pathname}?${next}` : pathname, { scroll: false });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VISIBLE_JOBS.filter((job: Job) => {
      if (category !== "all" && job.category !== category) return false;
      if (type !== "all" && job.type !== type) return false;
      if (major !== "all" && job.majors.length > 0 && !job.majors.includes(major)) return false;
      if (q) {
        const hay = `${job.title} ${job.org} ${job.blurb} ${job.location} ${(job.tags ?? []).join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, major, category, type]);

  const hasFilters = major !== "all" || category !== "all" || type !== "all" || query.trim() !== "";

  return (
    <div>
      <div className="flex flex-col gap-4 border-y-2 border-ink bg-paper-2 px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative min-w-56 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, employer, keyword…"
              className="w-full border border-line-strong bg-paper py-2 pl-9 pr-3 text-sm placeholder:text-ink-faint focus:border-ink"
              aria-label="Search listings"
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">I study</span>
            <select
              value={major}
              onChange={(e) => setParam("major", e.target.value)}
              className="border border-line-strong bg-paper px-2.5 py-2 text-sm focus:border-ink"
              aria-label="Filter by major"
            >
              <option value="all">Every major</option>
              {MAJOR_GROUPS.map((g) => (
                <option key={g.slug} value={g.slug}>
                  {g.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by place">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setParam("where", c.value)}
                className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  category === c.value
                    ? "bg-ink text-paper"
                    : "border border-line-strong bg-paper text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by type">
            {TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setParam("type", t.value)}
                className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  type === t.value
                    ? "bg-cardinal text-paper"
                    : "border border-line-strong bg-paper text-ink-soft hover:border-cardinal hover:text-cardinal"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-baseline justify-between py-4">
        <p className="font-mono text-xs tracking-wide text-ink-soft">
          {filtered.length} of {VISIBLE_JOBS.length} listings
        </p>
        {hasFilters ? (
          <button
            onClick={() => {
              setQuery("");
              router.replace(pathname, { scroll: false });
            }}
            className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-cardinal hover:underline"
          >
            <XMark className="size-3.5" /> Clear filters
          </button>
        ) : null}
      </div>

      {filtered.length > 0 ? (
        <div className="border-t border-line">
          {filtered.map((job) => (
            <JobRow key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-line-strong px-6 py-16 text-center">
          <p className="font-display text-xl font-bold">Nothing matches that combination.</p>
          <p className="mt-2 text-sm text-ink-soft">
            Try widening a filter — or check the research labs, where openings are made by emailing, not posting.
          </p>
        </div>
      )}
    </div>
  );
}
