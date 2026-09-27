# TechBuzz Learn — Phase M1 Report
## Math Learning Path Foundation + Lessons 1 & 2

Branch: `feature/TechBuzzLearn` · Nothing committed or pushed.

---

## 1. Objective

Add **Math** as a first-class TechBuzz Learn category: a complete beginner-to-advanced path built on *intuition first*. This phase:

- publishes the path overview, the Level 1 (Foundations) page, and **Lesson 1 — What Are Numbers?** and **Lesson 2 — Addition and Subtraction**;
- chooses a mathematical-notation architecture that will still work at Level 7 (calculus).

## 2. Existing architecture audit

- **Git before M1:** `git status --short` was **clean**. Phase L2A1 (code Copy button) is committed as `2b7d392 Code copy added`. No uncommitted work existed, so nothing was at risk.
- **Shell:** `site-shell` body, shared `site-header` / `site-footer` components loaded by `assets/js/common.js`, and `site-main`. Reused unchanged.
- **Learn system (`learn.css`):**
  - topic cards and the `.topic-index` (with the `.is-path` learning-path variant from L2A);
  - `.article-layout` with sticky sidebar and `data-toc` highlighting;
  - `.article-header.page-intro`, callouts (key / note / tip / takeaway / challenge), `.diagram`, and `.article-pagination`.
- **L2A1 Copy button:** `enhanceCodeBlocks()` in `common.js` targets **only `pre > code`**, skips `.diagram`, and is idempotent. Not modified.
- **Math notation:** nothing existed. The repo had no math renderer, no CDN usage and no third-party scripts at all.

## 3. Math teaching philosophy

**Build intuition first.** Every idea begins with something the learner can picture (apples, cats, chocolates, money, steps on a line). Only after that come the symbols, and only after the idea is understood does it get a name (e.g. "inverse operations").

The written loop implemented in M1 is: Explain → Visualize → Worked example → Key idea → Recap → Practice. "Check understanding / explain mistakes / master" need an interactive engine and are deliberately **not** faked.

**Voice:**
- Written for someone who believes "I was never good at maths": patient, non-judgmental, not childish.
- Lesson 1 addresses that learner directly.
- It never says "obvious", "trivial" or "you should know".
- Terminology comes after intuition.

## 4. Curriculum structure

| Level | Name | Topics | M1 status |
|---|---|---|---|
| 1 🌱 | Foundations | Numbers · Addition and Subtraction · Multiplication · Division · Tables · Order of Operations | **Active** (Lessons 1–2 published) |
| 2 🍕 | Everyday Maths | Fractions · Decimals · Percentages · Ratios · Averages · Profit and Loss · Simple Interest | Coming soon |
| 3 🧩 | Pre-Algebra | Negative Numbers · Powers · Roots · Factors · Variables · Simple Equations | Coming soon |
| 4 ✏️ | Algebra | Linear Equations · Inequalities · Polynomials · Quadratic Equations · Functions · Graphs · Sequences | Coming soon |
| 5 📐 | Geometry & Trigonometry | Angles · Triangles · Circles · Area · Volume · Coordinate Geometry · Pythagoras · Sin/Cos/Tan | Coming soon |
| 6 🚀 | Higher Maths | Logarithms · Advanced Functions · Permutations & Combinations · Probability · Statistics · Vectors · Matrices · Complex Numbers | Coming soon |
| 7 ∫ | Calculus | Limits · Derivatives · Applications of Derivatives · Integration · Differential Equations | Coming soon |
| Beyond | — | Linear Algebra · Multivariable Calculus · Discrete Mathematics · Number Theory · Probability Theory | Coming soon |

Level 1 lesson sequence: (1) What Are Numbers? **published**, (2) Addition and Subtraction **published**, (3) Multiplication, (4) Division, (5) Tables, (6) Order of Operations — the last four coming soon.

## 5. URL architecture

```
/learn/math/                                     Math Learning Path (big picture)
/learn/math/foundations/                         Level 1 (current level)
/learn/math/foundations/what-are-numbers/        Lesson 1
/learn/math/foundations/addition-subtraction/    Lesson 2
```

- Concepts such as natural numbers, zero, the equals sign and the number line are **sections inside lessons**, never their own URLs (same principle as SwiftUI).
- Future levels follow the same pattern, e.g. `/learn/math/everyday-maths/…`.

## 6. Math landing implementation (`/learn/math/`)

