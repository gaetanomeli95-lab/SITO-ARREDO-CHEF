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
      className={`group relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-[24px] border transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 ${
        light
          ? 'border-carbone/10 bg-white shadow-[0_20px_48px_-34px_rgba(11,13,16,.30)] hover:border-rosso/28 hover:shadow-[0_28px_60px_-36px_rgba(11,13,16,.4)]'
          : 'border-white/[0.10] bg-[#101419] shadow-[0_24px_60px_-38px_rgba(0,0,0,.85)] hover:border-rosso/35'
      }`}
    >
      <Link
        href={`/catalogo/${product.slug}`}
        aria-label={`Apri la scheda di ${product.name}`}
        className={`relative block h-[315px] w-full overflow-hidden sm:h-[290px] md:h-[270px] lg:h-[250px] xl:h-[270px] ${
          light
            ? 'bg-[linear-gradient(145deg,#fbfbfb_0%,#eef1f2_55%,#d9dee1_100%)]'
            : 'bg-[linear-gradient(145deg,#202831_0%,#151a20_55%,#0d1014_100%)]'
        }`}
      >
        <div className={`${light ? 'blueprint-light opacity-36' : 'blueprint opacity-30'} pointer-events-none absolute inset-0`} />

        <div className="absolute inset-x-[8%] bottom-[10%] top-[16%] sm:inset-x-[9%] sm:bottom-[9%] sm:top-[15%] md:inset-x-[8%] lg:inset-x-[7%]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 84vw, (max-width: 1024px) 45vw, 23vw"
            className={`object-contain object-center ${
              light
                ? 'drop-shadow-[0_18px_16px_rgba(11,13,16,.18)]'
                : 'drop-shadow-[0_22px_20px_rgba(0,0,0,.52)]'
            }`}
          />
        </div>

        <div className="absolute inset-x-4 top-4 z-10 flex items-start justify-between gap-3 sm:inset-x-5 sm:top-5">
          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.18em] ${
            light ? 'border-carbone/10 bg-white/92 text-carbone/55' : 'border-white/12 bg-[#0b0d10]/88 text-white/[0.58]'
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
            <span className="rounded-full border border-rosso/25 bg-white/88 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.16em] text-rosso">
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
          <h3 className={`font-display text-[1.2rem] font-extrabold leading-[1.04] tracking-tight transition-colors duration-200 group-hover:text-rosso sm:text-[1.3rem] ${light ? 'text-carbone' : 'text-white'}`}>
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
            className={`group/link flex min-h-11 flex-1 items-center justify-between rounded-full border px-4 text-[11px] font-bold transition-colors duration-200 ${
              light
                ? 'border-carbone/12 bg-carbone text-white hover:border-rosso hover:bg-rosso'
                : 'border-white/14 bg-white/[0.06] text-white hover:border-rosso hover:bg-rosso'
            }`}
          >
            Scheda completa
            <ArrowUpRight size={14} />
          </Link>
          <AddToProjectButton slug={product.slug} name={product.name} variant="card" tone={light ? 'light' : 'dark'} />
        </div>
      </div>

      <span className="pointer-events-none absolute left-0 top-0 h-[3px] w-[30%] bg-gradient-to-r from-rosso to-transparent transition-all duration-300 group-hover:w-[62%]" />
    </article>
  );
}
