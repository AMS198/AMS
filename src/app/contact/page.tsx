'use client';
// src/app/contact/page.tsx
// FIXED: onSubmit now calls POST /api/contact → saves to MongoDB → shows in admin

import { useEffect } from 'react';
import { Mail, MapPin, Clock, Send, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { WhatsAppLogo, PhoneLogo, GoogleColorLogo } from '@/components/ui/BrandIcons';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  websiteUrl?: string;
  dpdpConsent: boolean;
}

function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('visible');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.08 },
    );
    document.querySelectorAll('.animate-on-scroll').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function ContactPage() {
  useScrollReveal();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amscivilwork.in' },
      { '@type': 'ListItem', position: 2, name: 'Contact Us', item: 'https://www.amscivilwork.in/contact' },
    ],
  };

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<ContactFormData>();

  /* ── FIXED: actually calls the API ─────────────────────────── */
  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (json.success) {
        toast.success("Message sent! We'll contact you within 24 hours.", { duration: 5000 });
        reset();
      } else {
        toast.error(json.error || 'Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Network error. Please check your connection and try again.');
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* ── Page Header ──────────────────────────────────────── */}
      <section className="relative pt-28 sm:pt-36 pb-10 overflow-hidden bg-[#050914] border-b border-white/5">
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="relative container-custom">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-orange-400 mb-3 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Direct Project Connect &bull; Mumbai</span>
          </div>
          <h1 className="font-display font-black text-white text-3xl sm:text-5xl lg:text-6xl tracking-tight">
            Contact <span className="text-gradient">AMS Civil</span>
          </h1>
          <p className="text-slate-400 mt-3 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
            Planning a new construction, structural repair, or turnkey luxury interior? 
            Connect directly with Director Kedar Mandal &amp; our senior engineering site supervisors.
          </p>
        </div>
      </section>

      {/* ── Contact Content ──────────────────────────────────── */}
      <section className="py-12 sm:py-16 pb-28 sm:pb-36 bg-[#080E1C] relative overflow-hidden">
        {/* Subtle ambient light */}
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container-custom grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 relative z-10">

          {/* Left — Info cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="mb-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-orange-400 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Our Coordinates</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-white font-bold">
                We&apos;re Here to <span className="text-gradient">Help</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-1.5">
                Whether you have a question, need an on-site structural estimate, or are ready to begin execution — our team is ready to help.
              </p>
            </div>

            {/* 01. Phone / WhatsApp Card */}
            <div className="rounded-2xl bg-gradient-to-b from-[#111928] via-[#0E1626] to-[#0A101D] border border-white/10 hover:border-orange-500/30 p-4 sm:p-5 shadow-xl transition-all duration-300 relative group overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-400 shadow-sm shrink-0">
                    <PhoneLogo className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold block">
                      Direct Phone &amp; WhatsApp
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active 9:00 AM – 7:00 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Number 1: Director */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all mb-2.5">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-400" />
                    Kedar Mandal <span className="text-[11px] text-slate-400 font-normal">(Director)</span>
                  </span>
                  <span className="text-[10px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20 font-semibold">
                    Priority Line
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                  <span className="text-white font-mono font-bold text-sm tracking-wide">
                    +91 87793 91690
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href="tel:+918779391690"
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1"
                      title="Direct Phone Call"
                    >
                      <span>Call</span>
                    </a>
                    <a
                      href="https://wa.me/918779391690?text=Hi!%20I'd%20like%20to%20discuss%20a%20construction%20project%20in%20Mumbai."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 text-xs font-semibold transition-all flex items-center gap-1"
                      title="Chat on WhatsApp"
                    >
                      <WhatsAppLogo className="w-3.5 h-3.5 fill-current" />
                      <span>Chat</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Number 2: Site Desk */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-500" />
                    Site Engineering Desk
                  </span>
                  <span className="text-[10px] font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded-full border border-white/10 font-semibold">
                    Technical
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                  <span className="text-white font-mono font-bold text-sm tracking-wide">
                    +91 90042 98911
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href="tel:+919004298911"
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1"
                      title="Call Site Desk"
                    >
                      <span>Call</span>
                    </a>
                    <a
                      href="https://wa.me/919004298911?text=Hi!%20I'd%20like%20to%20discuss%20a%20construction%20project%20in%20Mumbai."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 text-xs font-semibold transition-all flex items-center gap-1"
                      title="WhatsApp Site Desk"
                    >
                      <WhatsAppLogo className="w-3.5 h-3.5 fill-current" />
                      <span>Chat</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 02. Email Card */}
            <div className="rounded-2xl bg-gradient-to-b from-[#111928] via-[#0E1626] to-[#0A101D] border border-white/10 hover:border-orange-500/30 p-4 sm:p-5 shadow-xl transition-all duration-300 group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-400 shadow-sm shrink-0 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold block mb-1">
                      Official Project Email
                    </span>
                    <a
                      href="mailto:ams.constructionwork@gmail.com"
                      className="text-white hover:text-orange-400 font-medium text-xs sm:text-sm break-all transition-colors inline-block"
                    >
                      ams.constructionwork@gmail.com
                    </a>
                    <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">
                      For formal RFQs, architectural drawings &amp; BOQ submissions.
                    </p>
                  </div>
                </div>
                <a
                  href="mailto:ams.constructionwork@gmail.com"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500/40 text-slate-300 hover:text-white flex items-center justify-center shrink-0 transition-colors"
                  title="Send Email"
                >
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* 03. Location & Coverage */}
            <div className="rounded-2xl bg-gradient-to-b from-[#111928] via-[#0E1626] to-[#0A101D] border border-white/10 hover:border-orange-500/30 p-4 sm:p-5 shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-400 shadow-sm shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold">
                      Coverage &bull; MMR, Maharashtra
                    </span>
                    <span className="text-[9px] font-mono uppercase text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold">
                      Verified
                    </span>
                  </div>
                  <p className="text-white font-medium text-xs sm:text-sm">
                    Mumbai Metropolitan Region (MMR), India
                  </p>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    South Mumbai, Western Suburbs, Central Mumbai, Thane &amp; Navi Mumbai.
                  </p>
                  <div className="mt-2.5">
                    <a
                      href="https://share.google/v9ZNhSlXDECsz2p58"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors group/link"
                    >
                      <GoogleColorLogo className="w-3.5 h-3.5" />
                      <span>Open Verified Profile on Google Maps</span>
                      <ArrowUpRight size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 04. Working Hours */}
            <div className="rounded-2xl bg-gradient-to-b from-[#111928] via-[#0E1626] to-[#0A101D] border border-white/10 hover:border-orange-500/30 p-4 sm:p-5 shadow-xl transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-400 shadow-sm shrink-0 mt-0.5">
                  <Clock size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold">
                      Working &amp; Inspection Hours
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                      On-Site
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Monday – Saturday:</span>
                      <span className="font-mono text-white font-semibold">9:00 AM – 7:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Sunday:</span>
                      <span className="font-mono text-amber-400 font-semibold">10:00 AM – 2:00 PM</span>
                    </div>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-2 pt-2 border-t border-white/5">
                    *24/7 emergency site support for active construction and structural contracts.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Quick Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="https://wa.me/918779391690?text=Hi!%20I'd%20like%20to%20discuss%20a%20construction%20project%20in%20Mumbai."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/40 transition-all active:scale-[0.98] group"
              >
                <WhatsAppLogo className="w-5 h-5 fill-white shrink-0 group-hover:scale-110 transition-transform" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="tel:+918779391690"
                className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-orange-950/40 transition-all active:scale-[0.98] group"
              >
                <PhoneLogo className="w-4 h-4 fill-white shrink-0 group-hover:scale-110 transition-transform" />
                <span>Call: +91 87793 91690</span>
              </a>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl bg-gradient-to-b from-[#111928] via-[#0E1626] to-[#0A101D] border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Subtle ambient light */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-orange-400 mb-2">
                  <span>Fast Turnaround Consultation</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-white font-bold mb-2">
                  Send Us a Message
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
                  Fill in your project requirements below. Our engineering team reviews the scope and calls you back within 24 hours.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 sm:gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-slate-300 text-xs font-semibold mb-1.5">
                        Full Name *
                      </label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        placeholder="e.g. Rajesh Sharma"
                        className="form-input"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-slate-300 text-xs font-semibold mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        {...register('phone', {
                          required: 'Phone is required',
                          pattern: {
                            value: /^[6-9]\d{9}$/,
                            message: 'Enter a valid 10-digit mobile number',
                          },
                        })}
                        placeholder="e.g. 8779391690"
                        className="form-input"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-xs font-semibold mb-1.5">
                      Email Address <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      {...register('email', {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      type="email"
                      placeholder="you@example.com"
                      className="form-input"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-slate-300 text-xs font-semibold mb-1.5">
                      Service Required *
                    </label>
                    <select
                      {...register('service', { required: 'Please select a service' })}
                      className="form-input appearance-none"
                    >
                      <option value="">Select a service…</option>
                      <option>Bungalow Construction</option>
                      <option>Bathroom Renovation</option>
                      <option>Kitchen Work</option>
                      <option>Tiles Work</option>
                      <option>Flooring Work</option>
                      <option>POP Work</option>
                      <option>Wall Work</option>
                      <option>Plaster Work</option>
                      <option>Other / General Enquiry</option>
                    </select>
                    {errors.service && (
                      <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-slate-300 text-xs font-semibold mb-1.5">
                      Your Message &amp; Scope *
                    </label>
                    <textarea
                      {...register('message', { required: 'Please describe your project' })}
                      rows={4}
                      placeholder="Tell us about your project — location, carpet area, expected timeline, etc."
                      className="form-input resize-none"
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Honeypot Field */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <label htmlFor="websiteUrl">Website URL</label>
                    <input
                      {...register('websiteUrl')}
                      type="text"
                      id="websiteUrl"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* DPDP Consent */}
                  <div className="flex items-start gap-3 mt-1">
                    <input 
                      type="checkbox" 
                      id="dpdpConsentContact"
                      {...register('dpdpConsent', { required: 'You must consent to data processing' })}
                      className="mt-1 accent-orange-500 w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="dpdpConsentContact" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
                      I agree to the <a href="/privacy" target="_blank" className="text-orange-400 hover:underline">Privacy Policy</a> and consent to receive construction estimates and project updates.
                    </label>
                  </div>
                  {errors.dpdpConsent && (
                    <p className="text-red-400 text-xs mt-0">{errors.dpdpConsent.message as string}</p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm tracking-wide shadow-xl shadow-orange-950/40 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin1" />
                        <span>Sending message…</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message &bull; Get Callback</span>
                      </>
                    )}
                  </button>

                  {/* Reassurance note */}
                  <p className="flex items-center gap-2 text-slate-400 text-xs pt-1">
                    <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                    <span>Your details are 100% confidential. No spam or commercial resell.</span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
