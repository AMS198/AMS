// src/app/api/contact/route.ts
// POST /api/contact — saves enquiry to MongoDB + sends professional emails.
//   1. Admin alert  → ams.constructionwork@gmail.com  (rich branded HTML)
//   2. Client reply → client's email if provided       (thank-you confirmation)

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

// eslint-disable-next-line @typescript-eslint/no-shadow
const from = `"AMS Civil Construction" <${process.env.EMAIL_USER}>`;
const TO   = process.env.EMAIL_TO || process.env.EMAIL_USER!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, service, message, websiteUrl } = body as {
      name: string; phone: string; email?: string; service: string; message: string; websiteUrl?: string;
    };

    // Honeypot check: If the hidden field is filled, it's a bot
    if (websiteUrl) {
      console.warn('🤖 Spam bot blocked by honeypot in /api/contact:', { name, phone, websiteUrl });
      return NextResponse.json({
        success: true,
        message: 'Your enquiry has been received. We will contact you within 24 hours.',
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

    // Email is optional — validate only if provided
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
      message:   message.trim(),
      status:    'new',
      source:    'contact-form',
      createdAt: new Date(),
    });
    console.log('📩 Contact enquiry saved:', name, phone);

    const enquiryData = {
      name:    name.trim(),
      phone:   phone.trim(),
      email:   email?.trim() || null,
      service: service.trim(),
      message: message.trim(),
      source:  'contact-form',
    };

    /* ── 1. Admin Alert Email ───────────────────────────────── */
    try {
      await transporter.sendMail({
        from,
        to:      TO,
        subject: `🏗️ New Enquiry — ${service} | ${name} | +91 ${phone.trim()}`,
        html:    adminAlertHtml(enquiryData),
      });
      console.log('✅ Admin alert sent to:', TO);
    } catch (e: unknown) {
      const err = e as { message?: string; code?: string; response?: string };
      console.error('❌ Admin alert FAILED:');
      console.error('   Code   :', err.code);
      console.error('   Message:', err.message);
      console.error('   SMTP   :', err.response);
    }

    /* ── 2. Client Auto-Reply (only if email provided) ──────── */
    if (email?.trim()) {
      try {
        await transporter.sendMail({
          from,
          to:       email.trim(),
          replyTo:  TO,
          subject:  `✅ We've Received Your Enquiry — AMS Civil Construction`,
          html:     clientAutoReplyHtml(enquiryData),
        });
        console.log('✅ Client auto-reply sent to:', email.trim());
      } catch (e) {
        console.warn('⚠️  Client auto-reply failed:', e);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your enquiry has been received. We will contact you within 24 hours.',
    });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error. Please try again.' },
      { status: 500 },
    );
  }
}
