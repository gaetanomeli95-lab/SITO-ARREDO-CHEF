'use client';

import { Check, Plus } from 'lucide-react';
import { isInProject, projectActions, useProjectItems } from '@/lib/project/store';

/**
 * CTA "+ Aggiungi al progetto" — presente su card e Machine Cockpit.
 * emphasis 'primary' è riservato ai punti in cui il progetto è la CTA principale
 * (es. Live Machine Stage). Negli altri contesti resta neutro.
 */
export default function AddToProjectButton({
  slug,
  name,
  variant = 'card',
  tone = 'light',
  emphasis = 'default',
}: {
  slug: string;
  name: string;
  variant?: 'card' | 'cockpit';
  tone?: 'light' | 'dark';
  emphasis?: 'default' | 'primary';
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
    const classes = added
      ? emphasis === 'primary'
        ? 'border-white/[0.18] bg-[#2a323a] text-white shadow-[0_18px_38px_-24px_rgba(0,0,0,.8)]'
        : 'border-rosso/[0.55] bg-rosso/[0.12] text-rosso'
      : emphasis === 'primary'
        ? 'border-rosso bg-rosso text-white shadow-[0_18px_45px_-20px_rgba(216,35,42,.72)] hover:bg-[#ef2931] hover:shadow-[0_22px_55px_-18px_rgba(216,35,42,.82)]'
        : tone === 'dark'
          ? 'border-white/[0.14] bg-white/[0.035] text-avorio hover:border-rosso/[0.55] hover:bg-rosso/[0.08]'
          : 'border-carbone/20 text-carbone hover:border-rosso/50 hover:bg-carbone/[0.03]';

    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={added}
        className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-bold transition-all duration-300 ease-smooth hover:-translate-y-0.5 sm:px-7 sm:py-4 ${classes}`}
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
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
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
