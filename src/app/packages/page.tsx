'use client';
// src/app/packages/page.tsx
// Premium Packages page — shows all renovation/construction packages with pricing, EMI, features

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle, XCircle, Sparkles, Home, Star,
  Clock, Ruler, IndianRupee, Calculator, Phone, ChevronDown, ChevronUp,
  Shield, Award, Users, Zap, Building2, Sun, AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { packages, formatINR } from '@/data/packagesData';
import type { PackageData } from '@/data/packagesData';
import { openQuotePopup } from '@/components/ui/QuotePopup';
import { WhatsAppLogo } from '@/components/ui/BrandIcons';
import ModernCTA from '@/components/ui/ModernCTA';

const iconMap: Record<string, React.ElementType> = {
  Home, Sparkles, Sun, Building2,
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

/* ── Package Card ───────────────────────────────────────────────── */
function PackageCard({ pkg, index }: { pkg: PackageData; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = iconMap[pkg.icon] || Home;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`relative rounded-3xl border overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(249,115,22,0.15)] group ${
        pkg.popular
          ? 'border-orange-500/40 bg-gradient-to-b from-orange-500/5 to-[#101827]'
          : 'border-[#1E2D45] bg-[#101827]'
      }`}
    >
      {/* Popular Badge */}
      {pkg.popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-600 to-orange-500 text-white text-xs font-bold px-6 py-2 rounded-bl-2xl shadow-lg z-10">
          <Star size={12} className="inline mr-1" /> MOST POPULAR
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
            pkg.popular
              ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]'
              : 'bg-orange-500/10 text-orange-500'
          }`}>
            <Icon size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-display">{pkg.title}</h3>
            <p className="text-sm text-slate-400">{pkg.subtitle}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-black text-white font-display">{pkg.priceRange}</span>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Ruler size={12} /> {pkg.sqftRange}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {pkg.duration}</span>
          </div>
          <p className="text-[10px] text-white font-bold mt-3 leading-relaxed border-t border-[#1E2D45] pt-2">
            *Final quotation will be decided after meeting or completely analyzing the structure and requirement.
          </p>
        </div>

        {/* Highlights */}
        <div className="space-y-2 mb-6">
          {pkg.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle size={16} className="text-orange-500 shrink-0 mt-0.5" />
              <span className="text-sm text-slate-300">{h}</span>
            </div>
          ))}
        </div>

        {/* Features (Expandable) */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 font-semibold mb-4 transition-colors"
        >
          {expanded ? 'Hide Details' : 'See What\'s Included'}
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 mb-6 border-t border-[#1E2D45] pt-4">
                {pkg.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    {f.included ? (
                      <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={14} className="text-slate-600 shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${f.included ? 'text-slate-300' : 'text-slate-600 line-through'}`}>
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed border-l-2 border-orange-500/30 pl-4">
                {pkg.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={openQuotePopup}
            className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
              pkg.popular
                ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]'
                : 'bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500 hover:text-white'
            }`}
          >
            Get Free Quote <ArrowRight size={16} />
          </button>

          <div className="flex gap-3">
            <a
              href={`https://wa.me/918779391690?text=${encodeURIComponent(`Hi! I'm interested in the ${pkg.title} package (${pkg.priceRange}). Please share more details.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider border border-green-500/20 text-green-400 hover:bg-green-500 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <WhatsAppLogo className="w-4 h-4 fill-current" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Page ──────────────────────────────────────────────────── */
