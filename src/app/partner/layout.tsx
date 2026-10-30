import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner with AMS Civil | For Builders, Developers & Architects Mumbai',
  description:
    'Are you a Builder, Real Estate Developer, or Architect in Mumbai? Partner with AMS Civil Construction for turnkey civil subcontracting, RCC structural work, masonry & flawless blueprint execution with zero delays.',
  keywords: [
    'civil contractor for builders in Mumbai',
    'subcontractor for real estate developers Mumbai',
    'society redevelopment civil contractor',
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
    title: 'Partner with AMS Civil | For Builders, Developers & Architects',
    description:
      'Partner with Mumbai’s trusted civil contractor for turnkey subcontracting and flawless execution of architectural blueprints.',
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
