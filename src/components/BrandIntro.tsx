'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '@/components/Logo';

const SESSION_KEY = 'arredo-chef.brand-intro.v1';

export default function BrandIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === 'seen';

    if (alreadySeen) {
      setVisible(false);
      return;
    }

    window.sessionStorage.setItem(SESSION_KEY, 'seen');
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => setVisible(false), reducedMotion ? 250 : 2050);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = '';
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-label="Ingresso Arredo Chef"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.025 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="brand-intro fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-carbone"
        >
          <div className="blueprint absolute inset-0 opacity-70" />
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-1/2 h-px origin-center bg-gradient-to-r from-transparent via-rosso to-transparent shadow-[0_0_34px_rgba(216,35,42,.9)]"
          />
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: [0, 0.55, 0.15], scale: [0.75, 1, 1.18] }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="absolute h-[44vw] max-h-[620px] w-[44vw] max-w-[620px] rounded-full bg-rosso/20 blur-[130px]"
          />

          <div className="relative flex w-full max-w-3xl flex-col items-center px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <Logo
                width={420}
                priority
                className="max-w-[78vw] drop-shadow-[0_20px_45px_rgba(0,0,0,.65)]"
              />
              <motion.span
                aria-hidden="true"
                initial={{ left: '-12%' }}
                animate={{ left: '106%' }}
                transition={{ duration: 1.05, delay: 0.35, ease: [0.45, 0, 0.55, 1] }}
                className="absolute -bottom-3 top-0 w-px bg-white/80 shadow-[0_0_24px_8px_rgba(216,35,42,.75)]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.45 }}
              className="mt-10 flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.42em] text-avorio/50"
            >
              <span className="h-px w-10 bg-rosso" />
              Kitchen systems · Sicilia
              <span className="h-px w-10 bg-rosso" />
            </motion.div>
          </div>

          <div className="absolute bottom-7 left-7 text-[8px] font-semibold uppercase tracking-[0.35em] text-white/25">
            AC / Digital workspace
          </div>
          <div className="absolute bottom-7 right-7 h-1 w-24 overflow-hidden bg-white/10">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.55, delay: 0.2, ease: 'easeInOut' }}
              className="h-full w-full bg-rosso"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
