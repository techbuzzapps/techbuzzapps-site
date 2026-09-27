# TechBuzz Apps — Phase H1 Report
## Make Learn the Homepage and Move Apps to /apps/

Branch: `feature/TechBuzzLearn` · Nothing committed or pushed.

> The phase brief was received truncated after §11 ("Hero"). It had no validation or report sections, so this report follows the structure of the previous phase reports.

---

## 1. Objective

Make the Learn landing the site homepage (`/`) and move the Apps showcase to `/apps/`, without moving the learning content namespace (`/learn/…` URLs stay stable), redesigning anything, or rewriting learning content.

## 2. Pre-change git state

`git status --short` was **clean** at `036882b GCP and AWS added` (C1 committed). There was no uncommitted work, so all changes below belong to H1.

## 3. Audit

- **`/index.html`:** the Apps showcase (H1 "TechBuzz Apps", "📚 Learn — guides & interview prep" button → `/learn/`, Available now / Coming soon app cards, `style.css?v=1` + `apps.css`, and an inline anti-flash `<style>`), self-canonical `https://techbuzzapps.com/`.
- **`/learn/index.html`:** the Learn landing with breadcrumb `TechBuzz Apps / Learn`, "TECHBUZZ LEARN", H1 "Learn Technology & Mathematics", intro, the **Start with Swift Closures** and **Explore iOS** CTAs, and the "Learning tracks" grid. That grid includes the current C1 categories: iOS, Android, Web Development, GCP, AWS, AI & Python, Math, System Design, Career.
- **Header/footer components:** nav `Apps (/)`, `Learn (/learn/)`; brand → `/`.
- **`common.js markCurrentNav`:** exact-match → `aria-current="page"`; prefix-match → `"true"`, with `/` deliberately excluded from prefix matching.
- **Links to `/learn/`:** the header, the footer, the root Apps "Learn" button, and **the breadcrumb of every Learn page** (`TechBuzz Apps (/) / Learn (/learn/) / …`, 33 pages).
- **Links to `/apps/`:** none (the directory didn't exist).
- **Legacy app pages** (`/dharmaconnect/**`, `/simplyinspiring/**`): they don't load the shared header. They use `components/navbar.html`, whose "🏠 Home" links to `/`.
- **Redirect convention:** none exists (static GitHub Pages). The established moved-page convention is the W1/C1 compatibility page: a notice, a real link, and a canonical to the new URL.

## 4. New architecture

```
TechBuzz Apps
├── /                 Learn homepage (landing only)
│     └── learning content stays at /learn/ios/, /learn/android/, /learn/web/,
│         /learn/gcp/, /learn/aws/, /learn/ai-python/, /learn/math/, …
├── /apps/            Apps showcase
└── /learn/           compatibility notice → /
```

## 5. Homepage (`/`)

`/index.html` is now the former Learn landing. The only differences (verified by diff) are:
- **metadata:** title "TechBuzz Apps — Learn Technology & Mathematics", canonical and og:url `https://techbuzzapps.com/`, og:title;
- **breadcrumb removed:** no "TechBuzz Apps / Learn" above the hero;
- **both hero CTAs removed:** "Start with Swift Closures" and "Explore iOS". They weren't replaced, and there is no new CSS. The hero flows TECHBUZZ LEARN → *Learn Technology & Mathematics* → intro → **Learning tracks**, using the existing `page-intro` bottom margin.

The eyebrow, H1, intro copy (unchanged) and all 9 category cards with their truthful statuses are preserved:

| Card | Link | Status |
|---|---|---|
| iOS | `/learn/ios/` | 4 guides |
| Android | `/learn/android/` | 1 lesson |
| Web Development | `/learn/web/` | Roadmap |
| GCP | `/learn/gcp/` | 1 lesson |
| AWS | `/learn/aws/` | Roadmap |
| AI & Python | `/learn/ai-python/` | Roadmap |
| Math | `/learn/math/` | 2 lessons |
| System Design | `/learn/system-design/` | Roadmap |
| Career | `/learn/career/` | Roadmap |

All cards link to the existing canonical `/learn/…` category URLs. No root-level learning routes were created.

## 6. Apps page (`/apps/`)

`/apps/index.html` is the former root Apps showcase, with its **content and design preserved** (the main region is pixel-identical to the old `/` at 1366 and 360). The only differences are:
- title "Apps — TechBuzz Apps", canonical and og:url `https://techbuzzapps.com/apps/`, og:title;
- the "📚 Learn — guides & interview prep for engineers →" button now links to `/` (Learn's new home) instead of `/learn/`.

App cards, platform/status tags and the real app links (`/dharmaconnect/…`, `/simplyinspiring/`) are unchanged. App detail pages were not modified.

## 7. Shared header, footer and active state

- **Header nav order is now `Learn` (`/`), `Apps` (`/apps/`).** The footer nav uses the same order and links. The brand "TechBuzz Apps" still links to `/`, which is now Learn.
- **Active state:** `markCurrentNav` in `common.js` gained one generic concept, an optional **`data-section`** attribute listing URL prefixes that count as "inside" a nav item. Everything else is unchanged:
  - Learn: `data-section="/learn/"`;
  - Apps: `data-section="/dharmaconnect/ /simplyinspiring/"`.

| URL | Learn | Apps |
|---|---|---|
| `/` | `aria-current="page"` | — |
| `/learn/…` (every category, lesson and compatibility page) | `aria-current="true"` | — |
| `/apps/` | — | `aria-current="page"` |
| `/dharmaconnect/…`, `/simplyinspiring/…` | — | would be `"true"`, but these legacy pages don't load the shared header, so the rule is future-proofing only |

`/` is still never treated as a prefix of every URL. The legacy `#navbar` path is untouched.

## 8. `/learn/` compatibility

`/learn/index.html` is now a lightweight W1/C1-style compatibility page:
- H1 "TechBuzz Learn Is Now the Homepage", a one-sentence explanation, and a real **Go to the homepage** button → `/`;
- canonical and og:url `https://techbuzzapps.com/`;
- it does **not** duplicate the Learn homepage (no track cards), and has no redirect or framework.

`/learn/cloud/`'s notice previously had its canonical pointing at `/learn/`, which is now itself a notice. It was updated to point at `https://techbuzzapps.com/`.

## 9. Breadcrumbs (Learn pages)

- **Before:** `TechBuzz Apps (/) / Learn (/learn/) / Category / …`.
- **Problem:** with Learn at `/`, the first two crumbs would both mean "home", and every Learn page would link to the `/learn/` compatibility notice.
- **After:** the pair was collapsed into a single first crumb, **`Learn` → `/`**, on all 33 Learn pages (including the React/Cloud/GCP/AWS compatibility pages). Every category and lesson crumb after it is unchanged, e.g. `Learn / iOS / SwiftUI / Getting Started with SwiftUI`.
- Each page's diff is exactly **+1/−2 lines** (verified with `git diff --numstat`). No other content changed, and lesson article bodies are pixel-identical.
- **Note:** this changes the first crumb on every page, which is more than the brief's "retain their normal breadcrumbs". I chose it so the site has no two crumbs pointing home and no internal links to a compatibility page. If you'd rather keep a "TechBuzz Apps" first crumb, it's a one-line change per page.

## 10. Learning URL rule

No learning content moved. `/learn/ios/`, `/learn/android/`, `/learn/web/`, `/learn/gcp/`, `/learn/aws/`, `/learn/ai-python/`, `/learn/math/`, `/learn/system-design/`, `/learn/career/` and all lessons keep their URLs, canonicals and content. No `/ios/`, `/android/` or `/gcp/` routes exist.

## 11. SEO

| URL | Title | Canonical |
|---|---|---|
| `/` | TechBuzz Apps — Learn Technology & Mathematics | `https://techbuzzapps.com/` |
| `/apps/` | Apps — TechBuzz Apps | `https://techbuzzapps.com/apps/` |
| `/learn/` | TechBuzz Learn Is Now the Homepage | `https://techbuzzapps.com/` |

The meta description, og tags, `theme-color` and exactly one H1 are present in HTML on each page. No JS-injected SEO.

## 12. CSS / JS

- **CSS: none.**
- **JS:** a small generic extension to `markCurrentNav` (the `data-section` prefixes, 3 lines plus a doc comment). No new files and no framework.

## 13. Accessibility

- One H1 per page, and the root has no redundant breadcrumb.
- The primary and footer navs stay labelled, with correct `aria-current` (page vs section).
- Brand, nav, cards and compatibility buttons are real keyboard-operable links, and focus-visible styling is unchanged.
- No `href="#"`, and no fake interactive content.

## 14. Responsive

At **1366 / 820 / 360**, every tested page loads with the shared header, one H1, **no horizontal overflow** and no console errors. The root hero, without the CTAs, flows directly into Learning tracks on desktop and mobile. The `/apps/` main content is pixel-identical to the old root.

## 15. Validation

Local `python -m http.server`, with `git archive HEAD` (`036882b`) as the baseline, and headless Chrome driven over the DevTools protocol.

| Check | Result |
|---|---|
| 18 routes (`/`, `/apps/`, `/learn/`, iOS/Android/Web/GCP/AWS/Math/AI & Python landings, SwiftUI, Compose, GCP and Math lessons, GCP Fundamentals, React and Cloud compatibility pages): HTTP 200, header, one H1, 0 overflow, 0 console errors | ✅ ×3 widths |
| Nav state: `/` Learn=page · `/apps/` Apps=page · all `/learn/…` Learn=true (header + footer) | ✅ |
| Brand → `/`; header Apps → `/apps/`; root GCP card → `/learn/gcp/`; `/apps/` Learn button → `/`; lesson first crumb → `/`; `/learn/` button → `/` | ✅ clicked |
| Root: eyebrow present, 0 hero buttons, 0 breadcrumbs, next section "Learning tracks"; 9 cards with correct links and statuses | ✅ |
| No `href="/learn/"` anywhere on the site; no remaining "TechBuzz Apps" breadcrumbs; no broken internal links; `href="#"`: 0 | ✅ |
| `/apps/` main vs old `/` main | ✅ pixel-identical (1366, 360) |
| `/dharmaconnect/`, `/dharmaconnect/privacy/`, `/dharmaconnect/support/`, `/simplyinspiring/` vs baseline | ✅ pixel-identical |
| Lesson article bodies (SwiftUI L2, Math L2, GCP L1) vs baseline | ✅ pixel-identical |
| `node --check common.js`; `git diff --check` | ✅ |

## 16. Files added

- `apps/index.html`: Apps showcase (moved from `/`)
- `docs/learn/reports/TechBuzzApps_PhaseH1_Learn_Homepage_Apps_Migration_Report.md`

## 17. Files modified

- `index.html`: now the Learn homepage (from `learn/index.html`): no breadcrumb, no CTAs, root metadata.
- `learn/index.html`: now the "TechBuzz Learn Is Now the Homepage" compatibility page.
- `components/site-header.html`, `components/site-footer.html`: Learn/Apps order, links and `data-section`.
- `assets/js/common.js`: `data-section` prefix support in `markCurrentNav`.
- 33 Learn pages: breadcrumb prefix `TechBuzz Apps / Learn` → `Learn` (→ `/`). `learn/cloud/index.html` also had its canonical re-pointed to `/`.

## 18. Files removed

None.

## 19. Files intentionally untouched

- `assets/css/*`.
- `components/navbar.html` and all Dharma Connect / Simply Inspiring pages. Their "🏠 Home" link goes to `/`, which is now the Learn homepage (the site home). Changing it to `/apps/` would alter app pages, so it was left alone.
- All lesson and course content.
- Historical reports in `docs/`.

## 20. Known limitations

- **No true redirect** from `/learn/` to `/`. GitHub Pages can't issue 301s, so the compatibility page relies on a visible link and a canonical.
- **The legacy app navbar's "Home"** now lands on Learn rather than on the Apps list. If app users should return to `/apps/`, `components/navbar.html` can be updated in a small follow-up.
- The Apps active state for `/dharmaconnect/` and `/simplyinspiring/` only takes effect if those pages adopt the shared header in the future.
- **Brief truncation:** anything the brief may have specified after §11 couldn't be applied.

## 21. Git state

- **Before H1:** clean at `036882b`.
- **After H1:** modified `index.html`, `learn/index.html`, `components/site-header.html`, `components/site-footer.html`, `assets/js/common.js` and 33 Learn pages (breadcrumbs); added `apps/index.html` and this report. **All uncommitted changes belong to Phase H1.** `git diff --check` is clean.
