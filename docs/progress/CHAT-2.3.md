# BBKitchen Next.js Migration — Chat 2.3

## Date / Session Timeline

```text
Session: 2.3
Started: 24 August 2026 08:12 WIB
Ended: PENDING
Duration: PENDING
Timezone: WIB (UTC+7)
```

## Scope

Production WooCommerce verification, canonical fetch-path migration, and SEO hardening.

## Pareto

### Primary Objective

Production WooCommerce verification and SEO hardening.

### Top 3 Priorities

1. Verify `/api/products` and `/api/products?metadata=1` as real production JSON responses.
2. Verify catalog filters and pagination behavior.
3. Align remaining WooCommerce/WordPress fetch paths with the proven native REST mechanism, then perform SEO/indexing verification.

## Priority #1 — Production API Verification

### Repository/code evidence

`src/app/api/products/route.ts` uses the native WooCommerce REST path `/wp-json/wc/v3/...`, server-side credentials, `Accept: application/json`, and a browser-like `User-Agent`. The normal response path parses the upstream body as JSON and returns `Content-Type: application/json`; the metadata branch returns JSON as well.

### Production browser evidence — 24 August 2026

The production browser directly loaded both endpoints and displayed live JSON bodies:

```text
https://bukanbarukitchen.com/api/products
https://bukanbarukitchen.com/api/products?metadata=1
```

Evidence:

- `/api/products` displayed a live JSON array containing WooCommerce product fields including `id`, `name`, `slug`, `permalink`, `categories`, and `images`.
- `/api/products?metadata=1` displayed live JSON metadata including `categories`, `conditionOptions`, and `locationOptions`.

### Verification boundary

```text
Production endpoint reachable in browser: ✅ verified
Production JSON response body: ✅ verified
HTTP 200 header: ⚠️ not captured in the provided browser screenshots
Content-Type response header: ⚠️ not captured in the provided browser screenshots
```

Therefore the raw production JSON body is verified, but the stricter `HTTP 200 + Content-Type: application/json` header criterion is not claimed from screenshots alone.

## Priority #2 — Filters & Pagination

Production browser verification completed one test at a time on 24 August 2026.

| Test | Result | Evidence |
|---|---|---|
| `/api/products?page=1&per_page=5` | ✅ | Production JSON returned |
| `/api/products?page=2&per_page=5` | ✅ | Production JSON returned with different products |
| `/api/products?category=160` | ✅ | Returned products carrying category id `160` / `DOUBLE SINK STAINLESS` |
| `/api/products?search=stainless` | ✅ | Returned stainless-related products |
| `/api/products?category=160&page=1&per_page=5` | ✅ | Combined category + pagination request returned matching JSON |

### Priority #2 conclusion

```text
Production filter/pagination request handling: ✅ functionally verified
Exact item-count/header verification: ⚠️ not claimed from screenshots where the full body/header was not visible
```

## Priority #3 — Canonical Fetch-Path Migration

### `product-category/[...slug]` migration — ✅ completed

`src/app/product-category/[...slug]/page.tsx` previously fetched WooCommerce directly from `www.bukanbarukitchen.com/wp-json/wc/v3`, constructed Basic Authorization in the page module, and performed its own category lookup.

It is now migrated to the canonical application API flow:

```text
product-category page
        ↓
https://bukanbarukitchen.com/api/products?metadata=1
        ↓ resolve category slug → category id
/api/products?category=<id>&per_page=24&orderby=date&order=desc
        ↓
WooCommerce native REST proxy
        ↓
origin.bukanbarukitchen.com
```

The page no longer contains WooCommerce credentials, direct WooCommerce origin configuration, or direct WooCommerce REST requests.

Commit:

```text
37c32accc2bbb855167bc42ef710ee5a2adca170
```

### WordPress REST helper migration — ✅ completed

`src/lib/wordpress.ts` was actively used by `/api/wordpress`, so deletion was not appropriate. The helper previously used the rejected legacy routing strategy:

- `jkt10.dewaweb.com`
- conditional `Host: www.bukanbarukitchen.com`
- `rest_route=/wp/v2/...` query forwarding

It now uses the canonical WordPress REST path directly:

```text
https://origin.bukanbarukitchen.com/wp-json/wp/v2/<resource>
```

It preserves the `WORDPRESS_API_URL` environment override, all existing query options and exported helper functions, and the active `/api/wordpress` abstraction. It also uses the browser-like `User-Agent` strategy used by the recovered WooCommerce path.

Commit:

```text
1acc365d9f98becefaec42ed30b00d5a67c5f781
```

### Legacy WooCommerce compatibility proxy — ⚠️ pending retirement decision

`src/app/wp-json/wc/v3/[...slug]/route.ts` remains present and contains the rejected legacy architecture. Repository search did not identify a current application consumer, but external consumer usage cannot be proven from the repository alone.

```text
Internal application consumer found: ❌ none identified
External dependency: ⚠️ unknown
Safe to delete immediately: ❌ not yet
Recommended action: confirm external dependency status, then retire/delete if unused
```

## SEO Hardening — Sitemap Architecture

