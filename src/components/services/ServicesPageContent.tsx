'use client';
// src/components/services/ServicesPageContent.tsx
// Client-side content for the services page (extracted from page.tsx for metadata support)

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle,
  Home, Bath, Grid3X3, ChefHat, Layers, Paintbrush, Sparkles, Wrench,
} from 'lucide-react';
import { services } from '@/data/siteData';
import { openQuotePopup } from '@/components/ui/QuotePopup';
import ModernCTA from '@/components/ui/ModernCTA';
import { WhatsAppLogo } from '@/components/ui/BrandIcons';

const iconMap: Record<string, React.ElementType> = {
  Home, Bath, Grid3X3, ChefHat, Layers, Paintbrush, Sparkles, Wrench,
};

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function ServicesPageContent() {
  useScrollReveal();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: 'Construction & Interior Services in Mumbai',
        description: 'Comprehensive list of civil construction services provided by AMS Civil Construction.',
        itemListElement: services.map((svc, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: svc.title,
          description: svc.description,
          url: `https://www.amscivilwork.in/services#${svc.slug}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amscivilwork.in' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.amscivilwork.in/services' },
        ],
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"
            alt="Services"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/80 to-brand-charcoal" />
        </div>
        <div className="relative container-custom">
          <div className="section-label animate-fadeIn">What We Offer</div>
          <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl mt-3 animate-fadeUp">
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="text-brand-smoke mt-4 max-w-xl animate-fadeIn">
            Complete construction and interior services tailored for Mumbai homes.
            Every service is backed by our quality guarantee.
          </p>
          <nav className="flex items-center gap-2 mt-4 text-brand-smoke text-sm animate-fadeIn">
            <Link href="/" className="hover:text-brand-amber transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-amber">Services</span>
          </nav>
        </div>
      </section>

      {/* ── QUICK NAV ───────────────────────────────────────────── */}
      <div className="bg-brand-steel border-b border-brand-iron overflow-x-auto">
        <div className="container-custom flex gap-1 py-3 min-w-max sm:min-w-0 flex-wrap">
          {services.map((svc) => {
            const Icon = iconMap[svc.icon] ?? Wrench;
            return (
              <a
                key={svc.slug}
                href={`#${svc.slug}`}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-brand-smoke
                           hover:text-brand-amber hover:bg-brand-iron/30 transition-all duration-150
                           whitespace-nowrap uppercase tracking-wide"
              >
                <Icon size={13} />
                {svc.title}
              </a>
            );
          })}
        </div>
      </div>

      {/* ── SERVICE SECTIONS ────────────────────────────────────── */}
      <div className="bg-brand-charcoal">
        {services.map((svc, index) => {
          const Icon = iconMap[svc.icon] ?? Wrench;
          const isEven = index % 2 === 0;

          return (
            <section
              key={svc.id}
              id={svc.slug}
              className={`section-y ${isEven ? 'bg-brand-charcoal' : 'bg-brand-steel'}`}
            >
              <div className="container-custom">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center
                  ${!isEven ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  {/* Text block */}
                  <div>
                    {/* Icon + service number */}
                    <div className="flex items-center gap-4 mb-6 animate-on-scroll">
                      <div className="w-14 h-14 bg-brand-amber flex items-center justify-center flex-shrink-0">
                        <Icon size={26} className="text-brand-charcoal" />
                      </div>
                      <div>
                        <span className="text-brand-amber text-xs font-mono tracking-widest">
                          SERVICE {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    <h2 className="font-display font-bold text-white text-3xl lg:text-4xl mb-4 animate-on-scroll hover:text-brand-amber transition-colors">
                      <Link href={`/services/${svc.slug}`}>{svc.title}</Link>
                    </h2>
                    <p className="text-brand-smoke leading-relaxed mb-8 animate-on-scroll">
                      {svc.description}
                    </p>
 
                    {/* Benefits */}
                    <div className="mb-8 animate-on-scroll">
                      <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
                        Key Benefits
                      </h3>
                      <ul className="flex flex-col gap-3">
                        {svc.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-3">
                            <CheckCircle size={16} className="text-brand-amber mt-0.5 flex-shrink-0" />
                            <span className="text-brand-smoke text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
 
                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3 animate-on-scroll">
                      <Link href={`/services/${svc.slug}`} className="btn-primary text-xs px-5 py-2.5 flex items-center gap-1.5">
                        Detailed Service Page <ArrowRight size={14} />
                      </Link>
                      <button onClick={() => openQuotePopup(svc.title)} className="btn-outline text-xs px-4 py-2.5">
                        Quick Estimate
                      </button>
                      <div className="flex gap-2">
                        <a href="https://wa.me/918779391690" target="_blank" rel="noopener noreferrer"
                          className="btn-outline text-xs px-4 py-2.5 flex items-center gap-1.5 group">
                          <WhatsAppLogo className="w-4 h-4 fill-[#F97316] group-hover:fill-current" />
                          Consultation
                        </a>
                      </div>
                    </div>
                  </div>
 
                  {/* Image block */}
                  <div className="relative animate-on-scroll">
                    <Link href={`/services/${svc.slug}`} className="block relative h-[400px] lg:h-[500px] overflow-hidden group">
                      <Image
                        src={svc.image}
                        alt={svc.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Amber accent corner */}
                      <div className={`absolute ${isEven ? 'bottom-0 right-0' : 'bottom-0 left-0'} w-16 h-16 bg-brand-amber`} />
                    </Link>
                    {/* Service name tag */}
                    <div className={`absolute top-6 ${isEven ? '-right-4' : '-left-4'} bg-brand-charcoal border border-brand-amber/40 px-4 py-2`}>
                      <span className="text-brand-amber text-xs font-mono">{svc.title}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── SERVICE AREAS SEO HUB ────────────────────────────────── */}
      <section className="section-y bg-brand-charcoal border-t border-brand-iron">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="section-label justify-center">Locations We Serve</div>
            <h2 className="font-display text-3xl lg:text-5xl text-white mb-6">
              Expert Civil Work Across <span className="text-gradient">Mumbai & Thane</span>
            </h2>
            <p className="text-brand-smoke">
              Providing professional construction and renovation services in over 40+ locations. 
              Click on your area to find specific services near you.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              'Borivali', 'Andheri', 'Bandra', 'Kandivali', 'Malad', 'Thane', 
              'Dadar', 'Worli', 'Mira Road', 'Vashi', 'Nerul', 'Kalyan',
              'Panvel', 'Goregaon', 'Santacruz', 'Vile Parle', 'Juhu', 'Powai',
              'Mulund', 'Ghatkopar', 'Chembur', 'Kurla', 'Sion', 'Parel',
              'Colaba', 'Churchgate', 'Tardeo', 'Mahim', 'Matunga', 'Byculla'
            ].map((loc) => (
              <Link 
                key={loc} 
                href={`/areas/${loc.toLowerCase().replace(' ', '-')}`}
                className="px-4 py-2 text-[10px] sm:text-xs font-semibold text-brand-smoke border border-brand-iron hover:border-brand-amber hover:text-brand-amber transition-all text-center uppercase tracking-widest bg-brand-iron/10"
              >
                {loc}
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/areas" className="text-brand-amber text-sm font-bold flex items-center justify-center gap-2 hover:gap-3 transition-all">
              VIEW ALL SERVICE AREAS <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────────────────── */}
      <ModernCTA 
        title="Not Sure Which Service You Need?"
        subtitle="Our experts will assess your requirements and recommend the best solutions for your budget. Consultation is always free."
        image="/images/cta-bg.png"
      />
    </>
  );
}
