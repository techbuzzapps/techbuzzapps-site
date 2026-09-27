# TechBuzz Learn — Phase L2B Report
## Combine for Beginners — Course Foundation + Lesson 1

Branch: `feature/TechBuzzLearn` · Nothing committed or pushed.

---

## 1. Objective

Add **Combine for Beginners** as a new iOS learning track (iOS → Combine, not a top-level category), with:
- a course landing page listing all 9 lessons;
- **Lesson 1 — Understanding Combine**, built from the user's Lesson 1 content with the same beginner-first quality as the SwiftUI and Math courses.

## 2. Pre-change git state

`git status --short` was **clean**. All earlier work is committed:

| Commit | Content |
|---|---|
| `0e3d071 Math lessons added` | Phase M1 (Math) |
| `2b7d392 Code copy added` | Phase L2A1 Copy button, including the Copy-icon refinement |
| `9210e77` | SwiftUI lessons |

So there were **no pre-existing uncommitted changes**, and every uncommitted change after this phase belongs to L2B.

## 3. Existing architecture audit

Everything needed already existed and was reused unchanged:

- **Shell:** `site-shell` + shared `site-header` / `site-footer` (via `common.js`) + `site-main`.
- **Course landing pattern:** `page-intro` plus an ordered learning path (`ol.topic-index.is-path`) with linked `is-available` and non-link `is-future` items (SwiftUI, Math).
- **Article template:** breadcrumbs, `article-header page-intro` with eyebrow, sticky `article-sidebar` with `<details>` groups, `data-toc` live highlighting, the `.sidebar-back` route link (from M1), and `article-pagination`.
- **Diagrams:** `figure.diagram > pre[role=img][aria-label]` + `figcaption` (from L2A).
- **Callouts:** key / note / takeaway / challenge.
- **Code + Copy:** `<pre><code class="language-swift">`. `enhanceCodeBlocks()` in `common.js` wraps every `pre > code` in `.code-block` with an icon + "Copy" button (→ "✓ Copied" → reset after 2 s). It never touches `.diagram`.
- **Topic cards:** the iOS landing's `topic-card` with pills and a status badge.

**Result: zero new CSS and zero new JavaScript were needed.**

## 4. Course structure

| # | Lesson | Covers | Status |
|---|---|---|---|
| 1 | Understanding Combine | reactive programming, Publisher → Subscriber, sink, values over time | **Published** |
| 2 | Creating & Transforming Data Streams | Just, sequences, map, filter, compactMap, removeDuplicates | Coming soon |
| 3 | Subjects & Sending Your Own Values | PassthroughSubject, CurrentValueSubject, send() | Coming soon |
| 4 | Combine in a Real iOS Screen | @Published, ObservableObject, user input, validation | Coming soon |
| 5 | Managing Subscriptions | AnyCancellable, store(in:), lifecycle, memory basics | Coming soon |
| 6 | Combining Multiple Publishers | CombineLatest, Merge, Zip | Coming soon |
| 7 | Async Work & Networking | URLSession.dataTaskPublisher, JSON decoding, errors, loading states | Coming soon |
| 8 | Useful Real-World Operators | debounce, throttle, flatMap, switchToLatest, receive(on:) | Coming soon |
| 9 | Beginner Project | a small search app built with Combine | Coming soon |

Publisher, Subscriber, sink, map and AnyCancellable are concepts **inside** lessons, never separate lessons or URLs.

## 5. URL architecture

```
/learn/ios/combine/                          Combine for Beginners (course landing)
/learn/ios/combine/understanding-combine/    Lesson 1
```

Future lessons follow the same pattern. No Lesson 2 page was created.

## 6. iOS landing integration (`/learn/ios/`)

- **New Combine card** between SwiftUI and Interview Preparation, using the existing `topic-card`:
  - the brief's description ("Learn reactive programming through publishers, subscribers, operators, real iOS screens and asynchronous data.");
  - pills: *Understanding Combine* (link to Lesson 1), and *Data Streams* and *Subjects* (Soon, non-link);
  - badge **"1 lesson"**.
- The iOS subtitle and meta/og descriptions now mention Combine (one word each). Nothing else on the page changed.
- To keep real metadata truthful, the iOS card on `/learn/` shows **"4 guides"** (Closures + 2 SwiftUI lessons + Combine Lesson 1) and its description mentions Combine.

## 7. Combine landing (`/learn/ios/combine/`)

