'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Reveal from '@/components/Reveal';

const options = [
  {
    key: 'nuovo',
    kicker: 'Attrezzatura nuova',
    title: 'Il massimo, con garanzia.',
    text: 'Marchi selezionati, tecnologia aggiornata, garanzia piena e assistenza diretta. Per chi vuole partire senza compromessi o sostituire una linea al limite.',
    points: [
      'Garanzia del produttore',
      'Ultime tecnologie, consumi ridotti',
      'Configurazioni su misura',
    ],
    image: '/images/hero-2.webp',
  },
  {
    key: 'usato',
    kicker: 'Attrezzatura usata',
    title: 'Aprire prima, spendere meno.',
    text: 'Macchine revisionate e collaudate da noi, con lo stesso servizio di installazione. La scelta intelligente per il primo locale o per ampliare senza bloccare la cassa.',
    points: [
      'Revisionata e collaudata',
      'Una frazione del prezzo del nuovo',
      'Stesso montaggio e supporto',
    ],
    image: '/images/hero-4.webp',
  },
];

export default function NuovoUsato() {
  return (
    <section
      data-nav-theme="dark"
      className="relative overflow-hidden bg-carbone py-20 md:py-28 lg:py-36"
    >
      <div className="blueprint pointer-events-none absolute inset-0 opacity-60" />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="pointer-events-none absolute -left-40 top-1/4 h-[26rem] w-[26rem] animate-breathe rounded-full bg-rosso/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[26rem] w-[26rem] rounded-full bg-oro/[0.07] blur-[140px]" />

      {/* Marchio in filigrana */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.035]">
        <Image src="/images/logo-mark.webp" alt="" fill sizes="544px" className="object-contain" />
      </div>

      <div className="container-ac relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow justify-center text-oro">Due strade, stesso servizio</span>
            <h2 className="h-display mt-6 text-[clamp(2.1rem,4.8vw,3.7rem)] text-avorio">
              Nuovo o usato?
              <br />
              <span className="text-nebbia">Dipende dal tuo budget,</span>
              <br />
              non dalle nostre provvigioni.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-cenere/85">
              Ti diciamo con onestà dove conviene investire nel nuovo e dove un usato revisionato fa
              esattamente lo stesso lavoro. Spesso la cucina migliore è un mix delle due cose.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:mt-16">
          {options.map((o, i) => (
            <Reveal key={o.key} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -7 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.09] shadow-inset"
              >
                {/* Immagine di sfondo */}
                <div className="pointer-events-none absolute inset-0">
                  <Image
                    src={o.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover opacity-30 transition-all duration-1000 ease-smooth group-hover:scale-105 group-hover:opacity-45"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbone via-carbone/92 to-carbone/60" />
                </div>

                {/* Filo brace che si accende */}
                <span className="absolute inset-x-0 top-0 h-px w-full origin-left scale-x-0 bg-rosso transition-transform duration-700 ease-smooth group-hover:scale-x-100" />

                <div className="relative flex h-full flex-col p-6 md:p-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest2 text-oro">
                    {o.kicker}
                  </span>

                  <h3 className="h-display mt-5 text-[clamp(1.6rem,2.7vw,2.2rem)] text-avorio">
                    {o.title}
                  </h3>

                  <p className="mt-4 text-pretty text-[15px] leading-relaxed text-cenere/85">
                    {o.text}
                  </p>

                  <ul className="mt-8 space-y-3">
                    {o.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm text-cenere/85">
                        <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-rosso/20 text-rosso-light">
                          <Check size={11} strokeWidth={3} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-10">
                    <Link
                      href="/contatti"
                      className="group/link inline-flex items-center gap-2 text-sm font-semibold text-avorio transition-colors hover:text-oro"
                    >
                      Chiedi disponibilità
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
