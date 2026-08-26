import { describe, expect, it } from 'vitest';
import { products } from '@/data/products';
import {
  allCatalogProducts,
  essentialSpecs,
  getCatalogProduct,
  projectFacts,
} from './index';
import { specOverlays } from './specs';

describe('Catalog 2.0 — integrità dati', () => {
  it('ogni overlay di specifiche punta a uno slug reale del catalogo', () => {
    // Regressione: se products.ts viene rigenerato e uno slug cambia,
    // l’overlay orfano deve far fallire la CI invece di sparire in silenzio.
    const slugs = new Set(products.map((p) => p.slug));
    const orphans = Object.keys(specOverlays).filter((slug) => !slugs.has(slug));
    expect(orphans).toEqual([]);
  });

  it('tutti i prodotti legacy vengono adattati', () => {
    expect(allCatalogProducts()).toHaveLength(products.length);
  });

  it('nessun prodotto dichiara prezzo, condizione o disponibilità (dati non noti)', () => {
    for (const p of allCatalogProducts()) {
      expect(p.commercial.price).toBeUndefined();
      expect(p.commercial.priceFrom).toBeUndefined();
      expect(p.commercial.condition).toBeUndefined();
      expect(p.commercial.availability).toBeUndefined();
    }
  });

  it('oggi l’unico commercial mode reale è QUOTE', () => {
    for (const p of allCatalogProducts()) {
      expect(p.commercial.mode).toBe('QUOTE');
    }
  });

  it('getCatalogProduct trova il prodotto pilota con le sue specifiche', () => {
    const pilot = getCatalogProduct('frigorifero-con-porta-in-vetro-e-plastica-nero');
    expect(pilot).toBeDefined();
    expect(pilot?.identity.brand).toBe('Arredo Chef');
    expect(pilot?.performance?.temperatureRange).toBe('+2 / +8 °C');
    expect(pilot?.specs.length).toBeGreaterThanOrEqual(4);
  });

  it('getCatalogProduct ritorna undefined per slug inesistenti', () => {
    expect(getCatalogProduct('non-esiste')).toBeUndefined();
  });

  it('essentialSpecs rispetta il limite e degrada a vuoto senza dati', () => {
    const pilot = getCatalogProduct('frigorifero-con-porta-in-vetro-e-plastica-nero')!;
    expect(essentialSpecs(pilot, 3)).toHaveLength(3);

    const noSpecs = allCatalogProducts().find((p) => p.specs.length === 0);
    expect(noSpecs).toBeDefined();
    expect(essentialSpecs(noSpecs!)).toEqual([]);
  });
});

describe('projectFacts — fatti deterministici, mai inventati', () => {
  const cuociPasta = getCatalogProduct('cuoci-pasta-2-vasche')!; // 18 kW gas
  const fryTop = getCatalogProduct('fry-top-doppio-liscio')!; // 14 kW gas
  const frigo = getCatalogProduct('frigorifero-con-porta-in-vetro-e-plastica-nero')!; // no kW

  it('somma la potenza dichiarata moltiplicata per quantità', () => {
    const facts = projectFacts([
      { product: cuociPasta, qty: 2 },
      { product: fryTop, qty: 1 },
    ]);
    const power = facts.find((f) => f.label === 'Potenza dichiarata');
    expect(power?.value).toBe('50 kW'); // 18×2 + 14
    expect(power?.note).toBeUndefined(); // tutte le macchine hanno il dato
  });

  it('dichiara la copertura parziale quando manca il dato su alcune macchine', () => {
    const facts = projectFacts([
      { product: cuociPasta, qty: 1 },
      { product: frigo, qty: 1 },
    ]);
    const power = facts.find((f) => f.label === 'Potenza dichiarata');
    expect(power?.note).toContain('su 1 di 2 macchine');
  });

  it('non mostra la potenza se nessuna macchina la dichiara', () => {
    const facts = projectFacts([{ product: frigo, qty: 3 }]);
    expect(facts.find((f) => f.label === 'Potenza dichiarata')).toBeUndefined();
  });

  it('conta macchine, reparti e macchine a gas', () => {
    const facts = projectFacts([
      { product: cuociPasta, qty: 2 },
      { product: frigo, qty: 1 },
    ]);
    expect(facts.find((f) => f.label === 'Macchine nel progetto')?.value).toBe('3');
    expect(facts.find((f) => f.label === 'Reparti coinvolti')?.value).toBe('2');
    expect(facts.find((f) => f.label === 'Macchine a gas')?.value).toBe('1');
  });
});
