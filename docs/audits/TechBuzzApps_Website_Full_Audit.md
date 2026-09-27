# TechBuzz Apps — Full Website Audit

**Scope:** Complete static site at repository root (branch `feature/TechBuzzLearn`).
**Type:** Read-only audit. No files were modified, refactored, or deleted as part of this report.
**Date:** 2026-09-26

---

## 1. Executive Summary

The site is a small, hand-authored static HTML/CSS site (no build tooling, no framework, no package manager) deployed via GitHub Pages with a custom domain (`techbuzzapps.com`). It hosts a landing page and per-app subsites for two apps — **Dharma Connect** (in development, not yet linked to a store) and **Simply Inspiring** (published on the App Store, real App Store ID present) — plus a set of orphaned, completely empty stub pages under `learn/`.

The most serious problems are not design issues but **missing/incomplete content that has real-world consequences**:

- **Simply Inspiring's Privacy Policy and Terms pages are completely empty files** (2 bytes each) despite the app being live on the App Store and linking to them. Apple/Google require a working privacy policy; this is a compliance risk today, not a future one.
- **Simply Inspiring's screenshots and its "Support" link point to paths that don't exist** on disk — three broken images and one broken/404 navigation link on a published app's page.
- **The shared navbar component (`components/navbar.html`) is hardcoded to Dharma Connect's links** but is also loaded (via `common.js`) into the Simply Inspiring homepage, so a published app's page silently injects a competitor app's Privacy/Terms/Support/Delete-Account links.
- Four additional pages (`learn/android`, `learn/ios`, `learn/ios/interview/swiftui-interview-questions`, plus the two Simply Inspiring legal pages above) are **0-byte stub files** — created via GitHub's web UI "Create index.html" flow and never filled in. They are dead weight today; three of them (`learn/*`) are also completely unlinked from the rest of the site.
- There is **no SEO metadata anywhere** in the repository — no meta description, Open Graph, Twitter Card, canonical URL, `robots.txt`, or sitemap on any of the 14 HTML files.
- No secrets, API keys, or credentials were found committed to the repository.

The overall architecture is simple and consistent where it's actually filled in (shared `style.css`, a single `common.js` navbar loader, consistent dark theme), but the site is mid-migration: some pages assume infrastructure (support pages, image folders, a generic navbar) that was never built.

---

## 2. Repository Structure

```
/
├── CNAME                                  → techbuzzapps.com (GitHub Pages custom domain)
├── README.md                              → single line, no content
├── index.html                             → homepage / app directory
├── favicon.ico                            → valid multi-size Windows ICO
├── favicon.png                            → actually a JPEG, 1024x1024 (mislabeled)
├── apple-touch-icon.png                   → actually a JPEG, 1024x1024 (mislabeled, oversized)
├── assets/
│   ├── css/style.css                      → single shared stylesheet, all pages
│   ├── js/common.js                       → single shared script (navbar injector)
│   └── images/
│       ├── app-store-badge.svg            → Apple badge asset (12 KB)
│       ├── test                           → 2-byte stray file, unreferenced
│       └── dharmaconnect/
│           ├── android-home.png (548 KB)
│           ├── android-temple.png (432 KB)
│           ├── ios-home.png (376 KB)
│           ├── ios-temple.png (556 KB)
│           └── test                       → 2-byte stray file, unreferenced
├── components/
│   └── navbar.html                        → hardcoded Dharma Connect nav, fetched via JS
├── dharmaconnect/
│   ├── index.html                         → app page (in development, no store links)
│   ├── privacy/index.html
│   ├── terms/index.html
│   ├── support/index.html
│   └── delete-account/index.html
├── simplyinspiring/
│   ├── index.html                         → app page (published, App Store link present)
│   ├── privacy/index.html                 → 0 bytes (empty)
│   └── terms/index.html                   → 0 bytes (empty)
│       (no support/ directory, despite index.html linking to /simplyinspiring/support/)
└── learn/
    ├── android/index.html                 → 0 bytes (empty), unlinked from site
    ├── ios/index.html                     → 0 bytes (empty), unlinked from site
    └── ios/interview/swiftui-interview-questions/index.html → 0 bytes (empty), unlinked
```

