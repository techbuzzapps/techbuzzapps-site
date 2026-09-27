# TechBuzz Apps — Phase L1B Report
## Shared Component Architecture + Premium Learn Design System

Branch: `feature/TechBuzzLearn` · Nothing committed or pushed.

---

## 1. Objective

Make TechBuzz Learn maintainable and more polished without changing its identity:

- Shared site chrome (header, primary navigation, footer) gets **one source of truth**, so a change made once shows on every Learn page.
- The ad-hoc Learn CSS becomes a **token-based design system** made of reusable primitives.
- The landing page, track pages and the representative article get a restrained visual refinement.
- The existing navy/amber palette, the system font stack, the category-card concept, the URLs and the static HTML/CSS/vanilla JS deployment on GitHub Pages all stay.

## 2. Pre-change architecture

| Area | State before L1B |
|---|---|
| Learn header | ~10 lines of `<header class="site-header">` markup **copied into all 18 Learn pages**. |
| Learn footer | Footer markup **copied into all 18 Learn pages**. |
| `components/` | Only `navbar.html`: Dharma Connect–specific links injected into `#navbar` on the Dharma Connect and Simply Inspiring pages. |
| `assets/js/common.js` | 5 lines: fetch `navbar.html` into `#navbar`, with no error handling. No Learn page loaded any JS. |
| `assets/css/style.css` | Site base (reset, gradient body, typography, `.container`, `.card`, `.apps`, `.features`). Every value hard-coded, no tokens. |
| `assets/css/learn.css` | Learn-only layer, also fully hard-coded (hex/rgba repeated dozens of times). |
| Cards | Learn reused the app-page `.apps` / `.card` classes (5px hover lift, only the title was clickable). |
| Topic lists | Learn reused the app-page `.features` list, plus an ad-hoc `.card-badge`. |

## 3. Problems found

1. **Duplicated chrome.** Adding a nav item or changing the footer meant editing 18 files.
2. **No design tokens.** Colours such as `#9ca3af`, `#d1d5db`, `rgba(255,255,255,0.08)` and `#fbbf24` were repeated across both stylesheets.
3. **Coupling to app-page classes.** Learn's look depended on `.card`, `.apps`, `.features` and `.page-content`, which exist for the Dharma Connect pages. A tweak for one section could silently change the other.
4. **Two overlapping "coming soon" patterns** (`.card-badge` inside `.features` and `.topic-pill.is-future`), with nothing distinguishing available topics from future ones on list pages.
5. **Cards only clickable on the title text**, and the landing page had no clear entry point to the one published guide.
6. **Accessibility gaps.** No skip link, no custom `:focus-visible`, active nav marked only by a class (no `aria-current`), breadcrumbs built from separator `<span>`s instead of a list, emoji read out as part of `<h1>` text, and no `prefers-reduced-motion` handling for the body fade-in.
7. **Article layout.** The sidebar was not sticky, the h2 rhythm and code blocks were basic, and there was only a limited set of callout variants.
8. **Pre-existing, out of scope.** `learn/ios/interview/swiftui-interview-questions/index.html` is a 2-byte stub (documented in L1; left untouched).

## 4. Shared-component architecture chosen

```
<body>
  <div data-component="site-header"></div>   ← replaced by components/site-header.html
  <main id="main" class="learn-main"> …page-specific content in HTML… </main>
  <div data-component="site-footer"></div>   ← replaced by components/site-footer.html
</body>
```

- **Two components:** `site-header.html` (skip link + brand + primary navigation) and `site-footer.html`. Header and navigation are one component because they always render together. Splitting them would add a request and a placeholder with no benefit.
- **One loader** in the existing `assets/js/common.js`, included once per page in `<head>` with `defer`. There is no inline loader script on any page.
- The placeholder is **replaced** (`replaceWith`) rather than filled, so the resulting DOM is `body > header.site-header` and `body > footer.site-footer`: real `banner` and `contentinfo` landmarks.

## 5. Why this architecture

