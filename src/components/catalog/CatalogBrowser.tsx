'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
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
  const [filtersOpen, setFiltersOpen] = useState(false);

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
  const ActiveIcon = categoryIconFor(active);
  const activeCount = active === ALL ? products.length : products.filter((p) => p.category === active).length;

  const selectCategory = (category: string) => {
    setActive(category);
    setFiltersOpen(false);
  };

  return (
    <section data-nav-theme="light" className="relative bg-[#eef0f1] pb-20 pt-5 text-carbone sm:pt-7 md:pb-28 md:pt-10">
      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-28" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#d7dbde]/72 to-transparent" />

      <div className="container-ac relative">
        <div className="relative z-20 mb-7 overflow-hidden rounded-[24px] border border-carbone/10 bg-[#f7f8f8]/95 shadow-[0_24px_60px_-42px_rgba(11,13,16,.38)] md:mb-9 lg:sticky lg:top-[92px] lg:z-30 lg:rounded-[28px]">
          <span className="pointer-events-none absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r from-transparent via-rosso/80 to-transparent" />

          <div className="grid gap-3 p-3 sm:p-4 lg:grid-cols-[minmax(320px,1fr)_auto_auto] lg:items-center lg:gap-4 lg:p-5">
            <div className="relative min-w-0">
              <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-carbone/38" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cerca macchina, potenza, formato o modello…"
                className="w-full rounded-[18px] border border-carbone/12 bg-white py-3.5 pl-11 pr-10 text-[13px] text-carbone outline-none transition-colors placeholder:text-carbone/38 focus:border-rosso/45 sm:text-sm lg:py-4"
              />
              {query && (
                <button onClick={() => setQuery('')} aria-label="Cancella ricerca" className="absolute right-3.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-carbone/40 hover:bg-carbone/[0.04] hover:text-rosso">
                  <X size={15} />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setFiltersOpen((open) => !open)}
              aria-expanded={filtersOpen}
              className="flex min-h-[54px] items-center justify-between gap-5 rounded-[18px] border border-carbone/12 bg-[#e7eaeb] px-4 text-left transition-colors hover:border-rosso/25 hover:bg-white lg:min-w-[270px]"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] ${active === ALL ? 'bg-rosso text-white' : 'bg-carbone text-white'}`}><ActiveIcon size={15} /></span>
                <span className="min-w-0"><span className="block text-[8px] font-bold uppercase tracking-[0.2em] text-carbone/38">Reparto</span><span className="mt-1 block truncate text-[12px] font-extrabold text-carbone sm:text-[13px]">{active}</span></span>
              </span>
              <span className="flex shrink-0 items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-carbone/48">Cambia <ChevronDown size={15} className={`transition-transform duration-200 ${filtersOpen ? 'rotate-180' : ''}`} /></span>
            </button>

            <div aria-live="polite" className="flex min-h-[54px] items-center justify-between gap-4 rounded-[18px] border border-carbone/10 bg-carbone px-4 text-white lg:min-w-[150px]">
              <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-white/55"><SlidersHorizontal size={13} className="text-rosso" /> Risultati</span>
              <span className="font-display text-2xl font-extrabold tabular-nums">{filtered.length}</span>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {filtersOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden border-t border-carbone/10">
                <div className="grid grid-cols-2 gap-px bg-carbone/10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {tabs.map((t) => {
                    const isActive = t === active;
                    const count = t === ALL ? products.length : products.filter((p) => p.category === t).length;
                    const CategoryIcon = categoryIconFor(t);
                    return (
                      <button key={t} type="button" onClick={() => selectCategory(t)} className={`min-h-[86px] bg-[#f7f8f8] p-4 text-left transition-colors hover:bg-white ${isActive ? '!bg-[#171c22] text-white' : 'text-carbone'}`}>
                        <div className="flex items-center justify-between gap-3"><CategoryIcon size={15} className={isActive ? 'text-rosso' : 'text-carbone/45'} /><span className={`text-[9px] font-bold ${isActive ? 'text-white/45' : 'text-carbone/30'}`}>{count}</span></div>
                        <span className="mt-4 block line-clamp-2 text-[11px] font-extrabold leading-tight">{t}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="hidden items-center justify-between gap-6 border-t border-carbone/10 px-5 py-3 lg:flex">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-carbone/38">Cerca anche nelle specifiche: 18 kW · GN 1/1 · modello</p>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-carbone/38">{activeCount} nel reparto selezionato</p>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {filtered.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} priority={i < 3} tone="light" />
            ))}
          </div>
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
