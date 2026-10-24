// src/app/robots.ts
// Robots.txt configuration — allows search engine + AI crawlers
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard search engine & AI search crawlers (Google, Bing, ChatGPT Search, Perplexity)
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/*?*'],
        crawlDelay: 2,
      },
      {
        userAgent: ['GPTBot', 'OAI-SearchBot', 'PerplexityBot', 'Google-Extended', 'anthropic-ai', 'Applebot-Extended'],
        allow: '/',
        disallow: ['/admin', '/api/', '/*?*'],
        crawlDelay: 2,
      },
      // ── Aggressive Commercial Scrapers & Unauthorized SEO Harvesters — Block to save bandwidth ──
      { userAgent: 'AhrefsBot', disallow: '/' },
      { userAgent: 'SemrushBot', disallow: '/' },
      { userAgent: 'SemrushBot-SI', disallow: '/' },
      { userAgent: 'DotBot', disallow: '/' },
      { userAgent: 'MJ12bot', disallow: '/' },
      { userAgent: 'PetalBot', disallow: '/' },
      { userAgent: 'Barkrowler', disallow: '/' },
      { userAgent: 'Baiduspider', disallow: '/' },
      { userAgent: 'YandexBot', disallow: '/' },
      { userAgent: 'Sogou web spider', disallow: '/' },
      { userAgent: 'BLEXBot', disallow: '/' },
      { userAgent: 'SEOkicks', disallow: '/' },
      { userAgent: 'DataForSeoBot', disallow: '/' },
      { userAgent: 'ZoominfoBot', disallow: '/' },
      { userAgent: 'Screaming Frog SEO Spider', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
    ],
    sitemap: 'https://www.amscivilwork.in/sitemap.xml',
    host: 'https://www.amscivilwork.in',
    // Note: Next.js MetadataRoute.Robots doesn't support custom fields,
    // but llms.txt is discoverable at /llms.txt by convention
  };
}
