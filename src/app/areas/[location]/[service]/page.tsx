// @ts-nocheck
// src/app/areas/[location]/[service]/page.tsx
// Premium Local SEO landing page with UNIQUE content per location×service
// e.g. /areas/borivali/bathroom-renovation

// Pure Static SSG for Top Hubs + On-Demand CDN Caching (0 ISR Reads, 0 Fast Origin Transfer)
export const revalidate = false;
export const dynamicParams = false;

const CORE_LOCATIONS = [
  'bandra','andheri','thane','pune','kurla','dadar','borivali','malad',
  'kandivali','goregaon','vashi','powai','worli','lower-parel','bandra-kurla-complex',
  'andheri-west','andheri-east','bandra-west','borivali-west','malad-west','kandivali-west',
  'ghatkopar','mulund','chembur','santacruz','vile-parle','khar','juhu','bhayandar','mira-road',
  'navi-mumbai','panvel','kharghar','nerul','airoli','kalyan','dombivli',
  // Top Pune High-Value Hubs
  'kothrud','hinjawadi','baner','wakad','viman-nagar','kalyani-nagar','koregaon-park','kharadi',
  'hadapsar','pimpri-chinchwad','aundh','bavdhan','pimple-saudagar','magarpatta'
];

export async function generateStaticParams() {
  const params: Array<{ location: string; service: string }> = [];
  for (const locSlug of CORE_LOCATIONS) {
    for (const svc of services) {
      params.push({ location: locSlug, service: svc.slug });
    }
  }
  return params;
}

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getLocation, locations } from '@/data/locations';
import { services } from '@/data/siteData';
import { generateLocalParagraph, generateWhyChooseUs, generateFAQs, zoneContext, getSeededRandom } from '@/data/localContent';
import { MapPin, CheckCircle, ArrowRight, ShieldCheck, Star, Clock, Sparkles, Navigation } from 'lucide-react';
import { WhatsAppLogo, PhoneLogo } from '@/components/ui/BrandIcons';
import ModernCTA from '@/components/ui/ModernCTA';
import ServiceFAQAccordion from '@/components/services/ServiceFAQAccordion';

/* ── Realistic Service-Specific Emojis for Google CTR ── */
const serviceEmojiMap: Record<string, string> = {
  'bungalow-construction': '🏗️',
  'full-interior-work': '🛋️',
  'swimming-pool-work': '🌊',
  'compound-wall-work': '🧱',
  'building-repair-work': '🛠️',
  'bathroom-renovation': '🛁',
  'tiles-work': '🧱',
  'kitchen-work': '🍽️',
  'flooring-work': '📐',
  'wall-work': '🧱',
  'pop-work': '✨',
  'plaster-work': '🛠️',
  'painting': '🎨',
  'waterproofing': '💧',
};

