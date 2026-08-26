/**
 * PRODUCT DATA MODEL 2.0 — Arredo Chef Kitchen Intelligence Platform
 *
 * Schema evolutivo: quasi tutti i campi sono opzionali.
 * REGOLA FONDAMENTALE: nessun campo può contenere dati inventati.
 * Se un dato non è noto, resta `undefined` e la UI lo nasconde.
 *
 * Oggi la fonte è `src/data/products.ts` (legacy) + overlay curato in
 * `specs.ts`. Domani la stessa interfaccia sarà servita da un database
 * commerciale (PostgreSQL) senza toccare i componenti.
 */

/** Come si acquisisce il prodotto. Oggi l'unico stato reale è QUOTE. */
export type CommercialMode = 'BUY' | 'QUOTE' | 'CONFIGURE';

export type Condition = 'NUOVO' | 'USATO_REVISIONATO';

export type Availability =
  | 'DISPONIBILE'
  | 'SU_ORDINAZIONE'
  | 'PREORDINE'
  | 'NON_DISPONIBILE';

/** Singola specifica tecnica dichiarata (con fonte reale). */
export type Spec = {
  label: string;
  value: string;
  /** Gruppo logico per il Machine Cockpit. */
  group: 'physical' | 'utilities' | 'performance' | 'general';
};

export type CatalogProduct = {
  identity: {
    id: string;
    slug: string;
    name: string;
    category: string;
    subcategory?: string;
    sku?: string;
    brand?: string;
    model?: string;
  };
  commercial: {
    mode: CommercialMode;
    condition?: Condition;
    price?: number;
    priceFrom?: number;
    currency: 'EUR';
    availability?: Availability;
    leadTime?: string;
  };
  physical?: {
    widthMm?: number;
    depthMm?: number;
    heightMm?: number;
    weightKg?: number;
  };
  utilities?: {
    voltage?: string;
    phases?: 1 | 3;
    frequencyHz?: number;
    powerKw?: number;
    gasType?: string;
    gasConsumption?: string;
    waterRequired?: boolean;
    drainRequired?: boolean;
    extractionRequired?: boolean;
  };
  performance?: {
    capacity?: string;
    temperatureRange?: string;
    productionCapacity?: string;
    trays?: number;
    gnFormat?: string;
    energyConsumption?: string;
  };
  assets: {
    primaryImage: string;
    gallery?: string[];
    videos?: string[];
    spin360?: string[];
    model3d?: string;
    arAsset?: string;
  };
  documentation?: {
    datasheet?: string;
    manual?: string;
    certificates?: string[];
    energyDocument?: string;
  };
  relations?: {
    accessories?: string[];
    alternatives?: string[];
    compatibleProducts?: string[];
    frequentlyCombined?: string[];
  };
  content: {
    shortDescription?: string;
    fullDescription?: string;
    highlights?: string[];
    sourceUrl?: string;
  };
  /** Specifiche dichiarate, pronte per la UI. Vuoto = nessun dato strutturato. */
  specs: Spec[];
};

export const commercialModeLabel: Record<CommercialMode, string> = {
  BUY: 'Acquista',
  QUOTE: 'Richiedi preventivo',
  CONFIGURE: 'Configura con Arredo Chef',
};

export const commercialModeBadge: Record<CommercialMode, string> = {
  BUY: 'Acquistabile',
  QUOTE: 'Preventivo',
  CONFIGURE: 'Su configurazione',
};
