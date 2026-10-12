# ColorBlitz Game Center Configuration

Evidence labels: **VERIFIED IN CURRENT SOURCE**, **EXTERNAL VERIFICATION REQUIRED**, **LEGAL APPROVAL REQUIRED**.

## Active source identifiers and behavior

| Mode | Category | Leaderboard ID | Intended configuration |
|---|---|---|---|
| Classic | Standard | `com.aniadhikary.ColorBlitz.leaderboard.classic.standard` | Integer score, high to low, best score |
| Classic | Assisted | `com.aniadhikary.ColorBlitz.leaderboard.classic.assisted` | Integer score, high to low, best score |
| Endless | Standard | `com.aniadhikary.ColorBlitz.leaderboard.endless.standard` | Integer score, high to low, best score |
| Endless | Assisted | `com.aniadhikary.ColorBlitz.leaderboard.endless.assisted` | Integer score, high to low, best score |

**VERIFIED IN CURRENT SOURCE** — `ColorBlitz/Services/GameCenter/GameCenterIdentifiers.swift`; these are the four cases in `GameCenterLeaderboard`, selector, and sync iteration. The old unsplit Classic and Endless identifiers are absent from executable production code. The source does not configure or submit Daily Challenge scores. Source mapping does not prove App Store Connect records exist or are enabled. No leaderboard display name or live status is asserted here.

### Score eligibility and sync

- Classic Standard and Assisted runs are evaluated separately. The current-rules 60-second session must have at least one answer, at least 60% accuracy, and be newer than a one-time local eligibility boundary. Daily-linked rows are excluded. Persisted plausibility requires at most 401 accepted answers, `(answers − 1) × 150 ms ≤ 60,000 ms`, no more than 30 points per correct answer, and a total no higher than 12,030. The first accepted answer needs no lock interval; the exact 60-second deadline is included. **VERIFIED IN CURRENT SOURCE** — `GameCenterLeaderboardSync.swift`, `LocalGameSessionRepository.swift`, `ClassicGameViewModel.swift`.
- Endless Standard and Assisted runs are evaluated separately. A run must use current Endless rules, have `revive_count == 0`, at least one answer and a positive score, no more than 30 points per correct answer, and enough active time for the 150 ms lock between successive correct answers. There is no separate accuracy threshold. Both coin and rewarded-ad continues exclude the run. Continued sessions remain in local history and local bests. **VERIFIED IN CURRENT SOURCE**.
- Each new competitive run captures the Game Center account signed in when it starts. The saved session is eligible only for that exact account. A run started signed out and historical sessions with unknown ownership stay local-only; signing in later does not claim them. Switching accounts preserves each account's own eligible runs and does not delete local progress. **VERIFIED IN CURRENT SOURCE** — `CompletedSessionDraft`, game view models, v7 SQLite migration, owner-filtered queries, sync service.
- SQLite remains the local source of truth. Sync is best-effort and is requested on launch, authentication changes, app activation and after an eligible save. Failed or stale-identity submissions do not advance success bookkeeping and can retry on a later sync opportunity for the same owner. Successful high-water marks are persisted in UserDefaults separately by leaderboard and Game Center player ID. The Classic boundary is also in UserDefaults. **VERIFIED IN CURRENT SOURCE**.
- GameKit loads global all-time ranks 1–10 and separately reads the authenticated player's entry/rank, including when that player is outside the top ten. The UI has loading, signed-out, unavailable, no-score, empty-list and retry states. The selected-board Game Center dashboard uses GameKit's access point. Reads do not submit scores. **VERIFIED IN CURRENT SOURCE** — `GameCenterService.swift`, `GameCenterLeaderboardViewModel.swift`, `LeaderboardView.swift`.
- Game Center authentication changes are observed. A failed request or account switch does not delete local gameplay records. Submission checks identity before and after its asynchronous call; live server attribution still requires external two-account verification. **VERIFIED IN CURRENT SOURCE** / **EXTERNAL VERIFICATION REQUIRED** for live service behavior.
- No achievement identifiers or `GKAchievement` reporting path were found in current source. **VERIFIED IN CURRENT SOURCE**.

## Expected App Store Connect configuration

For each of the four active IDs, confirm the production app record, leaderboard set (if used), and required localizations:

- Matching bundle ID and Game Center capability enabled.
- Exact leaderboard ID from the table above.
- Integer score format, high-to-low sort, Classic leaderboard type, and best-score submission policy.
- Localized display names that clearly distinguish Standard from Assisted.
- Bounds compatible with the implemented score ranges; exact remote settings require external confirmation.
- Game Center enabled for the target app version and distribution environment.
- Test sandbox/TestFlight authentication, submission to all four IDs, top-score presentation, current-player rank, and unavailable/offline behavior.
- Confirm no additional leaderboard records are intended. The source selector and sync path each contain exactly four boards.

Every App Store Connect item is **EXTERNAL VERIFICATION REQUIRED** until screenshots or exact configuration details are reviewed. No remote leaderboard is claimed live. Do not attempt programmatic deletion of App Store Connect records; the developer manages remote configuration.

## Developer-provided configuration checklist

Provide redacted screenshots or exact values for:

1. App Store Connect app record showing bundle ID and Game Center enabled.
2. Each of the four leaderboard detail pages showing ID, type, score format, sort order, submission policy, localization/display name, bounds, and status.
3. Version page showing Game Center enabled for the target release.
4. Sandbox/TestFlight checks for signed-in, signed-out, and unavailable-network behavior, eligible Classic/Endless submissions, global top entries, and current-player rank.
5. Any configured achievement list (expected none from current source).

Do not include player personal data in supplied evidence.
