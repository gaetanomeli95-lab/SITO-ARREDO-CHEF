'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Product } from '@/data/products';
import { commercialModeBadge, essentialSpecs, getCatalogProduct } from '@/lib/catalog';
import AddToProjectButton from '@/components/project/AddToProjectButton';

function shortCategory(c: string) {
  return c.replace(' professionali', '').replace(' professionale', '');
}

/**
 * PRODUCT CARD 2.0 — e-commerce ready.
 * Lo stato commerciale arriva dai dati (mai hardcodato); le specifiche
 * essenziali sostituiscono la descrizione quando esistono dati reali.
 */
export default function ProductCard({
  product,
  index,
  priority = false,
}: {
  product: Product;
  index?: number;
  priority?: boolean;
}) {
  const cp = getCatalogProduct(product.slug);
  const specs = cp ? essentialSpecs(cp, 3) : [];
  const modeBadge = cp ? commercialModeBadge[cp.commercial.mode] : null;

  return (
    <Link
      href={`/catalogo/${product.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-carbone/10 bg-white shadow-lift-sm transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:border-rosso/30 hover:shadow-ember"
    >
      {/* Immagine */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-avorio via-sabbia to-cemento/60">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-5 transition-transform duration-700 ease-smooth group-hover:scale-105"
        />
      </div>

      {/* Badge categoria */}
      <span className="absolute left-2.5 top-2.5 z-10 rounded-full border border-carbone/15 bg-white/90 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-carbone/70 backdrop-blur-sm sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[9px]">
        {shortCategory(product.category)}
      </span>

      {/* Badge stato commerciale (data-driven) */}
      {modeBadge && (
        <span className="absolute right-2.5 top-2.5 z-10 rounded-full bg-rosso/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-rosso sm:right-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[9px]">
          {modeBadge}
        </span>
      )}

      {/* Testo */}
      <div className="flex flex-1 flex-col px-4 py-3.5 sm:px-5 sm:py-4">
        <h3 className="font-display text-[14px] font-bold leading-snug tracking-tight text-carbone sm:text-[15px]">
          {product.name}
        </h3>

        {specs.length > 0 ? (
          <ul className="mt-2 space-y-1">
            {specs.map((s) => (
              <li
                key={s.label}
                className="flex items-baseline justify-between gap-2 text-[11px] leading-relaxed sm:text-[12px]"
              >
                <span className="text-carbone/50">{s.label}</span>
                <span className="text-right font-semibold tabular-nums text-carbone/80">
                  {s.value}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-carbone/70 sm:text-[13px]">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-3 sm:pt-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-rosso">
            Scheda e preventivo
          </span>
          <span className="flex items-center gap-1.5">
            <AddToProjectButton slug={product.slug} name={product.name} variant="card" />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-carbone/[0.06] text-carbone/70 transition-all duration-300 group-hover:bg-rosso group-hover:text-white">
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </span>
          </span>
        </div>
      </div>
    {/* Red Line — accents the card on hover */}
    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-rosso to-rosso/60 transition-all duration-500 ease-smooth group-hover:w-full" />
    </Link>
  );
}
