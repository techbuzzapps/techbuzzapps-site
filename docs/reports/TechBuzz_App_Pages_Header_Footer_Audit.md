# TechBuzz App Pages Header/Footer Audit

Audit date: 2026-10-11  
Scope: read-only analysis of site HTML/CSS/JavaScript; this report is the only repository change.

## 1. Executive summary

The missing shared TechBuzz header and footer on `/dharmaconnect/` and `/simplyinspiring/` have one direct, confirmed cause: both app detail documents omit the shared `data-component="site-header"` and `data-component="site-footer"` placeholders. `common.js` is present and loads successfully, but it cannot insert components that the documents do not request. This is category **A (missing from HTML)**, not a fetch-path, stylesheet, visibility, stacking, overflow, or script-order failure.

Both detail pages instead contain the legacy `<div id="navbar"></div>`. `common.js` fills every such element with `/components/navbar.html`, which is specifically a DharmaConnect navigation menu. It is appropriate as the page-specific top navigation on DharmaConnect, but is incorrectly also injected on Simply Inspiring.

On the DharmaConnect detail page, the top navigation comes from `components/navbar.html`; the visually similar bottom group is separate, hard-coded `.card-links` markup in `dharmaconnect/index.html`. The bottom group is the redundant element. The shared TechBuzz footer is not present at all. Removing only the bottom `.card-links` group after the shared footer is added preserves all four legal/support destinations because the retained top DharmaConnect navigation contains Privacy Policy, Terms, Support, and Delete Account.

The smallest safe implementation is targeted to the two app detail HTML files plus a very small app-detail shell rule in `assets/css/style.css`. No change to `common.js`, either shared component, Learn pages, lesson sources, app copy, screenshots, or legal documents is required.

## 2. Current behavior

| Page | Shared header placeholder | Shared footer placeholder | Legacy navbar | Result |
|---|---:|---:|---:|---|
| `/` | Yes (`index.html:32`) | Yes (`index.html:139`) | No | Shared shell works |
| `/apps/` | Yes (`apps/index.html:40`) | Yes (`apps/index.html:170`) | No | Shared shell works |
| `/learn/ios/swiftui/` | Yes (`learn/ios/swiftui/index.html:32`) | Yes (`learn/ios/swiftui/index.html:160`) | No | Shared shell works |
| `/dharmaconnect/` | No | No | Yes (`dharmaconnect/index.html:19`) | Legacy DharmaConnect nav only; no shared header/footer |
| `/simplyinspiring/` | No | No | Yes (`simplyinspiring/index.html:19`) | Legacy DharmaConnect nav is injected; no shared header/footer |

Live HTTP inspection on the audit date confirmed status 200 for all four page URLs and for `/components/site-header.html` and `/components/site-footer.html`. The deployed HTML has the same placeholder/legacy-navbar pattern as the repository: Learn and Apps have both shared placeholders, while both app detail pages have neither and do have `id="navbar"`.

## 3. File-by-file findings

### Pages and components

- `index.html:19-21,32,139`: loads `style.css`, then `learn.css`, and deferred `common.js`; supplies both shared placeholders. Root-relative URLs work from this route.
- `apps/index.html:28-30,40,170`: loads `style.css`, then `apps.css`, and deferred `common.js`; supplies both shared placeholders. This is the working app-area reference.
- `learn/ios/swiftui/index.html:19-21,32,160`: loads `style.css`, then `learn.css`, and deferred `common.js`; supplies both shared placeholders. This is the stated working reference.
- `dharmaconnect/index.html:11,15-19,108-126,130`: loads only `style.css`; uses a plain `<body>`, a legacy navbar placeholder inside the content panel, a hard-coded bottom `.card-links` group, and `common.js` at the end of body. It has no shared header/footer placeholders and no semantic `main#main` target for the shared header's skip link.
- `simplyinspiring/index.html:11,15-19,116-134,138`: has the same legacy structure and omits both shared placeholders. Its `id="navbar"` unintentionally requests the DharmaConnect-specific component. Its bottom links are Simply Inspiring-specific and are not a duplicate of the top DharmaConnect menu.
- `components/site-header.html:1-12`: valid shared TechBuzz header. The Apps link explicitly recognizes `/dharmaconnect/` and `/simplyinspiring/` through `data-section` at line 8.
- `components/site-footer.html:1-12`: valid shared TechBuzz footer with Learn, Apps, and copyright content. It does not contain app legal/support links, so those must remain available in page-specific navigation.
- `components/navbar.html:1-23`: legacy DharmaConnect menu containing Home, Privacy Policy, Terms, Support, and Delete Account. Despite its generic filename, four of five destinations are under `/dharmaconnect/`.

