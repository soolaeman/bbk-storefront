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

Production WooCommerce verification and SEO hardening, following the Chat 2.2 handoff.

## Pareto

### Primary Objective

Production WooCommerce verification and SEO hardening.

### Top 3 Priorities

1. Verify `/api/products` and `/api/products?metadata=1` as real production JSON responses.
2. Verify catalog filters and pagination behavior.
3. Audit remaining WooCommerce fetch paths and then perform SEO/indexing verification.

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
- `/api/products?metadata=1` displayed live JSON metadata including `categories`, `conditionOptions`, `locationOptions`, and SEO-related metadata fields.

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

## Priority #3 — WooCommerce Fetch Path Audit

Repository audit on 24 August 2026 searched for WooCommerce and `/api/products` usage and inspected the main fetch paths.

### Canonical/current path

`src/lib/woocommerce.ts` is aligned with the current architecture for the main catalog/product flow: it uses `https://origin.bukanbarukitchen.com` as the default WooCommerce origin, builds native `/wp-json/wc/v3/...` URLs, sends server-side WooCommerce credentials, and the catalog calls `/api/products` rather than exposing credentials to the browser.

`src/app/api/products/route.ts` is the current verified product proxy and also uses `origin.bukanbarukitchen.com` as its default upstream.

### Legacy fetch path found — product category page

`src/app/product-category/[...slug]/page.tsx` still contains a direct WooCommerce implementation with this fallback:

```text
https://www.bukanbarukitchen.com/wp-json/wc/v3
```

It also constructs Basic Authorization directly in the page module and fetches `products/categories` and `products` itself. This is inconsistent with the current `/api/products` proxy architecture and should be migrated before SEO/indexing hardening is considered complete.

### Legacy compatibility proxy found

`src/app/wp-json/wc/v3/[...slug]/route.ts` is still present and contains the rejected legacy architecture:

- fallback origin `https://jkt10.dewaweb.com`
- fallback `Host: www.bukanbarukitchen.com`
- Basic Authorization
- compatibility forwarding through `rest_route`

This route is not part of the canonical `/api/products` path and conflicts with the locked instruction not to resurrect the rejected Vercel `Host`-header workaround. It should be treated as legacy technical debt and removed or explicitly retired after confirming there are no required external consumers.

### WordPress REST helper audit

`src/lib/wordpress.ts` also retains the same legacy fallback pattern (`jkt10.dewaweb.com` + conditional `Host` header) for WordPress REST calls. This is separate from the verified WooCommerce product path and should be audited/migrated in the SEO/indexing phase rather than silently left as a second backend-routing strategy.

## Audit Conclusion

```text
Main WooCommerce catalog/product flow: ✅ aligned with current proxy architecture
Direct WooCommerce fetch in product-category page: ⚠️ legacy path found
Legacy /wp-json/wc/v3 compatibility proxy: ⚠️ legacy Host-header workaround found
WordPress REST helper fallback: ⚠️ legacy Host-header workaround found
```

**No application code was changed during this audit.** The findings are recorded before making the migration changes so the next change can be targeted and reversible.

## Locked Architecture / Do Not Regress

- Next.js owns the public rendering layer.
- WordPress/WooCommerce/ACF/Core System remains the backend/admin source of truth.
- `origin.bukanbarukitchen.com` remains the verified backend/API origin.
- Do not create a second WordPress source of truth.
- Do not resurrect the rejected Vercel `Host`-header workaround.
- Do not rely on WooCommerce Basic Auth for this origin.
- Preserve `/shop/[slug]` as the public product URL family.
- `isAdminMode` is not authentication.

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

## Git Checkpoint

```text
Session bootstrap:
90c308d8e950cee2a480d610c818676ad066b407

Priority #1/#2 + fetch audit documentation:
pending commit result
```

## Next Step

Migrate the legacy `product-category` direct WooCommerce fetch to the canonical server/proxy path, then retire the obsolete compatibility Host-header path after confirming it has no required consumers. After that, perform SEO/indexing verification.
