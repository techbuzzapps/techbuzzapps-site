# TechBuzz — Delayed Theme Switch Fix Report

Date: 2026-09-29
Branch: `feature/TechBuzzLearn`

## Summary

The reported problem: pages render dark navy, then turn white/light shortly after load
(`/` and `/learn/ios/`).

**The source tree contains no code that can switch the theme to light.** Because of that, the
exact runtime cause could not be confirmed in this session (shell, git and network tools were
unavailable, see "Unverified checks"). The fix below closes the one theme-related gap the audit
found: the site never declared itself dark. That is the most likely reason a browser would
repaint it light after load.

## 1. Root cause audit

### What was inspected

- `assets/css/style.css` (tokens, base, site shell)
- `assets/css/learn.css`
- `assets/css/apps.css` (searched)
- `assets/js/common.js`
- `components/site-header.html`, `components/site-footer.html`
- `<head>` of `index.html`, `learn/index.html`, `learn/ios/index.html`, `apps/index.html`

### Findings

| Check | Result |
|---|---|
| `prefers-color-scheme` | **None** in any CSS/JS/HTML |
| `matchMedia` | None |
| `color-scheme` (CSS or `<meta>`) | **None — the site never declared it is dark** |
| `data-theme`, theme classes on `html`/`body` | None |
| `localStorage` theme values | None (no `localStorage` use at all) |
| JS changing `documentElement`/`body` class or style | None. `common.js` only swaps component placeholders, sets `aria-current`, toggles `.is-active` on TOC links and wraps code blocks |
| CSS `@import` / load order | No `@import`. `style.css` then `learn.css`/`apps.css` are both render-blocking `<link>`s in `<head>`, before first paint |
| Light backgrounds in CSS | None. All surfaces are tokens: `--color-bg #0f172a`, `--color-bg-deep #111827`, and translucent white overlays (`rgba(255,255,255,0.04–0.08)`) meant to sit on navy |
| Async components | Header/footer are fetched after `DOMContentLoaded`, but their CSS (`.site-header` = `rgba(15,23,42,0.92)`) is already loaded and is dark |
| Asset versioning | Inconsistent: `apps/index.html` loads `style.css?v=1`; all other pages load unversioned `style.css`. A stale cached copy is possible but could not be checked against the live server |

### Most likely mechanism

With no `color-scheme` declared, browsers treat the page as a **default light-scheme page**:

- Browser/OS "auto dark" or forced-color features (Chrome's Auto Dark Mode for Web Contents,
  Samsung Internet and Android WebView dark mode, some in-app browsers, and inverting
  extensions such as Dark Reader) decide whether to transform a page by its declared scheme.
  They usually apply that transform **after** the first paint, once the page has loaded. A page
  that is already dark but undeclared can end up inverted or lightened. Inverting translucent
  white card surfaces is exactly what makes cards turn white.
- The UA canvas, scrollbars and form controls also default to light.

This fits every symptom: correct navy on first paint, a delayed switch, and white cards. It also
fits the absence of any light-theme code in the repo. **It has not been confirmed on the
reporting device.**

## 2. Files modified

- `assets/css/style.css` — added `color-scheme: dark;` to `:root`.
- `docs/learn/reports/TechBuzz_Delayed_Theme_Switch_Fix_Report.md` — this report (new).

No HTML, tutorial content, Markdown sources, JS or layout rules were changed.

## 3. The fix

```css
:root {
  color-scheme: dark;
  /* …existing tokens unchanged… */
}
```

`style.css` is the shared stylesheet loaded by every page (Learn, Apps, legacy app pages). One
declaration therefore:

- tells the browser the page natively supplies a dark design, so automatic dark/forced
  transformations are skipped;
- makes the UA canvas, scrollbars and native controls dark, so they match the tokens;
- adds no light mode, no toggle and no JS, and changes no existing color, spacing, border or
  hover rule.

Optional follow-up (not done, because it would touch every page's `<head>`):
`<meta name="color-scheme" content="dark">` in each page's `<head>`. It declares the scheme
before any CSS arrives. The existing `theme-color` meta and render-blocking CSS already cover
first paint in practice.

## 4. Initial vs settled theme

| | Before | After (expected) |
|---|---|---|
| Initial paint | Navy (`html` background `#0f172a`, body gradient) | Same |
| Settled | Could be transformed by the browser (undeclared scheme) | Declared dark, so no UA transformation; same tokens |

**Not visually verified.** Browser automation was not used, so computed backgrounds were not
captured.

## 5. OS Light / Dark behavior

The site has no `prefers-color-scheme` rules, so its own CSS renders the same in both OS modes.
After the fix, the browser also treats the page as dark in both modes. Browser-side auto-dark
features that key off the declared scheme should leave it alone. **Not verified on a device.**

## 6. Regression results / unverified checks

The change is one declaration. It changes no colors, typography, layout, spacing, borders or
hover effects on any page. Visible differences are limited to native UI now being dark:
scrollbars, the `<details>`/`<summary>` marker, and the copy button's native focus styling.

Not verified in this session: shell, git and network requests were blocked by a
tool-permission error.

- [ ] Live site loads the same `style.css` as the repo (fetch
      `https://techbuzzapps.com/assets/css/style.css` and compare)
- [ ] Git history for any earlier light-theme CSS that a CDN/browser may have cached
- [ ] Visual checks: Learn home, iOS, SwiftUI index + lessons 1–5, GCP, Linux & macOS (if
      present), Apps home, header/footer
- [ ] OS Light and OS Dark, refresh and hard refresh
- [ ] Desktop / tablet / mobile widths
- [ ] Reproduce on the device/browser where the switch was seen, noting the browser and whether
      a dark-mode extension or "auto dark" setting is on. **If the switch still happens after
      deploy with a clean cache, the cause is outside the repo** (extension, hosting/CDN
      rewriting, or a stale asset), and this report's hypothesis should be revisited.

Suggested cache hygiene (not applied): version all stylesheet links consistently
(e.g. `?v=2` everywhere) on the next deploy, so no page can mix old and new CSS.

## 7. `git status --short`

Could not be run in this session (shell unavailable). Expected:

```
 M assets/css/style.css
?? docs/learn/reports/TechBuzz_Delayed_Theme_Switch_Fix_Report.md
```
