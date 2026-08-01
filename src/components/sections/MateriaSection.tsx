'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-14%', '14%']);

  const stats = [
    { value: `${products.length}+`, label: 'Prodotti a catalogo' },
    { value: String(categories.length), label: 'Reparti coperti' },
    { value: String(company.reviews.count), label: 'Recensioni su Google' },
    { value: '1', label: 'Interlocutore, dall’inizio alla fine' },
  ];

  return (
    <section
      ref={ref}
      data-nav-theme="dark"
      className="relative overflow-hidden bg-carbone py-20 md:py-28 lg:py-36"
    >
      {/* Sfondo materico in parallasse */}
      <motion.div style={{ y }} className="pointer-events-none absolute inset-x-0 -inset-y-[14%]">
        <Image src="/images/hero-4.webp" alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-carbone via-carbone/88 to-carbone/35" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-carbone to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-carbone to-transparent" />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="container-ac relative">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow text-oro">Perché ci scelgono</span>
            <h2 className="h-display mt-6 text-[clamp(2.1rem,5.2vw,3.9rem)] text-avorio">
              L&apos;acciaio è freddo.
              <br />
              <span className="text-rosso">Il servizio no.</span>
            </h2>
            <p className="mt-7 max-w-lg text-pretty text-base leading-relaxed text-avorio/85">
              Puoi comprare una cucina ovunque. Quello che non trovi ovunque è chi ti risponde al
              telefono il sabato sera, conosce il tuo locale a memoria e torna a sistemare quello
              che serve. Le recensioni parlano di puntualità, cortesia e consegne fatte bene: è lì
              che si vede la differenza.
            </p>
          </Reveal>
        </div>

        {/* Servizi */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Compass;
            return (
              <Reveal key={s.title} delay={Math.min(i * 0.08, 0.3)}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-grafite/60 p-6 backdrop-blur-sm transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-oro/25">
                  <span className="absolute inset-x-0 top-0 h-px w-full origin-left scale-x-0 bg-rosso transition-transform duration-600 ease-smooth group-hover:scale-x-100" />
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rosso/15 text-rosso-light transition-all duration-500 group-hover:bg-rosso group-hover:text-white">
                    <Icon size={18} />
                  </span>
                  <h3 className="mt-5 font-display text-base font-bold tracking-tight text-avorio">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-pretty text-[13px] leading-relaxed text-cenere/80">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.1 + i * 0.08}>
              <div className="relative border-l border-white/15 pl-4">
                <span className="absolute -left-px top-0 h-6 w-px bg-rosso" />
                <div className="h-display text-[clamp(1.9rem,3.4vw,2.8rem)] text-avorio">
                  {s.value}
                </div>
                <div className="mt-2 text-[11px] font-semibold uppercase leading-snug tracking-widest text-cenere/70">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
