"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LIVE_LABS } from "@/lib/data";
import { MAJOR_BY_SLUG, MAJOR_GROUPS } from "@/lib/majors";
import { ui } from "@/lib/ui";
import { LabCard } from "@/components/lab-card";
import { Search } from "@/components/icons";

export function LabsExplorer() {
  const params = useSearchParams();
  const initialMajor = params.get("major");
  const [major, setMajor] = useState(initialMajor && MAJOR_BY_SLUG.has(initialMajor) ? initialMajor : "all");
  const [hiringOnly, setHiringOnly] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LIVE_LABS.filter((lab) => {
      if (major !== "all" && !lab.majors.includes(major)) return false;
      if (hiringOnly && !lab.activity?.hiringSignal) return false;
      if (q) {
        const hay = `${lab.name} ${lab.pi} ${lab.department} ${lab.areas.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [major, hiringOnly, query]);

  return (
    <div>
      <div className={`${ui.card} flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:p-5`}>
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-fg-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search labs, professors, topics…"
            className={`${ui.input} h-10 pl-9`}
            aria-label="Search labs"
          />
        </label>
        <select
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          className={`${ui.input} h-10 sm:w-64`}
          aria-label="Filter labs by major"
        >
          <option value="all">Every major</option>
          {MAJOR_GROUPS.map((g) => (
            <option key={g.slug} value={g.slug}>
              {g.name}
            </option>
          ))}
        </select>
        <label className="flex shrink-0 cursor-pointer select-none items-center gap-2.5 text-sm font-medium text-fg-muted">
          <span className="relative inline-flex">
            <input
              type="checkbox"
              checked={hiringOnly}
              onChange={(e) => setHiringOnly(e.target.checked)}
              className="peer sr-only"
            />
            <span className="h-5 w-9 rounded-full bg-line-strong transition-colors peer-checked:bg-brand peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent" />
            <span className="absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-4" />
          </span>
          Recruiting only
        </label>
      </div>

      <p className="py-4 text-sm text-fg-muted">
        <span className="font-semibold text-fg tabular-nums">{filtered.length}</span> of {LIVE_LABS.length} labs · every
        site checked on the latest refresh
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((lab) => (
            <LabCard key={lab.id} lab={lab} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-line-strong px-6 py-16 text-center">
          <p className="text-lg font-semibold">No labs match.</p>
          <p className="mt-2 text-sm text-fg-muted">Try clearing the search or picking a different major.</p>
        </div>
      )}
    </div>
  );
}
