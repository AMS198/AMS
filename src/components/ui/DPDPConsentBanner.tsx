'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DPDPConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('dpdp-consent');
    if (!hasConsented) {
      // Small delay so it doesn't instantly jump at the user
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('dpdp-consent', 'true');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6"
        >
          <div className="max-w-6xl mx-auto bg-[#0B1120] border border-orange-500/30 rounded-2xl shadow-2xl shadow-orange-500/10 p-4 sm:p-6 flex flex-col md:flex-row items-center gap-4 sm:gap-6 relative">
            <button 
              onClick={() => setShowBanner(false)}
              className="absolute top-2 right-2 p-2 text-slate-400 hover:text-white md:hidden"
            >
              <X size={16} />
            </button>
            
            <div className="flex-shrink-0 bg-orange-500/10 p-3 rounded-xl hidden sm:block">
              <ShieldCheck className="text-orange-500" size={32} />
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1 sm:hidden">
                <ShieldCheck className="text-orange-500" size={20} />
                <h3 className="text-white font-bold text-sm">Data Privacy (DPDP Act)</h3>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                We use cookies and collect information to provide you with personalized construction estimates and better services. By continuing to use our website or submitting forms, you agree to our <Link href="/privacy" className="text-orange-400 hover:underline">Privacy Policy</Link>.
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <button 
                onClick={handleAccept}
                className="w-full md:w-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-orange-500/20"
              >
                I Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
