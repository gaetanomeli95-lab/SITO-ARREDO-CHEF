import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Mail, Phone, Truck, Wrench } from 'lucide-react';
import { getProduct, products, relatedProducts } from '@/data/products';
import { company } from '@/data/company';
import { commercialModeBadge, essentialSpecs, getCatalogProduct } from '@/lib/catalog';
import ProductCard from '@/components/ProductCard';
import AddToProjectButton from '@/components/project/AddToProjectButton';
import Reveal from '@/components/Reveal';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: 'Prodotto non trovato' };

  return {
    title: product.name,
    description: product.description.slice(0, 300),
    openGraph: {
      title: `${product.name} — Arredo Chef`,
      description: product.description.slice(0, 300),
      images: [{ url: product.image, width: 1024, height: 1024, alt: product.name }],
    },
  };
}

const guarantees = [
  { icon: Wrench, title: 'Installazione inclusa', text: 'Consegniamo, montiamo e collaudiamo.' },
  { icon: Truck, title: 'Consegna in Sicilia', text: 'Mezzi nostri, tempi concordati.' },
  { icon: Check, title: 'Nuovo o usato', text: 'Ti proponiamo entrambe le opzioni.' },
];

export default function ProductPage({ params }: Props) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const cp = getCatalogProduct(product.slug);
  const specs = cp ? essentialSpecs(cp, 6) : [];
  const related = relatedProducts(product.slug, 4);

  const subject = encodeURIComponent(`Richiesta informazioni — ${product.name}`);
  const bodyText = encodeURIComponent(
    `Buongiorno,\n\nvorrei ricevere informazioni e un preventivo per:\n${product.name}\n\nTipo di locale: \nCittà: \nNuovo o usato: \n\nGrazie.`
  );

  // JSON-LD onesto: nessun prezzo, nessuna disponibilità, nessun brand
  // se il dato non è realmente noto. Offer verrà aggiunta solo quando
  // esisterà un prezzo reale.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    category: product.category,
    ...(cp?.identity.brand ? { brand: { '@type': 'Brand', name: cp.identity.brand } } : {}),
    ...(cp?.identity.model ? { model: cp.identity.model } : {}),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Catalogo',
        item: 'https://www.arredochefsrls.it/catalogo',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: product.category,
        item: `https://www.arredochefsrls.it/catalogo?categoria=${encodeURIComponent(product.category)}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://www.arredochefsrls.it/catalogo/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <article
        data-nav-theme="light"
        className="relative overflow-hidden bg-gradient-to-b from-avorio via-sabbia to-avorio pb-28 pt-32 md:pt-36"
      >
        <div className="blueprint-light pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-oro/[0.07] blur-[130px]" />

        <div className="container-ac relative">
          {/* Briciole */}
          <nav className="mb-10 flex flex-wrap items-center gap-2 text-xs text-carbone/45">
            <Link href="/catalogo" className="transition-colors hover:text-rosso">
              Catalogo
            </Link>
            <span className="text-carbone/20">/</span>
            <Link
              href={`/catalogo?categoria=${encodeURIComponent(product.category)}`}
              className="transition-colors hover:text-rosso"
            >
              {product.category}
            </Link>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            {/* Immagine */}
            <Reveal>
              <div className="surface-light group relative overflow-hidden rounded-3xl shadow-lift-sm">
                <div className="blueprint-light pointer-events-none absolute inset-0 opacity-70" />
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-10 mix-blend-multiply transition-transform duration-700 ease-smooth group-hover:scale-105"
                  />
                  {/* Ombra di appoggio */}
                  <span className="pointer-events-none absolute inset-x-24 bottom-12 h-8 rounded-[100%] bg-carbone/12 blur-2xl" />
                </div>
                <span className="absolute left-5 top-5 rounded-full bg-carbone px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-avorio">
                  {product.category}
                </span>
              </div>
            </Reveal>

            {/* Dettagli — Machine Cockpit */}
            <div className="lg:pt-4">
              <Reveal delay={0.1}>
                {cp && (
                  <span className="eyebrow text-rosso">
                    {commercialModeBadge[cp.commercial.mode]}
                    {cp.identity.model ? ` · Mod. ${cp.identity.model}` : ''}
                  </span>
                )}
                <h1 className="h-display mt-4 text-[clamp(1.9rem,4.2vw,3.1rem)] text-carbone">
                  {product.name}
                </h1>

                {/* Red Line */}
                <div className="mt-6 h-px w-full bg-gradient-to-r from-rosso/60 via-rosso/25 to-transparent" />

                {/* Specifiche essenziali dichiarate — solo dati reali */}
                {specs.length > 0 && (
                  <div className="surface-light mt-6 rounded-2xl border border-carbone/10 p-5">
                    <p className="eyebrow mb-4 text-rosso">Specifiche tecniche</p>
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                      {specs.map((s) => (
                        <div
                          key={s.label}
                          className="border-l border-carbone/10 pl-3 transition-colors duration-300 hover:border-rosso/50"
                        >
                          <dt className="text-[10px] font-bold uppercase tracking-widest text-carbone/45">
                            {s.label}
                          </dt>
                          <dd className="mt-1 text-[13px] font-semibold tabular-nums text-carbone">
                            {s.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                <div className="mt-6 space-y-4 text-pretty text-[15px] leading-relaxed text-carbone/65">
                  {product.description
                    .split(/(?<=\.)\s+(?=[A-ZÀÈÉÌÒÙ])/)
                    .reduce<string[]>((acc, s) => {
                      const last = acc[acc.length - 1];
                      if (last && (last + ' ' + s).length < 320) {
                        acc[acc.length - 1] = last + ' ' + s;
                      } else {
                        acc.push(s);
                      }
                      return acc;
                    }, [])
                    .map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                </div>
              </Reveal>

              {/* Prezzo su misura */}
              <Reveal delay={0.18}>
                <div className="mt-10 rounded-2xl border border-rosso/20 bg-gradient-to-br from-rosso/[0.08] to-rosso/[0.02] p-6 shadow-lift-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest2 text-rosso">
                    Prezzo su preventivo
                  </p>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-carbone/65">
                    Non pubblichiamo listini perché il costo reale dipende da configurazione,
                    trasporto, installazione e dalla scelta tra nuovo e usato revisionato.
                    Chiamaci: in giornata sai quanto spendi.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={`tel:${company.phones.marketing.tel}`} className="btn-rosso group">
                      <Phone size={15} />
                      {company.phones.marketing.display}
                    </a>
                    <a
                      href={`mailto:${company.email}?subject=${subject}&body=${bodyText}`}
                      className="btn-ghost-dark"
                    >
                      <Mail size={15} />
                      Richiedi per email
                    </a>
                    <AddToProjectButton
                      slug={product.slug}
                      name={product.name}
                      variant="cockpit"
                    />
                  </div>
                </div>
              </Reveal>

              {/* Garanzie */}
              <Reveal delay={0.24}>
                <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                  {guarantees.map((g) => (
                    <li
                      key={g.title}
                      className="surface-light group rounded-xl p-4 transition-all duration-400 hover:-translate-y-0.5 hover:border-rosso/25"
                    >
                      <g.icon size={17} className="text-rosso" />
                      <p className="mt-3 text-[13px] font-bold text-carbone">{g.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-carbone/50">{g.text}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          {/* Correlati */}
          {related.length > 0 && (
            <div className="mt-28">
              <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <span className="eyebrow text-rosso">Stesso reparto</span>
                    <h2 className="h-display mt-5 text-[clamp(1.7rem,3.4vw,2.6rem)] text-carbone">
                      Potrebbe servirti anche
                    </h2>
                  </div>
                  <Link
                    href={`/catalogo?categoria=${encodeURIComponent(product.category)}`}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-carbone transition-colors hover:text-rosso"
                  >
                    Tutto il reparto
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </Reveal>

              <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {related.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 0.07}>
                    <ProductCard product={p} index={i} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          <div className="mt-20">
            <Link
              href="/catalogo"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-carbone/60 transition-colors hover:text-rosso"
            >
              <ArrowLeft
                size={15}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Torna al catalogo
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
