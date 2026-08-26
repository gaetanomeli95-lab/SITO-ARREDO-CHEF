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
    { value: String(company.reviews.count), label: 'Recensioni Google' },
    { value: '1', label: 'Referente unico' },
  ];

  return (
    <section data-nav-theme="dark" className="relative overflow-hidden bg-[#0b0d10] py-16 text-avorio sm:py-20 md:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0">
        <Image src="/images/hero-4.webp" alt="" fill sizes="100vw" className="object-cover opacity-24 saturate-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d10] via-[#0b0d10]/94 to-[#0b0d10]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-transparent to-[#0b0d10]/70" />
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
              Non quattro servizi.
              <br />
              <span className="text-steel">Una catena che non si spezza.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="border-l border-rosso/60 pl-5 text-pretty text-[13px] leading-relaxed text-white/[0.72] sm:pl-6 sm:text-sm md:text-base">
              La qualità non sta solo nella macchina. Sta nel fatto che rilievo, progetto, montaggio e assistenza parlino tra loro senza perdere informazioni.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-12 sm:mt-14 lg:mt-16">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-white/10 lg:left-1/2 lg:-translate-x-1/2" />
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Compass;
            const reverse = i % 2 === 1;
            return (
              <Reveal key={service.title} delay={Math.min(i * 0.08, 0.24)}>
                <div className="relative grid gap-6 py-8 pl-14 sm:py-10 lg:grid-cols-2 lg:gap-16 lg:pl-0 lg:py-14">
                  <span className="absolute left-5 top-10 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/15 bg-[#171c22] text-rosso shadow-[0_0_0_8px_rgba(11,13,16,.85)] lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2">
                    <Icon size={18} strokeWidth={1.6} />
                  </span>

                  <div className={reverse ? 'lg:col-start-2' : 'lg:text-right'}>
                    <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-rosso">0{i + 1} / Connected layer</p>
                    <h3 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold leading-tight text-white">{service.title}</h3>
                  </div>

                  <div className={`${reverse ? 'lg:col-start-1 lg:row-start-1 lg:text-right' : 'lg:col-start-2'} max-w-xl`}>
                    <p className="text-[14px] leading-relaxed text-white/[0.68] sm:text-[15px]">{service.text}</p>
                  </div>

                  {i < services.length - 1 && <div className="absolute bottom-0 left-14 right-0 h-px bg-gradient-to-r from-white/10 to-transparent lg:left-[12%] lg:right-[12%]" />}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-8 border-y border-white/10 py-6 sm:mt-10 sm:py-8">
            <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <div key={stat.label} className={`px-2 sm:px-5 ${i > 0 ? 'sm:border-l sm:border-white/10' : ''}`}>
                  <div className="h-display text-[clamp(2rem,4vw,3.3rem)] text-white">{stat.value}</div>
                  <div className="mt-2 max-w-[180px] text-[9px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-white/[0.48]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
