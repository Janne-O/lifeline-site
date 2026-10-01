import { field, type ContentDocument } from "@/lib/content";
import { withBasePath } from "@/lib/paths";

/** Optional image settings shared by homepage and feature Markdown files. */
export function ContentImage({ document, prominent = false }: {
  document: ContentDocument;
  prominent?: boolean;
}) {
  const source = field(document, "image");
  if (field(document, "showImage", "false") !== "true" || !source) return null;
  const caption = field(document, "imageCaption");
  const format = field(document, "imageFormat", "phone") === "wide" ? "wide" : "phone";

  return (
    <figure className={`content-image content-image-${format}${prominent ? " content-image-prominent" : ""}`}>
      <div className="screenshot-frame">
        <img src={withBasePath(source)} alt={field(document, "imageAlt")}
          loading={prominent ? "eager" : "lazy"} decoding="async" />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
