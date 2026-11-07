'use client';
// src/components/projects/ProjectsGrid.tsx
// Ultra-Professional Architectural Portfolio Page.
// Features:
// 1. Natural non-sticky layout (zero card clipping or bleed).
// 2. Multi-image mastery: Smart photo badge (e.g. 📷 1/4 Photos), hover arrow controls, pill progress indicator.
// 3. Fullscreen Architectural Lightbox Modal with thumbnail filmstrip, keyboard navigation & instant quote actions.
// 4. Discipline and Mumbai locality quick-filtering.

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin, Calendar, CheckCircle2, Clock, FolderOpen,
  Search, ShieldCheck, ArrowRight, Sparkles, X, Award,
  Camera, ChevronLeft, ChevronRight, Maximize2,
  Building2, LayoutTemplate, Layers, Home
} from 'lucide-react';
import { openQuotePopup } from '@/components/ui/QuotePopup';
import ModernCTA from '@/components/ui/ModernCTA';
import { WhatsAppLogo } from '@/components/ui/BrandIcons';
import type { Project } from '@/app/projects/page';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amscivilwork.in' },
    { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://www.amscivilwork.in/projects' },
  ],
};

const DISCIPLINES = [
  { id: 'all', label: 'All Disciplines', icon: Sparkles },
  { id: 'renovation', label: 'Home Renovation', keywords: ['renovation'], icon: Home },
  { id: 'interior', label: 'Interior Civil Work', keywords: ['interior'], icon: LayoutTemplate },
  { id: 'commercial', label: 'Commercial & Office', keywords: ['commercial'], icon: Building2 },
  { id: 'structural', label: 'Structural & Repairs', keywords: ['structur', 'waterproof'], icon: Layers },
  { id: 'architecture', label: 'Architecture & Exterior', keywords: ['architect', 'exterior'], icon: Award },
];

const POPULAR_LOCATIONS = [
  'Bandra',
  'Worli',
  'Juhu',
  'Andheri',
  'BKC',
  'Thane',
  'Colaba',
  'Mahalaxmi',
  'Powai',
];

