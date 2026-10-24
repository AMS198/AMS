// src/app/services/page.tsx
// Server component with proper SEO metadata + canonical
// Client-side interactivity lives in ServicesPageContent

import type { Metadata } from 'next';
import ServicesPageContent from '@/components/services/ServicesPageContent';
import { services } from '@/data/siteData';

export const metadata: Metadata = {
  title: 'Civil Construction & Renovation Services Mumbai | AMS Civil',
  description:
    'Complete civil construction and interior services in Mumbai: Bungalow construction, bathroom renovation, modular kitchens, tiles, flooring, POP, swimming pool, compound wall & building repair. 10+ years experience. Free quote: +91 87793 91690.',
  keywords: [
    'civil construction services Mumbai',
    'bungalow construction Mumbai',
    'bathroom renovation Mumbai',
    'kitchen work Mumbai',
    'tiles work contractor Mumbai',
    'flooring services Mumbai',
    'POP work Mumbai',
    'waterproofing contractor Mumbai',
    'swimming pool construction Mumbai',
    'compound wall contractor Mumbai',
    'building repair Mumbai',
    'interior civil work Mumbai',
  ],
  openGraph: {
    title: 'All Construction & Interior Services — AMS Civil Construction Mumbai',
    description:
      '12 expert construction services under one roof. Bungalows, bathrooms, kitchens, tiles, flooring, POP & more. Free consultation: +91 87793 91690.',
    url: 'https://www.amscivilwork.in/services',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AMS Civil Construction Services Mumbai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Construction Services Mumbai | AMS Civil',
    description: '12 expert construction services. 10+ years experience. Free quote today.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.amscivilwork.in/services',
  },
};

export default function ServicesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'OfferCatalog',
        '@id': 'https://www.amscivilwork.in/services#catalog',
        name: 'Civil Construction & Interior Services in Mumbai',
        description:
          'Comprehensive civil construction and interior services offered by AMS Civil Construction in Mumbai, Navi Mumbai & Thane.',
        provider: {
          '@type': 'LocalBusiness',
          name: 'AMS Civil Construction',
          '@id': 'https://www.amscivilwork.in/#localbusiness',
          url: 'https://www.amscivilwork.in',
          telephone: ['+918779391690', '+919004298911'],
        },
        itemListElement: services.map((svc, index) => ({
          '@type': 'Offer',
          position: index + 1,
          itemOffered: {
            '@type': 'Service',
            name: svc.title,
            description: svc.description,
            url: `https://www.amscivilwork.in/services/${svc.slug}`,
            provider: {
              '@type': 'LocalBusiness',
              name: 'AMS Civil Construction',
              '@id': 'https://www.amscivilwork.in/#localbusiness',
            },
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amscivilwork.in' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.amscivilwork.in/services' },
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
      <ServicesPageContent />
    </>
  );
}
