'use client';
// src/app/partner/page.tsx
// Ultra-Professional B2B Partnership Page for Architects, Interior Designers & Real Estate Developers.
// Seamlessly aligned with the luxury dark architectural brand identity (#080D1A, orange/amber gradients, crisp typography).

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  Handshake, CheckCircle2, ShieldCheck, Clock, Users, Zap,
  Building2, ArrowRight, Phone, Sparkles, ChevronDown, Check,
  Layers, FileText, Compass, Award, ShieldAlert, BadgeCheck
} from 'lucide-react';
import ModernCTA from '@/components/ui/ModernCTA';
import { WhatsAppLogo } from '@/components/ui/BrandIcons';

interface PartnerFormData {
  name: string;
  firmName: string;
  location: string;
  phone: string;
  email: string;
  profession: string;
  message?: string;
  websiteUrl?: string; // honeypot
}

export default function PartnerPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<PartnerFormData>();

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: PartnerFormData) => {
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          service: `B2B Partner Connect (${data.profession || 'Architect/Designer'}) - ${data.firmName || 'Studio'}`,
          address: data.location || 'Mumbai Studio',
          message: `Firm: ${data.firmName} | Profession: ${data.profession} | Details: ${data.message || 'No additional note'}`,
          websiteUrl: data.websiteUrl || '',
        }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setSubmitted(true);
      toast.success('Partnership inquiry received! Our senior engineer will connect with you within 24 hours.');
      reset();
    } catch {
      toast.error('Something went wrong. Please call us directly at +91 87793 91690.');
    }
  };

  return (
    <main className="min-h-screen bg-[#080D1A]">
      {/* ── LUXURY ARCHITECTURAL HERO ─────────────────────────────── */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-14 overflow-hidden border-b border-white/5 bg-[#080D1A]">
        {/* Glow ambient orbs */}
        <div
          className="glow-orb w-[650px] h-[650px] opacity-15"
          style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)', top: '-15%', right: '-10%' }}
        />
        <div
          className="glow-orb w-[450px] h-[450px] opacity-10"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)', bottom: '-10%', left: '-5%' }}
        />

        <div className="relative z-10 container-custom">
          {/* Breadcrumb + Verified Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Link prefetch={false} href="/" className="hover:text-orange-400 transition-colors">Home</Link>
              <span className="text-slate-600">/</span>
              <span className="text-orange-400 font-semibold">Partner Program</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] font-mono font-semibold tracking-wider uppercase">
              <Handshake size={12} className="text-orange-500" />
              <span>B2B Studio Collaboration • Mumbai, Thane &amp; Navi Mumbai</span>
            </div>
          </div>

          <div className="max-w-3xl">
            <h1 className="font-display font-black text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] mb-5">
              Architectural Vision, <span className="text-gradient">Civil Precision</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-8">
              You craft inspiring blueprints, luxury aesthetics, and client trust. AMS Civil Construction delivers the flawless on-site structural engineering, master masonry, and millimeter-accurate civil execution under your studio brand.
            </p>

            {/* 3 Key B2B Metrics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-display font-black text-orange-400">35+</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Design Studios</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-display font-black text-orange-400">100%</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Drawing Fidelity</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-display font-black text-orange-400">Zero</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Client Poaching (NDA)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 B2B PARTNERSHIP PILLARS ─────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#0B1120] border-b border-white/5">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-orange-400 mb-1 block">
              Why Top Studios Choose AMS Civil
            </span>
            <h2 className="font-display font-black text-white text-2xl sm:text-3xl lg:text-4xl mb-2">
              The Engineering Backbone for <span className="text-gradient">Creative Minds</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              We bridge the gap between creative AutoCAD drawings and real-world Mumbai on-site execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mb-3.5">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-white font-bold text-base mb-1.5">100% White-Label (Strict NDA)</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Your client remains 100% your client. We work as your extended civil execution arm with complete NDA protection and zero direct solicitation.
                </p>
              </div>
              <div className="pt-3.5 mt-3.5 border-t border-white/5 text-[11px] font-mono text-orange-400 font-semibold">
                ✓ Formal NDA Protection
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mb-3.5">
                  <Compass size={20} />
                </div>
                <h3 className="text-white font-bold text-base mb-1.5">Millimeter Drawing Fidelity</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Our civil engineers decode complex AutoCAD, 3D, and structural drawings down to the millimeter. Zero guesswork and zero on-site compromise.
                </p>
              </div>
              <div className="pt-3.5 mt-3.5 border-t border-white/5 text-[11px] font-mono text-orange-400 font-semibold">
                ✓ 3D &amp; AutoCAD Proficient
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mb-3.5">
                  <Clock size={20} />
                </div>
                <h3 className="text-white font-bold text-base mb-1.5">Milestone Gantt Handover</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Weekly milestone progress updates, video inspections, and strict adherence to handover schedules so your carpenter and client are never delayed.
                </p>
              </div>
              <div className="pt-3.5 mt-3.5 border-t border-white/5 text-[11px] font-mono text-orange-400 font-semibold">
                ✓ Milestone Gantt Schedules
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mb-3.5">
                  <Users size={20} />
                </div>
                <h3 className="text-white font-bold text-base mb-1.5">50+ Permanent Artisans</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Zero daily-wage casual subcontractors. Our permanent payroll master masons, plumbers, and artisans guarantee luxury finishing on every slab and joint.
                </p>
              </div>
              <div className="pt-3.5 mt-3.5 border-t border-white/5 text-[11px] font-mono text-orange-400 font-semibold">
                ✓ 100% Payroll Master Artisans
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 COLLABORATION MODELS ─────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#080D1A] border-b border-white/5">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-orange-400 mb-1 block">
              Flexible Engagement
            </span>
            <h2 className="font-display font-black text-white text-2xl sm:text-3xl lg:text-4xl mb-2">
              How We Work With <span className="text-gradient">Your Studio</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Choose the operational model that best fits your design practice and client requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Model 1 */}
            <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10 hover:border-orange-500/40 transition-all space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 font-mono text-[10px] font-bold uppercase">
                Model A
              </div>
              <h3 className="text-white font-bold text-lg">Pure Civil Labor (Workmanship Contract)</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Your studio or client supplies all materials (tiles, paint, sanitaryware, pipes). AMS Civil deploys permanent master masons, plumbers, and supervisors to execute complete civil work with 100% precision.
              </p>
              <ul className="space-y-2 pt-2 border-t border-white/5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-emerald-400 shrink-0" />
                  <span>Demolition, masonry, plaster &amp; debris</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-emerald-400 shrink-0" />
                  <span>Precision tiling &amp; Italian marble laying</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-emerald-400 shrink-0" />
                  <span>Concealed plumbing &amp; electrical chipping</span>
                </li>
              </ul>
            </div>

            {/* Model 2 */}
            <div className="p-6 rounded-2xl bg-[#0B1120] border-2 border-orange-500/30 hover:border-orange-500 transition-all space-y-4 relative shadow-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500 text-white font-mono text-[10px] font-bold uppercase shadow-sm">
                Model B • Most Popular
              </div>
              <h3 className="text-white font-bold text-lg">Turnkey Civil Shell &amp; Execution</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                We handle both labor and ISI structural materials (UltraTech cement, Tata Tiscon steel, Finolex plumbing). Your studio retains full control over visible finishes while we take complete responsibility for structural integrity.
              </p>
              <ul className="space-y-2 pt-2 border-t border-white/5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-emerald-400 shrink-0" />
                  <span>100% itemized line-item BOQ (Zero escalations)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-emerald-400 shrink-0" />
                  <span>ISI-certified structural procurement</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-emerald-400 shrink-0" />
                  <span>1-Year written warranty certificate for client</span>
                </li>
              </ul>
            </div>

            {/* Model 3 */}
            <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/10 hover:border-orange-500/40 transition-all space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 font-mono text-[10px] font-bold uppercase">
                Model C
              </div>
              <h3 className="text-white font-bold text-lg">Heavy Structural Overhauls &amp; Villas</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                For expansive bungalows, terrace floors, RCC column modifications, and structural restorations requiring heavy civil engineering calculations, soil tests, and certified safety compliance.
              </p>
              <ul className="space-y-2 pt-2 border-t border-white/5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-emerald-400 shrink-0" />
                  <span>Column jacketing &amp; beam strengthening</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-emerald-400 shrink-0" />
                  <span>Ground-up RCC villa &amp; bungalow framing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-emerald-400 shrink-0" />
                  <span>Terrace living additions &amp; pool RCC casting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPLIT SECTION: STUDIO COMMITMENT & CONNECT FORM ────────── */}
      <section className="py-12 sm:py-16 bg-[#0B1120]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Direct Founder Commitment & Studio Hotlines */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-orange-400 mb-1 block">
                  Direct Line To Leadership
                </span>
                <h2 className="font-display font-black text-white text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3">
                  Let&apos;s Build an Enduring <span className="text-gradient">Partnership</span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Every partner studio is assigned a dedicated senior structural engineer. Furthermore, Founder Kedar Mandal conducts weekly physical site quality audits to ensure complete alignment with your vision.
                </p>
              </div>

              {/* Founder Commitment Card */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-sm">
                    KM
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Kedar Mandal</h4>
                    <p className="text-[11px] text-orange-400 font-mono">Founder &amp; Master Civil Engineer</p>
                  </div>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed italic border-l-2 border-orange-500/40 pl-3">
                  &ldquo;We treat your design with the utmost reverence. Our masons and engineers take pride in making your physical build look even better than the 3D render.&rdquo;
                </p>
              </div>

              {/* Fast Direct Action Links */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
                <div className="text-slate-400 font-medium">Have an immediate drawing for review?</div>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  <a
                    href="https://wa.me/918779391690?text=Hi%20Kedar%20ji,%20I%20am%20an%20architect/designer.%20I%20would%20like%20to%20discuss%20a%20project%20collaboration."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 font-bold transition-all flex items-center gap-1.5"
                  >
                    <WhatsAppLogo className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp Drawings</span>
                  </a>
                  <a
                    href="tel:+918779391690"
                    className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold transition-all flex items-center gap-1.5"
                  >
                    <Phone size={13} className="text-orange-400" />
                    <span>+91 87793 91690</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: High-Converting Studio Connect Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-[#101827] border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <div>
                    <h3 className="font-display font-bold text-white text-lg sm:text-xl">
                      Register Your Design Studio
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Schedule a studio meeting or request a line-item BOQ for an upcoming site.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Fast 24h Response
                  </span>
                </div>

                {submitted ? (
                  <div className="py-10 text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-white font-bold text-lg font-display">Inquiry Registered Successfully!</h4>
                    <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                      Thank you for connecting. Founder Kedar Mandal and our senior civil engineer will reach out to schedule an introductory meeting at your studio or site.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-xs font-bold text-orange-400 hover:text-orange-300 underline cursor-pointer"
                    >
                      Submit Another Project Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Honeypot field for bot protection */}
                    <input type="text" {...register('websiteUrl')} className="hidden" tabIndex={-1} autoComplete="off" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 text-xs font-medium mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ar. Sneha Patel"
                          {...register('name', { required: true })}
                          className="w-full bg-[#080D1A] border border-white/10 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 text-xs focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 text-xs font-medium mb-1">Studio / Firm Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Atelier Design Studio"
                          {...register('firmName', { required: true })}
                          className="w-full bg-[#080D1A] border border-white/10 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 text-xs focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-slate-300 text-xs font-medium mb-1">WhatsApp Phone *</label>
                        <input
                          type="tel"
                          required
                          placeholder="10-digit number"
                          {...register('phone', { required: true })}
                          className="w-full bg-[#080D1A] border border-white/10 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 text-xs focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 text-xs font-medium mb-1">Official Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="you@studio.com"
                          {...register('email', { required: true })}
                          className="w-full bg-[#080D1A] border border-white/10 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 text-xs focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 text-xs font-medium mb-1">Studio Location *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Bandra / Worli / BKC"
                          {...register('location', { required: true })}
                          className="w-full bg-[#080D1A] border border-white/10 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-600 text-xs focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 text-xs font-medium mb-1">Primary Discipline</label>
                      <select
                        {...register('profession')}
                        className="w-full bg-[#080D1A] border border-white/10 focus:border-orange-500 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none transition-colors"
                      >
                        <option value="Architect">Architectural Studio</option>
                        <option value="Interior Designer">Interior Design Practice</option>
                        <option value="Turnkey Contractor / Builder">Developer / Builder</option>
                        <option value="Project Management Consultant (PMC)">Project Management Consultant (PMC)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 text-xs font-medium mb-1">Upcoming Project Scope / Notes (Optional)</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your upcoming project (e.g. 4BHK renovation in Worli, bungalow in Juhu, commercial civil work)..."
                        {...register('message')}
                        className="w-full bg-[#080D1A] border border-white/10 focus:border-orange-500 rounded-xl px-3.5 py-2 text-white placeholder:text-slate-600 text-xs focus:outline-none resize-none transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Registering Studio...' : 'Connect With Engineering Team'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── B2B PARTNER FAQS ───────────────────────────────────────── */}
      <section className="py-10 sm:py-12 bg-[#080D1A] border-t border-white/5">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-6">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-orange-400 mb-1 block">
              Studio Collaboration FAQs
            </span>
            <h3 className="font-display font-black text-white text-xl sm:text-2xl mb-1.5">
              Partnership <span className="text-gradient">Questions &amp; Protocols</span>
            </h3>
            <p className="text-slate-400 text-xs">
              Direct clarity on confidentiality, site management, and project execution.
            </p>
          </div>

          <PartnerFAQAccordion />
        </div>
      </section>

      {/* ── HIGH-CONVERTING BOTTOM CTA ──────────────────────────── */}
      <ModernCTA
        title="Looking for a Reliable Civil Execution Partner?"
        subtitle="Schedule an introductory meeting with our founder at your design studio or upcoming site."
        description="We respect your designs, your deadlines, and your client relationships. Partnering with AMS Civil ensures your vision is executed with zero compromise, verified safety, and transparent line-item BOQs."
      />
    </main>
  );
}

/* ── Compact B2B FAQ Accordion ───────────────────────────────────── */
function PartnerFAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Do you sign Non-Disclosure Agreements (NDAs) to protect our designs?',
      a: 'Yes, unconditionally. We sign formal B2B Non-Disclosure Agreements before reviewing confidential floor plans and architectural CAD layouts. Your proprietary design concepts and client identity remain 100% confidential.',
    },
    {
      q: 'Can our studio provide materials, or do you handle procurement?',
      a: 'We offer complete flexibility. Under Model A (Pure Labor), your studio or client provides all tiles, paint, sanitaryware, and marble, while we provide master workmanship. Under Model B (Turnkey), we procure structural ISI materials directly from manufacturers at wholesale trade rates with original GST invoices.',
    },
    {
      q: 'Who manages the day-to-day site coordination?',
      a: 'Every partner project is assigned a dedicated senior civil engineer who acts as your direct on-site representative. You receive daily WhatsApp photo logs, weekly Gantt milestone updates, and zero calls regarding minor labor issues.',
    },
    {
      q: 'What happens if there is an on-site discrepancy with the drawings?',
      a: 'We follow a strict "Measure Twice, Cut Once" protocol. If our laser measurement scans detect site variations against CAD drawings, our engineer immediately alerts your design team with exact laser photos before breaking any masonry or pouring concrete.',
    },
    {
      q: 'How are payments and billing structured for partner projects?',
      a: 'We operate on transparent milestone-locked billing. Advance mobilization is followed by clear stage completions (e.g., Demolition completion, Plumbing/Electrical concealed line approval, Tiling inspection). No payment is released without your written engineer sign-off.',
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
                maxHeight: isOpen ? '240px' : '0px',
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

      {/* Direct Architect WhatsApp Contact */}
      <div className="mt-5 p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
        <div className="text-[11px] text-slate-400">
          <span className="text-white font-semibold">Need an urgent feasibility review?</span> Connect directly with Founder Kedar Mandal.
        </div>
        <a
          href="https://wa.me/918779391690?text=Hi%20Kedar%20ji,%20I%20am%20an%20architect/interior%20designer%20and%20need%20a%20civil%20feasibility%20discussion."
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 text-[11px] font-bold transition-all flex items-center gap-1.5 shrink-0"
        >
          <WhatsAppLogo className="w-3 h-3 fill-current" />
          <span>WhatsApp Founder</span>
        </a>
      </div>
    </div>
  );
}
