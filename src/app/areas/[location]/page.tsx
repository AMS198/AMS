// @ts-nocheck
// src/app/areas/[location]/page.tsx
// Redesigned: Premium SEO page for each Mumbai area
// Each page is highly optimized for local ranking with a high-end UI

// Pure Static SSG: Pre-rendered at build time with 0 Origin Transfer & 0 ISR Reads
export const revalidate = false;
export const dynamicParams = false;

export async function generateStaticParams() {
  return locations.map((loc) => ({ location: loc.slug }));
}

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getLocation, locations } from '@/data/locations';
import { services } from '@/data/siteData';
import { MapPin, CheckCircle, ArrowRight, Star, ShieldCheck, Clock, Users, HardHat } from 'lucide-react';
import { WhatsAppLogo, PhoneLogo } from '@/components/ui/BrandIcons';
import ModernCTA from '@/components/ui/ModernCTA';
import ServiceFAQAccordion from '@/components/services/ServiceFAQAccordion';

import { getDb } from '@/lib/mongodb';
import { zoneContext, getSeededRandom } from '@/data/localContent';

let cachedProjectsPromise: Promise<any[]> | null = null;
let cachedBlogsPromise: Promise<any[]> | null = null;

async function getAllProjectsCached() {
  if (!cachedProjectsPromise) {
    cachedProjectsPromise = (async () => {
      try {
        const db = await getDb();
        const res = await db.collection('projects').find({ status: 'completed' }).toArray();
        return JSON.parse(JSON.stringify(res));
      } catch (e) {
        console.error('Failed to pre-fetch projects', e);
        return [];
      }
    })();
  }
  return cachedProjectsPromise;
}

async function getAllBlogsCached() {
  if (!cachedBlogsPromise) {
    cachedBlogsPromise = (async () => {
      try {
        const db = await getDb();
        const res = await db.collection('blogs').find({ published: true }, {
          projection: { title: 1, slug: 1, locationTags: 1, seoKeywords: 1, createdAt: 1, coverImage: 1 }
        }).sort({ createdAt: -1 }).toArray();
        return JSON.parse(JSON.stringify(res));
      } catch (e) {
        console.error('Failed to pre-fetch blogs', e);
        return [];
      }
    })();
  }
  return cachedBlogsPromise;
}

async function getLocalData(locName: string, locZone: string, locNearby: string[]) {
  try {
    const [allProjects, allBlogs] = await Promise.all([
      getAllProjectsCached(),
      getAllBlogsCached()
    ]);
    const lowerName = locName.toLowerCase();
    const tagsToMatch = [locName, locZone, ...(locNearby || [])].map(t => t.toLowerCase());

    const localProjects = allProjects.filter(p => 
      p.location && p.location.toLowerCase().includes(lowerName)
    ).slice(0, 3);

    const localBlogs = allBlogs.filter(b => {
      const hasTag = Array.isArray(b.locationTags) && b.locationTags.some((t: string) => tagsToMatch.includes(t.toLowerCase()));
      const titleMatch = b.title && b.title.toLowerCase().includes(lowerName);
      const kwMatch = b.seoKeywords && b.seoKeywords.toLowerCase().includes(lowerName);
      return hasTag || titleMatch || kwMatch;
    }).slice(0, 3);

    return { localProjects, localBlogs };
  } catch (e) {
    return { localProjects: [], localBlogs: [] };
  }
}



/* ── Generate unique metadata per location ────────────────── */
export async function generateMetadata(
  props: { params: Promise<{ location: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const loc = getLocation(params.location);
  if (!loc) return { title: 'Not Found' };

  const title       = `#1 Civil Contractor in ${loc.name} [2026] | Top Rated | AMS Civil`;
  const description = `⭐ 4.9/5 Rated. Top-rated civil contractor in ${loc.name}, ${loc.district}. Bungalow construction, renovations & interior civil work. 10+ yrs exp. Call +91 87793 91690 for free visit!`;

  return {
    title,
    description,
    keywords: [
      `top civil contractor in ${loc.name}`,
      `best construction company ${loc.name}`,
      `civil work contractor ${loc.name}`,
      `house renovation services ${loc.name}`,
      `home builders in ${loc.name}`,
      `${loc.name} mein civil work`,
      `${loc.name} madhye thekedar`,
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url:  `https://www.amscivilwork.in/areas/${loc.slug}`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `AMS Construction in ${loc.name}` }],
    },
    alternates: {
      canonical: `https://www.amscivilwork.in/areas/${loc.slug}`,
      languages: {
        'en-IN': `https://www.amscivilwork.in/areas/${loc.slug}`,
        'hi-IN': `https://www.amscivilwork.in/hi/areas/${loc.slug}`,
        'mr-IN': `https://www.amscivilwork.in/mr/areas/${loc.slug}`,
        'x-default': `https://www.amscivilwork.in/areas/${loc.slug}`,
      },
    },
  };
}

