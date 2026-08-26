'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Quote, ShieldCheck, Star } from 'lucide-react';
import { company, reviews } from '@/data/company';
import Reveal from '@/components/Reveal';

export default function ReviewsSection() {
  const [active, setActive] = useState(0);
  const review = reviews[active] ?? reviews[0];

  return (
    <section data-nav-theme="light" className="relative overflow-hidden bg-[#f0ede7] py-16 sm:py-20 md:py-28 lg:py-36">
      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-34" />
      <div className="pointer-events-none absolute left-1/2 top-[-12rem] h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-white/75 blur-[140px]" />
      <div className="pointer-events-none absolute -right-28 bottom-10 h-[22rem] w-[22rem] rounded-full bg-rosso/[0.05] blur-[120px]" />

      <div className="container-ac relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-rosso/20 bg-white/80 font-display text-[11px] font-extrabold text-rosso shadow-lift-sm">07</span>
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-rosso"><ShieldCheck size={12} /> Arredo Chef · Proof wall</span>
            </div>
            <h2 className="h-display mt-6 max-w-4xl text-[clamp(2.55rem,9vw,4rem)] text-carbone sm:mt-7 sm:text-[clamp(2.8rem,5.4vw,4.8rem)]">
              Non diciamo che funziona.
              <br />
              <span className="text-nebbia">Lo fanno i clienti.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border-l border-rosso/55 pl-5 sm:pl-6">
              <div className="flex items-center gap-3">
                <span className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} className="fill-oro text-oro" />)}</span>
                <span className="font-display text-2xl font-extrabold text-carbone">{company.reviews.rating.toFixed(1)}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-carbone/62">{company.reviews.count} recensioni Google. Non una decorazione: una misura pubblica di come lavoriamo.</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-10 overflow-hidden rounded-[28px] border border-carbone/10 bg-white/82 shadow-[0_36px_90px_-52px_rgba(11,13,16,.42)] sm:mt-12 lg:mt-16">
            <div className="grid lg:grid-cols-[260px_minmax(0,1fr)]">
              <div className="flex gap-2 overflow-x-auto border-b border-carbone/10 bg-[#e2e5e6] p-3 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:p-4">
                {reviews.map((item, i) => {
                  const selected = active === i;
                  return (
                    <button
                      key={item.author}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={selected}
                      className={`min-w-[180px] rounded-[18px] border p-4 text-left transition-all lg:min-w-0 ${selected ? 'border-rosso/30 bg-white shadow-[0_15px_35px_-25px_rgba(11,13,16,.45)]' : 'border-transparent bg-white/25 hover:bg-white/60'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-[11px] font-extrabold ${selected ? 'bg-rosso text-white' : 'bg-carbone text-white'}`}>
                          {item.author.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                        </span>
                        <div className="min-w-0">
                          <span className="block truncate text-[13px] font-bold text-carbone">{item.author}</span>
                          <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.18em] text-carbone/40">{item.activity}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="relative min-h-[430px] overflow-hidden bg-[linear-gradient(135deg,#ffffff_0%,#f0f1f1_65%,#dadddf_100%)] p-6 sm:min-h-[500px] sm:p-9 lg:p-12">
                <div className="blueprint-light pointer-events-none absolute inset-0 opacity-35" />
                <div className="pointer-events-none absolute -right-12 -top-12 font-display text-[12rem] font-black leading-none text-carbone/[0.035]">“</div>

                <AnimatePresence mode="wait">
                  <motion.figure
                    key={review.author}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex h-full flex-col"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <Quote size={30} className="text-rosso/30" />
                      <span className="rounded-full border border-carbone/10 bg-white/70 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.22em] text-carbone/45">{review.source}</span>
                    </div>

                    <blockquote className="mt-10 max-w-4xl font-display text-[clamp(2rem,6vw,3.7rem)] font-extrabold leading-[1.03] tracking-tight text-carbone sm:mt-12 sm:text-[clamp(2.3rem,4vw,4.3rem)]">“{review.text}”</blockquote>

                    <figcaption className="mt-auto pt-10">
                      <div className="flex flex-wrap items-center justify-between gap-5 border-t border-carbone/10 pt-6">
                        <div>
                          <p className="text-base font-extrabold text-carbone">{review.author}</p>
                          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-rosso">{review.activity} · recensione verificabile</p>
                        </div>
                        <span className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="fill-oro text-oro" />)}</span>
                      </div>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-8 flex justify-center">
            <a href={company.reviews.readUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 text-sm font-bold text-carbone transition-colors hover:text-rosso">
              Leggi tutte le recensioni <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
