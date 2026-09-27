# SwiftUI Lesson 5 — Navigation & Multiple Screens: Implementation Report

## 1. Summary

I implemented Lesson 5 of *SwiftUI for Beginners*, "Navigation & Multiple Screens", at
`/learn/ios/swiftui/navigation-and-multiple-screens/`. The page was built from the permanent source
`docs/learn/sources/swiftui-lesson5.md`. Nothing was generated, rewritten, shortened, summarised or reordered.
The source was converted mechanically into the existing lesson markup, the same approach used for Lessons 3 and 4, and the result was checked block by block against the source.

- **Full sequence:** all 23 numbered sections, the Recipe Browser challenge and bonus, "What You Now Know", and the Lesson 6 preview.
- **Rendered blocks:** 51 Swift code blocks, 67 diagrams, 26 section headings, 1 sub-heading, 10 callout quotes, 200 paragraphs and 10 list items.
- **Course index:** Lessons 1–5 are now available. Lessons 6–9 stay "Coming soon", and the 9-lesson sequence is unchanged.
- **Navigation:**
  - Lesson 4 → Lesson 5 is now a real link.
  - Lesson 5 → Lesson 4 is a real link.
  - Lesson 5 → Lesson 6 is a "Coming soon" non-link.
- **Not done:** Lesson 6 was not created.
- **No new code or tooling:** no CSS, JS, framework, npm or build tooling was added.
- **Out of scope for this phase:** no quizzes, progress tracking, auth, Firebase, analytics, ads or Search.
- **Source file:** `docs/learn/sources/swiftui-lesson5.md` was **preserved unchanged**, as verified in §14.
- **Not committed or pushed.**

## 2. Files inspected

- `docs/learn/sources/swiftui-lesson5.md`: read in full. It has 1,725 lines and contains the complete lesson, from "Lesson 5 — Navigation & Multiple Screens" through the Lesson 6 preview.
- `learn/ios/swiftui/index.html`: the course index.
- Lessons 1–4:
  - `getting-started/`
  - `building-your-first-screen/`
  - `making-your-screen-interactive/`
  - `working-with-lists-of-data/`

  Lesson 4 was the page shell and markup reference.
- `learn/ios/index.html` and `index.html`: the iOS track page and the homepage.
- `assets/js/common.js`: the header/footer components, `enhanceCodeBlocks()` Copy behaviour and the TOC highlighting.
- `assets/css/learn.css`: the article layout, `.diagram`, callouts and pagination.
- `components/site-header.html`.
- The repository has no sitemap.

Audit notes:

- `git status --short` was clean at the start, with HEAD at `ed28c9e Lesson 5 added`.
- That commit (by the repository owner) added the Lesson 4 page and removed `docs/learn/sources/swiftui-lesson4.md`. This phase did not touch either.
- `learn/ios/interview/swiftui-interview-questions/index.html` is a 2-byte placeholder, not a guide, so it is not counted in guide totals.

## 3. Files created

| File | Purpose |
|---|---|
| `learn/ios/swiftui/navigation-and-multiple-screens/index.html` | Lesson 5 page (static HTML, all content in the markup) |
| `docs/learn/reports/SwiftUI_Lesson5_Navigation_Implementation_Report.md` | This report |

## 4. Files modified

| File | Change |
|---|---|
| `learn/ios/swiftui/index.html` | Lesson 5 changed from `is-future` / "Coming soon" to the `is-available` link pattern with an arrow. The title and description are unchanged. |
| `learn/ios/swiftui/working-with-lists-of-data/index.html` | The "Coming soon" next placeholder became a `Next lesson` link to Lesson 5. Sidebar item "5. Navigation" is now a link. |
| `learn/ios/swiftui/getting-started/index.html` | Sidebar item "5. Navigation" is now a link. |
| `learn/ios/swiftui/building-your-first-screen/index.html` | Sidebar item "5. Navigation" is now a link. |
| `learn/ios/swiftui/making-your-screen-interactive/index.html` | Sidebar item "5. Navigation" is now a link. |
| `learn/ios/index.html` | SwiftUI card badge changed from "4 lessons" to "5 lessons". Added a "Navigation" pill linking to Lesson 5, following the pattern used for Lessons 3 and 4. |
| `index.html` | iOS card badge changed from "6 guides" to "7 guides" (Closures, Combine and SwiftUI 1–5), a truthful count. |

Total diff to tracked files: 7 files, 19 insertions and 16 deletions. No CSS or JS files were changed.

## 5. Source-content fidelity verification

