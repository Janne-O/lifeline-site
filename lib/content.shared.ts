export type ContentValue = string | number | boolean;

export type ContentDocument = {
  slug: string;
  data: Record<string, ContentValue>;
  body: string;
};

function parseValue(value: string): ContentValue {
  const trimmed = value.trim();
  const unquoted = trimmed.match(/^(?:"([\s\S]*)"|'([\s\S]*)')$/);

  if (unquoted) return unquoted[1] ?? unquoted[2] ?? "";
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) return Number(trimmed);
  return trimmed;
}

export function parseContent(source: string, slug = ""): ContentDocument {
  const normalized = source.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) return { slug, data: {}, body: normalized.trim() };

  const data: Record<string, ContentValue> = {};
  for (const line of match[1].split("\n")) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    data[line.slice(0, separator).trim()] = parseValue(line.slice(separator + 1));
  }

  return { slug, data, body: match[2].trim() };
}

export function field(document: ContentDocument, key: string, fallback = "") {
  const value = document.data[key];
  return value === undefined ? fallback : String(value);
}
