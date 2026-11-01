import Link from "next/link";
import type { MajorGroup } from "@/lib/types";
import { ui } from "@/lib/ui";
import { ArrowRight } from "@/components/icons";

export function MajorCard({
  group,
  counts,
}: {
  group: MajorGroup;
  counts: { jobs: number; labs: number };
}) {
  return (
    <Link href={`/majors/${group.slug}`} className={`group flex h-full flex-col justify-between p-5 ${ui.card} ${ui.cardHover}`}>
      <div>
        <p className="text-xs font-semibold tracking-wide text-accent">{group.shortName}</p>
        <h3 className="mt-2 text-base font-semibold leading-snug tracking-[-0.01em]">{group.name}</h3>
        <p className="mt-1 text-xs text-fg-subtle">{group.college}</p>
      </div>
      <div className="mt-5 flex items-center justify-between text-xs text-fg-muted">
        <span className="tabular-nums">
          {counts.jobs} listing{counts.jobs === 1 ? "" : "s"} · {counts.labs} lab{counts.labs === 1 ? "" : "s"}
        </span>
        <ArrowRight className="size-4 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
    </Link>
  );
}