A checker script parsed the source Markdown and the rendered `<article>` body (after the article header) into ordered blocks and compared them in order: type plus exact text, with whitespace normalised for prose only.

```text
source blocks: 365 | html blocks: 365
source kinds: {'p': 200, 'diagram': 67, 'quote': 10, 'h2': 26, 'code': 51, 'li': 10, 'h3': 1}
html kinds:   {'p': 200, 'diagram': 67, 'quote': 10, 'h2': 26, 'code': 51, 'li': 10, 'h3': 1}
mismatches: 0 | length equal: True
code blocks byte-identical: 51 / 51
diagrams byte-identical:   67 / 67
```

The emoji and symbol counts in the source and on the page all match:

- Emoji: 📘 1, 🧭 1, 🔗 1, 🧠 2, 📦 1, 🛠️ 1, 🎯 1, ⭐ 1, ✅ 1, 📗 1, 🍝 1, 🍛 1, 🥞 1.
- Symbols: ✓ 9, ○ 8, ♥ 1, ♡ 1, → 7, ▼ 22, ▲ 1.

Section by section, every part is present and in source order:

- **Intro:** the Lesson 4 list, the list → select → detail pattern, the two-screen sketch, and the key quote.
- **Navigation basics:**
  - §1 Why apps need multiple screens
  - §2 `NavigationStack`
  - §3 Navigation titles
  - §4 `NavigationLink`
  - §5 First multi-screen app
  - §6 Navigation stack mental model (the card stack, and push/pop)
- **Passing data:**
  - §7 Navigation with data
  - §8 Task model from Lesson 4
  - §9 `TaskDetailView`
  - §10 Passing data to another screen
  - §11 `List` + `NavigationLink`
  - §12 Following one task through the app
  - §13 One detail screen for many values
  - §14 `TaskRow`
  - §15 The complete example: model, row, detail and list screen
- **Guidance:**
  - §16 Where `NavigationStack` belongs
  - §17 Titles belong to screens
  - §18 Passing more than one value, and passing models
  - §19 Navigation vs sheets (conceptual only)
  - §20 Avoiding giant views
  - §21 Common hardcoding mistake
  - §22 Data-driven navigation
  - §23 Lesson 5 mental model
- **Challenge and recap:**
  - Recipe Browser challenge (model, array, two screen sketches and 10 requirements) and the ⭐ Bonus.
  - "What You Now Know", with both concept lists, the Lesson 1→5 progression, and the "our app can" checklist.
  - "📗 Lesson 6 — Sharing State Between Views" preview.

How the source was rendered:

- **Title lines:** "# 📘 SwiftUI for Beginners" and "## Lesson 5 — …" are shown in the article header as the eyebrow "📘 SwiftUI for Beginners · Lesson 5 of 9" and the H1 "Navigation & Multiple Screens". This matches Lessons 1–4.
- **Hand-aligned diagrams:** some diagrams have spacing the author aligned by hand around emoji or uneven connectors, such as §13 and the Recipe sketch. They are reproduced byte-for-byte.

Scope check, verified in the rendered DOM:

- **Excluded APIs:** 0 code blocks contain `NavigationPath`, `navigationDestination`, `@Observable`, `ObservableObject`, `@StateObject`, `@ObservedObject`, `@EnvironmentObject`, `URLSession`, Firebase, `onDelete` or `path:`.
- **`@State` / `@Binding`:** they appear in exactly one code block, the source's Lesson 6 preview (`@State` / `@Binding`), which comes after the `#lesson-6` heading. Nothing about them is taught in Lesson 5.
- **Sheets:** `.sheet(...)` appears only as the source's one-line conceptual mention in §19.
- **Challenge:** no solution code is included. There is no `RecipeRow` or `RecipeDetailView` implementation.

## 6. Course-index changes

`/learn/ios/swiftui/`, verified in the browser:

| # | Title | State |
|---|---|---|
| 1 | Getting Started with SwiftUI | link |
| 2 | Building Your First Screen | link |
| 3 | Making Your Screen Interactive | link |
| 4 | Working With Lists of Data | link |
| 5 | Navigation & Multiple Screens | **link (new)** → `/learn/ios/swiftui/navigation-and-multiple-screens/` |
| 6 | Sharing State Between Views | Coming soon |
| 7 | Building Real App Interfaces | Coming soon |
| 8 | Loading Data & MVVM | Coming soon |
| 9 | Beginner Project | Coming soon |

## 7. Lesson navigation changes

