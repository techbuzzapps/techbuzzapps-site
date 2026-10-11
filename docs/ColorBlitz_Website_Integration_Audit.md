# ColorBlitz Website Integration Audit and Plan

Audit date: 2026-10-11  
Scope: analysis and implementation plan only. No ColorBlitz page, asset, route, style, or existing site page was implemented or modified.

## Executive summary

ColorBlitz can be added cleanly as five static, directory-backed pages under `/apps/colorblitz/`, using the same shared TechBuzz shell as the current canonical DharmaConnect and Simply Inspiring pages. The repository is not a React application: it contains no `package.json`, React source, router, build configuration, or framework dependency. Routing is the static-host convention of one `index.html` per directory.

The recommended implementation reuses `components/site-header.html`, `components/site-footer.html`, `assets/js/common.js`, the global design tokens and `.app-detail-main` shell in `assets/css/style.css`, and the Apps listing conventions in `assets/css/apps.css`. ColorBlitz should not use `#navbar`, `components/navbar.html`, or create an app-specific header/footer. Its five pages should expose contextual links in ordinary content navigation only.

The requested feature and legal descriptions cannot yet be published as verified facts. No ColorBlitz app source, privacy manifest, SDK inventory, StoreKit configuration, App Store record, screenshots, icon, contact address, or legal copy exists in this repository. Those inputs must be supplied and verified before drafting final product/legal language.

## 1. Current architecture

### Application type and routing

- This is a dependency-free static site, not React. The folder name `ReactProjects` does not reflect the repository architecture.
- Each clean URL maps to a physical directory containing `index.html`, for example `apps/dharmaconnect/index.html` → `/apps/dharmaconnect/`.
- Root-relative URLs (`/assets/...`, `/components/...`, `/apps/...`) are the established convention and are required for pages nested several levels deep.
- Direct navigation and refresh work on GitHub Pages because every proposed route will have a physical `index.html`; no client router or fallback rewrite is needed.
- `CNAME` contains `techbuzzapps.com`. There is no build/deploy workflow, server configuration, `_redirects`, `404.html`, or framework adapter. Repository evidence and prior reports indicate branch-root GitHub Pages deployment.

### Shared site shell

- Pages opt into the shell with `<body class="site-shell">`.
- `<div data-component="site-header"></div>` and `<div data-component="site-footer"></div>` are replaced at runtime from `/components/site-header.html` and `/components/site-footer.html` by `assets/js/common.js`.
- The shared header contains a skip link to `#main`; every ColorBlitz page therefore needs one `<main id="main">`.
- `common.js` uses the root-relative `/components/` path and waits for `DOMContentLoaded`, so it works at `/apps/colorblitz/` and all four deeper routes.
- Apps navigation is already active for any path beginning `/apps/`: `common.js` adds the Apps link's `/apps/` href as a section prefix. No JavaScript or shared-component change is needed for ColorBlitz.
- `components/navbar.html` is a legacy DharmaConnect-specific menu despite its generic filename. ColorBlitz must not include `id="navbar"`.

### Existing app layouts

- `apps/dharmaconnect/index.html` and `apps/simplyinspiring/index.html` use the shared shell, `main#main.app-detail-main`, the legacy glass-panel `.container`, and root-relative assets.
- DharmaConnect additionally uses the legacy `#navbar`; this is not a suitable ColorBlitz pattern.
- Simply Inspiring uses an in-content `.card-links` group for App Store/legal/support destinations. A semantically labelled ColorBlitz in-content navigation can follow that idea without becoming a second site header or footer.
- `apps/index.html` uses semantic cards (`.app-grid`, `.app-card`, badges, and app-title links). ColorBlitz should be added as one card under the appropriate availability section only after its release/status copy and App Store availability are confirmed.

### Styling and responsive conventions

