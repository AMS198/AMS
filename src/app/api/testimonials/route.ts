export const dynamic = 'force-dynamic';
// src/app/api/testimonials/route.ts
// GET  /api/testimonials  — fetch all testimonials (public)
// POST /api/testimonials  — save a new testimonial (admin only)

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { requireAuth, sanitizeInput } from '@/lib/auth';

const COLLECTION = 'testimonials';

export async function GET() {
  try {
    const db = await getDb();
    const docs = await db.collection(COLLECTION).find({}).sort({ createdAt: -1 }).toArray();

    const testimonials = docs.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }));

    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error('GET /api/testimonials error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch testimonials.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { name, location, rating, text, service } = body;

    if (!name || !text || !rating) {
      return NextResponse.json({ success: false, error: 'Name, rating, and text are required.' }, { status: 400 });
    }

    // Validate rating
    const numRating = Number(rating);
    if (numRating < 1 || numRating > 5) {
      return NextResponse.json({ success: false, error: 'Rating must be between 1 and 5.' }, { status: 400 });
    }

    const safeName = sanitizeInput(name).trim();
    const initials = safeName
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const db = await getDb();
    const newItem = {
      name: safeName,
      location: sanitizeInput(location)?.trim() || 'Mumbai',
      rating: numRating,
      text: sanitizeInput(text).trim(),
      service: sanitizeInput(service)?.trim() || 'General Service',
      avatar: initials,
      createdAt: new Date(),
    };

    const result = await db.collection(COLLECTION).insertOne(newItem);

    return NextResponse.json({ success: true, 
      data: { id: result.insertedId.toString(), ...newItem } 
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/testimonials error:', error);
    return NextResponse.json({ success: false, error: 'Failed to save testimonial.' }, { status: 500 });
  }
}
