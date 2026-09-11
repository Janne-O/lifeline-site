import { Fragment, type ReactNode } from "react";
import { withBasePath } from "@/lib/paths";

function inline(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return tokens.filter(Boolean).map((token, index) => {
    const strong = token.match(/^\*\*([^*]+)\*\*$/);
    if (strong) return <strong key={index}>{strong[1]}</strong>;

    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const candidate = /^(https?:\/\/|mailto:|\/|#)/i.test(link[2]) ? link[2] : "#";
      const href = candidate.startsWith("/") ? withBasePath(candidate) : candidate;
      return <a key={index} href={href}>{link[1]}</a>;
    }

    return <Fragment key={index}>{token}</Fragment>;
  });
}

type Block =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

function blocks(markdown: string): Block[] {
  const result: Block[] = [];
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) result.push({ type: "paragraph", text: paragraph.join(" ") });
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) result.push({ type: "list", items: list });
    list = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = line.match(/^(##|###)\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      result.push({ type: "heading", level: heading[1].length as 2 | 3, text: heading[2] });
      continue;
    }

    const item = line.match(/^[-*]\s+(.+)$/);
    if (item) {
      flushParagraph();
      list.push(item[1]);
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return result;
}

export function Markdown({ children }: { children: string }) {
  return blocks(children).map((block, index) => {
    if (block.type === "heading") {
      return block.level === 2
        ? <h2 key={index}>{inline(block.text)}</h2>
        : <h3 key={index}>{inline(block.text)}</h3>;
    }
    if (block.type === "list") {
      return <ul key={index}>{block.items.map((item) => <li key={item}>{inline(item)}</li>)}</ul>;
    }
    return <p key={index}>{inline(block.text)}</p>;
  });
}
