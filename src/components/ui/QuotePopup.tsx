'use client';
// src/components/ui/QuotePopup.tsx
// FIXED: onSubmit now calls POST /api/quote → saves to MongoDB → shows in admin

import { useState, useEffect } from 'react';
import { X, CheckCircle2, User, Phone, Mail, MapPin, ChevronDown, ShieldCheck, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface QuoteFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  address: string;
  message: string;
  websiteUrl?: string;
  dpdpConsent: boolean;
}

export default function QuotePopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } =
    useForm<QuoteFormData>();

  useEffect(() => {
    const handler = (e: Event) => {
      setOpen(true);
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.service) {
        setValue('service', customEvent.detail.service);
      }
    };
    window.addEventListener('open-quote-popup', handler);
    return () => window.removeEventListener('open-quote-popup', handler);
  }, [setValue]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* ── FIXED: calls real /api/quote endpoint ─────────────────── */
  const onSubmit = async (data: QuoteFormData) => {
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (json.success) {
        setSubmitted(true);
        toast.success("Quote request saved! We'll call you within 24 hours.", { duration: 5000 });
        setTimeout(() => {
          setOpen(false);
          setSubmitted(false);
          reset();
        }, 2500);
      } else {
        toast.error(json.error || 'Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Network error. Please check your connection.');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
        onClick={() => setOpen(false)} 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl rounded-3xl overflow-hidden bg-gradient-to-b from-[#111928] via-[#0E1626] to-[#0A101D] border border-white/15 animate-scaleIn">
        {/* Subtle ambient light */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-white/10 flex items-center justify-between shrink-0 bg-white/[0.02] relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-[10px] font-mono font-bold uppercase tracking-wider mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Free On-Site Inspection &bull; Mumbai</span>
            </div>
            <h2 className="font-display font-bold text-white text-lg sm:text-xl tracking-tight">
              Book a Site Visit &amp; <span className="text-gradient">Quote</span>
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">
              Zero obligation itemized BOQ estimate by senior civil engineer.
            </p>
          </div>
          <button 
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0 ml-3"
            aria-label="Close modal"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto no-scrollbar relative z-10">
          {submitted ? (
            <div className="flex flex-col items-center py-10 gap-4 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-emerald-500/15 border border-emerald-500/30">
                <CheckCircle2 size={36} className="text-emerald-400" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">Site Visit Request Saved!</h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xs leading-relaxed">
                Our senior civil supervisor will contact you within 24 hours to schedule the measurement scan.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Full Name *</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input 
                      {...register('name', { required: 'Name is required' })}
                      placeholder="e.g. Rajesh Sharma" 
                      className="w-full bg-[#0E1626] border border-white/10 rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all shadow-inner" 
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-[10px] font-medium">{errors.name.message}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Mobile Number *</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input 
                      {...register('phone', {
                        required: 'Phone is required',
                        pattern: { value: /^[6-9]\d{9}$/, message: 'Enter 10-digit number' },
                      })}
                      placeholder="e.g. 98765 43210" 
                      maxLength={10}
                      className="w-full bg-[#0E1626] border border-white/10 rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all shadow-inner font-mono" 
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-[10px] font-medium">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">
                    Email Address <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input 
                      {...register('email', {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      type="email"
                      placeholder="e.g. rajesh@gmail.com" 
                      className="w-full bg-[#0E1626] border border-white/10 rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all shadow-inner" 
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-[10px] font-medium">{errors.email.message}</p>}
                </div>

                {/* Service */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Service Required *</label>
                  <div className="relative">
                    <select 
                      {...register('service', { required: 'Please select a service' })}
                      className="w-full bg-[#0E1626] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all shadow-inner appearance-none cursor-pointer pr-10"
                    >
                      <option value="" className="bg-[#0B1120]">Select a service…</option>
                      <option className="bg-[#0B1120]">1BHK Complete Renovation</option>
                      <option className="bg-[#0B1120]">2BHK Complete Renovation</option>
                      <option className="bg-[#0B1120]">3BHK Luxury Interiors</option>
                      <option className="bg-[#0B1120]">4BHK Ultra Premium</option>
                      <option className="bg-[#0B1120]">Bungalow Construction</option>
                      <option className="bg-[#0B1120]">Terrace Home Construction</option>
                      <option className="bg-[#0B1120]">Full Interior Civil Work</option>
                      <option className="bg-[#0B1120]">Bathroom Renovation</option>
                      <option className="bg-[#0B1120]">Kitchen Work &amp; Modular</option>
                      <option className="bg-[#0B1120]">Tiles &amp; Italian Marble</option>
                      <option className="bg-[#0B1120]">POP &amp; False Ceiling</option>
                      <option className="bg-[#0B1120]">Waterproofing &amp; Structural Repair</option>
                      <option className="bg-[#0B1120]">Commercial &amp; Office Renovation</option>
                      <option className="bg-[#0B1120]">Other / General Inquiry</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                  {errors.service && <p className="text-red-400 text-[10px] font-medium">{errors.service.message}</p>}
                </div>
              </div>

              {/* Site Location */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Site Location / Area *</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input 
                    {...register('address', { required: 'Please enter your area or location' })}
                    placeholder="e.g. Andheri West, Bandra, Worli, Thane..." 
                    className="w-full bg-[#0E1626] border border-white/10 rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all shadow-inner" 
                  />
                </div>
                {errors.address && <p className="text-red-400 text-[10px] font-medium">{errors.address.message as string}</p>}
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Project Details <span className="text-slate-500 font-normal">(Optional)</span></label>
                <textarea 
                  {...register('message')} 
                  rows={2}
                  placeholder="Tell us about carpet area, timeline, or specific civil requirements…"
                  className="w-full bg-[#0E1626] border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all shadow-inner resize-none" 
                />
              </div>

              {/* Honeypot Field */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="websiteUrlQuote">Website URL</label>
                <input {...register('websiteUrl')} type="text" id="websiteUrlQuote" tabIndex={-1} autoComplete="off" />
              </div>

              {/* DPDP Consent */}
              <div className="flex items-start gap-2.5 pt-1">
                <input 
                  type="checkbox" 
                  id="dpdpConsentQuote"
                  {...register('dpdpConsent', { required: 'You must consent to data processing' })}
                  className="mt-0.5 accent-orange-500 w-3.5 h-3.5 cursor-pointer shrink-0"
                />
                <label htmlFor="dpdpConsentQuote" className="text-[10px] sm:text-[11px] text-slate-400 leading-tight cursor-pointer">
                  I agree to the <a href="/privacy" target="_blank" className="text-orange-400 hover:underline">Privacy Policy</a> and consent to receive estimates and site inspection updates.
                </label>
              </div>
              {errors.dpdpConsent && <p className="text-red-400 text-[10px] font-medium mt-0">{errors.dpdpConsent.message as string}</p>}

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-orange-950/40 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-60 cursor-pointer group mt-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving Request…</span>
                  </>
                ) : (
                  <>
                    <span>Book Site Visit &bull; Get BOQ Estimate</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              
              {/* Trust Badges Footer */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 text-[10px] text-slate-400 font-mono uppercase tracking-wider pt-1">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <ShieldCheck size={11} className="text-emerald-400" />
                  <span>100% Confidential</span>
                </span>
                <span>&bull;</span>
                <span>Zero Spam</span>
                <span>&bull;</span>
                <span>Free On-Site Visit</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/** Helper — call from any component to open the popup with optional service pre-selection */
export function openQuotePopup(service?: string | any) {
  const serviceTitle = typeof service === 'string' ? service : undefined;
  window.dispatchEvent(new CustomEvent('open-quote-popup', { detail: { service: serviceTitle } }));
}
