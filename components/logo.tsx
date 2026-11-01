/**
 * The Jam mark: a lowercase "j" whose dot is a location ping — Job, Around Me.
 * Geometry is mirrored in scripts/brand-assets.ts (favicon, app icons, OG card);
 * change both together.
 */
export function JamMark({ className = "size-8", title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <rect width="64" height="64" rx="15" className="fill-brand" />
      <circle cx="35" cy="15" r="8" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
      <circle cx="35" cy="15" r="4.25" fill="#fff" />
      <path d="M35 31v15a9 9 0 0 1-9 9h-3" fill="none" stroke="#fff" strokeWidth="7.5" strokeLinecap="round" />
    </svg>
  );
}

export function JamLogo({ className = "", markClassName = "size-8" }: { className?: string; markClassName?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <JamMark className={markClassName} />
      <span className="text-[1.375rem] font-extrabold leading-none tracking-[-0.045em]">Jam</span>
    </span>
  );
}
