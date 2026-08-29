# BBKitchen Frontend — Next.js Migration

Branch aktif: `main`

> **README = kondisi project sekarang.** Detail forensic history ada di [`docs/progress/`](docs/progress/README.md).

[🧭 NAVIGATOR](NAVIGATOR.md)

---

# 🕒 CURRENT CHECKPOINT — CHAT 2.7 CLOSED

```text
Date: 29 August 2026
Session: Chat 2.7
Start: 15:12:28 WIB
End: 15:18:14 WIB
Duration: 5m 46s
Status: CLOSED — documentation-only forensic archive
```

Chat 2.7 did not author application code. It synchronized the documentation and archived **all 44 post-2.6 commits** from the Chat 2.6 baseline through the audited HEAD.

```text
Chat 2.6 baseline: 22019c29dc1c2fce91cb1b8300dfaf25b90fa86d
Audited HEAD:      b5c19a69cecc41888d88d59118987a33448b630b
GitHub range:      +44 / -0
```

Detailed ledger: [`docs/progress/CHAT-2.7.md`](docs/progress/CHAT-2.7.md)

---

# 📈 MIGRATION PROGRESS

| Session | Start | End | Duration | Focus | Status |
|---|---|---|---:|---|---|
| 1.1 | 14 Aug 12:45 WIB | 14 Aug 15:12 WIB | 2h 27m | Foundation | ✅ |
| 1.2 | 14 Aug 17:00 WIB | 14 Aug 21:00 WIB | 4h | API / Metadata / SEO | ✅ |
| 1.3 | 14 Aug 23:00 WIB | 15 Aug 03:00 WIB | 4h | Routing / Integration | ✅ |
| 1.4 | 15 Aug 13:00 WIB | 16 Aug 06:32:41 WIB | 17h 32m 41s | Sales / Conversion | ✅ |
| 1.5 | 16 Aug 06:32:41 WIB | 16 Aug 07:20 WIB | 47m 19s | Documentation / session hardening | ✅ |
| 1.6 | 16 Aug 15:45 WIB | 16 Aug 19:43:16 WIB | 3h 58m 16s | Responsive QA / UX / gallery | ✅ |
| 1.6B | 16 Aug 19:45 WIB | 16 Aug 20:16 WIB | 31m | Launch architecture clarification | 🟡 |
| 1.7 | 17 Aug 03:30 WIB | 17 Aug 06:18 WIB | 2h 48m | Clean verification / docs | ✅ |
| 1.8 | 17 Aug 06:30 WIB | 17 Aug 16:54 WIB | 10h 24m | Recent Posts / runtime / DNS | 🛑 |
| 1.9 | 17 Aug 19:10 WIB | 17 Aug 22:14 WIB | 3h 04m | Landing pages / navigation / favicon | ✅ |
| 2.0 | 21 Aug 08:36 WIB | 21 Aug 10:29 WIB | 1h 53m | Origin/API diagnostics | 🟡 Superseded |
| 2.1 | 21 Aug 13:25 WIB | 21 Aug 18:19 WIB | 4h 54m | Origin correction / /katalog / WooCommerce auth | ⚠️ Superseded |
| 2.2 | 24 Aug 05:33 WIB | 24 Aug 08:02 WIB | 2h 29m | WooCommerce REST recovery / catalog-detail / URL preservation | ✅ Closed |
| 2.3 | 24 Aug 08:12 WIB | 24 Aug 10:42 WIB | 2h 30m | Production API verification / canonical fetch-path migration / SEO + sitemap audit | ✅ Closed with carried verification debt |
| 2.4 | 24 Aug 10:58 WIB | 24 Aug 12:53:02 WIB | 1h 55m 02s | MBG landing mapping / hierarchical routing / sitemap verification | ✅ Closed with carried sitemap debt |
| 2.5 | 24 Aug 13:00:50 WIB | 24 Aug 13:06:18 WIB | 5m 28s | Vercel blocker audit / MBG import diagnosis / deployment quota isolation | 🛑 Closed — Vercel quota |
| 2.6 | 26 Aug 19:22 WIB | 26 Aug 19:22 WIB | 0m | Antigravity forensic documentation / verification status | ✅ Closed |
| **2.7** | **29 Aug 15:12:28 WIB** | **29 Aug 15:18:14 WIB** | **5m 46s** | **Complete post-2.6 commit archive / documentation sync** | **✅ Closed** |

