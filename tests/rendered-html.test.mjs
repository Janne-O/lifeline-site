import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const route = pathname === "/" ? "index.html" : `${pathname.slice(1)}/index.html`;
  return readFile(new URL(`../out/${route}`, import.meta.url), "utf8");
}

test("server-renders the Huomen product page", async () => {
  const html = await render();
  assert.match(html, /<title>Huomen — Remember the shape of your days<\/title>/i);
  assert.match(html, /Remember the shape of your days\./);
  assert.match(html, /Download Huomen/);
  assert.equal((html.match(/class="app-store-badge"/g) ?? []).length, 2);
  assert.match(html, /developer\.apple\.com\/assets\/elements\/badges\/download-on-the-app-store\.svg/);
  assert.match(html, /Capture a moment in seconds\./);
  assert.match(html, /See your day come together\./);
  assert.match(html, /Remember where it happened\./);
  assert.doesNotMatch(html, /Private testing|being prepared for release/);
  assert.match(html, /Your life is not a data product\./);
  assert.match(html, /\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("links to the feature overview and renders feature details from Markdown", async () => {
  const [home, features] = await Promise.all([render(), render("/features")]);
  assert.match(home, /href="\/features\/"/);
  assert.match(home, /Type, speak, or tap a quick option/);
  assert.doesNotMatch(home, /Each entry keeps its time/);
  assert.match(features, /A closer look at Huomen\./);
  assert.match(features, /Each entry keeps its time/);
  assert.match(features, /A fictional day in Huomen\./);
  assert.match(features, /src="\/screenshots\/huomen-timeline-demo\.png"/);
  assert.match(features, /Download Huomen/);
  assert.match(features, /class="app-store-badge"/);
});

test("links to the editable story page above the homepage footer", async () => {
  const [home, story] = await Promise.all([render(), render("/story")]);
  assert.match(home, /class="story-link-section"[\s\S]*href="\/story\/">Story behind Huomen/);
  assert.match(home, /Read about the ideas and decisions behind the app\./);
  assert.ok(home.indexOf('class="story-link-section"') < home.indexOf('class="site-footer shell"'));
  assert.match(story, /<title>Story behind Huomen — Huomen<\/title>/);
  assert.match(story, /class="story-body"/);
  assert.equal((story.match(/<hr\/>/g) ?? []).length, 2);
  assert.match(story, /href="\/plus">the extra features<\/a>/);
  assert.match(story, /href="\/features\/"/);
  assert.match(story, /class="story-actions"[\s\S]*class="app-store-badge"[\s\S]*href="\/features\/">Explore the features/);
});

test("shows shared navigation and footer on every page, including News", async () => {
  const pages = await Promise.all(
    ["/", "/features", "/news", "/plus", "/privacy", "/story", "/support"].map(render),
  );

  for (const html of pages) {
    assert.match(html, /aria-label="Main navigation"/);
    for (const route of ["features", "news", "privacy", "support"]) {
      assert.match(html, new RegExp(`href="/${route}/"`));
    }
    assert.match(html, /class="site-footer shell"/);
    assert.match(html, /Made in Finland\./);
    assert.match(html, /© 2026 Lumisade Technologies/);
  }

  assert.match(pages[2], /<title>News — Huomen<\/title>/);
  assert.match(pages[2], /Nothing to announce yet\./);
});

test("links to the editable Huomen+ page and lists the paid features", async () => {
  const [home, features, plus, story] = await Promise.all([
    render(),
    render("/features"),
    render("/plus"),
    render("/story"),
  ]);
  assert.match(home, /href="\/plus\/">See what Huomen\+ adds/);
  assert.match(features, /href="\/plus\/">See what Huomen\+ adds/);
  assert.match(plus, /<title>Huomen\+ features — Huomen<\/title>/);
  assert.match(plus, /class="app-store-badge"/);
  assert.match(story, /class="app-store-badge"/);
  for (const feature of [
    "Health workouts",
    "Daily activity context",
    "Calendar and Reminders",
    "Track My Day",
    "Export profiles",
    "Pixel theme",
  ]) {
    assert.match(plus, new RegExp(feature));
  }
  assert.match(plus, /The essentials stay free\./);
});

test("renders privacy and support routes", async () => {
  const [privacy, support] = await Promise.all([
    render("/privacy"),
    render("/support"),
  ]);
  assert.match(privacy, /Your life stays yours\./);
  assert.match(privacy, /No advertising profile/);
  assert.match(support, /How can we help\?/);
  assert.match(support, /Why is an entry missing from another device\?/);
  assert.match(support, /Email support/);
  assert.match(support, /href="mailto:support@lumisade\.co\?subject=Huomen-problem"/);
  assert.doesNotMatch(support, /Huomen%20support/);
  assert.doesNotMatch(support, /issue tracker|Open an issue|github\.com\/Janne-O\/LifeLine\/issues/i);
});

test("uses custom-domain links and assets", async () => {
  const html = await render();
  assert.match(html, /href="\/privacy\/"/);
  assert.match(html, /src="\/assets\/lifeline-icon\.png"/);
  assert.match(html, /https:\/\/huomen\.app\/og\.png/);
  assert.doesNotMatch(html, /(?:href|src)="\/lifeline-site\//);
});

test("ships the branded visual assets without starter dependencies", async () => {
  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await Promise.all([
    access(new URL("../public/assets/lifeline-icon.png", import.meta.url)),
    access(new URL("../public/assets/pixel-day.png", import.meta.url)),
    access(new URL("../public/assets/pixel-night.png", import.meta.url)),
    access(new URL("../public/screenshots/huomen-timeline-demo.png", import.meta.url)),
    access(new URL("../public/screenshots/day-map-simulated.png", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
});

test("includes the editable content guide and copyable templates", async () => {
  const [guide, featureTemplate, faqTemplate] = await Promise.all([
    readFile(new URL("../EDITING.md", import.meta.url), "utf8"),
    readFile(new URL("../content/templates/feature.md", import.meta.url), "utf8"),
    readFile(new URL("../content/templates/faq.md", import.meta.url), "utf8"),
  ]);

  assert.match(guide, /Add a feature and screenshot/);
  assert.match(featureTemplate, /published: false/);
  assert.match(faqTemplate, /published: false/);
});
