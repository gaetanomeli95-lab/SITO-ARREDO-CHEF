'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { process } from '@/data/company';
import Reveal from '@/components/Reveal';

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 65%'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="processo"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-carbone py-20 md:py-28 lg:py-36"
    >
      {/* Immagine di sfondo */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-2.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-carbone/40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-carbone/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-carbone/60 to-transparent" />
      <div className="blueprint pointer-events-none absolute inset-0" />
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[26rem] w-[26rem] animate-breathe rounded-full bg-oro/[0.07] blur-[130px]" />

      <div className="container-ac relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <span className="eyebrow text-oro">Chiavi in mano</span>
            <h2 className="h-display mt-6 text-[clamp(2.1rem,4.8vw,3.7rem)] text-avorio">
              Non ti vendiamo
              <br />
              una friggitrice.
              <br />
              <span className="text-rosso">Ti apriamo il locale.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-pretty text-base leading-relaxed text-cenere/70">
              Chi apre un&apos;attività non ha bisogno di un catalogo: ha bisogno di qualcuno che
              venga a vedere lo spazio, capisca come si lavora e resti fino a quando tutto funziona.
              Questo è il nostro metodo, sempre lo stesso.
            </p>
            <Link
              href="/contatti"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-avorio transition-colors hover:text-oro"
            >
              Parliamo del tuo progetto
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        {/* Passi */}
        <div ref={ref} className="relative mt-20">
          {/* Filo che si disegna allo scroll */}
          <div className="absolute left-0 right-0 top-[38px] hidden h-px bg-white/10 lg:block">
            <motion.div style={{ scaleX: lineScale }} className="h-full origin-left bg-rosso" />
          </div>

          <div className="grid gap-8 lg:grid-cols-4 lg:gap-8">
            {process.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.1}>
                <div className="group relative">
                  <div className="mb-5 flex items-center lg:mb-7 lg:block">
                    <span className="relative z-10 flex h-[76px] w-[76px] items-center justify-center rounded-full border border-white/12 bg-grafite font-display text-xl font-extrabold text-avorio transition-all duration-500 ease-smooth group-hover:border-transparent group-hover:bg-rosso group-hover:text-white">
                      {step.n}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold tracking-tight text-avorio">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-pretty text-[14px] leading-relaxed text-cenere/85 lg:text-[15px] lg:leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
