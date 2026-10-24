// src/app/gallery/page.tsx
// SSG Server Component — data fetched at build time, client component handles interactivity.
// Cache purged on-demand via revalidateGallery() when admin adds/removes images.
import type { Metadata } from 'next';
import { getDb } from '@/lib/mongodb';
import { galleryImages as fallbackImages } from '@/data/siteData';
import GalleryGrid from '@/components/gallery/GalleryGrid';

export const revalidate = false;

export const metadata: Metadata = {
  title: 'Project Gallery | Real Civil Construction & Renovation Work Mumbai',
  description:
    'Browse our verified gallery of 200+ completed projects — luxury bungalows, modular kitchens, Italian marble flooring, bathrooms & civil work across Mumbai, Navi Mumbai & Thane.',
  keywords: [
    'civil construction gallery Mumbai',
    'bungalow construction photos',
    'bathroom renovation images Mumbai',
    'modular kitchen gallery Mumbai',
    'Italian marble flooring photos',
    'POP false ceiling photos Mumbai',
    'AMS civil construction gallery',
  ],
  alternates: { canonical: 'https://www.amscivilwork.in/gallery' },
  openGraph: {
    title: 'Project Gallery | Real Civil Construction Work Mumbai',
    description:
      'Verified photos of completed bungalows, kitchens, bathrooms, tiles, flooring & interiors across Mumbai.',
    url: 'https://www.amscivilwork.in/gallery',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AMS Civil Construction Gallery' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMS Civil Construction Gallery Mumbai',
    description: '200+ completed projects photos. Quality craftsmanship across all Mumbai areas.',
    images: ['/og-image.jpg'],
  },
};

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export default async function GalleryPage() {
  let images: GalleryImage[] = [];
  try {
    const db = await getDb();
    
    // Fetch manual gallery images
    const docs = await db.collection('gallery').find({}).sort({ createdAt: -1 }).toArray();
    const manualImages = docs.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      src: (rest.src as string) || '',
      alt: (rest.alt as string) || (rest.title as string) || 'AMS Civil Construction',
      category: (rest.category as string) || 'General',
    }));

    // Fetch project images automatically
    const projectDocs = await db.collection('projects').find({}).sort({ createdAt: -1 }).toArray();
    const projectImages: GalleryImage[] = [];
    
    projectDocs.forEach((proj) => {
      if (Array.isArray(proj.images)) {
        proj.images.forEach((imgSrc: string, index: number) => {
          if (imgSrc) {
            projectImages.push({
              id: `${proj._id.toString()}-img-${index}`,
              src: imgSrc,
              alt: (proj.title as string) || 'Project Image',
              category: (proj.category as string) || 'Projects',
            });
          }
        });
      }
    });

    // Combine both sets of images
    images = [...projectImages, ...manualImages];

  } catch (err) {
    console.error('[Gallery SSG] Failed to fetch gallery:', err);
  }

  // Fallback if DB returns no images
  if (!images || images.length === 0) {
    images = (fallbackImages || []).map((img, i) => ({
      id: `fallback-${i}`,
      src: img.src,
      alt: img.alt || 'AMS Civil Construction Work',
      category: img.category || 'Civil Work',
    }));
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ImageGallery',
        '@id': 'https://www.amscivilwork.in/gallery#gallery',
        url: 'https://www.amscivilwork.in/gallery',
        name: 'Project Gallery | AMS Civil Construction Mumbai',
        description:
          'Verified portfolio photos of completed bungalows, kitchens, bathrooms, tiles, flooring & interiors across Mumbai.',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://www.amscivilwork.in/#website',
          name: 'AMS Civil Construction',
          url: 'https://www.amscivilwork.in',
        },
        image: images.slice(0, 20).map((img) => ({
          '@type': 'ImageObject',
          contentUrl: img.src.startsWith('http') ? img.src : `https://www.amscivilwork.in${img.src}`,
          caption: img.alt,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amscivilwork.in' },
          { '@type': 'ListItem', position: 2, name: 'Gallery', item: 'https://www.amscivilwork.in/gallery' },
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
      <GalleryGrid images={images} />
    </>
  );
}
