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

The uploaded Yoast sitemap index contains six source sitemaps: post, page, three product sitemaps, and product category.

Public URL contract clarified during Chat 2.0:

- Catalog page: `/katalog/` — this is the public catalog URL and must remain `/katalog`, not `/catalog`.
- WooCommerce products: `/shop/<slug>/` — this is the intentional product URL exception/pattern.
- WooCommerce product categories: `/product-category/<nested-slug>/` with nested category paths.
- WordPress posts/pages/archives: preserve the public paths represented by the sitemap; do not invent a new `/product/...` public URL for products.

## Implementation Completed

1. `src/lib/wordpress.ts`
   - Default WordPress REST upstream restored to `https://www.bukanbarukitchen.com/wp-json/wp/v2`.
   - Removed normalization that forced `www` to apex.
   - Commit: `bc3dd9b4b39f04c3ca9918ce73e45f1b7246efed`.

2. `src/app/api/products/route.ts`
   - Default WooCommerce REST upstream restored to `https://www.bukanbarukitchen.com/wp-json/wc/v3`.
   - Removed normalization that forced `www` to apex.
   - Commit: `8ce14e4036bb13103551d503591295543ceed172`.

3. `src/app/katalog/page.tsx`
   - Added the sitemap-preserved public catalog route `/katalog` as a route wrapper around the existing catalog implementation.
   - Commit: `0412241e3a49c9c19a600b3dc6ccc316d45ad203`.

4. `src/app/shop/[slug]/page.tsx`
   - Dynamic route exists for all sitemap WooCommerce product URLs under `/shop/<slug>`.
   - The existing product renderer is reused; metadata/canonical must still be verified for `/shop`.

5. `src/app/product-category/[...slug]/page.tsx`
   - Nested dynamic route pattern for sitemap WooCommerce category URLs.
   - Commit: `a021d368970fe8d29c9b0c7aa23168c65b675999`.

6. `src/app/[...slug]/page.tsx`
   - Root-level WordPress page/post fallback using exact sitemap path resolution against WordPress REST.
   - Commit: `6aa36854c00a8d0b1ad161b24479e661784f4a26`.

7. `src/components/Header.tsx`
   - Public catalog navigation/search destination corrected from `/catalog` to `/katalog`.
   - Product search result destination corrected from `/product/<slug>` to `/shop/<slug>`.
   - Commit: `02f6a44a3a64caf522c148508d853a073ab718f2`.

## Important Caveat

The upstream host changes are evidence-based but still require production deployment/runtime verification. The `/shop/[slug]` wrapper reuses the existing product renderer; its metadata/canonical behavior must be verified and corrected if it emits `/product/<slug>` instead of the sitemap-preserved `/shop/<slug>` canonical.

## Verification Status

- Sitemap pattern inventory: verified from uploaded sitemap files.
- Public URL contract clarification: completed.
- Dynamic route pattern implementation: completed.
- Production Vercel verification: PENDING.
- WooCommerce 403 verification after host fix: PENDING.
- WordPress 403 verification after host fix: PENDING.
- Full sitemap URL crawl: PENDING.

## Next Step

Deploy/verify the current `main` changes, then test `/katalog`, representative `/shop/<slug>`, representative `/product-category/...`, and representative WordPress post/page URLs. Inspect Vercel runtime logs and then run a sitemap-driven URL coverage audit rather than manually creating individual routes.
