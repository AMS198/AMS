// src/components/seo/LocalBusinessSchema.tsx
// Pure SSR Server Component — directly bakes JSON-LD into server HTML for instant crawler indexing

export default function LocalBusinessSchema() {
  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService', 'HomeAndConstructionBusiness'],
    '@id': 'https://www.amscivilwork.in/#localbusiness',
    'name': 'AMS Civil Construction',
    'alternateName': 'AMS Civil Work Mumbai',
    'image': 'https://www.amscivilwork.in/og-image.jpg',
    'logo': 'https://www.amscivilwork.in/logo.png',
    'url': 'https://www.amscivilwork.in',
    'telephone': ['+918779391690', '+919004298911'],
    'email': 'ams.constructionwork@gmail.com',
    'priceRange': '₹₹₹',
    'currenciesAccepted': 'INR',
    'paymentAccepted': 'Cash, Cheque, Bank Transfer, UPI, RTGS, NEFT',
    'founder': {
      '@type': 'Person',
      'name': 'Kedar Mandal',
      'jobTitle': 'Founder & Managing Director',
      'telephone': '+918779391690',
      'sameAs': 'https://www.amscivilwork.in/about'
    },
    'foundingDate': '2014',
    'slogan': 'Building Dreams, Delivering Trust with Zero Hidden Escalations',
    'description': "Mumbai's trusted civil contractor with 10+ years of proven craftsmanship. Premium bungalow construction, complete home renovation, waterproofing, Italian marble tiling, POP false ceilings, plumbing, and structural civil work.",
    'hasMap': 'https://share.google/2FZZD5O5FcpaLjExA',
    'sameAs': [
      'https://share.google/2FZZD5O5FcpaLjExA',
      'https://www.facebook.com/profile.php?id=61570712849063',
      'https://www.instagram.com/amscivilwork/'
    ],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Andheri West',
      'addressLocality': 'Mumbai',
      'addressRegion': 'Maharashtra',
      'postalCode': '400053',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 19.1136,
      'longitude': 72.8297
    },
    'areaServed': [
      { '@type': 'City', 'name': 'Mumbai' },
      { '@type': 'City', 'name': 'Navi Mumbai' },
      { '@type': 'City', 'name': 'Thane' },
      { '@type': 'AdministrativeArea', 'name': 'Bandra' },
      { '@type': 'AdministrativeArea', 'name': 'Andheri' },
      { '@type': 'AdministrativeArea', 'name': 'Borivali' },
      { '@type': 'AdministrativeArea', 'name': 'Worli' },
      { '@type': 'AdministrativeArea', 'name': 'Dadar' },
      { '@type': 'AdministrativeArea', 'name': 'Goregaon' },
      { '@type': 'AdministrativeArea', 'name': 'Powai' },
      { '@type': 'AdministrativeArea', 'name': 'Malad' },
      { '@type': 'AdministrativeArea', 'name': 'Kharghar' },
      { '@type': 'City', 'name': 'Pune' }
    ],
    'knowsAbout': [
      'Civil Construction',
      'Bungalow Construction',
      'Home Renovation',
      'Bathroom Overhaul & Waterproofing',
      'Kitchen Masonry & Platform Fitting',
      'Italian Marble & Vitrified Tile Laying',
      'Saint-Gobain Gypsum POP False Ceiling',
      'Concealed CPVC/PVC Plumbing Pipeline',
      'Wall Scraping, Putty & Emulsion Painting',
      'Electrical Chipping & Conduiting'
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '142',
      'bestRating': '5',
      'worstRating': '1'
    },
    'review': [
      {
        '@type': 'Review',
        'itemReviewed': {
          '@type': 'LocalBusiness',
          'name': 'AMS Civil Construction',
          'image': 'https://www.amscivilwork.in/og-image.jpg',
          'telephone': '+918779391690'
        },
        'author': { '@type': 'Person', 'name': 'Vikram Mehta' },
        'datePublished': '2026-06-15',
        'reviewBody': 'AMS Civil Construction did an incredible job with our bungalow in Bandra. They were transparent about pricing from day one and finished the work right on schedule.',
        'reviewRating': { '@type': 'Rating', 'ratingValue': '5' }
      },
      {
        '@type': 'Review',
        'itemReviewed': {
          '@type': 'LocalBusiness',
          'name': 'AMS Civil Construction',
          'image': 'https://www.amscivilwork.in/og-image.jpg',
          'telephone': '+918779391690'
        },
        'author': { '@type': 'Person', 'name': 'Anjali Desai' },
        'datePublished': '2026-05-20',
        'reviewBody': 'We hired them for a complete flat renovation in Andheri West. Their team is highly professional and handled everything from plumbing to false ceilings.',
        'reviewRating': { '@type': 'Rating', 'ratingValue': '5' }
      }
    ],
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '09:00',
        'closes': '19:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Sunday',
        'opens': '10:00',
        'closes': '14:00'
      }
    ],
    'potentialAction': {
      '@type': 'ReserveAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://www.amscivilwork.in/free-consultation',
        'inLanguage': 'en-IN',
        'actionPlatform': [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      },
      'result': {
        '@type': 'Reservation',
        'name': 'Book a Free Site Visit'
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
    />
  );
}