### Problem confirmed

The previous `src/app/sitemap.ts` collected every published product during sitemap generation by paging through `/api/products` until `X-WP-TotalPages`. That made the root `/sitemap.xml` dependent on the full product catalog and could exceed the deployment/request timeout as the catalog grows.

### Production reference

The uploaded production sitemap index is split into multiple Yoast-generated product sitemaps (`product-sitemap.xml`, `product-sitemap2.xml`, `product-sitemap3.xml`) plus category sitemap coverage. The product sitemap entries use `/shop/<slug>` URLs and `lastmod` values.

### Migration implemented — ✅

The monolithic Next.js metadata sitemap was replaced with request-time XML sitemap routes:

```text
/sitemap.xml
    ├── /sitemap-static.xml
    ├── /sitemap-categories.xml
    └── /sitemap-products/1.xml
        /sitemap-products/2.xml
        /sitemap-products/3.xml
        ...
```

Implementation:

- `src/app/sitemap.xml/route.ts` generates the sitemap index and determines the number of product sitemap chunks from `X-WP-TotalPages`.
- `src/app/sitemap-products/[page].xml/route.ts` fetches only the five WooCommerce API pages belonging to that sitemap chunk, with 100 products per API page / 500 products per sitemap.
- `src/app/sitemap-categories.xml/route.ts` exposes product category URLs from the existing metadata endpoint.
- `src/app/sitemap-static.xml/route.ts` preserves the existing static public URLs.
- Sitemap responses use XML content type and one-hour shared caching with stale-while-revalidate.
- Product URLs remain `/shop/<slug>` and retain `date_modified` as `<lastmod>` where available.

### Commit sequence

```text
2bb4871274117ae1067909e34e73c8c57e347129  remove monolithic src/app/sitemap.ts
ac64b589537d5f626b0c246285ac9bf2946daf69  add request-time sitemap index
bc016ee44c188efedc06ab45d145d5fc2a47da51  add paginated product sitemaps
70a60ff0ff8576c74a7970faee39be18cd21a0b8  add category sitemap
4f3bb0d51bbd9dad531a11933ee9834d823cd418  add static sitemap
```

### Verification boundary

```text
Repository implementation: ✅ committed
Production /sitemap.xml response: ⚠️ pending deployment verification
Child product sitemap response: ⚠️ pending deployment verification
Google Search Console indexing behavior: ⚠️ pending
Local build/typecheck: ⚠️ not executed in this environment
```

## Current Audit Conclusion

```text
Main WooCommerce catalog/product flow: ✅ canonical
product-category direct WooCommerce fetch: ✅ migrated
WordPress REST helper: ✅ migrated to canonical origin/path
Legacy /wp-json/wc/v3 compatibility proxy: ⚠️ internally orphaned; external dependency unknown
Sitemap generation: ✅ migrated from monolithic build-time collection to request-time split XML sitemaps
```

## Verification / CI Boundary

```text
GitHub Actions workflow runs for migration commits:
none returned by repository connector

Local build/typecheck:
not executed in this environment

Production sitemap verification:
pending deployment
```

Therefore build/CI green and production sitemap success are **not claimed** yet.

## Locked Architecture / Do Not Regress

- Next.js owns the public rendering layer.
- WordPress/WooCommerce/ACF/Core System remains the backend/admin source of truth.
- `origin.bukanbarukitchen.com` remains the verified backend/API origin.
- Do not create a second WordPress source of truth.
- Do not resurrect the rejected Vercel `Host`-header workaround.
- Do not rely on WooCommerce Basic Auth for this origin.
- Preserve `/shop/[slug]` as the public product URL family.
- `isAdminMode` is not authentication.
- Do not return to a monolithic `getAllProducts()` sitemap implementation.

## Repository Context Read

- `docs/prompts/START-SESSION-PROMPT.md`
- `README.md`
- `NAVIGATOR.md`
- `docs/progress/README.md`
- `docs/progress/CHAT-2.2.md`
- `docs/guides/README.md`
- `src/app/api/products/route.ts`
- `src/lib/woocommerce.ts`
- `src/app/catalog/page.tsx`
- `src/app/product/[slug]/page.tsx`
- `src/app/product-category/[...slug]/page.tsx`
- `src/app/wp-json/wc/v3/[...slug]/route.ts`
- `src/lib/wordpress.ts`
- `src/app/api/wordpress/route.ts`
- `src/app/sitemap.xml/route.ts`
- `src/app/sitemap-products/[page].xml/route.ts`
- `src/app/sitemap-categories.xml/route.ts`
- `src/app/sitemap-static.xml/route.ts`

## Next Step

1. Confirm whether the legacy `/wp-json/wc/v3/[...slug]` compatibility route has any external consumer before deleting/retiring it.
2. Deploy and verify `/sitemap.xml`, `/sitemap-static.xml`, `/sitemap-categories.xml`, and at least the first product sitemap response.
3. Verify `robots.txt`, canonical URLs, and Google Search Console sitemap/indexing behavior.
4. Run a real build/typecheck before claiming CI/build green.
