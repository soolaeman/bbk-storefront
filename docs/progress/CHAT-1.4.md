# Chat 1.4 — Homepage / Conversion / Visual Finalization

> Progress archive for the session that closed the first major homepage/conversion phase.

## Date

**15–16 August 2026 evidence.** Exact start/end time: **Tidak ditemukan di conversation.**

## Pareto — Top 20% Changes

1. Reframed the homepage primarily around **selling available kitchen equipment**, not acquiring people who want to sell/offer bulk units.
2. Replaced fragile mascot-everywhere composition with controlled visual treatment and dedicated AI-generated desktop/mobile hero backgrounds.
3. Locked Dapur MBG and Produksi Baru as direct WhatsApp conversion paths.
4. Normalized Product WhatsApp copy and READY/SOLD behavior.
5. Added YouTube Shorts/TikTok cover-first cards to avoid loading embeds before interaction.

## Major Failed Approach

### Floating mascot across every section

Attempted Hero + Location + Service + Testimonial mascot layers.

Failure:

- overlap
- images escaping containers
- double mascot
- floating/"terbang" composition
- map/card conflicts
- mobile breakage

**Final decision:** do not use the mascot as a universal floating layer. Hero may use controlled card/foreground treatment.

## CTA Decisions

```text
Dapur MBG          → direct WhatsApp
Mau Produksi Baru? → direct WhatsApp
Lihat Unit Tersedia → smooth-scroll catalog
```

## Social Video

```text
public/images/social/youtube-shorts-cover.webp
public/images/social/tiktok-cover.webp
```

Cover first → play overlay → iframe only after click.

## Important Code Checkpoint

```text
26f3911f0d60c595656e85f1e9b65087bab86132
feat: add video covers to social media cards
```

GitHub evidence records this commit at **15 August 2026 21:24:06 UTC**.

## Handoff to 1.5

Continue with responsive/mobile audit, shared Header/search, Product Detail Header parity, article typography, ACF/Core System, production hardening, and SEO/accessibility verification.
