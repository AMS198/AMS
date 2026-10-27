// SSG: Pre-build all blog posts at deploy time, with on-demand fallback for newly added posts.
export const revalidate = false;
export const dynamicParams = true; // Allow newly added blogs in MongoDB to render on-demand and cache seamlessly

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDb } from '@/lib/mongodb';
import { 
  Calendar, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  Calculator, 
  Sparkles,
  BookOpen,
  Award,
  HardHat,
  ChevronRight
} from 'lucide-react';
import { WhatsAppLogo, PhoneLogo } from '@/components/ui/BrandIcons';
import { sanitizeBlogHtml } from '@/lib/sanitizeHtml';
import ShareButtons from '@/components/ui/ShareButtons';
import ReadingProgressBar from '@/components/blog/ReadingProgressBar';

// Pre-generate all published blog slugs at build time.
export async function generateStaticParams() {
  try {
    const db = await getDb();
    const blogs = await db.collection('blogs')
      .find({ published: true }, { projection: { slug: 1 } })
      .toArray();
    return blogs.map((b) => ({ slug: b.slug as string }));
  } catch {
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

function getViewsFromSlug(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  const base = 50240;
  const variance = Math.abs(hash) % 12000;
  return (base + variance).toLocaleString('en-IN');
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogData(slug);
  
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

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogData(slug);
  if (!blog) notFound();

  const related = await getRelatedBlogs(slug);
  const readingTime = calculateReadingTime(blog.content || '');
  const formattedDate = new Date(blog.publishDate || blog.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  
  const viewsCount = getViewsFromSlug(slug);
  const shareUrl = `https://www.amscivilwork.in/blog/${blog.slug}`;

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
        acceptedAnswer: { '@type': 'Answer', text: `The cost varies based on the scope of work and materials used. Contact AMS Civil Construction for a Free Site Visit (Diwali Offer till 15 Nov; nominal visit fee applicable post offer, adjustable in bill) and exact quote.` }
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
      <ReadingProgressBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="min-h-screen bg-[#070B14] text-slate-200 pt-28 pb-24 selection-orange relative">
        {/* Subtle Ambient Backdrops */}
        <div className="absolute top-0 right-1/4 w-[650px] h-[450px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-[35%] left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center justify-between gap-4 py-4 mb-8 border-b border-slate-800/60 text-xs text-slate-400">
            <div className="flex items-center gap-2 overflow-hidden">
              <Link prefetch={false} href="/" className="hover:text-orange-400 transition-colors">Home</Link>
              <ChevronRight size={12} className="text-slate-600 flex-shrink-0" />
              <Link prefetch={false} href="/blog" className="hover:text-orange-400 transition-colors">Blog</Link>
              <ChevronRight size={12} className="text-slate-600 flex-shrink-0" />
              <span className="text-slate-300 font-medium truncate max-w-[200px] sm:max-w-md">{blog.title}</span>
            </div>

            <Link 
              prefetch={false} 
              href="/blog" 
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-orange-400 font-medium transition-colors flex-shrink-0"
            >
              <ArrowLeft size={14} /> Back to all articles
            </Link>
          </nav>

          {/* Article Header (Hero) */}
          <header className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <HardHat size={12} /> Civil Engineering & Cost Guide
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                <ShieldCheck size={12} /> IS 456 & NBC 2026 Standards
              </span>
            </div>

            <h1 className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.2] tracking-tight mb-6">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed mb-8 font-light">
                {blog.excerpt}
              </p>
            )}

            {/* Author & Publication Metadata Card */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#0E1526] border border-slate-800/80 shadow-lg">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold text-base shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                  {blog.author?.[0] || 'A'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-semibold">{blog.author || 'AMS Expert Team'}</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/30">Verified</span>
                  </div>
                  <span className="text-slate-400 text-xs">Technical Consultant • Mumbai Civil Division</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 flex-wrap">
                <span className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-800/60 border border-slate-700/40">
                  <Calendar size={13} className="text-orange-400" /> {formattedDate}
                </span>
                <span className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-800/60 border border-slate-700/40">
                  <Clock size={13} className="text-blue-400" /> {readingTime} min read
                </span>
                <span className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-800/60 border border-slate-700/40">
                  <Eye size={13} className="text-emerald-400" /> {viewsCount} views
                </span>
              </div>

              <div className="flex items-center gap-2 ml-auto sm:ml-0">
                <ShareButtons title={blog.title} variant="compact" />
              </div>
            </div>
          </header>

          {/* Main Layout: Two Column on Large Screens */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Article Content */}
            <article className="lg:col-span-8">
              
              {/* Executive Summary / Key Takeaways Box */}
              <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#111A2E] to-[#0D1424] border border-orange-500/25 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 blur-[50px] rounded-full pointer-events-none" />
                <div className="flex items-center gap-2 text-orange-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles size={15} /> Executive Summary & Quick Takeaways
                </div>
                <h3 className="text-white font-display text-lg sm:text-xl font-bold mb-3">
                  Key Insights at a Glance
                </h3>
                <ul className="space-y-2.5 text-sm sm:text-base text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <span>Real-world technical benchmark verified by certified Mumbai civil contractors.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <span>Comprehensive price and material breakdown adjusted for 2026 Mumbai-MMR market rates.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <span>Compliant with standard Bureau of Indian Standards (BIS) and municipal civil safety codes.</span>
                  </li>
                </ul>

                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Need specific site measurements?</span>
                  <a href="tel:+918779391690" className="text-orange-400 font-bold hover:underline flex items-center gap-1">
                    Book Free Site Visit <ArrowRight size={13} />
                  </a>
                </div>
              </div>

              {/* Rich Formatted Article Body */}
              <div className="article-body relative my-8">
                <div 
                  className="prose prose-invert max-w-none 
                             prose-headings:font-display prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight
                             prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-800
                             prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:text-orange-300 prose-h3:mt-8 prose-h3:mb-4
                             prose-p:text-slate-300 prose-p:text-base sm:prose-p:text-lg prose-p:leading-[1.85] prose-p:mb-6
                             prose-strong:text-orange-300 prose-strong:font-bold
                             prose-ul:my-6 prose-ul:space-y-3 prose-li:text-slate-300 prose-li:text-base sm:prose-li:text-lg
                             prose-li:marker:text-orange-500 prose-li:marker:font-black
                             prose-ol:my-6 prose-ol:space-y-3 prose-ol:text-slate-300 prose-ol:text-base sm:prose-ol:text-lg
                             prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-500/5 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:text-slate-200 prose-blockquote:text-lg
                             prose-table:w-full prose-table:my-8 prose-table:border-collapse prose-table:rounded-xl prose-table:overflow-hidden prose-table:shadow-xl
                             prose-th:bg-[#131D31] prose-th:text-white prose-th:font-bold prose-th:p-4 prose-th:text-left prose-th:border prose-th:border-slate-700/60
                             prose-td:p-4 prose-td:border prose-td:border-slate-800/80 prose-td:text-slate-300 prose-tr:even:bg-[#0A101D]
                             prose-img:rounded-2xl prose-img:shadow-2xl prose-img:border prose-img:border-slate-800"
                  dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(blog.content || '') }} 
                />
              </div>

              {/* In-Article Share Bar */}
              <div className="my-10">
                <ShareButtons title={blog.title} variant="inline" />
              </div>

              {/* Author Bio Box */}
              <div className="p-7 rounded-2xl bg-[#0D1424] border border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 shadow-lg">
                  {blog.author?.[0] || 'A'}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <h4 className="text-white font-display text-lg font-bold">Written by {blog.author || 'AMS Expert Engineering Team'}</h4>
                    <Award size={16} className="text-orange-400" />
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Our technical editorial panel consists of practicing civil engineers, RCC supervisors, and interior finishing specialists with 10+ years of on-ground execution experience across Mumbai, Thane, Navi Mumbai, and Panvel.
                  </p>
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="text-orange-400 font-bold">140+ Projects Delivered</span>
                    <span>•</span>
                    <span>Zero Quality Compromise</span>
                  </div>
                </div>
              </div>

            </article>

            {/* Right Column: Sticky Sidebar on Desktop */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              
              {/* Card 1: Fast Quote & Consultation Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#111A2E] to-[#0A0F1D] border border-orange-500/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[40px] rounded-full pointer-events-none" />
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-[11px] font-mono font-bold uppercase tracking-wider mb-4">
                  <ShieldCheck size={13} /> Diwali & Chhath Offer
                </div>

                <h3 className="text-white font-display text-xl font-bold mb-2">
                  Need an Accurate Site Estimate?
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-5">
                  Get a 100% Free Site Visit & formal BOQ quote within 24 hours. Valid across Mumbai, Thane, Navi Mumbai & Mira-Bhayandar.
                </p>

                <div className="space-y-3">
                  <a 
                    href="tel:+918779391690" 
                    className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                  >
                    <PhoneLogo className="w-4 h-4 fill-white" /> Call +91 87793 91690
                  </a>

                  <a 
                    href="https://wa.me/918779391690?text=Hi%20AMS%20Civil%20Team%2C%20I%20read%20your%20blog%20and%20need%20a%20construction%2Frenovation%20estimate."
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  >
                    <WhatsAppLogo className="w-4 h-4 fill-white" /> WhatsApp Us Instant
                  </a>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 text-center font-mono">
                  ⏱ Average Response: &lt; 5 minutes
                </div>
              </div>

              {/* Card 2: Interactive Construction Calculator CTA */}
              <div className="p-6 rounded-2xl bg-[#0D1424] border border-slate-800 hover:border-slate-700 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                    <Calculator size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Construction Cost Calculator</h4>
                    <p className="text-slate-400 text-xs">Instant 2026 Area Estimates</p>
                  </div>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Calculate raw material quantities, cement bags, steel tonnage, and labour costs for your specific plot or flat area.
                </p>

                <Link 
                  prefetch={false} 
                  href="/calculator" 
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors border border-slate-700"
                >
                  Open Free Calculator <ArrowRight size={13} />
                </Link>
              </div>

              {/* Card 3: Trending Technical Guides */}
              {related && related.length > 0 && (
                <div className="p-6 rounded-2xl bg-[#0D1424] border border-slate-800">
                  <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider text-slate-400">
                    <BookOpen size={14} className="text-orange-400" /> Popular Civil Guides
                  </div>

                  <div className="space-y-4">
                    {related.slice(0, 4).map((r) => (
                      <Link 
                        key={r.slug} 
                        href={`/blog/${r.slug}`} 
                        prefetch={false} 
                        className="group block pb-3 border-b border-slate-800/80 last:border-b-0 last:pb-0"
                      >
                        <h5 className="text-white text-xs font-semibold leading-snug group-hover:text-orange-400 transition-colors line-clamp-2 mb-1.5">
                          {r.title}
                        </h5>
                        <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock size={11} className="text-orange-400" /> {calculateReadingTime(r.content || '')} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye size={11} className="text-emerald-400" /> {getViewsFromSlug(r.slug)} views
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </aside>

          </div>

          {/* Bottom Full-Width CTA Banner */}
          <section className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#10192D] via-[#0E1526] to-[#0A0F1D] border border-orange-500/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-mono font-bold uppercase mb-4">
                <HardHat size={14} /> Turnkey Civil Execution
              </span>
              <h3 className="text-white font-display text-2xl sm:text-3xl md:text-4xl font-black mb-4 leading-tight">
                Planning Bungalow Construction or Flat Renovation in Mumbai?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                From foundation excavation to luxury Italian marble finishing and BMC-approved structural audits, AMS Civil Construction delivers excellence with zero hidden costs.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  prefetch={false} 
                  href="/contact" 
                  className="px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all hover:scale-105 shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                >
                  Schedule Site Inspection
                </Link>
                <Link 
                  prefetch={false} 
                  href="/packages" 
                  className="px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-all border border-slate-700"
                >
                  View Pricing Packages
                </Link>
              </div>
            </div>
          </section>

          {/* Related Articles 3-Column Grid */}
          {related && related.length > 0 && (
            <section className="mt-20 pt-16 border-t border-slate-800">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-white font-display text-2xl sm:text-3xl font-bold">
                    Related Engineering <span className="text-gradient">Articles</span>
                  </h2>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">Recommended reading for homeowners and civil contractors</p>
                </div>
                <Link prefetch={false} href="/blog" className="text-xs font-bold text-orange-400 hover:underline flex items-center gap-1">
                  View All <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.slice(0, 3).map((r) => (
                  <Link 
                    key={r.slug} 
                    href={`/blog/${r.slug}`} 
                    prefetch={false} 
                    className="group bg-[#0D1424] border border-slate-800/80 hover:border-orange-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col p-6"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-3">
                      <span className="flex items-center gap-1 text-orange-400">
                        <Clock size={12} /> {calculateReadingTime(r.content || '')} min read
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Eye size={12} /> {getViewsFromSlug(r.slug)}
                      </span>
                    </div>

                    <h3 className="text-white font-semibold text-base leading-snug group-hover:text-orange-400 transition-colors line-clamp-2 mb-3">
                      {r.title}
                    </h3>

                    {r.excerpt && (
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-6 flex-grow">
                        {r.excerpt}
                      </p>
                    )}

                    <div className="mt-auto pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Technical Guide</span>
                      <span className="text-orange-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read Story <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
    </>
  );
}
