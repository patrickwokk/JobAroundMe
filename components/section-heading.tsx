import type { ReactNode } from "react";

export function SectionHeading({
  kicker,
  title,
  description,
  aside,
}: {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-accent">{kicker}</p>
        <h2 className="mt-1.5 text-2xl font-bold tracking-[-0.025em] sm:text-3xl">{title}</h2>
        {description ? <p className="mt-2 leading-relaxed text-fg-muted">{description}</p> : null}
      </div>
      {aside ? <div className="text-sm">{aside}</div> : null}
    </div>
  );
}