- **Header:** eyebrow "TechBuzz Learn · Math", **H1 "Math Learning Path"**, and a subtitle (from the very beginning to calculus, no formulas or school maths assumed, one clear lesson at a time). CTAs: *Start with Lesson 1* and *View Level 1 — Foundations*.
- **"How This Path Works":** two short paragraphs on intuition first and the lesson rhythm, plus where to start.
- **"The Seven Levels":** an ordered learning path (`ol.topic-index.is-path`).
  - Level 1 is a linked tile ("Level 1 · 2 lessons available").
  - Levels 2–7 are **non-link** items with their topic list and a "Coming soon" badge.
  - Level emoji are `aria-hidden`.
- **"Beyond the Learning Path":** five non-link Coming soon items.
- **Learn landing (`/learn/`)** — minimal wording changes only:
  - H1 "Learn Software Development" → **"Learn Technology & Mathematics"**;
  - subtitle → "Learn technology and mathematics from the fundamentals, one clear lesson at a time — written by the team building TechBuzz Apps.";
  - meta description and `og:description` updated;
  - a **Math** card added with the existing topic-card design: `∑` in the shared icon tile, the brief's description, and a "2 lessons" badge.
  - Brand, hero layout and CTAs are unchanged.

## 7. Foundations landing implementation (`/learn/math/foundations/`)

- Eyebrow "Math Learning Path · Level 1 of 7", **H1 "Level 1 — Foundations"**, and a subtitle describing the level.
- **Lessons:** an ordered path of 6 lessons, each with a "Lesson N" label, title and one-line description. Lessons 1–2 are real links; 3–6 are non-link "Coming soon".
- **After Foundations:** points to Level 2 (coming soon) and links back to the Math Learning Path.

## 8. Lesson 1 implementation — What Are Numbers?

`/learn/math/foundations/what-are-numbers/` — eyebrow "Maths from Beginner to Advanced · Lesson 1", H1 "What Are Numbers?". It follows the user's progression:

1. **How This Course Works** (concise): beginning-to-advanced, no assumed formulas, intuition first, and the ½ + ¼ = ¾ pizza example as a real MathML fraction.
2. **Counting Things:** 🍎🍎🍎 → **3**. A number is a symbol for a quantity. *Key idea.*
3. **Putting Numbers Together:** 🍎🍎🍎 + 🍎🍎 → **3 + 2 = 5**, with each part explained (numbers, +, =, result). *Note:* "=" means both sides are the same amount (groundwork for algebra).
4. **Natural Numbers:** 1, 2, 3, … and why there is no biggest one.
5. **Zero and Whole Numbers:** the chocolate example **5 − 5 = 0**, where zero means *none* (− is previewed as "taking away", explored in Lesson 2); then whole numbers 0, 1, 2, …. *Key idea.*
6. **Recap** (takeaway callout).
7. **Your First Mini Exercise:** exactly 7 + 5, 10 − 6, 4 + 3 + 2, and the 8-chocolates thinking question. **No answers shown**, no inputs, no Submit, no score.

Excluded as instructed: set theory, Peano axioms, the "is 0 natural?" debate, integers, rationals, number-system taxonomy.

## 9. Lesson 2 implementation — Addition and Subtraction

`/learn/math/foundations/addition-subtraction/` — H1 "Addition and Subtraction". It follows the user's progression:

1. **Addition Means Combining:** 🐱 × 6, then 3 more arrive → **6 + 3 = 9**.
2. **The Number Line:** 0–10, right is bigger and left is smaller.
3. **Adding on the Number Line:** start at 6 and take three +1 steps right to 9. *Key idea: adding moves right.*
4. **Subtraction:** two meanings, with **taking away** (₹10, spend ₹4 → **10 − 4 = 6**) and **finding the difference** (10 vs 4 marbles → 6).
5. **Subtracting on the Number Line:** start at 10 and take four −1 steps left to 6. *Key idea: subtracting moves left.*
6. **Opposite Operations:** 6 + 4 = 10 therefore 10 − 4 = 6. The relationship and the number-line "there and back" come first; the term **inverse operations** comes after. *Key idea* + a *Tip* on checking subtraction by adding back.
7. **Longer Calculations:** work left to right, shown with 5 + 4 − 3. This example deliberately overlaps no practice question, so no answer is revealed.
8. **Recap.**
9. **Your Turn:** exactly the five exercises: 18 + 7; 25 − 9; 12 + 8 − 5; the ₹50 / ₹18 thinking question; and the "slightly tricky" 20 − 7 + 4. **No answers**, and no tutoring-conversation content.

## 10. Math rendering decision

**Chosen: native MathML (`<math>`), written directly in the HTML. No library, no CDN, no JavaScript.**

