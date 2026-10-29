// src/app/api/leads/route.ts
// POST /api/leads — saves scroll-triggered lead to MongoDB + sends professional emails.

import { NextRequest, NextResponse } from 'next/server';
import { getDb }                     from '@/lib/mongodb';
import nodemailer                    from 'nodemailer';
import { adminAlertHtml, clientAutoReplyHtml } from '@/lib/emailTemplates';

/* ── Shared transporter ─────────────────────────────────────── */
const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST || 'smtp.gmail.com',
  port:   Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const from = `"AMS Civil Construction" <${process.env.EMAIL_USER}>`;
const TO   = process.env.EMAIL_TO || process.env.EMAIL_USER!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, service, location, websiteUrl } = body as {
      name: string; phone: string; email: string; service: string; location: string; websiteUrl?: string;
    };

    // Honeypot check
    if (websiteUrl) {
      console.warn('🤖 Spam bot blocked by honeypot in /api/leads:', { name, phone, websiteUrl });
      return NextResponse.json({
        success: true,
        message: 'Thank you! We will contact you shortly.',
      });
    }

    /* ── Validation ─────────────────────────────────────────── */
    if (!phone?.trim() || !service?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Phone number and service are required.' },
        { status: 400 },
      );
    }

    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: 'Enter a valid 10-digit mobile number.' },
        { status: 400 },
      );
    }

    // Email is optional — validate format only if provided
    if (email?.trim()) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(email.trim())) {
        return NextResponse.json(
          { success: false, error: 'Invalid email address.' },
          { status: 400 },
        );
      }
    }

    /* ── Save to MongoDB ────────────────────────────────────── */
    const db = await getDb();
    await db.collection('enquiries').insertOne({
      name:      name?.trim() || 'Valued Client',
      phone:     phone.trim(),
      email:     email.trim(),
      service:   service.trim(),
      location:  location.trim(),
      status:    'new',
      source:    'scroll-lead',
      createdAt: new Date(),
    });

    const enquiryData = {
      name:     name?.trim() || 'Valued Client',
      phone:    phone.trim(),
      email:    email.trim(),
      service:  service.trim(),
      location: location.trim(),
      source:   'scroll-lead',
    };

    /* ── 1. Admin Alert Email ───────────────────────────────── */
    try {
      await transporter.sendMail({
        from,
        to:      TO,
        subject: `✨ New Scroll Lead — ${service} | ${location} | +91 ${phone.trim()}`,
        html:    adminAlertHtml(enquiryData),
      });
    } catch (e) {
      console.warn('⚠️ Admin alert failed (scroll-lead):', e);
    }

    /* ── 2. Client Auto-Reply ───────────────────────────────── */
    try {
      await transporter.sendMail({
        from,
        to:      email.trim(),
        replyTo: TO,
        subject: `✅ We've Received Your Interest — AMS Civil Construction`,
        html:    clientAutoReplyHtml(enquiryData),
      });
    } catch (e) {
      console.warn('⚠️ Client auto-reply failed (scroll-lead):', e);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! We will contact you shortly.',
    });

  } catch (error) {
    console.error('Leads API error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error.' },
      { status: 500 },
    );
  }
}
