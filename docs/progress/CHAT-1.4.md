[🧭 NAVIGATOR](../../NAVIGATOR.md)

# Chat 1.4 — Homepage / Conversion / Visual Finalization

> **Forensic session-close archive.** Basis: conversation/session evidence plus GitHub repository evidence available on `feature/nextjs-migration`. Missing facts remain explicitly marked **Tidak ditemukan di conversation.**

## Date

Exact session start time: **15 Aug 2026 13:00**

Exact session end time: **16 Aug 2026 06:32:41 WIB**

Duration: 17h 32m 41s

---

# 1. Scope

Chat 1.4 moved the migration from the earlier routing/data-integration phase toward **homepage sales positioning, conversion CTA normalization, hero visual assets, social-video presentation, and mascot/visual composition experiments**.

The session did not replace the established WooCommerce/WordPress/ACF source-of-truth architecture.

---

# 2. Starting State

The session inherited the Chat 1.3 state:

- Next.js App Router foundation already working.
- Live WooCommerce catalog architecture already established.
- Product detail route `/product/[slug]` already established.
- Hierarchical local route `/jual-barang-bekas-restoran/[...slug]` already verified in Chat 1.3.
- Shared Header already integrated but still carried forward search/sticky/parity debt.
- Product Detail/Header visual parity and article typography remained unfinished.
- Homepage already existed as the main conversion surface.

The exact pre-1.4 Git starting checkpoint is **Tidak ditemukan di conversation.**

---

# 3. Pareto — Top 20% Changes

## Top 20% Changes

1. **Homepage positioning was reframed around selling available kitchen equipment**, rather than presenting the homepage primarily as a place for people to offer/sell units.
2. **Dapur MBG and Produksi Baru became direct WhatsApp conversion paths** instead of branching menus.
3. **Hero messaging and conversion behavior were tightened**, including `Siap Kirim / Seluruh Indonesia` and `Lihat Unit yang Tersedia →` scrolling toward the catalog.
4. **Social video cards became cover-first**, using dedicated YouTube Shorts/TikTok WebP covers and loading the iframe only after interaction.
5. **Universal floating mascot composition was rejected** after repeated overlap/floating/mobile-layout failures; the final direction was controlled hero treatment rather than mascot layers across every section.

## Top 20% Bottlenecks

1. Mascot placement/scale caused overlap, escaping containers, duplicate mascot visuals, and mobile composition problems.
2. CTA architecture initially branched Dapur MBG into WhatsApp/PDF choices when the desired Header/Hero/Service/Footer behavior was direct WhatsApp.
3. WhatsApp copy had duplicated wording (`saya`) and required normalization across service/product contexts.
4. Social video cards looked empty before cover assets were introduced.
5. Final responsive verification remains incomplete even though desktop/asset work progressed.

## Top 20% Decisions

1. **Homepage primary positioning = selling available units.**
2. **Dapur MBG CTA = direct WhatsApp** with the locked message:
   `Halo Tim BBKitchen, saya ingin bertanya perihal info kebutuhan peralatan dapur MBG dari BBKitchen.`
3. **Mau Produksi Baru? = direct WhatsApp** with:
   `Halo BBKitchen, mohon info peralatan dapur/restoran custom atau produksi baru`
4. **Product Card:** `READY → Tanya WA`, `SOLD → Tanya Lainnya`; SOLD cards remain discoverable.
5. **Universal floating mascot layers are rejected.** Do not reintroduce the failed composition without a new explicit design decision.

---

# 4. File / Component / Asset History

## Modified / Verified by GitHub evidence

