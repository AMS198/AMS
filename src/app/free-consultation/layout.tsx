// src/app/free-consultation/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Free Consultation & Site Visit | AMS Civil Construction Mumbai',
  description:
    'Schedule a 100% free site inspection, laser measurement & civil estimate in Mumbai. Speak directly with senior civil engineers. Call +91 87793 91690.',
  keywords: [
    'free site visit construction Mumbai',
    'civil engineer consultation',
    'book civil contractor Mumbai',
    'home inspection Mumbai',
    'renovation quote Mumbai',
    'civil mistry site visit Mumbai',
  ],
  alternates: {
    canonical: 'https://www.amscivilwork.in/free-consultation',
  },
  openGraph: {
    title: 'Book Free Site Visit & Consultation | AMS Civil Construction Mumbai',
    description:
      'Schedule a free on-site structural inspection and transparent itemized quote with zero obligation. Serving all Mumbai MMR.',
    url: 'https://www.amscivilwork.in/free-consultation',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Book Free Consultation AMS Civil' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Site Visit & Consultation | AMS Civil Mumbai',
    description: '100% free site visit and competitive quotation with zero hidden fees.',
    images: ['/og-image.jpg'],
  },
};

export default function FreeConsultationLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': 'https://www.amscivilwork.in/free-consultation#webpage',
        url: 'https://www.amscivilwork.in/free-consultation',
        name: 'Book Free Consultation & Site Visit — AMS Civil Construction Mumbai',
        description:
          'Schedule a 100% free site inspection, laser measurement & civil estimate in Mumbai.',
        mainEntity: {
          '@type': 'LocalBusiness',
          name: 'AMS Civil Construction',
          '@id': 'https://www.amscivilwork.in/#localbusiness',
          telephone: ['+918779391690', '+919004298911'],
          url: 'https://www.amscivilwork.in',
          potentialAction: {
            '@type': 'ReserveAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://www.amscivilwork.in/free-consultation',
              inLanguage: 'en-IN',
              actionPlatform: [
                'http://schema.org/DesktopWebPlatform',
                'http://schema.org/MobileWebPlatform',
              ],
            },
            result: {
              '@type': 'Reservation',
              name: 'Book Free On-Site Inspection',
            },
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amscivilwork.in' },
          { '@type': 'ListItem', position: 2, name: 'Free Consultation', item: 'https://www.amscivilwork.in/free-consultation' },
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
