// @ts-nocheck
// src/app/areas/[location]/[service]/page.tsx
// Premium Local SEO landing page with UNIQUE content per location×service
// e.g. /areas/borivali/bathroom-renovation

// Dynamic SSR: Renders on demand in milliseconds to completely bypass Vercel Data Cache (0 ISR Reads)
export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getLocation, locations } from '@/data/locations';
import { services } from '@/data/siteData';
import { generateLocalParagraph, generateWhyChooseUs, generateFAQs, zoneContext, getSeededRandom } from '@/data/localContent';
import { MapPin, CheckCircle, ArrowRight, ShieldCheck, Star, Clock, Sparkles, HelpCircle, Navigation } from 'lucide-react';
import { WhatsAppLogo, PhoneLogo } from '@/components/ui/BrandIcons';
import ModernCTA from '@/components/ui/ModernCTA';

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
  const title = `✓ Best ${svc.title} in ${loc.name} [2026] | Top Rated | AMS Civil`;
  const description = `⭐ 4.9/5 Rated. Looking for expert ${svc.title.toLowerCase()} in ${loc.name}, ${loc.district}? Get premium quality, 10+ yrs exp & 100% Guaranteed Work. Book your Site Visit today!`;

  return {
    title,
    description,
    keywords: [
      `${svc.title} in ${loc.name}`,
      `best ${svc.title} in ${loc.name}`,
      `top ${svc.title.toLowerCase()} contractor ${loc.name}`,
      `expert ${svc.title.toLowerCase()} near me`,
      `${svc.title.toLowerCase()} service center ${loc.name}`,
      `affordable ${svc.title.toLowerCase()} work ${loc.name}`,
      `${svc.title.toLowerCase()} specialist ${loc.name}`,
      `${svc.title.toLowerCase()} cost per sq ft in ${loc.name}`,
      /* Hindi/Hinglish keywords */
      `${loc.name} mein ${svc.title.toLowerCase()}`,
      `${svc.title.toLowerCase()} ka rate ${loc.name}`,
      `${svc.title.toLowerCase()} thekedar ${loc.name}`,
      ...loc.nearby.slice(0, 5).map(n => `${svc.title} in ${n}`),
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
    'Nashik': { lat: '20.0110', lon: '73.7903' },
    'Nagpur': { lat: '21.1458', lon: '79.0882' },
    'Ranchi': { lat: '23.3441', lon: '85.3096' },
    'Kolkata': { lat: '22.5726', lon: '88.3639' },
    'Bangalore Urban': { lat: '12.9716', lon: '77.5946' },
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

  /* JSON-LD Schema */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://www.amscivilwork.in/areas/${loc.slug}/${svc.slug}#business`,
    name: `AMS Civil Construction — ${loc.name}`,
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
      reviewCount: String(25 + (locations.indexOf(loc!) * 7 + services.indexOf(svc!) * 3) % 30),
      bestRating: '5',
      worstRating: '1',
    }
  };

  const extraJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `https://www.amscivilwork.in/areas/${loc.slug}/${svc.slug}#faq`,
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      /* Breadcrumb Schema for structure */
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amscivilwork.in' },
          { '@type': 'ListItem', position: 2, name: 'Areas', item: 'https://www.amscivilwork.in/areas' },
          { '@type': 'ListItem', position: 3, name: loc.name, item: `https://www.amscivilwork.in/areas/${loc.slug}` },
          { '@type': 'ListItem', position: 4, name: svc.title, item: `https://www.amscivilwork.in/areas/${loc.slug}/${svc.slug}` },
        ],
      },
      /* HowTo Schema — AI loves step-by-step content */
      {
        '@type': 'HowTo',
        '@id': `https://www.amscivilwork.in/areas/${loc.slug}/${svc.slug}#howto`,
        name: `How to get professional ${svc.title.toLowerCase()} in ${loc.name}`,
        description: `Step-by-step process for ${svc.title.toLowerCase()} by AMS Civil Construction in ${loc.name}, ${loc.district}`,
        totalTime: 'P14D',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'INR',
          value: 'Detailed quotation after site visit',
        },
        step: [
          {
            '@type': 'HowToStep',
            name: 'Free Site Visit & Consultation',
            text: `Our engineer visits your property in ${loc.name} to understand your ${svc.title.toLowerCase()} requirements, take measurements, and plan. (100% Free Diwali Offer till 15 Nov; nominal visit fee applicable post offer, adjustable in bill).`,
            position: 1,
          },
          {
            '@type': 'HowToStep',
            name: 'Transparent Quotation',
            text: `You receive a detailed, itemized quotation for ${svc.title.toLowerCase()} in ${loc.name} with zero hidden costs and exact timelines.`,
            position: 2,
          },
          {
            '@type': 'HowToStep',
            name: 'Expert Execution',
            text: `Our skilled team starts the ${svc.title.toLowerCase()} work in ${loc.name} under senior supervision, keeping you updated at every milestone.`,
            position: 3,
          },
        ],
      },
      /* Service Schema — tells AI exactly what service this page is about */
      {
        '@type': 'Service',
        '@id': `https://www.amscivilwork.in/areas/${loc.slug}/${svc.slug}#service`,
        name: `${svc.title} in ${loc.name}`,
        description: localParagraph,
        provider: { '@id': 'https://www.amscivilwork.in/#business' },
        areaServed: {
          '@type': 'City',
          name: loc.name,
          containedInPlace: { '@type': 'State', name: loc.district },
        },
        serviceType: svc.title,
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'INR',
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'INR',
            eligibleRegion: { '@type': 'Place', name: loc.name },
          },
        },
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
  const renderCostGuide = () => (
    <section key="cost" className="section-y bg-[#0B1120] border-t border-white/5">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-16">
          <div className="section-label mx-auto">Pricing Guide</div>
          <h2 className="font-display text-3xl lg:text-5xl text-white mt-4">
            {svc.title} <span className="text-gradient">Cost in {loc.name}</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Transparent estimates based on local {loc.district} market rates. 
            {layoutSeed > 0.5 ? ` Specifically optimized for properties near ${loc.landmarks[0] || loc.name}.` : ''}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { tier: 'Standard', price: '₹150–250', desc: 'Quality materials for everyday durability.' },
            { tier: 'Premium', price: '₹250–450', desc: 'Branded fittings and superior finishing.' },
            { tier: 'Luxury', price: '₹450+', desc: 'Imported materials and designer aesthetics.' }
          ].map((tier, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center hover:border-orange-500/30 transition-colors group relative flex flex-col">
              <div className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">{tier.tier}</div>
              <div className="text-white font-display text-3xl font-black mb-2">{tier.price}</div>
              <div className="text-slate-500 text-[10px] uppercase tracking-tighter mb-0">Starting per sq.ft.</div>
              <div className="w-8 h-0.5 bg-orange-500/20 mx-auto my-6 group-hover:w-16 transition-all" />
              <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">{tier.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderFAQs = () => (
    <section key="faq" id="faq" className="section-y bg-[#080D1A] border-t border-white/5">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-16">
          <div className="section-label mx-auto">Common Questions</div>
          <h2 className="font-display text-3xl lg:text-5xl text-white mt-4">
            FAQs About <span className="text-gradient">{svc.title}</span> in {loc.name}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/20 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <HelpCircle className="text-orange-400 flex-shrink-0 mt-1" size={20} />
                <h3 className="text-white font-bold text-lg">{faq.q}</h3>
              </div>
              <p className="text-slate-400 leading-relaxed ml-8">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderExecution = () => (
    <section key="execution" className="section-y bg-[#0B1120] border-t border-white/5">
      <div className="container-custom">
        <div className="max-w-3xl mb-16">
          <div className="section-label">How it Works</div>
          <h2 className="font-display text-3xl lg:text-5xl text-white mt-4">
            Our Professional <span className="text-gradient">Execution</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { step: '01', title: 'Consultation', desc: `We visit your site in ${loc.name} to understand your specific needs and take measurements.` },
            { step: '02', title: 'Transparency', desc: `Get a detailed, itemized quote with material specifications and clear timelines for your ${svc.title.toLowerCase()} project.` },
            { step: '03', title: 'Delivery', desc: `Project execution by our skilled ${loc.zone} teams with senior supervision and quality checks at every milestone.` }
          ].map((step, i) => (
            <div key={i} className="relative group">
              <div className="text-[120px] font-display font-black text-white/5 absolute -top-12 -left-4 select-none group-hover:text-orange-500/5 transition-colors">{step.step}</div>
              <div className="relative z-10">
                <h4 className="text-white text-xl font-bold mb-4">{step.title}</h4>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderLocalContext = () => (
    <section key="localContext" className="section-y bg-[#080D1A] border-t border-white/5">
      <div className="container-custom grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="section-label">Local Area Context</div>
          <h2 className="font-display text-3xl text-white mt-4 mb-6">
            Serving <span className="text-orange-400">{loc.name}</span> & Beyond
          </h2>
          <p className="text-slate-400 leading-relaxed mb-6">
            Located in {loc.district}, {loc.name} is {zoneDesc}. We have deep experience working around prominent local landmarks including <strong>{loc.landmarks.join(', ')}</strong>. Our deep understanding of local municipal guidelines ensures your {svc.title.toLowerCase()} project is executed flawlessly.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-300">
             <Navigation className="text-orange-400" size={16} /> 
             {loc.pincode && <span>PIN: {loc.pincode} •</span>} 
             <span>{loc.district}</span>
          </div>
        </div>
        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
           <h3 className="text-white font-bold mb-6 flex items-center gap-2">
             <MapPin className="text-orange-400" /> Active Service Areas Nearby
           </h3>
           <div className="flex flex-wrap gap-2">
             {loc.nearby.slice(0, 8).map(near => {
                const nearLoc = getLocation(near);
                if (!nearLoc) return null;
                return (
                  <Link key={near} href={`/areas/${nearLoc.slug}/${svc.slug}`} prefetch={false}
                    className="px-4 py-2 text-[11px] uppercase font-bold tracking-widest text-slate-400 hover:text-white border border-white/10 hover:border-orange-500/50 rounded-lg transition-all bg-black/20">
                    {nearLoc.name}
                  </Link>
                );
             })}
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(extraJsonLd) }} />

      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-x-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image src={svc.image} alt={exactMatchKeyword} fill className="object-cover opacity-20" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080D1A] via-[#080D1A]/90 to-[#080D1A]/60" />
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 container-custom">
          {/* Breadcrumbs */}
          <nav className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs text-slate-400 mb-8 animate-fadeIn">
            <Link prefetch={false} href="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <ArrowRight size={10} className="opacity-50" />
            <Link prefetch={false} href="/areas" className="hover:text-orange-400 transition-colors">Areas</Link>
            <ArrowRight size={10} className="opacity-50" />
            <Link prefetch={false} href={`/areas/${loc.slug}`} className="hover:text-orange-400 transition-colors">{loc.name}</Link>
            <ArrowRight size={10} className="opacity-50" />
            <span className="text-orange-400 font-medium">{svc.title}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold uppercase tracking-widest mb-6 animate-fadeUp">
              <Sparkles size={14} /> Expert {svc.title} in {loc.name}
            </div>

            <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-7xl leading-[1.1] mb-6 animate-fadeUp">
              {svc.title} <br />
              Contractor in <span className="text-gradient">{loc.name}</span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10 animate-fadeUp" style={{ animationDelay: '100ms' }}>
              Looking for expert <strong>{svc.title.toLowerCase()} in {loc.name}</strong>?
              AMS Civil Construction delivers premium {svc.title.toLowerCase()} services across {loc.district}. {zoneDesc}.
            </p>

            <div className="flex flex-wrap gap-4 animate-fadeUp" style={{ animationDelay: '200ms' }}>
              <a href="tel:+918779391690" className="btn-primary px-8 py-4 gap-3 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                <PhoneLogo className="w-5 h-5 fill-white" /> Get Quote
              </a>
              <a href={`https://wa.me/918779391690?text=Hi! I need ${encodeURIComponent(svc.title)} work in ${loc.name}.`} 
                 target="_blank" rel="noopener noreferrer"
                 className="btn-outline px-8 py-4 gap-3 bg-white/5 group">
                <WhatsAppLogo className="w-5 h-5 fill-[#F97316] group-hover:fill-white transition-colors" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Detailed Service Description ── */}
      <section className="section-y bg-[#0B1120]">
        <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
          <div className={`relative ${layoutSeed > 0.5 ? "order-2" : "order-1"}`}>
            <div className="aspect-square relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl watermark-container">
              <Image src={svc.image} alt={exactMatchKeyword} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1120] via-transparent to-transparent" />
            </div>
            <div className={`absolute -bottom-4 ${layoutSeed > 0.5 ? '-right-4 sm:-right-6' : '-left-4 sm:-left-6'} p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#111827]/90 border border-white/10 backdrop-blur-xl shadow-2xl z-20`}>
              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                 {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="#F97316" className="text-orange-400 sm:w-3.5 sm:h-3.5" />)}
              </div>
              <span className="text-white font-bold text-[10px] sm:text-sm block">Top Rated in {loc.name}</span>
            </div>
          </div>

          <div className={layoutSeed > 0.5 ? "order-1" : "order-2"}>
            <div className="section-label">Service Overview</div>
            <h2 className="font-display text-3xl lg:text-5xl text-white mt-4 mb-6">
              Premium <span className="text-gradient">{svc.title}</span> in {loc.name}
            </h2>
            
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              {localParagraph}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {svc.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors">
                  <CheckCircle className="text-orange-400 flex-shrink-0" size={18} />
                  <span className="text-white text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ──────────────── */}
      <section className="section-y bg-[#080D1A] border-y border-white/5">
        <div className="container-custom">
          <div className="max-w-3xl mb-16">
            <div className="section-label">Why Hire AMS</div>
            <h2 className="font-display text-3xl lg:text-5xl text-white mt-4">
              Why Choose Us for <span className="text-gradient">{svc.title}</span> in {loc.name}?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="text-orange-400" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">{item.title}</h4>
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
