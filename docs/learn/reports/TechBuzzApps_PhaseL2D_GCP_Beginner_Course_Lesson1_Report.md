# TechBuzz Learn — Phase L2D Report
## GCP for Beginners — Course Foundation + Lesson 1

Branch: `feature/TechBuzzLearn` · Nothing committed or pushed.

---

## 1. Objective

Add the first Cloud course, **GCP for Beginners**, under Learn → Cloud → GCP. It includes:
- a 10-lesson course landing page;
- **Lesson 1 — Getting Started with Google Cloud**, built from the user's Lesson 1 content with its emojis preserved.

## 2. Pre-change git state

`git status --short` was **clean**, and the expected checkpoint was present: Jetpack Compose L2C is committed as `de45421 Jetpack compose added` (on top of `1c94cf2` Combine and `0e3d071` Math). No phases were mixed, and every uncommitted change after this phase belongs to L2D.

## 3. Architecture audit

Everything needed already existed and was reused unchanged:

- **Shell:** `site-shell`, the shared header/footer via `common.js`, and `site-main`.
- **`/learn/cloud/`:** a `card-grid` of `topic-card`s (GCP, AWS). The site's available-track convention there is a linked lesson pill plus an accent badge (as on `/learn/ios/`).
- **`/learn/cloud/gcp/`:** an **existing L1A placeholder**, a flat product list (Cloud Fundamentals, IAM, Compute Engine, Cloud Storage, VPC, Cloud Run, Cloud Functions, Pub/Sub, Cloud SQL, Firestore, Secret Manager, GKE, Monitoring & Logging, Architecture, Hands-on Projects).
- **Course landing pattern:** `page-intro` + `ol.topic-index.is-path`.
- **Article template:** breadcrumbs, `article-header page-intro` + eyebrow, sidebar `<details>`, `data-toc`, `.sidebar-back`, `article-pagination`.
- `.diagram` and callouts.
- **Copy:** `enhanceCodeBlocks()` enhances any `pre > code`, so any language class works.

**Result: zero new CSS and zero new JavaScript.** No Google-coloured theme, and no GCP-specific files.

## 4. Course structure

| # | Lesson | Practical outcome | Status |
|---|---|---|---|
| 1 | Getting Started with Google Cloud | cloud computing, regions/zones, projects, Console, billing, APIs, Cloud Shell → tour of your first project | **Published** |
| 2 | Your First Server in the Cloud | VMs, Compute Engine, machine types, disks, external IPs, SSH, firewall → VM hosting a tiny webpage | Coming soon |
| 3 | Storing Files in the Cloud | Cloud Storage, buckets, objects, regions, permissions, storage classes → small cloud file store | Coming soon |
| 4 | Deploying an Application Without Managing Servers | containers, Cloud Run, revisions, logs, env vars, scaling → deployed web/API app | Coming soon |
| 5 | Databases in Google Cloud | relational vs NoSQL, Cloud SQL, Firestore → app that saves and retrieves data | Coming soon |
| 6 | Users, Permissions & Security | IAM, principals, roles, service accounts, least privilege, secrets → secure service-to-service access | Coming soon |
| 7 | Networking Without the Headache | VPCs, subnets, IPs, firewall rules, DNS, load balancing → simple visual cloud network | Coming soon |
| 8 | Connecting Services Together | Pub/Sub, events, async processing, APIs → event-driven mini system | Coming soon |
| 9 | Monitoring, Logs & Costs | Logging, Monitoring, alerts, budgets, billing reports, quotas → break something and diagnose it | Coming soon |
| 10 | Beginner GCP Project | Cloud Run + database + storage + IAM + logging → small production-style system | Coming soon |

Products (Compute Engine, IAM, VPC, Pub/Sub, …) are tools **inside** problem-oriented lessons. No per-product lessons or URLs.

## 5. URL architecture

```
/learn/cloud/                           Cloud (unchanged layout)
/learn/cloud/gcp/                       GCP for Beginners (replaces the L1A placeholder at the same URL)
/learn/cloud/gcp/getting-started/       Lesson 1
```

The existing public URL `/learn/cloud/gcp/` is preserved. `/learn/cloud/aws/` is untouched. No Lesson 2 page was created.

## 6. Cloud landing integration

- **`/learn/cloud/`:** the GCP card now uses the brief's description ("Learn Google Cloud from the fundamentals by deploying servers, storage, applications, databases and real cloud systems.").
  - Pills: *Getting Started* (link to Lesson 1), and *Your First Server* and *Storing Files* (Soon, non-link).
  - Accent badge **"1 lesson"**.
  - The card link still goes to `/learn/cloud/gcp/`.
