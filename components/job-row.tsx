import type { Job } from "@/lib/types";
import { META } from "@/lib/data";
import { relTime } from "@/lib/format";
import { majorShortName } from "@/lib/majors";
import { reportFilledUrl } from "@/lib/site";
import { ArrowUpRight, MapPin } from "@/components/icons";

const TYPE_LABEL: Record<Job["type"], string> = {
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
  nwa: "NWA",
};

const REF = Date.parse(META.lastRefreshed);

function Freshness({ job }: { job: Job }) {
  if (job.status === "stale") {
    return (
      <span className="rounded-full bg-amber-wash px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-note">
        Recheck — not seen at source {relTime(job.lastSeenAt, REF)}
      </span>
    );
  }
  if (job.evergreen) {
    return (
      <span className="rounded-full bg-paper-3 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
        Standing opportunity
      </span>
    );
  }
  return (
    <span className="rounded-full bg-moss-wash px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-moss">
      Verified {relTime(job.lastSeenAt, REF)}
    </span>
  );
}

export function JobRow({ job }: { job: Job }) {
  return (
    <article className="group relative grid gap-x-8 gap-y-3 border-b border-line py-6 sm:grid-cols-[1fr_11rem]">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-ink/25 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider">
            {TYPE_LABEL[job.type]}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
            {CATEGORY_LABEL[job.category]}
          </span>
          <Freshness job={job} />
        </div>
        <h3 className="font-display mt-2.5 text-xl font-bold leading-snug tracking-tight sm:text-[1.35rem]">
          <a href={job.applyUrl} target="_blank" rel="noreferrer" className="after:absolute after:inset-0">
            {job.title}
            <ArrowUpRight className="ml-1.5 inline size-[0.95em] -translate-y-px text-cardinal opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        </h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">
          <span className="font-medium text-ink">{job.org}</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" />
            {job.location}
          </span>
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{job.blurb}</p>
        {job.majors.length > 0 ? (
          <p className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-cardinal">
            {job.majors.map((m) => (
              <span key={m}>{majorShortName(m)}</span>
            ))}
          </p>
        ) : (
          <p className="mt-2.5 font-mono text-[10px] uppercase tracking-wider text-ink-faint">Open to any major</p>
        )}
      </div>
      <div className="flex items-start justify-between gap-2 sm:flex-col sm:items-end sm:text-right">
        <p className="font-mono text-sm font-medium">{job.pay ?? ""}</p>
        <div className="sm:mt-auto">
          <a
            href={reportFilledUrl(job.id, job.title)}
            target="_blank"
            rel="noreferrer"
            className="relative z-10 font-mono text-[10px] uppercase tracking-wider text-ink-faint underline-offset-2 hover:text-cardinal hover:underline"
          >
            Report filled
          </a>
        </div>
      </div>
    </article>
  );
}