- `assets/css/style.css` owns design tokens, global navy/gold identity, shared header/footer, legacy app content, buttons, screenshot grids, focus states, and `.app-detail-main` outer spacing.
- `assets/css/apps.css` owns the `/apps/` listing cards, not detail-page presentation.
- Breakpoints are primarily 768px and 600px. Legacy screenshot columns collapse to one column at 768px, controls become full-width, and shell panels simplify at 600px.
- Reduced motion is supported through `@media (prefers-reduced-motion: reduce)`.
- The site explicitly declares `color-scheme: dark`; there is no `prefers-color-scheme` light theme. ColorBlitz should support the existing dark appearance. An app-only light theme would violate the current design-system contract; light appearance should be added only as a future site-wide initiative.

### SEO and sitemap conventions

- Canonical pages store SEO metadata directly in each HTML file, including title, description, canonical, `og:title`, `og:description`, `og:url`, `og:type`, and theme color on the more complete pages.
- The current canonical app detail pages have only title, canonical, and `og:url`; ColorBlitz should use the more complete convention from `/apps/` and Learn pages rather than repeat that omission.
- There is no `sitemap.xml` or `robots.txt`. Adding only ColorBlitz URLs to a partial sitemap would be misleading. The implementation should either create a complete sitemap of all canonical public pages or schedule sitemap work as a separately reviewed site-wide step.

## 2. Proposed route and file structure

Create these physical pages:

```text
apps/
  colorblitz/
    index.html
    support/
      index.html
    privacy/
      index.html
    terms/
      index.html
    premium/
      index.html
```

Recommended supporting files, once approved assets exist:

```text
assets/
  css/
    colorblitz.css
  images/
    colorblitz/
      app-icon.webp (or supplied source format)
      screenshot-classic.webp
      screenshot-endless.webp
      screenshot-daily-challenge.webp
      screenshot-color-master.webp
      ...additional approved screenshots
```

Also modify:

- `apps/index.html` to add the ColorBlitz card and its canonical detail link.
- `sitemap.xml` only if a complete canonical-site sitemap is introduced; it does not currently exist.

No change is proposed for `assets/js/common.js`, either shared component, DharmaConnect pages, Simply Inspiring pages, Learn pages, or the legacy DharmaConnect navbar.

## 3. Shared page template

Every ColorBlitz page should use this structural contract:

```html
<link rel="stylesheet" href="/assets/css/style.css">
<link rel="stylesheet" href="/assets/css/colorblitz.css">
<script src="/assets/js/common.js" defer></script>

<body class="site-shell colorblitz-page">
  <div data-component="site-header"></div>
  <main id="main" class="app-detail-main">
    <!-- one page-specific main content container -->
  </main>
  <div data-component="site-footer"></div>
</body>
```

Use one H1 per page, hierarchical H2/H3 headings, semantic sections, labelled contextual navigation, descriptive alt text, visible keyboard focus, and real anchors rather than click handlers. App screenshots should have explicit intrinsic `width`/`height`, `loading="lazy"` below the fold, and `max-width: 100%` through scoped CSS to reduce layout shift and overflow.

## 4. Design recommendation

“Premium Aurora” should be expressed inside the ColorBlitz content area while retaining the shared dark navy/gold site chrome:

- Use scoped `.colorblitz-*` selectors and ColorBlitz-specific custom properties under `.colorblitz-page`; do not overwrite `:root` or global `.container` rules.
- Build an aurora effect with layered CSS gradients and subtle translucent panels rather than a large decorative bitmap.
- Derive accent colors from the supplied app icon/brand guide. Until those are supplied, do not hard-code an assumed ColorBlitz palette.
- Preserve readable text contrast over gradients and provide a solid/fallback surface.
- Keep motion decorative and modest; disable nonessential animation under `prefers-reduced-motion`.
- Use the existing shared header/footer exactly once on every page. Keep page links (Support, Privacy, Terms, Premium) in a labelled in-content navigation block, not another top bar or bottom footer.
- Reuse existing button, badge, container, and spacing primitives where they fit. Add `colorblitz.css` only for hero, mode cards, aurora surfaces, screenshot gallery, pricing/benefit layout, and ColorBlitz-specific responsive behavior.

