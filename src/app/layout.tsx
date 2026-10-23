// src/app/layout.tsx
// Root layout with comprehensive SEO — targeting all Mumbai areas

import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import TopBanner from '@/components/layout/TopBanner';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import QuotePopup from '@/components/ui/QuotePopup';
import LeadGenPopup from '@/components/ui/LeadGenPopup';
import SocialProofPopup from '@/components/ui/SocialProofPopup';
import FestivalPopup from '@/components/ui/FestivalPopup';
import DPDPConsentBanner from '@/components/ui/DPDPConsentBanner';

import { Toaster } from 'react-hot-toast';
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import SeoHead from '@/components/seo/SeoHead';

/* ─────────────────────────────────────────────────────────────
   SEO METADATA
   Target: All Mumbai areas + every construction service keyword
─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  /* ── Core ────────────────────────────────────────────────── */
  metadataBase: new URL('https://www.amscivilwork.in'),

  title: {
    default: 'AMS Civil Work Mumbai | Top Civil Contractor [2026]',
    template: '%s | AMS Civil Construction',
  },

  description:
    '⭐ 4.9/5 Rated. Looking for the best civil contractor in Mumbai? AMS Civil Construction offers premium bungalow construction, home renovation & interior civil work. 25+ years experience. Call +91 87793 91690!',

  keywords: [
    /* ── Brand ──────────────────────────────────────────── */
    'AMS Civil Construction',
    'AMS construction Mumbai',
    'AMS civil contractor Mumbai',

    /* ── Services ────────────────────────────────────────── */
    'construction company Mumbai',
    'best construction company Mumbai',
    'building contractor Mumbai',
    'civil contractor Mumbai',
    'bungalow construction Mumbai',
    'bungalow builder Mumbai',
    'residential construction Mumbai',
    'bathroom renovation Mumbai',
    'bathroom remodeling Mumbai',
    'kitchen renovation Mumbai',
    'modular kitchen Mumbai',
    'tiles work Mumbai',
    'tiles laying contractor Mumbai',
    'flooring work Mumbai',
    'marble flooring Mumbai',
    'vitrified tiles Mumbai',
    'POP work Mumbai',
    'false ceiling Mumbai',
    'POP ceiling contractor Mumbai',
    'plaster work Mumbai',
    'interior construction Mumbai',
    'interior contractor Mumbai',
    'waterproofing Mumbai',
    'civil work Mumbai',

    /* ── South Mumbai ────────────────────────────────────── */
    'construction company Dadar',
    'construction company Lower Parel',
    'construction company Worli',
    'construction company Prabhadevi',
    'construction company Colaba',
    'construction company Marine Lines',
    'construction company Byculla',
    'construction company Mahalaxmi',
    'bungalow construction South Mumbai',
    'renovation contractor South Mumbai',

    /* ── Western Line ────────────────────────────────────── */
    'construction company Bandra',
    'construction company Khar',
    'construction company Santacruz',
    'construction company Vile Parle',
    'construction company Andheri',
    'construction company Jogeshwari',
    'construction company Goregaon',
    'construction company Malad',
    'construction company Kandivali',
    'construction company Borivali',
    'construction company Dahisar',
    'construction company Mira Road',
    'construction company Bhayandar',
    'construction company Vasai',
    'construction company Nalasopara',
    'construction company Virar',
    'bungalow construction Andheri',
    'kitchen renovation Bandra',
    'bathroom renovation Borivali',
    'tiles work Kandivali',
    'POP work Malad',
    'interior work Goregaon',
    'renovation contractor Mira Road',

    /* ── Central Line ────────────────────────────────────── */
    'construction company Sion',
    'construction company Kurla',
    'construction company Ghatkopar',
    'construction company Vikhroli',
    'construction company Bhandup',
    'construction company Mulund',
    'construction company Thane',
    'construction company Dombivli',
    'construction company Kalyan',
    'bathroom renovation Thane',
    'kitchen work Kalyan',
    'flooring work Ghatkopar',
    'tiles contractor Mulund',
    'construction company Dombivli',

    /* ── Navi Mumbai ─────────────────────────────────────── */
    /* ── Broad Intent ────────────────────────────────────── */
    'best construction company near me',
    'top rated civil contractor in my area',
    'reliable bungalow builders near me',
    'affordable renovation services near me',
    'construction cost per sq ft Mumbai',
    'civil engineer contact number',
    'building contractor contact number',
    'civil mistry near me',
    'civil mistri near me',
    'plaster mistri near me',
    'tiles mistri near me',
    'thekedar for home construction',
    'best civil work team',

    /* ── Hindi/Hinglish Intent (critical for Indian users) ── */
    'ghar banane wala Mumbai',
    'ghar banane ka kharcha Mumbai',
    'mistry ka number Mumbai',
    'civil mistry near me Mumbai',
    'construction ka rate Mumbai',
    'bathroom renovation ka rate Mumbai',
    'tiles lagane wala Mumbai',
    'POP ceiling wala Mumbai',
    'kitchen banane wala Mumbai',
    'thekedar Mumbai contact number',
    'sasta construction company Mumbai',
    'accha builder kaun hai Mumbai',
    'renovation kaise hota hai',
    'construction company ka number',
  ],

  /* ── Authors & Publisher ──────────────────────────────────── */
  authors: [{ name: 'AMS Civil Team', url: 'https://www.amscivilwork.in' }],
  creator: 'AMS Civil Team',
  publisher: 'AMS Civil Construction',

  /* ── Robots ───────────────────────────────────────────────── */
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },

  /* ── Open Graph (Facebook, WhatsApp preview) ──────────────── */
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    alternateLocale: ['hi_IN', 'mr_IN'],
    url: 'https://www.amscivilwork.in',
    siteName: 'AMS Civil Construction',
    title: 'AMS Civil Construction | Best Construction Company in Mumbai',
    description: '25+ years of expert construction across all Mumbai areas. Bungalows, bathrooms, kitchens, tiles, POP, flooring & more. Call: +91 87793 91690 / +91 90042 98911',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt:    'AMS Civil Construction Mumbai',
      },
    ],
  },

  /* ── Twitter / X Card ────────────────────────────────────── */
  twitter: {
    card:        'summary_large_image',
    title:       'AMS Civil Construction Mumbai',
    description: 'Expert construction services across all Mumbai areas. 25+ years experience. Call +91 87793 91690 or +91 90042 98911',
    images:      ['/og-image.jpg'],
  },

  /* ── Alternates / Canonical ──────────────────────────────── */
  alternates: {
    canonical: 'https://www.amscivilwork.in',
    languages: {
      'en-IN': 'https://www.amscivilwork.in',
      'hi-IN': 'https://www.amscivilwork.in/hi',
      'mr-IN': 'https://www.amscivilwork.in/mr',
      'x-default': 'https://www.amscivilwork.in',
    },
  },

  /* ── Verification (add your codes from Google/Bing Search Console) */
  verification: {
    google: 'a-NPUUlhFt4ndck1sIedFhwSQG-oqFwumbqeujTHc-g',
    other: {
      'msvalidate.01': 'ADD_YOUR_BING_CODE_HERE', // Get from bing.com/webmasters
      'p:domain_verify': '24ef3d99f9f608ed1abdd2f62a065345',
    },
  },

  /* ── App / PWA ───────────────────────────────────────────── */
  applicationName: 'AMS Civil Construction',
  category:        'Construction & Real Estate',

  /* ── Icons ────────────────────────────────────────────────── */
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
};

