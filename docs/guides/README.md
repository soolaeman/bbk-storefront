[🧭 NAVIGATOR](../../NAVIGATOR.md)

# BBKitchen Guides

Guides are **reference documents for humans**. They explain how the project works, where files live, and what is safe to change.

They are not execution prompts.

## Guides

- [Copy Editing Guide](COPY-EDITING-GUIDE.md) — technical map for finding and changing copy safely, including service, MBG, Jual Unit, Produksi Baru, catalog, product detail, Footer, gallery, and current public URL ownership.
- [Vibe Coding Copy Guide](VIBE-CODING-COPY-GUIDE.md) — simplified guide for non-developers / vibe coding, including current page/copy locations, routing/contract warnings, and MBG display vs public URL ownership.

## Current architecture note

- Public website/rendering is owned by Next.js on `bukanbarukitchen.com`.
- WordPress/WooCommerce/ACF remains the backend/admin source of truth.
- `origin.bukanbarukitchen.com` is the verified backend/API origin mapped to the existing `/home/bukanbar/public_html` WordPress installation.
- WordPress REST is reachable through the origin, including the `wc/v3` namespace. The production catalog/detail flow uses the native `/wp-json/wc/v3/...` request path with server-side WooCommerce credentials and a browser-like User-Agent.
- Production `/api/products` and `/api/products?metadata=1` response bodies have been verified in the browser during Chat 2.3; strict HTTP 200 and `Content-Type` header evidence was not captured in those screenshots and therefore remains a verification boundary.
- Public product URLs are preserved under `/shop/[slug]`; the implementation currently uses the existing `src/app/product/[slug]/page.tsx` renderer behind the public wrapper.
- `product-category/[...slug]` now resolves category metadata and products through the canonical application `/api/products` flow rather than direct WooCommerce requests from the page module.
- `src/lib/wordpress.ts` now uses the canonical `origin.bukanbarukitchen.com/wp-json/wp/v2/...` REST path for the active `/api/wordpress` abstraction.
- The legacy `/wp-json/wc/v3/[...slug]` compatibility proxy remains in the repository pending confirmation that no external consumer depends on it.

## Current routing / hierarchy note

- `/solusi-peralatan-dapur-mbg/` is the public/canonical MBG landing URL and renders the existing Next.js `DapurMbgLanding` display component.
- `/dapur-mbg/` is redirect-only and is excluded from the static sitemap.
- MBG hierarchical routing uses WordPress `parent` relationships and is implemented as a catch-all route.
- The long-term architecture requires one universal WordPress hierarchy resolver shared by routing, canonical generation, and `sitemap-pages.xml`; MBG must not become a special-case sitemap implementation.

## Current SEO / sitemap note

- Current Next.js sitemap generators were audited for standalone `.webp` `<loc>` leakage; no source path emitting `.webp` as a root sitemap URL was found.
- Legacy WordPress sitemap data contained large WebP leakage and duplicate media entries; that is a legacy-data finding and must not be silently attributed to the current Next.js generator.
- `sitemap-pages.xml` preserves the full WordPress `link` pathname and canonical `www` host, but live verification during Chat 2.4 still showed flat/root-level legacy page URLs for some pages. Universal hierarchy resolution remains pending.
- Existing legacy URL hierarchy should be preserved during migration unless a separate redirect/canonical redesign is explicitly approved.
- Sitemap posts/categories/products and production XML smoke testing remain pending work.

## Guides vs Prompts

```text
GUIDE
→ explains
→ maps
→ teaches
→ reference material
→ human reads it

PROMPT
→ instructs an AI session
→ defines a workflow
→ produces an action/result
→ execution protocol
```

For AI session workflows, use [`../prompts/`](../prompts/).
