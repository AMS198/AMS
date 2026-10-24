'use client';
// src/components/services/ServiceDetailActions.tsx
// Client-side interactive buttons for the Service Detail page (Quote Modal, WhatsApp, Call)

import { ArrowRight, Phone, CalendarCheck, ShieldCheck } from 'lucide-react';
import { openQuotePopup } from '@/components/ui/QuotePopup';
import { WhatsAppLogo } from '@/components/ui/BrandIcons';

interface ServiceDetailActionsProps {
  serviceTitle: string;
}

export default function ServiceDetailActions({ serviceTitle }: ServiceDetailActionsProps) {
  const whatsappUrl = `https://wa.me/918779391690?text=${encodeURIComponent(
    `Hi AMS Civil Team, I am looking for ${serviceTitle} service in Mumbai. Please share details and quote.`
  )}`;

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
      <button
        onClick={() => openQuotePopup(serviceTitle)}
        className="btn-primary text-sm px-7 py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/25"
      >
        <CalendarCheck size={18} />
        Book Free Site Visit
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
      >
        <WhatsAppLogo className="w-4 h-4 fill-current" />
        WhatsApp Estimate
      </a>

      <a
        href="tel:+918779391690"
        className="px-5 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-sm font-semibold flex items-center justify-center gap-2 transition-all"
      >
        <Phone size={16} className="text-orange-400" />
        +91 87793 91690
      </a>
    </div>
  );
}

export function FloatingQuickQuoteBar({ serviceTitle }: { serviceTitle: string }) {
  return (
    <div className="p-6 rounded-2xl bg-[#0B1120] border border-orange-500/30 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider mb-2">
        <ShieldCheck size={15} /> Free Site Consultation
      </div>
      <h3 className="text-white font-display text-xl font-bold mb-2">
        Get an Accurate Estimate for {serviceTitle}
      </h3>
      <p className="text-slate-400 text-xs leading-relaxed mb-5">
        Our senior civil engineer will visit your property, inspect measurements, and deliver an itemized quotation with zero hidden charges.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => openQuotePopup(serviceTitle)}
          className="btn-primary text-xs px-5 py-3 flex-1 flex items-center justify-center gap-2 cursor-pointer"
        >
          Request Free Consultation <ArrowRight size={14} />
        </button>
        <a
          href="tel:+918779391690"
          className="px-4 py-3 rounded-lg border border-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:bg-white/5"
        >
          <Phone size={14} className="text-orange-400" /> Call Directly
        </a>
      </div>
    </div>
  );
}
