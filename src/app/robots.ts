// src/app/robots.ts
// Robots.txt configuration — allows search engine + AI crawlers
import { MetadataRoute } from 'next';

export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Verified Search Engines & AI Search Engines (Google, Bing, ChatGPT, Perplexity, Claude, Apple AI)
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Applebot',
          'Applebot-Extended',
          'Google-Extended',
        ],
        allow: '/',
        disallow: ['/admin', '/api/', '/*?*'],
      },
      // Standard search crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/*?*'],
      },
      // ── Third-Party Commercial SEO Scrapers & Harvesters (No Search Value) ──
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
      { userAgent: 'Bytespider', disallow: '/' },
    ],
    sitemap: 'https://www.amscivilwork.in/sitemap.xml',
    host: 'https://www.amscivilwork.in',
  };
}
