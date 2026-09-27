# SwiftUI Lesson 4 — Working With Lists of Data: Implementation Report

## 1. Summary

I implemented Lesson 4 of *SwiftUI for Beginners*, "Working With Lists of Data", at
`/learn/ios/swiftui/working-with-lists-of-data/`. The page was built from the permanent source
`docs/learn/sources/swiftui-lesson4.md`. Nothing was generated, rewritten, shortened, summarised or reordered.
The source was converted mechanically into the existing lesson markup (the same approach as Lesson 3), and the result was checked block by block against the source.

- **Full sequence:** all 20 numbered sections, the challenge and bonus, "What You Now Know", and the Lesson 5 preview.
- **Rendered blocks:** 54 Swift code blocks, 53 diagrams, 23 section headings, 4 sub-headings, 13 callout quotes, 205 paragraphs and 6 list items.
- **Course index:** Lesson 4 is now available. Lessons 5–9 stay "Coming soon", and the index still lists 9 lessons.
- **Navigation:**
  - Lesson 3 → Lesson 4 is now a real link.
  - Lesson 4 → Lesson 3 is a real link.
  - Lesson 4 → Lesson 5 is a "Coming soon" non-link.
- **Not done:** Lesson 5 was not created.
- **No new code or tooling:** no CSS, JS, framework, npm or build tooling was added.
- **Source file:** `docs/learn/sources/swiftui-lesson4.md` was **preserved unchanged**. It was not deleted, moved, renamed or modified, as verified in §13.
- **Not committed or pushed.**

## 2. Files inspected

- `docs/learn/sources/swiftui-lesson4.md`: read in full. It has 1,433 lines and contains the complete lesson, from "Lesson 4 — Working With Lists of Data" through the Lesson 5 preview.
- `learn/ios/swiftui/making-your-screen-interactive/index.html` (Lesson 3): the page shell, sidebar, pagination and markup reference.
- `learn/ios/swiftui/getting-started/index.html` and `learn/ios/swiftui/building-your-first-screen/index.html` (Lessons 1–2): the sidebar series navigation.
- `learn/ios/swiftui/index.html`: the course index.
- `learn/ios/index.html`: the iOS track page.
- `index.html`: the homepage, for the iOS guide count.
- `assets/js/common.js`: the header/footer components, `enhanceCodeBlocks()` and the TOC highlighting.
- `assets/css/learn.css`: the article layout, callouts, `.diagram` and pagination.
- `components/site-header.html`.
- The repository has no sitemap, so none needed updating.

## 3. Files created

| File | Purpose |
|---|---|
| `learn/ios/swiftui/working-with-lists-of-data/index.html` | Lesson 4 page (≈43 KB, static HTML, all content in the markup) |
| `docs/learn/reports/SwiftUI_Lesson4_Working_With_Lists_Implementation_Report.md` | This report |

## 4. Files modified

| File | Change |
|---|---|
| `learn/ios/swiftui/index.html` | Lesson 4 changed from `is-future` / "Coming soon" to the `is-available` link pattern with an arrow. The title now matches the lesson: "Working With Lists of Data". |
| `learn/ios/swiftui/making-your-screen-interactive/index.html` | The "Coming soon" next placeholder became a `Next lesson` link to Lesson 4. Sidebar item "4. Lists of Data" is now a link. |
| `learn/ios/swiftui/getting-started/index.html` | Sidebar item "4. Lists of Data" is now a link. |
| `learn/ios/swiftui/building-your-first-screen/index.html` | Sidebar item "4. Lists of Data" is now a link. |
| `learn/ios/index.html` | SwiftUI card badge changed from "3 lessons" to "4 lessons". Added a "Lists of Data" pill linking to Lesson 4, following the pattern Lesson 3 used for "Interactivity". |
| `index.html` | iOS card badge changed from "5 guides" to "6 guides" (Closures, SwiftUI 1–4 and Combine 1), a truthful count. |

Total diff to tracked files: 6 files, 18 insertions and 15 deletions. No CSS or JS files were changed.

## 5. Source-content fidelity verification

A checker script parsed the source Markdown and the rendered `<article>` body (after the article header) into ordered blocks and compared them in order: type plus exact text, with whitespace normalised for prose only.

```text
source blocks: 358 | html blocks: 358
source kinds: {'p': 205, 'code': 54, 'diagram': 53, 'quote': 13, 'h2': 23, 'h3': 4, 'li': 6}
html kinds:   {'p': 205, 'code': 54, 'diagram': 53, 'quote': 13, 'h2': 23, 'h3': 4, 'li': 6}
mismatches: 0 | length equal: True
code blocks byte-identical: 54 / 54
diagrams byte-identical:   53 / 53
```

The emoji and symbol counts in the source and on the page all match:

