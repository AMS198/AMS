'use client';

// src/components/ui/ReviewRequestBanner.tsx
// Post-service banner asking happy clients to leave a review
import { ExternalLink, Star } from 'lucide-react';

export default function ReviewRequestBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-900/40 to-[#0B1120] border border-blue-500/20 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 flex-1">
        <div className="flex items-center gap-2 mb-2 text-yellow-400">
          {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
        </div>
        <h3 className="text-white font-bold text-xl md:text-2xl mb-2">
          Happy with our service?
        </h3>
        <p className="text-slate-400 text-sm md:text-base max-w-lg">
          Your feedback helps us maintain our quality standards and helps other families find reliable contractors in Mumbai.
        </p>
      </div>
      
      <div className="relative z-10 flex flex-col gap-3 w-full md:w-auto shrink-0">
        <a 
          href="https://share.google/v9ZNhSlXDECsz2p58" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
        >
          <span className="font-bold text-lg" style={{ color: '#4285F4' }}>G</span>
          <span>Review on Google</span>
          <ExternalLink size={16} className="text-slate-500" />
        </a>
      </div>
    </div>
  );
}
