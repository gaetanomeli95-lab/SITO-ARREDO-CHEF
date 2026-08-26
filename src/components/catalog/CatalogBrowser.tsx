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
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

const searchIndex = new Map(
  products.map((product) => {
    const catalogProduct = getCatalogProduct(product.slug);
    const technical = catalogProduct
      ? [
          catalogProduct.identity.brand,
          catalogProduct.identity.model,
          ...catalogProduct.specs.flatMap((spec) => [spec.label, spec.value]),
        ]
          .filter(Boolean)
          .join(' ')
      : '';

    return [
      product.slug,
      normalize(`${product.name} ${product.category} ${product.description} ${technical}`),
    ] as const;
  })
);

export default function CatalogBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = searchParams.get('categoria');

  const [active, setActive] = useState<string>(
    initial && categories.includes(initial) ? initial : ALL
  );
  const [query, setQuery] = useState('');
  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (dir: 'left' | 'right') => {
    const el = tabsRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  // Tiene l'URL allineato al filtro, senza ricaricare la pagina
  useEffect(() => {
    const params = new URLSearchParams();
    if (active !== ALL) params.set('categoria', active);
    const qs = params.toString();
    router.replace(qs ? `/catalogo?${qs}` : '/catalogo', { scroll: false });
    if (active !== ALL) track('product_filter', { category: active });
  }, [active, router]);

  // Traccia la ricerca con debounce, senza rumore per ogni tasto
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
    <section
      data-nav-theme="dark"
      className="relative bg-gradient-to-b from-carbone via-[#10141a] to-carbone pb-20 pt-10 text-avorio md:pb-28 md:pt-12"
    >
      <div className="blueprint pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[76vw] -translate-x-1/2 bg-rosso/[0.045] blur-[150px]" />
      <div className="container-ac relative">
        {/* Barra strumenti */}
        <div className="sticky top-[106px] z-30 -mx-3 mb-10 overflow-hidden rounded-[22px] border border-white/10 bg-carbone/[0.88] px-3 py-4 shadow-[0_28px_70px_-35px_rgba(0,0,0,.95)] backdrop-blur-2xl md:-mx-4 md:px-5 lg:top-[86px]">
          <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-rosso/70 to-transparent" />
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Ricerca */}
            <div className="w-full lg:max-w-lg">
              <div className="relative">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cerca macchina, potenza o formato…"
                  className="w-full rounded-full border border-white/12 bg-white/[0.045] py-3.5 pl-11 pr-10 text-sm text-avorio outline-none transition-all duration-300 placeholder:text-white/28 focus:border-rosso/60 focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_rgba(216,35,42,.08)]"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    aria-label="Cancella ricerca"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-rosso"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
              <p className="mt-2 pl-4 text-[9px] font-medium uppercase tracking-[0.16em] text-white/28">
                Cerca anche nelle specifiche: per esempio “18 kW”, “GN 1/1” o un modello.
              </p>
            </div>

            <div
              aria-live="polite"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/38"
            >
              <SlidersHorizontal size={13} />
              {filtered.length} {filtered.length === 1 ? 'risultato' : 'risultati'}
            </div>
          </div>

          {/* Reparti */}
          <div className="relative mt-4">
            <button
              onClick={() => scrollTabs('left')}
              aria-label="Scorri a sinistra"
              className="absolute -left-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-carbone/90 text-white/55 shadow-lift-sm backdrop-blur-sm transition-all hover:border-rosso/45 hover:text-rosso md:flex"
            >
              <ChevronLeft size={16} />
            </button>
            <div
              ref={tabsRef}
              className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 md:-mx-10 md:px-10"
            >
              {tabs.map((t) => {
                const isActive = t === active;
                const count =
                  t === ALL ? products.length : products.filter((p) => p.category === t).length;
                const CategoryIcon = categoryIconFor(t);

                return (
                  <button
                    key={t}
                    onClick={() => setActive(t)}
                    className={`relative inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2.5 text-[13px] font-medium transition-all duration-300 ${
                      isActive
                        ? 'border-rosso bg-rosso text-white shadow-[0_10px_35px_-15px_rgba(216,35,42,.75)]'
                        : 'border-white/10 bg-white/[0.035] text-white/55 hover:border-rosso/35 hover:bg-white/[0.065] hover:text-white'
                    }`}
                  >
                    <CategoryIcon size={14} className={isActive ? 'text-white' : 'text-white/35'} />
                    <span className="relative">
                      {t}
                      <span className={isActive ? 'ml-1.5 text-white/70' : 'ml-1.5 text-white/25'}>
                        {count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => scrollTabs('right')}
              aria-label="Scorri a destra"
              className="absolute -right-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-carbone/90 text-white/55 shadow-lift-sm backdrop-blur-sm transition-all hover:border-rosso/45 hover:text-rosso md:flex"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Griglia */}
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(i * 0.025, 0.3),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <ProductCard product={p} index={i} priority={i < 8} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-24 text-center">
            <p className="font-display text-2xl font-bold text-avorio">
              Nessun risultato per “{query}”.
            </p>
            <p className="mt-3 text-sm text-white/45">
              Non trovi quello che cerchi? Il nostro magazzino è più grande del catalogo online.
            </p>
            <button
              onClick={() => {
                setQuery('');
                setActive(ALL);
              }}
              className="btn-ghost-light mt-8"
            >
              Azzera i filtri
            </button>
          </div>
        )}

        {/* Nota di chiusura */}
        <div className="digital-panel relative mt-20 overflow-hidden p-10 text-center shadow-[0_35px_100px_-45px_rgba(0,0,0,.95)] md:p-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-rosso/[0.13] blur-[90px]" />
          <h3 className="h-display relative text-2xl text-avorio md:text-3xl">
            Non vedi quello che ti serve?
          </h3>
          <p className="relative mx-auto mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-white/50">
            Il catalogo online è solo una parte. Trattiamo arredo inox su misura, aspirazione,
            banchi, sedie e tavoli, e abbiamo usato revisionato che ruota di continuo.
          </p>
          <Link href="/contatti" className="btn-rosso relative mt-8">
            Chiedi disponibilità
          </Link>
        </div>
      </div>
    </section>
  );
}