- **AWS card unchanged:** still "Roadmap", no links in its pills (verified in the browser). The `/learn/cloud/aws/` page is pixel-identical to the baseline.
- **`/learn/`:** the Cloud card badge changed from "Roadmap" to **"1 lesson"**.
- The Cloud page's H1, intro and layout are unchanged.

## 7. GCP course landing (`/learn/cloud/gcp/`)

- **H1 "☁️ GCP for Beginners"**, matching the supplied series title. The emoji is `aria-hidden`, so the accessible name is "GCP for Beginners". Eyebrow: "Cloud · Google Cloud Platform".
- The intro and section lead cover:
  - designed for complete cloud beginners;
  - no need to memorise every service;
  - concepts before products;
  - Console-first hands-on work, with Cloud Shell / `gcloud` introduced gradually;
  - each lesson solves one practical cloud problem;
  - the final lesson combines services into a small production-style system.
- CTA: *Start with Lesson 1*.
- **The Course:** all 10 lessons in order, each with a practical-outcome description. Lesson 1 is linked; **Lessons 2–10 are non-link** "Coming soon".
- The L1A placeholder's flat product list was **removed**, because listing products as topics is exactly the structure the course philosophy rejects. Those products are covered inside the 10 lessons (Compute Engine → L2, Cloud Storage → L3, Cloud Run → L4, Cloud SQL/Firestore → L5, IAM/Secret Manager → L6, VPC → L7, Pub/Sub → L8, Monitoring & Logging → L9). GKE and Cloud Functions are not part of the beginner course.

## 8. Lesson 1 implementation

`/learn/cloud/gcp/getting-started/`
- Eyebrow "☁️ GCP for Beginners · Lesson 1 of 10", **H1 "Getting Started with Google Cloud"**, lead.
- **10 H2 sections, each with its supplied emoji:** 👋 What Are We Learning? · 🌩️ First: What Is "the Cloud"? · 🧩 Think of GCP as a Giant Toolbox · 📁 What Is a Google Cloud Project? · 🌍 Regions and Zones · 🖥️ Meet the Google Cloud Console · 💻 And Eventually: Cloud Shell · 🧠 What Did We Actually Learn? · 🎯 Tiny Challenge · 🚀 Coming Next.
- **1 command block** (`gcloud projects list`, `language-bash`) and **14 diagrams**.
- Callouts: 3 key ideas (the cloud definition, "services come after concepts", and "you don't need to learn all of GCP"), 1 note (the Console layout changes over time), and the challenge callout.
- **Billing & APIs** are covered at beginner level inside the Project section only: an API must be enabled per project; a project links to a billing account. No billing tutorial, and **nothing paid is provisioned**.
- **Console accuracy:** no screenshots and no claimed menu positions.
  - The only concrete facts are the durable Console address (`console.cloud.google.com`), that Cloud Shell opens from the Console with `gcloud` pre-installed and signed in, and that the project display name can change while the Project ID cannot.
  - A Note explains that the layout changes over time and suggests the Console's search.

## 9. Emoji preservation

- **All supplied emojis are preserved as plain Unicode in the HTML**, with no icon library, images, SVG or emoji package:
  - ☁️ in the landing H1 and the lesson eyebrow;
  - 👋 🌩️ 🧩 📁 🌍 🖥️ 💻 🧠 🎯 🚀 on the ten section headings;
  - 🖥️ 📦 🗄️ 🌐 🔐 inside the toolbox diagram, as supplied.
- `<meta charset="UTF-8">` is present. The static audit found **0 U+FFFD replacement characters and 0 mojibake sequences**, and all 15 required emojis are present.
- **In the browser**, every heading emoji renders as a real glyph (measured width 35px each, not an empty box).
- **Accessibility:** heading emojis are wrapped in `<span aria-hidden="true">`, so the headings' accessible names are plain text (verified: no emoji in any H2 accessible name), while sighted users still see them. **No emoji appears in any `aria-label`.** The toolbox diagram's label describes the five tool kinds in words.
- The emojis were left out of the "On This Page" link text, to keep the compact sidebar list clean. The headings they point to keep them.

## 10. Content fidelity

