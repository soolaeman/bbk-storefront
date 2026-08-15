[🧭 NAVIGATOR](../../NAVIGATOR.md)

# BBKitchen Progress Archive

This folder is the **detailed progress/history layer** for the Next.js migration.

`README.md` at repository root is the current-state summary and handoff. Detailed session history belongs here.

## Chronology

| Chat | Period / Evidence | Start | End | Duration | Focus | Status | Archive |
|---|---|---|---|---:|---|---|---|
| 1.1 | **14 Aug 2026** | **17:04 WIB** | — | — | Foundation, WooCommerce migration, catalog architecture, early bottlenecks | ✅ Archived | [`CHAT-1.1.md`](CHAT-1.1.md) |
| 1.2 | **14–15 Aug 2026 evidence** | — | — | — | API, metadata, live catalog, pagination, product detail, SEO/ACF contracts | ✅ Archived | [`CHAT-1.2.md`](CHAT-1.2.md) |
| 1.3 | **15 Aug 2026 evidence** | — | — | — | Catch-all local routing, Header integration, article rendering, visual convergence | ✅ Archived | [`CHAT-1.3.md`](CHAT-1.3.md) |
| 1.4 | **15–16 Aug 2026 evidence** | — | — | — | Homepage sales positioning, CTA normalization, hero assets, mascot dead end, social video covers | ✅ Closed | [`CHAT-1.4.md`](CHAT-1.4.md) |
| 1.5 | **16 Aug 2026** | 06:32:41 WIB | — | Active | Responsive QA, Header/search/sticky, Product Detail parity, article polish, hardening | 🚀 Active | — |

> Chat 1.1 start is now verified from the session evidence supplied for this project: **14 August 2026, 17:04 WIB**. Its end time is still not verified, so its individual working duration remains `—`.

---

## ⏱️ PROJECT TIMELINE — SINCE CHAT 1.1

```text
14 August 2026 — 17:04 WIB
Chat 1.1 START
        ↓
14–15 August 2026
Chat 1.2
        ↓
15 August 2026
Chat 1.3
        ↓
15–16 August 2026
Chat 1.4
        ↓
16 August 2026 — 06:32:41 WIB
Chat 1.5 START
```

### Current elapsed-time status

```text
Chat 1.1 verified start:
14 August 2026 — 17:04 WIB

Chat 1.5 verified start:
16 August 2026 — 06:32:41 WIB

Elapsed project span at Chat 1.5 start:
1 day 13 hours 28 minutes 41 seconds

Important:
This is elapsed calendar/project span between verified timestamps,
NOT total working time.

Actual total working duration across all chats:
NOT VERIFIABLE

Reason:
End timestamps / working intervals for earlier chats are not fully verified.
```

Project-level elapsed time may now be calculated from the verified Chat 1.1 start timestamp, but it must always be labeled as **elapsed project span**, not total working duration.

---

## Milestones

```text
Chat 1.1
Foundation
   ↓
Chat 1.2
Live WooCommerce / API / SEO contract
   ↓
Chat 1.3
Routing + shared frontend integration
   ↓
Chat 1.4
Sales-first homepage + conversion + visual assets
   ↓
Chat 1.5
Responsive / parity / hardening
```

---

## Current Migration Position

```text
DATA ARCHITECTURE       ✅ established
ROUTING                 ✅ established
CATALOG                 ✅ established baseline
PRODUCT DETAIL          ✅ functional baseline
HOMEPAGE POSITIONING    ✅ sales-first
CTA CONTRACTS           ✅ normalized
SOCIAL VIDEO COVERS     ✅ implemented
MASCOT UNIVERSAL LAYER  🔒 rejected

MOBILE QA               ⚠️ next
HEADER SEARCH/STICKY    ⚠️ carried
PRODUCT DETAIL PARITY   ⚠️ carried
ARTICLE TYPOGRAPHY      ⚠️ carried
ACF/CORE SYSTEM         ⏳ carried
```

---

## Current Pareto Focus

1. Mobile/responsive QA.
2. Shared Header/search/sticky/parity.
3. Product Detail design parity.
4. Article/local presentation.
5. ACF/Core System + production hardening.

---

## Session Timing & Evidence Rule

Every migration chat should record, when verifiable:

- **start date + time**
- **end date + time**
- **duration**
- evidence/source for the timestamps

### Duration calculation

```text
verified end timestamp
        −
verified start timestamp
        ↓
actual session duration
```

Rules:

1. **Never invent or estimate a duration.**
2. A date range such as `14–15 Aug` does **not** prove a 24-hour duration.
3. If only dates are known, record the dates and set duration to `—`.
4. If only a start time is known, record the start time and leave duration to `—` until an end timestamp is verified.
5. If timestamps conflict across evidence, preserve the conflict and do not silently choose one.
6. Use `Tidak ditemukan di repository/evidence yang tersedia.` when the required timing evidence is unavailable.
7. Root `README.md` may show the same verified dates/durations in its Pareto progress summary, but must not create independent or conflicting timing facts.
8. Project-level elapsed time may be calculated from a verified Chat 1.1 start timestamp even when individual session working durations remain unknown; label it **elapsed project span**, never **working duration**.

### Standard session record

```text
Session: 1.X
Started: DD Month YYYY HH:MM:SS WIB
Ended: DD Month YYYY HH:MM:SS WIB
Duration: Xh Ym
Evidence: <repository / conversation / verified timestamp source>
```

---

## Rule

Every migration chat should leave behind a progress record containing:

- date/time evidence
- duration when verifiable
- Pareto top changes
- bottlenecks
- root causes
- failed approaches
- architecture decisions
- verification
- Git checkpoint
- next-chat handoff

If a fact is unavailable, write:

`Tidak ditemukan di conversation.`

For timing specifically, use:

`Tidak ditemukan di repository/evidence yang tersedia.`

Do not replace forensic history with a clean-looking summary.

## Relationship to README

```text
Detailed session archive
        ↓
docs/progress/CHAT-X.Y.md
        ↓
Pareto synthesis
        ↓
README.md
        ↓
Current project state + next handoff
```
