'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Gauge, Radio } from 'lucide-react';
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
  const number = String((index ?? 0) + 1).padStart(2, '0');

  return (
    <article
      data-product-index={index}
      className={`group relative flex h-full min-h-[410px] flex-col overflow-hidden rounded-[24px] border transition-all duration-500 ease-smooth hover:-translate-y-1 ${
        light
          ? 'border-carbone/10 bg-white shadow-[0_28px_65px_-42px_rgba(11,13,16,.38)] hover:border-rosso/30 hover:shadow-[0_38px_85px_-45px_rgba(11,13,16,.5)]'
          : 'border-white/[0.10] bg-[#101419] shadow-[0_28px_80px_-44px_rgba(0,0,0,.95)] hover:border-rosso/40'
      }`}
    >
      <Link
        href={`/catalogo/${product.slug}`}
        aria-label={`Apri la scheda di ${product.name}`}
        className={`relative block aspect-[4/3] w-full overflow-hidden ${
          light
            ? 'bg-[linear-gradient(145deg,#fbfbfb_0%,#eef1f2_55%,#d9dee1_100%)]'
            : 'bg-[linear-gradient(145deg,#202831_0%,#151a20_55%,#0d1014_100%)]'
        }`}
      >
        <div className={`${light ? 'blueprint-light opacity-42' : 'blueprint opacity-35'} pointer-events-none absolute inset-0`} />
        <div className={`pointer-events-none absolute inset-x-[22%] bottom-[11%] h-7 rounded-full blur-xl transition-colors ${light ? 'bg-carbone/10 group-hover:bg-rosso/[0.12]' : 'bg-black/55 group-hover:bg-rosso/[0.16]'}`} />

        <div className="absolute inset-[13%_10%_12%] sm:inset-[12%_11%_11%]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-contain object-center transition-transform duration-700 ease-smooth group-hover:scale-[1.035] ${
              light
                ? 'drop-shadow-[0_26px_22px_rgba(11,13,16,.22)]'
                : 'drop-shadow-[0_30px_26px_rgba(0,0,0,.62)]'
            }`}
          />
        </div>

        <div className="absolute inset-x-4 top-4 z-10 flex items-start justify-between gap-3 sm:inset-x-5 sm:top-5">
          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.18em] backdrop-blur-md ${
            light ? 'border-carbone/10 bg-white/78 text-carbone/55' : 'border-white/12 bg-black/28 text-white/[0.58]'
          }`}>
            <Radio size={9} className="text-rosso" /> Arredo Chef
          </span>
          <span className={`font-display text-[2.8rem] font-black leading-none ${light ? 'text-carbone/[0.055]' : 'text-white/[0.045]'}`}>
            {number}
          </span>
        </div>

        <div className="absolute inset-x-4 bottom-4 z-10 flex items-end justify-between gap-3 sm:inset-x-5 sm:bottom-5">
          <span className={`max-w-[70%] truncate text-[8px] font-bold uppercase tracking-[0.18em] ${light ? 'text-carbone/50' : 'text-white/[0.52]'}`}>
            {shortCategory(product.category)}
          </span>
          {modeBadge && (
            <span className="rounded-full border border-rosso/25 bg-rosso/[0.08] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.16em] text-rosso backdrop-blur-md">
              {modeBadge}
            </span>
          )}
        </div>
      </Link>

      <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <span className={`text-[8px] font-bold uppercase tracking-[0.22em] ${light ? 'text-carbone/38' : 'text-white/[0.38]'}`}>
            Scheda macchina
          </span>
          <Gauge size={14} className="text-rosso" />
        </div>

        <Link href={`/catalogo/${product.slug}`} className="mt-3 block outline-none focus-visible:text-rosso">
          <h3 className={`font-display text-[1.2rem] font-extrabold leading-[1.04] tracking-tight transition-colors duration-300 group-hover:text-rosso sm:text-[1.3rem] ${light ? 'text-carbone' : 'text-white'}`}>
            {product.name}
          </h3>
        </Link>

        {specs.length > 0 ? (
          <dl className={`mt-5 overflow-hidden rounded-[16px] border ${light ? 'border-carbone/10 bg-[#f4f6f6]' : 'border-white/10 bg-white/[0.035]'}`}>
            {specs.map((spec, i) => (
              <div
                key={spec.label}
                className={`grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-3 text-[11px] ${i > 0 ? light ? 'border-t border-carbone/[0.07]' : 'border-t border-white/[0.07]' : ''}`}
              >
                <dt className={light ? 'text-carbone/48' : 'text-white/[0.48]'}>{spec.label}</dt>
                <dd className={`text-right font-extrabold tabular-nums ${light ? 'text-carbone/82' : 'text-white/[0.88]'}`}>
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className={`mt-5 line-clamp-3 text-[12px] leading-relaxed ${light ? 'text-carbone/58' : 'text-white/[0.58]'}`}>
            {product.description}
          </p>
        )}

        <div className={`mt-auto flex items-center gap-3 border-t pt-5 ${light ? 'border-carbone/10' : 'border-white/10'}`}>
          <Link
            href={`/catalogo/${product.slug}`}
            className={`group/link flex min-h-11 flex-1 items-center justify-between rounded-full border px-4 text-[11px] font-bold transition-all ${
              light
                ? 'border-carbone/12 bg-carbone text-white hover:border-rosso hover:bg-rosso'
                : 'border-white/14 bg-white/[0.06] text-white hover:border-rosso hover:bg-rosso'
            }`}
          >
            Scheda completa
            <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
          <AddToProjectButton slug={product.slug} name={product.name} variant="card" tone={light ? 'light' : 'dark'} />
        </div>
      </div>

      <span className="pointer-events-none absolute left-0 top-0 h-[3px] w-[30%] bg-gradient-to-r from-rosso to-transparent transition-all duration-500 group-hover:w-[62%]" />
    </article>
  );
}
