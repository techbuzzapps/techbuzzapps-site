# Perfect Drop Website Integration Report

Date: October 12, 2026

## Pages created

- `apps/perfectdrop/index.html`
- `apps/perfectdrop/premium/index.html`
- `apps/perfectdrop/support/index.html`
- `apps/perfectdrop/privacy/index.html`
- `apps/perfectdrop/terms/index.html`

The Perfect Drop Xcode project at `/Users/aniadhikary/Desktop/Apps/Games/PerfectDrop/PerfectDrop.xcodeproj` was inspected read-only. No iOS files, existing app pages, shared components or global styles were changed.

## Features verified from source

- Eight modes exist: Classic, Endless, Daily Drop, Catch, Precision, Extreme, Micro and Micro Catch. The four challenge modes require Premium; the current 500-coin pass grants one run of an eligible challenge mode.
- Daily Drop uses a deterministic 10-drop daily sequence with three lives. Completion awards 25 coins once per day. A flawless Classic run awards 25 coins. Rewarded coin ads award 10 coins up to three times daily. Eligible survival continues cost 100 coins once per run.
- Premium has monthly and yearly StoreKit subscriptions, unlocks the four challenge modes, and suppresses forced interstitial ads. Optional rewarded ads remain available. The release deployment target is iOS 18.6.
- Game Center source implements four score categories (Classic, Endless, Daily Drop and Longest Perfect Streak) and 11 achievements. Local best records and earned achievements can be submitted after Game Center sign-in.
- Google Mobile Ads 13.11.0 and UMP 3.1.0 are resolved. Current source implements Apple's native ATT request after the UMP flow when ATT is undetermined; UMP's `canRequestAds` remains the ad-request gate. An older audit saying ATT was absent was superseded by the later implementation and current source.
- Notifications are local: Daily Drop and comeback reminders. No app-owned account/backend flow was found in the reviewed source.

## Content decisions and assets

- Premium claims and coin amounts follow current mode entitlement and wallet source. The website names Micro Catch as Premium-gated because `GameMode.requiresPremium` includes it, although the separate `PremiumBenefits.lines` UI list currently omits Micro Catch; verify/update that app copy independently before release.
- Daily Drop wording describes the fixed challenge for the player's current day without implying all local time zones share a simultaneous day boundary.
- No approved Perfect Drop screenshots were found in the website assets, so the landing page omits a Screenshots section. No App Store listing URL or rating was invented.
- Privacy copy distinguishes local progress from Game Center, StoreKit and Google service handling, describes ATT and UMP separately, and avoids promises about tracking, deletion, age classification or processing locations.
- Terms link Apple's Standard EULA and avoid specifying a legal name, company entity, address, jurisdiction or governing law.

## Static validation

- All five requested routes exist and each has the five correct navigation destinations in order, with the current page marked by `aria-current="page"`.
- Shared header/footer placeholders, common stylesheet, viewport metadata and ColorBlitz-matched content/card conventions are present on all pages.
- Internal route links, Privacy/Terms cross-links, support `mailto:`, Apple EULA, subscription-management and refund links were checked.
- No `localhost:8000` links or screenshot placeholders appear in the five generated pages.
- Native `<details>` and `<summary>` provide keyboard-operable FAQ disclosure on Support.
- HTML parser/static structure checks passed for all five pages. Responsive layout uses the existing shared design; no browser rendering was run.
- `git diff --check` passed.

## Unresolved publication items

- **Privacy disclosure blocker:** the app privacy manifest says tracking is false and lists no collected data types, while the bundled Google Mobile Ads manifest declares linked Device ID as tracking data and lists additional categories. Reconcile the final archive, SDK disclosures, AdMob/UMP production configuration, App Store privacy answers and actual tracking/data flows before treating the policy as approved.
- Physical-device ATT flow, live AdMob messages/consent regions and release network behavior were not validated in this website task.
- App Store Connect's four leaderboard records, 11 achievement definitions, daily recurring-board setup and live submission/ranking are not verifiable from the repository.
- Confirm audience/age rating and any child-directed advertising obligations, privacy/legal review, provider retention and international-processing disclosures, and support/privacy request procedures.
- Confirm App Store Connect uses Apple's Standard EULA and verify current subscription products, territories, localized billing presentation and cancellation behavior against the live release configuration.
- No approved screenshots or canonical App Store listing link were available.

**Publication status:** These pages are an implementation draft, not legal or release approval. Resolve the privacy and App Store Connect items above before publication.
