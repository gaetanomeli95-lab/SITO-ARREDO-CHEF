/**
 * MOTION DESIGN SYSTEM — Arredo Chef
 *
 * Principio: FAST INTERACTION · SLOW CINEMATIC MOMENTS.
 * - Interazioni UI: 100–300 ms
 * - Momenti narrativi (reveal, hero): 500–1200 ms
 *
 * `prefers-reduced-motion` è già gestito globalmente in globals.css
 * (tutte le animation/transition vengono azzerate).
 */

/** Easing di firma, usato in tutto il sito (già presente come `ease-smooth`). */
export const easeSmooth = [0.16, 1, 0.3, 1] as const;

export const duration = {
  /** Hover, toggle, focus. */
  fast: 0.2,
  /** Transizioni di stato UI. */
  base: 0.3,
  /** Reveal di contenuto in viewport. */
  reveal: 0.75,
  /** Momenti cinematici (hero, sezioni narrative). */
  cinematic: 1.1,
} as const;

/** Stagger standard per liste e griglie. */
export const stagger = {
  grid: 0.05,
  list: 0.07,
} as const;

/** Preset Framer Motion per apparizione dal basso. */
export const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duration.base, ease: easeSmooth },
} as const;
