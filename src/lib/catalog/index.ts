import {
  ChefHat,
  Cog,
  Droplets,
  Flame,
  LayoutGrid,
  List,
  Package,
  Snowflake,
  UtensilsCrossed,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { products, type Product } from '@/data/products';
import { specOverlays } from './specs';
import type { CatalogProduct, Spec } from './types';

export * from './types';

/**
 * ADAPTER legacy → CatalogProduct 2.0
 *
 * Unica porta d'accesso al catalogo per i componenti.
 * Quando i dati migreranno su database, cambierà solo questo file.
 */
function toCatalogProduct(p: Product): CatalogProduct {
  const overlay = specOverlays[p.slug];

  return {
    identity: {
      id: p.slug,
      slug: p.slug,
      name: p.name,
      category: p.category,
      brand: overlay?.brand,
      model: overlay?.model,
    },
    commercial: {
      // Oggi l'unico stato commerciale reale è il preventivo.
      // Nessun prezzo, condizione o disponibilità viene dichiarato
      // finché non esiste il dato.
      mode: 'QUOTE',
      currency: 'EUR',
    },
    physical: overlay?.physical,
    utilities: overlay?.utilities,
    performance: overlay?.performance,
    assets: { primaryImage: p.image },
    documentation: overlay?.documentation,
    content: {
      fullDescription: p.description,
      shortDescription: p.description.length > 160 ? undefined : p.description,
      sourceUrl: p.sourceUrl,
    },
    specs: overlay?.specs ?? [],
  };
}

let cache: CatalogProduct[] | null = null;

export function allCatalogProducts(): CatalogProduct[] {
  if (!cache) cache = products.map(toCatalogProduct);
  return cache;
}

export function getCatalogProduct(slug: string): CatalogProduct | undefined {
  return allCatalogProducts().find((p) => p.identity.slug === slug);
}

/**
 * Le 2–6 specifiche più utili per card e cockpit.
 * Ritorna array vuoto se non esistono dati strutturati: la UI degrada
 * mostrando la descrizione.
 */
export function essentialSpecs(product: CatalogProduct, max = 6): Spec[] {
  return product.specs.slice(0, max);
}

/**
 * Fatti tecnici deterministici aggregati su un insieme di macchine.
 * NON è AI: solo somme e conteggi su dati dichiarati.
 * Ogni fatto espone quante macchine hanno il dato, per non mentire mai.
 */
export function projectFacts(items: { product: CatalogProduct; qty: number }[]) {
  const facts: { label: string; value: string; note?: string }[] = [];

  const totalMachines = items.reduce((sum, i) => sum + i.qty, 0);
  facts.push({
    label: 'Macchine nel progetto',
    value: String(totalMachines),
  });

  const categories = new Set(items.map((i) => i.product.identity.category));
  facts.push({ label: 'Reparti coinvolti', value: String(categories.size) });

  const withPower = items.filter((i) => i.product.utilities?.powerKw != null);
  if (withPower.length > 0) {
    const totalKw = withPower.reduce(
      (sum, i) => sum + (i.product.utilities?.powerKw ?? 0) * i.qty,
      0
    );
    facts.push({
      label: 'Potenza dichiarata',
      value: `${totalKw.toLocaleString('it-IT')} kW`,
      note:
        withPower.length < items.length
          ? `su ${withPower.length} di ${items.length} macchine con dato dichiarato`
          : undefined,
    });
  }

  const gasCount = items.filter((i) => i.product.utilities?.gasType).length;
  if (gasCount > 0) {
    facts.push({
      label: 'Macchine a gas',
      value: String(gasCount),
      note: 'verifica allaccio gas con il tecnico',
    });
  }

  return facts;
}

const categoryIconMap: Record<string, LucideIcon> = {
  'Affettatrici professionali': UtensilsCrossed,
  'Cottura professionale': Flame,
  'Forni e lievitatori professionali': ChefHat,
  'Gestione denaro': Wallet,
  'Impastatrici e planetarie professionali': Cog,
  'Lavaggio professionale': Droplets,
  'Macchinari da banco': LayoutGrid,
  'Macchine sottovuoto e sigillatrici': Package,
  'Produttori di ghiaccio': Snowflake,
  'Refrigerazione professionale': Snowflake,
  'Vetrine espositive': LayoutGrid,
};

export function categoryIconFor(category: string): LucideIcon {
  return categoryIconMap[category] ?? List;
}
