# TechBuzz Learn — Phase C1 Report
## Promote GCP and AWS to Top-Level Learn Categories

Branch: `feature/TechBuzzLearn` · Nothing committed or pushed.

---

## 1. Objective

Remove the generic **Cloud** layer and make **GCP** and **AWS** first-class Learn categories (`/learn/gcp/`, `/learn/aws/`):
- GCP becomes a multi-track **platform hub** (like iOS);
- the existing beginner course becomes **GCP Fundamentals**;
- GCP Lesson 1 moves to `/learn/gcp/getting-started/` with its content unchanged;
- the old `/learn/cloud/…` URLs keep working as compatibility pages.

No lessons were created or rewritten.

## 2. Pre-change git state

`git status --short` was **clean** at `88c59df Web Development track added` (on top of `a854a1a`, `4863806`, `de45421`). There were no uncommitted GCP or other changes, so every change below belongs to C1.

## 3. Existing Cloud/GCP/AWS audit

The repository matched the L2D/L1A state exactly. There were no `/learn/gcp/`, `/learn/aws/`, `…/beginners/` or `…/fundamentals/` pages.

| Path | State before C1 |
|---|---|
| `/learn/cloud/` | Cloud landing: GCP card (1 lesson, Getting Started pill) + AWS card (Roadmap), self-canonical |
| `/learn/cloud/gcp/` | "☁️ GCP for Beginners" course landing: the 10-lesson path (L1 linked, L2–10 non-links), self-canonical |
| `/learn/cloud/gcp/getting-started/` | GCP Lesson 1 (unchanged since `4863806`), self-canonical |
| `/learn/cloud/aws/` | L1A placeholder: "Amazon Web Services (AWS)" plus a flat product "Topics" list (Cloud Fundamentals, IAM, EC2, S3, VPC, Lambda, API Gateway, RDS, DynamoDB, ECS, EKS, CloudWatch, AWS Architecture, Hands-on Projects), self-canonical |

All four have been public since earlier phases, so they may be indexed and externally linked.

## 4. Existing inbound-link / path audit

Every HTML, JS and CSS file was searched for `/learn/cloud/`, `/learn/cloud/gcp/`, `/learn/cloud/aws/` and `https://techbuzzapps.com/learn/cloud/`:
- **Only site pages referenced them:** the `/learn/` Cloud card, and the four Cloud pages themselves (breadcrumbs, cards, CTAs, path links, sidebar back link, canonicals and og:urls).
- `docs/` contains historical mentions only (reports), which were left unchanged.
- There is no sitemap, no `_redirects`, and no server redirects. The site's established moved-page convention is the **W1 compatibility page**: a notice, a real link, and a canonical pointing to the new URL, with no redirect.

## 5. Architecture decision

- `/learn/gcp/` = **GCP hub** with 11 track cards (iOS card architecture).
- `/learn/gcp/fundamentals/` = the **existing beginner course** under its track name, with its 10-lesson path migrated verbatim.
- `/learn/gcp/getting-started/` = **Lesson 1**. It's placed directly under `/learn/gcp/` as specified, while its breadcrumb and sidebar place it inside GCP Fundamentals.
- `/learn/aws/` = an honest roadmap **AWS hub** (upcoming track cards only).
- The four `/learn/cloud/…` URLs become **W1-style compatibility pages**, each with its canonical pointing to its new home.
- Advanced GCP tracks and AWS tracks are **non-link cards, not pages** (L2C1/W1 convention). No empty placeholder pages were created.

## 6. Previous hierarchy

```
Learn
├── iOS ├── Android ├── Web Development
├── Cloud
│   ├── GCP  → GCP for Beginners (10 lessons, L1 published)
│   └── AWS  → product placeholder list
├── AI & Python ├── System Design ├── Career └── Math
```

## 7. New hierarchy

```
Learn
├── 🍎 iOS
├── 🤖 Android
├── 🌐 Web Development
├── ☁️ GCP                         /learn/gcp/
│     ├── 🌱 GCP Fundamentals        /learn/gcp/fundamentals/  (10 lessons)
│     │     └── Lesson 1             /learn/gcp/getting-started/
│     ├── Compute & Serverless … Certification Preparation   (10 tracks, coming soon)
├── ☁️ AWS                         /learn/aws/   (10 tracks, coming soon)
├── 🧠 AI & Python
├── ∑ Math
├── 🧩 System Design
└── 🚀 Career
```