**No build tooling** of any kind (no `package.json`, no bundler, no `.github/workflows`, no CI/CD). **No `.nojekyll`, `robots.txt`, or `sitemap.xml`.** Deployment is standard GitHub Pages serving the branch root directly.

---

## 3. Current Architecture

- **Plain HTML/CSS/JS.** No framework, no templating engine, no server-side includes.
- **One shared stylesheet** (`assets/css/style.css`) is linked from every real page. There is no page-specific CSS file anywhere — all page variation comes from HTML structure and class names within the one file. This is good for consistency but means the stylesheet has grown a mix of homepage-only, app-page-only, and legal-page-only rules in one file with no clear separation.
- **"Shared" navbar via client-side fetch.** `assets/js/common.js` does `fetch('/components/navbar.html')` and injects the HTML into `<div id="navbar"></div>`. This is the only reusable component. It is a real dependency: if JavaScript is disabled, blocked, or the fetch fails (e.g., opened via `file://`, or CORS/pathing issues on a non-root deployment), **every sub-page loses its top navigation entirely** and falls back to whatever links are hardcoded near the bottom of that specific page.
- **The homepage does not use the navbar or `common.js` at all** — it has its own fully inline layout and an inline `<style>` block (see §12).
- **`components/navbar.html` is not generic** — its five links are hardcoded to Dharma Connect's own privacy/terms/support/delete-account URLs. It is reused as-is by Simply Inspiring's homepage, which is incorrect (§4).
- **No external libraries or CDNs**, no analytics, no third-party trackers of any kind were found. Privacy policies mention Firebase for the apps themselves, but nothing third-party runs on the website.
- **Navigation model:** the homepage links out to each app's root; each app page links to its own privacy/terms/support/delete-account pages (either via the injected navbar and/or a hardcoded `card-links` block at the bottom of the page body — usually both, redundantly, on Dharma Connect pages).

---

## 4. Homepage Findings (`index.html`)

