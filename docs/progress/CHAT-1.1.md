# Chat 1.1 — Foundation / WooCommerce Migration

> Forensic progress archive. This file preserves engineering history; missing facts are explicitly marked.

## Date

Exact start/end date: **Tidak ditemukan di conversation.**

## Pareto — Top 20% Changes

1. Established the Next.js migration foundation and source-of-truth boundary.
2. Replaced the mock catalog direction with live WooCommerce data.
3. Established server-side proxying and pagination instead of loading the whole catalog in the browser.
4. Defined the WordPress/ACF inventory boundary for fields such as `kode_unit`, `status_unit`, `kondisi_unit`, and `lokasi_unit`.
5. Preserved the principle that inventory/business logic does not belong in presentation components.

## Bottlenecks

- **WooCommerce 401:** authentication/configuration path. Credentials and authenticated requests stayed server-side.
- **Catalog volume:** browser-side giant datasets were rejected; server pagination became the baseline.
- **ACF REST limitation:** `BBK INVENTORY` uses `show_in_rest: 0`; native REST filtering could not be assumed.
- **Mock catalog:** retired as source of truth.

## Architecture Decisions

```text
WordPress / WooCommerce
        ↓
Next.js server proxy
        ↓
Next.js UI
```

- WooCommerce remains authoritative for product/catalog data.
- WordPress/ACF remains the inventory metadata boundary.
- Frontend must not invent inventory truth.

## Verification

Build/runtime evidence and exact final SHA: **Tidak ditemukan di conversation.**

## Handoff

Chat 1.2 continued from this foundation into API contracts, metadata, catalog, product detail, and SEO preservation.
