'use client';

// src/components/ui/ModernCTA.tsx
// High-Impact, Compact Architectural Call-To-Action component.
// Used across Homepage, Services, Packages, About, Partner, and Area landing pages.

import Image from 'next/image';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Sparkles,
  Award,
  Clock,
  HardHat,
  BadgeCheck
} from 'lucide-react';
import { openQuotePopup } from '@/components/ui/QuotePopup';
import { WhatsAppLogo } from './BrandIcons';

interface ModernCTAProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
}

export default function ModernCTA({
  title = "Ready to Build Your Dream Space?",
  subtitle = "Premium Turnkey Construction, Bungalow Builds & Luxury Renovations in Mumbai.",
  description = "AMS Civil Construction brings 10+ years of trusted engineering expertise to your residential or commercial project. From RCC structural frameworks to bespoke Italian modular kitchens and luxury marble flooring, we guarantee ISI-grade materials, transparent itemised pricing, and direct engineer supervision.",
  image = "/images/cta-bg.png"
}: ModernCTAProps) {
  // Extract location if present in title (e.g. "Ready to Build in Bandra?")
  const locationTag = title.includes(' in ')
    ? title.split(' in ').pop()?.replace('?', '').trim()
    : 'Mumbai, Thane & Navi Mumbai';

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden bg-[#070B14] border-t border-white/5">
      {/* Background Architectural Canvas with Multi-layer Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={image}
          alt="Luxury Construction & Civil Architecture by AMS Civil"
          fill
          className="object-cover opacity-15 filter saturate-50"
          sizes="100vw"
        />
        {/* Layered overlays to blend into deep dark navy */}
        <div className="absolute inset-0 bg-[#070B14]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B14] via-[#070B14]/85 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0B1120] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#070B14] to-transparent" />

        {/* Ambient Radial Glows */}
        <div
          className="absolute top-1/4 left-10 w-72 h-72 rounded-full opacity-20 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-10 right-10 w-72 h-72 rounded-full opacity-10 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative container-custom z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* ── LEFT COLUMN: HEADLINE & ACTIONS ──────────────────────── */}
          <div className="lg:col-span-7">
            {/* Architectural Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] font-semibold mb-4 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <Sparkles size={12} className="text-orange-400" />
              <span className="tracking-wide">
                Verified Civil Contractor • {locationTag}
              </span>
            </div>

            {/* Dynamic Master Headline — Compact & Balanced */}
            <h2 className="font-display font-black text-white text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-[1.2] mb-3">
              {title.includes('?') ? (
                <>
                  {title.replace('?', '')}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200">
                    Together?
                  </span>
                </>
              ) : (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                  {title}
                </span>
              )}
            </h2>

            {/* Subtitle */}
            <p className="text-amber-300/90 text-xs sm:text-sm font-medium mb-3 leading-relaxed">
              {subtitle}
            </p>

            {/* Detailed Description */}
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-2xl border-l-2 border-orange-500/40 pl-3.5">
              {description}
            </p>

            {/* High-Converting Action Row */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
              {/* Primary Consultation Button */}
              <button
                type="button"
                onClick={openQuotePopup}
                className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-orange-500/20 transition-all duration-200 hover:scale-[1.01] active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Get Free Consultation</span>
                <ArrowRight size={15} />
              </button>

              {/* Direct WhatsApp Estimate */}
              <a
                href={`https://wa.me/918779391690?text=${encodeURIComponent(
                  `Hi AMS Civil Construction, I am interested in getting a detailed quotation for my project: "${title}".`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-green-500/20 transition-all duration-200 hover:scale-[1.01] active:scale-95"
              >
                <WhatsAppLogo className="w-4 h-4 fill-current" />
                <span>WhatsApp Estimate</span>
              </a>

              {/* Phone Direct */}
              <a
                href="tel:+918779391690"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 sm:py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs sm:text-sm tracking-wide border border-white/10 transition-colors"
              >
                <Phone size={14} className="text-orange-400" />
                <span className="font-mono text-xs">+91 87793 91690</span>
              </a>
            </div>

            {/* Quick Guarantees Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-[11px] text-slate-400 font-medium pt-3.5 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                <span>100% Free Site Visit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                <span>Transparent Itemised Quotation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                <span>Zero Hidden Escalations</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: SPECIFICATION & ASSURANCE CARD ──────────── */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#121B2F]/95 via-[#0D1525]/95 to-[#070D18]/95 border border-white/10 p-5 sm:p-6 shadow-xl backdrop-blur-2xl">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">The AMS Quality Standard</h3>
                    <p className="text-[10px] text-slate-400">Senior Engineer Supervised Sites</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono font-bold uppercase tracking-wider">
                  ISO Verified
                </span>
              </div>

              {/* 4 Architectural Cornerstones */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-orange-500/20 transition-colors">
                  <Award size={16} className="text-orange-400 mb-1" />
                  <div className="text-white font-bold text-xs sm:text-sm">10+ Years</div>
                  <div className="text-slate-400 text-[9px] uppercase tracking-wider font-semibold">Proven Legacy</div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-orange-500/20 transition-colors">
                  <BadgeCheck size={16} className="text-amber-400 mb-1" />
                  <div className="text-white font-bold text-xs sm:text-sm">ISI Materials</div>
                  <div className="text-slate-400 text-[9px] uppercase tracking-wider font-semibold">Tata &amp; Ultratech</div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-orange-500/20 transition-colors">
                  <Clock size={16} className="text-blue-400 mb-1" />
                  <div className="text-white font-bold text-xs sm:text-sm">On-Schedule</div>
                  <div className="text-slate-400 text-[9px] uppercase tracking-wider font-semibold">Milestone Delivery</div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-orange-500/20 transition-colors">
                  <HardHat size={16} className="text-emerald-400 mb-1" />
                  <div className="text-white font-bold text-xs sm:text-sm">50+ Artisans</div>
                  <div className="text-slate-400 text-[9px] uppercase tracking-wider font-semibold">Master Craftsmen</div>
                </div>
              </div>

              {/* Founder Commitment Badge */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20">
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="text-white text-[11px] font-bold leading-tight mb-0.5">
                      Personal Founder Supervision
                    </h4>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Every site undergoes regular quality inspections led by Founder Kedar Mandal and our senior structural engineering team.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Need immediate consultation?</span>
                <a
                  href="tel:+918779391690"
                  className="text-orange-400 hover:text-orange-300 font-bold transition-colors"
                >
                  Call +91 87793 91690 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
