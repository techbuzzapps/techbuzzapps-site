# TechBuzz Learn — Phase W1 Report
## Web Development Foundation — Migrate React into Web

Branch: `feature/TechBuzzLearn` · Nothing committed or pushed.

---

## 1. Objective

Replace the top-level **React** Learn category with a scalable **Web Development** category (`/learn/web/`) whose learning tracks are JavaScript, React, Next.js and TypeScript. This is an information-architecture phase only: **no lessons were created.**

## 2. Pre-change git state

`git status --short` was **clean**. The latest commit is `a854a1a Android menu fixes` (L2C1), on top of `4863806` (GCP) and `de45421` (Compose). No other phase was mixed in, and all uncommitted changes after this phase belong to W1.

## 3. Existing React audit

`/learn/react/index.html` (added with Learn in `6ff7f3a`, later touched only by shell refactors `962dd52` and `db5104f`):

| Question | Finding |
|---|---|
| Published content? | **None.** H1 "⚛️ React", a subtitle, and a "Planned Topics" `topic-index` of six non-link "Coming soon" items: React Basics, Components, Hooks, State Management, Performance, Interview Preparation. |
| Child pages? | **None** (only `learn/react/index.html` exists). |
| Unique useful text? | Only the planned-topic list, which is covered by the new React card (Components, Props & State, Hooks) and the future React course. |
| SEO? | Self-canonical `https://techbuzzapps.com/learn/react/`, og tags, title "Learn React — TechBuzz Apps". Publicly reachable since Learn launched, so it may be indexed. |

## 4. Existing inbound-link audit

Every HTML, JS, CSS, XML and TXT file in the repo was searched for `learn/react`:
- The **only inbound link** was the React card on `/learn/index.html`.
- `/learn/index.html`'s meta description also named "React" as a top-level area.
- Otherwise it appears only in historical reports under `docs/` (which are not site pages).
- The repo has **no** `sitemap.xml`, `robots.txt`, `_redirects` or `404.html`, and **no existing redirect convention** (no meta-refresh or JS redirects anywhere).

## 5. Architecture decision

- **Web Development** becomes the top-level category at `/learn/web/`, using the same category-landing and card architecture as `/learn/ios/` and `/learn/android/`.
- **The four tracks are cards on `/learn/web/` only.** No `/learn/web/{javascript,react,nextjs,typescript}/` pages were created. None has content, and the site's current convention (the Android page in L2C1) is **non-link "Coming soon" course cards** rather than empty placeholder pages, so this avoids fake navigation.
- **`/learn/react/`** is kept as a minimal compatibility page (see §14) rather than deleted. The site can't do server-side redirects, and the URL may already be indexed.

## 6. Old vs new hierarchy

```
Before                          After
Learn                           Learn
├── iOS                         ├── iOS
├── Android                     ├── Android
├── React          ──────────▶  ├── Web Development
├── Cloud                       │     ├── JavaScript   (planned)
├── AI & Python                 │     ├── React        (planned)
├── System Design               │     ├── Next.js      (planned)
├── Career                      │     └── TypeScript   (planned)
└── Math                        ├── Cloud
                                ├── AI & Python
                                ├── System Design
                                ├── Career
                                └── Math
```

## 7. URL architecture

```
/learn/web/                      Web Development (new, real landing)
/learn/react/                    legacy compatibility notice → /learn/web/

Future (NOT created in W1):
/learn/web/javascript/           /learn/web/javascript/getting-started/
/learn/web/react/                /learn/web/react/getting-started/
/learn/web/nextjs/               /learn/web/nextjs/getting-started/
/learn/web/typescript/           /learn/web/typescript/getting-started/
```

The canonical future React location is `/learn/web/react/`.

## 8. Learn homepage migration (`/learn/`)

- The React card was replaced **in the same position** (after Android, before Cloud) by **Web Development**:
  - `icon-tile` 🌐 (previously ⚛️);
  - title link → `/learn/web/`;
  - description "Learn modern web development from JavaScript fundamentals through React, Next.js and TypeScript.";
  - badge **"Roadmap"**, the site's existing planned-status convention. No lesson count is invented.
- The meta description now lists "Web Development" instead of "React".
- Nothing else on the page changed. Verified: 0 links to `/learn/react/` remain, and the card order is iOS | Android | Web Development | Cloud | AI & Python | System Design | Career | Math.

## 9. Web Development landing (`/learn/web/`)

