import { Suspense } from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import CatalogBrowser from '@/components/catalog/CatalogBrowser';
import { categories, products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Catalogo attrezzature professionali',
  description: `Oltre ${products.length} attrezzature professionali per ristoranti, bar, hotel e pizzerie: cottura, refrigerazione, forni, lavaggio, vetrine. Nuovo e usato revisionato. Villabate (PA).`,
};

export default function CatalogoPage() {
  return (
    <>
      <PageHeader
        eyebrow={`${products.length} prodotti · ${categories.length} reparti`}
        title={
          <>
            Il catalogo.
            <br />
            <span className="text-nebbia">Nuovo e usato revisionato.</span>
          </>
        }
        lead="Cottura, refrigerazione, forni, lavaggio, vetrine e macchinari da banco. Ogni scheda è il punto di partenza per un preventivo su misura: nessun prezzo standard, perché nessun locale è standard."
        image="/images/catalog-digital-stage-v1.webp"
        crumbs={[{ label: 'Catalogo' }]}
      />

      <Suspense
        fallback={
          <div className="bg-carbone py-32 text-center text-sm text-white/40">
            Caricamento catalogo…
          </div>
        }
      >
        <CatalogBrowser />
      </Suspense>
    </>
  );
}
