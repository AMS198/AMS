// src/app/not-found.tsx
// Premium, custom-branded 404 page for AMS Civil Construction
// Designed to keep both users and search crawlers engaged with premium styling and helpful paths.

import Link from 'next/link';
import { Home, ArrowRight, Phone, BookOpen, Hammer, MessageSquare } from 'lucide-react';
import { WhatsAppLogo } from '@/components/ui/BrandIcons';

export const metadata = {
  title: 'Page Not Found | AMS Civil Construction Mumbai',
  description: 'The page you are looking for has been moved or does not exist. Explore our home construction, bathroom renovation, and tiling services in Mumbai.',
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#080D1A] flex items-center justify-center pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden selection-orange">
      {/* ── Glowing Ambient Backdrops (Aesthetics) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-orange-500/10 rounded-full blur-[120px] animate-pulse2" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse2" style={{ animationDelay: '1.2s' }} />
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} 
        />
      </div>

      {/* ── Main Container (Glassmorphism + Layout) ── */}
      <div className="relative z-10 max-w-3xl w-full text-center p-8 sm:p-12 rounded-3xl glass backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-fadeUp">
        
        {/* Creative "404" Graphic */}
        <div className="relative inline-block mb-6">
          <h1 className="text-[100px] sm:text-[150px] font-display font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-500 drop-shadow-[0_10px_20px_rgba(249,115,22,0.25)] select-none animate-floatY">
            404
          </h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[160px] sm:w-[220px] h-2 bg-orange-500/20 rounded-full blur-sm" />
        </div>

        {/* Text Details */}
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4">
          Looking for <span className="text-gradient">Civil Experts</span>?
        </h2>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
          The page you requested might have been renamed, deleted, or doesn&apos;t exist. 
          Don&apos;t worry—our expert team has built robust pathways to help you get back on track.
        </p>

        {/* Action Grid (Interactive & Premium Hover States) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
          
          <Link prefetch={false} 
            id="btn-404-home"
            href="/" 
            className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 text-left transition-all duration-300 group hover:-translate-y-0.5 hover:bg-white/10"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0 text-orange-400 group-hover:bg-orange-500/20 transition-all">
              <Home size={20} />
            </div>
            <div>
              <span className="block text-white font-bold text-sm sm:text-base">Go to Homepage</span>
              <span className="block text-slate-500 text-xs mt-0.5">Explore our main showcases.</span>
            </div>
            <ArrowRight size={16} className="text-slate-500 group-hover:text-orange-400 ml-auto transition-colors group-hover:translate-x-0.5" />
          </Link>

          <Link prefetch={false} 
            id="btn-404-services"
            href="/services" 
            className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 text-left transition-all duration-300 group hover:-translate-y-0.5 hover:bg-white/10"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-blue-400 group-hover:bg-blue-500/20 transition-all">
              <Hammer size={20} />
            </div>
            <div>
              <span className="block text-white font-bold text-sm sm:text-base">Our Services</span>
              <span className="block text-slate-500 text-xs mt-0.5">Tiles, renovations, bungalows.</span>
            </div>
            <ArrowRight size={16} className="text-slate-500 group-hover:text-orange-400 ml-auto transition-colors group-hover:translate-x-0.5" />
          </Link>

          <Link prefetch={false} 
            id="btn-404-blog"
            href="/blog" 
            className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 text-left transition-all duration-300 group hover:-translate-y-0.5 hover:bg-white/10"
          >
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0 text-green-400 group-hover:bg-green-500/20 transition-all">
              <BookOpen size={20} />
            </div>
            <div>
              <span className="block text-white font-bold text-sm sm:text-base">Read Our Blog</span>
              <span className="block text-slate-500 text-xs mt-0.5">Renovation & cost guides.</span>
            </div>
            <ArrowRight size={16} className="text-slate-500 group-hover:text-orange-400 ml-auto transition-colors group-hover:translate-x-0.5" />
          </Link>

          <Link prefetch={false} 
            id="btn-404-contact"
            href="/contact" 
            className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 text-left transition-all duration-300 group hover:-translate-y-0.5 hover:bg-white/10"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0 text-purple-400 group-hover:bg-purple-500/20 transition-all">
              <MessageSquare size={20} />
            </div>
            <div>
              <span className="block text-white font-bold text-sm sm:text-base">Contact Support</span>
              <span className="block text-slate-500 text-xs mt-0.5">Talk to a civil supervisor.</span>
            </div>
            <ArrowRight size={16} className="text-slate-500 group-hover:text-orange-400 ml-auto transition-colors group-hover:translate-x-0.5" />
          </Link>

        </div>

        {/* ── Premium Quick Help Section (Wow Element) ── */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1120]/90 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-2xl rounded-full" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Need a fast construction estimate?</h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                Get high-quality bungalow construction, full-flat renovations, and tiling solutions. Free site measurement in Mumbai.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 flex-shrink-0">
              <a 
                id="btn-404-quick-call"
                href="tel:+918779391690" 
                className="btn-primary text-xs px-5 py-3 gap-2 rounded-xl"
              >
                <Phone size={14} className="fill-white" /> Call Now
              </a>
              <a 
                id="btn-404-quick-whatsapp"
                href="https://wa.me/918779391690?text=Hi! I got lost on your website, but I am looking for civil construction services." 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline text-xs px-5 py-3 gap-2 bg-white/5 border-orange-500/40 text-orange-400 rounded-xl hover:bg-orange-500 group/wa"
              >
                <WhatsAppLogo className="w-4 h-4 fill-orange-400 group-hover/wa:fill-white transition-colors" /> WhatsApp
              </a>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
