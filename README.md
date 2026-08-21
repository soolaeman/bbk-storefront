# BBKitchen Frontend — Next.js Migration

Branch aktif: `main`

> **README = kondisi project sekarang.** Detail forensic history ada di [`docs/progress/`](docs/progress/README.md). Struktur file mengikuti repository aktual.

[🧭 NAVIGATOR](NAVIGATOR.md)

---

# 🕒 LAST SESSION — CHAT 1.9

```text
Session: 1.9 BBKitchen Next.js Migration
Started: 17 August 2026 19:10 WIB
Ended: 17 August 2026 22:14 WIB
Duration: 3h 04m
Status: CLOSED — Vercel / favicon handoff carried
```

> Chat 1.9 added/updated the Dapur MBG, Jual Unit, and Produksi Baru landing-page work, aligned header/footer/service navigation, investigated favicon delivery, and removed the old `src/app/favicon.ico` in preparation for `public/favicon.ico`. Production favicon delivery was not verified at close.

---

# 🏁 CURRENT CHECKPOINT

```text
Chat 1.1 → ✅ Archived
Chat 1.2 → ✅ Archived
Chat 1.3 → ✅ Archived
Chat 1.4 → ✅ Closed
Chat 1.5 → ✅ Closed
Chat 1.6 → ✅ Closed
Chat 1.6B → 🟡 Clarified / Pending
Chat 1.7 → ✅ Closed
Chat 1.8 → 🛑 Closed — DNS blocked
Chat 1.9 → ✅ Closed — landing pages / favicon handoff
```

## Current documentation checkpoint

```text
Chat 1.9 archive:
c9678bbda8c9cb93efc3b8ebd9b139924bf5603c

Latest documentation sync:
README / guides / Navigator are being synchronized in this update.

Canonical END-SESSION prompt:
29f5d4925de894b84eb374c8e58c4f885b542e56
```

---

# 📈 MIGRATION PROGRESS

| Session | Period / time | Start | End | Duration | Focus | Status |
|---|---|---|---|---:|---|---|
| 1.1 | **14 Aug 2026** | **12:45 WIB** | **15:12 WIB** | **2h 27m** | Foundation | ✅ |
| 1.2 | **14 Aug 2026** | **17:00 WIB** | **21:00 WIB** | **4h** | API / Metadata / SEO | ✅ |
| 1.3 | **14–15 Aug 2026** | **14 Aug 23:00 WIB** | **15 Aug 03:00 WIB** | **4h** | Routing / Integration | ✅ |
| 1.4 | **15–16 Aug 2026** | **15 Aug 13:00 WIB** | **16 Aug 06:32:41 WIB** | **17h 32m 41s** | Sales / Conversion | ✅ |
| 1.5 | **16 Aug 2026** | **06:32:41 WIB** | **07:20 WIB** | **47m 19s** | Documentation / session hardening | ✅ |
| 1.6 | **16 Aug 2026** | **15:45 WIB** | **19:43:16 WIB** | **3h 58m 16s** | Responsive QA / UX / gallery | ✅ |
| 1.6B | **16 Aug 2026** | — | — | — | Launch architecture clarification | 🟡 |
| 1.7 | **17 Aug 2026** | **03:30 WIB** | **06:18 WIB** | **2h 48m** | Clean verification / main branch / docs | ✅ |
| 1.8 | **17 Aug 2026** | **06:30 WIB** | **16:54 WIB** | **10h 24m** | Recent Posts / runtime diagnostics / DNS | 🛑 |
| 1.9 | **17 Aug 2026** | **19:10 WIB** | **22:14 WIB** | **3h 04m** | Landing pages / navigation / favicon | ✅ |

### ⏱️ Verified working/session time

```text
Through Chat 1.8:
46 hours 28 minutes 16 seconds

Chat 1.9:
3 hours 04 minutes

Through Chat 1.9:
49 hours 32 minutes 16 seconds
```

> **Important:** elapsed/calendar span ≠ working duration. Do not use calendar span as a proxy for time spent working.

---

# 🎯 CURRENT PRIORITIES — PARETO

1. **Vercel deployment verification** — ensure production is deploying the latest `main` state.
2. **Favicon production verification** — upload the intended favicon to `public/favicon.ico`, deploy, and verify `/favicon.ico` successfully.
3. **DNS + upstream API verification** — resume authoritative DNS, WordPress/WooCommerce upstream, local API, and Vercel API verification after deployment/favicons are settled.

---

# 📊 CURRENT STATE + VERIFICATION

