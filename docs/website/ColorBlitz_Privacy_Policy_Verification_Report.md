# ColorBlitz Privacy Policy Verification Report

Audit date: 2026-10-12

## Scope and method

Reviewed the existing `docs/website/ColorBlitz_Privacy_Data_Inventory.md` and `ColorBlitz_Post_Bugfix_Website_Reaudit_Report.md`, then inspected the current iOS project at `/Users/aniadhikary/Desktop/Apps/Games/ColorBlitz`. Read-only review covered production Swift sources, `Package.resolved`, `ColorBlitz/PrivacyInfo.xcprivacy`, `Config/ColorBlitz-Info.plist`, entitlements, Xcode project settings, and the Google SDK privacy manifests available in the project's Xcode DerivedData package artifacts. No Swift source, app privacy manifest, website HTML, build configuration, or tests were changed. No full test suite or Release archive was run.

Provider documentation was checked against official Apple and Google materials linked under [References](#references). Provider documentation describes provider practices, not proof of the app's runtime traffic or account configuration.

## Verified implementation facts

### Local SQLite / GRDB data

- Direct dependency `GRDB.swift` 7.11.1 is pinned in `Package.resolved` and manages the app's SQLite database.
- The production database path is `Application Support/ColorBlitz/colorblitz.sqlite`, with SQLite WAL/SHM companion files and `.completeUntilFirstUserAuthentication` protection (`LocalDatabaseConfiguration.swift`). Source comments leave normal device-backup eligibility at the system default; no backup exclusion was found.
- Database records include a random local guest UUID; player records; sessions with mode, score, answer counts, combo, start/completion times, duration, local day/time zone and rules version; reward ledger; and Daily Challenge completion data.
- Migration `v7_game_center_ownership` adds nullable `game_center_owner_id`. New competitive sessions can persist the Game Center owner ID captured at run start. Historical rows are not backfilled.
- No app-owned account server, production remote-config implementation, general network client, `URLSession`, `NWConnection`, Firebase, CloudKit, or separate app-owned analytics/crash-reporting integration was found in the reviewed production sources. The remote-config protocol is wired to `MockRemoteConfigRepository` in app dependency wiring. This is a source-search finding, not a statement about transitive SDK behavior or all runtime traffic.

### UserDefaults data

Reviewed keys and stores cover sound, color hints, theme, onboarding completion, reminder enabled state, the last dismissal time for a color-hint reminder, review-request dates/version/completion IDs, and Game Center per-account/per-board submission high-water scores and the Classic eligibility boundary. The local guest identity itself is in SQLite `app_state`, not UserDefaults. UMP may maintain consent state through its SDK; its exact storage and related transmissions require provider/configuration confirmation.

### Game Center

- The app has the Game Center entitlement and uses GameKit.
- It reads the authenticated `teamPlayerID`, display name and avatar as needed by the UI. New competitive runs capture the account identifier and persist it with the local session. The name/avatar are not persisted in session rows.
- Eligible score submission and leaderboard/current-player-rank reads use Apple's GameKit service. Per-account successful-submission markers are local UserDefaults values. Signed-out and older sessions with unknown owner IDs remain local-only and are not claimed after sign-in or account switch.
- Full local session history is not submitted by the app's score sync path; the sync path selects eligible best scores for the currently authenticated owner.

### StoreKit subscriptions

- The app uses StoreKit 2 product lookup, purchase, transaction verification, current-entitlement refresh, transaction updates, and `AppStore.sync()` restore.
- Premium state is an in-memory value derived from current verified entitlements and is not stored in the local database.
- Transactions and subscription operations use Apple's service. The app's source does not provide evidence about Apple's server retention or payment-data handling; those belong to Apple's current practices and user's account.

### Advertising, UMP, ATT, and privacy manifests

- Direct packages are Google Mobile Ads 13.11.0 and Google User Messaging Platform 3.1.0. The project has a release AdMob application ID and rewarded/interstitial unit IDs in the Xcode project build configuration; production service/account state was not inspected.
- `AdvertisingService.swift` refreshes UMP consent, presents a required consent form, requests ads only when UMP `canRequestAds` is true, disables ad requests when consent refresh errors, and offers a privacy-options form only when UMP reports it is required.
- `Config/ColorBlitz-Info.plist` includes 50 `SKAdNetworkItems` entries and build-substituted AdMob identifiers. It has no `NSUserTrackingUsageDescription` key.
- No explicit `AppTrackingTransparency` import, authorization request, or direct IDFA API access was found in the reviewed app source.
- The app-authored `ColorBlitz/PrivacyInfo.xcprivacy` declares the UserDefaults accessed API reason `CA92.1`; it does not declare `NSPrivacyCollectedDataTypes`.
- **Important SDK-manifest finding:** the Google Mobile Ads 13.11.0 `PrivacyInfo.xcprivacy` in the resolved Xcode artifact declares Other Diagnostic Data, Coarse Location, Performance Data, Crash Data, Advertising Data, Product Interaction, and Device ID. In that SDK manifest, Device ID is marked `NSPrivacyCollectedDataTypeTracking = true`; several other categories are marked linked, and the manifest lists advertising/analytics purposes. This is a vendor SDK declaration, not direct evidence that each item is transmitted in every ColorBlitz session.
- The Google UMP 3.1.0 artifact manifest declares Coarse Location, Performance Data, and Product Interaction as unlinked/non-tracking data for app functionality. Again, this is the SDK manifest, not a runtime capture.
- **Unresolved discrepancy:** the GMA SDK manifest's Device ID tracking declaration must be reconciled with the absence of an explicit ATT prompt/usage string in app source and with Google's current iOS disclosure, the actual AdMob/consent configuration, and Apple's rules. Do not publish “ColorBlitz does not track” or “ATT is not used/required” based solely on source search.
- The final Release archive was not inspected. Confirm the exact linked SDK versions and aggregate privacy report/manifests from the release artifact.

### Notifications and deletion/retention

- Daily Challenge reminders are local repeating UserNotifications scheduled at 7:00 p.m. local time. Notification permission is requested only after the user enables the reminder. Its preference is stored locally. No remote notification provider path was found in reviewed source.
- No app UI or production workflow was found for exporting, resetting, or deleting local player/game data. The local reward ledger and daily completion rows use database constraints/triggers that prevent deletion. No app-owned remote data store or deletion endpoint was found. There is no source-defined retention period.
- Database storage is backup-eligible by default in the reviewed code. Actual device backup/restore behavior and the effects of reinstalling or restoring a backup were not tested.

## Third-party information requiring confirmation

1. **Google Mobile Ads:** Google's current iOS data-disclosure guidance says the SDK may collect IP address, crash logs, performance data, device ID, advertising data, and product interactions. Confirm what applies to version 13.11.0, the final linked artifacts, request configuration, consent state, AdMob settings, mediation/optional features, and release traffic. The exact SDK manifest's Device ID tracking declaration is a release blocker for disclosure/ATT review.
2. **Google UMP:** Confirm configured consent messages/regions, privacy-options availability, stored consent signals, provider-side requests/retention, and the final user choices the app presents.
3. **Google ad account and SKAdNetwork:** Confirm production app/ad-unit settings, ad personalization/limited-ad modes, mediation partners, age treatment, SKAdNetwork use, and any data sharing not visible in source.
4. **Apple Game Center and StoreKit:** Confirm current Apple service and account behavior in the intended release configuration; describe Apple-held account, score, purchase, and subscription information by reference to Apple's current service privacy pages rather than attributing Apple's complete data practices to ColorBlitz.
5. **Final artifact and App Store disclosures:** Generate and inspect the Release archive's aggregate privacy report and linked SDK manifests; reconcile it with App Store Connect's App Privacy answers. No archive, live network capture, or App Store privacy questionnaire was reviewed for this task.
6. **Runtime network traffic:** Source review found no first-party API client, but this does not establish exact network calls or every transitive SDK behavior. Verify a Release build with provider/account configuration and document actual destinations and data flows.

## Legal decisions requiring developer approval

- Legal operator identity and any required postal/contact details. The developer-confirmed support address is `techbuzzapps@gmail.com`; it does not establish legal identity or jurisdiction.
- Countries/territories where the app is offered and governing legal framework for privacy requests.
- Intended age group, store age rating, child-directed status, and any child-specific representations/consent requirements.
- Whether any data categories are linked to a person/device or used for tracking for the released SDK configuration; determine ATT treatment and align privacy-policy and App Store disclosures.
- Retention schedule, how local data can be erased, handling of privacy/deletion requests, backup/deletion implications, and whether provider-side requests can be submitted or completed.
- Applicable privacy rights, request verification, timelines, appeal route, and any required controller/processor or cross-border-transfer disclosures.
- Effective date, policy versioning, localization, publication URL, and final counsel approval.

## Draft status

`ColorBlitz_Privacy_Policy_Draft.md` contains all 13 sections, the confirmed support email, and visible review markers wherever implementation, provider, or legal facts remain unsettled. It is not ready to publish until the marked issues—especially the GMA Device ID tracking declaration and ATT review—are resolved and the final text is approved.

### Proposed policy copy reviewed on October 12, 2026

The proposed public copy was reconciled against the source audit before inclusion. The following statements were corrected or retained as explicit review items:

- Removed local and Game Center “achievements” claims because no achievements implementation was found in the reviewed app source.
- Replaced the unconditional app-removal/deletion claim. The database is backup-eligible by default; uninstall, backup, and restore outcomes were not tested, and the app has no in-app delete/export/reset workflow.
- Replaced “general-audience” wording with an approval item because intended audience, age rating, and child-directed status are legal/product decisions not established by source code.
- Narrowed the security statement to the verified local database file-protection setting; broader safeguard claims require confirmation.
- Removed a definitive international-processing statement pending confirmation of provider locations and applicable transfer disclosures.
- Kept the provider SDK disclosure explicitly conditional. The Google Mobile Ads manifest includes a Device ID tracking declaration, while the app source has no explicit ATT request or usage-description string. The manifest does not prove exact runtime transmissions, so release configuration, ATT treatment, and privacy disclosures remain unresolved.
- Preserved the confirmed support email and public brand/site, but marked the legal operator identity and jurisdiction for approval.

## References

### Repository and source

- `docs/website/ColorBlitz_Privacy_Data_Inventory.md`
- `docs/website/ColorBlitz_Post_Bugfix_Website_Reaudit_Report.md`
- ColorBlitz iOS source: `Data/Persistence/LocalDatabaseConfiguration.swift`, `LocalGuestIdentityStore.swift`, `LocalDatabaseMigrator.swift`, `Core/Settings/*`, `Core/Notifications/DailyChallengeReminder.swift`, `Services/Notifications/LocalNotificationService.swift`, `Services/Advertising/AdvertisingService.swift`, `Services/Advertising/AdConfiguration.swift`, `Services/GameCenter/*`, `Services/Purchases/PurchaseService.swift`
- `ColorBlitz/PrivacyInfo.xcprivacy`, `Config/ColorBlitz-Info.plist`, `Config/ColorBlitz.entitlements`, `Package.resolved`, and `ColorBlitz.xcodeproj/project.pbxproj`
- Google Mobile Ads and UMP SDK privacy manifests in the current Xcode DerivedData package artifacts; exact artifact inclusion in the final archive remains to be checked.

### Official provider documentation

- [Google Mobile Ads SDK iOS App Store data disclosure](https://developers.google.com/admob/ios/privacy/data-disclosure)
- [Google UMP SDK setup for iOS](https://developers.google.com/admob/ios/privacy)
- [Google Mobile Ads iOS privacy strategies and ATT](https://developers.google.com/admob/ios/privacy/strategies)
- [Google Privacy Policy](https://policies.google.com/privacy)
- [Apple: User Privacy and Data Use](https://developer.apple.com/app-store/user-privacy-and-data-use/)
- [Apple: App Tracking Transparency](https://developer.apple.com/documentation/AppTrackingTransparency)
- [Apple: Privacy manifests and data use](https://developer.apple.com/documentation/BundleResources/describing-data-use-in-privacy-manifests)
- [Apple: Game Center & Privacy](https://www.apple.com/legal/privacy/data/en/game-center/)
- [Apple: App Store & Privacy](https://www.apple.com/legal/privacy/data/en/appstore/)
- [Apple Privacy Policy](https://www.apple.com/legal/privacy/)