/* ─────────────────────────────────────────────────────────────
   JSON-LD STRUCTURED DATA (Google Rich Results)
 ─────────────────────────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    /* ── Organization (AI Knowledge Graph) ───────────── */
    {
      '@type':       ['LocalBusiness', 'Organization', 'HomeAndConstructionBusiness', 'ProfessionalService'],
      '@id':         'https://www.amscivilwork.in/#business',
      name:          'AMS Civil Construction',
      alternateName: ['AMS Construction', 'AMS Civil', 'AMS Civil Work', 'Mandal Civil Construction'],
      description:   'India\'s trusted civil contractor with 25+ years experience. Premium bungalow construction, bathroom & kitchen renovation, tiles, flooring, POP, plaster, waterproofing, swimming pool, and compound wall work across 90+ cities in Maharashtra, Jharkhand, West Bengal, Karnataka & Goa.',
      url:           'https://www.amscivilwork.in',
      telephone:     ['+918779391690', '+919004298911'],
      email:         'ams.constructionwork@gmail.com',
      founder: {
        '@type': 'Person',
        name:    'Kedar Mandal',
        jobTitle:'Founder & Director',
        telephone:['+918779391690', '+919004298911'],
        worksFor: { '@id': 'https://www.amscivilwork.in/#business' },
      },
      foundingDate: '2001',
      numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 50, maxValue: 100 },
      slogan: 'Building Dreams, Delivering Trust',
      address: {
        '@type':           'PostalAddress',
        addressLocality:   'Mumbai',
        addressRegion:     'Maharashtra',
        addressCountry:    'IN',
        postalCode:        '400001',
      },
      geo: {
        '@type':     'GeoCoordinates',
        latitude:    '19.0760',
        longitude:   '72.8777',
      },
      /* ── ALL 90+ Locations ─────────────────────────── */
      areaServed: [
        /* South Mumbai */
        'Dadar','Lower Parel','Worli','Prabhadevi','Colaba','Fort','Marine Lines','Byculla','Mahalaxmi','Churchgate','Tardeo','Parel','Mahim','Matunga','Grant Road',
        /* Western Line */
        'Bandra','Khar','Santacruz','Vile Parle','Andheri','Juhu','Jogeshwari','Goregaon','Malad','Kandivali','Borivali','Dahisar','Mira Road','Bhayandar','Vasai','Naigaon','Nalasopara','Virar',
        /* Central Line */
        'Sion','Kurla','Ghatkopar','Vikhroli','Powai','Chembur','Bhandup','Mulund','Thane','Dombivli','Kalyan','Ulhasnagar','Ambernath','Badlapur',
        /* Navi Mumbai */
        'Vashi','Nerul','Belapur','Airoli','Ghansoli','Koparkhairane','Kharghar','Panvel','Uran',
        /* Maharashtra */
        'Pune','Hadapsar','Pimpri Chinchwad','Lonavala','Nasik','Nagpur','Aurangabad','Boisar','Igatpuri','Sinnar','Deolali','Wardha','Paithan','Waluj','Kamptee',
        /* Jharkhand */
        'Ranchi','Namkum','Bariatu','Jamshedpur','Sakchi','Dhanbad','Mango','Sindri','Hatia','Adityapur','Jharia',
        /* West Bengal */
        'Kolkata','Asansol','Siliguri','Salt Lake','Howrah','New Town','Durgapur','Raniganj',
        /* Karnataka */
        'Bangalore','Mysore','Davangere','Whitefield','Electronic City','Koramangala','Hunsur','Mandya',
        /* Goa */
        'Panjim','Margao','Vasco','Calangute',
        /* Broad */
        'Mumbai','Navi Mumbai','Maharashtra','India',
      ],
      /* ── AI Knowledge Signals ───────────────────────── */
      knowsAbout: [
        'Civil Construction','Bungalow Construction','Residential Construction','Home Renovation',
        'Bathroom Renovation','Kitchen Remodeling','Tiles Installation','Flooring Work',
        'POP False Ceiling','Plaster Work','Waterproofing','Swimming Pool Construction',
        'Compound Wall Construction','Building Repair','Structural Engineering','RCC Construction',
        'Interior Civil Work','Wall Construction','Painting Services','Construction Cost Estimation',
        'Mumbai Construction','Real Estate Construction India',
      ],
      openingHoursSpecification: [
        {
          '@type':     'OpeningHoursSpecification',
          dayOfWeek:   ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          opens:       '09:00',
          closes:      '19:00',
        },
        {
          '@type':     'OpeningHoursSpecification',
          dayOfWeek:   ['Sunday'],
          opens:       '10:00',
          closes:      '14:00',
        },
      ],
      priceRange:       '₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted:  'Cash, Bank Transfer, UPI',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name:    'Construction & Renovation Services',
        itemListElement: [
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Bungalow Construction',  description:'End-to-end luxury bungalow building from foundation to finishing', areaServed:'India', provider:{'@id':'https://www.amscivilwork.in/#business'} } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Bathroom Renovation',    description:'Complete bathroom remodeling with waterproofing, tiling, and modern fixtures', areaServed:'India', provider:{'@id':'https://www.amscivilwork.in/#business'} } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Kitchen Work',           description:'Modular kitchen construction with countertops, cabinets, and plumbing', areaServed:'India', provider:{'@id':'https://www.amscivilwork.in/#business'} } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Full Interior Work',     description:'Complete interior civil construction including partition, ceiling, electrical, finishing', areaServed:'India', provider:{'@id':'https://www.amscivilwork.in/#business'} } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Tiles Work',             description:'Premium tile installation for walls and floors — vitrified, ceramic, porcelain, mosaic', areaServed:'India', provider:{'@id':'https://www.amscivilwork.in/#business'} } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Flooring Work',          description:'Italian marble, granite, vitrified tile, and wooden flooring installation', areaServed:'India', provider:{'@id':'https://www.amscivilwork.in/#business'} } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'POP Work',               description:'Designer POP false ceilings, cornices, and decorative moldings', areaServed:'India', provider:{'@id':'https://www.amscivilwork.in/#business'} } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Plaster Work',           description:'Internal & external plastering — sand-faced, gypsum, and cement plaster', areaServed:'India', provider:{'@id':'https://www.amscivilwork.in/#business'} } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Wall Work',              description:'Brick masonry, AAC block walls, partition walls, and retaining walls', areaServed:'India', provider:{'@id':'https://www.amscivilwork.in/#business'} } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Painting',               description:'Interior & exterior painting — texture, emulsion, waterproof coats', areaServed:'India', provider:{'@id':'https://www.amscivilwork.in/#business'} } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Waterproofing',          description:'Terrace, bathroom, basement waterproofing with Dr. Fixit & Sika systems', areaServed:'India', provider:{'@id':'https://www.amscivilwork.in/#business'} } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Swimming Pool Work',     description:'Private pool construction — excavation, RCC, waterproofing, filtration', areaServed:'India', provider:{'@id':'https://www.amscivilwork.in/#business'} } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Compound Wall Work',     description:'Boundary wall construction — foundation, RCC columns, brick masonry', areaServed:'India', provider:{'@id':'https://www.amscivilwork.in/#business'} } },
          { '@type':'Offer', itemOffered: { '@type':'Service', name:'Building Repair Work',   description:'Structural repair, crack treatment, and concrete restoration', areaServed:'India', provider:{'@id':'https://www.amscivilwork.in/#business'} } },
        ],
      },
      aggregateRating: {
        '@type':       'AggregateRating',
        ratingValue:   '4.9',
        reviewCount:   '142',
        bestRating:    '5',
        worstRating:   '1',
      },
      sameAs: [
        'https://www.facebook.com/profile.php?id=61570712849063',
        'https://www.instagram.com/amscivilwork/',
        'https://wa.me/918779391690',
        'https://wa.me/919004298911',
      ],
    },

    /* ── Website (with Speakable for voice search) ──── */
    {
      '@type':          'WebSite',
      '@id':            'https://www.amscivilwork.in/#website',
      url:              'https://www.amscivilwork.in',
      name:             'AMS Civil Construction',
      description:      'India\'s trusted construction company — bungalows, renovations, tiles, flooring, POP, waterproofing & more across 90+ cities',
      publisher:        { '@id': 'https://www.amscivilwork.in/#business' },
      inLanguage:       ['en-IN', 'hi-IN', 'mr-IN'],
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.section-label', '.text-gradient'],
      },
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   ROOT LAYOUT
═══════════════════════════════════════════════════════════════ */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        {/* Google Fonts (High performance CDN - bypasses Turbopack font resolver bug) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Adsterra ads are loaded per-component, no global head script needed */}

        {/* Preconnect for Cloudinary images */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* AI Discoverability — llms.txt standard */}
        <link rel="help" href="/llms.txt" type="text/plain" title="LLM Information" />
        <link rel="alternate" href="/llms-full.txt" type="text/plain" title="LLM Full Information" />

        {/* Geo tags for local SEO */}
        <meta name="geo.region"      content="IN-MH" />
        <meta name="geo.placename"   content="Mumbai, Maharashtra, India" />
        <meta name="geo.position"    content="19.0760;72.8777" />
        <meta name="ICBM"            content="19.0760, 72.8777" />
        <meta property="place:name"  content="Mumbai" />

        {/* Mobile / PWA */}
        <meta name="theme-color"     content="#F97316" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Language & Verification */}
        <meta httpEquiv="content-language" content="en-IN" />
        <meta name="p:domain_verify" content="24ef3d99f9f608ed1abdd2f62a065345" />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TD85QNQ7KW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-TD85QNQ7KW');
          `}
        </Script>
      </head>

      <body className="antialiased" style={{ background: '#0B1120', color: '#CBD5E1' }}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-orange-500 focus:text-white focus:rounded-lg">
          Skip to main content
        </a>
        <noscript>
          <div className="bg-orange-500 text-white p-4 text-center">
            For full functionality of this site it is necessary to enable JavaScript. Here are the <a href="https://www.enable-javascript.com/" target="_blank" rel="noopener noreferrer" className="underline">instructions how to enable JavaScript in your web browser</a>.
          </div>
        </noscript>
        <SeoHead />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#161F2E',
              color:      '#CBD5E1',
              border:     '1px solid #F97316',
            },
          }}
        />
        <ConditionalLayout
          topBanner={<TopBanner />}
          navbar={<Navbar />}
          footer={<Footer />}
          floatingElements={
            <>
              <WhatsAppButton />
              <QuotePopup />
              <LeadGenPopup />
              <SocialProofPopup />
              <FestivalPopup />
              <DPDPConsentBanner />
            </>
          }
        >
          <main id="main-content">
            {children}
          </main>
        </ConditionalLayout>
      </body>
    </html>
  );
}
