# TechBuzz App URL Migration Report

Implementation date: 2026-10-11

## Summary

The two app detail pages now have canonical URLs under `/apps/`. The original root-level app URLs remain as GitHub Pages-compatible client-side compatibility landings. DharmaConnect legal, support, and account-deletion routes remain at their established root-level paths.

No framework, dependency, sitemap, Learn URL, permanent tutorial source, shared component implementation, or legal/support text was added or redesigned.

## URL mapping

| Previous app landing | New canonical landing |
|---|---|
| `/dharmaconnect/` | `/apps/dharmaconnect/` |
| `/simplyinspiring/` | `/apps/simplyinspiring/` |

The `/apps/` listing URL is unchanged.

## Deployment and redirect mechanism

Repository inspection found a custom-domain `CNAME`, no build tooling, no deployment workflow, no redirect configuration (`_redirects`, `netlify.toml`, or `vercel.json`), and earlier repository deployment documentation identifying branch-root GitHub Pages. Plain GitHub Pages cannot configure an HTTP 301 response for these directory routes.

Each old app landing therefore uses:

- a canonical link pointing to the corresponding new page;
- an immediate HTML meta refresh;
- `window.location.replace(...)`, which avoids adding the legacy page to browser history;
- a visible heading and accessible ordinary link to the new destination as fallback.

This is a client-side redirect served with HTTP 200, **not an HTTP 301**. Each target differs from its source, and canonical pages contain no redirect code, preventing redirect loops.

## Files added

- `apps/dharmaconnect/index.html`: copied from the approved DharmaConnect detail page, with self-canonical and `og:url` set to `https://techbuzzapps.com/apps/dharmaconnect/`.
- `apps/simplyinspiring/index.html`: copied from the approved Simply Inspiring detail page, with self-canonical and `og:url` set to `https://techbuzzapps.com/apps/simplyinspiring/`.

Both preserve the shared header/footer placeholders, `main#main`, root-relative assets, app content, screenshots, and existing link structure. DharmaConnect retains its top app-specific `#navbar` and no bottom duplicate. Simply Inspiring retains its own bottom `.card-links` and has no DharmaConnect navbar.

## Files modified

- `apps/index.html`: app-title links now target `/apps/dharmaconnect/` and `/apps/simplyinspiring/`. Direct DharmaConnect legal/support links remain unchanged.
- `dharmaconnect/index.html`: now the compatibility landing for `/apps/dharmaconnect/`.
- `simplyinspiring/index.html`: now the compatibility landing for `/apps/simplyinspiring/`.
- `dharmaconnect/privacy/index.html`, `dharmaconnect/terms/index.html`, `dharmaconnect/support/index.html`, and `dharmaconnect/delete-account/index.html`: only the existing “Back to Dharma Connect” landing link was changed to `/apps/dharmaconnect/`; legal/support text and cross-links were not changed.

Existing uncommitted work was preserved. The shared app-detail shell styling remains in `assets/css/style.css`; this migration made no additional CSS change.

## Preserved legal and support routes

The following remain in place and returned HTTP 200 on localhost:

- `/dharmaconnect/privacy/`
- `/dharmaconnect/terms/`
- `/dharmaconnect/support/`
- `/dharmaconnect/delete-account/`

The shared DharmaConnect navbar still points to exactly those routes. None redirects to the app landing.

Existing Simply Inspiring destinations were not invented or relocated:

- `/simplyinspiring/privacy/`
- `/simplyinspiring/terms/`
- `/simplyinspiring/support/`

The first two remain pre-existing empty files and the support directory remains absent; see Remaining issues.

## Navigation state

No `common.js` or shared component change was required. The shared header/footer Apps link uses `href="/apps/"`; `common.js` adds that href as a section prefix and marks it current whenever the path starts with `/apps/`. This covers:

- `/apps/` as an exact page match;
- `/apps/dharmaconnect/` as a section match;
- `/apps/simplyinspiring/` as a section match.

The older `data-section="/dharmaconnect/ /simplyinspiring/"` values remain harmless and provide active-state compatibility during the legacy landing transition.

## Validation performed

### Localhost HTTP

A temporary Python static server was started from the repository root. These returned HTTP 200:

- `/apps/`
- `/apps/dharmaconnect/`
- `/apps/simplyinspiring/`
- `/dharmaconnect/`
- `/simplyinspiring/`
- all four preserved DharmaConnect legal/support/account routes;
- `/learn/ios/swiftui/`;
- shared header, footer, and DharmaConnect navbar components;
- a representative DharmaConnect screenshot asset.

### Focused structural and link checks

All checks passed:

- new pages have one shared header placeholder, one shared footer placeholder, and `main#main`;
- each new page has the required self-canonical and `og:url`;
- DharmaConnect has one `#navbar`, zero `.card-links` groups, and all four screenshot references;
- Simply Inspiring has no `#navbar`, one retained `.card-links` group, and all three existing screenshot references;
- both legacy pages have matching canonical, meta-refresh, script, and accessible-link destinations;
- canonical pages contain no redirect code, so there is no loop;
- Apps navigation matching works through the existing `/apps/` prefix logic;
- the four legal route files remain in their original directories;
- no sitemap exists, so none was updated;
- `git diff --check` passed (only informational LF-to-CRLF working-copy warnings were emitted).

Installed Edge and Chrome headless executables were attempted for rendered-DOM validation, but neither produced capturable DOM output in this environment. Accordingly, no browser-rendered desktop/mobile or console claim is made. The existing responsive CSS and page markup were copied unchanged into the canonical pages.

## Remaining issues

- Plain GitHub Pages serves the old compatibility pages as HTTP 200; only a redirect-capable proxy/CDN can provide true HTTP 301 responses.
- The repository has no `sitemap.xml`.
- Simply Inspiring’s three referenced screenshot files are absent from `assets/images/`, its privacy and terms files are empty, and `/simplyinspiring/support/` is absent. These are pre-existing issues and were intentionally not expanded or repaired in this migration.
- Post-deployment browser testing should confirm desktop/mobile rendering, fetched shared components, console cleanliness, and client-side redirect behavior on the production origin.

## Git status

No commit or push was performed. Final `git status --short`:

```text
 M apps/index.html
 M dharmaconnect/delete-account/index.html
 M dharmaconnect/index.html
 M dharmaconnect/privacy/index.html
 M dharmaconnect/support/index.html
 M dharmaconnect/terms/index.html
 M simplyinspiring/index.html
?? apps/dharmaconnect/
?? apps/simplyinspiring/
?? docs/reports/TechBuzz_App_URL_Migration_Report.md
```
