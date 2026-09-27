# TechBuzz Learn — Phase L2C1 Report
## Android Landing Page — Match the iOS Course-Card Architecture

Branch: `feature/TechBuzzLearn` · Nothing committed or pushed.

---

## Git state before this phase

`git status --short` was **clean**. Jetpack Compose L2C is committed (`de45421`), and GCP L2D is committed on top of it (`4863806 gcp added`). No L2C or L2D changes were uncommitted, so **every change below belongs only to L2C1.**

## Original inconsistency

`/learn/android/` still used the roadmap-style layout from L2C:

- a "Topics" section heading;
- **Jetpack Compose** as one full-width horizontal `topic-item` row (title, description, "1 lesson" badge and arrow);
- **Kotlin**, **Android Architecture** and **Interview Preparation** as small compressed `topic-item is-future` boxes underneath.

Meanwhile `/learn/ios/` presents its tracks (Swift, SwiftUI, Combine, Interview Preparation) as equal, substantial course cards. Android therefore looked like a placeholder list rather than a learning hub in the same system.

## iOS pattern used as the reference

`/learn/ios/` goes straight from `page-intro` into the card grid, with no section heading:

```html
<ul class="card-grid">
  <li class="topic-card">
    <h2 class="topic-card-title"><a href="…">Track</a></h2>   <!-- stretched link over the card -->
    <p>Description</p>
    <ul class="topic-list" aria-label="Topics">
      <li><a class="topic-pill" href="…">Published lesson</a></li>
      <li><span class="topic-pill is-future">Future topic</span></li>   <!-- "SOON" -->
    </ul>
    <div class="topic-card-meta">
      <span class="badge badge-accent">1 lesson</span>
      <span class="topic-card-cta" aria-hidden="true">Explore →</span>
    </div>
  </li>
</ul>
```

## Android card structure

The same markup and classes are reused, with no Android-specific classes:

| Card | Title | Pills | Bottom |
|---|---|---|---|
| **Kotlin** | plain text (no page exists) | Basics · Functions · Classes: all **SOON**, non-links | **COMING SOON** badge, no Explore |
| **Jetpack Compose** | link → `/learn/android/jetpack-compose/` | **Getting Started** (link → `/learn/android/jetpack-compose/getting-started/`) · Your First Screen SOON · Interactivity SOON | **1 LESSON** badge + **Explore →** |
| **Android Architecture** | plain text | ViewModel · StateFlow · Repositories: all **SOON** | **COMING SOON**, no Explore |
| **Interview Preparation** | plain text | Kotlin · Compose · Android: all **SOON** | **COMING SOON**, no Explore |

- Descriptions follow the brief. The Interview Preparation description mirrors the iOS card's ("Structured interview prep across levels — Junior, Mid, and Senior Android, plus focused topic reviews.").
- **Intro:** the H1 "🤖 Android Development" is unchanged. The provisional subtitle was replaced with the evergreen "Learn Kotlin, Jetpack Compose, modern Android architecture, and the interview preparation Android engineers need at every level."
- **"Topics" heading removed.** Like iOS, the page now goes directly from the intro into the card grid.

## Jetpack Compose available state

Identical to the SwiftUI and Combine cards on iOS:
- the stretched title link makes the whole card open the course;
- the published lesson is a highlighted linked pill;
- future lessons are muted "SOON" pills;
- the accent "1 LESSON" badge and "Explore →" (decorative `aria-hidden`, exactly as on iOS);
- the hover lift and pointer cursor are unchanged.

## Coming Soon handling

- Kotlin, Android Architecture and Interview Preparation have **no destination page**, so they get **no title link, no pill links and no Explore**. They use the same neutral "Coming soon" `badge` used elsewhere on the site. This differs from iOS Interview Preparation, which links to an existing `/learn/ios/interview/` page.
- The metadata row still sits at the bottom of each card (verified), so the cards read as complete rather than broken.

## CSS reuse

Only existing primitives are used (`card-grid`, `topic-card`, `topic-card-title`, `topic-list`, `topic-pill`/`is-future`, `topic-card-meta`, `badge`/`badge-accent`, `topic-card-cta`). **Two small, generic additions** were made to `learn.css` (section 3, Topic cards), both needed because this is the first topic card without a destination:

1. **`.topic-card.is-upcoming:hover`** cancels the hover lift, border, background and shadow. Without it, a non-clickable card would still animate like a link and suggest it can be opened. It's reusable for any future track that has no page yet, and not Android-specific.
2. **`.topic-card-title { font-weight: 600 }`**: card titles previously got their weight only from the site-wide `a { font-weight: 600 }`. A title without a link fell back to the browser's bold 700 and looked heavier than its neighbours. The weight is now defined once on the title itself.
   - Linked titles were already 600, so no existing page changed (verified pixel-identical).

No Android-only CSS, no new files, no JS.

## Responsive results

Computed geometry was compared between `/learn/ios/` and `/learn/android/` in the browser. At **1366, 820 and 360** every measured property is **identical**:

- grid column count, grid gap, and cards per row (3 + 1 at desktop; stacked on mobile);
- card width, padding, radius, border and background;
- title font size, weight and line height; description size, line height and colour;
- pill size, padding and radius; badge size and padding.

Also verified:
- equal card heights within each row;
- the metadata row pinned to each card's bottom;
- pills wrap cleanly;
- **no horizontal overflow** at any width.

Visual side-by-side screenshots at 1366 (iOS vs Android) and 360 were reviewed:
- Kotlin | Jetpack Compose | Android Architecture on the first row and Interview Preparation on the next, exactly mirroring Swift | SwiftUI | Combine / Interview Preparation;
- stacked cards on mobile.

## Accessibility

- One H1 (unchanged), breadcrumbs `TechBuzz Apps / Learn / Android`, Learn `aria-current="true"` in the header.
- Reading order: intro → Kotlin → Jetpack Compose → Android Architecture → Interview Preparation.
- **Only real links are focusable in the grid:** the Jetpack Compose title link and its Getting Started pill (verified). Coming Soon cards contain no links, so there are no fake links and no `href="#"`.
- Upcoming cards keep the normal cursor and no hover animation.
- Focus-visible styling (the stretched-link card outline) is unchanged, and contrast uses the existing tokens.

## Validation

- Local `python -m http.server`, with `git archive HEAD` (`4863806`) as the pixel baseline.
- Headless Chrome was driven over the DevTools protocol.

| Check | Result |
|---|---|
| Android states: Kotlin = Coming soon · Jetpack Compose = 1 lesson + Explore · Android Architecture = Coming soon · Interview Preparation = Coming soon | ✅ |
| iOS vs Android computed layout/typography at 1366 / 820 / 360 | ✅ all SAME |
| Android goes intro → grid with no section heading (like iOS) | ✅ |
| Navigation: Android → Jetpack Compose card → course landing → Getting Started; Android "Getting Started" pill → Lesson 1 | ✅ |
| Hover: upcoming card has no transform/shadow and a normal cursor; Compose card lifts 2px with shadow and a pointer | ✅ |
| `href="#"`: 0 · broken links: 0 · console errors/warnings/failed requests: 0 · page overflow: 0 | ✅ |
| Pixel-identical vs baseline at 1366 and 360: `/learn/`, `/learn/ios/`, Compose landing, Compose Lesson 1, `/learn/cloud/`, `/learn/cloud/gcp/`, `/learn/ios/swiftui/`, `/learn/math/` | ✅ (one `/learn/cloud/gcp/` cold-load capture differed on the first attempt; three repeat comparisons gave DIFF → IDENT → IDENT with identical heights — a timing artefact. That page contains no topic cards.) |
| `git diff --check` | ✅ clean |

## Files modified

- `learn/android/index.html`: the "Topics" `topic-index` section was replaced by the iOS-style `card-grid` of four `topic-card`s; the subtitle was updated.
- `assets/css/learn.css`: `.topic-card.is-upcoming:hover` (no hover affordance for cards without a page) and `.topic-card-title { font-weight: 600 }`.

**Not modified:** the iOS landing, the Jetpack Compose course landing and Lesson 1, SwiftUI, Combine, Swift, Math, Cloud/GCP, React, AI & Python, System Design, Career, and the Apps pages. No lessons were created.

## Git state after this phase

```
 M assets/css/learn.css
 M learn/android/index.html
?? docs/learn/reports/TechBuzzApps_PhaseL2C1_Android_Landing_Card_Consistency_Report.md
```

All uncommitted changes belong to **L2C1**. `git diff --check` is clean.
