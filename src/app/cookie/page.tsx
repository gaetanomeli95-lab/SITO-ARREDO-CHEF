import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Informativa sull’uso dei cookie e delle tecnologie similari su questo sito.',
  robots: { index: false, follow: true },
};

export default function CookiePage() {
  return (
    <>
      <PageHeader
        eyebrow="Informativa"
        title="Cookie Policy"
        lead="Quali cookie usa questo sito e come puoi gestirli."
        image="/images/hero-4.webp"
        crumbs={[{ label: 'Cookie Policy' }]}
      />

      <section className="bg-avorio py-24">
        <div className="container-ac">
          <div className="mx-auto max-w-3xl space-y-10">
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-carbone">
                Cosa sono i cookie
              </h2>
              <p className="mt-4 text-pretty text-[15px] leading-relaxed text-carbone/65">
                I cookie sono piccoli file di testo che i siti visitati inviano al tuo dispositivo,
                dove vengono memorizzati per essere ritrasmessi al successivo accesso.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-carbone">
                Cookie tecnici
              </h2>
              <p className="mt-4 text-pretty text-[15px] leading-relaxed text-carbone/65">
                Questo sito utilizza esclusivamente cookie tecnici necessari al suo corretto
                funzionamento. Per questi cookie non è richiesto il consenso preventivo, ai sensi
                dell’art. 122 del Codice Privacy.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-carbone">
                Contenuti di terze parti
              </h2>
              <p className="mt-4 text-pretty text-[15px] leading-relaxed text-carbone/65">
                Nella pagina Contatti è incorporata una mappa fornita da Google Maps. Caricando
                quella pagina, Google può installare propri cookie e trattare dati secondo la
                propria informativa, consultabile su policies.google.com/privacy. La mappa viene
                caricata in modalità differita e solo nella pagina in cui è presente.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-carbone">
                Come gestire i cookie
              </h2>
              <p className="mt-4 text-pretty text-[15px] leading-relaxed text-carbone/65">
                Puoi bloccare o eliminare i cookie tramite le impostazioni del tuo browser. La
                disattivazione dei cookie tecnici può compromettere alcune funzionalità del sito.
              </p>
            </div>

            <div className="rounded-2xl border border-carbone/8 bg-white p-7">
              <p className="text-[15px] leading-relaxed text-carbone/65">
                Per qualsiasi chiarimento puoi scrivere a{' '}
                <a
                  href={`mailto:${company.email}`}
                  className="font-semibold text-rosso underline underline-offset-2"
                >
                  {company.email}
                </a>
                .
              </p>
            </div>

            <p className="text-xs text-carbone/40">
              Ultimo aggiornamento:{' '}
              {new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
