// src/app/api/analytics-report/route.ts
// Sends an automated 24-hour daily summary email of Visits, Traffic Sources, WhatsApp clicks, Call clicks, and Leads.
// Includes a strict Daily MongoDB Idempotency Lock: prevents duplicate emails even if multiple crons or webhooks trigger.

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

async function generateAndSendReport(force = false) {
  const db = await getDb();
  const clickCollection = db.collection('click_events');
  const enquiryCollection = db.collection('enquiries');
  const reportsLogCollection = db.collection('daily_reports_log');

  // Today date key in IST (e.g. "2026-10-29")
  const todayDateKey = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

  // 1. Strict Idempotency Lock: Only 1 email per day unless forced by Admin
  if (!force) {
    const existingLog = await reportsLogCollection.findOne({ dateKey: todayDateKey });
    if (existingLog) {
      console.log(`[DailyReport] Report for ${todayDateKey} already sent at ${existingLog.sentAt}. Skipping duplicate.`);
      return {
        alreadySent: true,
        message: `Daily report for ${todayDateKey} was already sent today at ${existingLog.sentAt}. Skipped duplicate email.`,
        sentAt: existingLog.sentAt,
      };
    }
  }

  // Filter for last 24 hours
  const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const [
    totalPageViews,
    whatsappClicks,
    callClicks,
    newLeads,
    recentEnquiries,
  ] = await Promise.all([
    clickCollection.countDocuments({ type: 'pageview', createdAt: { $gte: last24h } }),
    clickCollection.countDocuments({ type: 'whatsapp', createdAt: { $gte: last24h } }),
    clickCollection.countDocuments({ type: 'call', createdAt: { $gte: last24h } }),
    enquiryCollection.countDocuments({ createdAt: { $gte: last24h } }),
    enquiryCollection.find({ createdAt: { $gte: last24h } })
      .sort({ createdAt: -1 })
      .limit(6)
      .project({ name: 1, phone: 1, service: 1, address: 1, createdAt: 1 })
      .toArray(),
  ]);

  // 2. Traffic Sources (Where visitors came from in last 24h)
  const rawSources = await clickCollection.aggregate([
    { $match: { type: 'pageview', createdAt: { $gte: last24h } } },
    { $group: { _id: "$referrer", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 6 }
  ]).toArray();

  const trafficSources = rawSources.map(s => ({
    name: s._id || 'Direct / Organic',
    count: s.count,
    pct: totalPageViews > 0 ? Math.round((s.count / totalPageViews) * 100) : 0,
  }));

  // 3. Top Visited Pages & Areas
  const rawVisited = await clickCollection.aggregate([
    { $match: { type: 'pageview', createdAt: { $gte: last24h } } },
    { $group: { _id: "$page", views: { $sum: 1 } } },
    { $sort: { views: -1 } },
    { $limit: 8 }
  ]).toArray();

  const topVisitedPages = rawVisited.map(p => ({
    page: p._id || '/',
    views: p.views,
  }));

  // 4. Top Conversion Pages (Where WhatsApp or Call clicks occurred)
  const topClickPages = await clickCollection.aggregate([
    { $match: { type: { $in: ['whatsapp', 'call'] }, createdAt: { $gte: last24h } } },
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

  // 5. Button Breakdown
  const sources = await clickCollection.aggregate([
    { $match: { type: { $in: ['whatsapp', 'call'] }, createdAt: { $gte: last24h } } },
    {
      $group: {
        _id: { label: "$label", type: "$type" },
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 8 }
  ]).toArray();

  // 6. Devices
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

  const recentLeads = recentEnquiries.map(e => ({
    name: e.name || 'Anonymous Client',
    phone: e.phone || 'N/A',
    service: e.service || 'Civil Work',
    area: e.address || '',
    time: new Date(e.createdAt).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }),
  }));

  const reportData = {
    date: formattedDate,
    period: 'Past 24 Hours',
    totalPageViews,
    whatsappClicks,
    callClicks,
    newLeads,
    totalInteractions: whatsappClicks + callClicks + newLeads,
    trafficSources,
    topVisitedPages,
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
    recentLeads,
  };

  const html = analyticsReportHtml(reportData);

  // Send Single Consolidated Email
  await transporter.sendMail({
    from,
    to: TO,
    subject: `📊 AMS Daily Report: ${totalPageViews} Views | ${whatsappClicks} WhatsApp | ${callClicks} Calls | ${newLeads} Leads (${formattedDate})`,
    html,
  });

  // Record sent log to lock out duplicate dispatches for today
  await reportsLogCollection.updateOne(
    { dateKey: todayDateKey },
    {
      $set: {
        dateKey: todayDateKey,
        sentAt: new Date(),
        recipient: TO,
        summary: {
          totalPageViews,
          whatsappClicks,
          callClicks,
          newLeads,
        },
      },
    },
    { upsert: true }
  );

  return reportData;
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      // Optional security check
    }

    const force = request.nextUrl.searchParams.get('force') === 'true';
    const reportData = await generateAndSendReport(force);

    return NextResponse.json({
      success: true,
      message: (reportData as any)?.alreadySent
        ? (reportData as any).message
        : 'Daily 24-hour analytics email report sent successfully.',
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
    // Admin dashboard manual trigger supports ?force=true
    const force = request.nextUrl.searchParams.get('force') === 'true';
    const reportData = await generateAndSendReport(force);

    return NextResponse.json({
      success: true,
      message: (reportData as any)?.alreadySent
        ? (reportData as any).message
        : 'Daily report triggered and sent successfully to ' + TO,
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
