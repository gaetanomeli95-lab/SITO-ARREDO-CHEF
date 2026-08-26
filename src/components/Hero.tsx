import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownRight, ArrowRight, Check, ClipboardList } from 'lucide-react';
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
      data-nav-theme="light"
      className="relative isolate flex min-h-[760px] overflow-hidden bg-avorio pt-28 lg:min-h-[100svh] lg:pt-32"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-3.webp"
          alt="Cucina professionale completa con attrezzature in acciaio inox"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] lg:object-center"
        />
        <div className="hero-light-veil absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-avorio via-avorio/55 to-transparent" />
      </div>

      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-transparent via-rosso to-transparent" />

      <div className="container-ac relative z-10 flex flex-1 flex-col justify-between pb-7 lg:pb-10">
        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,.55fr)] lg:py-16">
          <div className="max-w-[760px]">
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-rosso/25 bg-white/70 font-display text-[11px] font-extrabold text-rosso shadow-lift-sm backdrop-blur-md">
                01
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest2 text-carbone/65">
                Kitchen systems · Sicilia
              </span>
            </div>

            <h1 className="h-display mt-7 max-w-[740px] text-[clamp(3rem,7.2vw,6.75rem)] text-carbone">
              Il tuo locale,
              <br />
              <span className="relative inline-block text-rosso">
                pronto a lavorare.
                <span className="absolute -bottom-2 left-0 h-[3px] w-[32%] bg-rosso" />
              </span>
            </h1>

            <p className="mt-8 max-w-[610px] text-pretty text-base leading-relaxed text-carbone/75 md:text-lg md:leading-relaxed">
              Progettiamo e forniamo cucine professionali complete: attrezzature nuove e usate,
              sopralluogo, preventivo, montaggio e collaudo. Un solo interlocutore, dall&apos;idea
              alla prima accensione.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/catalogo" className="btn-rosso group sm:min-w-[210px]">
                Inizia dal catalogo
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link href="#processo" className="btn-ghost-dark bg-white/45 backdrop-blur-md">
                Scopri il metodo
                <ArrowDownRight size={15} />
              </Link>
            </div>
          </div>

          <aside className="panel-cut surface-inox-light hidden w-full max-w-[350px] justify-self-end border border-white/70 p-7 shadow-lift backdrop-blur-xl lg:block">
            <div className="flex items-center justify-between gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-carbone text-avorio">
                <ClipboardList size={18} />
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest2 text-rosso">
                Il mio progetto
              </span>
            </div>
            <h2 className="mt-7 font-display text-2xl font-extrabold leading-tight tracking-tight text-carbone">
              Seleziona le macchine. Noi costruiamo la soluzione.
            </h2>
            <ul className="mt-6 space-y-3">
              {[
                'Salva prodotti e quantità',
                'Aggiungi note per ogni macchina',
                'Invia un unico preventivo completo',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[13px] text-carbone/70">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rosso/10 text-rosso">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/progetto"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-carbone transition-colors hover:text-rosso"
            >
              Apri il tuo progetto
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </aside>
        </div>

        <div className="grid overflow-hidden rounded-2xl border border-carbone/10 bg-white/[0.72] shadow-lift-sm backdrop-blur-xl sm:grid-cols-3">
          {proof.map((item, index) => (
            <div
              key={item.label}
              className={`flex items-baseline gap-3 px-5 py-4 sm:px-6 ${
                index > 0 ? 'border-t border-carbone/10 sm:border-l sm:border-t-0' : ''
              }`}
            >
              <strong className="font-display text-2xl font-extrabold tracking-tight text-carbone">
                {item.value}
              </strong>
              <span className="text-[10px] font-bold uppercase leading-tight tracking-widest text-carbone/45">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