| Location | Result (verified by clicking in headless Chrome) |
|---|---|
| Lesson 4 previous | `Lesson 3 — Making Your Screen Interactive` (unchanged link) |
| Lesson 4 next | `Next lesson · Lesson 5 — Navigation & Multiple Screens` → `/learn/ios/swiftui/navigation-and-multiple-screens/` |
| Lesson 5 previous | `Previous lesson · Lesson 4 — Working With Lists of Data` → `/learn/ios/swiftui/working-with-lists-of-data/` |
| Lesson 5 next | `Coming soon · Lesson 6 — Sharing State Between Views` (a `<span>` placeholder, not a link) |
| Sidebar series (Lessons 1–4) | "5. Navigation" links to Lesson 5 on all four pages |
| Sidebar series (Lesson 5) | Items 1–4 are links, item 5 is the current page (`aria-current="page"`), and items 6–9 are future non-links |
| Breadcrumbs (Lesson 5) | Learn / iOS / SwiftUI / Navigation & Multiple Screens |
| iOS page pill | "Navigation" → Lesson 5 |

The "On This Page" TOC on Lesson 5 has 14 entries. All anchors resolve, and the live highlight works: scrolling to §10 highlights "Passing Data".

## 8. Code-block/copy behavior

- **Markup:** all 51 Swift blocks use the existing `<pre><code class="language-swift">` pattern, with HTML escaping only. There is no new component. The existing `enhanceCodeBlocks()` added exactly 51 Copy buttons.
- **Exact copying:** the clipboard write was intercepted for all 51 buttons. Each one copied exactly the block's text and showed "✓ Copied" (**51/51**).
- **Key examples:** these were copied and compared directly to the source text, and all were identical:
  - Complete `TaskListView` (33 lines)
  - Complete `TaskDetailView` (33 lines, the §15 version with `.multilineTextAlignment`)
  - `TaskRow` (20 lines)
  - `ProfileView`, including `\(age)` (13 lines)
  - The `recipes` array (17 lines)
- **Reset:** every button returns to icon + "Copy" after 2 s.
- **Accessibility:** buttons are `type="button"` with an accessible name. Keyboard Enter copies the block and keeps focus. The shared `role="status"` region announces "Code copied to clipboard".

## 9. Diagram handling

- **Markup:** all 67 `text` blocks use the existing Lesson 1–4 pattern, `<figure class="diagram"><pre role="img" aria-label="…">`, with no `<code>` and no Copy button. Checked in the browser: 0 diagram copy buttons.
- **Labels:** every diagram has a hand-written `aria-label` (67/67 non-empty) that describes its teaching meaning in words. For example, the card-stack diagrams say which screen sits on top, and the flow diagrams name each step.
  - Arrows, ✓/○ marks and box art are therefore never the only way the meaning is conveyed.
- **Captions:** no `<figcaption>` was added. The source has no captions, and Lessons 1–4 don't use them, so adding captions would introduce content that isn't in the source.
- **Mobile:** the diagrams keep monospace alignment. The few wider diagrams (such as §13) scroll inside their own box at 360 px without page overflow.

## 10. SEO

All SEO is written directly in the HTML `<head>`, and all lesson content is in the markup, with no JavaScript injection.

- **title:** `SwiftUI NavigationStack & NavigationLink for Beginners | TechBuzz Apps`
- **meta description:** "Learn SwiftUI navigation for beginners: use NavigationStack, NavigationLink and navigation titles, pass selected data to a detail screen, and build a multi-screen task app."
- **canonical and og:url:** `https://techbuzzapps.com/learn/ios/swiftui/navigation-and-multiple-screens/`
- **og:title:** "Navigation & Multiple Screens — SwiftUI for Beginners, Lesson 5"
- **Other tags:** `og:description` matches the description, and `og:type` is `article`. `theme-color` and `lang="en"` are present.

## 11. Accessibility validation

- **Headings:** one `h1`, with no skipped levels (h1 → h2 → h3) and no duplicate `id`s. Heading emoji are wrapped in `aria-hidden="true"` spans.
- **Landmarks:**
  - Labelled breadcrumbs `nav`, with `aria-current="page"` on the current item.
  - A labelled sidebar `aside`.
  - Labelled TOC and series navs.
  - A pagination `nav` with `aria-label="Lesson navigation"`.
