// src/components/seo/StructuredDataManager.tsx
// Centralized manager for AEO (Answer Engine Optimization) JSON-LD schemas
// Synchronous rendering ensures scripts are baked directly into server HTML for crawlers

type SchemaType = 'FAQPage' | 'HowTo' | 'Service' | 'BreadcrumbList' | 'Review';

interface StructuredDataManagerProps {
  type: SchemaType;
  data: any;
}

export default function StructuredDataManager({ type, data }: StructuredDataManagerProps) {
  if (!data) return null;

  let schemaObj: any = { '@context': 'https://schema.org' };

  switch (type) {
    case 'FAQPage':
      schemaObj = {
        ...schemaObj,
        '@type': 'FAQPage',
        mainEntity: data.map((faq: any) => ({
          '@type': 'Question',
          name: faq.question || faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer || faq.a,
          },
        })),
      };
      break;

    case 'BreadcrumbList':
      schemaObj = {
        ...schemaObj,
        '@type': 'BreadcrumbList',
        itemListElement: data.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };
      break;

    case 'Service':
      schemaObj = {
        ...schemaObj,
        '@type': 'Service',
        name: data.title || data.name,
        description: data.description,
        provider: {
          '@type': 'LocalBusiness',
          name: 'AMS Civil Construction',
          telephone: '+918779391690',
          url: 'https://www.amscivilwork.in',
        },
        areaServed: {
          '@type': 'State',
          name: 'Maharashtra',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Construction Services',
          itemListElement: data.benefits?.map((benefit: string) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: benefit,
            },
          })),
        },
      };
      break;

    case 'Review':
      schemaObj = {
        ...schemaObj,
        '@type': 'Review',
        author: { '@type': 'Person', name: data.author },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: data.rating,
          bestRating: '5',
        },
        reviewBody: data.text || data.reviewBody,
        publisher: {
          '@type': 'Organization',
          name: 'Google',
        },
      };
      break;

    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObj) }}
    />
  );
}
