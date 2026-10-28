'use client';
// src/components/layout/Footer.tsx — SEO-rich footer with service areas

import Link from 'next/link';
import Image from 'next/image';
import { HardHat, Mail, MapPin, Facebook, Instagram, Star } from 'lucide-react';
import { WhatsAppLogo, PhoneLogo, PinterestLogo, QuoraLogo } from '../ui/BrandIcons';
import SEOCrossLinks from '../ui/SEOCrossLinks';

const serviceLinks = [
  { label: 'Bungalow Construction',   href: '/services/bungalow-construction' },
  { label: 'Full Interior Civil Work',href: '/services/interior-civil-work'   },
  { label: 'Swimming Pool Work',      href: '/services/swimming-pool-work'    },
  { label: 'Compound Wall & Gates',   href: '/services/compound-wall-work'    },
  { label: 'Building Repair',         href: '/services/building-repair-work'  },
  { label: 'Bathroom Renovation',     href: '/services/bathroom-renovation'   },
  { label: 'Kitchen Work',            href: '/services/kitchen-work'          },
  { label: 'Tiles Work',              href: '/services/tiles-work'            },
  { label: 'Flooring Work',           href: '/services/flooring-work'         },
  { label: 'POP Work',                href: '/services/pop-work'              },
  { label: 'Plaster Work',            href: '/services/plaster-work'          },
  { label: 'Wall Work',               href: '/services/wall-work'             },
];

const quickLinks = [
  { label: 'Home',          href: '/'         },
  { label: 'About Us',      href: '/about'    },
  { label: 'Services',      href: '/services' },
  { label: 'Packages',      href: '/packages' },
  { label: 'Partner',       href: '/partner'  },
  { label: 'Projects',      href: '/projects' },
  { label: 'Gallery',       href: '/gallery'  },
  { label: 'Blog',          href: '/blog'     },
  { label: 'Contact',       href: '/contact'  },
  { label: 'Service Areas', href: '/areas'    },
];

const areaLinks = [
  { label: 'Bandra West & BKC',    href: '/areas/bandra'      },
  { label: 'Juhu & JVPD Scheme',   href: '/areas/juhu'        },
  { label: 'Khar & Khar Road',     href: '/areas/khar'        },
  { label: 'Andheri & Lokhandwala',href: '/areas/andheri'     },
  { label: 'Worli & Lower Parel',  href: '/areas/worli'       },
  { label: 'Prabhadevi & Dadar',   href: '/areas/prabhadevi'  },
  { label: 'Powai (Hiranandani)',  href: '/areas/powai'       },
  { label: 'Santacruz & Vile Parle',href:'/areas/santacruz'   },
  { label: 'Goregaon & Malad',     href: '/areas/goregaon'    },
  { label: 'Borivali & Kandivali', href: '/areas/borivali'    },
  { label: 'Malabar Hill & Colaba',href: '/areas/colaba'      },
  { label: 'Thane West',           href: '/areas/thane'       },
  { label: 'Vashi (Navi Mumbai)',  href: '/areas/vashi'       },
  { label: 'Mira Road & Bhayandar',href: '/areas/mira-road'   },
  { label: 'View All 384+ Areas →',href: '/areas'             },
];

const socialLinks = [
  { Icon: Facebook,  href: 'https://www.facebook.com/profile.php?id=61570712849063', label: 'Facebook'  },
  { Icon: Instagram, href: 'https://www.instagram.com/amscivilwork/', label: 'Instagram' },
  { Icon: PinterestLogo, href: 'https://in.pinterest.com/amsconstructionwork/', label: 'Pinterest' },
  { Icon: QuoraLogo,     href: 'https://mumbaiconstructionhomerenovationguide.quora.com/', label: 'Quora' },

];

