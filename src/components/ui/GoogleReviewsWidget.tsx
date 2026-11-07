'use client';

import { useRef } from 'react';
import { Star, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { GoogleColorLogo } from '@/components/ui/BrandIcons';

const reviews = [
  {
    name: "Vikram Mehta",
    location: "Bandra West, Mumbai",
    date: "2 weeks ago",
    content: "AMS Civil Construction did an incredible job with our bungalow in Bandra. They were transparent about pricing from day one and finished the work right on schedule. The finishing quality is absolutely premium.",
    initials: "VM",
    rating: 5,
    tag: "Bungalow Construction"
  },
  {
    name: "Anjali Desai",
    location: "Andheri West, Mumbai",
    date: "1 month ago",
    content: "We hired them for a complete flat renovation in Andheri West. Their team is highly professional and handled everything from plumbing to false ceilings. Very happy with the final result!",
    initials: "AD",
    rating: 5,
    tag: "Flat Renovation"
  },
  {
    name: "Rohan Kapoor",
    location: "Juhu, Mumbai",
    date: "3 months ago",
    content: "Best civil contractor in Mumbai! Kedar sir personally supervised our site. They use only branded materials and the structural work is top-notch. Highly recommended.",
    initials: "RK",
    rating: 5,
    tag: "Structural Civil Work"
  },
  {
    name: "Suresh Patel",
    location: "Worli, Mumbai",
    date: "4 months ago",
    content: "The bathroom renovation was done in just 10 days. The waterproofing is perfect and the Italian marble looks gorgeous. Highly recommend!",
    initials: "SP",
    rating: 5,
    tag: "Bathroom & Marble"
  },
  {
    name: "Anita Desai",
    location: "Thane West",
    date: "6 months ago",
    content: "The POP ceiling work in our living room is a masterpiece. The cove lighting integration was done perfectly. Many guests mistake it for high-end interior design.",
    initials: "AD",
    rating: 5,
    tag: "POP & False Ceiling"
  },
  {
    name: "Vikram Gupta",
    location: "Powai, Mumbai",
    date: "7 months ago",
    content: "Solid workmanship on our villa project. The team is very responsive and keeps us updated at every stage. Thrilled with the progress and quality.",
    initials: "VG",
    rating: 5,
    tag: "Villa Civil Work"
  }
];

export default function GoogleReviewsWidget() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth;
      const scrollAmount = cardWidth > 768 ? cardWidth * 0.75 : cardWidth * 0.85;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#050914] border-t border-white/5 relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        {/* Section Header with Integrated Google Rating Badge */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center justify-between mb-10 sm:mb-12">
          <div className="text-left max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-orange-400 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Verified Client Reputation &bull; Mumbai</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl text-white">
              Trusted by Families <span className="text-gradient">Across Mumbai</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
              Real 5-star feedback on Google Maps from Mumbai homeowners, villas, and architects.
            </p>
          </div>

          {/* Upgraded Google Rating Badge */}
          <a 
            href="https://share.google/v9ZNhSlXDECsz2p58" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto p-4 sm:p-5 rounded-2xl bg-[#0E1626] border border-white/10 hover:border-orange-500/40 flex items-center justify-between sm:justify-start gap-4 sm:gap-6 backdrop-blur-md transition-all shadow-xl hover:scale-[1.02] group shrink-0"
            title="View AMS Civil Construction on Google Maps & Reviews"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2.5 shadow-inner shrink-0">
                <GoogleColorLogo className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-black text-2xl sm:text-3xl leading-none">4.9</span>
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-400 text-[11px] mt-1 group-hover:text-orange-400 transition-colors font-medium">
                  Based on 142+ Google Reviews
                </p>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-10 bg-white/10" />
            
            <div className="hidden sm:flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                Verified
              </span>
              <span className="text-slate-400 text-[10px] mt-1 font-semibold">Google Maps</span>
            </div>
          </a>
        </div>
      </div>

      {/* Reviews Carousel inside container with navigation */}
      <div className="container-custom relative z-10">
        <div className="flex items-center justify-between mb-5">
          <p className="text-slate-400 text-xs font-mono uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Verified 5-Star Experiences</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 hover:border-orange-500/50 text-slate-300 hover:text-white flex items-center justify-center transition-all hover:bg-orange-500/20 active:scale-95 shadow-md cursor-pointer"
              aria-label="Previous Reviews"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 hover:border-orange-500/50 text-slate-300 hover:text-white flex items-center justify-center transition-all hover:bg-orange-500/20 active:scale-95 shadow-md cursor-pointer"
              aria-label="Next Reviews"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {reviews.map((review, i) => (
            <div 
              key={i} 
              className="w-[88vw] sm:w-[360px] lg:w-[calc((100%-48px)/3)] shrink-0 snap-start rounded-3xl bg-gradient-to-b from-[#111928] via-[#0E1626] to-[#0A101D] border border-white/10 hover:border-orange-500/40 p-5 sm:p-6 transition-all duration-300 shadow-xl flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Subtle corner ambient glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-orange-500/10 transition-colors" />

              <div>
                {/* Reviewer Header */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-display font-bold text-sm shadow-sm shrink-0">
                      {review.initials}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-white font-bold text-sm truncate">{review.name}</h4>
                      <p className="text-slate-400 text-xs truncate flex items-center gap-1 mt-0.5">
                        <span>{review.location}</span>
                        <span className="text-slate-600">&bull;</span>
                        <span className="text-slate-500">{review.date}</span>
                      </p>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-1.5 shrink-0 shadow-sm">
                    <GoogleColorLogo className="w-4 h-4" />
                  </div>
                </div>
                
                {/* Star Rating & Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex text-amber-400 gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={13} fill="currentColor" />
                    ))}
                  </div>
                  {review.tag && (
                    <span className="text-[10px] font-mono font-medium text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full truncate">
                      {review.tag}
                    </span>
                  )}
                </div>
                
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                  &ldquo;{review.content}&rdquo;
                </p>
              </div>

              {/* Bottom Verified Footnote */}
              <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  <span>Verified Google Review</span>
                </span>
                <span className="text-slate-500 font-mono text-[10px]">5.0 Star</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="mt-10 sm:mt-12 flex justify-center pb-6 sm:pb-8">
          <a
            href="https://share.google/v9ZNhSlXDECsz2p58"
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white/5 border border-white/10 hover:border-orange-500/40 rounded-full text-white text-xs sm:text-sm font-semibold hover:bg-white/10 transition-all backdrop-blur-md shadow-xl group"
          >
            <GoogleColorLogo className="w-4 h-4" />
            <span>Read All 142+ Verified Reviews on Google Maps</span>
            <ExternalLink size={14} className="text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
