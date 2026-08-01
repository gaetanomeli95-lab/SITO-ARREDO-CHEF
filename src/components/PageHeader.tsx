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
      className="relative overflow-hidden bg-carbone pb-20 pt-36 md:pb-24 md:pt-44"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image src={image} alt="" fill sizes="100vw" priority className="object-cover opacity-70 [filter:brightness(1.1)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-carbone/65 via-carbone/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-carbone to-transparent" />
      </div>
      <div className="blueprint pointer-events-none absolute inset-0 opacity-50" />
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 animate-breathe rounded-full bg-rosso/10 blur-[130px]" />

      <div className="container-ac relative">
        {crumbs.length > 0 && (
          <nav className="mb-7 flex flex-wrap items-center gap-1.5 text-xs text-cenere/45">
            <Link href="/" className="transition-colors hover:text-avorio">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight size={12} className="text-cenere/25" />
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-avorio">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-cenere/70">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <span className="eyebrow text-oro">{eyebrow}</span>
        <h1 className="h-display mt-5 max-w-3xl text-[clamp(2.3rem,5.6vw,4.3rem)] text-avorio">
          {title}
        </h1>
        {lead && (
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-cenere/65">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