- Emoji: 📘 1, 📦 1, 🔁 1, 🤔 2, 🧱 1, 🪪 1, 🧩 1, 🛠️ 1, 🧠 1, 🎯 1, ⭐ 1, ✅ 1, 📗 1, 🎬 4.
- Symbols: ✓ 3, ○ 5, ♥ 1, ♡ 1.

Section by section, every part is present and in source order:

- **Intro:** the hardcoded views, the data → SwiftUI → UI idea, the Task List sketch, and the key quote.
- **§1–§5:**
  - §1 Hardcoded views
  - §2 Arrays
  - §3 ForEach
  - §4 Reading ForEach, with the `fruits` and `fruit` sub-headings
  - §5 `id: \.self`
- **§6–§10:**
  - §6 Models
  - §7 Multiple tasks
  - §8 Identifiable, with UUID
  - §9 ForEach with Identifiable
  - §10 Richer rows
- **§11–§14:**
  - §11 VStack vs List
  - §12 List with data
  - §13 Reusable `TaskRow`
  - §14 The complete Task List
- **§15–§17:**
  - §15 Adding another task
  - §16 Counting completed tasks, with `filter`
  - §17 Data and UI separation, with the "Hardcoded UI" sub-heading
- **§18–§20:**
  - §18 `let` vs `@State`
  - §19 ForEach or List
  - §20 Lesson 4 mental model
- **Challenge and recap:**
  - The Favourite Movies challenge, with requirements and the ⭐ Bonus.
  - "What You Now Know", including the Lesson 1 → 4 progression.
  - "📗 Lesson 5 — Navigation & Multiple Screens" preview.

How the source was rendered:

- **Title lines:** "# 📘 SwiftUI for Beginners" and "## Lesson 4 — …" are shown in the article header as the eyebrow "📘 SwiftUI for Beginners · Lesson 4 of 9" and the H1 "Working With Lists of Data". This matches Lessons 1–3.
- **Stray fence:** the source ends with an unmatched "````" fence line after the final paragraph. It is not lesson content and was not rendered. The source file itself was left as is.
- **Emoji sketch:** the Favourite Movies sketch contains 🎬 inside a box, and the source author adjusted the spacing for it. It is reproduced byte-for-byte, as the instructions required.

Excluded topics check: no code block contains `onDelete`, `@Binding`, `@Observable`, `ObservableObject`, `@StateObject`, `@ObservedObject`, `NavigationStack`/`NavigationLink`, `URLSession`, Firebase or `@State`.

- `@State`, bindings, editing, deleting and adding appear only where the source's §18 text and diagram explicitly name them as *not yet* covered.
- `NavigationStack` and `NavigationLink` appear only in the source's Lesson 5 preview sentence.
- There is no quiz, progress tracking, auth, analytics or ads.
- The challenge includes no solution code: there is no `MovieRow` implementation.

## 6. Course-index changes

`/learn/ios/swiftui/` now shows:

- Lessons 1, 2, 3 and 4 as available links.
- Lessons 5–9 as "Coming soon" non-links.

That is 9 lessons in total, verified in the browser.

- The Lesson 4 card links to `/learn/ios/swiftui/working-with-lists-of-data/`, and clicking it navigates there.
- The description "Models, ForEach, List and Identifiable." was kept unchanged.

## 7. Lesson navigation changes

| Location | Result (verified by clicking in headless Chrome) |
|---|---|
| Lesson 3 → next | `Next lesson · Lesson 4 — Working With Lists of Data` → `/learn/ios/swiftui/working-with-lists-of-data/` |
| Lesson 4 → previous | `Previous lesson · Lesson 3 — Making Your Screen Interactive` → `/learn/ios/swiftui/making-your-screen-interactive/` |
| Lesson 4 → next | `Coming soon · Lesson 5 — Navigation & Multiple Screens` (a `<span>` placeholder, not a link) |
| Sidebar series (Lessons 1–3) | "4. Lists of Data" links to Lesson 4 on all three pages |
| Sidebar series (Lesson 4) | Items 1–3 are links, item 4 is the current page (`aria-current="page"`), and items 5–9 are future non-links |
| Breadcrumbs (Lesson 4) | Learn / iOS / SwiftUI / Working With Lists of Data |
| iOS page pill | "Lists of Data" → Lesson 4 |

The "On This Page" TOC on Lesson 4 has 14 entries. All anchors resolve, and the live highlight works: scrolling to §8 highlights "Identifiable".

## 8. Code-block/copy behavior

- **Markup:** all 54 Swift blocks use `<pre><code class="language-swift">`, with HTML escaping only. They received a Copy button automatically from the existing `enhanceCodeBlocks()`: 54 blocks, 54 buttons.
- **Exact copying:** the clipboard write was intercepted for all 54 buttons. Each one copied exactly the block's text and showed "✓ Copied" (**54/54**).
  - The full `TaskListView` block (32 lines) copied byte-identical to the source.
  - The interpolation line `Text("\(completedCount) of \(tasks.count) completed")` copied exactly, backslashes included.
