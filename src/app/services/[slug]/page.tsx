// src/app/services/[slug]/page.tsx
// Dedicated SEO & High-Converting Service Detail Page (Next.js 16 Compatible)

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { services } from '@/data/siteData';
import { locations } from '@/data/locations';
import { serviceDetailsData, type ServiceDetail } from '@/data/serviceDetails';
import {
  CheckCircle, ArrowRight, ShieldCheck, MapPin, Star,
  Award, Shield, Clock, Users, ChevronRight, ChevronDown, HelpCircle,
  FileCheck2, Check, Sparkles, Building2
} from 'lucide-react';
import ModernCTA from '@/components/ui/ModernCTA';
import ServiceDetailActions, { FloatingQuickQuoteBar } from '@/components/services/ServiceDetailActions';
import ServiceFAQAccordion from '@/components/services/ServiceFAQAccordion';
import { WhatsAppLogo } from '@/components/ui/BrandIcons';

export const revalidate = false;
export const dynamicParams = true;

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
  'painting-work': '🎨',
  'waterproofing': '💧',
  'modular-kitchen': '🍳',
  'hall-design': '🛋️',
  'bedroom-remodeling': '🛏️',
  'interior-design': '🎨',
  '1bhk-2bhk-renovation': '🏢',
  '3bhk-4bhk-luxury-interiors': '🏰',
  'terrace-renovation': '🏡',
  'simple-kitchen-work': '🍳',
  'gym-renovation': '🏋️',
  'new-gym-construction': '🏋️',
  'office-renovation': '💼',
  'new-office-construction': '🏢',
};