- Eyebrow "iOS · Combine", **H1 "Combine for Beginners"**.
- The subtitle and section lead cover: beginner-friendly; no reactive-programming experience needed; values flowing over time; visual pipelines drawn before code; gradual progression to real iOS screens and networking; ending with a small search app.
- CTA: *Start with Lesson 1*.
- **The Course:** the 9 lessons in order with "Lesson N", title and description. Lesson 1 is linked; **Lessons 2–9 are non-link** with "Coming soon".

## 8. Lesson 1 implementation

`/learn/ios/combine/understanding-combine/`
- Eyebrow "Combine for Beginners · Lesson 1 of 9", **H1 "Understanding Combine"**, lead.
- 13 H2 sections: Every Keystroke Is an Event · What Exactly Is Combine? · Publisher · Subscriber · Your First Combine Code · Listening with sink · What Actually Happened? · Combine as a Pipe · Multiple Values · Your First Transformation (H3: Reading longer pipelines) · Keeping a Subscription · Three Ideas to Remember (H3s: Publisher / Subscriber / Operator) · Tiny Challenge.
- **8 Swift code blocks, 30 diagrams** (including 4 console outputs), 5 callouts (3 key idea, 2 note), 1 challenge callout.
- One practical addition: a Note on running the examples in an Xcode Playground.

## 9. Content fidelity

**Source note (stated plainly):** the Lesson 1 content that reached this session is the detailed Lesson 1 specification in the phase brief, sections 7–19. That covers the full progression, every analogy, every diagram and code sample, the exact wording of key lines, and the challenge. It was treated as the source and preserved element by element.

Where the brief summarises rather than quotes, the passage was written in the lesson's voice, most notably:
- the water-pipe analogy ("The original lesson uses a water-pipe analogy. Keep that analogy.");
- the connective prose between diagrams.

If a longer verbatim original exists outside this session, those passages can be replaced without changing structure.

Fidelity checklist (brief §33):

| Element | Preserved? | Where |
|---|---|---|
| Search-box opening (S → Sw → Swi → Swif → Swift) | ✅ | §1 diagram |
| User types → … → Update screen flow | ✅ | §1 diagram |
| "Values changing over time are at the heart of Combine" | ✅ | §1 Key idea |
| Publisher → Value → Subscriber goal | ✅ | end of §1 |
| Apple's definition, made approachable | ✅ | §2 |
| **YouTube subscription analogy** (not replaced) + mapping to Publisher/value/Subscriber | ✅ | §2, two diagrams |
| Publisher produces values that change over time | ✅ | §3 |
| Temperature 24 → 25 → 27 → 26 °C | ✅ | §3 diagram |
| Search-field stream "S" → "Sw" → "Swi" → "Swift" | ✅ | §3 diagram |
| Network activity Request → Loading → Response | ✅ | §3 diagram |
| "All involve events happening over time" | ✅ | §3 |
| Subscriber receives values; Publisher │ sends value ↓ Subscriber | ✅ | §4 diagram |
| Temperature Publisher │ 27°C ↓ Screen; *"The temperature is now 27°C."* | ✅ | §4 |
| `import Combine` | ✅ | §5 code |
| `let publisher = Just("Hello Combine!")`, as a simple publisher with one value | ✅ | §5 code + diagram |
| "Nobody is listening yet" | ✅ | §5 |
| `sink` example (exact code) + output `Hello Combine!` | ✅ | §6 |
| "Your first Combine pipeline" | ✅ | §6 |
| Just → sink → print() trace, simplified to Publisher → Subscriber, with parts named | ✅ | §7 |
| **Pipe mental model** (water-pipe analogy kept) | ✅ | §8 |
| Transform / Filter between publisher and subscriber; the word *operators*; no catalogue | ✅ | §8 |
| Just = one value; `[1, 2, 3, 4, 5].publisher` sink (exact) + output 1–5 | ✅ | §9 |
| Each value flowing to sink visualised | ✅ | §9 diagram |
| "Do this / then this / then this" vs "When a value arrives → do something with it" | ✅ | §9 two diagrams + Key idea |
| `map` example: publisher sends 5, subscriber receives 10 (exact code) + result 10 | ✅ | §10 |
| Just(5) → Publisher → 5 → map { × 2 } → 10 → sink diagram | ✅ | §10 |
| Intimidating `.map(...).filter(...).debounce(...).sink(...)` pipeline demystified as VALUE → change it → check it → wait → receive it | ✅ | §10 H3 |
| AnyCancellable preview: unused-result warning, `let cancellable = Just("Hello")…` (exact), "kept alive while we want values", reassurance about a later lesson | ✅ | §11 (+ Note pointing to Lesson 5) |
| No cancellable sets / lifecycle architecture / retain-cycle deep dives | ✅ | — |
| Three ideas recap: Publisher / Subscriber / Operator, each with its diagram, then Publisher → Values → Operators → Subscriber | ✅ | §12 |
| Tiny challenge code (exact) + tracing prompt 1 → ×10 → ? … 4 → ×10 → ? | ✅ | §13 |
| No answer shown, no Submit, no engine | ✅ | §13 |