| Option | Verdict |
|---|---|
| **MathML Core** | ✅ **Chosen.** W3C standard, supported natively in Chrome/Edge 109+, Firefox and Safari. <br>Zero bytes of dependency and no runtime, so it renders even if JS fails (important because every Learn page already defers JS). <br>Indexable, selectable, and exposed to screen readers as mathematics. <br>It covers the whole curriculum through Level 7: fractions `mfrac`, powers/indices `msup`/`msub`, roots `msqrt`/`mroot`, limits `munder` (lim with x→0), integrals `∫` + `msubsup`, matrices `mtable`, and Greek/operators as `mi`/`mo`. |
| KaTeX (CDN) | ❌ ~280 KB of JS + CSS + fonts from a third party; client-side rendering; raw LaTeX visible if the script fails. It would be the site's first external runtime dependency. |
| MathJax (CDN) | ❌ Heavier still, for the same reasons. |
| Hand-styled HTML/CSS | ❌ Works for `3 + 2 = 5` but cannot scale to fractions, roots, integrals or matrices. It would have to be replaced later. |

- **Authoring trade-off (honest):** MathML is verbose to hand-write compared with LaTeX. For M1's arithmetic it is trivial. For later levels, the recommended workflow is to **author in LaTeX and convert once, at writing time**, with a LaTeX → MathML converter (e.g. Temml or LaTeXML run locally), pasting the static MathML into the page. That keeps LaTeX-style authoring without adding a runtime library, npm or a build system to the site.
- **Proof it scales:** Lesson 1 already renders a stacked fraction (½ + ¼ = ¾), verified in the browser (numerator box sits above the denominator box).
- **Fonts:** browsers use their built-in `math` font family (Cambria Math on Windows, STIX Two Math on Apple platforms). No web font is downloaded.

## 11. Equation treatment

- **Inline math:** `<math>` inside a sentence (e.g. "To work out 6 + 3, …"). Slightly enlarged (1.08em), in the primary text colour.
- **Display math:** `<div class="math-display"><math display="block">…</math></div>`, centred at 1.5em on a light surface with a subtle border and `overflow-x: auto`. It is visually unlike code: no monospace, no dark code background, no Copy button.
- **Correct symbols:** true minus `−` (U+2212), `=`, `…`, and `?` for unknowns in practice questions (`<mo>?</mo>`).
- **Practice questions:** `ol.practice-list` inside the existing `callout-challenge`, with equations at 1.2em.

## 12. Number-line / visual treatment

Three small, reusable primitives were added to `learn.css` (section **7b. Math**), all generic and extensible:

- **`.math-figure`:** wrapper (`<figure>` + `<figcaption>`) for any math visual, now and later (fraction models, geometry, graphs).
- **`.quantity`:** concrete objects (`.quantity-group`, `.quantity-operator`, `.quantity-result`) on a dashed light surface. The row has `role="img"` with a meaningful `aria-label` ("Three apples plus two apples"). The emoji are `aria-hidden`, and a visible caption plus the surrounding text carry the meaning.
- **`.number-line`:** pure semantic HTML + CSS, with no SVG, canvas or JS.
  ```html
  <ol class="number-line-track">
    <li class="is-start" data-tag="Start"><span>6</span></li>
    <li class="is-step" data-hop="+1"><span>7</span></li>
    <li class="is-step is-end" data-hop="+1" data-tag="End"><span>9</span></li>
  </ol>
  ```
  - `data-hop` (`+1` / `−1`) and `data-tag` (`Start` / `End`) are rendered by CSS **as text**, so direction and endpoints are never conveyed by colour alone.
  - Each figure also has `role="img"` with a full sentence description ("Start at 10, then take four steps left, to 9, 8, 7 and 6…") and a visible caption with the steps and direction ("Subtracting moves **left**").
  - Labels are absolutely positioned so a wide "START" never widens its column.
  - The article's list spacing is explicitly neutralised, so numbers stay on one line.

## 13. Article-system reuse

Math lessons use the SwiftUI/Swift article template unchanged:
- breadcrumbs;
- `article-header page-intro` with eyebrow (series · lesson number), H1 and lead;
- the sticky sidebar with `<details>` groups and `data-toc` live highlighting (verified);
- H2 sections, existing callouts (key / note / tip / takeaway / challenge), and `article-pagination`.

No Math-specific article design, stylesheet or JS was created.

## 14. Course navigation

**Big picture → current level → current lesson:**

- `/learn/math/` shows all 7 levels plus Beyond.
- `/learn/math/foundations/` shows the 6 Level 1 lessons.
- Lesson sidebars show only:
  - **On This Page**;
  - **Level 1 — Foundations** (6 items: current with `aria-current="page"`, a link to the other published lesson, and 4 muted non-links);
  - a **"← Math Learning Path"** link (new small `.sidebar-back` rule).