### Project time

```text
Verified working time through Chat 2.5:
63 hours 18 minutes 46 seconds

Chat 2.6:
0 minutes

Chat 2.7:
5 minutes 46 seconds (documentation-only)

Verified working time through Chat 2.7:
63 hours 24 minutes 32 seconds

Actual elapsed duration since Chat 1.1:
NOT VERIFIABLE
```

Calendar span is not working duration.

---

# 🎯 CURRENT PARETO PRIORITIES

1. **Establish a clean build baseline** after the 44 post-2.6 commits; check the `KitchenConsultationBanner` stale production-reference risk.
2. **Verify Sales Helper + split-fetch** at runtime/upstream level: READY ↔ SOLD mutation, WooCommerce stock state, exact SKU search, cache/path revalidation, and READY→SOLD pagination boundary.
3. **Implement the universal WordPress hierarchy resolver** shared by route resolution, canonical URLs, and `sitemap-pages.xml`.

---

# 📊 CURRENT STATE

| Area | State |
|---|---|
| Next.js public rendering | ✅ established |
| WordPress/WooCommerce/ACF/Core System source of truth | 🔒 locked |
| Backend origin `origin.bukanbarukitchen.com` | ✅ verified |
| `/katalog` | ✅ user-verified |
| Production WooCommerce catalog | ✅ user-verified |
| Product detail `/shop/[slug]` | ✅ user-verified |
| Related products + `/shop/[slug]` links | ✅ user-verified |
| `/api/products` raw JSON body | ✅ production browser-verified |
| `/api/products?metadata=1` raw JSON body | ✅ production browser-verified |
| Filters + pagination | 🟡 split-fetch boundary verification pending |
| `src/lib/wordpress.ts` canonical origin/path | ✅ migrated |
| MBG landing `/solusi-peralatan-dapur-mbg/` | ✅ user-verified |
| MBG hierarchical route imports | 🟡 source fix committed; production build pending |
| Sales Helper READY ↔ SOLD | 🟡 code implemented; runtime/upstream verification pending |
| Catalog READY/SOLD split-fetch | 🟡 code implemented; boundary verification pending |
| Sales Helper UI facelift | 🟡 code implemented; visual/runtime verification pending |
| Homepage canonical + LocalBusiness schema | 🟡 source change committed; live verification pending |
| MBG canonical/internal-link normalization | 🟡 source changes committed; live verification pending |
| Jual Barang Bekas Restoran hub | 🟡 current implementation is manual article index; IA/synchronization review pending |
| Jasa Instalasi Gas | 🟡 source page implemented; production verification pending |
| Legacy `/produksi-baru/` | 🟡 redirect/removal source changes committed; live verification pending |
| Pages sitemap hierarchy | ⚠️ live flat legacy URLs remain |
| Universal hierarchy resolver | ⏳ next implementation |
| Public SEO takeover | ⏳ audit pending |
| Authenticated admin controls | ⏳ implementation pending |
| Vercel Hobby deployment quota | 🛑 deployment verification remains quota-dependent |

## Current architecture

```text
www.bukanbarukitchen.com
        ↓
Vercel / Next.js
        ↓ server-side API fetch
origin.bukanbarukitchen.com
        ↓
/home/bukanbar/public_html
        ↓
WordPress + WooCommerce + ACF + BBK APIs
```

Locked principles:

