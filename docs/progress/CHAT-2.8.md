# BBKitchen Next.js Migration — Chat 2.8

## Date / Session Timeline

Session: 2.8
Started: 29 August 2026 20:37:01 WIB
Ended: 30 August 2026 01:57 WIB
Duration: 5h 19m 59s
Evidence source:
- Start: user-provided screenshot showing START-SESSION-PROMPT execution at 29 August 2026 20:37:01 WIB (Asia/Jakarta).
- End: user-provided session-close instruction stating Chat 2.8 ended at 01:57 on 30 August 2026.
- GitHub timestamps are used as repository activity evidence, not as a substitute for working-time evidence.

## Session Scope

Chat 2.8 continued from the Chat 2.7 documentation baseline and focused on connecting the BBKitchen public frontend to the separate Business Control Tower / Sales Helper flow while preserving the existing Sales Quote function.

Primary objectives that emerged during the session:
1. Preserve Sales Quote as its own existing function.
2. Add Sales Helper as a separate admin navigation/tab rather than replacing or duplicating Sales Quote.
3. Connect the public Next.js Sales Helper API path to the BBKitchen Business Control Tower (BTC) service.
4. Preserve the internal/public data boundary: Sales Helper is an internal operational tool and must not turn internal commercial pricing into public website data.
5. Deploy/verify the BTC service after the navigation correction.
6. Close the session with a forensic archive and progress-index update.

## Starting State

- Previous session: Chat 2.7.
- Previous audited frontend HEAD: `b5c19a69cecc41888d88d59118987a33448b630b`.
- Chat 2.8 bootstrap archive was already created before application work:
  - `76328e0749a1b805adcb6550ca3ea85b88bada9d`
- Progress index registered Chat 2.8 as active:
  - `a4458587e0db7af794c00716d56634e77ab9a294`

## Pareto — Top 20% Changes

1. **Sales Quote preserved + Sales Helper separated**
   - BTC admin navigation now has distinct `SALES_QUOTE` and `SALES_HELPER` entries.
   - Sales Quote continues routing to `/admin/sales`.
   - Sales Helper is a separate tab/function.
   - Evidence: BTC commit `e031c0c88d66870ccc7b616ce9d514c7b0795a81`.

2. **Sales Helper frontend proxy moved to BTC**
   - Frontend `/api/sales-helper` no longer contains the pricing/business logic itself.
   - It proxies the request to `BBK_BTC_URL/api/sales-helper`.
   - `BBK_BTC_URL` is documented as an environment variable.
   - Evidence:
     - `4d04571d307008d61acf3a26df19599847108431`
     - `3e23ab2e28d735b3b0843133d0ba8327d907a06f`

3. **BTC deployment blocker was cleared**
   - Incompatible Bun lockfile was removed from BTC for Vercel compatibility.
   - The user-provided deployment screenshot subsequently showed the BTC Production deployment as Ready/Latest.
   - Evidence:
     - BTC commit `d1d55761a81e7324882a4dd16143a1acf0872bd5`
     - User-provided Vercel screenshot.

4. **Gas installation banner regression restored**
   - The banner CTA was corrected to use `GAS_INSTALLATION_PAGE_URL` instead of the stale production-page reference.
   - Evidence: frontend commit `88d8395fa052af10c0303ae3e73ede3169a91209`.

5. **Session/documentation discipline completed**
   - Chat 2.8 was bootstrapped before code work and is now formally closed with verified start/end evidence supplied by the user.
   - This archive and the progress index are being synchronized without rewriting prior session history.

## Detailed Change History

### Front-End-BBKitchen

#### Sales Helper API proxy
File:
`src/app/api/sales-helper/route.ts`

Previous behavior:
- Queried WooCommerce directly.
- Contained dynamic pricing calculation in the public frontend repository.

Chat 2.8 change:
- Removed the local pricing/business-logic implementation.
- Reads `BBK_BTC_URL` from the server environment.
- Proxies `/api/sales-helper` requests to BTC.
- Preserves query parameters.
- Uses `cache: 'no-store'`.
- Returns the upstream response body/status/content type.
- Returns HTTP 502 when the BTC service cannot be reached.

