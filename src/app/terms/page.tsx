// src/app/terms/page.tsx
import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, FileText, Shield, Gavel, Clock, CreditCard, 
  Construction, CheckCircle2, AlertCircle, Sparkles, HardHat
} from 'lucide-react';

const terms = [
  {
    icon: Shield,
    title: '1. Service & Execution Agreement',
    content: 'By engaging AMS Civil Construction, you enter into a professional partnership. We commit to delivering high-quality civil work using ISI-marked materials and skilled labor. All execution follows the agreed architectural plan and municipal safety standards.',
  },
  {
    icon: CreditCard,
    title: '2. Payment Structure & Milestones',
    content: 'Payments are strictly milestone-based. A 25% non-refundable mobilization fee is required to start. Subsequent payments (25% Structural, 25% Finishing, 25% Final) must be cleared within 3 days of milestone completion. Work will pause if payments are delayed beyond 7 days.',
  },
  {
    icon: AlertCircle,
    title: '3. No-Refund Policy',
    content: 'Once a project has commenced and materials have been procured or labor mobilized, AMS Civil Construction follows a strict No-Refund Policy. Payments made for completed milestones or advanced material procurement are final and non-refundable.',
  },
  {
    icon: Construction,
    title: '4. Scope of Work & Variations',
    content: 'Final pricing and scope of work may vary (increase or decrease) depending on the actual site conditions and our final discussion before execution. Any changes or additions to the original agreed scope of work will be treated as a "Variation" and will incur additional costs. Verbal instructions for changes will not be accepted; all variations must be confirmed via WhatsApp or Email.',
  },
  {
    icon: HardHat,
    title: '5. Site Safety & Compliance',
    content: 'AMS Civil takes full responsibility for labor safety on-site. However, the client must ensure the site is free from hazardous obstructions before mobilization. We adhere to standard safety protocols and use protective gear (PPE) as required by construction norms.',
  },
  {
    icon: CheckCircle2,
    title: '6. Material & Product Warranty',
    content: 'We provide a warranty on all materials sourced and used by us (Pipes, Cement, Bricks, Sand, etc.). These materials are strictly ISI-certified. If a manufacturer warranty exists for specific third-party products (like paints, tiles, or fittings), we will assist you in claiming it.',
  },
  {
    icon: Gavel,
    title: '7. Warranty Exclusions (Tutana Policy)',
    content: 'Our 1-year warranty covers structural and workmanship defects only. It does NOT cover: 1) Accidental breakage (tutana) caused by the client or third parties. 2) Damage due to improper usage. 3) Natural calamities or external seepage. 4) Normal wear and tear.',
  },
  {
    icon: Clock,
    title: '8. Handover & Final Responsibility',
    content: 'Upon final handover and full payment, the client assumes full ownership. AMS Civil is not responsible for any theft or damage to fixtures (fans, lights, taps) installed after our final team mobilization.',
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#080D1A] pt-40 pb-24">
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container-custom">
        {/* Header Section */}
        <div className="max-w-4xl mb-16">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-orange-400 transition-all text-xs mb-8">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-6">
            <Sparkles size={12} /> Transparency & Trust
          </div>

          <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-7xl leading-tight mb-6">
            Terms & <span className="text-gradient">Conditions</span>
          </h1>
          
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
            Detailed policies regarding payments, project execution, safety, and our comprehensive warranty.
          </p>
        </div>

        {/* Detailed Terms Grid */}
        <div className="grid gap-6 max-w-5xl">
          {terms.map((item, i) => (
            <div key={i} className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all duration-500 overflow-hidden">
              {/* Subtle number background */}
              <div className="absolute -right-4 -bottom-4 text-[120px] font-display font-black text-white/[0.03] select-none group-hover:text-orange-500/[0.05] transition-colors">
                {i + 1}
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 flex-shrink-0">
                  <item.icon size={28} />
                </div>
                
                <div>
                  <h3 className="text-white font-bold text-2xl mb-4 group-hover:text-orange-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-base sm:text-lg">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Special Notice: Warranty */}
          <div className="mt-10 p-8 sm:p-12 rounded-[40px] bg-gradient-to-br from-orange-500/20 via-[#111827] to-[#080D1A] border border-orange-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <AlertCircle size={100} className="text-orange-500" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-white font-display font-black text-3xl mb-6 flex items-center gap-3">
                <Shield className="text-orange-500" /> Important: Warranty & Refund Policy
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-8 mb-10">
                <div className="space-y-4">
                  <h4 className="text-orange-400 font-bold uppercase tracking-widest text-xs">What is Covered ✅</h4>
                  <ul className="space-y-2">
                    {['Structural cracks/defects', 'Workmanship errors', 'Material manufacturing defects', 'Seepage from our piping work'].map(t => (
                      <li key={t} className="flex items-center gap-2 text-slate-300 text-sm">
                        <CheckCircle2 size={14} className="text-green-500" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-red-400 font-bold uppercase tracking-widest text-xs">What is NOT Covered ❌</h4>
                  <ul className="space-y-2">
                    {['Physical breakage (Tutana)', 'Third-party damage', 'Refunds after project start', 'Natural disasters'].map(t => (
                      <li key={t} className="flex items-center gap-2 text-slate-300 text-sm">
                        <AlertCircle size={14} className="text-red-500" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="tel:+918779391690" className="btn-primary px-8 py-4 gap-3">
                  Call for Clarification <ArrowLeft className="rotate-180" size={18} />
                </a>
                <Link href="/contact" className="btn-outline px-8 py-4 bg-white/5">
                  Send Inquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
