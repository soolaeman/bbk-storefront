# BBKitchen Next.js Migration — Chat 2.4

## Date / Session Timeline

Session: 2.4
Started: 24 August 2026 10:58:00 WIB
Ended: PENDING
Duration: PENDING
Evidence source: current session timestamp supplied by the system/developer context at session bootstrap; latest repository session `CHAT-2.3` is recorded as ending 24 August 2026 10:42 WIB.

## Scope

Session bootstrap only. No application-code changes have been made yet.

## Pareto

### Primary Objective

Audit remaining WooCommerce/WordPress fetch paths and continue the Chat 2.3 sitemap-parity handoff without regressing the locked architecture.

### Top 3 Priorities

1. Audit remaining WooCommerce/WordPress fetch paths before changing further sitemap code.
2. Confirm whether `src/app/wp-json/wc/v3/[...slug]/route.ts` has any external consumer before retirement.
3. Continue sitemap parity and production verification: posts, categories, products, dynamic URL parents, robots, canonical URLs, and live XML/GSC evidence.

## Repository Context Read

- `docs/prompts/START-SESSION-PROMPT.md`
- `README.md`
- `NAVIGATOR.md`
- `docs/progress/README.md`
- `docs/progress/CHAT-2.3.md`
- `docs/guides/README.md`

## Locked Architecture

- Next.js owns the public rendering layer.
- WordPress/WooCommerce/ACF/Core System remains the backend/admin source of truth.
- `origin.bukanbarukitchen.com` remains the verified backend/API origin.
- Preserve `/shop/[slug]` as the public product URL family.
- Preserve existing WordPress URL hierarchy during migration.
- Do not resurrect the rejected Vercel Host-header workaround.
- Do not rely on WooCommerce Basic Auth for this origin.
- `isAdminMode` is not authentication.

## Current Known Verification Boundaries

- Strict production `HTTP 200 + Content-Type: application/json` header evidence remains pending even though response bodies are browser-verified.
- Legacy WooCommerce compatibility proxy external dependency remains unknown.
- Production sitemap XML and GSC behavior remain pending live verification.

## Git Checkpoint

Progress file created before application coding, per START SESSION SOP.

Git pull required after any GitHub changes:

```bash
git pull origin main
```

## Handoff

No application implementation started in this bootstrap step. Continue with the Pareto audit before modifying code.
