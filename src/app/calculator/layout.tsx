import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Renovation & Construction Cost Calculator | AMS Civil',
  description: '⭐ [2026] Calculate your exact home renovation and bungalow construction cost in Mumbai. Get instant estimates for 1BHK, 2BHK, 3BHK and Villas. Book your site visit!',
  alternates: {
    canonical: 'https://www.amscivilwork.in/calculator',
  },
  openGraph: {
    title: 'Home Renovation & Construction Cost Calculator | AMS Civil',
    description: 'Calculate your exact home renovation and bungalow construction cost in Mumbai. Instant estimates!',
    url: 'https://www.amscivilwork.in/calculator',
    siteName: 'AMS Civil Construction',
    images: [
      {
        url: 'https://www.amscivilwork.in/images/gallery/bungalow2.jpg',
        width: 1200,
        height: 630,
        alt: 'Cost Calculator - AMS Civil',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AMS Civil Construction Cost Calculator',
    url: 'https://www.amscivilwork.in/calculator',
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'All',
    description: 'Interactive calculator for estimating home renovation and civil construction costs in Mumbai, Maharashtra.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'AMS Civil Construction',
      image: 'https://www.amscivilwork.in/logo.png',
      telephone: '+918779391690',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN'
      }
    }
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