### JavaScript

- `assets/js/common.js:40-51`: uses the root-relative component base `/components/` and caches one fetch per component name. It therefore works at arbitrary nesting depth and has no relative-path defect.
- `assets/js/common.js:68-87`: looks only for `[data-component]`, validates component names, replaces placeholders with fetched markup, logs a warning and removes a failed placeholder, then marks current navigation.
- `assets/js/common.js:89-94`: independently looks for `#navbar` and always fetches `navbar.html`. This explains both the retained DharmaConnect top menu and the inappropriate DharmaConnect menu on Simply Inspiring. It does not replace or suppress shared placeholders.
- `assets/js/common.js:244-254`: initialization correctly waits for `DOMContentLoaded` when needed and also works when the non-deferred script is placed at the end of body. No page-specific script exists in either app detail page to interfere.
- Conclusion: no `common.js` change is needed. Error handling is present through `console.warn`; the only minor difference is that legacy-navbar failures leave an empty element whereas shared-component failures remove the placeholder.

### CSS

- `assets/css/style.css:92-119`: legacy pages receive body padding and a centered glass-panel `.container`.
- `assets/css/style.css:184-199`: styles the legacy `.navbar`; no visibility, positioning, overflow, or stacking rule hides it.
- `assets/css/style.css:282-302`: styles the hand-authored `.card-links`; this is the bottom DharmaConnect group, not a footer.
- `assets/css/style.css:421-439`: shared shell behavior is opt-in through `body.site-shell`; comments explicitly identify DharmaConnect and Simply Inspiring as legacy pages.
- `assets/css/style.css:466-468,474-550`: reserves component-loading space and styles the sticky shared header at `z-index: 50`. No competing app-detail z-index was found.
- `assets/css/style.css:557-604`: styles the real shared footer. It is not hidden; it is simply never inserted on the affected pages.
- `assets/css/style.css:610-622`: `.site-main` supplies shell spacing and changes direct-child `.container` presentation. Reusing this class directly around the legacy app detail content would alter text alignment/panel styling, so a targeted app-detail wrapper is safer if preserving the current design is mandatory.
- `assets/css/learn.css`: Learn-only layout/content rules; no selector causes the app detail problem and it should not be changed.
- `assets/css/apps.css`: Apps-listing card rules only; app detail pages do not load it, and it is not required to fix shared chrome.
- No DharmaConnect-specific CSS or JS file exists. Its only dedicated shared UI is the markup in `components/navbar.html`; the rest uses legacy rules in `assets/css/style.css` and inline page markup.

### Legal/support pages

- `dharmaconnect/privacy/index.html`, `terms/index.html`, `support/index.html`, and `delete-account/index.html` also use the legacy `#navbar` plus bottom `.card-links` pattern and omit shared header/footer placeholders. They are confirmed affected by the same structural consistency issue, although only the main detail page was named for duplicate removal.
- `simplyinspiring/privacy/index.html` and `simplyinspiring/terms/index.html` are zero-byte files. `/simplyinspiring/support/` has no repository file even though `simplyinspiring/index.html:130` links to it. These are pre-existing, unrelated content/link issues and are outside this header/footer audit; no change is recommended without separate authorization.

## 4. Root cause for missing shared header

**Confirmed category A: missing from HTML.**

The loader requires `<div data-component="site-header"></div>` (`common.js:5,69-79`). DharmaConnect and Simply Inspiring contain only `<div id="navbar"></div>` (`dharmaconnect/index.html:19`; `simplyinspiring/index.html:19`). That ID activates a different, legacy code path. The component endpoint, root-relative URL, loader timing, shared stylesheet, and live HTTP response are all valid. There is no evidence that a loaded shared header is hidden or replaced.

## 5. Root cause for missing shared footer

