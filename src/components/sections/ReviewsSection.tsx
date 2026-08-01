import { Quote, Star } from 'lucide-react';
import { company, reviews } from '@/data/company';
import Reveal from '@/components/Reveal';

export default function ReviewsSection() {
  // Show only 3 reviews on homepage
  const featured = reviews.slice(0, 3);

  return (
    <section
      data-nav-theme="light"
      className="relative overflow-hidden bg-gradient-to-b from-avorio via-sabbia to-avorio py-16 md:py-24 lg:py-32"
    >
      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-oro/[0.06] blur-[130px]" />

      <div className="container-ac relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow justify-center text-rosso">I nostri clienti</span>
            <h2 className="h-display mt-6 text-[clamp(2rem,4.5vw,3.5rem)] text-carbone">
              Le parole di chi lavora
              <br />
              <span className="text-nebbia">con le nostre macchine.</span>
            </h2>

            <div className="mt-8 inline-flex items-center gap-4 rounded-full border border-carbone/15 bg-white px-6 py-3 shadow-lift-sm">
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="fill-oro text-oro" />
                ))}
              </span>
              <span className="font-display text-sm font-bold text-carbone">
                {company.reviews.rating.toFixed(1)}
              </span>
              <span className="h-4 w-px bg-carbone/15" />
              <span className="text-sm text-carbone/75">
                {company.reviews.count} recensioni su Google
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-3 md:gap-4">
          {featured.map((r, i) => (
            <Reveal key={r.author} delay={Math.min(i * 0.08, 0.25)}>
              <figure className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-carbone/15 bg-white p-5 shadow-lift-sm transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-rosso/25 hover:shadow-lift sm:p-6">
                <span className="absolute inset-x-0 top-0 h-px w-full origin-left scale-x-0 bg-rosso transition-transform duration-600 ease-smooth group-hover:scale-x-100" />

                <div className="flex items-center justify-between">
                  <Quote size={22} className="text-rosso/20" />
                  <span className="rounded-full bg-carbone/[0.06] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-carbone/60">
                    {r.source}
                  </span>
                </div>

                <blockquote className="mt-4 flex-1 text-pretty text-[14px] leading-relaxed text-carbone/85">
                  {r.text}
                </blockquote>

                <figcaption className="mt-5 flex items-center gap-3 border-t border-carbone/[0.08] pt-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rosso/10 font-display text-xs font-bold text-rosso">
                    {r.author
                      .split(' ')
                      .map((w) => w[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                  <div>
                    <span className="block text-sm font-semibold text-carbone">{r.author}</span>
                    <span className="flex items-center gap-1.5 pt-0.5">
                      <span className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, k) => (
                          <Star key={k} size={9} className="fill-oro text-oro" />
                        ))}
                      </span>
                      <span className="text-[11px] text-carbone/55">{r.activity}</span>
                    </span>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 text-center">
            <a
              href={company.reviews.readUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-dark"
            >
              Leggi tutte le recensioni
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
