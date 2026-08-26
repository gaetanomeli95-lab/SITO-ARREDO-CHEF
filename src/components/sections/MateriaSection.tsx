'use client';

import { Compass, LifeBuoy, Ruler, Wrench, Activity } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { categories, products } from '@/data/products';
import { company, services } from '@/data/company';
import Reveal from '@/components/Reveal';

const iconMap: Record<string, LucideIcon> = {
  compass: Compass,
  ruler: Ruler,
  wrench: Wrench,
  lifeBuoy: LifeBuoy,
};

export default function MateriaSection() {
  const stats = [
    { value: `${products.length}+`, label: 'Prodotti a catalogo' },
    { value: String(categories.length), label: 'Reparti coperti' },
    { value: String(company.reviews.count), label: 'Recensioni su Google' },
    { value: '1', label: 'Interlocutore, dall’inizio alla fine' },
  ];

  return (
    <section
      data-nav-theme="dark"
      className="relative overflow-hidden bg-[#0c0f13] py-20 text-avorio md:py-28 lg:py-36"
    >
      <div className="blueprint pointer-events-none absolute inset-0 opacity-42" />
      <div className="pointer-events-none absolute left-[-8rem] top-[20%] h-[30rem] w-[30rem] rounded-full bg-white/[0.05] blur-[150px]" />
      <div className="pointer-events-none absolute right-[-8rem] bottom-[8%] h-[28rem] w-[28rem] rounded-full bg-rosso/[0.08] blur-[150px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-ac relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-end">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-rosso/35 bg-rosso/10 font-display text-[11px] font-extrabold text-rosso">
                06
              </span>
              <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.36em] text-rosso">
                <Activity size={11} /> Service network
              </span>
            </div>
            <h2 className="h-display mt-7 max-w-4xl text-[clamp(2.8rem,5.6vw,5rem)] text-avorio">
              L&apos;acciaio è freddo.
              <br />
              <span className="text-steel">Il servizio deve essere presente.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="border-l border-rosso/60 pl-6 text-pretty text-sm leading-relaxed text-white/56 md:text-base">
              Progettazione, rilievi, installazione e assistenza restano collegati nello stesso flusso.
              È questo che trasforma una fornitura in un sistema che continua a funzionare.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Compass;
            return (
              <Reveal key={s.title} delay={Math.min(i * 0.08, 0.28)}>
                <article className="group relative h-full min-h-[250px] overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-b from-[#1b2128]/90 to-[#11151a]/95 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-rosso/35 lg:p-7">
                  <span className="absolute left-0 top-0 h-px w-[34%] bg-gradient-to-r from-rosso to-transparent transition-all duration-500 group-hover:w-[70%]" />
                  <span className="absolute right-5 top-4 font-display text-[3.8rem] font-black leading-none text-white/[0.035]">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] text-white/65 transition-all duration-500 group-hover:border-rosso/40 group-hover:bg-rosso/10 group-hover:text-rosso">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>

                  <h3 className="mt-8 font-display text-[1.15rem] font-extrabold tracking-tight text-white">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-pretty text-[13px] leading-relaxed text-white/48">
                    {s.text}
                  </p>

                  <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-[8px] font-bold uppercase tracking-[0.24em] text-white/20 lg:left-7 lg:right-7">
                    <span>Support node</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-rosso/70" />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.025]">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.08 + i * 0.06}>
                <div className="relative min-h-[150px] border-white/10 p-5 sm:border-l sm:p-6 first:sm:border-l-0">
                  <span className="absolute left-0 top-5 h-10 w-px bg-rosso sm:hidden" />
                  <div className="h-display text-[clamp(2rem,3.4vw,3rem)] text-white">{s.value}</div>
                  <div className="mt-3 max-w-[170px] text-[9px] font-bold uppercase leading-relaxed tracking-[0.23em] text-white/34">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
