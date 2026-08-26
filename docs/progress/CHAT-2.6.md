# BBKitchen Next.js Migration — Chat 2.6

## Date / Session Timeline

```md
## Date / Session Timeline

Session: 2.6
Started: 26 August 2026 19:22:00 WIB
Ended: PENDING
Duration: PENDING
Evidence source: current session clock supplied at bootstrap; exact historical repository evidence was not available, so this timestamp is the session-start record.
```

## Scope

Resume the BBKitchen Next.js migration from Chat 2.5, with the carried-forward Pareto priority of correcting the MBG hierarchical route import depth, then continue verification only as allowed by current deployment state.

## Bootstrap Evidence

- Canonical start-session prompt read from `docs/prompts/START-SESSION-PROMPT.md`.
- Latest archived session is Chat 2.5.
- Current branch target is `main`.
- Chat 2.5 ended 24 August 2026 13:06:18 WIB with the Vercel Hobby deployment quota blocker still active at that time.

## Pareto Handoff

1. Correct `src/app/solusi-peralatan-dapur-mbg/[...slug]/page.tsx` imports from `../../../../` to `../../../` and commit the verified fix.
2. After deployment quota recovery, perform one production deployment attempt and inspect the resulting build.
3. Implement and verify the universal WordPress hierarchy resolver shared by routing, canonical generation, and `sitemap-pages.xml`.

## Initial Status

- Production deployment state must be re-checked before any deployment attempt.
- Do not repeat Vercel redeploy attempts while the daily quota is exhausted.
- Preserve the existing WordPress hierarchy and avoid MBG-specific sitemap hacks.
