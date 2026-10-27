// src/lib/tracker.ts
// Ultra-lightweight click tracker for WhatsApp, Calls, and CTAs.
// Uses navigator.sendBeacon (zero impact on page performance, ISR, or navigation).

export type ClickType = 'whatsapp' | 'call' | 'quote' | 'lead' | 'custom';

export interface TrackClickOptions {
  type: ClickType;
  label?: string;
  target?: string;
  page?: string;
  metadata?: Record<string, any>;
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
