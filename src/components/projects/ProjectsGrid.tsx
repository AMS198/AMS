'use client';
// src/components/projects/ProjectsGrid.tsx
// Client component: handles filter tabs, animations.
// Data is passed in from the SSG server component — no client-side fetch.

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, CheckCircle, Clock, FolderOpen } from 'lucide-react';
import { openQuotePopup } from '@/components/ui/QuotePopup';
import ModernCTA from '@/components/ui/ModernCTA';
import type { Project } from '@/app/projects/page';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.amscivilwork.in' },
    { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://www.amscivilwork.in/projects' },
  ],
};

interface Props { projects: Project[] }

export default function ProjectsGrid({ projects }: Props) {
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed'>('all');
  const [gridKey, setGridKey] = useState(0);

  const changeFilter = (f: 'all' | 'ongoing' | 'completed') => {
    setFilter(f);
    setGridKey(k => k + 1);
  };

  const filtered = filter === 'all' ? projects : projects.filter(p => p.status === filter);
  const counts = {
    all: projects.length,
    ongoing: projects.filter(p => p.status === 'ongoing').length,
    completed: projects.filter(p => p.status === 'completed').length,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Page header */}
      <section className="relative pt-40 pb-20 overflow-hidden" style={{ background: '#0B1120' }}>
        <div className="glow-orb w-[500px] h-[500px] opacity-15"
          style={{ background: 'radial-gradient(circle, #F97316, transparent 70%)', top: '-20%', right: '-10%' }} />
        <div className="relative container-custom">
          <div className="section-label">Portfolio</div>
          <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl mt-2">
            Our <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-slate-400 mt-3 max-w-xl text-sm leading-relaxed">
            Real projects, real results. Every project handled with <strong className="text-white">Professional Integrity</strong> — full transparency from start to handover.
          </p>
          <nav className="flex items-center gap-2 mt-4 text-slate-500 text-sm">
            <Link prefetch={false} href="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: '#F97316' }}>Projects</span>
          </nav>
        </div>
      </section>

      {/* Filter bar */}
      <div className="py-4 border-b" style={{ background: '#101827', borderColor: '#1E2D45' }}>
        <div className="container-custom flex items-center justify-between flex-wrap gap-3">
          <div className="flex gap-2">
            {(['all', 'ongoing', 'completed'] as const).map(tab => (
              <button key={tab} onClick={() => changeFilter(tab)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-200 flex items-center gap-1.5"
                style={filter === tab
                  ? { background: '#F97316', color: '#fff' }
                  : { border: '1px solid #1E2D45', color: '#94A3B8' }}>
                {tab === 'ongoing'   && <Clock size={11} />}
                {tab === 'completed' && <CheckCircle size={11} />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                <span className="opacity-60">({counts[tab]})</span>
              </button>
            ))}
          </div>
          <span className="text-slate-500 text-xs">{filtered.length} project{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Projects grid */}
      <section className="section-y" style={{ background: '#0B1120' }}>
        <div className="container-custom">
          {filtered.length === 0 ? (
            <div className="card p-16 text-center" style={{ color: '#475569' }}>
              <FolderOpen size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-base mb-2 text-slate-400">
                {projects.length === 0 ? 'No projects yet.' : `No ${filter} projects found.`}
              </p>
            </div>
          ) : (
            <div key={gridKey} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ModernCTA
        title="Want Us to Build Your Dream?"
        subtitle="Every project is a masterpiece in the making. Join our family of satisfied clients and let us start your construction journey today."
      />

      <style>{`
        .project-card {
          opacity: 0;
          animation: projectFadeUp 0.5s ease forwards;
        }
        @keyframes projectFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [activeImage, setActiveImage] = useState(0);
  return (
    <div id={project.slug} className="project-card card group overflow-hidden"
      style={{ animationDelay: `${Math.min(index * 80, 480)}ms` }}>
      <div className="relative h-56 overflow-hidden" style={{ background: '#161F2E' }}>
        {project.images?.[0] ? (
          <Image src={encodeURI(project.images[activeImage] ?? project.images[0])} alt={project.title}
            fill unoptimized={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2" style={{ background: '#161F2E' }}>
            <FolderOpen size={28} style={{ color: '#1E2D45' }} />
            <span className="text-slate-600 text-xs">No photo added yet</span>
          </div>
        )}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-mono font-bold uppercase flex items-center gap-1.5"
          style={project.status === 'ongoing'
            ? { background: 'rgba(59,130,246,0.92)', color: '#fff' }
            : { background: 'rgba(249,115,22,0.92)', color: '#fff' }}>
          {project.status === 'ongoing' ? <Clock size={10} /> : <CheckCircle size={10} />}
          {project.status}
        </span>
        {(project.images?.length ?? 0) > 1 && (
          <div className="absolute bottom-2.5 inset-x-0 flex justify-center gap-1.5">
            {project.images.map((_, i) => (
              <button key={i} onClick={() => setActiveImage(i)} className="rounded-full transition-all duration-150"
                style={{ width: activeImage === i ? '18px' : '6px', height: '6px',
                  background: activeImage === i ? '#F97316' : 'rgba(255,255,255,0.4)' }} />
            ))}
          </div>
        )}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(11,17,32,0.75) 0%, transparent 55%)' }} />
      </div>
      <div className="p-5">
        <span className="text-[11px] font-mono uppercase tracking-widest" style={{ color: '#F97316' }}>
          {project.category || 'Construction'}
        </span>
        <h3 className="text-white font-semibold text-base mt-1 mb-2 leading-snug group-hover:text-orange-400 transition-colors duration-200">
          {project.title}
        </h3>
        {project.description && (
          <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">{project.description}</p>
        )}
        <div className="flex flex-wrap gap-3 text-xs pt-3" style={{ borderTop: '1px solid #1E2D45', color: '#475569' }}>
          <span className="flex items-center gap-1.5"><MapPin size={11} style={{ color: '#F97316' }} />{project.location}</span>
          {project.completedDate && (
            <span className="flex items-center gap-1.5"><Calendar size={11} style={{ color: '#F97316' }} />{project.completedDate}</span>
          )}
        </div>
      </div>
    </div>
  );
}
