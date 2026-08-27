'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
};

export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const mobileOrReducedMotion = window.matchMedia(
      '(max-width: 767px), (prefers-reduced-motion: reduce)'
    ).matches;

    if (mobileOrReducedMotion || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.unobserve(element);
      },
      { rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      style={
        {
          '--reveal-y': `${y}px`,
          '--reveal-delay': `${delay}s`,
        } as CSSProperties
      }
      className={`reveal-motion ${visible ? 'reveal-visible' : ''} ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
