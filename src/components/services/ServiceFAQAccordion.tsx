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
}

export default function ServiceFAQAccordion({ faqs, serviceTitle }: ServiceFAQAccordionProps) {
  // Single active state: only one accordion is open at a time (null = all closed)
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Accordion Stack */}
      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                isOpen
                  ? 'bg-[#101827] border-orange-500/50 shadow-[0_8px_30px_rgba(249,115,22,0.12)]'
                  : 'bg-[#0B1120] border-white/10 hover:border-white/20'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer group"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3.5 pr-2">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-all ${
                      isOpen
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                        : 'bg-orange-500/10 border border-orange-500/20 text-orange-400 group-hover:bg-orange-500/20'
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={`font-bold text-sm sm:text-base leading-snug transition-colors ${
                      isOpen ? 'text-white' : 'text-slate-200 group-hover:text-white'
                    }`}
                  >
                    {faq.q}
                  </span>
                </div>

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen
                      ? 'bg-orange-500/20 text-orange-400 rotate-180'
                      : 'bg-white/5 text-slate-400 group-hover:text-white group-hover:bg-white/10'
                  }`}
                >
                  <ChevronDown size={15} />
                </div>
              </button>

              <div
                style={{
                  maxHeight: isOpen ? '260px' : '0px',
                  opacity: isOpen ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease',
                }}
              >
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pl-14">
                  {faq.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Consultation Strip */}
      <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="text-xs text-slate-300">
          <span className="text-white font-semibold">Have a specific question about your site?</span>
          <p className="text-slate-400 text-[11px] mt-0.5">Talk to our senior civil engineer on WhatsApp for instant guidance.</p>
        </div>
        <a
          href={`https://wa.me/918779391690?text=${encodeURIComponent(
            `Hi AMS Civil, I have a specific question regarding ${serviceTitle} for my property.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
        >
          <WhatsAppLogo className="w-3.5 h-3.5 fill-current" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
