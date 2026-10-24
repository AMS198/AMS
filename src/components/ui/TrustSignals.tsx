'use client';

// src/components/ui/TrustSignals.tsx
// Floating trust badges strip shown near CTAs to reduce friction

import { Shield, Star, Award, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TrustSignals() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Slight delay for entrance animation
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`w-full max-w-4xl mx-auto flex flex-wrap justify-center gap-3 sm:gap-6 mt-6 transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
        <Star className="text-yellow-400 fill-yellow-400" size={16} />
        <span className="text-xs font-semibold text-white">4.9/5 Rating</span>
      </div>
      
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
        <Shield className="text-blue-400" size={16} />
        <span className="text-xs font-semibold text-white">100% Quality Guaranteed</span>
      </div>
      
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
        <Award className="text-orange-400" size={16} />
        <span className="text-xs font-semibold text-white">10+ Years Legacy</span>
      </div>

      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm hidden md:flex">
        <CheckCircle className="text-green-400" size={16} />
        <span className="text-xs font-semibold text-white">Zero Hidden Costs</span>
      </div>
    </div>
  );
}
