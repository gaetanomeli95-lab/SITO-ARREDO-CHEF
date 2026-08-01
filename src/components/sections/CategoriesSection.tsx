'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categories, products, countByCategory } from '@/data/products';
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
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <span className="eyebrow text-rosso">I reparti</span>
            <h2 className="h-display mt-6 max-w-xl text-[clamp(2rem,4.5vw,3.5rem)] text-carbone">
              Tutto quello che serve,
              <br />
              <span className="text-nebbia">reparto per reparto.</span>
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

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {ordered.map((cat, i) => {
            const count = countByCategory(cat);
            return (
              <Reveal key={cat} delay={Math.min(i * 0.06, 0.3)}>
                <Link
                  href={`/catalogo?categoria=${encodeURIComponent(cat)}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-carbone/15 bg-white shadow-lift-sm transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-rosso/25 hover:shadow-lift"
                >
                  {/* Immagine */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-sabbia/40">
                    <Image
                      src={coverFor(cat)}
                      alt={cat}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-6 transition-transform duration-700 ease-smooth group-hover:scale-105"
                    />
                  </div>

                  {/* Filo brace */}
                  <span className="absolute inset-x-0 top-0 h-px w-full origin-left scale-x-0 bg-rosso transition-transform duration-600 ease-smooth group-hover:scale-x-100" />

                  {/* Footer card */}
                  <div className="flex flex-1 items-center justify-between px-4 py-3.5 sm:px-5 sm:py-4">
                    <div>
                      <h3 className="font-display text-[14px] font-bold leading-tight tracking-tight text-carbone sm:text-[15px]">
                        {cat}
                      </h3>
                      <p className="mt-1 text-xs text-carbone/60">
                        {count} {count === 1 ? 'prodotto' : 'prodotti'}
                      </p>
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
