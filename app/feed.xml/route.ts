import { META, VISIBLE_JOBS } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const site = SITE_URL;
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
    <title>Jam — Job Around Me</title>
    <link>${site}/</link>
    <description>New campus jobs, research openings and Northwest Arkansas internships for University of Arkansas students.</description>
    <lastBuildDate>${new Date(META.lastRefreshed).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
