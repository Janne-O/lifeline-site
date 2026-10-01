import Link from "next/link";
import { Markdown } from "../components/Markdown";
import { AppStoreBadge } from "../components/AppStoreBadge";
import { field, getDocument } from "@/lib/content";

export function generateMetadata() {
  const story = getDocument("story.md");
  return {
    title: field(story, "metaTitle", "Story behind Huomen"),
    description: field(story, "metaDescription"),
  };
}

export default function StoryPage() {
  const story = getDocument("story.md");
  const home = getDocument("home.md");
  const downloadHref = field(home, "downloadHref");
  const downloadLabel = field(home, "downloadLabel", "Download Huomen");

  return (
    <main className="story-page">
      <article className="story-content shell">
        <header className="story-hero">
          <p className="kicker"><span className="pulse" />{field(story, "kicker")}</p>
          <h1>{field(story, "title")}</h1>
          <p className="story-intro">{field(story, "intro")}</p>
        </header>

        <div className="story-body"><Markdown>{story.body}</Markdown></div>

        <aside className="story-outro">
          <h2>{field(story, "closingTitle")}</h2>
          <p>{field(story, "closingBody")}</p>
          <div className="story-actions">
            {downloadHref && <AppStoreBadge href={downloadHref} label={downloadLabel} />}
            <Link href="/features">Explore the features →</Link>
          </div>
        </aside>
      </article>

    </main>
  );
}
