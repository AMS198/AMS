'use client';
// src/app/packages/page.tsx
// Ultra-Professional Civil & Renovation Packages Page.
// Solves:
// 1. Grid stretching bug: Replaced inline accordion with a luxury Scope Modal so cards maintain uniform height with zero empty voids.
// 2. Pricing & Detailing clarity: Inclusions (pure civil labor) vs Exclusions (materials, carpentry, appliances, windows) are 100% crystal clear.
// 3. Compact FAQs: Replaced oversized wide accordion with sleek, compact max-w-2xl single-active accordion.

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle, XCircle, Sparkles, Home, Star,
  Clock, Ruler, IndianRupee, Phone, Shield, Award, Users, Zap,
  Building2, Sun, AlertCircle, ClipboardList, X, Check, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { packages } from '@/data/packagesData';
import type { PackageData } from '@/data/packagesData';
import { openQuotePopup } from '@/components/ui/QuotePopup';
import { WhatsAppLogo } from '@/components/ui/BrandIcons';
import ModernCTA from '@/components/ui/ModernCTA';

const iconMap: Record<string, React.ElementType> = {
  Home, Sparkles, Sun, Building2,
};

/* ── Uniform Package Card (NO Grid Stretching) ───────────────────── */
function PackageCard({
  pkg,
  index,
  onOpenScope,
}: {
  pkg: PackageData;
  index: number;
  onOpenScope: (pkg: PackageData) => void;
}) {
  const Icon = iconMap[pkg.icon] || Home;

  const whatsappMessage = encodeURIComponent(
    `Hi Kedar ji, I am inquiring about the ${pkg.title} package. I understand rates are indicative for civil labor only. I would like to schedule a site inspection for my property.`
  );
  const whatsappUrl = `https://wa.me/918779391690?text=${whatsappMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className={`relative rounded-3xl border overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(249,115,22,0.12)] flex flex-col justify-between group h-full ${
        pkg.popular
          ? 'border-orange-500/40 bg-gradient-to-b from-orange-500/5 via-[#101827] to-[#101827]'
          : 'border-[#1E2D45] bg-[#101827]'
      }`}
    >
      {/* Popular Badge */}
      {pkg.popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-600 to-orange-500 text-white text-[10px] font-mono font-bold px-3.5 py-1.5 rounded-bl-2xl shadow-lg z-10 flex items-center gap-1 uppercase tracking-wider">
          <Star size={11} className="fill-current" /> Most Requested
        </div>
      )}

      <div className="p-6 sm:p-7 flex flex-col flex-grow">
        {/* Header */}
        <div className="flex items-start gap-3.5 mb-5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              pkg.popular
                ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.35)]'
                : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
            }`}
          >
            <Icon size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-display leading-tight">{pkg.title}</h3>
            <p className="text-[11px] text-orange-400/90 font-mono uppercase tracking-wider mt-0.5">{pkg.subtitle}</p>
          </div>
        </div>

        {/* Pricing Box */}
        <div className="mb-5 p-4 rounded-2xl bg-[#0B1120] border border-white/5">
          <div className="flex flex-wrap items-baseline gap-2 mb-1">
            <span className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
              {pkg.priceRange}
            </span>
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
              Approx. Labor Estimate
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <span className="flex items-center gap-1"><Ruler size={12} className="text-orange-400" /> {pkg.sqftRange}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock size={12} className="text-orange-400" /> {pkg.duration}</span>
          </div>

          {/* Pricing Disclaimer */}
          <div className="pt-2.5 border-t border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
              <AlertCircle size={13} className="shrink-0 text-amber-400" />
              <span>Civil Labor Only • Material Not Included</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              *Rate is <strong className="text-slate-200">NOT fixed</strong>. Final quotation prepared after physical site inspection. Materials are client scope or billed at actuals.
            </p>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="space-y-2 mb-6 flex-grow">
          {pkg.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle size={14} className="text-orange-400 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-300 leading-snug">{h}</span>
            </div>
          ))}
        </div>

        {/* Trigger Scope Modal Button */}
        <button
          type="button"
          onClick={() => onOpenScope(pkg)}
          className="w-full py-2.5 px-3 rounded-xl bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm group-hover:border-orange-500/60"
        >
          <ClipboardList size={14} />
          <span>View Scope &amp; Inclusions/Exclusions</span>
        </button>
      </div>

      {/* Action Buttons Footer */}
      <div className="p-6 sm:p-7 pt-0 space-y-2.5">
        <button
          type="button"
          onClick={() => openQuotePopup(pkg.title)}
          className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
            pkg.popular
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25 hover:shadow-orange-500/40'
              : 'bg-white/5 hover:bg-orange-500 text-slate-200 hover:text-white border border-white/10'
          }`}
        >
          <span>Request Free Site Quote</span>
          <ArrowRight size={14} />
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <WhatsAppLogo className="w-3.5 h-3.5 fill-current" />
          <span>Discuss on WhatsApp</span>
        </a>
      </div>
    </motion.div>
  );
}

/* ── Scope Details Modal (Zero Grid Distortion) ──────────────────── */
function ScopeModal({
  pkg,
  onClose,
}: {
  pkg: PackageData | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (pkg) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pkg, onClose]);

  if (!pkg) return null;

  const whatsappMessage = encodeURIComponent(
    `Hi Kedar ji, I am reviewing the civil scope for "${pkg.title}" (${pkg.priceRange}). I understand rates are for civil labor only. I would like to schedule a site inspection for my property.`
  );
  const whatsappUrl = `https://wa.me/918779391690?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#0E1626] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-start justify-between gap-4 bg-[#0A101D]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-mono font-semibold uppercase tracking-wider mb-2">
              <Sparkles size={11} /> Complete Civil Scope &amp; Breakdown
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              {pkg.title} <span className="text-slate-400 text-sm font-normal">({pkg.sqftRange})</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{pkg.subtitle}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Price & Status Callout */}
          <div className="p-4 rounded-2xl bg-[#080D1A] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs text-slate-400 font-mono uppercase">Indicative Labor Rate</div>
              <div className="text-2xl sm:text-3xl font-black text-white font-display">{pkg.priceRange}</div>
              <div className="text-[11px] text-amber-400 font-semibold mt-0.5">
                *Approximate starting estimate • Final BOQ after site visit
              </div>
            </div>
            <div className="text-right sm:text-right text-xs text-slate-400 space-y-1">
              <div>Estimated Duration: <strong className="text-white">{pkg.duration}</strong></div>
              <div>Typical Carpet Area: <strong className="text-white">{pkg.sqftRange}</strong></div>
            </div>
          </div>

          {/* Pricing & Material Clarity Alert */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-slate-300 leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <AlertCircle size={14} className="shrink-0" />
              <span>Important Clarity on Rates &amp; Materials</span>
            </div>
            <p className="text-[11px] text-slate-300">
              1. <strong>Price Is NOT Fixed:</strong> Rates vary by property condition, wall dampness, structural age, and actual floor layout.
            </p>
            <p className="text-[11px] text-slate-300">
              2. <strong>Materials NOT Included:</strong> Rates cover <strong>civil labor &amp; master workmanship only</strong>. Raw materials (cement, sand) and finishing materials (tiles, paint, sanitaryware) are client scope or billed at actual wholesale market bills.
            </p>
          </div>

          {/* Inclusions vs Exclusions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* INCLUSIONS */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-emerald-500/20 space-y-3">
              <div className="flex flex-col gap-0.5 pb-2 border-b border-white/5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <CheckCircle size={14} />
                  <span>Civil Work Included (Labor Only):</span>
                </div>
                <span className="text-[10px] text-emerald-400/80 font-mono">
                  *Sirf Mistri / Fitting Mazdoori — Material Alag Se
                </span>
              </div>
              <ul className="space-y-2">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* EXCLUSIONS */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-red-500/20 space-y-3">
              <div className="flex flex-col gap-0.5 pb-2 border-b border-white/5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-400">
                  <XCircle size={14} />
                  <span>Material &amp; Woodwork Excluded:</span>
                </div>
                <span className="text-[10px] text-red-400/80 font-mono">
                  *Tiles, Paint, Cement, Sanitary Client Layega
                </span>
              </div>
              <ul className="space-y-2">
                {pkg.exclusions.map((ex, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <X size={13} className="text-red-400 shrink-0 mt-0.5" />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-400 leading-relaxed">
            <strong className="text-white block mb-1">Execution Note:</strong>
            {pkg.description}
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0A101D] flex flex-col sm:flex-row items-center justify-end gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <WhatsAppLogo className="w-3.5 h-3.5 fill-current" />
            <span>Discuss on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => {
              onClose();
              openQuotePopup(pkg.title);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Request Site Inspection</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page Component ────────────────────────────────────────── */
export default function PackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);

  return (
    <main className="min-h-screen bg-[#080D1A]">
      {/* Scope Details Modal */}
      <ScopeModal
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
      />

      {/* ── HERO SECTION ─────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-14 overflow-hidden border-b border-white/5 bg-[#080D1A]">
        {/* Ambient Glow */}
        <div
          className="glow-orb w-[600px] h-[600px] opacity-15"
          style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)', top: '-15%', right: '-10%' }}
        />
        <div
          className="glow-orb w-[450px] h-[450px] opacity-10"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)', bottom: '-10%', left: '-5%' }}
        />

        <div className="relative z-10 container-custom">
          {/* Breadcrumb */}
          <nav className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 mb-6">
            <Link prefetch={false} href="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-orange-400 font-semibold">Packages</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider mb-5">
              <Sparkles size={13} /> Pure Civil &amp; Labor Workmanship Contract
            </div>

            <h1 className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-5">
              Renovation &amp; Construction <span className="text-gradient">Civil Packages</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
              Explore baseline labor &amp; civil execution estimates for 1BHK, 2BHK, 3BHK flats, terrace additions, and luxury bungalows across Mumbai, Thane, and Navi Mumbai.
            </p>

            {/* ── PROMINENT PRICING & MATERIAL TRANSPARENCY NOTICE ── */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0B1120] border-2 border-amber-500/40 shadow-xl max-w-3xl mb-8">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm sm:text-base mb-3">
                <AlertCircle size={18} className="shrink-0 text-amber-400" />
                <span>Important Pricing &amp; Material Notice</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs text-slate-300 leading-relaxed">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>Rates Are NOT Fixed:</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Every property is unique. All numbers shown below are approximate starting estimates. Final quotation is issued strictly after on-site measurement &amp; structural analysis.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>Materials Are NOT Included:</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Rates cover <strong className="text-white">civil labor &amp; workmanship only</strong>. Cement, sand, tiles, marble, sanitaryware &amp; paint can be supplied by client directly or procured at actual trade bills without markup.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-orange-400" />
                <span>1-Year Legal Workmanship Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={16} className="text-orange-400" />
                <span>10+ Years Civil Legacy</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-orange-400" />
                <span>100% In-House Payroll Masons</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGES SHOWCASE GRID ──────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#0B1120]">
        <div className="container-custom">
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400 mb-2 block">
              Uniform Civil Workmanship Packages
            </span>
            <h2 className="font-display font-black text-white text-2xl sm:text-3xl lg:text-4xl mb-3">
              Civil Workmanship <span className="text-gradient">Packages</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Click &quot;View Scope &amp; Inclusions/Exclusions&quot; on any card to view the complete civil checklist, exclusions, and specifications in detail.
            </p>
          </div>

          {/* Uniform Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {packages.map((pkg, i) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                index={i}
                onOpenScope={(p) => setSelectedPackage(p)}
              />
            ))}
          </div>

          {/* Bottom Footnote Notice */}
          <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center max-w-3xl mx-auto">
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-white">Note:</strong> Package estimates reflect labor and civil execution ONLY and do NOT include raw materials (cement, sand, bricks) or finishing materials (tiles, marble, paint, sanitaryware). Rates vary depending on structural age, floor level, and exact site conditions. A detailed, line-item BOQ is provided post on-site inspection.{' '}
              <button
                type="button"
                onClick={() => openQuotePopup('Packages Inquiry')}
                className="text-orange-400 hover:underline font-bold cursor-pointer"
              >
                Schedule your site inspection today.
              </button>
            </p>
          </div>
        </div>
      </section>

      {/* ── 3-PILLAR TRANSPARENCY PROTOCOL ──────────────────── */}
      <section className="py-12 bg-[#080D1A] border-t border-white/5">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-display font-bold text-white text-xl sm:text-2xl mb-2">
              Why We Separate <span className="text-gradient">Labor &amp; Material Costs</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              We practice 100% transparency so you never overpay for inflated contractor material bills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                <Users size={20} />
              </div>
              <h4 className="text-white font-bold text-sm">1. You Choose Your Brands</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Whether you want Kajaria or Italian marble, Asian Paints Royale or Jaquar fittings — you have 100% freedom to purchase whatever fits your taste and budget.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                <IndianRupee size={20} />
              </div>
              <h4 className="text-white font-bold text-sm">2. Zero Contractor Markup</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Contractors often charge 20–30% hidden profit on materials. With AMS Civil, you pay wholesale distributor prices directly, with original GST bills.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                <Ruler size={20} />
              </div>
              <h4 className="text-white font-bold text-sm">3. Exact Itemized BOQ</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                No vague lump-sum quotes. Every square foot of plaster, tile laying, and plumbing point is calculated in writing before work begins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIMPLE 4-STEP PROCESS ───────────────────────────── */}
      <section className="py-12 bg-[#0B1120] border-t border-white/5">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400 mb-1 block">
              Clear Roadmap
            </span>
            <h3 className="font-display font-black text-white text-2xl sm:text-3xl mb-2">
              How Site Quotation <span className="text-gradient">Works</span>
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                icon: Phone,
                title: 'Initial Consultation',
                desc: 'Call or WhatsApp us your basic flat configuration, area, and vision.',
              },
              {
                step: '02',
                icon: Home,
                title: 'On-Site Inspection',
                desc: 'Senior civil engineer inspects plaster strength, dampness, plumbing lines & takes laser measurements.',
              },
              {
                step: '03',
                icon: IndianRupee,
                title: 'Line-Item BOQ Quote',
                desc: 'You receive an itemized civil labor estimate within 24 hours with exact milestone breakdowns.',
              },
              {
                step: '04',
                icon: Zap,
                title: 'Master Execution',
                desc: 'Work begins with our permanent master masons, daily progress updates, and strict timeline adherence.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-orange-500/30 transition-all group"
              >
                <div className="text-5xl font-black font-display text-white/5 absolute top-3 right-4 group-hover:text-orange-500/10 transition-colors">
                  {item.step}
                </div>
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-3 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <item.icon size={20} />
                </div>
                <h4 className="text-white font-bold text-base mb-1.5">{item.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPACT LUXURY FAQS ─────────────────────────────── */}
      <section className="py-10 sm:py-12 bg-[#080D1A] border-t border-white/5">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-6">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-orange-400 mb-1 block">
              Quick Clarifications
            </span>
            <h3 className="font-display font-black text-white text-xl sm:text-2xl mb-1.5">
              Package &amp; Pricing <span className="text-gradient">FAQs</span>
            </h3>
            <p className="text-slate-400 text-xs">
              Direct answers regarding civil labor scope, non-fixed pricing, and material procurement.
            </p>
          </div>

          <PackagesFAQAccordion />
        </div>
      </section>

      {/* ── HIGH-CONVERTING BOTTOM CTA ──────────────────────────── */}
      <ModernCTA
        title="Ready for an Accurate Site Measurement?"
        subtitle="Book a complimentary on-site measurement with our senior civil engineer. We provide a customized line-item BOQ with zero obligation."
      />
    </main>
  );
}

