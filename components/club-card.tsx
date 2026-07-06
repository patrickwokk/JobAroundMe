import type { Club } from "@/lib/types";
import { majorShortName } from "@/lib/majors";
import { hogsyncUrl } from "@/lib/site";
import { ArrowUpRight } from "@/components/icons";

export function ClubCard({ club }: { club: Club }) {
  return (
    <article className="lift flex flex-col border border-line bg-paper p-5">
      <p className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-cardinal">
        {club.majors.map((m) => (
          <span key={m}>{majorShortName(m)}</span>
        ))}
      </p>
      <h3 className="font-display mt-2 text-lg font-bold leading-snug tracking-tight">{club.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{club.blurb}</p>
      <div className="mt-4 border-t border-line pt-4">
        <a
          href={hogsyncUrl(club.searchTerm)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 border border-ink px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors hover:bg-ink hover:text-paper"
        >
          Find on HogSync <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </article>
  );
}
