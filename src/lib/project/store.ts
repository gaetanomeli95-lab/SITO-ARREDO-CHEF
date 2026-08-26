'use client';

import { useSyncExternalStore } from 'react';
import { track } from '@/lib/analytics';
import {
  addItem,
  removeItem,
  sanitize,
  setNote,
  setQty,
  totalCount,
  type ProjectItem,
} from './types';

/**
 * PROJECT STORE — MVP client-side.
 *
 * Persistenza: localStorage (nessun account richiesto).
 * Sincronizzazione: useSyncExternalStore + evento `storage` (multi-tab).
 * Zero dipendenze esterne. In futuro: account + database, stessa interfaccia.
 */

const STORAGE_KEY = 'arredochef.project.v1';

let items: ProjectItem[] = [];
let hydrated = false;
const listeners = new Set<() => void>();

function read(): ProjectItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? sanitize(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

function write(next: ProjectItem[]) {
  items = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage pieno o disabilitato: lo stato resta in memoria.
  }
  listeners.forEach((l) => l());
}

function hydrate() {
  if (hydrated || typeof window === 'undefined') return;
  hydrated = true;
  items = read();
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      items = read();
      listeners.forEach((l) => l());
    }
  });
}

function subscribe(listener: () => void) {
  hydrate();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const EMPTY: ProjectItem[] = [];

function getSnapshot(): ProjectItem[] {
  hydrate();
  return items;
}

function getServerSnapshot(): ProjectItem[] {
  return EMPTY;
}

/** Hook reattivo: lista degli elementi del progetto. */
export function useProjectItems(): ProjectItem[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Hook reattivo: numero totale di macchine nel progetto. */
export function useProjectCount(): number {
  return totalCount(useProjectItems());
}

export const projectActions = {
  add(slug: string) {
    const wasEmpty = items.length === 0;
    write(addItem(getSnapshot(), slug));
    track('project_add_item', { slug });
    if (wasEmpty) track('project_started');
  },
  remove(slug: string) {
    write(removeItem(getSnapshot(), slug));
    track('project_remove_item', { slug });
  },
  setQty(slug: string, qty: number) {
    write(setQty(getSnapshot(), slug, qty));
  },
  setNote(slug: string, note: string) {
    write(setNote(getSnapshot(), slug, note));
  },
  clear() {
    write([]);
  },
};

export function isInProject(list: ProjectItem[], slug: string): boolean {
  return list.some((i) => i.slug === slug);
}
