// SSG: Purged on-demand when admin creates/updates/deletes a blog post.
export const revalidate = false;

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getDb } from '@/lib/mongodb';
import { Calendar, PenTool, ArrowRight, Eye } from 'lucide-react';
import AdsterraBanner from '@/components/ads/AdsterraBanner';

// Generate realistic deterministic view count >= 50,000 based on slug
function getViewsFromSlug(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  const base = 50240;
  const variance = Math.abs(hash) % 12000;
  return (base + variance).toLocaleString('en-IN');
}

// Force dynamic rendering so new blogs appear immediately (no caching delays)

export const metadata: Metadata = {
  title: 'Construction & Interior Design Blog | AMS Civil Construction',
  description: 'Expert tips, cost guides, and interior design inspiration for your home and office in Mumbai.',
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

  return (
    <main className="min-h-screen bg-[#080D1A] pt-32 pb-20 selection-orange">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono mb-4 animate-fadeIn">
            <PenTool size={14} /> Expert Articles & Guides
          </div>
          <h1 className="font-display font-black text-white text-4xl sm:text-5xl md:text-6xl mb-6">
            Construction <span className="text-gradient">Insights</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Stay updated with the latest trends, cost estimates, and deep-dive guides into civil construction and interior design in Mumbai.
          </p>
        </div>

        {/* Adsterra Banner Ad */}
        <div className="max-w-4xl mx-auto mb-12">
          <AdsterraBanner variant="728x90" />
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20 bg-[#101827] border border-[#1E2D45] rounded-xl flex flex-col items-center justify-center">
            <PenTool size={48} className="text-slate-600 mb-4" />
            <h2 className="text-white text-xl font-semibold mb-2">No Articles Yet</h2>
            <p className="text-slate-400">Our team is currently preparing amazing content. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => {
              const formattedDate = new Date(blog.publishDate || blog.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <React.Fragment key={blog._id.toString()}>
                  <Link href={`/blog/${blog.slug}`} prefetch={false} className="group flex flex-col h-full bg-[#101827] border border-[#1E2D45] hover:border-orange-500/40 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:-translate-y-1">
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} className="text-orange-400" /> {formattedDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={14} className="text-green-400" /> {getViewsFromSlug(blog.slug)} views
                        </span>
                      </div>

                      <h2 className="font-display font-bold text-xl text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                        {blog.title}
                      </h2>

                      {blog.excerpt && (
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                          {blog.excerpt}
                        </p>
                      )}

                      <div className="mt-auto pt-4 border-t border-[#1E2D45] flex items-center justify-between">
                        <span className="text-xs text-slate-500 font-medium">By {blog.author}</span>
                        <span className="text-orange-400 text-sm flex items-center gap-1 font-medium group-hover:gap-2 transition-all">
                          Read Story <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  </Link>
                  {/* Inject an Ad banner after every 3rd card */}
                  {(index + 1) % 3 === 0 && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center my-6">
                      <AdsterraBanner variant="728x90" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
