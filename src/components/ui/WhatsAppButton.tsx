'use client';
import { useState, useEffect, useRef } from 'react';
import { WhatsAppLogo } from './BrandIcons';
import { X, Send, UserCheck, MessageSquare } from 'lucide-react';
import { trackClick } from '@/lib/tracker';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [message, setMessage] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  const adminPhone = '918779391690'; // Primary WhatsApp number

  // Show a pulsing tooltip after 5 seconds to grab attention, then hide it after 15 seconds
  useEffect(() => {
    const showTimer = setTimeout(() => setShowTooltip(true), 5000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 20000); // 5s wait + 15s show = 20s total
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    trackClick('whatsapp', 'floating_chat_modal_send', adminPhone);
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'your website';
    const finalMessage = message.trim() 
      ? `${message}\n\n(Sent from: ${currentUrl})`
      : `Hi AMS Civil! I'm looking for a free construction/renovation estimate.`;
    
    window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent(finalMessage)}`, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex flex-col items-end pointer-events-none" ref={chatRef}>
      
      {/* ── The Chat Window (Lead Magnet) ── */}
      <div 
        className={`mb-4 w-[320px] sm:w-[350px] bg-[#0F172A] border border-slate-700 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 translate-y-0 pointer-events-auto' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-inner">
                <span className="font-display font-bold text-[#128C7E] text-sm">AMS</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#128C7E] rounded-full"></span>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm leading-tight">AMS Civil Support</h3>
              <p className="text-white/80 text-xs">Typically replies instantly</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${adminPhone}?text=Hi%20AMS%20Civil!%20I%20am%20looking%20for%20a%20construction%20estimate.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded transition-colors"
              title="Open WhatsApp directly"
            >
              Open App ↗
            </a>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Chat Body */}
        <div className="p-4 bg-[#0B1120] relative min-h-[150px] flex flex-col gap-3" style={{ backgroundImage: 'radial-gradient(#1E2D45 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
          <div className="bg-[#1E2D45] text-slate-200 text-sm p-3 rounded-2xl rounded-tl-sm shadow-sm max-w-[85%] self-start animate-fadeUp">
            <p>👋 Hi there! Welcome to AMS Civil Construction.</p>
          </div>
          <div className="bg-[#1E2D45] text-slate-200 text-sm p-3 rounded-2xl rounded-tl-sm shadow-sm max-w-[85%] self-start animate-fadeUp" style={{ animationDelay: '0.2s' }}>
            <p>Are you looking for a free estimate for your <b>Bungalow</b> or <b>Renovation</b> project?</p>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-3 bg-[#0F172A] border-t border-slate-700">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="w-full bg-[#1E2D45] border border-slate-600 text-slate-200 text-sm rounded-full py-2.5 pl-4 pr-12 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-slate-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-1.5 w-8 h-8 flex items-center justify-center bg-[#128C7E] hover:bg-[#075E54] text-white rounded-full transition-colors"
            >
              <Send size={14} className="ml-0.5" />
            </button>
          </form>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" onClick={() => setMessage('I need a free quote')} className="text-[10px] bg-[#1E2D45] text-slate-300 hover:text-white px-2 py-1 rounded-full border border-slate-700 hover:border-slate-500 transition-colors">Free Quote</button>
            <button type="button" onClick={() => setMessage('Bathroom Renovation details')} className="text-[10px] bg-[#1E2D45] text-slate-300 hover:text-white px-2 py-1 rounded-full border border-slate-700 hover:border-slate-500 transition-colors">Bathroom Reno</button>
          </div>
        </div>
      </div>

      {/* ── Floating Toggle Button ── */}
      <div className="relative flex items-center gap-4 pointer-events-auto">
        {/* Tooltip */}
        {!isOpen && showTooltip && (
          <div className="absolute right-full mr-4 bg-white text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.2)] animate-fadeRight flex items-center gap-2 whitespace-nowrap cursor-pointer hover:bg-slate-50" onClick={() => setIsOpen(true)}>
            Need an estimate? 💬
            {/* Tooltip Arrow */}
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white rotate-45"></div>
          </div>
        )}

        <button
          onClick={() => { setIsOpen(!isOpen); setShowTooltip(false); }}
          aria-label="Toggle WhatsApp Chat"
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 group"
          style={{ 
            background: isOpen ? '#1E2D45' : 'linear-gradient(135deg, #25D366, #128C7E)',
          }}
        >
          {/* Ripple Effect for Button — finite 3 pulses only, not infinite */}
          {!isOpen && <span className="absolute inset-0 rounded-full border-2 border-white/30" style={{ animation: 'ping 2s ease-in-out 3' }}></span>}
          
          {isOpen ? (
            <X className="text-white relative z-10" size={26} />
          ) : (
            <WhatsAppLogo className="text-white relative z-10 transition-all w-8 h-8" fill="currentColor" />
          )}
        </button>
      </div>

    </div>
  );
}
