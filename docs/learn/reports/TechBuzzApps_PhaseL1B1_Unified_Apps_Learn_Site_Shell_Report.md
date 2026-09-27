# TechBuzz Apps — Phase L1B1 Report
## Unified Apps + Learn Site Shell

Branch: `feature/TechBuzzLearn` · Nothing committed or pushed.

---

## 1. Objective

Make the root homepage `/` (the **Apps** area) use the **same** shared header, navigation and footer components as `/learn/`, so TechBuzz Apps behaves as one site with two primary areas, **Apps** and **Learn**.

The Learn design is the visual baseline. `/learn/` itself, Dharma Connect and Simply Inspiring are not redesigned.

## 2. Previous homepage architecture

- `index.html` had **no site header, no `<main>` and no nav**. The page was one glass `.container` holding an `<h1>`, the subtitle, a `.home-link` to Learn, a grid of six app-page `.card`s, and an inline `<footer>`.
- It loaded only `style.css` and no JS.
- There was no meta description, canonical or Open Graph metadata (only `<title>` and `theme-color`).
- Four "Coming soon" apps were rendered as `<a href="#">` links, i.e. dead links.
- Learn loaded the shared header/footer via `common.js`, but all shell styling (header, footer, page shell, focus, buttons, badges) lived in `learn.css`. The homepage could not reuse it without loading Learn's entire stylesheet.

## 3. Changes made

1. **Promoted the genuinely shared shell CSS** from `learn.css` into a new "SITE SHELL" section at the end of `style.css`. Rules moved verbatim, with selectors renamed only where needed (see §8).
2. Shell pages opt in with **`<body class="site-shell">`**, and the page wrapper became the generic **`<main id="main" class="site-main">`**. Learn pages were updated to these names; this was the only Learn markup change.
3. **Rebuilt `index.html`** on the shared shell: header placeholder → `main#main` → footer placeholder. The existing copy and all real links are kept.
4. Added **`assets/css/apps.css`**, a small Apps-area stylesheet (app card grid only), parallel to `learn.css`.
5. Added homepage SEO metadata directly in the HTML.
6. Accessibility fix in the shared shell: the skip link now appears **instantly** on focus. It had been inheriting the site-wide `a { transition: 0.2s }` and slid in from off-screen.

## 4. Shared header/footer integration

- `index.html` uses exactly the same placeholders as every Learn page:
  ```html
  <div data-component="site-header"></div>
  <main id="main" class="site-main"> …Apps content… </main>
  <div data-component="site-footer"></div>
  ```
- Components are loaded by the existing `assets/js/common.js` (`<script src="/assets/js/common.js" defer>` in `<head>`). There is no inline fetch or loader script in `index.html`.
- **No new or duplicate components.** `components/site-header.html` and `components/site-footer.html` are unchanged and remain the single source of truth for Apps and Learn. No `homepage-header.html`, `apps-header.html` or `learn-header.html` exists.

## 5. Navigation active-state behaviour

**`common.js` was not changed.** The L1B logic already handles the root correctly:

```js
if (href === path)                                  → aria-current="page"
else if (href !== '/' && path.startsWith(href))     → aria-current="true"   // section
```

`/` only ever matches itself exactly and is never treated as a prefix of every URL. Verified in the browser at all three widths:

| URL | Apps | Learn |
|---|---|---|
| `/` | `aria-current="page"` | — |
| `/learn/` | — | `aria-current="page"` |
| `/learn/ios/`, `/learn/cloud/gcp/`, … (all 17 sub-routes) | — | `aria-current="true"` |

The shared CSS gives both values the same accent colour and underline indicator.

## 6. Homepage visual refinements

- **Hero** (`.page-intro`, shared with Learn): the existing H1 "TechBuzz **Apps**" and the existing subtitle copy, unchanged. The existing Learn cross-link is kept as a secondary shell `.button` ("📚 Learn — guides & interview prep for engineers →").
- **"Available now"** section: **Dharma Connect** and **Simply Inspiring** as full app cards with:
  - an icon tile (the existing emoji, `aria-hidden`);
  - platform/status tags that are **real**, taken from the app pages: Dharma Connect is "Available for both Android and iOS" and "in active development"; Simply Inspiring links to an App Store listing;
  - app name linking to the existing app page, and the existing description;
  - Dharma Connect's existing Privacy / Terms / Support / Delete Account links, as a labelled `<nav>` of compact buttons.
