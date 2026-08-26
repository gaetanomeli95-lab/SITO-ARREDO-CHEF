import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type Crumb = { href?: string; label: string };

export default function PageHeader({
  eyebrow,
  title,
  lead,
  image = '/images/hero-2.webp',
  crumbs = [],
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  image?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section
      data-nav-theme="light"
      className="relative isolate min-h-[570px] overflow-hidden bg-avorio pb-20 pt-36 md:pt-44 lg:flex lg:min-h-[680px] lg:items-center"
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-[66%_center] lg:object-center"
        />
        <div className="hero-light-veil absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-avorio to-transparent" />
      </div>
      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-30" />

      <div className="container-ac relative">
        <div className="max-w-[760px]">
          {crumbs.length > 0 && (
            <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-carbone/45">
              <Link href="/" className="transition-colors hover:text-rosso">
                Home
              </Link>
              {crumbs.map((c) => (
                <span key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-carbone/20" />
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-rosso">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-carbone/65">{c.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-rosso" />
            <span className="text-[10px] font-bold uppercase tracking-widest2 text-rosso">
              {eyebrow}
            </span>
          </div>
          <h1 className="h-display mt-6 max-w-3xl text-[clamp(2.8rem,6vw,5.7rem)] text-carbone">
            {title}
          </h1>
          {lead && (
            <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-carbone/70 md:text-lg md:leading-relaxed">
              {lead}
            </p>
          )}
        </div>
      </div>

      <span className="absolute bottom-7 right-7 hidden text-[9px] font-bold uppercase tracking-widest2 text-carbone/35 lg:block">
        Arredo Chef · Kitchen systems
      </span>
    </section>
  );
}
