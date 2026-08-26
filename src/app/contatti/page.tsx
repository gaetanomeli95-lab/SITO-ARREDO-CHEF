import type { Metadata } from 'next';
import { ArrowRight, Clock, Mail, MapPin, Phone, Radio } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Contatti',
  description: `Contatta Arredo Chef: ${company.address.full}. Telefono ${company.phones.marketing.display}, email ${company.email}.`,
};

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address.mapsQuery)}`;
const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(company.address.mapsQuery)}&output=embed`;

export default function ContattiPage() {
  return (
    <>
      <section data-nav-theme="dark" className="relative isolate overflow-hidden bg-[#080a0d] pt-32 text-white sm:pt-36 lg:pt-40">
        <div className="blueprint pointer-events-none absolute inset-0 opacity-42" />
        <div className="pointer-events-none absolute left-1/2 top-[-12rem] h-[44rem] w-[70rem] -translate-x-1/2 rounded-full bg-rosso/[0.12] blur-[170px]" />
        <div className="pointer-events-none absolute right-[-10rem] top-[25%] h-[30rem] w-[30rem] rounded-full bg-white/[0.05] blur-[150px]" />

        <div className="container-ac relative z-10 pb-14 sm:pb-18 lg:pb-20">
          <div className="grid min-h-[62svh] gap-10 py-10 lg:grid-cols-[1fr_420px] lg:items-end lg:py-14">
            <Reveal>
              <div>
                <div className="flex items-center gap-3 text-rosso">
                  <Radio size={13} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Arredo Chef / Project command center</span>
                </div>
                <h1 className="h-display mt-6 max-w-5xl text-[clamp(3.5rem,10vw,8rem)] leading-[.88] text-white">
                  Non mandarci
                  <br />
                  <span className="text-steel">una richiesta.</span>
                  <br />
                  <span className="text-rosso">Mandaci il progetto.</span>
                </h1>
                <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-white/[0.7] sm:text-lg">
                  Foto, misure, planimetria, budget, data di apertura o anche solo un’idea ancora confusa. Più contesto abbiamo, più velocemente possiamo dirti cosa serve davvero.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="border-l border-white/12 pl-6 sm:pl-8">
                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-white/[0.38]">Canale diretto</p>
                <a href={`tel:${company.phones.marketing.tel}`} className="mt-4 block font-display text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-none text-white transition-colors hover:text-rosso">{company.phones.marketing.display}</a>
                <p className="mt-4 text-sm leading-relaxed text-white/[0.58]">Per preventivi, sopralluoghi e nuove forniture.</p>
                <div className="mt-8 h-px w-full bg-gradient-to-r from-rosso to-transparent" />
                <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.24em] text-white/[0.38]">Sede</p>
                <p className="mt-3 font-display text-xl font-extrabold">{company.address.street}</p>
                <p className="mt-1 text-sm text-white/[0.55]">{company.address.zip} {company.address.city} ({company.address.province})</p>
              </div>
            </Reveal>
          </div>

          <div className="grid border-y border-white/10 sm:grid-cols-3">
            <a href={`tel:${company.phones.marketing.tel}`} className="group flex items-center gap-4 py-5 sm:px-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rosso text-white"><Phone size={16} /></span>
              <span><span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-white/[0.38]">Vendita</span><span className="mt-1 block text-sm font-bold text-white group-hover:text-rosso">Chiama ora</span></span>
            </a>
            <a href={`mailto:${company.email}`} className="group flex items-center gap-4 border-t border-white/10 py-5 sm:border-l sm:border-t-0 sm:px-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white"><Mail size={16} /></span>
              <span className="min-w-0"><span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-white/[0.38]">Email</span><span className="mt-1 block truncate text-sm font-bold text-white group-hover:text-rosso">{company.email}</span></span>
            </a>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 border-t border-white/10 py-5 sm:border-l sm:border-t-0 sm:px-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white"><MapPin size={16} /></span>
              <span><span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-white/[0.38]">Showroom</span><span className="mt-1 block text-sm font-bold text-white group-hover:text-rosso">Apri indicazioni</span></span>
            </a>
          </div>
        </div>
      </section>

      <section data-nav-theme="light" className="relative overflow-hidden bg-[#e9ecee] py-16 sm:py-20 md:py-28 lg:py-32">
        <div className="blueprint-light pointer-events-none absolute inset-0 opacity-45" />
        <div className="container-ac relative">
          <div className="grid gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
            <Reveal>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-rosso">01 / Raccontaci il locale</p>
                <h2 className="h-display mt-5 max-w-3xl text-[clamp(2.7rem,6vw,5rem)] text-carbone">Più informazioni entrano, meno errori escono.</h2>
                <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-carbone/65">Il modulo non è una formalità: è il primo briefing del progetto. Compila ciò che sai, lascia vuoto ciò che ancora non sai.</p>
                <div className="mt-8"><ContactForm /></div>
              </div>
            </Reveal>

            <div className="space-y-8">
              <Reveal delay={0.08}>
                <div>
                  <div className="flex items-center gap-3 text-rosso"><Clock size={15} /><span className="text-[10px] font-bold uppercase tracking-[0.24em]">Prima di scriverci</span></div>
                  <div className="mt-5 border-y border-carbone/12">
                    {[
                      ['01', 'Misure o planimetria', 'Anche approssimative. Ci aiutano a capire subito scala e vincoli.'],
                      ['02', 'Tipo di locale e produzione', 'Pizzeria, bar, ristorante, pasticceria: il flusso cambia completamente.'],
                      ['03', 'Budget e data obiettivo', 'Non per limitare il progetto, ma per costruire una proposta realistica.'],
                    ].map(([n, title, text]) => (
                      <div key={n} className="grid grid-cols-[52px_minmax(0,1fr)] gap-4 border-b border-carbone/10 py-5 last:border-b-0">
                        <span className="font-display text-2xl font-black text-carbone/12">{n}</span>
                        <div><h3 className="font-display text-lg font-extrabold text-carbone">{title}</h3><p className="mt-2 text-[13px] leading-relaxed text-carbone/62">{text}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="overflow-hidden rounded-[26px] border border-carbone/10 bg-white shadow-[0_32px_80px_-48px_rgba(11,13,16,.45)]">
                  <div className="relative aspect-[4/3] bg-carbone/5">
                    <iframe src={mapsEmbed} title={`Mappa — ${company.legalName}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0 grayscale-[0.3] transition-all duration-700 hover:grayscale-0" allowFullScreen />
                  </div>
                  <div className="p-6 sm:p-7">
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-rosso">02 / Vieni in sede</p>
                    <h3 className="mt-3 font-display text-2xl font-extrabold text-carbone">{company.address.street}</h3>
                    <p className="mt-2 text-sm text-carbone/62">{company.address.zip} {company.address.city} ({company.address.province}) · {company.address.region}</p>
                    <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-carbone transition-colors hover:text-rosso">Indicazioni stradali <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="border-l-2 border-rosso pl-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-rosso">Amministrazione</p>
                  <a href={`tel:${company.phones.admin.tel}`} className="mt-2 block font-display text-2xl font-extrabold text-carbone hover:text-rosso">{company.phones.admin.display}</a>
                  <p className="mt-2 text-sm text-carbone/58">Ordini, fatturazione e pratiche amministrative.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
