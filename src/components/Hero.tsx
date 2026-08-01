import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section
      data-nav-theme="dark"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-carbone"
    >
      {/* Immagine di sfondo */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-1.webp"
          alt="Arredo Chef — attrezzature professionali"
          fill
          priority
          sizes="100vw"
          className="object-cover [filter:brightness(1.15)_contrast(1.05)]"
        />
      </div>

      {/* Overlay per leggibilità — solo sul lato sinistro */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-carbone/55 via-carbone/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-carbone/60 to-transparent" />
      <div className="grain pointer-events-none absolute inset-0" />

      {/* Bagliore */}
      <div className="pointer-events-none absolute -left-20 top-1/3 h-[24rem] w-[24rem] animate-breathe rounded-full bg-rosso/10 blur-[120px]" />

      {/* Contenuto */}
      <div className="container-ac relative z-10">
        <div className="max-w-2xl">
          <span className="eyebrow text-oro">Arredo Chef SRLS — Villabate (PA)</span>

          <h1 className="h-display mt-5 text-[clamp(2rem,7vw,5.2rem)] text-white drop-shadow-[0_2px_24px_rgba(11,13,16,0.9)]">
            Attrezzature professionali
            <br />
            <span className="text-rosso">per chi cucina sul serio.</span>
          </h1>

          <p className="mt-5 max-w-lg text-pretty text-[15px] leading-relaxed text-white/95 drop-shadow-[0_1px_12px_rgba(11,13,16,0.8)] md:text-lg md:leading-relaxed">
            Nuove e usate, per ristoranti, bar, hotel, pizzerie e pasticcerie.
            Sopralluogo, preventivo su budget, fornitura, montaggio e collaudo: chiavi in mano.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/catalogo" className="btn-rosso group">
              Sfoglia il catalogo
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link href="/contatti" className="btn-ghost-light">
              Richiedi un preventivo
            </Link>
          </div>
        </div>
      </div>

      {/* Indicatore di scroll */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <span className="flex flex-col items-center gap-2 text-avorio/50">
          <span className="text-[10px] font-semibold uppercase tracking-widest2">
            Scorri per scoprire
          </span>
          <ChevronDown size={18} className="animate-bounce" />
        </span>
      </div>

      {/* Raccordo verso la sezione successiva */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-oro/30 to-transparent" />
    </section>
  );
}
