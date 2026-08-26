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
  // Show top 6 categories by product count
  const ordered = [...categories].sort(
    (a, b) => countByCategory(b) - countByCategory(a)
  ).slice(0, 6);

  return (
    <section
      data-nav-theme="light"
      className="relative overflow-hidden bg-avorio py-16 md:py-24 lg:py-32"
    >
      {/* Immagine di sfondo */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-reparti.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25 [filter:brightness(1.1)]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-avorio/80 via-avorio/60 to-avorio/80" />
      </div>
      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -right-40 top-20 h-[26rem] w-[26rem] rounded-full bg-rosso/[0.05] blur-[130px]" />

      <div className="container-ac relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-rosso/20 bg-white/70 font-display text-[11px] font-extrabold text-rosso">
                02
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest2 text-rosso">
                I reparti
              </span>
            </div>
            <h2 className="h-display mt-7 max-w-3xl text-[clamp(2.5rem,5.4vw,4.7rem)] text-carbone">
              Ogni macchina al suo posto,
              <br />
              <span className="text-nebbia">prima ancora di accenderla.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <Link href="/catalogo" className="btn-ghost-dark group">
              Vedi tutte le categorie
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {ordered.map((cat, i) => {
            const count = countByCategory(cat);
            const CategoryIcon = categoryIconFor(cat);
            const span = i === 0 ? 'lg:col-span-7' : i === 1 ? 'lg:col-span-5' : 'lg:col-span-3';
            return (
              <Reveal key={cat} delay={Math.min(i * 0.06, 0.3)} className={span}>
                <Link
                  href={`/catalogo?categoria=${encodeURIComponent(cat)}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-carbone/10 bg-white shadow-lift-sm transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-rosso/25 hover:shadow-lift"
                >
                  {/* Immagine */}
                  <div className="relative h-[230px] overflow-hidden bg-gradient-to-br from-white via-avorio to-cemento/60 lg:h-[285px]">
                    <div className="blueprint-light pointer-events-none absolute inset-0 opacity-45" />
                    <Image
                      src={coverFor(cat)}
                      alt={cat}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 58vw"
                      className="object-contain p-7 transition-transform duration-700 ease-smooth group-hover:scale-[1.06] lg:p-9"
                    />
                    <span className="absolute right-5 top-4 font-display text-5xl font-black tracking-tight text-carbone/[0.055]">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Filo brace */}
                  <span className="absolute inset-x-0 top-0 h-px w-full origin-left scale-x-0 bg-rosso transition-transform duration-600 ease-smooth group-hover:scale-x-100" />

                  {/* Footer card */}
                  <div className="flex flex-1 items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-center gap-2">
                      <CategoryIcon size={18} className="shrink-0 text-rosso" />
                      <div>
                        <h3 className="font-display text-[15px] font-extrabold leading-tight tracking-tight text-carbone sm:text-[17px]">
                          {cat}
                        </h3>
                        <p className="mt-1 text-xs text-carbone/60">
                          {count} {count === 1 ? 'prodotto' : 'prodotti'}
                        </p>
                      </div>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-carbone/[0.06] text-carbone/70 transition-all duration-300 group-hover:bg-rosso group-hover:text-white">
                      <ArrowUpRight size={14} strokeWidth={2.5} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
