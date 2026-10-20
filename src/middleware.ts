import { NextResponse, type NextRequest } from 'next/server';

const CANONICAL_HOST = 'www.amscivilwork.in';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Check multiple headers — Vercel may use x-forwarded-host
  const host =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    '';

  const proto =
    (request.headers.get('x-forwarded-proto') || 'https').split(',')[0].trim();

  // ── Force HTTPS + www in production ────────────────────────
  // This catches:
  //   amscivilwork.in  → www.amscivilwork.in  (301)
  //   http://…         → https://…            (301)
  if (process.env.NODE_ENV === 'production') {
    const isHttp   = proto === 'http';
    const isNonWww = host.includes('amscivilwork.in') && !host.startsWith('www.');

    if (isHttp || isNonWww) {
      const destination = new URL(url.pathname + url.search, `https://${CANONICAL_HOST}`);
      return NextResponse.redirect(destination, 301);
    }

    // ── Normalize /areas/ URLs (handle spaces) ──────────────
    if (url.pathname.startsWith('/areas/') && (url.pathname.includes(' ') || url.pathname.includes('%20'))) {
      const normalizedPath = url.pathname.replace(/(\s+|%20)/g, '-');
      const destination = new URL(normalizedPath + url.search, `https://${CANONICAL_HOST}`);
      return NextResponse.redirect(destination, 301);
    }
  }

  const response = NextResponse.next();
  // Ensure browsers always revalidate HTML pages so updates are seen instantly
  response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, favicon.png, robots.txt, sitemap.xml
     */
    '/((?!api|_next/static|_next/image|favicon\\.ico|favicon\\.png|robots\\.txt|sitemap\\.xml).*)',
  ],
};
