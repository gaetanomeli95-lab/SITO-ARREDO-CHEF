'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Product } from '@/data/products';
import { commercialModeBadge, essentialSpecs, getCatalogProduct } from '@/lib/catalog';
import AddToProjectButton from '@/components/project/AddToProjectButton';

function shortCategory(category: string) {
  return category.replace(' professionali', '').replace(' professionale', '');
}

/**
 * Card catalogo con azioni semanticamente separate: la scheda prodotto è un
 * link, mentre “aggiungi al progetto” resta un pulsante indipendente.
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
    <article
      data-product-index={index}
      className="group relative flex h-full min-h-[220px] overflow-hidden rounded-2xl border border-carbone/10 bg-white shadow-lift-sm transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:border-rosso/30 hover:shadow-ember sm:flex-col"
    >
      <Link
        href={`/catalogo/${product.slug}`}
        aria-label={`Apri la scheda di ${product.name}`}
        className="relative block w-[42%] shrink-0 overflow-hidden bg-gradient-to-br from-white via-avorio to-cemento/55 sm:aspect-square sm:w-full"
      >
        <div className="blueprint-light pointer-events-none absolute inset-0 opacity-45" />
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 639px) 42vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-4 transition-transform duration-700 ease-smooth group-hover:scale-[1.06] sm:p-6"
        />

        <span className="absolute left-2.5 top-2.5 z-10 max-w-[75%] truncate rounded-full border border-carbone/10 bg-white/90 px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest text-carbone/65 backdrop-blur-md sm:left-3 sm:top-3 sm:text-[9px]">
          {shortCategory(product.category)}
        </span>

        {modeBadge && (
          <span className="absolute bottom-2.5 left-2.5 z-10 rounded-full bg-carbone px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest text-avorio sm:bottom-auto sm:left-auto sm:right-3 sm:top-3 sm:text-[9px]">
            {modeBadge}
          </span>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
        <Link href={`/catalogo/${product.slug}`} className="outline-none focus-visible:text-rosso">
          <h3 className="font-display text-[15px] font-extrabold leading-snug tracking-tight text-carbone transition-colors duration-300 group-hover:text-rosso sm:text-[16px]">
            {product.name}
          </h3>
        </Link>

        {specs.length > 0 ? (
          <dl className="mt-3 space-y-1.5">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-baseline justify-between gap-3 border-b border-carbone/[0.06] pb-1.5 text-[11px] leading-relaxed sm:text-[12px]"
              >
                <dt className="text-carbone/45">{spec.label}</dt>
                <dd className="text-right font-semibold tabular-nums text-carbone/80">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mt-3 line-clamp-3 text-[12px] leading-relaxed text-carbone/60 sm:line-clamp-2 sm:text-[13px]">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <Link
            href={`/catalogo/${product.slug}`}
            className="group/link inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-carbone transition-colors hover:text-rosso sm:text-[11px]"
          >
            Scheda tecnica
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </Link>
          <AddToProjectButton slug={product.slug} name={product.name} variant="card" />
        </div>
      </div>

      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-rosso to-rosso/50 transition-all duration-500 ease-smooth group-hover:w-full" />
    </article>
  );
}