- **"Coming soon"** section: Office Pulse, Durga Puja Celebrations, Sarvopari and Multiplication Table Generator as quieter, **non-link** cards with a "Coming soon" badge. Their previous `href="#"` links were dead ends; this follows the site-wide "no fake links" rule established for Learn.
- No invented metrics (downloads, ratings, users, awards).
- Card hover matches Learn: 2px lift, stronger border, soft shadow. Upcoming cards don't lift because they aren't interactive.

## 7. Design-system reuse

The homepage is built almost entirely from existing tokens and primitives:

| Reused from the shell (`style.css`) | Used for |
|---|---|
| `:root` tokens (colours, spacing, radius, shadow, motion, layout) | everything |
| `.site-shell`, `.site-main`, `.container` panel | page frame (identical to Learn) |
| `.page-intro` | hero |
| `.page-section`, `.section-header`, `.section-title` | "Available now" / "Coming soon" |
| `.button`, `.button-secondary` | Learn cross-link |
| `.badge`, `.badge-accent` | platform/status tags |
| `.icon-tile` | app icons |

`apps.css` adds only what is Apps-specific (≈3 KB): `.app-grid` / `.app-grid-compact`, `.app-card` (+ head, tags, title, links, `.is-upcoming`), and one reduced-motion override. No values are hard-coded where a token exists.

## 8. CSS architecture decisions

**Layering:**

```
style.css   tokens · base typography · legacy app-page styles · SITE SHELL (shared by Apps + Learn)
apps.css    Apps area only (/)
learn.css   Learn area only (/learn/…)
```

- `index.html` does **not** load `learn.css`.
- **What moved to `style.css`:** skip link, focus ring, header, top nav, footer, the header-height placeholder, `.site-main` page shell (incl. the ≤600px panel removal), `.eyebrow`, `.hero-actions`, `.section-header`, `.section-title`, `.button`, `.badge`, and the shell's reduced-motion rules.
- **What was promoted and renamed because it became shared:**
  - `.learn-intro` → `.page-intro`
  - `.learn-section` → `.page-section`
  - `.learn-main` → `.site-main`
  - `.topic-card-icon` → `.icon-tile`
  - `.section-lead` is shared under its existing name.
- **Opt-in scoping.** Every shell rule that could affect a whole page (body padding/flex, `:focus-visible`, reduced-motion `*` rules) is scoped to `body.site-shell`. The Dharma Connect and Simply Inspiring pages also load `style.css` but lack that class, so they are **pixel-identical** to before (verified, §17).
- **Article header without duplication.** The Learn article header reuses the shared hero type scale by carrying both classes (`class="article-header page-intro"`). `learn.css` then overrides only its box (`max-width: none`, divider), so there are no duplicated heading declarations.
- **Result:** `learn.css` shrank from 22.9 KB to 15.5 KB, `style.css` grew by the moved shell, and nothing is defined twice.

## 9. Responsive behaviour

Validated with Chrome device emulation at **1366 × 900, 820 × 1100 and 360 × 740**:

- `/`: no horizontal overflow at any width.
  - Available apps share one row on desktop and tablet (`auto-fit`) and stack on mobile.
  - Upcoming apps show 3 → 2 → 1 columns.
  - Tags wrap and align right.
  - The hero button goes full-width on phones (shared shell rule).
- The glass panel is dropped below 600px (shared shell rule), same as Learn.
- The header stays on one row at 360px; nav targets are 40px, buttons 44px, Dharma Connect link chips 36px.
- `/learn/…` and the legacy pages: pixel-identical to L1B at all three widths.

## 10. Accessibility

