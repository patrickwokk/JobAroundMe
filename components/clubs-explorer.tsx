"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CLUBS } from "@/lib/data";
import { MAJOR_GROUPS } from "@/lib/majors";
import { ui } from "@/lib/ui";
import { ClubCard } from "@/components/club-card";

export function ClubsExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const major = params.get("major") ?? "all";

  const filtered = useMemo(() => CLUBS.filter((c) => major === "all" || c.majors.includes(major)), [major]);

  return (
    <div>
      <div className={`${ui.card} flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5`}>
        <select
          value={major}
          onChange={(e) => {
            const next = new URLSearchParams(params.toString());
            if (e.target.value === "all") next.delete("major");
            else next.set("major", e.target.value);
            router.replace(next.size > 0 ? `${pathname}?${next}` : pathname, { scroll: false });
          }}
          className={`${ui.input} h-10 sm:w-80`}
          aria-label="Filter clubs by major"
        >
          <option value="all">Every major</option>
          {MAJOR_GROUPS.map((g) => (
            <option key={g.slug} value={g.slug}>
              {g.name}
            </option>
          ))}
        </select>
        <p className="text-sm text-fg-muted">
          <span className="font-semibold text-fg tabular-nums">{filtered.length}</span> of {CLUBS.length} organizations
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
