import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDb();
    const pageCollection = db.collection('page_views');
    const clickCollection = db.collection('click_events');
    const enquiryCollection = db.collection('enquiries');

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // ── 1. Page Views (Legacy / Optional) ────────────
    const totalViews = await pageCollection.countDocuments();
    const todayViews = await pageCollection.countDocuments({
      timestamp: { $gte: todayStart }
    });

    const topPages = await pageCollection.aggregate([
      { $group: { _id: "$page", views: { $sum: 1 }, service: { $first: "$service" } } },
      { $sort: { views: -1 } },
      { $limit: 10 }
    ]).toArray();

    const topCities = await pageCollection.aggregate([
      { $match: { city: { $ne: null } } },
      { $group: { _id: "$city", views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 5 }
    ]).toArray();

    const topAreas = await pageCollection.aggregate([
      { $match: { area: { $ne: null } } },
      { $group: { _id: "$area", views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 10 }
    ]).toArray();

    // ── 2. Click Events (WhatsApp & Call Tracking) ───
    const [
      totalWhatsApp,
      todayWhatsApp,
      totalCalls,
      todayCalls,
      totalEnquiries,
      todayEnquiries,
    ] = await Promise.all([
      clickCollection.countDocuments({ type: 'whatsapp' }),
      clickCollection.countDocuments({ type: 'whatsapp', createdAt: { $gte: todayStart } }),
      clickCollection.countDocuments({ type: 'call' }),
      clickCollection.countDocuments({ type: 'call', createdAt: { $gte: todayStart } }),
      enquiryCollection.countDocuments({}),
      enquiryCollection.countDocuments({ createdAt: { $gte: todayStart } }),
    ]);

    // Top Pages Generating Clicks
    const topClickPages = await clickCollection.aggregate([
      { $group: { 
          _id: "$page", 
          total: { $sum: 1 },
          whatsapp: { $sum: { $cond: [{ $eq: ["$type", "whatsapp"] }, 1, 0] } },
          calls: { $sum: { $cond: [{ $eq: ["$type", "call"] }, 1, 0] } }
        } 
      },
      { $sort: { total: -1 } },
      { $limit: 10 }
    ]).toArray();

    // Breakdown by Button / Location
    const clickSources = await clickCollection.aggregate([
      { $group: {
          _id: { label: "$label", type: "$type" },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]).toArray();

    // Device breakdown for clicks
    const clickDevices = await clickCollection.aggregate([
      { $group: { _id: "$device", count: { $sum: 1 } } }
    ]).toArray();

    // Recent 20 click events log
    const recentClicks = await clickCollection.find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();

    return NextResponse.json({
      success: true,
      data: {
        totalViews,
        todayViews,
        topPages: topPages.map(p => ({ url: p._id, views: p.views, service: p.service })),
        topAreas: topAreas.map(a => ({ area: a._id, views: a.views })),
        topCities: topCities.map(c => ({ city: c._id, views: c.views })),
        
        // High-intent conversion metrics
        clicks: {
          whatsapp: {
            today: todayWhatsApp,
            total: totalWhatsApp,
          },
          calls: {
            today: todayCalls,
            total: totalCalls,
          },
          enquiries: {
            today: todayEnquiries,
            total: totalEnquiries,
          },
          topPages: topClickPages.map(p => ({
            page: p._id || '/',
            total: p.total,
            whatsapp: p.whatsapp,
            calls: p.calls,
          })),
          sources: clickSources.map(s => ({
            label: s._id.label,
            type: s._id.type,
            count: s.count,
          })),
          devices: clickDevices.map(d => ({
            device: d._id || 'unknown',
            count: d.count,
          })),
          recent: recentClicks.map(r => ({
            id: r._id.toString(),
            type: r.type,
            label: r.label,
            target: r.target,
            page: r.page,
            device: r.device,
            createdAt: r.createdAt,
          })),
        }
      }
    });

  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
