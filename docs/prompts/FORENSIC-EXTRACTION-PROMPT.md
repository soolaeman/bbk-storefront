[🧭 NAVIGATOR](../../NAVIGATOR.md)

# BBKitchen — Forensic Extraction Prompt

> Use this only to reconstruct **old/closed migration chats** that were not adequately archived.

This is not the normal end-session workflow. For the current session, use [`END-SESSION-PROMPT.md`](END-SESSION-PROMPT.md).

---

## Purpose

Extract institutional memory from an older conversation using only evidence that is actually available.

If a fact cannot be proven from the supplied conversation/evidence, write:

`Tidak ditemukan di conversation.`

Do not infer missing SHA, root cause, file path, prop contract, or verification result.

---

## Output priorities

Capture:

- session objective
- starting state
- changes
- file/component/route/API history
- data and component contracts
- bottlenecks
- symptoms
- root causes
- workarounds
- permanent resolutions
- failed approaches
- architecture decisions
- locked user decisions
- technical debt
- build/runtime/UI verification
- Git checkpoints and dates
- handoff

Preserve the original terminology and distinction between implemented, verified, blocked, and unknown.
