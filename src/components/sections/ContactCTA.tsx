import Link from 'next/link';
import { ArrowRight, Mail, MapPin, Phone, Radio } from 'lucide-react';
import { company } from '@/data/company';
import Reveal from '@/components/Reveal';

export default function ContactCTA() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    company.address.mapsQuery
  )}`;

  return (
    <section
      data-nav-theme="dark"
      className="relative overflow-hidden bg-[#080a0d] py-20 text-avorio md:py-28 lg:py-36"
    >
      <div className="blueprint pointer-events-none absolute inset-0 opacity-55" />
      <div className="pointer-events-none absolute left-1/2 top-[-12rem] h-[38rem] w-[58rem] -translate-x-1/2 rounded-full bg-rosso/[0.11] blur-[155px]" />
      <div className="pointer-events-none absolute bottom-[-16rem] right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-white/[0.05] blur-[150px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="container-ac relative">
        <div className="overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-[#171c22]/95 via-[#0d1014]/96 to-[#080a0d] shadow-[0_50px_140px_-55px_rgba(0,0,0,.95)]">
          <span className="block h-px w-full bg-gradient-to-r from-transparent via-rosso/70 to-transparent shadow-[0_0_18px_rgba(216,35,42,.4)]" />

          <div className="grid lg:grid-cols-[1.2fr_.8fr]">
            <div className="relative p-7 sm:p-10 lg:p-14">
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-rosso/35 bg-rosso/10 font-display text-[11px] font-extrabold text-rosso">
                    08
                  </span>
                  <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.36em] text-rosso">
                    <Radio size={11} /> Project command center
                  </span>
                </div>

                <h2 className="h-display mt-7 max-w-3xl text-[clamp(2.8rem,5.8vw,5.3rem)] text-white">
                  Il prossimo locale
                  <br />
                  <span className="text-steel">può iniziare da qui.</span>
                </h2>

                <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-white/56">
                  Raccontaci cosa stai aprendo, rinnovando o sostituendo. Mettiamo ordine tra spazio,
                  attrezzature e budget e trasformiamo la richiesta in un progetto concreto.
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Link href="/contatti" className="btn-rosso group">
                    Avvia il progetto
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a href={`tel:${company.phones.marketing.tel}`} className="btn-ghost-light">
                    <Phone size={15} />
                    {company.phones.marketing.display}
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <div className="h-full border-t border-white/10 bg-white/[0.025] p-7 backdrop-blur-xl sm:p-9 lg:border-l lg:border-t-0 lg:p-10">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/28">
                    Contact nodes
                  </span>
                  <span className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.25em] text-white/28">
                    <span className="h-1.5 w-1.5 rounded-full bg-rosso shadow-[0_0_9px_rgba(216,35,42,.9)]" />
                    Online
                  </span>
                </div>

                <div className="mt-8 space-y-4">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 rounded-[20px] border border-white/10 bg-white/[0.025] p-4 transition-all hover:border-rosso/35 hover:bg-white/[0.04]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] text-rosso">
                      <MapPin size={17} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[8px] font-bold uppercase tracking-[0.24em] text-white/30">
                        Showroom / sede
                      </span>
                      <span className="mt-2 block font-display text-lg font-bold text-white transition-colors group-hover:text-rosso">
                        {company.address.street}
                      </span>
                      <span className="mt-1 block text-sm text-white/45">
                        {company.address.zip} {company.address.city} ({company.address.province}) · {company.address.region}
                      </span>
                    </span>
                  </a>

                  {[company.phones.marketing, company.phones.admin].map((p) => (
                    <a
                      key={p.tel}
                      href={`tel:${p.tel}`}
                      className="group flex items-center gap-4 rounded-[20px] border border-white/10 bg-white/[0.025] p-4 transition-all hover:border-rosso/35 hover:bg-white/[0.04]"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] text-white/60 transition-colors group-hover:text-rosso">
                        <Phone size={16} />
                      </span>
                      <span>
                        <span className="block text-[8px] font-bold uppercase tracking-[0.24em] text-white/28">
                          {p.label}
                        </span>
                        <span className="mt-1 block font-display text-base font-bold text-white">
                          {p.display}
                        </span>
                      </span>
                    </a>
                  ))}

                  <a
                    href={`mailto:${company.email}`}
                    className="group flex items-center gap-4 rounded-[20px] border border-white/10 bg-white/[0.025] p-4 transition-all hover:border-rosso/35 hover:bg-white/[0.04]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] text-white/60 transition-colors group-hover:text-rosso">
                      <Mail size={16} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[8px] font-bold uppercase tracking-[0.24em] text-white/28">
                        Email
                      </span>
                      <span className="mt-1 block break-all font-display text-sm font-bold text-white">
                        {company.email}
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
