# ROADMAP 2526 — milestone verificabili

## ✅ M0 — Vertical Slice 2526 (completata)

Verifica: `npm run typecheck` + `npm run build` senza errori; flusso reale
Home → Catalogo → Card 2.0 → Machine Cockpit → + Aggiungi al progetto →
/progetto → Richiedi preventivo (con riepilogo macchine incluso).

- [x] Foundation fixes: `Logo.tsx`, JSON-LD Product onesto, BreadcrumbList
- [x] Product Data Model 2.0 + adapter (`lib/catalog`)
- [x] Specifiche curate da fonti reali (~16 prodotti)
- [x] ProductCard 2.0: commercial mode data-driven, specs, add-to-project
- [x] Machine Cockpit MVP: specs condizionali, Red Line, CTA
- [x] My Project MVP: localStorage, quantità, note, fatti deterministici
- [x] Quote flow: ContactForm precompilato + WhatsApp share
- [x] Analytics events consent-aware
- [x] Documentazione

## M1 — Dati e qualità (prossima)

Verifica: ogni PDP dei 10 prodotti principali mostra ≥4 specifiche reali.

- [ ] Raccogliere schede tecniche fornitori per i 10 prodotti top
- [ ] Compilare PHYSICAL + UTILITIES complete (dimensioni, kW, allacci)
- [ ] Caricare datasheet PDF in `documentation`
- [ ] Test: unit su `lib/project/types.ts` e `lib/catalog` (vitest)
- [ ] E2E critici (Playwright): catalogo → cockpit → progetto → preventivo
- [ ] CI GitHub Actions: typecheck + lint + build + test
- [ ] Configurare Resend in produzione (env su Vercel)

## M2 — Machine Finder (Catalog 2.0)

Verifica: ricerca "18 kw" o "gn 1/1" trova i prodotti giusti; filtri
diversi per categoria.

- [ ] Ricerca typo-tolerant e spec-aware sull'indice `CatalogProduct`
- [ ] Filtri contestuali per categoria (refrigerazione ≠ forni)
- [ ] Compatibility Engine v0: fatti deterministici estesi (fasi, allacci)

## M3 — Project Intake + Case study

- [ ] Wizard "Progetta il tuo locale" → Project Brief strutturato
- [ ] Upload planimetria (PDF/JPG/PNG) allegata al preventivo
- [ ] Sezione "Realizzato da Arredo Chef" (case study con dati reali
      forniti dal cliente — nessun dato inventato)
- [ ] Solo ora: CTA hero "Progetta il tuo locale"

## M4 — Backend commerciale

- [ ] PostgreSQL: products, projects, leads, quote requests
- [ ] Migrazione adapter → repository DB (stessa interfaccia `CatalogProduct`)
- [ ] Live Quote: `/progetto/[id]` condivisibile con stati
      (BOZZA → IN REVISIONE → PROPOSTA → ACCETTATO)
- [ ] Account clienti (email/OAuth) e sincronizzazione progetto

## M5 — Level C experience

Solo con asset e dati reali disponibili:

- [ ] Hero Morph (foto → blueprint → sistemi) con fallback Level A/B
- [ ] Metallic Light System su superfici acciaio (no touch/reduced-motion)
- [ ] Digital Twin: 5 prodotti strategici in GLB ottimizzato (lazy)
- [ ] Kitchen Canvas 2D/2.5D con footprint reali
- [ ] AR "Vedilo nel tuo locale" (standard web, dimensioni reali)

## M6 — Commerce + After sales

- [ ] BUY per prodotti semplici con prezzo reale + Offer JSON-LD
- [ ] Checkout (gateway da decidere: Stripe/Nexi/PayPal)
- [ ] Digital Passport: "Le mie macchine", garanzie, manuali, assistenza, QR
