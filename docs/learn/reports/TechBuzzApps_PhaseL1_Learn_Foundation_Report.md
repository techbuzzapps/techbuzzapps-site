# TechBuzz Apps — Phase L1: Learn Foundation

**Scope:** Establish the architecture, navigation, visual system, URL conventions, and a small representative content structure for `techbuzzapps.com/learn/`, ahead of building out large amounts of educational content.
**Type:** Static HTML/CSS/minimal-JS only. No frameworks, build tools, or dependencies introduced.
**Date:** 2026-09-26

---

## Purpose

TechBuzz Apps is expanding from an app showcase into **Apps + Learn**. The Learn section gives the site a second reason to exist beyond app landing pages: practical developer content (starting with iOS) that can grow over time without needing a rewrite of the site's foundations. Phase L1's job is narrow on purpose — prove out the directory structure, URL conventions, shared visual language, and a reusable article template with a small, real slice of content (one hub tree fully wired, one real article), rather than producing a large content library up front.

## Architecture

The Learn section lives entirely under `/learn/` using clean, directory-style URLs (a trailing slash resolving to `index.html`), matching the convention already used by the existing app pages (`/dharmaconnect/privacy/`, etc.):

```text
/learn/                                index — category directory
├── ios/                               hub
│   ├── swift/                         category landing page
│   │   └── closures/                  ← the one representative article
│   ├── swiftui/                       category landing page (roadmap only)
│   └── interview/                     category landing page (roadmap only)
├── android/                           lightweight hub (roadmap only)
├── react/                             lightweight hub (roadmap only)
├── system-design/                     lightweight hub (roadmap only)
└── career/                            lightweight hub (roadmap only)
```

This mirrors the target long-term IA exactly (iOS → Swift/SwiftUI/Interview, Android → Kotlin/Compose/Interview, React, System Design, Career) while only building out the iOS branch as a full three-level tree. The other four hubs exist as real, linkable landing pages but intentionally stop at one level — they list their planned topics as text/badges rather than as links, since no articles exist yet for them (see **Deferred Work**). Adding a new topic under any hub later means adding one new directory with an `index.html`, and optionally deepening that hub's landing page the same way `ios/` already is.

All new pages use **root-relative** paths for every asset and internal link (e.g. `/assets/css/learn.css`, `/learn/ios/`), so a page four levels deep (`/learn/ios/swift/closures/`) loads CSS and links correctly without any `../../../` relative-path math — consistent with how the existing app pages already work, and verified by a local server test (see **Validation**, below).

## Files Added

**Pages (9 new):**
- `learn/index.html` — Learn landing page
- `learn/react/index.html`
- `learn/system-design/index.html`
- `learn/career/index.html`
- `learn/ios/swift/index.html`
- `learn/ios/swiftui/index.html`
- `learn/ios/interview/index.html`
- `learn/ios/swift/closures/index.html` — the representative article

**Stylesheet (1 new):**
- `assets/css/learn.css` — shared Learn layout/components (site header, breadcrumbs, category cards, topic-roadmap pills, article two-column layout, code blocks, callouts, prev/next pagination). Loaded on every Learn page alongside the existing `assets/css/style.css`.

**Directories created:** `learn/react/`, `learn/system-design/`, `learn/career/`, `learn/ios/swift/`, `learn/ios/swiftui/`, `learn/ios/interview/`, `learn/ios/swift/closures/`.

No JavaScript file was added. See **JavaScript** note under Deferred Work / Article Template.

## Files Modified

- **`learn/ios/index.html`** — was a 0-byte stub; filled in as the iOS hub landing page (three cards: Swift, SwiftUI, Interview Preparation).
- **`learn/android/index.html`** — was a 0-byte stub; filled in as the lightweight Android hub landing page described in the brief (roadmap topics only, no article tree).
- **`index.html`** (homepage) — added a single new line, a `📚 Learn — guides & interview prep for engineers →` link to `/learn/`, placed between the subtitle and the app grid. No other homepage content, structure, or copy was touched.
- **`assets/css/style.css`** — added `margin-bottom: 32px;` to the existing `.home-link` rule (previously unused anywhere in the codebase, per the earlier site audit) so the new homepage Learn link has breathing room before the app grid. This is the one CSS change to an existing file, and it was scoped to exactly what the new homepage entry point needed; it has no effect on any other page since `.home-link` had zero prior usages.

