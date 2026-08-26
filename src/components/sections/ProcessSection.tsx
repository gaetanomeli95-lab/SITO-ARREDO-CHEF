'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Compass, FileText, LucideIcon, MessageCircle, Radio, Truck } from 'lucide-react';
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 76%', 'end 64%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="processo"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-[#090b0e] py-20 text-avorio md:py-28 lg:py-36"
    >
      <div className="blueprint pointer-events-none absolute inset-0 opacity-55" />
      <div className="pointer-events-none absolute left-1/2 top-[-16rem] h-[42rem] w-[58rem] -translate-x-1/2 rounded-full bg-white/[0.055] blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[-12rem] right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-rosso/[0.09] blur-[150px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-ac relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-rosso/35 bg-rosso/10 font-display text-[11px] font-extrabold text-rosso">
                04
              </span>
              <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.36em] text-rosso">
                <Radio size={11} /> Operational path
              </span>
            </div>
            <h2 className="h-display mt-7 max-w-4xl text-[clamp(2.8rem,5.6vw,5rem)] text-avorio">
              Non ti vendiamo una macchina.
              <br />
              <span className="text-steel">Costruiamo il percorso per farla lavorare.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border-l border-rosso/60 pl-6">
              <p className="text-pretty text-sm leading-relaxed text-white/56 md:text-base">
                Dal primo sopralluogo alla consegna: un flusso unico, leggibile e seguito dalla stessa
                squadra. Meno passaggi dispersi, più responsabilità chiare.
              </p>
              <Link
                href="/contatti"
                className="group mt-6 inline-flex items-center gap-3 text-sm font-bold text-white transition-colors hover:text-rosso"
              >
                Parliamo del tuo progetto
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-14 lg:mt-18">
          <div className="absolute left-[9%] right-[9%] top-[52px] hidden h-px bg-white/10 lg:block">
            <motion.div
              style={{ scaleX: lineScale }}
              className="h-full origin-left bg-gradient-to-r from-rosso via-rosso to-white/30 shadow-[0_0_16px_rgba(216,35,42,.45)]"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {process.map((step, i) => {
              const StepIcon = stepIconFor(step.n);
              return (
                <Reveal key={step.n} delay={i * 0.09}>
                  <article className="group relative h-full min-h-[290px] overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-b from-[#171c22]/92 to-[#0e1115]/96 p-6 shadow-[0_32px_90px_-50px_rgba(0,0,0,1)] transition-all duration-500 hover:-translate-y-1 hover:border-rosso/35 lg:min-h-[330px] lg:p-7">
                    <span className="absolute left-0 top-0 h-px w-[38%] bg-gradient-to-r from-rosso to-transparent shadow-[0_0_14px_rgba(216,35,42,.45)] transition-all duration-500 group-hover:w-[70%]" />
                    <div className="pointer-events-none absolute -right-10 -top-12 font-display text-[8.5rem] font-black leading-none text-white/[0.025]">
                      {step.n}
                    </div>

                    <div className="relative flex items-center justify-between">
                      <span className="flex h-[54px] w-[54px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] text-white/72 transition-all duration-500 group-hover:border-rosso/40 group-hover:bg-rosso/10 group-hover:text-rosso">
                        <StepIcon size={22} strokeWidth={1.5} />
                      </span>
                      <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-white/28">
                        Step {step.n}
                      </span>
                    </div>

                    <div className="relative mt-12">
                      <span className="mb-3 block h-px w-8 bg-rosso" />
                      <h3 className="font-display text-[1.35rem] font-extrabold leading-tight tracking-tight text-white">
                        {step.title}
                      </h3>
                      <p className="mt-4 text-pretty text-[13px] leading-relaxed text-white/50 lg:text-[14px]">
                        {step.text}
                      </p>
                    </div>

                    <div className="absolute bottom-5 left-6 right-6 flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.26em] text-white/20 lg:left-7 lg:right-7">
                      <span className="h-1.5 w-1.5 rounded-full bg-rosso/70" />
                      Workflow active
                    </div>
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
