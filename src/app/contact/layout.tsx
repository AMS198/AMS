// src/app/contact/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact AMS Civil Construction | Book a Site Visit in Mumbai',
  description:
    'Contact AMS Civil Construction for all your construction and renovation needs in Mumbai. Call +91 87793 91690 or +91 90042 98911 to schedule a Free Site Visit (Diwali Offer till 15 Nov; nominal visit fee applicable post offer, adjustable in bill). Response within 24 hours guaranteed.',
  keywords: [
    'contact civil contractor Mumbai',
    'construction company phone number Mumbai',
    'hire building contractor Mumbai',
    'request site visit construction Mumbai',
    'AMS civil construction address',
    'construction company contact number',
    'builder enquiry Mumbai',
  ],
  openGraph: {
    title: 'Contact AMS Civil Construction — Book a Site Visit Today',
    description:
      'Call +91 87793 91690 or WhatsApp us to book a site visit. AMS Civil Construction serves all Mumbai areas.',
    url: 'https://www.amscivilwork.in/contact',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Contact AMS Civil Construction Mumbai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact AMS Civil Construction Mumbai',
    description: 'Site visit & competitive quote. Call +91 87793 91690 or +91 90042 98911.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.amscivilwork.in/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': 'https://www.amscivilwork.in/contact#webpage',
        url: 'https://www.amscivilwork.in/contact',
        name: 'Contact AMS Civil Construction — Book a Site Visit in Mumbai',
        description:
          'Contact AMS Civil Construction for construction, renovation, and interior civil work in Mumbai. Call +91 87793 91690 to schedule a site visit.',
        mainEntity: {
          '@type': 'LocalBusiness',
          name: 'AMS Civil Construction',
          '@id': 'https://www.amscivilwork.in/#localbusiness',
          telephone: ['+918779391690', '+919004298911'],
          email: 'ams.constructionwork@gmail.com',
          url: 'https://www.amscivilwork.in',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Andheri West',
            addressLocality: 'Mumbai',
            addressRegion: 'Maharashtra',
            postalCode: '400053',
            addressCountry: 'IN',
          },
          contactPoint: [
            {
              '@type': 'ContactPoint',
              telephone: '+918779391690',
              contactType: 'customer service',
              areaServed: 'IN',
              availableLanguage: ['English', 'Hindi', 'Marathi'],
            },
            {
              '@type': 'ContactPoint',
              telephone: '+919004298911',
              contactType: 'technical support',
              areaServed: 'IN',
              availableLanguage: ['English', 'Hindi', 'Marathi'],
            },
          ],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amscivilwork.in' },
          { '@type': 'ListItem', position: 2, name: 'Contact Us', item: 'https://www.amscivilwork.in/contact' },
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
