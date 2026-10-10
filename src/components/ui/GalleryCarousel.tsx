'use client';
// src/components/ui/GalleryCarousel.tsx
// Accepts gallery items as props from the SSG server component.
// No client-side fetch — data is embedded in the static HTML at build time.

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
}

interface Props {
  items: GalleryItem[];
}

export default function GalleryCarouselSection({ items }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: 'start', loop: true, skipSnaps: false, dragFree: false },
    [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  if (items.length < 3) return null;

  return (
    <section className="section-y" style={{ background: '#0B1120' }}>
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="section-label animate-on-scroll">Visual Portfolio</div>
            <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl text-white leading-tight animate-on-scroll">
              Gallery <span className="text-gradient">Highlights</span>
            </h2>
            <p className="text-slate-400 mt-3 max-w-xl text-sm lg:text-base animate-on-scroll">
              Peek into our recent transformations. From luxury bungalows to modern interiors, we bring craftsmanship to every corner.
            </p>
          </div>
        </div>

        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {items.map((item) => (
              <div key={item.id} className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] pl-4 md:pl-6 leading-none">
                <div className="group relative aspect-[3/2] overflow-hidden rounded-xl bg-[#161F2E] watermark-container">
                  <Image src={item.src} alt={item.title} fill unoptimized={true}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute inset-x-0 bottom-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 bg-[#F97316] text-white rounded mb-2 inline-block shadow-lg">
                      {item.category}
                    </span>
                    <h4 className="text-white font-display font-bold text-sm lg:text-base leading-tight group-hover:text-orange-400 transition-colors">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center animate-on-scroll">
          <Link prefetch={false} href="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-orange-500 transition-colors group">
            Explore Full Gallery <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <style>{`
        .embla__container {
          backface-visibility: hidden;
          display: flex;
          touch-action: pan-y pinch-zoom;
          margin-left: -1rem;
        }
        @media (min-width: 768px) { .embla__container { margin-left: -1.5rem; } }
        .embla__slide { min-width: 0; }
      `}</style>
    </section>
  );
}
