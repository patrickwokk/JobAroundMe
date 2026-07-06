"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CLUBS } from "@/lib/data";
import { MAJOR_GROUPS } from "@/lib/majors";
import { ClubCard } from "@/components/club-card";

export function ClubsExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const major = params.get("major") ?? "all";

  const filtered = useMemo(
    () => CLUBS.filter((c) => major === "all" || c.majors.includes(major)),
    [major],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 border-y-2 border-ink bg-paper-2 px-4 py-4 sm:px-5">
        <label className="flex items-center gap-2 text-sm">
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">I study</span>
          <select
            value={major}
            onChange={(e) => {
              const next = new URLSearchParams(params.toString());
              if (e.target.value === "all") next.delete("major");
              else next.set("major", e.target.value);
              router.replace(next.size > 0 ? `${pathname}?${next}` : pathname, { scroll: false });
            }}
            className="border border-line-strong bg-paper px-2.5 py-2 text-sm focus:border-ink"
            aria-label="Filter clubs by major"
          >
            <option value="all">Every major</option>
            {MAJOR_GROUPS.map((g) => (
              <option key={g.slug} value={g.slug}>
                {g.name}
              </option>
            ))}
          </select>
        </label>
        <p className="font-mono text-xs tracking-wide text-ink-soft">
          {filtered.length} of {CLUBS.length} organizations
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  );
}
