import type { ReactNode } from "react";

export function SectionHeading({
  kicker,
  title,
  aside,
}: {
  kicker: string;
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <p className="kicker">{kicker}</p>
          <h2 className="font-display mt-2 text-3xl font-black tracking-tight sm:text-4xl">{title}</h2>
        </div>
        {aside ? <div className="pb-1 text-sm text-ink-soft">{aside}</div> : null}
      </div>
      <div className="rule-dotted mt-5" />
    </div>
  );
}