## 5. Page plans

### Landing page — `/apps/colorblitz/`

Proposed content order:

1. Hero with supplied app icon, verified one-line positioning, platform/status badge, and App Store call to action.
2. Mode overview for Classic, Endless, Daily Challenge, and Color Master. Exact gameplay descriptions must come from product documentation or the app implementation.
3. Game Center section covering verified leaderboard/achievement behavior.
4. Responsive screenshot gallery using approved images and device-accurate alt text.
5. Premium overview with verified benefits and a link to `/apps/colorblitz/premium/`.
6. Labelled “ColorBlitz resources” navigation linking Support, Privacy, Terms, and Premium.

Do not render a download badge until the exact App Store URL is supplied. A non-linked “Coming soon” status is acceptable only if release status is confirmed.

### Support — `/apps/colorblitz/support/`

Use an H1 plus accessible FAQ sections (native headings; optional `<details>/<summary>` if tested). Planned topics:

- basic play and scoring;
- verified behavior of all four modes;
- Game Center sign-in, leaderboard synchronization, and troubleshooting;
- Premium purchase status, failed purchase guidance, Restore Purchases, and Apple subscription management;
- notification controls only if notifications exist;
- contact support call to action only after the official email or support URL is supplied.

Avoid promising response times without an approved support policy.

### Privacy — `/apps/colorblitz/privacy/`

Draft only after implementation evidence is reviewed. The document should distinguish data processed by the app, data processed by third-party SDKs, data stored locally, and data controlled by Apple. Candidate sections, included only when verified:

- data controller/developer identity and contact;
- AdMob SDK use, ad identifiers, personalized/non-personalized advertising, and consent-management flow by region;
- StoreKit subscription transaction handling and what purchase state the app stores;
- Game Center data/features and Apple's role;
- local preferences, progress, cached state, and retention/deletion behavior;
- notifications, permission use, and whether tokens or schedules leave the device;
- analytics/crash reporting, if present;
- third-party policies and age/audience handling;
- effective date, change process, and contact method.

Do not infer “no data collected,” GDPR/CCPA compliance, child-directed status, retention periods, server behavior, or advertising practices from feature names.

### Terms — `/apps/colorblitz/terms/`

Planned sections, subject to legal review:

- eligibility and acceptable use;
- license and intellectual property;
- gameplay/service availability;
- Premium monthly/yearly subscription mechanics;
- auto-renewal, billing, cancellation, and management through Apple;
- Restore Purchases behavior;
- refunds governed by applicable Apple policies, without promising outcomes;
- applicable Apple EULA or a supplied custom EULA;
- disclaimers, limitation language, governing law, changes, and contact details supplied by counsel/developer.

Do not invent jurisdiction, company identity, refund entitlement, trial terms, or renewal timing language.

### Premium — `/apps/colorblitz/premium/`

Present monthly and yearly options by product name/period only until approved pricing is available. Planned benefits must be verified individually:

- no forced ads;
- unlimited access to named Premium modes/features;
- optional rewarded ads, only if the shipped app supports them and Premium users can choose them;
- Restore Purchases instructions;
- link/instructions for Apple subscription management;
- clear links to Terms and Privacy.

Prefer live App Store/StoreKit purchase UI for localized prices inside the app; the static website must not show guessed or stale prices. Clarify whether purchases can occur only in-app—the website should not imply web checkout unless one exists.

## 6. Required inputs and missing assets

### Brand/product assets

- Final app name styling (`ColorBlitz`, `Color Blitz`, capitalization).
- App icon in a high-resolution source format and permission to use it on the website.
- Brand palette/gradient guidance for the aurora treatment.
- Approved iPhone/iPad screenshots for each relevant mode, with device/orientation and preferred ordering.
- App Store badge usage decision and exact App Store product URL.
- Release/platform status and supported devices/OS versions.
- Approved short and long descriptions.

