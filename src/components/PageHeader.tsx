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
      data-nav-theme="dark"
      className="relative isolate min-h-[570px] overflow-hidden bg-carbone pb-20 pt-36 text-avorio md:pt-44 lg:flex lg:min-h-[680px] lg:items-center"
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
        <div className="page-portal-veil absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-carbone/85 to-transparent" />
      </div>
      <div className="blueprint pointer-events-none absolute inset-0 opacity-55" />

      <div className="container-ac relative">
        <div className="max-w-[760px]">
          {crumbs.length > 0 && (
            <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-white/38">
              <Link href="/" className="transition-colors hover:text-rosso">
                Home
              </Link>
              {crumbs.map((c) => (
                <span key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-white/18" />
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-rosso">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white/65">{c.label}</span>
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
          <h1 className="h-display mt-6 max-w-3xl text-[clamp(2.8rem,6vw,5.7rem)] text-avorio">
            {title}
          </h1>
          {lead && (
            <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-white/58 md:text-lg md:leading-relaxed">
              {lead}
            </p>
          )}
        </div>
      </div>

      <span className="absolute bottom-7 right-7 hidden text-[9px] font-bold uppercase tracking-widest2 text-white/28 lg:block">
        Arredo Chef · Kitchen systems
      </span>
    </section>
  );
}
