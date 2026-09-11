import Link from "next/link";
import { Markdown } from "../components/Markdown";
import { field, getCollection, getDocument } from "@/lib/content";
import { withBasePath } from "@/lib/paths";

const support = getDocument("support.md");
const faqs = getCollection("faqs");
const reporting = getDocument("sections/reporting.md");

export const metadata = {
  title: field(support, "metaTitle", "Support"),
  description: field(support, "metaDescription"),
};

export default function SupportPage() {
  return (
    <main className="legal-page support-page">
      <header className="legal-header shell">
        <Link className="brand" href="/">
          <img className="brand-icon" src={withBasePath("/assets/lifeline-icon.png")} alt="" width={42} height={42} />
          <span>Huomen</span>
        </Link>
        <Link className="back-link" href="/">← Back to Huomen</Link>
      </header>
      <section className="support-hero shell">
        <p className="kicker"><span className="pulse" />{field(support, "kicker")}</p>
        <h1>{field(support, "title")}</h1>
        <p>{field(support, "intro")}</p>
        <a className="button button-primary" href={field(support, "linkHref")}>
          {field(support, "linkLabel")} <span aria-hidden="true">↗</span>
        </a>
      </section>
      <section className="faq shell" aria-labelledby="faq-title">
        <p className="section-label">{field(support, "faqKicker")}</p>
        <h2 id="faq-title">{field(support, "faqTitle")}</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.slug} open={index === 0}>
              <summary>{field(faq, "title")}<span aria-hidden="true">+</span></summary>
              <div><Markdown>{faq.body}</Markdown></div>
            </details>
          ))}
        </div>
      </section>
      <section className="diagnostic-card shell">
        <div>
          <p className="section-label">{field(reporting, "kicker")}</p>
          <h2>{field(reporting, "title")}</h2>
        </div>
        <Markdown>{reporting.body}</Markdown>
      </section>
    </main>
  );
}
