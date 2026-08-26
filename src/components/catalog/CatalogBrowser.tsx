'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { categories, products } from '@/data/products';
import { categoryIconFor } from '@/lib/catalog';
import { track } from '@/lib/analytics';
import ProductCard from '@/components/ProductCard';

const ALL = 'Tutti i reparti';

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
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const okCat = active === ALL || p.category === active;
      const okQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return okCat && okQuery;
    });
  }, [active, query]);

  const tabs = [ALL, ...categories];

  return (
    <section
      data-nav-theme="light"
      className="relative bg-gradient-to-b from-avorio via-sabbia to-avorio pb-20 pt-12 md:pb-28 md:pt-14"
    >
      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-ac relative">
        {/* Barra strumenti */}
        <div className="sticky top-[72px] z-30 -mx-6 mb-10 border-b border-carbone/10 bg-avorio/90 px-6 py-4 backdrop-blur-xl md:-mx-10 md:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Ricerca */}
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-carbone/35"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cerca una macchina…"
                className="w-full rounded-full border border-carbone/12 bg-white py-3 pl-11 pr-10 text-sm text-carbone outline-none transition-all duration-300 placeholder:text-carbone/35 focus:border-rosso/50 focus:shadow-lift-sm"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Cancella ricerca"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-carbone/35 transition-colors hover:text-rosso"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-carbone/45">
              <SlidersHorizontal size={13} />
              {filtered.length} {filtered.length === 1 ? 'risultato' : 'risultati'}
            </div>
          </div>

          {/* Reparti */}
          <div className="relative mt-4">
            <button
              onClick={() => scrollTabs('left')}
              aria-label="Scorri a sinistra"
              className="absolute -left-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-carbone/15 bg-white/90 text-carbone/70 shadow-lift-sm backdrop-blur-sm transition-all hover:border-rosso/30 hover:text-rosso md:flex"
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
                        ? 'border-rosso bg-rosso text-white shadow-lift-sm'
                        : 'border-carbone/15 bg-white/60 text-carbone/70 hover:border-rosso/30 hover:text-carbone'
                    }`}
                  >
                    <CategoryIcon size={14} className={isActive ? 'text-white' : 'text-carbone/60'} />
                    <span className="relative">
                      {t}
                      <span className={isActive ? 'ml-1.5 text-white/70' : 'ml-1.5 text-carbone/35'}>
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
              className="absolute -right-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-carbone/15 bg-white/90 text-carbone/70 shadow-lift-sm backdrop-blur-sm transition-all hover:border-rosso/30 hover:text-rosso md:flex"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Griglia */}
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4"
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
            <p className="font-display text-2xl font-bold text-carbone">
              Nessun risultato per “{query}”.
            </p>
            <p className="mt-3 text-sm text-carbone/55">
              Non trovi quello che cerchi? Il nostro magazzino è più grande del catalogo online.
            </p>
            <button
              onClick={() => {
                setQuery('');
                setActive(ALL);
              }}
              className="btn-ghost-dark mt-8"
            >
              Azzera i filtri
            </button>
          </div>
        )}

        {/* Nota di chiusura */}
        <div className="relative mt-20 overflow-hidden rounded-3xl border border-carbone/10 bg-white p-10 text-center shadow-lift md:p-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-rosso/[0.07] blur-[90px]" />
          <h3 className="h-display relative text-2xl text-carbone md:text-3xl">
            Non vedi quello che ti serve?
          </h3>
          <p className="relative mx-auto mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-carbone/70">
            Il catalogo online è solo una parte. Trattiamo arredo inox su misura, aspirazione,
            banchi, sedie e tavoli, e abbiamo usato revisionato che ruota di continuo.
          </p>
          <a href="/contatti" className="btn-rosso relative mt-8">
            Chiedi disponibilità
          </a>
        </div>
      </div>
    </section>
  );
}
