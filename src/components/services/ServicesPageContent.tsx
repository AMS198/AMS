'use client';
// src/components/services/ServicesPageContent.tsx
// High-End Luxury UI for Services Page with Dynamic Category Filtering, Search, and Rich Cards

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, ArrowUpRight, CheckCircle, Search, Sparkles,
  Home, Bath, Grid3X3, ChefHat, Layers, Paintbrush, Wrench,
  Shield, Waves, Fence, Hammer, Building2, Dumbbell, Sofa, Bed,
  LayoutTemplate, Award, Clock, Users, MapPin, ChevronRight, Phone
} from 'lucide-react';
import { services } from '@/data/siteData';
import { openQuotePopup } from '@/components/ui/QuotePopup';
import ModernCTA from '@/components/ui/ModernCTA';
import { WhatsAppLogo } from '@/components/ui/BrandIcons';

// Comprehensive icon mapping for all 26 services
const iconMap: Record<string, React.ElementType> = {
  Home,
  LayoutTemplate,
  Waves,
  Fence,
  Hammer,
  Bath,
  Grid3X3,
  ChefHat,
  Layers,
  Sparkles,
  Paintbrush,
  Shield,
  Wrench,
  Building2,
  Dumbbell,
  Sofa,
  Bed,
};

// Categorization helper for clean filtering
const serviceCategories: Record<string, 'structural' | 'renovation' | 'interior' | 'finishing'> = {
  'bungalow-construction': 'structural',
  'swimming-pool-work': 'structural',
  'compound-wall-work': 'structural',
  'building-repair-work': 'structural',
  'wall-work': 'structural',
  'terrace-renovation': 'structural',
  'new-gym-construction': 'structural',
  'new-office-construction': 'structural',

  'bathroom-renovation': 'renovation',
  'kitchen-work': 'renovation',
  '1bhk-2bhk-renovation': 'renovation',
  '3bhk-4bhk-luxury-interiors': 'renovation',
  'gym-renovation': 'renovation',
  'office-renovation': 'renovation',

  'full-interior-work': 'interior',
  'modular-kitchen': 'interior',
  'simple-kitchen-work': 'interior',
  'hall-design': 'interior',
  'bedroom-remodeling': 'interior',
  'interior-design': 'interior',

  'tiles-work': 'finishing',
  'flooring-work': 'finishing',
  'pop-work': 'finishing',
  'plaster-work': 'finishing',
  'painting-work': 'finishing',
  'waterproofing': 'finishing',
};

const categoryTabs = [
  { id: 'all', label: 'All Services' },
  { id: 'structural', label: 'Bungalow & Structural' },
  { id: 'renovation', label: 'Home Renovation' },
  { id: 'interior', label: 'Interiors & Modular' },
  { id: 'finishing', label: 'Finishing & Civil' },
];

function getCategoryBadge(slug: string): string {
  const cat = serviceCategories[slug] || 'civil';
  switch (cat) {
    case 'structural': return 'Structural';
    case 'renovation': return 'Renovation';
    case 'interior':   return 'Interiors';
    case 'finishing':  return 'Finishing';
    default:           return 'Civil Work';
  }
}

function getServiceIcon(svc: typeof services[0]): React.ElementType {
  if (svc.slug.includes('gym')) return Dumbbell;
  if (svc.slug.includes('office')) return Building2;
  if (svc.slug.includes('bedroom')) return Bed;
  if (svc.slug.includes('hall')) return Sofa;
  if (svc.slug.includes('waterproofing')) return Shield;
  if (iconMap[svc.icon]) return iconMap[svc.icon];
  return Wrench;
}

