'use client';
// src/components/home/HomePageSections.tsx
// All interactive home page sub-components.
// Receives gallery + projects as props from the SSG server component in page.tsx.

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, Star, CheckCircle, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight,
  Home, Bath, Grid3X3, ChefHat, Layers, Paintbrush, Sparkles, Wrench,
  Shield, ShieldCheck, Clock, Award, Users, MapPin,
  Waves, LayoutTemplate, Fence, Hammer, Calculator, Phone, Check, X,
  Building2, BadgeCheck, HardHat, FileText, Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { services, stats, testimonials, faqs } from '@/data/siteData';
import { openQuotePopup } from '@/components/ui/QuotePopup';
import CountUp from '@/components/ui/CountUp';
import ModernCTA from '@/components/ui/ModernCTA';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import GoogleReviewsWidget from '@/components/ui/GoogleReviewsWidget';
import SocialProofStrip from '@/components/ui/SocialProofStrip';
import GalleryCarouselSection from '@/components/ui/GalleryCarousel';
import type { GalleryItem } from '@/components/ui/GalleryCarousel';
import { WhatsAppLogo } from '@/components/ui/BrandIcons';

export interface ProjectType {
  id: string; title: string; category: string; location: string;
  status: 'ongoing' | 'completed'; description: string; images: string[];
  completedDate?: string;
}

