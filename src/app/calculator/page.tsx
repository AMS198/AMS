'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import {
  Home, Building2, PaintRoller, Droplet, Hammer, ArrowRight, ShieldCheck, CheckCircle2,
  Lock, Loader2, Star, Sparkles, MapPin, Calculator, FileText, Check, ChevronDown,
  RefreshCw, SlidersHorizontal, CheckSquare, Square, Zap, Clock, Phone, Award,
  AlertCircle, AlertTriangle, Layers, type LucideIcon
} from 'lucide-react';
import { WhatsAppLogo, PhoneLogo } from '@/components/ui/BrandIcons';
import { openQuotePopup } from '@/components/ui/QuotePopup';

/* ─────────────────────────────────────────────────────────────
   TYPES & DATA CONSTANTS
───────────────────────────────────────────────────────────── */
interface PropertyPreset {
  id: string;
  label: string;
  shortLabel: string;
  defaultSqft: number;
  icon: LucideIcon;
  baseLaborRatePerSqft: number;
}

interface CivilTrade {
  id: string;
  label: string;
  icon: LucideIcon;
  ratePerSqft: number; // Approximate labor component per sq.ft
  fixedPerUnit?: number; // E.g. per bathroom or kitchen
  rateDisplay: string;
  desc: string;
  isPopular?: boolean;
}

interface FinishQuality {
  id: string;
  label: string;
  multiplier: number;
  desc: string;
  badge: string;
}

const PROPERTY_PRESETS: PropertyPreset[] = [
  { id: '1rk', label: '1 RK / Studio', shortLabel: '1 RK', defaultSqft: 320, icon: Home, baseLaborRatePerSqft: 520 },
  { id: '1bhk', label: '1 BHK Flat', shortLabel: '1 BHK', defaultSqft: 450, icon: Home, baseLaborRatePerSqft: 480 },
  { id: '2bhk', label: '2 BHK Flat', shortLabel: '2 BHK', defaultSqft: 750, icon: Home, baseLaborRatePerSqft: 450 },
  { id: '3bhk', label: '3 BHK Flat', shortLabel: '3 BHK', defaultSqft: 1100, icon: Home, baseLaborRatePerSqft: 430 },
  { id: '4bhk', label: '4 BHK / Duplex', shortLabel: '4 BHK', defaultSqft: 1700, icon: Building2, baseLaborRatePerSqft: 410 },
  { id: 'villa', label: 'Villa / Bungalow', shortLabel: 'Bungalow', defaultSqft: 2600, icon: Building2, baseLaborRatePerSqft: 460 },
];

const CIVIL_TRADES: CivilTrade[] = [
  {
    id: 'demolition',
    label: 'Demolition & Debris Disposal',
    icon: Hammer,
    ratePerSqft: 70,
    rateDisplay: '₹70 / sq.ft',
    desc: 'Old tiles & plaster hacking, RCC chipping, BMC approved debris carting',
    isPopular: true,
  },
  {
    id: 'tiling',
    label: 'Tiling & Italian Marble Laying',
    icon: Layers,
    ratePerSqft: 130,
    rateDisplay: '₹130 / sq.ft',
    desc: 'Laser-level screed, 4x2 / 6x4 vitrified or Italian marble, epoxy grouting',
    isPopular: true,
  },
  {
    id: 'bathroom',
    label: 'Bathroom Complete Civil Overhaul',
    icon: Droplet,
    ratePerSqft: 0,
    fixedPerUnit: 110000,
    rateDisplay: '₹1.10L / toilet',
    desc: '5-layer Dr. Fixit waterproofing, brickbat coba, concealed piping & sanitary',
    isPopular: true,
  },
  {
    id: 'kitchen',
    label: 'Kitchen Platform & Granite Jambs',
    icon: Hammer,
    ratePerSqft: 0,
    fixedPerUnit: 75000,
    rateDisplay: '₹75,000 / platform',
    desc: 'Kadappa civil base masonry, 20mm granite moulding, sink cutout & dado',
  },
  {
    id: 'plumbing',
    label: 'Concealed CPVC/PVC Plumbing',
    icon: Droplet,
    ratePerSqft: 65,
    rateDisplay: '₹65 / sq.ft',
    desc: 'Pressure-tested Astral/Ashirvad concealed pipelines & diverter anchoring',
  },
  {
    id: 'pop',
    label: 'POP False Ceiling & Cove Light Prep',
    icon: Sparkles,
    ratePerSqft: 95,
    rateDisplay: '₹95 / sq.ft',
    desc: 'Saint-Gobain gypsum framing, cove channels, AC duct boxing & grooving',
    isPopular: true,
  },
  {
    id: 'painting',
    label: 'Wall Scraping, Putty & Emulsion Painting',
    icon: PaintRoller,
    ratePerSqft: 85,
    rateDisplay: '₹85 / sq.ft',
    desc: 'Surface scraping, 2-coat Birla putty, primer & Asian Paints Royal finish',
    isPopular: true,
  },
  {
    id: 'electrical',
    label: 'Electrical Chipping & Conduiting',
    icon: Zap,
    ratePerSqft: 60,
    rateDisplay: '₹60 / sq.ft',
    desc: 'Wall chasing, PVC conduits, switch box anchoring & point wiring labor',
  },
];