- **Static and deployable as-is:** no build step, npm, templating or framework. GitHub Pages serves the files unchanged.
- **Extends what already existed.** The site already used "fetch a component from `/components/` via `common.js`". L1B generalises that pattern instead of adding a new mechanism.
- **Root-relative paths** (`/components/…`, `/assets/…`) work at any nesting depth, including `/learn/ios/swift/closures/`.
- **SEO-safe:** only site chrome is injected. Titles, meta descriptions, canonicals, OG tags, H1s, breadcrumbs and all educational content stay in each HTML document (see §16).
- **Graceful without JS:** if JS or a fetch fails, the page loses only the header and footer. Breadcrumbs (in the HTML) still link back to Learn and to the TechBuzz Apps home.

## 6. Header / navigation / footer implementation

**`components/site-header.html`**: skip link → `#main`, brand link to `/`, `<nav aria-label="Primary">` with a `<ul>` of `Apps` (`/`) and `Learn` (`/learn/`). About and Contact are still intentionally absent because those pages don't exist yet (no fake destinations).

**`components/site-footer.html`**: brand, `<nav aria-label="Footer">` (Apps, Learn), copyright.

**`assets/js/common.js`** (≈4 KB unminified, zero dependencies):

| Concern | Implementation |
|---|---|
| Discovery | `document.querySelectorAll('[data-component]')`; names are validated with `/^[a-z0-9-]+$/`. |
| Deduplication | A `Map` of in-flight `fetch` promises, so each component file is requested **once per page** however many placeholders use it. The browser HTTP cache handles repeat visits. |
| Insertion | Parsed through a `<template>`, then `placeholder.replaceWith(template.content)`. |
| Errors | Non-2xx responses and network errors → `console.warn` and the placeholder is removed. The page stays usable. |
| Current nav state | After insertion, the link equal to the current path gets `aria-current="page"`. A section ancestor (e.g. `/learn/` while on `/learn/ios/`) gets `aria-current="true"`. `/` is never treated as a section prefix. |
| Legacy | `<div id="navbar">` on the Dharma Connect and Simply Inspiring pages is still filled with `components/navbar.html` via `innerHTML`, exactly as before (verified). |
| Timing | Runs on `DOMContentLoaded`, or immediately if the DOM is already parsed, so it works both as a deferred `<head>` script (Learn) and as an end-of-body script (legacy pages). |
| Layout stability | `learn.css` reserves the header height on `[data-component="site-header"]` (`min-height: calc(var(--header-height) + 1px)`), so the page doesn't jump when the header arrives. |
| Article TOC | Progressive enhancement: an `IntersectionObserver` adds `.is-active` to the "On this page" link of the section being read. Articles are fully readable without it. |

## 7. Design-system structure

| Layer | File | Owns |
|---|---|---|
| Tokens + site base | `assets/css/style.css` | `:root` tokens (the single source of truth), plus the existing reset, typography and app-page components. Existing rules now reference tokens **only where the value is identical**, so the app pages render exactly as before (visually verified on Dharma Connect Privacy). |
| Learn design system | `assets/css/learn.css` | 15 numbered sections: foundation, header, footer, page shell + breadcrumbs, hero/section headers, buttons + badges, topic cards, topic pills + topic index, article layout, article typography, code, callouts, pagination, responsive, reduced motion. All values come from tokens. |

No technology-specific stylesheet or class (`.swift-*`, `.gcp-*`, etc.) exists. Every Learn category uses the same primitives.

## 8. CSS tokens introduced / reused

All defined once in `style.css :root`. The existing brand values became tokens; no second palette was created.

