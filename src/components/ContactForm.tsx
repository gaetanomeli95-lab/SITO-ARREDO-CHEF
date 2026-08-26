'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { company } from '@/data/company';
import { track } from '@/lib/analytics';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'fallback';

const activities = [
  'Ristorante',
  'Bar / Caffetteria',
  'Pizzeria',
  'Hotel',
  'Pasticceria',
  'Pub',
  'Gastronomia / Rosticceria',
  'Macelleria',
  'Altro',
];

const inputBase =
  'w-full rounded-xl border border-carbone/20 bg-white px-4 py-3.5 text-sm text-carbone outline-none transition-colors placeholder:text-carbone/50 focus:border-rosso/50';

const labelBase = 'mb-2 block text-[11px] font-bold uppercase tracking-widest text-carbone/70';

export default function ContactForm({
  initialMessage = '',
  quoteContext,
}: {
  /** Messaggio precompilato (es. riepilogo del progetto). */
  initialMessage?: string;
  /** Se presente, l'invio viene tracciato come richiesta preventivo. */
  quoteContext?: string;
} = {}) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefono: '',
    attivita: '',
    citta: '',
    messaggio: initialMessage,
    privacy: false,
    website: '',
  });

  const update = (k: keyof typeof form, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const mailtoHref = `mailto:${company.email}?subject=${encodeURIComponent(
    `Richiesta dal sito — ${form.nome || 'nuovo contatto'}`
  )}&body=${encodeURIComponent(
    `Nome: ${form.nome}\nEmail: ${form.email}\nTelefono: ${form.telefono}\nAttività: ${form.attivita}\nCittà: ${form.citta}\n\n${form.messaggio}`
  )}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/contatti', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();

      if (res.ok && json.ok) {
        setStatus('sent');
        if (quoteContext) track('quote_submitted', { context: quoteContext });
        return;
      }

      if (json.reason === 'not_configured' || json.reason === 'send_failed') {
        setStatus('fallback');
        return;
      }

      setError(json.error ?? 'Si è verificato un errore. Riprova.');
      setStatus('error');
    } catch {
      setStatus('fallback');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-3xl border border-carbone/15 bg-white p-10 text-center shadow-lift md:p-14">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rosso/10 text-rosso">
          <CheckCircle2 size={26} />
        </span>
        <h3 className="h-display mt-6 text-2xl text-carbone">Richiesta inviata.</h3>
        <p className="mx-auto mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-carbone/80">
          Grazie {form.nome.split(' ')[0]}. Ti ricontattiamo al più presto, di norma entro un
          giorno lavorativo. Se hai fretta, chiamaci pure.
        </p>
        <a href={`tel:${company.phones.marketing.tel}`} className="btn-rosso mt-8">
          {company.phones.marketing.display}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-carbone/15 bg-white p-6 shadow-lift sm:p-8 md:p-10"
    >
      <h3 className="h-display text-2xl text-carbone">Raccontaci cosa ti serve</h3>
      <p className="mt-3 text-sm leading-relaxed text-carbone/75">
        Più dettagli ci dai, più preciso sarà il preventivo. I campi con * sono obbligatori.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
        <div>
          <label htmlFor="nome" className={labelBase}>
            Nome e cognome *
          </label>
          <input
            id="nome"
            required
            value={form.nome}
            onChange={(e) => update('nome', e.target.value)}
            className={inputBase}
            placeholder="Mario Rossi"
          />
        </div>

        <div>
          <label htmlFor="email" className={labelBase}>
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className={inputBase}
            placeholder="mario@iltuolocale.it"
          />
        </div>

        <div>
          <label htmlFor="telefono" className={labelBase}>
            Telefono
          </label>
          <input
            id="telefono"
            type="tel"
            value={form.telefono}
            onChange={(e) => update('telefono', e.target.value)}
            className={inputBase}
            placeholder="333 1234567"
          />
        </div>

        <div>
          <label htmlFor="citta" className={labelBase}>
            Città
          </label>
          <input
            id="citta"
            value={form.citta}
            onChange={(e) => update('citta', e.target.value)}
            className={inputBase}
            placeholder="Palermo"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="attivita" className={labelBase}>
            Tipo di attività
          </label>
          <select
            id="attivita"
            value={form.attivita}
            onChange={(e) => update('attivita', e.target.value)}
            className={`${inputBase} cursor-pointer`}
          >
            <option value="">Seleziona…</option>
            {activities.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="messaggio" className={labelBase}>
            Il tuo progetto *
          </label>
          <textarea
            id="messaggio"
            required
            rows={5}
            value={form.messaggio}
            onChange={(e) => update('messaggio', e.target.value)}
            className={`${inputBase} resize-none`}
            placeholder="Sto aprendo una pizzeria da 60 coperti a Bagheria, mi serve la linea cottura completa e la cella. Budget indicativo…"
          />
        </div>
      </div>

      {/* Trappola anti-bot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={form.website}
        onChange={(e) => update('website', e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <label className="mt-7 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          required
          checked={form.privacy}
          onChange={(e) => update('privacy', e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-rosso"
        />
        <span className="text-[13px] leading-relaxed text-carbone/75">
          Acconsento al trattamento dei miei dati personali per essere ricontattato, secondo la{' '}
          <a href="/privacy" className="font-medium text-rosso underline underline-offset-2">
            Privacy Policy
          </a>
          . *
        </span>
      </label>

      {status === 'error' && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-rosso/20 bg-rosso/5 p-4 text-sm text-rosso">
          <AlertCircle size={17} className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      {status === 'fallback' && (
        <div className="mt-6 rounded-xl border border-oro/30 bg-oro/8 p-5">
          <p className="text-sm font-semibold text-carbone">
            Non riusciamo a inviare il modulo in questo momento.
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-carbone/80">
            Nessun problema: apri la tua email già compilata oppure chiamaci direttamente.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={mailtoHref} className="btn-rosso !py-3 !px-5 !text-[13px]">
              Apri email precompilata
            </a>
            <a
              href={`tel:${company.phones.marketing.tel}`}
              className="btn-ghost-dark !py-3 !px-5 !text-[13px]"
            >
              {company.phones.marketing.display}
            </a>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-rosso group mt-8 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'sending' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Invio in corso…
          </>
        ) : (
          <>
            Invia richiesta
            <Send
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </>
        )}
      </button>
    </form>
  );
}
