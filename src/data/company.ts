export const company = {
  name: 'Arredo Chef',
  legalName: 'Arredo Chef S.R.L.S.',
  tagline: 'Dalla planimetria vuota alla cucina che gira.',
  vat: '06926680825',
  email: 'info@arredochefsrls.it',
  phones: {
    marketing: { label: 'Informazioni e vendita', display: '091 7780139', tel: '+390917780139' },
    admin: { label: 'Amministrazione', display: '393 859 3316', tel: '+393938593316' },
  },
  address: {
    street: 'Viale Europa, 79/G',
    zip: '90039',
    city: 'Villabate',
    province: 'PA',
    region: 'Sicilia',
    country: 'IT',
    full: 'Viale Europa, 79/G — 90039 Villabate (PA)',
    mapsQuery: 'Viale Europa 79/G, 90039 Villabate PA',
  },
  reviews: {
    count: 15,
    rating: 4.9,
    writeUrl:
      'https://admin.trustindex.io/api/googleWriteReview?place-id=ChIJ39e4fJvjGRMRQLJkXsLsg1U',
    readUrl:
      'https://www.google.com/search?q=Arredo+Chef+Villabate+recensioni',
  },
} as const;

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/catalogo', label: 'Catalogo' },
  { href: '/chi-siamo', label: 'Chi siamo' },
  { href: '/contatti', label: 'Contatti' },
] as const;

export type Step = {
  n: string;
  title: string;
  text: string;
};

export const process: Step[] = [
  {
    n: '01',
    title: 'Raccontaci il progetto',
    text: 'Ci scrivi o ci chiami. Ci racconti che locale hai, cosa ti serve, quando devi aprire. Anche se non hai le idee chiare, partiamo da lì.',
  },
  {
    n: '02',
    title: 'Selezioniamo la soluzione',
    text: 'Veniamo a vedere lo spazio, misuriamo e proponiamo le attrezzature giuste per il tuo budget, alternando nuovo e usato dove ha senso.',
  },
  {
    n: '03',
    title: 'Ricevi il preventivo',
    text: 'Ti consegniamo un preventivo chiaro, con tempi di consegna, costi e opzioni. Niente sorprese: quello che vedi è quello che paghi.',
  },
  {
    n: '04',
    title: 'Consegna, montaggio e assistenza',
    text: 'Consegniamo, installiamo e accendiamo tutto. Poi restiamo: per la prima settimana di lavoro e per gli anni dopo.',
  },
];

export type Service = {
  icon: string;
  title: string;
  text: string;
};

export const services: Service[] = [
  {
    icon: 'compass',
    title: 'Consulenza tecnica',
    text: 'Valutiamo lo spazio, i flussi di lavoro e le attrezzature necessarie. Ti diciamo cosa serve davvero, non cosa costa di più.',
  },
  {
    icon: 'ruler',
    title: 'Progettazione su misura',
    text: 'Disegniamo la disposizione della cucina attorno al tuo locale e al tuo menu, non a un catalogo generico.',
  },
  {
    icon: 'wrench',
    title: 'Montaggio e installazione',
    text: 'Consegniamo, montiamo e collaudiamo ogni macchinario. Ce ne andiamo quando la cucina lavora, non quando il camion è vuoto.',
  },
  {
    icon: 'lifeBuoy',
    title: 'Assistenza post-vendita',
    text: "Restiamo disponibili dopo l'installazione: per un guasto, un dubbio, un pezzo di ricambio. Rispondiamo al telefono anche il sabato sera.",
  },
];

export type Review = {
  author: string;
  text: string;
  source: string;
  activity: string;
};

export const reviews: Review[] = [
  {
    author: 'Giovanni Crivello',
    text: 'Professionalità al top con prezzi super competitivi.',
    source: 'Google',
    activity: 'Ristorante',
  },
  {
    author: 'Antonello Tramonte',
    text: "Poche parole per descrivere Arredo Chef: professionalità, puntualità e cortesia. Consigliatissimo.",
    source: 'Google',
    activity: 'Pizzeria',
  },
  {
    author: 'Francesco Sampino',
    text: "Ottimo servizio e personale serio. Sono molto soddisfatto dell'acquisto che ho fatto da loro. Lo consiglio a tutti. Grazie a tutto lo staff Arredo Chef.",
    source: 'Google',
    activity: 'Gastronomia',
  },
  {
    author: 'Andrea Pietroboni',
    text: 'Gentili, disponibili, azienda molto seria! La consiglio a tutti.',
    source: 'Google',
    activity: 'Bar',
  },
  {
    author: 'Cristina Martocean',
    text: 'I ragazzi sono bravi, in special modo Manuel, e i ragazzi della consegna bravi ed educati.',
    source: 'Google',
    activity: 'Hotel',
  },
  {
    author: 'Loredana Mazzara',
    text: 'Ottimo rivenditore.',
    source: 'Google',
    activity: 'Pasticceria',
  },
];

export const sectors = [
  'Ristoranti',
  'Bar',
  'Hotel',
  'Pizzerie',
  'Pasticcerie',
  'Pub',
  'Gastronomie',
  'Macellerie',
  'Rosticcerie',
  'Gelaterie',
];
