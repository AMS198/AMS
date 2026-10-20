'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Download, MessageCircle, Copy, Check, Sparkles, PhoneCall, Award } from 'lucide-react';
import html2canvas from 'html2canvas';
import Link from 'next/link';

interface FestivalItem {
  id: string;
  title: string;
  sanskritTag: string;
  message: string;
  icon: string;
  ambientGlow: string;
  ringColor: string;
}

interface DynamicFestivalRange {
  id: string;
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD
  title: string;
  sanskritTag: string;
  icon: string;
  message: string;
  ambientGlow: string;
  ringColor: string;
  subDays?: Record<number, { title?: string; sanskritTag?: string; message?: string }>;
}

// Multi-Year Dynamic Festivals (Dates change by lunar/solar calendar)
const dynamicFestivalRanges: DynamicFestivalRange[] = [
  // --- 2025 ---
  {
    id: 'maha-shivaratri-2025',
    start: '2025-02-26',
    end: '2025-02-26',
    title: 'Maha Shivaratri',
    sanskritTag: '॥ ॐ नमः शिवाय ॥',
    message: 'May Lord Shiva’s divine grace bless your household with strength, unshakeable peace, and eternal prosperity.',
    icon: '🔱',
    ambientGlow: 'from-blue-600/20 via-indigo-500/15 to-purple-600/20',
    ringColor: 'border-blue-400/40',
  },
  {
    id: 'holi-2025',
    start: '2025-03-13',
    end: '2025-03-14',
    title: 'Happy Holi',
    sanskritTag: '॥ रंगोत्सवः सुखसमृद्धये ॥',
    message: 'May the vibrant colors of Holi paint your life and dream home with endless joy, harmony, and good health.',
    icon: '🎨',
    ambientGlow: 'from-pink-600/25 via-purple-600/15 to-amber-500/20',
    ringColor: 'border-pink-400/40',
  },
  {
    id: 'chaitra-navratri-2025',
    start: '2025-03-30',
    end: '2025-04-07',
    title: 'Chaitra Navratri & Gudi Padwa',
    sanskritTag: '॥ नूतन संवत्सरारंभ ॥',
    message: 'Auspicious Hindu New Year! An ideal time for Bhoomi Pujan and turning your dream home into reality.',
    icon: '🚩',
    ambientGlow: 'from-orange-600/25 via-amber-500/15 to-red-600/20',
    ringColor: 'border-amber-400/40',
  },
  {
    id: 'eid-2025',
    start: '2025-03-30',
    end: '2025-03-31',
    title: 'Eid Mubarak',
    sanskritTag: 'Peace, Prosperity & Joy',
    message: 'May this blessed festival illuminate your home with boundless peace, warm laughter, and supreme success.',
    icon: '🌙',
    ambientGlow: 'from-emerald-600/25 via-teal-500/15 to-green-700/20',
    ringColor: 'border-emerald-400/40',
  },
  {
    id: 'ganesh-utsav-2025',
    start: '2025-08-27',
    end: '2025-09-06',
    title: 'Ganesh Chaturthi',
    sanskritTag: '॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥',
    message: 'Ganpati Bappa Morya! May Lord Ganesha eliminate every obstacle and fill your home with auspicious beginnings.',
    icon: '🐘',
    ambientGlow: 'from-amber-600/25 via-orange-500/15 to-red-600/20',
    ringColor: 'border-amber-400/40',
  },
  {
    id: 'navratri-2025',
    start: '2025-09-22',
    end: '2025-09-30',
    title: 'Shubh Navratri',
    sanskritTag: '॥ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके ॥',
    message: 'Jai Mata Di! May Maa Durga shower divine blessings, strength, and boundless happiness on your family and home.',
    icon: '🔱',
    ambientGlow: 'from-red-600/25 via-orange-500/15 to-amber-500/20',
    ringColor: 'border-amber-400/40',
  },
  {
    id: 'dussehra-2025',
    start: '2025-10-02',
    end: '2025-10-02',
    title: 'Happy Dussehra',
    sanskritTag: '॥ अधर्म पर धर्म की विजय ॥',
    message: 'May truth always triumph! On this auspicious Vijayadashami, may your life and home celebrate unending victory and success.',
    icon: '🏹',
    ambientGlow: 'from-orange-600/25 via-amber-500/15 to-yellow-500/20',
    ringColor: 'border-amber-400/40',
  },
  {
    id: 'diwali-2025',
    start: '2025-10-18',
    end: '2025-10-23',
    title: 'Shubh Deepavali',
    sanskritTag: '॥ तमसो मा ज्योतिर्गमय ॥',
    message: 'May the divine lights of Diwali dispel all darkness and fill your beautiful abode with eternal wealth and joy.',
    icon: '🪔',
    ambientGlow: 'from-amber-500/25 via-yellow-500/15 to-orange-600/20',
    ringColor: 'border-amber-400/40',
  },
  {
    id: 'chhath-2025',
    start: '2025-10-26',
    end: '2025-10-28',
    title: 'Happy Chhath Puja',
    sanskritTag: '॥ ॐ सूर्याय नमः ॥',
    message: 'May Lord Surya and Chhathi Maiya bless your household with longevity, vibrant health, and divine purity.',
    icon: '🌅',
    ambientGlow: 'from-orange-600/25 via-amber-600/15 to-yellow-500/20',
    ringColor: 'border-orange-400/40',
  },

  // --- 2026 ---
  {
    id: 'maha-shivaratri-2026',
    start: '2026-02-15',
    end: '2026-02-15',
    title: 'Maha Shivaratri',
    sanskritTag: '॥ ॐ नमः शिवाय ॥',
    message: 'May Lord Shiva bless your home with unshakeable strength, serene peace, and eternal prosperity.',
    icon: '🔱',
    ambientGlow: 'from-blue-600/20 via-indigo-500/15 to-purple-600/20',
    ringColor: 'border-blue-400/40',
  },
  {
    id: 'holi-2026',
    start: '2026-03-03',
    end: '2026-03-04',
    title: 'Happy Holi',
    sanskritTag: '॥ रंगोत्सवः सुखसमृद्धये ॥',
    message: 'May the joyful colors of Holi bring lasting happiness, laughter, and warm prosperity to your dream home.',
    icon: '🎨',
    ambientGlow: 'from-pink-600/25 via-purple-600/15 to-yellow-500/20',
    ringColor: 'border-pink-400/40',
  },
  {
    id: 'gudi-padwa-2026',
    start: '2026-03-19',
    end: '2026-03-27',
    title: 'Gudi Padwa & Chaitra Navratri',
    sanskritTag: '॥ नूतन वर्षारंभ ॥',
    message: 'Auspicious Marathi New Year! An auspicious time to lay the holy foundation of your dream home.',
    icon: '🚩',
    ambientGlow: 'from-orange-600/25 via-amber-500/15 to-red-600/20',
    ringColor: 'border-amber-400/40',
    subDays: {
      1: { title: 'Happy Gudi Padwa', sanskritTag: '॥ नूतन संवत्सरारंभ ॥', message: 'Wishing you a prosperous Gudi Padwa and joyful Chaitra Navratri! A golden day for new construction.' },
      9: { title: 'Happy Ram Navami', sanskritTag: '॥ मर्यादा पुरुषोत्तम राम ॥', message: 'May the divine ideals of Maryada Purushottam Shri Ram bring righteousness and joy to your abode.' },
    }
  },
  {
    id: 'eid-2026',
    start: '2026-03-20',
    end: '2026-03-21',
    title: 'Eid Mubarak',
    sanskritTag: 'Peace, Prosperity & Joy',
    message: 'May the divine light of Eid bring harmony, health, and abundant blessings to your household.',
    icon: '🌙',
    ambientGlow: 'from-emerald-600/25 via-teal-500/15 to-green-700/20',
    ringColor: 'border-emerald-400/40',
  },
  {
    id: 'ganesh-utsav-2026',
    start: '2026-09-14',
    end: '2026-09-24',
    title: 'Ganesh Chaturthi',
    sanskritTag: '॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥',
    message: 'Ganpati Bappa Morya! May Lord Ganesha bestow boundless peace, wisdom, and success upon your home.',
    icon: '🐘',
    ambientGlow: 'from-amber-600/25 via-orange-500/15 to-red-600/20',
    ringColor: 'border-amber-400/40',
  },
  {
    id: 'navratri-2026',
    start: '2026-10-11',
    end: '2026-10-19',
    title: 'Shubh Navratri',
    sanskritTag: '॥ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके ॥',
    message: 'Jai Mata Di! May the nine divine nights of Maa Durga bring peace, happiness, and prosperity to your home.',
    icon: '🔱',
    ambientGlow: 'from-red-600/25 via-orange-500/15 to-amber-500/20',
    ringColor: 'border-amber-400/40',
    subDays: {
      1: { title: 'Shubh Navratri (Maa Shailputri)', sanskritTag: '॥ शैलपुत्री नमः ॥', message: 'May Maa Shailputri bless your life and foundations with strength, purity, and steadfast devotion.' },
      2: { title: 'Shubh Navratri (Maa Brahmacharini)', sanskritTag: '॥ ब्रह्मचारिणी नमः ॥', message: 'May Maa Brahmacharini bestow wisdom, penance, and peaceful harmony upon your home.' },
      3: { title: 'Shubh Navratri (Maa Chandraghanta)', sanskritTag: '॥ चन्द्रघण्टा नमः ॥', message: 'May Maa Chandraghanta protect your family from all adversities and illuminate your path.' },
      4: { title: 'Shubh Navratri (Maa Kushmanda)', sanskritTag: '॥ कूष्माण्डा नमः ॥', message: 'May cosmic creator Maa Kushmanda fill your world with radiant light and new opportunities.' },
      5: { title: 'Shubh Navratri (Maa Skandamata)', sanskritTag: '॥ स्कन्दमाता नमः ॥', message: 'May Maa Skandamata shower pure love, nurturing energy, and prosperity upon your family.' },
      6: { title: 'Shubh Navratri (Maa Katyayani)', sanskritTag: '॥ कात्यायनी नमः ॥', message: 'May the fierce protector Maa Katyayani conquer all challenges and bless your endeavors.' },
      7: { title: 'Shubh Navratri (Maa Kalaratri)', sanskritTag: '॥ कालरात्रि नमः ॥', message: 'May Maa Kalaratri destroy all negativity, doubts, and obstacles from your life.' },
      8: { title: 'Maha Ashtami (Maa Mahagauri)', sanskritTag: '॥ महागौरी नमः ॥', message: 'May Maa Mahagauri purify every corner of your home with serenity and divine grace.' },
      9: { title: 'Maha Navami (Maa Siddhidatri)', sanskritTag: '॥ सिद्धिदात्री नमः ॥', message: 'May Maa Siddhidatri fulfill all your dreams and bless your life with triumph and glory.' },
    }
  },
  {
    id: 'dussehra-2026',
    start: '2026-10-20',
    end: '2026-10-20',
    title: 'Happy Dussehra',
    sanskritTag: '॥ अधर्म पर धर्म की विजय ॥',
    message: 'May truth always triumph! On this auspicious day of Vijayadashami, may your home be blessed with eternal strength, harmony, and prosperity.',
    icon: '🏹',
    ambientGlow: 'from-orange-600/25 via-amber-500/15 to-yellow-500/20',
    ringColor: 'border-amber-400/40',
  },
  {
    id: 'diwali-2026',
    start: '2026-11-06',
    end: '2026-11-10',
    title: 'Shubh Deepavali',
    sanskritTag: '॥ ॐ श्रीं महालक्ष्म्यै नमः ॥',
    message: 'May the divine festival of lights illuminate your life and bring supreme joy, wealth, and abundance to your dream home.',
    icon: '🪔',
    ambientGlow: 'from-amber-500/25 via-yellow-500/15 to-orange-600/20',
    ringColor: 'border-amber-400/40',
    subDays: {
      1: { title: 'Shubh Dhanteras', sanskritTag: '॥ ॐ धन्वंतरये नमः ॥', message: 'May Lord Dhanvantari and Goddess Lakshmi bless your home with health, gold, and immense wealth.' },
      2: { title: 'Happy Chhoti Diwali', sanskritTag: '॥ प्रकाशोत्सव की शुभकामनाएं ॥', message: 'May the sacred lamps eliminate all shadows and welcome joy and fortune into your home.' },
      3: { title: 'Happy Diwali (Lakshmi Pujan)', sanskritTag: '॥ महालक्ष्मी नमोऽस्तुते ॥', message: 'Wishing you a magnificent Diwali! May Goddess Lakshmi forever grace your beautiful abode.' },
      4: { title: 'Happy Govardhan Puja', sanskritTag: '॥ गोवर्धन पूजा ॥', message: 'Celebrating mother nature and divine blessings. May your home overflow with abundance and peace.' },
      5: { title: 'Happy Bhai Dooj', sanskritTag: '॥ भाई दूज ॥', message: 'Celebrating the eternal bond of trust, protection, and unconditional love between siblings.' },
    }
  },
  {
    id: 'chhath-2026',
    start: '2026-11-14',
    end: '2026-11-17',
    title: 'Happy Chhath Puja',
    sanskritTag: '॥ ॐ सूर्याय नमः ॥',
    message: 'Chhath Puja ki Hardik Shubhkamnayein! May Lord Surya and Chhathi Maiya bless your household with longevity, purity, and health.',
    icon: '🌅',
    ambientGlow: 'from-orange-600/25 via-amber-600/15 to-yellow-500/20',
    ringColor: 'border-orange-400/40',
  },

  // --- 2027 ---
  {
    id: 'navratri-2027',
    start: '2027-09-30',
    end: '2027-10-08',
    title: 'Shubh Navratri',
    sanskritTag: '॥ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके ॥',
    message: 'Jai Mata Di! May the divine grace of Maa Durga bring auspicious prosperity to your home.',
    icon: '🔱',
    ambientGlow: 'from-red-600/25 via-orange-500/15 to-amber-500/20',
    ringColor: 'border-amber-400/40',
  },
  {
    id: 'dussehra-2027',
    start: '2027-10-09',
    end: '2027-10-09',
    title: 'Happy Dussehra',
    sanskritTag: '॥ अधर्म पर धर्म की विजय ॥',
    message: 'May truth, goodness, and courage always triumph. Wishing you a glorious Vijayadashami!',
    icon: '🏹',
    ambientGlow: 'from-orange-600/25 via-amber-500/15 to-yellow-500/20',
    ringColor: 'border-amber-400/40',
  },
  {
    id: 'diwali-2027',
    start: '2027-10-27',
    end: '2027-10-31',
    title: 'Shubh Deepavali',
    sanskritTag: '॥ तमसो मा ज्योतिर्गमय ॥',
    message: 'May the festival of lamps illuminate your life and bring supreme joy, wealth, and good fortune.',
    icon: '🪔',
    ambientGlow: 'from-amber-500/25 via-yellow-500/15 to-orange-600/20',
    ringColor: 'border-amber-400/40',
  },
];

