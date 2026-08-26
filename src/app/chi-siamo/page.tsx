import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck, Sparkles, Target } from 'lucide-react';
import Reveal from '@/components/Reveal';
import ContactCTA from '@/components/sections/ContactCTA';
import { company, sectors } from '@/data/company';

export const metadata: Metadata = {
  title: 'Chi siamo',
  description:
    'Arredo Chef SRLS: progettazione, fornitura, installazione e assistenza per cucine professionali in Sicilia.',
};

const principles = [
  {
    icon: Target,
    n: '01',
    title: 'Prima il lavoro, poi la macchina.',
    text: 'Partiamo da menu, volumi, spazi e persone. Solo dopo scegliamo le attrezzature. Una cucina professionale non è una collezione di prodotti: è un flusso.',
  },
  {
    icon: Sparkles,
    n: '02',
    title: 'Selezione, non accumulo.',
    text: 'Non serve avere tutto. Serve conoscere bene ciò che si propone, sapere dove funziona e soprattutto quando non conviene comprarlo.',
  },
  {
    icon: ShieldCheck,
    n: '03',
    title: 'Restare quando serve.',
    text: 'Il vero test arriva dopo la consegna. Montaggio, collaudo e assistenza fanno parte dello stesso rapporto: una cucina ferma non può aspettare il prossimo preventivo.',
  },
];

