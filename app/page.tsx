import Link from "next/link";
import { Markdown } from "./components/Markdown";
import { ContentImage } from "./components/ContentImage";
import { AppStoreBadge } from "./components/AppStoreBadge";
import { field, getCollection, getDocument } from "@/lib/content";
import { withBasePath } from "@/lib/paths";

export default function Home() {
  const home = getDocument("home.md");
  const features = getCollection("features");
  const privacy = getDocument("sections/privacy.md");
  const closing = getDocument("sections/closing.md");
  const downloadHref = field(home, "downloadHref");
  const downloadLabel = field(home, "downloadLabel", "Download Huomen");

  return (
    <main className="home-page">
      <div className="home-shell">
        <header className="home-hero">
          <img
            className="app-icon"
            src={withBasePath("/assets/lifeline-icon.png")}
            alt=""
            width={118}
            height={118}
          />
          <h1>Huomen</h1>
          <p className="tagline">{field(home, "title")}</p>
          <div className="home-intro"><Markdown>{home.body}</Markdown></div>
          {downloadHref && <AppStoreBadge href={downloadHref} label={downloadLabel} />}
          <p className="download-note">{field(home, "downloadNote", "Available on the App Store")}</p>
          <p className="platform-line">{field(home, "platformLine")}</p>
        </header>

        <ContentImage document={home} prominent />

        <section className="feature-summary" aria-label="What Huomen does">
          <ul>
            {features.map((feature) => {
              return (
                <li key={feature.slug}>
                  <span className="feature-dot" aria-hidden="true" />
                  <div>
                    <h2>{field(feature, "title")}</h2>
                    <Markdown>{field(feature, "summary", feature.body)}</Markdown>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="feature-summary-links">
            <Link className="feature-summary-link" href="/features">Explore all features →</Link>
            <Link className="feature-summary-link" href="/plus">See what Huomen+ adds →</Link>
          </div>
        </section>

        <article className="home-notes">
          <section>
            <h2>{field(privacy, "title")}</h2>
            <Markdown>{privacy.body}</Markdown>
            <ContentImage document={privacy} />
            <Link href={field(privacy, "linkHref", "/privacy")}>
              {field(privacy, "linkLabel", "Read the privacy overview")} →
            </Link>
          </section>

          <section className="closing-section">
            <h2>{field(closing, "title")}</h2>
            <Markdown>{closing.body}</Markdown>
            <ContentImage document={closing} />
            {downloadHref && <AppStoreBadge href={downloadHref} label={downloadLabel} />}
          </section>
        </article>

        <aside className="story-link-section">
          <Link href="/story">
            {field(home, "storyLinkLabel", "Story behind Huomen")} <span aria-hidden="true">→</span>
          </Link>
          <p>{field(home, "storyLinkDescription")}</p>
        </aside>

      </div>
    </main>
  );
}
