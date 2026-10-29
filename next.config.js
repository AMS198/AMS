/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  // Allow large image uploads
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  
  // SEO: Remove X-Powered-By header
  poweredByHeader: false,
  // SEO: Enable compression for better Core Web Vitals
  compress: true,
  // Fallback rewrites: automatically serve .jpg for any legacy .png requests
  async rewrites() {
    return [
      {
        source: '/images/:path*.png',
        destination: '/images/:path*.jpg',
      },
      {
        source: '/real-projects/:path*.png',
        destination: '/real-projects/:path*.jpg',
      },
    ];
  },
  // SEO: Redirect old broken URLs from Search Console
  async redirects() {
    return [
      { source: '/hi', destination: '/', permanent: true },
      { source: '/mr', destination: '/', permanent: true },
      { source: '/search', destination: '/', permanent: true },
      { source: '/areas/palghar', destination: '/areas', permanent: true },
      { source: '/areas/palghar/:path*', destination: '/areas', permanent: true },
      { source: '/areas/mumbai', destination: '/areas', permanent: true },
      { source: '/areas/mumbai/:path*', destination: '/areas', permanent: true },
      { source: '/areas/central-line', destination: '/areas', permanent: true },
      { source: '/areas/central-line/:path*', destination: '/areas', permanent: true },
      { source: '/areas/western-line', destination: '/areas', permanent: true },
      { source: '/areas/western-line/:path*', destination: '/areas', permanent: true },
      { source: '/areas/south-mumbai', destination: '/areas', permanent: true },
      { source: '/areas/south-mumbai/:path*', destination: '/areas', permanent: true },
      { source: '/areas/vile parle', destination: '/areas/vile-parle', permanent: true },
      { source: '/areas/vile parle/:path*', destination: '/areas/vile-parle/:path*', permanent: true },
      { source: '/areas/mira road', destination: '/areas/mira-road', permanent: true },
      { source: '/areas/mira road/:path*', destination: '/areas/mira-road/:path*', permanent: true },
      { source: '/areas/lower parel', destination: '/areas/lower-parel', permanent: true },
      { source: '/areas/lower parel/:path*', destination: '/areas/lower-parel/:path*', permanent: true },
      { source: '/areas/navi mumbai', destination: '/areas/navi-mumbai', permanent: true },
      { source: '/areas/navi mumbai/:path*', destination: '/areas/navi-mumbai/:path*', permanent: true },
      { source: '/areas/khar-road', destination: '/areas/khar', permanent: true },
      { source: '/areas/khar-road/:path*', destination: '/areas/khar/:path*', permanent: true },
      { source: '/areas/juhu-scheme', destination: '/areas/juhu', permanent: true },
      { source: '/areas/juhu-scheme/:path*', destination: '/areas/juhu/:path*', permanent: true },
      
      // Catch garbage URLs generated from old broken link tags
      { source: '/areas/:location/<a%20href=', destination: '/areas/:location', permanent: true },
      { source: '/areas/:location/%3Ca%20href=', destination: '/areas/:location', permanent: true },
      { source: '/areas/:location/%3Ca%20href%3D', destination: '/areas/:location', permanent: true },
      { source: '/blog/terrace-<a%20href=', destination: '/blog', permanent: true },
      { source: '/blog/terrace-%3Ca%20href=', destination: '/blog', permanent: true },
      { source: '/blog/terrace-%3Ca%20href%3D', destination: '/blog', permanent: true },
      
      // Redirect deleted/old blogs
      { source: '/blog/civil-contractor-agreement-rules-tips-marathi', destination: '/blog', permanent: true },
    ];
  },
  // SEO + Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://adservice.google.com; frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://pagead2.googlesyndication.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://images.unsplash.com https://res.cloudinary.com https://picsum.photos https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net; connect-src 'self' https://www.google-analytics.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://adservice.google.com;" },
        ],
      },
      {
        // Cache static assets aggressively — better Core Web Vitals & 0 Origin Hits
        source: '/:path*.(ico|png|jpg|jpeg|svg|webp|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/real-projects/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Edge Cache for public HTML pages: Keeps pre-rendered HTML in Vercel Edge memory
        // Prevents repeat Durable ISR Data Cache reads when Googlebot or visitors crawl pages
        source: '/:path(areas|services|hi|mr|about|contact|projects|gallery|blog|calculator|packages|partner|free-consultation|terms|privacy)/:subpath*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=2592000, stale-while-revalidate=86400' },
        ],
      },
      {
        source: '/:path(areas|services|hi|mr|about|contact|projects|gallery|blog|calculator|packages|partner|free-consultation|terms|privacy)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=2592000, stale-while-revalidate=86400' },
        ],
      },
      {
        source: '/',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=2592000, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