## 10. Teaching approach

The lesson follows **Understand → Visualize → See Code → Trace the Data → Experiment → Challenge**:
- every concept is introduced in plain language;
- then drawn as a pipeline;
- then shown in code;
- then traced value by value ("Trace the value from top to bottom");
- the learner is asked to predict and verify (the challenge).

The tone is patient and conversational and assumes no reactive-programming knowledge. Operators appear only when they solve a problem (`map` doubles 5 → 10). `filter` and `debounce` are only *read*, to remove intimidation, and are explicitly deferred to later lessons.

## 11. Diagram reuse

- All 30 conceptual diagrams use the existing `.diagram` primitive, including the flow charts, analogy, pipelines, value traces, three-ideas recap and tracing prompt.
- Each diagram's `pre` has `role="img"` and a sentence-length `aria-label`. Captions and surrounding prose explain every diagram in words.
- **Console output** (`Hello Combine!`, `1…5`, `10`) is also rendered as a captioned `.diagram` ("Console output."). It's program output, not source code, so it deliberately gets no Copy button.
- No Combine-specific diagram system and no new CSS. Diagrams stay within 360px without scrolling (measured: 0 of 30 scroll).

## 12. Code-block / Copy integration

- All 8 Swift samples use `<pre><code class="language-swift">`. **No Copy markup was written into the lesson**: the shared `enhanceCodeBlocks()` added exactly one button to each.
- Verified in the browser:
  - **8/8** blocks copy their **exact** code text, captured at the `navigator.clipboard.writeText` call; the challenge block was also compared byte-for-byte against the brief;
  - each shows **✓ Copied** and returns to **icon + Copy** after about 2 s;
  - buttons sit clear of line 1;
  - keyboard activation works with **Enter** and **Space**, and focus stays on the button;
  - **0** Copy buttons on the 30 diagrams.
- Regression: Closures (7) and SwiftUI Lesson 1 (9) still show one button per block.
- `common.js` and the Copy-icon refinement were not touched.

## 13. Course navigation

