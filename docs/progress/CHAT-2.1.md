# BBKitchen Next.js Migration — Chat 2.1

## Date / Session Timeline

```text
Session: 2.1
Date: 21 August 2026
Started: 21 August 2026 13:25 WIB
Ended: 21 August 2026 18:19 WIB
Duration: 4h 54m
Evidence source: Start timestamp supplied by user; End timestamp from the conversation/current-session clock evidence.
```

## Scope

**1 BIG GOAL:** Resolve and verify the WordPress origin separation for the existing BBKitchen installation, then determine the remaining WooCommerce REST authentication blocker without repeating unnecessary DNS/database changes.

## Starting State

- Branch/source of truth: `main`.
- Chat 2.0 had closed with the origin strategy blocked on DewaWeb support.
- Public domain `www.bukanbarukitchen.com` is the Next.js/Vercel public renderer.
- Existing WordPress/WooCommerce installation remains at `/home/bukanbar/public_html`.
- Preferred backend/origin hostname: `origin.bukanbarukitchen.com`.
- A fresh WordPress state had initially been visible at the new origin hostname and was determined to be the wrong installation.

## Top 20% Changes

1. **Origin document root was corrected** from the fresh origin directory to the existing `/home/bukanbar/public_html` installation. cPanel confirmed the document root update.
2. **Existing BBKitchen WordPress was re-verified through the origin** using `https://origin.bukanbarukitchen.com/wp-json/`; the response exposed the existing BBKitchen site identity, `wc/v3`, and `bbk/v1` namespaces.
3. **Public catalog routing was repaired**: `/katalog` was restored to the actual catalog implementation after a redirect loop had been introduced. The public `/katalog` route is now user-verified as accessible.
4. **WooCommerce REST credentials were regenerated** on the existing BBKitchen WooCommerce installation for user `admbbk` with `Read` permission, and the new credentials were placed in Vercel environment variables.

## File / Route / API History

### Code changes performed in this session

- `src/app/catalog/page.tsx`
  - Restored the catalog page implementation instead of a self-redirect that caused `/katalog` → `/katalog` recursion.
  - Commit created during the session: `a512d1c9175c5ed8be6a0312e4357df6cd8f889b`.
- `src/app/api/products/route.ts`
  - Updated the server-side WooCommerce proxy to use WooCommerce query-string authentication (`consumer_key` + `consumer_secret`) rather than relying on an Authorization header that may be stripped by the upstream hosting layer.
  - Commit created during the session: `39c691fcba3bdcb5093c799daa3303fdf6e1ac6f`.

### Repository audit findings carried forward

- `src/app/wp-json/wc/v3/[...slug]/route.ts` still uses Basic Authorization and is not yet aligned with the `/api/products` query-auth strategy.
- `src/app/product/[slug]/page.tsx` still performs direct WooCommerce server-side requests with Basic Authorization instead of using one consistent proxy path.
- `src/lib/woocommerce.ts` routes catalog browser requests through `/api/products`, which is the intended server-side credential boundary.
- `src/lib/wordpress.ts` uses the origin + `rest_route` pattern for WordPress REST fetches.
- `src/app/katalog/page.tsx` remains a thin re-export of `../catalog/page`, which is now working because the actual implementation has been restored.

## Data / Architecture Contracts

```text
PUBLIC
www.bukanbarukitchen.com
        ↓
Vercel / Next.js
        ↓ server-side API fetch
ORIGIN
origin.bukanbarukitchen.com
        ↓
/home/bukanbar/public_html
        ↓
existing WordPress + WooCommerce + ACF + BBK APIs
```

Locked facts:

- `origin.bukanbarukitchen.com` is the backend/origin hostname, not a second WordPress source of truth.
- WordPress/WooCommerce/ACF remains the backend/admin source of truth.
- Next.js remains the public renderer.
- Public catalog route remains `/katalog`.
- Product public route remains `/shop/[slug]` per the sitemap contract.
- Existing REST contracts remain `/wp-json/`, `/wp-json/wc/v3/`, and `/wp-json/bbk/v1/*`.

