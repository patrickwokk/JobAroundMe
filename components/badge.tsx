import type { ReactNode } from "react";

const TONES = {
  neutral: "bg-muted text-fg-muted",
  outline: "border border-line text-fg-muted",
  brand: "bg-brand text-white",
  accent: "bg-brand-wash text-accent",
  ok: "bg-ok-wash text-ok",
  warn: "bg-warn-wash text-warn",
} as const;

export function Badge({
  tone = "neutral",
  className = "",
  children,
}: {
  tone?: keyof typeof TONES;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium leading-5 ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
