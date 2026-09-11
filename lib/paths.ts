const repository = process.env.GITHUB_REPOSITORY ?? "Janne-O/lifeline-site";
const repositoryName = repository.split("/")[1] ?? "lifeline-site";
const isUserSite = repositoryName.toLowerCase().endsWith(".github.io");
const pagesBasePath = process.env.GITHUB_PAGES === "true" && !isUserSite
  ? `/${repositoryName}`
  : "";

export const basePath = (
  process.env.NEXT_PUBLIC_BASE_PATH ?? pagesBasePath
).replace(/\/$/, "");

export function withBasePath(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${basePath}${path}`;
}