export default function ServicesPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredServices = useMemo(() => {
    return services.filter((svc) => {
      const matchesCategory =
        selectedCategory === 'all' || serviceCategories[svc.slug] === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.benefits.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: 'Civil Construction & Renovation Services in Mumbai',
        description: 'Comprehensive list of civil construction services provided by AMS Civil Construction.',
        itemListElement: services.map((svc, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: svc.title,
          description: svc.description,
          url: `https://www.amscivilwork.in/services/${svc.slug}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amscivilwork.in' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.amscivilwork.in/services' },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── LUXURY HERO SECTION ─────────────────────────────────── */}
      <section className="relative pt-28 sm:pt-32 md:pt-36 pb-16 overflow-hidden bg-[#080D1A] border-b border-white/5">
        {/* Subtle background glow orbs */}
        <div 
          className="glow-orb w-[650px] h-[650px] opacity-15"
          style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)', top: '-15%', right: '-10%' }}
        />
        <div 
          className="glow-orb w-[450px] h-[450px] opacity-10"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)', bottom: '-10%', left: '-5%' }}
        />

        {/* Ambient Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(249,115,22,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.8) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative container-custom">
          {/* Top Bar: Breadcrumb + Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Link prefetch={false} href="/" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                <Home size={13} />
                Home
              </Link>
              <ChevronRight size={12} className="text-slate-600" />
              <span className="text-orange-400 font-semibold">Services</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] font-mono font-semibold tracking-wider uppercase">
              <Sparkles size={12} className="text-orange-500" />
              10+ Years Legacy • Mumbai & Thane
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6">
            Turnkey Civil Construction & <br className="hidden sm:inline" />
            <span className="text-gradient">Renovation Services</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 max-w-2xl text-base sm:text-lg leading-relaxed mb-10">
            Complete construction and interior civil engineering tailored for Mumbai homes, bungalows, and commercial spaces. 
            From ground-up RCC structures to luxury remodels — backed by guaranteed timelines and ISI-grade materials.
          </p>

          {/* 4 Trust Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
            {[
              { icon: Award, label: '10+ Years Experience', sub: 'Proven Track Record' },
              { icon: Shield, label: '100% Quality Guaranteed', sub: 'ISI Certified Materials' },
              { icon: Clock, label: 'Milestone Timelines', sub: 'Guaranteed Handover' },
              { icon: Users, label: 'In-House Artisans', sub: '50+ Skilled Experts' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 flex-shrink-0">
                  <stat.icon size={20} />
                </div>
                <div>
                  <h4 className="text-white text-xs sm:text-sm font-bold leading-tight">{stat.label}</h4>
                  <p className="text-slate-400 text-[11px] mt-0.5">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTER & SEARCH BAR ───────────────────────── */}
      <div className="relative z-20 bg-[#0B1120] border-b border-white/10 py-3.5 shadow-md">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Category Tabs (Smooth Horizontal Swipe) */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1 no-scrollbar">
            {categoryTabs.map((tab) => {
              const count =
                tab.id === 'all'
                  ? services.length
                  : services.filter((s) => serviceCategories[s.slug] === tab.id).length;
              const isActive = selectedCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 sm:gap-2 cursor-pointer flex-shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 font-bold'
                      : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {tab.label}
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-black/20 text-white' : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64 flex-shrink-0">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search 26+ services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#101827] border border-white/10 rounded-full pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── SERVICES GRID ───────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#080D1A]">
        <div className="container-custom">
          {/* Search / Filter Feedback */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
            <p className="text-slate-400 text-xs font-mono uppercase tracking-wider">
              Showing <span className="text-orange-400 font-bold">{filteredServices.length}</span> Services
              {selectedCategory !== 'all' && ` in ${categoryTabs.find((t) => t.id === selectedCategory)?.label}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
            {(selectedCategory !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="text-xs text-orange-400 hover:text-orange-300 underline font-medium cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-20 bg-[#0B1120] border border-white/10 rounded-2xl p-8">
              <div className="w-16 h-16 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center mx-auto mb-4">
                <Search size={28} />
              </div>
              <h3 className="text-white font-display text-xl font-bold mb-2">No services found</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                We couldn&apos;t find any service matching your search. Clear your filters or call our engineers directly for custom civil requirements.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="btn-primary text-xs px-6 py-2.5"
              >
                View All 26 Services
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((svc, index) => {
                const Icon = getServiceIcon(svc);
                const categoryBadge = getCategoryBadge(svc.slug);

                return (
                  <article
                    key={svc.id}
                    id={svc.slug}
                    className="group bg-[#0B1120] border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Card Image Block */}
                      <div className="relative h-56 w-full overflow-hidden bg-[#161F2E]">
                        <Image
                          src={svc.image}
                          alt={svc.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-90" />

                        {/* Top Badges */}
                        <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                          <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-slate-300 text-[10px] font-mono font-bold tracking-wider">
                            #{String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-orange-500/90 text-white text-[10px] font-bold tracking-wide uppercase shadow-md">
                            {categoryBadge}
                          </span>
                        </div>

                        {/* Service Icon Badge */}
                        <div className="absolute bottom-3 right-4 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/20">
                          <Icon size={22} />
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        <h2 className="text-xl font-display font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                          <Link prefetch={false} href={`/services/${svc.slug}`}>
                            {svc.title}
                          </Link>
                        </h2>

                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                          {svc.description}
                        </p>

                        {/* Benefits Preview */}
                        <div className="space-y-2.5 pt-4 border-t border-white/5">
                          <p className="text-[11px] font-mono text-orange-400 font-semibold uppercase tracking-wider mb-2">
                            Key Highlights:
                          </p>
                          {svc.benefits.slice(0, 3).map((b, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle size={14} className="text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-1">{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="p-6 pt-0 mt-4">
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <Link
                          prefetch={false}
                          href={`/services/${svc.slug}`}
                          className="px-3.5 py-2.5 rounded-lg bg-white/5 hover:bg-orange-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border border-white/10 hover:border-orange-500"
                        >
                          Details <ArrowUpRight size={14} />
                        </Link>
                        <button
                          onClick={() => openQuotePopup(svc.title)}
                          className="px-3.5 py-2.5 rounded-lg border border-orange-500/40 text-orange-400 hover:bg-orange-500 hover:text-white text-xs font-semibold transition-all"
                        >
                          Get Quote
                        </button>
                      </div>

                      <a
                        href={`https://wa.me/918779391690?text=${encodeURIComponent(
                          `Hi AMS Civil Team, I want to inquire about ${svc.title}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all"
                      >
                        <WhatsAppLogo className="w-3.5 h-3.5 fill-current" />
                        Chat on WhatsApp
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── LOCATIONS WE SERVE (SEO HUB) ────────────────────────── */}
      <section className="py-20 bg-[#0B1120] border-t border-white/5">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="section-label justify-center">Mumbai & Beyond</div>
            <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
              Local Civil Contractors Across <span className="text-gradient">40+ Areas</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We deploy our senior civil engineers and artisan teams across South Mumbai, Western Suburbs, Central Mumbai, Thane, and Navi Mumbai.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 justify-center">
            {[
              'Bandra', 'Andheri', 'Borivali', 'Juhu', 'Worli', 'Dadar', 'Khar', 'Santacruz',
              'Malad', 'Kandivali', 'Goregaon', 'Vile Parle', 'Thane', 'Vashi', 'Nerul',
              'Kharghar', 'Panvel', 'Powai', 'Chembur', 'Ghatkopar', 'Mulund', 'Kalyan',
              'Dombivli', 'Mira Road', 'Colaba', 'Lower Parel', 'Prabhadevi', 'Byculla'
            ].map((loc) => (
              <Link
                key={loc}
                prefetch={false}
                href={`/areas/${loc.toLowerCase().replace(' ', '-')}`}
                className="px-4 py-2 rounded-full text-xs font-medium text-slate-300 bg-white/5 border border-white/10 hover:border-orange-500 hover:text-white hover:bg-orange-500/10 transition-all flex items-center gap-1.5"
              >
                <MapPin size={12} className="text-orange-500" />
                {loc}
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              prefetch={false}
              href="/areas"
              className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300 tracking-wider uppercase transition-colors"
            >
              Explore All 90+ Service Locations <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CALL TO ACTION ───────────────────────────────── */}
      <ModernCTA
        title="Need Advice on Your Civil Construction Project?"
        subtitle="Book a free on-site visit with our senior civil engineer. We take measurements, discuss ideas, and provide an itemized quote with zero obligation."
        image="/images/cta-bg.jpg"
      />
    </>
  );
}
