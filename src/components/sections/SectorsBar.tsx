import { sectors } from '@/data/company';

/** Fascia di firma: il primo richiamo esplicito al brand dopo la hero. */
export default function SectorsBar() {
  const items = sectors.flatMap((sector) => ['ARREDO CHEF', sector]);
  const loop = [...items, ...items];

  return (
    <section
      data-nav-theme="dark"
      aria-labelledby="settori-serviti"
      className="relative overflow-hidden border-y border-white/10 bg-[linear-gradient(100deg,#8f1016_0%,#d8232a_38%,#b2141c_72%,#7f0d13_100%)] py-4 shadow-[0_18px_55px_-28px_rgba(216,35,42,.75)] sm:py-5"
    >
      <h2 id="settori-serviti" className="sr-only">
        Settori serviti da Arredo Chef
      </h2>
      <ul className="sr-only">
        {sectors.map((sector) => (
          <li key={sector}>{sector}</li>
        ))}
      </ul>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.10),transparent_28%,rgba(0,0,0,.12)_72%,transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/35" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-black/20" />
      <div className="grain absolute inset-0 opacity-35" />

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#9d1118] to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#861017] to-transparent sm:w-28" />

      <div
        aria-hidden="true"
        className="relative flex w-max animate-marquee items-center gap-6 will-change-transform sm:gap-9"
      >
        {loop.map((s, i) => {
          const brand = s === 'ARREDO CHEF';
          return (
            <span key={`${s}-${i}`} className="flex items-center gap-6 sm:gap-9">
              <span
                className={`whitespace-nowrap font-display uppercase ${
                  brand
                    ? 'text-[13px] font-black tracking-[0.22em] text-white sm:text-[15px]'
                    : 'text-[11px] font-bold tracking-[0.2em] text-white/72 sm:text-[12px]'
                }`}
              >
                {s}
              </span>
              <span className={`shrink-0 ${brand ? 'h-px w-8 bg-white/75' : 'h-1 w-1 rotate-45 bg-white/45'}`} />
            </span>
          );
        })}
      </div>
    </section>
  );
}