| Area | Finding |
|---|---|
| Header/Hero | Present: `<h1>TechBuzz Apps</h1>` + subtitle. No nav bar (expected — this is the top of the hierarchy). |
| App cards | 6 cards: Dharma Connect, Office Pulse, Simply Inspiring, Durga Puja Celebrations, Sarvopari, Multiplication Table Generator. |
| Dharma Connect card | Links to Privacy/Terms/Support/Delete Account only — **no App Store/Play Store link**, consistent with it being unpublished. Title text has odd indentation (mixed 2-space/8-space) but renders fine. |
| Office Pulse, Durga Puja, Sarvopari, Multiplication Table Generator | All show a single `<a href="#">Coming Soon</a>` — intentional placeholders, not broken links, but `href="#"` is not focus/screen-reader friendly (see §7). |
| Simply Inspiring card | Links only to `/simplyinspiring/` — no direct App Store link from the homepage card (the App Store link only exists on the app's own subpage). Inconsistent with the fact that this is the one actually-published app. |
| Unused section | An HTML comment silently disables what would have been a "Coming Soon" link under Simply Inspiring (`<!-- <a href="#">Coming Soon</a> -->`), left in the markup instead of removed — harmless but dead code (§12). |
| Footer | `© 2026 TechBuzz Apps. All rights reserved.` — present only on the homepage; no sub-page carries a footer (§12 inconsistency). |
| Broken links | None on the homepage itself — all `href` targets that aren't `#` resolve to real directories. |
| Images | No images used on the homepage at all (no hero image, no app icons in the cards) — purely emoji + text. |

---

## 5. App Pages

### Dharma Connect (`/dharmaconnect/*`) — in development, not yet store-listed
- Full page: hero, "About", "Core Features" (10 bullet list items), "Screenshots" (2 iOS + 2 Android images), "Project Status", and a `card-links` footer nav.
- Screenshots load from `assets/images/dharmaconnect/*.png` — all four files exist and paths are correct.
- **No App Store or Google Play links anywhere on this page**, despite text stating "Available for both Android and iOS." This is either intentionally pre-launch copy or a missed update — worth confirming with the team, but as written it reads as misleading if a user arrives expecting a download link.
- Privacy, Terms, Support, and Delete Account pages are all **fully written out** (not stubs) with real, if generic, legal copy and a shared contact address (`support@techbuzzapps.com`). Cross-links between these four pages are consistent and complete.
- Uses both the injected navbar (`common.js` + `#navbar`) **and** a hardcoded `card-links` block at the bottom with the same four links — redundant but not broken.

### Simply Inspiring (`/simplyinspiring/*`) — published, real App Store listing
- Page has hero, real App Store badge + link (`apps.apple.com/in/app/simply-inspiring/id1486011602`), "About", "Features", "Screenshots", "Why Simply Inspiring?", and a `card-links` footer.
- **Broken images:** all three screenshots (`/assets/images/simplyinspiring/home.png`, `favorites.png`, `share.png`) point into a directory (`assets/images/simplyinspiring/`) that **does not exist** in the repository. Every screenshot on this page is a broken image icon.
- **Broken link:** the footer links to `/simplyinspiring/support/`, but no `support` directory exists under `simplyinspiring/` — this is a 404 on a live, published app's page.
- **Broken/incorrect legal pages:**
  - `/simplyinspiring/privacy/index.html` is **0 bytes** — a blank page with no title, no content.
  - `/simplyinspiring/terms/index.html` is **0 bytes** — same.
  - Both are directly linked from the app's own page and would be shown to real users and to Apple's App Review / compliance checks.
- **Wrong navbar content:** this page includes `<div id="navbar"></div>` and `common.js`, which injects `components/navbar.html` — but that file's links (Privacy/Terms/Support/Delete Account) all point to `/dharmaconnect/...` URLs. A visitor on the Simply Inspiring page sees a "Delete Account" link (Dharma Connect doesn't even offer account deletion functionality relevant to Simply Inspiring) and a Privacy Policy link that goes to Dharma Connect's privacy policy, not Simply Inspiring's.
- No Google Play link (app appears to be iOS-only, consistent with "Available on iPhone and iPad" copy) — not a defect, just noted.

### `learn/*` pages — orphaned stubs
- `learn/android/index.html`, `learn/ios/index.html`, and `learn/ios/interview/swiftui-interview-questions/index.html` are all **0-byte empty files**.
- None of them is linked from `index.html`, any app page, or any other file in the repo — confirmed via full-repo search for `learn/`. They are only reachable if someone knows/guesses the URL.
- Git history shows a related page (`learn/ios/interview/swiftui-interview.html`) was created and then deleted in the same session that created the current empty stub at a slightly different path — this looks like an in-progress restructuring of a "Learn" section (interview-prep content?) that was abandoned partway through.

