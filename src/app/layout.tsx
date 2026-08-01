import type { Metadata, Viewport } from 'next';
import { Archivo, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { company } from '@/data/company';

const display = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const siteUrl = 'https://www.arredochefsrls.it';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Arredo Chef — Attrezzature professionali per la ristorazione | Villabate, Palermo',
    template: '%s | Arredo Chef',
  },
  description:
    'Attrezzature professionali nuove e usate per ristoranti, bar, hotel, pizzerie e pasticcerie. Soluzioni chiavi in mano: sopralluogo, preventivo su misura, fornitura e montaggio. Villabate, Palermo.',
  keywords: [
    'attrezzature ristorazione Palermo',
    'forniture bar Villabate',
    'cucine professionali Sicilia',
    'attrezzature usate ristorazione',
    'arredo inox Palermo',
    'refrigerazione professionale',
  ],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: siteUrl,
    siteName: company.name,
    title: 'Arredo Chef — Attrezzature professionali per la ristorazione',
    description:
      'Dalla planimetria vuota alla cucina che gira. Attrezzature nuove e usate, soluzioni chiavi in mano. Villabate (PA).',
    images: [{ url: '/images/hero-3.webp', width: 1024, height: 576, alt: 'Arredo Chef' }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0B0D10',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: company.legalName,
  alternateName: company.name,
  url: siteUrl,
  email: company.email,
  telephone: company.phones.marketing.tel,
  vatID: company.vat,
  description:
    'Fornitura di attrezzature professionali nuove e usate per ristoranti, bar, hotel, pizzerie e pasticcerie. Soluzioni chiavi in mano.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    postalCode: company.address.zip,
    addressLocality: company.address.city,
    addressRegion: company.address.province,
    addressCountry: company.address.country,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: company.reviews.rating,
    reviewCount: company.reviews.count,
  },
  areaServed: 'Sicilia',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
