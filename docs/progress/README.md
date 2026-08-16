[🧭 NAVIGATOR](../../NAVIGATOR.md)

# BBKitchen Progress Archive

This folder is the **detailed progress/history layer** for the Next.js migration.

`README.md` at repository root is the current-state summary and handoff. Detailed session history belongs here.

## Chronology

| Chat | Period / Evidence | Start | End | Duration | Focus | Status | Archive |
|---|---|---|---|---:|---|---|---|
| 1.1 | **14 Aug 2026** | **12:45 WIB** | **15:12 WIB** | **2h 27m** | Foundation, WooCommerce migration, catalog architecture, early bottlenecks | ✅ Archived | [`CHAT-1.1.md`](CHAT-1.1.md) |
| 1.2 | **14 Aug 2026** | **17:00 WIB** | **21:00 WIB** | **4h** | API, metadata, live catalog, pagination, product detail, SEO/ACF contracts | ✅ Archived | [`CHAT-1.2.md`](CHAT-1.2.md) |
| 1.3 | **14–15 Aug 2026** | **14 Aug 23:00 WIB** | **15 Aug 03:00 WIB** | **4h** | Catch-all local routing, Header integration, article rendering, visual convergence | ✅ Archived | [`CHAT-1.3.md`](CHAT-1.3.md) |
| 1.4 | **15–16 Aug 2026** | **15 Aug 13:00 WIB** | **16 Aug 06:32:41 WIB** | **17h 32m 41s** | Homepage sales positioning, CTA normalization, hero assets, mascot dead end, social video covers | ✅ Closed | [`CHAT-1.4.md`](CHAT-1.4.md) |
| 1.5 | **16 Aug 2026** | **06:32:41 WIB** | **07:20 WIB** | **47m 19s** | Documentation / repository orientation / session hardening | ✅ Closed | [`CHAT-1.5.md`](CHAT-1.5.md) |

> **Canonical timing source:** verified session timing supplied in the migration workflow and reflected consistently in the archive/index. Individual duration is calculated only from verified Start + End timestamps.

---

## ⏱️ PROJECT TIMELINE — SINCE CHAT 1.1

```text
14 Aug 2026 12:45 WIB
Chat 1.1 START
        ↓
14 Aug 2026 15:12 WIB
Chat 1.1 END
        ↓
14 Aug 2026 17:00 WIB
Chat 1.2 START
        ↓
14 Aug 2026 21:00 WIB
Chat 1.2 END
        ↓
14 Aug 2026 23:00 WIB
Chat 1.3 START
        ↓
15 Aug 2026 03:00 WIB
Chat 1.3 END
        ↓
15 Aug 2026 13:00 WIB
Chat 1.4 START
        ↓
16 Aug 2026 06:32:41 WIB
Chat 1.4 END / Chat 1.5 START
        ↓
16 Aug 2026 07:20 WIB
Chat 1.5 END
```

### Project time summary

```text
Verified session working time through Chat 1.5:
28 hours 47 minutes 0 seconds

Elapsed project span:
14 Aug 2026 12:45 WIB
→
16 Aug 2026 07:20 WIB
=
42 hours 35 minutes 0 seconds

Verified inter-session gap time:
13 hours 48 minutes 0 seconds
```

> **Important:** `session working time` and `project elapsed span` are different measurements. Do not use elapsed span as a proxy for working time.

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
Documentation / repository orientation / session hardening
   ↓
Chat 1.6
Baseline verification / responsive QA
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
