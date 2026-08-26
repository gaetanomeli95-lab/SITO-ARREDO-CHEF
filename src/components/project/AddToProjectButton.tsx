'use client';

import { Check, Plus } from 'lucide-react';
import { isInProject, projectActions, useProjectItems } from '@/lib/project/store';

/**
 * CTA "+ Aggiungi al progetto" — presente su card e Machine Cockpit.
 * variant 'card': compatto, accanto al link della scheda prodotto.
 * variant 'cockpit': esteso, con etichetta completa.
 */
export default function AddToProjectButton({
  slug,
  name,
  variant = 'card',
  tone = 'light',
}: {
  slug: string;
  name: string;
  variant?: 'card' | 'cockpit';
  tone?: 'light' | 'dark';
}) {
  const items = useProjectItems();
  const added = isInProject(items, slug);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (added) {
      projectActions.remove(slug);
    } else {
      projectActions.add(slug);
    }
  };

  if (variant === 'cockpit') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={added}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-full border px-7 py-4 text-sm font-semibold transition-all duration-300 ease-smooth hover:-translate-y-0.5 ${
          added
            ? 'border-rosso/55 bg-rosso/[0.12] text-rosso'
            : tone === 'dark'
              ? 'border-white/14 bg-white/[0.035] text-avorio hover:border-rosso/55 hover:bg-rosso/[0.08]'
              : 'border-carbone/20 text-carbone hover:border-rosso/50 hover:bg-carbone/[0.03]'
        }`}
      >
        {added ? <Check size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
        {added ? 'Nel tuo progetto' : 'Aggiungi al progetto'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={added}
      aria-label={added ? `Rimuovi ${name} dal progetto` : `Aggiungi ${name} al progetto`}
      title={added ? 'Rimuovi dal progetto' : 'Aggiungi al progetto'}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
        added
          ? 'border-rosso bg-rosso text-white'
          : tone === 'dark'
            ? 'border-white/15 bg-white/[0.04] text-white/60 hover:border-rosso hover:text-rosso'
            : 'border-carbone/15 bg-white text-carbone/60 hover:border-rosso hover:text-rosso'
      }`}
    >
      {added ? <Check size={15} strokeWidth={2.5} /> : <Plus size={15} strokeWidth={2.5} />}
    </button>
  );
}
