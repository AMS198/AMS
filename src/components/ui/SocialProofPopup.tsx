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
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-24 left-4 z-[60] max-w-[300px] w-[calc(100vw-32px)] border border-white/20 shadow-2xl rounded-2xl p-4 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.92), rgba(30,41,59,0.97))' }}
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/20 blur-2xl rounded-full pointer-events-none" />

          <button
            onClick={() => { setIsVisible(false); showCountRef.current = MAX_POPUPS; }} // user dismissed = stop
            className="absolute top-2 right-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={14} />
          </button>

          <div className="flex gap-3 items-center">
            <div
              className="w-10 h-10 rounded-full flex flex-shrink-0 items-center justify-center relative font-bold text-white text-lg"
              style={{ background: `linear-gradient(135deg, hsl(${notification.name.charCodeAt(0) * 20}, 70%, 50%), hsl(${notification.name.charCodeAt(0) * 30}, 80%, 40%))` }}
            >
              {notification.name.charAt(0)}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#0f172a] rounded-full flex items-center justify-center">
                <CheckCircle size={8} className="text-white" />
              </div>
            </div>

            <div className="flex-1 pr-4">
              <p className="text-white text-[13px] leading-snug font-medium mb-1">
                <span className="font-bold text-slate-200">{notification.name}</span> from{' '}
                <span className="text-orange-400">{notification.loc}</span> {notification.svc}.
              </p>
              <div className="flex items-center gap-1 text-slate-400 text-[10px] font-mono uppercase tracking-wider">
                <MapPin size={10} /> Mumbai • {notification.time} mins ago
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
