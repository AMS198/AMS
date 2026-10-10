// SSG: Pre-build all blog posts at deploy time.
// Cache is NEVER time-based — purged only when admin saves/updates a blog.
export const revalidate = false;
export const dynamic = 'force-static';
export const dynamicParams = false; // Strictly prevent on-demand ISR reads for missing slugs

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getDb } from '@/lib/mongodb';
import { Calendar, User, ArrowLeft, Share2, ShieldCheck, Clock, CheckCircle2, Facebook, Twitter, Linkedin, ArrowRight, Eye } from 'lucide-react';
import { WhatsAppLogo, PhoneLogo } from '@/components/ui/BrandIcons';
import { sanitizeBlogHtml } from '@/lib/sanitizeHtml';
import ShareButtons from '@/components/ui/ShareButtons';
import AdsterraBanner from '@/components/ads/AdsterraBanner';
import AdsterraNative from '@/components/ads/AdsterraNative';

// Pre-generate all published blog slugs at build time.
// Next.js will statically render each one — no Serverless invocations for reads.
export async function generateStaticParams() {
  try {
    const db = await getDb();
    const blogs = await db.collection('blogs')
      .find({ published: true }, { projection: { slug: 1 } })
      .toArray();
    return blogs.map((b) => ({ slug: b.slug as string }));
  } catch {
    // If DB is unreachable at build time, return empty — pages will generate on first hit
    return [];
  }
}
async function getBlogData(slug: string) {
  try {
    const db = await getDb();
    const blog = await db.collection('blogs').findOne({ slug, published: true });
    return blog;
  } catch (error) {
    console.error(`[Blog Engine] Failed to query blog details for slug ${slug}:`, error);
    return null;
  }
}

async function getRelatedBlogs(currentSlug: string) {
  try {
    const db = await getDb();
    // SEO: Use $sample to show random related blogs, increasing internal cross-links
    return await db.collection('blogs')
      .aggregate([
        { $match: { 
          slug: { $ne: currentSlug }, 
          published: true,
          $or: [{ publishDate: { $lte: new Date() } }, { publishDate: { $exists: false } }]
        }},
        { $sample: { size: 6 } }
      ])
      .toArray();
  } catch (e) {
    return [];
  }
}

function calculateReadingTime(content: string) {
  const wordsPerMinute = 225;
  const noOfWords = content ? content.split(/\s/g).length : 0;
  const minutes = noOfWords / wordsPerMinute;
  return Math.max(1, Math.ceil(minutes));
}

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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = await getBlogData(params.slug);
  
  if (!blog) return { title: 'Article Not Found' };

  const currentYear = new Date().getFullYear();
  const hasYear = blog.title.includes(currentYear.toString());
  const optimizedTitle = hasYear ? blog.title : `${blog.title} (${currentYear} Update)`;

  return {
    title: optimizedTitle,
    description: `⭐ ${blog.excerpt || `Read our expert guide on ${blog.title}.`} Get free estimates today!`,
    keywords: blog.seoKeywords || 'construction blog, civil contractors, ams civil construction',
    alternates: {
      canonical: `https://www.amscivilwork.in/blog/${blog.slug}`,
    },
    openGraph: {
      type: 'article',
      title: optimizedTitle,
      description: `⭐ ${blog.excerpt}`,
      publishedTime: new Date(blog.createdAt).toISOString(),
      authors: [blog.author || 'AMS Civil Construction'],
    },
  };
}

