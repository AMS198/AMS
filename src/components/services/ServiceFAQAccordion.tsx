'use client';
// src/components/services/ServiceFAQAccordion.tsx
// Interactive single-active FAQ accordion for Service Detail pages.

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { WhatsAppLogo } from '@/components/ui/BrandIcons';

export interface FAQItem {
  q: string;
  a: string;
}

interface ServiceFAQAccordionProps {
  faqs: FAQItem[];
  serviceTitle: string;
  locationName?: string;
}

export default function ServiceFAQAccordion({ faqs, serviceTitle, locationName }: ServiceFAQAccordionProps) {
  // All accordion items closed by default
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const whatsAppText = locationName
    ? `Hi AMS Civil, I have a specific question regarding ${serviceTitle} in ${locationName} for my property.`
    : `Hi AMS Civil, I have a specific question regarding ${serviceTitle} for my property.`;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Accordion Stack */}
      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className={`rounded-2xl transition-all duration-300 overflow-hidden border ${isOpen
                ? 'bg-gradient-to-br from-[#111928] to-[#0d1522] border-orange-500/50 shadow-[0_8px_30px_rgba(249,115,22,0.12)] ring-1 ring-orange-500/20'
                : 'bg-[#0B1120]/80 border-white/10 hover:border-white/20 hover:bg-[#0B1120]'
                }`}
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-3 p-3.5 sm:p-5 text-left cursor-pointer group"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-2.5 sm:gap-3.5 pr-2 min-w-0">
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-all ${isOpen
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/40 ring-2 ring-orange-400/30'
                      : 'bg-orange-500/10 border border-orange-500/20 text-orange-400 group-hover:bg-orange-500/20 group-hover:border-orange-500/40'
                      }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-bold text-sm sm:text-base leading-snug transition-colors ${isOpen ? 'text-white' : 'text-slate-200 group-hover:text-white'
                      }`}
                  >
                    {faq.q}
                  </span>
                </div>

                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen
                    ? 'bg-orange-500/20 text-orange-400 rotate-180 ring-1 ring-orange-500/30'
                    : 'bg-white/5 text-slate-400 group-hover:text-white group-hover:bg-white/10'
                    }`}
                >
                  <ChevronDown size={15} />
                </div>
              </button>

              <div
                style={{
                  maxHeight: isOpen ? '600px' : '0px',
                  opacity: isOpen ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease',
                }}
              >
                <div className="px-4 pb-4 pt-2.5 sm:px-6 sm:pb-5 sm:pt-2 sm:pl-16 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Consultation Strip */}
      <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-500/5 via-white/[0.02] to-transparent border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="text-xs sm:text-sm text-slate-300">
          <span className="text-white font-semibold flex items-center gap-2 justify-center sm:justify-start">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Have a specific question about your site?
          </span>
          <p className="text-slate-400 text-xs mt-1">Talk directly with our senior civil engineer on WhatsApp for instant guidance.</p>
        </div>
        <a
          href={`https://wa.me/918779391690?text=${encodeURIComponent(whatsAppText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white shadow-lg shadow-[#25D366]/20 font-bold text-xs transition-all flex items-center gap-2 shrink-0 active:scale-95"
        >
          <WhatsAppLogo className="w-4 h-4 fill-white" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
