// src/lib/tracker.ts
// Ultra-lightweight click & visitor tracker for WhatsApp, Calls, CTAs, and Pageviews.
// Uses navigator.sendBeacon (zero impact on page performance, ISR, or bandwidth).

export type ClickType = 'whatsapp' | 'call' | 'quote' | 'lead' | 'custom' | 'pageview';

export interface TrackClickOptions {
  type: ClickType;
  label?: string;
  target?: string;
  page?: string;
  metadata?: Record<string, any>;
}

/**
 * Tracks a real visitor pageview (Client-side only, bot-filtered, session-debounced)
 * Zero impact on SSR, ISR, or Vercel Origin Transfer.
 */
export function trackPageView() {
  if (typeof window === 'undefined') return;

  const ua = navigator.userAgent;
  // Exclude bots and crawlers to keep visitor counts real and avoid serverless invocations
  if (/bot|crawl|spider|slurp|facebookexternalhit|googlebot|bingbot|yandex|baidu|semrush|ahrefs|lighthouse|headlesschrome/i.test(ua)) {
    return;
  }

  const page = window.location.pathname;

  // Debounce per page in current session (max 1 track per page per 10 minutes in same session)
  const sessionKey = 'ams_pv_' + page;
  try {
    const lastTracked = sessionStorage.getItem(sessionKey);
    if (lastTracked && Date.now() - Number(lastTracked) < 10 * 60 * 1000) {
      return;
    }
    sessionStorage.setItem(sessionKey, Date.now().toString());
  } catch {
    // sessionStorage might be restricted in incognito, proceed safely
  }

  // Parse readable traffic source
  let referrerSource = 'Direct / Bookmarks';
  try {
    const ref = document.referrer ? document.referrer.toLowerCase() : '';
    if (ref) {
      if (ref.includes('google.')) referrerSource = 'Google Search (Organic)';
      else if (ref.includes('bing.')) referrerSource = 'Bing Search';
      else if (ref.includes('instagram.com')) referrerSource = 'Instagram';
      else if (ref.includes('facebook.com') || ref.includes('fb.me')) referrerSource = 'Facebook';
      else if (ref.includes('wa.me') || ref.includes('whatsapp.com')) referrerSource = 'WhatsApp';
      else if (ref.includes('linkedin.com')) referrerSource = 'LinkedIn';
      else if (ref.includes('youtube.com')) referrerSource = 'YouTube';
      else if (ref.includes('justdial.com')) referrerSource = 'Justdial';
      else if (ref.includes('indiamart.com')) referrerSource = 'IndiaMART';
      else if (!ref.includes(window.location.hostname)) {
        try {
          referrerSource = new URL(ref).hostname;
        } catch {
          referrerSource = ref.slice(0, 50);
        }
      }
    }
  } catch {
    referrerSource = 'Direct / Organic';
  }

  const isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone/i.test(ua);
  const device = isMobile ? 'mobile' : 'desktop';

  const payload = JSON.stringify({
    type: 'pageview',
    label: 'pageview',
    page,
    device,
    referrer: referrerSource,
    timestamp: new Date().toISOString(),
  });

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon('/api/track', blob);
    } else {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Silently ignore
  }
}

export function trackClick(type: ClickType, label = 'general', target = '', metadata: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  const page = window.location.pathname;
  const isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent);
  const device = isMobile ? 'mobile' : 'desktop';

  // 1. Google Analytics Event (if gtag exists)
  try {
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', `${type}_click`, {
        event_category: 'engagement',
        event_label: label,
        page_location: page,
        target_value: target,
      });
    }
  } catch {
    // Ignore GA errors
  }

  // 2. Direct lightweight sendBeacon to our backend (zero delay)
  try {
    const payload = JSON.stringify({
      type,
      label,
      target,
      page,
      device,
      referrer: document.referrer || '',
      timestamp: new Date().toISOString(),
      metadata,
    });

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon('/api/track', blob);
    } else {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Ignore tracking errors so user experience is never blocked
  }
}
