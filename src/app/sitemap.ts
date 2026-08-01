import type { MetadataRoute } from 'next';
import { products } from '@/data/products';

const base = 'https://www.arredochefsrls.it';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/catalogo`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/chi-siamo`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/contatti`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/catalogo/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...productPages];
}
