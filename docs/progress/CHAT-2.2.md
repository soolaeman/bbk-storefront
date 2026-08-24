# BBKitchen Next.js Migration — Chat 2.2

## Date / Session Timeline

```text
Session: 2.2
Started: 24 August 2026 05:33 WIB
Ended: 24 August 2026 08:02 WIB
Duration: 2h 29m
Timezone: WIB (UTC+7)
Evidence source: Session start from existing Chat 2.2 archive; session end from current time verification at end-session close.
```

## Scope

Restore and harden the production WooCommerce catalog/detail path, then verify product-detail routing and related products without changing existing `/shop/[slug]` URLs or creating a second WordPress source of truth.

## Starting State

- Branch/source of truth: `main`.
- Chat 2.1 had isolated the origin separation but WooCommerce REST authentication/request construction was still blocked.
- Production catalog recovery became possible after adopting the native `/wp-json/wc/v3/...` request path plus a browser-like `User-Agent` and server-side consumer credentials.
- Product detail pages still failed with a server error because detail fetching remained on the old direct path.

## Pareto

### Top 20% Changes

1. Added `slug` support to `src/app/api/products/route.ts`.
2. Added server-side WooCommerce product lookup by slug and related-product helper in `src/lib/woocommerce.ts`.
3. Switched `src/app/product/[slug]/page.tsx` to the server-side WooCommerce helpers.
4. Restored related-product links and metadata/canonical URLs to `/shop/[slug]`.
5. Updated Product Detail WhatsApp number to `0851 2200 1051`.

### Top 20% Bottlenecks

1. WooCommerce REST auth/request-path instability from the earlier `rest_route` and Basic Auth approaches.
2. Product-detail SSR still used a legacy direct WooCommerce fetch path after the catalog had recovered.
3. Related products initially linked to `/product/[slug]`, creating URL-family drift from the preserved `/shop/[slug]` route.

### Top 20% Decisions

1. Preserve `/shop/[slug]` as the public product URL family; do not replace it with `/product/[slug]`.
2. Keep `[...slug]` and `wp-json/wc/v3/[...slug]` untouched unless a separate audit proves they are obsolete.
3. Keep WooCommerce credentials server-side and use the native WooCommerce REST path with browser-like request headers.
4. Prefer direct server-side module helpers over Server Component self-fetching through `/api/products`.
5. Treat visible production verification as separate from code existence; only mark verified items when user/runtime evidence exists.

## File / Route / API History

### `src/app/api/products/route.ts`
- Changed in this session to whitelist `slug` so `/api/products?slug=...` can resolve a specific product.

### `src/lib/woocommerce.ts`
- Added `slug?: string` to the product query contract.
- Added `getWooCommerceProductBySlug()` using the native WooCommerce REST origin and server-side credentials.
- Added `getWooCommerceRelatedProducts()` using the same server-side origin/request mechanism.
- Related products exclude the current product.

### `src/app/product/[slug]/page.tsx`
- Product detail now resolves through `getWooCommerceProductBySlug()`.
- Related products now resolve through `getWooCommerceRelatedProducts()`.
- Metadata canonical, Open Graph URL, JSON-LD URL/Offer URL, and related-product links use `/shop/[slug]`.
- WhatsApp number changed to `6285122001051`.

### `src/app/shop/[slug]/page.tsx`
- No structural change; remains the product-detail public route wrapper.

### `src/app/[...slug]/`
- No change; retained as WordPress Pages/Posts catch-all.

### `src/app/wp-json/wc/v3/[...slug]/route.ts`
- No change in this session.

## Bottlenecks — Symptom → Root Cause → Resolution

### B-18 carry-forward
- **Symptom:** catalog/detail API requests had returned `401`, HTML instead of JSON, or connection errors.
- **Root cause position:** evidence supported a request-path/User-Agent issue, but did not conclusively prove the server's exact security rule.
- **Resolution:** native `/wp-json/wc/v3/...` path, browser-like `User-Agent`, and server-side consumer key/secret were adopted.
- **Status:** recovered; production catalog visibly working.