## Bottlenecks / Symptoms / Root Cause / Resolution

### Origin separation — RESOLVED ✅

**Symptom:** `origin.bukanbarukitchen.com` initially showed a fresh/generic WordPress installation rather than BBKitchen.

**Root cause:** The origin hostname initially pointed to `/home/bukanbar/origin.bukanbarukitchen.com` rather than the existing BBKitchen web root.

**Resolution:** cPanel document root was changed to `/home/bukanbar/public_html` and confirmed successful. Direct REST evidence then showed the existing BBKitchen WordPress installation through the origin.

**Lesson:** Do not clone/migrate the WordPress installation just to create an origin hostname; point the origin hostname to the existing web root.

### `/katalog` redirect loop — RESOLVED ✅

**Symptom:** Browser returned `ERR_TOO_MANY_REDIRECTS` for `/katalog`.

**Root cause:** `src/app/catalog/page.tsx` redirected to `/katalog`, while `src/app/katalog/page.tsx` re-exported that page, creating recursion.

**Resolution:** Restored the full catalog page implementation in `src/app/catalog/page.tsx`.

### WooCommerce REST authentication — BLOCKED ❌

**Symptom:** Both unauthenticated and authenticated product-listing attempts returned:

```json
{"code":"woocommerce_rest_cannot_view","message":"Sorry, you cannot list resources.","data":{"status":401}}
```

**Verified facts:**

- `/wp-json/` through origin works.
- `wc/v3` namespace is present.
- `/wp-json/wc/v3/products` is reachable.
- WordPress user `admbbk` is an Administrator.
- WooCommerce REST key was created on the existing BBKitchen installation with `Read` permission.
- New Consumer Key/Secret were placed in Vercel and a redeployment was created.
- Direct authenticated product-listing through the origin with the new credentials still returned 401.

**Current root cause:** Not yet conclusively identified. Evidence now points to the WooCommerce REST authentication path at the WordPress/WooCommerce/server layer rather than the domain/origin routing itself. Do not claim a final root cause until a successful/failed authenticated direct-origin test is further isolated.

## Failed Approaches / Dead Ends

1. Treating the initial fresh WordPress state at `origin.bukanbarukitchen.com` as a new backend installation. Rejected; the correct solution was to point the origin document root at the existing BBKitchen installation.
2. Changing the WordPress table prefix case as a presumed database fix. This caused a temporary WordPress admin access problem and was reverted. Do not repeat.
3. Repeatedly editing WooCommerce database tables while the actual remaining blocker is REST authentication. Stop database changes unless new evidence requires them.
4. Repeatedly generating credentials without first isolating the direct-origin authentication behavior. One new key was generated this session; further key generation is deferred.
5. Treating the `/wp-json/wc/v3/products` 401 response without credentials as proof that the endpoint itself is broken. The endpoint is reachable; 401 is an authentication response.

## Status Classification

| Area | Status | Verification |
|---|---|---|
| Origin hostname exists | DONE / VERIFIED | Browser/cPanel evidence |
| Origin points to existing BBKitchen `/home/bukanbar/public_html` | DONE / VERIFIED | cPanel confirmation + REST identity |
| WordPress REST `/wp-json/` | DONE / VERIFIED | Direct browser test |
| WooCommerce namespace `wc/v3` | DONE / VERIFIED | Direct browser test |
| Existing BBK custom namespace `bbk/v1` | DONE / VERIFIED | Direct browser test |
| `/katalog` route | DONE / VERIFIED | User opened production route successfully |
| Catalog implementation | DONE / CODE ONLY | Code restored; production data still blocked by WooCommerce auth |
| `/api/products` query-auth proxy | DONE / CODE ONLY | Code present in `main`; production endpoint still returns 401 |
| WooCommerce REST authenticated listing | BLOCKED | Direct authenticated origin request still 401 |
| Vercel catalog data loading | BLOCKED | Depends on authenticated WooCommerce REST |
| Full production catalog verification | BLOCKED | Upstream auth unresolved |
| Guides | NO CHANGE | Current guide architecture note remains relevant to this session; no copy-editing guide became stale based on repository audit |
| Prompts | NO CHANGE | Canonical end-session and start-session prompts remain structurally valid |

