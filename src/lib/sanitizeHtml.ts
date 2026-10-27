// src/lib/sanitizeHtml.ts
// Sanitizes blog HTML content to prevent malformed links from generating
// garbage URLs that Google crawls (e.g., /blog/<a href=)

import { marked } from 'marked';

/**
 * Sanitizes HTML content to fix common issues:
 * 1. Converts Markdown to HTML
 * 2. Removes broken/malformed anchor tags that could produce garbage crawlable URLs
 * 3. Fixes double-encoded HTML entities
 * 4. Ensures all links have proper href attributes
 */
export function sanitizeBlogHtml(htmlOrMarkdown: string): string {
  if (!htmlOrMarkdown) return '';

  let processed = htmlOrMarkdown;
  const hasHtmlTags = /<\/?(?:h[1-6]|p|div|ul|ol|li|table|article|section|blockquote)[^>]*>/i.test(htmlOrMarkdown);
  if (hasHtmlTags) {
    // Strip leading spaces from lines so marked doesn't misinterpret indented HTML as <pre><code> blocks
    processed = processed.replace(/^[ \t]+/gm, '');
  }

  // Parse markdown into HTML first (works fine if it's already HTML too)
  let sanitized = marked.parse(processed, { async: false }) as string;

  // Fix 1: Remove completely broken anchor tags where <a href= leaked as text
  // e.g., text that contains literal "<a href=" as visible text (not actual tags)
  // This catches cases like: some-slug-<a href= which Google interprets as a URL
  sanitized = sanitized.replace(
    /(<a\s+[^>]*href\s*=\s*)(["']?)(?!https?:\/\/|\/|#|mailto:|tel:|whatsapp:)([^"'\s>]*)(["']?)/gi,
    (match, prefix, openQuote, href, closeQuote) => {
      // If the href looks like garbage (contains HTML entities or tags), remove the link
      if (href.includes('<') || href.includes('&lt;') || href.includes('%3C')) {
        return '';
      }
      return match;
    }
  );

  // Fix 2: Remove anchor tags with empty or missing href
  sanitized = sanitized.replace(/<a\s+(?:(?!href)[^>])*>([^<]*)<\/a>/gi, '$1');
  sanitized = sanitized.replace(/<a\s+[^>]*href\s*=\s*["']?\s*["']?[^>]*>([^<]*)<\/a>/gi, (match, text) => {
    // Extract href value
    const hrefMatch = match.match(/href\s*=\s*["']?([^"'\s>]*)["']?/i);
    if (!hrefMatch || !hrefMatch[1] || hrefMatch[1].trim() === '') {
      return text; // Remove the link, keep the text
    }
    return match;
  });

  // Fix 3: Remove orphaned opening <a tags without closing tags
  // These create the worst crawl issues since browsers/crawlers try to interpret everything after as a URL
  sanitized = sanitized.replace(/<a\s+[^>]*(?:(?!>).)*$/gm, '');

  // Fix 4: Clean up any literal &lt;a href= that got double-encoded
  sanitized = sanitized.replace(/&lt;a\s+href=&quot;[^&]*&quot;&gt;/gi, '');
  sanitized = sanitized.replace(/&lt;\/a&gt;/gi, '');

  // Fix 5: Auto Internal Linking for SEO Impressions
  // Replaces the first occurrence of valuable keywords with a link to the service page
  const seoKeywords = [
    { word: 'bathroom renovation', link: '/services/bathroom-renovation' },
    { word: 'bungalow construction', link: '/services/bungalow-construction' },
    { word: 'modular kitchen', link: '/services/kitchen-work' },
    { word: 'kitchen renovation', link: '/services/kitchen-work' },
    { word: 'tiles work', link: '/services/tiles-work' },
    { word: 'flooring work', link: '/services/flooring-work' },
    { word: 'pop false ceiling', link: '/services/pop-work' },
    { word: 'pop work', link: '/services/pop-work' },
    { word: 'painting work', link: '/services/painting' },
    { word: 'waterproofing', link: '/services/waterproofing' },
    { word: 'civil contractor', link: '/areas/mumbai' },
    { word: 'civil work', link: '/services' }
  ];

  seoKeywords.forEach(({ word, link }) => {
    // Regex ensures we don't match inside existing HTML tags (like inside <a href="...">)
    // Matches only the FIRST occurrence (no 'g' flag)
    const regex = new RegExp(`(?<!<[^>]*)\\b(${word})\\b(?![^<]*>)`, 'i');
    sanitized = sanitized.replace(regex, `<a href="${link}" class="text-orange-500 font-bold hover:underline" title="${word} in Mumbai">$1</a>`);
  });

  return sanitized;
}