- The full curriculum is never expanded above an article, so on mobile only 7–9 + 6 short items precede the lesson.

**Prev / next:**

| Page | Previous | Next |
|---|---|---|
| Lesson 1 | "This is the first lesson" (non-link) | **Lesson 2 — Addition and Subtraction** (link) |
| Lesson 2 | **Lesson 1 — What Are Numbers?** (link) | "Coming soon · Lesson 3 — Multiplication" (**non-link**) |

## 15. Interaction with the Code Copy feature

- Math is never marked up as `pre > code`, so `enhanceCodeBlocks()` never touches it. `common.js` was not modified.
- Verified on all 4 Math pages at 3 widths: `pre > code` = 0, Copy buttons = 0, and no Copy button inside `.math-display`, `.math-figure`, `math` or `.practice-list`.
- **L2A1 regression check:** every Swift code block on Closures (7), SwiftUI Lesson 1 (9) and SwiftUI Lesson 2 (14) — **30/30** — still gets exactly one button.
  - Clicking each sends the **exact** code text to the clipboard (captured at `navigator.clipboard.writeText`) and shows "✓ Copied".
  - No console or network errors.

## 16. SEO

Each new page has, directly in its HTML:
- a unique `<title>` (e.g. *What Are Numbers? — Maths from Beginner to Advanced, Lesson 1 — TechBuzz Apps*);
- a unique meta description;
- canonical `https://techbuzzapps.com/learn/math/…/`;
- `og:title`, `og:description`, `og:url`;
- `og:type` (`website` for the two landing pages, `article` for lessons);
- `theme-color`;
- exactly one H1.

MathML means equations are plain indexable text in the HTML (e.g. "3 + 2 = 5"), not images or script output.

## 17. Accessibility

- One H1 per page, H2 per section, and H3 only for Lesson 2's "Taking away" / "Finding the difference".
- Labelled landmarks: breadcrumb nav, `aside "Lesson contents"`, `nav "On this page"`, `nav "Level 1 — Foundations lessons"`, `nav "Lesson navigation"`. `aria-current="page"` on the breadcrumb and the current lesson.
- **Math** is native MathML, which screen readers present as mathematics (VoiceOver natively; NVDA/JAWS with their math support).
- **Visuals:**
  - quantities and number lines have `role="img"` with descriptive labels;
  - emoji are hidden from assistive tech;
  - every visual is also explained in visible text and a caption;
  - hop and start/end markers are text, not just colour.
- Future levels and lessons are labelled "Coming soon" in text and are never links. No `href="#"` anywhere.
- Focus-visible, skip link and reduced-motion handling are inherited from the shell. The Math CSS adds no animation.

## 18. Responsive behaviour

Validated at **1366 / 820 / 360**:
- **No page overflow** on any tested URL.
- **Number lines** (0–10) fit without any scrolling at all three widths: on phones the circles shrink to 26px and padding tightens. The line is verified centred through the numbers at every width, and `overflow-x: auto` remains as a safety net.
- **Equations and fractions:** centred display boxes that scroll internally if a future equation is too wide.
- **Quantities** wrap. The learning-path lists stack cleanly with badges beside the text. Breadcrumbs wrap. Practice lists stay readable.

## 19. Performance impact

- **Zero new requests:** no library, font, image or script.
- CSS: roughly +300 lines in the already-cached `learn.css`. JS: none added.
- MathML renders natively, so there is no layout shift from client-side typesetting.

## 20. Validation

Local `python -m http.server`. The committed tree (`2b7d392`) was exported via `git archive` as a pixel baseline. Headless Chrome was driven over the DevTools protocol (Node built-in WebSocket, no packages).

