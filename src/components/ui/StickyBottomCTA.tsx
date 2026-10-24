'use client';

// src/components/ui/StickyBottomCTA.tsx
// Mobile-only sticky bottom bar — Call + WhatsApp always visible
// Highest CRO impact for construction leads (70%+ mobile traffic)

import { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';

// WhatsApp SVG inline for performance
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function StickyBottomCTA() {
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Only show on mobile
    if (typeof window === 'undefined') return;
    
    // Check if already dismissed in this session
    const wasDismissed = sessionStorage.getItem('sticky-cta-dismissed');
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    let lastScroll = 0;
    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        if (currentScroll > lastScroll && currentScroll > 200) {
          setVisible(true);
        } else if (currentScroll < lastScroll - 10) {
          setVisible(true);
        }
        lastScroll = currentScroll;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); cancelAnimationFrame(rafId); };
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-[90] md:hidden transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      {/* Dismiss button */}
      <button
        onClick={() => {
          setDismissed(true);
          sessionStorage.setItem('sticky-cta-dismissed', '1');
        }}
        className="absolute -top-8 right-3 w-6 h-6 rounded-full bg-[#0B1120] border border-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-colors"
        aria-label="Close bottom bar"
      >
        <X size={12} />
      </button>

      {/* Glass backdrop */}
      <div className="bg-[#0B1120]/95 backdrop-blur-xl border-t border-orange-500/20 shadow-[0_-4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-stretch">
          {/* Call Now */}
          <a
            href="tel:+918779391690"
            className="flex-1 flex items-center justify-center gap-2.5 py-3.5 text-white font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-orange-600 to-orange-500 active:scale-95 transition-transform"
          >
            <Phone size={18} />
            <span>Call Now</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/918779391690?text=Hi%2C%20I%20need%20a%20free%20quote%20for%20construction%20work."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2.5 py-3.5 text-white font-bold text-sm uppercase tracking-wider bg-[#25D366] active:scale-95 transition-transform"
          >
            <WhatsAppIcon size={18} />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Micro trust strip */}
        <div className="flex items-center justify-center gap-4 py-1.5 bg-[#050914] text-[9px] text-slate-500 font-mono uppercase tracking-widest">
          <span>⭐ 4.9 Rating</span>
          <span className="w-0.5 h-2.5 bg-slate-700" />
          <span>✓ 10+ Years</span>
          <span className="w-0.5 h-2.5 bg-slate-700" />
          <span>🏗️ 200+ Projects</span>
        </div>
      </div>
    </div>
  );
}
