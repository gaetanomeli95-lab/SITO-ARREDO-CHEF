'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Crosshair } from 'lucide-react';
import { categories, products, countByCategory } from '@/data/products';
import { categoryIconFor } from '@/lib/catalog';
import Reveal from '@/components/Reveal';

function coverFor(category: string) {
  return products.find((p) => p.category === category)?.image ?? '/images/hero-1.webp';
}

function zoneFor(category: string) {
  const value = category.toLowerCase();
  if (value.includes('cott') || value.includes('forn') || value.includes('pizza')) return { code: 'HOT ZONE', title: 'Produzione e cottura', text: 'Il cuore caldo della cucina: potenza, continuità e tempi di servizio devono lavorare insieme.' };
  if (value.includes('frigo') || value.includes('fredd') || value.includes('refriger')) return { code: 'COLD ZONE', title: 'Conservazione e freddo', text: 'Temperature, capacità e flussi di apertura diventano parte del progetto operativo del locale.' };
  if (value.includes('lav') || value.includes('stov')) return { code: 'WASH ZONE', title: 'Lavaggio e ripristino', text: 'Il ciclo sporco-pulito va dimensionato sul servizio reale, non soltanto sul numero di coperti.' };
  if (value.includes('prep') || value.includes('impast') || value.includes('lavor')) return { code: 'PREP ZONE', title: 'Preparazione', text: 'Spazi, velocità e sequenza di lavoro devono ridurre movimenti inutili prima che inizi il servizio.' };
  if (value.includes('bar') || value.includes('vetr') || value.includes('espos')) return { code: 'SERVICE ZONE', title: 'Servizio ed esposizione', text: 'La macchina incontra il cliente: performance e presentazione devono sostenersi a vicenda.' };
  return { code: 'WORK ZONE', title: 'Zona operativa', text: 'Ogni reparto occupa una funzione precisa nel flusso della cucina professionale.' };
}

