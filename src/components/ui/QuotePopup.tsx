'use client';
// src/components/ui/QuotePopup.tsx
// FIXED: onSubmit now calls POST /api/quote → saves to MongoDB → shows in admin

import { useState, useEffect } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
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
  const [open,      setOpen]      = useState(false);
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
      const res  = await fetch('/api/quote', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setOpen(false)} />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[95vh] md:max-h-[90vh] flex flex-col shadow-2xl animate-scaleIn overflow-hidden rounded-xl"
        style={{ background: '#101827', border: '1px solid #1E2D45' }}>

        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between shrink-0"
          style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h2 className="font-display font-bold text-white text-lg sm:text-xl">Book a Site Visit & Quote</h2>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                ⚡ Slots Filling Fast
              </span>
            </div>
            <p className="text-white/95 text-xs font-semibold flex items-center gap-1.5 mt-1.5">
              <span>🪔</span>
              Diwali Special: 100% Free Site Visit & Fast 24-Hr Estimate (Valid till 15 Nov)
            </p>
          </div>
          <button onClick={() => setOpen(false)}
            className="p-1.5 rounded transition-colors hover:bg-white/10">
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {submitted ? (
            <div className="flex flex-col items-center py-10 gap-4 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(16,185,129,0.15)' }}>
                <CheckCircle size={40} style={{ color: '#10B981' }} />
              </div>
              <h3 className="font-display text-xl text-white">Request Saved!</h3>
              <p className="text-slate-400 text-sm max-w-xs">
                Your quote request has been saved in our system.
                Our team will call you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

              {/* Name */}
              <div>
                <label className="block text-slate-300 text-xs font-medium mb-1.5">Full Name *</label>
                <input {...register('name', { required: 'Name is required' })}
                  placeholder="e.g. Rajesh Sharma" className="form-input" />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-slate-300 text-xs font-medium mb-1.5">Phone Number *</label>
                <input {...register('phone', {
                    required: 'Phone is required',
                    pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit number' },
                  })}
                  placeholder="e.g. 9102615343" className="form-input" />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-medium mb-1.5">
                  Email Address *
                </label>
                <input {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  placeholder="you@example.com" className="form-input" />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Service */}
              <div>
                <label className="block text-slate-300 text-xs font-medium mb-1.5">Service Required *</label>
                <select {...register('service', { required: 'Please select a service' })}
                  className="form-input appearance-none">
                  <option value="">Select a service…</option>
                  <option>1BHK Complete Renovation</option>
                  <option>2BHK Complete Renovation</option>
                  <option>3BHK Luxury Interiors</option>
                  <option>4BHK Ultra Premium</option>
                  <option>Bungalow Construction</option>
                  <option>Terrace Home Construction</option>
                  <option>Full Interior Civil Work</option>
                  <option>New Home Design & Build</option>
                  <option>Bathroom Renovation</option>
                  <option>Kitchen Work</option>
                  <option>Tiles Work</option>
                  <option>Flooring Work</option>
                  <option>POP Work</option>
                  <option>Painting Work</option>
                  <option>Waterproofing</option>
                  <option>Gym Renovation</option>
                  <option>New Gym Construction</option>
                  <option>Office Renovation</option>
                  <option>New Office Construction</option>
                  <option>Swimming Pool Work</option>
                  <option>Compound Wall & Gates</option>
                  <option>Building Repair</option>
                  <option>Wall Work</option>
                  <option>Plaster Work</option>
                  <option>B2B Partner / Architect Connect</option>
                  <option>Other</option>
                </select>
                {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="block text-slate-300 text-xs font-medium mb-1.5">Site Address (Full) *</label>
                <textarea {...register('address', { required: 'Address is required for site visit' })} rows={2}
                  placeholder="Complete address with Room No, Floor, Building, Area..."
                  className="form-input resize-none" />
                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message as string}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-slate-300 text-xs font-medium mb-1.5">Project Details</label>
                <textarea {...register('message')} rows={3}
                  placeholder="Briefly describe your project…"
                  className="form-input resize-none" />
              </div>

              {/* Honeypot Field */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="websiteUrlQuote">Website URL</label>
                <input {...register('websiteUrl')} type="text" id="websiteUrlQuote" tabIndex={-1} autoComplete="off" />
              </div>

              {/* DPDP Consent */}
              <div className="flex items-start gap-2 mt-2">
                <input 
                  type="checkbox" 
                  id="dpdpConsentQuote"
                  {...register('dpdpConsent', { required: 'You must consent to data processing' })}
                  className="mt-0.5 accent-orange-500"
                />
                <label htmlFor="dpdpConsentQuote" className="text-[10px] text-slate-400 leading-tight cursor-pointer">
                  I agree to the <a href="/privacy" target="_blank" className="text-orange-400 hover:underline">Privacy Policy</a> and consent to receive estimates.
                </label>
              </div>
              {errors.dpdpConsent && <p className="text-red-400 text-xs mt-0">{errors.dpdpConsent.message as string}</p>}

              {/* Submit */}
              <button type="submit" disabled={isSubmitting}
                className="btn-primary justify-center mt-1 disabled:opacity-60 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin1" />Saving…</>
                ) : (
                  <><Send size={16} />BOOK SITE VISIT</>
                )}
              </button>
              
              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-[#1E2D45]">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono uppercase tracking-wider">
                  <CheckCircle size={12} className="text-orange-500" />
                  Expert Consultation
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono uppercase tracking-wider">
                  <CheckCircle size={12} className="text-orange-500" />
                  No Spam Guarantee
                </div>
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
  // If called from onClick, the first argument is a MouseEvent. 
  // We only want to pass it if it's a string.
  const serviceTitle = typeof service === 'string' ? service : undefined;
  window.dispatchEvent(new CustomEvent('open-quote-popup', { detail: { service: serviceTitle } }));
}
