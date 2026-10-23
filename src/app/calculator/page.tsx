'use client';

import { useState } from 'react';
import { PhoneLogo } from '@/components/ui/BrandIcons';
import { Home, PaintRoller, Droplet, Hammer, ArrowRight, ShieldCheck, CheckCircle2, Lock, Loader2, Star } from 'lucide-react';

export default function CalculatorPage() {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState('1BHK');
  const [services, setServices] = useState<string[]>([]);
  const [condition, setCondition] = useState('Standard');
  
  // Lead Capture State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const propertyOptions = [
    { id: '1RK', label: '1 RK / Studio', icon: Home, basePrice: 150000 },
    { id: '1BHK', label: '1 BHK Flat', icon: Home, basePrice: 250000 },
    { id: '2BHK', label: '2 BHK Flat', icon: Home, basePrice: 400000 },
    { id: '3BHK', label: '3 BHK Flat', icon: Home, basePrice: 650000 },
    { id: 'Bungalow', label: 'Villa / Bungalow', icon: Home, basePrice: 1200000 },
  ];

  const serviceOptions = [
    { id: 'full', label: 'Full Home Renovation', icon: Hammer, desc: 'A to Z Civil & Interior' },
    { id: 'bathroom', label: 'Bathroom Only', icon: Droplet, desc: 'Waterproofing & Tiling' },
    { id: 'kitchen', label: 'Kitchen Only', icon: Hammer, desc: 'Platform & Modular' },
    { id: 'painting', label: 'Painting & POP', icon: PaintRoller, desc: 'False Ceiling & Paint' },
  ];

  const conditionOptions = [
    { id: 'Standard', label: 'Standard', multiplier: 1.0, desc: 'Good quality standard materials' },
    { id: 'Premium', label: 'Premium', multiplier: 1.3, desc: 'Branded premium materials' },
    { id: 'Luxury', label: 'Luxury', multiplier: 1.8, desc: 'Imported luxury finish' },
  ];

  const toggleService = (id: string) => {
    if (id === 'full') {
      setServices(['full']);
      return;
    }
    const newServices = services.includes('full') ? [] : [...services];
    if (newServices.includes(id)) {
      setServices(newServices.filter(s => s !== id));
    } else {
      setServices([...newServices, id]);
    }
  };

  const calculateEstimate = () => {
    const base = propertyOptions.find(p => p.id === propertyType)?.basePrice || 250000;
    const condMult = conditionOptions.find(c => c.id === condition)?.multiplier || 1.0;
    
    let total = 0;
    if (services.includes('full')) {
      total = base;
    } else {
      if (services.includes('bathroom')) total += 65000;
      if (services.includes('kitchen')) total += 45000;
      if (services.includes('painting')) total += (base * 0.25);
    }

    if (total === 0) total = base;
    total = total * condMult;

    const min = Math.floor(total * 0.9);
    const max = Math.floor(total * 1.15);

    return {
      min: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(min),
      max: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(max),
      rawTotal: total
    };
  };

  const estimate = calculateEstimate();

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit WhatsApp number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          propertyType,
          services,
          condition,
          estimateMin: estimate.min,
          estimateMax: estimate.max,
          websiteUrl
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.error || 'Something went wrong.');
        setIsSubmitting(false);
      } else {
        // Unlock the result!
        setIsSubmitting(false);
        setStep(5);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const text = `Hi AMS Civil! I just checked the calculator on your website.\n\n*Property:* ${propertyType}\n*Quality:* ${condition}\n*Estimated Range:* ${estimate.min} - ${estimate.max}\n\nI want to claim the Diwali Special Offer: 100% Free Site Visit & exact quote.`;
    window.open(`https://wa.me/918779391690?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#080D1A] pt-32 pb-24 selection-orange relative">
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />
        
        <div className="container-custom max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h1 className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl mb-4">
              Renovation <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Cost Calculator</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Select your requirements to get an instant estimated cost for your home renovation in Mumbai.
            </p>
          </div>

          <div className="bg-[#101827] border border-[#1E2D45] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden min-h-[400px]">
            {/* Progress Bar - Only show for first 4 steps */}
            {step < 5 && (
              <div className="flex items-center justify-between mb-12 relative px-0">
                {/* Background Track */}
                <div className="absolute left-[24px] sm:left-[28px] right-[24px] sm:right-[28px] top-1/2 -translate-y-1/2 h-1.5 bg-[#162133] rounded-full -z-10 overflow-hidden">
                  {/* Animated Active Fill */}
                  <div 
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-700 ease-in-out shadow-[0_0_15px_rgba(249,115,22,0.6)]" 
                    style={{ width: `${((step - 1) / 3) * 100}%` }}
                  />
                </div>
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-bold text-base sm:text-lg transition-all duration-500 relative z-10 ${step >= num ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)] scale-110 border-2 border-[#101827]' : 'bg-[#162133] text-slate-400 border-2 border-[#1E2D45]'}`}>
                    {step > num ? <CheckCircle2 size={24} className="animate-fade-in" /> : num === 4 ? <Lock size={20} /> : num}
                  </div>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl text-white font-bold mb-6">1. What is your property type?</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                  {propertyOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setPropertyType(opt.id)}
                      className={`group relative p-4 sm:p-5 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all duration-300 overflow-hidden ${propertyType === opt.id ? 'border-orange-500 bg-orange-500/10 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.15)] scale-[1.02]' : 'border-[#1E2D45] bg-[#162133] text-slate-300 hover:border-orange-500/50 hover:bg-[#1A273A] hover:-translate-y-1'}`}
                    >
                      {/* Active indicator glow */}
                      {propertyType === opt.id && (
                        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent opacity-50" />
                      )}
                      
                      <opt.icon size={32} className={`transition-transform duration-300 group-hover:scale-110 relative z-10 ${propertyType === opt.id ? 'text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]' : 'text-slate-500 group-hover:text-orange-400'}`} />
                      <span className="font-bold text-sm sm:text-base text-center relative z-10">{opt.label}</span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button onClick={() => setStep(2)} className="btn-primary flex items-center gap-2">
                    Next Step <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl text-white font-bold mb-6">2. What services do you need?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {serviceOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => toggleService(opt.id)}
                      className={`group relative p-4 sm:p-5 rounded-2xl border text-left flex items-center gap-4 transition-all duration-300 overflow-hidden ${services.includes(opt.id) ? 'border-orange-500 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.1)] scale-[1.02]' : 'border-[#1E2D45] bg-[#162133] hover:border-orange-500/50 hover:bg-[#1A273A] hover:-translate-y-1'}`}
                    >
                      {services.includes(opt.id) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-50" />
                      )}
                      
                      <div className={`p-3 rounded-lg relative z-10 transition-all duration-300 ${services.includes(opt.id) ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/30' : 'bg-[#1E2D45] text-slate-400 group-hover:text-orange-400 group-hover:bg-[#1E2D45]/80'}`}>
                        <opt.icon size={22} className="group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="relative z-10 flex-1">
                        <h3 className={`font-bold text-lg mb-0.5 transition-colors ${services.includes(opt.id) ? 'text-orange-400' : 'text-white'}`}>{opt.label}</h3>
                        <p className="text-slate-400 text-xs sm:text-sm">{opt.desc}</p>
                      </div>
                      
                      {/* Checkbox indicator */}
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 relative z-10 ${services.includes(opt.id) ? 'border-orange-500 bg-orange-500' : 'border-slate-600 bg-transparent group-hover:border-orange-400/50'}`}>
                        {services.includes(opt.id) && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button onClick={() => setStep(1)} className="px-6 py-3 rounded-lg font-bold text-slate-400 hover:text-white transition-colors">
                    Back
                  </button>
                  <button 
                    onClick={() => setStep(3)} 
                    disabled={services.length === 0}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Step <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in">
                <h2 className="text-2xl text-white font-bold mb-6">3. Select Finish Quality</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {conditionOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setCondition(opt.id)}
                      className={`group relative p-5 sm:p-6 rounded-2xl border text-center transition-all duration-300 overflow-hidden ${condition === opt.id ? 'border-orange-500 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.15)] scale-[1.02]' : 'border-[#1E2D45] bg-[#162133] hover:border-orange-500/50 hover:bg-[#1A273A] hover:-translate-y-1'}`}
                    >
                      {condition === opt.id && (
                        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent opacity-50" />
                      )}
                      
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto mb-3 flex items-center justify-center border-2 transition-colors duration-300 ${condition === opt.id ? 'border-orange-500 bg-orange-500/20 text-orange-500' : 'border-[#1E2D45] text-slate-500 bg-[#162133] group-hover:border-orange-400/30'}`}>
                        <Star size={20} className={`transition-all duration-300 ${condition === opt.id ? 'fill-orange-500 scale-110 drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]' : 'group-hover:text-orange-400 group-hover:scale-110'}`} />
                      </div>
                      
                      <h3 className={`font-bold text-lg sm:text-xl mb-1.5 relative z-10 transition-colors ${condition === opt.id ? 'text-orange-400 drop-shadow-md' : 'text-white'}`}>{opt.label}</h3>
                      <p className="text-slate-400 text-xs sm:text-sm relative z-10">{opt.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-8">
                  <button onClick={() => setStep(2)} className="px-6 py-3 rounded-lg font-bold text-slate-400 hover:text-white transition-colors">
                    Back
                  </button>
                  <button onClick={() => setStep(4)} className="btn-primary flex items-center gap-2 px-8">
                    Calculate Now <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-fade-in max-w-md mx-auto py-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
                    <Lock className="w-8 h-8 text-orange-500" />
                  </div>
                  <h2 className="text-2xl text-white font-bold mb-2">Your Estimate is Ready!</h2>
                  <p className="text-slate-400 text-sm">Enter your details to unlock the complete cost breakdown instantly.</p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#060B14] border border-[#1E2D45] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">WhatsApp Number</label>
                    <div className="flex relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">+91</span>
                      <input 
                        type="tel" 
                        required 
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-[#060B14] border border-[#1E2D45] rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="10-digit number"
                      />
                    </div>
                  </div>

                  {/* Honeypot Field */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Website URL</label>
                    <input 
                      type="text" 
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="w-full bg-[#060B14] border border-[#1E2D45] rounded-xl px-4 py-3.5 text-white"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* DPDP Consent */}
                  <div className="flex items-start gap-3 mt-2">
                    <input 
                      type="checkbox" 
                      required
                      id="dpdpConsentCalc"
                      className="mt-1 accent-orange-500 w-4 h-4 cursor-pointer shrink-0"
                    />
                    <label htmlFor="dpdpConsentCalc" className="text-[10px] sm:text-xs text-slate-400 leading-relaxed cursor-pointer">
                      I agree to the <a href="/privacy" target="_blank" className="text-orange-400 hover:underline">Privacy Policy</a> and consent to receive construction estimates and updates.
                    </label>
                  </div>

                  {error && <p className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-2 rounded-lg">{error}</p>}

                  <button 
                    type="submit" 
                    disabled={isSubmitting || phone.length !== 10 || !name}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Unlocking...</>
                    ) : (
                      <>Unlock My Estimate <Lock size={16} className="ml-1" /></>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
                    <ShieldCheck size={14} className="text-green-500" /> Your information is 100% secure.
                  </p>
                </form>
              </div>
            )}

            {step === 5 && (
              <div className="animate-fade-in">
                <div className="bg-gradient-to-br from-[#1E2D45] to-[#0B1120] border border-green-500/30 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
                  
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/40">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>

                  <p className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-3">Estimated Cost Range</p>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
                    {estimate.min} <span className="text-slate-600 text-3xl font-light mx-2">to</span> {estimate.max}
                  </div>
                  
                  <div className="inline-block bg-[#080D1A] border border-[#1E2D45] rounded-xl px-6 py-4 mb-8 text-left mt-2 shadow-inner">
                    <p className="text-slate-300 text-sm mb-1"><span className="text-slate-500 w-24 inline-block">Property:</span> <strong className="text-white">{propertyType}</strong></p>
                    <p className="text-slate-300 text-sm mb-1"><span className="text-slate-500 w-24 inline-block">Quality:</span> <strong className="text-white">{condition} Finish</strong></p>
                    <p className="text-slate-300 text-sm"><span className="text-slate-500 w-24 inline-block">Services:</span> <strong className="text-white">{services.length} selected</strong></p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={handleWhatsApp} className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center gap-2 hover:-translate-y-1">
                      <PhoneLogo className="w-6 h-6 fill-white" /> Request 100% Free Site Visit (Diwali Special)
                    </button>
                    <button onClick={() => setStep(1)} className="text-slate-400 hover:text-white font-medium px-6 py-4 transition-colors">
                      Start Over
                    </button>
                  </div>
                  <p className="text-slate-500 text-xs mt-6">*This is an estimate. Final quotation is provided after site inspection. (🪔 Diwali Special: 100% Free Site Visit & Quote valid till 15 Nov; nominal visit fee applicable post offer, adjustable in bill).</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
  );
}
