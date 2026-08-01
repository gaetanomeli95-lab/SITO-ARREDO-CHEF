/**
 * Raccordo tonale tra una sezione scura e una chiara (e viceversa).
 * Attraversa tutta la scala di grigi della palette, così non si vede
 * mai uno stacco netto: sembra acciaio che passa dall'ombra alla luce.
 *
 * Le due metà dichiarano toni diversi per la navbar, che resta leggibile
 * anche mentre si attraversa il raccordo.
 */
export default function ToneRamp({
  direction,
  height = '18vh',
}: {
  direction: 'dark-to-light' | 'light-to-dark';
  height?: string;
}) {
  const ladder = [
    '#0B0D10',
    '#14181D',
    '#222831',
    '#39414C',
    '#7C848E',
    '#B9BCC0',
    '#D5D2CC',
    '#E7E3DC',
    '#F5F2ED',
  ];

  const stops = direction === 'dark-to-light' ? ladder : [...ladder].reverse();
  const first = direction === 'dark-to-light' ? 'dark' : 'light';
  const second = direction === 'dark-to-light' ? 'light' : 'dark';

  return (
    <div
      aria-hidden
      className="relative w-full"
      style={{
        height,
        backgroundImage: `linear-gradient(to bottom, ${stops.join(', ')})`,
      }}
    >
      <div className="grain absolute inset-0" />

      {/* Filo brace al centro del passaggio */}
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-rosso/25 to-transparent" />

      {/* Metà superiore e inferiore: pilotano il tono della navbar */}
      <div data-nav-theme={first} className="absolute inset-x-0 top-0 h-1/2" />
      <div data-nav-theme={second} className="absolute inset-x-0 bottom-0 h-1/2" />
    </div>
  );
}
