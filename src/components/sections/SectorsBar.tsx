import { sectors } from '@/data/company';

/** Fascia scura che raccorda l'hero alle sezioni successive. */
export default function SectorsBar() {
  const loop = [...sectors, ...sectors];

  return (
    <section
      data-nav-theme="dark"
      aria-labelledby="settori-serviti"
      className="relative overflow-hidden border-y border-white/[0.07] bg-grafite py-7"
    >
      <h2 id="settori-serviti" className="sr-only">
        Settori serviti
      </h2>
      <ul className="sr-only">
        {sectors.map((sector) => (
          <li key={sector}>{sector}</li>
        ))}
      </ul>
      <div className="grain absolute inset-0" />

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-grafite to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-grafite to-transparent" />

      <div
        aria-hidden="true"
        className="relative flex w-max animate-marquee items-center gap-9 will-change-transform"
      >
        {loop.map((s, i) => (
          <span key={`${s}-${i}`} className="flex items-center gap-9">
            <span className="whitespace-nowrap font-display text-[13px] font-bold uppercase tracking-widest text-cenere/40">
              {s}
            </span>
            <span className="h-[3px] w-[3px] shrink-0 rotate-45 bg-rosso/60" />
          </span>
        ))}
      </div>
    </section>
  );
}
