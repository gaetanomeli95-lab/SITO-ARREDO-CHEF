'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Compass,
  FileText,
  LucideIcon,
  MessageCircle,
  PackageCheck,
  Ruler,
  Truck,
} from 'lucide-react';
import { process } from '@/data/company';
import Reveal from '@/components/Reveal';

const stepIcons: Record<string, LucideIcon> = {
  '01': MessageCircle,
  '02': Compass,
  '03': FileText,
  '04': Truck,
};

const stepDetails: Record<
  string,
  {
    label: string;
    client: string[];
    arredoChef: string[];
    output: string;
    accent: string;
  }
> = {
  '01': {
    label: 'Brief iniziale',
    client: ['Tipo di locale e città', 'Esigenze, tempi e budget indicativo', 'Planimetria o misure, se disponibili'],
    arredoChef: ['Ascolta il progetto', 'Individua le priorità', 'Prepara il sopralluogo o il primo confronto tecnico'],
    output: 'Un quadro chiaro del progetto e del prossimo passo da fare.',
    accent: '01 / INPUT',
  },
  '02': {
    label: 'Rilievo e selezione',
    client: ['Accesso allo spazio', 'Menu o tipo di produzione', 'Vincoli già noti del locale'],
    arredoChef: ['Valuta spazi e flussi', 'Seleziona le macchine adatte', 'Bilancia nuovo e usato quando conviene'],
    output: 'Una soluzione tecnica costruita sul locale, non su un catalogo generico.',
    accent: '02 / DESIGN',
  },
  '03': {
    label: 'Configurazione economica',
    client: ['Conferma delle priorità', 'Eventuali alternative da confrontare'],
    arredoChef: ['Definisce costi e opzioni', 'Indica tempi di consegna', 'Rende visibili le alternative prima della scelta'],
    output: 'Un preventivo leggibile, con cosa è incluso e quali opzioni restano aperte.',
    accent: '03 / QUOTE',
  },
  '04': {
    label: 'Messa in servizio',
    client: ['Conferma accessi e data di consegna', 'Predisposizioni del locale pronte'],
    arredoChef: ['Consegna e posizionamento', 'Montaggio e collaudo', 'Supporto dopo la prima accensione'],
    output: 'Una cucina pronta a lavorare e un referente che resta disponibile anche dopo.',
    accent: '04 / LIVE',
  },
};

function StepIcon({ n, size = 22 }: { n: string; size?: number }) {
  const Icon = stepIcons[n] ?? MessageCircle;
  return <Icon size={size} strokeWidth={1.6} />;
}