/* ── Compact Sleek FAQ Accordion Component ───────────────────────── */
function PackagesFAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Kya in packages ka price fixed hai? (Are these prices fixed?)',
      a: 'Nahi, yeh prices fixed nahi hain. Yeh baseline starting labor estimates hain. Har property ka carpet area, puraani deewaron ki halat, aur structural changes alag hote hain. Senior civil engineer site visit karke exact measurements ke hisaab se detailed BOQ banate hain.',
    },
    {
      q: 'Kya in packages me material ka cost included hai? (Are materials included?)',
      a: 'Bilkul nahi. Yeh saare rates sirf CIVIL WORK & LABOR (Mazdoori) ke hain. Cement, sand, tiles, marble, sanitaryware, pipes, aur paint client khud purchase kar sakte hain, ya hum actual wholesale trade bills par arrange kar dete hain bina kisi commission markup ke.',
    },
    {
      q: 'Agar hume material bhi aapke through chahiye toh?',
      a: 'Aap hamare wholesale distributor network se direct billing par material le sakte hain. Hum original GST invoice aapko dete hain, jisse aapko market se 10–15% better discount milta hai aur zero contractor profit add hota hai.',
    },
    {
      q: 'Kya carpentry (modular kitchen / furniture) is rate me aayega?',
      a: 'Nahi. Yeh civil contract hai jisme flooring, platform, bathroom plumbing, waterproofing, painting, aur POP ceiling aati hai. Wooden modular kitchen cabinets, wardrobes, aur loose furniture alag carpentry scope hota hai jiska quote alag banta hai.',
    },
    {
      q: 'Workmanship par kya warranty milti hai?',
      a: 'Hum sabhi civil execution, tile fixing, aur structural plastering par 1-year formal legal written warranty dete hain. Waterproofing par 5-year written guarantee rehti hai.',
    },
  ];

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => {
        const isOpen = openIdx === i;
        return (
          <div
            key={i}
            className={`rounded-xl transition-all duration-200 overflow-hidden border ${
              isOpen
                ? 'bg-[#101827] border-orange-500/40 shadow-md'
                : 'bg-[#0B1120] border-white/5 hover:border-white/15'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-3 p-3.5 sm:p-4 text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3 pr-2">
                <span
                  className={`w-6 h-6 rounded-md flex items-center justify-center font-mono font-bold text-[11px] shrink-0 transition-colors ${
                    isOpen
                      ? 'bg-orange-500 text-white'
                      : 'bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20'
                  }`}
                >
                  0{i + 1}
                </span>
                <span
                  className={`font-semibold text-xs sm:text-sm leading-snug transition-colors ${
                    isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}
                >
                  {faq.q}
                </span>
              </div>

              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                  isOpen
                    ? 'bg-orange-500/20 text-orange-400 rotate-180'
                    : 'bg-white/5 text-slate-400 group-hover:text-white'
                }`}
              >
                <ChevronDown size={14} />
              </div>
            </button>

            <div
              style={{
                maxHeight: isOpen ? '220px' : '0px',
                opacity: isOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.3s ease, opacity 0.2s ease',
              }}
            >
              <div className="px-4 pb-3.5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5 pl-12">
                {faq.a}
              </div>
            </div>
          </div>
        );
      })}

      {/* Compact WhatsApp ask strip */}
      <div className="mt-5 p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
        <div className="text-[11px] text-slate-400">
          <span className="text-white font-semibold">Still have a question?</span> Talk to our senior civil engineer on WhatsApp.
        </div>
        <a
          href="https://wa.me/918779391690?text=Hi%20AMS%20Civil,%20I%20have%20a%20question%20regarding%20packages%20and%20rates."
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 text-[11px] font-bold transition-all flex items-center gap-1.5 shrink-0"
        >
          <WhatsAppLogo className="w-3 h-3 fill-current" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
