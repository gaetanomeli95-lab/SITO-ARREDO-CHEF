/**
 * PROJECT OS — tipi e logica pura (testabile senza browser).
 */

export type ProjectItem = {
  slug: string;
  qty: number;
  note?: string;
};

export function addItem(items: ProjectItem[], slug: string): ProjectItem[] {
  const existing = items.find((i) => i.slug === slug);
  if (existing) {
    return items.map((i) => (i.slug === slug ? { ...i, qty: i.qty + 1 } : i));
  }
  return [...items, { slug, qty: 1 }];
}

export function removeItem(items: ProjectItem[], slug: string): ProjectItem[] {
  return items.filter((i) => i.slug !== slug);
}

export function setQty(items: ProjectItem[], slug: string, qty: number): ProjectItem[] {
  if (qty <= 0) return removeItem(items, slug);
  return items.map((i) => (i.slug === slug ? { ...i, qty: Math.min(qty, 99) } : i));
}

export function setNote(items: ProjectItem[], slug: string, note: string): ProjectItem[] {
  return items.map((i) => (i.slug === slug ? { ...i, note: note || undefined } : i));
}

export function totalCount(items: ProjectItem[]): number {
  return items.reduce((sum, i) => sum + i.qty, 0);
}

/** Valida e ripulisce dati letti da localStorage (possono essere corrotti). */
export function sanitize(raw: unknown): ProjectItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (i): i is ProjectItem =>
        typeof i === 'object' &&
        i !== null &&
        typeof (i as ProjectItem).slug === 'string' &&
        typeof (i as ProjectItem).qty === 'number' &&
        (i as ProjectItem).qty > 0
    )
    .map((i) => ({
      slug: i.slug,
      qty: Math.min(Math.floor(i.qty), 99),
      note: typeof i.note === 'string' ? i.note : undefined,
    }));
}