### Product-detail SSR blocker
- **Symptom:** opening `/shop/[slug]` showed a server error even though catalog/search worked.
- **Root cause:** product detail still used a legacy direct WooCommerce fetch path instead of the recovered server-side helper path.
- **Resolution:** detail now uses `getWooCommerceProductBySlug()` and related products use the shared server-side helper.
- **Status:** VERIFIED by user in Vercel/production.

### Related-product URL drift
- **Symptom:** clicking a related product changed the browser URL to `/product/[slug]`.
- **Root cause:** related-product links were generated with `/product/...` even though the public product URL family is `/shop/...`.
- **Resolution:** links, canonical metadata, Open Graph URL, and JSON-LD URL were aligned to `/shop/[slug]`.
- **Status:** VERIFIED by user.

## Failed / Rejected Approaches

- Creating a new `src/app/api/products/[slug]/route.ts`: rejected as unnecessary and removed.
- Using Server Component HTTP self-fetch to `/api/products`: rejected in favor of direct server-side module helpers.
- Relying on WooCommerce Basic Auth: previously failed with `401 invalid_username`.
- Vercel-blocked `Host` header workaround / alternate-host strategy: rejected and not retained.

## Verification

```text
Production catalog rendering: ✅ user-verified
Search → product detail: ✅ user-verified
Product detail `/shop/[slug]`: ✅ user-verified
Related products rendering: ✅ user-verified
Related product → `/shop/[slug]`: ✅ user-verified after final routing fix
WhatsApp number in Product Detail: ✅ code verified
Desktop product-detail visual check: ✅ user-supplied screenshot
Mobile catalog/status-card verification from session: ✅ user-supplied screenshots
Final `/api/products` raw curl JSON evidence: Not captured in this session close
Final `/api/products?metadata=1` raw 200 JSON evidence: Not captured in this session close
Production filter/pagination exhaustive verification: Not fully captured in this session close

`Code exists` is not treated as equivalent to every verification category above.
```

## Git Checkpoints

```text
Latest code checkpoint:
ef1687d5673c03b885ac94e4cd20b55f98dab0a7
Message: fix: update WhatsApp number

Previous important code checkpoint:
c97e4a0f97f2dadeb323f3d4958a6c1e8f803276
Message: fix: preserve shop product URLs

Earlier product-detail helper checkpoint:
81908bbe6c54889a4fa01c31ee8e918cb1e6efd6
```

GitHub evidence confirms `ef1687d` changed the Product Detail WhatsApp number from the old value to `6285122001051`.

## Technical Debt / Carried Forward

1. Verify `/api/products?metadata=1` as a real `200 application/json` production response.
2. Run fuller production filter/pagination verification.
3. Audit `src/app/wp-json/wc/v3/[...slug]/route.ts` and any remaining direct WooCommerce server-side fetch paths for consistency with the proven mechanism.
4. Complete origin `robots/noindex` hygiene and public WordPress renderer/SEO surface audit before final launch hardening.
5. Complete authenticated WordPress admin control layer.

## Handoff

### Current State

Product catalog and product-detail flow are operational on the production Vercel deployment, with `/shop/[slug]` preserved as the public product URL and related products following the same URL family.

### Next Priority Order

1. Production API/raw-response verification.
2. Filter/pagination verification.
3. WooCommerce compatibility/direct-fetch audit.
4. SEO/indexing hardening and sitemap-driven verification.

### Things NOT to Repeat

- Do not create a second single-product API route unless a concrete requirement appears.
- Do not switch product links to `/product/[slug]` when `/shop/[slug]` is the established public URL.
- Do not resurrect the Vercel `Host` header workaround or rely on WooCommerce Basic Auth for this origin.
- Do not self-fetch internal Next.js route handlers from Server Components when a direct server-side helper is available.

### Next Conversation Title

`Chat 2.3 — WooCommerce Production Verification & SEO Hardening`
