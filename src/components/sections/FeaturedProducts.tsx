import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, ClipboardList } from 'lucide-react';
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

const projectBenefits = [
  'Specifiche disponibili in scheda',
  'Prodotti salvati sul dispositivo',
  'Un solo preventivo per tutto il progetto',
];

export default function FeaturedProducts() {
  const list = featuredSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is (typeof products)[number] => Boolean(product));

  return (
    <section
      data-nav-theme="light"
      className="relative overflow-hidden bg-gradient-to-b from-sabbia via-avorio to-sabbia py-20 md:py-28 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px]">
        <Image
          src="/images/hero-evidenza.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sabbia/55 via-avorio/90 to-sabbia" />
      </div>
      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-30" />

      <div className="container-ac relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-rosso/20 bg-white/70 font-display text-[11px] font-extrabold text-rosso">
                03
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest2 text-rosso">
                Catalogo operativo
              </span>
            </div>
            <h2 className="h-display mt-7 max-w-3xl text-[clamp(2.5rem,5.4vw,4.7rem)] text-carbone">
              Non una vetrina.
              <br />
              <span className="text-nebbia">Il punto di partenza del tuo progetto.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="panel-cut border border-carbone/10 bg-white/80 p-6 shadow-lift-sm backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-carbone text-avorio">
                  <ClipboardList size={16} />
                </span>
                <p className="font-display text-sm font-extrabold text-carbone">Il mio progetto</p>
              </div>
              <ul className="mt-5 space-y-2.5">
                {projectBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-xs leading-relaxed text-carbone/65">
                    <Check size={13} className="mt-0.5 shrink-0 text-rosso" strokeWidth={3} />
                    {benefit}
                  </li>
                ))}
              </ul>
              <Link
                href="/progetto"
                className="group mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-carbone hover:text-rosso"
              >
                Apri il progetto
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((product, index) => (
            <Reveal key={product.slug} delay={Math.min(index * 0.04, 0.2)}>
              <ProductCard product={product} index={index} priority={index < 4} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <Link href="/catalogo" className="btn-rosso group">
              Esplora tutto il catalogo
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
