import type { CatalogProduct, Spec } from './types';

/**
 * OVERLAY SPECIFICHE CURATE — SOLO DATI REALI
 *
 * Ogni voce di questo file è estratta ESCLUSIVAMENTE dalle descrizioni
 * ufficiali del catalogo (`src/data/products.ts`, campo `description`,
 * a sua volta derivato dal sito arredochefsrls.it).
 *
 * NON aggiungere specifiche non presenti nella fonte.
 * Quando il catalogo migrerà su database, questo overlay sparirà.
 */

type Overlay = Partial<
  Pick<CatalogProduct, 'physical' | 'utilities' | 'performance' | 'documentation'>
> & {
  brand?: string;
  model?: string;
  specs?: Spec[];
};

export const specOverlays: Record<string, Overlay> = {
  // Fonte: "Capacità 10 Teglie GN 1/1 e EURONORM 600x400mm"
  'abbattitore-10-teglie': {
    performance: { trays: 10, gnFormat: 'GN 1/1 · EN 600×400' },
    specs: [
      { label: 'Capacità', value: '10 teglie', group: 'performance' },
      { label: 'Formato teglie', value: 'GN 1/1 · EN 600×400 mm', group: 'performance' },
    ],
  },

  // Fonte: "Cuoci Pasta a Gas - 2 Vasche, 18 kW"
  'cuoci-pasta-2-vasche': {
    utilities: { powerKw: 18, gasType: 'Gas' },
    performance: { capacity: '2 vasche' },
    specs: [
      { label: 'Alimentazione', value: 'Gas', group: 'utilities' },
      { label: 'Potenza', value: '18 kW', group: 'utilities' },
      { label: 'Vasche', value: '2', group: 'performance' },
    ],
  },

  // Fonte: "Cuocipasta a Gas - 1 Vasca"
  'cuocipasta-1-vasca': {
    utilities: { gasType: 'Gas' },
    performance: { capacity: '1 vasca' },
    specs: [
      { label: 'Alimentazione', value: 'Gas', group: 'utilities' },
      { label: 'Vasche', value: '1', group: 'performance' },
    ],
  },

  // Fonte: "piastra in acciaio da 6 mm ... superficie di cottura di
  // 583 mm x 395 mm ... 2 Bruciatori ... Fry-Top a Gas"
  'fry-top-a-gas-da-banco': {
    utilities: { gasType: 'Gas' },
    specs: [
      { label: 'Alimentazione', value: 'Gas', group: 'utilities' },
      { label: 'Piastra', value: 'Acciaio 6 mm', group: 'physical' },
      { label: 'Superficie di cottura', value: '583 × 395 mm', group: 'physical' },
      { label: 'Bruciatori', value: '2', group: 'utilities' },
    ],
  },

  // Fonte: "Fry-top a gas doppia piastra liscia ... 14 kW"
  'fry-top-doppio-liscio': {
    utilities: { powerKw: 14, gasType: 'Gas' },
    specs: [
      { label: 'Alimentazione', value: 'Gas', group: 'utilities' },
      { label: 'Potenza', value: '14 kW', group: 'utilities' },
      { label: 'Piastra', value: 'Doppia, liscia', group: 'physical' },
    ],
  },

  // Fonte: "Fry-top a gas ... 14 kW ... metà liscia e metà rigata"
  'fry-top-liscio-e-rigato': {
    utilities: { powerKw: 14, gasType: 'Gas' },
    specs: [
      { label: 'Alimentazione', value: 'Gas', group: 'utilities' },
      { label: 'Potenza', value: '14 kW', group: 'utilities' },
      { label: 'Piastra', value: 'Metà liscia · metà rigata', group: 'physical' },
    ],
  },

  // Fonte: "Marchio: ARREDO CHEF ... da +2 a +8 °C ... 4 ripiani regolabili
  // ... 40 kg ciascuno ... LED ... vetro temperato ... 1,62 kWh/24 h ...
  // serratura e chiave"
  'frigorifero-con-porta-in-vetro-e-plastica-nero': {
    brand: 'Arredo Chef',
    performance: {
      temperatureRange: '+2 / +8 °C',
      energyConsumption: '1,62 kWh/24 h',
    },
    specs: [
      { label: 'Temperatura', value: '+2 / +8 °C', group: 'performance' },
      { label: 'Ripiani', value: '4 regolabili · max 40 kg cad.', group: 'performance' },
      { label: 'Consumo', value: '1,62 kWh/24 h', group: 'utilities' },
      { label: 'Porta', value: 'Vetro temperato con serratura', group: 'general' },
      { label: 'Illuminazione', value: 'LED interna', group: 'general' },
      { label: 'Raffreddamento', value: 'A convezione', group: 'performance' },
    ],
  },

  // Fonte: "da 0°C a +10°C ... LED ... 6 ripiani regolabili (portata massima
  // per ripiano: 30 kg) ... 1.68 kW/24h e classe climatica 4 ...
  // sbrinamento automatico"
  'refrigeratore-sottobanco-professional-in-alluminio-e-vetro-nero': {
    performance: {
      temperatureRange: '0 / +10 °C',
      energyConsumption: '1,68 kWh/24 h',
    },
    specs: [
      { label: 'Temperatura', value: '0 / +10 °C', group: 'performance' },
      { label: 'Ripiani', value: '6 regolabili · max 30 kg cad.', group: 'performance' },
      { label: 'Consumo', value: '1,68 kWh/24 h', group: 'utilities' },
      { label: 'Classe climatica', value: '4', group: 'general' },
      { label: 'Sbrinamento', value: 'Automatico', group: 'performance' },
      { label: 'Illuminazione', value: 'LED interna', group: 'general' },
    ],
  },

  // Fonte: "Cucina a Gas 6 Bruciatori"
  'cucina-6-fuochi': {
    utilities: { gasType: 'Gas' },
    specs: [
      { label: 'Alimentazione', value: 'Gas', group: 'utilities' },
      { label: 'Bruciatori', value: '6', group: 'utilities' },
    ],
  },

  // Fonte: "cucina professionale a 4 fuochi ... acciaio inox ... Scotch Brite"
  'cucina-a-gas-4-fuochi': {
    utilities: { gasType: 'Gas' },
    specs: [
      { label: 'Alimentazione', value: 'Gas', group: 'utilities' },
      { label: 'Bruciatori', value: '4', group: 'utilities' },
      { label: 'Finitura', value: 'Inox Scotch Brite', group: 'physical' },
    ],
  },

  // Fonte: "dimensioni del cestello di 500 x 500 mm"
  'lavastoviglie-a-cappotta': {
    specs: [{ label: 'Cestello', value: '500 × 500 mm', group: 'physical' }],
  },

  // Fonte: "Bruciatore Gyros/Kebab GK-30"
  'bruciatore-gyros-kebab-gk-30': {
    model: 'GK-30',
    utilities: { gasType: 'Gas' },
    specs: [{ label: 'Alimentazione', value: 'Gas', group: 'utilities' }],
  },

  // Fonte: "bilancia da banco BDB-35"
  'bilancia-da-banco': {
    model: 'BDB-35',
  },

  // Fonte: "Friggitrice a Gas FRG 8LT"
  'friggitrice-a-gas-1-vasca-da-banco': {
    model: 'FRG',
    utilities: { gasType: 'Gas' },
    performance: { capacity: '8 lt' },
    specs: [
      { label: 'Alimentazione', value: 'Gas', group: 'utilities' },
      { label: 'Capacità vasca', value: '8 lt', group: 'performance' },
    ],
  },

  // Fonte: "impastatrice a spirale ... capacità di 50 litri ... DME-50"
  'impastatrice-a-spirale-ip-50': {
    model: 'IP-50',
    performance: { capacity: '50 lt' },
    specs: [{ label: 'Capacità', value: '50 lt', group: 'performance' }],
  },

  // Fonte: "Impastatrice a spirale 10kg"
  'impastatrice-a-spirale-10kg': {
    performance: { capacity: '10 kg di impasto' },
    specs: [{ label: 'Capacità', value: '10 kg di impasto', group: 'performance' }],
  },

  // Fonte: "refrigeratore (0°/+8°C) o come congelatore (-18°C) ...
  // refrigerazione statica ... vetro temperato curvo ... Low-E"
  pozzetto: {
    performance: { temperatureRange: '0 / +8 °C · fino a −18 °C' },
    specs: [
      { label: 'Doppia funzione', value: 'Frigo 0/+8 °C · Freezer −18 °C', group: 'performance' },
      { label: 'Refrigerazione', value: 'Statica', group: 'performance' },
      { label: 'Porta', value: 'Vetro temperato curvo Low-E', group: 'general' },
    ],
  },
};
