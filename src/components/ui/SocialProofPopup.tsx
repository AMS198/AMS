'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CheckCircle, X } from 'lucide-react';

const names = ['Rahul', 'Priya', 'Amit', 'Neha', 'Sanjay', 'Pooja', 'Vikram', 'Anjali', 'Rakesh', 'Sneha'];
const locations = ['Bandra', 'Andheri', 'Thane', 'Navi Mumbai', 'Worli', 'Goregaon', 'Dadar', 'Borivali'];
const services = [
  'booked a Site Visit',
  'inquired about Bungalow Construction',
  'requested a Bathroom Renovation quote',
  'started a Modular Kitchen project',
  'hired for Full Interior Civil Work',
];

function getRandomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const MAX_POPUPS = 4; // Show max 4 popups per session — then stop completely

export default function SocialProofPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState({ name: '', loc: '', svc: '', time: 0 });
  const showCountRef = useRef(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];
  };

  const showNextPopup = () => {
    // Stop after MAX_POPUPS or if page is hidden (tab in background)
    if (showCountRef.current >= MAX_POPUPS || document.visibilityState === 'hidden') return;

    showCountRef.current += 1;
    setNotification({
      name: getRandomItem(names),
      loc: getRandomItem(locations),
      svc: getRandomItem(services),
      time: Math.floor(Math.random() * 59) + 1,
    });
    setIsVisible(true);

    // Auto-hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);

      // Schedule next ONLY if under limit
      if (showCountRef.current < MAX_POPUPS) {
        const nextDelay = 20000 + Math.floor(Math.random() * 15000); // 20–35s
        const nextTimer = setTimeout(showNextPopup, nextDelay);
        timersRef.current.push(nextTimer);
      }
    }, 5000);

    timersRef.current.push(hideTimer);
  };

  useEffect(() => {
    // Initial delay — 12 seconds
    const initialTimer = setTimeout(showNextPopup, 12000);
    timersRef.current.push(initialTimer);

    // Pause when tab is hidden, resume when visible
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        clearAllTimers();
        setIsVisible(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearAllTimers();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className="fixed bottom-20 sm:bottom-6 left-3 sm:left-6 z-40 max-w-[240px] sm:max-w-[280px] border border-white/10 shadow-2xl rounded-xl p-2.5 sm:p-3 overflow-hidden backdrop-blur-xl"
          style={{ background: 'linear-gradient(135deg, rgba(11,17,32,0.95), rgba(16,24,39,0.98))' }}
        >
          <div className="absolute top-0 right-0 w-12 h-12 bg-orange-500/10 blur-xl rounded-full pointer-events-none" />

          <button
            onClick={() => { setIsVisible(false); showCountRef.current = MAX_POPUPS; }} // user dismissed = stop
            className="absolute top-1.5 right-1.5 p-0.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={11} />
          </button>

          <div className="flex gap-2.5 items-center">
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex flex-shrink-0 items-center justify-center relative font-bold text-white text-xs sm:text-sm shadow-sm"
              style={{ background: `linear-gradient(135deg, hsl(${notification.name.charCodeAt(0) * 20}, 70%, 50%), hsl(${notification.name.charCodeAt(0) * 30}, 80%, 40%))` }}
            >
              {notification.name.charAt(0)}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border border-[#0B1120] rounded-full flex items-center justify-center">
                <CheckCircle size={6} className="text-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0 pr-3">
              <p className="text-slate-200 text-[11px] sm:text-xs leading-tight font-medium">
                <span className="font-bold text-white">{notification.name}</span> from{' '}
                <span className="text-orange-400 font-semibold">{notification.loc}</span> {notification.svc}.
              </p>
              <div className="flex items-center gap-1 text-slate-400 text-[9px] font-mono uppercase tracking-wider mt-1">
                <MapPin size={9} className="text-orange-400 shrink-0" />
                <span>Mumbai • {notification.time}m ago</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
