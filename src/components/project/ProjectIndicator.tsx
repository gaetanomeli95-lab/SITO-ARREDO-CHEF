'use client';

import Link from 'next/link';
import { ClipboardList } from 'lucide-react';
import { useProjectCount } from '@/lib/project/store';

/**
 * Indicatore "Il mio progetto · N" in navbar.
 * Visibile solo quando il progetto contiene almeno una macchina:
 * niente UI vuota per funzioni non ancora usate.
 */
export default function ProjectIndicator({ tone }: { tone: 'dark' | 'light' }) {
  const count = useProjectCount();

  if (count === 0) return null;

  const isDark = tone === 'dark';

  return (
    <Link
      href="/progetto"
      aria-label={`Il mio progetto, ${count} ${count === 1 ? 'macchina' : 'macchine'}`}
      className={`relative flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-all duration-300 ease-smooth ${
        isDark
          ? 'border-white/15 text-avorio hover:border-oro/45 hover:bg-white/[0.06]'
          : 'border-carbone/12 text-carbone hover:border-rosso/40 hover:bg-carbone/[0.04]'
      }`}
    >
      <ClipboardList size={15} />
      <span className="hidden sm:inline">Il mio progetto</span>
      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-rosso px-1.5 text-[11px] font-bold tabular-nums text-white">
        {count}
      </span>
    </Link>
  );
}