Journey: **Learn → GCP → GCP Fundamentals → Lesson 1**, mirroring **Learn → iOS → SwiftUI → Lesson 1**.

## 8. GCP top-level hub (`/learn/gcp/`)

- **H1 "☁️ Google Cloud Platform"** (emoji `aria-hidden`), the brief's intro, breadcrumbs `TechBuzz Apps / Learn / GCP`.
- Same shell and `page-intro → card-grid` structure as `/learn/ios/`, with no section heading.
- Title "Learn Google Cloud Platform (GCP) — TechBuzz Apps", self-canonical.

## 9. GCP track architecture

11 `topic-card`s. Each track answers "what should I learn?" with 2–3 representative topics, rather than listing Google's products.

| # | Track | State | Pills |
|---|---|---|---|
| 1 | **GCP Fundamentals** | **available**: title link → `/learn/gcp/fundamentals/`, **1 LESSON**, Explore → | **Getting Started** (link → Lesson 1) · First Server SOON · Cloud Storage SOON |
| 2 | Compute & Serverless | Coming soon | Compute Engine · Cloud Run · Cloud Functions |
| 3 | Networking | Coming soon | VPC · Load Balancing · Cloud DNS |
| 4 | Databases | Coming soon | Cloud SQL · Firestore · Spanner |
| 5 | Containers & Kubernetes | Coming soon | Containers · Artifact Registry · GKE |
| 6 | DevOps | Coming soon | Cloud Build · CI/CD · Terraform |
| 7 | Security | Coming soon | IAM · Secret Manager · Service Accounts |
| 8 | Data & Analytics | Coming soon | BigQuery · Pub/Sub · Dataflow |
| 9 | AI & ML | Coming soon | Vertex AI · Gemini API · ML Pipelines |
| 10 | Architecture | Coming soon | Reliability · Scalability · Cost Design |
| 11 | Certification Preparation | Coming soon | Cloud Digital Leader · Associate Cloud Engineer |

Coming Soon cards use `topic-card is-upcoming`: no links, SOON pills, a "Coming soon" badge and no Explore. Grid: 3+3+3+2 on desktop, 2 per row on tablet, stacked on mobile.

## 10. GCP Fundamentals (`/learn/gcp/fundamentals/`)

- **H1 "🌱 GCP Fundamentals"**, eyebrow "GCP · Learning Track", breadcrumbs `TechBuzz Apps / Learn / GCP / GCP Fundamentals`.
- The subtitle is the existing beginner-course intro, and the CTA "Start with Lesson 1" → `/learn/gcp/getting-started/`.
- **"The Course" section migrated verbatim** from the old `/learn/cloud/gcp/` landing: the same section lead and the same 10 lesson titles and descriptions. The **only** diff is the Lesson 1 link, now pointing to `/learn/gcp/getting-started/` (verified with `diff`). Lessons 2–10 remain non-link "Coming soon".
- Title "GCP Fundamentals — Beginner Google Cloud Course — TechBuzz Apps", self-canonical.

## 11. Existing beginner curriculum preservation

All 10 lessons are unchanged, in order, with their existing descriptions:
1. Getting Started with Google Cloud
2. Your First Server in the Cloud
3. Storing Files in the Cloud
4. Deploying an Application Without Managing Servers
5. Databases in Google Cloud
6. Users, Permissions & Security
7. Networking Without the Headache
8. Connecting Services Together
9. Monitoring, Logs & Costs
10. Beginner GCP Project

Only Lesson 1 is published. The course is now named **GCP Fundamentals**, previously "GCP for Beginners".

## 12. Lesson 1 URL migration

`/learn/gcp/getting-started/` is a copy of the committed lesson in which **only navigation and metadata** changed (verified by `diff` against `HEAD`):

