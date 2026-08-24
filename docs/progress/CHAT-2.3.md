# BBKitchen Next.js Migration — Chat 2.3

## Date / Session Timeline

```text
Session: 2.3
Started: 24 August 2026 08:12 WIB
Ended: 24 August 2026 10:42 WIB
Duration: 2h 30m
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

## SEO Hardening — Sitemap / URL Architecture Audit

### Legacy sitemap evidence reviewed

NotebookLM audit of the uploaded production/legacy Yoast sitemap set reported:

```text
Total <loc> entries: 5,305
HTML URL entries: 2,566
WebP media entries used as root <loc>: 2,739
```

It also identified duplicate WebP entries and a broader URL architecture than the three initially discussed parents. The discovered top-level patterns included:

```text
/
/jual-barang-bekas-restoran/
/solusi-peralatan-dapur-mbg/
/shop/
/product-category/
/denyut-dapur-nusantara/
/katalog/
/kebijakan-privasi-dan-penggunaan/
/sentra-jual-barang-bekas-restoran/
```

Important decision:

```text
Do NOT standardize existing legacy slugs during this migration.
Preserve existing URL/path hierarchy unless a separate redirect/canonical redesign is explicitly approved.
```

### Legacy WebP leakage vs Next.js generator

The 2,739 WebP entries are a legacy sitemap finding. A code audit of the current Next.js generators found no source path that emits `.webp` URLs as standalone sitemap `<loc>` entries.

```text
Legacy sitemap WebP leakage: ✅ evidenced in legacy data
Next.js code leakage: ✅ not found
Live production byte-level proof: ⚠️ not conclusively verified in this session
```

### Page sitemap hierarchy fix — ✅ implemented

`src/app/sitemap-pages.xml/route.ts` now uses the full WordPress `link` pathname and rewrites the host to the canonical `www` host. This preserves paths such as:

```text
https://www.bukanbarukitchen.com/jual-barang-bekas-restoran/jakarta/jakarta-selatan
```

instead of reducing them to the leaf slug only.

### Sitemap generator code audit — STEP 1 ✅

Audited current generators for:

- `sitemap.xml`
- `sitemap-static.xml`
- `sitemap-pages.xml`
- `sitemap-posts.xml`
- `sitemap-categories.xml`
- `sitemap-products/[...path]`

Current code audit conclusion:

```text
Standalone WebP <loc> emission found: ❌
Canonical www host in sitemap generators: ✅
Sitemap index product chunk count: dynamic
```

### Current sitemap follow-up queue

```text
1. Fix/audit sitemap-posts.xml to preserve full WordPress post path.
2. Audit/fix sitemap-categories.xml for parent/child hierarchy.
3. Verify product sitemap `/shop/[slug]` parity and chunk behavior.
4. Verify dynamic routing against ALL discovered URL parent patterns.
5. Production smoke-test sitemap index + child XMLs.
6. Verify robots/canonical/GSC behavior.
```

## Verification / CI Boundary

```text
GitHub Actions workflow runs for migration commits:
none returned by repository connector

Local build/typecheck:
not executed in this environment

Production sitemap verification:
pending deployment / live XML evidence
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
- Preserve existing WordPress URL hierarchy during migration; do not standardize slugs unless separately approved.
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
- `src/app/sitemap-products/[...path]/route.ts`
- `src/app/sitemap-categories.xml/route.ts`
- `src/app/sitemap-pages.xml/route.ts`
- `src/app/sitemap-posts.xml/route.ts`
- `src/app/sitemap-static.xml/route.ts`

## Handoff

Current state:

- Production API body responses verified; strict HTTP 200/Content-Type header evidence remains a boundary.
- Filter and pagination behavior functionally verified.
- `product-category/[...slug]` migrated to canonical application API path.
- `src/lib/wordpress.ts` migrated to canonical WordPress REST origin/path.
- Legacy WooCommerce compatibility proxy remains pending external-consumer confirmation.
- Sitemap split architecture and page hierarchy preservation are implemented/audited in code.
- Production sitemap XML and GSC behavior remain pending live verification.

### Next priority order

1. Audit remaining WooCommerce/WordPress fetch paths in the repository (Priority #3).
2. Confirm whether the legacy `/wp-json/wc/v3/[...slug]` compatibility route has any external consumer before deleting/retiring it.
3. Continue sitemap parity work: posts, categories, products, dynamic routing, and production smoke tests.

### Do not repeat

- Do not resurrect the rejected Vercel `Host` header workaround.
- Do not use WooCommerce Basic Auth for this origin.
- Do not standardize legacy URLs/slugs during this migration without explicit redirect/canonical approval.
- Do not claim CI/build or live sitemap verification without direct evidence.
