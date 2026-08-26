import { describe, expect, it } from 'vitest';
import {
  addItem,
  removeItem,
  sanitize,
  setNote,
  setQty,
  totalCount,
  type ProjectItem,
} from './types';

describe('Project OS — logica pura', () => {
  it('addItem aggiunge un nuovo elemento con qty 1', () => {
    const items = addItem([], 'forno-x');
    expect(items).toEqual([{ slug: 'forno-x', qty: 1 }]);
  });

  it('addItem incrementa la quantità se già presente', () => {
    const items = addItem([{ slug: 'forno-x', qty: 2 }], 'forno-x');
    expect(items).toEqual([{ slug: 'forno-x', qty: 3 }]);
  });

  it('addItem non muta l’array originale', () => {
    const original: ProjectItem[] = [{ slug: 'a', qty: 1 }];
    addItem(original, 'a');
    expect(original).toEqual([{ slug: 'a', qty: 1 }]);
  });

  it('removeItem elimina solo lo slug indicato', () => {
    const items = removeItem(
      [
        { slug: 'a', qty: 1 },
        { slug: 'b', qty: 2 },
      ],
      'a'
    );
    expect(items).toEqual([{ slug: 'b', qty: 2 }]);
  });

  it('setQty aggiorna la quantità e la limita a 99', () => {
    expect(setQty([{ slug: 'a', qty: 1 }], 'a', 5)).toEqual([{ slug: 'a', qty: 5 }]);
    expect(setQty([{ slug: 'a', qty: 1 }], 'a', 500)).toEqual([{ slug: 'a', qty: 99 }]);
  });

  it('setQty con 0 o meno rimuove l’elemento', () => {
    expect(setQty([{ slug: 'a', qty: 1 }], 'a', 0)).toEqual([]);
    expect(setQty([{ slug: 'a', qty: 1 }], 'a', -3)).toEqual([]);
  });

  it('setNote imposta e svuota la nota', () => {
    const withNote = setNote([{ slug: 'a', qty: 1 }], 'a', 'installazione al piano 1');
    expect(withNote[0].note).toBe('installazione al piano 1');
    const cleared = setNote(withNote, 'a', '');
    expect(cleared[0].note).toBeUndefined();
  });

  it('totalCount somma le quantità', () => {
    expect(
      totalCount([
        { slug: 'a', qty: 2 },
        { slug: 'b', qty: 3 },
      ])
    ).toBe(5);
    expect(totalCount([])).toBe(0);
  });

  describe('sanitize — dati da localStorage potenzialmente corrotti', () => {
    it('accetta dati validi', () => {
      expect(sanitize([{ slug: 'a', qty: 2, note: 'ok' }])).toEqual([
        { slug: 'a', qty: 2, note: 'ok' },
      ]);
    });

    it('scarta input non-array', () => {
      expect(sanitize(null)).toEqual([]);
      expect(sanitize('corrotto')).toEqual([]);
      expect(sanitize({ slug: 'a' })).toEqual([]);
    });

    it('scarta elementi malformati', () => {
      expect(
        sanitize([
          { slug: 'a', qty: 1 },
          { slug: 42, qty: 1 },
          { slug: 'b', qty: 0 },
          { slug: 'c' },
          null,
        ])
      ).toEqual([{ slug: 'a', qty: 1 }]);
    });

    it('normalizza quantità frazionarie ed eccessive', () => {
      expect(sanitize([{ slug: 'a', qty: 2.7 }])).toEqual([{ slug: 'a', qty: 2 }]);
      expect(sanitize([{ slug: 'a', qty: 1000 }])).toEqual([{ slug: 'a', qty: 99 }]);
    });

    it('scarta note non-stringa', () => {
      expect(sanitize([{ slug: 'a', qty: 1, note: 42 }])).toEqual([{ slug: 'a', qty: 1 }]);
    });
  });
});