export default function CategoriesSection() {
  const ordered = [...categories].sort((a, b) => countByCategory(b) - countByCategory(a)).slice(0, 6);
  const [active, setActive] = useState(0);
  const activeCategory = ordered[active] ?? ordered[0];
  const activeCount = countByCategory(activeCategory);
  const ActiveIcon = categoryIconFor(activeCategory);
  const zone = zoneFor(activeCategory);
  const step = (dir: -1 | 1) => setActive((current) => (current + dir + ordered.length) % ordered.length);

  return (
    <section data-nav-theme="light" className="relative overflow-hidden bg-[#dfe3e5] py-16 text-carbone sm:py-20 md:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0">
        <Image src="/images/hero-reparti.webp" alt="" fill sizes="100vw" className="object-cover opacity-[0.06] saturate-0" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.96)_0%,rgba(229,232,234,.9)_44%,rgba(194,200,205,.84)_100%)]" />
      </div>
      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-38" />

      <div className="container-ac relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_370px] lg:items-end">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-carbone/15 bg-white/70 font-display text-[11px] font-extrabold text-rosso">02</span>
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-rosso"><Crosshair size={12} /> Arredo Chef · Kitchen Atlas</span>
            </div>
            <h2 className="h-display mt-6 max-w-4xl text-[clamp(2.55rem,9vw,4rem)] text-carbone sm:mt-7 sm:text-[clamp(2.8rem,5.6vw,5rem)]">Non reparti separati.<br /><span className="text-[#68717b]">Zone della stessa cucina.</span></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border-l border-rosso/70 pl-5 sm:pl-6">
              <p className="text-pretty text-[13px] leading-relaxed text-carbone/70 sm:text-sm md:text-base">Esplora la cucina per funzione. Ogni zona apre direttamente il catalogo già filtrato sul reparto giusto.</p>
              <Link href="/catalogo" className="group mt-5 inline-flex items-center gap-3 text-sm font-bold text-carbone hover:text-rosso">Vedi tutti i {categories.length} reparti <ArrowRight size={15} /></Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-10 overflow-hidden rounded-[28px] border border-carbone/10 bg-white/82 shadow-[0_28px_70px_-48px_rgba(11,13,16,.38)] sm:mt-12 lg:mt-16 lg:rounded-[32px] lg:bg-white/65 lg:backdrop-blur-xl lg:shadow-[0_45px_110px_-58px_rgba(11,13,16,.48)]">
            <div className="lg:hidden">
              <div className="grid grid-cols-2 gap-2 border-b border-carbone/10 bg-white/65 p-3 sm:grid-cols-3">
                {ordered.map((cat, i) => {
                  const Icon = categoryIconFor(cat);
                  const selected = active === i;
                  return (
                    <button key={cat} type="button" onClick={() => setActive(i)} aria-pressed={selected}
                      className={`relative flex min-h-[76px] min-w-0 flex-col items-start justify-between rounded-[18px] border p-3 text-left transition-colors duration-150 ${selected ? 'border-rosso bg-rosso text-white' : 'border-carbone/10 bg-white text-carbone'}`}>
                      <div className="flex w-full items-center justify-between gap-2">
                        <Icon size={15} className={selected ? 'text-white' : 'text-rosso'} />
                        <span className={`text-[8px] font-bold uppercase tracking-[0.16em] ${selected ? 'text-white/70' : 'text-carbone/35'}`}>{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <span className="mt-3 line-clamp-2 text-[10px] font-extrabold leading-tight sm:text-[11px]">{cat}</span>
                    </button>
                  );
                })}
              </div>

              <div className="relative min-h-[520px] overflow-hidden bg-[#12171c] sm:min-h-[570px]">
                <div className="blueprint pointer-events-none absolute inset-0 opacity-24" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(116,131,143,.28),transparent_38%),linear-gradient(180deg,#222a31_0%,#111419_100%)]" />
                <span className="absolute right-5 top-4 z-10 font-display text-[5.5rem] font-black leading-none text-white/[0.04]">{String(active + 1).padStart(2, '0')}</span>
                <span className="absolute left-5 top-5 z-10 flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.22em] text-white/[0.64]"><span className="h-1.5 w-1.5 rounded-full bg-rosso" />{zone.code}</span>

                {ordered.map((cat, i) => (
                  <div
                    key={cat}
                    aria-hidden={i !== active}
                    className={`absolute inset-x-[18%] bottom-[39%] top-[18%] transition-opacity duration-150 sm:inset-x-[20%] sm:bottom-[36%] sm:top-[17%] ${i === active ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                  >
                    <Image src={coverFor(cat)} alt={i === active ? cat : ''} fill sizes="64vw" className="object-contain object-center drop-shadow-[0_20px_18px_rgba(0,0,0,.58)]" />
                  </div>
                ))}

                <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/12 bg-[#0f1317] p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-5">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-rosso"><ActiveIcon size={16} /><span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/[0.54]">{activeCount} {activeCount === 1 ? 'prodotto' : 'prodotti'}</span></div>
                      <h3 className="mt-2 font-display text-[1.8rem] font-extrabold leading-none text-white">{activeCategory}</h3>
                      <p className="mt-3 max-w-md text-[12px] leading-relaxed text-white/[0.62]">{zone.text}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button type="button" onClick={() => step(-1)} aria-label="Reparto precedente" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/[0.72]"><ChevronLeft size={16} /></button>
                      <button type="button" onClick={() => step(1)} aria-label="Reparto successivo" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/[0.72]"><ChevronRight size={16} /></button>
                    </div>
                  </div>
                  <Link href={`/catalogo?categoria=${encodeURIComponent(activeCategory)}`} className="mt-5 flex min-h-12 w-full items-center justify-between rounded-full bg-rosso px-5 text-sm font-bold text-white">Entra in {activeCategory}<ArrowUpRight size={15} /></Link>
                </div>
              </div>
            </div>

            <div className="hidden min-h-[700px] lg:grid lg:grid-cols-[350px_minmax(0,1fr)]">
              <div className="relative border-r border-carbone/10 bg-[linear-gradient(180deg,rgba(241,243,244,.92),rgba(215,220,223,.88))] p-5 xl:p-6">
                <div className="mb-5 flex items-center justify-between px-3 pt-2"><span className="text-[9px] font-bold uppercase tracking-[0.24em] text-carbone/42">Operating zones</span><span className="text-[9px] font-bold uppercase tracking-[0.2em] text-rosso">Select / enter</span></div>
                <div className="border-t border-carbone/10">
                  {ordered.map((cat, i) => {
                    const Icon = categoryIconFor(cat);
                    const selected = active === i;
                    const count = countByCategory(cat);
                    return (
                      <Link key={cat} href={`/catalogo?categoria=${encodeURIComponent(cat)}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className={`group relative grid min-h-[88px] grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-4 border-b border-carbone/10 px-3 transition-all duration-200 ${selected ? 'bg-white/75' : 'hover:bg-white/45'}`}>
                        <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${selected ? 'border-rosso bg-rosso text-white' : 'border-carbone/10 bg-white/65 text-carbone/58'}`}><Icon size={17} /></span>
                        <span className="min-w-0"><span className={`block text-[8px] font-bold uppercase tracking-[0.2em] ${selected ? 'text-rosso' : 'text-carbone/35'}`}>Zone {String(i + 1).padStart(2, '0')}</span><span className={`mt-1 block truncate font-display text-[1.08rem] font-extrabold ${selected ? 'text-carbone' : 'text-carbone/62'}`}>{cat}</span></span>
                        <span className="text-right"><span className="block font-display text-lg font-extrabold text-carbone/72">{count}</span><span className="block text-[7px] font-bold uppercase tracking-[0.16em] text-carbone/32">prod.</span></span>
                        <motion.span animate={{ scaleY: selected ? 1 : 0 }} className="absolute bottom-3 left-0 top-3 w-[3px] origin-center bg-rosso" />
                      </Link>
                    );
                  })}
                </div>
                <Link href="/catalogo" className="group mt-5 flex items-center justify-between px-3 py-3 text-sm font-bold text-carbone hover:text-rosso">Tutti i reparti <ArrowRight size={15} /></Link>
              </div>

              <div className="relative overflow-hidden bg-[#101419]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_56%_38%,rgba(108,124,137,.32),transparent_34%),linear-gradient(135deg,#283139_0%,#151a1f_42%,#0b0e11_100%)]" />
                <div className="blueprint pointer-events-none absolute inset-0 opacity-30" />
                <div className="absolute left-8 top-7 z-20 flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-rosso" /><span className="text-[9px] font-bold uppercase tracking-[0.26em] text-white/[0.62]">Arredo Chef / kitchen mapping</span></div>
                <span className="absolute right-8 top-4 z-10 font-display text-[9rem] font-black leading-none text-white/[0.04] xl:text-[11rem]">{String(active + 1).padStart(2, '0')}</span>

                <AnimatePresence mode="wait">
                  <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-x-[21%] bottom-[34%] top-[16%] xl:inset-x-[23%] xl:bottom-[32%] xl:top-[17%]">
                    <Image src={coverFor(activeCategory)} alt={activeCategory} fill sizes="38vw" className="object-contain object-center drop-shadow-[0_30px_26px_rgba(0,0,0,.65)]" />
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div key={`${activeCategory}-copy`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }} className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/12 bg-[#0d1115]/94 p-7 xl:p-8">
                    <div className="grid grid-cols-[minmax(0,1fr)_260px] items-end gap-8">
                      <div><div className="flex items-center gap-2.5 text-rosso"><ActiveIcon size={17} /><span className="text-[9px] font-bold uppercase tracking-[0.23em]">{zone.code}</span></div><h3 className="mt-3 font-display text-[clamp(2.4rem,4vw,4.2rem)] font-extrabold leading-[.92] text-white">{activeCategory}</h3><p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-white/[0.65]">{zone.text}</p></div>
                      <div className="border-l border-white/12 pl-6"><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/[0.38]">{zone.title}</p><p className="mt-2 font-display text-3xl font-extrabold text-white">{activeCount}</p><p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/[0.42]">prodotti disponibili</p><Link href={`/catalogo?categoria=${encodeURIComponent(activeCategory)}`} className="group mt-5 inline-flex items-center gap-3 text-sm font-bold text-white hover:text-rosso">Apri il reparto <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rosso text-white"><ArrowUpRight size={14} /></span></Link></div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
