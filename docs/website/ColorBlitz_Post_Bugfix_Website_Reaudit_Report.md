# ColorBlitz Post-Bugfix Website Documentation Re-Audit

**Audit date:** 2026-10-12
**Current Git revision:** `03f1f94919a9ac1ad4f90242e26eafe1043f25e1` (`Leaderboard bug fixes`)
**Scope:** Read-only audit of current iOS source/tests and updates to website Markdown documentation. No Swift, tests, project settings, assets, StoreKit configuration, or website HTML/CSS changed. No commit, push, deployment, or physical-device test was performed.

Evidence labels in the updated website documents are **VERIFIED IN CURRENT SOURCE**, **EXTERNAL VERIFICATION REQUIRED**, and **LEGAL APPROVAL REQUIRED**. The original [Mac audit validation report](ColorBlitz_Mac_Audit_Validation_Report.md) was retained unchanged as historical evidence, including its historical test results and findings.

## 1. Recent implementation changes

The current `HEAD` is the `feature/PrepRelease` branch commit `03f1f94`, following `666b6e9` (`Merge pull request #3 from Ani-Adhikary/feature/GamePremium`). The working tree was clean before this documentation task.

The latest implementation commit adds the iOS 18.6 deployment target, category-specific Classic/Endless Game Center boards, persisted competitive categories, Classic persisted-score plausibility checks, and account-owned Game Center submissions. It adds schema migration `v7_game_center_ownership`, which stores the Game Center owner ID captured at the start of a competitive run. Source changes also wire that captured ID from Classic and Endless launch/replay paths into the completed session. Related tests cover eligibility, ownership, account switching, migration, synchronization, and read states.

The current implementation still has exactly four Game Center leaderboard IDs. No achievement reporting was introduced. The source retains local session history, rewards, aggregate bests, progression, and the local guest identity independently of Game Center authentication.

## 2. Previous documentation inaccuracies

- The website master handoff listed iOS 26.4 as the minimum. Current project, app, unit-test, and UI-test Debug/Release build settings use iOS 18.6.
- The Game Center configuration page described only the older unsplit Classic and Endless boards, and claimed the Classic persisted-score plausibility safeguards were missing. Current source has four category-specific boards and applies both Classic accuracy and persisted plausibility checks.
- Website Game Center descriptions did not explain run ownership. Current sessions persist the authenticated `teamPlayerID` captured at run start; account-specific selection prevents a session owned by one account from being selected for another.
- The privacy inventory described the Game Center ID as only a UserDefaults submission-key value. It is also persisted in SQLite on newly completed competitive sessions. Historical and signed-out sessions have unknown/unassigned ownership.
- The game center player model's source comment in `GameCenterService.swift` still says its ID is “Never written to SQLite.” That comment is stale relative to the session persistence implementation. The runtime persistence path was inspected and the documentation now describes current behavior; this source comment is recorded as a follow-up code-maintenance item and was not changed under the read-only code restriction.
- The deployed page `https://techbuzzapps.com/apps/colorblitz/` returned HTTP 404 during this audit. The web inspection tool also could not open it. Therefore no deployed page copy, layout, or live route structure could be confirmed.

The separate historical Mac report contains old source snapshots and results; it was deliberately not edited or treated as current source evidence.

## 3. Updated source-verified behavior

### Game Center identifiers and eligibility

The four active IDs in `GameCenterIdentifiers.swift` are:

| Mode | Category | ID |
|---|---|---|
| Classic | Standard | `com.aniadhikary.ColorBlitz.leaderboard.classic.standard` |
| Classic | Assisted | `com.aniadhikary.ColorBlitz.leaderboard.classic.assisted` |
| Endless | Standard | `com.aniadhikary.ColorBlitz.leaderboard.endless.standard` |
| Endless | Assisted | `com.aniadhikary.ColorBlitz.leaderboard.endless.assisted` |

**VERIFIED IN CURRENT SOURCE:** Classic's mode/category query requires a current-rules, 60-second, non-Daily session saved after the local eligibility boundary; at least one answer; at least 60% accuracy; no more than 401 accepted answers; `(total answers − 1) × 150 ms ≤ 60,000 ms`; score at most 30 per correct answer; and no more than 12,030 total. The first answer has no lock interval and an answer exactly at the 60-second deadline is accepted by the existing phase policy.

