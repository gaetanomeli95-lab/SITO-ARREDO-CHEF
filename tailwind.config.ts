import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Accenti di marca
        rosso: {
          DEFAULT: '#D8232A',
          light: '#F0454C',
          dark: '#9E141A',
          glow: '#FF3B43',
        },
        oro: {
          DEFAULT: '#C9A227',
          light: '#E8C55A',
          dark: '#8F721A',
        },
        brace: '#E8873A',

        // Scala tonale continua: dal carbone all'avorio.
        // Nessun bianco puro, nessun nero puro.
        carbone: '#0B0D10',
        grafite: '#14181D',
        acciaio: '#222831',
        ferro: '#39414C',
        nebbia: '#7C848E',
        cenere: '#B9BCC0',
        cemento: '#D5D2CC',
        sabbia: '#E7E3DC',
        avorio: '#F5F2ED',

        // Alias di compatibilità
        antracite: {
          DEFAULT: '#14181D',
          light: '#222831',
          lighter: '#39414C',
        },
        inox: {
          DEFAULT: '#B9BCC0',
          dark: '#7C848E',
          light: '#D5D2CC',
        },
        panna: '#F5F2ED',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        widest2: '0.28em',
      },
      maxWidth: {
        container: '1400px',
      },
      backgroundImage: {
        ember: 'linear-gradient(120deg, #9E141A 0%, #D8232A 35%, #E8873A 68%, #C9A227 100%)',
        steel: 'linear-gradient(165deg, #39414C 0%, #222831 45%, #0B0D10 100%)',
        'steel-soft': 'linear-gradient(150deg, #F5F2ED 0%, #E7E3DC 55%, #D5D2CC 100%)',
      },
      boxShadow: {
        lift: '0 30px 70px -30px rgba(11,13,16,0.45)',
        'lift-sm': '0 18px 40px -20px rgba(11,13,16,0.35)',
        ember: '0 20px 60px -25px rgba(216,35,42,0.55)',
        inset: 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        marquee: 'marquee 45s linear infinite',
        'slow-zoom': 'slowZoom 18s ease-out forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        breathe: 'breathe 7s ease-in-out infinite',
        'drift-slow': 'drift 22s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.08)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(3%, -4%, 0)' },
        },
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
