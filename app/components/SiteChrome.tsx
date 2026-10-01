import Link from "next/link";
import { withBasePath } from "@/lib/paths";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner shell">
        <Link className="brand" href="/" aria-label="Huomen home">
          <img className="brand-icon" src={withBasePath("/assets/lifeline-icon.png")} alt="" width={42} height={42} />
          <span>Huomen</span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/features">Features</Link>
          <Link href="/news">News</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/support">Support</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <p>Made in Finland.</p>
      <p>© 2026 Lumisade Technologies</p>
    </footer>
  );
}
