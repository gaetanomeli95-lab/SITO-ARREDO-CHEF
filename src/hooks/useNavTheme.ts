'use client';

import { useEffect, useState } from 'react';

export type NavTone = 'dark' | 'light';

/**
 * Determina il tono della navbar osservando quale sezione si trova
 * sotto la barra. Le sezioni si dichiarano con data-nav-theme="dark|light".
 * Così la navbar resta sempre leggibile, anche sulle immagini scure.
 */
export function useNavTheme(defaultTone: NavTone = 'dark') {
  const [tone, setTone] = useState<NavTone>(defaultTone);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-nav-theme]')
    );
    if (sections.length === 0) {
      setTone(defaultTone);
      return;
    }

    const visible = new Set<HTMLElement>();

    const pick = () => {
      if (visible.size === 0) return;
      // Se più sezioni toccano la banda, vince l'ultima nell'ordine del documento
      const last = sections.filter((s) => visible.has(s)).pop();
      const next = last?.dataset.navTheme;
      if (next === 'dark' || next === 'light') setTone(next);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) visible.add(el);
          else visible.delete(el);
        }
        pick();
      },
      // Banda sottile all'altezza della navbar
      { rootMargin: '-64px 0px -100% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [defaultTone]);

  return tone;
}