**VERIFIED IN CURRENT SOURCE:** Endless's mode/category query requires current Endless rules, no continue (`revive_count == 0`), at least one answer, positive score, at most 30 points per correct answer, and enough active time for the 150 ms lock between successive correct answers. Endless has no separate accuracy cutoff. Coin and rewarded-ad continues both exclude the run from Game Center; the continued session remains in local history and local bests.

### Account ownership, account switching, and synchronization

GameKit `GKLocalPlayer.teamPlayerID` is the stable Game Center owner key. Classic and Endless capture the currently authenticated ID at run start and carry it through `CompletedSessionDraft`, `GameSessionRecord`, and SQLite. An account change during a run does not reassign it. The v7 migration added nullable `game_center_owner_id` and an owner/mode/category/score index without backfilling historical rows.

Sync requests eligible best scores only where persisted owner equals the currently authenticated account. Thus an A-owned score cannot be selected while B is active, and returning B→A restores A's own eligible records. A signed-out run and historical session with NULL owner remain local-only after sign-in; no implicit claim UI or historical claiming is implemented. Local guest ID, history, personal bests, rewards, and statistics remain in SQLite and are not deleted or partitioned on account switch.

Successful high-water marks are stored in UserDefaults by account ID and leaderboard ID. The Classic eligibility boundary is also stored in UserDefaults under the local guest. Sync is requested on app launch, Game Center authentication change, app activation, and after eligible saves. A failed submission does not advance the success marker and is retried from SQLite on a later opportunity. Service/client identity checks before and after async submission reduce account-switch races; actual Apple server attribution during a race still requires a two-account live test. A process crash after server success but before marker persistence could cause a duplicate best-score submission; it does not delete or lower the remote score.

### Rankings, dashboard, errors, and achievements

GameKit requests global all-time ranks 1–10 and separately loads the authenticated player's own entry/rank, including when outside the top ten. The view provides loading, sign-in-required, unavailable, no-score, empty-list, and retry states. The selected-board Game Center dashboard uses the GameKit access point. Leaderboard reads do not submit a score. Submission failures are logged and retried later; the source does not show a dedicated player-facing submission-failure alert. **VERIFIED IN CURRENT SOURCE**.

No achievement identifiers or `GKAchievement` reporting path were found. Do not advertise achievements. **VERIFIED IN CURRENT SOURCE**.

The four IDs, their existence, display names/localizations, enablement, score format, sort order, release-version association, and live ranks are not established by source. All require **EXTERNAL VERIFICATION REQUIRED** in App Store Connect and Game Center sandbox/TestFlight.

### Gameplay, rewards, subscriptions, settings, and privacy

