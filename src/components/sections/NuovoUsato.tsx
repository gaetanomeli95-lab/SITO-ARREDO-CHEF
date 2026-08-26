'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Scale } from 'lucide-react';
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
      data-nav-theme="light"
      className="relative overflow-hidden bg-[#ece8e1] py-20 md:py-28 lg:py-36"
    >
      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-45" />
      <div className="pointer-events-none absolute left-1/2 top-[-10rem] h-[30rem] w-[54rem] -translate-x-1/2 rounded-full bg-white/70 blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-rosso/[0.06] blur-[130px]" />

      <div className="container-ac relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-rosso/20 bg-white/80 font-display text-[11px] font-extrabold text-rosso shadow-lift-sm">
                05
              </span>
              <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.36em] text-rosso">
                <Scale size={11} /> Scelta strategica
              </span>
            </div>
            <h2 className="h-display mt-7 max-w-4xl text-[clamp(2.8rem,5.6vw,5rem)] text-carbone">
              Nuovo o usato?
              <br />
              <span className="text-nebbia">La risposta giusta dipende dal progetto.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="border-l border-rosso/45 pl-6 text-pretty text-sm leading-relaxed text-carbone/62 md:text-base">
              Valutiamo investimento, tempi e resa reale. L&apos;obiettivo non è venderti il prodotto
              più costoso, ma la combinazione che fa lavorare meglio il locale.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:mt-16">
          {options.map((o, i) => (
            <Reveal key={o.key} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-full min-h-[540px] overflow-hidden rounded-[28px] border border-carbone/10 bg-white/88 shadow-[0_30px_80px_-38px_rgba(11,13,16,.35)] backdrop-blur-sm"
              >
                <div className="absolute inset-x-0 top-0 h-[48%] overflow-hidden bg-gradient-to-br from-white via-[#e7e3dc] to-[#d7d4cd]">
                  <Image
                    src={o.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover opacity-75 saturate-0 transition-all duration-700 group-hover:scale-[1.045] group-hover:saturate-[.35]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                  <div className="blueprint-light pointer-events-none absolute inset-0 opacity-25" />
                  <span className="absolute left-5 top-5 rounded-full border border-carbone/10 bg-white/75 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.24em] text-carbone/45 backdrop-blur-md">
                    Option / {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <span className="absolute left-0 top-0 z-20 h-px w-[42%] bg-gradient-to-r from-rosso to-transparent shadow-[0_0_12px_rgba(216,35,42,.28)] transition-all duration-500 group-hover:w-[72%]" />

                <div className="relative flex h-full flex-col px-6 pb-7 pt-[270px] sm:px-8 lg:px-9 lg:pb-9 lg:pt-[300px]">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-rosso">
                    {o.kicker}
                  </span>
                  <h3 className="h-display mt-4 text-[clamp(1.8rem,3vw,2.7rem)] text-carbone">
                    {o.title}
                  </h3>
                  <p className="mt-4 text-pretty text-[14px] leading-relaxed text-carbone/62">
                    {o.text}
                  </p>

                  <ul className="mt-7 space-y-3 border-t border-carbone/10 pt-6">
                    {o.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm text-carbone/72">
                        <span className="mt-0.5 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full border border-rosso/20 bg-rosso/[0.07] text-rosso">
                          <Check size={11} strokeWidth={3} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <Link
                      href="/contatti"
                      className="group/link inline-flex items-center gap-3 text-sm font-bold text-carbone transition-colors hover:text-rosso"
                    >
                      Valuta questa soluzione
                      <ArrowRight size={15} className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
