'use client';
// src/app/about/page.tsx – Ultra-Professional Luxury About Us Page

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, Shield, Clock, Award, Users, CheckCircle, HardHat,
  ChevronRight, Sparkles, Building2, Star, ShieldCheck, HeartHandshake,
  Check, Phone, CalendarCheck, MapPin
} from 'lucide-react';
import { stats } from '@/data/siteData';
import { openQuotePopup } from '@/components/ui/QuotePopup';
import ModernCTA from '@/components/ui/ModernCTA';
import { WhatsAppLogo } from '@/components/ui/BrandIcons';

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
      { threshold: 0.1 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function AboutPage() {
  useScrollReveal();

  const values = [
    {
      icon: Shield,
      title: 'Uncompromising Quality',
      desc: 'We procure exclusively ISI-marked, certified raw materials — UltraTech Cement, TATA Tiscon steel, and premium Kajaria tiles. Zero low-grade substitutes.',
    },
    {
      icon: HeartHandshake,
      title: 'Radical Transparency',
      desc: 'Itemized, transparent quotation sheets with zero surprise fees. You receive a milestone billing schedule so you only pay as work is verified.',
    },
    {
      icon: Clock,
      title: 'Guaranteed Timelines',
      desc: 'Our senior project engineers schedule and manage work systematically, ensuring milestone handovers happen strictly on committed calendar dates.',
    },
    {
      icon: Users,
      title: 'In-House Master Artisans',
      desc: 'We never pass your home to third-party daily-wage subcontractors. Every artisan on your site is vetted, salaried, and trained under our senior leadership.',
    },
  ];

  const milestones = [
    { year: '2001', title: 'The Inception', desc: 'Started by Kedar Mandal with a dedicated team of master masons, committed to honest civil construction in Mumbai.' },
    { year: '2010', title: '100th Bungalow Milestone', desc: 'Recognized across Western Suburbs and South Mumbai for architectural precision and turnkey bungalow execution.' },
    { year: '2018', title: 'Turnkey Renovation & Waterproofing', desc: 'Introduced written 5-year warranties on structural repairs and leak-proof bathroom/terrace waterproofing.' },
    { year: '2026', title: '200+ Projects & Regional Reach', desc: 'Serving over 90+ locations across Maharashtra, Jharkhand, and West Bengal with a 4.9/5 client satisfaction rating.' },
  ];

  const leadership = {
    name: 'Kedar Mandal',
    role: 'Founder & Managing Director',
    exp: '10+ Years of Civil Construction Mastery',
    bio: 'With over a decade of hands-on field experience in civil construction and luxury interior engineering, Kedar Mandal founded AMS Civil Construction with a single mission: to eliminate contractor deception and deliver structures that endure for generations. Leading an elite team of 50+ master artisans and engineers, he personally oversees structural blueprints and milestone quality inspections for every project.',
    initials: 'KM',
    guarantees: [
      'Personally oversees high-load structural blueprints & RCC layouts',
      'Over 200+ residential and commercial projects successfully delivered',
      'Long-standing collaborations with premier architects and interior designers',
      'Direct, accessible communication for every client family',
    ],
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'AMS Civil Construction',
        url: 'https://www.amscivilwork.in',
        logo: 'https://www.amscivilwork.in/logo.png',
        founder: {
          '@type': 'Person',
          name: 'Kedar Mandal',
          jobTitle: 'Founder & Director',
        },
        foundingDate: '2001',
        description: 'Mumbai\'s leading civil construction contractor specializing in turnkey bungalows, complete home renovations, and structural engineering.',
        sameAs: [
          'https://share.google/v9ZNhSlXDECsz2p58',
          'https://www.indiamart.com/ams-civil-work/',
          'https://jsdl.in/DT-434YEUFG4BN',
          'https://www.facebook.com/profile.php?id=61570712849063',
          'https://www.instagram.com/amscivilwork/',
          'https://in.pinterest.com/amsconstructionwork/',
          'https://mumbaiconstructionhomerenovationguide.quora.com/',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amscivilwork.in' },
          { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://www.amscivilwork.in/about' },
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

        <div className="relative container-custom z-10">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold tracking-wider uppercase mb-6">
            <Sparkles size={12} className="text-orange-500" />
            <span>Building Mumbai With Integrity • 10+ Years Legacy</span>
          </div>

          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div>
              <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6">
                Engineering Trust, <br />
                Building <span className="text-gradient">Legacies</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
                Over the last 10+ years, AMS Civil Construction has grown into Mumbai’s most reputable 
                civil contracting team. We build luxury bungalows, renovate homes, and execute complex structural civil 
                engineering — backed by in-house craftsmanship, zero subcontracting, and written warranties.
              </p>

              {/* 4 Trust Metrics Pills */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <Award size={16} className="text-orange-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-white">10+ Yrs Industry Legacy</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <Star size={16} className="text-yellow-400 fill-yellow-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-white">4.9/5 Rating (140+ Reviews)</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <ShieldCheck size={16} className="text-emerald-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-white">100% Quality Assurance</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <Users size={16} className="text-blue-400 flex-shrink-0" />
                  <span className="text-xs font-bold text-white">50+ Full-Time Artisans</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={openQuotePopup}
                  className="btn-primary text-sm px-6 py-3.5 flex items-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20"
                >
                  <CalendarCheck size={16} /> Book Free Consultation
                </button>
                <Link
                  prefetch={false}
                  href="/projects"
                  className="btn-outline text-sm px-6 py-3.5 flex items-center gap-2"
                >
                  View Completed Projects <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#101827] group">
                <Image
                  src="/aboutpage.jpg"
                  alt="AMS Civil Construction Team and Projects in Mumbai"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-80" />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 p-3 sm:p-4 rounded-2xl bg-[#080D1A]/90 backdrop-blur-xl border border-white/15 shadow-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] sm:text-[10px] font-mono text-orange-400 uppercase tracking-widest font-bold truncate">
                        Mumbai &amp; Beyond
                      </p>
                      <p className="text-white text-xs sm:text-sm font-bold tracking-tight truncate">
                        200+ Landmark Projects Handled
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] sm:text-xs font-bold whitespace-nowrap shadow-md shrink-0">
                    10+ Years Legacy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LUXURY STATS SECTION (Replacing Harsh Solid Amber Bar) ── */}
      <section className="py-12 bg-[#050914] border-b border-white/5">
        <div className="container-custom grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: '10+', label: 'Years of Civil Mastery', sub: 'Proven Track Record' },
            { value: '200+', label: 'Projects Completed', sub: 'Bungalows & Renovations' },
            { value: '50+', label: 'In-House Artisans', sub: 'Zero Subcontracting' },
            { value: '100%', label: 'On-Time Milestone Rate', sub: 'Backed by Warranty' },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#0B1120] border border-white/5 hover:border-orange-500/30 transition-all text-center group"
            >
              <div className="font-display font-black text-4xl sm:text-5xl text-gradient mb-1 group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-white text-sm font-bold mt-1">{stat.label}</div>
              <div className="text-slate-500 text-xs mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── OUR STORY & JOURNEY TIMELINE ────────────────────────── */}
      <section className="py-20 bg-[#0B1120] border-b border-white/5">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="section-label justify-center">Our Evolution</div>
            <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
              A 25-Year Journey of <span className="text-gradient">Civil Craftsmanship</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              From building foundational walls to luxury bungalows and high-rises, here is how AMS Civil became Mumbai’s trusted partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0E1626] border border-white/10 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-display font-black text-orange-400">
                      {m.year}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center font-mono text-xs font-bold">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-white text-base font-bold mb-2 group-hover:text-orange-400 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                  <Check size={14} /> Milestone Achieved
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR 4 CORE VALUES (Why Choose Us) ────────────────────── */}
      <section className="py-20 bg-[#080D1A] border-b border-white/5">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="section-label justify-center">The AMS Philosophy</div>
            <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
              The Four Pillars That <span className="text-gradient">Define Our Work</span>
            </h2>
            <p className="text-slate-400 text-sm">
              We hold ourselves to standards that most contracting agencies overlook.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="p-7 rounded-2xl bg-[#0B1120] border border-white/10 hover:border-orange-500/40 transition-all flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mb-5 group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-orange-400 transition-colors">
                    {title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXECUTIVE LEADERSHIP (Kedar Mandal) ──────────────────── */}
      <section className="py-20 bg-[#0B1120] border-b border-white/5">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="section-label justify-center">Executive Leadership</div>
            <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
              The Visionary Behind <span className="text-gradient">AMS Civil Construction</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#0E1626] border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
              {/* Leader Avatar / Portrait */}
              <div className="flex-shrink-0 text-center">
                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl md:rounded-3xl overflow-hidden border-2 border-orange-500/50 shadow-2xl shadow-orange-500/20 ring-4 ring-orange-500/10 mx-auto group">
                  <Image
                    src="/images/director-kedar-mandal.jpg"
                    alt={`${leadership.name} - ${leadership.role}`}
                    fill
                    sizes="(max-width: 768px) 144px, 176px"
                    priority
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider mt-3.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Verified Director</span>
                </div>
              </div>

              {/* Bio & Credentials */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 mb-3 justify-center md:justify-start">
                  <h3 className="text-white font-display text-2xl sm:text-3xl font-bold">
                    {leadership.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-orange-400 font-mono text-xs font-semibold">
                    {leadership.role}
                  </span>
                </div>

                <p className="text-orange-400/90 font-mono text-xs font-bold uppercase tracking-wider mb-4">
                  {leadership.exp}
                </p>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {leadership.bio}
                </p>

                {/* Key Pillars */}
                <div className="space-y-2.5 pt-4 border-t border-white/5 text-left mb-6">
                  {leadership.guarantees.map((g, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle size={15} className="text-orange-500 flex-shrink-0" />
                      <span>{g}</span>
                    </div>
                  ))}
                </div>

                {/* Contact Links */}
                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                  <button
                    onClick={openQuotePopup}
                    className="btn-primary text-xs px-5 py-2.5 cursor-pointer flex items-center gap-2"
                  >
                    Consult with Kedar Mandal <ArrowRight size={14} />
                  </button>
                  <a
                    href="https://wa.me/918779391690?text=Hi%20Kedar%20ji,%20I%20am%20interested%20in%20discussing%20a%20construction%20project%20with%20AMS%20Civil."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center gap-2 transition-all"
                  >
                    <WhatsAppLogo className="w-3.5 h-3.5 fill-current" />
                    Direct WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR GUARANTEE TO MUMBAI HOMEOWNERS ──────────────────── */}
      <section className="py-14 sm:py-20 bg-[#080D1A] border-b border-white/5 relative overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
            <div className="section-label mx-auto">Client Protections</div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mt-3 mb-3">
              Our 100% Written <span className="text-gradient">Contract Guarantees</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
              We treat every home build with the care, security, and financial transparency of a legally binding family contract.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              {
                num: '01',
                icon: CalendarCheck,
                title: 'Milestone-Based Payments',
                desc: 'Pay strictly in stage-wise installments only after work is verified on site. Zero upfront bulk advances required.',
                pill: '0% Advance Risk • Verified Stages',
              },
              {
                num: '02',
                icon: ShieldCheck,
                title: 'Material & Workmanship Warranty',
                desc: 'Written 1-year legal workmanship warranty on civil execution, plus official manufacturer brand warranties on materials (UltraTech, Dr. Fixit, Asian Paints) as applicable.',
                pill: 'Applicable Material & Workmanship Warranty',
              },
              {
                num: '03',
                icon: Award,
                title: 'Zero Material Downgrades',
                desc: 'Only genuine ISI-certified materials (TATA Tiscon, UltraTech, Kajaria) directly delivered and inspected on your site with zero compromise.',
                pill: '100% Genuine Branded Materials',
              },
            ].map((cert, i) => {
              const Icon = cert.icon;
              return (
                <div
                  key={i}
                  className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#111928] via-[#0E1626] to-[#0A101D] border border-white/10 hover:border-orange-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Subtle corner glow */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-orange-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-orange-500/10 transition-colors" />

                  <div>
                    {/* Card Top: Icon + Number badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all shadow-sm">
                        <Icon size={20} />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-orange-400/80 transition-colors">
                        {cert.num}
                      </span>
                    </div>

                    <h3 className="text-white font-bold text-base sm:text-lg mb-2 group-hover:text-orange-300 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                      {cert.desc}
                    </p>
                  </div>

                  {/* Micro-guarantee Pill */}
                  <div className="pt-3.5 border-t border-white/10 flex items-center">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-medium tracking-wide">
                      <CheckCircle size={13} className="text-emerald-400 shrink-0" />
                      <span>{cert.pill}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CALL TO ACTION ───────────────────────────────── */}
      <ModernCTA
        title="Inspired by Our Journey? Let's Build Your Dream Project."
        subtitle="Schedule a free on-site visit with our senior engineering team across Mumbai, Thane, and Navi Mumbai."
        image="/images/cta-bg.jpg"
      />
    </>
  );
}
