'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackClick, trackPageView } from '@/lib/tracker';

function determineLabel(el: HTMLElement): string {
  // 1. Explicit data-track-label attribute
  const explicit = el.getAttribute('data-track-label');
  if (explicit) return explicit;

  // 2. Detect context from parent containers
  if (el.closest('#main-nav') || el.closest('nav') || el.closest('header')) return 'navbar_or_header';
  if (el.closest('#top-banner') || el.closest('[class*="TopBanner"]')) return 'top_banner';
  if (el.closest('footer')) return 'footer';
  if (el.closest('[class*="StickyBottomCTA"]') || el.closest('.fixed.bottom-0')) return 'sticky_mobile_bottom';
  if (el.closest('[class*="WhatsAppButton"]') || el.closest('.z-\\[80\\]')) return 'floating_whatsapp_widget';
  if (el.closest('[class*="Modal"]') || el.closest('[role="dialog"]') || el.closest('[class*="Popup"]')) return 'popup_modal';
  if (el.closest('.card') || el.closest('[class*="Hero"]')) return 'body_card_or_hero';

  return (el.textContent || '').trim().slice(0, 30) || 'unknown_source';
}

export default function ClickTracker() {
  const pathname = usePathname();

  // Track pageview on route change (zero-ISR, bot-filtered, non-blocking beacon)
  useEffect(() => {
    trackPageView();
  }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest('a') as HTMLAnchorElement | null;
      const button = target.closest('button') as HTMLButtonElement | null;

      // Handle Anchor Links (Call & WhatsApp)
      if (link && link.href) {
        const href = link.href.trim();

        // 1. Phone Call
        if (href.startsWith('tel:')) {
          const rawPhone = href.replace('tel:', '').replace(/[^0-9+]/g, '');
          const label = determineLabel(link);
          trackClick('call', label, rawPhone);
          return;
        }

        // 2. WhatsApp Link
        if (href.includes('wa.me') || href.includes('api.whatsapp.com') || href.includes('whatsapp.com')) {
          const label = determineLabel(link);
          trackClick('whatsapp', label, href);
          return;
        }
      }

      // Handle custom tracking buttons
      const customEl = link || button;
      if (customEl) {
        const trackType = customEl.getAttribute('data-track-type');
        if (trackType === 'quote' || trackType === 'call' || trackType === 'whatsapp') {
          const label = determineLabel(customEl);
          trackClick(trackType as any, label, customEl.getAttribute('data-track-target') || '');
        }
      }
    }

    document.addEventListener('click', handleClick, { passive: true });
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