Decision:
**Business logic belongs in BTC; the public frontend is a controlled proxy/rendering layer.**

Evidence:
`4d04571d307008d61acf3a26df19599847108431`

#### Environment contract
The frontend environment documentation now includes:

`BBK_BTC_URL="https://YOUR-BBK-BTC-HOST"`

Purpose:
- Canonical base URL for the BBKitchen Business Control Tower.
- Sales Helper requests are proxied to BTC.
- Business logic remains outside the public frontend.

Evidence:
`3e23ab2e28d735b3b0843133d0ba8327d907a06f`

#### Gas installation CTA
File:
`src/components/KitchenConsultationBanner.tsx`

The fourth service card's CTA was restored from stale `PRODUCTION_PAGE_URL` usage to `GAS_INSTALLATION_PAGE_URL`.

Evidence:
`88d8395fa052af10c0303ae3e73ede3169a91209`

### BBKitchenBTC

#### Separate Sales Quote and Sales Helper
File:
`app/admin/page.tsx`

The navigation was corrected so:
- `SALES_QUOTE` = existing Sales Quote.
- `SALES_HELPER` = new separate Sales Helper.
- Sales Quote routes to `/admin/sales`.
- Sales Helper remains independently addressable through the admin navigation.
- The previous accidental reuse of the Sales Helper route for Sales Quote was removed.

Evidence:
`e031c0c88d66870ccc7b616ce9d514c7b0795a81`

#### Sales Helper route/navigation
Earlier BTC commits in this session introduced:
- Sales Helper route exposure: `75697ab89d68d26870683c5433711d72e66fc54a`
- Admin navigation entry: `5f2319729d13d60fc4efd272e67121fb5322f1f5`

#### BTC Vercel compatibility
The BTC Bun lockfile incompatibility was removed:
- `d1d55761a81e7324882a4dd16143a1acf0872bd5`

The user-provided Vercel screenshot showed:
- Production environment.
- Deployment status: Ready / Latest.
- BTC domain: `bbkitchenbtc.vercel.app`.
- Business Control Tower UI rendered successfully.

This is deployment/UI evidence, not a substitute for a full automated integration test.

## Sales Quote vs Sales Helper — Locked Decision

**Do not merge them.**

Current intended separation:

```text
Sales Quote
  ↓
Existing quotation workflow
  ↓
/admin/sales

Sales Helper
  ↓
Operational product lookup / negotiation helper
  ↓
Separate Sales Helper tab
```

The user explicitly chose:
- Sales Quote tetap ada.
- Sales Helper ditambahkan.
- Sales Quote must not become Sales Helper.

This is a locked UX/architecture decision for subsequent sessions.

## Sales Helper Functional Surface

The frontend Sales Helper page currently contains:
- internal PIN gate UI;
- product search;
- SKU lookup;
- product/status/location information;
- Telegram source link;
- pricing/negotiation display;
- WhatsApp draft generation;
- public product link;
- READY/SOLD toggle.

The toggle endpoint remains:
`src/app/api/sales-helper/toggle-status/route.ts`

It currently:
- accepts SKU/product ID + target status;
- calls the configured Apps Script endpoint;
- on successful Apps Script response, synchronizes WooCommerce stock state;
- maps SOLD → `outofstock`;
- maps READY → `instock`;
- updates `status_unit` metadata;
- revalidates relevant product/catalog paths.

Important verification boundary:
**Code exists, but complete end-to-end authenticated/upstream mutation verification was not proven in this session.**

## Security / Data Boundary

The architecture decision from the broader project remains locked:

```text
PUBLIC WEBSITE
  ≠
INTERNAL SALES / COMMERCIAL DATA
```

Internal values such as:
- Supplier Price
- Middle Price
- WA Price
- Floor Price
- Deal Price
- Margin
- commercial notes

