'use client';

import { useRef } from 'react';
import { Star, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const reviews = [
  {
    name: "Vikram Mehta",
    date: "2 weeks ago",
    content: "AMS Civil Construction did an incredible job with our bungalow in Bandra. They were transparent about pricing from day one and finished the work right on schedule. The finishing quality is absolutely premium.",
    initials: "VM"
  },
  {
    name: "Anjali Desai",
    date: "1 month ago",
    content: "We hired them for a complete flat renovation in Andheri West. Their team is highly professional and handled everything from plumbing to false ceilings. Very happy with the final result!",
    initials: "AD"
  },
  {
    name: "Rohan Kapoor",
    date: "3 months ago",
    content: "Best civil contractor in Mumbai! Kedar sir personally supervised our site. They use only branded materials and the structural work is top-notch. Highly recommended.",
    initials: "RK",
    rating: 5
  },
  {
    name: "Suresh Patel",
    date: "4 months ago",
    content: "The bathroom renovation was done in just 10 days. The waterproofing is perfect and the Italian marble looks gorgeous. Highly recommend!",
    initials: "SP",
    rating: 5
  },
  {
    name: "Anita Desai",
    date: "6 months ago",
    content: "The POP ceiling work in our living room is a masterpiece. The cove lighting integration was done perfectly. Many guests mistake it for high-end interior design.",
    initials: "AD",
    rating: 5
  },
  {
    name: "Vikram Gupta",
    date: "7 months ago",
    content: "Solid workmanship on our villa project. The team is very responsive and keeps us updated at every stage. Thrilled with the progress and quality.",
    initials: "VG",
    rating: 4
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
    <section className="section-y bg-[#050914] border-t border-white/5 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-12">
          <div className="text-center md:text-left">
            <div className="section-label justify-center md:justify-start">Client Testimonials</div>
            <h2 className="font-display text-3xl lg:text-4xl text-white mt-4">
              Trusted by Families <br className="hidden md:block" />
              Across <span className="text-gradient">Mumbai</span>
            </h2>
          </div>

          <a 
            href="https://share.google/v9ZNhSlXDECsz2p58" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white/5 border border-white/10 hover:border-blue-500/40 rounded-2xl p-6 flex items-center gap-6 backdrop-blur-sm shrink-0 transition-all hover:scale-105 group"
            title="View AMS Civil Construction on Google Maps & Reviews"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-white font-bold text-4xl leading-none">4.9</span>
                <div className="flex flex-col text-yellow-400">
                  <div className="flex">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-xs mt-2 group-hover:text-blue-400 transition-colors">Based on 142 reviews</p>
            </div>
            
            <div className="w-[1px] h-12 bg-white/10 mx-2" />
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-1 group-hover:shadow-lg transition-shadow">
                <span className="font-bold text-xl" style={{ color: '#4285F4' }}>G</span>
              </div>
              <p className="text-slate-400 text-xs font-bold group-hover:text-white transition-colors">Google ★</p>
            </div>
          </a>
        </div>
      </div>

      {/* Reviews Carousel inside container with navigation */}
      <div className="container-custom relative z-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-400 text-xs font-mono uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Verified Google Reviews
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-orange-500 text-slate-300 hover:text-white flex items-center justify-center transition-all hover:bg-orange-500/80 active:scale-95 shadow-md"
              aria-label="Previous Reviews"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-orange-500 text-slate-300 hover:text-white flex items-center justify-center transition-all hover:bg-orange-500/80 active:scale-95 shadow-md"
              aria-label="Next Reviews"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {reviews.map((review, i) => (
            <div 
              key={i} 
              className="w-[85vw] sm:w-[360px] lg:w-[calc((100%-48px)/3)] shrink-0 snap-start bg-[#0B1120] border border-white/10 rounded-2xl p-6 hover:border-orange-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-lg">
                    {review.initials}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{review.name}</h4>
                    <p className="text-slate-500 text-xs">{review.date}</p>
                  </div>
                  <div className="ml-auto w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <span className="font-bold text-sm" style={{ color: '#4285F4' }}>G</span>
                  </div>
                </div>
                
                <div className="flex text-yellow-400 mb-3 gap-0.5">
                  {[1,2,3,4,5].map(star => <Star key={star} size={14} fill="currentColor" />)}
                </div>
                
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{review.content}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="container-custom relative z-10">
        
        <div className="mt-12 flex justify-center">
          <a href="https://share.google/v9ZNhSlXDECsz2p58" target="_blank" rel="noopener noreferrer" 
             className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white font-bold hover:bg-white/10 hover:border-orange-500/40 transition-colors backdrop-blur-sm">
            <span>Read verified reviews on Google Maps</span>
            <ExternalLink size={16} className="text-orange-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
