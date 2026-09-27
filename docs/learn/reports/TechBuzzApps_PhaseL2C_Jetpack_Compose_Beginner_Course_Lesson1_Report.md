# TechBuzz Learn — Phase L2C Report
## Jetpack Compose for Beginners — Course Foundation + Lesson 1

Branch: `feature/TechBuzzLearn` · Nothing committed or pushed.

---

## 1. Objective

Add the first substantial Android course, **Jetpack Compose for Beginners**, under Learn → Android → Jetpack Compose. It includes:
- a 9-lesson course landing page;
- **Lesson 1 — Getting Started with Jetpack Compose**, built from the user's Lesson 1 content with the same beginner-first quality as the SwiftUI, Math and Combine courses.

## 2. Pre-change git state

`git status --short` was **clean**. The expected checkpoint was present: Combine L2B is committed as `1c94cf2 Combine tut added`, on top of `0e3d071` (Math) and `2b7d392` (Copy). No phases were mixed, and every uncommitted change after this phase belongs to L2C.

## 3. Architecture audit

All required primitives already existed and were reused unchanged:

- **Shell:** `site-shell`, the shared header/footer components via `common.js`, and `site-main`.
- **Android landing (`/learn/android/`):** a `page-intro` plus a `topic-index` of planned topics. The site's convention for an *available* topic in a topic-index is the full-width linked `topic-item is-available` (as used for Swift → Closures).
- **Course landing pattern:** `page-intro` plus `ol.topic-index.is-path` (SwiftUI, Math, Combine).
- **Article template:** breadcrumbs, `article-header page-intro` + eyebrow, sticky `article-sidebar` with `<details>`, `data-toc` highlighting, `.sidebar-back`, and `article-pagination`.
- **`.diagram`** (with `role="img"` + `aria-label`), plus callouts (note / key / tip / takeaway / challenge).
- **Copy:** `enhanceCodeBlocks()` targets any `pre > code`, so it's language-agnostic and `language-kotlin` works automatically.

**Result: zero new CSS and zero new JavaScript.** No Android-green theme, and no Compose-specific files.

## 4. Course structure

| # | Lesson | Covers | Status |
|---|---|---|---|
| 1 | Getting Started with Jetpack Compose | what Compose is, @Composable, Text, Icon, modifiers, Preview | **Published** |
| 2 | Building Your First Screen | Column, Row, Box, Spacer, padding, size, backgrounds, alignment | Coming soon |
| 3 | Making the Screen Interactive | Button, remember, mutableStateOf, text fields, switches, state-driven UI | Coming soon |
| 4 | Working with Lists of Data | data classes, LazyColumn, LazyRow, items, keys | Coming soon |
| 5 | Navigation & Multiple Screens | Navigation Compose, routes, passing data | Coming soon |
| 6 | Sharing & Managing State | state hoisting, callbacks, reusable composables, ViewModel | Coming soon |
| 7 | Building Real App Interfaces | scrolling, grids, cards, dialogs, bottom sheets, snackbars, top app bars | Coming soon |
| 8 | Loading Data & MVVM | coroutines, StateFlow, loading/error/success, repositories, ViewModels | Coming soon |
| 9 | Beginner Project | one small, polished Android app | Coming soon |

APIs such as Text, Column, Button, remember and Modifier are topics **inside** lessons, never their own pages.

## 5. URL architecture

```
/learn/android/                                       Android Development
/learn/android/jetpack-compose/                       Jetpack Compose for Beginners
/learn/android/jetpack-compose/getting-started/       Lesson 1
```

No Lesson 2 page and no Kotlin course were created.

## 6. Android landing integration (`/learn/android/`)