export default async function BlogArticlePage({ params }: { params: { slug: string } }) {
  const blog = await getBlogData(params.slug);
  if (!blog) notFound();

  const related = await getRelatedBlogs(params.slug);
  const readingTime = calculateReadingTime(blog.content || '');
  const formattedDate = new Date(blog.publishDate || blog.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  
  const viewsCount = getViewsFromSlug(params.slug);

  const shareUrl = `https://www.amscivilwork.in/blog/${blog.slug}`;
  const shareText = encodeURIComponent(`Check out this article: ${blog.title}`);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    author: { '@type': 'Person', name: blog.author || 'AMS Civil Construction' },
    datePublished: new Date(blog.publishDate || blog.createdAt).toISOString(),
    dateModified: new Date(blog.updatedAt || blog.createdAt).toISOString(),
    publisher: {
      '@type': 'Organization',
      name: 'AMS Civil Construction',
      logo: { '@type': 'Organization', name: 'AMS Civil', logo: 'https://www.amscivilwork.in/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': shareUrl },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the average cost of civil work in Mumbai?`,
        acceptedAnswer: { '@type': 'Answer', text: `The cost varies based on the scope of work and materials used. Contact AMS Civil Construction for a free site visit and exact quote.` }
      },
      {
        '@type': 'Question',
        name: `Is structural alteration safe in a flat?`,
        acceptedAnswer: { '@type': 'Answer', text: `Yes, as long as it does not interfere with load-bearing RCC columns or beams. Always hire a certified civil contractor.` }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="min-h-screen bg-[#080D1A] pt-32 pb-24 selection-orange relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-custom max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Sidebar Ad (Desktop Only) */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32 w-full">
                <AdsterraBanner variant="300x250" />
              </div>
            </aside>

            {/* Main Article Content */}
            <article className="flex-1 min-w-0 max-w-4xl mx-auto w-full">
          
          {/* Massive Top Banner Ad */}
          <div className="w-full mb-8 flex justify-center">
            <AdsterraBanner variant="728x90" />
          </div>

          {/* Breadcrumbs & Back */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <nav className="flex items-center gap-2 text-xs font-medium">
              <Link prefetch={false} href="/" className="text-slate-500 hover:text-orange-400 transition-colors">Home</Link>
              <span className="text-slate-700">/</span>
              <Link prefetch={false} href="/blog" className="text-slate-500 hover:text-orange-400 transition-colors">Blog</Link>
              <span className="text-slate-700">/</span>
              <span className="text-orange-400 truncate max-w-[150px] sm:max-w-xs">{blog.title}</span>
            </nav>
            <Link prefetch={false} href="/blog" className="hidden sm:inline-flex items-center gap-2 text-sm text-slate-400 hover:text-orange-400 transition-colors">
              <ArrowLeft size={16} /> All articles
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            <h1 className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-[#1E2D45]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold">
                  {blog.author?.[0] || 'A'}
                </div>
                <div>
                  <span className="block text-white text-sm font-semibold">{blog.author || 'Expert Team'}</span>
                  <span className="block text-slate-500 text-xs">Technical Consultant</span>
                </div>
              </div>

              <div className="h-8 w-px bg-[#1E2D45] hidden sm:block" />

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 flex-wrap">
                <span className="flex items-center gap-1.5 py-1 px-2 rounded bg-slate-800/50">
                  <Calendar size={13} className="text-orange-400" /> {formattedDate}
                </span>
                <span className="flex items-center gap-1.5 py-1 px-2 rounded bg-slate-800/50">
                  <Clock size={13} className="text-blue-400" /> {readingTime} min read
                </span>
                <span className="flex items-center gap-1.5 py-1 px-2 rounded bg-slate-800/50">
                  <Eye size={13} className="text-green-400" /> {viewsCount} views
                </span>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2 ml-auto">
                <a href={`https://wa.me/?text=${shareText}%20${shareUrl}`} target="_blank" rel="noopener noreferrer" 
                   className="p-2 rounded-full bg-[#F97316]/10 text-[#F97316] hover:bg-[#F97316] hover:text-white transition-all group">
                  <WhatsAppLogo className="w-4 h-4 fill-[#F97316] group-hover:fill-white" />
                </a>
                <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer" 
                   className="p-2 rounded-full bg-white/5 text-slate-300 hover:bg-blue-400 hover:text-white transition-all">
                  <Twitter size={16} />
                </a>
              </div>
            </div>
          </header>

          {/* Article Body */}
          <div className="relative">
            {/* Adsterra In-Content Ad (Top) */}
            <div className="w-full my-8">
              <AdsterraBanner variant="728x90" />
            </div>

            <div className="prose prose-invert prose-orange max-w-none 
                           prose-headings:font-display prose-headings:font-black
                           prose-h2:text-3xl prose-h2:text-white prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b-2 prose-h2:border-orange-500/20
                           prose-h3:text-2xl prose-h3:text-orange-100 prose-h3:mt-8
                           prose-p:text-slate-300 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-8
                           prose-strong:text-orange-400 prose-strong:font-bold
                           prose-ul:my-8 prose-ul:space-y-3 prose-li:text-slate-300
                           prose-li:marker:text-orange-500 prose-li:marker:font-black
                           prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-500/5 prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-xl
                           prose-img:rounded-2xl prose-img:shadow-2xl prose-img:border prose-img:border-[#1E2D45]"
                 dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(blog.content || '') }} />
          </div>

          {/* Adsterra Native Ad (Bottom — blends with content) */}
          <div className="w-full mt-12 mb-8">
            <AdsterraNative />
          </div>

          <div className="w-full my-8 flex justify-center">
            <AdsterraBanner variant="728x90" />
          </div>

          <div className="mt-8 px-2">
            <ShareButtons title={blog.title} />
          </div>

          {/* Location-Specific Lead Generation Banner */}
          <div className="mt-12 p-8 rounded-2xl relative overflow-hidden group shadow-2xl border border-orange-500/30" 
               style={{ background: 'linear-gradient(135deg, #101827 0%, #1E2D45 100%)' }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10 text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">
                  <ShieldCheck size={14} /> Verified Contractors
                </div>
                <h3 className="text-white font-display text-2xl sm:text-3xl font-black mb-2">
                  Looking for the Best Civil Contractor in <span className="text-orange-400">{blog.locationTags && blog.locationTags.length > 0 ? blog.locationTags[0] : 'Mumbai'}</span>?
                </h3>
                <p className="text-slate-300 text-md">Get a free site visit and estimate today. No hidden charges.</p>
              </div>
              <a href="tel:+918779391690" className="px-8 py-4 bg-orange-500 text-white font-black text-lg rounded-xl hover:bg-orange-600 transition-all hover:scale-105 shadow-[0_0_20px_rgba(249,115,22,0.4)] whitespace-nowrap flex items-center gap-2">
                <PhoneLogo className="w-5 h-5 fill-white" /> Call Now
              </a>
            </div>
          </div>

          {/* Author/Quality Box */}
          <div className="mt-12 p-8 rounded-2xl bg-[#101827] border border-[#1E2D45] flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 p-0.5 hidden sm:block">
              <div className="w-full h-full rounded-full bg-[#0B1120] flex items-center justify-center text-white font-bold text-2xl">
                {blog.author?.[0] || 'A'}
              </div>
            </div>
            <div>
              <p className="text-white font-bold text-lg mb-1">Written by {blog.author || 'AMS Expert Team'}</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our editorial team consists of civil engineers and interior designers with 15+ years of real-world site experience in Mumbai and across India.
              </p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-20 p-10 rounded-2xl relative overflow-hidden group shadow-2xl" 
               style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10 text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-white font-display text-3xl font-black mb-3">Planning your next project?</h3>
                <p className="text-white/90 text-lg">Detailed construction estimates and site visits available today.</p>
              </div>
              <Link prefetch={false} href="/contact" className="px-10 py-5 bg-[#0B1120] text-white font-black text-lg rounded-xl hover:bg-black transition-all hover:scale-105 shadow-xl whitespace-nowrap">
                Talk to Expert
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          {related && related.length > 0 && (
            <section className="mt-32 pt-20 border-t border-[#1E2D45]">
              <h2 className="font-display font-black text-3xl text-white mb-12 flex items-center gap-3">
                <CheckCircle2 className="text-orange-500" /> More from our <span className="text-gradient">Blog</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map(r => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} prefetch={false} className="group h-full bg-[#101827] border border-[#1E2D45] hover:border-orange-500/40 rounded-xl overflow-hidden transition-all">
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 mb-4 uppercase tracking-wider">
                        <span className="flex items-center gap-1"><Clock size={12} className="text-orange-400" /> {calculateReadingTime(r.content || '')} min</span>
                        <span className="flex items-center gap-1 ml-2"><Eye size={12} className="text-green-400" /> {getViewsFromSlug(r.slug)}</span>
                      </div>
                      <h3 className="text-white font-bold text-lg leading-tight mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">{r.title || 'Untitled Article'}</h3>
                      <p className="text-slate-500 text-xs line-clamp-3 mb-6">{r.excerpt}</p>
                      <span className="text-orange-400 text-xs font-bold flex items-center gap-1">Read Article <ArrowRight size={14}/></span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="w-full mt-12 flex justify-center">
            <AdsterraBanner variant="728x90" />
          </div>
            </article>

            {/* Right Sidebar Ad (Desktop Only) */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32 w-full">
                <AdsterraBanner variant="300x250" />
              </div>
            </aside>

          </div>
        </div>
      </main>
    </>
  );
}
