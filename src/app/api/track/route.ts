// src/app/api/track/route.ts
// Extremely lightweight endpoint to record Call and WhatsApp click events into MongoDB
// Works with both fetch() and navigator.sendBeacon()
// Automatic TTL index ensures data is permanently purged after 30 days to avoid storage buildup.

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

const THIRTY_DAYS_IN_SECONDS = 30 * 24 * 60 * 60; // 30 days auto-expiry
let indexEnsured = false;

async function ensureTtlIndex(db: any) {
  if (indexEnsured) return;
  try {
    await db.collection('click_events').createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: THIRTY_DAYS_IN_SECONDS, background: true }
    );
    indexEnsured = true;
  } catch {
    indexEnsured = true;
  }
}

export async function POST(request: NextRequest) {
  try {
    let body: any;

    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json') || contentType.includes('text/plain')) {
      const text = await request.text();
      try {
        body = JSON.parse(text);
      } catch {
        return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
      }
    } else {
      body = await request.json();
    }

    const { type, label, target, page, device, referrer, metadata } = body || {};

    if (!type || !['whatsapp', 'call', 'quote', 'lead', 'custom', 'pageview'].includes(type)) {
      return NextResponse.json({ success: false, error: 'Invalid click type' }, { status: 400 });
    }

    const db = await getDb();
    
    // Ensure 30-day auto cleanup index is active
    await ensureTtlIndex(db);

    await db.collection('click_events').insertOne({
      type,
      label: label || 'general',
      target: target || '',
      page: page || '/',
      device: device || 'mobile',
      referrer: referrer || '',
      metadata: metadata || {},
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log click event:', error);
    return NextResponse.json({ success: false, error: 'Failed to record event' }, { status: 500 });
  }
}
