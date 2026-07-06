/** Repo home — used for "report this listing" issue links and the footer. */
export const REPO_URL = "https://github.com/patrickwokk/JobAroundMe";

/** The referral board pilot lives on GitHub Discussions (free, spam-resistant). */
export const DISCUSSIONS_URL = `${REPO_URL}/discussions`;

/** HogSync (CampusGroups) is UofA's official club directory. */
export function hogsyncUrl(searchTerm: string): string {
  return `https://hogsync.uark.edu/club_signup?search=${encodeURIComponent(searchTerm)}`;
}

export function reportFilledUrl(jobId: string, title: string): string {
  const params = new URLSearchParams({
    title: `Filled/expired: ${title}`,
    body: [
      `Listing \`${jobId}\` ("${title}") appears to be filled or gone.`,
      "",
      "How do you know? (optional)",
      "",
      "---",
      "Maintainers: add this id to `data/overrides.json` with status `filled`.",
    ].join("\n"),
    labels: "listing-report",
  });
  return `${REPO_URL}/issues/new?${params.toString()}`;
}

export function suggestListingUrl(): string {
  const params = new URLSearchParams({
    title: "Suggest a listing: ",
    body: [
      "**What is it?** (job / lab / internship program)",
      "",
      "**Link:**",
      "",
      "**Why it's meaningful for students:**",
      "",
      "---",
      "Maintainers: add it to `data/curated/programs.json` or `data/curated/labs.json`.",
    ].join("\n"),
    labels: "suggestion",
  });
  return `${REPO_URL}/issues/new?${params.toString()}`;
}
