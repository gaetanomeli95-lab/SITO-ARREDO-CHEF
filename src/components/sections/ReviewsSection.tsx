import { Quote, Star, ShieldCheck } from 'lucide-react';
import { company, reviews } from '@/data/company';
import Reveal from '@/components/Reveal';

export default function ReviewsSection() {
  const featured = reviews.slice(0, 3);

  return (
    <section
      data-nav-theme="light"
      className="relative overflow-hidden bg-[#f0ede7] py-20 md:py-28 lg:py-36"
    >
      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-36" />
      <div className="pointer-events-none absolute left-1/2 top-[-12rem] h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-white/75 blur-[140px]" />
      <div className="pointer-events-none absolute -right-28 bottom-10 h-[22rem] w-[22rem] rounded-full bg-rosso/[0.05] blur-[120px]" />

      <div className="container-ac relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-rosso/20 bg-white/80 font-display text-[11px] font-extrabold text-rosso shadow-lift-sm">
                07
              </span>
              <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.36em] text-rosso">
                <ShieldCheck size={11} /> Proof of work
              </span>
            </div>
            <h2 className="h-display mt-7 max-w-4xl text-[clamp(2.7rem,5.4vw,4.8rem)] text-carbone">
              Le parole di chi lavora
              <br />
              <span className="text-nebbia">con le nostre macchine.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[22px] border border-carbone/10 bg-white/78 p-5 shadow-lift-sm backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} className="fill-oro text-oro" />
                  ))}
                </span>
                <span className="font-display text-xl font-extrabold text-carbone">
                  {company.reviews.rating.toFixed(1)}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-carbone/58">
                {company.reviews.count} recensioni Google. La prova sociale qui non è decorazione:
                è parte del modo in cui scegliamo di farci valutare.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 lg:gap-5">
          {featured.map((r, i) => (
            <Reveal key={r.author} delay={Math.min(i * 0.08, 0.22)}>
              <figure className="group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-[24px] border border-carbone/10 bg-white/86 p-6 shadow-[0_28px_70px_-40px_rgba(11,13,16,.35)] transition-all duration-500 hover:-translate-y-1 hover:border-rosso/25 hover:shadow-lift sm:p-7">
                <span className="absolute left-0 top-0 h-px w-[32%] bg-gradient-to-r from-rosso to-transparent transition-all duration-500 group-hover:w-[68%]" />
                <div className="flex items-center justify-between gap-4">
                  <Quote size={24} className="text-rosso/22" />
                  <span className="rounded-full border border-carbone/10 bg-carbone/[0.035] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.24em] text-carbone/45">
                    {r.source}
                  </span>
                </div>

                <blockquote className="mt-7 flex-1 text-pretty text-[15px] leading-relaxed text-carbone/78">
                  {r.text}
                </blockquote>

                <figcaption className="mt-7 border-t border-carbone/10 pt-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-rosso/15 bg-rosso/[0.06] font-display text-xs font-extrabold text-rosso">
                      {r.author
                        .split(' ')
                        .map((w) => w[0])
                        .join('')
                        .slice(0, 2)}
                    </span>
                    <div className="min-w-0">
                      <span className="block text-sm font-bold text-carbone">{r.author}</span>
                      <span className="mt-1 flex items-center gap-2">
                        <span className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, k) => (
                            <Star key={k} size={9} className="fill-oro text-oro" />
                          ))}
                        </span>
                        <span className="truncate text-[11px] text-carbone/48">{r.activity}</span>
                      </span>
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.14}>
          <div className="mt-10 flex justify-center">
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
