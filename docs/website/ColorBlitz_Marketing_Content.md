# ColorBlitz Marketing Content

Evidence labels: **VERIFIED IN CURRENT SOURCE**, **EXTERNAL VERIFICATION REQUIRED**, **LEGAL APPROVAL REQUIRED**.

## Landing page copy

### Headline

**See the color. Beat the clock.**

### Description

Test your focus in ColorBlitz, a fast color recognition game with timed rounds, an endless survival run, a fresh daily challenge, and a tiered Color Master mode. Build combos, earn coins and XP, and track your local progress. **VERIFIED IN CURRENT SOURCE**

## Four gameplay modes

1. **Classic** — Race through a 60-second round. Match the ink color, build a combo, and grow your score. Correct answers earn 10 points plus a combo bonus capped at 20 extra points per answer. **VERIFIED IN CURRENT SOURCE** — `ClassicGameViewModel`, `ClassicScoringService`.
2. **Endless** — Keep answering as the response window gets shorter. Pause and resume when you need a break. After a run ends, one continue is available per run for 100 coins or an earned rewarded ad, when ads are available. **VERIFIED IN CURRENT SOURCE** — `EndlessRules`, `EndlessGameViewModel`.
3. **Daily Challenge** — Take on the same day's seeded challenge, keep your completion streak going, and earn a one-time daily bonus of 5 coins. **VERIFIED IN CURRENT SOURCE** — daily challenge definition and reward policy.
4. **Color Master** — Progress through Learn, Shades, Families, and Master tiers during a timed round. Access with Premium or spend 500 coins for one run. **VERIFIED IN CURRENT SOURCE** — `ColorMasterRules`, `ColorMasterAccess`.

## Rewards and progression

Completed Classic rounds can award coins and XP based on participation, accuracy, and highest combo. A perfect Classic run has an additional 10-coin bonus. Earn 10 coins for a completed rewarded coin ad, up to five times per local day. Daily completion adds 5 coins once per challenge date. Endless continue and Color Master one-run access cost 100 and 500 coins respectively. Reward formulas currently cover Classic rules v1; do not promise the same session reward for every mode. **VERIFIED IN CURRENT SOURCE** — reward formula/policies and repositories.

## Game Center

Compare eligible Classic Standard and Assisted scores and Endless Standard and Assisted scores through Apple Game Center leaderboards. Eligible runs are associated with the Game Center account signed in when the run starts. Runs played while signed out and older runs with unknown ownership stay on the device and are not added to a later account automatically. Daily Challenge scores and continued Endless runs are not submitted. Sign in to Game Center to view worldwide rankings and your standing. **VERIFIED IN CURRENT SOURCE**. **EXTERNAL VERIFICATION REQUIRED** — confirm all four live App Store Connect leaderboard records, production app association, and two-account attribution before publishing availability claims.

## Premium

ColorBlitz Premium is offered as monthly and yearly auto-renewing subscriptions. Premium suppresses forced interstitial ads and provides unlimited Color Master access. Optional rewarded ads remain available by choice, including coin rewards and an Endless continue, subject to availability and the applicable in-app rules. **VERIFIED IN CURRENT SOURCE** — `PurchaseService`, `PremiumPurchaseCard`. Price, trial, introductory offer, availability, and subscription group status: **EXTERNAL VERIFICATION REQUIRED**. Avoid “ad-free” or “removes all ads.”

## Screenshot placement and caption plan

Use only approved, current captures from the actual shipping build. No screenshot files were verified as approved marketing captures in this audit. **EXTERNAL VERIFICATION REQUIRED**.

1. Hero: Play home with all four mode entry points. Caption: “Four ways to test your color instincts.”
2. Classic gameplay: question and combo HUD. Caption: “Build your combo before time runs out.”
3. Endless gameplay: shrinking response timer and pause control. Caption: “How long can you keep going?”
4. Daily Challenge: challenge card and streak. Caption: “A new challenge every day.”
5. Color Master: visible tier progress. Caption: “Learn the shades, then master them.”
6. Progress/Game Center: local progression and leaderboards. Caption: “Keep your progress in view.”
7. Premium/Store: current localized offer UI only, if price and offer are legible and approved. Caption: “Unlock Color Master and skip forced interstitials.”

Do not fabricate leaderboards, pricing, ratings, reviews, or device frames. Keep captures consistent with TechBuzzApps shared page components.

## SEO

- Suggested title: `ColorBlitz – Color Recognition Game | TechBuzzApps`
- Suggested description: `Challenge your focus with Classic, Endless, Daily Challenge, and Color Master modes in ColorBlitz. Build combos, earn rewards, and follow your progress.`
- App Store link: **EXTERNAL VERIFICATION REQUIRED**; insert only the approved live listing URL.

## Shared website design rule

TechBuzzApps uses one common visual design across all apps. Reuse existing site colors, typography, cards, buttons, header/footer, and layout conventions. Do not add Aurora gradients, a separate ColorBlitz CSS theme, or a ColorBlitz-specific website design system.
