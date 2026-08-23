# BBKitchen Next.js Migration — Chat 2.2

## Date / Session Timeline

```text
Session: 2.2
Started: 24 August 2026 05:33 WIB
Ended: PENDING
Duration: PENDING
Evidence source: User-supplied session start timestamp in conversation: "dimulai Senin, 24 Agustus 2026, sekitar 05:33 WIB (UTC+7)".
```

## Scope

**1 BIG GOAL:** Isolate the direct-origin WooCommerce REST authentication blocker and, only after successful authentication, verify the production catalog data path.

## Starting State

- Branch/source of truth: `main`.
- Chat 2.1 is closed with the origin separation resolved and WooCommerce REST authentication still blocked by `401 woocommerce_rest_cannot_view`.
- `origin.bukanbarukitchen.com` is the verified backend/API origin mapped to the existing `/home/bukanbar/public_html` WordPress installation.
- `/katalog` is reachable, but dynamic WooCommerce product listing remains blocked upstream.

## Pareto Priorities

1. **BLOCKER:** Perform one controlled direct-origin authenticated WooCommerce product-list request using the current credentials; do not generate new credentials without new evidence.
2. **IMPORTANT:** Based on the direct-origin result, isolate the failure to either the Vercel/proxy request construction or the WordPress/WooCommerce/server authentication layer.
3. **NEXT:** After authentication succeeds, verify `/api/products`, `/katalog`, metadata/filter behavior, and `/shop/[slug]`.

## Repository Findings

### `/api/products`

`src/app/api/products/route.ts` currently defaults to `https://jkt10.dewaweb.com` when `WOOCOMMERCE_API_URL` is absent, and only uses `www.bukanbarukitchen.com` as a `Host` header in that fallback mode. Requests are built as `/?rest_route=/wc/v3/...` with `consumer_key` and `consumer_secret` query parameters when credentials are present. fileciteturn6file0L2-L6

This is inconsistent with the verified migration architecture, where `origin.bukanbarukitchen.com` is the backend/API origin. It is therefore a concrete configuration/code path that must be verified before any credential or database changes.

### Compatibility WooCommerce route

`src/app/wp-json/wc/v3/[...slug]/route.ts` has the same `jkt10.dewaweb.com` fallback and uses only Basic `Authorization`, unlike the query-string strategy in `/api/products`. fileciteturn8file0L2-L6

### Product detail

`src/app/product/[slug]/page.tsx` defaults to `https://www.bukanbarukitchen.com/wp-json/wc/v3` and uses Basic Authorization directly. This is also inconsistent with the verified public/production architecture and with the query-auth workaround used by `/api/products`. fileciteturn9file0L2-L2

## Firecrawl / External Verification

Firecrawl was unable to retrieve the live `origin.bukanbarukitchen.com` REST endpoints from its scraping engines in this diagnostic pass. This is **not** proof that the origin is down; it only means the Firecrawl fetch path could not retrieve the host.

WooCommerce's current REST API documentation confirms that `401 Unauthorized` represents authentication/permission failure; it specifically notes that FastCGI/server setups can fail to pass the Authorization header and that consumer key/secret may be supplied as query-string parameters when the Authorization header is not parsed correctly. citehttps://github.com/woocommerce/woocommerce/blob/4980c8cd50c0e0fa8d7ae8b05dd2ac36720358bc/docs/apis/rest-api/index.mdx

## Diagnostic Conclusion

⚠️ **New concrete finding:** before changing WordPress/WooCommerce credentials or database state, the frontend repository must be audited/fixed for origin consistency. Multiple WooCommerce server-side paths still contain stale fallback origins (`jkt10.dewaweb.com` / `www.bukanbarukitchen.com`) while the verified backend origin is `origin.bukanbarukitchen.com`.

This does **not yet prove** that stale fallback configuration is the root cause of the existing 401, because production may already have `WOOCOMMERCE_API_URL` set correctly. The next controlled test must establish the actual production target without exposing credentials.

## Verification Status

```text
Session bootstrap: ✅
Timestamp evidence: ✅
Repository audit: ✅
Firecrawl live origin fetch: ⚠️ unable to retrieve host
WooCommerce API documentation check: ✅
Direct authenticated origin result in this session: PENDING
Application code changes in this diagnostic step: NONE
```

## Next Controlled Step

1. Verify the effective production `WOOCOMMERCE_API_URL` configuration without exposing secrets.
2. Confirm whether production `/api/products` targets `origin.bukanbarukitchen.com` or a stale fallback host.
3. If the production target is wrong, fix only the origin configuration/code path and re-test.
4. If the target is correct and the direct-origin authenticated request still returns 401, continue isolation at the WordPress/WooCommerce/server layer.