must not leak through public frontend responses, HTML, metadata, schema, SEO, or public endpoints.

Moving Sales Helper business logic toward BTC reduces the amount of internal pricing logic held in the public frontend repository.

### Important remaining security debt

The current Sales Helper page contains a client-side hardcoded PIN:
`const PIN_CODE = '1051'`

and stores authentication state in browser `localStorage`.

Therefore this is **not equivalent to server-side authentication/authorization**.

Status:
⚠️ **Technical debt / security boundary not fully solved.**

Do not describe this PIN gate as production-grade authentication.

## Antigravity / Google Research Thread

During the session, the workflow also explored Google Antigravity / Google AI Studio context and how the system should align with the current BBK architecture.

Ground-truth rule preserved:
- Google AI Studio is an analysis/development environment, not the established BBK transactional source of truth.
- BTC is the operational Business Control Tower layer.
- Front-End-BBKitchen remains the public Next.js layer.
- BBK-Automation / Apps Script remain upstream operational/data-processing systems.

No new transactional architecture should be invented solely from an AI Studio/Antigravity concept.

## Bottlenecks

### B-22 — Sales Quote / Sales Helper navigation collision
Problem:
Sales Quote and Sales Helper initially pointed at the same admin function.

Root cause:
The navigation reused `SALES_HELPER` for the existing Sales Quote route.

Resolution:
Introduced explicit `SALES_QUOTE` and `SALES_HELPER` admin tab identities and routed Sales Quote to `/admin/sales`.

Status:
✅ Resolved.

Evidence:
`e031c0c88d66870ccc7b616ce9d514c7b0795a81`

### B-23 — Public frontend contained Sales Helper business logic
Problem:
The frontend Sales Helper API contained local dynamic pricing logic.

Root cause:
Business logic had been implemented directly in the public frontend API route.

Resolution:
Converted frontend endpoint to a server-side proxy toward BTC using `BBK_BTC_URL`.

Status:
✅ Code-level resolution; end-to-end runtime contract still requires verification.

Evidence:
`4d04571d307008d61acf3a26df19599847108431`

### B-24 — BTC Vercel lockfile incompatibility
Problem:
BTC deployment was blocked by an incompatible Bun lockfile.

Resolution:
Removed the incompatible lockfile.

Status:
✅ Deployment screenshot subsequently showed Ready/Latest.

Evidence:
`d1d55761a81e7324882a4dd16143a1acf0872bd5`

## Failed / Corrected Approaches

1. **Sales Quote reused the Sales Helper navigation route**
   - Result: Sales Quote displayed the wrong function.
   - Corrected by splitting the tab identities.

2. **Sales Helper pricing/business logic lived in frontend API**
   - Result: business logic was duplicated/placed in the public frontend layer.
   - Corrected by proxying to BTC.

3. **Stale production-page CTA reference**
   - Result: Gas Installation banner could point to the obsolete production route.
   - Corrected to the canonical gas-installation page constant.

4. **Bun lockfile on BTC**
   - Result: Vercel compatibility issue.
   - Corrected by removing the incompatible lockfile.

## Verification

### Verified / evidenced

- Chat 2.8 start timestamp: verified from user-provided screenshot.
- Chat 2.8 end time: supplied by user as 30 August 2026 01:57 WIB.
- Frontend Sales Helper proxy code exists on `main`.
- `BBK_BTC_URL` environment contract exists in repository documentation.
- BTC has distinct Sales Quote and Sales Helper navigation identities.
- Sales Quote remains mapped to `/admin/sales`.
- BTC Sales Helper route/navigation commits exist.
- BTC Vercel deployment was visually shown as Ready / Latest by the user.
- Gas installation CTA correction exists in GitHub.

### Not fully verified in this session

- Full browser-to-BTC Sales Helper API integration from the deployed public frontend.
- End-to-end Sales Helper READY ↔ SOLD mutation against live Google Sheets + WooCommerce.
- Server-side authentication/authorization for the Sales Helper PIN gate.
- Complete production build/runtime verification of every affected frontend path.
- Full public-data leakage audit after moving Sales Helper logic to BTC.
- Full Vercel deployment verification for the Front-End-BBKitchen repository itself.