- **Classic:** 60 seconds. Correct answer score is 10 plus 2 per combo step up to a 20-point bonus (30 maximum per correct answer); wrong answers score zero and reset combo. Hints can downgrade a run's persisted category to Assisted; disabling hints does not restore Standard in that run. **VERIFIED IN CURRENT SOURCE**.
- **Endless:** survival with response windows from 2.5 seconds down to 1.2 seconds, pause/resume, and at most one continue per run. Continue costs 100 coins or one earned rewarded ad. Continue does not grant coins/XP and makes the run ineligible for Game Center. **VERIFIED IN CURRENT SOURCE**.
- **Daily Challenge:** deterministic daily Classic-style challenge, local completion/streak tracking, a one-time 5-coin completion bonus per date, and no leaderboard submission. **VERIFIED IN CURRENT SOURCE**.
- **Color Master:** 60-second timed mode, 2 seconds removed for a wrong answer, tiers at 0/8/16/26 correct answers. Premium provides unlimited runs; otherwise one run costs 500 coins. No ad unlock path. **VERIFIED IN CURRENT SOURCE**.
- **Coins and XP:** versioned Classic session rewards; perfect Classic adds 10 coins; Daily gives 5 coins and 0 XP once per challenge date; an earned coin ad gives 10 coins up to five per local day, shared across Store and result surfaces. Rewarded Endless Continue grants no coins/XP. **VERIFIED IN CURRENT SOURCE**.
- **Premium:** monthly/yearly StoreKit 2 products grant the same entitlement when verified, unrevoked, and unexpired. Premium suppresses forced interstitials and unlocks Color Master; voluntary rewarded ads remain. Purchase/restore, pending/cancelled/unverified/failure messages, transaction updates, foreground refresh, and entitlement expiry are handled in source. Live prices, offer status, and subscription metadata remain external. **VERIFIED IN CURRENT SOURCE**.
- **Ads:** interstitials are considered only on explicit Play Again after two persisted non-Daily Classic rounds, at least 60 seconds after the last successful presentation; cadence is process-local and resets after relaunch. Rewarded coin ads share the five/day limit. Consent/configuration/load failures can make ads unavailable. A Premium change does not dismiss an interstitial that has already begun presenting. **VERIFIED IN CURRENT SOURCE**.
- **Settings and notifications:** sound, color hints, theme, onboarding, and reminder preference are local settings. Daily Challenge reminders are opt-in, requested only after user action, and scheduled for 7 p.m. local time. **VERIFIED IN CURRENT SOURCE**.
- **Privacy and persistence:** local guest UUID, game history, rewards, progression and Game Center owner IDs are held in the Application Support SQLite database; preferences and Game Center high-water marks/boundary use UserDefaults. The app privacy manifest declares the UserDefaults required-reason API. StoreKit and GameKit use Apple services; ads/consent use Google SDKs. The source does not justify claiming “no personal data is collected”; provider behavior, final archive manifests, App Store privacy answers, tracking, backup, retention and deletion details need **EXTERNAL VERIFICATION REQUIRED** and privacy/legal review.

## 4. Focused tests executed

Environment checked before testing: Xcode 26.4 (17E192), 12 GiB available on `/` and `/tmp`, booted iPhone 16 Pro / iOS 18.6 simulator. The full suite was not run, no physical device was used, and no second test attempt was needed.

The single serial focused `xcodebuild test` selection used an isolated result path outside DerivedData: `/tmp/ColorBlitz-WebsiteReaudit-20261012.xcresult`. Result: **161 discovered, 161 passed, 0 failed, 0 skipped**, across these nine suites:

| Suite | Passed |
|---|---:|
| `GameCenterServiceTests` | 13 |
| `GameCenterLeaderboardSyncTests` | 29 |
| `EndlessGameCenterLeaderboardTests` | 29 |
| `GameCenterLeaderboardViewModelTests` | 10 |
| `ClassicAnswerIntegrityTests` | 16 |
| `EndlessContinueTests` | 33 |
| `CompetitiveCategoryPersistenceTests` | 2 |
| `LocalDatabaseFoundationTests` | 19 |
| `LocalDatabaseMigrationAndFailureTests` | 10 |
| **Total** | **161** |

Tests use mocked Game Center identities and isolated test databases. They verify ownership routing and A→B→A behavior, signed-out/historical owner isolation, mid-run and in-flight account changes, retry/high-water behavior, Classic plausibility, Endless continuation exclusion, persistence/migration, ranking states and the GameKit service boundary. They do not prove live server delivery, App Store Connect configuration, AdMob serving, StoreKit production purchasing, or actual privacy-provider behavior. Result log: `/tmp/ColorBlitz-WebsiteReaudit-20261012.log`.

## 5. Documents modified

- `ColorBlitz_Website_Master_Handoff.md`
- `ColorBlitz_Marketing_Content.md`
- `ColorBlitz_Support_FAQ.md`
- `ColorBlitz_Premium_Subscription_Spec.md`
- `ColorBlitz_Privacy_Data_Inventory.md`
- `ColorBlitz_Terms_Legal_Requirements.md`
- `ColorBlitz_GameCenter_Configuration.md`
- `ColorBlitz_Website_Assets_Checklist.md`
- This report.

`ColorBlitz_Mac_Audit_Validation_Report.md` was not modified so its original Mac audit and test evidence remains historical.

## 6. Website impact matrix

The requested route is the only confirmed URL. It returned HTTP 404 on audit date, so the route labels below describe likely page sections mapped by the handoff docs; they do not assert that deployed pages currently exist. Shared TechBuzzApps design remains the requirement for every page.

