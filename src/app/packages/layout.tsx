// src/app/packages/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Renovation Packages Mumbai | Civil Labor Rates | AMS Civil',
  description:
    '⭐ [2026] Civil renovation packages in Mumbai. 1BHK ~₹2.5L, 2BHK ~₹4.5L, 3BHK ~₹8L. Indicative civil labor & workmanship rates (materials separate). Book your site inspection!',
  keywords: [
    '1bhk renovation cost Mumbai',
    '2bhk renovation cost Mumbai',
    '3bhk renovation cost Mumbai',
    '4bhk renovation cost Mumbai',
    '1bhk interior cost Mumbai',
    '2bhk complete renovation package',
    'flat renovation cost Mumbai',
    'home renovation package Mumbai',
    'bungalow construction cost Mumbai',
    'terrace home construction cost',
    'renovation cost per sq ft Mumbai',
    'affordable home renovation Mumbai',
    'complete home makeover Mumbai',
    'ghar banane ka kharcha',
    'renovation ka rate',
    'interior ka kharcha kitna aata hai',
    '1bhk flat renovation cost',
    '2bhk flat renovation cost',
    'complete renovation kaise hota hai',
  ],
  alternates: {
    canonical: 'https://www.amscivilwork.in/packages',
  },
  openGraph: {
    title: 'Civil Renovation Packages Mumbai | Labor Workmanship | AMS Civil',
    description:
      'Transparent civil labor packages: 1BHK ~₹2.5L, 2BHK ~₹4.5L, 3BHK ~₹8L (materials separate). Free site inspection!',
    url: 'https://www.amscivilwork.in/packages',
    siteName: 'AMS Civil Construction',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Home Renovation Packages - AMS Civil Construction Mumbai',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Renovation Packages Mumbai | AMS Civil',
    description: '1BHK ₹2.5L, 2BHK ₹4.5L, 3BHK ₹8L. Complete home renovation. Free quote!',
    images: ['/og-image.jpg'],
  },
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'OfferCatalog',
        name: 'Home Renovation & Construction Packages — AMS Civil Construction',
        description:
          'Complete home renovation packages in Mumbai from 1BHK to Bungalows with transparent pricing.',
        provider: {
          '@type': 'LocalBusiness',
          name: 'AMS Civil Construction',
          '@id': 'https://www.amscivilwork.in/#localbusiness',
          telephone: '+918779391690',
          url: 'https://www.amscivilwork.in',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Mumbai',
            addressRegion: 'Maharashtra',
            addressCountry: 'IN',
          },
        },
        itemListElement: [
          {
            '@type': 'Offer',
            name: '1BHK Complete Renovation Package',
            description: 'Complete 1BHK renovation including flooring, kitchen, bathroom, painting & POP work',
            price: '250000',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: '2BHK Complete Renovation Package',
            description: 'Premium 2BHK makeover with modular kitchen, 2 bathrooms, Italian marble & POP ceiling',
            price: '450000',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: '3BHK Luxury Interior Package',
            description: 'Luxury 3BHK interior with Italian marble, designer POP, premium kitchen & smart wiring',
            price: '800000',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            name: '4BHK Ultra Premium Package',
            description: 'Ultra-luxury 4BHK transformation with imported marble, Jaquar fittings & smart home',
            price: '1200000',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amscivilwork.in' },
          { '@type': 'ListItem', position: 2, name: 'Packages', item: 'https://www.amscivilwork.in/packages' },
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
