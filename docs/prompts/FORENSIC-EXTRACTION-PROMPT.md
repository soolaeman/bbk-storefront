[🧭 NAVIGATOR](../../NAVIGATOR.md)

# BBKitchen — Forensic Extraction Prompt

Use this when an old migration chat needs to be archived, especially when many messages are skipped or the session is already closed.

```text
# FORENSIC EXTRACTION — BBKITCHEN NEXT.JS MIGRATION

Ekstrak engineering history dari conversation ini.

Repository:
soolaeman/Front-End-BBKitchen
Branch:
main

RULE UTAMA:
Jangan membuat summary generik.
Jangan mengisi gap dengan asumsi.
Jika bukti tidak tersedia, tulis:
`Tidak ditemukan di conversation.`

## EXTRACT

1. Starting state
2. Work performed
3. Files/components/routes/API changed
4. Data contracts
5. Component contracts / prop changes
6. Architecture decisions
7. Bottlenecks
8. Symptom vs root cause
9. Attempts and failures
10. Workarounds
11. Permanent resolutions
12. Verification evidence
13. Build/runtime failures
14. SEO implications
15. Responsive/mobile implications
16. Git commits / SHAs / dates
17. Technical debt
18. Locked user decisions
19. Handoff to next chat

## SESSION TIMELINE

Extract and record, only when supported by evidence:

```text
Date:
Start:
End:
Duration:
Evidence source:
```

Rules:

- Exact Start/End time must come from conversation/session evidence or GitHub metadata.
- If exact time is unavailable, write:
  `Tidak ditemukan di repository/evidence yang tersedia.`
- If only a date/period is available, preserve the date/period and do not convert it into duration.
- Duration may only be calculated from verified Start and End.
- Never estimate duration from message count, date range, calendar span, skipped messages, or assumptions.
- If a timestamp comes from a GitHub commit, label it as GitHub evidence.
- If timestamps conflict, preserve the conflict; do not silently choose one.
- Keep timeline data consistent with `docs/progress/README.md` and root `README.md` when those are updated.

## PROJECT TIMELINE SINCE CHAT 1.1

When extracting or updating migration progress, separately record:

```text
Chat 1.1 exact start timestamp:
Earliest verifiable migration evidence:
Current migration date:
Actual elapsed duration since Chat 1.1:
Calendar span covered by verifiable evidence:
```

Rules:

- Search repository/GitHub/conversation evidence for the exact Chat 1.1 start before declaring it unavailable.
- If exact Chat 1.1 start is not available, write:
  `Actual elapsed duration since Chat 1.1: NOT VERIFIABLE`
- Earliest verifiable evidence and calendar span may be reported as context.
- Calendar span is not working duration.
- Do not calculate project elapsed time from the first known date unless that date is explicitly the verified Chat 1.1 start.
- If the Chat 1.1 timestamp is recovered later, update the synthesis layers without rewriting historical facts.

## PARETO

After full extraction, produce:

### Top 20% Changes
Maximum 5.

### Top 20% Bottlenecks
Maximum 5.

### Top 20% Decisions
Maximum 5.

Do not delete the full forensic evidence. Pareto is a synthesis layer only.

## FAILURE FORENSICS

For every important failure use:

```text
Symptom:
Root Cause:
Attempt:
Why It Failed:
Resolution:
Lesson:
Status:
```

## CONTRACT FORENSICS

For component/API/route changes use:

```text
Old Contract:
New Contract:
Why Changed:
Consumers Affected:
Verification:
```

Do not invent prop names or types.

## GIT FORENSICS

Record only SHAs/dates actually visible in conversation or GitHub evidence.

Never fabricate a final SHA.

## DOCUMENTATION SYNTHESIS RULE

The forensic archive is the detailed source layer. When the workflow calls for progress synchronization:

```text
CHAT-X.Y.md
      ↓
docs/progress/README.md
      ↓
README.md
```

The progress index should summarize chronology, dates/times, duration when verifiable, focus, status, milestones, current Pareto, and project elapsed-time status.

The root README should summarize current state and Pareto progress, not reproduce the forensic archive.

Timing facts must remain consistent across all three layers.

## OUTPUT

Produce a Markdown engineering archive suitable for:

`docs/progress/CHAT-X.Y.md`

End with:

```text
Starting State
      ↓
Session Timeline
      ↓
Project Timeline Since Chat 1.1
      ↓
Major Changes
      ↓
Bottlenecks
      ↓
Decisions
      ↓
Verified State
      ↓
Technical Debt
      ↓
Next Chat Handoff
```
