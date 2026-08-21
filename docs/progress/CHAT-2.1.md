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

## Verified Context Before Implementation

- `docs/progress/README.md` menunjukkan sesi terakhir adalah Chat 2.0 dan fokus berikutnya adalah DewaWeb origin resolution.
- `docs/progress/CHAT-2.0.md` menyatakan root cause terkuat adalah origin/virtual-host separation setelah public domain pindah ke Vercel.
- Root `README.md` mengulang tiga Pareto priorities: origin resolution, origin API verification, lalu Next.js upstream alignment.
- `NAVIGATOR.md` menegaskan dokumentasi current-state ada di root README dan forensic history ada di `docs/progress/`.

## New Origin Evidence — 21 August 2026

DewaWeb support reported that `origin.bukanbarukitchen.com` had been added and that WordPress REST API plus WooCommerce REST API were reachable. They reported `/wp-json/wc/v3/products` returning `401 Unauthorized`, which is consistent with an active endpoint requiring WooCommerce API authentication.

However, browser evidence from the newly accessible origin shows:

- URL: `origin.bukanbarukitchen.com/wp-admin/admin.php?page=wc-admin&path=/setup-wizard`
- Page title/content: **Welcome to Woo!** / WooCommerce setup wizard.
- The page presents **Set up my store**, indicating a WooCommerce setup state rather than the known BBKitchen production/admin state.
- This is a strong warning that the origin may be mapped to a fresh/different WordPress installation or a different WordPress database/document root.

This evidence does **not yet prove** that a second WordPress installation was created. It does prove that the origin is not yet verified as the existing BBKitchen WordPress installation at `/home/bukanbar/public_html`.

### Decision

Do **not** generate WooCommerce Consumer Key/Secret on the setup-wizard installation yet. Do **not** change Vercel production upstream environment variables yet.

Before credentials are generated, verify:

1. `origin.bukanbarukitchen.com` document root / virtual host mapping.
2. Whether it points to `/home/bukanbar/public_html`.
3. Whether the origin is using the existing BBKitchen WordPress database.
4. Whether existing BBKitchen products, pages, plugins, ACF data, users, and configuration are present.

## Verification Status

- Session bootstrap file created before application-code changes: ✅
- Historical session timestamp reconstructed from repository evidence: ❌ Tidak ditemukan.
- DewaWeb says origin hostname exists: ✅ Support-reported.
- WordPress REST reachable: ✅ Support-reported.
- WooCommerce REST endpoint reachable: ✅ Support-reported.
- `/wp-json/wc/v3/products` returns 401: ✅ Support-reported.
- Origin browser reaches WordPress/WooCommerce: ✅ User screenshot.
- Origin proven to be existing BBKitchen installation: ❌ Not yet verified.
- Origin proven to map to `/home/bukanbar/public_html`: ❌ Not yet verified.
- WooCommerce credentials generated: ⏳ Intentionally deferred.
- Application runtime/build verification: ⏳ Pending.

## Current Work

**BLOCKER:** Determine whether `origin.bukanbarukitchen.com` is attached to the existing BBKitchen WordPress installation or a different/fresh WordPress state.

### Safe inspection sequence

1. Do not click **Set up my store** or complete the WooCommerce wizard.
2. Exit/back out of the setup wizard without creating store data.
3. Inspect WordPress **Settings → General** and record only non-secret values: WordPress Address (URL), Site Address (URL).
4. Inspect **Plugins** and confirm BBKitchen-specific plugins, ACF, WooCommerce, and existing integrations are present.
5. Inspect **Products** and confirm the known BBKitchen catalog exists.
6. Compare the WordPress admin/site identity with the existing BBKitchen installation.
7. Ask DewaWeb to confirm the origin virtual host/document root and database mapping if any mismatch remains.

## Git Checkpoint

- Session bootstrap commit: `ef457782fac365da4c44c22b7a866ac9b5544f94`
- Origin mismatch evidence documentation commit: PENDING

## Handoff / Next Step

1. Verify the origin's WordPress identity without modifying the setup wizard.
2. Obtain DewaWeb confirmation of document root/virtual-host mapping to `/home/bukanbar/public_html`.
3. Only after the existing BBKitchen installation is proven, generate/use WooCommerce API credentials.
4. Test authenticated WooCommerce REST directly against the verified origin.
5. Only then align Next.js/Vercel upstream configuration.
