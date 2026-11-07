'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, Mail, Sparkles, User, ChevronDown, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  websiteUrl?: string;
  dpdpConsent: boolean;
}

export default function LeadGenPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LeadFormData>();

  useEffect(() => {
    if (hasShown) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const scrollableDistance = documentHeight - windowHeight;
      const scrollPercentage = scrollableDistance > 0 ? (scrollY / scrollableDistance) * 100 : 0;

      // Show when user has scrolled 10% of the page, or if page is short just show after a small scroll
      if (scrollPercentage > 10 || (scrollY > 150 && scrollableDistance <= 0)) {
        setIsOpen(true);
        setHasShown(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShown]);

  const onSubmit = async (data: LeadFormData) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Thank you! Our expert will call you shortly.", {
          duration: 5000,
          icon: '🏗️',
        });
        setIsOpen(false);
        reset();
      } else {
        toast.error(result.error || "Something went wrong.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            className="relative w-full max-w-[820px] max-h-[92vh] overflow-y-auto no-scrollbar bg-gradient-to-b from-[#111928] via-[#0E1626] to-[#0A101D] border border-white/15 rounded-3xl shadow-[0_0_60px_rgba(249,115,22,0.18)] flex flex-col md:flex-row overflow-hidden"
          >
            {/* Ambient top light */}
            <div className="absolute top-0 right-1/3 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Left Side - Visual / Executive Trust Card (Desktop) */}
            <div className="hidden md:flex md:w-[38%] bg-gradient-to-b from-[#141E33] via-[#0F172A] to-[#0A101D] p-7 flex-col justify-between relative overflow-hidden border-r border-white/10 shrink-0">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-[11px] font-mono font-bold uppercase tracking-wider mb-5">
                  <Sparkles size={12} className="text-orange-400" />
                  <span>Free Technical Advice</span>
                </div>

                {/* Director Feature Pill */}
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.04] border border-white/10 mb-6 backdrop-blur-sm">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-orange-500/40 shadow-md">
                    <Image
                      src="/images/director-kedar-mandal.jpg"
                      alt="Kedar Mandal - Director"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0E1626]" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs">Kedar Mandal</h4>
                    <p className="text-orange-400 text-[10px] font-semibold">Founder &amp; Managing Director</p>
                    <p className="text-slate-400 text-[10px]">10+ Years Mumbai Civil Legacy</p>
                  </div>
                </div>

                <h3 className="text-xl font-display font-bold text-white leading-snug mb-3">
                  Start Your <br /><span className="text-gradient">Civil Project</span> With Zero Middlemen
                </h3>
                
                <div className="space-y-2.5 text-xs text-slate-300 pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>Free on-site inspection &amp; measurement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>Transparent line-item BOQ quotation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>100% In-house skilled master artisans</span>
                  </div>
                </div>
              </div>

              {/* Bottom Support Badge */}
              <div className="relative z-10 pt-6 mt-6 border-t border-white/10">
                <a
                  href="tel:+918779391690"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-orange-500/10 border border-white/10 hover:border-orange-500/40 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                    <Phone size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Direct Phone Desk</p>
                    <p className="text-xs font-mono font-bold text-white">+91 87793 91690</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 p-5 sm:p-7 md:p-8 relative">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer z-20"
                aria-label="Close modal"
              >
                <X size={15} />
              </button>

              {/* Header */}
              <div className="mb-5 pr-8">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Verified Technical Callback</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                  Get Free <span className="text-gradient">Consultation</span>
                </h2>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  Fill in your project requirements below. Our technical supervisor will call you back within 15 minutes.
                </p>
              </div>

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
                          required: 'Phone number is required',
                          pattern: { value: /^[6-9]\d{9}$/, message: 'Enter 10-digit number' }
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
                          pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' }
                        })}
                        type="email"
                        placeholder="e.g. rajesh@gmail.com"
                        className="w-full bg-[#0E1626] border border-white/10 rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all shadow-inner"
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-[10px] font-medium">{errors.email.message}</p>}
                  </div>

                  {/* Location */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-300">Site Location / Area *</label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <input 
                        {...register('location', { required: 'Location is required' })}
                        placeholder="e.g. Bandra, Andheri, Thane..."
                        className="w-full bg-[#0E1626] border border-white/10 rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all shadow-inner"
                      />
                    </div>
                    {errors.location && <p className="text-red-400 text-[10px] font-medium">{errors.location.message}</p>}
                  </div>
                </div>

                {/* Service */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Service Required *</label>
                  <div className="relative">
                    <select 
                      {...register('service', { required: 'Please select a service' })}
                      className="w-full bg-[#0E1626] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all shadow-inner appearance-none cursor-pointer pr-10"
                    >
                      <option value="" className="bg-[#0B1120]">Select a service category...</option>
                      <option value="Bungalow Construction" className="bg-[#0B1120]">Bungalow &amp; Villa Construction</option>
                      <option value="Bathroom Renovation" className="bg-[#0B1120]">Bathroom Renovation &amp; Waterproofing</option>
                      <option value="Modular Kitchen & Interior" className="bg-[#0B1120]">Modular Kitchen &amp; Interior Civil</option>
                      <option value="Complete Home Renovation" className="bg-[#0B1120]">Complete Home Renovation (1/2/3/4 BHK)</option>
                      <option value="Tiles & Italian Marble" className="bg-[#0B1120]">Tiles &amp; Italian Marble Flooring</option>
                      <option value="POP & False Ceiling" className="bg-[#0B1120]">POP &amp; Designer False Ceiling</option>
                      <option value="Structural Repairs & Waterproofing" className="bg-[#0B1120]">Structural Repairs &amp; Waterproofing</option>
                      <option value="Commercial & Office Fitout" className="bg-[#0B1120]">Commercial &amp; Office Civil Fitout</option>
                      <option value="Other / General Query" className="bg-[#0B1120]">Other / Turnkey Civil Query</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                  {errors.service && <p className="text-red-400 text-[10px] font-medium">{errors.service.message}</p>}
                </div>

                {/* Honeypot Field */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="websiteUrlLead">Website URL</label>
                  <input {...register('websiteUrl')} type="text" id="websiteUrlLead" tabIndex={-1} autoComplete="off" />
                </div>

                {/* DPDP Consent */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input 
                    type="checkbox" 
                    id="dpdpConsentLead"
                    {...register('dpdpConsent', { required: 'You must consent to data processing' })}
                    className="mt-0.5 accent-orange-500 w-3.5 h-3.5 cursor-pointer shrink-0"
                  />
                  <label htmlFor="dpdpConsentLead" className="text-[10px] sm:text-[11px] text-slate-400 leading-tight cursor-pointer">
                    I agree to the <a href="/privacy" target="_blank" className="text-orange-400 hover:underline">Privacy Policy</a> and consent to receive estimates and site inspection updates.
                  </label>
                </div>
                {errors.dpdpConsent && <p className="text-red-400 text-[10px] font-medium mt-0">{errors.dpdpConsent.message as string}</p>}

                {/* Submit CTA */}
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
                      <span>Request Free Consultation</span>
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                
                {/* Reassurance Footer */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 text-[10px] text-slate-400 font-mono uppercase tracking-wider pt-1">
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <ShieldCheck size={11} className="text-emerald-400" />
                    <span>100% Confidential</span>
                  </span>
                  <span>&bull;</span>
                  <span>Zero Spam</span>
                  <span>&bull;</span>
                  <span>15-Min Callback</span>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
