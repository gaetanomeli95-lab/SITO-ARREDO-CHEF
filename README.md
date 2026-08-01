# Arredo Chef — Sito web

Sito istituzionale e catalogo di **Arredo Chef S.R.L.S.** — attrezzature professionali nuove e usate
per la ristorazione. Villabate (PA).

Concept creativo: **"Il calore dell'acciaio"** — alternanza di sezioni chiare e ariose (lo spazio del
locale) e sezioni scure e materiche (il dettaglio dell'attrezzatura).

---

## Stack

| Tecnologia | Versione |
| --- | --- |
| Next.js (App Router) | 14.2.35 |
| React | 18 |
| TypeScript | 5.5 |
| Tailwind CSS | 3.4 |
| Framer Motion | 11 |
| Lucide React | icone |

---

## Avvio

```bash
npm install
npm run dev        # http://localhost:3000
```

Altri comandi:

```bash
npm run build      # build di produzione
npm run start      # serve la build
npm run typecheck  # tsc --noEmit
```

> **Nota:** non lanciare `npm run build` mentre `npm run dev` è attivo: condividono la cartella
> `.next` e la build corrompe il server di sviluppo. In quel caso ferma tutto, elimina `.next` e
> riavvia.

---

## Struttura

```
src/
├── app/
│   ├── layout.tsx              # font, metadata, JSON-LD, Navbar + Footer
│   ├── page.tsx                # homepage (orchestra il ritmo alternato)
│   ├── catalogo/
│   │   ├── page.tsx            # catalogo con filtri
│   │   └── [slug]/page.tsx     # 50 schede prodotto (SSG)
│   ├── chi-siamo/page.tsx
│   ├── contatti/page.tsx
│   ├── privacy/ cookie/        # pagine legali
│   ├── api/contatti/route.ts   # invio modulo
│   ├── sitemap.ts robots.ts
│   └── not-found.tsx
├── components/
│   ├── Navbar.tsx Footer.tsx Hero.tsx
│   ├── ProductCard.tsx PageHeader.tsx Reveal.tsx ContactForm.tsx
│   ├── catalog/CatalogBrowser.tsx
│   └── sections/               # sezioni della homepage
└── data/
    ├── company.ts              # recapiti, processo, recensioni, settori
    └── products.ts             # GENERATO — non modificare a mano
```

---

## Dati prodotto

`src/data/products.ts` è **generato automaticamente**. Per rigenerarlo:

```powershell
powershell -ExecutionPolicy Bypass -File "..\prepare-assets.ps1"
```

Lo script (nella cartella padre) copia le hero e il logo in `public/images`, copia l'immagine
migliore di ogni prodotto in `public/products/<slug>.png` e rigenera il file TypeScript a partire da
`..\products\descriptions\*.txt`.

Per riscaricare tutto dal sito attuale: `..\download-products.ps1`.

---

## Design system

Palette derivata dal logo (rosso + oro + inox):

| Token | Hex | Uso |
| --- | --- | --- |
| `rosso` | `#D8232A` | accenti, CTA, stati attivi |
| `oro` | `#C9A227` | dettagli premium, occhielli su fondo scuro |
| `antracite` | `#14161A` | fondo delle sezioni materiche |
| `inox` | `#C7CCD1` | testo secondario su fondo scuro |
| `panna` | `#FAFAF8` | fondo delle sezioni chiare |

Font: **Archivo** (display) + **Inter** (testo), via `next/font`.

Classi utili in `globals.css`: `.container-ac`, `.eyebrow`, `.h-display`, `.btn-rosso`,
`.btn-ghost-light`, `.btn-ghost-dark`, `.veil-dark`, `.veil-light`, `.grain`, `.hairline-oro`.

---

## Modulo contatti

`POST /api/contatti` con validazione lato server e campo honeypot anti-bot.

L'invio email usa **Resend** via REST (nessuna dipendenza aggiuntiva). Configura in `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM_EMAIL=no-reply@arredochefsrls.it
CONTACT_TO_EMAIL=info@arredochefsrls.it
```

**Se le variabili non sono impostate** l'API risponde `501 not_configured` e il form mostra
automaticamente un fallback: pulsante che apre l'email già compilata + numero di telefono. Nessuna
richiesta viene persa.

---

## Da completare

- [ ] Hero in alta risoluzione (attuali 1024px, servono 2560px+ per desktop)
- [ ] Foto reali di team, sede e magazzino
- [ ] Logo con sfondo trasparente (ora è PNG su bianco, gestito con `mix-blend`)
- [ ] Configurare Resend e verificare il dominio mittente
- [ ] Far revisionare le pagine legali e integrare i dati dell'hosting
- [ ] Eventuale numero di locali allestiti, se il cliente lo fornisce

---

© Arredo Chef S.R.L.S. — P.IVA 06926680825
