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

export default function ProductCard({
  product,
  index,
  priority = false,
  tone = 'dark',
}: {
  product: Product;
  index?: number;
  priority?: boolean;
  tone?: 'light' | 'dark';
}) {
  const cp = getCatalogProduct(product.slug);
  const specs = cp ? essentialSpecs(cp, 3) : [];
  const modeBadge = cp ? commercialModeBadge[cp.commercial.mode] : null;
  const light = tone === 'light';

  return (
    <article
      data-product-index={index}
      className={`group relative flex h-full min-h-[230px] overflow-hidden rounded-2xl border transition-all duration-500 ease-smooth hover:-translate-y-1.5 sm:flex-col ${
        light
          ? 'border-carbone/10 bg-white shadow-[0_24px_55px_-38px_rgba(11,13,16,.34)] hover:border-rosso/35 hover:shadow-[0_30px_70px_-38px_rgba(11,13,16,.48)]'
          : 'border-white/[0.09] bg-gradient-to-br from-[#1a1e24] via-grafite to-[#0a0c0f] shadow-[0_24px_70px_-38px_rgba(0,0,0,.95)] hover:border-rosso/45 hover:shadow-[0_32px_85px_-35px_rgba(216,35,42,.38)]'
      }`}
    >
      <Link
        href={`/catalogo/${product.slug}`}
        aria-label={`Apri la scheda di ${product.name}`}
        className={`relative block w-[42%] shrink-0 overflow-hidden sm:aspect-square sm:w-full ${
          light
            ? 'bg-gradient-to-br from-white via-[#f3f4f4] to-[#dfe3e5]'
            : 'bg-gradient-to-br from-white/[0.08] via-transparent to-black/25'
        }`}
      >
        <div className={`${light ? 'blueprint-light opacity-45' : 'blueprint opacity-55'} pointer-events-none absolute inset-0`} />
        <div className={`pointer-events-none absolute inset-x-[16%] bottom-[8%] h-8 rounded-full blur-xl transition-all duration-500 ${light ? 'bg-carbone/10 group-hover:bg-rosso/12' : 'bg-rosso/15 group-hover:bg-rosso/25'}`} />
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 639px) 42vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-contain p-4 transition-transform duration-700 ease-smooth group-hover:scale-[1.07] sm:p-6 ${
            light ? 'drop-shadow-[0_22px_18px_rgba(11,13,16,.20)]' : 'drop-shadow-[0_24px_22px_rgba(0,0,0,.58)]'
          }`}
        />

        <span className={`absolute left-2.5 top-2.5 z-10 max-w-[75%] truncate rounded-full border px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest backdrop-blur-md sm:left-3 sm:top-3 sm:text-[9px] ${
          light ? 'border-carbone/10 bg-white/80 text-carbone/58' : 'border-white/10 bg-black/35 text-white/55'
        }`}>
          {shortCategory(product.category)}
        </span>

        {modeBadge && (
          <span className="absolute bottom-2.5 left-2.5 z-10 rounded-full border border-rosso/30 bg-rosso/10 px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest text-rosso backdrop-blur-md sm:bottom-auto sm:left-auto sm:right-3 sm:top-3 sm:text-[9px]">
            {modeBadge}
          </span>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
        <Link href={`/catalogo/${product.slug}`} className="outline-none focus-visible:text-rosso">
          <h3 className={`font-display text-[15px] font-extrabold leading-snug tracking-tight transition-colors duration-300 group-hover:text-rosso sm:text-[16px] ${light ? 'text-carbone' : 'text-avorio'}`}>
            {product.name}
          </h3>
        </Link>

        {specs.length > 0 ? (
          <dl className="mt-3 space-y-1.5">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className={`flex items-baseline justify-between gap-3 border-b pb-1.5 text-[11px] leading-relaxed sm:text-[12px] ${
                  light ? 'border-carbone/[0.08]' : 'border-white/[0.07]'
                }`}
              >
                <dt className={light ? 'text-carbone/52' : 'text-white/48'}>{spec.label}</dt>
                <dd className={`text-right font-semibold tabular-nums ${light ? 'text-carbone/82' : 'text-white/82'}`}>
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className={`mt-3 line-clamp-3 text-[12px] leading-relaxed sm:line-clamp-2 sm:text-[13px] ${light ? 'text-carbone/58' : 'text-white/52'}`}>
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <Link
            href={`/catalogo/${product.slug}`}
            className={`group/link inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-rosso sm:text-[11px] ${light ? 'text-carbone/68' : 'text-white/72'}`}
          >
            Scheda tecnica
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </Link>
          <AddToProjectButton slug={product.slug} name={product.name} variant="card" tone={light ? 'light' : 'dark'} />
        </div>
      </div>

      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-rosso to-rosso/50 transition-all duration-500 ease-smooth group-hover:w-full" />
      <span className={`pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t transition-colors group-hover:border-rosso/65 ${light ? 'border-carbone/12' : 'border-white/15'}`} />
    </article>
  );
}
