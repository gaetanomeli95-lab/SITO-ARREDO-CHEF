'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, Menu, Phone, X } from 'lucide-react';
import { company, navLinks } from '@/data/company';
import { useNavTheme } from '@/hooks/useNavTheme';
import Logo from '@/components/Logo';
import ProjectIndicator from '@/components/project/ProjectIndicator';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const tone = useNavTheme('dark');

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

  const isDark = tone === 'dark';

  // Colori derivati dal tono della sezione sottostante
  const shell = scrolled
    ? isDark
      ? 'border-white/10 bg-carbone/72 backdrop-blur-2xl'
      : 'border-carbone/10 bg-avorio/80 backdrop-blur-2xl'
    : isDark
      ? 'border-white/5 bg-carbone/30 backdrop-blur-md'
      : 'border-carbone/5 bg-avorio/30 backdrop-blur-md';

  const linkIdle = isDark ? 'text-avorio/65 hover:text-avorio' : 'text-carbone/60 hover:text-carbone';
  const linkActive = isDark ? 'text-avorio' : 'text-carbone';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ease-smooth ${shell} ${
          scrolled ? 'py-2.5' : 'py-4'
        }`}
      >
        <nav className="container-ac flex items-center justify-between gap-4">
          <Link href="/" aria-label="Arredo Chef — home" className="group relative z-10">
            <Logo size={scrolled ? 42 : 50} tone={tone} />
          </Link>

          {/* Link desktop */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
                    active ? linkActive : linkIdle
                  }`}
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

          {/* Azioni desktop */}
          <div className="hidden items-center gap-3 lg:flex">
            <ProjectIndicator tone={tone} />
            <a
              href={`tel:${company.phones.marketing.tel}`}
              className={`group hidden items-center gap-2.5 rounded-full border py-2 pl-2 pr-5 transition-all duration-300 ease-smooth xl:flex ${
                isDark
                  ? 'border-white/15 hover:border-oro/45 hover:bg-white/[0.06]'
                  : 'border-carbone/12 hover:border-rosso/40 hover:bg-carbone/[0.04]'
              }`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rosso text-white">
                <Phone size={13} strokeWidth={2.5} />
              </span>
              <span className="flex flex-col leading-none">
                <span
                  className={`text-[8.5px] font-semibold uppercase tracking-widest ${
                    isDark ? 'text-avorio/45' : 'text-carbone/45'
                  }`}
                >
                  Chiamaci ora
                </span>
                <span
                  className={`mt-1 text-[13px] font-bold ${isDark ? 'text-avorio' : 'text-carbone'}`}
                >
                  {company.phones.marketing.display}
                </span>
              </span>
            </a>

            <Link href="/contatti" className="btn-rosso !px-5 !py-2.5 !text-[13px]">
              Richiedi preventivo
            </Link>
          </div>

          {/* Menu mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <ProjectIndicator tone={tone} />
            <button
              onClick={() => setOpen(true)}
              aria-label="Apri menu"
              className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
                isDark ? 'border-white/18 text-avorio' : 'border-carbone/15 text-carbone'
              }`}
            >
              <Menu size={19} />
            </button>
          </div>
        </nav>

        {/* Indicatore di avanzamento lettura */}
        <motion.div
          style={{ scaleX: progress }}
          className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-rosso ${
            scrolled ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-500`}
        />
      </header>

      {/* Overlay mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-carbone lg:hidden"
          >
            <div className="blueprint absolute inset-0 opacity-60" />
            <div className="grain absolute inset-0" />
            <div className="pointer-events-none absolute -right-20 top-1/4 h-80 w-80 rounded-full bg-rosso/15 blur-[120px]" />

            <div className="relative flex h-full flex-col">
              <div className="container-ac flex items-center justify-between py-4">
                <Logo size={44} tone="dark" />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Chiudi menu"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-avorio"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="container-ac flex flex-1 flex-col justify-center">
                {navLinks.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={l.href}
                      className="group flex items-center justify-between border-b border-white/10 py-5"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-display text-[11px] font-bold text-rosso">
                          0{i + 1}
                        </span>
                        <span className="h-display text-4xl text-avorio transition-colors group-hover:text-oro">
                          {l.label}
                        </span>
                      </span>
                      <ArrowRight
                        size={18}
                        className="text-avorio/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-rosso"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="container-ac space-y-3 pb-10">
                <a href={`tel:${company.phones.marketing.tel}`} className="btn-rosso w-full">
                  <Phone size={15} />
                  {company.phones.marketing.display}
                </a>
                <Link href="/contatti" className="btn-ghost-light w-full">
                  Richiedi preventivo
                </Link>
                <p className="pt-2 text-center text-xs text-avorio/35">{company.address.full}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
