import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  field,
  parseContent,
  type ContentDocument,
} from "./content.shared";

export { field, parseContent, type ContentDocument } from "./content.shared";

const contentDirectory = join(process.cwd(), "content");

export function getDocument(path: string): ContentDocument {
  const normalizedPath = path.replace(/^\/+/, "");
  const source = readFileSync(join(contentDirectory, normalizedPath), "utf8");
  return parseContent(source, normalizedPath.replace(/\.md$/, ""));
}

export function getCollection(folder: string): ContentDocument[] {
  const normalizedFolder = folder.replace(/^\/+|\/+$/g, "");
  const directory = join(contentDirectory, normalizedFolder);

  return readdirSync(directory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const source = readFileSync(join(directory, name), "utf8");
      return parseContent(source, name.slice(0, -3));
    })
    .filter((document) => document.data.published !== false)
    .sort((left, right) => {
      const leftOrder = Number(left.data.order ?? 999);
      const rightOrder = Number(right.data.order ?? 999);
      return leftOrder - rightOrder || left.slug.localeCompare(right.slug);
    });
}
