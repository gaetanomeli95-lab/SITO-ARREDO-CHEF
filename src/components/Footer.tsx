import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Mail, MapPin, Phone, Star } from 'lucide-react';
import { company, navLinks } from '@/data/company';
import { categories } from '@/data/products';
import Logo from '@/components/Logo';

export default function Footer() {
  const year = new Date().getFullYear();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    company.address.mapsQuery
  )}`;

  return (
    <footer
      data-nav-theme="dark"
      className="relative overflow-hidden bg-carbone text-cenere"
    >
      <div className="blueprint pointer-events-none absolute inset-0 opacity-50" />
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 top-0 hairline-oro" />

      {/* Marchio in filigrana, tagliato dal bordo */}
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-[30rem] w-[30rem] opacity-[0.04]">
        <Image src="/images/logo-mark.webp" alt="" fill sizes="480px" className="object-contain" />
      </div>

      <div className="container-ac relative py-12 md:py-16">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
          {/* Marchio */}
          <div>
            <Logo width={210} />

            <p className="mt-6 max-w-sm text-pretty text-sm leading-relaxed text-cenere/65">
              Attrezzature professionali nuove e usate per ristoranti, bar, hotel e ogni realtà del
              food &amp; beverage. Ti seguiamo dal sopralluogo all&apos;installazione finale.
            </p>

            <a
              href={company.reviews.readUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-3 rounded-full border border-white/12 py-2.5 pl-4 pr-5 transition-all duration-400 hover:border-oro/45 hover:bg-white/[0.04]"
            >
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className="fill-oro text-oro" />
                ))}
              </span>
              <span className="text-xs text-cenere/70">
                {company.reviews.count} recensioni su Google
              </span>
              <ArrowUpRight
                size={12}
                className="text-cenere/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          {/* Navigazione */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest2 text-avorio">Naviga</h4>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-sm text-cenere/65 transition-colors duration-300 hover:text-avorio"
                  >
                    <span className="h-px w-0 bg-rosso transition-all duration-400 group-hover:w-3" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reparti */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest2 text-avorio">
              Reparti
            </h4>
            <ul className="mt-5 space-y-2.5">
              {categories.slice(0, 7).map((c) => (
                <li key={c}>
                  <Link
                    href={`/catalogo?categoria=${encodeURIComponent(c)}`}
                    className="text-sm text-cenere/65 transition-colors duration-300 hover:text-avorio"
                  >
                    {c}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/catalogo"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-oro transition-colors hover:text-oro-light"
                >
                  Tutti i reparti
                  <ArrowUpRight size={13} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest2 text-avorio">
              Contatti
            </h4>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-3 text-sm text-cenere/70 transition-colors hover:text-avorio"
                >
                  <MapPin size={15} className="mt-0.5 shrink-0 text-rosso" />
                  <span>
                    {company.address.street}
                    <br />
                    {company.address.zip} {company.address.city} ({company.address.province})
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${company.phones.marketing.tel}`}
                  className="flex gap-3 text-sm text-cenere/65 transition-colors hover:text-avorio"
                >
                  <Phone size={15} className="mt-0.5 shrink-0 text-rosso" />
                  <span>
                    {company.phones.marketing.display}
                    <span className="block text-xs text-cenere/40">
                      {company.phones.marketing.label}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${company.phones.admin.tel}`}
                  className="flex gap-3 text-sm text-cenere/65 transition-colors hover:text-avorio"
                >
                  <Phone size={15} className="mt-0.5 shrink-0 text-rosso" />
                  <span>
                    {company.phones.admin.display}
                    <span className="block text-xs text-cenere/40">
                      {company.phones.admin.label}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="flex gap-3 break-all text-sm text-cenere/65 transition-colors hover:text-avorio"
                >
                  <Mail size={15} className="mt-0.5 shrink-0 text-rosso" />
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra finale */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/[0.08] pt-6 text-xs text-cenere/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.legalName} — P.IVA {company.vat}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-avorio">
              Privacy Policy
            </Link>
            <Link href="/cookie" className="transition-colors hover:text-avorio">
              Cookie Policy
            </Link>
            <span className="text-cenere/20">Villabate · Palermo · Sicilia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
