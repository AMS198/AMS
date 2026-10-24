import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Renovation & Civil Cost Calculator Mumbai (2026 Rates) | AMS Civil',
  description:
    '⭐ [2026 Verified Rates] Calculate accurate home renovation & civil construction costs in Mumbai. Instant estimates for 1BHK, 2BHK, 3BHK, 4BHK & Villas. Claim 100% Free Site Inspection & BOQ!',
  keywords: [
    'mumbai civil renovation cost calculator',
    'civil contractor rates mumbai 2026',
    'home renovation cost calculator mumbai',
    '2bhk renovation cost mumbai',
    '1bhk flat renovation cost mumbai',
    '3bhk luxury civil cost mumbai',
    'bungalow construction cost calculator mumbai',
    'turnkey civil contractor mumbai',
    'bathroom waterproofing cost mumbai',
    'tiling labor rate per sq ft mumbai',
    'pop false ceiling rate per sq ft mumbai',
    'interior painting cost per sq ft mumbai',
    'flat renovation ka kharcha mumbai',
    'best civil contractor in mumbai',
    'ams civil construction calculator',
  ],
  alternates: {
    canonical: 'https://www.amscivilwork.in/calculator',
  },
  openGraph: {
    title: 'Home Renovation & Civil Cost Calculator Mumbai | AMS Civil',
    description:
      'Calculate instant 1BHK, 2BHK, 3BHK and Bungalow renovation costs with 2026 Mumbai civil rates. Free site visit & BOQ!',
    url: 'https://www.amscivilwork.in/calculator',
    siteName: 'AMS Civil Construction',
    images: [
      {
        url: 'https://www.amscivilwork.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Civil Renovation Cost Calculator - AMS Civil Mumbai',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Renovation & Civil Cost Calculator Mumbai | AMS Civil',
    description:
      'Calculate instant 1BHK, 2BHK, 3BHK and Bungalow renovation costs with 2026 Mumbai civil rates. Free site inspection!',
    images: ['https://www.amscivilwork.in/og-image.jpg'],
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webAppLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AMS Civil Construction Cost Calculator',
    url: 'https://www.amscivilwork.in/calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description:
      'Interactive architectural estimator for calculating civil labor and turnkey renovation costs for residential flats and villas across Mumbai, Thane and Navi Mumbai.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    featureList: [
      'Carpet area slider from 250 to 4,000+ sq.ft',
      '1BHK, 2BHK, 3BHK, 4BHK and Villa preset configurations',
      'Trade-specific cost breakdowns for demolition, tiling, waterproofing, plumbing, POP and painting',
      'Pure Civil Labor vs Turnkey (Labor + Materials) comparison',
      'Instant live indicative cost estimation and Free BOQ booking',
    ],
    provider: {
      '@type': 'LocalBusiness',
      name: 'AMS Civil Construction',
      telephone: '+918779391690',
      url: 'https://www.amscivilwork.in',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
    },
  };

  const breadcrumbsLd = {
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
        name: 'Cost Calculator',
        item: 'https://www.amscivilwork.in/calculator',
      },
    ],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is this calculator estimate fixed or indicative?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This estimate provides an indicative starting cost range based on verified Mumbai site averages. The exact final quotation is provided by founder Kedar Mandal following an on-site laser measurement and detailed Bill of Quantities (BOQ).',
        },
      },
      {
        '@type': 'Question',
        name: 'What materials are excluded under the Pure Civil Labor model?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Under the Pure Civil Labor model, basic raw materials (cement, sand, bricks) and finishing materials (tiles, Italian marble, bathroom sanitaryware & CP fittings, paints, switches, modular cabinetry) are purchased by the client at direct dealer prices. AMS Civil provides all skilled manpower, heavy tools, machinery, and daily on-site supervision.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is a Turnkey Civil (Labor + Materials) package also available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! If you prefer a completely hands-off experience, AMS Civil provides a turnkey shell contracting model where Ultratech cement, River sand, Dr. Fixit chemical waterproofing, and branded CPVC piping are completely managed and supplied within our scope.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the charges for a site visit and BOQ measurement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Under our current promotional offer across Mumbai, Thane, and Navi Mumbai, site visits and initial civil consultations are 100% Free. Founder Kedar Mandal personally inspects the premises to deliver a comprehensive line-item cost proposal.',
        },
      },
      {
        '@type': 'Question',
        name: 'What warranty is provided upon completion of civil work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We provide a 1-Year written legal structural warranty on all major civil works and multi-layer chemical waterproofing installations. Any settling hairline cracks or seepage points are inspected and rectified promptly at zero additional cost.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      {children}
    </>
  );
}