| Area | Implementation | Verification |
|---|---|---|
| WooCommerce data architecture | ✅ | ✅ Established baseline |
| Catalog / pagination | ✅ | ✅ Server-side, 8/page baseline |
| Product Detail | ✅ Functional | ⚠️ Final cross-template regression pending |
| Local hierarchical routing | ✅ | ✅ `[...slug]` verified |
| Homepage sales positioning | ✅ | 🔒 Direction locked |
| Shared Footer | ✅ | ✅ User-verified across key templates |
| Related Products | ✅ | ✅ User-verified baseline |
| Catalog responsive navigation | ✅ | ✅ User-verified desktop/mobile direction |
| Service cards + WhatsApp CTAs | ✅ | ✅ User-verified |
| Dapur MBG landing page | ✅ | ⚠️ Production verification pending |
| Jual Unit landing page | ✅ | ⚠️ Production verification pending |
| Produksi Baru landing page | ✅ | ⚠️ Production verification pending |
| Recent Posts | ✅ Implemented | ✅ Placement/UI baseline verified locally |
| Shared Header | ✅ Integrated | ⚠️ Search typing, sticky behavior, parity carried |
| Article typography | ✅ Content rendering exists | ⚠️ Editorial parity carried |
| WordPress public SEO takeover | ⏳ | ⏳ URL/indexability audit pending |
| Authenticated admin controls | ⏳ | ⏳ Authentication/server authorization pending |
| ACF/Core System | ⏳ | ⏳ Deferred to integration/hardening |
| Favicon | ⏳ `public/favicon.ico` pending upload | 🛑 `/favicon.ico` not verified |
| Production runtime | ⏳ | 🛑 DNS/upstream blocker carried |

---

# 🧭 ARCHITECTURE BASELINE

```text
                         PUBLIC DOMAIN
                    bukanbarukitchen.com
                             ↓
                          NEXT.JS
                             ↓
               Home / Catalog / Product / Pages
                             ↑
                             │ live data
                             │
               WordPress / WooCommerce / ACF
                             ↓
                       BBK Core System
                             ↓
                    WordPress Admin / API
```

- **Next.js:** public experience layer, routing, rendering, SEO presentation, catalog/conversion UX.
- **WooCommerce:** products, prices, stock, categories, images, slug, descriptions.
- **WordPress/ACF:** inventory metadata such as `kode_unit`, `status_unit`, `kondisi_unit`, `lokasi_unit`, `link_telegram`.
- **Core System:** inventory/business logic + integrations.
- **WordPress public renderer:** intended to be replaced by Next.js at launch; WordPress remains operational as backend/admin.
- **Google Sheets:** backend/Core System concern; never expose credentials in client.

### Locked principles

- Next.js is the public experience layer, not the inventory source of truth.
- WordPress/WooCommerce/ACF/Core System remains the backend/admin source of truth.
- Next.js is intended to become the **single public renderer** for the primary website domain.
- Existing SEO URL/slug intent must be preserved unless new technical evidence requires a change.
- WordPress public URL/indexability surface must be audited before launch; redirect/disable/canonical actions must be evidence-based.
- Catalog pagination is server-side.
- Product route: `/product/[slug]`.
- Local route: `/jual-barang-bekas-restoran/[...slug]`.
- Landing routes: `/dapur-mbg`, `/jual-unit`, `/produksi-baru`.
- Inventory business logic does not belong in presentation components.
- SOLD Product Cards remain discoverable.
- Homepage positioning is primarily sales.
- Universal floating mascot composition is rejected.

---

# ⚠️ ACTIVE BOTTLENECKS

| ID | Problem | Status |
|---|---|---|
| B-3 | ACF REST / authoritative inventory metadata filtering | ⚠️ Carried |
| B-6 | WooCommerce / WordPress upstream DNS resolution and 502 history | 🛑 Active — `ENOTFOUND bukanbarukitchen.com` observed locally and on Vercel |
| B-12 | Article/local editorial typography | ⚠️ Carried |
| B-13 | Header search interaction | ⚠️ Carried |
| B-14 | Product Detail shared Header parity | ⚠️ Carried |
| B-15 | Public WordPress renderer/SEO surface must be audited before Next.js takeover | ⚠️ Launch requirement |
| B-16 | Authenticated WordPress admin control layer not yet implemented | ⚠️ Launch requirement |
| B-17 | Production favicon delivery | 🛑 Pending `public/favicon.ico` upload + deployment verification |

### B-6 evidence summary

```text
Vercel API route:
502 → upstream fetch failure → ENOTFOUND bukanbarukitchen.com

Local Next.js API route:
502 → upstream fetch failure → ENOTFOUND bukanbarukitchen.com

Public DNS A lookups previously observed:
103.185.53.66 from 1.1.1.1 / 8.8.8.8 / 9.9.9.9

Direct authoritative-server queries:
ns1.ezydomain.com → no normal A/SOA answer; SOA timed out
ns2.ezydomain.com → no normal A/SOA answer; SOA timed out
```

The current evidence points to DNS delegation/authoritative-zone instability, not a Next.js rendering bug.

---

# 🧭 IMPORTANT FILES

```text
src/app/dapur-mbg/page.tsx
src/app/jual-unit/page.tsx
src/app/produksi-baru/page.tsx
src/components/Header.tsx
src/components/Footer.tsx
src/components/KitchenConsultationBanner.tsx
src/app/layout.tsx
public/favicon.ico          ← next favicon upload target
```

---

# 🔁 NEXT-CHAT HANDOFF

```text
1. Verify current main/Vercel deployment alignment.
2. Upload favicon → public/favicon.ico.
3. Deploy latest main.
4. Verify https://front-end-bbkitchen.vercel.app/favicon.ico.
5. Resume DNS authority/delegation verification.
6. Re-test WordPress/WooCommerce upstream.
7. Re-test local + Vercel API routes.
8. Only then continue launch hardening.
```

After GitHub changes, local checkout must sync with:

```bash
git pull origin main
```
