# TechBuzz Apps — Phase L1A: Cloud & AI/Python Taxonomy Expansion

**Scope:** Extend the Learn information architecture established in Phase L1 to include Cloud (GCP, AWS) and AI & Python (Python, Python for AI, Machine Learning, Generative AI). Information architecture only — no lesson content.
**Type:** Static HTML, reusing the existing `style.css` + `learn.css`. No new stylesheets, no JavaScript, no dependencies.
**Date:** 2026-09-26

---

## Purpose

Phase L1 proved out the Learn architecture with a single fully-built branch (iOS → Swift → Closures) and lightweight landing pages for Android, React, System Design, and Career. Phase L1A extends that same pattern to two new subject areas — Cloud and AI & Python — before any article-writing phase begins, so that the site's taxonomy, URLs, and navigation are fully in place ahead of content production. As with L1, this phase deliberately stops at landing pages and roadmaps: no GCP, AWS, Python, ML, or GenAI lesson exists yet.

## New Information Architecture

```text
/learn/
├── ios/                    (Phase L1 — unchanged)
├── android/                (Phase L1 — unchanged)
├── react/                  (Phase L1 — unchanged)
├── cloud/                              ← new
│   ├── gcp/                            ← new
│   └── aws/                            ← new
├── ai-python/                          ← new
│   ├── python/                         ← new
│   ├── python-for-ai/                  ← new
│   ├── machine-learning/               ← new
│   └── generative-ai/                  ← new
├── system-design/          (Phase L1 — unchanged)
└── career/                 (Phase L1 — unchanged)
```

`/learn/index.html` now links to seven categories in this order: iOS, Android, React, Cloud, AI & Python, System Design, Career — matching the order specified for this phase.

## Cloud Structure

