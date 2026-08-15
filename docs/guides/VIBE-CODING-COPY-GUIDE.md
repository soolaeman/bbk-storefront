# BBKitchen Vibe Coding Guide — Copy Locations

> For a non-developer / vibe-coding workflow: use this file to answer **“I want to change this wording — where is the file?”**

This is a **GUIDE**, not a prompt. It explains locations and contracts; it does not instruct an AI to execute a session workflow.

## Quick map

```text
Hero                 → src/components/HeroSection.tsx
Header               → src/components/Header.tsx
Service              → src/components/KitchenConsultationBanner.tsx
Product Card         → src/components/ProductCard.tsx
Product Detail       → src/app/product/[slug]/page.tsx
Location / Article   → src/app/jual-barang-bekas-restoran/[...slug]/page.tsx
Social               → src/components/SocialMediaSection.tsx
Category             → src/components/CategoryFilter.tsx
Footer               → src/components/Footer.tsx
```

## If you want to change...

| You want to change | First file to inspect |
|---|---|
| Hero headline | `src/components/HeroSection.tsx` |
| Hero CTA | `src/components/HeroSection.tsx` |
| Header menu text | `src/components/Header.tsx` |
| Search placeholder | `src/components/Header.tsx` |
| MBG button wording | `src/components/Header.tsx` / `HeroSection.tsx` / service component / `Footer.tsx` |
| Produksi Baru wording | same CTA owners as above |
| READY/SOLD button | `src/components/ProductCard.tsx` |
| Product WhatsApp message | search globally for `Halo Tim BBKitchen` |
| Product Detail CTA | `src/app/product/[slug]/page.tsx` + child component |
| Social copy | `src/components/SocialMediaSection.tsx` |
| Footer wording | `src/components/Footer.tsx` |
| Category labels | `src/components/CategoryFilter.tsx` |
| Local article H1/copy | `src/app/jual-barang-bekas-restoran/[...slug]/page.tsx` |

## Fast search

In VS Code press:

```text
Ctrl + Shift + F
```

Search the exact wording you see on the website.

## Three things to keep separate

```text
TEXT
= what you see

ACTION
= what happens when clicked

MESSAGE
= what gets sent to WhatsApp
```

If you only want to change wording, do not automatically change the action.

## Current WhatsApp contracts

**Dapur MBG**

```text
Halo Tim BBKitchen, saya ingin bertanya perihal info kebutuhan peralatan dapur MBG dari BBKitchen.
```

**Produksi Baru**

```text
Halo BBKitchen, mohon info peralatan dapur/restoran custom atau produksi baru
```

**Product inquiry** uses the multiline product contract defined in `docs/guides/COPY-EDITING-GUIDE.md`.

## Current status buttons

```text
READY → Tanya WA
SOLD  → Tanya Lainnya
```

Do not disable a SOLD product card just because its button text changes.

## Do not touch casually

If you see these, stop and ask before changing them:

```text
slug
URL
SKU
API parameters
category slug
status values
condition values
canonical
schema
```

These can affect data, routing, or SEO rather than just copy.

## AI request template

If you want ChatGPT/Codex to make a simple copy change, you can say:

> “Cari semua occurrence copy `[COPY LAMA]` di frontend. Saya hanya ingin mengganti wording menjadi `[COPY BARU]`. Jangan ubah action, routing, data contract, SEO, atau component architecture. Tunjukkan file yang berubah, jalankan build, lalu laporkan hasilnya.”

For full session closing and documentation, use prompts under `docs/prompts/`.
