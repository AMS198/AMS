import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const from = `"AMS Civil Calculator" <${process.env.EMAIL_USER}>`;
const TO = process.env.EMAIL_TO || process.env.EMAIL_USER!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, propertyType, services, condition, estimateMin, estimateMax, websiteUrl } = body;

    // Honeypot check
    if (websiteUrl) {
      console.warn('🤖 Spam bot blocked by honeypot in /api/calculator-lead:', { name, phone, websiteUrl });
      return NextResponse.json({ success: true, message: 'Lead saved successfully' });
    }

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ success: false, error: 'Name and Phone are required.' }, { status: 400 });
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.trim())) {
      return NextResponse.json({ success: false, error: 'Invalid 10-digit phone number.' }, { status: 400 });
    }

    const db = await getDb();
    await db.collection('enquiries').insertOne({
      name: name.trim(),
      phone: phone.trim(),
      service: 'Calculator Estimate',
      details: { propertyType, services, condition, estimateMin, estimateMax },
      status: 'new',
      source: 'calculator',
      createdAt: new Date(),
    });

    const htmlBody = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #EA580C;">🔥 Hot Lead from Cost Calculator</h2>
        <p><strong>Name:</strong> ${name.trim()}</p>
        <p><strong>Phone:</strong> ${phone.trim()}</p>
        <hr/>
        <h3>Project Details</h3>
        <p><strong>Property Type:</strong> ${propertyType}</p>
        <p><strong>Services Needed:</strong> ${Array.isArray(services) ? services.join(', ') : (services || 'General Civil Work')}</p>
        <p><strong>Quality Finish:</strong> ${condition}</p>
        <p><strong>Shown Estimate:</strong> ${estimateMin} - ${estimateMax}</p>
        <br/>
        <a href="https://wa.me/91${phone.trim()}" style="padding: 10px 20px; background-color: #25D366; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Chat on WhatsApp</a>
      </div>
    `;

    try {
      await transporter.sendMail({
        from,
        to: TO,
        subject: `🔥 Calculator Lead: ${name} (${propertyType})`,
        html: htmlBody,
      });
    } catch (e) {
      console.error('Failed to send calculator lead email:', e);
    }

    return NextResponse.json({ success: true, message: 'Lead saved successfully' });
  } catch (error) {
    console.error('Calculator API error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
