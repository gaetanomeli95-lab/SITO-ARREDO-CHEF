import Image from 'next/image';

/**
 * Logo ufficiale fornito da Arredo Chef.
 * L'asset originale è quadrato ma il disegno occupa una fascia 1223×605:
 * questa finestra CSS elimina lo spazio trasparente senza alterare il marchio.
 */
export default function Logo({
  width = 176,
  className = '',
  priority = false,
}: {
  width?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <span
      className={`relative inline-flex shrink-0 overflow-hidden ${className}`}
      style={{ width, aspectRatio: '1223 / 605' }}
    >
      <Image
        src="/images/arredo-chef-logo-official.png"
        alt="Arredo Chef"
        width={1254}
        height={1254}
        priority={priority}
        sizes={`${width}px`}
        className="pointer-events-none absolute max-w-none select-none"
        style={{
          width: '102.54%',
          height: 'auto',
          left: '-2.54%',
          top: '-47.1%',
        }}
      />
    </span>
  );
}
