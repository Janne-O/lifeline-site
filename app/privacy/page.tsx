import Link from "next/link";
import { Markdown } from "../components/Markdown";
import { field, getDocument } from "@/lib/content";

export function generateMetadata() {
  const privacy = getDocument("privacy.md");
  return {
    title: field(privacy, "metaTitle", "Privacy"),
    description: field(privacy, "metaDescription"),
  };
}

export default function PrivacyPage() {
  const privacy = getDocument("privacy.md");
  const sections = privacy.body.split(/\n(?=## )/).map((section) => {
    const match = section.match(/^##\s+(.+)\n+([\s\S]*)$/);
    return match ? { title: match[1], body: match[2] } : { title: "", body: section };
  });

  return (
    <main className="legal-page">
      <article className="legal-content shell">
        <p className="kicker"><span className="pulse" />{field(privacy, "kicker")}</p>
        <h1>{field(privacy, "title")}</h1>
        <p className="legal-intro">{field(privacy, "intro")}</p>
        <p className="updated">Last updated {field(privacy, "updated")}</p>
        <div className="legal-sections">
          {sections.map((section, index) => (
            <section key={section.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.title}</h2>
                <Markdown>{section.body}</Markdown>
              </div>
            </section>
          ))}
        </div>
        <aside className="legal-note">
          <h2>{field(privacy, "noteTitle")}</h2>
          <p>{field(privacy, "noteBody")}</p>
          <Link className="button button-primary" href={field(privacy, "noteHref", "/support")}>
            {field(privacy, "noteLabel")}
          </Link>
        </aside>
      </article>
    </main>
  );
}
