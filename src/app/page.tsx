// src/app/page.tsx  -  Home Page (SSG Server Component)
// Data is fetched at BUILD TIME via direct DB calls.
// Cache is purged on-demand: revalidateGallery() / revalidateProjects() called by admin APIs.
// All client-side interactivity lives in HomePageSections (a 'use client' component).
export const revalidate = false;

import type { Metadata } from 'next';
import { getDb } from '@/lib/mongodb';
import HomePageSections from '@/components/home/HomePageSections';
import type { ProjectType } from '@/components/home/HomePageSections';
import type { GalleryItem } from '@/components/ui/GalleryCarousel';
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema';
import { faqs } from '@/data/siteData';

export const metadata: Metadata = {
  title: 'Best Civil Contractor in Mumbai | Bungalow Construction & Renovation | AMS Civil',
  description:
    "AMS Civil Construction — Mumbai's #1 civil contractor for bungalow construction, bathroom renovation, kitchen work, tiles, flooring & interior civil work. 10+ years, 200+ projects. Call to book your site visit!",
  alternates: { canonical: 'https://www.amscivilwork.in' },
  openGraph: {
    title: 'Best Civil Contractor in Mumbai | AMS Civil Construction',
    description:
      'Premium bungalow construction, renovation & interior civil work across Mumbai, Navi Mumbai & Thane.',
    url: 'https://www.amscivilwork.in',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AMS Civil Construction - Best Civil Contractor in Mumbai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Civil Contractor in Mumbai | AMS Civil Construction',
    description:
      'Premium bungalow construction, renovation & interior civil work across Mumbai, Navi Mumbai & Thane. 10+ years experience.',
    images: ['/og-image.jpg'],
  },
};

export default async function HomePage() {
  // Fetch gallery and projects at BUILD TIME — embedded in static HTML
  let galleryItems: GalleryItem[] = [];
  let projects: ProjectType[] = [];
  let totalProjectsCount = 0;

  try {
    const db = await getDb();
    const [galleryDocs, projectDocs, count] = await Promise.all([
      db.collection('gallery').find({}).sort({ createdAt: -1 }).limit(20).toArray(),
      db.collection('projects').find({}).sort({ createdAt: -1 }).toArray(),
      db.collection('projects').countDocuments().catch(() => 0),
    ]);
    totalProjectsCount = count || projectDocs.length || 0;
    galleryItems = galleryDocs.map(({ _id, ...rest }) => ({
      id:       _id.toString(),
      src:      String(rest.src      ?? ''),
      title:    String(rest.title    ?? 'AMS Civil Construction'),
      category: String(rest.category ?? 'General'),
    }));
    projects = projectDocs.map(({ _id, ...rest }) => ({
      id:           _id.toString(),
      title:        String(rest.title       ?? ''),
      category:     String(rest.category    ?? 'General'),
      location:     String(rest.location    ?? ''),
      status:       (rest.status as 'ongoing' | 'completed') ?? 'completed',
      description:  String(rest.description ?? ''),
      images:       Array.isArray(rest.images) ? (rest.images as string[]) : [],
      completedDate: rest.completedDate ? String(rest.completedDate) : undefined,
    }));
  } catch (err) {
    console.error('[Home SSG] DB fetch failed — page will render with empty dynamic sections:', err);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Hire the Best Civil Contractor in Mumbai',
    description: 'A simple 3-step process to get your home built or renovated stress-free.',
    step: [
      { '@type': 'HowToStep', name: 'Free Site Visit & Consultation', text: 'Our engineer visits your property to understand your requirements, take measurements, and discuss ideas (100% Free under Diwali Offer till 15 Nov; nominal visit fee applicable post offer, adjustable in bill).' },
      { '@type': 'HowToStep', name: 'Transparent Quote', text: 'You receive a detailed, itemized quotation with zero hidden costs and exact timelines.' },
      { '@type': 'HowToStep', name: 'Flawless Execution', text: 'Our skilled team starts the work under senior supervision, keeping you updated at every milestone.' },
    ],
  };

  const webSiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.amscivilwork.in/#website',
    name: 'AMS Civil Construction',
    alternateName: ['AMS Civil Work Mumbai', 'AMS Construction'],
    url: 'https://www.amscivilwork.in',
    inLanguage: 'en-IN',
    publisher: {
      '@type': 'LocalBusiness',
      name: 'AMS Civil Construction',
      '@id': 'https://www.amscivilwork.in/#localbusiness',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <LocalBusinessSchema />
      {/* Client component — all interactive sections receive pre-fetched data as props */}
      <HomePageSections galleryItems={galleryItems} projects={projects} totalProjectsCount={totalProjectsCount} />
    </>
  );
}