- **Brand colour:** `--color-bg` `#0f172a`, `--color-bg-deep` `#111827`, `--color-bg-code` `#0b1220`, `--color-accent` `#f59e0b`, `--color-link` `#fbbf24`, `--color-link-hover` `#fde68a`, `--color-accent-soft`, `--color-accent-border`
- **Text:** `--color-text`, `--color-text-body` `#d1d5db`, `--color-text-muted` `#9ca3af`, `--color-text-faint` `#6b7280`, `--color-text-code`
- **Surfaces:** `--color-surface`, `--color-surface-raised`, `--color-surface-hover`, `--color-border`, `--color-border-strong`
- **Semantic:** `--color-info`, `--color-success`, `--color-danger`, `--color-special` (used by callouts now; ready for quiz correct/incorrect feedback later)
- **Type:** `--font-sans` (the existing system stack), `--font-mono`
- **Spacing:** `--space-2xs` 4 · `xs` 8 · `sm` 12 · `md` 16 · `lg` 24 · `xl` 32 · `2xl` 48 · `3xl` 64
- **Radius:** `--radius-sm` 8 · `md` 12 · `lg` 16 · `xl` 24 · `pill`
- **Depth:** `--shadow-sm`, `--shadow-md`, `--shadow-lg` (the last is the existing container shadow)
- **Layout:** `--content-width` 1100px (existing), `--article-width` 740px, `--header-height` 64px, `--page-gutter` `clamp(16px, 4vw, 24px)`
- **Motion:** `--transition-fast` 150ms, `--transition-normal` 200ms

## 9. Reusable UI primitives

| Primitive | Classes | Used on |
|---|---|---|
| Page shell | `.learn-main`, `.learn-main > .container` | All Learn pages |
| Breadcrumbs | `nav.breadcrumbs > ol > li` (CSS separators, `aria-current="page"`) | All Learn pages |
| Hero | `.learn-intro`, `.eyebrow`, `.heading-icon`, `.hero-actions` | Landing, all hubs |
| Section header | `.learn-section`, `.section-header`, `.section-title`, `.section-lead` | Landing, track pages |
| Button | `.button`, `.button-secondary` | Landing hero (future: quiz retry/review) |
| Badge | `.badge`, `.badge-accent` | Card metadata, "Coming soon" |
| Topic card | `.card-grid`, `.topic-card`, `-icon`, `-title`, `-meta`, `-cta` | Landing, iOS, Cloud, AI & Python |
| Topic pill | `.topic-list`, `.topic-pill` (`a.topic-pill` = available, `.is-future` = planned) | Hub cards |
| Topic index | `.topic-index`, `.topic-item.is-available` / `.is-future`, `-title`, `-desc`, `-arrow` | All track/topic pages |
| Article layout | `.article-layout`, `.article-sidebar`, `.article-content`, `.article-header` | Article template |
| Code | `code`, `pre > code` | Article |
| Callout | `.callout` + `-note`, `-tip`, `-key`, `-warning`/`-mistake`, `-interview`, `-takeaway` | Article |
| Pagination | `.article-pagination`, `.pagination-link`, `.pagination-placeholder` | Article |

The topic card is **clickable across its whole area** through a stretched `::after` on the title link, so there is still exactly one link per card for screen readers. Nested interactive elements (e.g. the Closures pill) are raised above it with `z-index`.

**MCQ readiness (architecture only).** No quiz CSS or pages were created. A future quiz can be composed from the existing card surface, `.button`/`.button-secondary` (retry/review), `.badge` (progress/status), `.callout` (explanation) and the semantic tokens (`--color-success`/`--color-danger` for correct/incorrect). Only quiz-specific layout (answer option, progress bar) would need adding.

**Ads readiness.** No ad code was added. Article body blocks share one vertical rhythm (`--space-lg`) within a fixed reading column, so an in-article slot could be inserted between blocks later without a layout redesign.

## 10. Learn landing-page refinements (`/learn/`)

- Hero: "TechBuzz Learn" eyebrow, a tighter H1 (`clamp(30px, 4vw, 40px)`, negative tracking), and a width-limited subtitle.
- Primary CTA **"Start with Swift Closures"** (the one real published guide) plus a secondary "Explore iOS". This gives the page an actual entry point instead of only a directory of links.
- A "Learning tracks" section header (`h2`) above the cards (now `h3`), for a correct heading hierarchy.
- All 7 categories stay (iOS, Android, React, Cloud, AI & Python, System Design, Career) as the same category-card concept, with an icon tile, title, description and a metadata row.
- **Metadata is real only.** iOS shows `1 guide` (Swift Closures is the only published article). Every other track shows a neutral `Roadmap` status. No lesson or test counts were invented.

