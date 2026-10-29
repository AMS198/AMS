// src/app/api/festivals/[id]/route.ts
// PUT    /api/festivals/[id] — update campaign (admin only)
// DELETE /api/festivals/[id] — delete campaign (admin only)

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { requireAuth, sanitizeInput } from '@/lib/auth';

const COLLECTION = 'festivals';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Valid ID is required.' }, { status: 400 });
    }

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

    if (startDate && endDate && startDate > endDate) {
      return NextResponse.json(
        { success: false, error: 'Start Date cannot be after End Date.' },
        { status: 400 }
      );
    }

    const updateData: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (title !== undefined) updateData.title = sanitizeInput(title).trim();
    if (sanskritTag !== undefined) updateData.sanskritTag = sanitizeInput(sanskritTag).trim();
    if (message !== undefined) updateData.message = sanitizeInput(message).trim();
    if (posterImage !== undefined) updateData.posterImage = posterImage.trim();
    if (startDate !== undefined) updateData.startDate = startDate.trim();
    if (endDate !== undefined) updateData.endDate = endDate.trim();
    if (ctaText !== undefined) updateData.ctaText = sanitizeInput(ctaText).trim();
    if (ctaLink !== undefined) updateData.ctaLink = sanitizeInput(ctaLink).trim();
    if (whatsappMessage !== undefined) updateData.whatsappMessage = sanitizeInput(whatsappMessage).trim();
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);

    const db = await getDb();
    const result = await db.collection(COLLECTION).updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'Festival campaign not found.' }, { status: 404 });
    }

    try { revalidatePath('/api/festivals'); } catch {}

    return NextResponse.json({ success: true, message: 'Campaign updated successfully.' });
  } catch (error) {
    console.error('PUT /api/festivals/[id] error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update campaign.' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Valid ID is required.' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Festival campaign not found.' }, { status: 404 });
    }

    try { revalidatePath('/api/festivals'); } catch {}

    return NextResponse.json({ success: true, message: 'Campaign deleted successfully.' });
  } catch (error) {
    console.error('DELETE /api/festivals/[id] error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete campaign.' }, { status: 500 });
  }
}
