// src/app/gallery/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Gallery | Our Construction & Renovation Work in Mumbai',
  description:
    'View our portfolio of 200+ completed projects — bungalows, modular kitchens, luxury bathrooms, tiles, flooring & civil work across Mumbai, Navi Mumbai & Thane. Real work, real results.',
  keywords: [
    'AMS Civil Construction gallery',
    'construction projects Mumbai',
    'bathroom renovation photos',
    'kitchen design portfolio Mumbai',
    'bungalow construction gallery',
    'civil work images Mumbai',
    'construction portfolio India',
    'renovation before after Mumbai',
  ],
  openGraph: {
    title: 'Project Gallery — 200+ Completed Projects | AMS Civil Construction',
    description:
      'Browse photos of our completed bungalows, kitchens, bathrooms, and civil work. Quality craftsmanship across all Mumbai areas.',
    url: 'https://www.amscivilwork.in/gallery',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AMS Civil Construction Gallery Mumbai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMS Civil Construction Gallery Mumbai',
    description: '200+ completed projects. See real work by Mumbai\'s top construction company.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.amscivilwork.in/gallery',
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
