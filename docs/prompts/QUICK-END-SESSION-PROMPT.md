# BBKitchen — Quick End Session Prompt

Use this when the session is straightforward and does not require a long forensic extraction.

```text
END SESSION BBKITCHEN.

Repository: soolaeman/Front-End-BBKitchen
Branch: feature/nextjs-migration

1. Audit what actually changed in this chat.
2. Verify what is DONE, PARTIAL, BLOCKED, or DEFERRED.
3. Record the top 3 Pareto changes and top 3 carried-forward items.
4. Record any bottleneck with symptom → root cause → resolution.
5. Record failed approaches that must not be repeated.
6. Record build/runtime/UI verification separately.
7. Record exact Git SHA/date only when evidenced.
8. Create/update `docs/progress/CHAT-X.Y.md`.
9. Update root `README.md` only with current state, Pareto priorities, major decisions, technical debt, and next handoff.
10. Do not duplicate the full session log into README.
11. Do not invent missing dates, SHAs, errors, props, or verification.
12. Confirm every GitHub write succeeded before claiming completion.

Final response:
- status
- progress archive SHA
- README SHA
- last code SHA
- top 3 carry-forward items
- next chat title
```
