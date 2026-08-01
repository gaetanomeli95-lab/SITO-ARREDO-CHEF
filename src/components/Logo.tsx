import Image from 'next/image';

/**
 * Marchio Arredo Chef.
 * Usa il PNG ufficiale ritagliato e reso trasparente (nessun bordo, nessun riquadro).
 */
export default function Logo({
  size = 46,
  tone = 'dark',
  withWordmark = true,
  className = '',
}: {
  size?: number;
  /** 'dark' = testo chiaro (fondo scuro) · 'light' = testo scuro (fondo chiaro) */
  tone?: 'dark' | 'light';
  withWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span
        className="relative block shrink-0 transition-transform duration-500 ease-smooth"
        style={{ width: size, height: size }}
      >
        <Image
          src="/images/logo-mark.webp"
          alt="Arredo Chef"
          fill
          sizes={`${size * 2}px`}
          priority
          className="object-contain"
        />
      </span>

      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-[17px] font-extrabold tracking-tightest transition-colors duration-500 md:text-lg ${
              tone === 'dark' ? 'text-avorio' : 'text-carbone'
            }`}
          >
            ARREDO CHEF
          </span>
          <span
            className={`mt-1 text-[8.5px] font-semibold uppercase tracking-widest2 transition-colors duration-500 ${
              tone === 'dark' ? 'text-oro' : 'text-rosso'
            }`}
          >
            Forniture professionali
          </span>
        </span>
      )}
    </span>
  );
}
