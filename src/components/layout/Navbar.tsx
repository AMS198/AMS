'use client';
// src/components/layout/Navbar.tsx

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, HardHat } from 'lucide-react';
import { clsx } from 'clsx';
import { WhatsAppLogo, PhoneLogo } from '../ui/BrandIcons';

const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Packages', href: '/packages' },
  { label: 'Partner',  href: '/partner' },
  { label: 'Projects', href: '/projects' },
  { label: 'Gallery',  href: '/gallery' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Calculator', href: '/calculator' },
  { label: 'Contact',  href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let rafId = 0;
    const fn = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setScrolled(window.scrollY > 50));
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => { window.removeEventListener('scroll', fn); cancelAnimationFrame(rafId); };
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header 
        className="fixed inset-x-0 z-50 transition-all duration-400"
        style={{
          top: scrolled ? '0px' : 'var(--banner-height)',
          background: scrolled ? 'rgba(11,17,32,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          boxShadow: scrolled ? '0 2px 30px rgba(0,0,0,0.5)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(30,45,69,0.8)' : '1px solid transparent',
          padding: scrolled ? '12px 0' : '20px 0',
        }}>



        <nav className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link prefetch={false} href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-sm transition-transform duration-300 group-hover:scale-105">
              <Image 
                src="/logo.png" 
                alt="AMS Civil Construction Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
            <div className="leading-tight">
              <span className="block text-white font-display font-bold text-base tracking-tight">
                AMS Civil
              </span>
              <span className="block text-[10px] font-mono tracking-[0.18em] uppercase -mt-0.5"
                style={{ color: '#F97316' }}>Construction</span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-5">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link prefetch={false} href={link.href} className="nav-link pb-0.5 text-sm"
                  style={pathname === link.href
                    ? { color: '#F97316', borderBottom: '1px solid #F97316' } : {}}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link prefetch={false} href="/contact" className="btn-outline text-xs px-5 py-2.5">Get Quote</Link>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 transition-colors"
            style={{ color: menuOpen ? '#F97316' : '#CBD5E1' }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div className={clsx('fixed inset-0 z-[60] lg:hidden transition-all duration-300',
        menuOpen ? 'pointer-events-auto' : 'pointer-events-none')}>
        {/* Backdrop */}
        <div className={clsx('absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300',
          menuOpen ? 'opacity-100' : 'opacity-0')}
          onClick={() => setMenuOpen(false)} />
        
        {/* Drawer Panel */}
        <nav className={clsx('absolute left-0 top-0 h-full w-80 max-w-[85vw] flex flex-col bg-[#0F172A] border-r border-white/10 shadow-2xl transition-transform duration-300',
          menuOpen ? 'translate-x-0' : '-translate-x-full')}>
          
          {/* Drawer Top Header (Logo + Close Button) */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 shrink-0">
            <Link prefetch={false} href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 overflow-hidden rounded-sm">
                <Image 
                  src="/logo.png" 
                  alt="AMS Civil Construction Logo" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
              <div className="leading-tight">
                <span className="block text-white font-display font-bold text-sm tracking-tight">
                  AMS Civil
                </span>
                <span className="block text-[9px] font-mono tracking-[0.18em] uppercase -mt-0.5 text-orange-400">
                  Construction
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMenuOpen(false)}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Drawer Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col justify-between">
            <ul className="space-y-1">
              {navLinks.map(link => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      prefetch={false}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={clsx(
                        'flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-all',
                        isActive
                          ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      )}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Bottom Contact & Action Area */}
            <div className="pt-5 mt-4 border-t border-white/10 space-y-3">
              <Link
                prefetch={false}
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full justify-center py-3 text-xs font-bold"
              >
                Get Free Quote
              </Link>
              <a
                href="https://wa.me/918779391690?text=Hi%20AMS%20Civil%20Construction,%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <WhatsAppLogo className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp Us</span>
              </a>

              <div className="pt-2 flex flex-col gap-1.5 text-xs text-slate-400">
                <a href="tel:+918779391690" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                  <PhoneLogo className="w-3.5 h-3.5 fill-[#F97316]" />
                  <span className="font-mono">+91 87793 91690</span>
                </a>
                <a href="tel:+919004298911" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                  <PhoneLogo className="w-3.5 h-3.5 fill-[#F97316]" />
                  <span className="font-mono">+91 90042 98911</span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}