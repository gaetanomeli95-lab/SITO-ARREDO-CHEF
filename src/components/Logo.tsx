import Image from 'next/image';

/**
 * Marchio Arredo Chef.
 * Esiste un solo asset ufficiale: il logo completo (icona + wordmark) in WebP.
 * NOTA: non esiste ancora un asset "solo icona"; quando sarà disponibile,
 * reintrodurre una prop dedicata con un secondo file reale.
 * `tone` è accettato per compatibilità con i chiamanti (Navbar) ma l'asset
 * attuale è unico e leggibile su entrambi i fondi.
 */
export default function Logo({
  size = 46,
  tone: _tone = 'dark',
  className = '',
}: {
  size?: number;
  /** 'dark' = fondo scuro · 'light' = fondo chiaro (riservato per asset futuri) */
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const src = '/images/logo-mark.webp';
  const w = size * 2.6;
  const h = size;

  return (
    <span
      className={`relative inline-flex shrink-0 transition-transform duration-500 ease-smooth ${className}`}
      style={{ width: w, height: h }}
    >
      <Image
        src={src}
        alt="Arredo Chef"
        fill
        sizes={`${w * 2}px`}
        priority
        className="object-contain object-left"
      />
    </span>
  );
}
