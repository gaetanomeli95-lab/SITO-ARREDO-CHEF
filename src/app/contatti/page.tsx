import type { Metadata } from 'next';
import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Contatti',
  description: `Contatta Arredo Chef: ${company.address.full}. Telefono ${company.phones.marketing.display}, email ${company.email}. Sopralluogo e preventivo gratuiti.`,
};

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  company.address.mapsQuery
)}`;

const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  company.address.mapsQuery
)}&output=embed`;

export default function ContattiPage() {
  const cards = [
    {
      icon: Phone,
      label: company.phones.marketing.label,
      value: company.phones.marketing.display,
      href: `tel:${company.phones.marketing.tel}`,
      note: 'Il modo più rapido per avere una risposta.',
    },
    {
      icon: Phone,
      label: company.phones.admin.label,
      value: company.phones.admin.display,
      href: `tel:${company.phones.admin.tel}`,
      note: 'Fatturazione, ordini e pratiche.',
    },
    {
      icon: Mail,
      label: 'Email',
      value: company.email,
      href: `mailto:${company.email}`,
      note: 'Allega planimetrie o foto del locale.',
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Parliamone"
        title={
          <>
            Tu parli.
            <br />
            <span className="text-nebbia">Noi ascoltiamo.</span>
          </>
        }
        lead="Sopralluogo e preventivo sono gratuiti e senza impegno. Raccontaci il locale, il budget e i tempi: al resto pensiamo noi."
        image="/images/hero-2.webp"
        crumbs={[{ label: 'Contatti' }]}
      />

      {/* Recapiti rapidi: sovrapposti al passaggio scuro/chiaro */}
      <section
        data-nav-theme="light"
        className="relative bg-gradient-to-b from-carbone via-sabbia to-avorio pb-6 pt-10 md:pt-16"
      >
        <div className="container-ac relative">
          <div className="grid gap-3 md:grid-cols-3 md:gap-4">
            {cards.map((c, i) => (
              <Reveal key={c.value} delay={i * 0.08}>
                <a
                  href={c.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-carbone/15 bg-white p-7 shadow-lift transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:border-rosso/30 hover:shadow-lift"
                >
                  <span className="absolute inset-x-0 top-0 h-px w-full origin-left scale-x-0 bg-rosso transition-transform duration-600 ease-smooth group-hover:scale-x-100" />
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rosso/10 text-rosso transition-all duration-500 group-hover:bg-rosso group-hover:text-white">
                    <c.icon size={18} />
                  </span>
                  <span className="mt-6 text-[10px] font-bold uppercase tracking-widest2 text-carbone/65">
                    {c.label}
                  </span>
                  <span className="mt-2 break-all font-display text-lg font-bold tracking-tight text-carbone transition-colors group-hover:text-rosso">
                    {c.value}
                  </span>
                  <span className="mt-3 text-[13px] leading-relaxed text-carbone/70">
                    {c.note}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modulo + info */}
      <section
        data-nav-theme="light"
        className="relative overflow-hidden bg-gradient-to-b from-avorio via-sabbia to-avorio py-16 md:py-24"
      >
        <div className="blueprint-light pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-ac relative">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <Reveal>
              <ContactForm />
            </Reveal>

            <div className="space-y-4">
              <Reveal delay={0.1}>
                <div className="overflow-hidden rounded-3xl border border-carbone/15 bg-white shadow-lift">
                  <div className="relative aspect-[4/3] w-full bg-carbone/5">
                    <iframe
                      src={mapsEmbed}
                      title={`Mappa — ${company.legalName}`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 h-full w-full border-0 grayscale-[0.35] transition-all duration-700 hover:grayscale-0"
                      allowFullScreen
                    />
                  </div>

                  <div className="p-7">
                    <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest2 text-rosso">
                      <MapPin size={13} />
                      La nostra sede
                    </span>
                    <p className="mt-4 font-display text-lg font-bold tracking-tight text-carbone">
                      {company.address.street}
                    </p>
                    <p className="mt-1 text-sm text-carbone/75">
                      {company.address.zip} {company.address.city} ({company.address.province}) ·{' '}
                      {company.address.region}
                    </p>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-carbone transition-colors hover:text-rosso"
                    >
                      Indicazioni stradali
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="rounded-3xl border border-carbone/15 bg-white p-7 shadow-lift">
                  <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest2 text-rosso">
                    <Clock size={13} />
                    Prima di scriverci
                  </span>
                  <ul className="mt-5 space-y-3.5 text-[14px] leading-relaxed text-carbone/80">
                    {[
                      'Hai le misure dello spazio? Anche approssimative aiutano molto.',
                      'Sai già se preferisci nuovo, usato o un mix delle due cose?',
                      'Hai una data di apertura da rispettare?',
                    ].map((q) => (
                      <li key={q} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-rosso" />
                        {q}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-carbone/[0.08] pt-5 text-[13px] leading-relaxed text-carbone/65">
                    Non serve avere tutte le risposte: se non le hai, veniamo a vedere il locale e
                    le troviamo insieme.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