| Website page | Change required | Reason | Source evidence |
|---|---|---|---|
| Landing | Yes, if/when published | Verify minimum OS, four modes, four leaderboard categories, and account-at-run-start explanation; avoid saying all saved scores automatically rank. | `project.pbxproj`; `GameCenterIdentifiers.swift`; `GameCenterLeaderboardSync.swift`; `CompletedSessionDraft.swift` |
| Support | Yes | Explain signed-out/history local-only handling, same-account score submission, missing-score eligibility, retry timing, and Game Center empty/unavailable states. | `LeaderboardView.swift`; `GameCenterLeaderboardViewModel.swift`; `LocalGameSessionRepository.swift` |
| Premium | No material entitlement correction; add limits to internal spec | Existing core Premium claims match. Clarify optional rewarded ads remain and note process-local cadence/already-presenting interstitial edge in the handoff/spec. | `PurchaseService.swift`; `PremiumPurchaseCard.swift`; `InterstitialAdCoordinator.swift` |
| Privacy | Yes | Disclose that the current authenticated Game Center owner ID is persisted on new completed competitive sessions; old/signed-out ownership remains NULL. Provider/privacy classification needs review. | `LocalDatabaseMigrator.swift`; `GameSessionRecord.swift`; `GameCenterService.swift` |
| Terms | Yes, subject to legal approval | Terms draft should describe account ownership and local-only unassigned/history scores without inventing remote or legal guarantees. | `GameSessionRecord.swift`; owner-specific query methods in `LocalGameSessionRepository.swift`; `GameCenterLeaderboardSync.swift` |

Exact public page hierarchy and deployed copy are **EXTERNAL VERIFICATION REQUIRED** because the supplied page currently returns 404 and the website repository was outside scope.

## 7. Public-facing copy recommended

Suggested concise leaderboard copy:

> Eligible scores go to the Game Center account signed in when you start the run. Scores from signed-out play and older history stay on your device and are not added to a later account automatically. Daily Challenge and continued Endless runs do not appear on leaderboards.

Publish only after the four boards are verified in App Store Connect. Avoid technical terms such as `teamPlayerID`, SQLite, migration, eligibility boundary, or high-water mark in player-facing copy. Do not promise live rankings, specific leaderboard names, or achievements without external evidence.

## 8. External verification, privacy, legal, and remaining risks

- **EXTERNAL VERIFICATION REQUIRED:** Confirm the four exact IDs, leaderboard configuration/localizations, enabled app version, signing capability, live board availability, and actual two-account submission attribution in sandbox/TestFlight.
- **EXTERNAL VERIFICATION REQUIRED:** Confirm the public site route and actual page hierarchy; the supplied route was HTTP 404. Supply approved App Store listing URL and screenshots.
- **EXTERNAL VERIFICATION REQUIRED:** Verify StoreKit product status, group, prices, territories and offers; ad account/ad unit/release settings and live fill; UMP consent behavior; final aggregate privacy manifest; provider data practices; backup inclusion and retention behavior.
- **LEGAL APPROVAL REQUIRED:** Review Privacy Policy wording for the newly stored Game Center owner ID and Apple/Google service data; approve Terms/account-switch copy, subscription disclosure, retention/deletion statements, support/legal identity, and jurisdiction.
- **Remaining release risk:** Client-side account filtering and async identity rechecks are tested with mocks but cannot prove what Apple records at the exact instant of a live authentication race. Manual two-account validation remains required.
- **Remaining release risk:** `GameCenterPlayer` has a stale source comment saying its ID is never stored in SQLite. The implementation persists it on competitive sessions. This is not a runtime failure found in this audit; production-code edits were prohibited, so it is reported for a separate maintenance fix.
- **Remaining release risk:** There is no account claim flow for signed-out or historical scores. Those records stay local-only by design in this release.

## 9. Final validation

The requested eight website documents now agree on iOS 18.6, exact four-board IDs, current Classic/Endless eligibility, account ownership, the treatment of historical and signed-out scores, Premium/rewarded-ad limits, and privacy storage. All source assertions use the current-source label; external configuration and legal/privacy assertions remain explicitly pending. The Mac audit file is unchanged. No website markup/styles were changed, preserving the shared TechBuzzApps design. `git diff --check` was run after the documentation edits and passed.
