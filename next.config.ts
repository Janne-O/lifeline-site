import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "lifeline-site";
const isUserSite = repositoryName.toLowerCase().endsWith(".github.io");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ??
  (isGitHubPages && !isUserSite ? `/${repositoryName}` : "");

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath,
        assetPrefix: basePath,
        images: { unoptimized: true },
      }
    : {}),
  typescript: {
    tsconfigPath: isGitHubPages ? "tsconfig.pages.json" : "tsconfig.json",
  },
};

export default nextConfig;
