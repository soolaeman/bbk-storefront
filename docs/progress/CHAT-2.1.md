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

### Browser evidence confirms wrong/separate WordPress state

User inspected `origin.bukanbarukitchen.com` directly and provided screenshots from the WordPress admin.

Evidence:

- WooCommerce admin opens the **Welcome to Woo! / Setup Wizard** with `Set up my store`.
- WordPress **Settings → General** shows:
  - WordPress Address: `https://origin.bukanbarukitchen.com`
  - Site Address: `https://origin.bukanbarukitchen.com`
  - Administration email: `admin@origin.bukanbarukitchen.com`
- User additionally verified that the homepage/site identity is the generic **My WordPress Blog**, not BBKitchen.
- User verified the Plugins area does not represent the known BBKitchen plugin stack.
- User verified the WooCommerce Products area is only the generic WooCommerce product list, not the known BBKitchen catalog.

### Conclusion

The evidence now establishes that `origin.bukanbarukitchen.com` is serving a **separate/fresh WordPress installation/state**, not the existing BBKitchen WordPress installation at `/home/bukanbar/public_html`.

This is no longer merely an unverified warning. The origin's WordPress identity, site address, generic blog state, setup wizard state, and lack of the existing BBKitchen catalog/plugin state demonstrate that it is the wrong backend target for the migration.

### Decision — LOCKED

Do **not**:

- generate WooCommerce Consumer Key/Secret on this origin installation;
- run the WooCommerce setup wizard;
- create or migrate BBKitchen data into this fresh installation;
- change Vercel production upstream environment variables to this origin;
- create a second WordPress source of truth.

The intended architecture remains the existing BBKitchen WordPress installation at `/home/bukanbar/public_html`, exposed through a separate origin hostname without creating a second WordPress installation.

## Required DewaWeb Correction

DewaWeb needs to correct the origin virtual-host/document-root/database mapping so that:

```text
origin.bukanbarukitchen.com
        ↓
existing BBKitchen WordPress
        ↓
/home/bukanbar/public_html
        ↓
existing BBKitchen database
        ↓
existing WooCommerce / ACF / plugins / products
```

The support response should explicitly be asked to **not install or provision a new WordPress instance**. The required action is to attach the origin hostname to the existing BBKitchen installation.

### Evidence to request from DewaWeb

1. Exact document root configured for `origin.bukanbarukitchen.com`.
2. Confirmation that the origin points to `/home/bukanbar/public_html`.
3. Confirmation that the origin uses the existing BBKitchen WordPress database, not a newly provisioned database.
4. Confirmation that no second WordPress installation was created for the origin.

## Verification Status

- Session bootstrap file created before application-code changes: ✅
- Historical session timestamp reconstructed from repository evidence: ❌ Tidak ditemukan.
- DewaWeb says origin hostname exists: ✅ Support-reported.
- WordPress REST reachable: ✅ Support-reported.
- WooCommerce REST endpoint reachable: ✅ Support-reported.
- `/wp-json/wc/v3/products` returns 401: ✅ Support-reported.
- Origin browser reaches WordPress/WooCommerce: ✅ User-verified.
- Origin identity matches BBKitchen: ❌ **Verified mismatch — separate/fresh WordPress.**
- Origin proven to map to `/home/bukanbar/public_html`: ❌ **No; current evidence indicates otherwise.**
- WooCommerce credentials generated: ⏳ Intentionally deferred.
- Application runtime/build verification: ⏳ Pending origin correction.

## Current Work

**BLOCKER:** DewaWeb must correct `origin.bukanbarukitchen.com` to serve the existing BBKitchen WordPress installation rather than the fresh WordPress state currently attached to the hostname.

No application-code changes are justified until this backend mapping is corrected.

## Git Checkpoint

- Session bootstrap commit: `ef457782fac365da4c44c22b7a866ac9b5544f94`
- Origin mismatch evidence documentation commit: `2efacfb516206d3b0e7df2210b42e6f2bd1b5893`
- Confirmed separate-installation documentation commit: PENDING

## Handoff / Next Step

1. Send DewaWeb the confirmed evidence that the new origin serves a fresh/generic WordPress installation.
2. Request correction of the virtual-host/document-root/database mapping to the existing `/home/bukanbar/public_html` BBKitchen installation.
3. Re-test origin identity after DewaWeb correction.
4. Only after BBKitchen data/plugins/products are visible, generate/use WooCommerce API credentials.
5. Test authenticated WooCommerce REST directly against the corrected origin.
6. Only then align Next.js/Vercel upstream configuration.
