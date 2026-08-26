'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Gauge, Layers3, Radio } from 'lucide-react';
import { products } from '@/data/products';
import { essentialSpecs, getCatalogProduct } from '@/lib/catalog';
import AddToProjectButton from '@/components/project/AddToProjectButton';
import Reveal from '@/components/Reveal';

const featuredSlugs = [
  'cucina-a-gas-4-fuochi',
  'forno-pizza-ctz',
  'banco-pizza-refrigerato-ventilato-3-porte-con-vetrina-portacondimenti',
  'abbattitore-10-teglie',
  'impastatrice-a-spirale-ip-50',
  'vetrina-refrigerata-da-banco',
];

const featured = featuredSlugs
  .map((slug) => products.find((product) => product.slug === slug))
  .filter((product): product is (typeof products)[number] => Boolean(product));

export default function FeaturedProducts() {
  const [activeIndex, setActiveIndex] = useState(0);
  const selected = featured[activeIndex] ?? featured[0];
  const catalogProduct = getCatalogProduct(selected.slug);
  const specs = catalogProduct ? essentialSpecs(catalogProduct, 5) : [];

  return (
    <section
      data-nav-theme="dark"
      className="relative overflow-hidden bg-carbone py-20 text-avorio md:py-28 lg:py-36"
    >
      <div className="blueprint pointer-events-none absolute inset-0 opacity-55" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[760px] -translate-x-1/2 rounded-full bg-rosso/[0.08] blur-[160px]" />

      <div className="container-ac relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-rosso/35 bg-rosso/10 font-display text-[11px] font-extrabold text-rosso">
                03
              </span>
              <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.36em] text-rosso">
                <Radio size={11} /> Live machine stage
              </span>
            </div>
            <h2 className="h-display mt-7 max-w-4xl text-[clamp(2.8rem,5.8vw,5.3rem)] text-avorio">
              Non una vetrina.
              <br />
              <span className="text-steel">Un ambiente da esplorare.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="border-l border-rosso/60 pl-6 text-pretty text-sm leading-relaxed text-avorio/55 md:text-base">
              Seleziona una macchina, leggi i dati disponibili e aggiungila al tuo progetto. Il
              catalogo diventa uno spazio di lavoro, non una sequenza di fotografie.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="relative mt-12 overflow-hidden rounded-[30px] border border-white/10 bg-[#08090b] shadow-[0_50px_140px_-55px_rgba(0,0,0,.95)] lg:min-h-[650px]">
            <span className="pointer-events-none absolute inset-x-10 top-0 z-20 h-px bg-gradient-to-r from-transparent via-rosso/70 to-transparent" />
            <div className="grid lg:min-h-[650px] lg:grid-cols-[190px_minmax(0,1fr)_370px]">
              <div className="relative z-20 flex gap-2 overflow-x-auto border-b border-white/10 bg-carbone/70 p-3 backdrop-blur-xl lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:p-4">
                <div className="mb-2 hidden items-center gap-2 px-2 pb-3 text-[8px] font-bold uppercase tracking-[0.3em] text-white/30 lg:flex">
                  <Layers3 size={11} className="text-rosso" /> Machine index
                </div>
                {featured.map((product, index) => {
                  const active = index === activeIndex;
                  return (
                    <button
                      key={product.slug}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-pressed={active}
                      className={`group relative flex min-w-[150px] items-center gap-3 overflow-hidden rounded-2xl border px-3 py-3 text-left transition-all duration-300 lg:min-w-0 ${
                        active
                          ? 'border-rosso/55 bg-rosso/[0.09] text-white'
                          : 'border-white/[0.07] bg-white/[0.025] text-white/45 hover:border-white/15 hover:text-white/80'
                      }`}
                    >
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-white/12 to-white/[0.02]">
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-contain p-1.5"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[8px] font-bold uppercase tracking-[0.22em] text-rosso">
                          M-{String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="mt-1 block line-clamp-2 text-[10px] font-semibold leading-snug">
                          {product.name}
                        </span>
                      </span>
                      {active && <span className="absolute bottom-0 left-3 right-3 h-px bg-rosso" />}
                    </button>
                  );
                })}
              </div>

              <div className="relative min-h-[430px] overflow-hidden lg:min-h-0">
                <Image
                  src="/images/catalog-digital-stage-v1.webp"
                  alt=""
                  fill
                  sizes="(max-width: 1023px) 100vw, 55vw"
                  className="object-cover object-center opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-[#08090b]/35" />
                <div className="blueprint pointer-events-none absolute inset-0 opacity-35" />

                <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.25em] text-white/45 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rosso shadow-[0_0_10px_rgba(216,35,42,.9)]" />
                  Object / {String(activeIndex + 1).padStart(2, '0')}
                </div>
                <span className="absolute right-5 top-5 z-10 text-[8px] font-bold uppercase tracking-[0.28em] text-white/28">
                  360° stage
                </span>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected.slug}
                    initial={{ opacity: 0, y: 24, scale: 0.92, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -12, scale: 1.04, filter: 'blur(6px)' }}
                    transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-[13%_8%_5%]"
                  >
                    <Image
                      src={selected.image}
                      alt={selected.name}
                      fill
                      priority={activeIndex === 0}
                      sizes="(max-width: 1023px) 84vw, 45vw"
                      className="object-contain drop-shadow-[0_38px_30px_rgba(0,0,0,.72)]"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="pointer-events-none absolute bottom-7 left-1/2 h-12 w-[44%] -translate-x-1/2 rounded-full bg-black/45 blur-xl" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.slug}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-20 flex flex-col border-t border-white/10 bg-carbone/88 p-6 backdrop-blur-2xl lg:border-l lg:border-t-0 lg:p-8"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-rosso">
                      Machine profile
                    </span>
                    <Gauge size={15} className="text-white/25" />
                  </div>

                  <p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.23em] text-white/32">
                    {selected.category}
                  </p>
                  <h3 className="mt-3 font-display text-[clamp(1.65rem,2.6vw,2.5rem)] font-extrabold leading-[1.02] tracking-tight text-white">
                    {selected.name}
                  </h3>

                  {specs.length > 0 ? (
                    <dl className="mt-8 border-t border-white/10">
                      {specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="grid grid-cols-[1fr_auto] gap-4 border-b border-white/10 py-3 text-[11px]"
                        >
                          <dt className="text-white/38">{spec.label}</dt>
                          <dd className="text-right font-semibold tabular-nums text-white/82">
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="mt-7 line-clamp-5 text-sm leading-relaxed text-white/48">
                      {selected.description}
                    </p>
                  )}

                  <div className="mt-auto space-y-3 pt-8">
                    <AddToProjectButton
                      slug={selected.slug}
                      name={selected.name}
                      variant="cockpit"
                      tone="dark"
                    />
                    <Link
                      href={`/catalogo/${selected.slug}`}
                      className="group flex w-full items-center justify-between rounded-full border border-white/12 px-6 py-4 text-sm font-semibold text-white/72 transition-all hover:border-rosso/50 hover:text-white"
                    >
                      Scheda completa
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-col items-center justify-between gap-5 sm:flex-row">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/28">
            {featured.length} macchine in primo piano · {products.length} nel database
          </p>
          <Link href="/catalogo" className="group inline-flex items-center gap-3 text-sm font-bold text-white hover:text-rosso">
            Esplora l&apos;intero catalogo
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-all group-hover:border-rosso/50 group-hover:bg-rosso/10">
              <ArrowRight size={15} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