## Git Checkpoints

### Front-End-BBKitchen

Last application-code checkpoint in Chat 2.8:
`88d8395fa052af10c0303ae3e73ede3169a91209`

Latest Chat 2.8 documentation bootstrap/registration commits:
- `76328e0749a1b805adcb6550ca3ea85b88bada9d`
- `a4458587e0db7af794c00716d56634e77ab9a294`

### BBKitchenBTC

Key Chat 2.8 application checkpoints:
- `d1d55761a81e7324882a4dd16143a1acf0872bd5` — Vercel lockfile compatibility.
- `75697ab89d68d26870683c5433711d72e66fc54a` — Sales Helper route.
- `5f2319729d13d60fc4efd272e67121fb5322f1f5` — admin navigation.
- `e031c0c88d66870ccc7b616ce9d514c7b0795a81` — keep Sales Quote + separate Sales Helper.

## Pareto — Top 20% Bottlenecks

1. Authentication/authorization is still weaker than the intended internal-control architecture.
2. End-to-end Sales Helper upstream mutation needs real runtime verification.
3. Public frontend ↔ BTC deployment/environment contract needs explicit production verification.

## Pareto — Top 20% Decisions

1. **Sales Quote and Sales Helper are permanently separate functions.**
2. **Sales Helper business logic belongs in BTC, not in the public frontend.**
3. **Internal commercial pricing must remain behind an internal access/data boundary.**
4. **Do not claim production verification from code existence or a successful deployment alone.**
5. **Preserve the existing WordPress/WooCommerce/BBK operational source-of-truth architecture.**

## Technical Debt Carried Forward

- Replace client-side PIN/localStorage gate with real server-side authentication/authorization.
- Verify Sales Helper GET path from deployed frontend → BTC.
- Verify Sales Helper READY ↔ SOLD mutation end-to-end.
- Verify Google Sheets / Apps Script / WooCommerce state consistency after mutation.
- Verify public frontend does not expose internal pricing through API/HTML/SEO/schema.
- Verify `BBK_BTC_URL` is configured correctly in the production frontend environment.
- Complete production build/runtime verification for affected repositories.
- Continue universal WordPress hierarchy/sitemap parity work after the runtime baseline is clean.
- Preserve Sales Quote independently; do not route it through Sales Helper.

## Handoff

### Current state

```text
BBK-AUTOMATION
      ↓
RAW / MASTER DATA
      ↓
WooCommerce / WordPress
      ↓
Front-End-BBKitchen (public)
      ↓
Customer / WhatsApp

BBKitchenBTC (internal)
      ↓
Business Control Tower
      ├── Sales Quote
      └── Sales Helper
```

### Next priority order

1. Verify deployed Front-End-BBKitchen → BTC Sales Helper GET integration.
2. Verify Sales Helper READY ↔ SOLD against real upstream state and WooCommerce.
3. Replace/strengthen the Sales Helper client-side PIN with server-side authorization.
4. Re-run public/internal data leakage audit.
5. Only then resume the universal WordPress hierarchy/sitemap work.

### Do not repeat

- Do not replace Sales Quote with Sales Helper.
- Do not put internal pricing/business logic back into the public frontend.
- Do not treat client-side PIN/localStorage as real authorization.
- Do not call deployment Ready equivalent to full functional verification.
- Do not invent missing customer/CRM/finance/WhatsApp data architecture.
- Do not regress the established WordPress/WooCommerce source-of-truth model.

## Final Session Position

Chat 2.8 is **CLOSED**.

The principal architectural outcome is:

**Sales Quote stays intact; Sales Helper is added as a separate internal tool; the public frontend proxies Sales Helper requests to BBKitchenBTC instead of owning the business logic.**

The implementation is materially closer to the current BBK system context, but the end-to-end production integration and internal authorization boundary remain verification work for the next session.
