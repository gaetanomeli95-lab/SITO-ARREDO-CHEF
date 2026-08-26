'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Gauge, Layers3, Radio } from 'lucide-react';
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

  const stepMachine = (dir: -1 | 1) => {
    setActiveIndex((current) => (current + dir + featured.length) % featured.length);
  };

  return (
    <section data-nav-theme="dark" className="relative overflow-hidden bg-carbone py-16 text-avorio sm:py-20 md:py-28 lg:py-36">
      <div className="blueprint pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-0 hidden h-[560px] w-[760px] -translate-x-1/2 rounded-full bg-rosso/[0.08] blur-[150px] md:block" />

      <div className="container-ac relative">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
          <Reveal>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-rosso/35 bg-rosso/10 font-display text-[10px] font-extrabold text-rosso sm:h-10 sm:w-10 sm:text-[11px]">03</span>
              <span className="inline-flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.27em] text-rosso sm:text-[9px] sm:tracking-[0.36em]">
                <Radio size={10} /> Arredo Chef · Live machine stage
              </span>
            </div>
            <h2 className="h-display mt-6 max-w-4xl text-[clamp(2.45rem,10vw,4rem)] text-avorio sm:mt-7 sm:text-[clamp(2.8rem,5.8vw,5.3rem)]">
              Non una vetrina.<br /><span className="text-steel">Un ambiente da esplorare.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="border-l border-rosso/60 pl-5 text-pretty text-[13px] leading-relaxed text-white/[0.72] sm:pl-6 sm:text-sm md:text-base">
              Seleziona una macchina, leggi i dati disponibili e aggiungila al tuo progetto. Il catalogo diventa uno spazio di lavoro, non una sequenza di fotografie.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="relative mt-8 overflow-hidden rounded-[24px] border border-white/12 bg-[#08090b] shadow-[0_30px_80px_-48px_rgba(0,0,0,.9)] sm:mt-12 sm:rounded-[30px] lg:min-h-[650px] lg:shadow-[0_45px_120px_-55px_rgba(0,0,0,.95)]">
            <span className="pointer-events-none absolute inset-x-8 top-0 z-20 h-px bg-gradient-to-r from-transparent via-rosso/70 to-transparent sm:inset-x-10" />
            <div className="grid lg:min-h-[650px] lg:grid-cols-[190px_minmax(0,1fr)_370px]">
              <div className="relative z-20 border-b border-white/10 bg-[#11151a] p-3 lg:hidden">
                <div className="grid grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-3">
                  <button type="button" onClick={() => stepMachine(-1)} aria-label="Macchina precedente" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/[0.78] active:border-rosso active:text-rosso">
                    <ChevronLeft size={18} />
                  </button>

                  <button type="button" onClick={() => stepMachine(1)} className="flex min-w-0 items-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.045] px-3 py-2.5 text-left">
                    <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-white/[0.07]">
                      <Image src={selected.image} alt="" fill sizes="44px" className="object-contain p-1.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[8px] font-bold uppercase tracking-[0.22em] text-rosso">M-{String(activeIndex + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}</span>
                      <span className="mt-1 block truncate text-[11px] font-bold text-white">{selected.name}</span>
                    </span>
                  </button>

                  <button type="button" onClick={() => stepMachine(1)} aria-label="Macchina successiva" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/[0.78] active:border-rosso active:text-rosso">
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-6 gap-1.5" aria-label="Seleziona macchina">
                  {featured.map((product, index) => (
                    <button
                      key={product.slug}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Macchina ${index + 1}: ${product.name}`}
                      aria-pressed={index === activeIndex}
                      className={`h-1.5 rounded-full transition-colors duration-150 ${index === activeIndex ? 'bg-rosso' : 'bg-white/15'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="relative z-20 hidden gap-2 border-r border-white/10 bg-carbone/80 p-4 backdrop-blur-xl lg:flex lg:flex-col">
                <div className="mb-2 flex items-center gap-2 px-2 pb-3 text-[8px] font-bold uppercase tracking-[0.3em] text-white/[0.42]">
                  <Layers3 size={11} className="text-rosso" /> Machine index
                </div>
                {featured.map((product, index) => {
                  const active = index === activeIndex;
                  return (
                    <button key={product.slug} type="button" onClick={() => setActiveIndex(index)} aria-pressed={active}
                      className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl border px-3 py-3 text-left transition-all duration-300 ${active ? 'border-rosso/55 bg-rosso/[0.10] text-white' : 'border-white/[0.08] bg-white/[0.03] text-white/[0.64] hover:border-white/18 hover:text-white'}`}>
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-white/12 to-white/[0.02]">
                        <Image src={product.image} alt="" fill sizes="48px" className="object-contain p-1.5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[8px] font-bold uppercase tracking-[0.22em] text-rosso">M-{String(index + 1).padStart(2, '0')}</span>
                        <span className="mt-1 block line-clamp-2 text-[10px] font-semibold leading-snug">{product.name}</span>
                      </span>
                      {active && <span className="absolute bottom-0 left-3 right-3 h-px bg-rosso" />}
                    </button>
                  );
                })}
              </div>

              <div className="relative min-h-[360px] overflow-hidden sm:min-h-[430px] lg:min-h-0">
                <Image src="/images/catalog-digital-stage-v1.webp" alt="" fill sizes="(max-width: 1023px) 100vw, 55vw" className="object-cover object-center opacity-86" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-[#08090b]/30" />
                <div className="blueprint pointer-events-none absolute inset-0 opacity-24" />
                <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/12 bg-[#0b0d10]/85 px-3 py-2 text-[7px] font-bold uppercase tracking-[0.2em] text-white/[0.62] sm:left-5 sm:top-5 sm:text-[8px] sm:tracking-[0.25em]">
                  <span className="h-1.5 w-1.5 rounded-full bg-rosso" />Macchina / {String(activeIndex + 1).padStart(2, '0')}
                </div>

                {featured.map((product, index) => (
                  <div
                    key={product.slug}
                    aria-hidden={index !== activeIndex}
                    className={`absolute inset-x-[12%] bottom-[7%] top-[17%] transition-[opacity,transform] duration-200 sm:inset-x-[11%] sm:bottom-[7%] sm:top-[14%] lg:inset-x-[10%] lg:bottom-[7%] lg:top-[12%] ${index === activeIndex ? 'scale-100 opacity-100' : 'pointer-events-none scale-[0.985] opacity-0'}`}
                  >
                    <Image
                      src={product.image}
                      alt={index === activeIndex ? product.name : ''}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1023px) 76vw, 45vw"
                      className="object-contain object-center drop-shadow-[0_24px_22px_rgba(0,0,0,.65)] lg:drop-shadow-[0_34px_28px_rgba(0,0,0,.72)]"
                    />
                  </div>
                ))}
              </div>

              <div className="relative z-20 flex flex-col border-t border-white/10 bg-[#11151a] p-5 sm:p-6 lg:border-l lg:border-t-0 lg:bg-carbone/92 lg:p-8 lg:backdrop-blur-2xl">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[8px] font-bold uppercase tracking-[0.24em] text-rosso">Scheda rapida</span>
                  <Gauge size={15} className="text-white/[0.35]" />
                </div>
                <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/[0.52] sm:mt-8 sm:tracking-[0.23em]">{selected.category}</p>
                <h3 className="mt-2 font-display text-[clamp(1.55rem,7vw,2.25rem)] font-extrabold leading-[1.02] tracking-tight text-white sm:mt-3 sm:text-[clamp(1.65rem,2.6vw,2.5rem)]">{selected.name}</h3>

                {specs.length > 0 ? (
                  <dl className="mt-5 border-t border-white/12 sm:mt-8">
                    {specs.map((spec, i) => (
                      <div key={spec.label} className={`grid grid-cols-[1fr_auto] gap-4 border-b border-white/10 py-2.5 text-[11px] sm:py-3 ${i >= 3 ? 'hidden sm:grid' : ''}`}>
                        <dt className="text-white/[0.58]">{spec.label}</dt><dd className="text-right font-semibold tabular-nums text-white/[0.92]">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="mt-5 line-clamp-4 text-[13px] leading-relaxed text-white/[0.66] sm:mt-7 sm:text-sm">{selected.description}</p>
                )}

                <div className="mt-6 grid gap-3 sm:mt-8">
                  <AddToProjectButton slug={selected.slug} name={selected.name} variant="cockpit" tone="dark" emphasis="primary" />
                  <Link href={`/catalogo/${selected.slug}`} className="group flex min-h-12 w-full items-center justify-between rounded-full border border-white/20 bg-[#eef0f1] px-6 py-3.5 text-sm font-bold text-carbone transition-all hover:border-white hover:bg-white sm:py-4">
                    Scheda completa <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:mt-8 sm:flex-row sm:items-center sm:gap-5">
          <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/[0.46] sm:text-[9px] sm:tracking-[0.3em]">{featured.length} macchine in primo piano · {products.length} nel catalogo</p>
          <Link href="/catalogo" className="group inline-flex items-center gap-3 text-sm font-bold text-white hover:text-rosso">Esplora l&apos;intero catalogo <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/16 transition-all group-hover:border-rosso/50 group-hover:bg-rosso/10"><ArrowRight size={15} /></span></Link>
        </div>
      </div>
    </section>
  );
}