- Landmarks on `/`: `banner` (shared header), `nav "Primary"`, `main#main`, a labelled `nav "Dharma Connect pages"`, `nav "Footer"`, and `contentinfo`.
- **Skip link:** verified by keyboard. The first Tab focuses "Skip to content", visible at 12px from the top with a focus ring. Enter moves to `#main`, and further Tabs show the amber `:focus-visible` ring on app links.
- Exactly **one H1**. Hierarchy is h1 → h2 (section) → h3 (app name).
- Decorative emoji (app icons, 📚, →) are `aria-hidden="true"`. Tag groups have `aria-label="Platforms and status"`. Link text is meaningful (app names, "Privacy Policy", …), with no "click here" and no `href="#"`.
- Reduced motion: shell animation and transitions are disabled, and app-card lift is removed in `apps.css`.
- Contrast uses the same token pairs as Learn (body `#d1d5db`, muted `#9ca3af` on navy; navy text on amber buttons).

## 11. SEO

All of it is directly in `index.html`, none via JS:

- `<title>TechBuzz Apps</title>` (unchanged)
- **Added:** meta description, `<link rel="canonical" href="https://techbuzzapps.com/">`, `og:title`, `og:description`, `og:url`, `og:type`. The copy is derived from the existing subtitle and app list; no marketing claims.
- `theme-color` kept. One H1. All app content and links are in the HTML.

## 12. Performance

- The homepage now loads `common.js` (≈4 KB, already cached for Learn visitors) plus two tiny component fetches, and `apps.css` (≈3 KB).
- The inline `<style>` in `<head>` that paints the navy background before CSS loads was kept (it prevents a white flash).
- No images, fonts, libraries or build tooling were added.

## 13. Legacy compatibility

- `components/navbar.html` is **kept and unchanged**. It is still used by the 5 Dharma Connect pages and `/simplyinspiring/`.
- The legacy `#navbar` path in `common.js` is untouched. The navbar was verified as filled on every legacy page at every width.
- The legacy pages do not carry `site-shell`, so none of the shell rules apply to them. Screenshots are byte-identical to L1B.

## 14. Files added

- `assets/css/apps.css`
- `docs/learn/reports/TechBuzzApps_PhaseL1B1_Unified_Apps_Learn_Site_Shell_Report.md`

## 15. Files modified

- `index.html`: rebuilt on the shared shell (see §6, §11).
- `assets/css/style.css`: new SITE SHELL section (moved from `learn.css`), plus `.page-intro`, `.page-section`, `.section-lead`, `.icon-tile`, and the skip-link transition fix.
- `assets/css/learn.css`: shell rules removed (now in `style.css`), sections renumbered, `.article-header` gains `max-width: none`.
- The 17 real Learn pages: `<body>` → `<body class="site-shell">`, `learn-main` → `site-main`, `learn-intro` → `page-intro`, `learn-section` → `page-section`. `learn/index.html` also changed `topic-card-icon` → `icon-tile`, and the Closures article header gained `page-intro`. **No Learn content or layout changed**: all Learn pages are pixel-identical to L1B.

## 16. Files intentionally not modified

- `components/site-header.html`, `components/site-footer.html`: already correct for both areas.
- `assets/js/common.js`: the L1B loader and nav-state logic already handle `/` correctly.
- `components/navbar.html` (legacy), `dharmaconnect/**`, `simplyinspiring/**`: not redesigned, and their known audit issues were not touched.
- `learn/ios/interview/swiftui-interview-questions/index.html` (pre-existing stub).
- No `/apps/` directory was created; `/` remains the Apps homepage.

## 17. Validation performed

- **Setup:** local `python -m http.server` for the working tree (`:8765`). The committed L1B tree was exported with `git archive HEAD` into the scratchpad and served on `:8766` as a **visual baseline**.
- **Method:** headless Chrome driven over the DevTools protocol (Node built-in WebSocket, no packages), at 1366, 820 and 360 widths.

