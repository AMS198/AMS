'use client';

// src/components/seo/LocalBusinessSchema.tsx
import { useEffect, useState } from 'react';

export default function LocalBusinessSchema() {
  const [schema, setSchema] = useState<string>('');

  useEffect(() => {
    const localBusinessLd = {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'ProfessionalService', 'HomeAndConstructionBusiness'],
      '@id': 'https://www.amscivilwork.in/#localbusiness',
      'name': 'AMS Civil Construction',
      'image': 'https://www.amscivilwork.in/og-image.jpg',
      'url': 'https://www.amscivilwork.in',
      'telephone': ['+918779391690', '+919004298911'],
      'email': 'ams.constructionwork@gmail.com',
      'priceRange': '₹₹',
      'description': 'India\'s trusted civil contractor with 25+ years experience. Premium bungalow construction, bathroom & kitchen renovation, tiles, flooring, POP, plaster, waterproofing, and compound wall work.',
      // Replace with actual Google Maps link when verified
      'hasMap': 'https://www.google.com/maps/search/AMS+Civil+Construction/',
      'address': [
        {
          '@type': 'PostalAddress',
          'addressLocality': 'Mumbai',
          'addressRegion': 'Maharashtra',
          'postalCode': '400053',
          'addressCountry': 'IN'
        }
      ],
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 19.1136,
        'longitude': 72.8297
      },
      'areaServed': [
        { '@type': 'City', 'name': 'Mumbai' },
        { '@type': 'City', 'name': 'Navi Mumbai' },
        { '@type': 'City', 'name': 'Thane' },
        { '@type': 'City', 'name': 'Pune' },
        { '@type': 'City', 'name': 'Bangalore' },
        { '@type': 'City', 'name': 'Ranchi' },
        { '@type': 'City', 'name': 'Kolkata' }
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
          'author': { '@type': 'Person', 'name': 'Vikram Mehta' },
          'datePublished': '2026-06-15',
          'reviewBody': 'AMS Civil Construction did an incredible job with our bungalow in Bandra. They were transparent about pricing from day one and finished the work right on schedule.',
          'reviewRating': { '@type': 'Rating', 'ratingValue': '5' }
        },
        {
          '@type': 'Review',
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
          'name': 'Book a Site Visit'
        }
      }
    };

    setSchema(JSON.stringify(localBusinessLd));
  }, []);

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schema }}
    />
  );
}
