# BBKitchen Frontend — Next.js Migration

Branch aktif: `feature/nextjs-migration`

> **README = kondisi project sekarang.** Detail history ada di [`docs/progress/`](docs/progress/README.md).

[🧭 NAVIGATOR](NAVIGATOR.md)

---

# 🏁 CURRENT CHECKPOINT

```text
Chat 1.1 → ✅ Archived
Chat 1.2 → ✅ Archived
Chat 1.3 → ✅ Archived
Chat 1.4 → ✅ Closed
Chat 1.5 → 🚀 Next
```

## Last code checkpoint

```text
26f3911f0d60c595656e85f1e9b65087bab86132
feat: add video covers to social media cards
```

GitHub date: **15 August 2026 21:24:06 UTC**.

## Last documentation checkpoint

```text
0d65a185f085251b2d88bdc12ca4bfd8baca2a4c
create canonical START-SESSION-PROMPT.md
```

> Documentation-only commits may advance the branch without changing the application-code checkpoint above.

---

# 🎯 CURRENT PRIORITIES — PARETO

1. **Mobile/responsive QA** across homepage, catalog, product detail, and local pages.
2. **Shared Header** — search typing, sticky behavior, and visual parity.
3. **Product Detail** — match shared homepage/Header design system.
4. **Local/article pages** — editorial typography and presentation.
5. **ACF/Core System + production hardening**.

Next layer:

- Related Products.
- Authoritative ACF filtering.
- SOLD → Google Sheets workflow.
- SEO/performance/accessibility verification.

---

# 📊 CURRENT STATE

| Area | Status | Note |
|---|---|---|
| WooCommerce data architecture | ✅ | Live source-of-truth baseline |
| Catalog / pagination | ✅ | Server-side, 8/page baseline |
| Product Detail | ✅ | Functional; visual parity remains |
| Local hierarchical routing | ✅ | `[...slug]` verified in Chat 1.3 |
| Homepage sales positioning | ✅ | Sales-first direction locked |
| WhatsApp contracts | ✅ | Product / MBG / Produksi Baru normalized |
| READY / SOLD behavior | ✅ | SOLD remains discoverable |
| Hero desktop/mobile assets | ✅ | Dedicated backgrounds present |
| Social video covers | ✅ | Cover-first approach implemented |
| Shared Header | ⚠️ | Search typing, sticky, parity remain |
| Article typography | ⚠️ | Editorial parity remains |
| Mobile QA | ⚠️ | Final cross-template verification remains |
| Universal floating mascot | 🔒 | Rejected; do not reintroduce |
| ACF/Core System | ⏳ | Future/hardening phase |

---

# 🧭 ARCHITECTURE BASELINE

```text
WordPress / WooCommerce
        ↓
BBK Core System
        ↓
Next.js Data Layer
        ↓
Home / Catalog / Product / Pages
        ↓
Shared Design System
        ↓
Desktop + Mobile UX
```

- **WooCommerce:** products, prices, stock, categories, images, slug, descriptions.
- **WordPress/ACF:** inventory metadata such as `kode_unit`, `status_unit`, `kondisi_unit`, `lokasi_unit`, `link_telegram`.
- **Core System:** inventory/business logic + integrations.
- **Next.js:** presentation, routing, rendering, SEO presentation, catalog/conversion UX.
- **Google Sheets:** backend/Core System concern; never expose credentials in client.

### Locked principles

- Next.js is the experience layer, not the inventory source of truth.
- Catalog pagination is server-side.
- Product route: `/product/[slug]`.
- Local route: `/jual-barang-bekas-restoran/[...slug]`.
- Existing SEO URL/slug intent must be preserved.
- Inventory business logic does not belong in presentation components.
- SOLD Product Cards remain discoverable.
- Homepage positioning is primarily sales.
- Universal floating mascot composition is rejected.

---

# 💬 LOCKED UX CONTRACTS

### Dapur MBG

```text
Halo Tim BBKitchen, saya ingin bertanya perihal info kebutuhan peralatan dapur MBG dari BBKitchen.
```

Relevant Header/Hero/Service/Footer CTA direction: **direct WhatsApp**. Service may additionally expose the PDF catalog CTA.

### Produksi Baru

```text
Halo BBKitchen, mohon info peralatan dapur/restoran custom atau produksi baru
```

