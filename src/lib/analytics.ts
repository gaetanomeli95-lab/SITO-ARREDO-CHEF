/**
 * ANALYTICS EVENTS — eventi meaningful, consent-aware.
 *
 * Non integra direttamente nessun vendor: pubblica su `window.dataLayer`
 * solo se esiste (cioè solo se un tag manager è stato caricato dopo il
 * consenso dell'utente). Senza consenso: no-op totale, zero cookie.
 */

export type AnalyticsEvent =
  | 'product_view'
  | 'product_search'
  | 'product_filter'
  | 'project_add_item'
  | 'project_remove_item'
  | 'project_started'
  | 'project_completed'
  | 'quote_started'
  | 'quote_submitted'
  | 'plan_upload'
  | 'contact_click'
  | 'whatsapp_project_share';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: AnalyticsEvent, payload?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  if (!Array.isArray(window.dataLayer)) return;
  window.dataLayer.push({ event, ...payload });
}