export default function PackagesPage() {
  useScrollReveal();

  return (
    <main className="min-h-screen bg-[#080D1A]">
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-white/5">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03]"
               style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        </div>

        <div className="relative z-10 container-custom">
          <nav className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs text-slate-400 mb-8 animate-fadeIn">
            <Link prefetch={false} href="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <ArrowRight size={10} className="opacity-50" />
            <span className="text-orange-400 font-medium">Packages</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold uppercase tracking-widest mb-6 animate-fadeUp">
              <IndianRupee size={14} /> Transparent Pricing
            </div>
            <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-7xl leading-[1.1] mb-6 animate-fadeUp">
              Complete Home <span className="text-gradient">Packages</span>
            </h1>
            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl animate-fadeUp" style={{ animationDelay: '100ms' }}>
              From 1BHK flats to luxury bungalows — choose a transparent renovation package. 
              No hidden costs. <strong className="text-white">Site visit fee (₹500-₹1000) may be applicable.</strong>
            </p>
            
            <div className="mt-6 inline-flex items-start sm:items-center gap-3 p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 max-w-2xl animate-fadeUp" style={{ animationDelay: '150ms' }}>
              <AlertCircle size={20} className="text-orange-500 shrink-0 mt-0.5 sm:mt-0" />
              <p className="text-sm text-orange-400 font-medium">
                * Note: The rates shown below are for <strong className="text-orange-300">civil work and labor only</strong>. They do NOT include the cost of materials.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 mt-10 animate-fadeUp" style={{ animationDelay: '200ms' }}>
            {[
              { icon: Shield, label: 'Zero Hidden Costs' },
              { icon: Award, label: '25+ Years Trust' },
              { icon: Users, label: '500+ Happy Families' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                <s.icon size={16} className="text-orange-500" />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Packages Grid ────────────────────────────────── */}
      <section className="section-y bg-[#0B1120]">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="section-label justify-center">Choose Your Package</p>
            <h2 className="font-display font-black text-white text-3xl sm:text-4xl lg:text-5xl mb-4">
              Renovation & Construction <span className="text-gradient">Packages</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Every package includes a detailed quotation and a dedicated project manager. 
              Prices shown are starting estimates for <strong className="text-white">labor and civil work only</strong> (materials are extra) and depend on your specific requirements. (Site visit fee may apply).
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <p className="text-xs text-slate-500 leading-relaxed max-w-3xl mx-auto">
              <strong className="text-slate-400">Note:</strong> Prices shown are starting estimates for labor and civil execution ONLY and do NOT include the cost of materials (tiles, cement, paint, etc.). Rates may vary based on 
              site condition, location, and specific requirements. Final pricing is provided after a 
              site inspection. All packages include our standard 1-year workmanship warranty. GST extra as applicable.
              For customized packages, please{' '}
              <button onClick={openQuotePopup} className="text-orange-400 hover:underline font-semibold">
                request a free quote
              </button>.
            </p>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section className="section-y bg-[#080D1A] border-t border-white/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="section-label justify-center">Simple Process</p>
            <h2 className="font-display font-black text-white text-3xl sm:text-4xl lg:text-5xl mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                icon: Phone,
                title: 'Free Consultation',
                desc: 'Call us or fill the form. Our team discusses your requirements and budget over phone.',
              },
              {
                step: '02',
                icon: Home,
                title: 'Site Visit',
                desc: 'Our senior engineer visits your property, takes measurements, and understands your vision. (Fee of ₹500-₹1000 may be applicable, adjustable in final bill).',
              },
              {
                step: '03',
                icon: IndianRupee,
                title: 'Detailed Quote',
                desc: 'You receive an itemized quotation within 24 hours — zero hidden costs, 100% transparency.',
              },
              {
                step: '04',
                icon: Zap,
                title: 'Work Begins',
                desc: 'After approval, our skilled team starts execution with a dedicated project manager for updates.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all group"
              >
                <div className="text-6xl font-black font-display text-orange-500/10 absolute top-4 right-6 group-hover:text-orange-500/20 transition-colors">
                  {item.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <item.icon size={24} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ─────────────────────────────── */}
      <section className="section-y bg-[#0B1120] border-t border-white/5">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="section-label justify-center">Why AMS Civil</p>
            <h2 className="font-display font-black text-white text-3xl sm:text-4xl mb-4">
              AMS Civil vs <span className="text-gradient">Local Contractors</span>
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#1E2D45]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#101827] border-b border-[#1E2D45]">
                  <th className="text-left p-4 text-slate-400 font-bold uppercase tracking-wider text-xs">Feature</th>
                  <th className="text-center p-4 text-orange-400 font-bold uppercase tracking-wider text-xs">AMS Civil ⭐</th>
                  <th className="text-center p-4 text-slate-500 font-bold uppercase tracking-wider text-xs">Local Contractors</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Transparent Pricing', '100% itemized quote', 'Vague estimates'],
                  ['Materials', 'ISI certified (UltraTech, TATA)', 'Often compromise quality'],
                  ['Warranty', '1-year workmanship warranty', 'No formal warranty'],
                  ['Supervision', 'Senior civil engineer', 'Unsupervised labor'],
                  ['Timeline', 'Milestone tracking, on-time', 'Frequent delays'],
                  ['Hidden Costs', 'Zero hidden charges', 'Common cost overruns'],
                  ['After-Sales', '6-month free support', 'No support after work'],
                ].map(([feature, ams, local], i) => (
                  <tr key={i} className="border-b border-[#1E2D45]/50 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-slate-300 font-medium">{feature}</td>
                    <td className="p-4 text-center text-green-400 font-semibold">
                      <CheckCircle size={14} className="inline mr-1" /> {ams}
                    </td>
                    <td className="p-4 text-center text-slate-500">
                      <XCircle size={14} className="inline mr-1" /> {local}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ──────────────────────────────────── */}
      <section className="section-y bg-[#080D1A] border-t border-white/5">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <p className="section-label justify-center">FAQs</p>
            <h2 className="font-display font-black text-white text-3xl sm:text-4xl mb-4">
              Package <span className="text-gradient">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Are these exact prices or estimates?',
                a: 'These are starting estimates. Exact pricing depends on your flat size, material choices, site condition, and specific requirements. We provide a detailed, itemized quote after a site visit (fee ₹500-₹1000 may apply, adjustable in final bill) — no hidden costs.',
              },
              {
                q: 'Can I customize a package?',
                a: 'Absolutely! Every package can be customized. Want to upgrade the kitchen but keep basic flooring? No problem. We create a tailored quote based on your exact needs and budget.',
              },
              {
                q: 'What warranty do you provide?',
                a: 'We provide a 1-year workmanship warranty on all civil work. Waterproofing comes with a 5-year guarantee. Material warranties are as per manufacturer terms.',
              },
              {
                q: 'How do I get started?',
                a: 'Simply click "Get Free Quote" on any package, or call us at +91 87793 91690. Our engineer will visit your property, discuss your requirements, and provide a detailed quotation within 24 hours. (A site visit fee of ₹500-₹1000 may apply, adjustable against the final bill).',
              },
              {
                q: 'Kya renovation ke liye ghar khali karna padta hai?',
                a: 'Nahi, zaruri nahi hai. Hum room-by-room renovation karte hain. Aap ek room mein reh sakte hain jab hum dusre room mein kaam karte hain. Hum dust-free process follow karte hain.',
              },
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <ModernCTA
        title="Ready to Pick Your Package?"
        subtitle="Get a site visit and detailed quotation within 24 hours (Site visit fee may apply)."
        description="AMS Civil Construction offers transparent, package-based pricing for all home renovation and construction needs in Mumbai. From 1BHK smart renovations to luxury bungalow construction, we deliver premium results at honest prices. No middlemen, no hidden costs — just quality work by experienced professionals."
      />
    </main>
  );
}

/* ── FAQ Item ──────────────────────────────────────────────────── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#1E2D45] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-white font-semibold pr-4">{question}</span>
        <ChevronDown size={18} className={`text-orange-500 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-slate-400 text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