export default function ChiSiamoPage() {
  return (
    <>
      <section data-nav-theme="dark" className="relative isolate min-h-[88svh] overflow-hidden bg-carbone pt-32 text-white sm:pt-36 lg:min-h-[96svh] lg:pt-40">
        <Image src="/images/hero-3.webp" alt="Showroom e attrezzature Arredo Chef" fill priority sizes="100vw" className="object-cover object-center opacity-58" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,12,.98)_0%,rgba(7,9,12,.82)_42%,rgba(7,9,12,.28)_76%,rgba(7,9,12,.68)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-carbone via-transparent to-carbone/45" />
        <div className="blueprint pointer-events-none absolute inset-0 opacity-35" />
        <div className="pointer-events-none absolute left-[7%] top-0 h-full w-px bg-gradient-to-b from-transparent via-rosso/50 to-transparent" />

        <div className="container-ac relative z-10 flex min-h-[calc(88svh-8rem)] flex-col justify-between pb-8 lg:min-h-[calc(96svh-10rem)] lg:pb-10">
          <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.1fr_.55fr]">
            <Reveal>
              <div className="max-w-5xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-rosso">Arredo Chef / Brand manifesto</p>
                <h1 className="h-display mt-6 text-[clamp(3.4rem,9vw,8rem)] leading-[.88] text-white">
                  Non vendiamo cucine.
                  <br />
                  <span className="text-steel">Mettiamo in moto</span>
                  <br />
                  <span className="text-rosso">locali veri.</span>
                </h1>
                <p className="mt-8 max-w-2xl text-pretty text-[15px] leading-relaxed text-white/[0.72] sm:text-lg">
                  Arredo Chef nasce a Villabate con un’idea semplice: chi apre un locale non ha bisogno di un altro catalogo. Ha bisogno di qualcuno che trasformi spazio, budget e lavoro quotidiano in una cucina che gira davvero.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="hidden border-l border-white/15 pl-8 lg:block">
                <p className="text-[9px] font-bold uppercase tracking-[0.26em] text-white/[0.4]">Headquarters</p>
                <p className="mt-3 font-display text-2xl font-extrabold">{company.address.city}</p>
                <p className="mt-2 text-sm text-white/[0.62]">{company.address.street}</p>
                <div className="mt-8 h-px w-full bg-gradient-to-r from-rosso to-transparent" />
                <p className="mt-6 text-sm leading-relaxed text-white/[0.58]">Sicilia · progettazione · fornitura · montaggio · assistenza.</p>
              </div>
            </Reveal>
          </div>

          <div className="grid border-y border-white/10 bg-black/20 backdrop-blur-md sm:grid-cols-3">
            {[
              ['50+', 'macchine a catalogo'],
              [String(company.reviews.rating), 'valutazione Google'],
              ['1', 'referente dall’inizio alla fine'],
            ].map(([value, label], i) => (
              <div key={label} className={`flex items-baseline gap-3 px-5 py-4 sm:px-6 ${i > 0 ? 'border-t border-white/10 sm:border-l sm:border-t-0' : ''}`}>
                <strong className="font-display text-2xl font-extrabold">{value}</strong>
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/[0.42]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-nav-theme="light" className="relative overflow-hidden bg-[#e9ecee] py-16 sm:py-20 md:py-28 lg:py-36">
        <div className="blueprint-light pointer-events-none absolute inset-0 opacity-45" />
        <div className="container-ac relative">
          <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20 lg:items-start">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-rosso">La nostra posizione</p>
                <h2 className="h-display mt-5 text-[clamp(2.7rem,6vw,5rem)] text-carbone">Tra chi vende una macchina e chi costruisce un impianto, scegliamo la seconda strada.</h2>
              </div>
            </Reveal>

            <div className="space-y-0">
              {principles.map((item, i) => (
                <Reveal key={item.n} delay={i * 0.08}>
                  <div className="grid gap-5 border-t border-carbone/12 py-9 sm:grid-cols-[90px_minmax(0,1fr)] sm:py-11">
                    <div className="flex items-start gap-3 sm:block">
                      <span className="font-display text-5xl font-black leading-none text-carbone/[0.08]">{item.n}</span>
                      <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-carbone text-white sm:mt-5"><item.icon size={17} /></span>
                    </div>
                    <div>
                      <h3 className="font-display text-[clamp(1.7rem,3vw,2.6rem)] font-extrabold leading-tight text-carbone">{item.title}</h3>
                      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-carbone/68">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-nav-theme="dark" className="relative overflow-hidden bg-[#0b0d10] py-16 text-white sm:py-20 md:py-28 lg:py-36">
        <Image src="/images/hero-1.webp" alt="" fill sizes="100vw" className="object-cover opacity-22 saturate-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d10] via-[#0b0d10]/90 to-[#0b0d10]/55" />
        <div className="grain pointer-events-none absolute inset-0 opacity-45" />
        <div className="container-ac relative">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-16">
            <Reveal>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-rosso">Chi serviamo</p>
                <h2 className="h-display mt-5 text-[clamp(2.8rem,6vw,5.3rem)]">Non esiste “il settore food”. Esistono lavori diversi.</h2>
                <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/[0.68]">Un bar, una pizzeria e una pasticceria hanno flussi, picchi e priorità differenti. Il progetto parte da lì.</p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="border-y border-white/12">
                {sectors.map((sector, i) => (
                  <div key={sector} className="group flex items-center justify-between gap-5 border-b border-white/10 py-4 last:border-b-0 sm:py-5">
                    <span className="font-display text-[clamp(1.3rem,3vw,2rem)] font-extrabold text-white/[0.68] transition-colors group-hover:text-white">{sector}</span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/[0.28]">{String(i + 1).padStart(2, '0')} / AC</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" className="relative overflow-hidden bg-[#ece8e1] py-16 sm:py-20 md:py-28">
        <div className="container-ac relative">
          <Reveal>
            <div className="grid gap-8 border-y border-carbone/12 py-10 lg:grid-cols-[1fr_auto] lg:items-center lg:py-14">
              <div>
                <div className="flex items-center gap-3 text-rosso"><MapPin size={15} /><span className="text-[10px] font-bold uppercase tracking-[0.24em]">Villabate · Palermo</span></div>
                <h2 className="h-display mt-4 max-w-3xl text-[clamp(2.5rem,5vw,4.5rem)] text-carbone">Le persone contano più delle macchine.</h2>
                <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-carbone/65">Passa in sede, raccontaci il locale e facci vedere cosa vuoi costruire. È il modo più veloce per capire come lavoriamo.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address.mapsQuery)}`} target="_blank" rel="noopener noreferrer" className="btn-rosso">Apri la mappa <ArrowRight size={15} /></a>
                <Link href="/contatti" className="btn-ghost-dark">Parliamo del progetto</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