// Fixed Date Festivals (Every year on exact MM-DD)
const fixedDateFestivals: Array<{ date: string; id: string; title: string; sanskritTag: string; message: string; icon: string; ambientGlow: string; ringColor: string }> = [
  {
    date: '01-01',
    id: 'new-year',
    title: 'Happy New Year',
    sanskritTag: '॥ नूतन वर्षारंभ ॥',
    message: 'Welcome to the New Year! May this year lay the foundation for all your cherished dreams and your new home.',
    icon: '✨',
    ambientGlow: 'from-blue-600/25 via-purple-600/15 to-pink-600/20',
    ringColor: 'border-amber-300/40',
  },
  {
    date: '01-14',
    id: 'makar-sankranti',
    title: 'Makar Sankranti',
    sanskritTag: '॥ मकर संक्रान्ति ॥',
    message: 'May your dreams soar high like kites in the clear blue sky! Wishing you and your family abundant joy and prosperity.',
    icon: '🪁',
    ambientGlow: 'from-yellow-600/25 via-orange-500/15 to-red-600/20',
    ringColor: 'border-amber-400/40',
  },
  {
    date: '01-26',
    id: 'republic-day',
    title: 'Republic Day',
    sanskritTag: '॥ जननी जन्मभूमिश्च स्वर्गादपि गरीयसी ॥',
    message: 'Saluting the constitution, unity, and heritage of our proud nation. Building a strong, beautiful India!',
    icon: '🇮🇳',
    ambientGlow: 'from-orange-600/25 via-white/10 to-green-600/20',
    ringColor: 'border-amber-300/40',
  },
  {
    date: '08-15',
    id: 'independence-day',
    title: 'Independence Day',
    sanskritTag: '॥ वन्दे मातरम् ॥',
    message: 'Celebrating the glory and spirit of a sovereign nation. Proudly building civil infrastructure with excellence.',
    icon: '🇮🇳',
    ambientGlow: 'from-orange-600/25 via-white/10 to-green-600/20',
    ringColor: 'border-amber-300/40',
  },
  {
    date: '10-02',
    id: 'gandhi-jayanti',
    title: 'Gandhi Jayanti',
    sanskritTag: '॥ सत्यमेव जयते ॥',
    message: 'Honoring Mahatma Gandhi’s timeless values of truth, harmony, and humble service to society.',
    icon: '🕊️',
    ambientGlow: 'from-orange-600/20 via-white/10 to-green-600/20',
    ringColor: 'border-amber-300/40',
  },
  {
    date: '12-25',
    id: 'christmas',
    title: 'Merry Christmas',
    sanskritTag: 'Peace On Earth & Goodwill',
    message: 'Wishing you a joyful Christmas filled with warmth, happiness, and beautiful spaces for your loved ones.',
    icon: '🎄',
    ambientGlow: 'from-red-600/25 via-green-600/15 to-emerald-700/20',
    ringColor: 'border-amber-300/40',
  },
];