- **Reset:** every button returns to icon + "Copy" after 2 s.
- **Accessibility:** buttons are `type="button"` with an accessible name. Keyboard Enter on a focused button copies it and keeps focus. The shared `role="status"` region announces "Code copied to clipboard".

## 9. Diagram handling

- **Markup:** all 53 `text` blocks are rendered as `<figure class="diagram"><pre role="img" aria-label="…">` with no `<code>` and no Copy button. Checked in the browser: 0 diagram copy buttons and 0 `code` elements inside diagrams.
- **Labels:** every diagram has a hand-written, non-empty `aria-label` describing its meaning, 53/53.
- **Content:** diagram content is byte-identical to the source (53/53). The box-drawing sketches (Task List, mental model, Favourite Movies) render in the existing monospace diagram style.

## 10. Accessibility validation

- **Structure:**
  - Exactly one `h1`, with no skipped heading levels (h1 → h2 → h3) and no duplicate `id`s.
  - `lang="en"`.
  - Heading emoji are wrapped in `<span aria-hidden="true">`, verified for every h2/h3.
- **Landmarks:** the breadcrumbs `nav` has `aria-label="Breadcrumb"`, and the current page uses `aria-current`. The sidebar `aside` is labelled, and the TOC and series navs are labelled. The pagination `nav` has `aria-label="Lesson navigation"`.
- **Keyboard:** the first Tab focuses "Skip to content" → `#main`, and Copy buttons work from the keyboard.
- **Names:** 0 images without `alt` and 0 links without an accessible name. There are 0 `href="#"` links, and no broken internal links on any checked route.
- **Diagrams:** exposed as images with descriptive labels, as described in §9.

## 11. Responsive validation

Headless Chrome was run at 1366×900, 820×1100 and 360×740 on `/`, `/learn/ios/`, `/learn/ios/swiftui/`, Lessons 1–3 and Lesson 4.

- Page horizontal overflow was **0 px** on every route at every width.
- 0 `<pre>` elements extend past the viewport. Long code lines scroll inside their own block.
- 0 console errors or warnings, and no 4xx/5xx responses.

Screenshots were reviewed at desktop, tablet and mobile widths: the top, the ForEach, VStack/List, counting and mental-model diagrams, the Task List code, the challenge, the Lesson 5 preview and the course index. The layout and the dark navy/amber design match Lessons 1–3.

## 12. Regression checks

The working tree (port 8765) was compared to a `git archive HEAD` baseline (port 8766) with pixel-exact screenshots.

| Page | 1366 | 360 |
|---|---|---|
| Lesson 1 article body | IDENT | IDENT |
| Lesson 2 article body | IDENT | IDENT |
| Lesson 3 article body | IDENT | IDENT |
| Combine — Understanding Combine | IDENT | IDENT |
| Jetpack Compose — Getting Started | IDENT | IDENT |
| GCP — Getting Started | IDENT | IDENT |
| Math — What Are Numbers | IDENT | IDENT |
| Swift — Closures | IDENT | IDENT |
| Apps | IDENT | IDENT |

- **Lessons 1–3:** only the sidebar item and pagination changed, and these fall outside the compared article-body region.
- **Shared components:** the header and footer render on every route, and "Learn" is the current nav item.
- **Copy behaviour:** unchanged on Lessons 1–3, with 9/9, 14/14 and 42/42 buttons respectively.
- **Changed pages:** the course index, iOS page and homepage were checked for their intended changes only: Lesson 4 available, "4 lessons" with the new pill, and "6 guides".

## 13. Source Markdown preservation verification

**`docs/learn/sources/swiftui-lesson4.md` was preserved unchanged.** It was read-only input throughout. It was not deleted, moved, renamed or modified, and it remains in the repository permanently as curriculum source material.

| Check | Before implementation | After implementation |
|---|---|---|
| Exists at `docs/learn/sources/swiftui-lesson4.md` | yes | yes |
| Tracked by git (`git ls-files`) | yes | yes |
| Lines / bytes | 1433 / 22294 | 1433 / 22294 |
| SHA-256 | `6244b03e4bec72254c44b69c27f86fd97f1a35174af7102c92baf18bfcdc508a` | `6244b03e4bec72254c44b69c27f86fd97f1a35174af7102c92baf18bfcdc508a` |
| `git diff --quiet HEAD -- docs/learn/sources/swiftui-lesson4.md` | — | clean (no changes) |

## 14. git status --short

```text
 M index.html
 M learn/ios/index.html
 M learn/ios/swiftui/building-your-first-screen/index.html
 M learn/ios/swiftui/getting-started/index.html
 M learn/ios/swiftui/index.html
 M learn/ios/swiftui/making-your-screen-interactive/index.html
?? docs/learn/reports/SwiftUI_Lesson4_Working_With_Lists_Implementation_Report.md
?? learn/ios/swiftui/working-with-lists-of-data/
```

`git diff --check` reports no whitespace errors. Nothing was committed or pushed.
