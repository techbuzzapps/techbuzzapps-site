# ColorBlitz Premium Subscription Specification

Evidence labels: **VERIFIED IN CURRENT SOURCE**, **EXTERNAL VERIFICATION REQUIRED**, **LEGAL APPROVAL REQUIRED**.

## Products

| Plan | Product identifier | Type / entitlement |
|---|---|---|
| Monthly | `com.aniadhikary.ColorBlitz.premium.monthly` | Auto-renewable subscription; grants shared Premium entitlement |
| Yearly | `com.aniadhikary.ColorBlitz.premium.yearly` | Auto-renewable subscription; grants shared Premium entitlement |

**VERIFIED IN CURRENT SOURCE** — `Services/Purchases/PurchaseService.swift`; local `.storekit` configuration names the `ColorBlitz Premium` group and contains local test offer data. Its values are not proof of live App Store Connect pricing or offers.

## Free / Premium comparison

| Capability | Free | Premium |
|---|---|---|
| Classic | Available | Available |
| Endless | Available | Available |
| Daily Challenge | Available | Available |
| Color Master | 500 coins for one run | Unlimited access while entitlement is active |
| Forced interstitials | Eligible on explicit Play Again after 2 eligible persisted non-Daily Classic rounds, with 60-second minimum gap | Suppressed |
| Earn Coins rewarded ad | Optional; 10 coins per earned ad, max 5 per local day | Optional; remains available with same app policy |
| Rewarded Endless Continue | Optional; one continue per run if earned and available | Optional; remains available with same app policy |
| Coin-paid Endless Continue | 100 coins, at most once per run | Same |

**VERIFIED IN CURRENT SOURCE.** Premium must not be described as removing all ads because voluntary rewarded ads remain.

Interstitial eligibility/cooldown is held in memory for the current app process and resets after relaunch. Premium suppresses a forced interstitial when the Play Again action is evaluated, but the app does not dismiss an interstitial that has already begun presenting. **VERIFIED IN CURRENT SOURCE** — `InterstitialAdCoordinator`, `AdvertisingService`. Avoid promising a cross-launch cadence or instant dismissal of an already-open ad.

## Verified entitlement lifecycle

- Products load by the two fixed product identifiers. Displayed prices come from StoreKit’s localized `displayPrice`.
- A purchase succeeds only on a verified StoreKit transaction; the transaction is finished and Premium is re-derived from `Transaction.currentEntitlements`.
- Pending, cancelled, unverified, and failed outcomes are represented distinctly.
- Restore invokes `AppStore.sync()` then refreshes entitlement.
- `Transaction.updates`, launch, foreground, purchase/restore and expiration recheck entitlement. Only verified, unrevoked, unexpired matching products grant Premium.
- Refund/revocation removes eligibility after StoreKit reflects it. Cancellation stops future renewal but typically leaves access through the paid expiration; actual account-specific status is presented by Apple.
- Premium state is not persisted by the app; it is an in-memory value re-derived from StoreKit.

**VERIFIED IN CURRENT SOURCE** — `PurchaseService`. Actual renewal, billing, grace period, refund and account behavior must be presented consistent with Apple’s current subscription flow: **EXTERNAL VERIFICATION REQUIRED**.

## Website disclosure draft (approval required)

“ColorBlitz Premium is an auto-renewing subscription offered in monthly and yearly plans. Payment is charged to your Apple Account when you confirm purchase. Subscriptions renew automatically unless canceled at least 24 hours before the current period ends. Manage or cancel in your Apple Account subscription settings. Prices and available offers are shown in the app before purchase.”

This is a draft, not approved legal copy. Exact billing timing, renewal terms, trial language, cancellation UX, price, tax, territory, and Apple-required display elements: **EXTERNAL VERIFICATION REQUIRED** and **LEGAL APPROVAL REQUIRED**. Do not publish invented prices, savings claims, or a free-trial claim.

## Before publishing

- **EXTERNAL VERIFICATION REQUIRED:** confirm both products are approved, sale-ready, correctly grouped, and localized in App Store Connect; verify current price tiers, territories, tax display, introductory offers, eligibility, and subscription management URL.
- **EXTERNAL VERIFICATION REQUIRED:** compare live product IDs against source and verify sandbox and production purchase/restore/refund flows.
- **LEGAL APPROVAL REQUIRED:** approve subscription disclosure and any web statements. Do not imply Premium is a direct web purchase; purchases are through StoreKit in app.
