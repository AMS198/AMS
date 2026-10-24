// src/app/feed.xml/route.ts
// Enhanced RSS Feed — includes full blog content, categories, and location tags
// AI tools like ChatGPT and Perplexity read RSS feeds for content citation

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

// SSG: Purged on-demand when admin creates/updates/deletes a blog.
// Never time-based — prevents RSS crawlers from triggering Serverless CPU spikes.
export const revalidate = false;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(req: NextRequest) {
  try {
    const db = await getDb();
    const blogs = await db.collection('blogs').find({
      published: true,
      $or: [{ publishDate: { $lte: new Date() } }, { publishDate: { $exists: false } }]
    }).sort({ publishDate: -1, createdAt: -1 }).limit(50).toArray();

    const SITE_URL = 'https://www.amscivilwork.in';

    let rssItemsXml = '';

    blogs.forEach((blog) => {
      const url = `${SITE_URL}/blog/${blog.slug}`;
      const pubDate = new Date(blog.publishDate || blog.createdAt).toUTCString();
      
      // Category tags for AI discoverability
      const categories: string[] = [];
      if (blog.seoKeywords) {
        blog.seoKeywords.split(',').forEach((kw: string) => {
          const trimmed = kw.trim();
          if (trimmed) categories.push(trimmed);
        });
      }
      // Add location tags as categories
      if (blog.locationTags && Array.isArray(blog.locationTags)) {
        blog.locationTags.forEach((loc: string) => {
          if (loc) categories.push(loc);
        });
      }
      // Default categories
      categories.push('Civil Construction', 'Mumbai', 'AMS Civil');

      const categoryXml = categories
        .slice(0, 10) // Max 10 categories per item
        .map(cat => `<category><![CDATA[${cat}]]></category>`)
        .join('\n          ');

      // Strip HTML tags for clean text content  
      const plainContent = (blog.content || '')
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim();

      // Truncate for description but keep full for content:encoded
      const excerpt = blog.excerpt || plainContent.substring(0, 300) + '...';

      rssItemsXml += `
        <item>
          <title><![CDATA[${blog.title}]]></title>
          <link>${url}</link>
          <guid isPermaLink="true">${url}</guid>
          <pubDate>${pubDate}</pubDate>
          <description><![CDATA[${excerpt}]]></description>
          <content:encoded><![CDATA[${blog.content || ''}]]></content:encoded>
          ${blog.author ? `<dc:creator><![CDATA[${blog.author}]]></dc:creator>` : '<dc:creator><![CDATA[AMS Civil Team]]></dc:creator>'}
          ${blog.featuredImage ? `<media:content url="${escapeXml(blog.featuredImage.startsWith('http') ? blog.featuredImage : SITE_URL + blog.featuredImage)}" medium="image" />` : ''}
          ${categoryXml}
        </item>`;
    });

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0" 
        xmlns:atom="http://www.w3.org/2005/Atom"
        xmlns:content="http://purl.org/rss/1.0/modules/content/"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:media="http://search.yahoo.com/mrss/">
        <channel>
          <title>AMS Civil Construction Blog — Expert Construction Guides</title>
          <link>${SITE_URL}</link>
          <description>Expert construction tips, cost guides, renovation ideas, and interior design inspiration across Mumbai, Ranchi, Bangalore, Kolkata, and 90+ cities. By AMS Civil Construction — India's trusted civil contractor with 10+ years experience.</description>
          <language>en-in</language>
          <managingEditor>ams.constructionwork@gmail.com (AMS Civil Team)</managingEditor>
          <webMaster>ams.constructionwork@gmail.com (AMS Civil Team)</webMaster>
          <copyright>Copyright ${new Date().getFullYear()} AMS Civil Construction. All rights reserved.</copyright>
          <category>Civil Construction</category>
          <category>Home Renovation</category>
          <category>Interior Design</category>
          <category>Construction Cost Guide</category>
          <category>Mumbai Construction</category>
          <image>
            <url>${SITE_URL}/favicon.png</url>
            <title>AMS Civil Construction</title>
            <link>${SITE_URL}</link>
          </image>
          <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
          ${rssItemsXml}
        </channel>
      </rss>`;

    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        // Long CDN cache — edge serves stale until on-demand revalidation fires
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Failed to generate RSS feed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
