# BBKitchen Next.js Migration — Chat 2.7

## Date / Session Timeline

Session: 2.7
Started: 29 August 2026 15:12:28 WIB
Ended: PENDING
Duration: PENDING
Evidence source: current-session clock verification at session bootstrap (29 Aug 2026 15:12:28 WIB); no stronger historical session-start evidence was found in the repository.

## Pareto Objective

Bootstrap Chat 2.7 from the canonical START SESSION workflow and establish a truthful forensic baseline before application-code changes.

## Initial State

- Branch: `main`
- Previous archived session: Chat 2.6, closed 26 Aug 2026.
- Chat 2.6 status: documentation/close session; runtime/build/production verification was deferred.
- Current repository state must be re-audited before implementation; do not assume Chat 2.6 code/documentation state is unchanged.

## Top 3 Priorities

1. Establish and preserve the Chat 2.7 forensic archive before coding.
2. Audit current `main` state and carry forward only verified unresolved work from Chat 2.6.
3. Execute one Pareto implementation/verification path at a time; do not widen scope.

## Carried Priorities from Chat 2.6

1. Verify Antigravity Sales Helper READY ↔ SOLD mutation, WooCommerce stock state, exact SKU search, and path/cache revalidation.
2. Verify split-fetch catalog pagination, especially the READY→SOLD boundary.
3. Implement one universal WordPress hierarchy resolver shared by routing, canonical generation, and `sitemap-pages.xml`, then re-verify sitemap hierarchy.

## Architecture Baseline

- Next.js is the public rendering layer.
- WordPress/WooCommerce/ACF/Core System remains the backend/admin source of truth.
- Public product URLs remain `/shop/[slug]`.
- Backend origin remains `origin.bukanbarukitchen.com`.
- WooCommerce credentials remain server-side.
- `isAdminMode` is not authentication.
- Preserve existing WordPress URL hierarchy during migration.
- Do not treat route existence as proof of redirect, canonical, de-indexing, or production verification.

## Verification Discipline

Code existence is not completion. For relevant changes verify:

`Code → Build → Runtime → Functional/UI → Upstream → Security/permissions → SEO/production as applicable`

Unknown facts must be recorded as:

`Tidak ditemukan di repository/evidence yang tersedia.`

## Bootstrap Status

- Session archive created before application-code work: ✅
- Session start timestamp evidence: ✅ current-session clock
- Previous session history preserved: ✅
- Current repository state audit: ⏳
- Build verification on current `main`: ⏳
- Sales Helper runtime/upstream verification: ⏳
- Split-fetch boundary verification: ⏳
- Universal WordPress hierarchy resolver: ⏳

## Handoff

This file is the official Chat 2.7 bootstrap archive. Update it during the session with meaningful decisions, implementation, verification, Git checkpoints, failures/root causes, and remaining Pareto priorities.

After GitHub changes:

`git pull origin main`
