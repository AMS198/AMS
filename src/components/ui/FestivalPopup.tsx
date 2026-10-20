'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, MessageCircle, Copy, Check, Sparkles, PhoneCall, Award } from 'lucide-react';
import html2canvas from 'html2canvas';
import Link from 'next/link';

interface FestivalItem {
  id: string;
  title: string;
  sanskritTag: string;
  message: string;
  artType: 'bow' | 'diya' | 'trishul' | 'ganesha' | 'crescent' | 'flag' | 'star';
  themeGradient: string;
  ringGlow: string;
}

interface DynamicFestivalRange {
  id: string;
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD
  title: string;
  sanskritTag: string;
  artType: 'bow' | 'diya' | 'trishul' | 'ganesha' | 'crescent' | 'flag' | 'star';
  message: string;
  themeGradient: string;
  ringGlow: string;
  subDays?: Record<number, { title?: string; sanskritTag?: string; message?: string }>;
}

// Multi-Year Dynamic Festivals
const dynamicFestivalRanges: DynamicFestivalRange[] = [
  // --- 2025 ---
  {
    id: 'maha-shivaratri-2025',
    start: '2025-02-26',
    end: '2025-02-26',
    title: 'Maha Shivaratri',
    sanskritTag: '॥ ॐ नमः शिवाय ॥',
    artType: 'trishul',
    message: 'May Lord Shiva’s divine grace bless your household with strength, unshakeable peace, and eternal prosperity.',
    themeGradient: 'from-[#0b1329] via-[#090b14] to-[#04060b]',
    ringGlow: 'rgba(59,130,246,0.3)',
  },
  {
    id: 'holi-2025',
    start: '2025-03-13',
    end: '2025-03-14',
    title: 'Happy Holi',
    sanskritTag: '॥ रंगोत्सवः सुखसमृद्धये ॥',
    artType: 'star',
    message: 'May the vibrant colors of Holi paint your life and dream home with endless joy, harmony, and good health.',
    themeGradient: 'from-[#1f0b1a] via-[#120814] to-[#06040a]',
    ringGlow: 'rgba(236,72,153,0.3)',
  },
  {
    id: 'chaitra-navratri-2025',
    start: '2025-03-30',
    end: '2025-04-07',
    title: 'Chaitra Navratri & Gudi Padwa',
    sanskritTag: '॥ नूतन संवत्सरारंभ ॥',
    artType: 'trishul',
    message: 'Auspicious Hindu New Year! An ideal time for Bhoomi Pujan and turning your dream home into reality.',
    themeGradient: 'from-[#221008] via-[#140b07] to-[#080504]',
    ringGlow: 'rgba(249,115,22,0.3)',
  },
  {
    id: 'eid-2025',
    start: '2025-03-30',
    end: '2025-03-31',
    title: 'Eid Mubarak',
    sanskritTag: 'Peace, Prosperity & Blessings',
    artType: 'crescent',
    message: 'May this blessed festival illuminate your home with boundless peace, warm laughter, and supreme success.',
    themeGradient: 'from-[#081a14] via-[#05110d] to-[#020705]',
    ringGlow: 'rgba(16,185,129,0.3)',
  },
  {
    id: 'ganesh-utsav-2025',
    start: '2025-08-27',
    end: '2025-09-06',
    title: 'Ganesh Chaturthi',
    sanskritTag: '॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥',
    artType: 'ganesha',
    message: 'Ganpati Bappa Morya! May Lord Ganesha eliminate every obstacle and fill your home with auspicious beginnings.',
    themeGradient: 'from-[#241206] via-[#140a04] to-[#070402]',
    ringGlow: 'rgba(245,158,11,0.35)',
  },
  {
    id: 'navratri-2025',
    start: '2025-09-22',
    end: '2025-09-30',
    title: 'Shubh Navratri',
    sanskritTag: '॥ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके ॥',
    artType: 'trishul',
    message: 'Jai Mata Di! May Maa Durga shower divine blessings, strength, and boundless happiness on your family and home.',
    themeGradient: 'from-[#22080a] via-[#140507] to-[#070203]',
    ringGlow: 'rgba(239,68,68,0.35)',
  },
  {
    id: 'dussehra-2025',
    start: '2025-10-02',
    end: '2025-10-02',
    title: 'Happy Dussehra',
    sanskritTag: '॥ अधर्म पर धर्म की विजय ॥',
    artType: 'bow',
    message: 'May truth always triumph! On this auspicious Vijayadashami, may your home celebrate unending victory and success.',
    themeGradient: 'from-[#1e1308] via-[#120c06] to-[#070402]',
    ringGlow: 'rgba(245,158,11,0.4)',
  },
  {
    id: 'diwali-2025',
    start: '2025-10-18',
    end: '2025-10-23',
    title: 'Shubh Deepavali',
    sanskritTag: '॥ तमसो मा ज्योतिर्गमय ॥',
    artType: 'diya',
    message: 'May the divine lights of Diwali dispel all darkness and fill your beautiful abode with eternal wealth and joy.',
    themeGradient: 'from-[#241406] via-[#140b04] to-[#070402]',
    ringGlow: 'rgba(245,158,11,0.45)',
  },

  // --- 2026 ---
  {
    id: 'maha-shivaratri-2026',
    start: '2026-02-15',
    end: '2026-02-15',
    title: 'Maha Shivaratri',
    sanskritTag: '॥ ॐ नमः शिवाय ॥',
    artType: 'trishul',
    message: 'May Lord Shiva bless your home with unshakeable strength, serene peace, and eternal prosperity.',
    themeGradient: 'from-[#0b1329] via-[#090b14] to-[#04060b]',
    ringGlow: 'rgba(59,130,246,0.3)',
  },
  {
    id: 'holi-2026',
    start: '2026-03-03',
    end: '2026-03-04',
    title: 'Happy Holi',
    sanskritTag: '॥ रंगोत्सवः सुखसमृद्धये ॥',
    artType: 'star',
    message: 'May the joyful colors of Holi bring lasting happiness, laughter, and warm prosperity to your dream home.',
    themeGradient: 'from-[#1f0b1a] via-[#120814] to-[#06040a]',
    ringGlow: 'rgba(236,72,153,0.3)',
  },
  {
    id: 'gudi-padwa-2026',
    start: '2026-03-19',
    end: '2026-03-27',
    title: 'Gudi Padwa & Chaitra Navratri',
    sanskritTag: '॥ नूतन वर्षारंभ ॥',
    artType: 'trishul',
    message: 'Auspicious Marathi New Year! An auspicious time to lay the holy foundation of your dream home.',
    themeGradient: 'from-[#221008] via-[#140b07] to-[#080504]',
    ringGlow: 'rgba(249,115,22,0.3)',
    subDays: {
      1: { title: 'Happy Gudi Padwa', sanskritTag: '॥ नूतन संवत्सरारंभ ॥', message: 'Wishing you a prosperous Gudi Padwa! A golden day for new beginnings and home construction.' },
      9: { title: 'Happy Ram Navami', sanskritTag: '॥ मर्यादा पुरुषोत्तम राम ॥', message: 'May the divine ideals of Maryada Purushottam Shri Ram bring righteousness and joy to your abode.' },
    }
  },
  {
    id: 'eid-2026',
    start: '2026-03-20',
    end: '2026-03-21',
    title: 'Eid Mubarak',
    sanskritTag: 'Peace, Prosperity & Blessings',
    artType: 'crescent',
    message: 'May the divine light of Eid bring harmony, health, and abundant blessings to your household.',
    themeGradient: 'from-[#081a14] via-[#05110d] to-[#020705]',
    ringGlow: 'rgba(16,185,129,0.3)',
  },
  {
    id: 'ganesh-utsav-2026',
    start: '2026-09-14',
    end: '2026-09-24',
    title: 'Ganesh Chaturthi',
    sanskritTag: '॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ॥',
    artType: 'ganesha',
    message: 'Ganpati Bappa Morya! May Lord Ganesha bestow boundless peace, wisdom, and success upon your home.',
    themeGradient: 'from-[#241206] via-[#140a04] to-[#070402]',
    ringGlow: 'rgba(245,158,11,0.35)',
  },
  {
    id: 'navratri-2026',
    start: '2026-10-11',
    end: '2026-10-19',
    title: 'Shubh Navratri',
    sanskritTag: '॥ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके ॥',
    artType: 'trishul',
    message: 'Jai Mata Di! May the nine divine nights of Maa Durga bring peace, happiness, and prosperity to your home.',
    themeGradient: 'from-[#22080a] via-[#140507] to-[#070203]',
    ringGlow: 'rgba(239,68,68,0.35)',
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
    artType: 'bow',
    message: 'May truth always triumph! On this auspicious day of Vijayadashami, may your home be blessed with eternal strength, harmony, and prosperity.',
    themeGradient: 'from-[#1e1308] via-[#120c06] to-[#070402]',
    ringGlow: 'rgba(245,158,11,0.4)',
  },
  {
    id: 'diwali-2026',
    start: '2026-11-06',
    end: '2026-11-10',
    title: 'Shubh Deepavali',
    sanskritTag: '॥ ॐ श्रीं महालक्ष्म्यै नमः ॥',
    artType: 'diya',
    message: 'May the divine festival of lights illuminate your life and bring supreme joy, wealth, and abundance to your dream home.',
    themeGradient: 'from-[#241406] via-[#140b04] to-[#070402]',
    ringGlow: 'rgba(245,158,11,0.45)',
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
    artType: 'diya',
    message: 'Chhath Puja ki Hardik Shubhkamnayein! May Lord Surya and Chhathi Maiya bless your household with longevity, purity, and health.',
    themeGradient: 'from-[#221008] via-[#140b07] to-[#080504]',
    ringGlow: 'rgba(249,115,22,0.35)',
  },

  // --- 2027 ---
  {
    id: 'navratri-2027',
    start: '2027-09-30',
    end: '2027-10-08',
    title: 'Shubh Navratri',
    sanskritTag: '॥ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके ॥',
    artType: 'trishul',
    message: 'Jai Mata Di! May the divine grace of Maa Durga bring auspicious prosperity to your home.',
    themeGradient: 'from-[#22080a] via-[#140507] to-[#070203]',
    ringGlow: 'rgba(239,68,68,0.35)',
  },
  {
    id: 'dussehra-2027',
    start: '2027-10-09',
    end: '2027-10-09',
    title: 'Happy Dussehra',
    sanskritTag: '॥ अधर्म पर धर्म की विजय ॥',
    artType: 'bow',
    message: 'May truth, goodness, and courage always triumph. Wishing you a glorious Vijayadashami!',
    themeGradient: 'from-[#1e1308] via-[#120c06] to-[#070402]',
    ringGlow: 'rgba(245,158,11,0.4)',
  },
  {
    id: 'diwali-2027',
    start: '2027-10-27',
    end: '2027-10-31',
    title: 'Shubh Deepavali',
    sanskritTag: '॥ तमसो मा ज्योतिर्गमय ॥',
    artType: 'diya',
    message: 'May the festival of lamps illuminate your life and bring supreme joy, wealth, and good fortune.',
    themeGradient: 'from-[#241406] via-[#140b04] to-[#070402]',
    ringGlow: 'rgba(245,158,11,0.45)',
  },
];

