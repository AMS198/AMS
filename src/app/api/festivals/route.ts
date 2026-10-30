// src/app/api/festivals/route.ts
// GET  /api/festivals — fetch all campaigns for admin or active campaign for frontend
// POST /api/festivals — create new festival campaign (admin only)

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getDb } from '@/lib/mongodb';
import { requireAuth, sanitizeInput } from '@/lib/auth';

const COLLECTION = 'festivals';

export const dynamic = 'force-dynamic';

/* ── Initial Seed Data (Diwali & Chhath Puja Offer) ────── */
const DEFAULT_CAMPAIGN = {
  title: 'Happy Diwali & Happy Chhath Puja',
  sanskritTag: '॥ शुभ दीपावली एवं महापर्व छठ पूजा महोत्सव ॥',
  message: 'AMS Civil Construction brings Special FREE QUOTATION OFFER for your home construction, renovation & interior needs this festive season!',
  posterImage: '/diwali-chhath-offer.jpg',
  startDate: '2026-10-24',
  endDate: '2026-11-18',
  ctaText: 'Claim Free Quotation & Site Visit',
  ctaLink: '/free-consultation',
  whatsappMessage: '🪔 Happy Diwali & Happy Chhath Puja! ✨\n\nAMS Civil Construction is offering a Special FREE QUOTATION for Bungalow Construction, Home Renovation, Modular Kitchen, Bathroom Remodeling & Civil Work!\n\n📞 Call/WhatsApp: +91 87793 91690 / +91 90042 98911\n🌐 Website: https://www.amscivilwork.in/free-consultation',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

/* ── GET ────────────────────────────────────────────────── */
export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const count = await db.collection(COLLECTION).countDocuments();

    // Auto-seed initial campaign if collection is empty
    if (count === 0) {
      await db.collection(COLLECTION).insertOne(DEFAULT_CAMPAIGN);
    }

    const { searchParams } = new URL(request.url);
    const isPublic = searchParams.get('public') === 'true';

    const docs = await db.collection(COLLECTION).find({}).sort({ createdAt: -1 }).toArray();
    const campaigns = docs.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }));

    if (isPublic) {
      // Find currently active campaign: isActive === true AND today within startDate - endDate
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const todayStr = `${yyyy}-${mm}-${dd}`;

      const activeCampaign = campaigns.find((c: any) => {
        if (!c.isActive) return false;
        if (!c.startDate || !c.endDate) return false;
        return todayStr >= c.startDate && todayStr <= c.endDate;
      }) || null;

      return NextResponse.json(
        {
          success: true,
          activeCampaign,
        },
        {
          headers: {
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
          },
        }
      );
    }

    // Admin view: return all campaigns
    return NextResponse.json({ success: true, data: campaigns });
  } catch (error) {
    console.error('GET /api/festivals error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch festivals.' }, { status: 500 });
  }
}

/* ── POST (Admin Only) ──────────────────────────────────── */
export async function POST(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const {
      title,
      sanskritTag,
      message,
      posterImage,
      startDate,
      endDate,
      ctaText,
      ctaLink,
      whatsappMessage,
      isActive,
    } = body;

    if (!title?.trim() || !posterImage?.trim() || !startDate?.trim() || !endDate?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Title, Poster Image, Start Date, and End Date are required.' },
        { status: 400 }
      );
    }

    if (startDate > endDate) {
      return NextResponse.json(
        { success: false, error: 'Start Date cannot be after End Date.' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const newCampaign = {
      title: sanitizeInput(title).trim(),
      sanskritTag: sanitizeInput(sanskritTag || '').trim(),
      message: sanitizeInput(message || '').trim(),
      posterImage: posterImage.trim(),
      startDate: startDate.trim(),
      endDate: endDate.trim(),
      ctaText: sanitizeInput(ctaText || 'Claim Free Quotation & Site Visit').trim(),
      ctaLink: sanitizeInput(ctaLink || '/free-consultation').trim(),
      whatsappMessage: sanitizeInput(whatsappMessage || '').trim(),
      isActive: isActive !== false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection(COLLECTION).insertOne(newCampaign);

    try { revalidatePath('/api/festivals'); } catch {}

    return NextResponse.json(
      {
        success: true,
        data: { id: result.insertedId.toString(), ...newCampaign },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/festivals error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create festival campaign.' }, { status: 500 });
  }
}
