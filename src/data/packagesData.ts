// src/data/packagesData.ts
// Complete home renovation & construction packages with transparent pricing
// Designed to target high-intent Google searches like "1BHK renovation cost Mumbai"

export interface PackageFeature {
  text: string;
  included: boolean;
}

export interface PackageData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  priceRange: string;
  priceStarting: number; // for EMI calculation
  sqftRange: string;
  duration: string;
  popular?: boolean;
  features: PackageFeature[];
  highlights: string[];
  description: string;
  seoTitle: string;
  seoDescription: string;
}

export const packages: PackageData[] = [
  {
    id: 'pkg-1bhk',
    slug: '1bhk-complete-renovation',
    title: '1 BHK Complete',
    subtitle: 'Smart Renovation Package',
    icon: 'Home',
    priceRange: '₹2.5L – ₹5L',
    priceStarting: 250000,
    sqftRange: '350 – 550 sq.ft.',
    duration: '25 – 35 Days',
    features: [
      { text: 'Complete Flooring (Vitrified/Marble)', included: true },
      { text: 'Kitchen Platform & Tiles', included: true },
      { text: 'Bathroom Renovation (1)', included: true },
      { text: 'Full Painting (Interior)', included: true },
      { text: 'POP / False Ceiling (Hall)', included: true },
      { text: 'Electrical Points Upgrade', included: true },
      { text: 'Plumbing Overhaul', included: true },
      { text: 'Waterproofing (Bathroom)', included: true },
      { text: 'Modular Kitchen', included: false },
      { text: 'Wardrobes / Loft', included: false },
    ],
    highlights: [
      'Perfect for newly purchased flats',
      'Budget-friendly civil execution',
      'Zero hidden costs — 100% transparent',
      'Ideal for rental property upgrade',
    ],
    description:
      'Our 1BHK Complete Renovation Package is designed for homeowners and investors looking to transform a compact flat into a modern, comfortable living space. We handle flooring, kitchen platform, bathroom renovation, painting, and basic POP ceiling work — everything you need for a move-in-ready home.',
    seoTitle: '1BHK Renovation Package Mumbai | ₹2.5L Starting | AMS Civil',
    seoDescription:
      'Complete 1BHK renovation in Mumbai starting ₹2.5 Lakh. Includes flooring, bathroom, kitchen platform, painting & POP work. 25-35 days delivery. Book a site visit!',
  },
  {
    id: 'pkg-2bhk',
    slug: '2bhk-complete-renovation',
    title: '2 BHK Complete',
    subtitle: 'Premium Home Makeover',
    icon: 'Home',
    priceRange: '₹4.5L – ₹9L',
    priceStarting: 450000,
    sqftRange: '550 – 850 sq.ft.',
    duration: '35 – 50 Days',
    popular: true,
    features: [
      { text: 'Complete Flooring (Vitrified/Italian Marble)', included: true },
      { text: 'Modular/Semi-Modular Kitchen', included: true },
      { text: 'Bathroom Renovation (2)', included: true },
      { text: 'Full Painting (Interior + Balcony)', included: true },
      { text: 'POP / False Ceiling (All Rooms)', included: true },
      { text: 'Electrical Rewiring & Points', included: true },
      { text: 'Complete Plumbing Overhaul', included: true },
      { text: 'Waterproofing (Bathrooms + Balcony)', included: true },
      { text: 'TV Unit Civil Work', included: true },
      { text: 'Wardrobe Civil Framing (1)', included: true },
    ],
    highlights: [
      'Most popular package — chosen by 60% of clients',
      'Modular kitchen included',
      '2 bathroom complete renovations',
      'Premium false ceiling with LED lighting',
    ],
    description:
      'Our best-selling 2BHK Complete Package covers every aspect of your home transformation — from Italian marble flooring and designer POP ceilings to a full modular kitchen and 2 bathroom makeovers. Perfect for new homeowners or families wanting a complete upgrade.',
    seoTitle: '2BHK Renovation Package Mumbai | ₹4.5L Starting | AMS Civil',
    seoDescription:
      'Best 2BHK renovation package in Mumbai from ₹4.5 Lakh. Modular kitchen, 2 bathrooms, Italian marble flooring, POP ceiling. 35-50 days. Call now!',
  },
  {
    id: 'pkg-3bhk',
    slug: '3bhk-luxury-interiors',
    title: '3 BHK Luxury',
    subtitle: 'Premium Interior Package',
    icon: 'Sparkles',
    priceRange: '₹8L – ₹15L',
    priceStarting: 800000,
    sqftRange: '900 – 1400 sq.ft.',
    duration: '45 – 70 Days',
    features: [
      { text: 'Italian Marble / Premium Vitrified Flooring', included: true },
      { text: 'Full Modular Kitchen (Hettich/Hafele Hardware)', included: true },
      { text: 'Bathroom Renovation (2-3)', included: true },
      { text: 'Premium Painting (Asian Paints Royale)', included: true },
      { text: 'Designer POP Ceiling (All Rooms + Cove Lighting)', included: true },
      { text: 'Full Electrical Upgrade + Smart Switches', included: true },
      { text: 'Complete Plumbing with Premium Fittings', included: true },
      { text: 'Multi-Layer Waterproofing', included: true },
      { text: 'TV Unit + Showcase Civil Work', included: true },
      { text: 'All Wardrobe Civil Framing', included: true },
      { text: 'Balcony Tiling & Railings', included: true },
      { text: 'Texture/Wallpaper Feature Walls', included: true },
    ],
    highlights: [
      'Luxury-grade civil finishing',
      'Designer POP with ambient lighting',
      'Premium branded hardware (Hettich/Hafele)',
      'Dedicated senior project manager',
    ],
    description:
      'Elevate your 3BHK to luxury standards with our premium interior package. We provide top-tier civil execution for Italian marble, Asian Paints Royale, and Hettich hardware — combined with designer POP ceilings and smart-home wiring for a truly upscale living experience.',
    seoTitle: '3BHK Luxury Interior Package Mumbai | ₹8L Starting | AMS Civil',
    seoDescription:
      '3BHK luxury interior renovation in Mumbai from ₹8 Lakh. Italian marble, modular kitchen, designer POP, 3 bathrooms. Premium materials. Free estimate!',
  },
  {
    id: 'pkg-4bhk',
    slug: '4bhk-ultra-premium',
    title: '4 BHK Ultra Premium',
    subtitle: 'Ultra-Luxury Transformation',
    icon: 'Sparkles',
    priceRange: '₹12L – ₹25L',
    priceStarting: 1200000,
    sqftRange: '1400 – 2500 sq.ft.',
    duration: '60 – 90 Days',
    features: [
      { text: 'Imported Italian Marble Flooring', included: true },
      { text: 'Luxury Modular Kitchen (Island/L-Shape/U-Shape)', included: true },
      { text: 'All Bathroom Renovation (3-4) with Premium Sanitary', included: true },
      { text: 'Luxury Painting (Texture + Designer Walls)', included: true },
      { text: 'Multi-Level POP Ceiling + Chandeliers Support', included: true },
      { text: 'Full Smart Home Electrical Wiring', included: true },
      { text: 'Premium Plumbing (Jaquar/Grohe Fittings)', included: true },
      { text: 'Complete Waterproofing (All Wet Areas + Terrace)', included: true },
      { text: 'Custom TV Unit + Bar Counter + Showcase', included: true },
      { text: 'All Built-in Wardrobes + Walk-in Closet Prep', included: true },
      { text: 'Home Theatre Civil Prep', included: true },
      { text: 'Servant Room / Utility Renovation', included: true },
    ],
    highlights: [
      'Ultra-premium civil execution',
      'Smart home ready wiring',
      'Jaquar/Grohe bathroom fittings',
      'Home theatre & bar counter civil work',
    ],
    description:
      'The ultimate luxury transformation for spacious 4BHK and 5BHK homes. From imported Italian marble and Jaquar fittings to smart-home wiring and home theatre civil preparation, this package delivers a five-star living experience within your own home.',
    seoTitle: '4BHK Luxury Renovation Mumbai | ₹12L Starting | AMS Civil',
    seoDescription:
      '4BHK ultra-premium renovation in Mumbai from ₹12 Lakh. Imported marble, Jaquar fittings, smart home, designer ceilings. Top-rated contractor. Call today!',
  },
  {
    id: 'pkg-terrace',
    slug: 'terrace-home-complete',
    title: 'Terrace Home',
    subtitle: 'Terrace Floor Construction',
    icon: 'Sun',
    priceRange: '₹15L – ₹35L',
    priceStarting: 1500000,
    sqftRange: '800 – 2000 sq.ft.',
    duration: '3 – 6 Months',
    features: [
      { text: 'RCC Slab & Structural Work', included: true },
      { text: 'Brick/Block Wall Construction', included: true },
      { text: 'Internal & External Plastering', included: true },
      { text: 'Complete Waterproofing (Terrace + Bathrooms)', included: true },
      { text: 'Flooring (Vitrified/Marble)', included: true },
      { text: 'Kitchen Construction + Platform', included: true },
      { text: 'Bathroom Construction (1-2)', included: true },
      { text: 'Full Electrical Wiring', included: true },
      { text: 'Full Plumbing Work', included: true },
      { text: 'Painting (Interior + Exterior)', included: true },
      { text: 'Staircase Construction/Modification', included: true },
      { text: 'Terrace Garden Civil Prep', included: true },
    ],
    highlights: [
      'Complete terrace floor from scratch',
      'RCC structural engineering included',
      'Municipal approval assistance',
      'Terrace garden & sit-out area ready',
    ],
    description:
      'Build a complete living floor on your terrace with our turnkey construction package. We handle structural engineering, RCC slabs, walls, waterproofing, interiors, and finishing — delivering a fully livable terrace home with all amenities.',
    seoTitle: 'Terrace Home Construction Mumbai | ₹15L Starting | AMS Civil',
    seoDescription:
      'Build your dream terrace home in Mumbai from ₹15 Lakh. Complete RCC structure, waterproofing, interiors, kitchen, bathroom. 3-6 months delivery. Free consultation!',
  },
  {
    id: 'pkg-bungalow',
    slug: 'bungalow-turnkey-construction',
    title: 'Bungalow / Villa',
    subtitle: 'Turnkey Construction',
    icon: 'Building2',
    priceRange: '₹25L – ₹2Cr+',
    priceStarting: 2500000,
    sqftRange: '1200 – 5000+ sq.ft.',
    duration: '6 – 14 Months',
    features: [
      { text: 'Complete Architectural Planning', included: true },
      { text: 'Foundation & Structural Engineering', included: true },
      { text: 'Full RCC Framework (G+1/G+2)', included: true },
      { text: 'All Wall Construction & Plastering', included: true },
      { text: 'Complete Waterproofing System', included: true },
      { text: 'Premium Flooring Throughout', included: true },
      { text: 'All Bathrooms (3-6) with Luxury Fittings', included: true },
      { text: 'Modular Kitchen + Utility Area', included: true },
      { text: 'Complete Electrical & Plumbing', included: true },
      { text: 'Internal & External Painting', included: true },
      { text: 'Compound Wall + Gate', included: true },
      { text: 'Parking Area + Garden Landscaping', included: true },
      { text: 'Municipal Approvals & Permissions', included: true },
      { text: 'Swimming Pool (Optional)', included: false },
    ],
    highlights: [
      'End-to-end from plot to possession',
      'Architectural plans + 3D visualization',
      'Municipal approval handling included',
      'Parking, garden, compound wall included',
    ],
    description:
      'Your dream bungalow, built from the ground up. Our turnkey bungalow construction covers everything — architectural planning, municipal approvals, foundation, structure, interiors, exteriors, compound wall, parking, and landscaping. We deliver your dream home stress-free.',
    seoTitle: 'Bungalow Construction Mumbai | Turnkey Builder | AMS Civil',
    seoDescription:
      'Build your dream bungalow in Mumbai with AMS Civil. Turnkey construction from ₹25L — architecture, structure, interiors, compound wall. 25+ years expertise. Book your site visit!',
  },
];

// EMI calculation helper
export function calculateEMI(principal: number, ratePercent: number, tenureMonths: number): number {
  const r = ratePercent / 12 / 100;
  if (r === 0) return principal / tenureMonths;
  const emi = (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
  return Math.round(emi);
}

// Format Indian currency
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
