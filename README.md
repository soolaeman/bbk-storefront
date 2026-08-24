# BBKitchen Frontend — Next.js Migration

Branch aktif: `main`

> **README = kondisi project sekarang.** Detail forensic history ada di [`docs/progress/`](docs/progress/README.md).

[🧭 NAVIGATOR](NAVIGATOR.md)

---

# 🕒 CURRENT CHECKPOINT — CHAT 2.5 CLOSED

```text
Date: 24 August 2026
Session: Chat 2.5
Start: 13:00:50 WIB
End: 13:06:18 WIB
Duration: 5m 28s
Status: CLOSED — Vercel deployment quota blocked production verification; latest build blocker isolated to MBG route imports
```

Chat 2.5 audited the newest Vercel production failure and separated it from the earlier `produksi-baru/page.tsx` parser failure. The current verified blocker is an incorrect relative-import depth in `src/app/solusi-peralatan-dapur-mbg/[...slug]/page.tsx`; Vercel also reports the Hobby daily deployment quota as exhausted. No redeploy was attempted after the quota warning.

Latest Chat 2.5 documentation checkpoint:
`1c4d25923061d638e3db030a7e064e7fd4088ce6`

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

### Project time

```text
Verified working time through Chat 2.4:
63 hours 13 minutes 18 seconds

Chat 2.5:
5 minutes 28 seconds

Verified working time through Chat 2.5:
63 hours 18 minutes 46 seconds

Actual elapsed duration since Chat 1.1:
NOT VERIFIABLE
```

Calendar span is not working duration.

---

# 🎯 CURRENT PARETO PRIORITIES

1. **Fix the current MBG route build blocker** — change the three relative imports in `src/app/solusi-peralatan-dapur-mbg/[...slug]/page.tsx` from `../../../../...` to `../../../...`.
2. **Production deployment recovery** — wait for Vercel Hobby deployment quota recovery; do not spam `Redeploy` while `api-deployments-free-per-day` is active.
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
| Filters + pagination | ✅ functionally verified |
| `product-category/[...slug]` canonical API path | ✅ migrated |
| `src/lib/wordpress.ts` canonical origin/path | ✅ migrated |
| Legacy `/wp-json/wc/v3/[...slug]` compatibility route | ⚠️ internally orphaned; external dependency unknown |
| MBG landing `/solusi-peralatan-dapur-mbg/` | ✅ user-verified on Vercel |
| `/dapur-mbg/` | ✅ redirect; excluded from static sitemap |
| MBG hierarchical route | ⚠️ code exists; latest production build blocked by module-resolution error |
| Sitemap index | ✅ previously user-verified |
| Static sitemap | ✅ previously user-verified |
| Pages sitemap hierarchy | ⚠️ live flat legacy URLs remain |
| Universal hierarchy resolver | ⏳ next implementation |
| Public SEO takeover | ⏳ audit pending |
| Authenticated admin controls | ⏳ implementation pending |
| Vercel Hobby deployment quota | 🛑 exhausted at session close |

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
- Fix the MBG hierarchical route relative imports before the next deployment.
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

## Documentation audit — Chat 2.5

- `docs/guides/*`: **No change required**; current guides remain valid for the session's work.
- `docs/prompts/*`: **No change required**; canonical `END-SESSION-PROMPT.md` remains the normal end-session SOP.
- `end-session-prompt.md`: **No change required**; shortcut remains canonical.

---

# 🔁 NEXT CHAT HANDOFF

## Chat 2.5 — Universal WordPress Hierarchy Resolver (Resume After Vercel Quota Reset)

1. Fix `src/app/solusi-peralatan-dapur-mbg/[...slug]/page.tsx` imports: `../../../../` → `../../../` for `Header`, `Footer`, and `lib/wordpress`.
2. Commit the verified source fix.
3. After Vercel quota recovery, perform one production deployment attempt and inspect the resulting build logs.
4. Build one universal parent/child path resolver from WordPress page IDs and `parent` relationships.
5. Reuse the resolver for Next.js catch-all page routing, canonical metadata, and `sitemap-pages.xml`.
6. Verify arbitrary-depth paths and confirm flat/root-level legacy URLs are gone from the relevant sitemap output.

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
```

After GitHub changes:

```bash
git pull origin main
```

---

## Last code checkpoint

`86487265c9c6260fae81539b08cd39b27a89f69e`

## Last documentation checkpoint

`1c4d25923061d638e3db030a7e064e7fd4088ce6`