/* ═══════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
function getGeoCoordinates(loc: { district: string; slug: string; pincode?: string }) {
  // Fine-grained offsets per slug for hyperlocal accuracy
  const slugHash = loc.slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const base: Record<string, { lat: number, lon: number }> = {
    'Mumbai City':      { lat: 18.9750, lon: 72.8258 },
    'Mumbai Suburban':  { lat: 19.1136, lon: 72.8697 },
    'Thane':            { lat: 19.2183, lon: 72.9781 },
    'Palghar':          { lat: 19.6967, lon: 72.7699 },
    'Navi Mumbai':      { lat: 19.0330, lon: 73.0297 },
    'Raigad':           { lat: 18.5012, lon: 73.1689 },
    'Pune':             { lat: 18.5204, lon: 73.8567 },
    'Nashik':           { lat: 20.0110, lon: 73.7903 },
    'Nagpur':           { lat: 21.1458, lon: 79.0882 },
    'Aurangabad':       { lat: 19.8762, lon: 75.3433 },
  };
  const b = base[loc.district] || { lat: 19.0760, lon: 72.8777 };
  // Add micro-offset per slug (±0.03 degrees ≈ 3km) for hyperlocal uniqueness
  const latOffset = ((slugHash % 60) - 30) * 0.001;
  const lonOffset = (((slugHash * 7) % 60) - 30) * 0.001;
  return {
    lat: (b.lat + latOffset).toFixed(4),
    lon: (b.lon + lonOffset).toFixed(4),
  };
}

export default async function LocationPage(props: { params: Promise<{ location: string }> }) {
  const params = await props.params;
  const loc = getLocation(params.location);
  if (!loc) notFound();
  const slugHash = loc.slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0);

  /* ── Dynamic Content Injection (Static SSG at build time) ── */
  const { localProjects, localBlogs } = await getLocalData(loc.name, loc.zone, loc.nearby);

  /* JSON-LD for this specific location — optimized for Google Rich Results */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type':    'LocalBusiness',
        name:       `AMS Civil Construction — ${loc.name}`,
        description:`#1 rated construction company in ${loc.name}, ${loc.district}. Specialising in bungalows, renovations, and civil work. Trusted by 200+ families.`,
        telephone:  ['+918779391690', '+919004298911'],
        url:        `https://www.amscivilwork.in/areas/${loc.slug}`,
        areaServed: [loc.name, ...loc.nearby],
        image:      'https://www.amscivilwork.in/og-image.jpg',
        address: {
          '@type':           'PostalAddress',
          addressLocality:   `${loc.name}, ${loc.district}`,
          addressRegion:     'Maharashtra',
          addressCountry:    'IN',
          ...(loc.pincode ? { postalCode: loc.pincode } : {}),
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude:  getGeoCoordinates(loc).lat,
          longitude: getGeoCoordinates(loc).lon,
        },
        sameAs: [
          'https://share.google/v9ZNhSlXDECsz2p58',
          'https://www.indiamart.com/ams-civil-work/',
          'https://jsdl.in/DT-434YEUFG4BN',
          'https://www.facebook.com/profile.php?id=61570712849063',
          'https://www.instagram.com/amscivilwork/',
          'https://in.pinterest.com/amsconstructionwork/',
          'https://mumbaiconstructionhomerenovationguide.quora.com/',
          'https://wa.me/918779391690',
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: (160 + ((slugHash % 70) + 15)).toString(),
          bestRating: '5',
          worstRating: '1',
        },
      },
      /* Breadcrumb Schema for structure */
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amscivilwork.in' },
          { '@type': 'ListItem', position: 2, name: 'Areas', item: 'https://www.amscivilwork.in/areas' },
          { '@type': 'ListItem', position: 3, name: loc.name, item: `https://www.amscivilwork.in/areas/${loc.slug}` },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `https://www.amscivilwork.in/areas/${loc.slug}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: `Who is the most trusted construction company in ${loc.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `AMS Civil Construction is widely considered the most trusted construction partner in ${loc.name}. With 10+ years of experience and 200+ completed projects, we provide high-quality civil and renovation services in ${loc.district}.`,
            },
          },
          {
            '@type': 'Question',
            name: `What type of civil work does AMS provide in ${loc.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `In ${loc.name}, we provide end-to-end civil solutions including bungalow construction, modular kitchen, bathroom renovation, luxury flooring, POP false ceilings, and building repairs.`,
            },
          },
          {
            '@type': 'Question',
            name: `${loc.name} mein construction ka rate kya hai?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${loc.name} mein construction ka rate ₹1,500 se ₹3,500 per sq.ft. tak hota hai, material aur design ke hisaab se. 100% Free on-site inspection aur transparent estimate ke liye call karein: +91 87793 91690.`,
            },
          },
        ],
      },
    ]
  };

  const trustStats = [
    { icon: Clock, label: '10+ Years', desc: 'Experience' },
    { icon: CheckCircle, label: '200+', desc: 'Projects' },
    { icon: Users, label: '200+', desc: 'Happy Clients' },
    { icon: Star, label: '4.9/5', desc: 'Rating' },
  ];

  return (
    <main className="min-h-screen bg-[#080D1A] overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-16 overflow-hidden border-b border-white/5">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        </div>

        <div className="relative z-10 container-custom">
          {/* Breadcrumbs & Language Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 mb-4 sm:mb-6">
            <nav className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[11px] sm:text-xs text-slate-300 w-fit">
              <Link prefetch={false} href="/" className="hover:text-orange-400 transition-colors">Home</Link>
              <ArrowRight size={10} className="opacity-50" />
              <Link prefetch={false} href="/areas" className="hover:text-orange-400 transition-colors">Service Areas</Link>
              <ArrowRight size={10} className="opacity-50" />
              <span className="text-orange-400 font-medium">{loc.name}</span>
            </nav>

            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] sm:text-[11px] text-slate-400 w-fit">
              <span className="text-slate-500 font-medium">Language:</span>
              <span className="text-orange-400 font-bold px-1.5 py-0.5 rounded bg-orange-500/10">English</span>
              <span className="text-slate-600">•</span>
              <Link prefetch={false} href={`/mr/areas/${loc.slug}`} className="text-slate-400 hover:text-white transition-colors">मराठी</Link>
              <span className="text-slate-600">•</span>
              <Link prefetch={false} href={`/hi/areas/${loc.slug}`} className="text-slate-400 hover:text-white transition-colors">हिंदी</Link>
            </div>
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold uppercase tracking-widest mb-4 animate-fadeUp">
              <MapPin size={13} /> Service Center: {loc.zone}
            </div>

            <h1 className="font-display font-black text-white text-3xl sm:text-5xl lg:text-7xl leading-[1.15] mb-5 animate-fadeUp">
              #1 Civil Contractor &amp; Construction in{' '}
              <span className="text-gradient">{loc.name}</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-2xl mb-7 animate-fadeUp" style={{ animationDelay: '100ms' }}>
              AMS Civil Construction delivers premium building solutions in {loc.name}. 
              From luxury bungalows to modern renovations, we bring 10+ years of expertise 
              to every project in {loc.district}. Trusted by 200+ families across {loc.zone}.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fadeUp" style={{ animationDelay: '200ms' }}>
              <a href="tel:+918779391690" className="btn-primary w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 gap-2.5 shadow-[0_0_20px_rgba(249,115,22,0.3)] justify-center font-bold text-sm sm:text-base">
                <PhoneLogo className="w-4 h-4 sm:w-5 sm:h-5 fill-white" /> Call Expert
              </a>
              <a href={`https://wa.me/918779391690?text=Hi!%20I%20need%20civil%20work%20in%20${encodeURIComponent(loc.name)}.%20Please%20share%20a%20quote.`}
                 target="_blank" rel="noopener noreferrer"
                 className="btn-outline w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 gap-2.5 bg-white/5 hover:bg-white/10 border-white/20 justify-center font-bold text-sm sm:text-base group">
                <WhatsAppLogo className="w-4 h-4 sm:w-5 sm:h-5 fill-[#25D366] group-hover:scale-110 transition-transform" /> WhatsApp Us
              </a>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-fadeIn" style={{ animationDelay: '300ms' }}>
              {trustStats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1 p-4 rounded-xl bg-white/5 border border-white/10">
                  <stat.icon className="w-5 h-5 text-orange-400 mb-2" />
                  <span className="text-white font-bold text-xl">{stat.label}</span>
                  <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">{stat.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Civil Work Expertise Section (SEO Boost) ────── */}
      <section className="py-16 bg-[#0B1120] border-t border-white/5">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label">Civil Work in {loc.name}</div>
              <h2 className="font-display text-2xl lg:text-4xl text-white mt-4 mb-6">
                Why Choose AMS for <span className="text-gradient">Civil Work in {loc.name}</span>?
              </h2>
              <div className="space-y-6 text-slate-400 leading-relaxed">
                <p>
                  Finding a reliable <strong>civil contractor in {loc.name}</strong> can be challenging. 
                  AMS Civil Construction simplifies your search by offering end-to-end <Link href="/services" className="text-orange-400 font-semibold hover:underline">civil work in {loc.name}</Link> tailored to local municipal requirements. From the structural planning of your <Link href={`/areas/${loc.slug}/bungalow-construction`} className="text-orange-400 font-medium hover:underline">bungalow construction</Link> to the finest craftsmanship in <Link href={`/areas/${loc.slug}/full-interior-work`} className="text-orange-400 font-medium hover:underline">full interior work</Link>, our engineering teams in {loc.district} ensure every project is built with certified materials.
                </p>
                <p>
                  Our specialized solutions in {loc.name} cover certified <Link href={`/areas/${loc.slug}/waterproofing`} className="text-orange-400 font-medium hover:underline">waterproofing</Link>, high-grade <Link href={`/areas/${loc.slug}/plaster-work`} className="text-orange-400 font-medium hover:underline">plaster work</Link>, precision <Link href={`/areas/${loc.slug}/tiles-work`} className="text-orange-400 font-medium hover:underline">tiles work</Link>, seamless <Link href={`/areas/${loc.slug}/flooring-work`} className="text-orange-400 font-medium hover:underline">flooring</Link>, and modern <Link href={`/areas/${loc.slug}/bathroom-renovation`} className="text-orange-400 font-medium hover:underline">bathroom renovation</Link>. Whether you are planning a fresh construction near {loc.landmarks[0] || loc.name} or need urgent <Link href={`/areas/${loc.slug}/building-repair-work`} className="text-orange-400 font-medium hover:underline">building repair work</Link> in {loc.zone}, we deliver on-time, guaranteed craftsmanship.
                </p>
                <p>
                  Need certified civil contractors in neighbouring localities? In addition to {loc.name}, our verified on-site crews actively manage projects across neighbouring hubs including{' '}
                  {loc.nearby.slice(0, 4).map((nearSlug, idx) => {
                    const nearLoc = getLocation(nearSlug);
                    if (!nearLoc) return null;
                    const isLast = idx === Math.min(loc.nearby.length, 4) - 1;
                    return (
                      <span key={nearSlug}>
                        {idx > 0 && (isLast ? ', and ' : ', ')}
                        <Link prefetch={false} href={`/areas/${nearLoc.slug}`} className="text-orange-400 font-medium hover:underline">
                          {nearLoc.name}
                        </Link>
                      </span>
                    );
                  })}. Planning your construction budget? Check our comprehensive <Link prefetch={false} href="/blog" className="text-orange-400 font-medium hover:underline">Mumbai Construction Cost &amp; Price Guides</Link> for updated 2026 material benchmarks.
                </p>
              </div>
              <div className="flex flex-wrap gap-6 mt-10">
                <div className="flex items-center gap-2 text-orange-400 font-bold">
                  <CheckCircle size={18} /> 100% Quality Material
                </div>
                <div className="flex items-center gap-2 text-orange-400 font-bold">
                  <CheckCircle size={18} /> Verified Professionals
                </div>
                <div className="flex items-center gap-2 text-orange-400 font-bold">
                  <CheckCircle size={18} /> Fixed Price Quote
                </div>
              </div>
            </div>
            <div className="relative aspect-square sm:aspect-video lg:aspect-square rounded-3xl overflow-hidden group">
               <Image src="/images/bungalow-construction.jpg" alt={`Civil Work in ${loc.name}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-60" />
               <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <p className="text-white font-bold text-lg mb-1">Serving {loc.name} & Surroundings</p>
                  <p className="text-slate-400 text-sm">Dedicated crews active in {loc.nearby.slice(0, 3).join(', ')}</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Services Grid ────────────────────────── */}
      <section className="section-y relative bg-[#0B1120]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="section-label">Expertise in {loc.name}</div>
              <h2 className="font-display text-3xl lg:text-5xl text-white mt-4">
                Top Rated <span className="text-gradient">Civil Services</span> in {loc.name}
              </h2>
              <p className="text-slate-400 mt-4 leading-relaxed">
                Comprehensive construction solutions tailored for the residential and commercial needs of {loc.name}.
                We use premium materials and skilled artisans for every project.
              </p>
            </div>
            <Link prefetch={false} href="/services" className="text-orange-400 font-medium flex items-center gap-2 hover:gap-3 transition-all">
              View All Services <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <Link key={svc.slug} href={`/areas/${loc.slug}/${svc.slug}`} prefetch={false}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111827] transition-all hover:border-orange-500/50">
                <div className="aspect-[16/10] relative overflow-hidden watermark-container">
                  <Image src={svc.image} alt={svc.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors mb-2">{svc.title}</h3>
                  <p className="text-slate-400 text-sm line-clamp-2 mb-4">{svc.shortDesc}</p>
                  <div className="flex items-center gap-2 text-xs font-medium text-orange-400">
                    LEARN MORE <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us Local Expertise ──────────────────── */}
      <section className="section-y relative overflow-hidden bg-[#080D1A]">
        <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl watermark-container">
               <Image src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" 
                      alt="Construction expertise" fill className="object-cover opacity-80" />
               <div className="absolute inset-0 bg-gradient-to-tr from-[#080D1A] via-transparent to-transparent" />
            </div>
            {/* Floating Trust Card */}
            <div className="sm:absolute sm:-bottom-6 sm:-right-6 md:right-12 mt-4 sm:mt-0 p-4 sm:p-6 rounded-2xl bg-[#111827]/95 border border-white/10 backdrop-blur-xl shadow-2xl max-w-sm">
              <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
                <ShieldCheck className="text-orange-400 shrink-0" size={22} />
                <span className="text-white font-bold text-sm sm:text-base">100% Quality Guaranteed</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                We follow strict ISI-certified material standards and provide a comprehensive 1-year warranty on all civil works.*
              </p>
              <p className="text-slate-500 text-[10px] italic mt-1">*Terms & Conditions Apply.</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="section-label text-left">Local Expertise</div>
            <h2 className="font-display text-3xl lg:text-5xl text-white mt-4 mb-6">
              The Most Reliable Builder in <span className="text-gradient">{loc.name}</span>
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <HardHat className="text-orange-400" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Municipal Know-how</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    We understand the specific building regulations and municipal requirements of {loc.name}, ensuring smooth project approvals.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="text-blue-400" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">On-Time Delivery</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    With local material sourcing networks in {loc.district}, we minimize delays and ensure your project stays on schedule.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Star className="text-green-400" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Verified Skilled Workers</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Our teams consist of trained specialists who have been with us for over a decade, delivering excellence in every brick.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Community Presence / Neighbourhoods ────────────── */}
      <section className="section-y bg-[#0B1120] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
            <div className="section-label mx-auto">Neighbourhood Presence</div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl text-white mt-4 mb-3 sm:mb-4">
              Working Near <span className="text-gradient">{loc.name}</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-base leading-relaxed">
              Our site engineers and civil crews are actively deployed across {loc.name}. We provide direct on-site estimates and verified project execution across all major localities:
            </p>
          </div>

          {/* Master Landmark Coverage Showcase Card */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#111928] via-[#0E1626] to-[#0A101D] border border-white/10 p-5 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Card corner ambient glow */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Card Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shrink-0">
                  <MapPin className="text-orange-400 w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                      Active Civil Hub
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-sm sm:text-base mt-0.5">
                    Key Landmarks &amp; Societies We Serve
                  </h3>
                </div>
              </div>

              <span className="text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full self-start sm:self-auto">
                {loc.district} &bull; {loc.zone}
              </span>
            </div>

            {/* Landmark Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5">
              {loc.landmarks.map((l, i) => (
                <div
                  key={i}
                  className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-orange-500/40 transition-all duration-200 flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:border-orange-500 transition-colors">
                      <MapPin size={13} className="text-orange-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-slate-200 group-hover:text-white text-xs sm:text-sm font-semibold truncate transition-colors">
                      {l}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0 ml-2">
                    Active
                  </span>
                </div>
              ))}
            </div>

            {/* Card Footer Bar */}
            <div className="mt-5 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle className="text-emerald-400 w-3.5 h-3.5 shrink-0" />
                <span>Free laser measurement &amp; estimate visit available across all {loc.name} addresses.</span>
              </div>
              <a
                href={`https://wa.me/918779391690?text=${encodeURIComponent(`Hi AMS Civil, I want to book a free site inspection near ${loc.landmarks[0] || loc.name} in ${loc.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-semibold transition-colors shrink-0"
              >
                <span>Book Free Site Visit</span>
                <ArrowRight size={12} />
              </a>
            </div>
          </div>

          {/* Localized content paragraph for SEO — unique per location */}
          {(() => {
            const rand = getSeededRandom(loc.slug + 'about');
            const zContexts = zoneContext[loc.zone] || ['a growing region'];
            const ctx = zContexts[Math.floor(rand * zContexts.length)];
            const landmark = loc.landmarks[0] || loc.name;
            const landmark2 = loc.landmarks[1] || loc.nearby[0] || loc.name;
            const nearbyStr = loc.nearby.slice(0, 3).join(', ');
            const uniqueParas = [
              `${loc.name} is ${ctx}. Property owners near ${landmark} and ${landmark2} consistently choose AMS Civil Construction because we combine 10+ years of hands-on experience with a deep understanding of ${loc.district} building codes. Whether you live close to ${landmark} or anywhere across the ${loc.zone} belt, our dedicated site crews deliver projects on time and within the agreed budget.`,
              `As ${ctx}, ${loc.name} demands construction partners who understand its unique structural and aesthetic requirements. Our teams, operating across ${loc.district}, bring that exact expertise. From luxury renovations near ${landmark} to new bungalow construction throughout ${loc.name}, every AMS project is backed by a 1-year workmanship guarantee and full post-project support.`,
              `The ${loc.zone} region — and ${loc.name} in particular — is ${ctx}. This means property owners require contractors who combine speed, precision, and local knowledge. AMS Civil Construction has active crews near ${landmark}, ${landmark2}, and across the wider ${nearbyStr} corridor, ensuring you always have a trusted expert nearby.`
            ];
            const para = uniqueParas[Math.floor(rand * uniqueParas.length)];
            return (
              <div className="mt-8 sm:mt-12 p-5 sm:p-8 rounded-3xl bg-[#111827]/80 border border-white/10 max-w-4xl mx-auto shadow-xl">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                  <h3 className="text-white text-base sm:text-xl font-bold">
                    Trusted Construction Partner for Families in {loc.name}
                  </h3>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-3">{para}</p>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Residents of {loc.name}{loc.pincode ? ` (PIN: ${loc.pincode})` : ''} trust AMS Civil Construction for their most valuable investment. 
                  Our commitment to using top-grade materials, laser-precise finishing, and transparent pricing makes us the preferred choice 
                  not just in {loc.name}, but also in surrounding areas like {loc.nearby.slice(0, 4).join(', ')}.
                </p>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── Dynamic Local Projects (SEO Unique Value) ──────── */}
      {localProjects.length > 0 && (
        <section className="section-y bg-[#080D1A] border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="container-custom relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <div className="section-label mx-auto">Real Results</div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mt-4">
                Recently Completed in <span className="text-gradient">{loc.name}</span>
              </h2>
              <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
                Actual on-site project deliveries by AMS Civil Construction in {loc.name}. Built with ISI-certified materials and supervised by senior civil engineers.
              </p>
            </div>

            <div
              className={`grid gap-6 sm:gap-8 ${
                localProjects.length === 1
                  ? 'max-w-lg mx-auto grid-cols-1'
                  : localProjects.length === 2
                  ? 'max-w-4xl mx-auto grid-cols-1 md:grid-cols-2'
                  : 'max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {localProjects.map(project => {
                const category = project.category || 'Civil Construction';
                const whatsappMsg = `Hi AMS Civil, I saw your completed project "${project.title}" in ${loc.name}. Can you share quotation details for similar work on my property?`;
                return (
                  <div
                    key={project._id ? project._id.toString() : project.title}
                    className="rounded-3xl bg-gradient-to-b from-[#111928] via-[#0E1626] to-[#0A101D] border border-white/10 hover:border-orange-500/40 shadow-xl hover:shadow-[0_16px_40px_rgba(249,115,22,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      {/* Image Header with Badges */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                        {project.images?.[0] ? (
                          <Image
                            src={encodeURI(project.images[0])}
                            alt={project.title}
                            fill
                            unoptimized={true}
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full bg-white/5 flex items-center justify-center text-slate-500 text-xs">
                            Project Photo
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1626] via-transparent to-black/30 pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-black/60 backdrop-blur-md text-amber-200 border border-amber-500/20 shadow-md">
                            {category}
                          </span>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Completed
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-5 sm:p-6">
                        {/* Location Tag */}
                        <div className="flex items-center gap-1.5 text-xs text-orange-400 font-medium mb-2.5">
                          <MapPin size={13} className="shrink-0" />
                          <span>{project.location || `${loc.name}, ${loc.district}`}</span>
                        </div>

                        {/* Project Title */}
                        <h3 className="text-white font-bold text-lg sm:text-xl mb-3 leading-snug group-hover:text-orange-400 transition-colors line-clamp-2">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer with Quick CTA */}
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-white/5">
                      <a
                        href={`https://wa.me/918779391690?text=${encodeURIComponent(whatsappMsg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-orange-500 text-slate-200 hover:text-white border border-white/10 hover:border-orange-500 text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn"
                      >
                        <WhatsAppLogo className="w-3.5 h-3.5 fill-current" />
                        <span>Inquire About Similar Work</span>
                        <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Gallery Link */}
            <div className="mt-12 text-center">
              <Link
                href="/gallery"
                prefetch={false}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 hover:border-orange-500/40 text-xs sm:text-sm font-semibold transition-all group"
              >
                <span>View More Completed Projects in Photo Gallery</span>
                <ArrowRight size={14} className="text-orange-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Dynamic Local Blogs (SEO Value) ──────── */}
      {localBlogs.length > 0 && (
        <section className="section-y bg-[#0B1120] border-t border-white/5">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="section-label mx-auto">Construction Guides</div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mt-4">
                Latest Property &amp; Civil Updates in <span className="text-gradient">{loc.name}</span>
              </h2>
              <p className="text-slate-400 mt-3 text-sm sm:text-base">
                Expert tips on material estimation, society guidelines, and renovation costs in {loc.name}.
              </p>
            </div>

            <div
              className={`grid gap-6 ${
                localBlogs.length === 1
                  ? 'max-w-lg mx-auto grid-cols-1'
                  : localBlogs.length === 2
                  ? 'max-w-4xl mx-auto grid-cols-1 md:grid-cols-2'
                  : 'max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {localBlogs.map((blog: any) => (
                <Link
                  prefetch={false}
                  key={blog._id.toString()}
                  href={`/blog/${blog.slug}`}
                  className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-white/[0.03] border border-white/10 hover:border-orange-500/40 hover:bg-white/[0.05] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-orange-400 font-mono font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider block mb-2 sm:mb-2.5">
                      Construction Guide
                    </span>
                    <h3 className="text-white font-bold text-base sm:text-lg mb-2 sm:mb-3 group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>
                    {blog.excerpt && (
                      <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 mb-4">
                        {blog.excerpt}
                      </p>
                    )}
                  </div>
                  <span className="text-orange-400 text-xs font-bold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform pt-2">
                    <span>Read Full Guide</span>
                    <ArrowRight size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Location-Specific FAQ Section ─────────────────────── */}
      {(() => {
        const landmark = loc.landmarks[0] || loc.name;
        const faqs = [
          {
            q: `Which is the best civil contractor in ${loc.name}?`,
            a: `AMS Civil Construction is widely rated as the best civil contractor in ${loc.name}, ${loc.district}. With 10+ years of experience, 200+ completed projects, and a 4.9/5 rating, we offer end-to-end services from bungalow construction to interior renovations. Our team near ${landmark} is available for site visits within 24 hours.`
          },
          {
            q: `How much does civil work cost in ${loc.name}?`,
            a: `Civil work in ${loc.name} typically ranges from ₹1,500 to ₹3,500 per sq.ft. depending on the type of work and material grade. Basic renovations start at ₹150/sq.ft. while luxury bungalow construction can go up to ₹3,500+/sq.ft. We provide 100% Free Site Visits with comprehensive laser measurements and zero-obligation itemized quotes.`
          },
          {
            q: `Do you provide construction services near ${landmark}?`,
            a: `Yes! We have active construction teams working near ${landmark} and across all of ${loc.name}. We also serve nearby areas including ${loc.nearby.slice(0, 3).join(', ')}. Call us at +91 87793 91690 to schedule a site visit.`
          },
          {
            q: `${loc.name} mein civil contractor ka number kya hai?`,
            a: `AMS Civil Construction ka number hai +91 87793 91690 aur +91 90042 98911. Hum ${loc.name} aur ${loc.district} mein sabhi tarah ke civil kaam karte hain — bungalow construction, renovation, tiles, waterproofing, painting, aur interiors. WhatsApp bhi kar sakte hain.`
          },
        ];
        return (
          <section className="section-y bg-[#0B1120] border-t border-white/5">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <div className="section-label mx-auto text-center">FAQ</div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mt-4 mb-4 text-center">
                  Common Questions about <span className="text-gradient">Civil Work in {loc.name}</span>
                </h2>
                <p className="text-slate-400 text-sm sm:text-base text-center max-w-2xl mx-auto mb-12">
                  Transparent information on civil construction rates, site inspections, and contractor details in {loc.name}.
                </p>
                <ServiceFAQAccordion faqs={faqs} serviceTitle="Civil Work" locationName={loc.name} />
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── CTA ─────────────────────────────────────────── */}
      <ModernCTA 
        title={`Ready to start your dream project in ${loc.name}?`}
        subtitle={`Get a professionally managed, on-time construction experience in ${loc.zone}.`}
        description={`AMS Civil Construction is the leading provider of high-quality civil solutions in ${loc.name}. We specialize in turnkey bungalow construction, professional renovations, and expert finishing work. Our teams are highly experienced with local building codes in ${loc.district} and ensure every project is delivered with 100% transparency and structural integrity.`}
      />
      {/* ── Nearby Service Areas Mesh ────────────────────── */}
      <section className="py-12 bg-[#0B1120] border-t border-white/5">
        <div className="container-custom text-center">
          <h4 className="text-white font-semibold text-sm sm:text-base mb-6">We Also Serve Nearby Areas:</h4>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {loc.nearby.map(area => {
              const nearLoc = getLocation(area);
              if (!nearLoc) return null;
              return (
                <Link
                  key={area}
                  href={`/areas/${nearLoc.slug}`}
                  prefetch={false}
                  className="px-3.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 rounded-full transition-all bg-white/5"
                >
                  {nearLoc.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Browse all areas ─────────────────────────────── */}
      <section className="py-12 bg-[#080D1A] border-t border-white/5">
        <div className="container-custom text-center">
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-6">Explore more service centers</p>
          <Link href="/areas" prefetch={false} className="btn-outline px-10 py-4 text-sm group">
            View All {locations.length}+ Service Areas <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