| Changed | From → To |
|---|---|
| `<title>`, meta description, `og:title` | "GCP for Beginners, Lesson 1" → "GCP Fundamentals, Lesson 1" |
| canonical, `og:url` | `/learn/cloud/gcp/getting-started/` → `/learn/gcp/getting-started/` |
| Breadcrumbs | `… / Learn / Cloud / GCP / Getting Started` → `… / Learn / GCP / GCP Fundamentals / Getting Started` (GCP → `/learn/gcp/`, GCP Fundamentals → `/learn/gcp/fundamentals/`) |
| Sidebar course group | summary + nav label "GCP for Beginners" → "GCP Fundamentals" (still the 10 Fundamentals lessons only) |
| Sidebar back link | `← GCP for Beginners` → `/learn/cloud/gcp/` became `← GCP Fundamentals` → `/learn/gcp/fundamentals/` |
| Eyebrow | "☁️ GCP for Beginners · Lesson 1 of 10" → "☁️ GCP Fundamentals · Lesson 1 of 10" |

**Everything from the H1 onward is byte-identical:**
- the teaching progression and all 15 emojis;
- all 14 diagrams, and the Console and Cloud Shell sections;
- the `gcloud projects list` command (Copy verified), the Tiny Challenge and the Lesson 2 preview.

Prev/next remain non-link placeholders. There is **one** full copy of the lesson; the old URL now holds only a notice.

## 13. AWS top-level hub (`/learn/aws/`)

- **H1 "☁️ Amazon Web Services"**, breadcrumbs `TechBuzz Apps / Learn / AWS`. The intro states plainly that the AWS tracks are being planned.
- **10 `is-upcoming` track cards** (roadmap only, no lessons, no links): AWS Fundamentals, Compute & Serverless, Networking, Databases, Containers, Security, DevOps, Data, Architecture, Certification.
- The pills reuse the product names from the old L1A AWS placeholder (EC2, Lambda, API Gateway, VPC, RDS, DynamoDB, ECS, EKS, S3, IAM…) plus a few track topics, so the previous roadmap information is preserved in the new structure.
- Self-canonical `https://techbuzzapps.com/learn/aws/`.

## 14. Learn homepage changes (`/learn/`)

- The **Cloud card was removed.**
- Two cards were added in its place:
  - **☁️ GCP** → `/learn/gcp/`, the brief's description, **1 lesson**, Explore;
  - **☁️ AWS** → `/learn/aws/`, **Roadmap**, Explore. This follows the existing convention: roadmap categories such as Web Development, AI & Python, System Design and Career link to their hub pages.
- **Math moved** after AI & Python to match the target order: iOS · Android · Web Development · GCP · AWS · AI & Python · Math · System Design · Career.
- The meta description now lists "GCP, AWS" instead of "Cloud".
- Verified: 0 links to `/learn/cloud/` on the page.

## 15. Legacy Cloud handling (`/learn/cloud/`)

Replaced with a compatibility page: **H1 "Cloud Learning Has Moved"**, "Cloud learning is now organized by platform…", with real buttons to **Google Cloud Platform** (`/learn/gcp/`) and **Amazon Web Services** (`/learn/aws/`).

Its canonical is `https://techbuzzapps.com/learn/` (the page where platforms are chosen), so it doesn't compete in search. It's not linked from any navigation.

## 16. Legacy GCP URL compatibility

| Legacy URL | Page | Canonical | Real links |
|---|---|---|---|
| `/learn/cloud/gcp/` | "GCP Has Moved": the beginner course is now GCP Fundamentals | `/learn/gcp/` | Go to Google Cloud Platform · GCP Fundamentals |
| `/learn/cloud/gcp/getting-started/` | "This Lesson Has Moved": *Getting Started with Google Cloud* is now Lesson 1 of GCP Fundamentals | `/learn/gcp/getting-started/` | Open the lesson · GCP Fundamentals |
| `/learn/cloud/aws/` | "AWS Has Moved" | `/learn/aws/` | Go to Amazon Web Services |

- No lesson content is duplicated (verified that `gcloud projects list` is absent from all legacy pages).
- There is no redirect library and no meta-refresh; the W1 convention is reused.
- Legacy breadcrumbs don't include "Cloud" as a link into the old hierarchy.

## 17. Internal link migration

