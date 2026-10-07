'use client';
// src/components/gallery/GalleryGrid.tsx
// Client component: handles category filter, lightbox, keyboard nav.
// Data is passed in from the SSG server component — no client-side fetch needed.

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ZoomIn, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import type { GalleryImage } from '@/app/gallery/page';

interface Props {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: Props) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [gridKey, setGridKey] = useState(0);

  const categories = ['All', ...Array.from(new Set(images.map(img => img.category)))];
  const filtered = activeCategory === 'All' ? images : images.filter(img => img.category === activeCategory);

  const switchCategory = (cat: string) => {
    setLightboxIndex(null);
    setActiveCategory(cat);
    setGridKey(k => k + 1);
  };

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null) return;
    if (e.key === 'ArrowRight') setLightboxIndex(i => ((i ?? 0) + 1) % filtered.length);
    if (e.key === 'ArrowLeft')  setLightboxIndex(i => ((i ?? 0) - 1 + filtered.length) % filtered.length);
    if (e.key === 'Escape')     setLightboxIndex(null);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <>
      {/* PAGE HEADER */}
      <section className="relative pt-52 pb-20 overflow-hidden" style={{ background: '#0B1120' }}>
        <div className="glow-orb w-[500px] h-[400px] opacity-15"
          style={{ background: 'radial-gradient(circle, #F97316, transparent 70%)', top: '-15%', right: '-8%' }} />
        <div className="relative container-custom">
          <div className="section-label animate-fadeIn">Portfolio</div>
          <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl mt-2 animate-fadeUp">
            Our <span className="text-gradient">Gallery</span>
          </h1>
          <p className="text-slate-400 mt-3 max-w-xl animate-fadeIn text-sm leading-relaxed">
            Browse our completed work — bungalows, kitchens, bathrooms, tiles, flooring &amp; interiors across Mumbai.
          </p>
          <nav className="flex items-center gap-2 mt-4 text-slate-500 text-sm animate-fadeIn">
            <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: '#F97316' }}>Gallery</span>
          </nav>
        </div>
      </section>

      {/* CATEGORY FILTER BAR */}
      <div className="py-4 border-b overflow-x-auto"
        style={{ background: '#101827', borderColor: '#1E2D45' }}>
        <div className="container-custom flex gap-2 flex-wrap min-w-max sm:min-w-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => switchCategory(cat)}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-200 whitespace-nowrap"
              style={activeCategory === cat
                ? { background: '#F97316', color: '#fff' }
                : { border: '1px solid #1E2D45', color: '#94A3B8' }}>
              {cat}
              <span className="ml-1.5 opacity-60 text-[10px]">
                ({cat === 'All' ? images.length : images.filter(i => i.category === cat).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* GALLERY GRID */}
      <section className="section-y" style={{ background: '#0B1120' }}>
        <div className="container-custom">
          {images.length > 0 && (
            <p className="text-slate-500 text-xs mb-6">
              Showing <span className="text-orange-400 font-semibold">{filtered.length}</span> photos
              {activeCategory !== 'All' && <> in <span className="text-white">{activeCategory}</span></>}
            </p>
          )}

          {filtered.length > 0 ? (
            <div key={gridKey} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((img, i) => (
                <button
                  key={`${img.src}-${i}`}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`View ${img.alt}`}
                  className="group relative overflow-hidden aspect-square gallery-item watermark-container"
                  style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}>
                  <Image src={encodeURI(img.src)} alt={img.alt} fill unoptimized={true}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(11,17,32,0.65)' }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn size={26} className="text-white drop-shadow" />
                    <span className="text-white text-[11px] font-mono uppercase tracking-widest bg-black/40 px-2 py-0.5">{img.category}</span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ background: '#F97316' }} />
                </button>
              ))}
            </div>
          ) : (
            <div className="card p-16 text-center text-slate-400 flex flex-col items-center gap-4">
              <Camera size={40} className="opacity-30" />
              <p>No photos in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.95)' }}>
          <button onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 p-2.5 transition-colors"
            style={{ color: 'rgba(255,255,255,0.6)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            aria-label="Close">
            <X size={26} />
          </button>
          {filtered.length > 1 && (
            <button onClick={() => setLightboxIndex(i => ((i ?? 0) - 1 + filtered.length) % filtered.length)}
              className="absolute left-3 sm:left-5 p-3 transition-all duration-200"
              style={{ background: '#161F2E', color: '#CBD5E1' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F97316'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#161F2E'; }}
              aria-label="Previous"><ChevronLeft size={22} /></button>
          )}
          <div className="relative flex items-center justify-center w-full h-full max-w-6xl max-h-[80vh] mx-auto px-6 sm:px-20">
            <div className="relative w-full h-full watermark-container shadow-2xl">
              <Image src={encodeURI(filtered[lightboxIndex].src)} alt={filtered[lightboxIndex].alt}
                fill unoptimized={true} sizes="(max-width: 1200px) 100vw, 1200px" className="object-contain rounded-sm" />
            </div>
          </div>
          {filtered.length > 1 && (
            <button onClick={() => setLightboxIndex(i => ((i ?? 0) + 1) % filtered.length)}
              className="absolute right-3 sm:right-5 p-3 transition-all duration-200"
              style={{ background: '#161F2E', color: '#CBD5E1' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F97316'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#161F2E'; }}
              aria-label="Next"><ChevronRight size={22} /></button>
          )}
          <div className="absolute bottom-5 inset-x-0 text-center px-4">
            <p className="text-white/80 text-sm font-medium">{filtered[lightboxIndex].alt}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-xs font-mono" style={{ color: '#F97316' }}>{lightboxIndex + 1} / {filtered.length}</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span className="text-xs text-slate-500">{filtered[lightboxIndex].category}</span>
            </div>
            {filtered.length <= 12 && (
              <div className="flex justify-center gap-1.5 mt-3">
                {filtered.map((_, i) => (
                  <button key={i} onClick={() => setLightboxIndex(i)}
                    className="rounded-full transition-all duration-200"
                    style={{ width: lightboxIndex === i ? '20px' : '6px', height: '6px',
                      background: lightboxIndex === i ? '#F97316' : 'rgba(255,255,255,0.25)' }} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .gallery-item {
          opacity: 0;
          animation: galleryFadeIn 0.45s ease forwards;
        }
        @keyframes galleryFadeIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
      `}</style>
    </>
  );
}