## 11. Track-page refinements

- **Hub pages with sub-tracks** (`/learn/ios/`, `/learn/cloud/`, `/learn/ai-python/`) use the same `topic-card` primitive. The Swift card now links its **Closures** pill to the real article; planned topics remain non-link pills marked "Soon".
- **Topic pages** (`/learn/ios/swift/`, `/swiftui/`, `/interview/`, `/learn/android/`, `/react/`, `/system-design/`, `/career/`, `/cloud/gcp/`, `/cloud/aws/`, and the four AI & Python sub-tracks) replace the app-page `.features` list with the **topic index**:
  - available topics are a full-width accent tile with a description and an arrow (Swift → Closures);
  - planned topics are compact, muted, **non-link** tiles with a "Coming soon" badge.
- Breadcrumbs are now an ordered list that wraps safely, with the current page marked `aria-current="page"`.
- **No page content was rewritten.** Only wrapper and list markup changed. No new pages and no dead links.

## 12. Article-template refinements (`/learn/ios/swift/closures/`)

- The educational text is **unchanged**. Only structural markup was touched: `<header class="article-header">` containing a "Swift" eyebrow, the H1 and the lead paragraph.
- Reading column capped at `--article-width` (740px). Body text is 17px/1.8 (16px on mobile). The h2 rhythm is 48px above and 16px below, and `scroll-margin-top` accounts for the sticky header.
- Sidebar: **sticky** on desktop (with its own scroll if it's ever taller than the viewport), a left rail with an accent indicator for the current section and article, and **live "On this page" highlighting** via `common.js`. Below 960px it becomes a bordered block above the article. It still uses native `<details>`, so it collapses with zero JS.
- Callouts: one `.callout` base with a left accent rule; each variant only sets `--callout-color`. Added `-key` (KEY IDEA), `-mistake` (COMMON MISTAKE, alias of `-warning`) and `-interview` (INTERVIEW QUESTION) for future content. The current article keeps its original three callouts; no callouts were added just for demonstration.
- Prev/next: grid of two equal cells, with dashed placeholders while no neighbouring article exists (no fake links). Stacks on mobile.

## 13. Responsive behaviour

Verified with Chrome device emulation at **1366px, 820px (tablet) and 360px (mobile)** on every Learn route:

- `scrollWidth − innerWidth ≤ 0` on every page at every width, i.e. **no horizontal page overflow**.
- Card grids use `repeat(auto-fill, minmax(min(100%, 280px), 1fr))`, which reflows 3 → 2 → 1 columns without breakpoints.
- Article: 2 columns above 960px, 1 column below. Code blocks scroll internally (`overflow-x: auto`) and never widen the page.
- Below 600px the outer glass panel is removed so content uses the full width (16px gutter).
- The header stays on one row at 360px. Nav targets are 40px high, hero buttons 44px and full-width on mobile.

## 14. Accessibility considerations

- Landmarks: `banner` (injected header), `nav` × 2 + breadcrumbs (all labelled), `main#main`, `complementary` (article sidebar, labelled "Article contents"), and `contentinfo` (injected footer).
- A **skip link** is the first focusable element and targets `#main`.
- **`:focus-visible`** ring in `--color-link` across Learn. Stretched-link cards draw the ring around the whole card.
- `aria-current="page"` / `"true"` on primary nav, `aria-current="page"` on breadcrumbs and the current series item.
- Decorative emoji are `aria-hidden="true"` (card icons, H1 icons), so headings read cleanly. "Explore →" CTAs are `aria-hidden` because the card's single link already carries the name.
- Heading hierarchy: exactly one `h1` per page (verified); landing uses h1 → h2 → h3.
- `prefers-reduced-motion`: disables the body fade-in, transitions and hover transforms.
- Future topics are never links (no `href="#"` anywhere in Learn, verified).

## 15. Performance considerations

- Adds 1 JS file (≈4 KB, cached site-wide) and 2 tiny HTML fetches (≈0.4 KB each), all cacheable and deduplicated.
- The script is `defer`red, so it never blocks rendering.
- No libraries, fonts, images or syntax highlighter were added. `learn.css` grew from 9 KB to 23 KB (commented, unminified). It's one cached file that replaced ~40 lines of duplicated markup per page.
- DOM nesting stays shallow. Only one `IntersectionObserver` is created, and only on pages with `[data-toc]`.

## 16. SEO considerations

- Every Learn document still contains its own `<title>`, meta description, canonical, OG tags and exactly one H1 (checked programmatically: 17/17 pages pass).
- Breadcrumbs and all educational content are in the HTML. Only the header and footer depend on JS.
- `<meta name="theme-color">` was added to each Learn page (matching the homepage).
- No URLs changed.

## 17. Files added

- `components/site-header.html`
- `components/site-footer.html`
- `docs/learn/reports/TechBuzzApps_PhaseL1B_Shared_Components_Premium_Design_System_Report.md`

## 18. Files modified

- `assets/css/style.css`: added the `:root` token block. Existing rules reference tokens where the value is identical (no visual change).
- `assets/css/learn.css`: rewritten as the token-based Learn design system.
- `assets/js/common.js`: generic component loader, nav state, TOC highlighting, and the legacy `#navbar` behaviour kept.
- All 17 real Learn pages: header/footer → placeholders, `<main id="main" class="learn-main">`, list-based breadcrumbs, `common.js` + `theme-color` in `<head>`, and primitive markup (`topic-card` / `topic-index`):
  - `learn/index.html` (also: hero eyebrow, CTAs, tracks section)
  - `learn/ios/index.html`, `learn/ios/swift/index.html`, `learn/ios/swiftui/index.html`, `learn/ios/interview/index.html`
  - `learn/ios/swift/closures/index.html` (article header wrapper, sidebar labels)
  - `learn/android/index.html`, `learn/react/index.html`, `learn/system-design/index.html`, `learn/career/index.html`
  - `learn/cloud/index.html`, `learn/cloud/gcp/index.html`, `learn/cloud/aws/index.html`
  - `learn/ai-python/index.html`, `learn/ai-python/python/index.html`, `learn/ai-python/python-for-ai/index.html`, `learn/ai-python/machine-learning/index.html`, `learn/ai-python/generative-ai/index.html`

## 19. Files intentionally not modified

- `index.html` (homepage): it has no shared header today, and adding one would redesign it. Its 4 `href="#"` "Coming soon" links are pre-existing and outside Learn scope.
- `dharmaconnect/**`, `simplyinspiring/**`: not redesigned. They still get their navbar through `common.js` (verified).
- `components/navbar.html`: **intentionally retained legacy component.** It is still referenced by 6 pages (5 Dharma Connect + Simply Inspiring) via `#navbar`. It is Dharma Connect–specific and is not used by Learn.
- `learn/ios/interview/swiftui-interview-questions/index.html`: pre-existing empty stub, left as documented in Phase L1. Nothing links to it.
- No other files.

## 20. Validation performed

Local server: `python -m http.server` from the repo root. Browser checks used headless Chrome driven over the DevTools protocol (Node built-in WebSocket, no packages), at 1366 / 820 / 360 px widths.

| Check | Result |
|---|---|
| HTTP 200: all 18 Learn routes (`/learn/`, `/learn/ios/`, `/learn/ios/swift/`, `/learn/ios/swiftui/`, `/learn/ios/interview/`, `/learn/ios/swift/closures/`, `/learn/android/`, `/learn/react/`, `/learn/system-design/`, `/learn/career/`, `/learn/cloud/`, `/learn/cloud/gcp/`, `/learn/cloud/aws/`, `/learn/ai-python/` and its 4 sub-tracks) | ✅ |
| Shared header inserted as `body > header`, with the primary nav present | ✅ all Learn routes, all widths |
| Shared footer inserted as `body > footer` | ✅ |
| Unresolved `[data-component]` placeholders after load | 0 |
| Nav state: `/learn/` → `Learn=page`; sub-pages → `Learn=true` | ✅ |
| Both stylesheets loaded on nested routes | ✅ |
| Console errors / warnings / failed requests on Learn pages | none |
| Horizontal overflow | none (all pages, all widths) |
| `href="#"` in `learn/` + `components/` | 0 |
| Internal links in `learn/` + `components/` resolve to real files | ✅ none broken |
| Per-page title / description / canonical / og:title / single H1 in HTML | ✅ 17/17 |
| Article readable without JS | ✅ all content is in the HTML |
| No ads, npm, `package.json`, framework or build files | ✅ |
| Non-Learn: `/`, `/dharmaconnect/`, `/dharmaconnect/privacy/`, `/simplyinspiring/` | 200. The legacy navbar is filled and Dharma Connect Privacy is visually unchanged. Simply Inspiring logs 3 image 404s that are **pre-existing** (broken screenshots noted in the earlier site audit), unrelated to L1B. |

Screenshots were reviewed for `/learn/`, `/learn/ios/`, `/learn/ios/swift/`, the Closures article (desktop and mobile), and Dharma Connect Privacy.

## 21. Known limitations

- **Without JS, Learn pages have no header or footer.** Breadcrumbs still provide navigation. This is the accepted trade-off of client-side includes on a no-build static site.
- The header appears after a small fetch. Height is reserved to avoid layout shift, but on a slow first visit there is a brief empty band where the header will be.
- `common.js` error handling (placeholder removed + `console.warn`) was reviewed in code but not exercised with a deliberately missing component, because that would have meant adding a test file to the repo.
- The footer year ("© 2026") is static text in one file. It now needs editing in one place instead of 18.
- The "1 guide" metadata on the iOS cards is maintained by hand. It must be updated when new guides are published.
- The empty `swiftui-interview-questions` stub is still served at its URL.
- Mobile article sidebar: both `<details>` groups start open (as in L1), so readers scroll past the TOC before the article. Collapsing by default would need JS and would cause layout shift, so it was left for a product decision.

## 22. Recommended next phase

**Phase L2: publish the next Swift articles** (e.g. Optionals, Protocols) using this template. That validates the "copy article, change content" workflow, turns `is-future` tiles into real `is-available` links, and gives the prev/next pagination real neighbours. Smaller follow-ups:

- decide what to do with the `swiftui-interview-questions` stub;
- optionally adopt `site-header`/`site-footer` on the homepage in a separate, deliberate change;
- design the MCQ quiz layout on top of the existing primitives when the quiz engine is scoped.

---

## Resulting directory tree (relevant parts)

```
techbuzzapps-site/
├── assets/
│   ├── css/
│   │   ├── style.css            (tokens + site base)            [modified]
│   │   └── learn.css            (Learn design system)           [modified]
│   └── js/
│       └── common.js            (component loader, nav, TOC)    [modified]
├── components/
│   ├── navbar.html              (legacy, Dharma Connect/SI only) [unchanged]
│   ├── site-header.html         (Learn header + primary nav)    [new]
│   └── site-footer.html         (Learn footer)                  [new]
├── docs/learn/reports/
│   ├── TechBuzzApps_PhaseL1_Learn_Foundation_Report.md
│   ├── TechBuzzApps_PhaseL1A_Cloud_AI_Python_Taxonomy_Report.md
│   └── TechBuzzApps_PhaseL1B_Shared_Components_Premium_Design_System_Report.md [new]
└── learn/
    ├── index.html
    ├── ios/  (index, swift/, swift/closures/, swiftui/, interview/, interview/swiftui-interview-questions/ [stub, untouched])
    ├── android/  react/  system-design/  career/
    ├── cloud/  (index, gcp/, aws/)
    └── ai-python/  (index, python/, python-for-ai/, machine-learning/, generative-ai/)
```

## Git state

- Before changes: `git status --short` was **clean** (no pre-existing uncommitted changes).
- After changes: 21 tracked files modified and 3 untracked files added (2 components + this report). All of them are Phase L1B changes.
