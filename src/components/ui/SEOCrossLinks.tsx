'use client';
// src/components/ui/SEOCrossLinks.tsx
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MapPin, ChevronUp } from 'lucide-react';
import { locations } from '@/data/locations';
import { services } from '@/data/siteData';

export default function SEOCrossLinks({ 
  currentLocationSlug, 
  currentServiceSlug,
  limit = 40
}: { 
  currentLocationSlug?: string; 
  currentServiceSlug?: string;
  limit?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Generate top combinations
  const topCities = ['borivali', 'andheri', 'bandra', 'thane', 'pune', 'bangalore', 'ranchi', 'kolkata'];
  
  const crossLinks: { label: string; url: string }[] = [];
  
  if (currentServiceSlug && !currentLocationSlug) {
    const svc = services.find(s => s.slug === currentServiceSlug);
    if (svc) {
      locations.filter(l => topCities.includes(l.slug) || Math.random() > 0.5).slice(0, limit).forEach(loc => {
        crossLinks.push({
          label: `${svc.title} in ${loc.name}`,
          url: `/areas/${loc.slug}/${svc.slug}`
        });
      });
    }
  } 
  else if (currentLocationSlug && !currentServiceSlug) {
    const loc = locations.find(l => l.slug === currentLocationSlug);
    if (loc) {
      services.forEach(svc => {
        crossLinks.push({
          label: `${svc.title} in ${loc.name}`,
          url: `/areas/${loc.slug}/${svc.slug}`
        });
      });
      loc.nearby.slice(0, 10).forEach(near => {
        const nearLoc = locations.find(l => l.slug === near);
        if (nearLoc) {
          crossLinks.push({
            label: `Top Civil Contractor in ${nearLoc.name}`,
            url: `/areas/${nearLoc.slug}`
          });
        }
      });
    }
  }
  else if (currentLocationSlug && currentServiceSlug) {
    const loc = locations.find(l => l.slug === currentLocationSlug);
    const svc = services.find(s => s.slug === currentServiceSlug);
    
    if (loc && svc) {
      services.filter(s => s.slug !== svc.slug).slice(0, 10).forEach(otherSvc => {
        crossLinks.push({
          label: `${otherSvc.title} in ${loc.name}`,
          url: `/areas/${loc.slug}/${otherSvc.slug}`
        });
      });
      loc.nearby.slice(0, 15).forEach(near => {
        const nearLoc = locations.find(l => l.slug === near);
        if (nearLoc) {
          crossLinks.push({
            label: `${svc.title} in ${nearLoc.name}`,
            url: `/areas/${nearLoc.slug}/${svc.slug}`
          });
        }
      });
    }
  }
  else {
    const featuredServices = ['bungalow-construction', 'bathroom-renovation', 'kitchen-work', 'painting', 'tiles-work', 'full-interior-work'];
    featuredServices.forEach(svcSlug => {
      const svc = services.find(s => s.slug === svcSlug);
      if (svc) {
        topCities.forEach(locSlug => {
          const loc = locations.find(l => l.slug === locSlug);
          if (loc) {
            crossLinks.push({
              label: `${svc.title} in ${loc.name}`,
              url: `/areas/${loc.slug}/${svc.slug}`
            });
          }
        });
      }
    });
  }

  const uniqueLinks = Array.from(new Map(crossLinks.map(item => [item.url, item])).values());
  const displayLinks = uniqueLinks.slice(0, limit);

  if (displayLinks.length === 0) return null;

  return (
    <div className="w-full bg-[#050914] border border-white/5 rounded-2xl overflow-hidden mt-8 shadow-xl">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
            <MapPin size={16} className="text-orange-500" />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm">Popular Service Areas & Categories</h4>
            <p className="text-slate-500 text-xs mt-0.5">Explore more construction services across our network</p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="text-slate-400 shrink-0" /> : <ChevronDown className="text-slate-400 shrink-0" />}
      </button>

      {/* SEO DOM: The links must be in the DOM even if closed so Googlebot sees them. */}
      <div 
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 p-5 pt-0' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="h-px w-full bg-white/5 mb-5 hidden sm:block" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {displayLinks.map((link, i) => (
            <Link 
              key={i} 
              href={link.url}
              prefetch={false}
              className="text-slate-400 hover:text-orange-400 text-xs py-1.5 transition-colors flex items-center gap-2 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-orange-500 transition-colors shrink-0" />
              <span className="line-clamp-1">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
