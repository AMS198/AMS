// src/app/about/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About AMS Civil Construction | 10+ Years of Excellence in Mumbai',
  description:
    'Learn about AMS Civil Construction, Mumbai\'s trusted building contractor with 10+ years of excellence. Founded by Kedar Mandal, 200+ projects completed with 98% client satisfaction across Mumbai, Navi Mumbai & Thane. ISI-certified materials, 50+ skilled workers.',
  keywords: [
    'AMS Civil Construction history',
    'Kedar Mandal civil contractor',
    'construction company Mumbai history',
    'trusted building contractor Mumbai',
    'civil construction experts Mumbai',
    'about AMS civil',
    'best builder Mumbai',
    'top rated construction company Mumbai',
  ],
  openGraph: {
    title: 'About AMS Civil Construction — 10+ Years Building Mumbai\'s Homes',
    description:
      '200+ projects, 200+ happy families, 10+ years of trust. Discover why AMS Civil is Mumbai\'s most trusted construction partner.',
    url: 'https://www.amscivilwork.in/about',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'About AMS Civil Construction Mumbai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About AMS Civil Construction Mumbai',
    description: '10+ years building Mumbai\'s homes. 200+ projects completed with 98% client satisfaction.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.amscivilwork.in/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://www.amscivilwork.in/about#webpage',
        url: 'https://www.amscivilwork.in/about',
        name: 'About AMS Civil Construction — 10+ Years of Excellence in Mumbai',
        description:
          "Learn about AMS Civil Construction, Mumbai's trusted building contractor with 10+ years of excellence. Founded by Kedar Mandal, 200+ projects completed with 98% client satisfaction across Mumbai, Navi Mumbai & Thane.",
        mainEntity: {
          '@type': 'LocalBusiness',
          name: 'AMS Civil Construction',
          '@id': 'https://www.amscivilwork.in/#localbusiness',
          url: 'https://www.amscivilwork.in',
          telephone: ['+918779391690', '+919004298911'],
          founder: {
            '@type': 'Person',
            name: 'Kedar Mandal',
            jobTitle: 'Founder & Managing Director',
          },
          foundingDate: '2014',
          numberOfEmployees: {
            '@type': 'QuantitativeValue',
            minValue: 50,
          },
          areaServed: ['Mumbai', 'Navi Mumbai', 'Thane'],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amscivilwork.in' },
          { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://www.amscivilwork.in/about' },
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
      {children}
    </>
  );
}