/* ── SEO Metadata Generation ────────────────────────── */
export async function generateMetadata(
  props: { params: Promise<{ location: string; service: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const loc = getLocation(params.location);
  const svc = services.find(s => s.slug === params.service);
  if (!loc || !svc) return { title: 'Not Found' };

  const exactMatchKeyword = `Top ${svc.title} Contractor in ${loc.name}`;
  
  // High-CTR Optimized Title & Description
  const title = `#1 ${svc.title} in ${loc.name} [2026] | Top Rated | AMS Civil`;
  const description = `⭐ 4.9/5 Rated. Top ${svc.title.toLowerCase()} contractor in ${loc.name}, ${loc.district}. 10+ yrs exp, 100% guaranteed work & transparent pricing. Call +91 87793 91690 for instant site visit!`;

  return {
    title,
    description,
    keywords: [
      `${svc.title} in ${loc.name}`,
      `best ${svc.title} in ${loc.name}`,
      `top ${svc.title.toLowerCase()} contractor ${loc.name}`,
      `${loc.name} mein ${svc.title.toLowerCase()}`,
      `${loc.name} madhye ${svc.title.toLowerCase()} thekedar`,
    ],
    openGraph: {
      title,
      description,
      images: [
        {
          url: `https://www.amscivilwork.in/api/og?title=${encodeURIComponent(`Top ${svc.title} in ${loc.name}`)}&location=${encodeURIComponent(`${loc.name}, ${loc.district}`)}&service=${encodeURIComponent(svc.title)}`,
          width: 1200,
          height: 630,
          alt: exactMatchKeyword,
        }
      ],
      type: 'website',
      url: `https://www.amscivilwork.in/areas/${loc.slug}/${svc.slug}`,
    },
    alternates: {
      canonical: `https://www.amscivilwork.in/areas/${loc.slug}/${svc.slug}`,
    },
  };
}

function getGeoCoordinates(district: string) {
  const coords: Record<string, { lat: string, lon: string }> = {
    'Mumbai City': { lat: '18.9750', lon: '72.8258' },
    'Mumbai Suburban': { lat: '19.1136', lon: '72.8697' },
    'Thane': { lat: '19.2183', lon: '72.9781' },
    'Palghar': { lat: '19.6967', lon: '72.7699' },
    'Pune': { lat: '18.5204', lon: '73.8567' },
    'Nasik': { lat: '20.0110', lon: '73.7903' },
    'Nagpur': { lat: '21.1458', lon: '79.0882' },
  };
  return coords[district] || { lat: '19.0760', lon: '72.8777' }; // Fallback to Mumbai
}

export default async function AreaServicePage(props: { params: Promise<{ location: string; service: string }> }) {
  const params = await props.params;
  const loc = getLocation(params.location);
  const svc = services.find(s => s.slug === params.service);
  
  if (!loc || !svc) notFound();

  // Unused relatedBlogs fetch removed

  const exactMatchKeyword = `${svc.title} in ${loc.name}`;
  const localParagraph = generateLocalParagraph(loc, svc);
  const whyChooseUs = generateWhyChooseUs(loc, svc);
  const faqs = generateFAQs(loc, svc);
  
  // Deterministic seed for layout variations
  const layoutSeed = getSeededRandom(loc.slug + svc.slug + 'layout');
  const zContexts = zoneContext[loc.zone] || ['a growing region'];
  const zoneDesc = zContexts[Math.floor(layoutSeed * zContexts.length)];

  /* JSON-LD Schema (Lightweight, High-SEO) */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `https://www.amscivilwork.in/areas/${loc.slug}/${svc.slug}#business`,
        name: `AMS Civil Construction — ${svc.title} in ${loc.name}`,
        description: localParagraph,
        telephone: ['+918779391690', '+919004298911'],
        image: svc.image,
        url: `https://www.amscivilwork.in/areas/${loc.slug}/${svc.slug}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: loc.name,
          addressRegion: loc.district,
          addressCountry: 'IN',
          ...(loc.pincode ? { postalCode: loc.pincode } : {}),
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: getGeoCoordinates(loc.district).lat,
          longitude: getGeoCoordinates(loc.district).lon,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: (120 + ((loc.name.length * 7) % 50)).toString(),
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amscivilwork.in' },
          { '@type': 'ListItem', position: 2, name: 'Areas', item: 'https://www.amscivilwork.in/areas' },
          { '@type': 'ListItem', position: 3, name: loc.name, item: `https://www.amscivilwork.in/areas/${loc.slug}` },
          { '@type': 'ListItem', position: 4, name: svc.title, item: `https://www.amscivilwork.in/areas/${loc.slug}/${svc.slug}` },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `https://www.amscivilwork.in/areas/${loc.slug}/${svc.slug}#faq`,
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ]
  };

  // Pre-compute shuffled other services for internal linking mesh
  const otherServices = services.filter(s => s.slug !== svc.slug);
  const shuffledServices = [...otherServices];
  for (let i = shuffledServices.length - 1; i > 0; i--) {
    const j = Math.floor(getSeededRandom(loc.slug + svc.slug + i) * (i + 1));
    [shuffledServices[i], shuffledServices[j]] = [shuffledServices[j], shuffledServices[i]];
  }
  const meshServices = shuffledServices.slice(0, 8); // Only link to 8 random ones

  // Generate sections to be re-ordered
  const renderCostGuide = () => {
    const tiers = [
      {
        tier: 'Standard Grade',
        badge: 'Cost-Effective',
        price: '₹150–250',
        unit: 'per sq.ft.',
        desc: `High-durability everyday materials ideal for rental properties and budgeted ${svc.title.toLowerCase()} refreshes in ${loc.name}.`,
        features: [
          'ISI-certified raw materials',
          'Standard branded fittings',
          '1-Year Workmanship Warranty',
          'Supervised milestone inspections',
        ],
        highlight: false,
      },
      {
        tier: 'Premium Grade',
        badge: 'Most Popular',
        price: '₹250–450',
        unit: 'per sq.ft.',
        desc: `Superior aesthetics, branded fittings & structural longevity tailored for modern homes in ${loc.name}.`,
        features: [
          'Top-tier brands (Jaquar, Asian Paints, Saint-Gobain)',
          'Precision laser alignment & 3D mockups',
          '3-Year Extended Warranty',
          'Dedicated senior civil supervisor',
        ],
        highlight: true,
      },
      {
        tier: 'Luxury / Bespoke',
        badge: 'Architectural',
        price: '₹450+',
        unit: 'per sq.ft.',
        desc: `Custom designer finishes, Italian marble/imported fixtures, and bespoke luxury craftsmanship.`,
        features: [
          'Imported & customized premium fixtures',
          'Full architectural CAD drawings',
          '5-Year Comprehensive Warranty',
          'Priority fast-track execution',
        ],
        highlight: false,
      },
    ];

    return (
      <section key="cost" className="section-y bg-[#0B1120] border-t border-white/5 relative overflow-hidden">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-14">
            <div className="section-label mx-auto">Estimated Pricing Guide</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mt-4">
              {svc.title} <span className="text-gradient">Cost in {loc.name}</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Transparent, competitive rates benchmarked against current {loc.district} market standards.
              {layoutSeed > 0.5 ? ` Free laser measurement available near ${loc.landmarks[0] || loc.name}.` : ' Zero hidden fees with milestone-based billing.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {tiers.map((tier, i) => (
              <div
                key={i}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  tier.highlight
                    ? 'bg-gradient-to-b from-[#172338] via-[#0E1726] to-[#0A101D] border-2 border-orange-500/60 shadow-[0_12px_40px_rgba(249,115,22,0.15)] md:-translate-y-2'
                    : 'bg-white/[0.03] border border-white/10 hover:border-orange-500/30 hover:bg-white/[0.05]'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-mono font-bold text-[11px] uppercase tracking-wider shadow-md">
                    {tier.badge}
                  </div>
                )}
                <div>
                  {!tier.highlight && (
                    <span className="text-orange-400/90 text-xs font-mono font-semibold uppercase tracking-wider block mb-2">
                      {tier.badge}
                    </span>
                  )}
                  <h3 className="text-white font-bold text-xl mb-3">{tier.tier}</h3>
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-white font-display text-3xl sm:text-4xl font-black">{tier.price}</span>
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-tight">{tier.unit}</span>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-3 mb-6">
                    {tier.desc}
                  </p>

                  <div className="w-full h-px bg-white/10 mb-6" />

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/918779391690?text=${encodeURIComponent(
                    `Hi AMS Civil, I want to inquire about ${tier.tier} for ${svc.title} in ${loc.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-center transition-all flex items-center justify-center gap-2 ${
                    tier.highlight
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  <WhatsAppLogo className="w-4 h-4 fill-current" />
                  <span>Get {tier.tier.split(' ')[0]} Quote</span>
                </a>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-400 text-xs sm:text-sm">
              * Note: Rates may vary depending on existing site condition, dismantling requirements, and access. Schedule a{' '}
              <a href="tel:+918779391690" className="text-orange-400 font-semibold hover:underline">
                Free Site Inspection
              </a>{' '}
              for a 100% accurate, fixed-price quote.
            </p>
          </div>
        </div>
      </section>
    );
  };

  const renderFAQs = () => (
    <section key="faq" id="faq" className="section-y bg-[#080D1A] border-t border-white/5">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12 sm:mb-16">
          <div className="section-label mx-auto">Frequently Asked Questions</div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mt-4">
            FAQs About <span className="text-gradient">{svc.title}</span> in {loc.name}
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Everything you need to know about pricing, materials, timelines, and booking {svc.title.toLowerCase()} across {loc.name} &amp; {loc.district}.
          </p>
        </div>

        <ServiceFAQAccordion faqs={faqs} serviceTitle={svc.title} locationName={loc.name} />
      </div>
    </section>
  );

  const renderExecution = () => (
    <section key="execution" className="section-y bg-[#0B1120] border-t border-white/5 relative">
      <div className="container-custom max-w-5xl">
        <div className="text-center mb-14">
          <div className="section-label mx-auto">How It Works</div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mt-4">
            Our 3-Step <span className="text-gradient">Project Execution</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            From initial site survey in {loc.name} to certified handover — streamlined, stress-free, and transparent.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {[
            {
              step: '01',
              title: 'Free Site Survey & Measurement',
              tag: 'Day 1 • 100% Free',
              desc: `Our senior civil engineer visits your site in ${loc.name} near ${loc.landmarks[0] || loc.name} to evaluate structural requirements, assess plumbing/electrical lines, and take laser measurements.`,
            },
            {
              step: '02',
              title: 'Fixed BOQ & 3D Planning',
              tag: 'Day 2 • Zero Surprises',
              desc: `Receive a transparent, itemized quotation detailing ISI materials, brand specs, labor costs, and a milestone schedule for your ${svc.title.toLowerCase()} work.`,
            },
            {
              step: '03',
              title: 'Turnkey Execution & Handover',
              tag: 'On-Time Guaranteed',
              desc: `Skilled craftsmen execute with dedicated supervisor oversight, daily WhatsApp photographic updates, final cleaning, and official warranty certificate handover.`,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10 transition-all" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono font-black text-xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all shadow-md">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg sm:text-xl mb-3 group-hover:text-orange-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderLocalContext = () => (
    <section key="localContext" className="section-y bg-[#080D1A] border-t border-white/5">
      <div className="container-custom max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div>
            <div className="section-label">Local Area Coverage</div>
            <h2 className="font-display text-3xl sm:text-4xl text-white mt-4 mb-6">
              Serving <span className="text-gradient">{loc.name}</span> &amp; {loc.district}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Located in {loc.district}, {loc.name} is {zoneDesc}. Our crews have extensive on-site experience working across prominent local landmarks including <strong className="text-white">{loc.landmarks.join(', ')}</strong>. We understand local society permissions, municipal building regulations, and water/structural dynamics specific to {loc.name}.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Navigation className="text-orange-400" size={14} />
                <span>Zone: {loc.zone}</span>
              </span>
              {loc.pincode && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <MapPin className="text-orange-400" size={14} />
                  <span>PIN: {loc.pincode}</span>
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active On-Site Teams</span>
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111928] to-[#0A101D] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2 text-lg">
              <MapPin className="text-orange-400" size={18} /> Active Service Hubs Nearby
            </h3>
            <p className="text-slate-400 text-xs mb-6">
              Our {svc.title.toLowerCase()} supervisors are active in and around {loc.name}:
            </p>
            <div className="flex flex-wrap gap-2">
              {loc.nearby.slice(0, 10).map(near => {
                const nearLoc = getLocation(near);
                if (!nearLoc) return null;
                return (
                  <Link
                    key={near}
                    href={`/areas/${nearLoc.slug}/${svc.slug}`}
                    prefetch={false}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 rounded-xl transition-all flex items-center gap-1.5 group"
                  >
                    <span>{nearLoc.name}</span>
                    <ArrowRight size={11} className="text-slate-500 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Determine section order based on hash
  const dynamicSections = [];
  if (layoutSeed < 0.33) {
    dynamicSections.push(renderLocalContext(), renderCostGuide(), renderExecution(), renderFAQs());
  } else if (layoutSeed < 0.66) {
    dynamicSections.push(renderExecution(), renderCostGuide(), renderLocalContext(), renderFAQs());
  } else {
    dynamicSections.push(renderCostGuide(), renderLocalContext(), renderFAQs(), renderExecution());
  }

  return (
    <main className="min-h-screen bg-[#080D1A]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-16 overflow-x-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image src={svc.image} alt={exactMatchKeyword} fill className="object-cover opacity-20" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080D1A] via-[#080D1A]/90 to-[#080D1A]/60" />
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 container-custom">
          {/* Breadcrumbs */}
          <nav className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs text-slate-400 mb-5 sm:mb-6 animate-fadeIn">
            <Link prefetch={false} href="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <ArrowRight size={10} className="opacity-50" />
            <Link prefetch={false} href="/areas" className="hover:text-orange-400 transition-colors">Areas</Link>
            <ArrowRight size={10} className="opacity-50" />
            <Link prefetch={false} href={`/areas/${loc.slug}`} className="hover:text-orange-400 transition-colors">{loc.name}</Link>
            <ArrowRight size={10} className="opacity-50" />
            <span className="text-orange-400 font-medium">{svc.title}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold uppercase tracking-widest mb-4 animate-fadeUp">
              <Sparkles size={14} /> #1 Rated {svc.title} in {loc.name}
            </div>

            <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-7xl leading-[1.1] mb-5 animate-fadeUp">
              {svc.title} <br />
              Contractor in <span className="text-gradient">{loc.name}</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-3xl mb-8 animate-fadeUp" style={{ animationDelay: '100ms' }}>
              Looking for expert <strong>{svc.title.toLowerCase()} in {loc.name}</strong>?
              AMS Civil Construction provides precision-engineered <Link prefetch={false} href={`/services/${svc.slug}`} className="text-orange-400 font-semibold hover:underline">{svc.title.toLowerCase()}</Link> services across <Link prefetch={false} href={`/areas/${loc.slug}`} className="text-orange-400 font-semibold hover:underline">{loc.name}</Link> and {loc.district}. ISI-grade materials, skilled artisans, and 100% transparent pricing.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 animate-fadeUp" style={{ animationDelay: '200ms' }}>
              <a href="tel:+918779391690" className="btn-primary w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 gap-2.5 shadow-[0_0_25px_rgba(249,115,22,0.35)] justify-center text-sm sm:text-base font-bold">
                <PhoneLogo className="w-4 h-4 sm:w-5 sm:h-5 fill-white" /> Call: +91 87793 91690
              </a>
              <a href={`https://wa.me/918779391690?text=Hi! I need ${encodeURIComponent(svc.title)} work in ${loc.name}. Please share details.`} 
                 target="_blank" rel="noopener noreferrer"
                 className="btn-outline w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 gap-2.5 bg-white/5 hover:bg-white/10 group justify-center text-sm sm:text-base font-bold border-white/20">
                <WhatsAppLogo className="w-4 h-4 sm:w-5 sm:h-5 fill-[#25D366] group-hover:scale-110 transition-transform" /> WhatsApp Inquiry
              </a>
            </div>

            {/* Quick Trust Chips */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-4 border-t border-white/10 text-xs sm:text-sm text-slate-300">
              <span className="flex items-center gap-1.5 font-medium">
                <Star size={15} fill="#F97316" className="text-orange-400" /> 4.9/5 Rating (200+ Reviews)
              </span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck size={16} className="text-orange-400" /> Up to 5-Year Warranty
              </span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle size={15} className="text-emerald-400" /> 100% Free Site Inspection
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Detailed Service Description ── */}
      <section className="section-y bg-[#0B1120]">
        <div className="container-custom grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`relative ${layoutSeed > 0.5 ? "order-2" : "order-1"}`}>
            <div className="aspect-[4/3] sm:aspect-square relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl watermark-container">
              <Image src={svc.image} alt={exactMatchKeyword} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1120] via-transparent to-transparent" />
            </div>
            <div className={`absolute -bottom-4 ${layoutSeed > 0.5 ? '-right-4 sm:-right-6' : '-left-4 sm:-left-6'} p-4 sm:p-5 rounded-2xl bg-[#111827]/95 border border-white/10 backdrop-blur-xl shadow-2xl z-20`}>
              <div className="flex items-center gap-1 mb-1.5">
                 {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="#F97316" className="text-orange-400" />)}
              </div>
              <span className="text-white font-bold text-xs sm:text-sm block">Top Rated in {loc.name}</span>
              <span className="text-slate-400 text-[11px]">200+ Projects Handled</span>
            </div>
          </div>

          <div className={layoutSeed > 0.5 ? "order-1" : "order-2"}>
            <div className="section-label">Service Overview</div>
            <h2 className="font-display text-3xl lg:text-5xl text-white mt-4 mb-6">
              Premium <span className="text-gradient">{svc.title}</span> in {loc.name}
            </h2>
            
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              {localParagraph}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Looking for expert {svc.title.toLowerCase()} in nearby hubs? In addition to {loc.name}, our certified crews deliver turnkey {svc.title.toLowerCase()} across{' '}
              {loc.nearby.slice(0, 4).map((nearSlug, idx) => {
                const nearLoc = getLocation(nearSlug);
                if (!nearLoc) return null;
                const isLast = idx === Math.min(loc.nearby.length, 4) - 1;
                return (
                  <span key={nearSlug}>
                    {idx > 0 && (isLast ? ', and ' : ', ')}
                    <Link prefetch={false} href={`/areas/${nearLoc.slug}/${svc.slug}`} className="text-orange-400 font-medium hover:underline">
                      {nearLoc.name}
                    </Link>
                  </span>
                );
              })}. You can also explore our verified <Link prefetch={false} href={`/areas/${loc.slug}`} className="text-orange-400 font-medium hover:underline">all civil services in {loc.name}</Link> or check our latest <Link prefetch={false} href="/blog" className="text-orange-400 font-medium hover:underline">construction guides &amp; material estimates</Link>.
            </p>

            <div className="grid sm:grid-cols-2 gap-3.5">
              {svc.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors">
                  <CheckCircle className="text-orange-400 flex-shrink-0" size={17} />
                  <span className="text-white text-xs sm:text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ──────────────── */}
      <section className="section-y bg-[#080D1A] border-y border-white/5">
        <div className="container-custom">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="section-label">Why Hire AMS</div>
            <h2 className="font-display text-3xl lg:text-5xl text-white mt-4">
              Why Choose Us for <span className="text-gradient">{svc.title}</span> in {loc.name}?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              We combine decade-long civil engineering rigor with local {loc.district} knowledge to deliver spotless execution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="flex gap-4 p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-orange-500/30 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <ShieldCheck className="text-orange-400 group-hover:text-white transition-colors" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2 group-hover:text-orange-400 transition-colors">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Sections Based on Seed */}
      {dynamicSections}

      {/* ── Cross-Service Internal Links (SEO mesh) ────── */}
      <section className="section-y bg-[#0B1120] border-t border-white/5">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="section-label mx-auto">More Services</div>
            <h2 className="font-display text-2xl lg:text-4xl text-white mt-4">
              Other <span className="text-gradient">Construction Services</span> in {loc.name}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {meshServices.map(otherSvc => (
              <Link key={otherSvc.slug} href={`/areas/${loc.slug}/${otherSvc.slug}`} prefetch={false}
                className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/40 transition-all">
                <CheckCircle size={16} className="text-orange-400 mb-2" />
                <h4 className="text-white text-sm font-bold group-hover:text-orange-400 transition-colors mb-1">{otherSvc.title}</h4>
                <p className="text-slate-500 text-[10px] uppercase tracking-widest">in {loc.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <ModernCTA 
        title={`Ready for high-end ${svc.title.toLowerCase()} in ${loc.name}?`}
        subtitle={`Join 200+ happy families across India. Get your dream space delivered on time.`}
        description={`Our expert teams specialize in ${svc.title.toLowerCase()} specifically in the ${loc.name} area. We understand the unique architectural requirements of ${loc.district} homes and use only ISI-marked materials. Call +91 87793 91690 for a fixed-price quote.`}
        image={svc.image}
      />
    </main>
  );
}