// Generates rich fallback detail if not explicitly listed in serviceDetails.ts
function getServiceDetail(slug: string, svc: typeof services[0]): ServiceDetail {
  if (serviceDetailsData[slug]) {
    return serviceDetailsData[slug];
  }

  return {
    slug,
    intro: `${svc.description} AMS Civil Construction provides turnkey execution across all Mumbai, Thane, and Navi Mumbai areas with over 10+ years of certified craftsmanship.`,
    detailedProcess: `Our ${svc.title.toLowerCase()} process is structured, rigorous, and milestone-tracked. We begin with a complimentary on-site measurement and structural assessment, coordinate all architectural and engineering plans, use certified materials, and execute work with in-house master artisans to ensure lasting durability and immaculate finishing.`,
    steps: [
      {
        title: 'Step 1: Site Inspection & Planning',
        desc: 'Comprehensive on-site measurements, structural checks, load analysis, and preliminary 3D drafting tailored to your space.',
      },
      {
        title: 'Step 2: Surface & Structural Prep',
        desc: 'Precise dismantling or excavation, laser leveling, base reinforcement, and structural alignment.',
      },
      {
        title: 'Step 3: Core Civil Execution',
        desc: 'Application of ISI-grade concrete, masonry, plumbing, electrical conduit fitting, and multi-layer protective coatings.',
      },
      {
        title: 'Step 4: Quality Audit & Handover',
        desc: 'Final architectural alignment inspection, deep cleaning, quality certification, and milestone handover with written warranty.',
      },
    ],
    materials: [
      'UltraTech / ACC 53-Grade Cement',
      'TATA Tiscon / JSW Fe550D Steel',
      'Saint-Gobain & Kajaria Certified Materials',
      'Dr. Fixit Advanced Waterproofing Systems',
    ],
    pricingGuide: `Pricing for ${svc.title.toLowerCase()} is calculated transparently based on site square footage, structural complexity, and chosen material grades. We provide an itemized quote with zero hidden charges.`,
  };
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const svc = services.find((s) => s.slug === params.slug);
  if (!svc) return { title: 'Service Not Found | AMS Civil' };

  const detail = getServiceDetail(params.slug, svc);
  const emoji = serviceEmojiMap[svc.slug] || '👷';
  const title = `Best ${svc.title} in Mumbai [2026] | Top Rated | AMS Civil`;
  const description = `${emoji} ${detail.intro.slice(0, 150)}... 10+ Yrs Exp. 100% Quality Guaranteed, 5-Yr Warranty. Free Site Visit: +91 87793 91690.`;

  return {
    title,
    description,
    keywords: [
      /* English Core Queries */
      `${svc.title} Mumbai`,
      `best ${svc.title.toLowerCase()} contractor Mumbai`,
      `top ${svc.title.toLowerCase()} company Mumbai`,
      `${svc.title.toLowerCase()} services Mumbai`,
      `${svc.title.toLowerCase()} cost per sq ft Mumbai`,
      `${svc.title.toLowerCase()} rates Mumbai`,
      `${svc.title.toLowerCase()} charges in Mumbai`,
      `${svc.title.toLowerCase()} near me Mumbai`,
      `turnkey ${svc.title.toLowerCase()} Mumbai`,
      `licensed civil contractor ${svc.title.toLowerCase()} Mumbai`,
      `with material ${svc.title.toLowerCase()} rate Mumbai`,
      `labour rate ${svc.title.toLowerCase()} Mumbai`,
      `residential ${svc.title.toLowerCase()} Mumbai`,
      `commercial ${svc.title.toLowerCase()} Mumbai`,
      `flat ${svc.title.toLowerCase()} Mumbai`,
      `society ${svc.title.toLowerCase()} Mumbai`,
      `${svc.title.toLowerCase()} contact number Mumbai`,

      /* Hindi / Hinglish Search Intent */
      `Mumbai mein ${svc.title.toLowerCase()}`,
      `Mumbai mein ${svc.title.toLowerCase()} ka thekedar`,
      `Mumbai me ${svc.title.toLowerCase()} ka rate`,
      `${svc.title.toLowerCase()} mistry Mumbai`,
      `${svc.title.toLowerCase()} mistri contact number`,
      `ghar banane wala thekedar Mumbai`,
      `sasta aur achha ${svc.title.toLowerCase()} thekedar`,
      `Mumbai civil mistry`,
      `thekedar number Mumbai`,

      /* Marathi Local Search Queries */
      `Mumbai madhye ${svc.title.toLowerCase()} thekedar`,
      `Mumbai civil thekedar marathi`,
      `ghar bandhani thekedar Mumbai`,

      /* Major Zone Nodes */
      `${svc.title} South Mumbai`,
      `${svc.title} Western Suburbs Mumbai`,
      `${svc.title} Central Line Mumbai`,
      `${svc.title} Thane`,
      `${svc.title} Navi Mumbai`,
      `${svc.title} Pune`,

      ...locations.slice(0, 15).map((l) => `${svc.title} in ${l.name}`),
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

export default async function ServicePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const svc = services.find((s) => s.slug === params.slug);
  if (!svc) notFound();

  const detail = getServiceDetail(params.slug, svc);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: svc.title,
        description: detail.intro,
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
              text: `The cost of ${svc.title.toLowerCase()} in Mumbai is calculated based on site dimensions, structural specifications, and material selections. We offer 100% itemized estimates with zero hidden costs. Call +91 87793 91690 for an on-site visit.`,
            },
          },
          {
            '@type': 'Question',
            name: `What is the warranty on ${svc.title.toLowerCase()}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `AMS Civil Construction provides an official written warranty up to 5 years covering structural integrity and waterproofing, backed by ISI-certified materials.`,
            },
          },
          {
            '@type': 'Question',
            name: `Which areas in Mumbai do you cover for ${svc.title.toLowerCase()}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `We provide ${svc.title.toLowerCase()} across South Mumbai, Western Suburbs, Central Mumbai, Thane, Navi Mumbai, and surrounding regions.`,
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── LUXURY HERO SECTION (No Navbar Overlap) ───────────── */}
      <section className="relative pt-28 sm:pt-32 md:pt-36 pb-16 overflow-hidden bg-[#080D1A] border-b border-white/5">
        {/* Glow ambient orbs */}
        <div 
          className="glow-orb w-[650px] h-[650px] opacity-15"
          style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)', top: '-15%', right: '-10%' }}
        />
        <div 
          className="glow-orb w-[450px] h-[450px] opacity-10"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)', bottom: '-10%', left: '-5%' }}
        />

        <div className="relative container-custom z-10">
          {/* Top Bar: Breadcrumb + Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Link prefetch={false} href="/" className="hover:text-orange-400 transition-colors">Home</Link>
              <ChevronRight size={12} className="text-slate-600" />
              <Link prefetch={false} href="/services" className="hover:text-orange-400 transition-colors">Services</Link>
              <ChevronRight size={12} className="text-slate-600" />
              <span className="text-orange-400 font-semibold">{svc.title}</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] font-mono font-semibold tracking-wider uppercase">
              <Sparkles size={12} className="text-orange-500" />
              Certified Turnkey Civil Engineering • Mumbai
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div>
              <h1 className="font-display font-black text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] mb-6">
                Premium <span className="text-gradient">{svc.title}</span> <br className="hidden sm:inline" />
                in Mumbai
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
                {detail.intro}
              </p>

              {/* 4 Trust Metrics Pills */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <Star size={16} className="text-yellow-400 fill-yellow-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-white">4.9/5 Rating (140+ Reviews)</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <ShieldCheck size={16} className="text-emerald-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-white">Up to 5-Yr Written Warranty</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <Clock size={16} className="text-orange-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-white">Milestone On-Time Handover</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <Award size={16} className="text-blue-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-white">50+ Master Artisans</span>
                </div>
              </div>

              {/* Interactive CTAs */}
              <ServiceDetailActions serviceTitle={svc.title} />
            </div>

            {/* Right Hero Visual Card */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#101827] group">
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-80" />

                {/* Floating Overlay Card */}
                <div className="absolute bottom-5 inset-x-5 p-4 rounded-xl bg-[#0B1120]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-bold">Guaranteed Standard</p>
                    <p className="text-white text-sm font-bold mt-0.5">100% In-House Skilled Team</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-orange-500 text-white text-[11px] font-bold">
                    Zero Middlemen
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STEP-BY-STEP WORKFLOW TIMELINE ──────────────────────── */}
      <section className="py-20 bg-[#0B1120] border-b border-white/5">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="section-label justify-center">Engineering Workflow</div>
            <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
              How We Execute <span className="text-gradient">{svc.title}</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every phase is executed following strict quality parameters, structural standards, and milestone reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {detail.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0E1626] border border-white/10 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center font-mono font-bold text-sm">
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">
                      Phase {idx + 1}
                    </span>
                  </div>
                  <h3 className="text-white text-base font-bold mb-3 group-hover:text-orange-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                  <Check size={14} /> Quality Verified
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VERIFIED MATERIALS & BRAND PARTNERS ─────────────────── */}
      <section className="py-20 bg-[#080D1A] border-b border-white/5">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="section-label">Uncompromising Quality</div>
              <h2 className="font-display text-3xl lg:text-4xl text-white mb-6">
                Premium Materials & <span className="text-gradient">Approved Brands</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Weak civil foundations lead to early cracks and seepage. That is why for every {svc.title.toLowerCase()} project, 
                AMS Civil Construction specifies only ISI-certified, industry-benchmarked brands tested to endure Mumbai’s harsh monsoons.
              </p>

              {/* Guarantees Box */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-[#0B1120] border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center mb-2">
                    <Shield size={18} />
                  </div>
                  <h4 className="text-white text-xs font-bold mb-1">100% Anti-Seepage</h4>
                  <p className="text-slate-500 text-[11px]">Multi-layer membrane treatment</p>
                </div>
                <div className="p-4 rounded-xl bg-[#0B1120] border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
                    <FileCheck2 size={18} />
                  </div>
                  <h4 className="text-white text-xs font-bold mb-1">Official Written Bill</h4>
                  <p className="text-slate-500 text-[11px]">Itemized transparent billing</p>
                </div>
              </div>

              {/* Quick Quote trigger */}
              <FloatingQuickQuoteBar serviceTitle={svc.title} />
            </div>

            {/* Right: Material Checklist */}
            <div className="p-8 rounded-2xl bg-[#0B1120] border border-white/10 shadow-2xl">
              <h3 className="text-white font-mono text-xs uppercase tracking-wider text-orange-400 font-bold mb-6 flex items-center gap-2">
                <Award size={16} /> Verified Specifications for {svc.title}:
              </h3>

              <div className="space-y-3.5 mb-8">
                {detail.materials.map((mat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-xl bg-[#101827] border border-white/5 hover:border-orange-500/30 transition-colors"
                  >
                    <CheckCircle size={18} className="text-orange-500 flex-shrink-0" />
                    <div>
                      <p className="text-white text-xs sm:text-sm font-semibold">{mat}</p>
                      <p className="text-slate-500 text-[11px]">100% Certified Batch Procurement</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing transparency box */}
              <div className="p-5 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <h4 className="text-orange-400 text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
                  💰 Pricing & Cost Estimation Guide
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {detail.pricingGuide}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE AMS FOR THIS SERVICE ─────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#0B1120] border-b border-white/5">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="section-label justify-center">The AMS Advantage</div>
            <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
              Why Homeowners Choose AMS for <span className="text-gradient">{svc.title}</span>
            </h2>
            <p className="text-slate-400 text-sm">
              We eliminate contractor stress with direct engineer supervision, clean job-site protocols, and zero cost escalations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {svc.benefits.map((benefit, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#0E1626] border border-white/10 hover:border-orange-500/30 transition-all flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Standard Guarantee #{i + 1}</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE FAQS ────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#080D1A] border-b border-white/5">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="section-label justify-center">Got Questions?</div>
            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white mb-3">
              Frequently Asked Questions About <span className="text-gradient">{svc.title}</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Clear, transparent answers regarding pricing, project timelines, materials, and warranty.
            </p>
          </div>

          <ServiceFAQAccordion
            serviceTitle={svc.title}
            faqs={[
              {
                q: `How much does ${svc.title.toLowerCase()} cost in Mumbai?`,
                a: `Pricing depends primarily on your property's total square footage, current site conditions, and chosen material tiers. We provide a completely free, itemized on-site inspection and quotation so you know exact numbers upfront with zero surprises.`,
              },
              {
                q: `How long does a typical ${svc.title.toLowerCase()} project take?`,
                a: `Timelines vary by scope: small room renovations take approximately 7–14 days, full floor apartments take 3–6 weeks, and full bungalow construction takes 6–12 months. We commit to a binding milestone schedule in writing before work begins.`,
              },
              {
                q: `Do you provide written guarantees and warranties?`,
                a: `Yes! Every civil and waterproofing project completed by AMS Civil Construction comes with an official warranty up to 5 years covering leakages, structural cracks, and material workmanship.`,
              },
              {
                q: `Do you provide services in my specific area of Mumbai?`,
                a: `Yes, we cover all areas of Mumbai, including South Mumbai (Dadar, Worli, Bandra), Western Suburbs (Andheri, Borivali, Malad, Goregaon), Central Line (Thane, Mulund, Ghatkopar, Kalyan), and Navi Mumbai (Vashi, Panvel, Kharghar).`,
              },
            ]}
          />
        </div>
      </section>

      {/* ── LOCAL COVERAGE HUB ───────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#0B1120] border-b border-white/5">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="section-label justify-center">Local Presence &amp; Coverage</div>
            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white mb-2">
              {svc.title} Execution Across <span className="text-gradient">Mumbai &amp; MMR</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Direct engineering teams stationed across major micro-markets for immediate site inspections and customized quotes.
            </p>
          </div>

          {/* Regional Zone Hub Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-7xl mx-auto mb-8">
            {[
              {
                zone: 'South Mumbai',
                tag: 'Same-Day Visits',
                areas: ['Dadar', 'Worli', 'Prabhadevi', 'Colaba', 'Lower Parel', 'Marine Lines'],
              },
              {
                zone: 'Western Suburbs',
                tag: 'Active Sites',
                areas: ['Bandra', 'Juhu', 'Andheri', 'Goregaon', 'Malad', 'Borivali'],
              },
              {
                zone: 'Central & Thane',
                tag: 'Master Masons',
                areas: ['Thane', 'Mulund', 'Ghatkopar', 'Powai', 'Kurla', 'Chembur'],
              },
              {
                zone: 'Navi Mumbai',
                tag: 'Turnkey Teams',
                areas: ['Vashi', 'Nerul', 'Kharghar', 'Panvel', 'Belapur', 'Airoli'],
              },
              {
                zone: 'Maharashtra & Pan-India',
                tag: 'Regional Hubs',
                areas: ['Pune', 'Hadapsar', 'Nasik', 'Nagpur', 'Ranchi', 'Kolkata'],
              },
            ].map((reg) => (
              <div
                key={reg.zone}
                className="rounded-2xl bg-[#080D1A] border border-white/10 hover:border-orange-500/30 p-4 sm:p-5 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-orange-400 shrink-0" />
                      <h3 className="text-white font-bold text-xs sm:text-sm">{reg.zone}</h3>
                    </div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      {reg.tag}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {reg.areas.map((areaName) => {
                      const locMatch = locations.find((l) => l.name.toLowerCase() === areaName.toLowerCase()) || {
                        slug: areaName.toLowerCase().replace(/\s+/g, '-'),
                        name: areaName,
                      };
                      return (
                        <Link
                          key={locMatch.slug}
                          href={`/areas/${locMatch.slug}/${svc.slug}`}
                          prefetch={false}
                          title={`${svc.title} in ${locMatch.name}`}
                          className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-orange-500/15 hover:border-orange-500/40 text-slate-300 hover:text-white border border-white/5 text-[11px] font-medium transition-all text-center truncate"
                        >
                          {locMatch.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom All Coverage Link */}
          <div className="text-center">
            <Link
              prefetch={false}
              href="/areas"
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 hover:border-orange-500/30 text-xs font-semibold inline-flex items-center gap-2 transition-all"
            >
              <span>Explore All {locations.length}+ Coverage Locations Across Mumbai &amp; India</span>
              <ArrowRight size={13} className="text-orange-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── OTHER RELATED SERVICES ──────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#080D1A]">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="section-label justify-center">Complete Civil Solutions</div>
            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white mb-2">
              Explore Other <span className="text-gradient">Civil &amp; Interior Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services
              .filter((s) => s.slug !== svc.slug)
              .slice(0, 4)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  prefetch={false}
                  className="group bg-[#0B1120] border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-[#161F2E]">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-white text-base font-bold group-hover:text-orange-400 transition-colors mb-2">
                      {s.title}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
                      {s.description}
                    </p>
                    <span className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                      View Service <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ── HIGH-CONVERTING BOTTOM CTA ──────────────────────────── */}
      <ModernCTA
        title={`Start Your ${svc.title} With Mumbai's Top Civil Contractor`}
        subtitle="Schedule a 100% free site inspection with our senior civil engineer. We take precision measurements and provide an itemized quote with zero obligation."
        image={svc.image}
      />
    </>
  );
}