No other existing file was changed. Dharma Connect, Simply Inspiring, `components/navbar.html`, and `assets/js/common.js` are untouched.

## Navigation

- **Main site → Learn:** the homepage's new `.home-link` button is the entry point into `/learn/`.
- **Inside Learn → main site:** every Learn page carries the same two elements:
  1. A `<header class="site-header">` at the very top with the `TechBuzz Apps` wordmark (linking to `/`) and a small `Apps | Learn` nav, with `Learn` marked active.
  2. Breadcrumbs immediately below (e.g. `TechBuzz Apps / Learn / iOS / Swift / Closures`), where the first crumb always links back to `/`.
  3. A footer with an explicit `Back to TechBuzz Apps` link.
- **About / Contact:** the brief describes the long-term nav as `Apps | Learn | About | Contact`, but explicitly says not to build an unnecessarily complex nav in this phase. Since About and Contact pages don't exist yet, they were left out of the header nav rather than linked as dead ends — consistent with the "no fake links" rule. Phase L2 (or whenever those pages are built) can add them to `.top-nav` directly.
- This header/breadcrumb pattern is new — the existing app pages don't have an equivalent site-wide header (they only inject Dharma-Connect-specific links via `components/navbar.html`). Rather than retrofit that shared component (which the prior audit flagged as incorrectly reused by Simply Inspiring), Learn pages inline their own header/footer markup directly, matching the site's existing "each section owns its own page shell" pattern. This keeps Learn fully decoupled from the Dharma Connect–specific navbar bug without touching it.

## Article Template

The Swift Closures page (`learn/ios/swift/closures/index.html`) establishes the pattern every future article should follow:

```html
<header class="site-header">...</header>
<main>
  <div class="container">
    <nav class="breadcrumbs">...</nav>
    <div class="article-layout">
      <aside class="article-sidebar">
        <details open><summary>On This Page</summary>...</details>
        <details open><summary>In This Section</summary>...</details>
      </aside>
      <article class="article-content">
        <h1>Title</h1>
        <p class="subtitle">Intro</p>
        <h2 id="...">Section</h2>
        <p>...</p>
        <pre><code>...</code></pre>
        <div class="callout callout-warning">...</div>
        <nav class="article-pagination">...</nav>
      </article>
    </div>
  </div>
</main>
<footer class="site-footer">...</footer>
```

Key decisions:
- **Sidebar uses native `<details>`/`<summary>`**, not JavaScript. Both sections render `open` by default, so on desktop they simply look like a permanent two-part sidebar ("On This Page" in-page anchor links, "In This Section" sibling topics). On mobile the same markup collapses into two tappable disclosure groups — full navigation with zero JavaScript, satisfying the "must remain usable without JavaScript" requirement.
- **Sibling topics that don't exist yet are rendered as plain, muted `<span>` text** (`.is-future`), never as `href="#"` links — per the explicit "no fake links" rule.
- **Prev/Next pagination** uses the same non-link pattern (`.pagination-placeholder`) when there's genuinely nothing to link to yet — the Closures article is the only Swift article that exists, so both slots currently say so instead of linking anywhere.
- **Headings use stable, kebab-case `id` attributes** (`#what-is-a-closure`, `#trailing-closures`, etc.) that the sidebar's "On This Page" links point to — copying this article means copying that id convention.
- The article itself covers exactly the outline requested: intro, what is a closure, basic syntax, parameters/return values, trailing closures, capturing values, a real iOS example (a `URLSession` completion handler with `@escaping`), common mistakes (a `callout-warning` covering `@escaping` and `[weak self]`), an interview tip (`callout-tip`), and key takeaways (`callout-takeaway`). Code samples are real, compilable Swift.

Creating the next article means: copy `closures/index.html` into a new directory, update the breadcrumb, sidebar (`On This Page` ids + `In This Section` list), `<h1>`/meta tags/canonical URL, and body content. No other file needs to change.

## CSS Strategy

