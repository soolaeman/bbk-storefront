# Chat 1.2 — API / Metadata / Catalog / Product / SEO

> Forensic progress archive. Missing facts are explicitly marked.

## Date

**14 August 2026 evidence.** Exact session start/end time: **Tidak ditemukan di forensic source.**

## Pareto — Top 20% Changes

1. Established `/api/products` as the server-owned catalog contract.
2. Added `/api/products?metadata=1` for dynamic category metadata instead of frontend hardcoding.
3. Locked server-side pagination at **8 products/page** and global search through the API.
4. Integrated `/product/[slug]` with gallery, breadcrumb, Salin Link, and product metadata.
5. Established SEO preservation rules: slug, URL intent, canonical, Open Graph, and Product JSON-LD.

## Bottlenecks

- **Metadata contract:** categories had to remain data-owned rather than UI-owned.
- **Upstream 502 / connection reset:** build could succeed while runtime upstream failed.
- **SEO preservation:** mass slug changes were rejected; existing search intent and URLs must be preserved.
- **ACF contract/fallback:** inventory metadata needed a controlled WordPress/Core boundary.

## Key Lesson

```text
build verified ≠ runtime verified ≠ upstream verified
```

Do not rewrite architecture merely to hide an upstream/network failure.

## Architecture

```text
Browser
   ↓
Next.js API
   ↓
WooCommerce / WordPress
```

The browser does not fetch the entire catalog.

## Verification

Catalog, metadata, product detail, and SEO baseline were established as the starting point for Chat 1.3. Exact final SHA: **Tidak ditemukan di forensic source.**

## Handoff

Chat 1.3 moved from data migration into App Router frontend integration, hierarchical local routing, shared UI, and visual convergence.