const FINISH_QUALITIES: FinishQuality[] = [
  {
    id: 'standard',
    label: 'Standard Civil Quality',
    multiplier: 1.0,
    desc: 'Rigid contractor standards, clean lines, durable civil execution.',
    badge: 'Best for Rental / Budget',
  },
  {
    id: 'premium',
    label: 'Architectural Precision',
    multiplier: 1.35,
    desc: 'Laser-level tolerance, mitred 45° tile edges, book-matched marble.',
    badge: 'Most Popular for Homes',
  },
  {
    id: 'luxury',
    label: 'Bespoke Luxury Finishes',
    multiplier: 1.75,
    desc: 'Imported stone masonry, shadow-line reveal trims, acoustic dampening.',
    badge: 'Luxury Penthouses / Villas',
  },
];

const MUMBAI_RATE_TABLE = [
  { trade: 'Old Flooring & Wall Demolition', unit: 'Per Sq.Ft', laborOnly: '₹65 – ₹95', turnkey: '₹110 – ₹160 (With BMC Transport)' },
  { trade: 'Vitrified Tile Laying (4x2 / 6x4)', unit: 'Per Sq.Ft', laborOnly: '₹120 – ₹175', turnkey: '₹380 – ₹580 (With Adhesive/Mortar)' },
  { trade: 'Italian Marble Laying & Diamond Polish', unit: 'Per Sq.Ft', laborOnly: '₹220 – ₹380', turnkey: '₹950 – ₹2,200 (With Base & Mirror Polish)' },
  { trade: 'Bathroom Complete Waterproofing & Tiling', unit: 'Per Bathroom', laborOnly: '₹85,000 – ₹1,35,000', turnkey: '₹2.2L – ₹4.0L (With Chemicals/Pipes)' },
  { trade: 'Kitchen Granite Platform & Civil Base', unit: 'Per Platform', laborOnly: '₹65,000 – ₹95,000', turnkey: '₹1.4L – ₹2.8L (With Heavy Granite)' },
  { trade: 'Saint-Gobain Gypsum POP False Ceiling', unit: 'Per Sq.Ft', laborOnly: '₹85 – ₹130', turnkey: '₹220 – ₹340 (Complete Framework)' },
  { trade: 'Interior Painting (Scraping + Putty + Emulsion)', unit: 'Per Sq.Ft', laborOnly: '₹75 – ₹120', turnkey: '₹180 – ₹320 (Asian Paints Royal Finish)' },
  { trade: 'Concealed CPVC/PVC Plumbing Pipeline', unit: 'Per Toilet/Kitchen', laborOnly: '₹48,000 – ₹75,000', turnkey: '₹1.1L – ₹2.2L (Astral/Ashirvad Pipes)' },
];

const CALCULATOR_FAQS = [
  {
    q: 'Is this calculator estimate fixed or indicative?',
    a: 'This estimate provides an indicative starting cost range based on verified Mumbai site averages. The exact final quotation is provided by founder Kedar Mandal following an on-site laser measurement and detailed Bill of Quantities (BOQ).',
  },
  {
    q: 'What materials are excluded under the Pure Civil Labor model?',
    a: 'Under the Pure Civil Labor model, basic raw materials (cement, sand, bricks) and finishing materials (tiles, Italian marble, bathroom sanitaryware & CP fittings, paints, switches, modular cabinetry) are purchased by the client at direct dealer prices. AMS Civil provides all skilled manpower, heavy tools, machinery, and daily on-site supervision.',
  },
  {
    q: 'Is a Turnkey Civil (Labor + Materials) package also available?',
    a: 'Yes! If you prefer a completely hands-off experience, AMS Civil provides a turnkey shell contracting model where Ultratech cement, River sand, Dr. Fixit chemical waterproofing, and branded CPVC piping are completely managed and supplied within our scope.',
  },
  {
    q: 'What are the charges for a site visit and BOQ measurement?',
    a: 'Under our current promotional offer across Mumbai, Thane, and Navi Mumbai, site visits and initial civil consultations are 100% Free. Founder Kedar Mandal personally inspects the premises to deliver a comprehensive line-item cost proposal.',
  },
  {
    q: 'What warranty is provided upon completion of civil work?',
    a: 'We provide a 1-Year written legal structural warranty on all major civil works and multi-layer chemical waterproofing installations. Any settling hairline cracks or seepage points are inspected and rectified promptly at zero additional cost.',
  },
];

