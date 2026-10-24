// src/app/projects/page.tsx
// SSG Server Component — data fetched at build time, client component handles interactivity.
// Cache purged on-demand via revalidateProjects() when admin adds/updates/deletes a project.
import type { Metadata } from 'next';
import { getDb } from '@/lib/mongodb';
import ProjectsGrid from '@/components/projects/ProjectsGrid';

export const revalidate = false;

export const metadata: Metadata = {
  title: 'Our Construction Portfolio | Bungalows & Renovation Projects Mumbai',
  description:
    'Explore 250+ completed projects by AMS Civil Construction — luxury bungalows, flat renovations, bathrooms, modular kitchens & civil works across Mumbai, Navi Mumbai & Thane.',
  keywords: [
    'construction projects Mumbai',
    'bungalow construction portfolio',
    'renovation project examples Mumbai',
    'civil work gallery Mumbai',
    'AMS civil construction portfolio',
    'completed residential projects Mumbai',
  ],
  alternates: { canonical: 'https://www.amscivilwork.in/projects' },
  openGraph: {
    title: 'Our Construction Portfolio | AMS Civil Construction Mumbai',
    description:
      'Explore 250+ completed projects by AMS Civil Construction — luxury bungalows, flat renovations, bathrooms, modular kitchens & civil works.',
    url: 'https://www.amscivilwork.in/projects',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AMS Civil Construction Projects' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Construction Projects | AMS Civil Mumbai',
    description: '250+ completed bungalow construction & home renovation projects across Mumbai.',
    images: ['/og-image.jpg'],
  },
};

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  status: 'ongoing' | 'completed';
  description: string;
  images: string[];
  completedDate?: string;
}

export default async function ProjectsPage() {
  let projects: Project[] = [];
  try {
    const db = await getDb();
    const docs = await db.collection('projects').find({}).sort({ createdAt: -1 }).toArray();
    projects = docs.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      title:         (rest.title as string)       || '',
      slug:          (rest.slug as string)        || '',
      category:      (rest.category as string)    || 'General',
      location:      (rest.location as string)    || '',
      status:        (rest.status as 'ongoing' | 'completed') || 'completed',
      description:   (rest.description as string) || '',
      images:        Array.isArray(rest.images) ? rest.images as string[] : [],
      completedDate: rest.completedDate as string | undefined,
    }));
  } catch (err) {
    console.error('[Projects SSG] Failed to fetch projects:', err);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.amscivilwork.in/projects#collection',
        url: 'https://www.amscivilwork.in/projects',
        name: 'Our Construction & Renovation Projects | AMS Civil Construction',
        description: 'Explore 250+ completed projects by AMS Civil Construction across Mumbai, Navi Mumbai, and Thane.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://www.amscivilwork.in/#website',
          name: 'AMS Civil Construction',
          url: 'https://www.amscivilwork.in',
        },
        hasPart: projects.slice(0, 15).map((p, idx) => ({
          '@type': 'CreativeWork',
          position: idx + 1,
          name: p.title,
          description: p.description || `${p.category} project in ${p.location}`,
          image: p.images?.[0] || 'https://www.amscivilwork.in/og-image.jpg',
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amscivilwork.in' },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://www.amscivilwork.in/projects' },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsGrid projects={projects} />
    </>
  );
}