- After migration, **no page outside the four legacy compatibility pages references `/learn/cloud/`** (repo-wide search).
- All canonical navigation now uses `/learn/gcp/…` and `/learn/aws/`: cards, pills, CTAs, breadcrumbs, the lesson sidebar back link and the Fundamentals path.
- No canonical page's breadcrumb contains "Cloud" (verified in the browser: `cloudInCrumbs: false` everywhere).

## 18. SEO / canonical migration

- **New canonical pages**, each with a unique title, meta description, canonical, og:title / og:description / og:url / og:type, `theme-color` and exactly one H1:

  | Page | og:type |
  |---|---|
  | `https://techbuzzapps.com/learn/gcp/` | website |
  | `https://techbuzzapps.com/learn/gcp/fundamentals/` | website |
  | `https://techbuzzapps.com/learn/gcp/getting-started/` | article |
  | `https://techbuzzapps.com/learn/aws/` | website |

- **Legacy pages:** each canonical and og:url points to the new page (`/learn/cloud/` → `/learn/`), and the titles and descriptions say the content has moved. Each legacy/new pair shares one canonical by design: the legacy page defers to the new one and holds no competing content.

## 19. CSS / JS reuse

**Zero CSS and zero JavaScript changes.** Only existing primitives are used: `page-intro`, `heading-icon`, `eyebrow`, `card-grid`, `topic-card` / `is-upcoming`, `topic-pill` / `is-future`, `badge` / `badge-accent`, `topic-card-cta`, `topic-index.is-path`, `button` / `button-secondary`, and the article system.

No gcp, aws or cloud styles or scripts, and no Google or AWS brand colours.

## 20. Accessibility

