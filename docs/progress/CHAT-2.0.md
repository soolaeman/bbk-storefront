# BBKitchen Next.js Migration — Chat 2.0

## Date / Session Timeline

```text
Session: 2.0
Started: 21 August 2026 08:36:00 WIB
Ended: 21 August 2026 10:29:00 WIB
Duration: 1h 53m
Evidence source: User-confirmed session start; current-time evidence from the session clock at close.
```

## Pareto Objective

**1 BIG GOAL:** Resume BBKitchen migration from the Chat 1.9 handoff with evidence-first verification and preserve the public URL contract defined by the WordPress sitemap.

### Top priorities

1. Restore a healthy Vercel/Next.js → WordPress/WooCommerce upstream path without sending requests back to the Vercel public domain.
2. Preserve sitemap-driven route patterns, especially `/katalog`, `/shop/<slug>`, `/product-category/<nested-slug>`, and WordPress page/post fallback routes.
3. Verify production/runtime behavior only after the WordPress origin is reachable from outside the public Next.js domain.

## Starting State

- `main` is the current migration branch/source of truth.
- The public domain `www.bukanbarukitchen.com` had been pointed at Vercel.
- The existing WordPress/WooCommerce installation remained on DewaWeb Warrior server `jkt10`, shared IP `103.185.53.66`, document root `/home/bukanbar/public_html`.
- WordPress was still visible in DewaWeb WP Toolkit, confirming the existing installation had not been removed.
- The public domain no longer exposed WordPress admin/REST routes because those requests reached the Vercel/Next.js frontend first.

## Sitemap Contract

The uploaded Yoast sitemap index contains six source sitemaps: post, page, three product sitemaps, and product category.

Public URL contract clarified during Chat 2.0:

- Catalog page: `/katalog/` — this is the public catalog URL and must remain `/katalog`, not `/catalog`.
- WooCommerce products: `/shop/<slug>/` — this is the intentional product URL exception/pattern.
- WooCommerce product categories: `/product-category/<nested-slug>/` with nested category paths.
- WordPress posts/pages/archives: preserve the public paths represented by the sitemap; do not invent a new `/product/...` public URL for products.

## Repository / Code Findings

1. `src/app/api/products/route.ts`
   - Current default upstream logic in `main` uses `https://jkt10.dewaweb.com` and a `Host: www.bukanbarukitchen.com` header when no explicit `WOOCOMMERCE_API_URL` is configured.
   - Requests are constructed through `?rest_route=/wc/v3/...`.
   - WooCommerce authentication uses `WC_CONSUMER_KEY` + `WC_CONSUMER_SECRET`.

2. `src/lib/wordpress.ts`
   - A similar origin/Host-header strategy was implemented for WordPress REST during this session.

3. `src/app/shop/[slug]/page.tsx` / product renderer
   - `/shop/<slug>` route exists and reuses the existing product renderer.
   - Product-detail data fetching still contains direct WooCommerce upstream behavior that must be aligned with the final origin strategy.

4. Compatibility route
   - `src/app/wp-json/wc/v3/[...slug]/route.ts` was added during the session to preserve a WordPress-style WooCommerce REST path through the Next.js app.
   - Production verification did not prove the upstream WordPress response was JSON; the route remained blocked by origin behavior.

## Production / Runtime Findings

### Verified

- Vercel Production deployment for the latest proxy work was `dpl_J1fEfTtpsXSUT7MMAmRvoZHjmyDR`, commit `679dd44130446e6f5c237c14f5cd8cdb9a8436d5`, branch `main`, state READY.
- Vercel runtime errors showed `/api/products` reaching the serverless function and failing during WooCommerce upstream access with:
  - `403 Forbidden`
  - `500 Internal Server Error`
  - `SyntaxError: Unexpected token '<' ... is not valid JSON`
- The last error cluster therefore proved that an upstream request was returning HTML rather than the expected JSON.

### Browser / Hosting evidence

- `https://www.bukanbarukitchen.com/wp-json/` returned a server error page from the Vercel-served public domain.
- `https://www.bukanbarukitchen.com/wp-json/wc/v3/products` returned the Next.js homepage rather than WooCommerce JSON.
- `https://www.bukanbarukitchen.com/wp-login.php` returned the same Vercel/server-error behavior.
- `https://jkt10.dewaweb.com/` returned DewaWeb's default page, not BBKitchen WordPress.
- `https://103.185.53.66/` returned DewaWeb's default page, not BBKitchen WordPress.
- DewaWeb WP Toolkit showed the existing `www.bukanbarukitchen.com` WordPress installation with the legacy BBKitchen homepage, WordPress 7.1, PHP 8.3.33, and the existing `/home/bukanbar/public_html` installation path.
- WP Toolkit `Log In` returned a 403 from the WP Toolkit backend action; this was not proven to be a WordPress HTTP 403.
- cPanel Error logs viewed during the session showed unrelated errors for another domain on the account (`griyakitchen.com`); no BBKitchen-specific root-cause error was established from that page.

## Root Cause / Current Diagnosis

The strongest verified diagnosis is an **origin reachability / virtual-host separation problem** created when the public `bukanbarukitchen.com` / `www` hostname was moved to Vercel while WordPress remained on DewaWeb.

The DewaWeb server name `jkt10.dewaweb.com` and shared IP `103.185.53.66` are reachable but serve a default server page rather than the BBKitchen WordPress virtual host. Therefore they are not valid public WordPress API origins for the Next.js server by themselves.