- **`assets/css/style.css`** (existing, untouched apart from the one `.home-link` line) remains the source of truth for the site's base reset, dark gradient background, and core typography/link/`.container`/`.page-content`/`.apps`/`.card` patterns.
- **`assets/css/learn.css`** (new) is loaded *in addition to* `style.css` on every Learn page and only contains what's genuinely specific to learning content: the site header/footer, breadcrumbs, the compact `.learn-intro` hero, `.topic-list`/`.topic-pill`/`.card-badge` roadmap indicators, the `.article-layout` two-column grid and its sidebar, code block styling, the four callout variants, and `.article-pagination`.
- Category cards on the Learn landing page and the iOS hub **reuse the existing `.apps`/`.card` grid classes as-is** rather than introducing new card CSS — this is why they look and behave like the homepage's app cards (same hover lift, same spacing).
- No `ios.css`, `android.css`, or `interview.css` was created. Nothing in Phase L1 needs iOS-, Android-, or interview-specific styling that isn't already covered by the shared `learn.css` component set (cards, roadmap pills, article layout, callouts). Creating those files now would mean shipping empty or near-empty stylesheets purely to match a hypothetical future structure, which the brief explicitly says not to do. If a platform section later needs genuinely distinct visual treatment (e.g., Android content wanting a different accent color), that's the natural trigger to add `android.css` at that time.

## Responsive Behaviour

- **Category grids** (`learn/index.html`, `learn/ios/index.html`) use the existing `.apps` CSS grid (`repeat(auto-fit, minmax(260px, 1fr))`), so they already reflow from a single column on phones up to several columns on wide desktops without any new breakpoints.
- **The article two-column layout** (`.article-layout`) is `grid-template-columns: 220px minmax(0, 1fr)` on desktop/tablet, and collapses to a single column at `max-width: 768px` (matching the breakpoint already used by `style.css`). On mobile, the sidebar moves above the article body (`order: -1`) and renders as two collapsible `<details>` groups inside a bordered box, so it takes minimal vertical space before the reader reaches the actual content.
- **Code blocks** (`pre`) use `overflow-x: auto` and `max-width: 100%`, so long lines of Swift scroll horizontally *within the code block only* — the page itself never scrolls horizontally, which was verified in the article at a narrow viewport.
- **Previous/next pagination** stacks vertically on mobile (`flex-direction: column`) instead of the desktop two-column layout.
- **Breadcrumbs** wrap (`flex-wrap: wrap`) rather than overflowing on narrow screens with long trails.

## Accessibility

- Every new page uses semantic structure: `<header>`, `<nav>` (both for the top nav and breadcrumbs), `<main>`, `<article>`, `<aside>`, `<footer>` — landmarks the existing app pages don't currently have (they use plain `<div>`s), so Learn is a deliberate step forward here without touching the older pages.
- `lang="en"` and a correct `<meta name="viewport">` are present on every new page.
- Heading hierarchy is `h1` → `h2` per section, with no skipped levels, on every hub and article page.
- The breadcrumb trail's current page uses `aria-current="page"` instead of being a link to itself.
- **No `href="#"` placeholder links exist anywhere in Learn.** Topics that don't have a page yet are rendered as plain text with a "Coming soon" badge/pill (`.card-badge`, `.topic-pill.is-future`) or muted `<span class="is-future">`, never as a clickable dead end — this was a specific, explicit requirement and was checked with a repo-wide search after implementation (zero matches).
- The mobile sidebar's `<details>`/`<summary>` disclosure pattern is natively keyboard-operable (focusable, `Enter`/`Space` toggles it) without any custom JavaScript or ARIA.
- Every new page has a distinct, descriptive `<title>` and link text is descriptive (e.g. "Swift", "Closures", never "click here").
- Focus states were not given new custom styling beyond the browser default — same as the rest of the site; noted as a possible follow-up (see Phase L2) rather than something introduced or fixed here.

## SEO

Every new Learn page includes, in its `<head>`:
- A distinct `<title>`.
- `<meta name="description">`.
- `<link rel="canonical">` pointing at the full `https://techbuzzapps.com/learn/.../` URL.
- `og:title`, `og:description`, `og:url` (and `og:type`, `website` for hubs / `article` for the Closures page).

This metadata was added **only** to the new Learn pages. No site-wide SEO remediation (robots.txt, sitemap.xml, Twitter Card tags, structured data, or retrofitting metadata onto the existing app/legal pages) was attempted — that work was identified separately in the prior full-site audit and is out of scope here.

## Existing Learn Stubs

Three empty (0-byte) files existed under `learn/` before this phase, all created via GitHub's web UI and never filled in:

