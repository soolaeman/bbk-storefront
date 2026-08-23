# BBKitchen Next.js Migration — Chat 2.2

## Date / Session Timeline

```text
Session: 2.2
Started: 24 August 2026 05:33 WIB
Ended: PENDING
Duration: PENDING
Timezone: WIB (UTC+7)
Evidence source: User-supplied session start timestamp.
```

## Scope

**1 BIG GOAL:** Isolate the WooCommerce REST authentication/request-path blocker and restore the production catalog data path without creating a second WordPress source of truth or using a Vercel-blocked Host-header workaround.

## Starting State

- Branch/source of truth: `main`.
- Chat 2.1 closed with origin separation resolved and WooCommerce REST authentication still blocked by `401 woocommerce_rest_cannot_view`.
- `origin.bukanbarukitchen.com` is the verified backend/API origin mapped to the existing `/home/bukanbar/public_html` WordPress installation.
- `/katalog` was reachable, but the dynamic WooCommerce request path was not yet reliably returning JSON.

## Pareto Priorities

1. **BLOCKER:** Determine the WooCommerce request construction that actually works from the Vercel/Next.js runtime.
2. **IMPORTANT:** Verify that the working request returns real WooCommerce JSON rather than HTML/fallback content.
3. **NEXT:** Verify metadata/filter behavior and product-detail runtime, then close the session with production evidence.

## Diagnostic Evidence

### Failed request strategies

The following tests were performed during this session:

```text
Direct origin + rest_route query authentication
→ 401 woocommerce_rest_cannot_view

Direct origin + HTTP Basic Auth using WooCommerce key/secret
→ 401 invalid_username

Next.js /api/products during the broken path
→ intermittent 200/502; some responses contained HTML instead of JSON

Metadata endpoint /api/products?metadata=1
→ 502 when upstream returned HTML / non-JSON or connection failed

Some product requests
→ ECONNRESET observed from upstream
```

These results established that Basic Auth could not be assumed to work for this origin and that a 200 response alone was not sufficient evidence: the body had to be verified as WooCommerce JSON.

## Working Change Found

A later manual/Gemini-assisted commit changed `src/app/api/products/route.ts` in two important ways:

1. **Native WooCommerce REST path**

Previous request shape:

```text
https://origin.bukanbarukitchen.com/?rest_route=/wc/v3/...
```

Working request shape:

```text
https://origin.bukanbarukitchen.com/wp-json/wc/v3/...
```

The commit was `50bfe2368562b7fac2fa474df7f04ed2652576ea` (`Update route.ts by Gemini`).

2. **Browser-like User-Agent**

The WooCommerce upstream request now includes a browser-style `User-Agent` together with `Accept: application/json`.

The same change keeps WooCommerce consumer key/secret server-side and appends them to the REST request query string.

## Important Rejected Approach

An intermediate attempt changed the fallback upstream to `jkt10.dewaweb.com` and added:

```text
Host: www.bukanbarukitchen.com
```

This was explicitly rejected because the Host-header workaround is blocked by Vercel and is not compatible with the production architecture. That change was reverted before the working path was accepted.

No second WordPress backend was created and no DNS/Host-header bypass was retained.

## Production Evidence

User supplied a live browser screenshot from `bukanbarukitchen.com` showing the catalog successfully rendering WooCommerce-backed products after the native `/wp-json/wc/v3/...` + User-Agent change.

Visible evidence included:

- multiple product cards rendered
- real product images
- WooCommerce product names/descriptions
- location badges such as `KEDAUNG` and `SAWANGAN`
- status badge `READY SIAP KIRIM`
- unit codes such as `BBK2552`, `BBK2551`, `BBK2556`, and `BBK2549`
- product condition badges such as `Baru` and `Bekas`

This is strong visual evidence that the production product-data path is now functioning.

## Repository Change Checkpoint

```text
Working code commit:
50bfe2368562b7fac2fa474df7f04ed2652576ea

Message:
Update route.ts
by Gemini
```

The important behavioral changes in that commit are the native `/wp-json/wc/v3/...` URL construction and browser-like User-Agent. Formatting/refactoring changes were also included.

## Verification Status

```text
Session bootstrap: ✅
Repository audit: ✅
Direct-origin rest_route auth: ❌ 401
Direct-origin Basic Auth: ❌ 401 invalid_username
Native WooCommerce REST request path: ✅ working evidence
Production catalog visual rendering: ✅ user-verified
Product JSON end-to-end response: ⚠️ not captured as final production curl evidence in this record
Metadata endpoint /api/products?metadata=1: ⚠️ final 200 JSON verification pending
Product detail /shop/[slug]: ⚠️ pending
Filter/pagination verification: ⚠️ pending
```

## Root-Cause Position

The session established that the failure was not safely solved by Basic Auth and that the Vercel-blocked Host-header workaround must not be retained.

The currently working production path is associated with the native WooCommerce REST URL (`/wp-json/wc/v3/...`) plus a browser-like User-Agent. This is the strongest evidence-backed implementation found in this session.

Do **not** claim the upstream server's exact security rule as conclusively proven unless a direct origin test isolates it. The evidence supports the request-path/User-Agent fix, but not a complete server-side root-cause proof.

## Carried Technical Debt

- Verify `/api/products?metadata=1` returns `200 application/json` in production.
- Verify `/api/products` with filters, pagination, `status_unit`, condition, location, and category.
- Verify `/shop/[slug]` product detail against the same WooCommerce request mechanism.
- Align `src/app/wp-json/wc/v3/[...slug]/route.ts` with the proven WooCommerce mechanism if still needed.
- Align any remaining direct WooCommerce server-side fetches with the same proven mechanism.
- Run final production/sitemap verification only after catalog + metadata + detail paths are stable.

## Next Controlled Step

1. Test production `/api/products` and `/api/products?metadata=1` and confirm `Content-Type: application/json`.
2. Test catalog filters and pagination.
3. Test one product-detail route.
4. If all pass, close Chat 2.2 and update the root README/current checkpoint with the final code commit and verified session end time.
