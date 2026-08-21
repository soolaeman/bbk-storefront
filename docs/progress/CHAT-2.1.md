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

## Current Work

PENDING — belum ada perubahan application code pada bootstrap session ini.

## Verification

- Session bootstrap file created before application-code changes: ✅
- Historical session timestamp reconstructed from repository evidence: ❌ Tidak ditemukan.
- Application runtime/build verification: ⏳ Pending.
- DewaWeb origin verification: ⏳ Pending.

## Git Checkpoint

- Bootstrap documentation commit: PENDING

## Handoff / Next Step

1. Inspect/verify current GitHub main state and whether any origin-related documentation or code changed since Chat 2.0.
2. Verify the DewaWeb support/origin state using available project evidence.
3. Do not alter Vercel upstream environment variables until origin reachability is proven.
