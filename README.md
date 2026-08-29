# BBKitchen Frontend — Next.js Migration

Branch aktif: `main`

> **README = kondisi project sekarang.** Detail forensic history ada di [`docs/progress/`](docs/progress/README.md).

[🧭 NAVIGATOR](NAVIGATOR.md)

---

# 🕒 CURRENT CHECKPOINT — CHAT 2.8 CLOSED

```text
Date: 29–30 August 2026
Session: Chat 2.8
Start: 29 Aug 2026 20:37:01 WIB
End: 30 Aug 2026 01:57 WIB
Duration: 5h 19m 59s
Status: CLOSED — Sales Quote preserved; separate Sales Helper added; frontend-to-BTC proxy; forensic archive completed
```

Chat 2.8 delivered the separation of **Sales Quote** and **Sales Helper**, moved Sales Helper business logic behind the BTC service boundary, and completed the session forensic archive.

Detailed archive: [`docs/progress/CHAT-2.8.md`](docs/progress/CHAT-2.8.md)

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
| **2.8** | **29 Aug 20:37:01 WIB** | **30 Aug 01:57 WIB** | **5h 19m 59s** | **Sales Quote + Sales Helper separation / BTC integration / deployment recovery** | **✅ Closed with verification debt** |

### Project time

```text
Verified working time through Chat 2.5:
63 hours 18 minutes 46 seconds

Chat 2.6:
0 minutes

Chat 2.7:
5 minutes 46 seconds (documentation-only)

Chat 2.8:
5 hours 19 minutes 59 seconds

Verified working time through Chat 2.8:
68 hours 44 minutes 31 seconds

Actual elapsed duration since Chat 1.1:
NOT VERIFIABLE
```

Calendar span is not working duration.

---

# 🎯 CURRENT PARETO PRIORITIES

1. **Verify deployed Front-End-BBKitchen → BTC Sales Helper integration**, including `BBK_BTC_URL` and the production response contract.
2. **Verify Sales Helper READY ↔ SOLD end-to-end**, including Apps Script/Google Sheets, WooCommerce state, revalidation, and real authorization.
3. **Strengthen internal authorization/data boundaries**, then resume universal WordPress hierarchy + sitemap parity.

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
| Sales Quote | 🔒 preserved as separate function |
| Sales Helper | 🟡 separate tab + BTC proxy implemented; end-to-end verification pending |
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
| Vercel Hobby deployment quota | 🛑 Frontend deployment verification remains quota-dependent; BTC deployment shown Ready/Latest |

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

## Documentation audit — Chat 2.8

- `docs/progress/README.md`: synchronized with Chat 2.8.
- `docs/progress/CHAT-2.8.md`: forensic archive of Chat 2.8.
- `docs/prompts/*`: no change required.
- `docs/guides/*`: no change required.

---

# 🔁 NEXT CHAT HANDOFF

## Chat 2.9 — Sales Helper Runtime + Authorization + SEO Handoff

1. Verify deployed Front-End-BBKitchen → BTC Sales Helper GET integration.
2. Verify Sales Helper READY ↔ SOLD end-to-end against Apps Script/Google Sheets and WooCommerce.
3. Replace/strengthen the client-side PIN/localStorage gate with server-side authorization.
4. Re-run public/internal pricing leakage audit.
5. Verify `BBK_BTC_URL` production configuration.
6. Resume universal WordPress hierarchy resolver and sitemap parity only after the runtime baseline is clean.

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

`88d8395fa052af10c0303ae3e73ede3169a91209`

## Last documentation checkpoint

`5646d15a55560780f240e8720d0a8944660fb91d`
