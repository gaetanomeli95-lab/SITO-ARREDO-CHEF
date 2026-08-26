'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { categories, products } from '@/data/products';
import { categoryIconFor, getCatalogProduct } from '@/lib/catalog';
import { track } from '@/lib/analytics';
import ProductCard from '@/components/ProductCard';

const ALL = 'Tutti i reparti';

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

const searchIndex = new Map(
  products.map((product) => {
    const catalogProduct = getCatalogProduct(product.slug);
    const technical = catalogProduct
      ? [catalogProduct.identity.brand, catalogProduct.identity.model, ...catalogProduct.specs.flatMap((spec) => [spec.label, spec.value])]
          .filter(Boolean)
          .join(' ')
      : '';
    return [product.slug, normalize(`${product.name} ${product.category} ${product.description} ${technical}`)] as const;
  })
);

export default function CatalogBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = searchParams.get('categoria');
  const [active, setActive] = useState<string>(initial && categories.includes(initial) ? initial : ALL);
  const [query, setQuery] = useState('');
  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (dir: 'left' | 'right') => {
    const el = tabsRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -el.clientWidth * 0.6 : el.clientWidth * 0.6, behavior: 'smooth' });
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (active !== ALL) params.set('categoria', active);
    const qs = params.toString();
    router.replace(qs ? `/catalogo?${qs}` : '/catalogo', { scroll: false });
    if (active !== ALL) track('product_filter', { category: active });
  }, [active, router]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 3) return;
    const t = window.setTimeout(() => track('product_search', { query: q }), 800);
    return () => window.clearTimeout(t);
  }, [query]);

  const filtered = useMemo(() => {
    const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
    return products.filter((p) => {
      const okCat = active === ALL || p.category === active;
      const indexed = searchIndex.get(p.slug) ?? '';
      const okQuery = terms.length === 0 || terms.every((term) => indexed.includes(term));
      return okCat && okQuery;
    });
  }, [active, query]);

  const tabs = [ALL, ...categories];

  return (
    <section data-nav-theme="light" className="relative bg-[#eef0f1] pb-20 pt-5 text-carbone sm:pt-7 md:pb-28 md:pt-10">
      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#d7dbde]/75 to-transparent" />
      <div className="container-ac relative">
        <div className="relative z-20 -mx-2 mb-6 overflow-hidden rounded-[18px] border border-white/10 bg-[#11151a]/[0.96] px-2.5 py-2.5 text-white shadow-[0_20px_55px_-32px_rgba(0,0,0,.68)] backdrop-blur-2xl sm:-mx-3 sm:mb-8 sm:rounded-[20px] sm:px-4 sm:py-3 md:sticky md:top-[96px] md:z-30 md:rounded-[22px] lg:top-[86px] lg:-mx-4 lg:px-5 lg:py-4">
          <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-rosso/80 to-transparent" />

          <div className="flex items-center gap-2.5 lg:gap-4">
            <div className="relative min-w-0 flex-1 lg:max-w-lg">
              <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/[0.48] sm:left-4" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cerca macchina, potenza o formato…"
                className="w-full rounded-full border border-white/16 bg-white/[0.07] py-2.5 pl-10 pr-9 text-[13px] text-white outline-none transition-all placeholder:text-white/[0.46] focus:border-rosso/70 focus:bg-white/[0.10] focus:shadow-[0_0_0_4px_rgba(216,35,42,.10)] sm:py-3 sm:pl-11 sm:pr-10 sm:text-sm lg:py-3.5"
              />
              {query && (
                <button onClick={() => setQuery('')} aria-label="Cancella ricerca" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/[0.5] transition-colors hover:text-rosso sm:right-3.5">
                  <X size={15} />
                </button>
              )}
            </div>

            <div aria-live="polite" className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.05] px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/[0.72] sm:px-4 sm:text-xs sm:tracking-widest lg:py-3">
              <SlidersHorizontal size={12} className="text-rosso" />
              <span>{filtered.length}</span>
              <span className="hidden sm:inline">{filtered.length === 1 ? 'risultato' : 'risultati'}</span>
            </div>
          </div>

          <p className="hidden pt-2 pl-4 text-[10px] font-medium tracking-[0.08em] text-white/[0.5] lg:block">
            Cerca anche nelle specifiche: “18 kW”, “GN 1/1” o un modello.
          </p>

          <div className="relative mt-2 sm:mt-2.5 lg:mt-4">
            <button onClick={() => scrollTabs('left')} aria-label="Scorri a sinistra" className="absolute -left-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-[#11151a]/95 text-white/70 transition-all hover:border-rosso/55 hover:text-rosso md:flex"><ChevronLeft size={16} /></button>
            <div ref={tabsRef} className="no-scrollbar -mx-3 flex gap-1.5 overflow-x-auto px-3 sm:-mx-5 sm:gap-2 sm:px-5 md:-mx-10 md:px-10">
              {tabs.map((t) => {
                const isActive = t === active;
                const count = t === ALL ? products.length : products.filter((p) => p.category === t).length;
                const CategoryIcon = categoryIconFor(t);
                return (
                  <button key={t} onClick={() => setActive(t)} className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all duration-300 sm:min-h-10 sm:px-4 sm:py-2 sm:text-[13px] ${isActive ? 'border-rosso bg-rosso text-white shadow-[0_10px_35px_-15px_rgba(216,35,42,.75)]' : 'border-white/14 bg-white/[0.05] text-white/[0.72] hover:border-white/28 hover:bg-white/[0.09] hover:text-white'}`}>
                    <CategoryIcon size={13} className={isActive ? 'text-white' : 'text-white/[0.58]'} />
                    {t}
                    <span className={isActive ? 'text-white/[0.78]' : 'text-white/[0.45]'}>{count}</span>
                  </button>
                );
              })}
            </div>
            <button onClick={() => scrollTabs('right')} aria-label="Scorri a destra" className="absolute -right-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-[#11151a]/95 text-white/70 transition-all hover:border-rosso/55 hover:text-rosso md:flex"><ChevronRight size={16} /></button>
          </div>
        </div>

        {filtered.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div key={p.slug} layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4, delay: Math.min(i * 0.025, 0.3), ease: [0.16, 1, 0.3, 1] }}>
                  <ProductCard product={p} index={i} priority={i < 8} tone="light" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-24 text-center">
            <p className="font-display text-2xl font-bold text-carbone">Nessun risultato per “{query}”.</p>
            <p className="mt-3 text-sm text-carbone/58">Non trovi quello che cerchi? Il nostro magazzino è più grande del catalogo online.</p>
            <button onClick={() => { setQuery(''); setActive(ALL); }} className="btn-ghost-dark mt-8">Azzera i filtri</button>
          </div>
        )}

        <div className="relative mt-16 overflow-hidden rounded-[24px] border border-carbone/10 bg-[#d9dde0] p-7 text-center shadow-[0_30px_70px_-45px_rgba(11,13,16,.48)] sm:mt-20 sm:rounded-[28px] sm:p-10 md:p-14">
          <div className="blueprint-light pointer-events-none absolute inset-0 opacity-35" />
          <span className="absolute left-0 top-0 h-[3px] w-24 bg-rosso" />
          <h3 className="h-display relative text-2xl text-carbone md:text-3xl">Non vedi quello che ti serve?</h3>
          <p className="relative mx-auto mt-4 max-w-lg text-pretty text-[14px] leading-relaxed text-carbone/65 sm:text-[15px]">Il catalogo online è solo una parte. Trattiamo arredo inox su misura, aspirazione, banchi, sedie e tavoli, e usato revisionato che ruota di continuo.</p>
          <Link href="/contatti" className="btn-rosso relative mt-7 sm:mt-8">Chiedi disponibilità</Link>
        </div>
      </div>
    </section>
  );
}
