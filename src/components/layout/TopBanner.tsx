'use client';

import React, { useRef, useEffect } from 'react';
import { PhoneCall, ArrowRight } from 'lucide-react';
import { openQuotePopup } from '@/components/ui/QuotePopup';

export default function TopBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    const updateHeight = () => {
      const height = banner.offsetHeight;
      document.documentElement.style.setProperty('--banner-height', `${height}px`);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(banner);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={bannerRef}
      className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-2 px-4 text-center text-sm font-medium z-50 relative shadow-md overflow-hidden flex items-center justify-center"
      style={{ minHeight: '36px' }}
    >
      {/* Desktop Layout (sm and above) */}
      <div className="hidden sm:flex items-center justify-center gap-4 flex-wrap w-full">
        <div className="flex items-center gap-2">
          <span>🔥</span>
          <span className="font-semibold text-xs md:text-sm">Special Offer: Book a Site Visit & Consultation (Fee Applicable)</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="tel:+918779391690" className="flex items-center gap-1.5 hover:bg-white/30 transition-all bg-white/20 px-3 py-0.5 rounded-full font-bold font-mono text-xs">
            <PhoneCall size={12} />
            +91 87793 91690
          </a>
          <span className="text-white/40">|</span>
          <a href="tel:+919004298911" className="flex items-center gap-1.5 hover:bg-white/30 transition-all bg-white/20 px-3 py-0.5 rounded-full font-bold font-mono text-xs">
            <PhoneCall size={12} />
            +91 90042 98911
          </a>
          <button 
            onClick={openQuotePopup} 
            className="flex items-center gap-1 text-orange-950 font-bold hover:text-white transition-colors bg-white hover:bg-orange-500 hover:border-white border border-transparent px-3 py-0.5 rounded-full text-xs"
          >
            Book Now <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Mobile Marquee Layout (below sm) */}
      <div className="flex sm:hidden items-center w-full overflow-hidden relative py-0.5">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee-banner {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-banner {
            display: flex;
            white-space: nowrap;
            animation: marquee-banner 16s linear infinite;
          }
          .animate-marquee-banner:hover {
            animation-play-state: paused;
          }
        `}} />
        <div className="animate-marquee-banner">
          {/* First loop of content */}
          <div className="flex items-center gap-6 pr-6">
            <span className="flex items-center gap-1.5 font-semibold text-xs tracking-wide">
              <span>🔥</span> Special Offer: Site Visit & Consultation (Fee Applicable)
            </span>
            <span className="text-white/40">|</span>
            <a href="tel:+918779391690" className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full font-bold font-mono text-xs shadow-sm whitespace-nowrap">
              <PhoneCall size={12} /> +91 87793 91690
            </a>
            <span className="text-white/40">|</span>
            <a href="tel:+919004298911" className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full font-bold font-mono text-xs shadow-sm whitespace-nowrap">
              <PhoneCall size={12} /> +91 90042 98911
            </a>
            <span className="text-white/40">|</span>
            <button 
              onClick={openQuotePopup} 
              className="flex items-center gap-1 text-orange-950 bg-white hover:bg-gray-100 px-3 py-1 rounded-full font-bold text-xs shadow-sm whitespace-nowrap"
            >
              Book Now <ArrowRight size={12} />
            </button>
          </div>
          {/* Second identical loop of content to create a seamless infinite scroll */}
          <div className="flex items-center gap-6 pr-6" aria-hidden="true">
            <span className="flex items-center gap-1.5 font-semibold text-xs tracking-wide">
              <span>🔥</span> Special Offer: Site Visit & Consultation (Fee Applicable)
            </span>
            <span className="text-white/40">|</span>
            <a href="tel:+918779391690" className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full font-bold font-mono text-xs shadow-sm whitespace-nowrap">
              <PhoneCall size={12} /> +91 87793 91690
            </a>
            <span className="text-white/40">|</span>
            <a href="tel:+919004298911" className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full font-bold font-mono text-xs shadow-sm whitespace-nowrap">
              <PhoneCall size={12} /> +91 90042 98911
            </a>
            <span className="text-white/40">|</span>
            <button 
              onClick={openQuotePopup} 
              className="flex items-center gap-1 text-orange-950 bg-white hover:bg-gray-100 px-3 py-1 rounded-full font-bold text-xs shadow-sm whitespace-nowrap"
            >
              Book Now <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
