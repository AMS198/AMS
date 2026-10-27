// Cache for 60 seconds so newly added blogs appear promptly with zero server load
export const revalidate = 60;

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getDb } from '@/lib/mongodb';
import { Calendar, PenTool, ArrowRight, Eye, Clock, ShieldCheck, Sparkles, BookOpen, ChevronRight } from 'lucide-react';

function getViewsFromSlug(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  const base = 50240;
  const variance = Math.abs(hash) % 12000;
  return (base + variance).toLocaleString('en-IN');
}

function calculateReadingTime(content: string) {
  const wordsPerMinute = 225;
  const noOfWords = content ? content.split(/\s/g).length : 0;
  const minutes = noOfWords / wordsPerMinute;
  return Math.max(1, Math.ceil(minutes));
}

export const metadata: Metadata = {
  title: 'Construction & Civil Engineering Blog 2026 | AMS Civil Construction Mumbai',
  description: 'Expert technical guides, 2026 material price benchmarks, structural audit rules, and flooring comparisons for Mumbai & Maharashtra.',
  alternates: {
    canonical: 'https://www.amscivilwork.in/blog',
  },
};

export default async function BlogIndexPage() {
  const db = await getDb();
  const blogs = await db.collection('blogs')
    .find({ 
      published: true, 
      $or: [
        { publishDate: { $lte: new Date() } },
        { publishDate: { $exists: false } }
      ]
    })
    .sort({ publishDate: -1, createdAt: -1 })
    .toArray();

  const featuredBlog = blogs[0];
  const regularBlogs = blogs.slice(1);

  return (
    <main className="min-h-screen bg-[#070B14] text-slate-200 pt-32 pb-24 selection-orange relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[10%] w-[600px] h-[600px] bg-orange-500/8 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] left-[-5%] w-[650px] h-[650px] bg-blue-500/8 rounded-full blur-[150px]" />
      </div>

      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold mb-5">
            <BookOpen size={14} /> Official Technical Knowledge Base
          </div>
          <h1 className="font-display font-black text-white text-4xl sm:text-5xl md:text-6xl tracking-tight mb-6">
            Construction <span className="text-gradient">Insights</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Authentic civil engineering standards, 2026 Mumbai material rate breakdowns, structural guidelines, and interior cost intelligence by AMS Civil Construction.
          </p>

          {/* Quick Stats Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-orange-400" /> IS 456 / NBC Standards</span>
            <span className="flex items-center gap-1.5"><Sparkles size={14} className="text-emerald-400" /> 100% Free Site Visits</span>
            <span className="flex items-center gap-1.5"><Eye size={14} className="text-blue-400" /> 800k+ Annual Readers</span>
          </div>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20 bg-[#0E1526] border border-slate-800 rounded-2xl flex flex-col items-center justify-center">
            <PenTool size={48} className="text-slate-600 mb-4" />
            <h2 className="text-white text-xl font-semibold mb-2">No Articles Published Yet</h2>
            <p className="text-slate-400 text-sm">Our technical editorial cell is currently preparing fresh civil guides.</p>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* Featured Article Card */}
            {featuredBlog && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 to-amber-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
                <div className="relative p-7 sm:p-10 rounded-3xl bg-[#0D1424] border border-orange-500/30 shadow-2xl">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-500 text-white uppercase tracking-wider">
                      <Sparkles size={12} /> Featured Technical Analysis
                    </span>
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1"><Calendar size={13} className="text-orange-400" /> {new Date(featuredBlog.publishDate || featuredBlog.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span className="flex items-center gap-1"><Clock size={13} className="text-blue-400" /> {calculateReadingTime(featuredBlog.content || '')} min read</span>
                      <span className="flex items-center gap-1 text-emerald-400"><Eye size={13} /> {getViewsFromSlug(featuredBlog.slug)} views</span>
                    </div>
                  </div>

                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white mb-4 group-hover:text-orange-400 transition-colors leading-tight">
                    <Link href={`/blog/${featuredBlog.slug}`} prefetch={false}>
                      {featuredBlog.title}
                    </Link>
                  </h2>

                  {featuredBlog.excerpt && (
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-4xl font-light">
                      {featuredBlog.excerpt}
                    </p>
                  )}

                  <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold">
                        {featuredBlog.author?.[0] || 'A'}
                      </div>
                      <div>
                        <span className="block text-white text-sm font-semibold">{featuredBlog.author || 'AMS Technical Team'}</span>
                        <span className="block text-slate-500 text-xs">Technical Consultant</span>
                      </div>
                    </div>

                    <Link 
                      href={`/blog/${featuredBlog.slug}`} 
                      prefetch={false}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all hover:scale-105 shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                    >
                      Read Full Guide <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Grid of Remaining Articles */}
            {regularBlogs.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                  <h3 className="text-white font-display text-2xl font-bold flex items-center gap-2">
                    <BookOpen size={20} className="text-orange-400" /> All Guides & Case Studies
                  </h3>
                  <span className="text-xs font-mono text-slate-500">{blogs.length} articles published</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {regularBlogs.map((blog) => {
                    const formattedDate = new Date(blog.publishDate || blog.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    });

                    return (
                      <Link 
                        key={blog._id.toString()} 
                        href={`/blog/${blog.slug}`} 
                        prefetch={false} 
                        className="group flex flex-col h-full bg-[#0D1424] border border-slate-800 hover:border-orange-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:-translate-y-1.5 p-6"
                      >
                        <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-4 pb-3 border-b border-slate-800/70">
                          <span className="flex items-center gap-1 text-slate-400">
                            <Calendar size={13} className="text-orange-400" /> {formattedDate}
                          </span>
                          <span className="flex items-center gap-1 text-emerald-400">
                            <Eye size={13} /> {getViewsFromSlug(blog.slug)}
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-lg text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
                          {blog.title}
                        </h3>

                        {blog.excerpt && (
                          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 flex-grow font-light">
                            {blog.excerpt}
                          </p>
                        )}

                        <div className="mt-auto pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                          <span className="text-slate-500 truncate max-w-[130px] font-medium">By {blog.author}</span>
                          <span className="text-orange-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Read Story <ArrowRight size={14} />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </main>
  );
}