interface Props {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: Props) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'ongoing'>('all');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Lightbox Modal State
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filtered list
  const filtered = useMemo(() => {
    return projects.filter((p) => {
      // Status filter
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;

      // Discipline filter
      if (selectedDiscipline !== 'all') {
        const item = DISCIPLINES.find((d) => d.id === selectedDiscipline);
        if (item?.keywords) {
          const pCat = (p.category || '').toLowerCase();
          const matches = item.keywords.some((kw) => pCat.includes(kw));
          if (!matches) return false;
        }
      }

      // Search query filter (matches title, location, description, or category)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = (p.title || '').toLowerCase().includes(query);
        const matchLoc = (p.location || '').toLowerCase().includes(query);
        const matchCat = (p.category || '').toLowerCase().includes(query);
        const matchDesc = (p.description || '').toLowerCase().includes(query);
        if (!matchTitle && !matchLoc && !matchCat && !matchDesc) return false;
      }

      return true;
    });
  }, [projects, statusFilter, selectedDiscipline, searchQuery]);

  const resetFilters = () => {
    setStatusFilter('all');
    setSelectedDiscipline('all');
    setSearchQuery('');
  };

  const handleLocationClick = (loc: string) => {
    if (searchQuery.toLowerCase() === loc.toLowerCase()) {
      setSearchQuery('');
    } else {
      setSearchQuery(loc);
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Fullscreen Photo Lightbox Modal */}
      <ProjectLightboxModal
        project={lightboxProject}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxProject(null)}
      />

      {/* ── LUXURY PORTFOLIO HERO ─────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-14 overflow-hidden bg-[#080D1A] border-b border-white/5">
        {/* Glow ambient orbs */}
        <div
          className="glow-orb w-[600px] h-[600px] opacity-15"
          style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)', top: '-15%', right: '-10%' }}
        />
        <div
          className="glow-orb w-[400px] h-[400px] opacity-10"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)', bottom: '-10%', left: '-5%' }}
        />

        <div className="relative container-custom z-10">
          {/* Top Verified Seal */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold tracking-wider uppercase mb-5">
            <Sparkles size={12} className="text-orange-500" />
            <span>Verified On-Site Execution • Mumbai &amp; MMR</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="font-display font-black text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.15] mb-4">
              Delivered <span className="text-gradient">Projects Portfolio</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Explore our delivered residential bungalows, penthouse overhauls, structural expansions, and luxury interior civil transformations across Mumbai, Thane, and Navi Mumbai.
            </p>

            {/* 3 Key Trust Metrics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-display font-black text-orange-400">200+</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Projects Delivered</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-display font-black text-orange-400">10+ Yrs</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Civil Legacy</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-display font-black text-orange-400">1-Year</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Legal Warranty</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLEAN FILTER & SEARCH CONTROLS SECTION (NATURAL FLOW, NON-STICKY) ────────────────── */}
      <section className="py-6 sm:py-8 bg-[#080E1C] border-b border-white/5 relative z-10">
        <div className="container-custom space-y-4">
          {/* Row 1: Search Bar & Status Segments */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects (e.g. Bandra, Worli, Kitchen)..."
                className="w-full bg-[#0E1626] border border-white/10 text-white placeholder:text-slate-400 text-xs sm:text-sm rounded-xl pl-9 pr-8 py-2.5 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  title="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Status Segmented Control */}
            <div className="grid grid-cols-3 sm:inline-flex items-center gap-1 p-1 rounded-xl bg-[#0E1626] border border-white/10 shrink-0">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-center ${
                  statusFilter === 'all'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                All Works
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('completed')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  statusFilter === 'completed'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <CheckCircle2 size={12} className={statusFilter === 'completed' ? 'text-white' : 'text-emerald-400'} />
                <span>Completed</span>
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('ongoing')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  statusFilter === 'ongoing'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Clock size={12} className={statusFilter === 'ongoing' ? 'text-white' : 'text-amber-400'} />
                <span>In Progress</span>
              </button>
            </div>
          </div>

          {/* Row 2: Discipline Filter Pills (Horizontal Scroll with Safe Edge Padding) */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 px-1 no-scrollbar -mx-1 sm:mx-0">
            {DISCIPLINES.map((disc) => {
              const isSelected = selectedDiscipline === disc.id;
              const IconComp = disc.icon;
              return (
                <button
                  key={disc.id}
                  type="button"
                  onClick={() => setSelectedDiscipline(disc.id)}
                  className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 border border-orange-400/50 scale-[1.02]'
                      : 'bg-[#0E1626] border border-white/10 text-slate-300 hover:text-white hover:bg-[#152033]'
                  }`}
                >
                  <IconComp size={13} className={isSelected ? 'text-white' : 'text-orange-400'} />
                  <span>{disc.label}</span>
                </button>
              );
            })}
          </div>

          {/* Row 3: Quick Location Shortcuts (Horizontal Scroll with Safe Edge Padding) */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 px-1 no-scrollbar text-xs text-slate-400 -mx-1 sm:mx-0">
            <span className="shrink-0 text-[11px] font-mono uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
              <MapPin size={11} className="text-orange-400" />
              <span>Areas:</span>
            </span>
            {POPULAR_LOCATIONS.map((loc) => {
              const isLocActive = searchQuery.toLowerCase() === loc.toLowerCase();
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => handleLocationClick(loc)}
                  className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                    isLocActive
                      ? 'bg-orange-500 text-white font-bold shadow-md shadow-orange-500/25'
                      : 'bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 hover:text-white'
                  }`}
                >
                  {loc}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROJECTS SHOWCASE GRID ────────────────────────────────── */}
      <section className="py-10 sm:py-14 pb-28 sm:pb-36 bg-[#050914] min-h-[500px]">
        <div className="container-custom">
          {/* Active Filter Notification */}
          {(statusFilter !== 'all' || selectedDiscipline !== 'all' || searchQuery) && (
            <div className="flex items-center justify-between gap-3 mb-6 p-3 rounded-xl bg-white/[0.02] border border-white/10 text-xs">
              <div className="flex flex-wrap items-center gap-2 text-slate-300">
                <span>Showing <strong>{filtered.length}</strong> matching projects</span>
                {statusFilter !== 'all' && (
                  <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[10px] font-bold uppercase">
                    Status: {statusFilter === 'ongoing' ? 'In Progress' : 'Completed'}
                  </span>
                )}
                {selectedDiscipline !== 'all' && (
                  <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[10px] font-bold">
                    Discipline: {DISCIPLINES.find((d) => d.id === selectedDiscipline)?.label}
                  </span>
                )}
                {searchQuery && (
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px]">
                    &ldquo;{searchQuery}&rdquo;
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="text-orange-400 hover:text-orange-300 font-bold underline cursor-pointer shrink-0"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Grid or Empty State */}
          {filtered.length === 0 ? (
            <div className="p-12 sm:p-16 rounded-3xl bg-[#0B1120] border border-white/10 text-center max-w-lg mx-auto">
              <FolderOpen size={44} className="mx-auto mb-3 text-slate-600" />
              <h3 className="text-white font-display font-bold text-lg mb-1.5">No Matching Projects Found</h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-5 leading-relaxed">
                We couldn&apos;t find any project matching your search or filter criteria. Try clearing the filters to view all delivered works.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="btn-primary text-xs px-5 py-2.5"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onOpenLightbox={(proj, imgIdx) => {
                    setLightboxProject(proj);
                    setLightboxIndex(imgIdx);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── EXECUTION PROTOCOL & TRUST BAR ────────────────────────── */}
      <section className="py-12 bg-[#0B1120] border-t border-white/5">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                <Award size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">100% In-House Master Masons</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Zero subcontracting. Every slab, tile joint, and waterproofing coat is executed by our permanent payroll artisans.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Milestone-Locked Pricing</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Transparent line-item BOQ with clear inspection milestones before any payment release.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">1-Year Workmanship Warranty</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Formal written warranty handover covering structural alignment, tiling bond, and water seepage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGH-CONVERTING BOTTOM CTA ──────────────────────────── */}
      <ModernCTA
        title="Ready to Start Your Construction Project?"
        subtitle="Book a complimentary on-site measurement scan with our senior civil engineer. We provide an itemized BOQ estimate with zero obligation."
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   ARCHITECTURAL PROJECT CARD (MULTI-PHOTO MASTERY)
───────────────────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  onOpenLightbox,
}: {
  project: Project;
  index: number;
  onOpenLightbox: (project: Project, index: number) => void;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const totalImages = project.images?.length || 0;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImage((prev) => (prev + 1) % totalImages);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImage((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const currentImageSrc = project.images?.[activeImage] || project.images?.[0];

  const whatsappMessage = encodeURIComponent(
    `Hi Kedar ji, I saw your project "${project.title}" in ${project.location}. I have a similar requirement for my property and would like a quote.`
  );
  const whatsappUrl = `https://wa.me/918779391690?text=${whatsappMessage}`;

  return (
    <div
      id={project.slug}
      className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#111928] via-[#0E1626] to-[#0A101D] border border-white/10 hover:border-orange-500/40 shadow-xl hover:shadow-[0_15px_40px_rgba(249,115,22,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
      style={{ animationDelay: `${Math.min(index * 60, 480)}ms` }}
    >
      {/* Ambient hover light */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-orange-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-orange-500/15 transition-colors" />

      <div>
        {/* Photo Canvas with Interactive Navigation */}
        <div
          onClick={() => totalImages > 0 && onOpenLightbox(project, activeImage)}
          className="relative h-60 sm:h-64 overflow-hidden bg-[#161F2E] cursor-pointer group/photo select-none"
        >
          {currentImageSrc ? (
            <Image
              src={encodeURI(currentImageSrc)}
              alt={`${project.title} — Construction in ${project.location}`}
              fill
              unoptimized={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover/photo:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#161F2E]">
              <FolderOpen size={32} className="text-slate-600" />
              <span className="text-slate-500 text-xs">Site Photograph</span>
            </div>
          )}

          {/* Top Left: Luxury Glass Status Badge (Strict z-10 inside canvas) */}
          {project.status === 'ongoing' ? (
            <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 bg-[#0A101D]/85 backdrop-blur-md text-amber-300 border border-amber-500/30 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>In Progress</span>
            </span>
          ) : (
            <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 bg-[#0A101D]/85 backdrop-blur-md text-emerald-300 border border-emerald-500/30 shadow-md">
              <CheckCircle2 size={11} className="text-emerald-400" />
              <span>Completed</span>
            </span>
          )}

          {/* Top Right: Multi-Photo Counter Badge (Strict z-10 inside canvas) */}
          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-[#0A101D]/85 backdrop-blur-md border border-white/15 text-slate-200 text-[10px] font-mono flex items-center gap-1.5 shadow-md">
            <Camera size={11} className="text-orange-400" />
            <span>{totalImages} {totalImages === 1 ? 'Photo' : 'Photos'}</span>
          </div>

          {/* Quick Arrow Controls for Multi-Photo Projects (Appear on Hover or Touch) */}
          {totalImages > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/70 hover:bg-orange-500 text-white backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-all duration-200 cursor-pointer shadow-xl hover:scale-110 active:scale-95"
                aria-label="Previous photo"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/70 hover:bg-orange-500 text-white backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-all duration-200 cursor-pointer shadow-xl hover:scale-110 active:scale-95"
                aria-label="Next photo"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          {/* Bottom Micro-Segment Line Indicator */}
          {totalImages > 1 && totalImages <= 5 && (
            <div className="absolute bottom-0 inset-x-0 flex gap-1.5 px-3.5 pb-2 z-10 pointer-events-none">
              {project.images.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 flex-1 ${
                    activeImage === i
                      ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.9)]'
                      : 'bg-white/30 backdrop-blur-sm'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Bottom Continuous Progress Bar for 6+ Photos */}
          {totalImages > 5 && (
            <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 z-10 pointer-events-none">
              <div
                className="h-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.9)] transition-all duration-300"
                style={{ width: `${((activeImage + 1) / totalImages) * 100}%` }}
              />
            </div>
          )}

          {/* Bottom Shadow Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A101D] via-transparent to-transparent pointer-events-none opacity-85" />

          {/* Click to Enlarge Hover Tag */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300">
            <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-xl">
              <Maximize2 size={12} className="text-orange-400" />
              <span>View Gallery ({totalImages} Photos)</span>
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-orange-400 font-bold">
              {project.category || 'Civil Construction'}
            </span>
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <MapPin size={12} className="text-orange-400 shrink-0" />
              <span className="truncate max-w-[150px]">{project.location}</span>
            </div>
          </div>

          <h3 className="text-white font-display font-bold text-base sm:text-lg mb-2 leading-snug group-hover:text-orange-400 transition-colors line-clamp-2">
            {project.title}
          </h3>

          {project.description && (
            <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 mb-3">
              {project.description}
            </p>
          )}

          {/* Milestone / Handover metadata */}
          <div className="flex items-center gap-3 text-xs text-slate-400 pt-2.5 border-t border-white/5">
            {project.completedDate ? (
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <Calendar size={12} className="text-orange-400" />
                <span>{project.completedDate}</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-amber-400">
                <Clock size={12} />
                <span>Active Project</span>
              </span>
            )}
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 ml-auto font-medium">
              <ShieldCheck size={13} />
              <span>Verified Site Execution</span>
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 sm:p-5 pt-0 flex items-center gap-2">
        <button
          type="button"
          onClick={() => openQuotePopup(project.title)}
          className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-orange-500 hover:text-white border border-white/10 hover:border-orange-500/50 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95 group/btn"
        >
          <span>Enquire BOQ</span>
          <ArrowRight size={13} className="text-orange-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all" />
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-950/40 active:scale-95 shrink-0"
          title="Discuss project on WhatsApp"
        >
          <WhatsAppLogo className="w-3.5 h-3.5 fill-white shrink-0" />
          <span>WhatsApp Quote</span>
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FULLSCREEN ARCHITECTURAL GALLERY LIGHTBOX MODAL
───────────────────────────────────────────────────────────── */
function ProjectLightboxModal({
  project,
  initialIndex,
  onClose,
}: {
  project: Project | null;
  initialIndex: number;
  onClose: () => void;
}) {
  const [currIdx, setCurrIdx] = useState(initialIndex);

  useEffect(() => {
    setCurrIdx(initialIndex);
  }, [initialIndex, project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrIdx((prev) => (prev + 1) % project.images.length);
      if (e.key === 'ArrowLeft') setCurrIdx((prev) => (prev - 1 + project.images.length) % project.images.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project || !project.images?.length) return null;

  const total = project.images.length;
  const currentImage = project.images[currIdx] || project.images[0];

  const whatsappMessage = encodeURIComponent(
    `Hi Kedar ji, I saw your project "${project.title}" in ${project.location}. I have a similar requirement for my property and would like a quote.`
  );
  const whatsappUrl = `https://wa.me/918779391690?text=${whatsappMessage}`;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/92 backdrop-blur-xl select-none animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col w-full max-w-6xl max-h-[96vh] rounded-3xl bg-[#080D1A] border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-[#0E1626]">
          <div className="flex items-center gap-3">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                project.status === 'ongoing'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {project.status === 'ongoing' ? 'In Progress' : 'Completed'}
            </span>
            <div className="min-w-0">
              <h3 className="text-white font-bold text-sm sm:text-base truncate max-w-xs sm:max-w-md">
                {project.title}
              </h3>
              <p className="text-slate-400 text-xs flex items-center gap-1">
                <MapPin size={11} className="text-orange-400 shrink-0" />
                <span>{project.location}</span>
                <span className="text-slate-600">&bull;</span>
                <span className="text-orange-400 font-mono">{currIdx + 1} of {total} Photos</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-xs font-bold transition-all shadow-md"
            >
              <WhatsAppLogo className="w-3.5 h-3.5 fill-white" />
              <span>Discuss Project</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Image Viewport */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[460px] bg-black/60 flex items-center justify-center overflow-hidden">
          <Image
            src={encodeURI(currentImage)}
            alt={`${project.title} — Photo ${currIdx + 1}`}
            fill
            unoptimized={true}
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-contain p-2 sm:p-4"
          />

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => setCurrIdx((prev) => (prev - 1 + total) % total)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-orange-500 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => setCurrIdx((prev) => (prev + 1) % total)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-orange-500 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Modal Bottom Filmstrip Thumbnails */}
        {total > 1 && (
          <div className="p-3 sm:p-4 border-t border-white/10 bg-[#0E1626]/90 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {project.images.map((imgSrc, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrIdx(idx)}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 transition-all border-2 cursor-pointer ${
                  currIdx === idx
                    ? 'border-orange-500 scale-105 shadow-md shadow-orange-500/30'
                    : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                }`}
              >
                <Image
                  src={encodeURI(imgSrc)}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  unoptimized={true}
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
