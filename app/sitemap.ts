import type { MetadataRoute } from "next";
import { META } from "@/lib/data";
import { MAJOR_GROUPS } from "@/lib/majors";
import { TRACKS } from "@/lib/tracks";

export const dynamic = "force-static";

const BASE = "https://patrickwokk.github.io/JobAroundMe";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(META.lastRefreshed);
  const routes = [
    "",
    "/jobs",
    "/labs",
    "/clubs",
    "/tracks",
    "/connect",
    "/employers",
    "/how-it-works",
    ...MAJOR_GROUPS.map((g) => `/majors/${g.slug}`),
    ...TRACKS.map((t) => `/tracks/${t.slug}`),
  ];
  return routes.map((route) => ({
    url: `${BASE}${route}/`,
    lastModified,
    changeFrequency: route === "" || route === "/jobs" ? "daily" : "weekly",
    priority: route === "" ? 1 : route.startsWith("/majors") || route.startsWith("/tracks") ? 0.8 : 0.6,
  }));
}