- One H1 per page, with track and card titles as H2. Labelled breadcrumbs, and Learn `aria-current` in the header.
- The lesson keeps `aria-current="page"`, labelled sidebar navs and a keyboard-operable Copy button.
- **Coming Soon content is not interactive:** 0 links in the AWS grid, and only the Fundamentals title and its Getting Started pill are links on the GCP hub. No `href="#"`.
- Emojis are `aria-hidden` next to full text (the ☁️/🌱 headings and the lesson's section headings, whose emojis still render at 35px).

## 21. Responsive results

- **Card styling** on `/learn/gcp/` and `/learn/aws/` is identical to `/learn/ios/` at **1366 / 820 / 360**: columns, gap, card width, padding, radius, and title, description and pill typography.
- **Wrapping:** GCP is 3+3+3+2 / 2-up / stacked, and AWS is 3+3+3+1 / 2-up / stacked. Long names ("Containers & Kubernetes", "Certification Preparation", "Associate Cloud Engineer") wrap within their cards.
- **The Fundamentals path** (10 items) and the lesson (new breadcrumbs, sidebar, diagrams, emojis, command) render cleanly.
- **No page-level overflow** on any canonical or legacy URL.

## 22. Validation

- Local `python -m http.server`, with `git archive HEAD` (`88c59df`) as the pixel baseline.
- Headless Chrome was driven over the DevTools protocol, plus a Python static audit.

| Check | Result |
|---|---|
| HTTP 200: `/learn/`, `/learn/gcp/`, `/learn/gcp/fundamentals/`, `/learn/gcp/getting-started/`, `/learn/aws/`, `/learn/cloud/`, `/learn/cloud/gcp/`, `/learn/cloud/gcp/getting-started/`, `/learn/cloud/aws/` | ✅ at 1366, 820 and 360 |
| Shared header/footer, 0 placeholders, one H1, SEO in HTML, 0 console errors/failed requests, 0 overflow | ✅ all |
| Journey Learn → GCP → GCP Fundamentals → Lesson 1 (clicked); sidebar back → Fundamentals; hub pill → Lesson 1; Learn → AWS | ✅ |
| Lesson at new URL: sidebar = GCP Fundamentals (10 items, 0 other-lesson links), pagination 0 links, emojis render, 14 diagrams with 0 Copy, command Copy = exact `gcloud projects list` + ✓ Copied | ✅ |
| Lesson body identical to committed version (diff) · Fundamentals path identical except the L1 link (diff) | ✅ |
| Legacy pages: canonical → new URL, buttons navigate to `/learn/gcp/`, `/learn/gcp/getting-started/`, `/learn/aws/`; no lesson content duplicated | ✅ |
| Cloud card removed; card order and badges truthful (GCP 1 lesson, AWS Roadmap) | ✅ |
| No `/learn/cloud/` references outside legacy pages; no broken internal links; `href="#"`: 0 | ✅ (the only pre-existing issues are the old empty `swiftui-interview-questions` stub and Simply Inspiring's `/simplyinspiring/support/` link, both out of scope and recorded in earlier phases) |
| `git diff --check`; no trailing whitespace | ✅ |

## 23. Regression

**Pixel-identical to the baseline at 1366 and 360 (18 URLs):**
- `/`, `/learn/ios/`, Closures, the SwiftUI landing and both lessons, the Combine landing and lesson;
- `/learn/android/`, the Compose landing and lesson;
- `/learn/web/`, `/learn/react/`;
- `/learn/math/`, Foundations and both lessons, and `/learn/ai-python/`.

## 24. Files added

- `learn/gcp/index.html`: GCP hub
- `learn/gcp/fundamentals/index.html`: GCP Fundamentals course landing
- `learn/gcp/getting-started/index.html`: GCP Lesson 1 (canonical)
- `learn/aws/index.html`: AWS hub
- `docs/learn/reports/TechBuzzApps_PhaseC1_GCP_AWS_Top_Level_Migration_Report.md`

## 25. Files modified

- `learn/index.html`: Cloud card → GCP + AWS cards; Math moved after AI & Python; meta description.
- `learn/cloud/index.html`: → "Cloud Learning Has Moved" compatibility page (canonical `/learn/`).
- `learn/cloud/gcp/index.html`: → "GCP Has Moved" (canonical `/learn/gcp/`).
- `learn/cloud/gcp/getting-started/index.html`: → "This Lesson Has Moved" (canonical `/learn/gcp/getting-started/`).
- `learn/cloud/aws/index.html`: → "AWS Has Moved" (canonical `/learn/aws/`).

## 26. Files removed

**None.** All old URLs remain reachable as compatibility pages.

## 27. Files intentionally untouched

- `assets/css/*`, `assets/js/common.js`, `components/*`.
- All iOS (Swift, SwiftUI, Combine), Android (Compose), Web and Math pages; AI & Python, System Design and Career.
- Apps, Dharma Connect and Simply Inspiring.
- Historical reports in `docs/`, which accurately record the `/learn/cloud/` era.

## 28. Known limitations

- **No true redirects.** GitHub Pages can't issue 301s, so old URLs rely on visible notices, real links and cross-page canonicals. Search engines may take time to consolidate, and a canonical to a different page is a hint, not a guarantee.
- **Lesson URL vs track path.** Lesson 1 lives at `/learn/gcp/getting-started/` (as specified) rather than under `/learn/gcp/fundamentals/…`. Its breadcrumb and sidebar place it in GCP Fundamentals. Future lessons from other GCP tracks will need distinct slugs under `/learn/gcp/`.
- **Track descriptions are provisional.** The 10 advanced GCP tracks and 10 AWS tracks are roadmap cards with concise descriptions and pills. They'll be refined when each track is designed.
- The badges ("1 lesson", "Roadmap", "Coming soon") are hand-maintained.

## 29. Recommended next phase

**GCP Fundamentals — Lesson 2: Your First Server in the Cloud** (`/learn/gcp/your-first-server/`), including a clear cost and cleanup note. When it ships:
- turn the Lesson 1 "next" placeholder, the Fundamentals path item and the sidebar entry into links;
- update the badges (hub "2 lessons", `/learn/` GCP card).

Alternatively, **JavaScript for Beginners — Lesson 1** (from W1), if Web content is the priority.

## 30. Git state

- **Before C1:** clean at `88c59df`.
- **After C1:**
  ```
   M learn/cloud/aws/index.html
   M learn/cloud/gcp/getting-started/index.html
   M learn/cloud/gcp/index.html
   M learn/cloud/index.html
   M learn/index.html
  ?? docs/learn/reports/TechBuzzApps_PhaseC1_GCP_AWS_Top_Level_Migration_Report.md
  ?? learn/aws/
  ?? learn/gcp/
  ```
  **All uncommitted changes belong to Phase C1.** `git diff --check` is clean.
