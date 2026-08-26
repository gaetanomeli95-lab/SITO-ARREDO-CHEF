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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 76%', 'end 64%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="processo"
      data-nav-theme="light"
      className="relative overflow-hidden bg-[#eef0f1] py-20 text-carbone md:py-28 lg:py-36"
    >
      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-55" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.94)_0%,rgba(234,237,239,.92)_48%,rgba(209,214,218,.82)_100%)]" />
      <div className="pointer-events-none absolute right-[-10rem] top-[-8rem] h-[30rem] w-[30rem] rounded-full bg-white/90 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10rem] left-[-8rem] h-[28rem] w-[28rem] rounded-full bg-rosso/[0.06] blur-[130px]" />

      <div className="container-ac relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-carbone/15 bg-white/70 font-display text-[11px] font-extrabold text-rosso">
                04
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-rosso">
                Come lavoriamo
              </span>
            </div>
            <h2 className="h-display mt-7 max-w-4xl text-[clamp(2.8rem,5.6vw,5rem)] text-carbone">
              Non ti vendiamo una macchina.
              <br />
              <span className="text-[#6d7680]">Costruiamo il percorso per farla lavorare.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border-l border-rosso/70 pl-6">
              <p className="text-pretty text-sm leading-relaxed text-carbone/72 md:text-base">
                Dal sopralluogo alla consegna, il progetto resta nelle stesse mani. Ogni passaggio
                deve essere chiaro prima che inizi il successivo.
              </p>
              <Link
                href="/contatti"
                className="group mt-6 inline-flex items-center gap-3 text-sm font-bold text-carbone transition-colors hover:text-rosso"
              >
                Parliamo del tuo progetto
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-14">
          <div className="absolute left-[9%] right-[9%] top-[52px] hidden h-px bg-carbone/12 lg:block">
            <motion.div style={{ scaleX: lineScale }} className="h-full origin-left bg-rosso" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {process.map((step, i) => {
              const StepIcon = stepIconFor(step.n);
              return (
                <Reveal key={step.n} delay={i * 0.09}>
                  <article className="group relative h-full min-h-[290px] overflow-hidden rounded-[24px] border border-carbone/10 bg-white/72 p-6 shadow-[0_26px_60px_-38px_rgba(11,13,16,.38)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-rosso/30 hover:bg-white lg:min-h-[330px] lg:p-7">
                    <span className="absolute left-0 top-0 h-[3px] w-10 bg-rosso transition-all duration-500 group-hover:w-20" />
                    <div className="pointer-events-none absolute -right-8 -top-10 font-display text-[8rem] font-black leading-none text-carbone/[0.035]">
                      {step.n}
                    </div>

                    <div className="relative flex items-center justify-between">
                      <span className="flex h-[54px] w-[54px] items-center justify-center rounded-2xl border border-carbone/10 bg-[#1b2026] text-white transition-all duration-500 group-hover:bg-rosso">
                        <StepIcon size={22} strokeWidth={1.5} />
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-carbone/32">
                        Fase {step.n}
                      </span>
                    </div>

                    <div className="relative mt-12">
                      <h3 className="font-display text-[1.35rem] font-extrabold leading-tight tracking-tight text-carbone">
                        {step.title}
                      </h3>
                      <p className="mt-4 text-pretty text-[13px] leading-relaxed text-carbone/62 lg:text-[14px]">
                        {step.text}
                      </p>
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
