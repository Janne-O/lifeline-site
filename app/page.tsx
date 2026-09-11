import Link from "next/link";
import { Markdown } from "./components/Markdown";
import { field, getCollection, getDocument } from "@/lib/content";
import { withBasePath } from "@/lib/paths";

const home = getDocument("home.md");
const features = getCollection("features");
const privacy = getDocument("sections/privacy.md");
const closing = getDocument("sections/closing.md");

export default function Home() {
  const showMainScreenshot = field(home, "showImage", "false") === "true";

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
          <p className="testing-label">
            <span aria-hidden="true" />
            {field(home, "availabilityLabel", "Private testing")}
          </p>
          <p className="platform-line">{field(home, "platformLine")}</p>
        </header>

        {showMainScreenshot && (
          <figure className="main-screenshot">
            <img
              src={withBasePath(field(home, "image"))}
              alt={field(home, "imageAlt")}
              width={1179}
              height={2556}
            />
          </figure>
        )}

        <section className="feature-summary" aria-label="What Huomen does">
          <ul>
            {features.map((feature, index) => {
              const showScreenshot = field(feature, "showImage", "false") === "true";
              return (
                <li key={feature.slug}>
                  <span className={`feature-dot feature-dot-${index + 1}`} aria-hidden="true" />
                  <div>
                    <h2>{field(feature, "title")}</h2>
                    <Markdown>{feature.body}</Markdown>
                    {showScreenshot && (
                      <figure className="feature-screenshot">
                        <img
                          src={withBasePath(field(feature, "image"))}
                          alt={field(feature, "imageAlt")}
                          loading="lazy"
                        />
                      </figure>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <article className="home-notes">
          <section>
            <h2>{field(privacy, "title")}</h2>
            <Markdown>{privacy.body}</Markdown>
            <Link href={field(privacy, "linkHref", "/privacy")}>
              {field(privacy, "linkLabel", "Read the privacy overview")} →
            </Link>
          </section>

          <section>
            <h2>{field(closing, "title")}</h2>
            <Markdown>{closing.body}</Markdown>
            <Link href={field(closing, "linkHref", "/support")}>
              {field(closing, "linkLabel", "Visit support")} →
            </Link>
          </section>
        </article>

        <footer className="home-footer">
          <p>Made in Finland.</p>
          <p>
            © {new Date().getFullYear()} · <Link href="/privacy">Privacy</Link> ·{" "}
            <Link href="/support">Support</Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
