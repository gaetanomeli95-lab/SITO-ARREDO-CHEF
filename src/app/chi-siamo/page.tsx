import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Handshake, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import ContactCTA from '@/components/sections/ContactCTA';
import { company, process, sectors } from '@/data/company';

export const metadata: Metadata = {
  title: 'Chi siamo',
  description:
    'Arredo Chef SRLS: fornitura di attrezzature professionali per la ristorazione a Villabate (PA). Consulenza personalizzata e assistenza completa, dalla scelta all’installazione finale.',
};

const values = [
  {
    icon: Sparkles,
    title: 'Selezione, non catalogo',
    text: 'Non vendiamo tutto quello che esiste. Trattiamo solo attrezzature che conosciamo, che abbiamo visto lavorare e di cui possiamo rispondere.',
  },
  {
    icon: Handshake,
    title: 'Consulenza vera',
    text: 'Ti diciamo anche cosa non comprare. Un preventivo gonfiato si paga una volta, un cliente scontento si perde per sempre.',
  },
  {
    icon: ShieldCheck,
    title: 'Assistenza fino in fondo',
    text: 'Dalla scelta all’installazione finale. E dopo restiamo raggiungibili, perché una cucina ferma è un incasso perso.',
  },
];

export default function ChiSiamoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Villabate · Palermo · Sicilia"
        title={
          <>
            Ci sono cucine
            <br />
            <span className="text-nebbia">che lavorano ogni sera</span>
            <br />
            grazie a noi.
          </>
        }
        lead="Arredo Chef nasce per accompagnare chi apre e chi rinnova: attrezzature professionali di qualità, scelte insieme e installate con cura."
        image="/images/hero-1.webp"
        crumbs={[{ label: 'Chi siamo' }]}
      />

      {/* La nostra storia */}
      <section
        data-nav-theme="light"
        className="relative overflow-hidden bg-gradient-to-b from-avorio via-sabbia to-cemento py-20 md:py-28 lg:py-36"
      >
        <div className="blueprint-light pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-ac relative">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/images/hero-3.webp"
                    alt="Showroom Arredo Chef"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-carbone/65 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="font-display text-sm font-bold uppercase tracking-widest text-avorio">
                    {company.address.city} ({company.address.province})
                  </p>
                  <p className="mt-1 text-xs text-cenere/70">{company.address.street}</p>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <span className="eyebrow text-rosso">La nostra storia</span>
                <h2 className="h-display mt-6 text-[clamp(2rem,4.4vw,3.3rem)] text-carbone">
                  Il partner ideale per chi vuole dare il massimo nel proprio lavoro.
                </h2>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="mt-8 space-y-5 text-pretty text-[15px] leading-relaxed text-carbone/65">
                  <p>
                    <strong className="font-semibold text-carbone">Arredo Chef SRLS</strong> è
                    un&apos;azienda specializzata nella fornitura di attrezzature professionali per
                    la ristorazione. Il nostro obiettivo è sostenere ristoranti, bar, hotel e tutte
                    le realtà del settore food &amp; beverage, offrendo soluzioni innovative e
                    prodotti di altissima qualità.
                  </p>
                  <p>
                    Con anni di esperienza e una profonda passione per l&apos;eccellenza,
                    selezioniamo solo le migliori attrezzature, garantendo affidabilità, efficienza
                    e tecnologia all&apos;avanguardia. Dalle cucine industriali ai forni
                    professionali, dai frigoriferi ai piccoli elettrodomestici.
                  </p>
                  <p>
                    Ci dedichiamo alla soddisfazione del cliente, offrendo consulenze personalizzate
                    e un&apos;assistenza completa, dal momento della scelta all&apos;installazione
                    finale.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-8 border-l-2 border-rosso pl-5 font-display text-lg font-bold leading-snug tracking-tight text-carbone">
                  Arredo Chef, scegli la professionalità: eccellenza e soluzioni su misura per il
                  tuo successo.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Valori — sezione materia */}
      <section
        data-nav-theme="dark"
        className="relative overflow-hidden bg-carbone py-20 md:py-28 lg:py-36"
      >
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/hero-4.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-45 [filter:brightness(1.1)]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-carbone via-carbone/70 to-carbone" />
        </div>
        <div className="blueprint pointer-events-none absolute inset-0 opacity-50" />
        <div className="grain pointer-events-none absolute inset-0" />

        <div className="container-ac relative">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center text-oro">Come lavoriamo</span>
              <h2 className="h-display mt-6 text-[clamp(2rem,4.6vw,3.5rem)] text-avorio">
                Tre regole che non cambiamo mai.
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-grafite p-8 shadow-lift transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:border-oro/30">
                  <span className="absolute inset-x-0 top-0 h-px w-full origin-left scale-x-0 bg-rosso transition-transform duration-600 ease-smooth group-hover:scale-x-100" />
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rosso/20 text-rosso-light transition-all duration-500 group-hover:bg-rosso group-hover:text-white">
                    <v.icon size={18} />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-bold tracking-tight text-avorio">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-cenere/80">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Metodo */}
      <section
        data-nav-theme="light"
        className="relative overflow-hidden bg-gradient-to-b from-avorio to-sabbia py-20 md:py-28 lg:py-36"
      >
        <div className="blueprint-light pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-ac relative">
          <Reveal>
            <span className="eyebrow text-rosso">Il metodo</span>
            <h2 className="h-display mt-6 max-w-2xl text-[clamp(2rem,4.4vw,3.3rem)] text-carbone">
              Quattro passaggi, sempre gli stessi.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-carbone/[0.08] bg-carbone/[0.08] md:grid-cols-2">
            {process.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden bg-avorio p-8 transition-colors duration-500 hover:bg-white md:p-10">
                  <span className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-rosso transition-transform duration-600 ease-smooth group-hover:scale-y-100" />
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-3xl font-extrabold text-carbone/12 transition-colors duration-500 group-hover:text-rosso/35">
                      {s.n}
                    </span>
                    <h3 className="font-display text-xl font-bold tracking-tight text-carbone">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-pretty text-[15px] leading-relaxed text-carbone/55">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Settori serviti */}
      <section
        data-nav-theme="light"
        className="relative bg-gradient-to-b from-sabbia to-cemento py-16 md:py-24"
      >
        <div className="container-ac relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <Reveal>
              <span className="eyebrow text-rosso">Chi serviamo</span>
              <h2 className="h-display mt-6 text-[clamp(1.8rem,3.8vw,2.9rem)] text-carbone">
                Ogni locale ha esigenze diverse.
              </h2>
              <p className="mt-5 text-pretty text-[15px] leading-relaxed text-carbone/60">
                Un bar non è una pizzeria, una pasticceria non è una macelleria. Conosciamo i flussi
                di lavoro di ognuno e attrezziamo di conseguenza.
              </p>
              <Link
                href="/contatti"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-carbone transition-colors hover:text-rosso"
              >
                Parliamo del tuo
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="flex flex-wrap gap-2.5">
                {sectors.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-carbone/10 bg-white/80 px-5 py-2.5 text-sm font-medium text-carbone/70 transition-all duration-400 hover:-translate-y-0.5 hover:border-rosso/35 hover:text-rosso hover:shadow-lift-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Nota trasparente sul team */}
      <section data-nav-theme="light" className="bg-cemento pb-20 md:pb-28">
        <div className="container-ac">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-carbone/15 bg-white p-10 shadow-lift md:p-14">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rosso/[0.07] blur-[100px]" />
              <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl">
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest2 text-rosso">
                    <MapPin size={13} />
                    Vieni a trovarci
                  </span>
                  <h3 className="h-display mt-4 text-2xl text-carbone md:text-3xl">
                    Le persone contano più delle macchine.
                  </h3>
                  <p className="mt-4 text-pretty text-[15px] leading-relaxed text-carbone/60">
                    Dietro ogni consegna c&apos;è una squadra che i nostri clienti citano per nome
                    nelle recensioni. Passa in sede a {company.address.city}: si capisce molto
                    meglio di persona.
                  </p>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    company.address.mapsQuery
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-rosso shrink-0"
                >
                  Apri la mappa
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
