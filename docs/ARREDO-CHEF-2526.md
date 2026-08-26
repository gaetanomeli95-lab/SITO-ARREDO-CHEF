# ARREDO CHEF 2526 — KITCHEN INTELLIGENCE PLATFORM

Documento di architettura. Aggiornato a: Vertical Slice 2526 (prima milestone).

---

## 1. Vision

Trasformare il sito Arredo Chef da vetrina + catalogo in una piattaforma
proprietaria per **progettare, selezionare, preventivare e (in futuro)
acquistare e gestire** attrezzature per cucine professionali.

Reazione attesa dal visitatore:

> "Da qui posso costruire il mio locale."

Il sito pubblico comunica in italiano, tono professionale e concreto.
La tecnologia si percepisce da ciò che permette di fare, non dagli slogan.

## 2. Product principles

1. **Technology as service** — ogni feature deve migliorare comprensione,
   scelta, progettazione, compatibilità, preventivo, collaborazione,
   acquisto o post-vendita. Gli effetti fine a sé stessi sono secondari.
2. **Mai inventare dati** — prezzi, disponibilità, specifiche, numeri
   aziendali: se il dato non esiste, la UI lo nasconde. Vedi
   `src/lib/catalog/specs.ts`: ogni specifica è tracciabile alla fonte.
3. **Niente feature vuote** — 3D/AR/AI/account/carrello compaiono in UI
   solo quando funzionano davvero.
4. **Progressive enhancement** — il sito resta eccellente senza JS pesante,
   senza WebGL, con `prefers-reduced-motion`.
5. **Funzione utile ed elegante > effetto spettacolare.**

## 3. Architettura attuale (dopo la Vertical Slice)

```
src/
├── app/                        # Next.js 14 App Router (invariato + /progetto)
│   └── progetto/page.tsx       # MY PROJECT (noindex)
├── components/
│   ├── project/
│   │   ├── AddToProjectButton.tsx   # CTA card/cockpit
│   │   ├── ProjectIndicator.tsx     # Badge navbar "Il mio progetto · N"
│   │   └── ProjectView.tsx          # Pagina progetto + quote flow
│   ├── ProductCard.tsx         # Card 2.0 (commercial mode data-driven)
│   └── …                       # Componenti esistenti preservati
├── data/
│   ├── products.ts             # LEGACY, GENERATO — non toccare a mano
│   └── company.ts              # Recapiti, processo, recensioni reali
└── lib/
    ├── catalog/
    │   ├── types.ts            # Product Data Model 2.0
    │   ├── specs.ts            # Overlay specifiche curate (solo dati reali)
    │   └── index.ts            # Adapter legacy→2.0 + projectFacts()
    ├── project/
    │   ├── types.ts            # Logica pura (add/remove/qty/sanitize)
    │   └── store.ts            # localStorage + useSyncExternalStore
    ├── motion.ts               # Motion Design System tokens
    └── analytics.ts            # Eventi meaningful, consent-aware
```

**Regola di dipendenza**: i componenti leggono il catalogo SOLO tramite
`@/lib/catalog`. Quando i dati migreranno su database, cambia solo l'adapter.

## 4. Data model

`CatalogProduct` (vedi `lib/catalog/types.ts`): IDENTITY, COMMERCIAL
(`mode: BUY | QUOTE | CONFIGURE`, prezzo/disponibilità nullable), PHYSICAL,
UTILITIES, PERFORMANCE, ASSETS, DOCUMENTATION, RELATIONS, CONTENT, SPECS.

Stato attuale: tutti i prodotti sono `QUOTE` (unico stato commerciale reale).
Nessun prezzo, condizione o disponibilità viene dichiarato.

### Dati necessari per completare i Machine Cockpit

Per ogni prodotto servono (dal fornitore/schede tecniche):

- dimensioni (L×P×H mm) e peso;
- tensione, fasi, potenza kW, tipo gas e consumo;
- necessità acqua/scarico/aspirazione;
- capacità, range temperatura, formati GN;
- scheda tecnica PDF, manuale, certificazioni;
- prezzo e disponibilità (per abilitare BUY/Offer).

Oggi solo ~16 prodotti hanno specifiche parziali estratte dalle descrizioni.

## 5. Motion system

Token in `lib/motion.ts`. Easing di firma `[0.16, 1, 0.3, 1]` (`ease-smooth`).

- FAST INTERACTION: 150–300 ms (hover, toggle, focus)
- SLOW CINEMATIC: 500–1200 ms (reveal, momenti narrativi)
- `prefers-reduced-motion`: azzeramento globale in `globals.css`

**Red Line** — firma visiva: scroll progress navbar, nav active state,
divisore nel Machine Cockpit, bordo laterale nelle card del progetto.
Sottile, mai invasiva.

## 6. Project OS (stato attuale: MVP)

- Store client-side: `localStorage`, chiave `arredochef.project.v1`
- Sincronizzazione multi-tab via evento `storage`
- Nessun account richiesto; migrazione futura a DB con stessa interfaccia
- Quote flow: riepilogo macchine → ContactForm precompilato → API Resend
  esistente (fallback mailto se non configurata) + condivisione WhatsApp

## 7. Future commerce

- `commercial.mode` è l'abstraction: BUY (prodotti semplici),
  QUOTE (macchine complesse), CONFIGURE (sistemi)
- Offer JSON-LD verrà emessa solo con prezzo reale
- Gateway (Stripe/Nexi/PayPal) NON deciso oggi, volutamente
- Dominio commerciale futuro: PostgreSQL (prodotti, varianti, progetti,
  lead, preventivi, service lifecycle). CMS editoriale separato
  (case study, copy, landing) — scelta rinviata a quando servirà.

## 8. Performance budget

- LCP < 2.5 s · CLS < 0.1 · INP < 200 ms (mobile, produzione)
- Vertical Slice: +~3 KB gz di JS client (store progetto), zero nuove
  dipendenze npm, nessun impatto above-the-fold
- WebGL/3D: mai nel bundle iniziale; dynamic import quando esisteranno
- Video: sempre con poster

## 9. Decision log

| Data | Decisione | Motivo |
|---|---|---|
| 2026-08 | Rimosso JSON-LD Offer con price 0 / InStock | Dato falso: rischio SEO e violazione principio "mai inventare dati" |
| 2026-08 | `Logo.tsx`: rimossa semantica `withWordmark` fittizia | Esiste un solo asset (logo completo); prop reintrodotta quando esisterà l'icona |
| 2026-08 | Project store senza dipendenze (no Zustand/Redux) | ~100 righe, zero peso, `useSyncExternalStore` nativo |
| 2026-08 | Specs come overlay curato, non modifica a `products.ts` | `products.ts` è generato; overlay tracciabile e rimovibile |
| 2026-08 | CTA hero "Progetta il tuo locale" NON aggiunta | Il wizard non esiste ancora: niente feature vuote (regola #52) |
| 2026-08 | View Transitions API rinviata | Supporto instabile su Next 14 pages/app; fallback = navigazione standard già valida |
| 2026-08 | `/progetto` noindex + robots disallow | Pagina utility personale, non contenuto indicizzabile |
| 2026-08 | Analytics = push su dataLayer solo se esiste | Consent-aware by design: senza tag manager (post-consenso) è no-op |
