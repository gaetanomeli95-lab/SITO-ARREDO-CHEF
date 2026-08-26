'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Gauge, RefreshCcw, Scale, Sparkles } from 'lucide-react';
import Reveal from '@/components/Reveal';

const strategies = [
  {
    key: 'nuovo',
    short: 'Nuovo',
    eyebrow: 'Strategia 01',
    title: 'Partire al massimo.',
    text: 'Tecnologia aggiornata, garanzia piena e configurazione costruita sul tuo flusso di lavoro. È la scelta giusta quando continuità operativa, immagine e durata vengono prima del risparmio iniziale.',
    image: '/images/hero-2.webp',
    icon: Sparkles,
    points: ['Garanzia del produttore', 'Tecnologia e consumi aggiornati', 'Configurazione su misura'],
    bestFor: 'Nuove aperture strutturate, rinnovi completi, reparti critici.',
    meter: 'Massima continuità',
  },
  {
    key: 'mix',
    short: 'Mix intelligente',
    eyebrow: 'Strategia 02 · Arredo Chef',
    title: 'Spendere dove conta davvero.',
    text: 'Non tutto deve essere nuovo e non tutto deve essere usato. Mettiamo il budget sulle macchine decisive e recuperiamo margine dove un usato revisionato svolge lo stesso lavoro senza compromettere il progetto.',
    image: '/images/hero-1.webp',
    icon: Scale,
    points: ['Nuovo sui punti critici', 'Usato dove conviene davvero', 'Budget distribuito con criterio'],
    bestFor: 'La maggior parte dei progetti reali: massima resa con budget controllato.',
    meter: 'Miglior equilibrio',
  },
  {
    key: 'usato',
    short: 'Usato revisionato',
    eyebrow: 'Strategia 03',
    title: 'Aprire prima, immobilizzare meno.',
    text: 'Macchine selezionate, revisionate e collaudate da noi. Riduci l’investimento iniziale senza rinunciare a montaggio, supporto e a una verifica tecnica prima della consegna.',
    image: '/images/hero-4.webp',
    icon: RefreshCcw,
    points: ['Revisionato e collaudato', 'Investimento iniziale ridotto', 'Stesso montaggio e supporto'],
    bestFor: 'Prime aperture, ampliamenti rapidi, sostituzioni con budget stretto.',
    meter: 'Massimo risparmio',
  },
] as const;

export default function NuovoUsato() {
  const [active, setActive] = useState(1);
  const strategy = strategies[active];
  const Icon = strategy.icon;

  return (
    <section data-nav-theme="light" className="relative overflow-hidden bg-[#ece8e1] py-16 sm:py-20 md:py-28 lg:py-36">
      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-45" />
      <div className="pointer-events-none absolute left-1/2 top-[-10rem] h-[30rem] w-[54rem] -translate-x-1/2 rounded-full bg-white/70 blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-rosso/[0.06] blur-[130px]" />

      <div className="container-ac relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-rosso/20 bg-white/80 font-display text-[11px] font-extrabold text-rosso shadow-lift-sm">05</span>
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-rosso"><Scale size={12} /> Arredo Chef · Decision lab</span>
            </div>
            <h2 className="h-display mt-6 max-w-4xl text-[clamp(2.55rem,9vw,4rem)] text-carbone sm:mt-7 sm:text-[clamp(2.8rem,5.6vw,5rem)]">
              Nuovo o usato?
              <br />
              <span className="text-nebbia">Quasi mai è una scelta binaria.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="border-l border-rosso/55 pl-5 text-pretty text-[13px] leading-relaxed text-carbone/68 sm:pl-6 sm:text-sm md:text-base">
              Prova le tre strategie. Il punto non è comprare “nuovo” o “usato”: è decidere dove ogni euro produce più lavoro.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-10 overflow-hidden rounded-[26px] border border-carbone/10 bg-white/75 shadow-[0_40px_100px_-55px_rgba(11,13,16,.45)] backdrop-blur-xl sm:mt-12 sm:rounded-[30px] lg:mt-16">
            <div className="grid lg:grid-cols-[230px_minmax(0,1fr)_410px]">
              <div className="flex gap-2 overflow-x-auto border-b border-carbone/10 bg-[#dfe2e3]/75 p-3 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:p-4">
                <div className="mb-2 hidden px-3 py-2 text-[9px] font-bold uppercase tracking-[0.24em] text-carbone/40 lg:block">Scegli strategia</div>
                {strategies.map((item, i) => {
                  const SelectedIcon = item.icon;
                  const selected = active === i;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={selected}
                      className={`group min-w-[160px] rounded-[18px] border p-4 text-left transition-all duration-300 lg:min-w-0 ${selected ? 'border-rosso/35 bg-white shadow-[0_18px_40px_-28px_rgba(11,13,16,.45)]' : 'border-transparent bg-white/25 hover:border-carbone/10 hover:bg-white/55'}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${selected ? 'bg-rosso text-white' : 'bg-carbone text-white'}`}><SelectedIcon size={16} /></span>
                        <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${selected ? 'text-rosso' : 'text-carbone/35'}`}>0{i + 1}</span>
                      </div>
                      <span className="mt-4 block font-display text-[1rem] font-extrabold text-carbone">{item.short}</span>
                    </button>
                  );
                })}
              </div>

              <div className="relative min-h-[350px] overflow-hidden bg-[#171c22] sm:min-h-[430px] lg:min-h-[590px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={strategy.key}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image src={strategy.image} alt="" fill sizes="(max-width: 1023px) 100vw, 45vw" className="object-cover opacity-72 saturate-[.3]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111419] via-[#111419]/15 to-[#111419]/45" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#111419]/25 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>
                <div className="blueprint pointer-events-none absolute inset-0 opacity-28" />
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.2em] text-white/[0.78] backdrop-blur-md sm:left-7 sm:top-7">
                  <Gauge size={11} className="text-rosso" /> {strategy.meter}
                </div>
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                  <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-rosso">{strategy.eyebrow}</p>
                  <h3 className="mt-3 max-w-xl font-display text-[clamp(2rem,7vw,3.4rem)] font-extrabold leading-[.98] text-white sm:text-[clamp(2.2rem,4vw,3.7rem)]">{strategy.title}</h3>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={strategy.key}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col bg-white p-6 sm:p-8 lg:p-9"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-carbone text-white"><Icon size={19} /></span>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-carbone/40">Scenario attivo</p>
                      <p className="mt-1 font-display text-lg font-extrabold text-carbone">{strategy.short}</p>
                    </div>
                  </div>

                  <p className="mt-7 text-[14px] leading-relaxed text-carbone/68">{strategy.text}</p>

                  <ul className="mt-7 space-y-3 border-t border-carbone/10 pt-6">
                    {strategy.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-[13px] font-semibold leading-relaxed text-carbone/72">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rosso/[0.09] text-rosso"><Check size={11} strokeWidth={3} /></span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 rounded-[18px] bg-[#eef0f1] p-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-carbone/40">Ideale per</p>
                    <p className="mt-2 text-[12px] font-semibold leading-relaxed text-carbone/70">{strategy.bestFor}</p>
                  </div>

                  <div className="mt-auto pt-7">
                    <Link href="/contatti" className="group inline-flex items-center gap-3 text-sm font-bold text-carbone transition-colors hover:text-rosso">
                      Valutala sul tuo locale
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