- no second WordPress source of truth;
- no Vercel-blocked Host-header workaround;
- WooCommerce credentials stay server-side;
- preserve `/shop/[slug]` as the public product URL family;
- preserve existing WordPress URL hierarchy during migration;
- hierarchy must be generic, not MBG-specific;
- do not treat a Next.js route as proof that a legacy WordPress URL is redirected/de-indexed;
- `isAdminMode` is not authentication;
- do not claim production verification from code existence alone.

---

# ⚠️ ACTIVE BOTTLENECKS

| ID | Problem | Status |
|---|---|---|
| B-6 | WordPress/WooCommerce origin separation | ✅ Resolved |
| B-18 | WooCommerce REST request/auth path | ⚠️ Recovered / verifying |
| B-19 | Legacy WordPress REST routing | ⚠️ Migration in progress |
| B-20 | Universal WordPress hierarchy vs sitemap parity | ⏳ Open |
| B-21 | Vercel Hobby daily deployment quota | 🛑 Active — wait for quota recovery |

---

# 🧩 CARRIED TECHNICAL DEBT

- Confirm strict production `HTTP 200 + Content-Type: application/json` headers for API endpoints.
- Confirm external consumers before retiring `src/app/wp-json/wc/v3/[...slug]/route.ts`.
- Verify corrected MBG hierarchical route in a full build/production deployment.
- Verify Sales Helper READY ↔ SOLD mutation against real WooCommerce state.
- Verify split-fetch catalog pagination across the READY/SOLD boundary.
- Wait for Vercel quota recovery before triggering another production deployment.
- Implement and verify universal WordPress hierarchy resolver shared by routing, canonical generation, and sitemap generation.
- Re-run production sitemap XML checks after hierarchy resolver implementation.
- Verify sitemap hierarchy for posts, categories, products, and all discovered legacy parents.
- Audit origin `robots/noindex`, public WordPress renderer, sitemap and canonical/indexing behavior.
- Complete authenticated WordPress admin control layer.
- Review `KitchenConsultationBanner.tsx` for stale `PRODUCTION_PAGE_URL` references.

---

# 🗺️ DOCUMENTATION MAP

```text
README.md
→ current project dashboard

NAVIGATOR.md
→ documentation map

docs/guides/
→ human / vibe-coding reference

docs/progress/
→ forensic migration history

docs/prompts/
→ AI workflow / SOP
```

## Documentation audit — Chat 2.7

- `docs/progress/README.md`: synchronized with Chat 2.7.
- `docs/progress/CHAT-2.7.md`: complete 44-commit post-2.6 ledger.
- `docs/prompts/*`: no change required.
- `docs/guides/*`: no change required.

---

# 🔁 NEXT CHAT HANDOFF

## Chat 2.8 — Build Baseline + Runtime Verification

1. Run `npm run build` against current `main`.
2. Check/fix any stale `PRODUCTION_PAGE_URL` reference in `KitchenConsultationBanner.tsx`.
3. Verify Sales Helper READY ↔ SOLD mutation, WooCommerce stock status, exact SKU search, and cache/path revalidation.
4. Verify catalog split-fetch pagination at ordinary pages and the READY→SOLD boundary.
5. Re-check Vercel quota before one production deployment attempt.
6. Implement one universal parent/child WordPress hierarchy resolver shared by catch-all routing, canonical metadata, and `sitemap-pages.xml`.
7. Re-verify live sitemap hierarchy and SEO parity.

Do not repeat:

```text
- MBG-specific sitemap hacks
- replacing the Next.js Dapur MBG landing with WordPress-rendered content
- flattening hierarchical URLs
- rejected Vercel Host-header workaround
- WooCommerce Basic Auth approach
- legacy URL slug standardization without explicit redirect/canonical approval
- unverified CI/build/GSC claims
- repeated Vercel redeploy attempts while the daily quota is exhausted
- reverted Apps Script architecture without an explicit new decision
```

After GitHub changes:

```bash
git pull origin main
```

---

## Last code checkpoint

`b5c19a69cecc41888d88d59118987a33448b630b`

## Last documentation checkpoint

`68b1c62f298e5f348f729ee9c181f37040b5e5f6`
