'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Plus, Radio } from 'lucide-react';
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
      className={`group relative grid h-full overflow-hidden rounded-[22px] border transition-colors duration-200 ${
        light
          ? 'border-carbone/10 bg-[#f7f8f8] hover:border-rosso/35'
          : 'border-white/10 bg-[#101419] hover:border-rosso/40'
      }`}
    >
      <div className={`flex items-center justify-between gap-4 border-b px-5 py-3.5 ${light ? 'border-carbone/10 bg-white/65' : 'border-white/10 bg-white/[0.025]'}`}>
        <div className="flex items-center gap-2.5">
          <Radio size={10} className="text-rosso" />
          <span className={`text-[8px] font-bold uppercase tracking-[0.24em] ${light ? 'text-carbone/48' : 'text-white/[0.48]'}`}>
            Arredo Chef · M-{number}
          </span>
        </div>
        {modeBadge && (
          <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-rosso">{modeBadge}</span>
        )}
      </div>

      <Link
        href={`/catalogo/${product.slug}`}
        aria-label={`Apri la scheda di ${product.name}`}
        className={`relative block h-[300px] overflow-hidden sm:h-[280px] lg:h-[310px] ${
          light
            ? 'bg-[linear-gradient(150deg,#ffffff_0%,#edf0f1_62%,#d7dcdf_100%)]'
            : 'bg-[linear-gradient(150deg,#252d35_0%,#151a20_58%,#0d1014_100%)]'
        }`}
      >
        <div className={`${light ? 'blueprint-light opacity-32' : 'blueprint opacity-28'} pointer-events-none absolute inset-0`} />
        <span className={`absolute right-5 top-3 font-display text-[5.2rem] font-black leading-none ${light ? 'text-carbone/[0.035]' : 'text-white/[0.035]'}`}>{number}</span>

        <div className="absolute inset-x-[10%] bottom-[8%] top-[9%] sm:inset-x-[11%] lg:inset-x-[12%]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 639px) 80vw, (max-width: 1023px) 42vw, 28vw"
            className={`object-contain object-center ${light ? 'drop-shadow-[0_20px_18px_rgba(11,13,16,.18)]' : 'drop-shadow-[0_24px_22px_rgba(0,0,0,.56)]'}`}
          />
        </div>

        <span className={`absolute bottom-4 left-5 max-w-[70%] truncate text-[8px] font-bold uppercase tracking-[0.2em] ${light ? 'text-carbone/44' : 'text-white/[0.48]'}`}>
          {shortCategory(product.category)}
        </span>
      </Link>

      <div className="flex flex-col p-5 sm:p-6">
        <Link href={`/catalogo/${product.slug}`} className="block">
          <h3 className={`font-display text-[1.35rem] font-extrabold leading-[1.02] tracking-tight transition-colors duration-200 group-hover:text-rosso sm:text-[1.45rem] ${light ? 'text-carbone' : 'text-white'}`}>
            {product.name}
          </h3>
        </Link>

        {specs.length > 0 ? (
          <dl className={`mt-5 grid grid-cols-3 border-y ${light ? 'border-carbone/10' : 'border-white/10'}`}>
            {specs.map((spec, i) => (
              <div key={spec.label} className={`min-w-0 py-4 ${i > 0 ? light ? 'border-l border-carbone/10 pl-3' : 'border-l border-white/10 pl-3' : 'pr-3'}`}>
                <dt className={`truncate text-[7px] font-bold uppercase tracking-[0.14em] ${light ? 'text-carbone/36' : 'text-white/[0.36]'}`}>{spec.label}</dt>
                <dd className={`mt-1.5 truncate text-[11px] font-extrabold tabular-nums ${light ? 'text-carbone/78' : 'text-white/[0.86]'}`}>{spec.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className={`mt-4 line-clamp-2 text-[12px] leading-relaxed ${light ? 'text-carbone/56' : 'text-white/[0.56]'}`}>{product.description}</p>
        )}

        <div className="mt-5 grid grid-cols-[1fr_46px] gap-3">
          <Link
            href={`/catalogo/${product.slug}`}
            className={`group/link flex min-h-12 items-center justify-between rounded-full px-5 text-[11px] font-bold transition-colors ${
              light ? 'bg-carbone text-white hover:bg-rosso' : 'border border-white/12 bg-white/[0.05] text-white hover:border-rosso hover:bg-rosso'
            }`}
          >
            Apri scheda macchina
            <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
          <div className="flex items-center justify-center">
            <AddToProjectButton slug={product.slug} name={product.name} variant="card" tone={light ? 'light' : 'dark'} />
          </div>
        </div>
      </div>

      <span className="pointer-events-none absolute left-0 top-0 h-[2px] w-[34%] bg-gradient-to-r from-rosso to-transparent" />
    </article>
  );
}