| File / Asset | Change | Status |
|---|---|---|
| `src/components/Header.tsx` | Dapur MBG + Produksi Baru changed to direct WhatsApp actions using centralized custom-link helpers | DONE / CODE ONLY; UI verification not independently reproduced here |
| `src/components/KitchenConsultationBanner.tsx` | Hero/service copy expanded to include Dapur MBG; MBG WhatsApp + PDF catalog CTA added | DONE / CODE ONLY |
| `src/components/HeroSection.tsx` | `Siap Diproses / Cek fisik & pengiriman` → `Siap Kirim / Seluruh Indonesia`; catalog CTA changed to smooth-scroll behavior | DONE / CODE ONLY |
| `src/components/SocialMediaSection.tsx` | Added YouTube Shorts/TikTok cover-first presentation; iframe only after click | DONE / CODE ONLY; visual acceptance reported in conversation |
| `src/components/ProductCard.tsx` | READY/SOLD CTA behavior and multiline product WhatsApp contract are present in current repository | DONE / CODE ONLY; exact originating commit for all ProductCard changes not found in available evidence |
| `src/components/Footer.tsx` | Current repository contains direct MBG and Produksi Baru WhatsApp links | DONE / CODE ONLY |
| `public/images/hero/bbkitchen-hero-desktop.webp` | Dedicated desktop hero background asset exists | DONE / ASSET PRESENT |
| `public/images/hero/bbkitchen-hero-mobile.webp` | Dedicated mobile hero background asset exists | DONE / ASSET PRESENT |
| `public/images/people/*` | Four mascot/chef WebP assets exist | ASSETS PRESENT; final universal floating usage rejected |
| `public/images/social/youtube-shorts-cover.webp` | YouTube Shorts cover asset exists | DONE / ASSET PRESENT |
| `public/images/social/tiktok-cover.webp` | TikTok cover asset exists | DONE / ASSET PRESENT |

Current repository evidence confirms the hero, people, and social asset folders exist. fileciteturn520file0 fileciteturn521file0

---

# 5. Route / API History

No new application route or API endpoint was introduced by the final Chat 1.4 checkpoint that is independently evidenced in the available GitHub record.

Existing routes carried forward:

```text
/product/[slug]
/jual-barang-bekas-restoran/[...slug]
/api/products
```

Exact route/API changes earlier in the session: **Tidak ditemukan di conversation.**

---

# 6. Data / Component Contracts

## Dapur MBG

Locked message:

```text
Halo Tim BBKitchen, saya ingin bertanya perihal info kebutuhan peralatan dapur MBG dari BBKitchen.
```

Current Footer implementation uses this message through `generateWhatsAppCustomLink`. fileciteturn524file0L2-L2

## Produksi Baru

Locked message:

```text
Halo BBKitchen, mohon info peralatan dapur/restoran custom atau produksi baru
```

Current Footer implementation uses the same contract. fileciteturn524file0L2-L2

## Product WhatsApp

Locked structure:

```text
Halo Tim BBKitchen, saya tertarik dan ingin menanyakan penawaran harga dan ketersediaan untuk unit:

Nama Unit: {NAMA UNIT}

SKU/ID: {SKU}

Lokasi Unit: {LOKASI}

Kondisi: {BARU|BEKAS}

Apakah unit ini masih tersedia? Mohon info harga penawaran dan spesifikasi detailnya. Terima kasih.
```

Current `ProductCard.tsx` renders `READY → Tanya WA` and `SOLD → Tanya Lainnya`. fileciteturn525file0L1-L2

## Hero CTA

```text
Lihat Unit yang Tersedia →
```

The GitHub commit for the hero change adds a scroll-to-catalog handler and changes the shipping/value copy. fileciteturn515file0L2-L2

---

# 7. Major Failed Approach — Universal Floating Mascot

## Symptom

Mascot/chef images repeatedly:

- overlapped content
- escaped section/card boundaries
- appeared duplicated
- looked like they were “floating/terbang”
- interfered with map/card content
- broke mobile composition

## Root Cause

The chosen visual model treated transparent mascot assets as universal floating layers across multiple independent sections. The composition did not maintain reliable container, scale, and responsive ownership.

## Attempts

The session attempted mascot placement in:

```text
Hero
Location / Map
Service
Testimonial
```

with multiple absolute-positioning / overflow / object-fit adjustments.

## Why It Failed

The problem was not solved reliably by adding more `absolute`, `overflow-hidden`, or `object-bottom` classes. The visual composition itself was unstable.

## Permanent Resolution

**Do not use the mascot as a universal floating layer.**

The accepted direction is controlled hero/foreground treatment only when composition is explicitly designed for it.

## Status

🔒 **REJECTED / DO NOT REPEAT**

---

# 8. Hero Visual Assets

