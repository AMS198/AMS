// src/app/sitemap.ts
// Auto-generates /sitemap.xml — submitted to Google Search Console

import { MetadataRoute } from 'next';
import { getDb } from '@/lib/mongodb';
import { locations } from '@/data/locations';
import { services } from '@/data/siteData';

// SSG: Purged on-demand when admin creates/updates/deletes a blog.
// Never time-based — prevents bots from triggering Serverless CPU spikes.
export const revalidate = false;

const BASE = 'https://www.amscivilwork.in';
// Use a fixed date — not `new Date()` — so Google sees stable lastModified
const SITE_UPDATED = new Date('2026-05-25');

/* ── Zone-based priority tiers for crawl budget optimization ── */
const CORE_ZONES = ['South Mumbai', 'Western Line', 'Central Line', 'Navi Mumbai'];

function getLocationPriority(zone: string): number {
  if (CORE_ZONES.includes(zone)) return 0.85;
  if (zone === 'Maharashtra') return 0.7;
  return 0.6; // Jharkhand, West Bengal, Karnataka
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  /* ── Static pages ──────────────────────────────────────── */
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,               lastModified: SITE_UPDATED, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/about`,    lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services`, lastModified: SITE_UPDATED, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/projects`, lastModified: SITE_UPDATED, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/gallery`,  lastModified: SITE_UPDATED, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/contact`,  lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`,     lastModified: SITE_UPDATED, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/areas`,    lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/calculator`, lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/packages`,   lastModified: SITE_UPDATED, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/free-consultation`, lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/feed.xml`,   lastModified: SITE_UPDATED, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE}/terms`,      lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`,    lastModified: SITE_UPDATED, changeFrequency: 'monthly', priority: 0.5 },
  ];

  /* ── Individual service pages /services/[slug] ──────────── */
  const servicePages: MetadataRoute.Sitemap = services.map(svc => ({
    url:             `${BASE}/services/${svc.slug}`,
    lastModified:    SITE_UPDATED,
    changeFrequency: 'monthly' as const,
    priority:        0.9,
  }));

  /* ── Location pages & Location × Service pages ────────────── */
  const locationPages: MetadataRoute.Sitemap = [];
  locations.forEach((loc, index) => {
    // English Main Location
    locationPages.push({
      url:             `${BASE}/areas/${loc.slug}`,
      lastModified:    SITE_UPDATED,
      changeFrequency: 'weekly' as const,
      priority:        getLocationPriority(loc.zone),
    });
    
    // Hindi Main Location
    locationPages.push({
      url:             `${BASE}/hi/areas/${loc.slug}`,
      lastModified:    SITE_UPDATED,
      changeFrequency: 'weekly' as const,
      priority:        getLocationPriority(loc.zone) * 0.9,
    });

    // Marathi Main Location
    locationPages.push({
      url:             `${BASE}/mr/areas/${loc.slug}`,
      lastModified:    SITE_UPDATED,
      changeFrequency: 'weekly' as const,
      priority:        getLocationPriority(loc.zone) * 0.9,
    });
  });

  /* ── Dynamic Blogs ─────────────────────────────────────── */
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const db = await getDb();
    const blogs = await db.collection('blogs').find({
      published: true
    }).toArray();
    
    blogPages = blogs.map(blog => ({
      url: `${BASE}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt || blog.createdAt),
      changeFrequency: 'weekly' as const,
      priority: blog.slug?.includes('guide') || blog.slug?.includes('2026') ? 0.9 : 0.8,
    }));
  } catch (error) {
    console.error('[Sitemap] Failed to fetch dynamic blogs from MongoDB:', error);
  }

  return [...staticPages, ...servicePages, ...locationPages, ...blogPages];
}

