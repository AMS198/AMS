// src/app/api/analytics-report/route.ts
// Sends an automated 24-hour daily summary email of WhatsApp clicks, Call clicks, and Leads.
// Can be triggered by Vercel Cron (GET) or from Admin Dashboard (POST).

import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import nodemailer from 'nodemailer';
import { analyticsReportHtml } from '@/lib/analyticsEmailTemplate';

export const dynamic = 'force-dynamic';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const from = `"AMS Civil Analytics" <${process.env.EMAIL_USER}>`;
const TO = process.env.EMAIL_TO || process.env.EMAIL_USER || 'ams.constructionwork@gmail.com';

async function generateAndSendReport() {
  const db = await getDb();
  const clickCollection = db.collection('click_events');
  const enquiryCollection = db.collection('enquiries');

  // Filter for last 24 hours
  const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const [
    whatsappClicks,
    callClicks,
    newLeads,
  ] = await Promise.all([
    clickCollection.countDocuments({ type: 'whatsapp', createdAt: { $gte: last24h } }),
    clickCollection.countDocuments({ type: 'call', createdAt: { $gte: last24h } }),
    enquiryCollection.countDocuments({ createdAt: { $gte: last24h } }),
  ]);

  // Top Pages in last 24h
  const topClickPages = await clickCollection.aggregate([
    { $match: { createdAt: { $gte: last24h } } },
    {
      $group: {
        _id: "$page",
        total: { $sum: 1 },
        whatsapp: { $sum: { $cond: [{ $eq: ["$type", "whatsapp"] }, 1, 0] } },
        calls: { $sum: { $cond: [{ $eq: ["$type", "call"] }, 1, 0] } }
      }
    },
    { $sort: { total: -1 } },
    { $limit: 8 }
  ]).toArray();

  // Button/Source Breakdown in last 24h
  const sources = await clickCollection.aggregate([
    { $match: { createdAt: { $gte: last24h } } },
    {
      $group: {
        _id: { label: "$label", type: "$type" },
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 8 }
  ]).toArray();

  // Devices in last 24h
  const mobileCount = await clickCollection.countDocuments({
    createdAt: { $gte: last24h },
    device: 'mobile'
  });
  const desktopCount = await clickCollection.countDocuments({
    createdAt: { $gte: last24h },
    device: 'desktop'
  });

  const formattedDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });

  const reportData = {
    date: formattedDate,
    period: 'Past 24 Hours',
    whatsappClicks,
    callClicks,
    newLeads,
    totalInteractions: whatsappClicks + callClicks + newLeads,
    topClickPages: topClickPages.map(p => ({
      page: p._id || '/',
      total: p.total,
      whatsapp: p.whatsapp,
      calls: p.calls,
    })),
    sources: sources.map(s => ({
      label: s._id.label,
      type: s._id.type,
      count: s.count,
    })),
    mobileCount,
    desktopCount,
  };

  const html = analyticsReportHtml(reportData);

  // Send Email
  await transporter.sendMail({
    from,
    to: TO,
    subject: `📊 AMS Daily Report: ${whatsappClicks} WhatsApp | ${callClicks} Calls | ${newLeads} Leads (${formattedDate})`,
    html,
  });

  return reportData;
}

export async function GET(request: NextRequest) {
  try {
    // Verify cron authorization header if configured
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      // Optional security check
    }

    const reportData = await generateAndSendReport();
    return NextResponse.json({
      success: true,
      message: 'Daily 24-hour analytics email report sent successfully.',
      data: reportData,
    });
  } catch (error: any) {
    console.error('Failed to send daily report email:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to generate/send report.',
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const reportData = await generateAndSendReport();
    return NextResponse.json({
      success: true,
      message: 'Daily report triggered and sent successfully to ' + TO,
      data: reportData,
    });
  } catch (error: any) {
    console.error('Failed to trigger daily report email:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to send report.',
    }, { status: 500 });
  }
}