**Confirmed category A: missing from HTML.**

Neither app detail document contains `<div data-component="site-footer"></div>`. The `.card-links` groups near their bottoms are page-specific link groups, not `<footer class="site-footer">`. `common.js` does not automatically append a footer; it only replaces declared `[data-component]` placeholders.

## 6. Root cause for duplicate DharmaConnect navigation

Two independent sources render substantially the same DharmaConnect destinations:

1. Top: `dharmaconnect/index.html:19` creates `#navbar`; `common.js:89-94` fetches `components/navbar.html:1-23` into it.
2. Bottom: `dharmaconnect/index.html:108-126` hard-codes Privacy Policy, Terms & Conditions, Support, and Delete Account as `.card-links`.

The bottom `.card-links` block is the redundant navigation. It is not the shared TechBuzz footer, because the page has no `site-footer` placeholder and the block has neither footer markup nor the shared footer's Learn/Apps/copyright content. Retaining the top component preserves all required DharmaConnect legal/support links.

## 7. Exact recommended changes

Do not implement until approved.

### Targeted detail-page fix (recommended)

1. `dharmaconnect/index.html`
   - At line 15, opt into the shared shell with `class="site-shell"`.
   - Immediately after `<body>`, add `<div data-component="site-header"></div>`.
   - Wrap the existing legacy content container (currently lines 17-128) in `<main id="main" class="app-detail-main">...</main>`. Keep `#navbar` at current line 19 as the page-specific top navigation.
   - Remove only the bottom `.card-links` block at lines 108-126. Do not change `components/navbar.html`; it retains Privacy Policy, Terms, Support, and Delete Account.
   - After the new `</main>` and before the existing script, add `<div data-component="site-footer"></div>`.
   - The existing end-of-body `common.js` include at line 130 may remain; changing it to deferred head loading is optional normalization, not required for correctness.

2. `simplyinspiring/index.html`
   - At line 15, opt into the shared shell with `class="site-shell"`.
   - Immediately after `<body>`, add the shared header placeholder.
   - Wrap the existing content container (currently lines 17-136) in `<main id="main" class="app-detail-main">...</main>`.
   - Remove the legacy `#navbar` placeholder at line 19 because it injects DharmaConnect-specific navigation onto the wrong app. Keep the Simply Inspiring `.card-links` block at lines 116-134; it is page-specific, includes the app/legal/support links, and is not the duplicated DharmaConnect bottom navigation.
   - Add the shared footer placeholder between `</main>` and the existing script.

3. `assets/css/style.css`
   - Near the shared page-shell rules at lines 606-622, add a narrowly scoped `.app-detail-main` wrapper rule providing `flex: 1`, `width: 100%`, and the legacy outer spacing (`padding: 40px 20px`). This allows `body.site-shell` to provide a full-width header/footer while keeping the existing app-detail `.container` appearance and centered content behavior.
   - Add a small mobile adjustment only if visual testing shows the existing 40px vertical wrapper spacing is excessive. Do not alter global `.container`, `.site-main`, header, footer, Learn, or Apps-listing rules.

No changes are required in `assets/js/common.js`, `components/site-header.html`, `components/site-footer.html`, `components/navbar.html`, `assets/css/learn.css`, or `assets/css/apps.css`.

### Broader consistency follow-up (separate scope)

After the two named detail pages are fixed and validated, apply the same shared shell/header/footer wrapper pattern to the four DharmaConnect legal/support pages. Retain their top `#navbar`. Do not automatically remove their bottom contextual links: on an individual legal page those blocks omit the current destination and include “Back to Dharma Connect,” so they are useful local navigation rather than exact copies. Treat this as a small, mechanical app-page consistency follow-up, not part of the initial duplicate removal.

## 8. Risk assessment

Overall implementation risk is **low** if the changes remain targeted.