- Built from the Android landing's exact shell and head structure, with the same `page-intro` going straight into `ul.card-grid`.
- **H1 "🌐 Web Development"** (emoji in `aria-hidden` `heading-icon`, as with 🍎 iOS and 🤖 Android).
- Subtitle: "Learn the language, libraries and frameworks behind modern web applications — starting with JavaScript fundamentals and progressing through React, Next.js and TypeScript."
- Breadcrumbs: `TechBuzz Apps / Learn / Web Development`.
- Four substantial `topic-card is-upcoming` cards, in progression order. None has a link, and each has three SOON pills and a **COMING SOON** badge, with no Explore.

## 10. JavaScript track

The first card. "Learn the programming language of the web — from variables and functions to arrays, objects, the DOM, events and asynchronous code." Pills: Getting Started · Functions · Arrays & Objects (SOON).

## 11. React track

The second card. "Build interactive web interfaces with components, props, state, hooks and reusable UI." Pills: Components · Props & State · Hooks (SOON).

## 12. Next.js track

The third card. "Build production-ready React applications with routing, rendering, data fetching, server features and deployment." Pills: Getting Started · Routing · Data Fetching (SOON). The wording presents Next.js as building on React, not replacing it.

## 13. TypeScript track

The fourth card. "Add static types to JavaScript to build safer, clearer and more maintainable applications." Pills: Types · Objects · Generics (SOON). It's placed last and described as adding types *to JavaScript*, so it isn't presented as a prerequisite.

## 14. Legacy `/learn/react/` handling

`/learn/react/index.html` was **replaced by a minimal compatibility page** (same shell):
- **H1 "React Has Moved"**, explaining that React is now part of Web Development alongside JavaScript, Next.js and TypeScript, and that the recommended path starts with JavaScript fundamentals.
- A real **"Go to Web Development"** button → `/learn/web/`. `/learn/web/react/` doesn't exist yet, so linking there would be a dead end.
- **`<link rel="canonical" href="https://techbuzzapps.com/learn/web/">`**, with `og:url` also pointing at `/learn/web/` and a new title and description ("React Has Moved to Web Development"). It no longer claims to be the canonical React page.
- **No redirect.** The site has no established redirect convention, so none was introduced (no meta-refresh, no JS redirect, no redirect framework).
- No React content is duplicated. The old planned-topic list was removed; its useful items live on in the React card and the future React course.
- It is not linked from site navigation. It exists only so the old URL doesn't break for external links or search results.

## 15. Navigation

- `Learn → Web Development` via the `/learn/` card (verified by clicking), and `Web Development → JavaScript / React / Next.js / TypeScript` as course cards.
- React is **no longer a top-level sibling** of iOS, Android and Cloud anywhere in the navigation.
- The shared header marks Learn `aria-current="true"` on `/learn/web/`. Breadcrumbs support future `… / Web Development / React` pages naturally.

## 16. SEO / canonical handling

- `/learn/web/` has direct-HTML SEO: title "Learn Web Development — TechBuzz Apps", a unique meta description, canonical `https://techbuzzapps.com/learn/web/`, og:title / og:description / og:url / og:type, `theme-color`, and exactly one H1.
- `/learn/react/`: canonical and og:url → `/learn/web/`, so it no longer competes with the future `/learn/web/react/`.
- `/learn/`: its meta description no longer lists React as a top-level area.
- No JS-injected SEO.

## 17. CSS / JS reuse

**Zero CSS and zero JavaScript changes.** Everything uses existing primitives: `page-intro` / `heading-icon`, `card-grid`, `topic-card` + `is-upcoming` (added in L2C1), `topic-pill is-future`, `badge`, `button`. No web, react, javascript, nextjs or typescript stylesheets or scripts, and no technology colour themes.

## 18. Accessibility

- Exactly one H1 on each page, and card titles are H2 (same hierarchy as iOS/Android).
- Labelled breadcrumbs, and Learn `aria-current` in the header.
- **Coming Soon cards contain no links:** 0 focusable elements in the Web grid, and no `href="#"`. Upcoming cards don't animate on hover.
- The 🌐 emoji is `aria-hidden`, so "Web Development" carries the meaning.
- The legacy page's only interactive element is a real link button with the focus ring intact. Contrast uses the existing tokens.

## 19. Responsive behaviour

At **1366 / 820 / 360** the Web cards' computed layout is **identical to the Android cards** (grid columns, gap, cards per row, card width, padding, radius, border, background, and title, description, pill and badge typography). The layout is 3 + 1 on desktop, and the cards stack cleanly on mobile.

