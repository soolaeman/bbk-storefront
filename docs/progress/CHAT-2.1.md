# BBKitchen Next.js Migration — Chat 2.1

## Date / Session Timeline

```text
Session: 2.1
Started: Tidak ditemukan di repository/evidence yang tersedia.
Ended: PENDING
Duration: PENDING
Evidence source: Session-start timestamp tidak terverifikasi di repository/evidence yang tersedia.
```

## Pareto Objective

**1 BIG GOAL:** Melanjutkan BBKitchen migration dari Chat 2.0 dengan menyelesaikan blocker origin DewaWeb secara evidence-first sebelum mengubah upstream Next.js/Vercel.

### Top priorities

1. Verifikasi apakah `origin.bukanbarukitchen.com` sudah dibuat/dapat diakses dan apakah benar menuju `/home/bukanbar/public_html`.
2. Uji WordPress REST, WooCommerce REST, dan BBK custom endpoints melalui origin sebelum mengubah `WOOCOMMERCE_API_URL` atau environment upstream lain.
3. Setelah origin terbukti sehat, baru selaraskan seluruh server-side fetch Next.js dan lakukan production verification berbasis sitemap.

## Starting State

- Branch/source of truth: `main`.
- Chat 2.0 ditutup pada 21 August 2026 10:29 WIB dengan blocker DewaWeb origin support.
- Public domain `www.bukanbarukitchen.com` tetap dimaksudkan sebagai public Next.js/Vercel renderer.
- WordPress/WooCommerce/ACF/Core System tetap menjadi backend/admin source of truth.
- Existing WordPress installation tetap berada di `/home/bukanbar/public_html` pada DewaWeb.
- `jkt10.dewaweb.com` dan `103.185.53.66` sebelumnya terbukti hanya default-server responses, bukan origin BBKitchen yang tervalidasi.
- Preferred backend/origin strategy: `origin.bukanbarukitchen.com`.

## Origin Correction + Verification — 21 August 2026

### Initial mismatch

DewaWeb first created `origin.bukanbarukitchen.com` with a separate/fresh WordPress state. User evidence showed generic **My WordPress Blog**, WooCommerce setup wizard, generic plugins, and no known BBKitchen product catalog.

### Self-service correction

cPanel Domain Manager showed the origin document root as `/home/bukanbar/origin.bukanbarukitchen.com` and exposed **New Document Root**.

User changed the document root to `public_html`. cPanel confirmed:

`Success: You have successfully updated the document root to “/home/bukanbar/public_html” for the “origin.bukanbarukitchen.com” domain.`

This means the origin hostname now points at the existing BBKitchen web root without moving or cloning files.

### REST verification after correction

User opened:

`https://origin.bukanbarukitchen.com/wp-json/`

The response is the existing BBKitchen WordPress REST index, including:

- `name`: `Sentra Jual Barang Bekas`
- `url`: `https://www.bukanbarukitchen.com`
- `home`: `https://www.bukanbarukitchen.com`
- existing WordPress REST namespaces including `wc/v3`
- existing BBK custom namespace `bbk/v1`
- existing site REST routes and configuration consistent with the BBKitchen backend.

This is strong direct browser evidence that the corrected origin now serves the **existing BBKitchen WordPress installation**, not the fresh WordPress instance.

User then opened:

`https://origin.bukanbarukitchen.com/wp-json/wc/v3/products`

Response:

`{"code":"woocommerce_rest_cannot_view","message":"Sorry, you cannot list resources.","data":{"status":401}}`

This is the expected authentication barrier for the WooCommerce REST products endpoint and confirms the request is reaching the existing WooCommerce REST layer.

## Current Architecture State

```text
www.bukanbarukitchen.com
        ↓
Vercel / Next.js public renderer

origin.bukanbarukitchen.com
        ↓
/home/bukanbar/public_html
        ↓
existing BBKitchen WordPress
        ↓
existing WooCommerce / ACF / BBK endpoints
```

No second WordPress source of truth is required.

## Decision

The origin/document-root blocker is now **RESOLVED**.

Do not use or configure the previously created fresh WordPress installation. It is now bypassed by the corrected document root.

Next blocker is authentication only: create a WooCommerce REST API key on the **existing BBKitchen WooCommerce installation** and test authenticated product access through `origin.bukanbarukitchen.com`.

## Verification Status

- Session bootstrap file created before application-code changes: ✅
- Historical session timestamp reconstructed from repository evidence: ❌ Tidak ditemukan.
- DewaWeb origin hostname exists: ✅
- Origin document root corrected to `/home/bukanbar/public_html`: ✅ cPanel confirmation
- Origin serves existing BBKitchen WordPress: ✅ Direct REST browser evidence
- Existing BBK custom REST namespace visible: ✅ `bbk/v1`
- Existing WooCommerce namespace visible: ✅ `wc/v3`
- WooCommerce products endpoint reachable: ✅
- WooCommerce products endpoint authenticated: ❌ 401 — expected until API credentials are supplied
- WooCommerce credentials generated: ⏳ Next step
- Vercel `WOOCOMMERCE_API_URL` changed: ❌ Intentionally not yet
- Application runtime/build verification: ⏳ Pending authenticated origin test

## Current Work

**NEXT:** Generate a WooCommerce REST API key from the existing BBKitchen WooCommerce admin and perform an authenticated request against `origin.bukanbarukitchen.com/wp-json/wc/v3/products`.

Do not share the Consumer Secret in chat. It should be stored directly in the appropriate server-side secret/environment configuration.

## Git Checkpoint

- Session bootstrap commit: `ef457782fac365da4c44c22b7a866ac9b5544f94`
- Origin mismatch documentation commit: `2efacfb516206d3b0e7df2210b42e6f2bd1b5893`
- Confirmed separate-installation documentation commit: `b7eb55faae0e1cd7f23700e2639b354571dfbc6c`
- Corrected origin verification documentation commit: PENDING

## Handoff / Next Step

1. Open the **existing BBKitchen** WordPress admin via the corrected origin.
2. Go to WooCommerce → Settings → Advanced → REST API.
3. Create a key with the minimum required permission for server-side catalog reads (typically Read).
4. Keep Consumer Key and Consumer Secret private.
5. Use the credentials to test `/wp-json/wc/v3/products` through the corrected origin.
6. After authenticated REST succeeds, update Vercel `WOOCOMMERCE_API_URL` to `https://origin.bukanbarukitchen.com` and configure the server-side credentials.
7. Run production sitemap-driven verification.
