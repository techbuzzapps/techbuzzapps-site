# ColorBlitz Website Master Handoff

Audit date: 2026-10-12. Scope: current-source re-audit and focused simulator tests. The separate TechBuzzApps website repository was not opened or changed. The supplied ColorBlitz page URL returned HTTP 404 during this audit, so deployed copy and layout could not be inspected.

## Evidence labels

- **VERIFIED IN CURRENT SOURCE** — confirmed in the checked-in app source or project files.
- **EXTERNAL VERIFICATION REQUIRED** — depends on App Store Connect, a live provider account, current provider policy, or supplied business information.
- **LEGAL APPROVAL REQUIRED** — needs developer/counsel review before publication.

## Verified product facts

| Topic | Finding | Evidence |
|---|---|---|
| App identity | Display name “Color Blitz”; bundle ID `com.aniadhikary.ColorBlitz`; minimum iOS deployment target 18.6; iPhone and iPad device families (`1,2`). | **VERIFIED IN CURRENT SOURCE** — project and app/test target Debug/Release build settings. |
| Orientations | iPhone portrait and both landscape orientations; iPad portrait, upside-down, and both landscape orientations. | **VERIFIED IN CURRENT SOURCE** — project generated Info.plist orientation settings. |
| Modes | Classic, Endless, Daily Challenge (a ruleset on Classic sessions), and Color Master are implemented. `GameMode.speed` exists as a persisted/label case but no playable Speed flow is exposed. | **VERIFIED IN CURRENT SOURCE** — `Domain/Entities/GameMode.swift`, `Features/Play/PlayView.swift`, game view models. |
| Classic | 60-second round. Correct answers score 10 plus 2 points per combo step, combo bonus capped at 10; wrong answer resets combo. Color palette expands after 8, 16, and 24 correct answers. | **VERIFIED IN CURRENT SOURCE** — `Services/ClassicScoringService.swift`, `Features/Play/ClassicGameViewModel.swift`, `Domain/Gameplay/PaletteProgression.swift`. |
| Endless | Survival mode with a shrinking response window (2.5 seconds initially, down to 1.2 seconds); pause and resume are present. At most one continue per run, by 100 coins or one earned rewarded ad. | **VERIFIED IN CURRENT SOURCE** — `Domain/Endless/EndlessRules.swift`, `Features/Play/EndlessGameViewModel.swift`, `Features/Play/EndlessGameScreen.swift`. |
| Daily Challenge | One deterministic daily 60-second Classic-style challenge, completion history and derived streak. Completing it awards a 5-coin daily bonus; repeated same-day play does not award the challenge bonus again. | **VERIFIED IN CURRENT SOURCE** — `Domain/Challenges/DailyChallengeDefinition.swift`, `DailyChallengeRewardPolicy.swift`, `Features/Play/DailyChallengeStatusModel.swift`, local repositories. |
| Color Master | 60-second timed mode, wrong answers cost 2 seconds. Four difficulty tiers (Learn, Shades, Families, Master) unlock at 0, 8, 16, and 26 correct answers. Premium grants unlimited access; otherwise one run costs 500 coins. No ad unlock. | **VERIFIED IN CURRENT SOURCE** — `Domain/ColorMaster/ColorMasterRules.swift`, `Features/ColorMaster/ColorMasterAccess.swift`, `Domain/Premium/PremiumModePassPolicy.swift`. |
| Progress and Store | Progress displays level, player best score/games, leaderboards, recent results. Store displays coin balance, optional rewarded coin ads, and Premium subscription purchase UI. | **VERIFIED IN CURRENT SOURCE** — `Features/Progress/ProgressTabView.swift`, `Features/Store/StoreView.swift`. |
| Profile and Settings | Profile includes local guest identity, Game Center status/dashboard, theme and gameplay preferences, reminder controls, How to Play, and conditional ad privacy options. | **VERIFIED IN CURRENT SOURCE** — `Features/Profile/ProfileView.swift`, `Core/Settings`, `Core/Notifications`. |
| Persistence and identity | GRDB/SQLite stores a local guest UUID, sessions, daily completions, progression, rewards, and nullable Game Center run-owner IDs in Application Support. UserDefaults stores preferences, the Classic eligibility boundary, and per-account/per-board successful-submission high-water marks. Existing sessions keep unknown ownership; local progress is not partitioned or deleted on account changes. | **VERIFIED IN CURRENT SOURCE** — `Data/Persistence`, `Data/Local`, `Services/GameCenter`, `Core/Settings`. |
| Ads/consent | Google Mobile Ads 13.11.0 and UMP 3.1.0 are dependencies. Consent is refreshed before requests; privacy options appear only when UMP says required. | **VERIFIED IN CURRENT SOURCE** — `Package.resolved`, `Services/Advertising/AdvertisingService.swift`. Provider collection practices need review. |
| Purchases | StoreKit 2 monthly/yearly auto-renewable products grant the same Premium entitlement. Entitlement is derived from verified current StoreKit entitlements and rechecked on events/foreground/expiry. | **VERIFIED IN CURRENT SOURCE** — `Services/Purchases/PurchaseService.swift`, `ColorBlitzPremium.storekit`. Live product status/offers require external verification. |
| Game Center | Four score leaderboards: Classic Standard/Assisted and Endless Standard/Assisted. Classic eligibility checks accuracy and persisted-run plausibility; Endless excludes continued runs and implausible records. Current-player rank and worldwide all-time top-ten standings are read, and the native Game Center dashboard is available. No achievements implemented in source. | **VERIFIED IN CURRENT SOURCE** — `Services/GameCenter`, `LocalGameSessionRepository`, and leaderboard views. App Store Connect records are not available in this workspace. |
| Game Center ownership | A competitive run captures the authenticated Game Center account when it starts. Scores can sync only to that same account. Signed-out runs and historical rows with unknown ownership stay local and are not automatically claimed after sign-in. Local guest identity and progress remain separate and are preserved across account switches. | **VERIFIED IN CURRENT SOURCE** — run view models, v7 SQLite migration, owner-filtered queries, sync and submission service. |
| Review | Eligible positive completed sessions may trigger the system review request API under a cooldown/eligibility policy. The app cannot promise a prompt or review. | **VERIFIED IN CURRENT SOURCE** — `Features/Review`, `Services/Review`. |
| Accessibility/appearance | Dynamic Type, accessibility labels/identifiers, haptics, reduced-motion handling, adaptive widths, and selectable Dark Aurora/Light Aurora themes exist. | **VERIFIED IN CURRENT SOURCE** — `Core/Theme`, `Features/Play`, other SwiftUI views. Exact VoiceOver/manual coverage needs device QA. |
| Network/analytics | No app-owned analytics, crash-reporting, or general networking client was found in searched app source. Ad SDK traffic and Apple service traffic still exist. | **VERIFIED IN CURRENT SOURCE** for searched source only; **EXTERNAL VERIFICATION REQUIRED** for SDK transitive behavior and live traffic. |