### Cross-app inconsistencies
- Dharma Connect's legal pages are fully written; Simply Inspiring's are empty — despite Simply Inspiring being the one app that's actually live.
- Dharma Connect has a Delete Account page; Simply Inspiring does not (and doesn't clearly need one if it has no accounts — but this should be confirmed rather than assumed).
- Only Dharma Connect pages use the injected navbar *correctly* (its own links); Simply Inspiring inherits the wrong one.
- Contact email is consistently `support@techbuzzapps.com` across all legal pages that exist — this part is consistent.

---

## 6. Responsive Design

Reviewed `assets/css/style.css` (the only stylesheet) statically; one mobile breakpoint exists (`@media (max-width: 768px)`).

- `.container` uses `max-width: 1100px; margin: auto` with `40px 20px` body padding — scales down reasonably on wide screens and doesn't hit screen edges on mobile (padding still applies).
- `.apps` grid uses `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))` — a resilient pattern that reflows correctly from mobile through ultra-wide without extra breakpoints.
- Mobile breakpoint reduces container padding, `h1` size, stacks `.navbar` and `.card-links` links to full width, and collapses `.screenshot-table` from 2 columns to 1 with smaller (180px) images. This is a sensible, if minimal, mobile pass.
- No breakpoints exist for tablet (`769px`–`1024px`) specifically — the layout relies on the fluid grid to "just work" in between, which is plausible given the simple content but wasn't verified in an actual browser per the audit constraints (no visual testing was performed; this is a static code read).
- Screenshot `<img>` tags have no explicit `width`/`height` attributes (only CSS `width: 220px` / `180px` on mobile), so the browser cannot reserve space before the (fairly large, see §9) images load — this is a layout-shift (CLS) risk, worse on slower connections given the file sizes involved.
- No horizontal-overflow-prone fixed-width elements were found outside the intentionally fixed (but `max-width: 100%`-guarded) screenshot images.
- No visual/browser-based testing across real device widths was performed in this audit — findings here are from static CSS inspection only, per the audit's "no modification, minimal tooling" scope. A follow-up visual pass (resizing an actual browser or using devtools device emulation) is recommended before calling responsive design "done."

---

## 7. Dark Mode

The site **does not implement dark mode as a feature** — it implements a single, permanently dark theme (`background: linear-gradient(135deg, #0f172a, #111827)`, white/light-gray text) with no `prefers-color-scheme` media query, no theme toggle, and no light-theme tokens anywhere in the CSS (confirmed via full-repo search — zero matches for `prefers-color-scheme`, `data-theme`, or similar).

This means:
- Users with a light-mode OS/browser preference still get the dark theme — not a bug, just a fixed design choice worth confirming is intentional.
- There is nothing to "audit for dark-mode contrast issues" separately, because there's only one theme. Contrast within that one dark theme looks adequate on inspection (light gray `#d1d5db` body text and amber `#fbbf24`/`#f59e0b` accents on a `#0f172a`/`#111827` background are both high-contrast combinations), but this was not measured with a contrast-ratio tool.

---

## 8. Accessibility

**Definite issues (found in code, not speculative):**

1. **No landmark elements.** Navigation is a plain `<div class="navbar">` (not `<nav>`), and every page body is a single generic `<div class="container">` with no `<main>`, `<header>`, or (on sub-pages) `<footer>`. Screen reader users lose the ability to jump between landmarks.
2. **Placeholder links go nowhere with no indication.** The five `href="#"` "Coming Soon" links on the homepage have no `aria-disabled`, no `role`, and no visible-but-not-interactive treatment — they read to assistive tech and keyboard users as functional links that silently do nothing (page jumps to top).
3. **No footer/closing landmark on any sub-page.** Every page under `dharmaconnect/`, `simplyinspiring/` ends abruptly after the `card-links` block with a `<script>` tag — no copyright/footer content, inconsistent with the homepage.
4. **Two icon files are mislabeled and oversized JPEGs served as `.png`.** Not an accessibility issue per se, but see §9/§10 for why this matters.
5. **The Simply Inspiring and `learn/*` empty pages have no `<title>`, no `lang`, no headings, and no content at all** — a screen reader or SEO crawler landing on them gets literally nothing to announce.

**What's actually fine:**
- All real (non-empty) `<img>` tags have descriptive `alt` text.
- `lang="en"` is present on every non-empty HTML document.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` is present and correct on every non-empty page.
- Heading hierarchy on the real content pages (`h1` → `h2` → occasional `h3` under a `h2`, back to `h2`) does not skip levels in a way that would confuse assistive tech.

**Recommendations (not confirmed defects, but worth doing):**
- Add explicit `:focus-visible` styling — current reliance on browser default focus rings is workable but not verified against the dark background.
- Convert the navbar `<div>` to a `<nav aria-label="...">` and wrap main content in `<main>`.
- Either give "Coming Soon" cards a non-link treatment (e.g., a `<span>` or disabled-styled button) or remove the `<a href="#">` wrapper entirely.

---

## 9. SEO / Metadata

Every one of the 14 HTML files in the repo was checked (via full-text search) for `<meta name="description">`, Open Graph (`og:*`), Twitter Card (`twitter:*`), `<link rel="canonical">`, and `<meta name="robots">`. **Zero matches across the entire repository.**

- **No `robots.txt`** at the repo root.
- **No `sitemap.xml`** anywhere.
- **No structured data / schema.org markup** on any page (no `SoftwareApplication` schema for the apps, which would otherwise be a natural fit for app-listing pages).
- **Favicons are present and linked correctly** in `index.html`'s `<head>` (`favicon.ico`, `favicon.png`, `apple-touch-icon.png` with proper `rel`/`sizes` attributes) — but **only on `index.html`**. None of the app pages, legal pages, or the `learn/*` stubs declare any favicon/icon links in their own `<head>` — they'll typically still resolve because browsers fall back to `/favicon.ico` at the domain root, but this is inconsistent and not guaranteed across all browsers/contexts.
- Every non-empty page has a distinct, reasonable `<title>` (e.g., "Dharma Connect Privacy Policy", "Delete Account - Dharma Connect") — titles are present and not duplicated, which is good, but there is no supporting metadata to go with them.
- The empty stub pages (`learn/*`, `simplyinspiring/privacy`, `simplyinspiring/terms`) have **no `<title>` at all** since they have no markup whatsoever — if indexed by a crawler, they'd show as blank/untitled pages.

No SEO content was invented or added as part of this audit, per instructions.

---

## 10. Performance

- **Screenshot images are large for what they show:** the four Dharma Connect PNGs range from 376 KB to 556 KB each (1.9 MB total for four screenshots), with no evidence of compression/optimization (no WebP/AVIF variants, no responsive `srcset`). Given they're displayed at a CSS width of 220px (180px on mobile), the source files are almost certainly far higher resolution than needed.
- **No `loading="lazy"` on any `<img>`** — all screenshots load eagerly regardless of scroll position, on pages that have a handful of large images below the fold.
- **No explicit `width`/`height` attributes on `<img>` tags** — compounds the CLS risk noted in §6, since the browser has no reserved space until each (large) image downloads.
- **`favicon.png` and `apple-touch-icon.png` are actually 1024×1024 JPEGs (~80 KB each)** despite being used as a 32×32 favicon and 180×180 touch icon respectively — the browser downloads and downscales images roughly 30–190× larger than needed on every page load that doesn't hit cache.
- **No render-blocking third-party resources** — the only external asset is the single local stylesheet; no web fonts, no CDN scripts, no analytics beacons were found.
- **No duplicate CSS/JS files** — there's exactly one stylesheet and one script in the whole repo, so there's no duplication to consolidate.
- `index.html` loads its stylesheet with a cache-busting query string (`style.css?v=1`); no other page uses this pattern, meaning cache invalidation on CSS changes is inconsistent between the homepage and every sub-page (sub-pages could keep serving a stale cached `style.css` after an update while the homepage picks up the new version).

---

## 11. Security / Privacy Hygiene

- **No secrets, API keys, tokens, or credentials found** in a full-repository search for common patterns (`api_key`, `secret`, `token`, `AIza`, `password`, `PRIVATE_KEY`, etc.). Clean.
- **No `http://` (insecure) resource references** anywhere in the codebase — the one `http://` string found is inside an SVG's XML namespace declaration (`xmlns="http://www.w3.org/2000/svg"`), which is a standard, required namespace URI, not a fetched resource, and not a security concern.
- **One `target="_blank"` link exists** (the App Store badge on Simply Inspiring's page) and it **correctly** carries `rel="noopener noreferrer"` — no reverse-tabnabbing risk there.
- **No inline event handlers or `eval`-style patterns** — the only JavaScript in the repo is the 5-line `common.js` navbar fetch, which is simple and safe (no use of `innerHTML` with untrusted/remote data beyond the site's own same-origin `navbar.html`).
- Privacy policies reference Firebase as a third-party processor for the apps themselves (not the website) — this is disclosed appropriately in the text that exists, but again, Simply Inspiring's actual privacy policy page is empty, so **that disclosure isn't reachable for the one published app** (see §5, §14 Critical findings).

---

## 12. Legal / Support Pages

| Page | Reachable? | Content status | Notes |
|---|---|---|---|
| Dharma Connect Privacy | Yes | Complete | Consistent contact email, consistent cross-links |
| Dharma Connect Terms | Yes | Complete | Same |
| Dharma Connect Support | Yes | Complete | Same |
| Dharma Connect Delete Account | Yes | Complete | Same |
| Simply Inspiring Privacy | Yes (URL resolves) | **Empty (0 bytes)** | Linked from the live app's own page |
| Simply Inspiring Terms | Yes (URL resolves) | **Empty (0 bytes)** | Linked from the live app's own page |
| Simply Inspiring Support | **No — 404** | Directory doesn't exist | Linked from the live app's own page |

Formatting/responsiveness of the four Dharma Connect legal pages is consistent with each other and with the rest of the site (same shared stylesheet, same `page-content`/`features` classes). No outdated references, no inconsistent company/app naming were found in the pages that have content — "Dharma Connect" and "TechBuzz Apps" are used correctly and consistently throughout.

No legal content was rewritten as part of this audit.

---

## 13. Dead / Duplicate Code

- **`assets/images/test` and `assets/images/dharmaconnect/test`** — two 2-byte stray files (each just a CRLF), unreferenced anywhere in the codebase. Almost certainly artifacts of testing file uploads through the GitHub web UI. Safe-looking candidates for removal, but left untouched per audit scope.
- **`.links` and `.home-link` CSS classes** in `style.css` are defined but never used in any HTML file in the repository — dead CSS.
- **A commented-out `<a>` tag** in `index.html` (`<!-- <a href="#">Coming Soon</a> -->` under the Simply Inspiring card) — harmless, but should eventually be deleted rather than left commented.
- **The `learn/*` empty stub pages** are, in effect, dead/abandoned pages — unlinked from the site and empty. Not recommended for deletion without confirming intent (see §12/§15), since git history suggests this was a genuine in-progress feature (a "Learn"/interview-prep section), not accidental clutter.
- **Redundant navigation markup on Dharma Connect pages:** the injected navbar (`#navbar` + `common.js`) and the hardcoded `card-links` block at the bottom of each page duplicate the same four links. Not broken, but doing the same job twice.
- **`index.html`'s inline `<style>` block** duplicates rules already present in `style.css` (`html, body { margin:0; padding:0; background:#0f172a; color:white; }`). This is very likely intentional (prevents a flash of unstyled/white content before the external stylesheet loads), so it's noted as a duplication rather than flagged as a bug.

No files were deleted or modified as part of this audit.

---

## 14. GitHub Pages / Deployment

- **`CNAME`** at the repo root contains `techbuzzapps.com` — standard custom-domain setup for GitHub Pages, served from the repo root (no `/docs` subfolder, no separate `gh-pages` branch artifacts visible in the current tree).
- **No GitHub Actions workflow** (`.github/workflows/`) exists — deployment is presumably configured via the repository's Pages settings to build from a branch directly, not via a custom Actions pipeline. This audit could not confirm the exact configured source branch from within the repo alone (that lives in GitHub repo settings), but everything under this working tree assumes root-relative serving.
- **All internal links use root-relative absolute paths** (e.g., `/dharmaconnect/privacy/`, `/assets/css/style.css`) rather than relative paths — this is the correct choice for a custom-domain, root-served GitHub Pages site, and would only break if the site were ever served from a project subpath (e.g., `username.github.io/repo-name/`) without adjusting these paths.
- **No `.nojekyll` file.** Since GitHub Pages runs Jekyll by default, and none of the current file/folder names begin with `_` (Jekyll's ignore pattern), this likely isn't causing any visible problem today — but it's worth adding proactively if any future folder or file is ever named with a leading underscore, since Jekyll would silently exclude it from the built site without an explicit `.nojekyll`.
- **No case-sensitivity mismatches found** — all folder and file names referenced in HTML (`dharmaconnect`, `simplyinspiring`, `assets`, etc.) match the actual on-disk casing exactly, which matters because GitHub Pages serves from a case-sensitive Linux filesystem even though this repo was likely edited on case-insensitive Windows/macOS filesystems.
- The **broken image and broken link issues in §5** (Simply Inspiring's missing `assets/images/simplyinspiring/` folder and missing `support/` directory) will manifest identically in production on GitHub Pages — they are not local-environment artifacts.

---

## 15. Issues by Severity

### Critical
1. **Simply Inspiring Privacy Policy page is empty** (`simplyinspiring/privacy/index.html`, 0 bytes). App is live on the App Store and links to this page. *Evidence:* file size 0 bytes; linked from `simplyinspiring/index.html` line 122. *Impact:* App Store policy compliance risk; real users get a blank page when trying to read the privacy policy of an app that (per its own privacy text, if it existed) would touch on data collection.
2. **Simply Inspiring Terms & Conditions page is empty** (`simplyinspiring/terms/index.html`, 0 bytes). Same evidence pattern as above (linked from line 126). *Impact:* Same compliance/trust risk.
3. **Simply Inspiring "Support" link is a 404** — `simplyinspiring/index.html` links to `/simplyinspiring/support/` (line 130), but no `support/` directory or file exists anywhere under `simplyinspiring/`. *Impact:* A live app's page sends users into a dead end when seeking help.
4. **Simply Inspiring's navbar shows Dharma Connect's links.** `components/navbar.html` is hardcoded to `/dharmaconnect/...` URLs but is injected into `simplyinspiring/index.html` via `common.js`. *Impact:* Users on a live app's page are shown a "Privacy Policy" / "Delete Account" navbar that actually points at a different, unrelated app.

### High
5. **All three Simply Inspiring screenshots are broken images.** `simplyinspiring/index.html` (lines 85, 89, 93) references `assets/images/simplyinspiring/home.png`, `favorites.png`, `share.png` — the `assets/images/simplyinspiring/` directory does not exist. *Impact:* The published app's marketing page shows three broken-image icons instead of screenshots.
6. **No SEO metadata anywhere in the site.** Confirmed zero occurrences of meta description, Open Graph, Twitter Card, canonical link, `robots.txt`, or sitemap across all 14 HTML files. *Impact:* Poor search visibility and poor link-preview appearance (e.g., sharing a link in Slack/iMessage/social media shows no image or description) for the one app that's actually trying to acquire users.
7. **Dharma Connect app page has no App Store/Play Store download links**, despite stating "Available for both Android and iOS." *Impact:* If the app is in fact available, users reading the page have no way to download it from the page itself. (If it is genuinely pre-launch, the copy should say so instead.)

### Medium
8. **Icon files are mislabeled and oversized.** `favicon.png` and `apple-touch-icon.png` are both actually JPEGs at 1024×1024 (~80 KB each) despite `.png` extensions and intended display sizes of 32×32 / 180×180. *Impact:* Unnecessary download weight on every page load; extension mismatch could confuse tooling that inspects file type by extension.
9. **`learn/android`, `learn/ios`, and `learn/ios/interview/swiftui-interview-questions` are empty (0-byte) and completely unlinked** from the rest of the site. *Impact:* Dead, unreachable pages; if indexed by a crawler they'd appear as blank/untitled results for `techbuzzapps.com`.
10. **No `loading="lazy"` and no `width`/`height` attributes on any `<img>`.** *Impact:* Unnecessary eager-loading of large images and layout-shift risk, compounded by the large screenshot file sizes noted in §9/§10.
11. **Dharma Connect screenshot PNGs are large** (376–556 KB each, 1.9 MB total for four images) with no visible compression or responsive image strategy for images displayed at 220px/180px CSS width. *Impact:* Slower page loads, especially on mobile networks.
12. **Inconsistent footer presence.** Only `index.html` has a `<footer>` — no sub-page (app pages, legal pages) carries any footer/copyright content. *Impact:* Minor brand/consistency issue.
13. **Inconsistent favicon declarations across pages.** Only `index.html`'s `<head>` declares favicon/apple-touch-icon links; every other page relies on implicit root-level fallback. *Impact:* Works today via browser fallback behavior, but is fragile and inconsistent.
14. **No landmark elements** (`<nav>`, `<main>`) anywhere in the site — navigation is a bare `<div class="navbar">`, content is a bare `<div class="container">`. *Impact:* Reduced screen-reader navigability.
15. **Homepage doesn't provide an App Store link for Simply Inspiring on its own card** (the only way to reach the App Store link is by first clicking into `/simplyinspiring/`). *Impact:* Extra friction for the one app that's actually trying to convert visitors into installs.

### Low
16. **Two 2-byte junk files** (`assets/images/test`, `assets/images/dharmaconnect/test`) — unreferenced anywhere. Likely leftover from testing file uploads.
17. **Dead CSS classes** `.links` and `.home-link` in `style.css` — defined, never used in any HTML file.
18. **Commented-out dead markup** in `index.html` (a disabled "Coming Soon" link under the Simply Inspiring card).
19. **Redundant duplicate navigation** on all four Dharma Connect legal pages — both the injected navbar and a hardcoded `card-links` block render the same four links.
20. **`href="#"` "Coming Soon" links** (5 on the homepage) have no `aria-disabled` or non-interactive treatment for keyboard/screen-reader users.
21. **Inconsistent cache-busting** — only `index.html`'s stylesheet link uses a `?v=1` query string; every other page could serve a stale cached copy of `style.css` after an update.
22. **No dark-mode/light-mode toggle** — a single fixed dark theme is used everywhere (documented as fact, not necessarily a defect — confirm this is the intended design direction).

---

## 16. Recommended Fix Phases

The phases below are ordered by real-world impact given what was actually found — the top of the list is a live app currently missing legally-relevant pages, not a hypothetical.

**Phase 1 — Fix broken functionality on the published app (Critical, items 1–4)**
Write real content for Simply Inspiring's Privacy Policy and Terms pages (or, at minimum, port over equivalent content structured like Dharma Connect's), create a working `support/` page for Simply Inspiring, and either give Simply Inspiring its own navbar content or generalize `components/navbar.html` so it's app-aware instead of hardcoded to Dharma Connect.

**Phase 2 — Fix broken assets and missing store links (High, items 5–7)**
Add the missing `assets/images/simplyinspiring/` screenshots (or update the `<img>` sources to point at whatever screenshots actually exist), and resolve the Dharma Connect "available on iOS and Android" messaging vs. missing store links (either add the real links or adjust the copy to reflect pre-launch status).

**Phase 3 — SEO & metadata baseline (High/Medium, item 6 + §9)**
Add `<meta name="description">`, Open Graph, and Twitter Card tags to every real page (especially the two app pages, since that's what gets shared), a `robots.txt`, and a `sitemap.xml`. Add per-app `SoftwareApplication` structured data as a stretch goal.

**Phase 4 — Performance cleanup (Medium, items 8, 10, 11, 21)**
Re-export `favicon.png`/`apple-touch-icon.png` as correctly-sized real PNGs, compress the Dharma Connect screenshots (and any future screenshots) to reasonable dimensions/formats for their display size, add `loading="lazy"` and explicit `width`/`height` to all `<img>` tags, and make the CSS cache-busting query string consistent across every page.

**Phase 5 — Accessibility & consistency polish (Medium/Low, items 12–15, 19, 20, 22)**
Add `<nav>`/`<main>` landmarks, a consistent footer across all pages, consistent favicon declarations, non-link treatment for "Coming Soon" placeholders, and de-duplicate the redundant navbar/`card-links` navigation on Dharma Connect pages. Confirm whether a single fixed dark theme is the intended permanent design or whether light-mode support is wanted.

**Phase 6 — Dead code / repo hygiene (Low, items 9, 16–18)**
Decide the fate of the orphaned `learn/*` pages (finish the interview-prep section, or remove the stubs if abandoned), remove the two stray `test` files, remove unused `.links`/`.home-link` CSS, and delete the commented-out dead markup in `index.html`.

*(No changes from any phase above were made as part of this audit — this is a plan for future work, not an action log.)*

---

## Deliverable Summary

- **Audit report path:** `docs/audits/TechBuzzApps_Website_Full_Audit.md`
- **Findings by severity:** Critical: 4 · High: 3 · Medium: 8 · Low: 7 *(22 total)*
