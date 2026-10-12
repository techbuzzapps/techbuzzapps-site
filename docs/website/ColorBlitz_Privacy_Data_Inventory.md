# ColorBlitz Privacy and Data Inventory

Evidence labels: **VERIFIED IN CURRENT SOURCE**, **EXTERNAL VERIFICATION REQUIRED**, **LEGAL APPROVAL REQUIRED**.

This is an implementation inventory, not a privacy policy or App Store privacy declaration. Do not claim that no personal data is collected.

## Data categories and storage

| Category | App handling visible in source | Destination / notes |
|---|---|---|
| Guest identity | Random local UUID, created on first startup and stored in SQLite. No account creation or remote identity service found. | On-device Application Support database. **VERIFIED IN CURRENT SOURCE** |
| Gameplay/progression | Session score, answers, combo, duration, mode, timestamps, reward ledger, streak/completion history, player statistics. | GRDB/SQLite local DB. App source does not upload these to a ColorBlitz backend. **VERIFIED IN CURRENT SOURCE** |
| Preferences | Theme, sound, color hint, reminder choice, onboarding and review request bookkeeping. | UserDefaults. **VERIFIED IN CURRENT SOURCE** |
| Game Center account data | GameKit reads the authenticated account identifier, display name and, when requested, avatar; submits eligible scores and reads public leaderboard entries/current-player rank. A competitive session stores the run's `teamPlayerID` in SQLite so it can only be considered for submission to that same account. Older sessions and signed-out runs have unknown/unassigned ownership and are not automatically submitted. | Apple Game Center receives authentication, eligible score submissions, and leaderboard reads. The owner ID is stored with completed sessions in local SQLite; per-board successful-submission high-water marks are stored in UserDefaults under account-scoped keys. The local guest UUID remains a separate identity. **VERIFIED IN CURRENT SOURCE** |
| Purchase/subscription | StoreKit product lookup, purchase transaction verification, current entitlements, transaction updates and restore. | Apple StoreKit/App Store. App does not persist entitlement locally. **VERIFIED IN CURRENT SOURCE** |
| Advertising/consent | UMP consent state; Google Mobile Ads requests and ad earned callbacks. | Google SDK/provider systems; exact device identifiers, diagnostics, ad personalization, IP and event practices depend on SDK/provider configuration and policy. **EXTERNAL VERIFICATION REQUIRED** |
| Notifications | Local repeating reminder at 7:00 p.m.; preference stored locally. Permission is requested only after explicit opt-in. | On-device UserNotifications. No remote notification provider found. **VERIFIED IN CURRENT SOURCE** |
| Review request | Eligibility/attempt dates, version, completion IDs in UserDefaults; system review API requested conditionally. | Local preferences and Apple StoreKit review prompt. **VERIFIED IN CURRENT SOURCE** |

## Local storage, backup, retention, deletion

- SQLite path is `Application Support/ColorBlitz/colorblitz.sqlite` with `-wal`/`-shm` companion files; file protection is `completeUntilFirstUserAuthentication`. **VERIFIED IN CURRENT SOURCE** — `LocalDatabaseConfiguration.swift`.
- Migration `v7_game_center_ownership` adds a nullable `game_center_owner_id` session field and index. It leaves all earlier session owners unknown; it does not backfill the currently signed-in account. New authenticated competitive sessions persist their captured Game Center account ID; signed-out sessions keep NULL. This is a persistent identifier added to local storage and should be considered in the App Store privacy questionnaire and published Privacy Policy. **VERIFIED IN CURRENT SOURCE**; collection classification and disclosure are **EXTERNAL VERIFICATION REQUIRED** and **LEGAL APPROVAL REQUIRED**.
- Game Center display names and avatar images are used for current UI/ranking display; the source stores the account owner ID for session eligibility, but does not persist Game Center names or avatar images in the session database. **VERIFIED IN CURRENT SOURCE**.
- Application Support is included in normal device backups according to the source comment; no explicit backup-exclusion flag was found. Exact iCloud/device-backup behavior and restore semantics require device verification. **EXTERNAL VERIFICATION REQUIRED**.
- No in-app export, account deletion, database reset, or player-data deletion UI was found. Uninstall/reinstall retention behavior depends on platform backup/keychain conventions and is not promised by source. **VERIFIED IN CURRENT SOURCE** for absent UI in searched source; retention/deletion claim needs external review.
- UserDefaults and SQLite can contain multiple preference/identity/gameplay records. The app has no published retention schedule or remote deletion endpoint in source. **LEGAL APPROVAL REQUIRED** for public retention language.

## SDKs and versions

- GRDB.swift 7.11.1 — local SQLite persistence. **VERIFIED IN CURRENT SOURCE** (`Package.resolved`).
- Google Mobile Ads 13.11.0 — advertising. **VERIFIED IN CURRENT SOURCE**.
- Google User Messaging Platform 3.1.0 — consent messaging/options. **VERIFIED IN CURRENT SOURCE**.
- StoreKit 2 and GameKit — Apple platform frameworks. **VERIFIED IN CURRENT SOURCE**.
- No Firebase Analytics/Crashlytics, app-owned analytics service, crash reporting SDK, general-purpose API client, or URLSession use was found in source search. SDK transitive behavior and runtime traffic remain **EXTERNAL VERIFICATION REQUIRED**.

## Consent and tracking

- UMP consent information refreshes at ad-service startup; required consent form is presented before ad requests. Privacy options are available from Profile only when required by UMP. Consent errors disable ad requests. **VERIFIED IN CURRENT SOURCE**.
- `NSUserTrackingUsageDescription`, `ATTrackingManager`, `requestTrackingAuthorization`, and explicit IDFA access were not found in checked Info.plist/source. This does not establish that SDKs never access identifiers or that ATT is unnecessary. **EXTERNAL VERIFICATION REQUIRED**: inspect final archive, SDK manifests, network/provider settings, and App Store privacy answers; obtain legal/privacy review.
- `PrivacyInfo.xcprivacy` declares UserDefaults accessed API reason `CA92.1`; no other manifest declarations were found in the app manifest. Validate aggregate SDK privacy manifests and required-reason declarations in the archived app. **EXTERNAL VERIFICATION REQUIRED**.

## App Store Privacy questionnaire checklist

- [ ] Review the final archive’s privacy manifest aggregation for app and every linked SDK.
- [ ] Confirm data types collected/transmitted by Google Mobile Ads and UMP under actual ad personalization, consent, mediation, and account settings.
- [ ] Confirm identifiers, diagnostics, approximate location/IP, ad interactions, purchase data, and Game Center data treatment with Apple/Google documentation and current account configuration.
- [ ] Determine whether each data type is linked to the user, used for tracking, or disclosed to third parties; answer using current App Store Connect definitions.
- [ ] Decide and document ATT applicability from actual SDK behavior and tracking use; do not infer from absence of an in-app prompt.
- [ ] Confirm StoreKit and Game Center representations in privacy answers against Apple guidance and app configuration.
- [ ] Verify backup behavior, deletion limitations, retention period, and privacy contact process.
- [ ] Obtain developer/counsel approval before publishing a Privacy Policy or website data claims.