// Fixed Date Festivals
const fixedDateFestivals: Array<{ date: string; id: string; title: string; sanskritTag: string; message: string; artType: 'bow' | 'diya' | 'trishul' | 'ganesha' | 'crescent' | 'flag' | 'star'; themeGradient: string; ringGlow: string }> = [
  {
    date: '01-01',
    id: 'new-year',
    title: 'Happy New Year',
    sanskritTag: '॥ नूतन वर्षारंभ ॥',
    artType: 'star',
    message: 'Welcome to the New Year! May this year lay the foundation for all your cherished dreams and your new home.',
    themeGradient: 'from-[#0e172a] via-[#090e1a] to-[#04070d]',
    ringGlow: 'rgba(147,197,253,0.3)',
  },
  {
    date: '01-14',
    id: 'makar-sankranti',
    title: 'Makar Sankranti',
    sanskritTag: '॥ मकर संक्रान्ति ॥',
    artType: 'bow',
    message: 'May your dreams soar high like kites in the clear blue sky! Wishing you and your family abundant joy and prosperity.',
    themeGradient: 'from-[#221008] via-[#140b07] to-[#080504]',
    ringGlow: 'rgba(249,115,22,0.3)',
  },
  {
    date: '01-26',
    id: 'republic-day',
    title: 'Republic Day',
    sanskritTag: '॥ जननी जन्मभूमिश्च स्वर्गादपि गरीयसी ॥',
    artType: 'flag',
    message: 'Saluting the constitution, unity, and heritage of our proud nation. Building a strong, beautiful India!',
    themeGradient: 'from-[#17140b] via-[#0d0f14] to-[#06080b]',
    ringGlow: 'rgba(245,158,11,0.3)',
  },
  {
    date: '08-15',
    id: 'independence-day',
    title: 'Independence Day',
    sanskritTag: '॥ वन्दे मातरम् ॥',
    artType: 'flag',
    message: 'Celebrating the glory and spirit of a sovereign nation. Proudly building civil infrastructure with excellence.',
    themeGradient: 'from-[#17140b] via-[#0d0f14] to-[#06080b]',
    ringGlow: 'rgba(245,158,11,0.3)',
  },
  {
    date: '10-02',
    id: 'gandhi-jayanti',
    title: 'Gandhi Jayanti',
    sanskritTag: '॥ सत्यमेव जयते ॥',
    artType: 'star',
    message: 'Honoring Mahatma Gandhi’s timeless values of truth, harmony, and humble service to society.',
    themeGradient: 'from-[#17140b] via-[#0d0f14] to-[#06080b]',
    ringGlow: 'rgba(245,158,11,0.3)',
  },
  {
    date: '12-25',
    id: 'christmas',
    title: 'Merry Christmas',
    sanskritTag: 'Peace On Earth & Goodwill',
    artType: 'star',
    message: 'Wishing you a joyful Christmas filled with warmth, happiness, and beautiful spaces for your loved ones.',
    themeGradient: 'from-[#1f090d] via-[#120508] to-[#060203]',
    ringGlow: 'rgba(239,68,68,0.3)',
  },
];

