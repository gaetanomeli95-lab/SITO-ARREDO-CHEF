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
  'w-full border-0 border-b border-carbone/15 bg-transparent px-0 py-3.5 text-sm text-carbone outline-none transition-colors placeholder:text-carbone/35 focus:border-rosso';

const labelBase = 'mb-1 block text-[9px] font-bold uppercase tracking-[0.2em] text-carbone/45';

export default function ContactForm({
  initialMessage = '',
  quoteContext,
}: {
  initialMessage?: string;
  quoteContext?: string;
} = {}) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    nome: '', email: '', telefono: '', attivita: '', citta: '', messaggio: initialMessage, privacy: false, website: '',
  });

  const update = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const mailtoHref = `mailto:${company.email}?subject=${encodeURIComponent(`Richiesta dal sito — ${form.nome || 'nuovo contatto'}`)}&body=${encodeURIComponent(`Nome: ${form.nome}\nEmail: ${form.email}\nTelefono: ${form.telefono}\nAttività: ${form.attivita}\nCittà: ${form.citta}\n\n${form.messaggio}`)}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contatti', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
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
      <div className="border-y border-carbone/12 bg-white/55 px-4 py-12 text-center sm:px-8 sm:py-16">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rosso text-white"><CheckCircle2 size={26} /></span>
        <h3 className="h-display mt-6 text-3xl text-carbone">Richiesta ricevuta.</h3>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-carbone/68">Grazie {form.nome.split(' ')[0]}. Ti ricontattiamo al più presto. Se hai fretta, chiamaci direttamente.</p>
        <a href={`tel:${company.phones.marketing.tel}`} className="btn-rosso mt-8">{company.phones.marketing.display}</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative overflow-hidden border-y border-carbone/12 bg-white/55 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-8 lg:px-8">
      <span className="absolute left-0 top-0 h-[3px] w-24 bg-rosso" />
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-rosso">Project brief / input</p>
          <h3 className="h-display mt-3 text-2xl text-carbone sm:text-3xl">Raccontaci cosa stai costruendo</h3>
        </div>
        <span className="hidden font-display text-5xl font-black text-carbone/[0.05] sm:block">01</span>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-carbone/62">Non serve avere tutto definito. Inserisci quello che sai: il resto lo ricostruiamo insieme.</p>

      <div className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
        <div><label htmlFor="nome" className={labelBase}>Nome e cognome *</label><input id="nome" required value={form.nome} onChange={(e) => update('nome', e.target.value)} className={inputBase} placeholder="Mario Rossi" /></div>
        <div><label htmlFor="email" className={labelBase}>Email *</label><input id="email" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} className={inputBase} placeholder="mario@iltuolocale.it" /></div>
        <div><label htmlFor="telefono" className={labelBase}>Telefono</label><input id="telefono" type="tel" value={form.telefono} onChange={(e) => update('telefono', e.target.value)} className={inputBase} placeholder="333 1234567" /></div>
        <div><label htmlFor="citta" className={labelBase}>Città</label><input id="citta" value={form.citta} onChange={(e) => update('citta', e.target.value)} className={inputBase} placeholder="Palermo" /></div>
        <div className="sm:col-span-2"><label htmlFor="attivita" className={labelBase}>Tipo di attività</label><select id="attivita" value={form.attivita} onChange={(e) => update('attivita', e.target.value)} className={`${inputBase} cursor-pointer`}><option value="">Seleziona…</option>{activities.map((a) => <option key={a} value={a}>{a}</option>)}</select></div>
        <div className="sm:col-span-2"><label htmlFor="messaggio" className={labelBase}>Il tuo progetto *</label><textarea id="messaggio" required rows={5} value={form.messaggio} onChange={(e) => update('messaggio', e.target.value)} className={`${inputBase} resize-none`} placeholder="Sto aprendo una pizzeria da 60 coperti a Bagheria…" /></div>
      </div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update('website', e.target.value)} className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden="true" />

      <label className="mt-7 flex cursor-pointer items-start gap-3 border-t border-carbone/10 pt-5">
        <input type="checkbox" required checked={form.privacy} onChange={(e) => update('privacy', e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-rosso" />
        <span className="text-[12px] leading-relaxed text-carbone/62">Acconsento al trattamento dei miei dati personali secondo la <a href="/privacy" className="font-semibold text-rosso underline underline-offset-2">Privacy Policy</a>. *</span>
      </label>

      {status === 'error' && <div className="mt-6 flex items-start gap-3 border-l-2 border-rosso bg-rosso/5 p-4 text-sm text-rosso"><AlertCircle size={17} className="mt-0.5 shrink-0" />{error}</div>}

      {status === 'fallback' && (
        <div className="mt-6 border-l-2 border-oro bg-white/65 p-5">
          <p className="text-sm font-semibold text-carbone">Il modulo non riesce a inviare in questo momento.</p>
          <p className="mt-2 text-[13px] leading-relaxed text-carbone/68">Puoi aprire una mail già compilata oppure chiamarci direttamente.</p>
          <div className="mt-5 flex flex-wrap gap-3"><a href={mailtoHref} className="btn-rosso !px-5 !py-3 !text-[13px]">Apri email precompilata</a><a href={`tel:${company.phones.marketing.tel}`} className="btn-ghost-dark !px-5 !py-3 !text-[13px]">{company.phones.marketing.display}</a></div>
        </div>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-rosso group mt-8 w-full disabled:cursor-not-allowed disabled:opacity-60">
        {status === 'sending' ? <><Loader2 size={16} className="animate-spin" />Invio in corso…</> : <>Invia il brief <Send size={15} className="transition-transform duration-300 group-hover:translate-x-1" /></>}
      </button>
    </form>
  );
}
