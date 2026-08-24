# BBKitchen Next.js Migration — Chat 2.5

## Date / Session Timeline

```text
Session: 2.5
Started: 24 August 2026 13:00:50 WIB
Ended: PENDING
Duration: PENDING
Evidence source: current session timestamp from Asia/Jakarta clock at session bootstrap; no stronger historical start evidence was available before session creation.
```

## Scope

Universal WordPress hierarchy resolver for Next.js routing, canonical URL generation, and `sitemap-pages.xml`, with production sitemap verification.

## Pareto

1. Implement one universal parent/child hierarchy resolver from WordPress page IDs and `parent` relationships.
2. Reuse the resolver across catch-all page routing, canonical metadata, and `sitemap-pages.xml` so future parent creation requires no parent-specific hardcoding.
3. Verify arbitrary-depth paths and production sitemap output, then continue SEO parity work.

## Bootstrap Evidence

- Canonical START SESSION SOP was read from `docs/prompts/START-SESSION-PROMPT.md`.
- Latest progress index is `docs/progress/README.md`.
- Latest closed session is Chat 2.4, whose handoff names Chat 2.5 as `Universal WordPress Hierarchy Resolver`.
- Root `README.md` currently records Chat 2.4 as the latest closed checkpoint and carries the same Pareto priorities.
- `NAVIGATOR.md` confirms the canonical documentation workflow and progress archive structure.
- `docs/guides/README.md` confirms the current routing/hierarchy and SEO/sitemap architectural notes.

## Current Verified Context

- Branch: `main`.
- Public rendering remains Next.js; WordPress/WooCommerce/ACF/Core System remains the backend/admin source of truth.
- `origin.bukanbarukitchen.com` remains the verified backend/API origin.
- `/shop/[slug]` remains the public product URL family.
- `/solusi-peralatan-dapur-mbg/` is the public/canonical MBG landing URL.
- `/dapur-mbg/` is redirect-only and excluded from the static sitemap.
- Chat 2.4 verified that live `sitemap-pages.xml` still contains flat/root-level legacy page URLs, so universal hierarchy resolution remains unresolved.

## Next Verification Boundary

Before implementation, inspect current Git state and relevant route/sitemap source. After implementation, run diff/status/build checks and verify production behavior rather than claiming completion from code existence alone.

## Rules Carried Forward

- Do not create MBG-specific sitemap hacks.
- Do not flatten hierarchical WordPress URLs.
- Do not invent or rewrite historical timestamps.
- Do not claim live sitemap parity without direct production evidence.
- Preserve forensic session history.
