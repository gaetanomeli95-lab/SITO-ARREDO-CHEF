import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownRight, ArrowRight, Check, ClipboardList, Radio } from 'lucide-react';
import { categories, products } from '@/data/products';
import { company } from '@/data/company';

const proof = [
  { value: String(products.length), label: 'macchine connesse al catalogo' },
  { value: String(categories.length), label: 'reparti professionali' },
  { value: `${company.reviews.rating}/5`, label: 'valutazione Google' },
];

export default function Hero() {
  return (
    <section
      data-nav-theme="dark"
      className="relative isolate flex min-h-[850px] overflow-hidden bg-carbone pt-32 text-avorio lg:min-h-[100svh] lg:pt-36"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-digital-forge-v1.webp"
          alt="Cucina professionale futuristica in acciaio inox e luce rossa"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[61%_center] lg:object-center"
        />
        <div className="hero-portal-veil absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-carbone via-carbone/45 to-transparent" />
      </div>

      <div className="blueprint pointer-events-none absolute inset-0 opacity-45" />
      <div className="pointer-events-none absolute left-[7%] top-0 h-full w-px bg-gradient-to-b from-transparent via-rosso/45 to-transparent" />
      <div className="pointer-events-none absolute right-[7%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="container-ac relative z-10 flex flex-1 flex-col justify-between pb-7 lg:pb-10">
        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(310px,.52fr)] lg:py-16">
          <div className="max-w-[820px]">
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/25 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.3em] text-avorio/60 backdrop-blur-md">
                <Radio size={11} className="text-rosso" />
                AC System / Online
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-avorio/35">
                Sicilia · 38.091° N / 13.437° E
              </span>
            </div>

            <h1 className="h-display mt-8 max-w-[790px] text-[clamp(3.35rem,7.6vw,7.25rem)] text-avorio">
              Cucine professionali.
              <br />
              <span className="text-steel">Progettate come</span>{' '}
              <span className="relative inline-block text-rosso">
                sistemi.
                <span className="absolute -bottom-2 left-0 h-[3px] w-[38%] bg-rosso shadow-[0_0_20px_rgba(216,35,42,.9)]" />
              </span>
            </h1>

            <p className="mt-8 max-w-[650px] text-pretty text-base leading-relaxed text-avorio/68 md:text-lg md:leading-relaxed">
              Dalla planimetria alla prima accensione: attrezzature nuove e usate, sopralluogo,
              fornitura, montaggio e collaudo. Un&apos;unica regia per trasformare il tuo locale in
              una macchina di lavoro precisa.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/catalogo" className="btn-rosso group sm:min-w-[220px]">
                Entra nel catalogo
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link href="#processo" className="btn-ghost-light">
                Esplora il metodo
                <ArrowDownRight size={15} />
              </Link>
            </div>
          </div>

          <aside className="digital-panel hidden w-full max-w-[350px] justify-self-end p-7 backdrop-blur-xl lg:block">
            <div className="flex items-start justify-between gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-rosso/35 bg-rosso/10 text-rosso">
                <ClipboardList size={18} />
              </span>
              <span className="text-right text-[8px] font-bold uppercase leading-relaxed tracking-[0.3em] text-avorio/38">
                Workspace
                <br />
                01 / Progetto
              </span>
            </div>
            <h2 className="mt-7 font-display text-2xl font-extrabold leading-tight tracking-tight text-avorio">
              Componi il tuo impianto, macchina dopo macchina.
            </h2>
            <ul className="mt-6 space-y-3">
              {[
                'Salva prodotti e quantità',
                'Aggiungi note operative',
                'Invia una richiesta completa',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[12px] text-avorio/58">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-rosso/30 text-rosso">
                    <Check size={10} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/progetto"
              className="group mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-avorio transition-colors hover:text-rosso"
            >
              Apri workspace
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </aside>
        </div>

        <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-carbone/[0.72] shadow-[0_24px_80px_-35px_rgba(0,0,0,.9)] backdrop-blur-xl sm:grid-cols-3">
          {proof.map((item, index) => (
            <div
              key={item.label}
              className={`relative flex items-baseline gap-3 px-5 py-4 sm:px-6 ${
                index > 0 ? 'border-t border-white/10 sm:border-l sm:border-t-0' : ''
              }`}
            >
              <strong className="font-display text-2xl font-extrabold tracking-tight text-avorio">
                {item.value}
              </strong>
              <span className="text-[9px] font-bold uppercase leading-tight tracking-[0.2em] text-avorio/40">
                {item.label}
              </span>
              <span className="absolute bottom-0 left-0 h-px w-16 bg-gradient-to-r from-rosso to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
