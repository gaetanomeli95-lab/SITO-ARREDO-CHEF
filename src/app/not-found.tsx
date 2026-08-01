import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { company } from '@/data/company';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-carbone">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-4.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-carbone via-carbone/92 to-carbone/60" />
      </div>
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="container-ac relative py-32">
        <span className="eyebrow text-oro">Errore 404</span>
        <h1 className="h-display mt-6 text-[clamp(3rem,10vw,7rem)] text-white">
          Questa pagina
          <br />
          <span className="text-nebbia">non è in menu.</span>
        </h1>
        <p className="mt-7 max-w-md text-pretty text-base leading-relaxed text-cenere/60">
          L&apos;indirizzo che hai seguito non esiste o è stato spostato. Torna al catalogo oppure
          chiamaci: ti diciamo subito quello che cerchi.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/catalogo" className="btn-rosso group">
            Vai al catalogo
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <a href={`tel:${company.phones.marketing.tel}`} className="btn-ghost-light">
            <Phone size={15} />
            {company.phones.marketing.display}
          </a>
        </div>
      </div>
    </section>
  );
}