`/learn/cloud/` is a lightweight hub (mirroring `/learn/ios/`'s hub pattern) with two category cards — Google Cloud Platform (GCP) and Amazon Web Services (AWS) — each with a short description and a 4-item topic-pill preview, all marked `is-future` since no cloud article exists yet. Each card links to its own full landing page.

### GCP Roadmap (`/learn/cloud/gcp/`)

Full roadmap list (all shown as "Coming soon", no links):

Cloud Fundamentals, IAM, Compute Engine, Cloud Storage, VPC / Networking, Cloud Run, Cloud Functions, Pub/Sub, Cloud SQL, Firestore, Secret Manager, Google Kubernetes Engine (GKE), Monitoring & Logging, Cloud Architecture, Hands-on Projects.

The page's intro explicitly states the eventual content philosophy — each future topic will combine concepts, practical examples, console-based hands-on exercises, and architecture/use cases — per the brief's requirement, without implying any of that content exists yet.

### AWS Roadmap (`/learn/cloud/aws/`)

Full roadmap list (all shown as "Coming soon", no links):

Cloud Fundamentals, IAM, EC2, S3, VPC, Lambda, API Gateway, RDS, DynamoDB, ECS, EKS, CloudWatch, AWS Architecture, Hands-on Projects.

Same intro philosophy statement as GCP, adapted to AWS.

## AI & Python Structure

`/learn/ai-python/` introduces the four-step learning progression as four cards (reusing the same `.apps`/`.card` grid as every other hub), each numbered and linking to its own landing page, with a short topic-pill preview distributing the brief's "future expansion" list across the step where it logically belongs:

1. **Python Foundations** (`/learn/ai-python/python/`) — core language fundamentals.
2. **Python for AI** (`/learn/ai-python/python-for-ai/`) — data tooling on top of Python.
3. **Machine Learning** (`/learn/ai-python/machine-learning/`) — ML and neural-network fundamentals.
4. **Generative AI** (`/learn/ai-python/generative-ai/`) — LLMs, retrieval, and agents.

### Future Learning Progression (full roadmap per track)

| Track | Topics (all "Coming soon") |
|---|---|
| Python Foundations | Python Basics, Data Types & Control Flow, Functions & Modules, Object-Oriented Python, Working with Files & Exceptions |
| Python for AI | NumPy, Pandas, Data Handling, Data Visualization |
| Machine Learning | Machine Learning Basics, Neural Network Fundamentals, Model Training & Evaluation, Practical ML Workflows |
| Generative AI | LLM Fundamentals, Embeddings, Vector Search, Retrieval-Augmented Generation (RAG), AI Agents, Production AI Applications |

The brief's future-expansion list (NumPy, Pandas, data handling, visualization, machine learning, neural-network fundamentals, LLM fundamentals, embeddings, vector search, RAG, AI agents, production AI applications) maps directly onto these four tracks; "Python Foundations" topics were filled in with reasonable core-language subjects (basics, control flow, functions, OOP, file/error handling) since the brief didn't enumerate them explicitly — the same approach Phase L1 used for the Swift roadmap.

## Files Added

**Pages (10 new):**
- `learn/cloud/index.html`
- `learn/cloud/gcp/index.html`
- `learn/cloud/aws/index.html`
- `learn/ai-python/index.html`
- `learn/ai-python/python/index.html`
- `learn/ai-python/python-for-ai/index.html`
- `learn/ai-python/machine-learning/index.html`
- `learn/ai-python/generative-ai/index.html`
- `docs/learn/reports/TechBuzzApps_PhaseL1A_Cloud_AI_Python_Taxonomy_Report.md` (this report)

**Directories created:** `learn/cloud/`, `learn/cloud/gcp/`, `learn/cloud/aws/`, `learn/ai-python/`, `learn/ai-python/python/`, `learn/ai-python/python-for-ai/`, `learn/ai-python/machine-learning/`, `learn/ai-python/generative-ai/`.

No new CSS or JavaScript files were added — see **Styling**, below.

## Files Modified

- **`learn/index.html`** — added two new category cards (Cloud, AI & Python) between React and System Design, using the exact same `.card`/`h2`/`.app-title` markup pattern as the existing five cards. The page's `<meta name="description">` was also updated to mention Cloud and AI & Python. No other structural change was made and the existing five cards were left as-is.

No other file was modified in this phase. `assets/css/style.css`, `assets/css/learn.css`, the Swift Closures article, Dharma Connect, Simply Inspiring, and every other Phase L1 file are untouched.

## Styling

No new stylesheet was created. Every new page loads the same `assets/css/style.css` + `assets/css/learn.css` pair established in Phase L1, and every new page is built entirely out of components that already existed:

- `.site-header` / `.top-nav` / `.breadcrumbs` / `.learn-intro` for the page shell.
- `.apps` / `.card` for hub-level category cards (Cloud hub, AI & Python hub).
- `.topic-list` / `.topic-pill.is-future` for short topic previews on card grids.
- `.page-content` / `.features` / `.card-badge` for the full "Coming soon" roadmap lists on the GCP, AWS, and each AI & Python track's landing page — identical to the pattern already used by `/learn/ios/swift/`, `/learn/ios/swiftui/`, and `/learn/ios/interview/` in Phase L1.

No `cloud.css`, `gcp.css`, `aws.css`, `python.css`, or `ai.css` was created — nothing in this phase needed styling that the existing Learn component set couldn't already express, and the brief explicitly asked for those files to be skipped unless a genuine need existed. If a future phase adds real hands-on Cloud content (e.g. console screenshots, terminal-style command blocks) or Python/notebook-style output blocks, that's a reasonable trigger to introduce a targeted stylesheet at that time.

## Validation

- Ran a local static file server from the repository root.
- Requested every URL listed in the brief's validation checklist plus the existing Phase L1 pages and homepage/app pages as a regression check — **all returned HTTP 200**: `/learn/`, `/learn/cloud/`, `/learn/cloud/gcp/`, `/learn/cloud/aws/`, `/learn/ai-python/`, `/learn/ai-python/python/`, `/learn/ai-python/python-for-ai/`, `/learn/ai-python/machine-learning/`, `/learn/ai-python/generative-ai/`, `/learn/ios/`, `/learn/ios/swift/`, `/learn/ios/swift/closures/`, `/learn/android/`, `/learn/react/`, `/learn/system-design/`, `/learn/career/`, `/assets/css/style.css`, `/assets/css/learn.css`, `/`, `/dharmaconnect/`, `/simplyinspiring/`.
- Extracted every unique `href="/..."` target referenced anywhere under `learn/` and confirmed each one resolves to a real, existing path with no 404s.
- Confirmed CSS resolves correctly from the newly nested pages (`/learn/cloud/gcp/`, `/learn/ai-python/generative-ai/`, etc.) via their root-relative `<link>` tags.
- Confirmed breadcrumbs are present and correct on every new page (e.g. `TechBuzz Apps / Learn / Cloud / GCP`, `TechBuzz Apps / Learn / AI & Python / Generative AI`).
- Searched the entire `learn/` tree for `href="#"` — zero matches.
- Searched the entire `learn/` tree for "Blog", "Premium", "ads.js", and "advertising" — zero matches.
- Since no new CSS was introduced and every new page reuses already-responsive Phase L1 components (`.apps` grid, `.features` list, `.card-badge`), no new horizontal-overflow risk was introduced; the longest new content (GCP's 15-item and AWS's 14-item roadmap lists) uses the same `.features` list pattern already validated for the Swift roadmap in Phase L1.
- Confirmed via `git status --short` that only the files listed above changed — no unrelated file (Dharma Connect, Simply Inspiring, the Swift Closures article, `components/navbar.html`, `assets/js/common.js`) was touched.

## Deferred Article/Content Work

Explicitly **not** built in this phase — same "landing pages and roadmaps only" boundary as Phase L1:

- Any actual GCP lessons (Cloud Fundamentals, IAM, Compute Engine, Cloud Storage, VPC/Networking, Cloud Run, Cloud Functions, Pub/Sub, Cloud SQL, Firestore, Secret Manager, GKE, Monitoring & Logging, Cloud Architecture, Hands-on Projects).
- Any actual AWS lessons (Cloud Fundamentals, IAM, EC2, S3, VPC, Lambda, API Gateway, RDS, DynamoDB, ECS, EKS, CloudWatch, AWS Architecture, Hands-on Projects).
- Any actual Python lessons (Python Basics, Data Types & Control Flow, Functions & Modules, Object-Oriented Python, Working with Files & Exceptions).
- Any actual Python-for-AI lessons (NumPy, Pandas, Data Handling, Data Visualization).
- Any actual Machine Learning lessons (ML Basics, Neural Network Fundamentals, Model Training & Evaluation, Practical ML Workflows).
- Any actual Generative AI lessons (LLM Fundamentals, Embeddings, Vector Search, RAG, AI Agents, Production AI Applications).
- Continuation of the Swift curriculum beyond Closures (untouched from Phase L1).
- Site search, Blog, Premium, or advertising in any form.
- Any of the prior full-site audit's unrelated findings (Simply Inspiring's empty legal pages, broken screenshots, broken support link, etc.) — none were in scope for this taxonomy-only phase.
- Any modification to Dharma Connect or Simply Inspiring.

---

## Report Path

`docs/learn/reports/TechBuzzApps_PhaseL1A_Cloud_AI_Python_Taxonomy_Report.md`
