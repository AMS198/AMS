'use client';
// src/components/layout/Footer.tsx — SEO-rich footer with service areas

import Link from 'next/link';
import Image from 'next/image';
import { HardHat, Mail, MapPin, Facebook, Instagram, Youtube, Linkedin, Send, Star } from 'lucide-react';
import { WhatsAppLogo, PhoneLogo } from '../ui/BrandIcons';
import SEOCrossLinks from '../ui/SEOCrossLinks';

const serviceLinks = [
  { label: 'Bungalow Construction',   href: '/services#bungalow-construction' },
  { label: 'Full Interior Civil Work',href: '/services#interior-civil-work'   },
  { label: 'Swimming Pool Work',      href: '/services#swimming-pool-work'    },
  { label: 'Compound Wall & Gates',   href: '/services#compound-wall-work'    },
  { label: 'Building Repair',         href: '/services#building-repair-work'  },
  { label: 'Bathroom Renovation',     href: '/services#bathroom-renovation'   },
  { label: 'Kitchen Work',            href: '/services#kitchen-work'          },
  { label: 'Tiles Work',              href: '/services#tiles-work'            },
  { label: 'Flooring Work',           href: '/services#flooring-work'         },
  { label: 'POP Work',                href: '/services#pop-work'              },
  { label: 'Plaster Work',            href: '/services#plaster-work'          },
  { label: 'Wall Work',               href: '/services#wall-work'             },
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
  { label: 'Borivali',    href: '/areas/borivali'    },
  { label: 'Andheri',     href: '/areas/andheri'     },
  { label: 'Bandra',      href: '/areas/bandra'      },
  { label: 'Kandivali',   href: '/areas/kandivali'   },
  { label: 'Malad',       href: '/areas/malad'       },
  { label: 'Thane',       href: '/areas/thane'       },
  { label: 'Dadar',       href: '/areas/dadar'       },
  { label: 'Worli',       href: '/areas/worli'       },
  { label: 'Mira Road',   href: '/areas/mira-road'   },
  { label: 'Vashi',       href: '/areas/vashi'       },
  { label: 'Nerul',       href: '/areas/nerul'       },
  { label: 'Kalyan',      href: '/areas/kalyan'      },
  { label: 'Ranchi',      href: '/areas/ranchi'      },
  { label: 'Bangalore',   href: '/areas/bangalore'   },
  { label: 'Pune',        href: '/areas/pune'        },
  { label: 'Nagpur',      href: '/areas/nagpur'      },
];

const socialLinks = [
  { Icon: Facebook,  href: 'https://www.facebook.com/profile.php?id=61570712849063', label: 'Facebook'  },
  { Icon: Instagram, href: 'https://www.instagram.com/amscivilwork/', label: 'Instagram' },
  { Icon: Youtube,   href: '#', label: 'YouTube'   },
  { Icon: Linkedin,  href: '#', label: 'LinkedIn'  },
  { Icon: Send,      href: '#', label: 'Telegram'  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#050914] border-t border-[#1E2D45] overflow-hidden">
      
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ── CTA Banner ── */}
      <div className="relative mx-4 sm:mx-8 lg:mx-auto max-w-7xl mt-12 mb-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-orange-900 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="relative z-10 p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
          <div className="max-w-2xl">
            <h3 className="font-display text-white text-3xl sm:text-5xl font-black leading-tight tracking-tight">
              Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-white">Project?</span>
            </h3>
            <p className="text-orange-100 text-base sm:text-lg mt-4 font-medium max-w-xl">
              Get a free consultation from our expert team within 24 hours. We bring your vision to life with precision and quality.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
            <a href="tel:+918779391690"
              className="group flex items-center justify-center gap-3 px-8 py-4 font-bold text-sm tracking-widest uppercase bg-white text-orange-900 rounded-xl shadow-xl hover:bg-orange-50 hover:scale-105 transition-all duration-300">
              <PhoneLogo className="w-5 h-5 fill-orange-600 group-hover:scale-110 transition-transform" /> 
              Call Now
            </a>
            <a href="https://wa.me/918779391690" target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 px-8 py-4 font-bold text-sm tracking-widest uppercase bg-orange-950/40 border border-orange-400/30 text-white rounded-xl backdrop-blur-sm hover:bg-orange-900/60 hover:scale-105 transition-all duration-300">
              <WhatsAppLogo className="w-5 h-5 fill-[#25D366] group-hover:scale-110 transition-transform" /> 
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── Main content Grid ── */}
      <div className="container-custom relative z-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12">

          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col items-start pr-4">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
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
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              India&apos;s trusted construction partner for 20+ years. We strictly follow all government rules and regulations to deliver excellence in every project.
            </p>
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
                <span className="text-slate-400 text-sm leading-relaxed pt-1">Mumbai, Maharashtra, India</span>
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
            <p className="text-slate-500 text-xs font-medium">
              © {new Date().getFullYear()} AMS Civil Construction. All rights reserved. 
              <span className="hidden sm:inline"> A Mandal Group Venture</span>
              <Link href="/admin" className="ml-1 text-slate-800 hover:text-orange-500 transition-colors cursor-default" title="Admin">.</Link>
            </p>
            <p className="text-slate-500 text-xs font-medium">
              Developed by <a href="https://www.webxcrafting.in/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 transition-colors font-semibold">WebX Crafting</a>
            </p>
          </div>
          
          <div className="flex items-center flex-wrap justify-center gap-6 text-xs font-medium text-slate-500 pr-12 md:pr-0">
            <Link href="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-orange-400 transition-colors">Terms & Conditions</Link>
            <Link href="/sitemap.xml" className="hover:text-orange-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
