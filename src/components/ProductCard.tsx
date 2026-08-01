'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Product } from '@/data/products';

function shortCategory(c: string) {
  return c.replace(' professionali', '').replace(' professionale', '');
}

export default function ProductCard({
  product,
  index,
  priority = false,
}: {
  product: Product;
  index?: number;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/catalogo/${product.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-carbone/15 bg-white shadow-lift-sm transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-rosso/30 hover:shadow-lift"
    >
      {/* Immagine */}
      <div className="relative aspect-square overflow-hidden bg-sabbia/50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-4 transition-transform duration-700 ease-smooth group-hover:scale-105"
        />
      </div>

      {/* Badge categoria */}
      <span className="absolute left-2.5 top-2.5 z-10 rounded-full border border-carbone/15 bg-white/90 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-carbone/70 backdrop-blur-sm sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[9px]">
        {shortCategory(product.category)}
      </span>

      {/* Badge tipo */}
      <span className="absolute right-2.5 top-2.5 z-10 rounded-full bg-rosso/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-rosso sm:right-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[9px]">
        Preventivo
      </span>

      {/* Testo */}
      <div className="flex flex-1 flex-col px-4 py-3.5 sm:px-5 sm:py-4">
        <h3 className="font-display text-[14px] font-bold leading-snug tracking-tight text-carbone sm:text-[15px]">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-carbone/70 sm:text-[13px]">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3 sm:pt-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-rosso">
            Scheda e preventivo
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-carbone/[0.06] text-carbone/70 transition-all duration-300 group-hover:bg-rosso group-hover:text-white">
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </Link>
  );
}