Direct WhatsApp.

### Product WhatsApp

```text
Halo Tim BBKitchen, saya tertarik dan ingin menanyakan penawaran harga dan ketersediaan untuk unit:

Nama Unit: {NAMA UNIT}

SKU/ID: {SKU}

Lokasi Unit: {LOKASI}

Kondisi: {BARU|BEKAS}

Apakah unit ini masih tersedia? Mohon info harga penawaran dan spesifikasi detailnya. Terima kasih.
```

### READY / SOLD

```text
READY → Tanya WA
SOLD  → Tanya Lainnya
```

### Hero

```text
Cari, Jual, atau Produksi Peralatan Dapur Resto & Dapur MBG

Siap Kirim
Seluruh Indonesia

Lihat Unit yang Tersedia →
```

The availability CTA scrolls toward the catalog.

### Social Video

```text
public/images/social/youtube-shorts-cover.webp
public/images/social/tiktok-cover.webp
```

Cover first → play overlay → iframe after click.

---

# ⚠️ MASTER BOTTLENECK SNAPSHOT

| ID | Chat | Problem | Status |
|---|---|---|---|
| B-1 | 1.1 | WooCommerce 401/auth | Closed |
| B-2 | 1.1 | Catalog volume/pagination | Closed |
| B-3 | 1.1 | ACF REST limitation | Carried |
| B-4 | 1.1 | Mock catalog | Closed |
| B-5 | 1.2 | Metadata/taxonomy contract | Closed |
| B-6 | 1.2 | Upstream 502/reset | Carried |
| B-7 | 1.2 | SEO preservation | Locked |
| B-8 | 1.3 | Single location route | Closed |
| B-9 | 1.3 | Relative import after route refactor | Closed |
| B-10 | 1.3 | Stale `.next` artifacts | Closed |
| B-11 | 1.3 | Server/Client Header boundary | Closed |
| B-12 | 1.3 | Article typography | Carried |
| B-13 | 1.3 | Search interaction | Carried |
| B-14 | 1.3 | Product Detail Header parity | Carried |
| B-15 | 1.4 | Floating mascot composition | Closed / Do not repeat |
| B-16 | 1.4 | Empty social cards | Closed |
| B-17 | 1.4 | Duplicate WA wording | Closed |

Full details: [`docs/progress/README.md`](docs/progress/README.md).

---

# 🚫 DO NOT REPEAT

- Mock catalog as source of truth.
- Frontend-only inventory/category truth.
- Single `[location]` route for hierarchical WordPress URLs.
- Treating stale `.next` artifacts as source architecture failure.
- Treating `next build` success as proof upstream runtime is healthy.
- Importing interactive Client Components as pure Server Components.
- Universal floating mascot layers.
- Mass-changing existing SEO slugs.
- Exposing WooCommerce/Google credentials to client code.
- Calling documentation-only commits application-code checkpoints.

---

# 🧱 TECHNICAL DEBT

- Article/local landing editorial typography.
- Header search interaction + sticky behavior.
- Product Detail shared Header parity.
- Related Products.
- Authoritative ACF filtering.
- Admin/Core System workflow.
- SOLD → Google Sheets.
- Mobile QA across templates.
- Production performance/accessibility hardening.

---

# 🧪 VERIFICATION RULE

```text
implemented
  ↓
localhost/runtime verified
  ↓
desktop verified
  ↓
mobile verified
  ↓
no obvious regression
  ↓
build verified
  ↓
commit
```

Always distinguish:

```text
build verified
runtime verified
upstream verified
UI verified
desktop verified
mobile verified
```

For Chat 1.4 specifically, **no final post-change build/runtime verification evidence was found in the available conversation**. The last verified application-code checkpoint is `26f3911f...`.

Known non-blocking environment warning carried from earlier sessions:

```text
Next.js ignored package-lock.json in C:\Users\Lenovo
because it is outside the Git repository.
```

---

# 🔍 SEO BASELINE

GSC snapshot supplied for 15 August 2026:

```text
16 months
Clicks        ~1.01K
Impressions   ~28.1K
CTR           3.6%
Avg position  9.5
Indexed       ~2.29K
Not indexed   ~413
```

Preserve URL, slug, search intent, canonical/schema/internal linking. Never mass-redirect or mass-noindex without mapping/audit.

