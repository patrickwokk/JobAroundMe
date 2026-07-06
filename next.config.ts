import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export — deployable to GitHub Pages (or any static host) at $0.
  output: "export",
  // GitHub Pages serves project sites under /<repo>; the deploy workflow sets this.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  // Pages doesn't rewrite /jobs → jobs.html, so emit folder/index.html instead.
  trailingSlash: true,
};

export default nextConfig;
