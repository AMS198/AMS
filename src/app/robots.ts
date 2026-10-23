// src/app/robots.ts
// Robots.txt configuration — allows search engine + AI crawlers
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard search engine crawlers
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/admin', '/api/'],
      },
      // ── AI Crawlers — Explicitly DISALLOW ──────────────────
      // GPTBot (OpenAI/ChatGPT)
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      // ChatGPT-User (ChatGPT browsing)
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      // Google-Extended (Gemini AI)
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
      // PerplexityBot
      {
        userAgent: 'PerplexityBot',
        disallow: '/',
      },
      // ClaudeBot (Anthropic)
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      // Bytespider (TikTok AI)
      {
        userAgent: 'Bytespider',
        disallow: '/',
      },
      { userAgent: 'OAI-SearchBot', disallow: '/' },
      { userAgent: 'Meta-ExternalAgent', disallow: '/' },
      { userAgent: 'Meta-ExternalFetcher', disallow: '/' },
      { userAgent: 'Meta-Llama', disallow: '/' },
      { userAgent: 'YouBot', disallow: '/' },
      { userAgent: 'Applebot-Extended', disallow: '/' },
      { userAgent: 'cohere-ai', disallow: '/' },
      { userAgent: 'Amazonbot', disallow: '/' },
      // CCBot (Common Crawl — feeds many AI models)
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      // ── Aggressive Commercial Scrapers & SEO Crawlers — Block to save Vercel Quota ──
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
    ],
    sitemap: 'https://www.amscivilwork.in/sitemap.xml',
    host: 'https://www.amscivilwork.in',
    // Note: Next.js MetadataRoute.Robots doesn't support custom fields,
    // but llms.txt is discoverable at /llms.txt by convention
  };
}
