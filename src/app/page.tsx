import Link from 'next/link';

const services = [
  {
    title: 'Manutenzione programmata',
    description: 'Organizza controlli e interventi su impianti e ambienti per prenderti cura della struttura nel tempo.',
  },
  {
    title: 'Gestione degli interventi',
    description: 'Coordina segnalazioni, priorità e attività tecniche con attenzione alle esigenze quotidiane della struttura.',
  },
  {
    title: 'Cura degli spazi',
    description: 'Pianifica le attività di pulizia e cura delle aree comuni per offrire ambienti accoglienti agli ospiti.',
  },
];

const steps = [
  {
    title: 'Ascoltiamo le tue esigenze',
    description: 'Partiamo dalla struttura, dai suoi spazi e dalle necessità del tuo team.',
  },
  {
    title: 'Definiamo il piano',
    description: 'Individuiamo attività, priorità e frequenze in base alle esigenze operative.',
  },
  {
    title: 'Coordiniamo le attività',
    description: 'Organizziamo gli interventi e il loro monitoraggio per una gestione più ordinata.',
  },
];

export default function HomePage() {
  return (
    <>
      <section
        data-nav-theme="dark"
        aria-labelledby="hostfacility-title"
        className="relative overflow-hidden bg-carbone pb-20 pt-36 text-avorio md:pb-28 md:pt-44"
      >
        <div className="blueprint pointer-events-none absolute inset-0" />
        <div className="container-ac relative grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow text-rosso">HostFacility</p>
            <h1 id="hostfacility-title" className="h-display mt-6 text-5xl sm:text-6xl lg:text-7xl">
              La tua struttura, nelle giuste mani.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-avorio/75 md:text-lg">
              Facility management per hotel, B&amp;B e strutture ricettive.
              Manutenzione, cura degli spazi e coordinamento operativo per
              lasciarti più tempo da dedicare ai tuoi ospiti.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/contatti" className="btn-rosso">
                Parliamo della tua struttura
              </Link>
              <a href="#servizi" className="btn-ghost-light">
                Scopri i servizi
              </a>
            </div>
          </div>
          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Più cura per gli spazi. Più attenzione agli ospiti.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-avorio/70">
              Una gestione organizzata parte dalle attività di ogni giorno.
              Costruiamo un piano attorno alle esigenze della tua struttura.
            </p>
            <ul className="mt-6 space-y-4 text-sm text-avorio/80">
              {['Attività pianificate', 'Priorità condivise', 'Interventi coordinati'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-rosso" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section id="servizi" aria-labelledby="servizi-title" className="scroll-mt-28 bg-avorio py-20 md:py-24">
        <div className="container-ac">
          <p className="eyebrow text-rosso">I servizi</p>
          <h2 id="servizi-title" className="mt-5 max-w-2xl font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Tutto ciò che serve per prenderti cura della tua struttura.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="rounded-3xl border border-carbone/10 bg-white p-7">
                <h3 className="font-display text-xl font-bold">{service.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-carbone/70">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="metodo-title" className="bg-sabbia py-20 md:py-24">
        <div className="container-ac">
          <p className="eyebrow text-rosso">Il metodo</p>
          <h2 id="metodo-title" className="mt-5 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Dalle esigenze a un piano concreto.
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-carbone/15 pt-6">
                <span aria-hidden="true" className="text-sm font-bold text-rosso">0{index + 1}</span>
                <h3 className="mt-4 font-display text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-carbone/70">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="contatto-title" className="bg-avorio py-20 md:py-24">
        <div className="container-ac">
          <div className="rounded-3xl bg-carbone px-6 py-12 text-center text-avorio md:p-16">
            <h2 id="contatto-title" className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
              Diamo forma a una gestione più semplice.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-avorio/75">
              Raccontaci la tua struttura e le attività che vuoi organizzare.
              Partiamo dalle tue esigenze per definire il prossimo passo.
            </p>
            <Link href="/contatti" className="btn-rosso mt-8">
              Richiedi informazioni
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
