import Link from "next/link";
import type { MajorGroup } from "@/lib/types";
import { ArrowUpRight } from "@/components/icons";

export function MajorCard({
  group,
  index,
  counts,
}: {
  group: MajorGroup;
  index: number;
  counts: { jobs: number; labs: number };
}) {
  return (
    <Link
      href={`/majors/${group.slug}`}
      className="lift group flex flex-col justify-between border border-line bg-paper p-5 hover:border-line-strong"
    >
      <div>
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[11px] tracking-wider text-ink-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-cardinal">{group.shortName}</span>
        </div>
        <h3 className="font-display mt-3 text-lg font-bold leading-tight tracking-tight">
          {group.name}
          <ArrowUpRight className="ml-1 inline size-4 text-cardinal opacity-0 transition-opacity group-hover:opacity-100" />
        </h3>
        <p className="mt-1 text-xs text-ink-faint">{group.college}</p>
      </div>
      <p className="mt-4 font-mono text-[11px] tracking-wide text-ink-soft">
        {counts.jobs} listing{counts.jobs === 1 ? "" : "s"} · {counts.labs} lab{counts.labs === 1 ? "" : "s"}
      </p>
    </Link>
  );
}
