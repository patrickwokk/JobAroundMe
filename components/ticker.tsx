import { VISIBLE_JOBS } from "@/lib/data";

export function Ticker() {
  const items = VISIBLE_JOBS.slice(0, 14).map((j) => `${j.title} — ${j.org}`);
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden}
      className="flex shrink-0 items-center gap-8 pr-8 font-mono text-[11px] uppercase tracking-wider"
    >
      {items.map((text, i) => (
        <li key={i} className="flex items-center gap-8 whitespace-nowrap">
          <span>{text}</span>
          <span className="text-cardinal">✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-b border-line bg-ink py-2 text-paper" aria-label="Latest listings">
      <div className="ticker-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