**Source note (stated plainly):** the Lesson 1 content that reached this session is the detailed Lesson 1 specification in the phase brief, sections 7–20. That covers the opening story, every diagram, the terminology, the section emojis, the challenge, the Lesson 2 setup and the teaching rhythm. It was treated as the authoritative source and preserved element by element.

Connective prose that the brief describes rather than quotes was written in the lesson's voice. If a longer verbatim version exists outside this session, those passages can be swapped in without structural change.

Fidelity checklist (brief §34):

| Element | Preserved | Where |
|---|---|---|
| App works on your computer → people worldwide → your computer can't stay on forever | ✅ | 👋 section |
| Need computers elsewhere: run app, store files, store database, handle users, process requests, stay available 24/7 | ✅ | 👋 list |
| Introduce Google Cloud Platform — GCP (no product dump) | ✅ | 👋 |
| Google Cloud → Project → Compute / Storage / Database (Run apps / Store files / Store data) | ✅ | 👋 diagram (spacing tightened to fit 360px, same structure and labels) |
| "The cloud is somebody else's computers that you can use over the internet." | ✅ | 🌩️ Key idea |
| Google data centers with servers | ✅ | 🌩️ |
| "I need a computer." / "I need 100 GB of storage." / "I need somewhere to store my application's data." | ✅ | 🌩️ diagram |
| No virtualization/hypervisor/CAPEX/distributed-systems detour | ✅ | — |
| GCP toolbox tree with 🖥️ Compute / 📦 Storage / 🗄️ Databases / 🌐 Networking / 🔐 IAM and their meanings | ✅ | 🧩 diagram (emojis kept) |
| Need a computer → Compute Engine · file storage → Cloud Storage · app without managing servers → Cloud Run · relational database → Cloud SQL | ✅ | 🧩 diagram |
| **SERVICES COME AFTER CONCEPTS** | ✅ | 🧩 Key idea |
| Project as container / organisational boundary | ✅ | 📁 |
| StudyBuddy Project diagram (Google Cloud → StudyBuddy Project → VM / Storage / Database) | ✅ | 📁 diagram |
| Resources / Permissions / APIs / Billing / Monitoring | ✅ | 📁 list |
| Project ID introduced gently | ✅ | 📁 |
| No organisation/folder hierarchy or governance | ✅ | — |
| Region ├── Zone A ├── Zone B └── Zone C | ✅ | 🌍 diagram |
| Region = geographic area; zone = deployment area inside a region | ✅ | 🌍 |
| Failure/availability intuition for multiple zones; no multi-region architecture | ✅ | 🌍 |
| Google Cloud Console introduction | ✅ | 🖥️ |
| Project selector ├── Compute Engine ├── Cloud Storage ├── Cloud Run ├── IAM └── Billing | ✅ | 🖥️ diagram |
| Not just "Click this → click that → done."; understand what GCP does underneath | ✅ | 🖥️ diagram + prose |
| Cloud Shell | ✅ | 💻 |
| `gcloud projects list` as a real command block (with Copy) | ✅ | 💻 |
| Console │ same cloud resources │ Cloud Shell / gcloud | ✅ | 💻 diagram |
| No extensive gcloud teaching | ✅ | — |
| Recap: Your App → Google Cloud → Servers/Storage/Databases; Project ├── Compute/Storage/Database; Region ├── Zones | ✅ | 🧠 three diagrams |
| **"You don't need to learn all of GCP."** | ✅ | 🧠 Key idea |
| Challenge: project selector → Project Name / Project ID / Project Number | ✅ | 🎯 |
| Challenge: find Compute Engine, Cloud Storage, Cloud Run, IAM, Billing | ✅ | 🎯 |
| **DON'T CREATE ANYTHING YET**: no VM, bucket, database, billing action, deployment | ✅ | 🎯 |
| No Submit / scoring / engine | ✅ | — |
| 🚀 Coming next: Lesson 2 — Your First Server in the Cloud | ✅ | 🚀 |
| VM architecture diagram (Your Computer → Internet → Google Cloud VM [Linux / Web Server / Your Web Page] → https://...) | ✅ | 🚀 diagram (verbatim) |
| Compute Engine, VM, CPU, RAM, disk, IP address, SSH, firewall as parts of ONE story | ✅ | 🚀 |
| Rhythm: concept → visual explanation → Console hands-on → understand what happened → experiment → tiny challenge → real project | ✅ | 🚀 diagram |
| Supplied section emojis | ✅ | all ten H2s + eyebrow |

## 11. Teaching approach

The lesson follows the course rhythm: **concept → visual explanation → Console hands-on → understand what happened → experiment → tiny challenge → real project.**

- Lesson 1 covers the concept and visual stages, plus an orientation-only "hands-on" challenge.
- Every idea is introduced as a need ("I need a computer") before a product name appears.
- The tone is friendly and practical, and the emojis give the lesson visual character within the existing dark/amber design.

## 12. Diagram treatment

- All 14 conceptual diagrams use the existing `figure.diagram > pre[role=img][aria-label]` (+ `figcaption`) primitive:
  - Cloud → Project → resources, the three requests, the toolbox, concept → service mappings;
  - StudyBuddy, Region/Zones, the Console selector, "Click this → …", Console ↔ Cloud Shell;
  - the three recap diagrams, the Lesson 2 VM architecture and the course rhythm.
- **None is marked up as `<pre><code>`, and none received a Copy button** (verified).
- Readability at 360px: the widest line is 35 columns, and **0 of 14 diagrams scroll at 360px**.
  - Two supplied diagrams had their spacing tightened so connectors line up and fit phones; structure and labels are unchanged.
  - One long mapping line ("Need to run an app without managing servers?") was wrapped over two lines.
  - The VM diagram is verbatim.
- Emojis appear only in the toolbox tree, where no right-hand borders depend on character width.

## 13. Command / Copy integration

- **`gcloud projects list`** uses the existing code-block architecture as `<pre><code class="language-bash">`. The site had no prior shell convention, so `language-bash` (Cloud Shell's default shell) was chosen; the enhancer is language-agnostic.
- Verified in the browser:
  - exactly **1** Copy button on the command block;
  - copied text is exactly `gcloud projects list`;
  - **✓ Copied**, then back to **icon + Copy** after about 2 s;
  - Enter activates it, focus is retained and the focus ring is visible;
  - **0** buttons on the 14 diagrams.
- No Copy markup in the HTML, and the shared implementation was not modified.

## 14. Course navigation

- **Sidebar** follows the Math/Combine/Compose rule:
  - **On This Page** (10 entries, live-highlighted; verified on "Regions and Zones");
  - **GCP for Beginners** (10 lessons: #1 current with `aria-current="page"`, #2–10 muted non-links);
  - **"← GCP for Beginners"** back link.
- Breadcrumbs: `TechBuzz Apps / Learn / Cloud / GCP / Getting Started`.
- **Prev / next:** "This is the first lesson" (non-link) and "Coming soon · Lesson 2 — Your First Server in the Cloud" (**non-link**).

## 15. SEO

Both pages have direct-HTML SEO: a unique title, unique meta description, canonical (`https://techbuzzapps.com/learn/cloud/gcp/` and `…/getting-started/`), `og:title`, `og:description`, `og:url`, `og:type` (`website` / `article`), `theme-color`, and exactly one H1.

The GCP landing's previous placeholder SEO ("A future GCP learning track…") was replaced with course-accurate metadata at the same canonical URL.

## 16. Accessibility

- One H1, and H2 per section with no skipped levels.
- Labelled navs (breadcrumb, On this page, course lessons, lesson navigation). `aria-current` on the breadcrumb and the current lesson.
- Diagrams have meaningful `aria-label`s written in plain words, with no emoji, and are explained in nearby prose.
- **Emojis are decorative and never the only carrier of meaning:** heading emojis are `aria-hidden` next to full heading text, and the toolbox diagram's label names each tool kind.
- The Copy button is a real, keyboard-operable button. Focus-visible and reduced-motion behaviour are unchanged.

## 17. Responsive behaviour

Validated at **1366 / 820 / 360**:
- no page-level horizontal overflow on any tested URL;
- the command block fits, with no internal scroll needed;
- all diagrams fit at 360px, and heading emojis wrap naturally with their text;
- the 10-lesson path and long titles ("Deploying an Application Without Managing Servers") wrap inside their tiles and sidebar entries;
- breadcrumbs wrap, and the sidebar collapses above the article below 960px.

## 18. Performance impact

**No new requests, CSS, JS, fonts or images.** Emojis are text and render with system emoji fonts.

## 19. Validation

- Local `python -m http.server`, with `git archive HEAD` (`de45421`) as the pixel baseline.
- Headless Chrome was driven over the DevTools protocol (Node built-in WebSocket, no packages), plus a Python static and emoji audit.

| Check | Result |
|---|---|
| HTTP 200: `/learn/`, `/learn/cloud/`, `/learn/cloud/gcp/`, Lesson 1, `/learn/cloud/aws/`, `/learn/android/`, `/learn/android/jetpack-compose/`, `/learn/ios/combine/`, `/learn/ios/swiftui/`, `/learn/math/` | ✅ at 1366, 820 and 360 |
| Shared header/footer, 0 placeholders, Learn `aria-current` (`page` / `true`) | ✅ |
| Breadcrumbs `… / Cloud / GCP / Getting Started` | ✅ |
| Click-through `/learn/` Cloud card → Cloud → GCP → Lesson 1; sidebar back → GCP landing | ✅ |
| Lessons 2–10 non-links (path `L---------`, 0 future sidebar links, pagination has no link) | ✅ |
| AWS unchanged (card still "Roadmap", 0 pill links; AWS page pixel-identical) | ✅ |
| `href="#"`: 0 · broken internal links: 0 · console errors/warnings/failed requests: none | ✅ |
| One H1 · SEO in HTML | ✅ |
| Emojis: all 15 present, 0 U+FFFD, 0 mojibake, glyphs rendered, none in aria-labels, H2 accessible names emoji-free | ✅ |
| Diagrams 14 with 0 Copy buttons, 0 scrolling · command 1/1 with exact copy, ✓ Copied, reset, keyboard | ✅ |
| Static audit: TOC anchors resolve, no duplicate ids, no raw `<` in code, no trailing whitespace; `git diff --check` clean | ✅ |
| Pixel-identical vs baseline: AWS, Android, Compose landing, Combine landing, SwiftUI, Math | ✅ at all three widths |
| Expected changes | `/learn/` (Cloud badge), `/learn/cloud/` (GCP card) |
| **Visual inspection** | Cloud landing, GCP landing and Lesson 1 reviewed at 1366 and 360: opening, toolbox with emojis, StudyBuddy project, Cloud Shell command, challenge, Lesson 2 VM diagram, course path. No issues. |

## 20. Files added

- `learn/cloud/gcp/getting-started/index.html`
- `docs/learn/reports/TechBuzzApps_PhaseL2D_GCP_Beginner_Course_Lesson1_Report.md`

## 21. Files modified

- `learn/cloud/gcp/index.html`: the L1A placeholder was replaced by the **GCP for Beginners** course landing (same URL).
- `learn/cloud/index.html`: GCP card description, pills (Lesson 1 link) and "1 lesson" badge. AWS card untouched.
- `learn/index.html`: Cloud card badge "Roadmap" → "1 lesson".

## 22. Files intentionally not modified

- `assets/css/style.css`, `assets/css/learn.css`, `assets/js/common.js`, `components/*`: **no CSS or JS was needed.**
- `learn/cloud/aws/index.html`, and all Compose, Combine, SwiftUI, Swift and Math content.
- Android, React, AI & Python, System Design and Career; Apps, Dharma Connect and Simply Inspiring.

## 23. Known limitations

- **Source granularity:** see §10. Connective prose the brief described rather than quoted was written in the lesson's voice.
- **Console specifics are deliberately minimal.** Google changes the Console UI, so the lesson avoids menu positions and screenshots and points learners to the Console's search. Example region names (`us-central1`, `europe-west2`) and the Project ID behaviour reflect current Google Cloud conventions.
- **Emoji rendering depends on the system emoji font.** Glyphs look slightly different across Windows, macOS, iOS and Android; that's expected for Unicode emoji.
- The challenge has no checking, by design.
- The "1 lesson" badges are hand-maintained.

## 24. Recommended next phase

**L2E — GCP Lesson 2: Your First Server in the Cloud** (`/learn/cloud/gcp/your-first-server/`). Create a Compute Engine VM, SSH in, open the firewall and host a tiny web page, following the VM diagram that Lesson 1 already previews. When it ships:
- turn the Lesson 1 "next" placeholder, the landing path item and the sidebar entry into links;
- update the badges;
- add a clear cost/cleanup note, since this is the first lesson that creates billable resources.

## 25. Git state

- **Before L2D:** clean at `de45421` (Jetpack Compose L2C committed).
- **After L2D:**
  ```
   M learn/cloud/gcp/index.html
   M learn/cloud/index.html
   M learn/index.html
  ?? docs/learn/reports/TechBuzzApps_PhaseL2D_GCP_Beginner_Course_Lesson1_Report.md
  ?? learn/cloud/gcp/getting-started/
  ```
  **All uncommitted changes belong to Phase L2D.** `git diff --check` is clean.
