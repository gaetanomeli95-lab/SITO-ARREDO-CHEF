import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/privacy', '/cookie'],
    },
    sitemap: 'https://www.arredochefsrls.it/sitemap.xml',
  };
}
