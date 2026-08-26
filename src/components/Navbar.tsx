'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, Menu, Phone, X } from 'lucide-react';
import { company, navLinks } from '@/data/company';
import Logo from '@/components/Logo';
import ProjectIndicator from '@/components/project/ProjectIndicator';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const shell = scrolled
    ? 'border-white/12 bg-[#11151a]/95 shadow-[0_18px_48px_-30px_rgba(0,0,0,.82)] md:bg-carbone/[0.9] md:backdrop-blur-2xl md:shadow-[0_24px_70px_-30px_rgba(0,0,0,.9)]'
    : 'border-white/10 bg-[#11151a]/92 md:bg-carbone/[0.7] md:backdrop-blur-xl';

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-all duration-300 md:px-5">
        <nav
          className={`container-ac pointer-events-auto relative flex items-center justify-between gap-4 overflow-hidden rounded-[24px] border !px-4 transition-all duration-300 md:!px-5 ${shell} ${
            scrolled ? 'py-1.5' : 'py-2.5'
          }`}
        >
          <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
          <Link href="/" aria-label="Arredo Chef — home" className="group relative z-10 flex items-center gap-4">
            <Logo
              width={scrolled ? 148 : 172}
              priority
              className="transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(216,35,42,.28)]"
            />
            <span className="hidden h-8 w-px bg-white/12 2xl:block" />
            <span className="hidden text-[7px] font-bold uppercase leading-[1.7] tracking-[0.32em] text-white/38 2xl:block">
              Professional<br />kitchen systems
            </span>
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${active ? 'text-white' : 'text-avorio/55 hover:text-white'}`}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-rosso"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <ProjectIndicator tone="dark" />
            <a
              href={`tel:${company.phones.marketing.tel}`}
              className="group hidden items-center gap-2.5 rounded-full border border-white/12 py-2 pl-2 pr-5 transition-all duration-300 hover:border-rosso/50 hover:bg-white/[0.05] xl:flex"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rosso text-white"><Phone size={13} strokeWidth={2.5} /></span>
              <span className="flex flex-col leading-none">
                <span className="text-[8.5px] font-semibold uppercase tracking-widest text-avorio/40">Chiamaci ora</span>
                <span className="mt-1 text-[13px] font-bold text-avorio">{company.phones.marketing.display}</span>
              </span>
            </a>
            <Link href="/contatti" className="btn-rosso !px-5 !py-2.5 !text-[13px]">Parliamo del progetto</Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ProjectIndicator tone="dark" />
            <button onClick={() => setOpen(true)} aria-label="Apri menu" className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/18 text-avorio transition-colors hover:border-rosso/55">
              <Menu size={19} />
            </button>
          </div>
        </nav>

        <motion.div
          style={{ scaleX: progress }}
          className={`absolute bottom-0 left-7 right-7 h-[2px] origin-left bg-rosso ${scrolled ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] bg-carbone lg:hidden"
          >
            <div className="blueprint absolute inset-0 opacity-45" />
            <div className="grain absolute inset-0" />
            <div className="relative flex h-full flex-col">
              <div className="container-ac flex items-center justify-between py-4">
                <Logo width={176} priority />
                <button onClick={() => setOpen(false)} aria-label="Chiudi menu" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-avorio">
                  <X size={19} />
                </button>
              </div>

              <div className="container-ac flex flex-1 flex-col justify-center">
                {navLinks.map((l, i) => (
                  <motion.div key={l.href} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 + i * 0.04, duration: 0.3 }}>
                    <Link href={l.href} className="group flex items-center justify-between border-b border-white/10 py-5">
                      <span className="flex items-baseline gap-4">
                        <span className="font-display text-[11px] font-bold text-rosso">0{i + 1}</span>
                        <span className="h-display text-4xl text-avorio transition-colors group-hover:text-oro">{l.label}</span>
                      </span>
                      <ArrowRight size={18} className="text-avorio/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-rosso" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="container-ac space-y-3 pb-10">
                <a href={`tel:${company.phones.marketing.tel}`} className="btn-rosso w-full"><Phone size={15} />{company.phones.marketing.display}</a>
                <Link href="/contatti" className="btn-ghost-light w-full">Richiedi preventivo</Link>
                <p className="pt-2 text-center text-xs text-avorio/35">{company.address.full}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
