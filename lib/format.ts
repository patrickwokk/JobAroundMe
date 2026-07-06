const DAY = 86_400_000;

export function relTime(iso: string, now: number = Date.now()): string {
  const days = Math.floor((now - Date.parse(iso)) / DAY);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Chicago",
  });
}

/**
 * True when a lab's latest post is recent enough to be worth showing.
 * `refMs` should be the data refresh time so server and client render alike.
 */
export function isRecent(iso: string | undefined, refMs: number, months = 30): boolean {
  if (!iso) return false;
  return refMs - Date.parse(iso) < months * 30 * DAY;
}
