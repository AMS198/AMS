import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner with AMS Civil | For Architects & Interior Designers Mumbai',
  description:
    'Are you an Architect or Interior Designer in Mumbai? Partner with AMS Civil Construction for flawless execution of your drawings. Reliable, transparent civil contracting with zero delays.',
  keywords: [
    'architect partner civil contractor',
    'interior designer civil contractor Mumbai',
    'turnkey execution partner Mumbai',
    'B2B civil contractor Mumbai',
    'architect civil execution firm',
    'residential contractor for architects',
  ],
  alternates: {
    canonical: 'https://www.amscivilwork.in/partner',
  },
  openGraph: {
    title: 'Partner with AMS Civil | For Architects & Interior Designers',
    description:
      'Partner with Mumbai’s trusted civil contractor for flawless execution of your architectural blueprints.',
    url: 'https://www.amscivilwork.in/partner',
    siteName: 'AMS Civil Construction',
    images: [
      {
        url: 'https://www.amscivilwork.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Architect & Interior Designer Partnership - AMS Civil',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.amscivilwork.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Partner with Us',
        item: 'https://www.amscivilwork.in/partner',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {children}
    </>
  );
}
