// src/app/api/quote/route.ts
// POST /api/quote — saves quote request to MongoDB + sends professional emails.
//   1. Admin alert  → ams.constructionwork@gmail.com  (rich branded HTML)
//   2. Client reply → client's email if provided       (thank-you confirmation)

import { NextRequest, NextResponse } from 'next/server';
import { getDb }                     from '@/lib/mongodb';
import nodemailer                    from 'nodemailer';
import { adminAlertHtml, clientAutoReplyHtml } from '@/lib/emailTemplates';
import { syncLeadToGoogleSheet }      from '@/lib/googleSheetLead';

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

// eslint-disable-next-line @typescript-eslint/no-shadow
const from = `"AMS Civil Construction" <${process.env.EMAIL_USER}>`;
const TO   = process.env.EMAIL_TO || process.env.EMAIL_USER!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, service, message, address, websiteUrl } = body as {
      name: string; phone: string; email?: string; service: string; message?: string; address?: string; websiteUrl?: string;
    };

    // Honeypot check: If the hidden field is filled, it's a bot
    if (websiteUrl) {
      console.warn('🤖 Spam bot blocked by honeypot in /api/quote:', { name, phone, websiteUrl });
      return NextResponse.json({
        success: true,
        message: 'Quote request received. We will call you within 24 hours.',
      });
    }

    /* ── Validation: Name, Phone, and Service are primary ── */
    if (!name?.trim() || !phone?.trim() || !service?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name, phone number, and service are required.' },
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

    // Email is optional — validate only if user provided one
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
      name:      name.trim(),
      phone:     phone.trim(),
      email:     email?.trim() || null,
      service:   service.trim(),
      address:   address?.trim() || null,
      message:   message?.trim() || '',
      status:    'new',
      source:    'quote-popup',
      createdAt: new Date(),
    });
    console.log('📋 Quote request saved:', name, phone);

    const enquiryData = {
      name:    name.trim(),
      phone:   phone.trim(),
      email:   email?.trim() || null,
      service: service.trim(),
      address: address?.trim() || null,
      message: message?.trim() || null,
      source:  'quote-popup',
    };

    /* ── Real-Time Google Sheet Sync ────────────────────────── */
    syncLeadToGoogleSheet({
      name:    name.trim(),
      phone:   cleanPhone,
      email:   email?.trim() || '',
      service: service.trim(),
      address: address?.trim() || '',
      source:  'Free Quote / Consultation',
      notes:   message?.trim() || '',
    }).catch(() => {});

    /* ── 1. Admin Alert Email ───────────────────────────────── */
    try {
      await transporter.sendMail({
        from,
        to:      TO,
        subject: `🏗️ Free Quote Request — ${service} | ${name} | +91 ${phone.trim()}`,
        html:    adminAlertHtml(enquiryData),
      });
      console.log('✅ Admin alert sent (quote)');
    } catch (e) {
      console.warn('⚠️  Admin alert failed (quote):', e);
    }

    /* ── 2. Client Auto-Reply (only if email provided) ──────── */
    if (email?.trim()) {
      try {
        await transporter.sendMail({
          from,
          to:      email.trim(),
          replyTo: TO,
          subject: `✅ Your Free Quote Request — AMS Civil Construction`,
          html:    clientAutoReplyHtml(enquiryData),
        });
        console.log('✅ Client auto-reply sent to:', email.trim());
      } catch (e) {
        console.warn('⚠️  Client auto-reply failed (quote):', e);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Quote request received. We will call you within 24 hours.',
    });

  } catch (error) {
    console.error('Quote API error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error.' },
      { status: 500 },
    );
  }
}
