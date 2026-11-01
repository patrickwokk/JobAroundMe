/**
 * Launch configuration — the one file to edit when setting Jam up.
 *
 * SITE_URL and REPO_URL are derived at build time from wherever the GitHub repo
 * lives (see next.config.ts and .github/workflows/deploy.yml), so moving the
 * repo to an organization or adding a custom domain needs no code changes.
 */

export const SITE_NAME = "Jam";
export const SITE_LONG_NAME = "Job Around Me";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");
export const REPO_URL = (process.env.NEXT_PUBLIC_REPO_URL || "").replace(/\/+$/, "");

/**
 * Project inbox for reports and suggestions — use a dedicated address, never a
 * personal one. While empty, reports fall back to GitHub issues.
 */
export const CONTACT_EMAIL = "";

/**
 * Discord invite for the Referral Board (Server Settings → Invites → never
 * expires). While empty, /connect shows an "opening soon" state.
 */
export const DISCORD_INVITE_URL = "";

function mailto(subject: string, body: string): string {
  const params = new URLSearchParams({ subject, body });
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${CONTACT_EMAIL}?${params.toString().replace(/\+/g, "%20")}`;
}

function githubIssue(title: string, body: string): string {
  return `${REPO_URL}/issues/new?${new URLSearchParams({ title, body }).toString()}`;
}

/** Where a "this listing is filled" report goes. Null when no channel is configured. */
export function reportFilledHref(jobId: string, title: string): string | null {
  const subject = `Filled or expired: ${title}`;
  const body = `Listing ${jobId} ("${title}") looks filled or gone.\n\nHow do you know? (optional)\n`;
  if (CONTACT_EMAIL) return mailto(subject, body);
  if (REPO_URL) {
    return githubIssue(
      subject,
      `${body}\n---\nMaintainers: add \`${jobId}\` to \`data/overrides.json\` with status \`filled\`.`,
    );
  }
  return null;
}

/** Where "suggest a listing / lab / club" goes. Null when no channel is configured. */
export function suggestHref(): string | null {
  const subject = "Suggestion for Jam";
  const body = "What is it? (job, lab, club, or program)\n\nLink:\n\nWhy it's meaningful for students:\n";
  if (CONTACT_EMAIL) return mailto(subject, body);
  if (REPO_URL) return githubIssue(subject, body);
  return null;
}

/** HogSync (CampusGroups) is the official U of A club directory. */
export function hogsyncUrl(searchTerm: string): string {
  return `https://hogsync.uark.edu/club_signup?search=${encodeURIComponent(searchTerm)}`;
}
