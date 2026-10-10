// src/app/areas/page.tsx
// /areas — master page listing all Mumbai service areas
// Redesigned with premium aesthetics

import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { locations } from '@/data/locations';
import ModernCTA from '@/components/ui/ModernCTA';

export const metadata: Metadata = {
  title: 'Service Areas in Mumbai & Across India | Best Construction Network',
  description:
    'AMS Civil Construction provides premium civil work in 80+ locations across Mumbai, Maharashtra, Karnataka, Jharkhand, and West Bengal. Search for the best civil contractor near you.',
  keywords: [
    'construction service areas', 'civil contractor near me', 'best builder in Mumbai', 
    'construction company Pune', 'civil work Bangalore', 'bungalow construction Ranchi',
    'renovation services Kolkata', 'all location construction company', 'top builders India'
  ],
  alternates: { canonical: 'https://www.amscivilwork.in/areas' },
};

// Dynamically extract unique zones from locations data
const zones = Array.from(new Set(locations.map(l => l.zone)));

export default function AreasPage() {
  return (
    <main className="min-h-screen bg-[#080D1A]">
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-white/5">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        </div>

        <div className="relative z-10 container-custom">
          <nav className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs text-slate-400 mb-8 animate-fadeIn">
            <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <ArrowRight size={10} className="opacity-50" />
            <span className="text-orange-400 font-medium">Service Areas</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold uppercase tracking-widest mb-6 animate-fadeUp">
              <Sparkles size={14} /> National Presence
            </div>
            <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-7xl leading-[1.1] mb-6 animate-fadeUp">
              Our Service <span className="text-gradient">Network</span>
            </h1>
            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl animate-fadeUp" style={{ animationDelay: '100ms' }}>
              From South Mumbai to North Mumbai and major cities across India — we provide premium civil construction 
              services in 50+ locations. Select your city to see our specialized local services.
            </p>
          </div>
        </div>
      </section>

      {/* ── Areas List ───────────────────────────────────── */}
      <section className="section-y bg-[#0B1120]">
        <div className="container-custom">
          {zones.map((zone, idx) => {
            const zoneLocations = locations.filter(l => l.zone === zone);
            return (
              <div key={zone} className="mb-20 animate-fadeIn" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-display text-2xl lg:text-3xl text-white font-bold whitespace-nowrap">{zone}</h2>
                  <div className="h-[1px] w-full bg-gradient-to-r from-orange-500/50 to-transparent" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {zoneLocations.map(loc => (
                    <Link key={loc.slug} href={`/areas/${loc.slug}`} prefetch={false}
                      className="group p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          <MapPin size={14} className={idx % 2 === 0 ? "text-orange-400 group-hover:text-white" : "text-blue-400 group-hover:text-white"} />
                        </div>
                        <span className="text-slate-300 group-hover:text-white font-medium text-sm transition-colors leading-tight">
                          {loc.name}
                        </span>
                        <ArrowRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-orange-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────── */}
      <ModernCTA 
        title="Ready to Start Your Project Anywhere in India?"
        subtitle="From Mumbai to Bangalore, we bring premium construction to your doorstep."
        description="AMS Civil Construction is expanding its footprint across major Indian cities. Whether you need a luxury bungalow in Pune, a modern office in Bangalore, or a retail renovation in Kolkata, our expert teams are ready to deliver excellence. We handle everything from site assessment to final handover."
      />
    </main>
  );
}

