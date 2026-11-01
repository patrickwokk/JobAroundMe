import type { Job } from "@/lib/types";
import { META } from "@/lib/data";
import { relTime } from "@/lib/format";
import { majorShortName } from "@/lib/majors";
import { reportFilledHref } from "@/lib/site";
import { ui } from "@/lib/ui";
import { ArrowUpRight } from "@/components/icons";
import { Badge } from "@/components/badge";
import { BookmarkButton } from "@/components/bookmark-button";

export const TYPE_LABEL: Record<Job["type"], string> = {
  "part-time": "Part-time",
  "extra-help": "Extra help",
  "work-study": "Work-study",
  internship: "Internship",
  "research-assistant": "Research",
  program: "Program",
};

const CATEGORY_LABEL: Record<Job["category"], string> = {
  "on-campus": "On campus",
  research: "Research",
  nwa: "Northwest Arkansas",
};

const REF = Date.parse(META.lastRefreshed);

function Freshness({ job }: { job: Job }) {
  if (job.status === "stale") {
    return <Badge tone="warn">Recheck · last seen {relTime(job.lastSeenAt, REF)}</Badge>;
  }
  if (job.evergreen) return <Badge tone="outline">Standing program</Badge>;
  return (
    <Badge tone="ok">
      <span className="size-1.5 rounded-full bg-ok" aria-hidden />
      Verified {relTime(job.lastSeenAt, REF)}
    </Badge>
  );
}

export function JobRow({ job }: { job: Job }) {
  const isNew = !job.evergreen && REF - Date.parse(job.postedAt ?? job.firstSeenAt) < 7 * 86_400_000;
  const report = reportFilledHref(job.id, job.title);

  return (
    <article className={`group relative grid gap-x-6 gap-y-4 p-5 sm:grid-cols-[1fr_auto] ${ui.card} ${ui.cardHover}`}>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          {isNew ? <Badge tone="brand">New</Badge> : null}
          <Badge>{TYPE_LABEL[job.type]}</Badge>
          <Badge tone="outline">{CATEGORY_LABEL[job.category]}</Badge>
          <Freshness job={job} />
        </div>

        <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-[-0.01em]">
          <a href={job.applyUrl} target="_blank" rel="noreferrer" className="after:absolute after:inset-0 after:rounded-xl">
            {job.title}
            <ArrowUpRight className="ml-1 inline size-4 -translate-y-px text-fg-subtle transition-colors group-hover:text-accent" />
          </a>
        </h3>
        <p className="mt-1 text-sm text-fg-muted">
          <span className="font-medium text-fg">{job.org}</span>
          <span className="mx-1.5 text-fg-subtle">·</span>
          {job.location}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-muted">{job.blurb}</p>
        <p className="mt-3 text-xs text-fg-subtle">
          {job.majors.length > 0 ? (
            <>
              Best for <span className="font-medium text-fg-muted">{job.majors.map(majorShortName).join(" · ")}</span>
            </>
          ) : (
            "Open to any major"
          )}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-start">
        <p className="text-sm font-semibold tabular-nums">{job.pay ?? ""}</p>
        <div className="flex items-center gap-3 sm:mt-auto sm:flex-col sm:items-end sm:gap-2">
          <BookmarkButton jobId={job.id} title={job.title} />
          {report ? (
            <a
              href={report}
              target="_blank"
              rel="noreferrer"
              className="relative z-10 text-xs text-fg-subtle underline-offset-2 transition-colors hover:text-accent hover:underline"
            >
              Report filled
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
