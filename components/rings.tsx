/** Concentric "around me" rings — the logo's location ping, at landscape scale. */
export function Rings({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 800" fill="none" aria-hidden className={className}>
      {[70, 140, 210, 280, 350].map((r, i) => (
        <circle
          key={r}
          cx="400"
          cy="400"
          r={r}
          stroke="currentColor"
          strokeWidth="1"
          opacity={1 - i * 0.17}
          className={i === 1 ? "ring-breathe" : undefined}
        />
      ))}
      <circle cx="400" cy="400" r="7" className="fill-brand" />
      <circle cx="400" cy="400" r="16" className="stroke-brand" strokeOpacity="0.35" strokeWidth="1.5" />
    </svg>
  );
}
