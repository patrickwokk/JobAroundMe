import { META, VISIBLE_JOBS } from "@/lib/data";
import { REPO_URL } from "@/lib/site";

export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const site = "https://patrickwokk.github.io/JobAroundMe";
  const items = VISIBLE_JOBS.slice(0, 25)
    .map((j) => {
      const date = new Date(j.postedAt ?? j.firstSeenAt).toUTCString();
      return `    <item>
      <title>${esc(`${j.title} — ${j.org}`)}</title>
      <link>${esc(j.applyUrl)}</link>
      <guid isPermaLink="false">${esc(j.id)}</guid>
      <pubDate>${date}</pubDate>
      <description>${esc(`${j.blurb} (${j.location}${j.pay ? ` · ${j.pay}` : ""})`)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>JobAroundMe — U of A student listings</title>
    <link>${site}</link>
    <description>Meaningful student work at the University of Arkansas — new campus jobs, research openings and NWA internships.</description>
    <lastBuildDate>${new Date(META.lastRefreshed).toUTCString()}</lastBuildDate>
    <docs>${REPO_URL}</docs>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
