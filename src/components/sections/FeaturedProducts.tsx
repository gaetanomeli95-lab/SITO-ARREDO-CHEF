'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';

const featuredSlugs = [
  'cucina-a-gas-4-fuochi',
  'forno-pizza-ctz',
  'banco-pizza-refrigerato-ventilato-3-porte-con-vetrina-portacondimenti',
  'abbattitore-10-teglie',
  'impastatrice-a-spirale-ip-50',
  'vetrina-refrigerata-da-banco',
  'lavastoviglie-a-cappotta',
  'affettatrice-per-salumi',
];

// Simula "Novità" — ultimi prodotti del catalogo
const newArrivalSlugs = [
  'tagliaverdure-e-tritamozzarella',
  'vetrina-refrigerata-da-banco',
  'armadio-frigorifero-tn-700-lt',
  'banco-refrigerato-3-porte-con-alzatina',
  'banchi-vetrine-espositiva-refrigerate-macelleria-salumeria',
  'friggitrice-elettrica-professionale',
  'impastatrice-a-spirale-ip-30',
  'lavastoviglie-a-cappotta',
];

// Simula "Usato revisionato" — stessa lista ma con badge diverso in futuro
const usedSlugs = [
  'forno-pizza-ctz',
  'impastatrice-a-spirale-ip-50',
  'abbattitore-5-teglie',
  'affettatrice-per-salumi',
  'armadio-frigorifero-tn-1400',
  'cucina-a-gas-4-fuochi',
  'macchine-per-la-produzione-di-ghiaccio-cubetto-pieno',
  'vetrina-refrigerata-da-banco',
];

type TabKey = 'richiesti' | 'novita' | 'usato';

const tabs: { key: TabKey; label: string; slugs: string[] }[] = [
  { key: 'richiesti', label: 'Più richiesti', slugs: featuredSlugs },
  { key: 'novita', label: 'Novità', slugs: newArrivalSlugs },
  { key: 'usato', label: 'Usato revisionato', slugs: usedSlugs },
];

export default function FeaturedProducts() {
  const [active, setActive] = useState<TabKey>('richiesti');

  const currentTab = tabs.find((t) => t.key === active)!;
  const list = currentTab.slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is (typeof products)[number] => Boolean(p))
    .slice(0, 8);

  return (
    <section
      data-nav-theme="light"
      className="relative overflow-hidden bg-gradient-to-b from-sabbia via-avorio to-sabbia py-16 md:py-24 lg:py-32"
    >
      {/* Immagine di sfondo */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-evidenza.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20 [filter:brightness(1.1)]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sabbia/80 via-avorio/70 to-sabbia/80" />
      </div>
      <div className="pointer-events-none absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-oro/[0.05] blur-[130px]" />

      <div className="container-ac relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <span className="eyebrow text-rosso">In evidenza</span>
            <h2 className="h-display mt-6 max-w-2xl text-[clamp(2rem,4.5vw,3.5rem)] text-carbone">
              Le macchine che fanno
              <br />
              <span className="text-nebbia">lavorare la tua cucina.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <Link href="/catalogo" className="btn-rosso group">
              Sfoglia il catalogo
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        {/* Tab */}
        <Reveal delay={0.05}>
          <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto border-b border-carbone/10 pb-px">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`relative shrink-0 px-5 py-3 text-sm font-bold transition-colors duration-300 ${
                  active === t.key
                    ? 'text-rosso'
                    : 'text-carbone/50 hover:text-carbone'
                }`}
              >
                {t.label}
                {active === t.key && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 bg-rosso" />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid prodotti */}
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
          {list.map((p, i) => (
            <Reveal key={`${active}-${p.slug}`} delay={Math.min(i * 0.04, 0.2)}>
              <ProductCard product={p} index={i} priority={i < 4} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
