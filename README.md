# BBKitchen Frontend — Next.js Migration

Branch aktif: `main`

> **README = kondisi project sekarang.** Detail forensic history ada di [`docs/progress/`](docs/progress/README.md).

[🧭 NAVIGATOR](NAVIGATOR.md)

---

# 🕒 CURRENT CHECKPOINT — CHAT 2.4 CLOSED

```text
Date: 24 August 2026
Session: Chat 2.4
Start: 10:58:00 WIB
End: 12:53:02 WIB
Duration: 1h 55m 02s
Status: CLOSED — MBG landing URL mapping + hierarchical route work + live sitemap verification + universal hierarchy requirement identified
```

Chat 2.4 preserved the existing Next.js Dapur MBG landing design, exposed it through the public `/solusi-peralatan-dapur-mbg/` URL, routed hierarchical MBG pages through WordPress parent IDs, removed `/dapur-mbg/` from the static sitemap, and verified the live sitemap index/static sitemap. Live `sitemap-pages.xml` still contains flat/root-level legacy page URLs, so universal WordPress hierarchy resolution is the next priority.

Latest Chat 2.4 documentation checkpoint:
`de6ff52bd5b1f61b23ac0e87fdb140276b1e85f0`

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

### Project time

```text
Verified working time through Chat 2.3:
61 hours 18 minutes 16 seconds

Chat 2.4:
1 hour 55 minutes 02 seconds

Verified working time through Chat 2.4:
63 hours 13 minutes 18 seconds

Actual elapsed duration since Chat 1.1:
NOT VERIFIABLE
```

Calendar span is not working duration.

---

# 🎯 CURRENT PARETO PRIORITIES

1. **Universal WordPress hierarchy resolver** — one parent/child path resolver must drive Next.js route resolution, canonical URLs, and `sitemap-pages.xml`; do not special-case MBG.
2. **Legacy sitemap parity** — eliminate flat/root-level legacy page URLs from the Next.js sitemap without flattening real WordPress hierarchies.
3. **Production SEO verification** — re-check live sitemap XML, canonical URLs, robots, and GSC behavior after the universal resolver is implemented.

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
| Filters + pagination | ✅ functionally verified |
| `product-category/[...slug]` canonical API path | ✅ migrated |
| `src/lib/wordpress.ts` canonical origin/path | ✅ migrated |
| Legacy `/wp-json/wc/v3/[...slug]` compatibility route | ⚠️ internally orphaned; external dependency unknown |
| MBG landing `/solusi-peralatan-dapur-mbg/` | ✅ user-verified on Vercel |
| `/dapur-mbg/` | ✅ redirect; excluded from static sitemap |
| MBG hierarchical route | ✅ code implemented; production build verified |
| Sitemap index | ✅ user-verified |
| Static sitemap | ✅ user-verified |
| Pages sitemap hierarchy | ⚠️ live flat legacy URLs remain |
| Universal hierarchy resolver | ⏳ next implementation |
| Public SEO takeover | ⏳ audit pending |
| Authenticated admin controls | ⏳ implementation pending |

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

MBG landing mapping:

```text
src/components/DapurMbgLanding.tsx
        ↓ display implementation
/solusi-peralatan-dapur-mbg/
        ↓ public/canonical URL
/dapur-mbg/
        ↓ redirect only
```

Locked principles:

- no second WordPress source of truth;
- no Vercel-blocked Host-header workaround;
- WooCommerce credentials stay server-side;
- preserve `/shop/[slug]` as the public product URL family;
- preserve existing WordPress URL hierarchy during migration;
- hierarchy must be generic, not MBG-specific;
- do not treat a Next.js route as proof that a legacy WordPress URL is redirected/de-indexed;
- `isAdminMode` is not authentication.

---

# ⚠️ ACTIVE BOTTLENECKS

| ID | Problem | Status |
|---|---|---|
| B-6 | WordPress/WooCommerce origin separation | ✅ Resolved |
| B-18 | WooCommerce REST request/auth path | ⚠️ Recovered / verifying |
| B-19 | Legacy WordPress REST routing | ⚠️ Migration in progress |
| B-20 | Universal WordPress hierarchy vs sitemap parity | ⏳ Open |

---

# 🧩 CARRIED TECHNICAL DEBT

- Confirm strict production `HTTP 200 + Content-Type: application/json` headers for API endpoints; browser body evidence is already verified.
- Confirm external consumers before retiring `src/app/wp-json/wc/v3/[...slug]/route.ts`.
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

---

# 🔁 NEXT CHAT HANDOFF

## Chat 2.5 — Universal WordPress Hierarchy Resolver

1. Build one universal parent/child path resolver from WordPress page IDs and `parent` relationships.
2. Reuse the same resolver for Next.js catch-all page routing, canonical metadata, and `sitemap-pages.xml`.
3. Verify arbitrary-depth paths and future parents, e.g. `/jasa-pasang-exhaust-hood/jakarta/`, without hardcoded parent names.
4. Re-run live sitemap verification and confirm flat/root-level legacy URLs are gone from the relevant sitemap output.
5. Continue remaining posts/categories/products parity and SEO verification.

Do not repeat:

```text
- MBG-specific sitemap hacks
- replacing the Next.js Dapur MBG landing with WordPress-rendered content
- flattening hierarchical URLs
- rejected Vercel Host-header workaround
- WooCommerce Basic Auth approach
- legacy URL slug standardization without explicit redirect/canonical approval
- unverified CI/build/GSC claims
```

After GitHub changes:

```bash
git pull origin main
```
