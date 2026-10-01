# Editing the Huomen website

The website copy lives in the `content` folder. Most updates only require editing a Markdown file and refreshing the local preview.

## Change the homepage

- `content/home.md` controls the title, introduction, App Store download link, platform line, story link above the footer, and optional main screenshot.
- `content/sections/privacy.md` controls the homepage privacy statement.
- `content/sections/closing.md` controls the final call-to-action copy. Both download buttons use `downloadHref` and `downloadLabel` from `content/home.md`.

The lines between `---` marks are settings. The text below them is the visible paragraph copy.

## Add a feature and screenshot

`content/features.md` controls the Features page introduction and final call to action. Each file in `content/features/` supplies one feature: its `summary` appears on the homepage, while its Markdown body and optional screenshot appear on `/features`.

1. Copy `content/templates/feature.md` into `content/features/`.
2. Rename the copy to something meaningful, such as `voice-notes.md`.
3. Optionally put a screenshot in `public/screenshots/`.
4. Write a short `summary` for the homepage and the fuller explanation below the second `---` line.
5. Set `image` to `/screenshots/your-file.png`, write an accurate `imageAlt`, and change `showImage` to `true` when it is current and safe to share. Add `imageCaption` for an optional visible caption. Choose `imageFormat: phone` for portrait images or `imageFormat: wide` for landscape images. Images retain their original proportions.
6. Set `order` to control placement. The template starts with `published: false`, so change it to `true` when you want the feature to appear on both pages.

Published feature files are discovered automatically and appear on both pages. You do not need to add a reference to a page component. Screenshots in feature files appear on `/features`; the homepage keeps a compact summary list.

The main screenshot is configured in `content/home.md` using the same image fields. Set `showImage: false` to hide it. The privacy and closing sections also accept these fields, so you can add images there without changing the page code.

The current `huomen-timeline-demo.png` is a native render of Huomen's timeline components with fictional entries. It contains no personal journal data. The old `timeline-light.jpg` and `timeline-dark.jpg` are not used by the page; they contain old branding and personal content and should not be enabled for publication.

The download link uses the app's existing App Store Connect ID (`6793937529`). Verify the public listing before launch and update `downloadHref` if the ID changes. The website is written for a released product; this does not publish it. GitHub Pages deployment remains manual-only.

## Add a support question

Copy `content/templates/faq.md` into `content/faqs/`, add the question and answer, choose its order, and set `published: true`.

## Add news

`content/news.md` controls the News page introduction and its message when there are no published updates. To post a release note or other update:

1. Copy `content/templates/news.md` into `content/news/` and give it a unique filename.
2. Set `date` in `YYYY-MM-DD` format, write the title, and add the update below the second `---` line.
3. Change `published` to `true` when it is ready to appear. Published updates appear newest first; drafts remain hidden.

## Edit the other pages

- `content/story.md` contains the Story behind Huomen page. Edit its introduction and closing text above the second `---`, and its main story below it. Use `##` headings to divide the story into sections. The current copy is a product-design draft you can replace with your own account.
- `content/plus.md` contains the Huomen+ page. Edit the introduction, free-version note, and purchase note above the second `---`. The six list items below it are the paid-feature descriptions; add, remove, or reorder them there. The homepage and Features page link to `/plus` automatically.
- `content/privacy.md` contains the privacy page.
- `content/support.md` contains the support-page introduction.
- `content/sections/reporting.md` contains the support checklist.

Use `##` headings in the privacy page to create numbered sections.

## Markdown supported

The content renderer supports paragraphs, `##` and `###` headings, simple lists, horizontal lines (`---`), **bold text**, and `[links](https://example.com)`.
Use Markdown links for email too, such as `[email support](mailto:support@lumisade.co)`. Raw HTML tags are not supported.

Keep a draft out of collections with `published: false`. If a setting contains a colon, wrap the whole value in quotation marks.

## Run the private preview

```bash
pnpm dev
```

Use the localhost address printed in the terminal. This does not publish the website.