/* ─────────────────────────────────────────────────────────────
   MAIN CALCULATOR COMPONENT
───────────────────────────────────────────────────────────── */
export default function CalculatorPage() {
  const [selectedPreset, setSelectedPreset] = useState<string>('2bhk');
  const [carpetArea, setCarpetArea] = useState<number>(750);
  const [selectedTrades, setSelectedTrades] = useState<string[]>([
    'demolition', 'tiling', 'bathroom', 'kitchen', 'pop', 'painting'
  ]);
  const [qualityTier, setQualityTier] = useState<string>('premium');
  const [pricingMode, setPricingMode] = useState<'labor' | 'turnkey'>('labor');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Lead modal state
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadLocation, setLeadLocation] = useState('Mumbai');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Preset selector handler
  const handleSelectPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    const preset = PROPERTY_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setCarpetArea(preset.defaultSqft);
    }
  };

  // Trade checkbox toggle
  const toggleTrade = (tradeId: string) => {
    setSelectedTrades((prev) =>
      prev.includes(tradeId)
        ? prev.filter((id) => id !== tradeId)
        : [...prev, tradeId]
    );
  };

  const selectAllTrades = () => {
    if (selectedTrades.length === CIVIL_TRADES.length) {
      setSelectedTrades(['tiling', 'bathroom', 'painting']);
    } else {
      setSelectedTrades(CIVIL_TRADES.map((t) => t.id));
    }
  };

  // Cost calculation engine with realistic, higher Mumbai rates
  const calculateCost = () => {
    const selectedPresetObj = PROPERTY_PRESETS.find((p) => p.id === selectedPreset) || PROPERTY_PRESETS[2];
    const qualityObj = FINISH_QUALITIES.find((q) => q.id === qualityTier) || FINISH_QUALITIES[1];

    let baseLaborSum = 0;

    // Bathroom count heuristic based on sqft
    const bathroomCount = carpetArea <= 550 ? 1 : carpetArea <= 1200 ? 2 : carpetArea <= 2000 ? 3 : 4;

    selectedTrades.forEach((tradeId) => {
      const trade = CIVIL_TRADES.find((t) => t.id === tradeId);
      if (!trade) return;

      if (trade.id === 'bathroom') {
        baseLaborSum += (trade.fixedPerUnit || 110000) * bathroomCount;
      } else if (trade.id === 'kitchen') {
        baseLaborSum += (trade.fixedPerUnit || 75000);
      } else {
        baseLaborSum += trade.ratePerSqft * carpetArea;
      }
    });

    // Fallback minimum if very few trades are selected
    if (baseLaborSum === 0) {
      baseLaborSum = carpetArea * selectedPresetObj.baseLaborRatePerSqft * 0.6;
    }

    // Apply Quality Tier Multiplier
    const totalLabor = baseLaborSum * qualityObj.multiplier;

    // Turnkey civil materials in Mumbai roughly equal 1.65x of labor (total 2.65x)
    const totalEstimate = pricingMode === 'turnkey' ? totalLabor * 2.65 : totalLabor;

    const minAmount = Math.round((totalEstimate * 0.92) / 1000) * 1000;
    const maxAmount = Math.round((totalEstimate * 1.28) / 1000) * 1000;

    const formatLakhs = (val: number) => {
      if (val >= 10000000) {
        return `₹${(val / 10000000).toFixed(2)} Cr`;
      }
      return `₹${(val / 100000).toFixed(1)}L`;
    };

    const materialMin = Math.round((totalLabor * 1.1) / 10000) / 10;
    const materialMax = Math.round((totalLabor * 1.8) / 10000) / 10;

    return {
      minRaw: minAmount,
      maxRaw: maxAmount,
      minFormatted: formatLakhs(minAmount),
      maxFormatted: formatLakhs(maxAmount),
      bathroomCount,
      materialEstFormatted: `₹${materialMin.toFixed(1)}L – ₹${materialMax.toFixed(1)}L`,
    };
  };

  const cost = calculateCost();

  // WhatsApp click handler
  const handleDirectWhatsApp = () => {
    const text = `Hi Kedar ji, I calculated renovation costs on AMS Civil website:\n\n` +
      `*Property:* ${PROPERTY_PRESETS.find((p) => p.id === selectedPreset)?.label} (${carpetArea} sq.ft)\n` +
      `*Scope:* ${selectedTrades.length} Civil Trades Selected\n` +
      `*Quality Tier:* ${FINISH_QUALITIES.find((q) => q.id === qualityTier)?.label}\n` +
      `*Model:* ${pricingMode === 'labor' ? 'Civil Labor Only' : 'Turnkey (Labor + Materials)'}\n` +
      `*Approx Range:* ${cost.minFormatted} – ${cost.maxFormatted}*\n\n` +
      `*Note:* I understand this rate is approximate and NOT fixed. I want the REAL & EXACT quotation for my property — please arrange a free site inspection and provide your BEST competitive price.`;
    window.open(`https://wa.me/918779391690?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Lead submission handler
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!leadName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = leadPhone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName.trim(),
          phone: cleanPhone,
          propertyType: `${PROPERTY_PRESETS.find((p) => p.id === selectedPreset)?.label} (${carpetArea} sq.ft, ${leadLocation})`,
          services: selectedTrades,
          condition: `${FINISH_QUALITIES.find((q) => q.id === qualityTier)?.label} [${pricingMode.toUpperCase()}]`,
          estimateMin: cost.minFormatted,
          estimateMax: cost.maxFormatted,
          websiteUrl,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setErrorMessage(data.error || 'Failed to submit enquiry. Please try again.');
      } else {
        setSubmitSuccess(true);
      }
    } catch {
      setErrorMessage('Network connection error. Please try again or WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080D1A] text-slate-100 selection:bg-orange-500 selection:text-white pt-24 sm:pt-28 pb-28 lg:pb-20 relative overflow-hidden">
      {/* Background Architectural Ambient Lighting */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-80 left-10 w-80 h-80 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb & Live Verification Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pt-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <span className="text-orange-400 font-medium">Cost Calculator</span>
          </nav>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[11px] font-mono font-bold tracking-wider">
            <ShieldCheck size={12} className="text-orange-400" />
            <span>2026 MUMBAI CIVIL RATES • VERIFIED ESTIMATOR</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="max-w-3xl mb-10">
          <h1 className="font-display font-black text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15] mb-4">
            Civil Renovation & Construction <span className="text-gradient">Cost Calculator</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Calculate accurate, transparent civil labor and turnkey renovation costs for your Mumbai residence or commercial property. Based on 200+ delivered projects across South Mumbai, Western Suburbs, and Navi Mumbai.
          </p>

          {/* 4 Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-6">
            <div className="p-2.5 rounded-xl bg-[#101827] border border-white/10 flex items-center gap-2 shadow-sm">
              <Calculator size={15} className="text-orange-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-white text-xs font-bold truncate">₹70–₹130/sq.ft</div>
                <div className="text-slate-400 text-[10px] truncate">Indicative Civil Labor</div>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#101827] border border-white/10 flex items-center gap-2 shadow-sm">
              <Clock size={15} className="text-orange-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-white text-xs font-bold truncate">100% Free</div>
                <div className="text-slate-400 text-[10px] truncate">Site Visit & BOQ</div>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#101827] border border-white/10 flex items-center gap-2 shadow-sm">
              <Award size={15} className="text-orange-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-white text-xs font-bold truncate">1-Year Legal</div>
                <div className="text-slate-400 text-[10px] truncate">Written Warranty</div>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#101827] border border-white/10 flex items-center gap-2 shadow-sm">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-white text-xs font-bold truncate">Zero Hidden</div>
                <div className="text-slate-400 text-[10px] truncate">Stage-Wise Milestones</div>
              </div>
            </div>
          </div>

          {/* Prominent Rate Disclaimer & Best Price Guarantee Banner */}
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border-l-4 border-l-orange-500 border border-amber-500/30 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 mt-0.5 border border-orange-500/30">
                <AlertCircle size={20} />
              </div>
              <div>
                <div className="text-white text-xs sm:text-sm font-bold flex flex-wrap items-center gap-2 mb-0.5">
                  <span>Rate Not Fixed — This is an Approximate Estimate</span>
                  <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Best Price Guarantee
                  </span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Every property layout and structural scope is unique. <strong>To receive an exact, itemized quotation</strong>, please get in touch — founder Kedar Mandal will personally inspect your site and provide <strong>Mumbai&apos;s most competitive, guaranteed best price!</strong>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowLeadModal(true)}
              className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-stretch sm:self-auto justify-center"
            >
              <span>Connect For Best Price</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* ── TWO-COLUMN INTERACTIVE CALCULATOR ────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-16">
          
          {/* LEFT COLUMN: PARAMETER SELECTION (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Property Type & Carpet Area */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#101827] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-display font-bold text-base sm:text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 text-xs font-mono font-bold flex items-center justify-center">1</span>
                  Select Property Type & Carpet Area
                </h2>
                <span className="text-xs font-mono text-orange-400 font-bold bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-500/20">
                  {carpetArea} sq.ft
                </span>
              </div>

              {/* BHK Preset Pills */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-5">
                {PROPERTY_PRESETS.map((p) => {
                  const Icon = p.icon;
                  const isSelected = selectedPreset === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectPreset(p.id)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer text-center ${
                        isSelected
                          ? 'bg-orange-500/20 border-orange-500 text-white shadow-md shadow-orange-500/20'
                          : 'bg-[#0B1120] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <Icon size={16} className={isSelected ? 'text-orange-400' : 'text-slate-500'} />
                      <span className="text-xs font-bold tracking-tight">{p.shortLabel}</span>
                      <span className="text-[10px] font-mono text-slate-500">{p.defaultSqft} sf</span>
                    </button>
                  );
                })}
              </div>

              {/* Carpet Area Slider */}
              <div className="bg-[#0B1120] p-4 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Custom Carpet Area (Mumbai Flat / Villa):</span>
                  <div className="flex items-center gap-1 font-mono text-white font-bold">
                    <input
                      type="number"
                      min={200}
                      max={6000}
                      step={25}
                      value={carpetArea}
                      onChange={(e) => setCarpetArea(Math.max(200, Math.min(6000, Number(e.target.value) || 200)))}
                      className="w-20 px-2 py-1 rounded bg-[#101827] border border-white/20 text-right text-orange-400 text-xs font-bold focus:outline-none focus:border-orange-500"
                    />
                    <span className="text-slate-400 text-xs">sq.ft</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={250}
                  max={4000}
                  step={25}
                  value={carpetArea}
                  onChange={(e) => setCarpetArea(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>250 sq.ft</span>
                  <span>1,000 sq.ft</span>
                  <span>2,000 sq.ft</span>
                  <span>4,000+ sq.ft</span>
                </div>

                {/* Quick Adjustment Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-white/5">
                  <span className="text-[10px] font-mono text-slate-500 mr-1">Quick Adjust:</span>
                  {[-100, -50, 50, 100].map((delta) => (
                    <button
                      key={delta}
                      type="button"
                      onClick={() => setCarpetArea((prev) => Math.max(200, Math.min(6000, prev + delta)))}
                      className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-orange-500 hover:text-white text-slate-400 text-[10px] font-mono font-bold border border-white/10 transition-all cursor-pointer"
                    >
                      {delta > 0 ? `+${delta}` : delta} sf
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const preset = PROPERTY_PRESETS.find((p) => p.id === selectedPreset);
                      if (preset) setCarpetArea(preset.defaultSqft);
                    }}
                    className="px-2 py-0.5 rounded-md bg-orange-500/10 hover:bg-orange-500 hover:text-white text-orange-400 text-[10px] font-mono font-bold border border-orange-500/20 transition-all cursor-pointer ml-auto"
                  >
                    Reset to {PROPERTY_PRESETS.find((p) => p.id === selectedPreset)?.shortLabel}
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Civil Trade Scope */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#101827] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-display font-bold text-base sm:text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 text-xs font-mono font-bold flex items-center justify-center">2</span>
                  Select Civil Work Scope
                </h2>
                <button
                  type="button"
                  onClick={selectAllTrades}
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 underline underline-offset-4 cursor-pointer"
                >
                  {selectedTrades.length === CIVIL_TRADES.length ? 'Deselect All' : 'Select All Trades'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CIVIL_TRADES.map((trade) => {
                  const Icon = trade.icon;
                  const isChecked = selectedTrades.includes(trade.id);
                  return (
                    <div
                      key={trade.id}
                      onClick={() => toggleTrade(trade.id)}
                      className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all cursor-pointer select-none ${
                        isChecked
                          ? 'bg-orange-500/10 border-orange-500/60 shadow-sm'
                          : 'bg-[#0B1120] border-white/5 opacity-75 hover:opacity-100 hover:border-white/20'
                      }`}
                    >
                      <div className="mt-0.5">
                        {isChecked ? (
                          <CheckSquare size={17} className="text-orange-400 shrink-0" />
                        ) : (
                          <Square size={17} className="text-slate-600 shrink-0" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                            <span className={`text-xs font-bold leading-tight ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                              {trade.label}
                            </span>
                            {trade.isPopular && (
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 shrink-0 font-bold">
                                Core
                              </span>
                            )}
                          </div>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded shrink-0 border whitespace-nowrap transition-all ${
                            isChecked
                              ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                              : 'bg-white/5 text-slate-400 border-white/10'
                          }`}>
                            {trade.rateDisplay}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug mt-1.5">
                          {trade.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Finish Quality Tier */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#101827] border border-white/10 shadow-xl">
              <h2 className="text-white font-display font-bold text-base sm:text-lg mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 text-xs font-mono font-bold flex items-center justify-center">3</span>
                Select Architectural Finish Quality
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {FINISH_QUALITIES.map((tier) => {
                  const isSelected = qualityTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setQualityTier(tier.id)}
                      className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-orange-500/15 border-orange-500 shadow-md shadow-orange-500/20'
                          : 'bg-[#0B1120] border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 font-bold block mb-1">
                          {tier.badge}
                        </span>
                        <h3 className={`text-sm font-bold mb-1 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {tier.label}
                        </h3>
                        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                          {tier.desc}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-orange-500' : 'bg-slate-600'}`} />
                        <span>Multiplier: {tier.multiplier}x</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Pricing Model Toggle: Pure Labor vs Turnkey */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#101827] border border-white/10 shadow-xl">
              <h2 className="text-white font-display font-bold text-base sm:text-lg mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 text-xs font-mono font-bold flex items-center justify-center">4</span>
                Procurement Model (Labor vs Turnkey)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPricingMode('labor')}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    pricingMode === 'labor'
                      ? 'bg-orange-500/15 border-orange-500 shadow-md'
                      : 'bg-[#0B1120] border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider inline-block mb-1.5">
                      Most Transparent
                    </span>
                    <h3 className={`text-sm font-bold mb-1 ${pricingMode === 'labor' ? 'text-white' : 'text-slate-200'}`}>
                      Pure Civil Labor Only
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      You purchase tiles, cement, paints, and sanitaryware at direct dealer rates. AMS Civil provides all skilled masons, tools & supervision.
                    </p>
                  </div>
                  <div className="mt-3 text-[10px] font-mono text-emerald-400 font-bold">
                    ✓ Zero Material Markups
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPricingMode('turnkey')}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    pricingMode === 'turnkey'
                      ? 'bg-orange-500/15 border-orange-500 shadow-md'
                      : 'bg-[#0B1120] border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <div>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-mono font-bold uppercase tracking-wider inline-block mb-1.5">
                      100% Hassle-Free
                    </span>
                    <h3 className={`text-sm font-bold mb-1 ${pricingMode === 'turnkey' ? 'text-white' : 'text-slate-200'}`}>
                      Turnkey Civil (Labor + Materials)
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Includes Ultratech cement, River sand, Dr. Fixit waterproofing, Ashirvad pipes, and standard finishing supplies handled end-to-end.
                    </p>
                  </div>
                  <div className="mt-3 text-[10px] font-mono text-blue-400 font-bold">
                    ✓ Complete Material Procurement
                  </div>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: STICKY LIVE ESTIMATE CARD (5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#121B2D] via-[#0E1626] to-[#0A0F1D] border-2 border-orange-500/50 shadow-[0_20px_60px_rgba(249,115,22,0.18)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/15 rounded-full blur-[80px] pointer-events-none" />

              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                  Live Cost Estimation
                </span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck size={12} /> Mumbai MMR Avg
                </span>
              </div>

              {/* Big Price Display */}
              <div className="mb-3">
                <div className="text-3xl sm:text-4xl lg:text-[42px] font-display font-black text-white tracking-tight leading-none mb-1.5 flex flex-wrap items-baseline gap-2">
                  <span>{cost.minFormatted}</span>
                  <span className="text-slate-500 text-lg sm:text-xl font-light">to</span>
                  <span>{cost.maxFormatted}</span>
                  <span className="text-orange-400 text-2xl font-black">*</span>
                </div>
                <p className="text-slate-400 text-xs">
                  {pricingMode === 'labor'
                    ? 'Indicative Civil Labor & Execution Only (Materials Client Scope)'
                    : 'Turnkey Shell Estimate (Civil Labor + Raw Materials Included)'}
                </p>
              </div>

              {/* Rate Not Fixed & Best Price Callout */}
              <div className="mb-5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5">
                <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-0.5">
                    Indicative Estimate Only (Not a Fixed Quote)
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    This figure is an indicative benchmark. For your <strong>exact line-item quotation</strong>, connect with our team — following an on-site laser inspection, we deliver the <strong>guaranteed best price in Mumbai</strong>.
                  </p>
                </div>
              </div>

              {/* Itemized Snapshot */}
              <div className="p-4 rounded-xl bg-[#080D1A]/80 border border-white/10 space-y-2 mb-6 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Selected Property:</span>
                  <span className="text-white font-bold">{PROPERTY_PRESETS.find(p => p.id === selectedPreset)?.label} ({carpetArea} sq.ft)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Civil Trades Included:</span>
                  <span className="text-orange-400 font-bold">{selectedTrades.length} Trades Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Bathroom Overhaul:</span>
                  <span className="text-white font-bold">{cost.bathroomCount} Bathrooms Estimated</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Finish Specification:</span>
                  <span className="text-white font-bold">{FINISH_QUALITIES.find(q => q.id === qualityTier)?.label}</span>
                </div>
                {pricingMode === 'labor' && (
                  <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-white/5">
                    <span>Est. Client Material Budget:</span>
                    <span className="text-amber-400 font-mono font-bold">{cost.materialEstFormatted}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                  <span className="text-slate-400">Estimated Duration:</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    {carpetArea <= 600 ? '25 – 35 Days' : carpetArea <= 1200 ? '35 – 50 Days' : '55 – 75 Days'} Handover
                  </span>
                </div>
              </div>

              {/* Conversion Buttons */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => setShowLeadModal(true)}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-400 hover:to-orange-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
                >
                  <FileText size={16} />
                  <span>Claim Free Site Visit & Itemized BOQ</span>
                </button>

                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="w-full py-3 px-5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.01]"
                >
                  <WhatsAppLogo className="w-4 h-4 fill-current" />
                  <span>Share Parameters on WhatsApp</span>
                </button>

                <a
                  href="tel:+918779391690"
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Phone size={14} className="text-orange-400" />
                  <span>Direct Call: +91 87793 91690</span>
                </a>
              </div>

              {/* Disclaimer */}
              <p className="text-[10px] text-slate-400 leading-relaxed mt-4 text-center">
                *Rates shown are strictly approximate and not fixed. Final exact quotation with guaranteed best price is provided after on-site laser measurement by Kedar Mandal.
              </p>
            </div>

            {/* Direct Founder Hotline Card */}
            <div className="p-4 rounded-2xl bg-[#101827] border border-white/10 flex items-center gap-3 shadow-md">
              <div className="w-11 h-11 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-display font-black text-lg border border-orange-500/30 shrink-0">
                KM
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-white text-xs font-bold truncate">Already have a Floor Plan / CAD Drawing?</div>
                <div className="text-slate-400 text-[11px] truncate">Send 2D layouts on WhatsApp for same-day BOQ</div>
              </div>
              <a
                href="https://wa.me/918779391690?text=Hi%20Kedar%20ji,%20I%20have%20an%20architectural%20drawing%20for%20my%20property.%20Please%20review%20and%20provide%20a%20quote."
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-orange-500 hover:text-white text-orange-400 border border-white/10 text-xs font-bold transition-all shrink-0"
              >
                Send CAD
              </a>
            </div>

          </div>
        </div>

        {/* ── MUMBAI 2026 CIVIL RATE REFERENCE CARD (BOQ GUIDE) ── */}
        <section className="mb-16">
          <div className="max-w-3xl mb-6">
            <div className="text-orange-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
              Market Benchmarking
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Mumbai MMR Civil Work Rate Card (2026 Reference)
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
              Standard per-sq.ft and unit labor charges commonly charged across Mumbai, Thane & Navi Mumbai. <span className="text-amber-400 font-bold">These rates are indicative benchmarks, not fixed quotations.</span> For an exact line-item Bill of Quantities (BOQ), connect with our team — following an on-site inspection, we guarantee the <strong>most competitive, transparent price in Mumbai</strong>.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#101827] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0B1120] text-slate-300 font-mono text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-4 sm:px-6">Civil Trade / Work Scope</th>
                    <th className="py-3.5 px-3 sm:px-4">Unit Measure</th>
                    <th className="py-3.5 px-3 sm:px-4 text-orange-400">Civil Labor Only</th>
                    <th className="py-3.5 px-4 sm:px-6 text-slate-300">Turnkey (With Materials)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  {MUMBAI_RATE_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 text-white font-sans font-bold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <span>{row.trade}</span>
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-slate-400">{row.unit}</td>
                      <td className="py-3.5 px-3 sm:px-4 text-orange-400 font-bold">{row.laborOnly}</td>
                      <td className="py-3.5 px-4 sm:px-6 text-slate-300">{row.turnkey}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ ACCORDION ────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-8">
            <div className="text-orange-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
              Clear Answers
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Frequently Asked Questions About Civil Costing
            </h2>
          </div>

          <div className="space-y-3">
            {CALCULATOR_FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#101827] overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span className="text-white font-bold text-sm sm:text-base flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 font-mono text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-400' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>

      {/* Mobile Sticky Quick Price Strip */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0B1120]/95 backdrop-blur-xl border-t border-orange-500/30 px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] flex items-center justify-between gap-3 animate-fadeIn">
        <div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            {pricingMode === 'labor' ? 'Civil Labor Est.' : 'Turnkey Est.'}
          </div>
          <div className="text-lg font-display font-black text-white leading-none">
            {cost.minFormatted} – {cost.maxFormatted}
            <span className="text-orange-400 text-xs">*</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowLeadModal(true)}
          className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/30 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <span>Get Exact BOQ</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* ── LEAD CAPTURE MODAL (OFFICIAL BOQ & FREE VISIT) ───── */}
      {showLeadModal && (
        <div
          onClick={() => setShowLeadModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#0E1626] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden animate-scaleUp"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                Diwali Special • 100% Free Site Visit
              </span>
              <button
                type="button"
                onClick={() => setShowLeadModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all"
              >
                ✕
              </button>
            </div>

            {submitSuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-2">Estimate Saved Successfully!</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  Thank you, <strong className="text-white">{leadName}</strong>. Kedar Mandal will contact you on WhatsApp (+91 {leadPhone}) within 2 hours to confirm your free on-site measurement slot.
                </p>
                <div className="p-3.5 rounded-xl bg-[#080D1A] border border-white/10 text-xs font-mono text-orange-400 mb-6">
                  Estimate Range: {cost.minFormatted} – {cost.maxFormatted} ({carpetArea} sq.ft)
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowLeadModal(false);
                    setSubmitSuccess(false);
                  }}
                  className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-display font-bold text-white text-xl sm:text-2xl mb-1.5">
                  Get Official Line-Item BOQ
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mb-5 leading-relaxed">
                  Enter your details to receive an itemized breakdown and book your free on-site structural measurement.
                </p>

                <div className="p-3 rounded-xl bg-[#080D1A] border border-white/10 text-xs text-slate-300 flex items-center justify-between mb-3 font-mono">
                  <span>Indicative Scope:</span>
                  <span className="text-orange-400 font-bold">{cost.minFormatted} – {cost.maxFormatted}*</span>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed mb-4 flex items-start gap-2">
                  <AlertTriangle size={15} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Indicative Estimate Only:</strong> Every property layout is unique. To get your exact line-item rate, connect with our team — founder Kedar Mandal will deliver <strong>Mumbai&apos;s most competitive, guaranteed best price</strong> after site measurement!
                  </div>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="e.g. Vikram Singhania"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D1A] border border-white/15 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      WhatsApp Mobile Number *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-mono">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="98765 43210"
                        className="w-full pl-12 pr-3.5 py-2.5 rounded-xl bg-[#080D1A] border border-white/15 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-orange-500 font-mono transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Site Location / Area in Mumbai
                    </label>
                    <input
                      type="text"
                      value={leadLocation}
                      onChange={(e) => setLeadLocation(e.target.value)}
                      placeholder="e.g. Andheri West, Bandra, Thane, Navi Mumbai"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080D1A] border border-white/15 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>

                  {/* Anti-spam honeypot */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <input
                      type="text"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || leadPhone.length !== 10 || !leadName.trim()}
                    className="w-full py-3.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm Free Site Visit & Detailed BOQ</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                    By submitting, you agree to receive civil estimation updates. Your phone number is strictly protected under Indian DPDP Act 2023.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