## Verification Layers

- **Code:** ✅ changes were made in `main`.
- **Build:** ⏳ not independently verified in this session after the final code/documentation writes.
- **Localhost runtime:** Tidak ditemukan di conversation.
- **Upstream origin:** ✅ WordPress REST reachable; WooCommerce authenticated listing remains blocked.
- **Desktop UI:** ✅ `/katalog` user-verified as accessible.
- **Mobile UI:** Tidak ditemukan di conversation/evidence for this session.
- **Production WooCommerce data:** ❌ blocked by 401 authentication.

## Top 20% Bottlenecks

1. WooCommerce REST authentication at the origin remains unresolved.
2. Server-side WooCommerce authentication strategy is inconsistent across `/api/products`, the compatibility route, and product-detail fetching.
3. Production catalog cannot be fully verified until authenticated WooCommerce product listing succeeds.

## Top 20% Decisions

1. **Keep `origin.bukanbarukitchen.com` as the backend/origin hostname mapped to `/home/bukanbar/public_html`.**
2. **Do not create a second WordPress installation or change database/table prefixes again.**
3. **Treat WooCommerce REST authentication as the next Pareto blocker before further frontend work.**

## Technical Debt

- Align all server-side WooCommerce consumers to one authenticated proxy mechanism.
- Audit/fix `src/app/wp-json/wc/v3/[...slug]/route.ts` Basic Auth path.
- Audit/fix direct WooCommerce fetches in `src/app/product/[slug]/page.tsx`.
- Complete production catalog, metadata/filter, and product-detail verification after auth is fixed.
- Preserve and later audit origin noindex/robots SEO hygiene.
- Existing unrelated carried bottlenecks B-3, B-12, B-13, B-14, B-15, B-16, B-17 remain deferred.

## Git Checkpoints

```text
Origin/documentation bootstrap history:
ef457782fac365da4c44c22b7a866ac9b5544f94
2efacfb516206d3b0e7df2210b42e6f2bd1b5893
b7eb55faae0e1cd7f23700e2639b354571dfbc6c

Session code commits:
a512d1c9175c5ed8be6a0312e4357df6cd8f889b  restore catalog implementation
39c691fcba3bdcb5093c799daa3303fdf6e1ac6f  query-auth WooCommerce proxy
```

## Handoff

### Current state

Origin/backend separation is successfully established. The public domain is on Vercel/Next.js and the existing WordPress/WooCommerce installation is served through `origin.bukanbarukitchen.com`. `/katalog` is reachable, but dynamic product listing is blocked by WooCommerce REST authentication.

### Next priority order

1. Isolate the direct-origin WooCommerce authentication failure with the existing/new key without changing database, URL architecture, or creating more users/keys.
2. Once authenticated product listing succeeds, verify `/api/products`, catalog metadata, filters, and `/shop/[slug]` product detail.
3. Align remaining WooCommerce server-side fetch routes to the proven authentication mechanism, then run sitemap-driven production verification.

### Things NOT to repeat

- Do not repoint the main public domain away from Vercel.
- Do not clone the existing WordPress installation into a second backend.
- Do not change WordPress table-prefix case.
- Do not keep regenerating WooCommerce keys without a new piece of evidence.
- Do not make additional database changes for the current REST authentication problem.

### Next conversation title

**Chat 2.2 — WooCommerce REST Authentication Isolation & Production Catalog Verification**
