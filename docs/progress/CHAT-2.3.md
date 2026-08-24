# BBKitchen Next.js Migration — Chat 2.3

## Date / Session Timeline

```text
Session: 2.3
Started: 24 August 2026 08:12 WIB
Ended: PENDING
Duration: PENDING
Timezone: WIB (UTC+7)
Evidence source: current conversation timestamp supplied by the session environment at 24 August 2026 08:12 WIB; no stronger repository timestamp for this new session was available.
```

## Scope

Bootstrap Chat 2.3 following the canonical START SESSION workflow. No application code changes have been made yet.

## Pareto

### Primary Objective

Production WooCommerce verification and SEO hardening, following the Chat 2.2 handoff.

### Top 3 Priorities

1. Verify `/api/products` and `/api/products?metadata=1` as real `application/json` production responses.
2. Verify catalog filters and pagination behavior.
3. Audit remaining WooCommerce fetch paths and then perform SEO/indexing verification.

## Starting State

- Branch/source of truth: `main`.
- Chat 2.2 is closed and archived.
- Production catalog and product-detail flow are user-verified.
- Public product URL family remains `/shop/[slug]`.
- Native `/wp-json/wc/v3/...` request path with server-side WooCommerce credentials and browser-like User-Agent is the current proven production mechanism.
- Raw `/api/products` JSON, `/api/products?metadata=1` JSON, exhaustive filters/pagination, SEO takeover, and authenticated admin controls remain pending or partially verified.

## Locked Architecture / Do Not Regress

- Next.js owns the public rendering layer.
- WordPress/WooCommerce/ACF/Core System remains the backend/admin source of truth.
- `origin.bukanbarukitchen.com` remains the verified backend/API origin.
- Do not create a second WordPress source of truth.
- Do not resurrect the rejected Vercel `Host`-header workaround.
- Do not rely on WooCommerce Basic Auth for this origin.
- Preserve `/shop/[slug]` as the public product URL family.
- `isAdminMode` is not authentication.

## Verification Discipline

Code existence is not equivalent to runtime, upstream, UI, security, SEO, or production verification. All claims in this session must be labeled according to available evidence.

## Repository Context Read

The session bootstrap read and reviewed:

- `docs/prompts/START-SESSION-PROMPT.md`
- `README.md`
- `NAVIGATOR.md`
- `docs/progress/README.md`
- `docs/progress/CHAT-2.2.md`
- `docs/guides/README.md`

## Initial GitHub Checkpoint

Documentation bootstrap commit: pending inspection after file creation.

## Next Step

Inspect current GitHub branch/state and then proceed with the highest-value production API verification step before any broader scope expansion.
