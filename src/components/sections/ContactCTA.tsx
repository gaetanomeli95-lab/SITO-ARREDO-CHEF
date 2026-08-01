import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { company } from '@/data/company';
import Reveal from '@/components/Reveal';

export default function ContactCTA() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    company.address.mapsQuery
  )}`;

  return (
    <section
      data-nav-theme="dark"
      className="relative overflow-hidden bg-carbone py-20 md:py-28 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-2.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-carbone via-carbone/92 to-carbone/65" />
      </div>
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 animate-breathe rounded-full bg-rosso/14 blur-[140px]" />

      <div className="container-ac relative">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal>
            {/* Marchio come sigillo */}
            <span className="relative mb-8 block h-14 w-14 opacity-90">
              <Image
                src="/images/logo-mark.webp"
                alt=""
                fill
                sizes="56px"
                className="object-contain"
              />
            </span>

            <span className="eyebrow text-oro">Iniziamo</span>
            <h2 className="h-display mt-6 text-[clamp(2.2rem,5.2vw,4.1rem)] text-avorio">
              Stai progettando
              <br />
              o rinnovando il tuo locale?
            </h2>
            <p className="mt-7 max-w-lg text-pretty text-base leading-relaxed text-cenere/85">
              Raccontaci cosa ti serve. Ti aiutiamo a individuare le attrezzature più adatte al tuo
              spazio e al tuo budget.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contatti" className="btn-rosso group">
                Richiedi preventivo
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <a href={`tel:${company.phones.marketing.tel}`} className="btn-ghost-light">
                <Phone size={15} />
                {company.phones.marketing.display}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-white/10 bg-grafite/80 p-6 backdrop-blur-sm sm:p-8">
              <h3 className="text-[10px] font-bold uppercase tracking-widest2 text-oro">
                Dove siamo
              </h3>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 flex gap-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rosso/20 text-rosso-light">
                  <MapPin size={17} />
                </span>
                <span>
                  <span className="block font-display text-lg font-bold text-avorio transition-colors group-hover:text-oro">
                    {company.address.street}
                  </span>
                  <span className="mt-1 block text-sm text-cenere/75">
                    {company.address.zip} {company.address.city} ({company.address.province}) ·{' '}
                    {company.address.region}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-oro">
                    Apri in Google Maps
                    <ArrowRight size={12} />
                  </span>
                </span>
              </a>

              <div className="mt-8 space-y-5 border-t border-white/10 pt-8">
                {[company.phones.marketing, company.phones.admin].map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="group flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-cenere transition-all duration-400 group-hover:bg-rosso group-hover:text-white">
                      <Phone size={16} />
                    </span>
                    <span>
                      <span className="block text-[10px] font-semibold uppercase tracking-widest text-cenere/70">
                        {p.label}
                      </span>
                      <span className="block font-display text-base font-bold text-avorio">
                        {p.display}
                      </span>
                    </span>
                  </a>
                ))}

                <a href={`mailto:${company.email}`} className="group flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-cenere transition-all duration-400 group-hover:bg-rosso group-hover:text-white">
                    <Mail size={16} />
                  </span>
                  <span>
                    <span className="block text-[10px] font-semibold uppercase tracking-widest text-cenere/70">
                      Scrivici
                    </span>
                    <span className="block break-all font-display text-sm font-bold text-avorio">
                      {company.email}
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
