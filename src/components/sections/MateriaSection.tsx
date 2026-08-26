'use client';

import Image from 'next/image';
import { Compass, LifeBuoy, Ruler, Wrench } from 'lucide-react';
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
    <section data-nav-theme="dark" className="relative overflow-hidden bg-[#0b0d10] py-20 text-avorio md:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0">
        <Image src="/images/hero-4.webp" alt="" fill sizes="100vw" className="object-cover opacity-26 saturate-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d10] via-[#0b0d10]/92 to-[#0b0d10]/58" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-transparent to-[#0b0d10]/55" />
      </div>
      <div className="grain pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute bottom-[-10rem] right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-rosso/[0.08] blur-[150px]" />

      <div className="container-ac relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-end">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-rosso/35 bg-rosso/10 font-display text-[11px] font-extrabold text-rosso">06</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-rosso">Servizio completo</span>
            </div>
            <h2 className="h-display mt-7 max-w-4xl text-[clamp(2.8rem,5.6vw,5rem)] text-avorio">
              L&apos;acciaio è freddo.
              <br />
              <span className="text-steel">Il servizio no.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="border-l border-rosso/60 pl-6 text-pretty text-sm leading-relaxed text-white/72 md:text-base">
              Progettazione, rilievi, installazione e assistenza restano collegati nello stesso flusso.
              La differenza si vede quando qualcosa deve essere deciso, montato o risolto davvero.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Compass;
            return (
              <Reveal key={s.title} delay={Math.min(i * 0.08, 0.28)}>
                <article className="group relative h-full min-h-[245px] overflow-hidden rounded-[24px] border border-white/12 bg-[#151a20]/82 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-rosso/35 hover:bg-[#181e25]/92 lg:p-7">
                  <span className="absolute left-0 top-0 h-[3px] w-10 bg-rosso transition-all duration-500 group-hover:w-20" />
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-white/78 transition-all duration-500 group-hover:border-rosso/40 group-hover:bg-rosso/12 group-hover:text-rosso">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-8 font-display text-[1.15rem] font-extrabold tracking-tight text-white">{s.title}</h3>
                  <p className="mt-3 text-pretty text-[13px] leading-relaxed text-white/62">{s.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 overflow-hidden rounded-[24px] border border-white/12 bg-black/20 backdrop-blur-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.08 + i * 0.06}>
                <div className="relative min-h-[150px] border-white/12 p-5 sm:border-l sm:p-6 first:sm:border-l-0">
                  <div className="h-display text-[clamp(2rem,3.4vw,3rem)] text-white">{s.value}</div>
                  <div className="mt-3 max-w-[170px] text-[10px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-white/52">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
