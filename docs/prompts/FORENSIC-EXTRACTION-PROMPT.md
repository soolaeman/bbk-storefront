[🧭 NAVIGATOR](../../NAVIGATOR.md)

# BBKitchen — Forensic Extraction Prompt

Use this when an old migration chat needs to be archived, especially when many messages are skipped or the session is already closed.

```text
# FORENSIC EXTRACTION — BBKITCHEN NEXT.JS MIGRATION

Ekstrak engineering history dari conversation ini.

Repository:
soolaeman/Front-End-BBKitchen
Branch:
feature/nextjs-migration

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
  `Tidak ditemukan di conversation.`
- If only a date/period is available, preserve the date/period and do not convert it into duration.
- Duration may only be calculated from verified Start and End.
- Never estimate duration from message count, date range, skipped messages, or assumptions.
- If a timestamp comes from a GitHub commit, label it as GitHub evidence.
- Keep timeline data consistent with `docs/progress/README.md` and root `README.md` when those are updated.

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

## OUTPUT

Produce a Markdown engineering archive suitable for:

`docs/progress/CHAT-X.Y.md`

End with:

```text
Starting State
      ↓
Session Timeline
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