Dedicated hero backgrounds were introduced for desktop and mobile:

```text
public/images/hero/bbkitchen-hero-desktop.webp
public/images/hero/bbkitchen-hero-mobile.webp
```

GitHub confirms both assets exist on the migration branch. fileciteturn520file0L2-L2

Exact pixel dimensions and source-generation metadata are **Tidak ditemukan di conversation/GitHub evidence available here.**

---

# 9. Social Video Architecture

`SocialMediaSection.tsx` was changed so the initial card displays a local WebP cover rather than an empty embedded-player surface.

Current architecture:

```text
Social card
   ↓
WebP cover
   ↓
Play overlay
   ↓
user click
   ↓
iframe loads
```

GitHub commit:

```text
26f3911f0d60c595656e85f1e9b65087bab86132
feat: add video covers to social media cards
```

Date:

```text
15 August 2026 21:24:06 UTC
```

The commit modifies `src/components/SocialMediaSection.tsx` and references the two cover assets. fileciteturn513file0L2-L2

Status:

```text
CODE → VERIFIED IN GITHUB
UI acceptance → reported in conversation
Mobile verification → Tidak ditemukan di conversation.
```

---

# 10. Important Git Checkpoints

| SHA | Date | Change |
|---|---|---|
| `2220717b51e6814861cea54523b8c19f8db806c8` | 15 Aug 2026 21:04:57 UTC | Header Dapur MBG + Produksi Baru changed to direct WhatsApp |
| `39cfc6b7948188116f38bdaa68d7c1485623b7b8` | 15 Aug 2026 21:09:00 UTC | Hero copy updated + MBG catalog PDF CTA added |
| `9c0e8ebb8284cef396fb780401361a0061484051` | 15 Aug 2026 21:11:58 UTC | Hero shipping copy + catalog scroll CTA |
| `26f3911f0d60c595656e85f1e9b65087bab86132` | 15 Aug 2026 21:24:06 UTC | Social video cover-first cards |

These dates and file changes are GitHub evidence. fileciteturn517file0L2-L2 fileciteturn516file0L2-L2 fileciteturn515file0L2-L2 fileciteturn513file0L2-L2

The exact originating commit for every WhatsApp/ProductCard change is **Tidak ditemukan di conversation/GitHub evidence available here.**

---

# 11. Verification Matrix

| Area | Status | Evidence |
|---|---|---|
| Code changes committed | ✅ | GitHub commits above |
| Social cover assets present | ✅ | Repository asset listing |
| Hero desktop/mobile assets present | ✅ | Repository asset listing |
| Header/Footer MBG direct WhatsApp code | ✅ CODE ONLY | Current source inspection |
| Product READY/SOLD code | ✅ CODE ONLY | Current `ProductCard.tsx` |
| Hero copy/scroll code | ✅ CODE ONLY | GitHub commit `9c0e8...` |
| Build after final 1.4 code | ⚠️ | **Tidak ditemukan di conversation.** |
| Localhost/runtime after final 1.4 code | ⚠️ | **Tidak ditemukan di conversation.** |
| Upstream WooCommerce after final 1.4 code | ⚠️ | Earlier upstream connectivity debt remains; no new 1.4 proof |
| Desktop visual acceptance | ✅ / conversation evidence | User explicitly accepted final visual direction/assets |
| Mobile visual QA | ⚠️ | **Tidak ditemukan di conversation.** |

Do not interpret the documentation-only commits after `26f3911...` as new application-code checkpoints. GitHub comparison shows the branch is 40 commits ahead of that code checkpoint with documentation-only file changes. 

---

# 12. Bottleneck Register — Chat 1.4

| ID | Chat | Problem | Root Cause | Resolution | Lesson | Status |
|---|---|---|---|---|---|---|
| B-15 | 1.4 | Floating mascot composition | Universal transparent layers lacked stable responsive/container ownership | Reject universal mascot layer; controlled hero treatment only | Do not solve a composition problem with endless absolute-position tweaks | CLOSED / DO NOT REPEAT |
| B-16 | 1.4 | Social cards visually empty before interaction | Embed surface had no useful visual cover | Local WebP cover + play overlay + lazy iframe on click | Give interaction surfaces a meaningful pre-interaction state | CLOSED |
| B-17 | 1.4 | Duplicate/awkward WhatsApp wording | Message construction contained redundant wording and branching | Normalize shared custom WhatsApp messages | Keep LABEL, ACTION, and MESSAGE separate | CLOSED |