The session did **not** prove the exact DewaWeb-side hostname/virtual-host entry that can safely serve the existing WordPress installation independently of the Vercel public domain.

## Architecture Decision / Locked Decision

Preferred target architecture:

```text
public user traffic
    ↓
www.bukanbarukitchen.com
    ↓
Vercel / Next.js
    ↓ server-side fetch only
origin.bukanbarukitchen.com
    ↓
existing WordPress + WooCommerce
    ↓
/home/bukanbar/public_html
```

Important constraints:

- `bukanbarukitchen.com` / `www.bukanbarukitchen.com` remain the public Next.js domain.
- `origin.bukanbarukitchen.com` should be an origin/backend hostname for the same existing WordPress installation, not a second WordPress installation.
- Existing API paths remain unchanged: `/wp-json/`, `/wp-json/wc/v3/`, and BBKitchen custom endpoints such as `/wp-json/bbk/v1/tambah-produk`.
- WordPress/WooCommerce stays the backend/admin source of truth; Next.js remains the public renderer.
- The AI Growth Automation workflow already calls WordPress through the `WOO_DOMAIN` script property and `/wp-json/bbk/v1/tambah-produk`; the origin design must preserve the same WordPress installation and API contract.
- The origin hostname should be treated as backend/API infrastructure and kept out of public SEO indexing through appropriate noindex/robots controls after origin reachability is established. These controls are SEO hygiene, not access control.

## Failed Approaches / Dead Ends

1. Using `www.bukanbarukitchen.com` itself as the upstream API target after moving the domain to Vercel.
   - Result: requests looped back into Vercel instead of reaching WordPress.

2. Using `jkt10.dewaweb.com` as the WooCommerce/WordPress public origin.
   - Result: DewaWeb default page, not BBKitchen WordPress virtual host.

3. Using the shared IP `103.185.53.66` directly as the origin.
   - Result: DewaWeb default page, not BBKitchen WordPress virtual host.

4. Adding a subdomain directly in cPanel.
   - Result: cPanel rejected the operation with XID `73u68z` because the domain's DNS is hosted outside the DewaWeb nameservers.

## DewaWeb Support Dependency

A support ticket was prepared/requested for DewaWeb to create/configure an origin hostname such as `origin.bukanbarukitchen.com` that maps to the existing `/home/bukanbar/public_html` WordPress installation without requiring the main public domain to leave Vercel.

Current blocker:
- **WAITING FOR DEWAWEB SUPPORT TICKET**

No DNS cutover, nameserver reversal, or origin hostname creation was verified as completed during this session.

## Verification Status

- Sitemap pattern inventory: VERIFIED.
- Public URL contract clarification: VERIFIED.
- Dynamic route pattern implementation: CODE EXISTS.
- Vercel Production deployment: VERIFIED READY for latest proxy commit.
- `/api/products` runtime execution: VERIFIED, but upstream response not healthy.
- WordPress public REST via main domain: FAILED / VERCEL-SERVED.
- WooCommerce public REST via main domain: FAILED / VERCEL-SERVED.
- WordPress direct DewaWeb server-name test: FAILED / DEFAULT SERVER PAGE.
- WordPress direct shared-IP test: FAILED / DEFAULT SERVER PAGE.
- Existing WordPress installation on DewaWeb: VERIFIED via WP Toolkit.
- Final origin hostname: BLOCKED / PENDING DewaWeb.
- Full sitemap URL crawl: NOT RUN.
- Desktop/mobile production UI verification: NOT COMPLETED in this session.

## Git Checkpoints

Latest code checkpoint created during this session:

- `679dd44130446e6f5c237c14f5cd8cdb9a8436d5` — `fix(proxy): preserve WooCommerce REST compatibility route`

The documentation closeout in this file is separate from the code checkpoint above.

## Technical Debt / Carried Forward

- DewaWeb origin hostname/configuration still unresolved.
- Product detail data fetching needs to align with the final origin API path.
- `/wp-json/wc/v3/*` compatibility route exists but needs end-to-end verification after the WordPress origin is reachable.
- WordPress origin SEO hygiene (`noindex`, `robots`) is still a future task, not verified.
- Full sitemap crawl and public route coverage audit remain pending.
- Previous B-6 DNS/upstream blocker remains active; this session refines it to **origin/virtual-host separation after the public domain moved to Vercel**.

## Handoff

### Current state

Next.js `main` is structurally ahead on sitemap-preserved routing, but production data/API integration is blocked by lack of a proven DewaWeb origin hostname for the existing WordPress installation.

### Top 3 next items

1. Wait for DewaWeb support response and obtain the exact origin hostname/configuration for `/home/bukanbar/public_html`.
2. Test `https://origin.bukanbarukitchen.com/wp-json/` and `/wp-json/wc/v3/products` directly before changing Vercel environment variables.
3. Once origin is verified, align all WordPress/WooCommerce server-side fetches in Next.js and run the sitemap-driven production verification.

### Things NOT to repeat

- Do not use `bukanbarukitchen.com` as the WordPress upstream while that domain points to Vercel.
- Do not use `jkt10.dewaweb.com` or `103.185.53.66` as assumed WordPress origins without virtual-host verification.
- Do not make further DNS/nameserver changes until the DewaWeb origin strategy is confirmed.

### Next conversation title

**Chat 2.1 — DewaWeb Origin Resolution & WordPress/WooCommerce Upstream**
