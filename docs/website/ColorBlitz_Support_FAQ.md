# ColorBlitz Support FAQ

Evidence labels: **VERIFIED IN CURRENT SOURCE**, **EXTERNAL VERIFICATION REQUIRED**, **LEGAL APPROVAL REQUIRED**.

## How do I play?

Read the color prompt and choose the matching ink color from the answer choices. Classic is a 60-second round. Endless gives you a shrinking response window. Color Master adds progressively harder color tiers. **VERIFIED IN CURRENT SOURCE** — `HowToPlayGuide`, mode view models.

## How does scoring work?

In Classic, each correct answer earns 10 points plus a combo bonus: 2 points per current combo step, capped at 10 combo steps for scoring (maximum 30 points on a correct answer). An incorrect answer resets the combo. **VERIFIED IN CURRENT SOURCE** — `ClassicScoringService`.

## What are the game modes?

Classic is timed; Endless is survival; Daily Challenge is a once-per-day seeded challenge; Color Master is a timed four-tier mode. The source includes a legacy `speed` mode identifier but no playable Speed mode. **VERIFIED IN CURRENT SOURCE**.

## What are coins and XP for?

Classic rewards can add coins and XP to your local progression. A perfect Classic run adds a 10-coin bonus. Daily Challenge completion adds 5 coins once for that challenge date. Earn Coins rewarded ads grant 10 coins per earned ad, up to five daily. Coins can buy a 100-coin Endless continue or a 500-coin one-run Color Master pass. **VERIFIED IN CURRENT SOURCE**. Exact reward amounts are versioned gameplay policy and can change only with app updates.

## What does Premium include?

Premium suppresses forced interstitial ads and unlocks unlimited Color Master access while the subscription entitlement is active. Optional rewarded ads are still available if you choose them. **VERIFIED IN CURRENT SOURCE**. Current localized prices and offers come from StoreKit and must be checked in the app. **EXTERNAL VERIFICATION REQUIRED** for live offers.

## How do I restore purchases?

Open Store, choose Restore Purchases, and allow Apple’s App Store account to sync. The app recalculates Premium from current verified StoreKit entitlements. A purchase may remain pending or unavailable depending on Apple account status. **VERIFIED IN CURRENT SOURCE** — `PurchaseService`, Store UI.

## How do ads and Endless Continue work?

Interstitials may appear after the first two eligible non-Daily Classic rounds, at least 60 seconds apart, when you tap Play Again. Premium suppresses these. Rewarded coin ads and a rewarded Endless continue are optional and require an earned callback; ads can be unavailable because of consent, load, or network/provider conditions. The coin ad grants 10 coins (up to five per local day). Endless permits one continue per run; use 100 coins or an earned rewarded ad. **VERIFIED IN CURRENT SOURCE**.

## Why are my Game Center scores missing?

Sign in to Game Center in iOS Settings, then reopen ColorBlitz or try again when Game Center is available. Eligible scores sync after sign-in, app activation, or a saved run; network or Game Center failures can retry later. Classic requires at least 60% accuracy, at least one answer, and a plausible current-rules 60-second run. Daily Challenge is excluded. Endless must be a plausible current-rules run with no continue. Only the matching Standard or Assisted board receives a score. **VERIFIED IN CURRENT SOURCE**. The live boards and server behavior require **EXTERNAL VERIFICATION**.

Scores are associated with the Game Center account signed in when a competitive run starts. If you play signed out, or have older sessions whose account ownership is unknown, those scores stay in local progress and are not automatically added after you sign in. Changing accounts does not transfer one account's run to another. Your local history, bests, and rewards remain available. **VERIFIED IN CURRENT SOURCE**.

## What will I see if a leaderboard is empty or unavailable?

The app shows separate messages for signing in, no score yet, an empty ranking list, and Game Center being unavailable. A failed ranking request can be retried. **VERIFIED IN CURRENT SOURCE**. Whether the four boards are enabled for the app release is **EXTERNAL VERIFICATION REQUIRED**.

## How do I receive Daily Challenge reminders?

In Profile settings, enable Daily Challenge reminders and grant notification permission. The repeating reminder is scheduled for 7:00 p.m. local device time. Disable it in Profile or iOS Settings. **VERIFIED IN CURRENT SOURCE** — `DailyChallengeReminderConfiguration`, `LocalNotificationService`.

## Where is my progress stored?

Game sessions, rewards, streak history, and guest identity are stored locally on the device. They are not shown by source to sync through a ColorBlitz account. Device backup behavior follows the app’s Application Support storage and iOS backup defaults; verify exact backup inclusion before making a public guarantee. **VERIFIED IN CURRENT SOURCE** for local storage; backup/provider behavior **EXTERNAL VERIFICATION REQUIRED**.

## Contact

Support contact: **EXTERNAL VERIFICATION REQUIRED — developer to supply approved support email or contact URL.** Do not publish a guessed address.
