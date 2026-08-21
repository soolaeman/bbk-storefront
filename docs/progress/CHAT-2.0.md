# BBKitchen Next.js Migration — Chat 2.0

## Date / Session Timeline

```text
Session: 2.0
Started: 21 August 2026 08:36:00 WIB
Ended: Pending
Duration: Pending
Evidence source: User-confirmed session start and closing time in the current conversation.
```

## Pareto Objective

**1 BIG GOAL:** Resume BBKitchen migration from the Chat 1.9 handoff with evidence-first verification and preserve the public URL contract defined by the WordPress sitemap.

### Top priorities

1. Restore Vercel → `www.bukanbarukitchen.com` WordPress/WooCommerce upstream connectivity.
2. Implement dynamic route patterns matching the sitemap instead of manual per-URL routes.
3. Verify product, category, page, post, and archive coverage against the sitemap.

## Sitemap Contract

The uploaded Yoast sitemap index contains six source sitemaps: post, page, three product sitemaps, and product category. fileciteturn36file0L1-L2

Observed public URL patterns:

- WooCommerce products: `/shop/<slug>/` fileciteturn36file6L1-L2
- WooCommerce product categories: `/product-category/<nested-slug>/` with nested category paths. fileciteturn36file11L1-L2
- WordPress posts: root-level slug such as `/paket-dapur-mbg-200-jutaan/`. fileciteturn36file3L1-L2
- WordPress pages: root-level and named paths such as `/`, `/katalog/`, and `/sentra-jual-barang-bekas-restoran/`. fileciteturn36file7L1-L2

## Implementation Completed

1. `src/lib/wordpress.ts`
   - Default WordPress REST upstream restored to `https://www.bukanbarukitchen.com/wp-json/wp/v2`.
   - Removed normalization that forced `www` to apex.
   - Commit: `bc3dd9b4b39f04c3ca9918ce73e45f1b7246efed`.

2. `src/app/api/products/route.ts`
   - Default WooCommerce REST upstream restored to `https://www.bukanbarukitchen.com/wp-json/wc/v3`.
   - Removed normalization that forced `www` to apex.
   - Commit: `8ce14e4036bb13103551d503591295543ceed172`.

3. `src/app/shop/[slug]/page.tsx`
   - Added one dynamic route pattern for all sitemap WooCommerce product URLs.
   - Commit: `b15bde10bfced386ec98cac0468008e41b983257`.

4. `src/app/product-category/[...slug]/page.tsx`
   - Added nested dynamic route pattern for all sitemap WooCommerce category URLs.
   - Commit: `a021d368970fe8d29c9b0c7aa23168c65b675999`.

5. `src/app/[...slug]/page.tsx`
   - Added root-level WordPress page/post fallback using exact sitemap path resolution against WordPress REST.
   - Commit: `6aa36854c00a8d0b1ad161b24479e661784f4a26`.

## Important Caveat

The upstream host changes are evidence-based but still require a production deployment/runtime verification. The new `/shop/[slug]` wrapper reuses the existing product renderer; its metadata/canonical behavior must be verified and corrected if it emits `/product/<slug>` instead of the sitemap-preserved `/shop/<slug>` canonical. No assumption of production success should be made until Vercel runtime is checked.

## Verification Status

- Sitemap pattern inventory: verified from uploaded sitemap files.
- Route pattern implementation: completed.
- Production Vercel verification: PENDING.
- WooCommerce 403 verification after host fix: PENDING.
- WordPress 403 verification after host fix: PENDING.
- Full sitemap URL crawl: PENDING.

## Next Step

Deploy/verify the current `main` changes, then test representative URLs from every sitemap pattern and inspect Vercel runtime logs. After runtime success, run a sitemap-driven URL coverage audit rather than manually creating individual routes.