## Free / Premium ad summary

**VERIFIED IN CURRENT SOURCE:** Free users are eligible for interstitials only after at least two persisted non-Daily Classic rounds and at least 60 seconds since the last successful interstitial. Placement is the explicit Play Again action. Daily Challenge and Endless do not count for or show that interstitial. A rewarded coin ad is optional, grants 10 coins only after the earned callback, maximum five per local day (50 coins), shared between Store and result surfaces. An Endless rewarded continue is optional, grants only one continuation per run, and awards no coins/XP. Premium suppresses interstitials and unlocks Color Master; it does not suppress voluntary rewarded ads. Ad failures/unavailability skip the interstitial without blocking Play Again; consent failure disables requests. Release ads require valid production app and both matching publisher ad-unit IDs; release ads are disabled if configuration is incomplete. Debug uses Google test IDs when a syntactically valid app ID is present.

Interstitial cadence is process-local; it resets after app relaunch. **VERIFIED IN CURRENT SOURCE** — `InterstitialAdCoordinator`. Do not promise a cross-launch frequency limit.

## Game Center score ownership for player-facing copy

Use plain language: “Eligible scores go to the Game Center account signed in when you start the run. Scores from signed-out play and older history stay on your device and are not added to a later account automatically.” Avoid claiming that changing accounts transfers saved scores. The app retains local sessions and progression when Game Center is signed out or changes accounts. This behavior is **VERIFIED IN CURRENT SOURCE**. Actual leaderboard availability and server attribution are **EXTERNAL VERIFICATION REQUIRED**.

## Approval status and missing inputs

- **VERIFIED IN CURRENT SOURCE:** the claims above are traceable to local project files. Source review is not App Store approval, legal review, or live-service verification.
- **EXTERNAL VERIFICATION REQUIRED:** App Store Connect app record, live availability, age rating, territory availability, product identifiers, price/offer display, subscription group, four leaderboard records, actual two-account Game Center attribution, app privacy answers, ad IDs/account state, and actual signed Release archive settings.
- **LEGAL APPROVAL REQUIRED:** Privacy Policy, Terms, EULA choice, subscription disclosures, developer identity/contact/jurisdiction, data retention/deletion statements, and any provider-specific privacy explanations.
- Website URL supplied by the requester: `https://techbuzzapps.com/apps/colorblitz/`. Do not infer a listing URL from the bundle identifier.
- No app support email, legal entity, address, jurisdiction, or approved App Store URL was found in source. Mark pending; do not invent one.

## Website design handoff

**VERIFIED IN CURRENT SOURCE / supplied brand direction:** TechBuzzApps uses one common visual design across all apps. ColorBlitz pages must reuse the existing TechBuzzApps colors, typography, cards, buttons, header/footer, and layout conventions. Do not create an Aurora-gradient website theme, separate ColorBlitz CSS theme, or app-specific website design system. Aurora is an in-app appearance choice, not a website design instruction.

## Source index

See the companion Premium, Privacy, Game Center, Marketing, FAQ, Legal, and Assets documents and `ColorBlitz_Post_Bugfix_Website_Reaudit_Report.md`. Primary source areas: `ColorBlitz.xcodeproj/project.pbxproj`; `Config/`; `ColorBlitz/PrivacyInfo.xcprivacy`; `ColorBlitz/Domain/`; `ColorBlitz/Services/`; `ColorBlitz/Features/`; `ColorBlitz/Data/`; `ColorBlitz/Core/`; `ColorBlitz.xcodeproj/project.xcworkspace/xcshareddata/swiftpm/Package.resolved`.