export default function FestivalPopup() {
  const [activeFestival, setActiveFestival] = useState<FestivalItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;
    const mmdd = `${mm}-${dd}`;

    let matched: FestivalItem | null = null;

    // 1. Dynamic multi-year search
    for (const range of dynamicFestivalRanges) {
      if (todayStr >= range.start && todayStr <= range.end) {
        let title = range.title;
        let sanskritTag = range.sanskritTag;
        let message = range.message;

        if (range.subDays) {
          const startDate = new Date(range.start);
          const currentDate = new Date(todayStr);
          const diffDays = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
          if (range.subDays[diffDays]) {
            title = range.subDays[diffDays].title || title;
            sanskritTag = range.subDays[diffDays].sanskritTag || sanskritTag;
            message = range.subDays[diffDays].message || message;
          }
        }

        matched = {
          id: range.id,
          title,
          sanskritTag,
          message,
          icon: range.icon,
          ambientGlow: range.ambientGlow,
          ringColor: range.ringColor,
        };
        break;
      }
    }

    // 2. Fixed holiday search
    if (!matched) {
      const fixed = fixedDateFestivals.find(f => f.date === mmdd);
      if (fixed) {
        matched = {
          id: fixed.id,
          title: fixed.title,
          sanskritTag: fixed.sanskritTag,
          message: fixed.message,
          icon: fixed.icon,
          ambientGlow: fixed.ambientGlow,
          ringColor: fixed.ringColor,
        };
      }
    }

    if (matched) {
      setActiveFestival(matched);

      // Auto-open every time the website is opened or refreshed
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!activeFestival) return null;

  const getGreetingText = () => {
    return `${activeFestival.icon} ${activeFestival.title} - AMS Civil Construction.\n${activeFestival.message}\n\n🌐 https://www.amscivilwork.in`;
  };

  // Direct 1-Click WhatsApp Share
  const handleWhatsAppShare = () => {
    const text = getGreetingText();
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  // High-Resolution Poster Download
  const handleDownloadPoster = async () => {
    if (!cardRef.current) return;
    setIsCapturing(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2.5, // Crisp 2.5x retina resolution
        backgroundColor: '#070A12',
        useCORS: true,
        logging: false,
      });

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) return;

      const fileName = `${activeFestival.title.replace(/\s+/g, '-').toLowerCase()}-ams-civil.png`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating greeting poster:', err);
    } finally {
      setIsCapturing(false);
    }
  };

  // Native Mobile Device Share Sheet
  const handleNativeShare = async () => {
    if (!cardRef.current) return;
    setIsCapturing(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2.5,
        backgroundColor: '#070A12',
        useCORS: true,
        logging: false,
      });

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (blob) {
        const fileName = `${activeFestival.title.replace(/\s+/g, '-').toLowerCase()}.png`;
        const file = new File([blob], fileName, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: activeFestival.title,
            text: `${activeFestival.title} - AMS Civil Construction.\nhttps://www.amscivilwork.in`,
          });
          return;
        }
      }

      handleWhatsAppShare();
    } catch {
      handleWhatsAppShare();
    } finally {
      setIsCapturing(false);
    }
  };

  // Copy Greeting Text
  const handleCopyWish = async () => {
    try {
      await navigator.clipboard.writeText(getGreetingText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <>
      {/* Floating Re-Open Badge when popup is dismissed */}
      {!isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.85, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsVisible(true)}
          className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-40 bg-gradient-to-r from-[#17140b] via-[#1f190e] to-[#14120a] text-amber-200 font-medium text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(245,158,11,0.25)] flex items-center gap-2.5 border border-amber-500/40 hover:border-amber-400 transition-all cursor-pointer backdrop-blur-md group"
          title="Click to view & share festive greeting"
        >
          <span className="text-base sm:text-lg drop-shadow">{activeFestival.icon}</span>
          <span className="font-semibold tracking-wide bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
            {activeFestival.title}
          </span>
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full">
            Wish
          </span>
        </motion.button>
      )}

      {/* Main Luxury Modal */}
      <AnimatePresence>
        {isVisible && (
          <div className="fixed inset-0 z-[120] flex flex-col items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop with rich darkness */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVisible(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 15 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="relative w-full max-w-[350px] sm:max-w-[420px] bg-[#070A12] border border-amber-500/30 rounded-3xl shadow-[0_0_80px_rgba(245,158,11,0.2)] z-10 flex flex-col my-auto overflow-hidden ring-1 ring-white/10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-3 right-3 z-30 w-8 h-8 sm:w-9 sm:h-9 bg-black/60 hover:bg-black/90 rounded-full flex items-center justify-center text-amber-200/80 hover:text-amber-100 transition-colors border border-amber-500/30 backdrop-blur-sm cursor-pointer shadow-md"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {/* AREA TO CAPTURE: LUXURY ROYAL GREETING CARD */}
              <div
                ref={cardRef}
                className="relative w-full overflow-hidden flex flex-col justify-between text-center px-6 pt-7 pb-6 sm:px-8 sm:pt-9 sm:pb-8 select-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 15%, #181422 0%, #0d0f1a 50%, #06080e 100%)',
                  minHeight: '440px',
                }}
              >
                {/* Ambient Festive Color Glow */}
                <div className={`absolute inset-0 bg-gradient-to-b ${activeFestival.ambientGlow} pointer-events-none`} />

                {/* Royal Corner Ornaments */}
                <div className="absolute top-2.5 left-2.5 w-6 h-6 border-t-2 border-l-2 border-amber-400/50 rounded-tl-sm pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 w-6 h-6 border-t-2 border-r-2 border-amber-400/50 rounded-tr-sm pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 w-6 h-6 border-b-2 border-l-2 border-amber-400/50 rounded-bl-sm pointer-events-none" />
                <div className="absolute bottom-2.5 right-2.5 w-6 h-6 border-b-2 border-r-2 border-amber-400/50 rounded-br-sm pointer-events-none" />

                {/* Subtle Inner Filigree Border */}
                <div className="absolute inset-3 border border-amber-500/15 rounded-2xl pointer-events-none" />

                {/* Header: Company Emblem & Cultural Subtitle */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Sanskrit / Cultural Shloka Ribbon */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-amber-500/10 border border-amber-400/25 text-[11px] sm:text-xs font-serif text-amber-200 tracking-wider mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                    <Sparkles size={11} className="text-amber-400 animate-spin" />
                    <span>{activeFestival.sanskritTag}</span>
                    <Sparkles size={11} className="text-amber-400 animate-spin" />
                  </div>

                  {/* Clean Corporate Logo with Soft Radiance */}
                  <div className="bg-white/95 p-1.5 sm:p-2 rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.5)] border border-amber-400/30">
                    <img
                      src="/logo.png"
                      alt="AMS Civil Construction"
                      className="h-9 sm:h-11 w-auto object-contain"
                    />
                  </div>
                </div>

                {/* Center: Royal Festive Medallion & Title */}
                <div className="relative z-10 flex flex-col items-center my-auto py-3">
                  {/* Concentric Golden Halo with Icon */}
                  <div className="relative my-2">
                    {/* Pulsing Aura */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/30 via-yellow-500/20 to-orange-500/30 rounded-full blur-xl animate-pulse" />

                    {/* Royal Intricate Circular Medallion */}
                    <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#241c10] to-[#0c0d14] border-2 ${activeFestival.ringColor} shadow-[0_0_30px_rgba(245,158,11,0.25)] flex items-center justify-center`}>
                      {/* Inner dashed ring */}
                      <div className="absolute inset-1 rounded-full border border-dashed border-amber-300/30" />
                      <span className="text-4xl sm:text-5xl drop-shadow-[0_6px_12px_rgba(0,0,0,0.8)] filter">
                        {activeFestival.icon}
                      </span>
                    </div>
                  </div>

                  {/* Festival Main Heading with Serif Elegance */}
                  <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-wide bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-200 bg-clip-text text-transparent drop-shadow mt-1 mb-2">
                    {activeFestival.title}
                  </h2>

                  {/* Warm, High-End Architectural Blessing */}
                  <p className="text-stone-200 text-xs sm:text-[13px] leading-relaxed font-normal max-w-[280px] sm:max-w-[320px] mx-auto drop-shadow-sm font-sans">
                    {activeFestival.message}
                  </p>
                </div>

                {/* Footer: Corporate Legacy Signature */}
                <div className="relative z-10 pt-3 border-t border-amber-500/20 flex flex-col items-center">
                  {/* Diamond Divider */}
                  <div className="flex items-center gap-2 text-amber-400/50 text-[10px] mb-1">
                    <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-400/40" />
                    <span>◆</span>
                    <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-400/40" />
                  </div>

                  <p className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-amber-200">
                    AMS CIVIL CONSTRUCTION
                  </p>
                  <p className="text-[8px] sm:text-[9px] font-medium tracking-widest text-amber-400/70 uppercase mt-0.5">
                    25+ Years of Architectural & Civil Excellence
                  </p>
                  <p className="text-[8px] sm:text-[9px] text-stone-400 font-mono tracking-widest mt-1">
                    WWW.AMSCIVILWORK.IN
                  </p>
                </div>
              </div>

              {/* INTERACTIVE ACTION BAR (Outside capture area) */}
              <div className="bg-[#0b0e17] px-4 py-3.5 sm:px-5 sm:py-4 border-t border-amber-500/20 flex flex-col gap-2.5">
                {/* Primary WhatsApp Share Button with Metallic Green Finish */}
                <button
                  onClick={handleWhatsAppShare}
                  className="w-full bg-gradient-to-r from-[#1eb854] to-[#25D366] hover:from-[#1ca34a] hover:to-[#22c35e] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-[0_4px_16px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] transition-all cursor-pointer active:scale-[0.98]"
                >
                  <MessageCircle size={18} className="fill-white text-[#25D366]" />
                  <span>Share Wish on WhatsApp</span>
                </button>

                {/* Secondary Actions: Save Poster, Native Share, Copy */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={handleDownloadPoster}
                    disabled={isCapturing}
                    className="bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white font-medium py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 text-[11px] sm:text-xs transition-colors border border-amber-500/20 hover:border-amber-500/40 disabled:opacity-50 cursor-pointer"
                  >
                    {isCapturing ? (
                      <div className="w-3.5 h-3.5 border-2 border-amber-400/40 border-t-amber-400 rounded-full animate-spin" />
                    ) : (
                      <Download size={13} className="text-amber-400" />
                    )}
                    <span>{isCapturing ? 'Saving...' : 'Save HD'}</span>
                  </button>

                  <button
                    onClick={handleNativeShare}
                    disabled={isCapturing}
                    className="bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white font-medium py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 text-[11px] sm:text-xs transition-colors border border-amber-500/20 hover:border-amber-500/40 disabled:opacity-50 cursor-pointer"
                  >
                    <Share2 size={13} className="text-amber-400" />
                    <span>Share</span>
                  </button>

                  <button
                    onClick={handleCopyWish}
                    className="bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white font-medium py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 text-[11px] sm:text-xs transition-colors border border-amber-500/20 hover:border-amber-500/40 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={13} className="text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} className="text-amber-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Festive Business CTA: Auspicious Construction Advice */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] sm:text-xs text-stone-400 px-1">
                  <span className="flex items-center gap-1 text-stone-300">
                    <Award size={13} className="text-amber-400" />
                    <span>Auspicious Time for Construction?</span>
                  </span>
                  <Link
                    href="/free-consultation"
                    onClick={() => setIsVisible(false)}
                    className="text-amber-300 hover:text-amber-200 font-semibold underline flex items-center gap-1 ml-1"
                  >
                    <PhoneCall size={11} />
                    <span>Free Advice</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