const iconMap: Record<string, React.ElementType> = {
  Home, Bath, Grid3X3, ChefHat, Layers, Paintbrush, Sparkles, Wrench,
  Waves, LayoutTemplate, Fence, Hammer,
};

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.animate-on-scroll');
    const io  = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('visible');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' },
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function HomePageSections({
  galleryItems,
  projects,
  totalProjectsCount = 0,
}: {
  galleryItems: GalleryItem[];
  projects: ProjectType[];
  totalProjectsCount?: number;
}) {
  useScrollReveal();
  return (
    <>
      <HeroSection />
      <TrustBannerSection />
      <TickerSection />
      <IntroSection />
      {/* ── AFTER ABOUT SECTION: FULL PROFESSIONAL ARCHITECTURAL SUITE ── */}
      <BrandPartnersSection />
      <ServicesSection />
      <PackagesPromoSection />
      <CostEstimatorSection />
      <TransformationSection />
      <ProjectsCarousel projects={projects} totalCount={totalProjectsCount} />
      <BuilderArchitectSection />
      <ProcessSection />
      <FounderSection totalProjectsCount={totalProjectsCount} />
      <GalleryCarouselSection items={galleryItems} />
      <WhyUsSection />
      <GoogleReviewsWidget />
      <SocialProofStrip />
      <NetworkSection />
      <ModernCTA />
      <FAQSection />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────────── */
function HeroSection() {
  const heroStats = [
    { value: '10+', label: 'Years of Experience' },
    { value: '200+', label: 'Projects Completed' },
    { value: '200+', label: 'Happy Families' },
    { value: '98%', label: 'Client Satisfaction' },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #080D1A 0%, #0B1120 50%, #0A1628 100%)' }}>

      {/* Static glow orbs */}
      <div className="glow-orb w-[600px] h-[600px] opacity-20"
        style={{ background: 'radial-gradient(circle, #F97316, transparent 70%)', top: '-10%', right: '-5%' }} />
      <div className="glow-orb w-[400px] h-[400px] opacity-10"
        style={{ background: 'radial-gradient(circle, #3B82F6, transparent 70%)', bottom: '-5%', left: '-5%' }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(249,115,22,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      {/* Hero content */}
      <div className="relative container-custom pt-44 md:pt-48 pb-20">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 items-center">
          <div className="max-w-3xl">
            {/* B2B Builder & Architect Fast Track Badge */}
            <div className="mb-3 animate-fadeIn">
              <Link
                prefetch={false}
                href="/partner"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-semibold hover:bg-orange-500/20 transition-all backdrop-blur-md group"
              >
                <Building2 size={13} className="text-orange-400 group-hover:scale-110 transition-transform" />
                <span>For Builders &amp; Architects: Turnkey Civil Subcontracting</span>
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Label */}
            <div className="section-label animate-fadeIn">
              Mumbai&apos;s Trusted Construction Partner With 10+ Years Legacy
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-white leading-[1.08] text-4xl sm:text-5xl lg:text-6xl xl:text-[4.2rem] mt-2 mb-6">
              Mumbai&apos;s Best <br />
              <span className="text-gradient">Civil Contractors</span>
            </h1>

            {/* Sub */}
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl mb-8 animate-fadeUp">
              The #1 choice for <strong className="text-orange-400">best civil work in Mumbai</strong>. 
              Expert in bungalow construction, bathroom renovation, kitchen work, and premium interior civil work across Mumbai, Navi Mumbai, and Thane.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10 animate-fadeUp">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(249,115,22,0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={openQuotePopup} 
                className="btn-primary text-base px-8 py-4"
              >
                Get Free Quote <ArrowRight size={18} />
              </motion.button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link prefetch={false} href="/projects" className="btn-ghost text-base px-8 py-4 h-full flex items-center">
                  View Projects
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4 animate-fadeIn"
            style={{ animationDelay: '1s', opacity: 0 }}>
            {heroStats.map((s, i) => (
              <div key={s.label} className="glass px-5 py-6 flex flex-col items-center text-center"
                style={{ animationDelay: `${i * 0.4}s` }}>
                <div className="font-display font-black text-3xl text-gradient mb-1">
                  <CountUp value={s.value} />
                </div>
                <div className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24"
        style={{ background: 'linear-gradient(to top, #080D1A, transparent)' }} />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   TRUST BANNER SECTION
───────────────────────────────────────────────────────────── */
function TrustBannerSection() {
  return (
    <div className="bg-[#050914] border-y border-white/5 py-10 relative z-20 shadow-2xl">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10 text-center">
          {[
            { icon: Award, title: "10+ Years Legacy", subtitle: "Top Civil Contractor" },
            { icon: Star, title: "5-Star Rated", subtitle: "Top Civil Contractor" },
            { icon: Shield, title: "100% Guaranteed", subtitle: "Quality Materials" },
            { icon: Users, title: "In-House Experts", subtitle: "No Middlemen" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center justify-center gap-3 group animate-fadeUp" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-14 h-14 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                <item.icon size={28} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm tracking-wide">{item.title}</h4>
                <p className="text-slate-500 text-xs mt-1">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TICKER SECTION
───────────────────────────────────────────────────────────── */
function TickerSection() {
  const items = ['✦ Bungalow Construction', '✦ Full Interior Civil Work', '✦ Swimming Pool Work',
    '✦ Compound Wall & Gates', '✦ Building Repair', '✦ Bathroom Renovation', '✦ Kitchen Work',
    '✦ Tiles & Flooring', '✦ POP Ceilings', '✦ Plaster Work', '✦ Wall Finishes'];
  const doubled = [...items, ...items];
  return (
    <div className="ticker-wrap overflow-hidden py-3.5"
      style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' }}>
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <span key={i} className="text-white font-mono font-semibold text-sm uppercase tracking-widest px-8 whitespace-nowrap opacity-95">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   INTRO + ABOUT SECTION
───────────────────────────────────────────────────────────── */
function IntroSection() {
  return (
    <section className="section-y" style={{ background: '#0B1120' }}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label animate-on-scroll">About Us</div>
            <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl text-white leading-tight mb-6 animate-on-scroll">
              Premium Bungalow Construction & <br/>
              <span className="text-gradient">Civil Work in Mumbai</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4 animate-on-scroll">
              As the leading <strong className="text-white">building contractor in Mumbai</strong>, AMS Civil Construction
              has been executing premium real estate and residential projects for over 10+ years. We are the top-rated choice for civil work in Mumbai, Navi Mumbai, and Thane.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8 animate-on-scroll">
              We specialise in <strong className="text-white">bungalow construction</strong>, luxury bathroom &amp; modular kitchen renovations, tiles, flooring,
              POP false ceilings, and all interior structural work — delivered with personal attention, expert engineers, and backed by a comprehensive quality guarantee.
            </p>
            <div className="flex gap-4 animate-on-scroll">
              <Link prefetch={false} href="/about" className="btn-primary">Our Story <ArrowRight size={16} /></Link>
              <Link prefetch={false} href="/services" className="btn-outline">All Services</Link>
            </div>
          </div>

          {/* About Banner Image */}
          <div className="relative aspect-[1.35/1] rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-on-scroll">
            <Image 
              src="/images/aboutbenner.jpg" 
              alt="About AMS Civil Construction" 
              fill 
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   BRAND PARTNERS & ISI MATERIAL ASSURANCE
───────────────────────────────────────────────────────────── */
function BrandPartnersSection() {
  const brands = [
    { name: 'UltraTech Cement', role: 'Structural Concrete & Plaster', tag: 'Grade 53 ISI', color: 'from-amber-500/20 to-orange-500/5' },
    { name: 'Tata Tiscon', role: 'Fe 550D TMT Rebars', tag: 'High Ductility', color: 'from-blue-500/20 to-blue-600/5' },
    { name: 'Asian Paints Royale', role: 'Luxury Emulsion & Damp Proof', tag: '7-Yr Seal', color: 'from-purple-500/20 to-purple-600/5' },
    { name: 'Jaquar & Kohler', role: 'Luxury CP & Concealed Fittings', tag: '10-Yr Warranty', color: 'from-emerald-500/20 to-emerald-600/5' },
    { name: 'Kajaria & Somany', role: 'Vitrified GVT & Italian Marble', tag: 'Mirror Finish', color: 'from-rose-500/20 to-rose-600/5' },
    { name: 'Astral Pipes', role: 'Lead-Free CPVC & SWR Systems', tag: 'Leak-Proof', color: 'from-cyan-500/20 to-cyan-600/5' },
    { name: 'Havells & Polycab', role: 'FR-LSH Fire Resistant Wiring', tag: 'IS 694 Certified', color: 'from-yellow-500/20 to-yellow-600/5' },
    { name: 'Dr. Fixit', role: 'Multi-Coat Waterproofing Seal', tag: '100% Certified', color: 'from-orange-500/20 to-amber-600/5' },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#080D1A] border-y border-white/5 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="section-label">Uncompromising Material Quality</div>
            <h3 className="font-display text-2xl lg:text-3xl text-white font-bold">
              We Build Exclusively With <span className="text-gradient">India&apos;s Leading Brands</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Zero sub-standard substitutes. Every brick, rebar, pipe, and tile adhesive is 100% genuine, factory-sealed, and batch-tested.
            </p>
          </div>
          <div className="flex items-center gap-2.5 self-start md:self-auto px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck size={16} />
            <span>100% Authentic ISI Materials</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className={`p-3.5 rounded-xl bg-gradient-to-b ${brand.color} border border-white/10 hover:border-orange-500/40 transition-all duration-300 group flex flex-col justify-between`}
            >
              <div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-orange-400 block mb-1">
                  {brand.tag}
                </span>
                <h4 className="text-white font-bold text-xs sm:text-sm leading-snug group-hover:text-orange-400 transition-colors">
                  {brand.name}
                </h4>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight mt-2 line-clamp-2">
                {brand.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SERVICES — Interactive Filter Tabs & Architectural Cards
   (8 on Laptop / Desktop, 4 on Mobile + Top & Bottom CTAs)
───────────────────────────────────────────────────────────── */
function ServicesSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'bungalow' | 'interior' | 'specialized'>('all');

  const filteredServices = services.filter((svc) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'bungalow') {
      return ['bungalow-construction', 'compound-wall-work', 'building-repair-work'].includes(svc.slug);
    }
    if (activeTab === 'interior') {
      return ['bathroom-renovation', 'kitchen-work', 'tiles-work', 'flooring-work', 'full-interior-work'].includes(svc.slug);
    }
    if (activeTab === 'specialized') {
      return ['swimming-pool-work', 'pop-work', 'plaster-work'].includes(svc.slug);
    }
    return true;
  });

  // Limit to max 8 on desktop (cards 4-7 hidden on mobile via CSS)
  const displayedServices = filteredServices.slice(0, 8);

  return (
    <section className="pt-12 sm:pt-16 pb-6 sm:pb-8 stripe-bg relative" style={{ background: '#101827' }}>
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="section-label animate-on-scroll">End-To-End Execution</div>
            <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl text-white leading-tight mt-2 animate-on-scroll">
              Complete <span className="text-gradient">Civil & Architectural Services</span>
            </h2>
            <p className="text-slate-400 mt-3 text-sm sm:text-base leading-relaxed animate-on-scroll">
              From foundation excavation to Italian marble polishing, our in-house master masons and site engineers deliver flawless precision across Mumbai.
            </p>
          </div>

          {/* Category Tabs & Top 'View All' Button */}
          <div className="flex flex-wrap items-center gap-2 animate-on-scroll">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'bungalow', label: 'Bungalow & Villa' },
              { id: 'interior', label: 'Luxury Interiors' },
              { id: 'specialized', label: 'Specialized Civil' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}

            {/* Top View All Button */}
            <Link
              href="/services"
              prefetch={false}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/25 hover:border-orange-500 transition-all flex items-center gap-1.5 shadow-sm ml-auto sm:ml-0"
            >
              <span>View All 12</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Services Grid (Phone: 4 cards, Laptop: 8 cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayedServices.map((svc, i) => {
            const Icon = iconMap[svc.icon] ?? Wrench;
            return (
              <div
                key={svc.id}
                className={`group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0B1120] hover:border-orange-500/50 transition-all duration-500 flex-col justify-between shadow-xl hover:shadow-[0_10px_35px_rgba(249,115,22,0.12)] hover:-translate-y-1.5 animate-on-scroll ${
                  i >= 4 ? 'hidden sm:flex' : 'flex'
                }`}
                style={{ transitionDelay: `${(i % 4) * 60}ms` }}
              >
                {/* Image Header with Gradient Overlay */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={svc.image}
                    alt={`${svc.title} Contractor in Mumbai — AMS Civil`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent" />
                  
                  {/* Category Chip */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#0B1120]/80 backdrop-blur-md border border-white/15 text-orange-400">
                    Turnkey Civil
                  </span>

                  {/* Icon Badge */}
                  <div className="absolute bottom-3 left-4 w-11 h-11 rounded-xl bg-orange-500/20 backdrop-blur-md border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                    <Icon size={20} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-display font-bold text-lg mb-2 group-hover:text-orange-400 transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                      {svc.shortDesc}
                    </p>

                    {/* Key Benefits Pill */}
                    <div className="space-y-1.5 pt-3 border-t border-white/5 mb-5">
                      {svc.benefits.slice(0, 2).map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-400">
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                          <span className="truncate">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <Link
                      href={`/services/${svc.slug}`}
                      prefetch={false}
                      className="text-xs font-bold text-orange-400 hover:text-orange-300 inline-flex items-center gap-1.5 transition-colors group/link"
                    >
                      <span>Explore Scope</span>
                      <ArrowRight size={13} className="transition-transform group-hover/link:translate-x-1" />
                    </Link>

                    <button
                      onClick={openQuotePopup}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-orange-500 hover:text-white text-slate-300 text-[11px] font-semibold border border-white/10 hover:border-orange-500 transition-all"
                    >
                      Free Quote
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 sm:mt-8 animate-on-scroll">
          <Link
            prefetch={false}
            href="/services"
            className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>View All 12 Services</span>
            <ArrowRight size={14} />
          </Link>
          <button
            onClick={openQuotePopup}
            className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 hover:border-orange-500/40 text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Request Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CUSTOMIZED PRICING SECTION — No Rigid Packages, 100% Scope-Based
───────────────────────────────────────────────────────────── */
function PackagesPromoSection() {
  return (
    <section className="pt-8 sm:pt-12 pb-12 sm:pb-16 bg-[#080D1A] border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
           style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="section-label justify-center animate-on-scroll">
            Transparent &amp; Flexible Pricing
          </div>
          <h2 className="font-display font-black text-white text-3xl sm:text-4xl lg:text-5xl mb-4 animate-on-scroll">
            No Rigid Packages. Pricing Tailored to <span className="text-gradient">Your Exact Scope</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed animate-on-scroll">
            Every home and site is unique — we do not impose fixed one-size-fits-all packages.
            Your civil work investment is calculated on actual carpet area, material grade selection, and site condition.
            <span className="block mt-1 text-orange-400 font-semibold">
              Project scope ke mutabiq kharcha kam bhi ho sakta hai aur zyada bhi.
            </span>
          </p>
        </div>

        {/* 3 Pillars of Transparent Estimation (No Rigid Fixed Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Pillar 1 */}
          <div className="p-7 rounded-2xl bg-[#0B1120] border border-white/10 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl animate-on-scroll">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-5 group-hover:scale-110 transition-transform">
                <FileText size={24} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-full inline-block mb-3">
                100% Itemized BOQ
              </span>
              <h3 className="text-white font-display font-bold text-xl mb-3">
                Pay Only For What You Build
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                No compulsory bundles or inflated packages. From a single bathroom renovation to a complete ground-up bungalow, you receive a transparent line-by-line Bill of Quantities (BOQ).
              </p>
            </div>
            <ul className="space-y-2 border-t border-white/5 pt-4 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>Zero hidden charges or surprise markups</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>Pay stage-wise per completed milestone</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="p-7 rounded-2xl bg-[#0B1120] border border-white/10 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl animate-on-scroll">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-5 group-hover:scale-110 transition-transform">
                <Layers size={24} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-full inline-block mb-3">
                Flexible Material Tiers
              </span>
              <h3 className="text-white font-display font-bold text-xl mb-3">
                Budget Controlled by You
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                Whether you prefer economy ISI-certified materials for smart savings, or luxury Italian marble &amp; imported fittings — you choose the material grade that fits your vision and budget.
              </p>
            </div>
            <ul className="space-y-2 border-t border-white/5 pt-4 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>Standard, Premium &amp; Luxury finish options</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>100% genuine brand warranty certificates</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="p-7 rounded-2xl bg-[#0B1120] border border-white/10 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl animate-on-scroll">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-5 group-hover:scale-110 transition-transform">
                <BadgeCheck size={24} />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-full inline-block mb-3">
                Laser Measurement
              </span>
              <h3 className="text-white font-display font-bold text-xl mb-3">
                Free In-Person Site Inspection
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                Our senior civil engineer visits your site in Mumbai, Thane, or Navi Mumbai. We conduct physical laser measurements and structural assessment to deliver an accurate, zero-obligation quotation.
              </p>
            </div>
            <ul className="space-y-2 border-t border-white/5 pt-4 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>On-site engineering consultation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>Accurate quotation delivered in 24 hours</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Callout Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#161F2E] via-[#101827] to-[#0B1120] border border-orange-500/30 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl animate-on-scroll">
          <div className="text-center lg:text-left">
            <h4 className="text-white font-display font-bold text-lg sm:text-xl">
              Want an exact, realistic quote for your property?
            </h4>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Invite our senior engineer for an on-site physical measurement, or calculate an indicative benchmark below.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={openQuotePopup}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all active:scale-95"
            >
              <span>Book Free Site Inspection</span>
              <ArrowRight size={16} />
            </button>
            <a
              href="https://wa.me/918779391690?text=Hi%20AMS%20Civil,%20I%20want%20a%20customized%20quotation%20for%20my%20site%20renovation%20/%20civil%20work."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              <WhatsAppLogo className="w-4 h-4 fill-current" />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   ON-SITE ESTIMATION PROTOCOL & CONSULTATION
   (Compact, Ultra-Professional, No Misleading Fixed Prices)
───────────────────────────────────────────────────────────── */
function CostEstimatorSection() {
  return (
    <section className="py-12 sm:py-16 bg-[#0B1120] border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
           style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-[#161F2E] via-[#101827] to-[#0B1120] border border-orange-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden animate-on-scroll">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Column: Context & Industry Standard */}
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
                <Calculator size={13} /> Accurate Measurement Protocol
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
                Get an Accurate On-Site Estimate <br className="hidden sm:inline" />
                <span className="text-gradient">With Zero Guesswork</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                Construction and civil renovation costs are never fixed. Depending on actual laser measurements,
                site conditions (dampness, plumbing rerouting, masonry repairs), and chosen material grades (Economy, Premium, Luxury),
                the exact investment is finalized after physical inspection — <strong className="text-orange-400 font-semibold">yeh kam bhi ho sakta hai aur zyada bhi</strong>.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {[
                  { title: 'Physical Laser Survey', desc: 'No blind sq.ft estimations' },
                  { title: 'Itemized Line BOQ', desc: 'Zero hidden surprises' },
                  { title: 'Flexible Budget Grades', desc: 'ISI to Italian Marble' },
                  { title: '100% Free Site Visit', desc: 'Mumbai, Thane & Navi Mumbai' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5 text-left">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white text-xs font-bold leading-snug">{item.title}</div>
                      <div className="text-[10px] text-slate-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: High-Converting Consultation Box */}
            <div className="w-full lg:w-[380px] p-6 rounded-2xl bg-[#080D1A] border border-white/10 shadow-xl flex flex-col justify-between shrink-0">
              <div className="mb-6">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-orange-400 block mb-1">
                  Senior Civil Engineer Visit
                </span>
                <h3 className="text-white font-display font-bold text-lg mb-2">
                  Book Free Site Measurement
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Our site engineer will visit your property, assess structural needs, and provide a comprehensive BOQ estimate within 24 hours.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={openQuotePopup}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <span>Book Free Site Visit</span>
                  <ArrowRight size={15} />
                </button>

                <a
                  href="https://wa.me/918779391690?text=Hi%20AMS%20Civil%20Construction,%20I%20would%20like%20to%20book%20a%20free%20site%20inspection%20and%20get%20an%20accurate%20BOQ%20estimate%20for%20my%20property."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <WhatsAppLogo className="w-4 h-4 fill-current" />
                  <span>WhatsApp Senior Engineer</span>
                </a>

                <div className="pt-2 text-center border-t border-white/5">
                  <Link
                    href="/calculator"
                    prefetch={false}
                    className="text-[11px] text-slate-400 hover:text-orange-400 transition-colors inline-flex items-center gap-1 font-medium"
                  >
                    <span>Looking for a rough benchmark? Open Full Calculator</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   TRANSFORMATION SECTION — Single Curated Luxury Transformation
   (Compact, Ultra-Premium, Focused on Bandra Bungalow Build)
───────────────────────────────────────────────────────────── */
function TransformationSection() {
  const project = {
    title: 'Contemporary Luxury Bungalow Build',
    location: 'Davanagere, Karnataka',
    scope: 'Ground-Up Masonry to Luxury Living',
    duration: '45 Days Turnaround',
    beforeImage: '/real-projects/before.jpg',
    afterImage: '/real-projects/after.jpg',
    beforeLabel: 'Raw Brick Shell',
    afterLabel: 'Finished Luxury Villa',
  };

  return (
    <section className="py-12 sm:py-16 bg-[#050914] border-y border-white/5 relative overflow-hidden">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Compact Architectural Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="section-label justify-center animate-on-scroll">Tangible Proof</div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-2 animate-on-scroll">
            See the <span className="text-gradient">Transformation</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm animate-on-scroll">
            Drag the slider to inspect how our engineering precision turns bare structural chaos into refined luxury spaces.
          </p>

          {/* Integrated Location & Scope Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 mt-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs animate-on-scroll">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <MapPin size={13} className="text-orange-400" /> {project.location}
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-300 hidden sm:inline">{project.scope}</span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
              {project.duration}
            </span>
          </div>
        </div>

        {/* Compact, Ultra-Premium Slider Frame */}
        <div className="animate-on-scroll max-w-4xl mx-auto p-2 sm:p-2.5 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-orange-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <BeforeAfterSlider
            beforeImage={project.beforeImage}
            afterImage={project.afterImage}
            beforeLabel={project.beforeLabel}
            afterLabel={project.afterLabel}
          />
        </div>

        {/* Micro-hint */}
        <div className="text-center mt-3 animate-on-scroll">
          <span className="text-[11px] text-slate-500 font-medium">
            ⇄ Drag slider left and right to inspect structural masonry vs finished elevation
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FEATURED PROJECT CARD — Multi-Photo Interactive Architecture
───────────────────────────────────────────────────────────── */
function FeaturedProjectCard({
  project,
  isActive,
}: {
  project: ProjectType;
  isActive: boolean;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const totalImages = project.images?.length || 0;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveImage((prev) => (prev + 1) % totalImages);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveImage((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const currentImageSrc = project.images?.[activeImage] || project.images?.[0];

  return (
    <div
      className="scroll-snap-start flex-shrink-0 w-[88vw] sm:w-[420px] lg:w-[390px] rounded-3xl bg-[#101827] border border-white/10 hover:border-orange-500/40 group relative overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl"
      style={{
        transform: isActive ? 'scale(1.01)' : 'scale(0.99)',
        opacity: isActive ? 1 : 0.85,
      }}
    >
      <div>
        {/* Photo Container */}
        <div className="relative h-56 overflow-hidden bg-[#161F2E] group/photo select-none">
          {currentImageSrc ? (
            <Image
              src={encodeURI(currentImageSrc)}
              alt={`${project.title} — Construction Project in ${project.location}`}
              fill
              unoptimized={true}
              className="object-cover group-hover/photo:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#161F2E]">
              <span className="text-slate-500 text-sm">Civil Project Photo</span>
            </div>
          )}

          {/* Status Badge */}
          <span
            className={`absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-md ${
              project.status === 'ongoing'
                ? 'bg-blue-600/90 text-white border border-blue-400/30'
                : 'bg-emerald-600/90 text-white border border-emerald-400/30'
            }`}
          >
            {project.status === 'ongoing' ? <Clock size={11} /> : <CheckCircle2 size={11} />}
            <span>{project.status === 'ongoing' ? 'In Progress' : 'Completed'}</span>
          </span>

          {/* Top Right: Unified Multi-Photo Counter Badge */}
          {totalImages <= 1 ? (
            <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-slate-300 text-[10px] font-mono flex items-center gap-1.5 shadow-md">
              <Camera size={11} className="text-slate-400" />
              <span>1 Photo</span>
            </div>
          ) : (
            <Link
              href={`/projects#${project.id}`}
              className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-black/80 hover:bg-black backdrop-blur-md border border-white/20 hover:border-orange-500/80 text-white text-[10px] font-mono font-bold tracking-wider flex items-center gap-1.5 transition-all shadow-md"
              title="Click to view all photos on projects page"
            >
              <Camera size={11} className="text-orange-400" />
              <span>{activeImage + 1}/{totalImages} Photos</span>
            </Link>
          )}

          {/* Quick Arrow Controls for Multi-Photo Projects */}
          {totalImages > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/70 hover:bg-orange-500 text-white backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-all duration-200 cursor-pointer shadow-xl hover:scale-110 active:scale-95"
                aria-label="Previous photo"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-orange-500 text-white backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-all duration-200 cursor-pointer shadow-xl hover:scale-110 active:scale-95"
                aria-label="Next photo"
              >
                <ChevronRight size={15} />
              </button>
            </>
          )}

          {/* Bottom Micro-Segment Line Indicator */}
          {totalImages > 1 && totalImages <= 5 && (
            <div className="absolute bottom-0 inset-x-0 flex gap-1.5 px-3 pb-1.5 z-20 pointer-events-none">
              {project.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 flex-1 ${
                    activeImage === idx
                      ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.9)]'
                      : 'bg-white/30 backdrop-blur-sm'
                  }`}
                />
              ))}
            </div>
          )}

          {totalImages > 5 && (
            <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 z-20 pointer-events-none">
              <div
                className="h-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.9)] transition-all duration-300"
                style={{ width: `${((activeImage + 1) / totalImages) * 100}%` }}
              />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#101827] via-[#101827]/40 to-transparent pointer-events-none" />
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-orange-400 font-bold">
              {project.category}
            </span>
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <MapPin size={12} className="text-orange-400" />
              <span className="truncate max-w-[150px]">{project.location}</span>
            </div>
          </div>

          <h3 className="text-white font-display font-bold text-lg mb-2 leading-snug group-hover:text-orange-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
            {project.description}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <button
            onClick={() => openQuotePopup(project.title)}
            className="text-xs font-bold text-orange-400 hover:text-orange-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Enquire Similar</span>
            <ArrowRight size={13} />
          </button>

          <Link
            prefetch={false}
            href={`/projects`}
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Full Portfolio</span>
            <ArrowRight size={11} className="text-slate-500" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROJECTS CAROUSEL — Curated Architectural Portfolio
───────────────────────────────────────────────────────────── */
function ProjectsCarousel({ projects, totalCount = 0 }: { projects: ProjectType[]; totalCount?: number }) {
  const fallbackProjects: ProjectType[] = [
    {
      id: 'fb-p1',
      title: 'Luxury 4BHK Penthouse Renovation',
      category: 'Turnkey Renovation',
      location: 'Pali Hill, Bandra West',
      status: 'completed',
      description: 'Comprehensive structural reconfiguration, Italian marble flooring, designer POP cove ceilings, and 4 luxury spa bathrooms with Jaquar diverters.',
      images: ['/real-projects/Luxury 4BHK Penthouse Renovation.jpg'],
      completedDate: '2026',
    },
    {
      id: 'fb-p2',
      title: '3-Storey Contemporary Bungalow Build',
      category: 'Bungalow Construction',
      location: 'Seawoods, Navi Mumbai',
      status: 'completed',
      description: 'End-to-end ground-up construction including RCC framed structure, brickwork, waterproofing, external plaster, and modern glass façade civil prep.',
      images: ['/images/bungalow-construction.jpg'],
      completedDate: '2026',
    },
    {
      id: 'fb-p3',
      title: 'Designer Bathroom & Wet Area Makeover',
      category: 'Bathroom Renovation',
      location: 'Hiranandani Gardens, Powai',
      status: 'completed',
      description: 'Complete moisture diagnosis, 5-layer chemical waterproofing, full-height Italian marble slabs, and concealed thermostatic plumbing.',
      images: ['/images/bathroom-renovation.jpg'],
      completedDate: '2026',
    },
    {
      id: 'fb-p4',
      title: 'High-Precision Vitrified & Marble Flooring',
      category: 'Tiles & Flooring',
      location: 'Lokhandwala, Andheri West',
      status: 'completed',
      description: 'Laser-level subfloor preparation, zero-lip 4x2 GVT tiles laying, epoxy grouting, and heavy-duty wear-resistant perimeter beading.',
      images: ['/images/flooring-work.jpg'],
      completedDate: '2026',
    },
    {
      id: 'fb-p5',
      title: 'Architectural False Ceiling & Lighting Civil Prep',
      category: 'False Ceiling & POP',
      location: 'Worli Sea Face, Mumbai',
      status: 'completed',
      description: 'Multi-tiered gypsum board POP ceilings with concealed AC ducting boxing, acoustic insulation, and precision LED cove channel integration.',
      images: ['/images/pop-work.jpg'],
      completedDate: '2026',
    },
    {
      id: 'fb-p6',
      title: 'Independent Villa Turnkey Extension',
      category: 'Villa Extension',
      location: 'Ghodbunder Road, Thane West',
      status: 'ongoing',
      description: 'Ongoing 2-storey vertical structural expansion with lightweight AAC blockwork, seismic RCC tie-beams, and weather-seal terrace roof.',
      images: ['/images/compound-wall-real.jpg'],
      completedDate: 'In Progress',
    },
  ];

  const sourceProjects = projects && projects.length >= 3 ? projects : fallbackProjects;
  const realCount = totalCount > 0 ? totalCount : (projects && projects.length > 0 ? projects.length : fallbackProjects.length);
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed'>('all');
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const filtered = filter === 'all' ? sourceProjects : sourceProjects.filter(p => p.status === filter);

  const scrollToIdx = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[idx] as HTMLElement | undefined;
    if (card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    }
    setActiveIdx(idx);
  }, []);

  const prev = useCallback(() => scrollToIdx(Math.max(0, activeIdx - 1)), [activeIdx, scrollToIdx]);
  const next = useCallback(() => scrollToIdx(Math.min(filtered.length - 1, activeIdx + 1)), [activeIdx, filtered.length, scrollToIdx]);

  return (
    <section className="pt-12 sm:pt-16 pb-6 sm:pb-8" style={{ background: '#0B1120' }}>
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="section-label animate-on-scroll">Proven Track Record</div>
            <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl text-white leading-tight animate-on-scroll">
              Featured <span className="text-gradient">Civil Work Projects</span>
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base animate-on-scroll">
              Explore our delivered residential bungalows, penthouses, and specialized interior civil transformations.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 animate-on-scroll shrink-0">
            {(['all', 'ongoing', 'completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  filter === f
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel track */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto pb-6 no-scrollbar scroll-snap-x"
          onScroll={(e) => {
            const el = e.currentTarget;
            const cardW = el.scrollWidth / filtered.length;
            setActiveIdx(Math.round(el.scrollLeft / cardW));
          }}
        >
          {filtered.map((project, i) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              isActive={activeIdx === i}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8">
          {/* Dots */}
          <div className="flex gap-2">
            {filtered.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIdx(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: activeIdx === i ? '28px' : '8px',
                  height: '8px',
                  background: activeIdx === i ? '#F97316' : '#1E2D45',
                }}
              />
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={activeIdx === 0}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-orange-500 hover:border-orange-500 transition-all disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              disabled={activeIdx === filtered.length - 1}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-orange-500 hover:border-orange-500 transition-all disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="text-center mt-6 sm:mt-8 animate-on-scroll">
          <Link prefetch={false} href="/projects" className="btn-outline text-sm px-8 py-3.5">
            Explore Projects Portfolio <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   BUILDER & ARCHITECT B2B PARTNERSHIP SECTION
   Ultra-Professional B2B suite for Builders, Developers & Architects
───────────────────────────────────────────────────────────── */
function BuilderArchitectSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#080D1A] via-[#0A1122] to-[#080D1A] border-t border-white/5 relative overflow-hidden">
      {/* Ambient background glows */}
      <div
        className="glow-orb w-[500px] h-[500px] opacity-15"
        style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)', top: '10%', right: '-5%' }}
      />
      <div
        className="glow-orb w-[450px] h-[450px] opacity-10"
        style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)', bottom: '5%', left: '-5%' }}
      />

      <div className="container-custom relative z-10">
        {/* Header Tag & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Building2 size={13} className="text-orange-400" />
            <span>B2B Turnkey &amp; Subcontracting Collaboration</span>
          </div>
          <h2 className="font-display font-black text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            Are You a <span className="text-gradient">Builder, Developer</span> or <span className="text-gradient">Architect?</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed">
            Partner with Mumbai&apos;s most disciplined civil execution contractor. Whether you need heavy structural concrete, high-speed blockwork, sand-face plastering, or millimeter-precise interior civil finishing — we execute your drawings on schedule with zero quality compromise.
          </p>
        </div>

        {/* Dual B2B Pillars: Builders vs Architects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-10">
          {/* Card 1: For Builders & Real Estate Developers */}
          <div className="p-7 sm:p-9 rounded-2xl bg-[#0B1329]/80 border border-white/10 hover:border-orange-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-400">
                  <HardHat size={26} />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[11px] font-mono font-semibold">
                  For Real Estate &amp; Tower Developers
                </span>
              </div>

              <h3 className="font-display font-bold text-white text-2xl mb-3 group-hover:text-orange-400 transition-colors">
                For Builders &amp; Developers
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Reliable subcontracting partner for residential towers, row houses, and society redevelopment projects across Mumbai, Thane &amp; Navi Mumbai.
              </p>

              <div className="space-y-3.5 mb-6">
                {[
                  { title: 'Turnkey or Labor-Only Subcontracting', desc: 'Flexible commercial models tailored to your procurement flow and cash cycle.' },
                  { title: 'RCC & Heavy Structural Skeleton', desc: 'Columns, beams, raft foundation, and high-strength concrete with mechanized vibration.' },
                  { title: 'High-Speed Brickwork & AAC Blocks', desc: 'Laser-levelled internal and external partition walls with thermal cracking prevention.' },
                  { title: 'Sand-Face External & Internal Plaster', desc: 'High-pressure line plastering and water curing for monsoon-resistant building facades.' },
                  { title: 'On-Site Civil Engineers & 50+ Artisans', desc: 'Dedicated supervisor ensuring IS-code compliance, safety standards, and daily logs.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-orange-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white text-xs sm:text-sm block">{item.title}</strong>
                      <span className="text-slate-400 text-xs">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/918779391690?text=Hi%20Kedar%20ji,%20I%20am%20a%20Builder%20/%20Developer.%20I%20have%20an%20upcoming%20project%20and%20would%20like%20to%20discuss%20civil%20subcontracting%20/%20BOQ."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs sm:text-sm px-5 py-3 flex items-center gap-2"
              >
                <WhatsAppLogo className="w-4 h-4 fill-current" />
                <span>Share Project BOQ / CAD</span>
              </a>
              <Link
                prefetch={false}
                href="/partner"
                className="btn-ghost text-xs sm:text-sm px-5 py-3 flex items-center gap-1.5"
              >
                <span>Builder Terms</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Card 2: For Architects & Interior Designers */}
          <div className="p-7 sm:p-9 rounded-2xl bg-[#0B1329]/80 border border-white/10 hover:border-orange-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400">
                  <Building2 size={26} />
                </div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[11px] font-mono font-semibold">
                  For Architecture &amp; Design Studios
                </span>
              </div>

              <h3 className="font-display font-bold text-white text-2xl mb-3 group-hover:text-blue-400 transition-colors">
                For Architects &amp; Interior Designers
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Your creative vision, translated onto the site with millimeter precision. We act as your confidential on-site engineering team with strict NDA adherence.
              </p>

              <div className="space-y-3.5 mb-6">
                {[
                  { title: '100% CAD & Blueprint Fidelity', desc: 'No on-site guesswork. Precise structural dismantling, wall alignment, and floor levels.' },
                  { title: 'Strict B2B Non-Disclosure (NDA)', desc: 'Unconditional privacy protection for your designs, client contacts, and proprietary plans.' },
                  { title: 'Italian Marble & Large-Format GVT Laying', desc: 'Laser-guided zero-lip tile laying, concealed niche work, and epoxy grouting.' },
                  { title: 'Acoustic POP Ceilings & Concealed MEP', desc: 'Framed false ceiling architecture ready for cove lighting and modular fit-outs.' },
                  { title: 'Milestone-Linked Progressive Billing', desc: 'Work certified stage-by-stage so you have 100% control over quality before payout.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white text-xs sm:text-sm block">{item.title}</strong>
                      <span className="text-slate-400 text-xs">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/918779391690?text=Hi%20Kedar%20ji,%20I%20am%20an%20Architect%20/%20Interior%20Designer.%20I%20would%20like%20to%20discuss%20a%20turnkey%20civil%20execution%20partnership."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs sm:text-sm px-5 py-3 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
              >
                <WhatsAppLogo className="w-4 h-4 fill-current" />
                <span>Architect Connect</span>
              </a>
              <Link
                prefetch={false}
                href="/partner"
                className="btn-ghost text-xs sm:text-sm px-5 py-3 flex items-center gap-1.5"
              >
                <span>Studio Program</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Badges Strip for B2B */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-orange-400 shrink-0" />
            <div>
              <div className="text-white text-xs font-bold">Formal B2B Contract</div>
              <div className="text-slate-400 text-[11px]">Strict NDA &amp; Penalty Clauses</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-orange-400 shrink-0" />
            <div>
              <div className="text-white text-xs font-bold">Zero Delay Delivery</div>
              <div className="text-slate-400 text-[11px]">Gantt Chart Project Tracking</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users size={20} className="text-orange-400 shrink-0" />
            <div>
              <div className="text-white text-xs font-bold">50+ In-House Workforce</div>
              <div className="text-slate-400 text-[11px]">Experienced Masons &amp; Carpenters</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={20} className="text-orange-400 shrink-0" />
            <div>
              <div className="text-white text-xs font-bold">B2B Direct Desk</div>
              <a href="tel:+918779391690" className="text-orange-400 hover:underline text-[11px] font-mono">+91 87793 91690</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROCESS SECTION — The 4-Step Precision Engineering Protocol
───────────────────────────────────────────────────────────── */
function ProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'Free Diagnostic Site Scan',
      timeline: 'Day 1 – 2',
      desc: 'Our senior civil engineer visits your site with laser measurement and digital moisture meters. We evaluate load-bearing walls, structural dampness, and take exact 3D measurements.',
      deliverable: '100% Free Site Audit & Measurements',
    },
    {
      num: '02',
      title: 'Guaranteed Itemized BOQ',
      timeline: 'Day 3 – 5',
      desc: 'You receive a transparent bill of quantities detailing exact brand grades (Tata, UltraTech, Jaquar) and labor rates. Fixed price contract with strict zero hidden escalation clauses.',
      deliverable: 'Price Lock Guarantee & Agreement',
    },
    {
      num: '03',
      title: 'Supervised Precision Build',
      timeline: 'Execution Phase',
      desc: 'Our in-house master craftsmen begin execution under full-time civil engineer supervision. You receive daily photo/video WhatsApp milestone updates. Payments are strictly milestone-based.',
      deliverable: 'Daily WhatsApp Progress Logs',
    },
    {
      num: '04',
      title: '120-Point Audit & Warranty Handover',
      timeline: 'Handover Day',
      desc: 'Final inspection covering tile alignment, waterproofing test, electrical load, and plumbing pressure. Site is deep-cleaned and handed over with a formal 1-Year Workmanship Warranty.',
      deliverable: '1-Year Workmanship Warranty Card',
    },
  ];

  return (
    <section className="pt-8 sm:pt-12 pb-12 sm:pb-16 stripe-bg relative border-t border-white/5" style={{ background: '#101827' }}>
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="section-label justify-center animate-on-scroll">Systematic Engineering</div>
          <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl text-white mb-3 animate-on-scroll">
            Our 4-Step <span className="text-gradient">Precision Protocol</span>
          </h2>
          <p className="text-slate-400 animate-on-scroll text-sm sm:text-base">
            No guesswork, no sudden cost escalations. A transparent engineering process engineered for your peace of mind.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative rounded-3xl p-6 sm:p-7 bg-[#0B1120] border border-white/10 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl animate-on-scroll"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-display font-black text-2xl shadow-lg shadow-orange-500/25 group-hover:scale-110 transition-transform">
                    {step.num}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-full">
                    {step.timeline}
                  </span>
                </div>

                <h3 className="text-white font-display font-bold text-lg sm:text-xl mb-3 group-hover:text-orange-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {step.desc}
                </p>
              </div>

              {/* Deliverable Badge */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] font-medium text-emerald-400">
                <CheckCircle2 size={14} className="shrink-0" />
                <span>{step.deliverable}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FOUNDER & LEADERSHIP TRUST SECTION
───────────────────────────────────────────────────────────── */
function FounderSection({ totalProjectsCount = 0 }: { totalProjectsCount?: number }) {
  const realCount = totalProjectsCount > 0 ? totalProjectsCount : 14;
  return (
    <section className="py-10 sm:py-14 bg-[#0B1120] border-t border-white/5 relative overflow-hidden">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl bg-[#0F172A] border border-orange-500/30 p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden animate-on-scroll">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          {/* Top Row: Executive Identity & Direct Contact */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-3.5">
              {/* Executive Monogram Crest */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 text-white flex items-center justify-center font-display font-black text-xl sm:text-2xl shadow-lg shadow-orange-500/25 border-2 border-white/20 shrink-0">
                KM
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-white font-display font-bold text-lg sm:text-xl">Kedar Mandal</h3>
                  <BadgeCheck size={18} className="text-orange-400 shrink-0" />
                </div>
                <p className="text-slate-400 text-xs sm:text-sm">Founder &amp; Principal Civil Contractor</p>
                <div className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>On-Site Engineering Oversight</span>
                </div>
              </div>
            </div>

            {/* Direct Connect Pills */}
            <div className="flex items-center gap-2.5 sm:self-center">
              <a
                href="tel:+918779391690"
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white/5 hover:bg-orange-500 hover:text-white border border-white/10 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Phone size={13} className="text-orange-400" />
                <span>Call Directly</span>
              </a>
              <a
                href="https://wa.me/918779391690?text=Hi%20Kedar%20ji,%20I%20would%20like%20to%20discuss%20my%20civil%20work%20project%20directly%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#25D366]/20"
              >
                <WhatsAppLogo className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Core Message & Commitments */}
          <div className="py-6 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-orange-400 mb-3">
              <ShieldCheck size={13} />
              <span>Personal Leadership Guarantee</span>
            </div>

            <h4 className="text-white font-display text-lg sm:text-2xl font-bold leading-snug mb-4">
              &ldquo;We don&apos;t just pour concrete. <br className="hidden sm:inline" />
              <span className="text-gradient">We take ownership of your life&apos;s biggest investment.&rdquo;</span>
            </h4>

            {/* 3 Executive Commitments */}
            <div className="grid sm:grid-cols-3 gap-3 mb-5">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  <span>Zero Hidden Costs</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Scope-locked BOQ with milestone payments. No surprise price hikes mid-work.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  <span>100% Genuine ISI</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Tata/JSW steel &amp; Ultratech cement verified on site before pouring.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  <span>Direct Oversight</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Personal engineering inspections on site before every milestone handover.
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm italic border-l-2 border-orange-500/50 pl-3 py-1">
              &ldquo;If any aspect of masonry, tile leveling, or waterproofing doesn&apos;t meet engineering standards, I personally ensure it is rectified before handover.&rdquo;
            </p>
          </div>

          {/* 4 Compact Trust Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-5 border-t border-white/10 relative z-10">
            <div className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-lg sm:text-xl font-display font-black text-orange-400">10+ Yrs</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Civil Legacy</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-lg sm:text-xl font-display font-black text-orange-400">200+</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Projects Delivered</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-lg sm:text-xl font-display font-black text-orange-400">100%</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">In-House Staff</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-lg sm:text-xl font-display font-black text-orange-400">1-Year</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Legal Warranty</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   WHY CHOOSE US — AMS vs Local Thekedars Comparison
───────────────────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────────────────
   WHY CHOOSE US — AMS vs Local Thekedars Comparison
   (Compact, Ultra-Premium Side-by-Side Comparison)
───────────────────────────────────────────────────────────── */
function WhyUsSection() {
  return (
    <section className="py-12 sm:py-16 bg-[#101827] border-t border-white/5 relative overflow-hidden">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Compact Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="section-label justify-center animate-on-scroll">The Professional Difference</div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-2 animate-on-scroll">
            Why Homeowners Choose <span className="text-gradient">AMS Civil</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm animate-on-scroll">
            See how hiring an organized, engineering-backed contractor protects your money, timeline, and structural safety.
          </p>
        </div>

        {/* Sleek Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-6 animate-on-scroll">
          {/* Card 1: AMS Civil */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#161F2E] via-[#101827] to-[#0B1120] border-2 border-orange-500/50 shadow-[0_10px_35px_rgba(249,115,22,0.15)] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3.5 py-1 rounded-bl-xl bg-orange-500 text-white font-mono font-bold text-[9px] uppercase tracking-wider">
              Recommended
            </div>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 className="text-white font-display font-bold text-lg sm:text-xl">AMS Civil Construction</h3>
                  <p className="text-orange-400 text-xs font-semibold">Organized Engineering Protocol</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Itemized BOQ:</strong> Clear rates, 0% cost escalations</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>1-Year Warranty:</strong> Official stamp-paper assurance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Civil Engineers On-Site:</strong> Daily laser level &amp; cure checks</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>100% Genuine ISI:</strong> UltraTech, Tata, Jaquar, Asian Paints</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Milestone Payments:</strong> Pay only after stage verification</span>
                </li>
              </ul>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span>✓ WhatsApp progress logs</span>
              <span>✓ On-time completion</span>
            </div>
          </div>

          {/* Card 2: Typical Local Thekedar */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#080D1A] border border-white/10 flex flex-col justify-between opacity-85 hover:opacity-100 transition-opacity">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <X size={22} />
                </div>
                <div>
                  <h3 className="text-slate-300 font-display font-bold text-lg sm:text-xl">Typical Local Thekedar</h3>
                  <p className="text-red-400 text-xs font-semibold">Unorganized &amp; High Risk</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
                <li className="flex items-start gap-2.5">
                  <X size={15} className="text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Vague Estimates:</strong> Cost balloons 30–50% midway</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X size={15} className="text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Warranty:</strong> Vanishes once final payment is taken</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X size={15} className="text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Unsupervised Labor:</strong> Daily-wage masons cutting corners</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X size={15} className="text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Sub-Standard Materials:</strong> Duplicate pipes &amp; adulterated mix</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X size={15} className="text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Heavy Advances:</strong> Cash demanded before stage finishes</span>
                </li>
              </ul>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs text-red-400 font-medium">
              <span>✗ Constant phone chasing</span>
              <span>✗ Unaccounted delays</span>
            </div>
          </div>
        </div>

        {/* Compact 1-Line Trust Bar */}
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-around gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-center animate-on-scroll">
          <div className="flex items-center gap-2 text-white font-bold">
            <Award size={15} className="text-orange-400" />
            <span>10+ Years Legacy</span>
          </div>
          <div className="flex items-center gap-2 text-white font-bold">
            <ShieldCheck size={15} className="text-orange-400" />
            <span>1-Year Official Warranty</span>
          </div>
          <div className="flex items-center gap-2 text-white font-bold">
            <Users size={15} className="text-orange-400" />
            <span>100% In-House Craftsmen</span>
          </div>
          <div className="flex items-center gap-2 text-white font-bold">
            <Clock size={15} className="text-orange-400" />
            <span>Milestone Payments</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   NETWORK / TOP CITIES & SUBURBS
───────────────────────────────────────────────────────────── */
function NetworkSection() {
  const topCities = [
    { name: 'Ranchi',      slug: 'ranchi',      zone: 'Jharkhand' },
    { name: 'Bangalore',   slug: 'bangalore',   zone: 'Karnataka' },
    { name: 'Kolkata',     slug: 'kolkata',     zone: 'West Bengal' },
    { name: 'Panjim',      slug: 'panjim',      zone: 'Goa' },
    { name: 'Pune',        slug: 'pune',        zone: 'Maharashtra' },
    { name: 'Nagpur',      slug: 'nagpur',      zone: 'Maharashtra' },
    { name: 'Jamshedpur',  slug: 'jamshedpur',  zone: 'Jharkhand' },
    { name: 'Mysore',      slug: 'mysore',      zone: 'Karnataka' },
    { name: 'Asansol',     slug: 'asansol',     zone: 'West Bengal' },
    { name: 'Dhanbad',     slug: 'dhanbad',     zone: 'Jharkhand' },
    { name: 'Siliguri',    slug: 'siliguri',    zone: 'West Bengal' },
  ];

  const featuredLinks = [
    { label: 'Bathroom Renovation', slug: 'bathroom-renovation' },
    { label: 'Bungalow Construction', slug: 'bungalow-construction' },
    { label: 'Modular Kitchen', slug: 'kitchen-work' },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 360;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-[#080D1A] border-t border-white/5 relative group">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="section-label">National Presence</div>
            <h2 className="font-display text-3xl lg:text-4xl text-white mt-4">
              Expanding Across <span className="text-gradient">Major Cities</span>
            </h2>
            <p className="text-slate-400 mt-4 text-sm leading-relaxed">
              AMS Civil Construction is now active in top metropolitan areas. We bring the same 
              Mumbai-quality civil expertise to Jharkhand, Karnataka, Goa, and West Bengal.
            </p>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex gap-3">
            <button onClick={() => scroll('left')}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-orange-500 hover:border-orange-500 transition-all shadow-lg active:scale-95">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-orange-500 hover:border-orange-500 transition-all shadow-lg active:scale-95">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div ref={scrollRef} className="flex overflow-x-auto pb-8 gap-4 sm:gap-6 no-scrollbar snap-x scroll-smooth px-4 sm:px-0">
          {topCities.map(city => (
            <div key={city.slug} 
                 className="flex-shrink-0 w-[calc(100vw-64px)] sm:w-[300px] lg:w-[280px] snap-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all group/card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover/card:bg-orange-500 group-hover/card:text-white transition-all duration-300">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="text-white font-bold group-hover/card:text-orange-400 transition-colors">{city.name}</h3>
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">{city.zone}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {featuredLinks.map(link => (
                  <Link key={`${city.slug}-${link.slug}`} 
                        href={`/areas/${city.slug}/${link.slug}`}
                        prefetch={false}
                        className="flex items-center justify-between text-[13px] text-slate-400 hover:text-orange-400 transition-colors group/link">
                    {link.label} 
                    <ArrowRight size={14} className="opacity-0 group-hover/card:opacity-100 -translate-x-2 group-hover/card:translate-x-0 transition-all duration-300" />
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-white/5 mt-2">
                  <Link href={`/areas/${city.slug}`} prefetch={false} className="inline-flex items-center gap-2 text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors">
                    Explore All Work in {city.name} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FAQ — Compact 2-Column Architectural Accordion
───────────────────────────────────────────────────────────── */
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  const leftFaqs = [
    {
      id: 0,
      question: 'How do you guarantee no cost overruns?',
      answer: 'Before beginning any work, we prepare an itemized Bill of Quantities (BOQ) with locked brand specifications and laser measurements. Unless you request additional architectural scope, you never pay a rupee more than agreed.',
    },
    {
      id: 1,
      question: 'What is your milestone payment schedule?',
      answer: 'Zero 100% upfront risk. You pay a nominal mobilization advance, and all subsequent payments are released stage-by-stage only after you and our engineer inspect and approve each milestone.',
    },
    {
      id: 2,
      question: 'How long does a flat or bungalow project take?',
      answer: 'A 1 BHK flat takes 25–30 days; 2 BHK takes 35–45 days; 3 BHK takes 45–60 days. Ground-up bungalows take 6–9 months. All contracts feature penalty-backed completion deadlines.',
    },
  ];

  const rightFaqs = [
    {
      id: 3,
      question: 'Which materials do you use for structural work?',
      answer: 'We use exclusively 100% factory-sealed ISI materials: UltraTech Grade 53 cement, Tata Tiscon Fe 550D TMT steel, Asian Paints Royale, Jaquar/Kohler CP fittings, Kajaria tiles, and Astral CPVC pipes.',
    },
    {
      id: 4,
      question: 'What does your 1-Year Workmanship Warranty cover?',
      answer: 'Our warranty covers tile debonding, plumbing leaks, electrical conduit faults, and plaster fissures. If any issue arises within 12 months, our maintenance engineers resolve it free within 48 hours.',
    },
    {
      id: 5,
      question: 'Do you assist with Society NOCs & permissions?',
      answer: 'Yes. For structural alterations or bungalow construction, we provide licensed structural stability certificates, MEP layouts, and architectural drawings required for municipal and society approvals.',
    },
  ];

  const toggle = (id: number) => setOpen(prev => (prev === id ? null : id));

  return (
    <section className="py-12 sm:py-16 bg-[#101827] border-t border-white/5 relative overflow-hidden">
      <div className="container-custom max-w-5xl mx-auto relative z-10">
        {/* Compact Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="section-label justify-center animate-on-scroll">Answers To Common Questions</div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-2 animate-on-scroll">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm animate-on-scroll">
            Quick clarity on pricing, timelines, material standards, and structural warranty.
          </p>
        </div>

        {/* Compact 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-8">
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            {leftFaqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-2xl overflow-hidden transition-all duration-300 animate-on-scroll"
                style={{
                  border: `1px solid ${open === faq.id ? '#F97316' : 'rgba(255,255,255,0.08)'}`,
                  background: open === faq.id ? 'rgba(249,115,22,0.04)' : '#0B1120',
                }}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between gap-3 p-4 sm:p-4.5 text-left group"
                >
                  <span
                    className="font-bold text-xs sm:text-sm transition-colors duration-150 leading-snug"
                    style={{ color: open === faq.id ? '#F97316' : '#E2E8F0' }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className="shrink-0 transition-transform duration-300"
                    style={{
                      color: open === faq.id ? '#F97316' : '#64748B',
                      transform: open === faq.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>

                <div
                  style={{
                    maxHeight: open === faq.id ? '220px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s cubic-bezier(0.4,0,0.2,1)',
                  }}
                >
                  <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 pt-0 border-t border-white/5">
                    <p className="text-slate-300 text-xs leading-relaxed mt-2.5">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            {rightFaqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-2xl overflow-hidden transition-all duration-300 animate-on-scroll"
                style={{
                  border: `1px solid ${open === faq.id ? '#F97316' : 'rgba(255,255,255,0.08)'}`,
                  background: open === faq.id ? 'rgba(249,115,22,0.04)' : '#0B1120',
                }}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between gap-3 p-4 sm:p-4.5 text-left group"
                >
                  <span
                    className="font-bold text-xs sm:text-sm transition-colors duration-150 leading-snug"
                    style={{ color: open === faq.id ? '#F97316' : '#E2E8F0' }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className="shrink-0 transition-transform duration-300"
                    style={{
                      color: open === faq.id ? '#F97316' : '#64748B',
                      transform: open === faq.id ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>

                <div
                  style={{
                    maxHeight: open === faq.id ? '220px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s cubic-bezier(0.4,0,0.2,1)',
                  }}
                >
                  <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 pt-0 border-t border-white/5">
                    <p className="text-slate-300 text-xs leading-relaxed mt-2.5">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compact WhatsApp Help Strip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 animate-on-scroll flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-white font-bold text-xs sm:text-sm">Have a unique structural or project query?</h4>
            <p className="text-slate-400 text-[11px] mt-0.5">Chat directly with our senior civil engineer on WhatsApp.</p>
          </div>
          <a
            href="https://wa.me/918779391690?text=Hi%20AMS%20Civil,%20I%20have%20a%20question%20regarding%20my%20civil%20work%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-all flex items-center gap-2 shrink-0 active:scale-95"
          >
            <WhatsAppLogo className="w-4 h-4 fill-current" />
            <span>Chat With Engineer</span>
          </a>
        </div>
      </div>
    </section>
  );
}