No additional B-18 is supported by the available evidence.

---

# 13. Failed / Rejected Approaches

### Universal mascot everywhere

❌ Rejected.

### Repeated CSS-only mascot rescue

❌ Rejected as a permanent strategy.

### Dapur MBG branching menu in Header

❌ Replaced with direct WhatsApp for the Header CTA.

### Treating social embeds as the first visual surface

❌ Replaced with cover-first cards.

---

# 14. Architecture Decisions

- Homepage is primarily a **sales/conversion surface**.
- Dapur MBG is a direct WhatsApp CTA in the relevant global/hero/service/footer contexts; the service section may additionally expose the MBG PDF catalog CTA.
- Produksi Baru is a direct WhatsApp CTA.
- Product Card SOLD state remains visible/discoverable.
- Product WhatsApp message uses normalized multiline unit metadata.
- Social video embeds are deferred until user interaction.
- Hero has separate desktop/mobile visual assets.
- Universal mascot floating composition is not part of the accepted architecture.
- Existing WooCommerce/WordPress/ACF source-of-truth architecture remains intact.

---

# 15. Technical Debt Carried Forward

1. **Mobile/responsive QA** across homepage, catalog, product detail, and local pages.
2. **Shared Header** search typing, sticky behavior, and visual parity.
3. **Product Detail** shared Header/design parity.
4. **Article/local landing typography**.
5. **Authoritative ACF filtering / Core System / production hardening**.
6. Related Products.
7. SOLD → Google Sheets workflow.
8. SEO/accessibility/performance verification.

No evidence in Chat 1.4 proves these are resolved.

---

# 16. Documentation / Repository Audit

Current repository documentation structure is:

```text
README.md
NAVIGATOR.md
end-session-prompt.md

docs/
├── guides/
│   ├── README.md
│   ├── COPY-EDITING-GUIDE.md
│   └── VIBE-CODING-COPY-GUIDE.md
├── progress/
│   ├── CHAT-1.1.md
│   ├── CHAT-1.2.md
│   ├── CHAT-1.3.md
│   ├── CHAT-1.4.md
│   └── README.md
└── prompts/
    ├── END-SESSION-PROMPT.md
    ├── FORENSIC-EXTRACTION-PROMPT.md
    └── UPDATE-DOCUMENTATION-PROMPT.md
```

Repository audit confirms the documentation folders contain the above files. fileciteturn504file0L2-L2 fileciteturn505file0L2-L2 fileciteturn509file0L2-L2 fileciteturn510file0L2-L2

Guides were updated during session close to keep copy ownership current and to add Navigator navigation.

Prompts were audited; the canonical End Session workflow remains `docs/prompts/END-SESSION-PROMPT.md`.

---

# 17. Handoff — Chat 1.4 → Chat 1.5

## Current State

```text
APPLICATION CODE
→ Last code checkpoint: 26f3911f0d60c595656e85f1e9b65087bab86132

DOCUMENTATION
→ Session-close documentation is being synchronized after that code checkpoint.

HOMEPAGE
→ Sales-first positioning established.

CTA
→ MBG / Produksi Baru / Product WhatsApp contracts normalized.

SOCIAL
→ Cover-first video cards implemented.

MASCOT
→ Universal floating approach rejected.
```

## Next Priority Order

1. Mobile/responsive QA across all templates.
2. Shared Header: search typing + sticky + parity.
3. Product Detail Header/design parity.
4. Local/article typography and presentation.
5. ACF/Core System and production hardening.

## Things NOT to Repeat

- Do not reintroduce universal floating mascot layers.
- Do not branch direct MBG/Produksi Baru CTA into unnecessary menus.
- Do not duplicate WhatsApp message prefixes.
- Do not treat cover-first social cards as equivalent to verified mobile QA.
- Do not call a documentation commit a new application-code checkpoint.

## Next Conversation Title

```text
1.5 BBKitchen Next.js Migration
```