### Feature verification

- Rules, scoring, limits, and Premium availability for Classic, Endless, Daily Challenge, and Color Master.
- Exact Game Center leaderboards/achievements and authentication behavior.
- Whether notifications exist and what schedules/data they use.
- Whether optional rewarded ads exist for Premium users.
- What “no forced ads” precisely excludes.
- Restore Purchases behavior and error/support flows.

### Commerce inputs

- StoreKit product identifiers and product configuration for monthly/yearly subscriptions.
- Whether either product offers a free trial, introductory offer, family sharing, grace period, or promotional terms.
- Approved benefit matrix. Prices must not be supplied as hard-coded copy unless explicitly approved; localized storefront prices vary.
- Official subscription-management URL/instructions appropriate to Apple platforms.

### Privacy/legal evidence

- Relevant iOS source/configuration or a developer-signed data-flow inventory.
- `PrivacyInfo.xcprivacy`, `Info.plist` permission strings, entitlements, notification configuration, and local-storage inventory.
- SDK/package list and versions, especially Google Mobile Ads/AdMob, consent SDK/UMP, analytics, crash reporting, and any backend/network clients.
- Ad unit behavior, consent regions/options, tracking authorization use, and child/audience configuration.
- Game Center and StoreKit data flows and any server-side receipt validation.
- Data categories, purposes, recipients, retention/deletion rules, and security/contact process.
- App Store privacy-label answers for reconciliation.
- Legal entity/developer name, official support/privacy email or URL, governing law decision, effective dates, and counsel-approved EULA/terms.

## 7. SEO and discovery plan

Each page should have unique, factual metadata:

- `<title>` and meta description;
- self-referencing absolute canonical under `https://techbuzzapps.com/apps/colorblitz/.../`;
- matching `og:title`, `og:description`, `og:url`, and `og:type="website"`;
- a supplied share image only if an approved correctly sized asset is available;
- theme color aligned with the approved ColorBlitz palette while avoiding a flash inconsistent with the site shell.

Add the ColorBlitz landing to the `/apps/` listing. Cross-link all five pages through a labelled resource navigation. Do not create legacy aliases unless an actual previous public URL is identified.

For sitemap support, first inventory all canonical pages and create a complete root `sitemap.xml` using absolute production URLs. Include all five ColorBlitz pages only if they are intended to be publicly indexed. Add `lastmod` only when backed by maintained dates; do not fabricate priorities or change frequencies. Consider a root `robots.txt` pointing to the sitemap as the same site-wide SEO phase.

## 8. Accessibility and responsive requirements

- Exactly one H1 and logical heading order per page.
- Preserve the shared skip link by providing `main#main`.
- Use semantic lists for modes/benefits and `<nav aria-label="ColorBlitz resources">` for contextual links.
- Make the app icon either meaningfully described or decorative with empty alt text if the adjacent heading already names the app.
- Give screenshots specific alt text describing the shown mode/screen, not generic “screenshot.”
- Maintain WCAG-appropriate text/interactive contrast across aurora gradients, visible keyboard focus, 44px-class touch targets, and non-color-only state cues.
- Avoid horizontal overflow at 320px; test 320/390 mobile, 768 tablet, and 1024/1440 desktop widths.
- Respect reduced motion and test 200% zoom/reflow.
- Use responsive images (`srcset`/`sizes` if multiple supplied resolutions exist) and modern compressed formats with fallbacks as needed.

## 9. Proposed implementation phases

### Phase A — evidence and content approval

Collect all assets, product facts, SDK/privacy evidence, StoreKit details, official URLs/contact, and approved legal drafts. Resolve contradictions before coding. This is a hard gate for Privacy, Terms, Premium claims, and the App Store CTA.

### Phase B — foundation and visual prototype

Create `colorblitz.css`, the route directories, shared-shell HTML skeletons, and landing-page hero/mode layout using approved content/assets. Add contextual resource navigation; do not add app-specific chrome. Review aurora treatment, contrast, and responsive behavior.

