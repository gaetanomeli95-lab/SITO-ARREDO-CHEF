'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Minus, Plus, Trash2 } from 'lucide-react';
import { company } from '@/data/company';
import { getCatalogProduct, projectFacts, type CatalogProduct } from '@/lib/catalog';
import { projectActions, useProjectItems } from '@/lib/project/store';
import { track } from '@/lib/analytics';
import ContactForm from '@/components/ContactForm';

/**
 * MY PROJECT — pagina del progetto (MVP client-side).
 * Lista macchine, quantità, note, fatti tecnici deterministici e
 * richiesta preventivo con riepilogo incluso. Persistenza: localStorage.
 */
export default function ProjectView() {
  const items = useProjectItems();
  const [showQuote, setShowQuote] = useState(false);

  const resolved = items
    .map((item) => ({ item, product: getCatalogProduct(item.slug) }))
    .filter((r): r is { item: (typeof items)[number]; product: CatalogProduct } =>
      Boolean(r.product)
    );

  if (resolved.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-2xl font-bold text-carbone">
          Il tuo progetto è ancora vuoto.
        </p>
        <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-carbone/60">
          Sfoglia il catalogo e usa «+ Aggiungi al progetto» su ogni macchina che ti
          interessa. Poi da qui richiedi un preventivo unico per tutto.
        </p>
        <Link href="/catalogo" className="btn-rosso mt-8">
          Sfoglia il catalogo
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const facts = projectFacts(
    resolved.map((r) => ({ product: r.product, qty: r.item.qty }))
  );

  const summaryLines = resolved.map((r) => {
    const note = r.item.note ? ` (nota: ${r.item.note})` : '';
    return `- ${r.item.qty}× ${r.product.identity.name} [${r.product.identity.category}]${note}`;
  });

  const summaryText = [
    'Buongiorno,',
    '',
    'vorrei un preventivo per il seguente progetto:',
    '',
    ...summaryLines,
    '',
    'Tipo di locale: ',
    'Città: ',
    'Nuovo, usato o entrambi: ',
    'Tempistiche: ',
  ].join('\n');

  const whatsappText = encodeURIComponent(
    ['Buongiorno Arredo Chef, vi scrivo per un preventivo su questo progetto:', ...summaryLines].join(
      '\n'
    )
  );
  const whatsappHref = `https://wa.me/${company.phones.admin.tel.replace('+', '')}?text=${whatsappText}`;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
      {/* Lista macchine */}
      <div>
        <ul className="space-y-4">
          {resolved.map(({ item, product }) => (
            <li
              key={item.slug}
              className="relative flex gap-4 rounded-2xl border border-carbone/12 bg-white p-4 shadow-lift-sm sm:gap-5 sm:p-5"
            >
              {/* Red Line laterale */}
              <span className="absolute inset-y-4 left-0 w-[2px] rounded-full bg-rosso/60" />

              <Link
                href={`/catalogo/${item.slug}`}
                className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-sabbia/50 sm:h-24 sm:w-24"
              >
                <Image
                  src={product.assets.primaryImage}
                  alt={product.identity.name}
                  fill
                  sizes="96px"
                  className="object-contain p-2"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-carbone/45">
                  {product.identity.category}
                </p>
                <Link
                  href={`/catalogo/${item.slug}`}
                  className="mt-0.5 block font-display text-[15px] font-bold leading-snug text-carbone transition-colors hover:text-rosso"
                >
                  {product.identity.name}
                </Link>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {/* Quantità */}
                  <div className="flex items-center gap-1 rounded-full border border-carbone/15">
                    <button
                      type="button"
                      onClick={() => projectActions.setQty(item.slug, item.qty - 1)}
                      aria-label={`Riduci quantità di ${product.identity.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-carbone/60 transition-colors hover:text-rosso"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-6 text-center text-sm font-bold tabular-nums text-carbone">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => projectActions.setQty(item.slug, item.qty + 1)}
                      aria-label={`Aumenta quantità di ${product.identity.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-carbone/60 transition-colors hover:text-rosso"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => projectActions.remove(item.slug)}
                    aria-label={`Rimuovi ${product.identity.name} dal progetto`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-carbone/45 transition-colors hover:text-rosso"
                  >
                    <Trash2 size={13} />
                    Rimuovi
                  </button>
                </div>

                <input
                  type="text"
                  value={item.note ?? ''}
                  onChange={(e) => projectActions.setNote(item.slug, e.target.value)}
                  placeholder="Nota per questa macchina (opzionale)…"
                  aria-label={`Nota per ${product.identity.name}`}
                  className="mt-3 w-full rounded-lg border border-carbone/10 bg-avorio/60 px-3 py-2 text-[12px] text-carbone outline-none transition-colors placeholder:text-carbone/35 focus:border-rosso/40"
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between">
          <Link
            href="/catalogo"
            className="text-sm font-semibold text-carbone/60 transition-colors hover:text-rosso"
          >
            ← Continua a sfogliare
          </Link>
          <button
            type="button"
            onClick={() => projectActions.clear()}
            className="text-xs font-semibold text-carbone/40 transition-colors hover:text-rosso"
          >
            Svuota progetto
          </button>
        </div>
      </div>

      {/* Riepilogo + preventivo */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl border border-carbone/12 bg-white p-6 shadow-lift sm:p-8">
          <h2 className="h-display text-xl text-carbone">Dati del progetto</h2>

          <dl className="mt-5 space-y-3">
            {facts.map((f) => (
              <div
                key={f.label}
                className="flex items-baseline justify-between gap-3 border-b border-carbone/[0.07] pb-3"
              >
                <dt className="text-[12px] text-carbone/55">
                  {f.label}
                  {f.note && (
                    <span className="mt-0.5 block text-[10px] text-carbone/40">{f.note}</span>
                  )}
                </dt>
                <dd className="text-sm font-bold tabular-nums text-carbone">{f.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 text-[11px] leading-relaxed text-carbone/45">
            I dati mostrati derivano solo dalle specifiche dichiarate a catalogo. Il
            dimensionamento definitivo di impianti e assorbimenti viene verificato in
            sopralluogo.
          </p>

          {!showQuote && (
            <button
              type="button"
              onClick={() => {
                setShowQuote(true);
                track('quote_started', { items: resolved.length });
              }}
              className="btn-rosso mt-6 w-full"
            >
              Richiedi preventivo del progetto
              <ArrowRight size={16} />
            </button>
          )}

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('whatsapp_project_share', { items: resolved.length })}
            className="btn-ghost-dark mt-3 w-full"
          >
            Invia il progetto su WhatsApp
          </a>
        </div>

        {showQuote && (
          <div className="mt-6">
            <ContactForm initialMessage={summaryText} quoteContext="project" />
          </div>
        )}
      </div>
    </div>
  );
}
