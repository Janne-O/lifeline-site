# Editing the Huomen website

The website copy lives in the `content` folder. Most updates only require editing a Markdown file and refreshing the local preview.

## Change the homepage

- `content/home.md` controls the title, introduction, private-testing label, platform line, and optional main screenshot.
- `content/sections/privacy.md` controls the homepage privacy statement.
- `content/sections/closing.md` controls the final call to action.

The lines between `---` marks are settings. The text below them is the visible paragraph copy.

## Add a feature and screenshot

1. Copy `content/templates/feature.md` into `content/features/`.
2. Rename the copy to something meaningful, such as `voice-notes.md`.
3. Optionally put a screenshot in `public/screenshots/`.
4. Set `image` to `/screenshots/your-file.png`, write an accurate `imageAlt`, and change `showImage` to `true` when it is current and safe to share.
5. Set `order` to control placement and change `published` to `true` when it is ready.

Features appear as a compact list. No component code needs to change.

To show a larger screenshot below the homepage introduction, set `showImage: true` in `content/home.md`. It is hidden by default so the design never depends on an outdated or private screenshot.

## Add a support question

Copy `content/templates/faq.md` into `content/faqs/`, add the question and answer, choose its order, and set `published: true`.

## Edit the other pages

- `content/privacy.md` contains the privacy page.
- `content/support.md` contains the support-page introduction.
- `content/sections/reporting.md` contains the support checklist.

Use `##` headings in the privacy page to create numbered sections.

## Markdown supported

The content renderer supports paragraphs, `##` and `###` headings, simple lists, **bold text**, and `[links](https://example.com)`.

Keep a draft out of collections with `published: false`. If a setting contains a colon, wrap the whole value in quotation marks.

## Run the private preview

```bash
pnpm dev
```

Use the localhost address printed in the terminal. This does not publish the website.
