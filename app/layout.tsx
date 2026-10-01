import type { Metadata } from "next";
import { basePath } from "@/lib/paths";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import "./globals.css";

export function generateMetadata(): Metadata {
  const repository = process.env.GITHUB_REPOSITORY ?? "Janne-O/lifeline-site";
  const [owner, name] = repository.split("/");
  const pagesURL = `https://${owner}.github.io/${name}`;
  const siteURL = (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.GITHUB_PAGES === "true" ? pagesURL : "https://huomen.app")
  ).replace(/\/$/, "");
  const socialImage = `${siteURL}/og.png`;

  return {
    metadataBase: new URL(`${siteURL}/`),
    title: {
      default: "Huomen — Remember the shape of your days",
      template: "%s — Huomen",
    },
    description:
      "A private journal for the moments you want to remember. Capture notes, photos, and voice recordings, and return to your day as a timeline.",
    icons: {
      icon: `${basePath}/assets/lifeline-icon.png`,
      apple: `${basePath}/assets/lifeline-icon.png`,
    },
    openGraph: {
      type: "website",
      siteName: "Huomen",
      title: "Remember the shape of your days.",
      description: "A private life journal that gathers everyday moments into a timeline only you can see.",
      images: [{ url: socialImage, width: 1730, height: 909, alt: "Huomen — Remember the shape of your days" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Huomen — Remember the shape of your days",
      description: "A private life journal that gathers everyday moments into a timeline only you can see.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="site-frame">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