| Check | Result |
|---|---|
| `/`: HTTP 200, `body > header.site-header` and `body > footer.site-footer` present, 0 unresolved `[data-component]` | ✅ all widths |
| `/`: Apps = `page`, Learn = none | ✅ |
| `/`: stylesheets loaded (inline, `style.css`, `apps.css`), `common.js` loaded, **no `learn.css`** | ✅ |
| `/`: every root-relative link returns 200 (`/learn/`, `/dharmaconnect/…` ×5, `/simplyinspiring/`) | ✅ |
| `/`: console errors/warnings, failed requests | none |
| `/`: horizontal overflow | none |
| `/`: SEO in HTML (title, description, canonical, og ×3, theme-color), exactly 1 H1, 0 `href="#"` | ✅ |
| `/`: keyboard (skip link visible on first Tab, Enter → `#main`, focus rings) | ✅ |
| All 18 `/learn/…` routes: header/footer load, Learn = `page` / `true`, no overflow, no console errors | ✅ |
| All 18 `/learn/…` routes vs L1B baseline | **pixel-identical** at 1366, 820 and 360 |
| `/dharmaconnect/` (+ privacy, terms, support, delete-account), `/simplyinspiring/` (+ privacy, terms): legacy navbar filled where used | ✅ |
| Legacy pages vs L1B baseline | **pixel-identical** at all widths |
| `/simplyinspiring/` | 3 screenshot-image 404s and a 404 `/simplyinspiring/support/` link. **Pre-existing** (identical on the baseline, listed in the earlier site audit), not touched. |

## 18. Known limitations

- As with Learn, **without JavaScript the homepage has no header or footer**. Unlike Learn it has no breadcrumbs, but it *is* the site root, and its content and Learn cross-link are all in the HTML.
- The Simply Inspiring card shows "On the App Store" from the existing App Store link on its app page. The link itself was not added to the homepage card, to avoid adding new outbound links in this phase.
- `index.html` still references `style.css?v=1` (pre-existing cache-buster, left as is), while Learn pages reference `style.css` without a query. Both work; unifying them is a trivial follow-up.
- The footer year remains static text in `components/site-footer.html`.
- Dharma Connect and Simply Inspiring pages still use the legacy navbar and don't yet share the site header (out of scope by design).

## 19. Recommended next step

**Phase L1C: migrate the app detail pages** (`/dharmaconnect/**`, `/simplyinspiring/**`) onto the same shell:
- `site-shell` body class, shared header/footer, `site-main`;
- with Apps active and an in-page app sub-navigation replacing `components/navbar.html`;
- then retire `navbar.html` and the legacy `#navbar` branch in `common.js`.

That would complete the single-shell site. Alternatively, continue with **L2** (next Swift articles) if content is the priority.

---

## Resulting directory tree (relevant parts)

```
techbuzzapps-site/
├── index.html                   Apps homepage on the shared shell       [modified]
├── assets/
│   ├── css/
│   │   ├── style.css            tokens + base + SITE SHELL (shared)    [modified]
│   │   ├── apps.css             Apps area (/) only                     [new]
│   │   └── learn.css            Learn area only                        [modified]
│   └── js/
│       └── common.js            component loader + nav state           [unchanged]
├── components/
│   ├── site-header.html         shared header + primary nav (Apps/Learn) [unchanged]
│   ├── site-footer.html         shared footer                           [unchanged]
│   └── navbar.html              legacy, Dharma Connect / Simply Inspiring [unchanged]
├── dharmaconnect/**             legacy navbar                           [unchanged]
├── simplyinspiring/**           legacy navbar                           [unchanged]
├── learn/**                     17 pages: shell class names only        [modified]
└── docs/learn/reports/
    └── TechBuzzApps_PhaseL1B1_Unified_Apps_Learn_Site_Shell_Report.md  [new]
```

## Git state

- **Before L1B1:** `git status --short` was **clean**. All Phase L1B work is already committed on this branch as `962dd52 Code refactoring` (components, `common.js`, design system, Learn pages, L1B report). No uncommitted L1B changes existed, so nothing from L1B could be overwritten.
- **After L1B1:** 21 modified files + 2 new files (`assets/css/apps.css`, this report). **All uncommitted changes belong to L1B1.**