- **Lesson sidebar** follows the Math scalability rule, showing only:
  - **On This Page** (13 sections, live-highlighted);
  - **Combine for Beginners** (9 short titles: #1 current with `aria-current="page"`, #2–9 muted **non-links**);
  - **"← Combine for Beginners"** back link.
- Breadcrumbs give the route back to iOS: `TechBuzz Apps / Learn / iOS / Combine / Understanding Combine`.
- **Prev / next:**
  - previous is "This is the first lesson" (non-link);
  - next is "Coming soon · Lesson 2 — Creating & Transforming Data Streams" (**non-link**).

## 14. SEO

Both pages carry direct-HTML SEO: a unique `<title>`, unique meta description, canonical (`https://techbuzzapps.com/learn/ios/combine/` and `…/understanding-combine/`), `og:title`, `og:description`, `og:url`, `og:type` (`website` for the landing, `article` for the lesson), `theme-color`, and exactly one H1. Verified in the browser at all widths.

## 15. Accessibility

- One H1 per page, H2 per section, and H3 only for sub-parts.
- Labelled landmarks: breadcrumb, `aside "Lesson contents"`, `nav "On this page"`, `nav "Combine for Beginners lessons"`, `nav "Lesson navigation"`. `aria-current` on the breadcrumb and the current lesson.
- Diagrams have descriptive `aria-label`s and are always explained in nearby prose.
- No emoji or icons carry meaning: the lesson contains no emoji, and the Copy icon is `aria-hidden` next to its text.
- Copy buttons are real `<button>`s and keyboard-operable, with the focus ring intact. Copy results are announced once via the shared status region.
- Future lessons are labelled "Coming soon" in text and are never links.
- Reduced-motion behaviour is inherited unchanged.

## 16. Responsive behaviour

Validated at **1366 / 820 / 360**:
- **no page-level horizontal overflow** on any tested URL;
- no `pre` extends past the viewport;
- 0 of 30 diagrams need horizontal scrolling at 360px, and code blocks fit or scroll internally;
- Copy buttons stay clear of line 1 and remain tappable;
- long lesson titles and names such as `CurrentValueSubject` and `URLSession.dataTaskPublisher` wrap inside their path tiles;
- breadcrumbs wrap, and the sidebar collapses above the article below 960px (existing behaviour).

## 17. Performance impact

- **Zero new requests:** no CSS, JS, fonts or images were added.
- The two new pages reuse the cached `style.css`, `learn.css` and `common.js`.

## 18. Validation

- Local `python -m http.server`. The committed tree (`0e3d071`) was exported via `git archive` as a pixel baseline.
- Headless Chrome was driven over the DevTools protocol (Node built-in WebSocket, no packages). The static audit was done with Python.

| Check | Result |
|---|---|
| HTTP 200: `/learn/`, `/learn/ios/`, `/learn/ios/combine/`, Lesson 1, `/learn/ios/swift/`, `/learn/ios/swiftui/`, Closures, SwiftUI Lesson 1, `/learn/math/`, Math Lesson 1 | ✅ at 1366, 820 and 360 |
| Shared header/footer, 0 placeholders, Learn `aria-current` (`page` / `true`) | ✅ |
| Breadcrumbs `… / iOS / Combine / Understanding Combine` | ✅ |
| iOS Combine card → landing → Lesson 1; sidebar back link → landing | ✅ click-through |
| Lessons 2–9 non-links (landing path `L--------`, 0 future sidebar links, pagination has no link) | ✅ |
| `href="#"`: 0 · broken internal links: 0 · console errors/warnings/failed requests: none | ✅ |
| One H1 · SEO direct in HTML | ✅ |
| Code blocks: 8/8 one Copy button each, exact copy, ✓ Copied, reset, keyboard | ✅ |
| Diagrams: 30 with 0 Copy buttons, 0 scrolling at 360 | ✅ |
| Static audit: braces/parens balanced, no raw `<` in code, TOC anchors all resolve, no duplicate ids | ✅ |
| `git diff --check`, and no trailing whitespace in new files | ✅ clean |
| Pixel-identical vs baseline: Swift, SwiftUI, Closures, SwiftUI Lesson 1, Math landing, Math Lesson 1 | ✅ at all three widths |
| Expected changes | `/learn/` (iOS badge/description), `/learn/ios/` (Combine card, subtitle) |
| **Visual inspection** | Combine landing and Lesson 1 reviewed at 1366 and 360 (course path, YouTube analogy, sink + console output, long-pipeline demystification, multiple values, challenge). No issues found. |

## 19. Files added

- `learn/ios/combine/index.html`
- `learn/ios/combine/understanding-combine/index.html`
- `docs/learn/reports/TechBuzzApps_PhaseL2B_Combine_Beginner_Course_Lesson1_Report.md`

## 20. Files modified

- `learn/ios/index.html`: Combine card, subtitle and meta/og description mention Combine.
- `learn/index.html`: iOS card badge "3 guides" → "4 guides", description mentions Combine.

## 21. Files intentionally not modified

- `assets/css/style.css`, `assets/css/learn.css`, `assets/js/common.js` and `components/*`: **no CSS or JS changes were needed.**
- All Math, Swift and SwiftUI content; Android, React, Cloud, AI & Python, System Design and Career; the Apps homepage, Dharma Connect and Simply Inspiring.

## 22. Known limitations

- **Source granularity:** see §9. Passages the brief summarised (chiefly the water-pipe analogy's wording) were written in the lesson's voice, and can be swapped for the original wording if a longer verbatim version exists.
- **Code not run in Xcode here.** All samples use long-standing Combine APIs (`Just`, `Sequence.publisher`, `map`, `sink`, `AnyCancellable`) and match the brief exactly.
  - The illustrative `.map(...).filter(...).debounce(...).sink(...)` block is a *shape*, not compilable code. The prose presents it as such.
  - The Xcode warning text is quoted as *"Result of call to 'sink(receiveValue:)' is unused"*.
- The challenge has no answer or checking by design.
- The "1 lesson" / "4 guides" badges are hand-maintained.

## 23. Recommended next phase

**L2C — Combine Lesson 2: Creating & Transforming Data Streams** (`/learn/ios/combine/creating-transforming-data-streams/`). It builds directly on Lesson 1's `Just`, `.publisher` and `map`, adding `filter`, `compactMap` and `removeDuplicates`, with the same diagram-before-code tracing. When it ships:
- turn the Lesson 1 "next" placeholder, the landing path item and the sidebar entry into links;
- update the badges.

## 24. Git state

- **Before L2B:** clean (M1, L2A1 and the Copy-icon refinement already committed).
- **After L2B:**
  ```
   M learn/index.html
   M learn/ios/index.html
  ?? docs/learn/reports/TechBuzzApps_PhaseL2B_Combine_Beginner_Course_Lesson1_Report.md
  ?? learn/ios/combine/
  ```
  **All uncommitted changes belong to Phase L2B.** `git diff --check` is clean.