export default function ProcessSection() {
  const [active, setActive] = useState<number | null>(null);
  const activeStep = active === null ? null : process[active] ?? null;
  const detail = activeStep ? stepDetails[activeStep.n] : null;

  return (
    <section
      id="processo"
      data-nav-theme="light"
      className="relative overflow-hidden bg-[#eef0f1] py-16 text-carbone sm:py-20 md:py-28 lg:py-36"
    >
      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-55" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.94)_0%,rgba(234,237,239,.92)_48%,rgba(209,214,218,.82)_100%)]" />
      <div className="pointer-events-none absolute right-[-10rem] top-[-8rem] h-[30rem] w-[30rem] rounded-full bg-white/90 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10rem] left-[-8rem] h-[28rem] w-[28rem] rounded-full bg-rosso/[0.06] blur-[130px]" />

      <div className="container-ac relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end lg:gap-10">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-carbone/15 bg-white/70 font-display text-[11px] font-extrabold text-rosso">04</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-rosso">Arredo Chef · Project flow</span>
            </div>
            <h2 className="h-display mt-6 max-w-4xl text-[clamp(2.55rem,9vw,4rem)] text-carbone sm:mt-7 sm:text-[clamp(2.8rem,5.6vw,5rem)]">
              Dal primo messaggio<br /><span className="text-[#6d7680]">alla prima accensione.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border-l border-rosso/70 pl-5 sm:pl-6">
              <p className="text-pretty text-[13px] leading-relaxed text-carbone/70 sm:text-sm md:text-base">
                Tocca una fase: ti mostriamo cosa succede, cosa serve da parte tua e cosa deve produrre Arredo Chef prima di passare allo step successivo.
              </p>
              <Link href="/contatti" className="group mt-5 inline-flex items-center gap-3 text-sm font-bold text-carbone transition-colors hover:text-rosso sm:mt-6">
                Inizia dal tuo progetto <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 space-y-3 lg:hidden">
          {process.map((step, i) => {
            const isActive = active === i;
            const d = stepDetails[step.n];
            return (
              <Reveal key={step.n} delay={i * 0.05}>
                <article className={`overflow-hidden rounded-[22px] border transition-all duration-300 ${isActive ? 'border-rosso/30 bg-white shadow-[0_28px_65px_-42px_rgba(11,13,16,.5)]' : 'border-carbone/10 bg-white/65'}`}>
                  <button type="button" onClick={() => setActive(isActive ? null : i)} aria-expanded={isActive} className="flex w-full items-center gap-4 p-5 text-left">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-colors ${isActive ? 'border-rosso bg-rosso text-white' : 'border-carbone/10 bg-[#1b2026] text-white'}`}>
                      <StepIcon n={step.n} size={20} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-rosso">Fase {step.n} · {d.label}</span>
                      <span className="mt-1.5 block font-display text-[1.15rem] font-extrabold leading-tight text-carbone">{step.title}</span>
                    </span>
                    <ChevronDown size={18} className={`shrink-0 text-carbone/45 transition-transform duration-300 ${isActive ? 'rotate-180 text-rosso' : ''}`} />
                  </button>

                  {isActive && (
                    <div className="overflow-hidden">
                      <div className="border-t border-carbone/10 px-5 pb-5 pt-4">
                        <p className="text-[13px] leading-relaxed text-carbone/65">{step.text}</p>
                        <div className="mt-5 grid gap-3">
                          <div className="rounded-2xl bg-[#eef0f1] p-4">
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-carbone/42">Cosa ci serve da te</p>
                            <ul className="mt-3 space-y-2">
                              {d.client.map((item) => (
                                <li key={item} className="flex gap-2.5 text-[12px] leading-relaxed text-carbone/70"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rosso" />{item}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="rounded-2xl bg-[#171c22] p-4 text-white">
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/[0.48]">Cosa fa Arredo Chef</p>
                            <ul className="mt-3 space-y-2">
                              {d.arredoChef.map((item) => (
                                <li key={item} className="flex gap-2.5 text-[12px] leading-relaxed text-white/[0.78]"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-rosso" />{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-4 flex items-start gap-3 border-t border-carbone/10 pt-4">
                          <PackageCheck size={18} className="mt-0.5 shrink-0 text-rosso" />
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-carbone/40">Risultato della fase</p>
                            <p className="mt-1.5 text-[12px] font-semibold leading-relaxed text-carbone/75">{d.output}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14 hidden lg:block">
          <div className="relative">
            <div className="absolute left-[8%] right-[8%] top-7 h-px bg-carbone/10" />
            <motion.div className="absolute left-[8%] top-7 h-px origin-left bg-rosso" animate={{ width: active === null ? '0%' : `${(active / Math.max(process.length - 1, 1)) * 84}%` }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} />
            <div className="relative grid grid-cols-4 gap-4">
              {process.map((step, i) => {
                const isActive = active === i;
                return (
                  <button key={step.n} type="button" onClick={() => setActive(isActive ? null : i)} aria-pressed={isActive} className="group text-left">
                    <span className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 ${isActive ? 'border-rosso bg-rosso text-white shadow-[0_16px_38px_-18px_rgba(216,35,42,.75)]' : 'border-carbone/12 bg-white text-carbone group-hover:border-rosso/35 group-hover:text-rosso'}`}><StepIcon n={step.n} /></span>
                    <span className={`mt-5 block text-[9px] font-bold uppercase tracking-[0.22em] ${isActive ? 'text-rosso' : 'text-carbone/40'}`}>Fase {step.n}</span>
                    <span className={`mt-2 block max-w-[240px] font-display text-xl font-extrabold leading-tight transition-colors ${isActive ? 'text-carbone' : 'text-carbone/60 group-hover:text-carbone'}`}>{step.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeStep && detail && (
              <motion.div key={activeStep.n} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }} className="relative mt-10 overflow-hidden rounded-[28px] border border-carbone/10 bg-white shadow-[0_36px_90px_-52px_rgba(11,13,16,.55)]">
                <span className="absolute left-0 top-0 h-[3px] w-[32%] bg-gradient-to-r from-rosso to-transparent" />
                <div className="grid grid-cols-[.78fr_1.22fr]">
                  <div className="relative overflow-hidden bg-[#171c22] p-9 text-white xl:p-10">
                    <div className="blueprint pointer-events-none absolute inset-0 opacity-35" />
                    <div className="pointer-events-none absolute -right-16 -top-20 font-display text-[13rem] font-black leading-none text-white/[0.035]">{activeStep.n}</div>
                    <div className="relative">
                      <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-rosso">{detail.accent}</span>
                      <h3 className="mt-5 max-w-md font-display text-[2.2rem] font-extrabold leading-[1.02] tracking-tight">{activeStep.title}</h3>
                      <p className="mt-5 max-w-md text-[14px] leading-relaxed text-white/[0.68]">{activeStep.text}</p>
                      <div className="mt-8 border-t border-white/10 pt-6">
                        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/[0.42]">Risultato</p>
                        <p className="mt-2 text-[14px] font-semibold leading-relaxed text-white/[0.88]">{detail.output}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-0">
                    <div className="border-r border-carbone/10 p-8 xl:p-10">
                      <div className="flex items-center gap-3"><Ruler size={18} className="text-rosso" /><p className="text-[9px] font-bold uppercase tracking-[0.22em] text-carbone/45">Cosa ci serve da te</p></div>
                      <ul className="mt-6 space-y-4">{detail.client.map((item) => (<li key={item} className="flex gap-3 text-[13px] leading-relaxed text-carbone/70"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rosso" />{item}</li>))}</ul>
                    </div>
                    <div className="p-8 xl:p-10">
                      <div className="flex items-center gap-3"><CheckCircle2 size={18} className="text-rosso" /><p className="text-[9px] font-bold uppercase tracking-[0.22em] text-carbone/45">Cosa fa Arredo Chef</p></div>
                      <ul className="mt-6 space-y-4">{detail.arredoChef.map((item) => (<li key={item} className="flex gap-3 text-[13px] leading-relaxed text-carbone/70"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-rosso" />{item}</li>))}</ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
