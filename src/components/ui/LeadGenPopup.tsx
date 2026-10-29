'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MapPin, Phone, Mail, Hammer, Sparkles } from 'lucide-react';
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
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-[850px] max-h-[90vh] overflow-y-auto no-scrollbar bg-[#0B1120] border border-[#1E2D45] rounded-2xl shadow-[0_0_50px_rgba(249,115,22,0.15)] flex flex-col md:flex-row"
          >
            {/* Left Side - Visual/Promo */}
            <div className="hidden md:flex md:w-[40%] bg-gradient-to-br from-[#F97316] to-[#EA580C] p-8 flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Hammer size={180} />
              </div>
              
              <div className="relative z-10">
                <div className="bg-white/20 w-fit p-2 rounded-lg backdrop-blur-sm mb-4">
                  <Sparkles className="text-white" size={24} />
                </div>
                <h2 className="text-3xl font-display font-bold text-white leading-tight">
                  Start Your <br />Dream Project <br />Today
                </h2>
                <p className="text-white/80 mt-4 text-sm font-medium">
                  Get a Free Expert Consultation and a detailed quote for your civil & construction needs.
                </p>
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone size={14} />
                  </div>
                  <span className="text-sm font-semibold">+91 87793 91690</span>
                </div>
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                  <p className="text-[10px] uppercase tracking-wider text-white/60 font-bold mb-1">Trusted By</p>
                  <p className="text-xs text-white font-medium">200+ Clients Across Mumbai</p>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 p-6 md:p-10">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-6 md:hidden">
                <h2 className="text-2xl font-display font-bold text-white">Get Free Consultation</h2>
                <p className="text-slate-400 text-sm">Fill details below and we'll call you back.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <input 
                        {...register('name', { required: 'Name is required' })}
                        placeholder="John Doe"
                        className="w-full bg-[#111827] border border-[#1E2D45] rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#F97316] transition-colors"
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.name.message}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</label>
                    <input 
                      {...register('phone', { 
                        required: 'Phone is required',
                        pattern: { value: /^[6-9]\d{9}$/, message: 'Invalid 10-digit number' }
                      })}
                      placeholder="9876543210"
                      className="w-full bg-[#111827] border border-[#1E2D45] rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#F97316] transition-colors"
                    />
                    {errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address (Optional)</label>
                    <input 
                      {...register('email', { 

                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' }
                      })}
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-[#111827] border border-[#1E2D45] rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#F97316] transition-colors"
                    />
                    {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.email.message}</p>}
                  </div>

                  {/* Location */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location / Area</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                      <input 
                        {...register('location', { required: 'Location is required' })}
                        placeholder="e.g. Andheri, Mumbai"
                        className="w-full bg-[#111827] border border-[#1E2D45] rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#F97316] transition-colors"
                      />
                    </div>
                    {errors.location && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.location.message}</p>}
                  </div>
                </div>

                {/* Service */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Service Interested In</label>
                  <select 
                    {...register('service', { required: 'Please select a service' })}
                    className="w-full bg-[#111827] border border-[#1E2D45] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F97316] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#0B1120]">Select a service...</option>
                    <option value="Bungalow Construction" className="bg-[#0B1120]">Bungalow Construction</option>
                    <option value="Bathroom Renovation" className="bg-[#0B1120]">Bathroom Renovation</option>
                    <option value="Kitchen Renovation" className="bg-[#0B1120]">Kitchen Renovation</option>
                    <option value="Full Civil Work" className="bg-[#0B1120]">Full Civil Work</option>
                    <option value="Tiles & Flooring" className="bg-[#0B1120]">Tiles & Flooring</option>
                    <option value="Interior Work" className="bg-[#0B1120]">Interior Work</option>
                  </select>
                  {errors.service && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.service.message}</p>}
                </div>

                {/* Honeypot Field */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="websiteUrlLead">Website URL</label>
                  <input {...register('websiteUrl')} type="text" id="websiteUrlLead" tabIndex={-1} autoComplete="off" />
                </div>

                {/* DPDP Consent */}
                <div className="flex items-start gap-2 mt-2">
                  <input 
                    type="checkbox" 
                    id="dpdpConsentLead"
                    {...register('dpdpConsent', { required: 'You must consent to data processing' })}
                    className="mt-1 accent-orange-500 w-4 h-4 cursor-pointer shrink-0"
                  />
                  <label htmlFor="dpdpConsentLead" className="text-[10px] sm:text-xs text-slate-400 leading-tight cursor-pointer">
                    I agree to the <a href="/privacy" target="_blank" className="text-orange-400 hover:underline">Privacy Policy</a> and consent to receive estimates and updates.
                  </label>
                </div>
                {errors.dpdpConsent && <p className="text-red-500 text-[10px] font-bold uppercase mt-0">{errors.dpdpConsent.message as string}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} className="relative z-10" />
                      <span className="relative z-10">Request Consultation</span>
                    </>
                  )}
                </button>
                
                <p className="text-center text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                  Safe & Secure • 100% Privacy Guaranteed
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
