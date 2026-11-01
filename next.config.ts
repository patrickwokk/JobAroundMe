import type { NextConfig } from "next";
import { execSync } from "node:child_process";

/**
 * The repo URL is derived from the git remote, so no owner name is hardcoded
 * anywhere in the source. In CI, deploy.yml sets these explicitly (and handles
 * custom domains); locally this fallback keeps the GitHub links working.
 */
function originRepoUrl(): string {
  try {
    const remote = execSync("git remote get-url origin", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    const m = remote.match(/github\.com[:/]([^/]+)\/([^/]+?)(?:\.git)?$/);
    return m ? `https://github.com/${m[1]}/${m[2]}` : "";
  } catch {
    return "";
  }
}

const nextConfig: NextConfig = {
  // Fully static export — deployable to GitHub Pages (or any static host) at $0.
  output: "export",
  // GitHub Pages serves project sites under /<repo>; deploy.yml sets this.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // Pages doesn't rewrite /jobs → jobs.html, so emit folder/index.html instead.
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_REPO_URL: process.env.NEXT_PUBLIC_REPO_URL || originRepoUrl(),
  },
};

export default nextConfig;
