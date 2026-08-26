import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ProjectView from '@/components/project/ProjectView';

export const metadata: Metadata = {
  title: 'Il mio progetto',
  description:
    'Le macchine che hai selezionato dal catalogo, pronte per un preventivo unico. Quantità, note e richiesta in un solo passaggio.',
  robots: { index: false, follow: true },
};

export default function ProgettoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Il mio progetto"
        title={
          <>
            Le tue macchine.
            <br />
            <span className="text-nebbia">Un solo preventivo.</span>
          </>
        }
        lead="Qui trovi tutto quello che hai aggiunto dal catalogo. Regola le quantità, aggiungi note e invia la richiesta: rispondiamo con un preventivo unico per l'intero progetto."
        image="/images/hero-2.webp"
        crumbs={[{ label: 'Il mio progetto' }]}
      />

      <section
        data-nav-theme="light"
        className="relative bg-gradient-to-b from-avorio via-sabbia to-avorio pb-24 pt-14 md:pb-32"
      >
        <div className="blueprint-light pointer-events-none absolute inset-0 opacity-60" />
        <div className="container-ac relative">
          <ProjectView />
        </div>
      </section>
    </>
  );
}
