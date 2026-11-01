/** Shared class recipes, so every page draws from the same small vocabulary. */
export const ui = {
  container: "mx-auto max-w-6xl px-4 sm:px-6",
  btnPrimary:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-[var(--elev-1)] transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60",
  btnSecondary:
    "inline-flex items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface px-4 py-2.5 text-sm font-semibold text-fg transition-colors hover:bg-muted",
  btnGhost:
    "inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-fg-muted transition-colors hover:bg-muted hover:text-fg",
  btnNight:
    "inline-flex items-center justify-center gap-2 rounded-lg border border-night-line bg-night-raised px-4 py-2.5 text-sm font-semibold text-night-fg transition-colors hover:border-night-muted",
  card: "rounded-xl border border-line bg-surface",
  cardHover:
    "transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-px hover:border-line-strong hover:shadow-[var(--elev-2)]",
  input:
    "w-full rounded-lg border border-line-strong bg-surface px-3 py-2 text-sm text-fg placeholder:text-fg-subtle transition-colors focus:border-fg-subtle",
  chip: "inline-flex items-center rounded-md border border-line bg-subtle px-2 py-0.5 text-xs text-fg-muted",
  link: "font-medium text-accent underline-offset-4 hover:underline",
  kicker: "text-sm font-semibold text-accent",
  h1: "text-4xl font-bold tracking-[-0.03em] sm:text-5xl",
  lede: "mt-4 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg",
};
