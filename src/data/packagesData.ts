// src/data/packagesData.ts
// Complete home renovation & construction civil packages with transparent labor estimates.
// IMPORTANT: All rates are indicative/approximate starting estimates for CIVIL WORK & LABOR ONLY.
// Rates do NOT include raw or finishing materials (cement, tiles, paint, sanitaryware, fittings).
// Rates do NOT include carpentry/woodwork, electrical appliances, or aluminum/glass windows.
// Final price is determined strictly after on-site measurement and structural analysis.

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
  exclusions: string[];
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
    subtitle: 'Civil Labor & Renovation Execution',
    icon: 'Home',
    priceRange: '₹2.2L – ₹4.5L*',
    priceStarting: 220000,
    sqftRange: '350 – 550 sq.ft.',
    duration: '25 – 35 Days',
    features: [
      { text: 'Old Tiles & Plaster Demolition & Debris Disposal (Labor Only)', included: true },
      { text: 'Tile & Marble Laying Labor (Fitting Only — Tiles Client Scope)', included: true },
      { text: 'Kitchen Platform Civil Masonry & Granite Fitting (Labor Only — Granite Client Scope)', included: true },
      { text: '1 Bathroom Complete Civil Overhaul, Tiling & Waterproofing (Labor Only)', included: true },
      { text: 'Concealed CPVC/PVC Plumbing & Sanitaryware Fitting (Labor Only — Fittings Client Scope)', included: true },
      { text: 'Wall Scraping, 2-Coat Putty, Primer & Painting Labor (Labor Only — Paint Client Scope)', included: true },
      { text: 'Hall POP False Ceiling Framing & Sheet Fixing (Labor Only — Material on Actuals)', included: true },
      { text: 'Electrical Chipping, Conduiting & Point Wiring (Labor Only — Wires/Switches Client Scope)', included: true },
      { text: 'Door Frame & Window Granite Jamb Civil Fixing (Labor Only)', included: true },
    ],
    exclusions: [
      'Raw Materials (Cement, sand, aggregate, bricks, plaster — Client Scope / Actual Bills)',
      'Finishing Materials (Tiles, marble, sanitaryware, CP fittings, paint — Client Scope)',
      'Wooden Carpentry (Modular kitchen cabinets, wardrobes, bed, TV unit)',
      'Electrical Appliances & Fixtures (Fans, ACs, geysers, decorative lights, chandeliers)',
      'Sliding Aluminum / UPVC Windows & Glass Shower Partitions',
      'Society / Municipal NOC & Permission Fees',
    ],
    highlights: [
      'Pure civil workmanship contract — materials client scope',
      'Rates are indicative starting estimates (NOT fixed)',
      '100% in-house payroll master artisans (Zero subcontracting)',
      'Final quotation based on physical on-site inspection & line-item BOQ',
    ],
    description:
      'Designed for 1BHK owners who want master civil execution while maintaining complete control over material brands and purchases. Our skilled masons handle demolition, tile laying, masonry, bathroom overhaul, electrical conduiting, and painting labor. Rates are indicative labor estimates and do not include material costs.',
    seoTitle: '1BHK Renovation Labor Cost Mumbai | ₹2.2L Starting | AMS Civil',
    seoDescription:
      'Complete 1BHK renovation civil labor in Mumbai from ₹2.2L approx. Master masons for flooring, bathroom, plumbing & painting. Materials separate. Free site inspection!',
  },
  {
    id: 'pkg-2bhk',
    slug: '2bhk-complete-renovation',
    title: '2 BHK Complete',
    subtitle: 'Full Civil & Renovation Labor',
    icon: 'Home',
    priceRange: '₹4.0L – ₹8.5L*',
    priceStarting: 400000,
    sqftRange: '550 – 850 sq.ft.',
    duration: '35 – 50 Days',
    popular: true,
    features: [
      { text: 'Demolition of Old Flooring, Tiles & Debris Removal to Ground (Labor Only)', included: true },
      { text: 'Flooring & Skirting Laying Labor (Fitting Only — Tiles/Marble Client Scope)', included: true },
      { text: 'Kitchen Platform Civil Base, Granite Counter & Dado Tiling (Labor Only)', included: true },
      { text: '2 Bathrooms Full Civil Overhaul, Wall Tiles & Plumbing (Labor Only — Fixtures Client Scope)', included: true },
      { text: 'Multi-Layer Chemical Waterproofing (2 Baths + Balcony) with 48h Pond Test (Labor Only)', included: true },
      { text: 'Full Flat Designer POP False Ceiling & Cove Framing (Labor Only — Sheets on Actuals)', included: true },
      { text: 'Complete Electrical Rewiring, Chipping & Distribution Board Setup (Labor Only)', included: true },
      { text: 'CPVC/PVC Plumbing Pipeline, Concealed Diverters & Fixtures Fitting (Labor Only)', included: true },
      { text: 'Full Flat Wall Scraping, Double Putty, Primer & Emulsion Paint (Labor Only — Paint Client Scope)', included: true },
      { text: 'All Window Sills & Door Frames Granite Molding & Civil Anchoring (Labor Only)', included: true },
    ],
    exclusions: [
      'Raw & Finishing Materials (Cement, tiles, marble, sanitaryware, paint, pipes — Client Scope)',
      'Wooden Interiors (Modular kitchen wooden units, wardrobes, TV cabinet, beds)',
      'Electrical Appliances & Fixtures (ACs, geysers, chimney, fans, LED strip profiles)',
      'Aluminum Window Frames & Toughened Glass Shower Partitions',
      'Society Permissions & Debris Truck Gate Pass Charges',
    ],
    highlights: [
      'Our most requested 2BHK renovation civil labor package',
      'Pure civil workmanship contract — materials client scope (0% markup)',
      'Price is not fixed — customized to actual flat carpet area & structural age',
      'Supervised by senior civil engineer with 1-year legal written warranty',
    ],
    description:
      'Our popular 2BHK civil labor contract provides turnkey master craftsmanship for your complete home renovation. We execute flooring, bathroom remodeling, electrical piping, POP ceiling, and waterproofing labor. Client supplies materials or we procure at actual wholesale trade bills without markup.',
    seoTitle: '2BHK Renovation Labor Package Mumbai | ₹4.0L Starting | AMS Civil',
    seoDescription:
      'Best 2BHK renovation civil labor package in Mumbai from ₹4.0L approx. Complete tiling, 2 bathrooms, POP, painting & plumbing labor. Materials not included. Free quote!',
  },
  {
    id: 'pkg-3bhk',
    slug: '3bhk-luxury-interiors',
    title: '3 BHK Luxury',
    subtitle: 'Luxury Civil & Interior Execution',
    icon: 'Sparkles',
    priceRange: '₹7.0L – ₹14L*',
    priceStarting: 700000,
    sqftRange: '900 – 1400 sq.ft.',
    duration: '45 – 70 Days',
    features: [
      { text: 'Old Flooring Demolition, Sub-base Leveling & Debris Disposal (Labor Only)', included: true },
      { text: 'Italian Marble / Large Vitrified Slab Precision Laying & Polishing (Labor Only)', included: true },
      { text: '2 to 3 Bathrooms Full Civil Demolition, Tiling & Concealed Plumbing (Labor Only)', included: true },
      { text: 'Concealed Thermostat, Diverters & Luxury Sanitary Fitting (Labor Only — Fixtures Client Scope)', included: true },
      { text: 'Kitchen Platform Civil Masonry, Sink Fitting & Gas Pipeline Conduiting (Labor Only)', included: true },
      { text: 'Multi-Tier Architectural POP Ceiling & Cove Lighting Architecture (Labor Only)', included: true },
      { text: 'Three-Phase Electrical Wiring, Home Automation Conduiting & Chipping (Labor Only)', included: true },
      { text: 'Royal / Velvet Putty Finish & Luxury Paint Application (Labor Only — Paint Client Scope)', included: true },
      { text: 'Multi-Coat High-Grade Waterproofing with 72-Hour Pond Testing (Labor Only)', included: true },
      { text: 'Balcony Civil Leveling, Tiling & Railing Anchor (Labor Only)', included: true },
    ],
    exclusions: [
      'All Raw & Finishing Materials (Cement, marble, tiles, sanitaryware, paint, pipes — Client Scope)',
      'Wooden Interiors & Modular Furniture (Kitchen Cabinets, Wardrobes, Paneling)',
      'Smart Home Automation Devices, AC Units, Chandeliers, Profile LED Strips',
      'Glass Shower Cubicles & Heavy Section Aluminum Sliding Windows',
      'Society / Municipal NOC & Permissions',
    ],
    highlights: [
      'Artisan-grade precision marble laying & diamond mirror polishing labor',
      'Dedicated on-site senior civil project engineer throughout project',
      'Non-fixed estimate — exact line-item BOQ after physical inspection',
      '100% material freedom: buy your preferred luxury brands from any showroom',
    ],
    description:
      'Specially designed for luxury 3BHK residences in Mumbai requiring high-end civil precision. Our master masons specialize in imported marble laying, concealed plumbing, and architectural ceiling framing. Package rates cover civil labor and supervision only; materials are excluded.',
    seoTitle: '3BHK Luxury Civil Renovation Mumbai | ₹7.0L Starting | AMS Civil',
    seoDescription:
      '3BHK luxury interior civil labor in Mumbai from ₹7.0L approx. Italian marble laying, 3 bathrooms, designer POP ceilings. Workmanship contract. Free site measurement!',
  },
  {
    id: 'pkg-4bhk',
    slug: '4bhk-ultra-premium',
    title: '4 BHK Ultra Premium',
    subtitle: 'Ultra-Luxury Civil Workmanship',
    icon: 'Sparkles',
    priceRange: '₹11L – ₹22L*',
    priceStarting: 1100000,
    sqftRange: '1400 – 2500 sq.ft.',
    duration: '60 – 90 Days',
    features: [
      { text: 'Bookmatched Italian Marble Laying & Diamond Mirror Polishing (Labor Only)', included: true },
      { text: '3 to 4 Luxury Bathrooms Full Civil Transformation & Plumbing (Labor Only)', included: true },
      { text: 'Concealed Sensor Diverters, Rain Showers & Wall-Hung Fixture Fitting (Labor Only)', included: true },
      { text: 'Island Kitchen Civil Platform, Utility Sink & Plumbing Network (Labor Only)', included: true },
      { text: 'Multi-Tier Architectural False Ceiling with Chandelier Support Framing (Labor Only)', included: true },
      { text: 'Complete Automation Conduiting, Heavy Power Lines & Server Rack Civil Prep (Labor Only)', included: true },
      { text: 'Luxury Textured Paint, PU Coating & Designer Feature Wall Prep (Labor Only)', included: true },
      { text: 'Wet Area & Terrace Multi-Coat High-Elongation Waterproofing (Labor Only)', included: true },
      { text: 'Senior Civil Project Engineer Permanently Stationed On-Site', included: true },
    ],
    exclusions: [
      'Construction & Finishing Materials (Cement, marble, tiles, sanitaryware, paint — Client Scope)',
      'Carpentry, Modular Kitchens, Walk-in Closets & Loose Furniture',
      'Electronic Automation Systems, AC Units, Lighting Fixtures',
      'Shower Glass Enclosures & Heavy Acoustic Window Glazing',
      'Municipal Sanctions & Society Approvals',
    ],
    highlights: [
      'Top-tier architectural civil craftsmanship for luxury penthouses',
      'Full-time site supervisor & milestone quality checks before payment release',
      'Customized BOQ quotation based on physical inspection & architectural drawings',
      'Zero contractor markup on client-purchased materials',
    ],
    description:
      'Comprehensive civil labor and engineering execution for penthouses and expansive 4BHK/5BHK flats. We provide master artisans for bookmatched Italian marble laying, complex plumbing lines, and structural enhancements. All rates are for civil labor execution only; materials are not included.',
    seoTitle: '4BHK Luxury Renovation Civil Labor Mumbai | ₹11L Starting | AMS Civil',
    seoDescription:
      '4BHK ultra-premium renovation civil labor in Mumbai from ₹11L approx. Bookmatched marble, Jaquar/Grohe fittings, POP framing. Materials separate. Free consultation!',
  },
  {
    id: 'pkg-terrace',
    slug: 'terrace-home-complete',
    title: 'Terrace Home',
    subtitle: 'Terrace Floor Construction Labor',
    icon: 'Sun',
    priceRange: '₹14L – ₹30L*',
    priceStarting: 1400000,
    sqftRange: '800 – 2000 sq.ft.',
    duration: '3 – 6 Months',
    features: [
      { text: 'RCC Structural Frame (Columns, Beams & Roof Slab Shuttering & Casting) (Labor Only)', included: true },
      { text: 'AAC Blockwork & Red Brick Masonry Wall Construction (Labor Only)', included: true },
      { text: 'Double-Coat Sand-Face External Weather Plaster & Internal Plaster (Labor Only)', included: true },
      { text: 'Heavy-Duty Multi-Layer Elastomeric Terrace Slab Waterproofing (Labor Only)', included: true },
      { text: 'Complete Fresh Plumbing Network, Overhead Tank & Drainage Routing (Labor Only)', included: true },
      { text: 'Full Electrical Conduiting, Main Distribution Panel & Wiring (Labor Only)', included: true },
      { text: 'Flooring, Bathroom Civil Construction & Kitchen Platform (Labor Only)', included: true },
      { text: 'Staircase Structural Casting & Civil Modification (Labor Only)', included: true },
    ],
    exclusions: [
      'Raw Structural Materials (TMT Steel, Ready-Mix Concrete, Cement, Sand, Bricks — Client Scope)',
      'Finishing Materials (Tiles, Paint, Sanitaryware, Doors, Windows — Client Scope)',
      'Municipal Approval / BMC Liasoning Fees & Architect Drawing Fees',
      'Interior Woodwork / Furniture & Kitchen Cabinets',
      'Solar Panel Setup & External Elevators',
    ],
    highlights: [
      'RCC structural construction labor contract from foundation/column up',
      'Structural safety analysis by certified civil engineer',
      'Not a fixed price — determined by structural load & terrace layout',
      '100% transparent procurement: client buys materials at wholesale rates',
    ],
    description:
      'Add a new living floor on your terrace with our RCC structural construction labor package. We provide shuttering carpenters, rebar binders, master masons, and plasterers to build your terrace floor from the ground up. Rates reflect labor execution and do not include materials.',
    seoTitle: 'Terrace Floor Construction Labor Mumbai | ₹14L Starting | AMS Civil',
    seoDescription:
      'Terrace floor construction labor in Mumbai from ₹14L approx. RCC framing, blockwork, waterproofing & interior civil labor. Materials extra. Free site inspection!',
  },
  {
    id: 'pkg-bungalow',
    slug: 'bungalow-turnkey-construction',
    title: 'Bungalow / Villa',
    subtitle: 'Ground-Up Civil Construction Labor',
    icon: 'Building2',
    priceRange: '₹25L – ₹1.5Cr+*',
    priceStarting: 2500000,
    sqftRange: '1200 – 5000+ sq.ft.',
    duration: '6 – 14 Months',
    features: [
      { text: 'Full Civil Engineering, Excavation & Footing Foundation Casting (Labor Only)', included: true },
      { text: 'G+1 / G+2 RCC Superstructure Shuttering, Rebar Binding & Concrete Casting (Labor Only)', included: true },
      { text: 'Complete External & Internal AAC/Brick Masonry & Plastering (Labor Only)', included: true },
      { text: 'Basement Retaining Wall, Sunken Slabs & Terrace Multi-Layer Waterproofing (Labor Only)', included: true },
      { text: 'Full Villa Fresh Plumbing & Electrical Conduit Pipeline Network (Labor Only)', included: true },
      { text: 'Complete Flooring, Bathroom Civil Work & Staircase Structural Casting (Labor Only)', included: true },
      { text: 'Compound Wall Foundation, Masonry, Plaster & Main Gate Civil Piers (Labor Only)', included: true },
      { text: 'Dedicated Resident Civil Project Manager & Daily Quality Assurance Audits', included: true },
    ],
    exclusions: [
      'Structural & Raw Materials (TMT Steel, RMC Concrete, Cement, Sand, Blocks — Client Scope)',
      'Finishing Materials (Italian Marble, Tiles, Paints, Sanitaryware, Glass — Client Scope)',
      'Municipal Sanctions, Development Charges & Architect Drawing Fees',
      'Carpentry, Loose Furniture & Interior Wooden Wardrobes',
      'Landscaping Plants, Swimming Pool Filtration Machinery & Boundary Lights',
    ],
    highlights: [
      'Comprehensive labor contract from foundation to roof slab',
      'Senior civil project manager stationed at site throughout construction',
      'Zero contractor markup on client material purchases',
      'Customized BOQ quotation based on architectural drawings & soil test',
    ],
    description:
      'Build your private bungalow or luxury villa in Mumbai, Alibaug, or MMR with our dedicated civil construction labor team. We handle excavation, RCC framework, masonry, plastering, and waterproofing labor. Client purchases materials directly or through our wholesale accounts at actual invoice rates.',
    seoTitle: 'Bungalow Construction Civil Labor Mumbai | AMS Civil',
    seoDescription:
      'Ground-up bungalow construction civil labor in Mumbai from ₹25L approx. RCC framework, foundation, masonry & waterproofing labor. Materials extra. Book site visit!',
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