- **Keyboard:** the first Tab lands on "Skip to content" (→ `#main`), and the header links follow. Pagination links show `:focus-visible`. Copy buttons work from the keyboard.
- **Visible focus:** a 2 px solid amber (`rgb(251,191,36)`) outline, measured on the skip link, the header links and the pagination link.
- **Names and links:** 0 images without `alt`, 0 links without an accessible name, and 0 `href="#"` links. No broken internal links were found on any checked route.
- **Contrast:** computed with alpha compositing on the rendered page:

  | Element | Ratio |
  |---|---|
  | Body text | 10.99:1 |
  | Headings | 16.19:1 |
  | Diagrams | 9.83:1 |
  | Code | 15.12:1 |
  | Copy button | 7.27:1 |
  | Callout text | 9.83:1 |
  | Challenge title | 7.85:1 |
  | TOC and series links, eyebrow, breadcrumbs | 6.38:1 |
  | Pagination link | 8.68:1 |

  The deliberately dimmed "Coming soon" pagination placeholder and future-lesson sidebar items measure **3.35:1**. This is the existing site-wide styling for unavailable items, identical on Lessons 1–4. It was left unchanged, as this phase allows no redesign, and is noted here for a possible future design pass.
- **Colour is never the only signal:** availability is also conveyed by the text ("Coming soon", "Next lesson") and by link vs non-link elements, and the current lesson by `aria-current`.

## 12. Responsive validation

Headless Chrome was run at 1366×900, 820×1100 and 360×740 on `/`, `/learn/ios/`, `/learn/ios/swiftui/` and Lessons 1–5.

- Page horizontal overflow was **0 px** on all 24 route/width combinations.
- 0 `<pre>` elements extend past the viewport. Long code lines and wide diagrams scroll inside their own block.
- 0 console errors or warnings, and no 4xx/5xx responses.

Screenshots were reviewed at desktop, tablet and mobile widths:

- the top and intro sketch
- the card-stack diagrams (§6)
- §13 one detail screen, many results
- the `List` + `NavigationLink` code
- the complete example
- data-driven navigation (§22)
- the mental model
- the Recipe challenge
- the Lesson 6 preview and pagination
- the course index and the iOS page

The layout and the dark navy/amber design match Lessons 1–4.

## 13. Regression checks

The working tree was compared to a `git archive HEAD` baseline (HEAD `ed28c9e`) with pixel-exact screenshots.

| Page | 1366 | 360 |
|---|---|---|
| Lesson 1 article body | IDENT | IDENT |
| Lesson 2 article body | IDENT | IDENT |
| Lesson 3 article body | IDENT | IDENT |
| Lesson 4 article body | IDENT | IDENT |
| Combine — Understanding Combine | IDENT | IDENT |
| Jetpack Compose — Getting Started | IDENT | IDENT |
| GCP — Getting Started | IDENT | IDENT |
| Math — What Are Numbers | IDENT | IDENT |
| Swift — Closures | IDENT | IDENT |
| Apps | IDENT | IDENT |

- **Lessons 1–4:** only the sidebar item and the Lesson 4 pagination changed, and both fall outside the compared article-body region.
- **Shared components:** the header and footer render on every route, and "Learn" is the current nav item.
- **Copy buttons:** counts are unchanged on Lessons 1–4 (9, 14, 42 and 54), and diagrams have none.
- **Navigation checks:** the course index, iOS page, homepage and all Previous/Next links were verified by clicking (§6–§7).

## 14. Source Markdown preservation verification

**`docs/learn/sources/swiftui-lesson5.md` was preserved unchanged.** It was read-only input throughout. It was not deleted, renamed, moved, emptied, reformatted or replaced, and it remains in the repository as permanent curriculum source material.

| Check | Before implementation | After implementation |
|---|---|---|
| Exists at `docs/learn/sources/swiftui-lesson5.md` | yes | yes |
| Tracked by git (`git ls-files`) | yes | yes |
| Lines / bytes | 1725 / 29019 | 1725 / 29019 |
| SHA-256 | `c5224db7ce5ac2924c1ea739d22783aa0e2074707f8df5397cf8489ebb1d84e0` | `c5224db7ce5ac2924c1ea739d22783aa0e2074707f8df5397cf8489ebb1d84e0` |
| `git diff --quiet HEAD -- docs/learn/sources/swiftui-lesson5.md` | — | clean (no changes) |

## 15. git status --short

```text
 M index.html
 M learn/ios/index.html
 M learn/ios/swiftui/building-your-first-screen/index.html
 M learn/ios/swiftui/getting-started/index.html
 M learn/ios/swiftui/index.html
 M learn/ios/swiftui/making-your-screen-interactive/index.html
 M learn/ios/swiftui/working-with-lists-of-data/index.html
?? docs/learn/reports/SwiftUI_Lesson5_Navigation_Implementation_Report.md
?? learn/ios/swiftui/navigation-and-multiple-screens/
```

`git diff --check` reports no whitespace errors. Nothing was committed or pushed.
