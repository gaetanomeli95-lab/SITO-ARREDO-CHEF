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
    <section data-nav-theme="dark" className="relative overflow-hidden bg-[#0b0d10] py-16 text-avorio sm:py-20 md:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0">
        <Image src="/images/hero-4.webp" alt="" fill sizes="100vw" className="object-cover opacity-28 saturate-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d10] via-[#0b0d10]/92 to-[#0b0d10]/58" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-transparent to-[#0b0d10]/55" />
      </div>
      <div className="grain pointer-events-none absolute inset-0 opacity-45" />
      <div className="pointer-events-none absolute bottom-[-10rem] right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-rosso/[0.08] blur-[150px]" />

      <div className="container-ac relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end lg:gap-10">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-rosso/35 bg-rosso/10 font-display text-[11px] font-extrabold text-rosso">06</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-rosso">Arredo Chef · Service architecture</span>
            </div>
            <h2 className="h-display mt-6 max-w-4xl text-[clamp(2.55rem,9vw,4rem)] text-avorio sm:mt-7 sm:text-[clamp(2.8rem,5.6vw,5rem)]">
              Quattro competenze.
              <br />
              <span className="text-steel">Un solo sistema.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="border-l border-rosso/60 pl-5 text-pretty text-[13px] leading-relaxed text-white/[0.72] sm:pl-6 sm:text-sm md:text-base">
              Progettazione, rilievi, installazione e assistenza non sono servizi separati. Sono quattro stazioni dello stesso percorso operativo.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="relative mt-10 overflow-hidden rounded-[28px] border border-white/12 bg-[#101419]/82 shadow-[0_45px_120px_-58px_rgba(0,0,0,.95)] backdrop-blur-xl sm:mt-12 lg:mt-16">
            <span className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-rosso/70 to-transparent" />

            <div className="relative grid lg:grid-cols-4">
              <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[84px] hidden h-px bg-white/10 lg:block" />
              <div className="pointer-events-none absolute left-[12.5%] top-[84px] hidden h-px w-[75%] bg-gradient-to-r from-rosso via-white/35 to-rosso/70 lg:block" />

              {services.map((service, i) => {
                const Icon = iconMap[service.icon] ?? Compass;
                return (
                  <div
                    key={service.title}
                    className={`relative min-h-[260px] p-6 sm:p-8 lg:min-h-[390px] lg:p-7 xl:p-8 ${i > 0 ? 'border-t border-white/10 lg:border-l lg:border-t-0' : ''}`}
                  >
                    <div className="relative z-10 flex items-center justify-between gap-4">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/14 bg-[#171c22] text-white shadow-[0_16px_40px_-24px_rgba(0,0,0,.95)]">
                        <Icon size={22} strokeWidth={1.5} />
                      </span>
                      <span className="font-display text-[3.4rem] font-black leading-none text-white/[0.045]">0{i + 1}</span>
                    </div>

                    <div className="relative mt-9 lg:mt-16">
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-rosso">Node 0{i + 1}</p>
                      <h3 className="mt-3 max-w-[250px] font-display text-[1.4rem] font-extrabold leading-tight tracking-tight text-white">{service.title}</h3>
                      <p className="mt-4 max-w-[280px] text-[13px] leading-relaxed text-white/[0.66]">{service.text}</p>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 hidden items-center gap-3 lg:flex xl:left-8 xl:right-8">
                      <span className="h-1.5 w-1.5 rounded-full bg-rosso shadow-[0_0_9px_rgba(216,35,42,.8)]" />
                      <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/[0.32]">Connected service node</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-white/10 bg-black/20 p-5 sm:p-6 lg:p-7">
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] bg-white/10 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-[#101419] p-5 sm:p-6">
                    <div className="h-display text-[clamp(2rem,3.4vw,3rem)] text-white">{stat.value}</div>
                    <div className="mt-2 max-w-[170px] text-[9px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-white/[0.48]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
