# BBKitchen Next.js Migration — Chat 2.7

## Session Timeline
- Started: 29 August 2026 15:12:28 WIB
- Ended: 29 August 2026 15:18:14 WIB
- Duration: 5m 46s
- Scope: documentation-only; no application code authored by Chat 2.7.

## Forensic Range
Chat 2.6 baseline: 22019c29dc1c2fce91cb1b8300dfaf25b90fa86d
Audited head: b5c19a69cecc41888d88d59118987a33448b630b
GitHub compare: 44 commits ahead, 0 behind; merge base equals Chat 2.6 baseline.

## Complete Post-2.6 Commit Ledger
GitHub compare reports 44 commits. The following is the commit-by-commit ledger, preserving every commit hash and subject in the audited range.

1. e023e15bc0b43628b499f57243a6b6e78d8c849c — Fix import paths for Header, Footer, and wordpress lib in solusi-peralatan-dapur-mbg
2. ba9f51b81acd2f911f2e5f3cb4ef157560bc4ed2 — fix: implement high performance split-fetch catalog sorting & sales helper ui facelift
3. 931eb9445318416b0bcb28b887366ee1095f023c — Update page.tsx
4. f9ddbb9e33562bc7d345c1c2138428b587788f5a — Update App.tsx
5. 858e827e379fe6ac36bb112cd83351aecbea5c24 — Update woocommerce.ts
6. fcd70054c0c1986eceb88b41ece3553cca1ac157 — Update route.ts
7. 36bbc3c7ea1a645e32c084ccd65e9177b1be0670 — Update ProductCard.tsx — Fade-in Motion
8. 49e60aa72cee57a8ff2a124c480e812bd886dff1 — Update package.json — Smooth Easing
9. 9f8ce0739cb5640ef991d7639b1254e7b4900435 — perf: debounce catalog search requests
10. c464d7c977e28249bcd5015a50c93eefdd0d4880 — perf: cache catalog metadata scans
11. 48bbeae070c2dd6ad46aed49ce47cc2d3f0461fe — fix: report metadata scan cache state
12. 459aa2fbc18464dae7a76812021fccb38fb19a54 — seo: align homepage canonical and add local business schema
13. ad75d55a84a359e6cf5cf19d70629b664ed7f0f8 — seo: point MBG internal links to canonical
14. 02f23f296e7b059a753e4f25bcaa4a99e1d9a08f — seo: point MBG internal links to canonical
15. f9783131192d794a469bce7771aed619a1623b7d — seo: fix regional canonical to public domain
16. 07b3b5b551cf3cbee5041c09d8baa17b42fae898 — seo: normalize WordPress content canonical
17. 8c4e0b1649b7bd65439b8b2b10c3386d51a52c0b — seo: fix MBG regional canonical host
18. 903ec8dad6a4de9e345cbd75bd7c4211c9eed9a9 — ui: improve MBG regional page mobile layout
19. de2c0bbbff794cf6497b984aa7ea8df3324553ef — Fix MBG breadcrumb links and capitalization
20. 8e2f4f39abdd34af280c0dc78dcab967de793b90 — feat: replace restaurant resale root with location map
21. c463e00ffbeff8f54dee024207f1082d03fcb034 — Update restoran mapping to first H2 titles
22. d7b1fa7785e102940e7a7ae095b118af2521edf1 — Fix H2 extraction regex syntax
23. c85179885d151a0973cc6f2716454e1d4d105bfb — Fix location page content type
24. 915406ac94164904f78dbb61deb0ba05f53feb23 — Fix WordPress page pagination for location map
25. 35522471e74bffc236871209d42c0d32724e4132 — Simplify restoran hub H2 index
26. d0d7062df130e599a5907956fc8ce6561930d3d2 — Build restoran hub as paginated article index
27. 15b2aa7e25aa214750b81e920d4e70953d4020cb — Support WordPress fields query
28. 0e6a8d330173aae4c17ff9c1a87a742090dcb6f2 — Optimize article index WordPress fetching
29. d2303ed226136c62b2cfdeb4bcefccf6cafdc057 — fix: prevent article index 404 links
30. b040f855804e8bc242d12ad064eead47f788f35b — Fix article index pagination and preserve all H2 links
31. d51f169332eb0cb936a68ea34eccf0f0dbb57108 — Prepare manual article index for Jual Barang Bekas Restoran
32. 89422f2e77a818749594860dcd91b5c0921496c1 — manual article index for Jual Barang Bekas Restoran
33. b0f07c5bf787dbc0282ce06de3c4623ad6cd8032 — Update Copy
34. 6ae91a45ad5d5abbd768a203514ed6fe33c1e62f — feat: add Blog link to footer
35. 8961714f8714f644d1413646c61db3d39dc158da — feat: add gas installation service page
36. ed17069c98a55357c04e3244528fd3ecbad88cbc — feat: rename production CTA to gas installation
37. 6aa4eba9bada5f110529ca39962fd4bc639838fa — feat: rename production footer link to gas installation
38. 00c61c9316672ca412df4b01d361434769e3341a — fix: redirect legacy production route
39. d5aa78c13c84ac2bf3f8828b73c917fdf421bbbb — fix: preserve production wording in footer copy
40. 76ad838c1ebb0946529d2b52dbfacec46798ca41 — chore: remove produksi-baru page
41. 3826b8b6e9ca1405fcac11dc8f2ac12666bb7383 — copy: simplify installation service heading
42. 317d5a05a1684f5de6139770685e1fe594e57b1d — feat: route header installation CTA to WhatsApp
43. b5c19a69cecc41888d88d59118987a33448b630b — feat: replace production card with gas installation

## Commit-Level Change Notes
The commit subjects above are the GitHub evidence. The principal change clusters are: split-fetch/catalog performance; shared metadata and caching; ProductCard motion; homepage/MBG canonical and schema hardening; MBG breadcrumb/mobile fixes; Jual Barang Bekas Restoran hub iterations from location map to paginated index to manual index; Blog footer; and Produksi Baru → Jasa Instalasi Gas transition including route, CTA, redirect and removal of the old page.

## Net File-Level Change
GitHub compare reports 19 affected paths: README.md; docs/progress/README.md; package.json; src/App.tsx; src/app/[...slug]/page.tsx; src/app/api/products/route.ts; src/app/catalog/page.tsx; src/app/jasa-instalasi-gas/page.tsx; src/app/jual-barang-bekas-restoran/[...slug]/page.tsx; src/app/jual-barang-bekas-restoran/page.tsx; src/app/page.tsx; src/app/produksi-baru/page.tsx; src/app/solusi-peralatan-dapur-mbg/[...slug]/page.tsx; src/components/Footer.tsx; src/components/Header.tsx; src/components/KitchenConsultationBanner.tsx; src/components/ProductCard.tsx; src/lib/woocommerce.ts; src/lib/wordpress.ts.

## Verification Boundaries
- GitHub source/compare evidence: verified.
- Post-2.6 build: not verified by Chat 2.7.
- Runtime/functional: not verified by Chat 2.7.
- Live production/SEO: not verified by Chat 2.7.
- Manual article index is a source-level fact, not proof of WordPress synchronization.
- KitchenConsultationBanner requires a source/build check for any stale PRODUCTION_PAGE_URL reference.

## Handoff
1. Fix/check the possible PRODUCTION_PAGE_URL reference in KitchenConsultationBanner.tsx.
2. Establish a clean build baseline.
3. Verify Sales Helper READY ↔ SOLD and split-fetch boundary at runtime/upstream.
4. Resume universal WordPress hierarchy/sitemap parity only after the baseline is clean.

After GitHub changes: git pull origin main
