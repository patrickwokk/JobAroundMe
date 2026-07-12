import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JobAroundMe — U of A student work",
    short_name: "JobAroundMe",
    description:
      "Campus jobs, research labs, clubs and NWA internships that build a resume — for University of Arkansas students.",
    start_url: "./",
    display: "standalone",
    background_color: "#faf6ef",
    theme_color: "#9d2235",
    icons: [{ src: "icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
