import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR).',
  robots: { index: false, follow: true },
};

const sections = [
  {
    title: 'Titolare del trattamento',
    body: [
      `${company.legalName}, con sede in ${company.address.full} — P.IVA ${company.vat}.`,
      `Per qualsiasi richiesta relativa ai tuoi dati puoi scrivere a ${company.email} o telefonare al ${company.phones.marketing.display}.`,
    ],
  },
  {
    title: 'Quali dati raccogliamo',
    body: [
      'Dati che ci fornisci volontariamente tramite il modulo di contatto: nome e cognome, indirizzo email, numero di telefono, città, tipo di attività e il contenuto del messaggio.',
      'Dati tecnici di navigazione raccolti automaticamente dal server (indirizzo IP, tipo di browser, pagine visitate), utilizzati esclusivamente per garantire il funzionamento e la sicurezza del sito.',
    ],
  },
  {
    title: 'Perché li trattiamo',
    body: [
      'Per rispondere alle tue richieste di informazioni, elaborare preventivi e gestire il rapporto commerciale. La base giuridica è l’esecuzione di misure precontrattuali richieste dall’interessato (art. 6.1.b GDPR) e il consenso da te prestato (art. 6.1.a GDPR).',
      'Per adempiere a obblighi di legge, fiscali e contabili, quando si instaura un rapporto contrattuale (art. 6.1.c GDPR).',
    ],
  },
  {
    title: 'Per quanto tempo',
    body: [
      'I dati inviati tramite il modulo di contatto sono conservati per il tempo necessario a gestire la richiesta e, in caso di rapporto commerciale, per i termini previsti dalla normativa fiscale (10 anni).',
      'Se non si instaura alcun rapporto, i dati vengono cancellati entro 24 mesi dall’ultimo contatto.',
    ],
  },
  {
    title: 'A chi li comunichiamo',
    body: [
      'I dati non sono diffusi né ceduti a terzi per finalità di marketing. Possono essere trattati da soggetti che ci forniscono servizi tecnici (hosting, posta elettronica), nominati responsabili del trattamento ai sensi dell’art. 28 GDPR.',
    ],
  },
  {
    title: 'I tuoi diritti',
    body: [
      'Puoi in qualsiasi momento chiedere accesso, rettifica, cancellazione, limitazione o portabilità dei tuoi dati, opporti al trattamento e revocare il consenso prestato.',
      `Per esercitare questi diritti scrivi a ${company.email}. Hai inoltre diritto di proporre reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Informativa"
        title="Privacy Policy"
        lead="Come trattiamo i dati personali che ci affidi, ai sensi del Regolamento UE 2016/679."
        image="/images/hero-4.webp"
        crumbs={[{ label: 'Privacy Policy' }]}
      />

      <section className="bg-avorio py-24">
        <div className="container-ac">
          <div className="mx-auto max-w-3xl">
            {sections.map((s, i) => (
              <div key={s.title} className="border-b border-carbone/8 py-10 first:pt-0">
                <div className="flex gap-5">
                  <span className="font-display text-sm font-bold text-rosso">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-bold tracking-tight text-carbone">
                      {s.title}
                    </h2>
                    <div className="mt-4 space-y-4 text-pretty text-[15px] leading-relaxed text-carbone/65">
                      {s.body.map((p, k) => (
                        <p key={k}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <p className="pt-10 text-xs text-carbone/40">
              Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
