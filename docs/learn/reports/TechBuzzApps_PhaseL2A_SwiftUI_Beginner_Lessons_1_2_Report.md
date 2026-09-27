# TechBuzz Learn — Phase L2A Report
## SwiftUI for Beginners: Lesson 1 + Lesson 2 Course Foundation

Branch: `feature/TechBuzzLearn` · Nothing committed or pushed.

---

## 1. Objective

Start real educational content for TechBuzz Learn with a **SwiftUI beginner course** organised around substantial lessons rather than one page per API. This phase:

- publishes **Lesson 1 — Getting Started with SwiftUI** and **Lesson 2 — Building Your First Screen**;
- turns `/learn/ios/swiftui/` into the course landing page, with Lessons 3–9 shown as non-link planned lessons;
- reuses the existing site shell and article template, with no redesign.

## 2. Teaching / content decisions

- **Source material.** The phase brief supplied the course structure, the teaching pattern, each lesson's topic list and learning goals, the key diagrams (VStack tree, Spacer line, the Screen → Modifiers model), the callout candidates, and both final code builds. **No separate long-form lesson text was found**, either in the message or the repository. The lesson prose was therefore written for this phase from the brief, following its outline, progression and tone rules exactly. Where the brief supplied wording (diagrams, key ideas, the common-mistake statement, final code, course descriptions), it is used verbatim or near-verbatim. If a fuller hand-written draft exists, it can be dropped into the same HTML structure (see §19).
- **One substantial idea per lesson.** Text, Image, VStack, HStack, Spacer, modifiers and so on are sections *inside* lessons, never separate pages. No `/swiftui/text/`-style URLs were created.
- **Teaching pattern** (Explain → Visualize → Show code → Experiment → Build → Challenge):
  - each concept is explained in plain language first;
  - then visualised with a text diagram where one helps;
  - then shown in a small code block;
  - each lesson has an explicit experiment/try-it step, builds to one complete final screen, and ends with an open challenge (no solution revealed).
- **Voice.** Friendly and patient, second person, short paragraphs.
  - No UIKit or architecture knowledge is assumed.
  - "Obviously", "simply" and "just" are avoided where the idea may be new.
  - Emoji appear only inside sketches, as stand-ins for SF Symbols.
  - Analogies are used sparingly: ordering at a café for declarative UI, wrapping a present for modifier order.
- **Scope held to the brief.**
  - Lesson 1 has no architecture, MVVM or state; `some View` is explained as "some kind of view" with no opaque-type theory.
  - Lesson 2's "Get Started" is explicitly a styled `Text`, with a forward pointer that real buttons arrive in Lesson 3.
- **Small, accurate additions for beginners:**
  - Lesson 1 has a short **Note** on where the code lives (Xcode → iOS App → `ContentView.swift`, the canvas preview, `#Preview`).
  - Named font styles are explained as respecting the user's text-size setting.
  - Lesson 2 has a **Tip** on previewing `WelcomeView` with `#Preview { WelcomeView() }`.

## 3. SwiftUI course structure

| # | Lesson | URL | Status |
|---|---|---|---|
| 1 | Getting Started with SwiftUI | `/learn/ios/swiftui/getting-started/` | **Published** |
| 2 | Building Your First Screen | `/learn/ios/swiftui/building-your-first-screen/` | **Published** |
| 3 | Making the Screen Interactive | — | Coming soon (non-link) |
| 4 | Working with Lists of Data | — | Coming soon |
| 5 | Navigation & Multiple Screens | — | Coming soon |
| 6 | Sharing State Between Views | — | Coming soon |
| 7 | Building Real App Interfaces | — | Coming soon |
| 8 | Loading Data & MVVM | — | Coming soon |
| 9 | Beginner Project | — | Coming soon |

## 4. Lesson 1 implementation — Getting Started with SwiftUI

`/learn/ios/swiftui/getting-started/` (~2,250 words of markup). Sections:

1. **What is SwiftUI?** — what a UI is; SwiftUI as Apple's cross-platform UI framework; Note on the Xcode project and canvas.
2. **Describe, Don't Instruct** — declarative UI via the café analogy, plus a plain-language "description" diagram.
3. **Your First SwiftUI Code** — the 7-line example, then line-by-line h3s: `import SwiftUI`, `struct ContentView: View` (Key idea: *A SwiftUI screen is a View*), `var body: some View`, and `Text(...)`.
4. **Showing Text** — `Text` and its defaults.
5. **Modifiers** — `.font`, `.fontWeight`, `.foregroundStyle`, chaining, a modifier-chain diagram, common font styles. Key idea: *view first, modifiers after*.
6. **Images and SF Symbols** — `Image(systemName:)`, filled vs outline, sizing with `.font`, coloring. A Tip lists symbol names and notes that misspelled names show nothing.
7. **Stacking Views with VStack** — containers, the VStack tree diagram, `spacing`.
8. **Putting It Together** — sketch of the result, a declarative description, then the **exact final code from the brief**, with an outside-in reading and a note on indentation.
9. **Experiment** — five concrete changes to try.
10. **Recap** — the five learning outcomes from the brief, as a takeaway callout.
11. **Challenge** — the ♥︎ / "Welcome!" / "I'm learning SwiftUI" screen, using VStack, Image, Text, `.font()` and `.fontWeight()`, open-ended with no solution.

## 5. Lesson 2 implementation — Building Your First Screen

`/learn/ios/swiftui/building-your-first-screen/` (~3,050 words of markup). It follows the brief's 13-step progression on one page:

1. **Thinking in Stacks** — the two directions. Key idea: *"Is this vertical or horizontal?"*
2. **VStack** · 3. **HStack** (icon + label) · 4. **Nesting Stacks** (profile row + tree diagram)
5. **Alignment** — `.leading` for VStack, `.top`/`.bottom` for HStack, a comparison diagram, and a Note that alignment is relative to siblings.
6. **Spacer** — `Profile |<------ Spacer ------>| ⚙️`, horizontal and vertical use.
7. **Padding** — default, fixed amount, per edge.
8. **Backgrounds** — `.background`, `.blue.opacity(0.1)`, `.clipShape(RoundedRectangle…)`, `.foregroundStyle(.white)`.
9. **Modifier Order Matters** — A/B code, an A-over-B diagram, the "wrapping" explanation. **Key idea** + **Common mistake** (exactly the brief's `.padding().background()` vs `.background().padding()`).
10. **Frame** — fixed size, `maxWidth: .infinity`, `alignment:`, and a Tip on frame-before-background.
11. **ZStack** — a layered avatar example with a diagram.
12. **Building the Welcome Screen** — sketch, a five-section breakdown, then the **exact `WelcomeView` from the brief**, followed by h3 walk-throughs of the goal card, the button and the Spacer/outer padding.
13. **Breaking Down Any Screen** — the `SCREEN → Sections → Stacks → Views → Modifiers` diagram plus a prominent **Key idea** callout with the five-step process.
14. **Recap** · 15. **Challenge** — build a `ProfileView` (ZStack avatar, name/title, info card with icon rows, Spacer, full-width button). Guided by breakdown questions and symbol names, no solution.

## 6. Code-block treatment

- Every Swift sample uses the existing Learn primitive: **`<pre><code class="language-swift">`**. That's 9 blocks in Lesson 1 and 14 in Lesson 2. No syntax-highlighting library.
- **Automated audit** of all 23 blocks (extracted and HTML-unescaped):
  - `{}` and `()` balanced in every block;
  - indentation in 4-space steps, no tabs;
  - no raw `<` or `&` inside `<pre>` (the only angle brackets, in the Spacer diagram, are escaped `&lt;`/`&gt;`);
  - apostrophes (`Today's Goal`) render as-is.
- **Both final builds are byte-for-byte identical** to the brief's code (`ContentView` in Lesson 1, `WelcomeView` in Lesson 2), verified programmatically.
- Responsive: code never widens the page. At 360px, blocks with long lines (e.g. `.frame(maxWidth: .infinity, alignment: .leading)`) scroll horizontally *inside* the block; `preOutside = 0` on every width.
- Existing styling is unchanged: monospace token stack, `#0b1220` surface, `#e5e7eb` text, 14px (13px on mobile).

## 7. Diagram treatment

- Added **one reusable primitive**, `.diagram`, to `learn.css` (Code section):
  ```html
  <figure class="diagram">
    <pre role="img" aria-label="…text description…">…sketch…</pre>
    <figcaption>…</figcaption>
  </figure>
  ```
  - It's visually distinct from code: a dashed border, the lighter surface token, body-text colour, and no `<code>` element, so diagrams are never marked as Swift.
  - `role="img"` + `aria-label` gives screen-reader users a sentence instead of box-drawing characters.
  - `figcaption` carries the visible caption.
- There are 15 diagrams (5 + 10): view trees, modifier chain, alignment comparison, the Spacer line, modifier-order A/B, ZStack layers, rough screen sketches, and the Screen → Modifiers model.
- **Rendering fixes found by visual inspection:**
  - Line height 1.25, so box-drawing verticals connect.
  - Emoji and `★` removed from *inside* boxes. They render double-width or from a fallback font and broke the right borders; `[star]`, `[envelope]` and `[pin]` are used instead.
  - The modifier-order A/B diagram was stacked vertically so it fits phones.
  - Long prose lines re-wrapped, and 12px diagram text below 768px.
  - Result: **all 15 diagrams fit at 360px with no horizontal scrolling** (measured).

## 8. Callout usage

The existing callout system is used sparingly, one variant per purpose:

| Lesson | Key idea | Note | Tip | Common mistake | Recap (takeaway) | Challenge |
|---|---|---|---|---|---|---|
| 1 | 2 (*screen is a View*; *view → modifiers*) | 1 (Xcode setup) | 1 (symbol names) | — | 1 | 1 |
| 2 | 3 (*vertical or horizontal?*; *modifier order matters*; *Screen → Modifiers*) | 1 (alignment ≠ positioning) | 2 (frame before background; preview) | 1 (padding/background order) | 1 | 1 |

- **New variant:** `.callout-challenge` (one line of CSS; violet `--color-special`).
- **Generic fix:** `.callout > :last-child { margin-bottom: 0 }`, so a callout can end with a list or a diagram without extra space.
- The type is always named in the visible title ("Key idea", "Your turn", …), so meaning is never conveyed by colour alone.

## 9. SwiftUI course-index changes (`/learn/ios/swiftui/`)

- The H1 and subtitle are unchanged. The meta description and `og:description` were updated to describe the course.
- New **"SwiftUI for Beginners"** section: an intro line and an **ordered list** (`<ol class="topic-index is-path">`) of all 9 lessons, each with a "Lesson N" label, title and the concise description from the brief.
  - Lessons 1–2 are full-width linked tiles.
  - Lessons 3–9 are **non-link** items with a "Coming soon" badge (no `href="#"`).
- The old flat roadmap is folded into the course. The three planned topics the course doesn't cover (Animations, Performance, Architecture) stay under **"After the Beginner Course"** as non-link items, so no planned topic disappeared.
- **Real metadata updated to stay truthful:**
  - `/learn/ios/`: the SwiftUI card now shows "2 lessons" (it said "Roadmap"). Its pills link to the two real lessons, plus "Interactivity" as Soon.
  - `/learn/`: the iOS card shows "3 guides" (Closures + 2 lessons), up from "1 guide".

## 10. Previous / next navigation

| Page | Previous | Next |
|---|---|---|
| Lesson 1 | "This is the first lesson" (placeholder) | **Link** → Lesson 2 — Building Your First Screen |
| Lesson 2 | **Link** → Lesson 1 — Getting Started with SwiftUI | "Coming soon · Lesson 3 — Making the Screen Interactive" (**non-link placeholder**) |

Both links were verified by clicking in the browser. The Lesson 3 placeholder is confirmed not to be an `<a>`. The sidebar "SwiftUI for Beginners" series nav shows all 9 lessons: current (`aria-current="page"`), linked, or muted planned.

## 11. Design-system reuse

- **Reused unchanged:** site shell (header, footer, `site-shell`, `site-main`), breadcrumbs, `.article-layout` / sticky sidebar / `<details>` groups, `data-toc` highlighting from `common.js`, `.article-header.page-intro` + `.eyebrow`, article typography, `pre > code`, all callout variants, `.article-pagination`, `.topic-index` / `.topic-item` / `.badge`.
- **Additions to `learn.css`** — all generic, none lesson-specific:
  1. `.diagram` (+ mobile font size);
  2. `.callout-challenge` and `.callout > :last-child`;
  3. `.topic-index.is-path` (single column, planned items padded to align with linked ones), `.topic-item-step`, and muted descriptions for `.is-future` items.
- No `lesson.css` or `swiftui.css`, no inline styles, no new JS.

## 12. SEO

Each lesson's `<head>` contains, directly in HTML:
- a unique `<title>`, e.g. *Getting Started with SwiftUI — SwiftUI for Beginners, Lesson 1 — TechBuzz Apps*;
- a unique meta description;
- canonical (`https://techbuzzapps.com/learn/ios/swiftui/getting-started/` and `…/building-your-first-screen/`);
- `og:title`, `og:description`, `og:url`, `og:type=article`, `theme-color`;
- exactly one H1.

All of this was verified in the browser at every width.

## 13. Accessibility

- One H1 per page. Hierarchy is H2 per section, with H3 only for sub-parts (Lesson 1's line-by-line walk-through; Lesson 2's final-build walk-through).
- Labelled landmarks: `nav "Breadcrumb"`, `aside "Lesson contents"` containing `nav "On this page"` and `nav "SwiftUI for Beginners lessons"`, and `nav "Lesson navigation"`.
- `aria-current="page"` on the breadcrumb and the current lesson. Learn is marked current in the shared header.
- Diagrams use `role="img"` with descriptive `aria-label`s. Code stays as real, selectable text.
- Callout meaning is carried by visible titles, not colour alone. Future lessons are labelled "Coming soon" in text.
- Focus-visible, skip link and reduced-motion behaviour are inherited unchanged from the shell.

## 14. Responsive behaviour

Validated at **1366 / 820 / 360**:
- no page overflow on any tested URL;
- no `<pre>` extends beyond the viewport;
- diagrams all fit at 360px, and code scrolls internally only where lines are long;
- breadcrumbs wrap;
- the sidebar collapses above the article below 960px (existing behaviour);
- prev/next stacks on mobile;
- course-index tiles stack cleanly, with the "Coming soon" badge beside the text.

## 15. Validation

- Local `python -m http.server`, with the committed tree (`db5104f`) exported via `git archive` as a pixel baseline.
- Headless Chrome was driven over the DevTools protocol (Node built-in WebSocket, no packages). Section screenshots at 1366 and 360 were reviewed by eye.

| Check | Result |
|---|---|
| HTTP 200 — `/learn/ios/swiftui/`, both lessons, `/learn/ios/`, `/learn/`, `/learn/ios/swift/closures/`, `/` | ✅ ×3 widths |
| Shared header/footer inserted, 0 unresolved placeholders, Learn `aria-current` (`page` on `/learn/`, `true` below) | ✅ |
| Breadcrumbs: `TechBuzz Apps / Learn / iOS / SwiftUI / <lesson>` | ✅ |
| Course index links: L1, L2 → real pages; L3–L9 → no link | ✅ (clicked L1 from the index) |
| Lesson 1 → Lesson 2, Lesson 2 → Lesson 1 (click-through) | ✅ |
| Lesson 3 is not a link anywhere | ✅ |
| `href="#"`: 0 · broken internal links: 0 · console errors/warnings/failed requests: none | ✅ |
| TOC highlighting (scrolled to *Modifier Order Matters* / *Images & SF Symbols*) | ✅ correct item active |
| Exactly one H1 · SEO tags present in HTML | ✅ |
| Horizontal overflow at 1366 / 820 / 360 | none |
| Code-block audit (23 blocks) and final-build exact match | ✅ |
| Unrelated pages unchanged vs baseline: Closures, `/`, `/learn/ios/swift/`, `/learn/cloud/`, `/learn/ai-python/`, `/dharmaconnect/` | **pixel-identical** ×3 widths |
| Expected visual changes | `/learn/` and `/learn/ios/` (metadata badges/pills only) |

## 16. Files added

- `learn/ios/swiftui/getting-started/index.html`
- `learn/ios/swiftui/building-your-first-screen/index.html`
- `docs/learn/reports/TechBuzzApps_PhaseL2A_SwiftUI_Beginner_Lessons_1_2_Report.md`

## 17. Files modified

- `learn/ios/swiftui/index.html`: course landing page (see §9).
- `assets/css/learn.css`: `.diagram`, `.callout-challenge`, `.callout > :last-child`, the learning-path variant of the topic index (see §11).
- `learn/ios/index.html`: SwiftUI card metadata/pills now reflect the 2 real lessons.
- `learn/index.html`: iOS card badge "1 guide" → "3 guides".

## 18. Files intentionally not modified

- The shared shell: `components/*`, `assets/js/common.js`, `assets/css/style.css`, `assets/css/apps.css`.
- The Apps homepage, `dharmaconnect/**`, `simplyinspiring/**`.
- The Swift Closures article and all Swift, Android, React, Cloud, AI & Python, System Design and Career pages.
- `learn/ios/interview/**`, including the pre-existing empty stub.

## 19. Known limitations

- **Lesson prose was authored from the brief.** No separate full lesson text was available (§2). If there is a hand-written draft, compare it against these pages; the HTML structure (sections, diagrams, callouts, code blocks) can take revised prose without layout changes.
- **The code was not compiled** in Xcode during this phase. The two final builds are the brief's code verbatim. The smaller snippets use standard, long-available SwiftUI APIs (`foregroundStyle`, `clipShape`, `.background(_ ShapeStyle)`, `#Preview`), which assume a current Xcode (15+) and iOS 17-era defaults.
- Breadcrumbs follow the site-wide convention (`TechBuzz Apps / Learn / iOS / SwiftUI / …`) rather than the brief's "TechBuzz Learn > …" wording, so every Learn page stays consistent.
- On phones the sidebar sits above the article with two open lists (11 + 9 items), which pushes the lesson start down. This is existing L1B template behaviour (collapsible `<details>`), noted then as a product decision.
- The "3 guides" / "2 lessons" badges are maintained by hand and must be updated as lessons ship.
- Challenges have no solutions yet, by design for this phase.

## 20. Recommended next lesson

**Lesson 3 — Making the Screen Interactive** (`/learn/ios/swiftui/making-the-screen-interactive/`). It is the natural continuation: it turns Lesson 2's styled "Get Started" `Text` into a real `Button`, then introduces `@State`, `Toggle` and `TextField` through one small interactive screen.

When it ships:
- make the Lesson 2 "next" placeholder a link;
- make Lesson 3 in the index and both sidebars a link;
- update the "2 lessons" / "3 guides" badges.

---

## Directory tree (relevant parts)

```
techbuzzapps-site/
├── assets/css/learn.css                                  [modified]  +diagram, +callout-challenge, +learning path
├── learn/
│   ├── index.html                                        [modified]  iOS badge → "3 guides"
│   └── ios/
│       ├── index.html                                    [modified]  SwiftUI card → "2 lessons"
│       ├── swift/closures/index.html                     [unchanged]
│       └── swiftui/
│           ├── index.html                                [modified]  course landing page
│           ├── getting-started/index.html                [new]       Lesson 1
│           └── building-your-first-screen/index.html     [new]       Lesson 2
└── docs/learn/reports/
    └── TechBuzzApps_PhaseL2A_SwiftUI_Beginner_Lessons_1_2_Report.md  [new]
```

## Git state

- **Before L2A:** `git status --short` was **clean**. Earlier phases are committed (`962dd52` L1B, `db5104f` L1B1), so there were no pre-existing uncommitted changes.
- **After L2A:** 4 modified files + 3 new paths (two lesson directories and this report). **All uncommitted changes belong to L2A.**
