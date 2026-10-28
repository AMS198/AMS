'use client';

// src/components/gallery/GalleryGrid.tsx
// High-end Architectural Gallery Portfolio
// Features: Real-time search, category pill filter, progressive loading,
// interactive card overlays, direct WhatsApp enquiry per photo, and fullscreen luxury lightbox.

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Search,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Phone,
  RotateCcw,
  SlidersHorizontal,
  Home,
  Layers,
  ArrowRight
} from 'lucide-react';
import { WhatsAppLogo } from '@/components/ui/BrandIcons';
import type { GalleryImage } from '@/app/gallery/page';
import ModernCTA from '@/components/ui/ModernCTA';

interface Props {
  images: GalleryImage[];
}

const ITEMS_PER_PAGE = 24;

export default function GalleryGrid({ images }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  // Clean and normalize categories
  const categories = useMemo(() => {
    const rawCategories = Array.from(new Set(images.map((img) => img.category?.trim() || 'General')));
    // Sort categories, placing 'All' first
    return ['All', ...rawCategories.filter((c) => c && c.toLowerCase() !== 'all')];
  }, [images]);

  // Filter images by both category and search query
  const filteredImages = useMemo(() => {
    let result = images;

    if (activeCategory !== 'All') {
      result = result.filter(
        (img) => (img.category?.trim() || 'General').toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (img) =>
          img.alt?.toLowerCase().includes(q) ||
          img.category?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [images, activeCategory, searchQuery]);

  // Reset visible count when filter or search changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory, searchQuery]);

  // Currently visible slice
  const visibleImages = useMemo(() => {
    return filteredImages.slice(0, visibleCount);
  }, [filteredImages, visibleCount]);

  // Keyboard navigation for lightbox
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') {
        setLightboxIndex((i) => ((i ?? 0) + 1) % filteredImages.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((i) => ((i ?? 0) - 1 + filteredImages.length) % filteredImages.length);
      }
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    },
    [lightboxIndex, filteredImages.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  const activeLightboxImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <>
      {/* ── HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 overflow-hidden bg-[#0B1120]">
        {/* Ambient Glows */}
        <div
          className="glow-orb w-[600px] h-[450px] opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #F97316 0%, rgba(249,115,22,0.1) 50%, transparent 70%)',
            top: '-10%',
            right: '-5%',
          }}
        />
        <div
          className="glow-orb w-[400px] h-[350px] opacity-15 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
            bottom: '0%',
            left: '-10%',
          }}
        />

        <div className="relative container-custom">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6 text-xs text-slate-400 font-medium">
            <Link prefetch={false} href="/" className="hover:text-orange-400 transition-colors">
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-orange-400 font-semibold">Project Gallery</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading & Trust */}
            <div className="lg:col-span-7">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-5 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <Sparkles size={13} className="text-orange-400" />
                <span>100% Real Site Photographs • Zero 3D Renders</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-5">
                Our Work Speaks Through{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200">
                  Every Detail
                </span>
              </h1>

              {/* Description */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
                Explore our portfolio of 200+ completed projects across Mumbai, Thane, and Navi Mumbai.
                From luxury RCC bungalows and penthouse overhauls to modular kitchen installations,
                Italian marble flooring, and leak-proof waterproofing.
              </p>

              {/* Key Trust Stats Pill Row */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <CheckCircle2 size={15} className="text-orange-400" />
                  <span className="text-xs text-slate-200 font-semibold">200+ Delivered Projects</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <ShieldCheck size={15} className="text-amber-400" />
                  <span className="text-xs text-slate-200 font-semibold">ISI-Certified Materials</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <Camera size={15} className="text-blue-400" />
                  <span className="text-xs text-slate-200 font-semibold">{images.length}+ Verified Photos</span>
                </div>
              </div>
            </div>

            {/* Right Column: Luxury Architectural Quality Assurance Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-br from-[#162238]/90 via-[#0F192C]/90 to-[#0A101D]/90 border border-white/10 p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm sm:text-base">AMS Quality Assurance</h3>
                      <p className="text-[11px] text-slate-400">Founded by Kedar Mandal • 10+ Years Legacy</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    Active Sites
                  </span>
                </div>

                <div className="space-y-3.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    <p>
                      <strong className="text-white">Direct Supervision:</strong> Every site is inspected daily by senior civil engineers &amp; master craftsmen.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    <p>
                      <strong className="text-white">Branded Materials:</strong> Ultratech / ACC 53 Grade Cement, Tata Tiscon TMT Steel, Asian Paints Royale.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    <p>
                      <strong className="text-white">Daily WhatsApp Reports:</strong> Photo and video updates sent directly to homeowners at every milestone.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400">
                    Need on-site assessment?
                  </div>
                  <a
                    href="https://wa.me/918779391690?text=Hi%20AMS%20Civil,%20I%20am%20browsing%20your%20Project%20Gallery%20and%20would%20like%20to%20book%20a%20free%20site%20visit."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    Book Free Site Visit <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER & SEARCH TOOLBAR ─────────────────────────────────── */}
      <section className="relative z-20 bg-[#0B1120] border-y border-white/10 shadow-md">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search photos by work type..."
                className="w-full bg-[#121B2E] border border-white/10 focus:border-orange-500/50 rounded-xl pl-9 pr-9 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category Pills (Horizontally Scrollable) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
              {categories.map((cat) => {
                const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
                const count =
                  cat === 'All'
                    ? images.length
                    : images.filter((img) => (img.category?.trim() || 'General').toLowerCase() === cat.toLowerCase()).length;

                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                    }}
                    className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                        : 'bg-[#121B2E] text-slate-300 hover:text-white hover:bg-[#1A2640] border border-white/10'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                        isActive ? 'bg-black/25 text-white' : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Filter Info & Reset */}
          {(activeCategory !== 'All' || searchQuery.trim()) && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5 text-xs text-slate-400">
              <div>
                Showing <span className="text-orange-400 font-bold">{filteredImages.length}</span> results
                {activeCategory !== 'All' && (
                  <span>
                    {' '}in <strong className="text-white">{activeCategory}</strong>
                  </span>
                )}
                {searchQuery.trim() && (
                  <span>
                    {' '}matching &quot;<strong className="text-white">{searchQuery}</strong>&quot;
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="flex items-center gap-1 text-orange-400 hover:text-orange-300 font-semibold transition-colors"
              >
                <RotateCcw size={12} />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── PHOTO GRID ──────────────────────────────────────────────── */}
      <section className="section-y bg-[#070C16] min-h-[500px]">
        <div className="container-custom">
          {filteredImages.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {visibleImages.map((img, i) => (
                  <div
                    key={`${img.src}-${i}`}
                    className="group relative rounded-2xl overflow-hidden bg-[#10192A] border border-white/10 hover:border-orange-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1"
                  >
                    {/* Image Container */}
                    <div
                      className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer"
                      onClick={() => setLightboxIndex(i)}
                    >
                      <Image
                        src={encodeURI((img.src || '').replace(/\.png$/i, '.jpg'))}
                        alt={img.alt || 'AMS Civil Construction'}
                        fill
                        unoptimized={true}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider font-bold bg-black/70 backdrop-blur-md text-amber-300 border border-white/10">
                          {img.category || 'Civil Work'}
                        </span>
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 size={10} /> Real Site
                        </span>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-orange-500/90 text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <ZoomIn size={22} />
                        </div>
                      </div>
                    </div>

                    {/* Card Meta & Quick Action */}
                    <div className="p-4 bg-[#10192A]">
                      <h4
                        className="text-white text-xs sm:text-sm font-semibold truncate hover:text-orange-400 cursor-pointer transition-colors"
                        onClick={() => setLightboxIndex(i)}
                        title={img.alt}
                      >
                        {img.alt || 'AMS Completed Civil Project'}
                      </h4>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                        <button
                          onClick={() => setLightboxIndex(i)}
                          className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                        >
                          <ZoomIn size={12} />
                          <span>View Fullscreen</span>
                        </button>

                        <a
                          href={`https://wa.me/918779391690?text=${encodeURIComponent(
                            `Hi AMS Civil Construction, I saw this project photo in your gallery: "${img.alt}". Can you share more details and a quote for similar work?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1 rounded-md transition-colors border border-emerald-500/20"
                        >
                          <WhatsAppLogo className="w-3.5 h-3.5 fill-current" />
                          <span>WhatsApp Quote</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progressive Load More Button */}
              {visibleCount < filteredImages.length && (
                <div className="mt-12 text-center">
                  <div className="inline-flex flex-col items-center gap-3">
                    <p className="text-xs text-slate-400">
                      Showing <strong className="text-white">{visibleCount}</strong> of{' '}
                      <strong className="text-white">{filteredImages.length}</strong> photographs
                    </p>
                    <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-300"
                        style={{ width: `${(visibleCount / filteredImages.length) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                        className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-500/20"
                      >
                        Load More Works ({filteredImages.length - visibleCount} remaining)
                      </button>
                      <button
                        onClick={() => setVisibleCount(filteredImages.length)}
                        className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs tracking-wide transition-all border border-white/10"
                      >
                        Show All
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="rounded-2xl border border-white/10 bg-[#10192A] p-12 text-center max-w-md mx-auto my-12">
              <div className="w-16 h-16 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center mx-auto mb-4">
                <Camera size={32} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">No photos found</h3>
              <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                We couldn&apos;t find any project photos matching your current category or search criteria.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 rounded-xl bg-orange-500 text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── HIGH-END LIGHTBOX MODAL ──────────────────────────────────── */}
      {lightboxIndex !== null && activeLightboxImage && (
        <div className="fixed inset-0 z-[200] flex flex-col justify-between bg-black/95 backdrop-blur-2xl">
          {/* Lightbox Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/10 bg-[#0B1120]/80">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-orange-500/20 text-orange-400 text-xs font-mono font-bold">
                {activeLightboxImage.category || 'Civil Work'}
              </span>
              <span className="text-slate-400 text-xs">
                {lightboxIndex + 1} of {filteredImages.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/918779391690?text=${encodeURIComponent(
                  `Hi AMS Civil Construction, I am viewing this project from your gallery: "${activeLightboxImage.alt}". Can you provide a consultation and price estimate?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-colors shadow-lg shadow-green-500/20"
              >
                <WhatsAppLogo className="w-4 h-4 fill-current" />
                <span>Enquire On WhatsApp</span>
              </a>

              <a
                href="tel:+918779391690"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
              >
                <Phone size={14} />
                <span>+91 87793 91690</span>
              </a>

              <button
                onClick={() => setLightboxIndex(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close fullscreen view"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Lightbox Viewport & Navigation */}
          <div className="relative flex-1 flex items-center justify-center p-4 sm:p-12 overflow-hidden">
            {/* Previous Button */}
            {filteredImages.length > 1 && (
              <button
                onClick={() =>
                  setLightboxIndex((i) => ((i ?? 0) - 1 + filteredImages.length) % filteredImages.length)
                }
                className="absolute left-2 sm:left-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-orange-500 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Current Image */}
            <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
              <Image
                src={encodeURI((activeLightboxImage.src || '').replace(/\.png$/i, '.jpg'))}
                alt={activeLightboxImage.alt}
                fill
                unoptimized={true}
                sizes="100vw"
                className="object-contain drop-shadow-2xl rounded-lg"
              />
            </div>

            {/* Next Button */}
            {filteredImages.length > 1 && (
              <button
                onClick={() => setLightboxIndex((i) => ((i ?? 0) + 1) % filteredImages.length)}
                className="absolute right-2 sm:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-orange-500 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Lightbox Footer Bar */}
          <div className="px-4 sm:px-8 py-4 border-t border-white/10 bg-[#0B1120]/90 text-center">
            <h4 className="text-white text-sm sm:text-base font-bold mb-1">
              {activeLightboxImage.alt || 'AMS Civil Construction Completed Work'}
            </h4>
            <p className="text-slate-400 text-xs">
              Direct execution by AMS Civil Construction in Mumbai, Thane &amp; Navi Mumbai.
            </p>
          </div>
        </div>
      )}

      {/* ── BOTTOM LUXURY CONVERSION CTA ────────────────────────────── */}
      <ModernCTA
        title="Inspired By Our Real Sites?"
        subtitle="Let's Build Your Dream Space Together."
        description="Get a transparent, itemised quotation with zero hidden fees. Book a 100% Free Site Visit anywhere in Mumbai, Thane, or Navi Mumbai with senior engineer site inspection."
      />
    </>
  );
}