- Low: shared component endpoints and loader behavior are already proven by working pages and live 200 responses.
- Low: root-relative asset/component URLs avoid nested-route resolution problems.
- Low: removing `dharmaconnect/index.html:108-126` does not remove access to any legal/support destination because all four remain in the top component.
- Medium if done carelessly: adding `body.site-shell` without a spacing wrapper removes legacy body padding (`style.css:435-439`), while wrapping legacy content in `.site-main` changes panel alignment/styling (`style.css:616-622`). The targeted `.app-detail-main` rule avoids both regressions.
- Medium: removing or generalizing `components/navbar.html` would affect all DharmaConnect legal/support pages. It should remain unchanged.
- Accessibility: adding `main#main` is necessary so `site-header.html:2` (“Skip to content”) has a valid target.
- Existing unrelated risk: Simply Inspiring privacy/terms files are empty and its support route is absent. The header/footer fix must not conceal or silently broaden into legal-content work.

## 9. Focused validation plan

Run from an HTTP server (not `file://`, because component fetches require HTTP) and repeat against the deployed site after release.

1. Desktop widths (for example 1440px and 1024px)
   - `/learn/ios/swiftui/`: shared header/footer still render; Learn is current; course layout is unchanged.
   - `/apps/`: shared header/footer still render; Apps is current; card layout is unchanged.
   - `/dharmaconnect/`: TechBuzz shared header appears above the retained DharmaConnect nav; Apps is current; all app copy/screenshots remain; exactly one DharmaConnect navigation group remains; the common footer appears below content.
   - `/simplyinspiring/`: TechBuzz shared header/footer appear; Apps is current; no DharmaConnect-specific links appear; App Store and Simply Inspiring link group remain.
   - Each DharmaConnect legal/support page (follow-up scope): shared chrome and retained local navigation render without duplicated or missing links.

2. Mobile widths (for example 390px and 320px)
   - Header brand and Learn/Apps navigation wrap without overlap or horizontal scrolling.
   - Retained DharmaConnect navbar and `.card-links` controls stack as currently defined at `style.css:343-380`.
   - Screenshots remain within their columns; content panel keeps usable gutters.
   - Footer links wrap cleanly and remain tappable.

3. Functional and regression checks
   - Click shared Learn and Apps links and verify current-section state.
   - On DharmaConnect, verify Privacy Policy, Terms & Conditions, Support, and Delete Account from the retained top nav.
   - On Simply Inspiring, verify App Store and existing legal/support destinations independently; record the known empty/missing route defects rather than attributing them to shared chrome.
   - Test keyboard focus and the shared “Skip to content” link.
   - Confirm no duplicate IDs, no duplicate DharmaConnect bottom nav, no content/copy/screenshot changes, and unchanged dark navy/gold styling.
   - Inspect the console/network panel: no JavaScript exceptions, no `[common.js] Could not load component` warnings, and 200 responses for header/footer component fetches.

## 10. Scope review, limitations, and unverified assumptions

### Confirmed affected

- Main app details: `dharmaconnect/index.html`, `simplyinspiring/index.html`.
- Same missing-shared-chrome structure: all four populated DharmaConnect legal/support pages.
- Simply Inspiring additionally receives the wrong legacy DharmaConnect navbar.

### Inspected and working

- Root Learn landing page (`index.html`).
- Apps listing (`apps/index.html`).
- SwiftUI landing page (`learn/ios/swiftui/index.html`).
- Shared header/footer component endpoints and their repository files.

### Not fully verified

- Every Learn route was statically scanned and shows the expected placeholder/script pattern, but only the requested SwiftUI landing was compared in detail and checked live.
- Other than DharmaConnect and Simply Inspiring, no additional available app-detail directory exists in this repository. “Coming soon” entries on the Apps listing have no detail pages to audit.
- No browser automation executable was available, so computed layout, screenshots, and JavaScript console output were not captured. Live source and endpoint checks were performed, and the loader behavior was verified statically.
- Simply Inspiring legal/support content is incomplete in the repository; its intended final URLs/content cannot be inferred safely.

Recommendation: use the targeted two-page fix first. Follow with a mechanical consistency update to the populated DharmaConnect subpages only after the main pages pass validation. A broad component-system rewrite is neither necessary nor justified.

## 11. Final git status

Initial `git status --short`: clean (no output).

Expected final status after creating this audit report only:

```text
?? docs/reports/
```

Git collapses the new untracked directory to that entry; the only file inside it is `TechBuzz_App_Pages_Header_Footer_Audit.md`.

No HTML, CSS, JavaScript, lesson source, app content, or component file was modified. No commit or push was performed.
