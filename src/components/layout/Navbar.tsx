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
      <div className={clsx('fixed inset-0 z-40 lg:hidden transition-all duration-300',
        menuOpen ? 'pointer-events-auto' : 'pointer-events-none')}>
        <div className={clsx('absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300',
          menuOpen ? 'opacity-100' : 'opacity-0')}
          onClick={() => setMenuOpen(false)} />
        <nav className={clsx('absolute left-0 top-0 h-full w-72 flex flex-col pt-20 pb-8 px-6 transition-transform duration-300',
          menuOpen ? 'translate-x-0' : '-translate-x-full')}
          style={{ background: '#101827', borderRight: '1px solid #1E2D45' }}>

          <ul className="flex flex-col gap-1">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link prefetch={false} href={link.href}
                  className="block py-3 px-3 text-base font-medium transition-colors duration-150"
                  style={{
                    borderBottom: '1px solid #1E2D45',
                    color: pathname === link.href ? '#F97316' : '#CBD5E1',
                  }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3">
            <Link prefetch={false} href="/contact" className="btn-primary justify-center">Get Free Quote</Link>
            <a href="https://wa.me/918779391690" target="_blank" rel="noopener noreferrer"
              className="btn-outline justify-center gap-2">
              <WhatsAppLogo className="w-4 h-4 fill-[#F97316]" />
              WhatsApp Us
            </a>
          </div>

          <div className="mt-auto flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm" style={{ color: '#475569' }}>
              <PhoneLogo className="w-3.5 h-3.5 fill-[#F97316]" />
              <a href="tel:+918779391690" className="hover:text-orange-400 transition-colors font-mono">
                +91 87793 91690
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: '#475569' }}>
              <PhoneLogo className="w-3.5 h-3.5 fill-[#F97316]" />
              <a href="tel:+919004298911" className="hover:text-orange-400 transition-colors font-mono">
                +91 90042 98911
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}