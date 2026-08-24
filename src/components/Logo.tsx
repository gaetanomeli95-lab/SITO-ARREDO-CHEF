import Image from 'next/image';

/**
 * Marchio Arredo Chef.
 * Usa il logo ufficiale completo (icona + wordmark) in formato WebP.
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
  // Con wordmark: logo completo quadrato; senza: solo icona
  const src = withWordmark ? '/images/logo-mark.webp' : '/images/logo-mark.webp';
  const w = withWordmark ? size * 2.6 : size;
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