- The existing `topic-index` was kept. "Jetpack Compose" moved from a planned item to a full-width **linked `is-available` item** (the site's convention). It has the brief's description, an accent **"1 lesson"** badge, and an arrow linking to `/learn/android/jetpack-compose/`.
- Kotlin, Android Architecture and Interview Preparation remain non-link "Coming soon" items.
- The section heading "Planned Topics" became "Topics", because it now contains an available topic.
- The H1, intro, head and layout are unchanged: no redesign.
- **`/learn/`:** the Android card badge changed from "Roadmap" to **"1 lesson"**, keeping real metadata truthful.

## 7. Compose course landing (`/learn/android/jetpack-compose/`)

- Eyebrow "Android · Jetpack Compose", **H1 "Jetpack Compose for Beginners"**. The subtitle and section lead cover:
  - designed for beginners, with no Compose experience assumed;
  - visual teaching;
  - substantial lessons rather than one API per lesson;
  - each lesson builds toward real Android UI;
  - the final lesson combines the course into one small, polished app.
- CTA: *Start with Lesson 1*.
- **The Course:** the 9 lessons in an ordered path. Lesson 1 is linked; **Lessons 2–9 are non-link** "Coming soon".

## 8. Lesson 1 implementation

`/learn/android/jetpack-compose/getting-started/`
- Eyebrow "Jetpack Compose for Beginners · Lesson 1 of 9", **H1 "Getting Started with Jetpack Compose"**, lead.
- **13 H2 sections:** Hello, Compose! · What Is Jetpack Compose? · Your First Composable · Just a Kotlin Function · Showing Text · Showing an Icon · Arranging with Column · Spacing, dp and sp · Seeing It with Preview · Modifier · Lesson Recap · Tiny Challenge · Coming Up in Lesson 2.
- **16 Kotlin code blocks** (`<pre><code class="language-kotlin">`) and **17 diagrams** (`.diagram`).
- Callouts: 1 note (Android Studio setup), 3 key ideas, 2 tips, 1 takeaway recap, and the challenge callout.
- **Small practical additions** (not in the brief, clearly secondary):
  - where to write and preview the code in Android Studio (*Empty Activity*, `MainActivity.kt`, Split view);
  - a Tip listing the imports the lesson uses, since Android Studio usually adds them via Alt+Enter;
  - a note that newer projects may need the `material-icons-core` dependency for `Icons.Default.Star`.

## 9. Content fidelity

**Source note (stated plainly):** the Lesson 1 content that reached this session is the detailed Lesson 1 specification in the phase brief, sections 6–20. Those sections give the progression, every example, code sample and diagram, the SwiftUI comparisons, the challenge and the Lesson 2 setup. They were treated as the authoritative source and preserved element by element.

Connective prose that the brief describes rather than quotes was written in the lesson's voice. It can be swapped for original wording, if a longer verbatim version exists outside this session, without structural changes.

Fidelity checklist (brief §31):

| Element | Preserved | Where |
|---|---|---|
| "Imagine we want our Android phone to display: Hello, Compose!" | ✅ | §1 + diagram |
| No MVVM / no repositories / no dependency injection / no complicated architecture | ✅ | §1 list |
| Target screen ★ / Hello, Compose! / Build beautiful Android apps | ✅ | §1 diagram |
| "Jetpack Compose is Android's modern toolkit for building user interfaces." | ✅ | §2 (bold) |
| UI examples: Text, Images, Buttons, Lists, Forms, Screens, Animations | ✅ | §2 list |
| Traditional XML + Kotlin/Java, briefly | ✅ | §2 prose + diagram |
| `Text("Hello, Compose!")` contrast + **declarative UI** in beginner terms | ✅ | §2 code + prose |
| Small SwiftUI comparison `Text("Hello, SwiftUI!")` vs `Text("Hello, Compose!")` | ✅ | §2 diagram (only where the source compares) |
| `@Composable fun Greeting() { Text("Hello, Compose!") }` (exact) | ✅ | §3 |
| @Composable = "This function can describe part of the user interface." | ✅ | §3 Key idea |
| Screens: HomeScreen, ProfileScreen, SettingsScreen, LoginScreen · pieces: ProfileCard, UserAvatar, FollowButton, SearchBar | ✅ | §3 diagram |
| "Compose apps are built by combining composable functions." | ✅ | §3 Key idea |
| `fun Greeting() { }` → `@Composable` version; role change; no compiler internals | ✅ | §4 |
| Text progression `Text("Hello!")` → `Text("I'm learning Jetpack Compose!")` → `fontSize = 24.sp` → `FontWeight.Bold` | ✅ | §5 (4 code blocks) |
| Text parameter diagram (What text? / What size? / What weight?), no parameter theory | ✅ | §5 diagram |
| `Icon(imageVector = Icons.Default.Star, contentDescription = "Star")` (exact, with contentDescription explained) | ✅ | §6 |
| Text and Icon are both composables; preview of Button, Image, Card, TextField, Switch (not taught) | ✅ | §6 |
| Need to arrange Icon / Text / Text → `Column` (vertical, top to bottom) | ✅ | §7 diagram + code |
| Column hierarchy diagram (Column ├── Icon ├── Text └── Text) | ✅ | §7 |
| SwiftUI → Compose: `VStack → Column` only, no big table, "introduced gradually" | ✅ | §7 diagram + prose |
| `verticalArrangement = Arrangement.spacedBy(16.dp)` + complete Column example | ✅ | §8 |
| `16.dp → spacing`, `24.sp → text size`, gentle, properly covered later | ✅ | §8 diagram + prose |
| `@Preview(showBackground = true) @Composable fun GreetingPreview() { Greeting() }` (exact) | ✅ | §9 |
| HomeScreen ├── Header ├── WelcomeCard ├── RecentItems └── BottomSection | ✅ | §9 diagram |
| `Text(text = "Hello, Compose!", modifier = Modifier.padding(16.dp))` | ✅ | §10 |
| Modifier affects padding, size, background, click behavior, alignment, borders | ✅ | §10 list |
| Chaining `Modifier.padding(16.dp).fillMaxWidth()`; no modifier-order lesson yet | ✅ | §10 |
| "Modifier changes how a composable looks, behaves, or is laid out." | ✅ | §10 Key idea |
| Recap: @Composable → Composable function / Text/Icon → UI pieces / Column → arranges UI / Modifier → changes layout/appearance/behavior; Screen tree; no need to memorise | ✅ | §11 |
| Tiny Challenge ♥️ / Welcome! / I'm learning Jetpack Compose; Column, Icon, Text, fontSize, FontWeight; centering/polish not the goal; Composable ↓ Composable ↓ Composable; no solution | ✅ | §12 |
| Lesson 2 preview: Column/Row/Box/Spacer, Modifier padding/size/fillMaxWidth/background, Alignment/Arrangement/Colors; not disconnected APIs, one complete attractive screen | ✅ | §13 |
| Explain → visualize → code → experiment → build → challenge | ✅ | §13 diagram |

## 10. Teaching approach

- **Explain → visualize → code → experiment → build → challenge**, closed explicitly at the end of the lesson.
- Each concept gets a plain-language explanation first, then a picture (target screen, trees, parameter questions), then code.
- The lesson builds progressively toward the target screen, and the challenge asks the learner to *compose* rather than polish.
- Beginner tone throughout: no architecture, no compiler internals, dp/sp deferred, modifier order deferred, and future composables named but not taught.

## 11. SwiftUI comparison handling

Exactly the two comparisons the source makes, and nothing more:
1. `Text("Hello, SwiftUI!")` vs `Text("Hello, Compose!")`, introduced as "if you've seen SwiftUI…", with a note that SwiftUI knowledge isn't needed.
2. `VStack → Column`, explicitly framed as introduced gradually and not a mapping table.

Both are `.diagram`s (mixed-language comparisons aren't runnable Kotlin), so they get no Copy button. The lesson remains a standalone Compose lesson.

## 12. Diagram reuse

- All 17 conceptual visuals use the existing `.diagram` primitive:
  - target screens, the XML-vs-Compose split and the SwiftUI comparisons;
  - composable-size examples, the Text-parameter tree and the Icon/Text/Text list;
  - the Column tree, VStack → Column, dp/sp, and the HomeScreen tree;
  - the recap pair, the challenge sketch and composition chain, the Lesson 2 preview and the rhythm line.
- Each has `role="img"` with a descriptive `aria-label`, and is explained in nearby prose.
- Wide lines were re-wrapped so the widest diagram line is 38 characters. **0 of 17 scroll at 360px.**
- The brief's Text diagram (questions only) is used verbatim; the caption maps each question to its parameter.

## 13. Code / Copy integration

- **16 Kotlin blocks**, all `<pre><code class="language-kotlin">`, **no Copy markup in the HTML**. The shared enhancer added exactly one button to each.
- Verified in the browser:
  - **16/16** copy their exact text (captured at `navigator.clipboard.writeText`) and show **✓ Copied**;
  - the full Column example and the apostrophe block (`"I'm learning Jetpack Compose!"`) were compared byte-for-byte: indentation, quotes, braces, punctuation and line breaks exact;
  - buttons return to **icon + Copy** after about 2 s;
  - **Enter** activates with focus retained and the focus ring visible;
  - **0** buttons on the 17 diagrams;
  - Copy buttons sit clear of line 1.
- At 360px, 3 blocks with long lines (imports, `spacedBy`) scroll inside their own box; the page never scrolls.
- `common.js` and the Copy feature were not modified.

## 14. Course navigation

- **Sidebar** follows the Math/Combine scalability rule:
  - **On This Page** (13 entries, live-highlighted);
  - **Jetpack Compose for Beginners** (9 lessons: #1 current with `aria-current="page"`, #2–9 muted non-links);
  - **"← Jetpack Compose for Beginners"** back link.
- Breadcrumbs route back through Android: `TechBuzz Apps / Learn / Android / Jetpack Compose / Getting Started`.
- **Prev / next:** "This is the first lesson" (non-link) and "Coming soon · Lesson 2 — Building Your First Screen" (**non-link**).

## 15. SEO

Both pages have direct-HTML SEO: a unique title, unique meta description, canonical (`https://techbuzzapps.com/learn/android/jetpack-compose/` and `…/getting-started/`), `og:title`, `og:description`, `og:url`, `og:type` (`website` / `article`), `theme-color`, and exactly one H1. All verified in the browser.

## 16. Accessibility

- One H1, H2 per section, and no skipped levels.
- Labelled navs (breadcrumb, On this page, course lessons, lesson navigation). `aria-current` on the breadcrumb and the current lesson.
- Diagrams have meaningful accessible descriptions and nearby prose.
- No meaning relies on emoji or icons: the ★ / ♥️ appear only in sketches, which have text descriptions.
- The Icon example keeps **`contentDescription = "Star"`** and explains why it matters (TalkBack), with a Tip to always describe meaningful icons.
- Copy buttons are real, keyboard-operable buttons. Focus-visible and reduced-motion behaviour are inherited unchanged.

## 17. Responsive behaviour

Validated at **1366 / 820 / 360**:
- no page-level horizontal overflow on any tested URL;
- no `pre` beyond the viewport, and diagrams fit at 360px;
- code scrolls internally only where lines are long;
- the long course title and long sidebar lesson titles wrap cleanly;
- breadcrumbs wrap, and the sidebar collapses above the article below 960px;
- the Android "1 lesson" tile keeps badge and arrow beside a wrapped description.

## 18. Performance impact

- **No new requests, CSS, JS, fonts or images.**
- The two new pages reuse the cached `style.css`, `learn.css` and `common.js`.

## 19. Validation

- Local `python -m http.server`, with `git archive HEAD` (`1c94cf2`) as the pixel baseline.
- Headless Chrome was driven over the DevTools protocol (Node built-in WebSocket, no packages), plus a Python static audit.

| Check | Result |
|---|---|
| HTTP 200: `/learn/`, `/learn/android/`, the Compose landing, Lesson 1, `/learn/ios/`, `/learn/ios/combine/`, Combine Lesson 1, `/learn/ios/swiftui/`, `/learn/math/` | ✅ at 1366, 820 and 360 |
| Shared header/footer, 0 placeholders, Learn `aria-current` (`page` / `true`) | ✅ |
| Breadcrumbs `… / Android / Jetpack Compose / Getting Started` | ✅ |
| Click-through `/learn/` Android card → Android → Jetpack Compose → Lesson 1; sidebar back → landing | ✅ |
| Lessons 2–9 non-links (path `L--------`, 0 future sidebar links, pagination has no link) | ✅ |
| `href="#"`: 0 · broken internal links: 0 · console errors/warnings/failed requests: none | ✅ |
| One H1 · SEO in HTML | ✅ |
| Kotlin blocks 16/16: one button each, exact copy, ✓ Copied, reset to icon + Copy, keyboard | ✅ |
| Diagrams: 17 with 0 Copy buttons, 0 scrolling | ✅ |
| Static audit: braces/parens balanced, no raw `<`, TOC anchors resolve, no duplicate ids, no trailing whitespace | ✅ |
| Pixel-identical vs baseline: `/learn/ios/`, Combine landing + Lesson 1, `/learn/ios/swiftui/`, `/learn/math/` | ✅ at all three widths |
| Expected changes | `/learn/` (Android badge), `/learn/android/` (Compose tile, heading) |
| **Visual inspection** | Android page, Compose landing and Lesson 1 reviewed at 1366 and 360: opening, "What is Compose" with the XML/Compose diagram, Text section, Column + VStack comparison, spacing/complete example, challenge, Lesson 2 preview. No issues. |

## 20. Files added

- `learn/android/jetpack-compose/index.html`
- `learn/android/jetpack-compose/getting-started/index.html`
- `docs/learn/reports/TechBuzzApps_PhaseL2C_Jetpack_Compose_Beginner_Course_Lesson1_Report.md`

## 21. Files modified

- `learn/android/index.html`: Jetpack Compose is now an available, linked topic with a "1 lesson" badge; the section heading is "Topics".
- `learn/index.html`: Android card badge "Roadmap" → "1 lesson".

## 22. Files intentionally not modified

- `assets/css/style.css`, `assets/css/learn.css`, `assets/js/common.js`, `components/*`: **no CSS or JS was needed.**
- All Swift, SwiftUI, Combine and Math content; React, Cloud, AI & Python, System Design and Career; Apps, Dharma Connect and Simply Inspiring.

## 23. Known limitations

- **Source granularity:** see §9. Connective prose the brief described rather than quoted was written in the lesson's voice.
- **Code not compiled in Android Studio here.** The samples use standard Compose APIs (`Text`, `Icon`, `Column`, `Arrangement.spacedBy`, `@Preview`, `Modifier.padding/fillMaxWidth`).
  - The import list uses the standard package names.
  - The icons note reflects that recent Material 3 releases no longer pull in `material-icons-core` automatically.
  - The one-line `verticalArrangement = …` snippet is a parameter fragment, shown as in the source.
- The challenge has no solution or checking, by design.
- The "1 lesson" badges are hand-maintained.

## 24. Recommended next phase

**L2D — Compose Lesson 2: Building Your First Screen** (`/learn/android/jetpack-compose/building-your-first-screen/`). It uses Column, Row, Box and Spacer with padding, size, fillMaxWidth, background, Alignment, Arrangement and Colors to build one complete screen, as Lesson 1 promises. When it ships:
- make the Lesson 1 "next" placeholder, the landing path item and the sidebar entry into links;
- update the badges.

## 25. Git state

- **Before L2C:** clean at `1c94cf2` (Combine L2B committed).
- **After L2C:**
  ```
   M learn/android/index.html
   M learn/index.html
  ?? docs/learn/reports/TechBuzzApps_PhaseL2C_Jetpack_Compose_Beginner_Course_Lesson1_Report.md
  ?? learn/android/jetpack-compose/
  ```
  **All uncommitted changes belong to Phase L2C.** `git diff --check` is clean.
