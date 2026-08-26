import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownRight, ArrowRight, Check, ClipboardList, Radio } from 'lucide-react';
import { categories, products } from '@/data/products';
import { company } from '@/data/company';

const proof = [
  { value: String(products.length), label: 'macchine a catalogo' },
  { value: String(categories.length), label: 'reparti professionali' },
  { value: `${company.reviews.rating}/5`, label: 'valutazione Google' },
];

export default function Hero() {
  return (
    <section
      data-nav-theme="dark"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-carbone pt-28 text-avorio sm:min-h-[820px] sm:pt-32 lg:min-h-[100svh] lg:pt-36"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-digital-forge-v1.webp"
          alt="Cucina professionale in acciaio inox Arredo Chef"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[64%_center] sm:object-[61%_center] lg:object-center"
        />
        <div className="hero-portal-veil absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-carbone via-carbone/45 to-transparent sm:h-48" />
      </div>

      <div className="blueprint pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute left-[7%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-rosso/45 to-transparent sm:block" />
      <div className="pointer-events-none absolute right-[7%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent sm:block" />

      <div className="container-ac relative z-10 flex flex-1 flex-col justify-between pb-5 sm:pb-7 lg:pb-10">
        <div className="grid flex-1 items-center gap-8 py-7 sm:py-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(310px,.52fr)] lg:py-16">
          <div className="max-w-[820px]">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-black/30 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.25em] text-avorio/72 backdrop-blur-md sm:px-4 sm:text-[9px] sm:tracking-[0.3em]">
                <Radio size={10} className="text-rosso" />
                Arredo Chef / Online
              </span>
              <span className="hidden text-[9px] font-bold uppercase tracking-[0.28em] text-avorio/42 sm:inline">
                Professional kitchen systems · Sicilia
              </span>
            </div>

            <h1 className="h-display mt-6 max-w-[790px] text-[clamp(2.85rem,12vw,5.3rem)] text-avorio sm:mt-8 sm:text-[clamp(3.35rem,7.6vw,7.25rem)]">
              Cucine professionali.
              <br />
              <span className="text-steel">Progettate come</span>{' '}
              <span className="relative inline-block text-rosso">
                sistemi.
                <span className="absolute -bottom-1.5 left-0 h-[3px] w-[38%] bg-rosso shadow-[0_0_20px_rgba(216,35,42,.9)] sm:-bottom-2" />
              </span>
            </h1>

            <p className="mt-6 max-w-[650px] text-pretty text-[14px] leading-relaxed text-avorio/76 sm:mt-8 sm:text-base md:text-lg md:leading-relaxed">
              Dalla planimetria alla prima accensione: attrezzature nuove e usate, sopralluogo,
              fornitura, montaggio e collaudo. Un&apos;unica regia Arredo Chef per trasformare il locale
              in una macchina di lavoro precisa.
            </p>

            <div className="mt-7 grid gap-3 sm:mt-9 sm:flex sm:flex-wrap">
              <Link href="/catalogo" className="btn-rosso group w-full sm:w-auto sm:min-w-[220px]">
                Entra nel catalogo
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="#processo" className="btn-ghost-light w-full sm:w-auto">
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
              <span className="text-right text-[8px] font-bold uppercase leading-relaxed tracking-[0.3em] text-avorio/45">
                Arredo Chef
                <br />
                Project workspace
              </span>
            </div>
            <h2 className="mt-7 font-display text-2xl font-extrabold leading-tight tracking-tight text-avorio">
              Componi il tuo impianto, macchina dopo macchina.
            </h2>
            <ul className="mt-6 space-y-3">
              {['Salva prodotti e quantità', 'Aggiungi note operative', 'Invia una richiesta completa'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[12px] text-avorio/68">
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
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </aside>
        </div>

        <div className="grid overflow-hidden rounded-2xl border border-white/12 bg-carbone/[0.76] shadow-[0_24px_80px_-35px_rgba(0,0,0,.9)] backdrop-blur-xl grid-cols-3">
          {proof.map((item, index) => (
            <div
              key={item.label}
              className={`relative flex min-w-0 flex-col justify-center px-3 py-3.5 sm:flex-row sm:items-baseline sm:gap-3 sm:px-6 sm:py-4 ${
                index > 0 ? 'border-l border-white/10' : ''
              }`}
            >
              <strong className="font-display text-xl font-extrabold tracking-tight text-avorio sm:text-2xl">
                {item.value}
              </strong>
              <span className="mt-1 text-[7px] font-bold uppercase leading-tight tracking-[0.12em] text-avorio/50 sm:mt-0 sm:text-[9px] sm:tracking-[0.2em]">
                {item.label}
              </span>
              <span className="absolute bottom-0 left-0 h-px w-10 bg-gradient-to-r from-rosso to-transparent sm:w-16" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
