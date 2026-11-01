import type { Club } from "@/lib/types";
import { majorShortName } from "@/lib/majors";
import { hogsyncUrl } from "@/lib/site";
import { ui } from "@/lib/ui";
import { ArrowUpRight } from "@/components/icons";

export function ClubCard({ club }: { club: Club }) {
  return (
    <article className={`flex h-full flex-col p-5 ${ui.card} ${ui.cardHover}`}>
      <p className="text-xs font-medium text-fg-subtle">{club.majors.map(majorShortName).join(" · ")}</p>
      <h3 className="mt-2 text-base font-semibold leading-snug tracking-[-0.01em]">{club.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{club.blurb}</p>
      <div className="mt-4 border-t border-line pt-4">
        <a
          href={hogsyncUrl(club.searchTerm)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          Find on HogSync <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </article>
  );
}
