import { Markdown } from "../components/Markdown";
import { field, getCollection, getDocument } from "@/lib/content";

export function generateMetadata() {
  const news = getDocument("news.md");
  return {
    title: field(news, "metaTitle", "News"),
    description: field(news, "metaDescription"),
  };
}

function displayDate(value: string) {
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.valueOf())
    ? value
    : new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}

export default function NewsPage() {
  const news = getDocument("news.md");
  const posts = getCollection("news").sort((left, right) =>
    field(right, "date").localeCompare(field(left, "date")),
  );

  return (
    <main className="news-page">
      <div className="shell news-content">
        <header className="news-hero">
          <p className="kicker"><span className="pulse" />{field(news, "kicker", "Huomen news")}</p>
          <h1>{field(news, "title", "News")}</h1>
          <div className="news-intro"><Markdown>{news.body}</Markdown></div>
        </header>

        {posts.length ? (
          <section className="news-list" aria-label="News updates">
            {posts.map((post) => {
              const date = field(post, "date");
              return (
                <article className="news-entry" key={post.slug}>
                  {date && <time dateTime={date}>{displayDate(date)}</time>}
                  <h2>{field(post, "title")}</h2>
                  <div className="news-entry-body"><Markdown>{post.body}</Markdown></div>
                </article>
              );
            })}
          </section>
        ) : (
          <section className="news-empty">
            <h2>{field(news, "emptyTitle")}</h2>
            <p>{field(news, "emptyBody")}</p>
          </section>
        )}
      </div>
    </main>
  );
}
