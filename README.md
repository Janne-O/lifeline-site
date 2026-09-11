# Huomen website

Product, privacy, and support website for Huomen—a private life-tracking journal for Apple devices.

Website copy, feature entries, screenshots, and FAQs are managed through Markdown. See [EDITING.md](./EDITING.md) for the short editing guide and copyable templates.

## Local development

```bash
pnpm install
pnpm dev
```

The site is built with Next.js and exports to static HTML for GitHub Pages.

## GitHub Pages

Pushes to `main` automatically build the same Markdown content as a static site and deploy it through GitHub Pages. The deployment workflow lives in `.github/workflows/pages.yml`.

## Pages

- `/` — product overview
- `/privacy` — plain-language privacy overview
- `/support` — FAQs and issue-reporting guidance

The app screenshots and icon are sourced from the Huomen app project. The public-facing map screenshot uses simulated data.
