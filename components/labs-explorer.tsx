"use client";

import { useMemo, useState } from "react";
import { LIVE_LABS } from "@/lib/data";
import { MAJOR_GROUPS } from "@/lib/majors";
import { LabCard } from "@/components/lab-card";
import { Search } from "@/components/icons";

export function LabsExplorer() {
  const [major, setMajor] = useState("all");
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
      <div className="flex flex-wrap items-center gap-3 border-y-2 border-ink bg-paper-2 px-4 py-4 sm:px-5">
        <label className="relative min-w-52 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lab, professor, topic…"
            className="w-full border border-line-strong bg-paper py-2 pl-9 pr-3 text-sm placeholder:text-ink-faint focus:border-ink"
            aria-label="Search labs"
          />
        </label>
        <select
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          className="border border-line-strong bg-paper px-2.5 py-2 text-sm focus:border-ink"
          aria-label="Filter labs by major"
        >
          <option value="all">Every major</option>
          {MAJOR_GROUPS.map((g) => (
            <option key={g.slug} value={g.slug}>
              {g.name}
            </option>
          ))}
        </select>
        <label className="flex cursor-pointer select-none items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={hiringOnly}
            onChange={(e) => setHiringOnly(e.target.checked)}
            className="size-4 accent-cardinal"
          />
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">Recruiting signals only</span>
        </label>
      </div>

      <p className="py-4 font-mono text-xs tracking-wide text-ink-soft">
        {filtered.length} of {LIVE_LABS.length} labs — every site verified reachable on the last refresh
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((lab) => (
            <LabCard key={lab.id} lab={lab} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-line-strong px-6 py-16 text-center">
          <p className="font-display text-xl font-bold">No labs match.</p>
          <p className="mt-2 text-sm text-ink-soft">Try clearing the search or picking a different major.</p>
        </div>
      )}
    </div>
  );
}
