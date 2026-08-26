# BBKitchen Frontend — Next.js Migration

Branch aktif: `main`

> **README = kondisi project sekarang.** Detail forensic history ada di [`docs/progress/`](docs/progress/README.md).

[🧭 NAVIGATOR](NAVIGATOR.md)

---

# 🕒 CURRENT CHECKPOINT — CHAT 2.6 CLOSED

```text
Date: 26 August 2026
Session: Chat 2.6
Start: 19:22 WIB
End: 19:22 WIB
Duration: 0m (documentation/close session)
Status: CLOSED — Antigravity code changes documented; runtime/build/production verification deferred
```

Chat 2.6 did not author the morning/afternoon code changes. The session performed forensic repository documentation of Google Antigravity work reported for 05:00–17:00 WIB and separated source-level implementation from runtime/production verification.

Latest Chat 2.6 documentation checkpoints:

```text
Progress archive: 22019c29dc1c2fce91cb1b8300dfaf25b90fa86d
Progress index:    1ff47635031906ce4c054b7026a37943d4c13ee8
```

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
| 2.1 | 21 Aug 13:25 WIB | 21 Aug 18:19 WIB | 4h 54m | Origin correction / `/katalog` / WooCommerce auth | ⚠️ Superseded |
| 2.2 | 24 Aug 05:33 WIB | 24 Aug 08:02 WIB | 2h 29m | WooCommerce REST recovery / catalog-detail / URL preservation | ✅ Closed |
| 2.3 | 24 Aug 08:12 WIB | 24 Aug 10:42 WIB | 2h 30m | Production API verification / canonical fetch-path migration / SEO + sitemap audit | ✅ Closed with carried verification debt |
| 2.4 | 24 Aug 10:58 WIB | 24 Aug 12:53:02 WIB | 1h 55m 02s | MBG landing mapping / hierarchical routing / sitemap verification / universal hierarchy requirement | ✅ Closed with carried sitemap debt |
| 2.5 | 24 Aug 13:00:50 WIB | 24 Aug 13:06:18 WIB | 5m 28s | Vercel blocker audit / MBG import diagnosis / deployment quota isolation / hierarchy handoff | 🛑 Closed — Vercel quota |
| 2.6 | 26 Aug 19:22 WIB | 26 Aug 19:22 WIB | 0m documentation close | Antigravity forensic documentation / verification status / handoff | ✅ Closed |

### Project time

```text
Verified working time through Chat 2.5:
63 hours 18 minutes 46 seconds

Chat 2.6:
0 minutes (documentation/close session)

Verified working time through Chat 2.6:
63 hours 18 minutes 46 seconds

Actual elapsed duration since Chat 1.1:
NOT VERIFIABLE
```

Calendar span is not working duration.

---

# 🎯 CURRENT PARETO PRIORITIES

1. **Verify Antigravity Sales Helper changes** — READY ↔ SOLD mutation, WooCommerce stock state, exact SKU search, and path/cache revalidation.
2. **Verify split-fetch catalog pagination** — especially the exact READY→SOLD boundary; then re-check production after Vercel quota recovery.
3. **Universal WordPress hierarchy resolver** — one parent/child path resolver must drive Next.js route resolution, canonical URLs, and `sitemap-pages.xml`; do not special-case MBG.

---

# 📊 CURRENT STATE

| Area | State |
|---|---|
| Next.js public rendering | ✅ established |
| WordPress/WooCommerce/ACF/Core System source of truth | 🔒 locked |
| Backend origin `origin.bukanbarukitchen.com` | ✅ verified |
| `/katalog` | ✅ user-verified |
| Production WooCommerce catalog | ✅ user-verified |
| Native `/wp-json/wc/v3/...` path + browser-like User-Agent | ✅ working evidence |
| Product detail `/shop/[slug]` | ✅ user-verified |
| Related products + `/shop/[slug]` links | ✅ user-verified |
| `/api/products` raw JSON body | ✅ production browser-verified |
| `/api/products?metadata=1` raw JSON body | ✅ production browser-verified |
| Filters + pagination | 🟡 existing verification; new split-fetch boundary verification pending |
| `product-category/[...slug]` canonical API path | ✅ migrated |
| `src/lib/wordpress.ts` canonical origin/path | ✅ migrated |
| Legacy `/wp-json/wc/v3/[...slug]` compatibility route | ⚠️ internally orphaned; external dependency unknown |
| MBG landing `/solusi-peralatan-dapur-mbg/` | ✅ user-verified on Vercel |
| `/dapur-mbg/` | ✅ redirect; excluded from static sitemap |
| MBG hierarchical route imports | 🟡 source-level fix committed; production build verification pending |
| Sales Helper READY ↔ SOLD | 🟡 code implemented; runtime/upstream verification pending |
| Catalog READY/SOLD split-fetch | 🟡 code implemented; boundary verification pending |
| Sales Helper UI facelift | 🟡 code implemented; visual/runtime verification pending |
| Sitemap index | ✅ previously user-verified |
| Static sitemap | ✅ previously user-verified |
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

- Confirm strict production `HTTP 200 + Content-Type: application/json` headers for API endpoints; browser body evidence is already verified.
- Confirm external consumers before retiring `src/app/wp-json/wc/v3/[...slug]/route.ts`.
- Verify the corrected MBG hierarchical route in a full build/production deployment.
- Verify Sales Helper READY ↔ SOLD mutation against real WooCommerce state.
- Verify split-fetch catalog pagination across the READY/SOLD boundary.
- Wait for Vercel quota recovery before triggering another production deployment.
- Implement and verify a universal WordPress hierarchy resolver shared by routing, canonical generation, and sitemap generation.
- Re-run production sitemap XML checks after hierarchy resolver implementation.
- Verify sitemap hierarchy for posts, categories, products, and all discovered legacy parents.
- Audit origin `robots/noindex`, public WordPress renderer, sitemap and canonical/indexing behavior.
- Complete authenticated WordPress admin control layer.

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

## Documentation audit — Chat 2.6

- `docs/guides/*`: **No change required**; no guide drift was identified from the documented Antigravity changes.
- `docs/prompts/*`: **No change required**; canonical `END-SESSION-PROMPT.md` remains the normal end-session SOP.
- `end-session-prompt.md`: **No change required**; shortcut remains canonical.

---

# 🔁 NEXT CHAT HANDOFF

## Chat 2.7 — Verify Antigravity Changes + Universal WordPress Hierarchy

1. Run `npm run build` against the current `main` code.
2. Verify Sales Helper READY ↔ SOLD mutation, WooCommerce stock status, exact SKU search, and path/cache revalidation.
3. Verify catalog split-fetch pagination at ordinary pages and the READY→SOLD boundary.
4. Re-check Vercel quota before one production deployment attempt.
5. Implement one universal parent/child WordPress hierarchy resolver shared by catch-all routing, canonical metadata, and `sitemap-pages.xml`.
6. Re-verify live sitemap hierarchy and SEO parity.

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

`ba9f51b81acd2f911f2e5f3cb4ef157560bc4ed2`

## Last documentation checkpoint

`22019c29dc1c2fce91cb1b8300dfaf25b90fa86d`
