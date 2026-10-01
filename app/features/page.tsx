import Link from "next/link";
import { ContentImage } from "../components/ContentImage";
import { Markdown } from "../components/Markdown";
import { AppStoreBadge } from "../components/AppStoreBadge";
import { field, getCollection, getDocument } from "@/lib/content";

export function generateMetadata() {
  const overview = getDocument("features.md");
  return {
    title: field(overview, "metaTitle", "Features"),
    description: field(overview, "metaDescription"),
  };
}

export default function FeaturesPage() {
  const overview = getDocument("features.md");
  const features = getCollection("features");
  const home = getDocument("home.md");
  const downloadHref = field(home, "downloadHref");
  const downloadLabel = field(home, "downloadLabel", "Download Huomen");

  return (
    <main className="features-page">
      <div className="shell">
        <section className="features-hero">
          <p className="kicker"><span className="pulse" />{field(overview, "kicker")}</p>
          <h1>{field(overview, "title")}</h1>
          <div className="features-intro"><Markdown>{overview.body}</Markdown></div>
        </section>

        <div className="feature-details">
          {features.map((feature, index) => {
            const hasImage = field(feature, "showImage", "false") === "true" && Boolean(field(feature, "image"));
            const hasWideImage = hasImage && field(feature, "imageFormat") === "wide";
            return (
              <section className={`feature-detail${hasImage ? " feature-detail-with-image" : ""}${hasWideImage ? " feature-detail-wide-image" : ""}`} id={feature.slug} key={feature.slug}>
                <div className="feature-detail-copy">
                  <p className="feature-detail-label">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {field(feature, "eyebrow", "Feature")}
                  </p>
                  <h2>{field(feature, "title")}</h2>
                  <div className="feature-detail-body"><Markdown>{feature.body}</Markdown></div>
                </div>
                <ContentImage document={feature} />
              </section>
            );
          })}
        </div>

        <section className="features-cta">
          <h2>{field(overview, "ctaTitle", "Keep the moments that matter to you.")}</h2>
          <p>{field(overview, "ctaBody")}</p>
          <Link className="features-plus-link" href="/plus">See what Huomen+ adds →</Link>
          {downloadHref && <AppStoreBadge href={downloadHref} label={downloadLabel} />}
        </section>

      </div>
    </main>
  );
}