### Phase C — support, privacy, terms, and premium

Populate the four subpages from approved material. Ensure cross-links, StoreKit wording, third-party disclosures, and contact details match the verified implementation and legal review.

### Phase D — site integration and SEO

Add the ColorBlitz card to `apps/index.html`, complete page metadata, and—if approved as a site-wide task—create the complete sitemap/robots files. Do not alter existing app URLs or behavior.

### Phase E — validation and release

Run the focused test plan below, obtain product/legal sign-off, deploy to a preview or branch, then verify production URLs and metadata. No legacy redirect is needed unless a prior ColorBlitz URL is discovered.

## 10. Testing plan

### Static and structural

- Verify exactly five ColorBlitz route files and their self-canonicals.
- Verify one shared header placeholder, one shared footer placeholder, one `main#main`, and no `#navbar` on every page.
- Verify no duplicate header/footer and no app-specific fixed navigation.
- Check all root-relative `href`, `src`, and component requests resolve from every nesting depth.
- Verify unique titles/descriptions/H1s and correct Open Graph URLs.
- Run an internal-link crawler and `git diff --check`.

### Local HTTP and routing

- Serve the repository root over HTTP, never `file://`.
- Directly request and refresh all five routes; require HTTP 200 and the intended page, not a fallback.
- Verify `/apps/`, both existing canonical app pages, all existing legal routes, and `/learn/ios/swiftui/` as regressions.
- Check shared component network requests and browser console for failures.

### Functional/content

- Test App Store, Support, Privacy, Terms, Premium, Restore Purchases guidance, Apple management, third-party policy, and contact links.
- Confirm external links use appropriate `target`/`rel` handling.
- Reconcile every privacy disclosure and Premium claim against the approved source-of-truth checklist.
- Confirm no price, email, legal entity, App Store URL, or service claim entered without approval.

### Visual/responsive/accessibility

- Desktop: 1440 and 1024; tablet: 768; mobile: 390 and 320.
- Validate hero composition, mode grid, screenshots, Premium cards, footer wrapping, and no page-level overflow.
- Test keyboard-only navigation, skip link, focus order, screen-reader landmarks/names, zoom/reflow, contrast, and reduced motion.
- Test image loading/performance and layout stability on throttled mobile conditions.
- Since the current site is dark-only, validate dark appearance across supported browsers. Do not claim light-mode support unless a separate site-wide theme is implemented.

## 11. Risks and decisions required

- **Highest risk: unverified legal claims.** Privacy/Terms must not be generated from the requested topic list alone.
- **High risk: stale subscription statements.** Website benefits and periods must match StoreKit configuration and app behavior at release.
- **High risk: advertising wording.** “No forced ads,” rewarded ads, AdMob processing, consent, and tracking require precise implementation evidence.
- **Medium risk: unavailable assets.** Building before icon/screenshots/brand approval invites redesign and inaccessible placeholder content.
- **Medium risk: sitemap scope.** A ColorBlitz-only sitemap would omit the rest of the site; choose complete sitemap work or defer it explicitly.
- **Decision:** whether ColorBlitz is available now or coming soon, which determines its `/apps/` section and CTA.
- **Decision:** whether each of the five pages should be indexed immediately or held until legal/product approval.
- **Decision:** whether the existing static app-detail shell is sufficient or the scoped ColorBlitz landing requires its own content-width treatment; shared chrome remains mandatory either way.

## 12. Audit limitations and repository status

No ColorBlitz implementation repository or verified iOS materials were provided, so requested app behavior, data handling, third-party SDK use, subscription terms, and legal assertions remain unverified. No web search was used to infer product facts because the brief explicitly prohibits inventing them and no authoritative App Store URL was supplied.

The worktree already contained uncommitted app URL migration changes before this audit. They were preserved. This audit creates only `docs/ColorBlitz_Website_Integration_Audit.md`; it does not implement or alter any existing page.
