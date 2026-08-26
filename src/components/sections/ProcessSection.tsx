'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Compass, FileText, LucideIcon, MessageCircle, Truck } from 'lucide-react';
import { process } from '@/data/company';
import Reveal from '@/components/Reveal';

const stepIcons: Record<string, LucideIcon> = {
  '01': MessageCircle,
  '02': Compass,
  '03': FileText,
  '04': Truck,
};

function stepIconFor(n: string): LucideIcon {
  return stepIcons[n] ?? MessageCircle;
}

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 78%', 'end 58%'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="processo" data-nav-theme="light" className="relative overflow-hidden bg-[#eef0f1] py-18 text-carbone sm:py-20 md:py-28 lg:py-36">
      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.96)_0%,rgba(234,237,239,.92)_48%,rgba(209,214,218,.84)_100%)]" />
      <div className="pointer-events-none absolute right-[-10rem] top-[-8rem] h-[30rem] w-[30rem] rounded-full bg-white/90 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10rem] left-[-8rem] h-[28rem] w-[28rem] rounded-full bg-rosso/[0.06] blur-[130px]" />

      <div className="container-ac relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end lg:gap-10">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-carbone/15 bg-white/75 font-display text-[11px] font-extrabold text-rosso">04</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-rosso">Come lavoriamo</span>
            </div>
            <h2 className="h-display mt-6 max-w-4xl text-[clamp(2.6rem,9vw,4rem)] text-carbone sm:mt-7 sm:text-[clamp(2.8rem,5.6vw,5rem)]">
              Dal primo contatto<br /><span className="text-[#6d7680]">alla prima accensione.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border-l border-rosso/70 pl-5 sm:pl-6">
              <p className="text-pretty text-sm leading-relaxed text-carbone/72 md:text-base">Un unico percorso, quattro fasi chiare. Il progetto resta nelle stesse mani dall’inizio alla consegna.</p>
              <Link href="/contatti" className="group mt-5 inline-flex items-center gap-3 text-sm font-bold text-carbone transition-colors hover:text-rosso">Parliamo del tuo progetto <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
            </div>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-12 sm:mt-14 lg:mt-18">
          {/* Desktop rail */}
          <div className="absolute left-[8%] right-[8%] top-[42px] hidden h-px bg-carbone/15 lg:block">
            <motion.div style={{ scaleX: lineScale }} className="h-full origin-left bg-rosso shadow-[0_0_12px_rgba(216,35,42,.28)]" />
          </div>

          {/* Mobile rail */}
          <div className="absolute bottom-5 left-[23px] top-5 w-px bg-carbone/12 lg:hidden">
            <motion.div style={{ scaleY: lineScale }} className="h-full origin-top bg-rosso" />
          </div>

          <div className="space-y-0 lg:grid lg:grid-cols-4 lg:gap-0 lg:space-y-0">
            {process.map((step, i) => {
              const StepIcon = stepIconFor(step.n);
              return (
                <Reveal key={step.n} delay={i * 0.08}>
                  <article className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-5 py-6 sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-6 lg:block lg:px-5 lg:py-0 xl:px-7">
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-carbone/15 bg-[#1b2026] text-white shadow-[0_12px_30px_-18px_rgba(11,13,16,.5)] sm:h-14 sm:w-14 lg:mx-auto lg:h-[84px] lg:w-[84px] lg:border-white/0 lg:bg-[#1b2026]">
                      <StepIcon size={19} strokeWidth={1.6} className="sm:h-[22px] sm:w-[22px] lg:h-[26px] lg:w-[26px]" />
                      <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-rosso px-1 font-display text-[9px] font-black text-white lg:h-7 lg:min-w-7 lg:text-[10px]">{step.n}</span>
                    </div>

                    <div className="relative min-w-0 pb-2 lg:mt-10 lg:text-center">
                      <div className="pointer-events-none absolute -right-1 -top-5 font-display text-[5.5rem] font-black leading-none text-carbone/[0.035] sm:text-[6.5rem] lg:left-1/2 lg:right-auto lg:-top-12 lg:-translate-x-1/2 lg:text-[7.5rem]">{step.n}</div>
                      <span className="relative text-[9px] font-bold uppercase tracking-[0.22em] text-rosso">Fase {step.n}</span>
                      <h3 className="relative mt-2 font-display text-[1.45rem] font-extrabold leading-tight tracking-tight text-carbone lg:mt-3 lg:text-[1.35rem] xl:text-[1.55rem]">{step.title}</h3>
                      <p className="relative mt-3 max-w-xl text-pretty text-[14px] leading-relaxed text-carbone/66 lg:mx-auto lg:mt-4 lg:max-w-[250px] lg:text-[13px] xl:text-[14px]">{step.text}</p>
                    </div>

                    {i < process.length - 1 && <div className="absolute bottom-0 left-[23px] right-0 h-px bg-carbone/[0.07] lg:hidden" />}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