export default function Footer() {
  return (
    <footer className="relative bg-[#050914] border-t border-[#1E2D45] overflow-hidden">
      
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ── CTA Banner ── */}
      <div className="relative mx-4 sm:mx-6 lg:mx-auto max-w-5xl mt-6 mb-10 rounded-2xl overflow-hidden border border-orange-500/25 shadow-xl bg-gradient-to-r from-[#10192A] via-[#142036] to-[#090F1C]">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[90px] pointer-events-none" />
        
        <div className="relative z-10 p-5 sm:p-6 lg:p-7 flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 text-center lg:text-left">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-mono font-semibold uppercase tracking-wider mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>Diwali Festive Offer • 100% Free Site Visit &amp; 24-Hr Quotation</span>
            </div>
            <h3 className="font-display text-white text-xl sm:text-2xl lg:text-3xl font-black leading-tight tracking-tight">
              Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200">Dream Project?</span>
            </h3>
            <p className="text-slate-300 text-xs sm:text-[13px] mt-1.5 leading-relaxed font-normal max-w-lg">
              Get an accurate, itemised estimate backed by 10+ years of civil engineering expertise. Zero hidden escalations, guaranteed handover dates.
            </p>
          </div>
          
          <div className="flex flex-wrap sm:flex-nowrap gap-2.5 w-full lg:w-auto shrink-0 justify-center">
            <a 
              href="tel:+918779391690"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all shadow-sm"
            >
              <PhoneLogo className="w-3.5 h-3.5 fill-orange-400" /> 
              <span>Call Us Now</span>
            </a>
            <a 
              href="https://wa.me/918779391690?text=Hi%20AMS%20Civil,%20I%20would%20like%20a%20detailed%20quotation%20for%20my%20construction%20project." 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-md shadow-green-500/20 transition-all hover:scale-[1.02]"
            >
              <WhatsAppLogo className="w-3.5 h-3.5 fill-white" /> 
              <span>WhatsApp Estimate</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Main content Grid ── */}
      <div className="container-custom relative z-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12">

          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col items-start pr-4">
            <Link prefetch={false} href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-12 h-12 overflow-hidden rounded-lg bg-white/5 p-1.5 border border-white/10 group-hover:border-orange-500/50 transition-colors">
                <Image 
                  src="/logo.png" 
                  alt="AMS Civil Construction Logo" 
                  fill 
                  className="object-contain p-1"
                />
              </div>
              <div className="leading-tight">
                <span className="block text-white font-display font-bold text-xl tracking-wide">AMS Civil</span>
                <span className="block text-[10px] font-mono tracking-[0.2em] text-orange-500 uppercase mt-0.5">Construction</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Mumbai&apos;s trusted construction partner for 10+ years and 200+ completed projects. We strictly follow all government rules and regulations to deliver excellence in every project.
            </p>
            <a 
              href="https://share.google/v9ZNhSlXDECsz2p58" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500/50 text-xs text-slate-300 hover:text-white transition-all mb-3 group"
            >
              <span className="text-yellow-400 font-bold">★ 4.9</span>
              <span className="text-slate-400 group-hover:text-slate-200">Google Verified Business</span>
              <span className="text-[10px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded font-mono">Reviews</span>
            </a>
            {/* Verified Business Directory Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <a 
                href="https://www.indiamart.com/ams-civil-work/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-500 text-xs text-slate-300 hover:text-white transition-all group"
                title="Verified Civil Contractor on IndiaMART"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-medium">IndiaMART</span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1 py-0.5 rounded font-mono">TrustSEAL</span>
              </a>
              <a 
                href="https://jsdl.in/DT-434YEUFG4BN" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 hover:border-blue-400 text-xs text-slate-300 hover:text-white transition-all group"
                title="Verified Listing on Justdial"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span className="text-slate-300 font-medium">Justdial</span>
                <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1 py-0.5 rounded font-mono">Verified</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label} 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:-translate-y-1 transition-all duration-300 shadow-lg">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Cols */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" /> Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={false} className="text-sm text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-orange-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" /> Services
            </h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.slice(0, 8).map(link => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={false} className="text-sm text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-orange-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" /> Contact Us
            </h4>
            <ul className="flex flex-col gap-5 text-left">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition-colors">
                  <MapPin size={14} className="text-orange-500" />
                </div>
                <a 
                  href="https://share.google/v9ZNhSlXDECsz2p58" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-orange-400 text-sm leading-relaxed pt-1 transition-colors"
                >
                  Mumbai, Maharashtra, India
                  <span className="block text-xs text-orange-400/90 font-medium mt-0.5">📍 View on Google Maps</span>
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition-colors">
                  <PhoneLogo className="w-3.5 h-3.5 fill-orange-500" />
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  <a href="tel:+918779391690" className="text-slate-400 hover:text-orange-400 text-sm transition-colors">+91 87793 91690</a>
                  <a href="tel:+919004298911" className="text-slate-400 hover:text-orange-400 text-sm transition-colors">+91 90042 98911</a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition-colors">
                  <Mail size={14} className="text-orange-500" />
                </div>
                <a href="mailto:ams.constructionwork@gmail.com" className="text-slate-400 hover:text-orange-400 text-sm transition-colors pt-1 break-all">
                  ams.constructionwork@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>
        
        <SEOCrossLinks limit={30} />
      </div>

      {/* ── SEO Hidden Block (Keeps keywords for bots but hides from UI) ── */}
      <div className="sr-only">
        <p>
          AMS Civil Construction - Top Rated Civil Contractor (2026) · Best Construction Company in Mumbai · Turnkey Bungalow Builders ·
          Service Areas: South Mumbai · Western Line · Central Line · Navi Mumbai · Thane · Palghar · Pune · Nagpur · Nasik · 
          Kolkata · Asansol · Siliguri · Ranchi · Jamshedpur · Dhanbad · Bangalore · Mysore · Panjim · Margao. 
          Services: Bungalow Construction · Bathroom Renovation · Modular Kitchen · Tiles & Flooring · POP Ceiling · Plaster Work ·
          Waterproofing · Painting · Interior Structural Work · Compound Wall · Swimming Pool Contractor · Cost of Civil Work.
        </p>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="relative z-10 bg-[#02040A] border-t border-white/5 py-6">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col gap-2">
            <p className="text-slate-300 text-xs font-medium">
              © {new Date().getFullYear()} AMS Civil Construction. All rights reserved. 
              <span className="hidden sm:inline"> A Mandal Group Venture</span>
              <Link prefetch={false} href="/admin" className="ml-1 text-slate-800 hover:text-orange-500 transition-colors cursor-default" title="Admin">.</Link>
            </p>
            <p className="text-slate-300 text-xs font-medium">
              Designed &amp; Developed by: <a href="https://www.webxcrafting.in/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 font-bold underline underline-offset-2 transition-colors">webxcrafting.in</a>
            </p>
          </div>
          
          <div className="flex items-center flex-wrap justify-center gap-6 text-xs font-medium text-slate-500 pr-12 md:pr-0">
            <Link prefetch={false} href="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link>
            <Link prefetch={false} href="/terms" className="hover:text-orange-400 transition-colors">Terms & Conditions</Link>
            <Link prefetch={false} href="/sitemap.xml" className="hover:text-orange-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