| Path | Outcome |
|---|---|
| `learn/ios/index.html` | **Filled in** — this is exactly the path Phase L1 needed for the iOS hub, so the existing empty file was reused in place rather than replaced. |
| `learn/android/index.html` | **Filled in** — same reasoning; reused as the Android hub landing page. |
| `learn/ios/interview/swiftui-interview-questions/index.html` | **Left untouched, still empty.** This path doesn't cleanly fit the Phase L1 interview architecture (interview content is now organized as `/learn/ios/interview/<topic>/`, and "swiftui-interview-questions" would more likely become something like `/learn/ios/interview/swiftui/` later). Per the brief's instruction not to blindly delete an existing path just because it's empty, it was left in place and simply not linked from anywhere — visiting it directly still returns a blank page, which is unchanged from before this phase. It should be either deleted or deliberately repurposed in a future phase once the interview section's real content structure is decided. |

## Deferred Work

Explicitly **not** built in this phase:

- The full Swift curriculum beyond Closures (Basics, Optionals, Collections, Functions, Protocols, Generics, Error Handling, ARC, Concurrency).
- Any SwiftUI articles (SwiftUI Basics, State Management, NavigationStack, Lists, Forms, Animations, Concurrency, Performance, Architecture).
- Any Interview Preparation articles (Junior/Mid/Senior iOS, or the topic-based reviews).
- Any Android article tree (Kotlin, Jetpack Compose, Architecture, Interview Prep) — only the lightweight `learn/android/` landing page exists.
- Any React article tree — only the lightweight `learn/react/` landing page exists.
- Any System Design articles — only the lightweight `learn/system-design/` landing page exists.
- Any Career articles — only the lightweight `learn/career/` landing page exists.
- Site search (`search.js` was not created).
- A Blog section.
- Premium / paid content.
- Advertising or `ads.js` in any form.
- Any of the prior full-site audit's unrelated findings (e.g. Simply Inspiring's empty legal pages, broken screenshots, broken support link, or the Dharma-Connect-specific navbar being reused incorrectly) — none of those were touched, since none of them were required to build the new global navigation entry point.
- Deleting the pre-existing `learn/ios/interview/swiftui-interview-questions/` stub (documented above instead).

## Recommended Phase L2

Once there's a sense of how the Closures article and this IA read in practice, the logical next step is to **build out the rest of the Swift track** (Optionals, Protocols, and 1–2 more topics) using the exact template established here — this is the fastest way to validate that "copy an article, change the content" actually holds up across multiple real articles, and it would put real links behind the `is-future` placeholders currently in `learn/ios/swift/`. A second, smaller candidate for L2 is deciding the fate of the orphaned `swiftui-interview-questions` stub before the Interview section grows. Site search, About/Contact pages, and the other four hubs' first real articles are reasonable candidates for L3+ once Swift proves the pattern out.

---

## Validation Performed

- Started a local static file server from the repository root and requested every new URL plus a sample of existing app URLs; all returned **HTTP 200**: `/`, `/learn/`, `/learn/ios/`, `/learn/android/`, `/learn/react/`, `/learn/system-design/`, `/learn/career/`, `/learn/ios/swift/`, `/learn/ios/swiftui/`, `/learn/ios/interview/`, `/learn/ios/swift/closures/`, `/assets/css/style.css`, `/assets/css/learn.css`, `/assets/js/common.js`, `/dharmaconnect/` (and its four sub-pages), `/simplyinspiring/`, `/favicon.ico`, `/apple-touch-icon.png`, and the preserved empty stub at `/learn/ios/interview/swiftui-interview-questions/`.
- Extracted every `href="/...")` target referenced from the new/modified pages and confirmed each one is a real, existing path — no broken internal links.
- Confirmed the deeply nested article (`/learn/ios/swift/closures/`) loads both stylesheets correctly via its root-relative `<link>` tags.
- Searched the entire `learn/` tree for `href="#"` — zero matches.
- Searched the entire `learn/` tree for "Blog", "Premium", "ads.js", and "advertising" — zero matches.
- Verified the Swift code samples in the Closures article correctly HTML-escape `<` characters (e.g. `a &lt; b`, `Result&lt;[Temple], Error&gt;`) so they render as literal Swift syntax rather than being misparsed as HTML tags.
- No images were introduced in this phase, so there was nothing to check for broken `<img>` references.

## Report Path

`docs/learn/reports/TechBuzzApps_PhaseL1_Learn_Foundation_Report.md`
