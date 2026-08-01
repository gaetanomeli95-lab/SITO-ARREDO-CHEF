import { NextResponse } from 'next/server';
import { company } from '@/data/company';

export const runtime = 'nodejs';

type Payload = {
  nome?: string;
  email?: string;
  telefono?: string;
  attivita?: string;
  citta?: string;
  messaggio?: string;
  privacy?: boolean;
  // Campo trappola per i bot: deve restare vuoto
  website?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  let data: Payload;

  try {
    data = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: 'Richiesta non valida.' }, { status: 400 });
  }

  // Honeypot: se compilato è quasi certamente un bot
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const nome = (data.nome ?? '').trim();
  const email = (data.email ?? '').trim();
  const telefono = (data.telefono ?? '').trim();
  const messaggio = (data.messaggio ?? '').trim();

  if (!nome || !email || !messaggio) {
    return NextResponse.json(
      { ok: false, error: 'Nome, email e messaggio sono obbligatori.' },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Indirizzo email non valido.' }, { status: 400 });
  }

  if (!data.privacy) {
    return NextResponse.json(
      { ok: false, error: 'È necessario accettare il trattamento dei dati.' },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? company.email;

  // Servizio email non ancora configurato: lo comunichiamo al client,
  // che proporrà il contatto diretto invece di far perdere la richiesta.
  if (!apiKey || !from) {
    console.warn('[contatti] RESEND non configurato. Richiesta ricevuta da:', email);
    return NextResponse.json(
      { ok: false, reason: 'not_configured', error: 'Invio email non configurato.' },
      { status: 501 }
    );
  }

  const rows: Array<[string, string]> = [
    ['Nome', nome],
    ['Email', email],
    ['Telefono', telefono || '—'],
    ['Tipo di attività', (data.attivita ?? '').trim() || '—'],
    ['Città', (data.citta ?? '').trim() || '—'],
  ];

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:600px">
      <h2 style="color:#D8232A;margin:0 0 4px">Nuova richiesta dal sito</h2>
      <p style="color:#666;margin:0 0 20px;font-size:13px">arredochefsrls.it — modulo contatti</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 0;color:#888;width:150px">${k}</td><td style="padding:8px 0;color:#14161A"><strong>${escapeHtml(
                v
              )}</strong></td></tr>`
          )
          .join('')}
      </table>
      <div style="margin-top:20px;padding:16px;background:#f6f6f4;border-left:3px solid #D8232A">
        <p style="margin:0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px">Messaggio</p>
        <p style="margin:8px 0 0;color:#14161A;white-space:pre-wrap">${escapeHtml(messaggio)}</p>
      </div>
    </div>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Richiesta sito — ${nome}`,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('[contatti] Errore Resend:', res.status, detail);
      return NextResponse.json(
        { ok: false, reason: 'send_failed', error: 'Invio non riuscito.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contatti] Errore di rete:', err);
    return NextResponse.json(
      { ok: false, reason: 'send_failed', error: 'Invio non riuscito.' },
      { status: 502 }
    );
  }
}
