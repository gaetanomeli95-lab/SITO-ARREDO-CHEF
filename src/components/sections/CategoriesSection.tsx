'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categories, products, countByCategory } from '@/data/products';
import { categoryIconFor } from '@/lib/catalog';
import Reveal from '@/components/Reveal';

function coverFor(category: string) {
  return products.find((p) => p.category === category)?.image ?? '/images/hero-1.webp';
}

export default function CategoriesSection() {
  const ordered = [...categories]
    .sort((a, b) => countByCategory(b) - countByCategory(a))
    .slice(0, 6);

  return (
    <section
      data-nav-theme="light"
      className="relative overflow-hidden bg-[#dfe3e5] py-20 text-carbone md:py-28 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-reparti.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.09] saturate-0 [filter:contrast(1.1)_brightness(1.08)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.94)_0%,rgba(229,232,234,.88)_42%,rgba(196,202,207,.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_22%,rgba(255,255,255,.9),transparent_26%),radial-gradient(circle_at_15%_78%,rgba(216,35,42,.06),transparent_23%)]" />
      </div>
      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-45" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-carbone/15 to-transparent" />

      <div className="container-ac relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-carbone/15 bg-white/65 font-display text-[11px] font-extrabold text-rosso shadow-[0_14px_35px_-20px_rgba(11,13,16,.45)]">
                02
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-rosso">
                I reparti
              </span>
            </div>
            <h2 className="h-display mt-7 max-w-4xl text-[clamp(2.8rem,5.6vw,5rem)] text-carbone">
              Ogni macchina al suo posto,
              <br />
              <span className="text-[#68717b]">prima ancora di accenderla.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border-l border-rosso/70 pl-6">
              <p className="text-pretty text-sm leading-relaxed text-carbone/72 md:text-base">
                Entra dal reparto giusto e restringi subito il campo. Cottura, freddo, lavaggio e
                preparazione restano leggibili anche quando il catalogo cresce.
              </p>
              <Link
                href="/catalogo"
                className="group mt-6 inline-flex items-center gap-3 text-sm font-bold text-carbone transition-colors hover:text-rosso"
              >
                Tutti i reparti
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-carbone/15 bg-white/55 transition-all group-hover:border-rosso/50 group-hover:bg-white">
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
                  className={`group relative flex h-full min-h-[310px] overflow-hidden rounded-[26px] border border-carbone/10 bg-[#252c33] shadow-[0_35px_75px_-45px_rgba(11,13,16,.72)] transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-rosso/35 hover:shadow-[0_45px_95px_-45px_rgba(11,13,16,.82)] ${
                    tall ? 'lg:min-h-[430px]' : 'lg:min-h-[340px]'
                  }`}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4b5660]/55 via-[#293139]/65 to-[#15191e]" />
                    <div className="blueprint pointer-events-none absolute inset-0 opacity-24" />
                    <Image
                      src={coverFor(cat)}
                      alt={cat}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 58vw"
                      className={`object-contain transition-all duration-700 ease-smooth group-hover:scale-[1.055] ${
                        tall ? 'p-8 pb-24 lg:p-12 lg:pb-28' : 'p-7 pb-24 lg:p-8 lg:pb-24'
                      } drop-shadow-[0_30px_24px_rgba(0,0,0,.58)]`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111419] via-[#111419]/15 to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/[0.10] to-transparent" />
                  </div>

                  <span className="absolute left-0 top-0 z-20 h-px w-[38%] bg-gradient-to-r from-rosso via-rosso/60 to-transparent transition-all duration-500 group-hover:w-[64%]" />
                  <span className="absolute right-5 top-4 z-10 font-display text-[clamp(3.8rem,7vw,6.5rem)] font-black leading-none text-white/[0.07]">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative z-20 mt-auto w-full border-t border-white/12 bg-[#111419]/72 px-5 py-5 backdrop-blur-xl sm:px-6 lg:px-7 lg:py-6">
                    <div className="flex items-end justify-between gap-5">
                      <div className="min-w-0">
                        <div className="mb-3 flex items-center gap-2 text-rosso">
                          <CategoryIcon size={17} strokeWidth={1.8} />
                          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/55">
                            {count} {count === 1 ? 'prodotto' : 'prodotti'}
                          </span>
                        </div>
                        <h3 className="font-display text-[clamp(1.25rem,2vw,1.8rem)] font-extrabold leading-none tracking-tight text-white">
                          {cat}
                        </h3>
                      </div>

                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/18 bg-white/[0.06] text-white/80 transition-all duration-300 group-hover:border-rosso group-hover:bg-rosso group-hover:text-white">
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
          <div className="mt-8 flex items-center justify-between gap-6 border-t border-carbone/12 pt-6">
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-carbone/42">
              Reparti principali
            </p>
            <span className="hidden h-px flex-1 bg-gradient-to-r from-carbone/10 to-transparent sm:block" />
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-carbone/42">
              {categories.length} reparti totali
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