---

# 📦 IMPORTANT FILES / ASSETS

```text
public/images/hero/bbkitchen-hero-desktop.webp
public/images/hero/bbkitchen-hero-mobile.webp
public/images/people/bbkitchen-team-thumbs-up.webp
public/images/people/bbkitchen-chef-presenting.webp
public/images/people/bbkitchen-chef-pointing.webp
public/images/people/bbkitchen-chef-trust.webp
public/images/social/youtube-shorts-cover.webp
public/images/social/tiktok-cover.webp

src/components/Header.tsx
src/components/Footer.tsx
src/components/ProductCard.tsx
src/components/SocialMediaSection.tsx
src/components/KitchenConsultationBanner.tsx
src/components/HeroSection.tsx
src/components/CategoryFilter.tsx
src/app/page.tsx
src/app/catalog/page.tsx
src/app/product/[slug]/page.tsx
src/app/jual-barang-bekas-restoran/[...slug]/page.tsx
src/app/api/products/route.ts
src/data/products.ts
src/lib/wordpress.ts
src/lib/woocommerce.ts
```

For copy-location help: [`docs/guides/README.md`](docs/guides/README.md).

---

# 📚 DOCUMENTATION MAP

Use [`NAVIGATOR.md`](NAVIGATOR.md) to jump to any documentation area.

```text
NAVIGATOR.md
├── README.md       → project sekarang ada di mana
├── docs/progress/  → apa yang terjadi di setiap Chat
├── docs/guides/    → kalau mau mengubah/memahami sesuatu
└── docs/prompts/   → workflow AI
```

### Session workflow

- [`docs/prompts/START-SESSION-PROMPT.md`](docs/prompts/START-SESSION-PROMPT.md) → canonical orientation prompt untuk membuka session baru.
- [`docs/prompts/END-SESSION-PROMPT.md`](docs/prompts/END-SESSION-PROMPT.md) → canonical forensic close/handoff prompt untuk menutup session.
- [`docs/prompts/UPDATE-DOCUMENTATION-PROMPT.md`](docs/prompts/UPDATE-DOCUMENTATION-PROMPT.md) → documentation-only synchronization workflow.

### Root shortcut

[`end-session-prompt.md`](end-session-prompt.md) → shortcut ke canonical [`docs/prompts/END-SESSION-PROMPT.md`](docs/prompts/END-SESSION-PROMPT.md).

---

# 🚀 CHAT 1.5 HANDOFF

Start title:

```text
1.5 BBKitchen Next.js Migration
```

First actions:

1. Read this README.
2. Use [`NAVIGATOR.md`](NAVIGATOR.md) to jump to supporting documentation.
3. Use [`docs/prompts/START-SESSION-PROMPT.md`](docs/prompts/START-SESSION-PROMPT.md) for formal session orientation.
4. Audit current branch/code before changing anything.
5. Verify build/runtime state before assuming anything is broken.
6. Follow the Pareto priorities above.
7. Prefer `1 step = 1 file = 1 verified commit`.
8. At session close, use [`docs/prompts/END-SESSION-PROMPT.md`](docs/prompts/END-SESSION-PROMPT.md).

### Do not repeat

- Do not return to mock catalog.
- Do not invent frontend-only inventory truth.
- Do not mass-change SEO slugs.
- Do not reintroduce universal floating mascot layers.
- Do not claim verification without evidence.

---

# 📜 MIGRATION HISTORY

Use [`NAVIGATOR.md`](NAVIGATOR.md) or [`docs/progress/README.md`](docs/progress/README.md).

```text
Chat 1.1 → foundation
Chat 1.2 → live catalog / API / SEO
Chat 1.3 → routing / integration / visual convergence
Chat 1.4 → sales-first homepage / CTA / visual assets
Chat 1.5 → responsive / parity / hardening
```

---

# FINAL CHECKPOINT

```text
Chat 1.1 → forensic archived
Chat 1.2 → forensic archived
Chat 1.3 → forensic archived
Chat 1.4 → ✅ Closed
Chat 1.5 → 🚀 Next

Branch: feature/nextjs-migration
Last code checkpoint: 26f3911f0d60c595656e85f1e9b65087bab86132
Last documentation checkpoint before current sync: 0d65a185f085251b2d88bdc12ca4bfd8baca2a4c
```
