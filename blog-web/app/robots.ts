import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.promptpulse.com.br';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/portifolio', '/portfolio'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