// Handcrafted Royal Vector Illustrations (No cheap AI cartoon emojis!)
function FestivalArtwork({ type }: { type: FestivalItem['artType'] }) {
  if (type === 'bow') {
    // Elegant Dussehra Golden Bow & Arrow
    return (
      <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 filter drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
        {/* Glow halo */}
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(251,191,36,0.2)" strokeWidth="1" strokeDasharray="3 3" />
        {/* Curved Golden Bow */}
        <path d="M 28 80 Q 20 50 28 20 Q 32 35 34 50 Q 32 65 28 80 Z" fill="url(#goldGrad)" />
        {/* Bowstring */}
        <line x1="28" y1="20" x2="28" y2="80" stroke="#FDE68A" strokeWidth="1.2" strokeOpacity="0.8" />
        {/* Divine Arrow Shaft */}
        <line x1="22" y1="50" x2="78" y2="50" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
        {/* Arrowhead */}
        <polygon points="78,44 88,50 78,56 81,50" fill="url(#goldGrad)" />
        {/* Arrow fletching */}
        <polygon points="24,46 16,43 18,50 16,57 24,54" fill="url(#goldGrad)" />
        {/* Sunburst Sparks */}
        <circle cx="88" cy="50" r="2" fill="#FFFBEB" />
        <path d="M 88 43 L 88 47 M 88 53 L 88 57 M 82 50 L 85 50 M 91 50 L 94 50" stroke="#FDE68A" strokeWidth="1" strokeLinecap="round" />
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (type === 'diya') {
    // Royal Diwali Golden Diya with Glowing Flame
    return (
      <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 filter drop-shadow-[0_0_18px_rgba(245,158,11,0.6)]">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(251,191,36,0.2)" strokeWidth="1" strokeDasharray="3 3" />
        {/* Diya Base */}
        <path d="M 22 58 C 24 74 76 74 78 58 C 70 65 30 65 22 58 Z" fill="url(#diyaGold)" />
        <ellipse cx="50" cy="58" rx="28" ry="6" fill="#B45309" />
        <ellipse cx="50" cy="57" rx="25" ry="4" fill="#78350F" />
        {/* Flame */}
        <path d="M 50 20 C 44 34 40 44 50 56 C 60 44 56 34 50 20 Z" fill="url(#flameGrad)" />
        {/* Inner Flame core */}
        <path d="M 50 32 C 47 40 45 46 50 53 C 55 46 53 40 50 32 Z" fill="#FEF08A" />
        {/* Sparks */}
        <circle cx="50" cy="16" r="1.5" fill="#FFFBEB" />
        <circle cx="43" cy="24" r="1" fill="#FDE68A" />
        <circle cx="57" cy="24" r="1" fill="#FDE68A" />
        <defs>
          <linearGradient id="diyaGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="60%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
          <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="40%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (type === 'trishul') {
    // Sacred Golden Trishul & Lotus (Navratri / Shivaratri)
    return (
      <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 filter drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(251,191,36,0.2)" strokeWidth="1" strokeDasharray="3 3" />
        {/* Central Prong */}
        <path d="M 48 82 L 48 24 L 50 16 L 52 24 L 52 82 Z" fill="url(#goldGrad2)" />
        {/* Left Prong */}
        <path d="M 48 48 C 30 46 30 26 30 26 C 36 34 44 38 48 42 Z" fill="url(#goldGrad2)" />
        {/* Right Prong */}
        <path d="M 52 48 C 70 46 70 26 70 26 C 64 34 56 38 52 42 Z" fill="url(#goldGrad2)" />
        {/* Damru / Center Band */}
        <ellipse cx="50" cy="54" rx="8" ry="3" fill="#FDE68A" />
        {/* Lotus Petal Base */}
        <path d="M 38 78 C 44 72 56 72 62 78 C 56 82 44 82 38 78 Z" fill="#D97706" />
        <defs>
          <linearGradient id="goldGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (type === 'ganesha') {
    // Royal Golden Lord Ganesha Minimal Line Art
    return (
      <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 filter drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(251,191,36,0.2)" strokeWidth="1" strokeDasharray="3 3" />
        {/* Trunk & Ear Line Art */}
        <path d="M 38 32 C 34 42 34 52 42 56 C 48 58 52 64 50 72 C 48 78 42 78 40 74" fill="none" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
        {/* Crown / Pagdi */}
        <path d="M 44 22 L 56 22 L 58 30 L 42 30 Z" fill="#F59E0B" />
        <polygon points="50,14 55,22 45,22" fill="#FEF08A" />
        {/* Big Ear */}
        <path d="M 54 30 C 66 32 72 44 64 54 C 58 58 54 54 54 50" fill="none" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
        {/* Tilak / Tika */}
        <ellipse cx="46" cy="38" rx="2" ry="4" fill="#DC2626" />
        {/* Modak */}
        <circle cx="62" cy="68" r="4" fill="#F59E0B" />
      </svg>
    );
  }

  if (type === 'crescent') {
    // Celestial Crescent Moon & Lantern (Eid)
    return (
      <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 filter drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(52,211,153,0.2)" strokeWidth="1" strokeDasharray="3 3" />
        {/* Crescent */}
        <path d="M 52 20 C 35 24 25 40 28 58 C 31 74 48 84 64 78 C 50 78 38 66 38 50 C 38 36 44 26 52 20 Z" fill="url(#crescentGold)" />
        {/* Hanging Lantern */}
        <line x1="68" y1="20" x2="68" y2="40" stroke="#FDE68A" strokeWidth="1" />
        <polygon points="68,40 64,44 72,44" fill="#F59E0B" />
        <rect x="64" y="44" width="8" height="12" rx="1" fill="#FEF08A" />
        <polygon points="64,56 72,56 68,60" fill="#F59E0B" />
        <defs>
          <linearGradient id="crescentGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // Default / Star / Flag / National
  return (
    <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 filter drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(251,191,36,0.2)" strokeWidth="1" strokeDasharray="3 3" />
      {/* 8-pointed royal star */}
      <polygon points="50,18 56,36 74,36 60,48 66,66 50,54 34,66 40,48 26,36 44,36" fill="url(#goldGradStar)" />
      <circle cx="50" cy="46" r="6" fill="#FFFBEB" />
      <defs>
        <linearGradient id="goldGradStar" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function FestivalPopup() {
  const [activeFestival, setActiveFestival] = useState<FestivalItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
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
          artType: range.artType,
          themeGradient: range.themeGradient,
          ringGlow: range.ringGlow,
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
          artType: fixed.artType,
          themeGradient: fixed.themeGradient,
          ringGlow: fixed.ringGlow,
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

  const captionText = `${activeFestival.title} - AMS Civil Construction.\n${activeFestival.message}\n\n🌐 https://www.amscivilwork.in`;

  // Helper to generate HD Blob of card
  const generatePosterBlob = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;
    const canvas = await html2canvas(cardRef.current, {
      scale: 2.5,
      backgroundColor: '#070A12',
      useCORS: true,
      logging: false,
    });
    return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
  };

  // Primary Action: Share PHOTO + CAPTION directly to WhatsApp (Mobile) or download + open (Desktop)
  const handleShareToWhatsApp = async () => {
    if (!activeFestival) return;
    setIsSharing(true);
    try {
      const blob = await generatePosterBlob();
      if (!blob) throw new Error('Could not create poster image');

      const fileName = `${activeFestival.title.replace(/\s+/g, '-').toLowerCase()}-ams-civil.png`;
      const file = new File([blob], fileName, { type: 'image/png' });

      // On Mobile / Web Share API: passes the real IMAGE FILE directly into WhatsApp!
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: activeFestival.title,
          text: `${activeFestival.title} - AMS Civil Construction.\nhttps://www.amscivilwork.in`,
        });
        return;
      }

      // Desktop Fallback:
      // Download the photo automatically so user has the file, and open WhatsApp Web with text
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);

      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(captionText)}`;
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      console.error('WhatsApp share error:', err);
      // Fallback text if canvas blocked
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(captionText)}`;
      window.open(whatsappUrl, '_blank');
    } finally {
      setIsSharing(false);
    }
  };

  // Download High-Resolution Poster
  const handleDownloadPoster = async () => {
    if (!activeFestival) return;
    setIsSharing(true);
    try {
      const blob = await generatePosterBlob();
      if (!blob) return;

      const fileName = `${activeFestival.title.replace(/\s+/g, '-').toLowerCase()}-ams-civil.png`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsSharing(false);
    }
  };

  // Copy Wish Text
  const handleCopyWish = async () => {
    try {
      await navigator.clipboard.writeText(captionText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy error', err);
    }
  };

  return (
    <>
      {/* Floating Re-Open Badge (Bottom-Left, safe from right-side WhatsApp widget) */}
      {!isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.85, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsVisible(true)}
          className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-40 bg-gradient-to-r from-[#17140b] via-[#1f190e] to-[#14120a] text-amber-200 font-medium text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(245,158,11,0.25)] flex items-center gap-2 border border-amber-500/40 hover:border-amber-400 transition-all cursor-pointer backdrop-blur-md"
          title="Click to view & share festive greeting"
        >
          <Sparkles size={14} className="text-amber-400 animate-spin" />
          <span className="font-semibold tracking-wide bg-gradient-to-r from-amber-200 to-amber-300 bg-clip-text text-transparent">
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
          <div className="fixed inset-0 z-[120] flex flex-col items-center justify-center p-3 sm:p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVisible(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 10 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] bg-[#070A12] border border-amber-500/30 rounded-3xl shadow-[0_0_80px_rgba(245,158,11,0.25)] z-10 flex flex-col my-auto overflow-hidden ring-1 ring-white/10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-2.5 right-2.5 z-30 w-8 h-8 bg-black/60 hover:bg-black/90 rounded-full flex items-center justify-center text-amber-200/80 hover:text-amber-100 transition-colors border border-amber-500/30 cursor-pointer shadow-md"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {/* AREA TO CAPTURE: LUXURY ROYAL GREETING CARD */}
              <div
                ref={cardRef}
                className="relative w-full overflow-hidden flex flex-col justify-between text-center px-5 pt-6 pb-5 sm:px-6 sm:pt-7 sm:pb-6 select-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 20%, ${activeFestival.themeGradient.split(' ')[0].replace('from-', '')} 0%, #0a0d18 55%, #05070c 100%)`,
                }}
              >
                {/* Royal Corner Accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400/50 rounded-tl-sm pointer-events-none" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400/50 rounded-tr-sm pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400/50 rounded-bl-sm pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400/50 rounded-br-sm pointer-events-none" />

                {/* Header: Sacred Tag & Corporate Badge */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Sanskrit / Sacred Tag */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-[10px] sm:text-[11px] font-serif text-amber-200 tracking-wider mb-2.5 shadow-sm">
                    <Sparkles size={10} className="text-amber-400" />
                    <span>{activeFestival.sanskritTag}</span>
                    <Sparkles size={10} className="text-amber-400" />
                  </div>

                  {/* Clean Logo Badge - Seamless and elegant */}
                  <div className="inline-flex items-center gap-2 bg-white/95 px-3 py-1 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-amber-400/40">
                    <img
                      src="/logo.png"
                      alt="AMS Civil Construction"
                      className="h-5 sm:h-6 w-auto object-contain"
                    />
                    <span className="text-[10px] font-bold text-slate-800 tracking-wide font-sans border-l border-slate-300 pl-2">
                      AMS Construction
                    </span>
                  </div>
                </div>

                {/* Center: Handcrafted Royal Vector Art & Typography */}
                <div className="relative z-10 flex flex-col items-center my-3">
                  {/* Glowing Medallion with Vector Artwork */}
                  <div className="relative my-1">
                    <div
                      className="absolute -inset-3 rounded-full blur-xl animate-pulse pointer-events-none"
                      style={{ backgroundColor: activeFestival.ringGlow }}
                    />
                    <div className="relative flex items-center justify-center">
                      <FestivalArtwork type={activeFestival.artType} />
                    </div>
                  </div>

                  {/* Festival Main Heading */}
                  <h2 className="font-display font-bold text-xl sm:text-2xl tracking-wide bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-200 bg-clip-text text-transparent drop-shadow mt-2 mb-1.5">
                    {activeFestival.title}
                  </h2>

                  {/* High-End Architectural Blessing */}
                  <p className="text-stone-300 text-[11px] sm:text-xs leading-relaxed font-normal max-w-[270px] sm:max-w-[300px] mx-auto drop-shadow-sm font-sans">
                    {activeFestival.message}
                  </p>
                </div>

                {/* Footer: Corporate Legacy Signature */}
                <div className="relative z-10 pt-2.5 border-t border-amber-500/20 flex flex-col items-center">
                  <div className="flex items-center gap-2 text-amber-400/50 text-[9px] mb-0.5">
                    <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-amber-400/40" />
                    <span>◆</span>
                    <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-amber-400/40" />
                  </div>

                  <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-amber-200 font-display">
                    AMS CIVIL CONSTRUCTION
                  </p>
                  <p className="text-[8px] font-medium tracking-widest text-amber-400/70 uppercase">
                    25+ Years of Architectural & Civil Excellence
                  </p>
                  <p className="text-[8px] text-stone-400 font-mono tracking-widest mt-0.5">
                    WWW.AMSCIVILWORK.IN
                  </p>
                </div>
              </div>

              {/* INTERACTIVE ACTION BAR (Outside capture area) */}
              <div className="bg-[#0b0e17] px-4 py-3 sm:px-4 sm:py-3.5 border-t border-amber-500/20 flex flex-col gap-2">
                {/* Primary Button: Share Photo + Caption to WhatsApp */}
                <button
                  onClick={handleShareToWhatsApp}
                  disabled={isSharing}
                  className="w-full bg-gradient-to-r from-[#1eb854] to-[#25D366] hover:from-[#1ca34a] hover:to-[#22c35e] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-[0_4px_16px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)] transition-all cursor-pointer active:scale-[0.98] disabled:opacity-60"
                >
                  {isSharing ? (
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <MessageCircle size={17} className="fill-white text-[#25D366]" />
                  )}
                  <span>{isSharing ? 'Preparing Photo...' : 'Share Photo on WhatsApp'}</span>
                </button>

                {/* Secondary Actions: Save HD Poster & Copy Wish */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleDownloadPoster}
                    disabled={isSharing}
                    className="bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white font-medium py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 text-[11px] transition-colors border border-amber-500/20 hover:border-amber-500/40 disabled:opacity-50 cursor-pointer"
                  >
                    <Download size={13} className="text-amber-400" />
                    <span>Save Poster</span>
                  </button>

                  <button
                    onClick={handleCopyWish}
                    className="bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white font-medium py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 text-[11px] transition-colors border border-amber-500/20 hover:border-amber-500/40 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={13} className="text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} className="text-amber-400" />
                        <span>Copy Wish</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Festive Consultation CTA */}
                <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[10px] sm:text-[11px] text-stone-400 px-0.5">
                  <span className="flex items-center gap-1 text-stone-300">
                    <Award size={12} className="text-amber-400" />
                    <span>Planning Construction?</span>
                  </span>
                  <Link
                    href="/free-consultation"
                    onClick={() => setIsVisible(false)}
                    className="text-amber-300 hover:text-amber-200 font-semibold underline flex items-center gap-1"
                  >
                    <PhoneCall size={10} />
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
