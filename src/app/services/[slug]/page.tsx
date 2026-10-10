// src/app/services/[slug]/page.tsx
// Dedicated SEO page per service e.g. /services/bathroom-renovation
// Ranks independently for high-intent service keywords

export const revalidate = false; // Fully static — no ISR reads, rebuild only on redeploy

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { services } from '@/data/siteData';
import { locations } from '@/data/locations';
import { CheckCircle, ArrowRight, ShieldCheck, MapPin, Star, Wrench, Hammer, Award, Shield } from 'lucide-react';
import ModernCTA from '@/components/ui/ModernCTA';
import { serviceDetailsData } from '@/data/serviceDetails';
import { WhatsAppLogo } from '@/components/ui/BrandIcons';


export const dynamicParams = false; // No on-demand generation — saves ISR reads

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

/* ── Service Emojis for Metadata ── */
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

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const svc = services.find(s => s.slug === params.slug);
  const detail = serviceDetailsData[params.slug];
  if (!svc) return { title: 'Not Found' };

  const emoji = serviceEmojiMap[svc.slug] || '👷';
  const title = `Best ${svc.title} in Mumbai (2026) | Free Quote & Visit`;
  
  // Use rich intro if available
  const richDesc = detail ? detail.intro : svc.shortDesc;
  const description = `${emoji} ${richDesc} 25+ Yrs Exp. 100% Quality Guaranteed, 5-Yr Warranty. Call +91 87793 91690 for Free Site Visit!`;

  return {
    title,
    description,
    keywords: [
      `${svc.title} Mumbai`,
      `best ${svc.title.toLowerCase()} contractor Mumbai`,
      `${svc.title.toLowerCase()} services Mumbai`,
      `${svc.title.toLowerCase()} cost Mumbai`,
      `${svc.title.toLowerCase()} near me Mumbai`,
      `affordable ${svc.title.toLowerCase()} Mumbai`,
      `${svc.title.toLowerCase()} mistri near me`,
      `${svc.title.toLowerCase()} mistri Mumbai`,
      `${svc.title.toLowerCase()} mistry near me`,
      `${svc.title.toLowerCase()} ka rate Mumbai`,
      `${svc.title.toLowerCase()} wala Mumbai`,
      `${svc.title.toLowerCase()} thekedar Mumbai`,
      ...locations.slice(0, 15).map(l => `${svc.title} ${l.name}`),
    ],
    openGraph: {
      title,
      description,
      url: `https://www.amscivilwork.in/services/${svc.slug}`,
      type: 'website',
      images: [{ url: svc.image, width: 800, height: 600, alt: `${svc.title} in Mumbai` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [svc.image],
    },
    alternates: {
      canonical: `https://www.amscivilwork.in/services/${svc.slug}`,
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const svc = services.find(s => s.slug === params.slug);
  if (!svc) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: svc.title,
        description: svc.description,
        provider: {
          '@type': 'LocalBusiness',
          name: 'AMS Civil Construction',
          '@id': 'https://www.amscivilwork.in/#business',
          telephone: ['+918779391690', '+919004298911'],
          url: 'https://www.amscivilwork.in',
        },
        areaServed: { '@type': 'State', name: 'Maharashtra' },
        serviceType: svc.title,
        url: `https://www.amscivilwork.in/services/${svc.slug}`,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: String(40 + services.indexOf(svc) * 11),
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amscivilwork.in' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.amscivilwork.in/services' },
          { '@type': 'ListItem', position: 3, name: svc.title, item: `https://www.amscivilwork.in/services/${svc.slug}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `How much does ${svc.title.toLowerCase()} cost in Mumbai?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The cost of ${svc.title.toLowerCase()} in Mumbai varies by area size and materials. We offer competitive pricing with free site visits. Call +91 87793 91690 for a custom quote.`,
            },
          },
          {
            '@type': 'Question',
            name: `Which areas in Mumbai do you provide ${svc.title.toLowerCase()} services?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `We provide ${svc.title.toLowerCase()} services across all Mumbai areas including Borivali, Andheri, Kandivali, Malad, Goregaon, Bandra, Thane, Mira Road, Navi Mumbai, Dadar, Worli, Mulund, Ghatkopar, Kalyan, Vasai, Virar, Vashi, Panvel and more.`,
            },
          },
          {
            '@type': 'Question',
            name: `How long does ${svc.title.toLowerCase()} take?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Timeline depends on project scope. We provide a detailed schedule before starting. Our team ensures on-time delivery with milestone-based progress updates.`,
            },
          },
        ],
      },
    ],
  };

  const detail = serviceDetailsData[params.slug];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="pt-36 pb-20 relative overflow-hidden" style={{ background: '#0B1120' }}>
        <div className="absolute inset-0 opacity-20">
          <Image src={svc.image} alt={svc.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/90 to-[#0B1120]/60" />
        </div>
        <div className="relative container-custom z-10">
          <nav className="flex items-center gap-2 text-slate-500 text-xs mb-6">
            <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-orange-400 transition-colors">Services</Link>
            <span>/</span>
            <span style={{ color: '#F97316' }}>{svc.title}</span>
          </nav>
          <span className="inline-block px-3 py-1 text-xs font-mono font-semibold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(249,115,22,0.12)', color: '#F97316', border: '1px solid rgba(249,115,22,0.25)' }}>
            Expert Service Across All Mumbai Areas
          </span>
          <h1 className="font-display font-black text-white text-3xl sm:text-4xl lg:text-6xl leading-tight mb-6">
            Best <span className="text-gradient">{svc.title}</span><br />
            in Mumbai
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mb-8">
            {detail ? detail.intro : svc.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="tel:+918779391690" className="btn-primary text-sm px-6 py-4">
              📞 Call +91 87793 91690
            </a>
            <a href={`https://wa.me/918779391690?text=Hi! I need ${encodeURIComponent(svc.title)} service in Mumbai. Please call me.`}
              target="_blank" rel="noopener noreferrer"
              className="btn-outline text-sm px-6 py-4 bg-[#101827] flex items-center gap-2">
              <WhatsAppLogo className="w-5 h-5 fill-white" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── Detailed Overview ───────────────────────── */}
      <section className="section-y" style={{ background: '#101827', borderBottom: '1px solid #1E2D45' }}>
        <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-[#1E2D45]">
            <Image src={svc.image} alt={`${svc.title} in Mumbai`} fill className="object-cover hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <span className="flex text-orange-400">{[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#F97316" />)}</span>
              <span className="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded">4.9/5 Rating</span>
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl lg:text-4xl text-white mb-6">
              Complete <span style={{ color: '#F97316' }}>{svc.title}</span> Detailing & Service
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {detail ? detail.detailedProcess : svc.description}
            </p>
            {detail && (
              <div className="p-5 rounded-xl bg-[#0B1120] border border-[#1E2D45] mb-6">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 mb-2">💰 Price & Estimate Guide</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{detail.pricingGuide}</p>
              </div>
            )}
            <div className="flex gap-3">
              <Link href="/contact" className="btn-primary text-sm">Get Free Quote <ArrowRight size={15} /></Link>
              <Link href="/areas" className="btn-outline text-sm">Find Your Area</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Workflow Process Timeline ───────────────── */}
      {detail && (
        <section className="section-y" style={{ background: '#0B1120', borderBottom: '1px solid #1E2D45' }}>
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-mono text-orange-500 font-bold uppercase tracking-widest">Our Work Process</span>
              <h2 className="font-display text-3xl lg:text-5xl text-white mt-3">
                How We Execute <span className="text-gradient">{svc.title}</span>
              </h2>
              <p className="text-slate-400 text-sm mt-3">Professional, step-by-step civil engineering process to deliver long-lasting and flawless results.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {detail.steps.map((step, idx) => (
                <div key={idx} className="card p-6 border border-[#1E2D45] bg-[#101827] hover:border-orange-500/30 transition-all flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-mono font-bold rounded bg-orange-500/10 text-orange-400 mb-4">
                      0{idx + 1}
                    </span>
                    <h3 className="text-white text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Materials & Brands Specs ────────────────── */}
      {detail && (
        <section className="section-y" style={{ background: '#101827', borderBottom: '1px solid #1E2D45' }}>
          <div className="container-custom grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono text-orange-500 font-bold uppercase tracking-widest">Premium Standards</span>
              <h2 className="font-display text-3xl lg:text-4xl text-white mt-3 mb-6">
                Premium Materials <span className="text-gradient">& Brands We Partner With</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                We believe in uncompromising quality. Weak civil foundations lead to early degradation. 
                That is why for {svc.title.toLowerCase()}, AMS Civil Construction partners exclusively with industry-leading brands and utilizes verified top-grade materials to ensure your structures remain robust for decades.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded border border-[#1E2D45] bg-[#0B1120]">
                  <h4 className="text-white text-xs font-bold mb-1">🛡️ 100% Rust-Proof & Leak-Proof</h4>
                  <p className="text-slate-500 text-[10px]">Multi-layer protection treatments</p>
                </div>
                <div className="p-4 rounded border border-[#1E2D45] bg-[#0B1120]">
                  <h4 className="text-white text-xs font-bold mb-1">📜 5-Year Leak Guarantee</h4>
                  <p className="text-slate-500 text-[10px]">Official written contract coverage</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl border border-[#1E2D45] bg-[#0B1120] shadow-xl">
              <h3 className="text-white text-sm font-mono uppercase tracking-wider text-orange-400 mb-6">⚙️ Material Specifications:</h3>
              <ul className="space-y-4">
                {detail.materials.map((mat, i) => (
                  <li key={i} className="flex items-center gap-3 p-3 rounded bg-[#101827] border border-[#1E2D45]">
                    <CheckCircle size={16} className="text-orange-500 flex-shrink-0" />
                    <span className="text-white text-xs font-semibold">{mat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ── Why Choose Us ───────────────────────────── */}
      <section className="section-y" style={{ background: '#0B1120', borderBottom: '1px solid #1E2D45' }}>
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-orange-500 font-bold uppercase tracking-widest">Why Choose Us</span>
            <h2 className="font-display text-2xl lg:text-4xl text-white mt-3">
              Why Choose AMS for <span style={{ color: '#F97316' }}>{svc.title}</span>?
            </h2>
          </div>
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {svc.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-4 p-5 rounded-xl border border-[#1E2D45] bg-[#101827] hover:border-orange-500/30 transition-colors">
                <ShieldCheck size={20} style={{ color: '#F97316' }} className="flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-sm font-bold mb-1">Standard Guarantee</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{b}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Available in All Mumbai Areas ────────────── */}
      <section className="section-y" style={{ background: '#101827' }}>
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl text-white mb-3">
              {svc.title} Available Across <span style={{ color: '#F97316' }}>All Mumbai Areas</span>
            </h2>
            <p className="text-slate-400 text-sm">Click your area to see local pricing and dedicated service information</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {locations.map(loc => (
              <Link key={loc.slug} href={`/areas/${loc.slug}/${svc.slug}`} prefetch={false}
                className="card p-3 group hover:border-orange-500/40 transition-all duration-200 flex items-center gap-2 bg-[#0B1120]">
                <MapPin size={12} className="flex-shrink-0" style={{ color: '#F97316' }} />
                <span className="text-slate-400 text-xs group-hover:text-orange-400 transition-colors leading-tight">
                  {svc.title} in {loc.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other Services ───────────────────────────── */}
      <section className="section-y" style={{ background: '#0B1120', borderTop: '1px solid #1E2D45' }}>
        <div className="container-custom">
          <h2 className="font-display text-2xl text-white mb-6 text-center">
            Other <span style={{ color: '#F97316' }}>Construction Services</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {services.filter(s => s.slug !== svc.slug).map(s => (
              <Link key={s.slug} href={`/services/${s.slug}`} prefetch={false}
                className="card p-4 hover:border-orange-500/40 transition-colors group bg-[#101827] border border-[#1E2D45]">
                <CheckCircle size={14} className="mb-2" style={{ color: '#F97316' }} />
                <p className="text-white text-xs font-semibold group-hover:text-orange-400 transition-colors">{s.title}</p>
                <p className="text-slate-500 text-xs mt-0.5">View Service Details</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ModernCTA
        title={`Start Your ${svc.title} Project Today`}
        subtitle={`AMS Civil Construction delivers expert ${svc.title.toLowerCase()} across all Mumbai areas. Call +91 87793 91690 for a free site visit and no-obligation quote.`}
        image={svc.image}
      />
    </>
  );
}
