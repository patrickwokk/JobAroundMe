"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Job, JobCategory, JobType } from "@/lib/types";
import { VISIBLE_JOBS } from "@/lib/data";
import { MAJOR_GROUPS } from "@/lib/majors";
import { ui } from "@/lib/ui";
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

  // Everything except the place filter — so the place tabs can show live counts.
  const baseFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VISIBLE_JOBS.filter((job: Job) => {
      if (type !== "all" && job.type !== type) return false;
      if (major !== "all" && job.majors.length > 0 && !job.majors.includes(major)) return false;
      if (q) {
        const hay = `${job.title} ${job.org} ${job.blurb} ${job.location} ${(job.tags ?? []).join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, major, type]);

  const filtered = category === "all" ? baseFiltered : baseFiltered.filter((j) => j.category === category);
  const countFor = (c: JobCategory | "all") =>
    c === "all" ? baseFiltered.length : baseFiltered.filter((j) => j.category === c).length;
  const hasFilters = major !== "all" || category !== "all" || type !== "all" || query.trim() !== "";

  return (
    <div>
      <div className={`${ui.card} space-y-4 p-4 sm:p-5`}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-fg-subtle" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, employers, keywords…"
              className={`${ui.input} h-10 pl-9`}
              aria-label="Search listings"
            />
          </label>
          <select
            value={major}
            onChange={(e) => setParam("major", e.target.value)}
            className={`${ui.input} h-10 sm:w-72`}
            aria-label="Filter by major"
          >
            <option value="all">Every major</option>
            {MAJOR_GROUPS.map((g) => (
              <option key={g.slug} value={g.slug}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div
            role="group"
            aria-label="Filter by place"
            className="inline-flex w-full shrink-0 self-start overflow-x-auto rounded-lg bg-muted p-1 sm:w-auto"
          >
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setParam("where", c.value)}
                aria-pressed={category === c.value}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  category === c.value ? "bg-surface text-fg shadow-[var(--elev-1)]" : "text-fg-muted hover:text-fg"
                }`}
              >
                {c.label}
                <span className="text-xs tabular-nums text-fg-subtle">{countFor(c.value)}</span>
              </button>
            ))}
          </div>
          <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-1.5">
            {TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setParam("type", t.value)}
                aria-pressed={type === t.value}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  type === t.value
                    ? "border-transparent bg-fg text-canvas"
                    : "border-line-strong text-fg-muted hover:border-fg-subtle hover:text-fg"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-4">
        <p className="text-sm text-fg-muted">
          <span className="font-semibold text-fg tabular-nums">{filtered.length}</span> of {VISIBLE_JOBS.length} listings
        </p>
        {hasFilters ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              router.replace(pathname, { scroll: false });
            }}
            className={ui.btnGhost}
          >
            <XMark className="size-4" /> Clear filters
          </button>
        ) : null}
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((job) => (
            <JobRow key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-line-strong px-6 py-16 text-center">
          <p className="text-lg font-semibold">Nothing matches that combination.</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
            Try widening a filter — or explore the research labs, where openings happen by email rather than posting.
          </p>
        </div>
      )}
    </div>
  );
}
