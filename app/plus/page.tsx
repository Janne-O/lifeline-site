import { Markdown } from "../components/Markdown";
import { AppStoreBadge } from "../components/AppStoreBadge";
import { field, getDocument } from "@/lib/content";

export function generateMetadata() {
  const plus = getDocument("plus.md");
  return {
    title: field(plus, "metaTitle", "Huomen+ features"),
    description: field(plus, "metaDescription"),
  };
}

export default function PlusPage() {
  const plus = getDocument("plus.md");
  const home = getDocument("home.md");
  const downloadHref = field(home, "downloadHref");
  const downloadLabel = field(home, "downloadLabel", "Download Huomen");

  return (
    <main className="plus-page">
      <div className="shell plus-content">
        <header className="plus-hero">
          <p className="kicker"><span className="pulse" />{field(plus, "kicker", "Huomen+")}</p>
          <h1>{field(plus, "title")}</h1>
          <p>{field(plus, "intro")}</p>
        </header>

        <section className="plus-benefits" aria-labelledby="plus-benefits-title">
          <h2 id="plus-benefits-title">{field(plus, "featuresTitle", "What Huomen+ adds")}</h2>
          <Markdown>{plus.body}</Markdown>
        </section>

        <aside className="plus-free-note">
          <h2>{field(plus, "freeTitle")}</h2>
          <p>{field(plus, "freeBody")}</p>
          <p>{field(plus, "purchaseNote")}</p>
          <p className="plus-permission-note">{field(plus, "permissionNote")}</p>
          {downloadHref && <AppStoreBadge href={downloadHref} label={downloadLabel} />}
        </aside>

      </div>
    </main>
  );
}
