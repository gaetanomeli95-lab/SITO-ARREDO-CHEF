import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Mail, Phone, Radio, ShieldCheck, Truck, Wrench } from 'lucide-react';
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
  { icon: Wrench, title: 'Installazione', text: 'Consegna, montaggio e collaudo.' },
  { icon: Truck, title: 'Consegna', text: 'In Sicilia con tempi concordati.' },
  { icon: ShieldCheck, title: 'Supporto', text: 'Nuovo o usato, con assistenza.' },
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
      { '@type': 'ListItem', position: 1, name: 'Catalogo', item: 'https://www.arredochefsrls.it/catalogo' },
      { '@type': 'ListItem', position: 2, name: product.category, item: `https://www.arredochefsrls.it/catalogo?categoria=${encodeURIComponent(product.category)}` },
      { '@type': 'ListItem', position: 3, name: product.name, item: `https://www.arredochefsrls.it/catalogo/${product.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <article className="relative overflow-hidden bg-[#e7e9ea] pb-20 pt-[220px] sm:pt-[210px] md:pb-28 md:pt-[188px] lg:pt-[152px]">
        <div className="blueprint-light pointer-events-none absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-[#cdd2d5]/70 via-transparent to-transparent" />
        <div className="pointer-events-none absolute right-[-10rem] top-32 h-[32rem] w-[32rem] rounded-full bg-white/70 blur-[150px]" />

        <div className="container-ac relative">
          <nav className="relative z-10 mb-6 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-carbone/55 sm:mb-8 sm:text-[11px]">
            <Link href="/catalogo" className="transition-colors hover:text-rosso">Catalogo</Link>
            <span className="text-carbone/25">/</span>
            <Link href={`/catalogo?categoria=${encodeURIComponent(product.category)}`} className="transition-colors hover:text-rosso">{product.category}</Link>
          </nav>

          <div className="overflow-hidden rounded-[26px] border border-carbone/10 bg-white/75 shadow-[0_45px_110px_-55px_rgba(11,13,16,.48)] backdrop-blur-xl sm:rounded-[28px]">
            <div className="grid lg:grid-cols-[1.05fr_.95fr]">
              <Reveal>
                <section className="relative min-h-[400px] overflow-hidden bg-[#111419] sm:min-h-[520px] lg:min-h-[720px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3d4650]/55 via-[#1a2027]/58 to-[#0b0d10]" />
                  <div className="blueprint pointer-events-none absolute inset-0 opacity-28" />
                  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.08] to-transparent" />
                  <div className="absolute bottom-[-7rem] left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-rosso/[0.13] blur-[110px]" />

                  <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.18em] text-white/[0.82] backdrop-blur-md sm:left-7 sm:top-7 sm:tracking-[0.22em]">
                    <Radio size={10} className="text-rosso" /> Arredo Chef / Machine profile
                  </div>

                  <div className="absolute right-4 top-[58px] z-20 text-right text-[8px] font-bold uppercase leading-relaxed tracking-[0.18em] text-white/[0.58] sm:right-7 sm:top-7 sm:tracking-[0.22em]">
                    {cp?.identity.model ? `MOD. ${cp.identity.model}` : 'Professional equipment'}
                  </div>

                  <div className="absolute inset-[18%_7%_12%] sm:inset-[14%_9%_10%] lg:inset-[15%_10%_10%]">
                    <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-contain drop-shadow-[0_45px_32px_rgba(0,0,0,.72)]" />
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between gap-4 border-t border-white/15 pt-4 sm:bottom-7 sm:left-7 sm:right-7">
                    <span className="max-w-[70%] truncate text-[9px] font-bold uppercase tracking-[0.18em] text-white/[0.72] sm:tracking-[0.22em]">{product.category}</span>
                    <span className="h-px flex-1 bg-gradient-to-r from-rosso/70 to-transparent" />
                  </div>
                </section>
              </Reveal>

              <section className="relative bg-[linear-gradient(145deg,rgba(255,255,255,.98),rgba(236,239,240,.96))] p-6 sm:p-8 lg:p-10 xl:p-12">
                <Reveal delay={0.08}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center rounded-full border border-rosso/25 bg-rosso/[0.06] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-rosso">{cp ? commercialModeBadge[cp.commercial.mode] : 'Su preventivo'}</span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-carbone/45">Arredo Chef selection</span>
                  </div>

                  <h1 className="h-display mt-6 text-[clamp(2.15rem,9vw,3.4rem)] leading-[0.95] text-carbone sm:text-[clamp(2.15rem,5.4vw,4.5rem)]">{product.name}</h1>
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-rosso via-carbone/10 to-transparent" />

                  {specs.length > 0 && (
                    <div className="mt-7 overflow-hidden rounded-[22px] border border-carbone/10 bg-white/75">
                      <div className="flex items-center justify-between gap-4 border-b border-carbone/10 px-5 py-4">
                        <p className="text-[9px] font-bold uppercase tracking-[0.23em] text-carbone/50">Specifiche essenziali</p>
                        <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-rosso">Dati disponibili</span>
                      </div>
                      <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                        {specs.map((s, i) => (
                          <div key={s.label} className={`min-h-[88px] border-carbone/[0.08] p-4 ${i % 2 ? 'border-l' : ''} sm:border-l sm:first:border-l-0 lg:[&:nth-child(odd)]:border-l-0 xl:[&:nth-child(odd)]:border-l`}>
                            <dt className="text-[9px] font-bold uppercase tracking-[0.17em] text-carbone/48">{s.label}</dt>
                            <dd className="mt-2 text-[13px] font-extrabold tabular-nums text-carbone sm:text-[14px]">{s.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}

                  <div className="mt-7 space-y-4 text-pretty text-[14px] leading-relaxed text-carbone/70 sm:text-[15px]">
                    {product.description
                      .split(/(?<=\.)\s+(?=[A-ZÀÈÉÌÒÙ])/)
                      .reduce<string[]>((acc, s) => {
                        const last = acc[acc.length - 1];
                        if (last && (last + ' ' + s).length < 300) acc[acc.length - 1] = last + ' ' + s;
                        else acc.push(s);
                        return acc;
                      }, [])
                      .slice(0, 3)
                      .map((para, i) => <p key={i}>{para}</p>)}
                  </div>
                </Reveal>

                <Reveal delay={0.14}>
                  <div className="mt-8 rounded-[22px] border border-rosso/20 bg-[linear-gradient(135deg,rgba(216,35,42,.08),rgba(255,255,255,.55))] p-5 sm:p-6">
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-rosso">Preventivo configurato</p>
                    <p className="mt-3 text-sm leading-relaxed text-carbone/68">Prezzo, trasporto e installazione vengono definiti sulla configurazione reale del tuo locale.</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <a href={`tel:${company.phones.marketing.tel}`} className="btn-rosso group w-full"><Phone size={15} />Chiama Arredo Chef</a>
                      <a href={`mailto:${company.email}?subject=${subject}&body=${bodyText}`} className="btn-ghost-dark w-full"><Mail size={15} />Richiedi per email</a>
                    </div>
                    <div className="mt-3"><AddToProjectButton slug={product.slug} name={product.name} variant="cockpit" /></div>
                  </div>
                </Reveal>

                <Reveal delay={0.2}>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                    {guarantees.map((g) => (
                      <li key={g.title} className="rounded-[18px] border border-carbone/10 bg-white/65 p-4">
                        <g.icon size={17} className="text-rosso" />
                        <p className="mt-3 text-[12px] font-extrabold text-carbone">{g.title}</p>
                        <p className="mt-1 text-[11px] leading-relaxed text-carbone/55">{g.text}</p>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </section>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-16 sm:mt-20 lg:mt-24">
              <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-5">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.23em] text-rosso">Arredo Chef · Stesso reparto</span>
                    <h2 className="h-display mt-4 text-[clamp(2rem,7vw,3rem)] text-carbone sm:text-[clamp(2rem,4vw,3.3rem)]">Altre macchine da confrontare</h2>
                  </div>
                  <Link href={`/catalogo?categoria=${encodeURIComponent(product.category)}`} className="group inline-flex items-center gap-2 text-sm font-bold text-carbone transition-colors hover:text-rosso">Tutto il reparto <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
                </div>
              </Reveal>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p, i) => <Reveal key={p.slug} delay={i * 0.06}><ProductCard product={p} index={i} /></Reveal>)}
              </div>
            </section>
          )}

          <div className="mt-12 sm:mt-16">
            <Link href="/catalogo" className="group inline-flex items-center gap-2 text-sm font-bold text-carbone/60 transition-colors hover:text-rosso"><ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />Torna al catalogo</Link>
          </div>
        </div>
      </article>
    </>
  );
}