| Check | Result |
|---|---|
| HTTP 200: `/learn/math/`, `/learn/math/foundations/`, both lessons, `/`, `/learn/`, `/learn/ios/swiftui/` (+ both lessons), `/learn/ios/swift/closures/` | ✅ at 1366, 820 and 360 |
| Shared header/footer inserted, 0 placeholders, Learn `aria-current` (`page` on `/learn/`, `true` on Math pages) | ✅ |
| Breadcrumbs: `… / Learn / Math / Foundations / <lesson>` | ✅ |
| Click-through: `/learn/` Math card → `/learn/math/` → Level 1 → Lesson 1 → (next) Lesson 2 → (prev) Lesson 1; Foundations → Lesson 2; sidebar "← Math Learning Path" | ✅ all resolve |
| Lesson 3 / future lessons / future levels are non-links (path shows `L------` and `LL----`; no Multiplication link; 0 future sidebar links) | ✅ |
| `href="#"`: 0 · broken internal links: 0 · console errors/warnings/failed requests: none | ✅ |
| MathML: `<math>` is a `MathMLElement`, fraction stacked, `math` font family | ✅ |
| Math / number-line / quantity Copy buttons | 0 |
| Swift Copy regression | 30/30 exact |
| TOC highlighting on Math lessons | ✅ |
| One H1, SEO in HTML | ✅ all pages |
| Page-level horizontal overflow | none at any width |
| Unchanged vs baseline: `/`, `/learn/ios/swiftui/`, both SwiftUI lessons, Closures | **pixel-identical** at all three widths |
| Expected change | `/learn/` (wording + Math card) |
| **Visual inspection** | Screenshots of all four Math pages at 1366 and 360 (and a number line at 820) reviewed by eye. Two issues found and fixed: (1) a Start/End label widening number-line columns on mobile, (2) the article's `li + li` spacing lowering every number except 0. |

## 21. Files added

- `learn/math/index.html`
- `learn/math/foundations/index.html`
- `learn/math/foundations/what-are-numbers/index.html`
- `learn/math/foundations/addition-subtraction/index.html`
- `docs/learn/reports/TechBuzzApps_PhaseM1_Math_Learning_Path_Foundation_Report.md`

## 22. Files modified

- `learn/index.html`: hero wording (H1, subtitle), meta/og description, new Math card.
- `assets/css/learn.css`:
  - new section **7b. Math** (`math`, `.math-display`, `.math-figure`, `.quantity*`, `.number-line*`, `.practice-list`) plus phone sizing for number lines;
  - `.article-sidebar .sidebar-back`;
  - contents list updated.

## 23. Files intentionally not modified

- `assets/js/common.js` (the L2A1 Copy logic is untouched), `assets/css/style.css`, and `components/*`.
- The Apps homepage, `dharmaconnect/**`, `simplyinspiring/**`.
- All Swift and SwiftUI lesson content, and Android, React, Cloud, AI & Python, System Design and Career pages.

## 24. Known limitations

- **Lesson prose** was written from the brief's detailed progression, examples and exercises (all examples and every practice question are exactly as specified). No longer verbatim source text was supplied, so a hand-written draft could be swapped in without layout changes.
- **MathML authoring is verbose.** Fine for arithmetic. From Level 2 onward, adopt the author-in-LaTeX, convert-once workflow (§10) so notation stays maintainable.
- **Rendering depends on the system math font.** Current Chrome, Edge, Firefox and Safari are all fine. Very old browsers (pre-2023 Chromium) would show the symbols inline without 2-D layout. Plain arithmetic still reads correctly, but a fraction would not.
- **Screen-reader math support varies:** VoiceOver is strong; NVDA and JAWS need their math add-ons or recent versions. The surrounding prose always states the key results in words.
- **Practice is static:** no answers, checking, hints or scoring (by design). The "check understanding / explain mistakes / master" parts of the loop await an interactive practice phase.
- The "2 lessons" badges on `/learn/` and `/learn/math/` are maintained by hand.

## 25. Recommended next phase

**M2 — Lesson 3: Multiplication** (`/learn/math/foundations/multiplication/`): repeated addition, equal groups and arrays, reusing `.quantity` and the number line (jumps of equal size). When it ships:
- turn the Lesson 2 "next" placeholder, the Foundations list item and both sidebars into links;
- update the badges.

Separately, before Level 2 (fractions), design the next math visual primitive, a **fraction model** (`.math-figure` + an area/pizza model), and confirm the LaTeX → MathML authoring workflow on a real fraction-heavy lesson.

---

## Directory tree (relevant parts)

```
techbuzzapps-site/
├── assets/css/learn.css                                  [modified]  +7b Math primitives, +sidebar-back
├── learn/
│   ├── index.html                                        [modified]  wording + Math card
│   └── math/                                             [new]
│       ├── index.html                                    Math Learning Path (7 levels + Beyond)
│       └── foundations/
│           ├── index.html                                Level 1 — Foundations (6 lessons)
│           ├── what-are-numbers/index.html               Lesson 1
│           └── addition-subtraction/index.html           Lesson 2
└── docs/learn/reports/
    └── TechBuzzApps_PhaseM1_Math_Learning_Path_Foundation_Report.md   [new]
```

## Git state

- **Before M1:** clean. L2A1 was already committed (`2b7d392`), so there were no pre-existing uncommitted changes.
- **After M1:** `M assets/css/learn.css`, `M learn/index.html`, `?? learn/math/`, and `??` this report. **All uncommitted changes belong to Phase M1.**
