'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categories, products, countByCategory } from '@/data/products';
import { categoryIconFor } from '@/lib/catalog';
import Reveal from '@/components/Reveal';

/** Immagine rappresentativa del reparto */
function coverFor(category: string) {
  return products.find((p) => p.category === category)?.image ?? '/images/hero-1.webp';
}

export default function CategoriesSection() {
  const ordered = [...categories]
    .sort((a, b) => countByCategory(b) - countByCategory(a))
    .slice(0, 6);

  return (
    <section
      data-nav-theme="dark"
      className="relative overflow-hidden bg-[#11151a] py-20 text-avorio md:py-28 lg:py-36"
    >
      {/* Fondale: acciaio e luce, non un altro blocco nero pieno */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-reparti.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.18] saturate-0 [filter:contrast(1.18)_brightness(.72)]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#171c22]/95 via-[#1a2027]/82 to-[#0b0d10]/96" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_25%,rgba(255,255,255,.10),transparent_28%),radial-gradient(circle_at_18%_72%,rgba(216,35,42,.10),transparent_24%)]" />
      </div>
      <div className="blueprint pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[82%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="container-ac relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-rosso/35 bg-rosso/10 font-display text-[11px] font-extrabold text-rosso shadow-[0_0_24px_rgba(216,35,42,.12)]">
                02
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.36em] text-rosso">
                System map · I reparti
              </span>
            </div>

            <h2 className="h-display mt-7 max-w-4xl text-[clamp(2.8rem,5.6vw,5rem)] text-avorio">
              Ogni macchina al suo posto,
              <br />
              <span className="text-steel">prima ancora di accenderla.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border-l border-rosso/60 pl-6">
              <p className="text-pretty text-sm leading-relaxed text-white/58 md:text-base">
                Esplora il catalogo per reparto. Ogni area raccoglie macchine, funzioni e soluzioni
                pensate per costruire il flusso operativo del locale.
              </p>
              <Link
                href="/catalogo"
                className="group mt-6 inline-flex items-center gap-3 text-sm font-bold text-white transition-colors hover:text-rosso"
              >
                Tutti i reparti
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] transition-all group-hover:border-rosso/50 group-hover:bg-rosso/10">
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {ordered.map((cat, i) => {
            const count = countByCategory(cat);
            const CategoryIcon = categoryIconFor(cat);
            const span =
              i === 0 ? 'lg:col-span-7' : i === 1 ? 'lg:col-span-5' : 'lg:col-span-3';
            const tall = i < 2;

            return (
              <Reveal key={cat} delay={Math.min(i * 0.06, 0.3)} className={span}>
                <Link
                  href={`/catalogo?categoria=${encodeURIComponent(cat)}`}
                  className={`group relative flex h-full min-h-[310px] overflow-hidden rounded-[26px] border border-white/10 bg-[#171c22]/90 shadow-[0_32px_90px_-44px_rgba(0,0,0,.95)] transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-rosso/35 hover:shadow-[0_42px_110px_-46px_rgba(0,0,0,1)] ${
                    tall ? 'lg:min-h-[430px]' : 'lg:min-h-[340px]'
                  }`}
                >
                  {/* Stage fotografico */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#303844]/70 via-[#151a20]/70 to-[#090b0e]" />
                    <div className="blueprint pointer-events-none absolute inset-0 opacity-30" />
                    <Image
                      src={coverFor(cat)}
                      alt={cat}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 58vw"
                      className={`object-contain transition-all duration-700 ease-smooth group-hover:scale-[1.055] ${
                        tall ? 'p-8 pb-24 lg:p-12 lg:pb-28' : 'p-7 pb-24 lg:p-8 lg:pb-24'
                      } drop-shadow-[0_30px_26px_rgba(0,0,0,.72)]`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090b0e] via-[#090b0e]/20 to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.045] to-transparent" />
                  </div>

                  {/* Firma red-line */}
                  <span className="absolute left-0 top-0 z-20 h-px w-[44%] origin-left bg-gradient-to-r from-rosso via-rosso/70 to-transparent shadow-[0_0_16px_rgba(216,35,42,.48)] transition-all duration-500 group-hover:w-[72%]" />

                  {/* Telemetria */}
                  <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.24em] text-white/48 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-rosso shadow-[0_0_9px_rgba(216,35,42,.9)]" />
                    Dept / {String(i + 1).padStart(2, '0')}
                  </div>

                  <span className="absolute right-5 top-4 z-10 font-display text-[clamp(3.8rem,7vw,6.5rem)] font-black leading-none tracking-tight text-white/[0.055] transition-colors duration-500 group-hover:text-white/[0.085]">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Pannello informativo */}
                  <div className="relative z-20 mt-auto w-full border-t border-white/10 bg-[#0b0d10]/72 px-5 py-5 backdrop-blur-xl sm:px-6 lg:px-7 lg:py-6">
                    <div className="flex items-end justify-between gap-5">
                      <div className="min-w-0">
                        <div className="mb-3 flex items-center gap-2 text-rosso">
                          <CategoryIcon size={17} strokeWidth={1.8} />
                          <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-white/35">
                            {count} {count === 1 ? 'unità' : 'unità'}
                          </span>
                        </div>
                        <h3 className="font-display text-[clamp(1.25rem,2vw,1.8rem)] font-extrabold leading-none tracking-tight text-white">
                          {cat}
                        </h3>
                      </div>

                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/65 transition-all duration-300 group-hover:border-rosso group-hover:bg-rosso group-hover:text-white group-hover:shadow-[0_0_24px_rgba(216,35,42,.28)]">
                        <ArrowUpRight
                          size={15}
                          strokeWidth={2.3}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-8 flex items-center justify-between gap-6 border-t border-white/10 pt-6">
            <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/28">
              Arredo Chef / Department architecture
            </p>
            <span className="hidden h-px flex-1 bg-gradient-to-r from-white/10 to-transparent sm:block" />
            <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/28">
              {categories.length} reparti totali
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