Long descriptions and pills wrap, badges sit at card bottoms, breadcrumbs fit, and there is **no page-level overflow** on `/learn/`, `/learn/web/` or `/learn/react/`.

## 20. Validation

- Local `python -m http.server`, with `git archive HEAD` (`a854a1a`) as the pixel baseline.
- Headless Chrome was driven over the DevTools protocol.

| Check | Result |
|---|---|
| `/learn/`, `/learn/web/`, `/learn/react/`: HTTP 200, shared header/footer, 0 placeholders, one H1, SEO in HTML, no console errors or failed requests, no overflow | ✅ at 1366, 820 and 360 |
| `/learn/` shows Web Development (🌐, Roadmap, → `/learn/web/`) instead of React; 0 links to `/learn/react/` | ✅ |
| Web card click → `/learn/web/` | ✅ |
| Order: JavaScript, React, Next.js, TypeScript; all `is-upcoming`, Coming soon, 0 links, 3 SOON pills, no Explore | ✅ |
| Legacy `/learn/react/`: canonical → `/learn/web/`; button → `/learn/web/` | ✅ |
| `href="#"`: 0 · broken internal links: 0 | ✅ |
| Web vs Android card geometry | ✅ identical at all widths |
| **Regression, pixel-identical vs baseline at 1366 and 360 (18 URLs):** `/`, `/learn/ios/`, Closures, SwiftUI landing + 2 lessons, Combine landing + lesson, `/learn/android/`, Compose landing + lesson, `/learn/cloud/`, GCP landing + lesson, `/learn/math/`, Foundations + 2 lessons | ✅ all 18 IDENT |
| Visual inspection | `/learn/web/` at 1366 and 360, and `/learn/react/` at 1366. The Web page reads as a first-class sibling of iOS and Android. |
| `git diff --check` · trailing whitespace | ✅ clean |

## 21. Files added

- `learn/web/index.html`
- `docs/learn/reports/TechBuzzApps_PhaseW1_Web_Development_React_Migration_Report.md`

## 22. Files modified

- `learn/index.html`: React card → Web Development card; meta description.
- `learn/react/index.html`: planned-topics placeholder → "React Has Moved" compatibility page (canonical → `/learn/web/`).

## 23. Files removed

**None.** `/learn/react/` was deliberately kept as a compatibility page rather than deleted (see §14).

## 24. Files intentionally untouched

- `assets/css/*`, `assets/js/common.js`, `components/*`.
- All Swift, SwiftUI, Combine, Jetpack Compose, Math and GCP content and landings; `/learn/ios/`, `/learn/android/`, `/learn/cloud/`.
- AI & Python, System Design, Career, Apps, Dharma Connect and Simply Inspiring.
- Historical reports in `docs/` that mention `/learn/react/`: they record past phases accurately and were not rewritten.

## 25. Known limitations

- **No true redirect.** GitHub Pages can't issue server-side redirects, and the site has no client-side redirect convention. `/learn/react/` therefore relies on a visible notice, a link and a cross-page canonical. Search engines may take time to consolidate the old URL, and a canonical pointing at a different page is treated as a hint.
- **Track cards are non-links** until each track has real content, so there's no JavaScript/React/Next.js/TypeScript landing page yet. When a track's first lesson ships, its card should gain a title link, a lesson pill link, a lesson badge and Explore, matching the Jetpack Compose card.
- The "Roadmap" / "Coming soon" badges are hand-maintained.

## 26. Recommended next phase

**JavaScript for Beginners — Lesson 1: Getting Started with JavaScript** (`/learn/web/javascript/` plus `/learn/web/javascript/getting-started/`). When it ships:
- the JavaScript card becomes available (title link, "Getting Started" pill link, "1 lesson", Explore);
- the `/learn/` Web Development badge changes from "Roadmap" to "1 lesson".

The progression remains JavaScript → React → Next.js, with TypeScript after JavaScript fundamentals. Do not start with React or Next.js.

## 27. Git state

- **Before W1:** clean at `a854a1a`.
- **After W1:**
  ```
   M learn/index.html
   M learn/react/index.html
  ?? docs/learn/reports/TechBuzzApps_PhaseW1_Web_Development_React_Migration_Report.md
  ?? learn/web/
  ```
  **All uncommitted changes belong to Phase W1.** `git diff --check` is clean.
