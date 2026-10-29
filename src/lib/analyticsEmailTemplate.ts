// src/lib/analyticsEmailTemplate.ts
// Branded HTML email template for 24-Hour Daily Lead, Traffic & Conversion Analytics Report

export interface DailyReportData {
  date: string;
  period: string; // e.g. "Past 24 Hours"
  totalPageViews: number;
  whatsappClicks: number;
  callClicks: number;
  newLeads: number;
  totalInteractions: number;
  trafficSources: { name: string; count: number; pct: number }[];
  topVisitedPages: { page: string; views: number }[];
  topClickPages: { page: string; total: number; whatsapp: number; calls: number }[];
  sources: { label: string; type: string; count: number }[];
  mobileCount: number;
  desktopCount: number;
  recentLeads?: { name: string; phone: string; service: string; area?: string; time: string }[];
}

const C = {
  bg:        '#0B1120',
  card:      '#111827',
  cardLight: '#1E2D45',
  border:    '#1F293D',
  orange:    '#F97316',
  orangeDk:  '#EA580C',
  green:     '#25D366',
  greenDk:   '#128C7E',
  blue:      '#38BDF8',
  purple:    '#A855F7',
  white:     '#FFFFFF',
  textMuted: '#94A3B8',
};

export function analyticsReportHtml(data: DailyReportData): string {
  const {
    date,
    period,
    totalPageViews = 0,
    whatsappClicks = 0,
    callClicks = 0,
    newLeads = 0,
    totalInteractions = 0,
    trafficSources = [],
    topVisitedPages = [],
    topClickPages = [],
    sources = [],
    mobileCount = 0,
    desktopCount = 0,
    recentLeads = [],
  } = data;

  const totalDevices = mobileCount + desktopCount;
  const mobilePct = totalDevices > 0 ? Math.round((mobileCount / totalDevices) * 100) : 0;
  const desktopPct = 100 - mobilePct;

  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>AMS Daily Performance & Traffic Report</title>
  <style>
    body { margin:0; padding:0; background-color:#070B14; font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#CBD5E1; }
    .wrapper { max-width:640px; margin:20px auto; background-color:${C.card}; border-radius:18px; overflow:hidden; border:1px solid ${C.border}; box-shadow:0 25px 50px -12px rgba(0,0,0,0.5); }
    .hero-banner { background:linear-gradient(135deg, #EA580C 0%, #C2410C 50%, #1E2D45 100%); padding:28px 24px; text-align:center; color:#fff; }
    .metric-grid { display:table; width:100%; border-collapse:collapse; background:${C.bg}; }
    .metric-cell { display:table-cell; width:25%; padding:18px 8px; text-align:center; border-right:1px solid ${C.border}; }
    .metric-cell:last-child { border-right:none; }
    .metric-val { font-size:28px; font-weight:900; line-height:1.1; }
    .metric-lbl { font-size:10px; text-transform:uppercase; letter-spacing:0.8px; color:${C.textMuted}; font-weight:700; margin-top:6px; }
    .section { padding:22px 24px; border-bottom:1px solid ${C.border}; }
    .section-title { font-size:14px; font-weight:800; color:#fff; margin:0 0 14px; text-transform:uppercase; letter-spacing:0.5px; }
    table.data-table { width:100%; border-collapse:collapse; font-size:13px; }
    table.data-table th { text-align:left; padding:8px 8px; color:${C.textMuted}; font-size:11px; text-transform:uppercase; border-bottom:1px solid ${C.border}; }
    table.data-table td { padding:9px 8px; border-bottom:1px solid rgba(255,255,255,0.05); color:#E2E8F0; }
    .badge { display:inline-block; padding:2px 8px; border-radius:12px; font-size:11px; font-weight:700; }
    .badge-wa { background:rgba(37,211,102,0.15); color:#25D366; }
    .badge-call { background:rgba(249,115,22,0.15); color:#F97316; }
    .badge-source { background:rgba(56,189,248,0.15); color:#38BDF8; }
    .progress-bar { background:rgba(255,255,255,0.08); height:6px; border-radius:3px; overflow:hidden; margin-top:4px; }
    .progress-fill { background:${C.blue}; height:100%; border-radius:3px; }
    .footer { background:${C.bg}; padding:20px; text-align:center; font-size:11px; color:${C.textMuted}; }
  </style>
</head>
<body>
  <div class="wrapper">
    <!-- Header -->
    <div class="hero-banner">
      <div style="font-size:11px; font-weight:800; letter-spacing:3px; text-transform:uppercase; opacity:0.9;">AMS Civil Construction</div>
      <h1 style="margin:8px 0 4px; font-size:22px; font-weight:900;">📊 24-Hour Traffic & Activity Report</h1>
      <p style="margin:0; font-size:13px; opacity:0.85;">📅 ${date} • ${period}</p>
    </div>

    <!-- Core 4 KPI Highlights -->
    <div class="metric-grid">
      <div class="metric-cell">
        <div class="metric-val" style="color:${C.blue};">${totalPageViews}</div>
        <div class="metric-lbl">👥 Website Visits</div>
      </div>
      <div class="metric-cell">
        <div class="metric-val" style="color:${C.green};">${whatsappClicks}</div>
        <div class="metric-lbl">💬 WhatsApp</div>
      </div>
      <div class="metric-cell">
        <div class="metric-val" style="color:${C.orange};">${callClicks}</div>
        <div class="metric-lbl">📞 Calls</div>
      </div>
      <div class="metric-cell">
        <div class="metric-val" style="color:${C.purple};">${newLeads}</div>
        <div class="metric-lbl">📩 Form Leads</div>
      </div>
    </div>

    <!-- Traffic Sources (Where visitors came from) -->
    <div class="section">
      <h3 class="section-title">🌐 Traffic Sources (Visitors Kahan Se Aaye)</h3>
      ${trafficSources && trafficSources.length > 0 ? `
      <table class="data-table">
        <thead>
          <tr>
            <th>Source / Platform</th>
            <th style="text-align:right;">Visits</th>
            <th style="text-align:right; width:70px;">Share</th>
          </tr>
        </thead>
        <tbody>
          ${trafficSources.map(s => `
            <tr>
              <td style="font-weight:600; color:#fff;">
                <span class="badge badge-source" style="margin-right:6px;">${s.name}</span>
                <div class="progress-bar">
                  <div class="progress-fill" style="width:${s.pct}%;"></div>
                </div>
              </td>
              <td style="text-align:right; font-weight:800; color:#E2E8F0;">${s.count}</td>
              <td style="text-align:right; color:${C.textMuted}; font-size:11px;">${s.pct}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>` : `
        <p style="color:${C.textMuted}; font-size:13px; margin:0;">Zero bot-filtered visits recorded in this 24h window.</p>
      `}
    </div>

    <!-- Top Visited Pages / Areas -->
    <div class="section">
      <h3 class="section-title">📍 Top Visited Pages & Areas</h3>
      ${topVisitedPages && topVisitedPages.length > 0 ? `
      <table class="data-table">
        <thead>
          <tr>
            <th>Page / Location</th>
            <th style="text-align:right;">Views</th>
          </tr>
        </thead>
        <tbody>
          ${topVisitedPages.map((p, i) => `
            <tr>
              <td style="font-weight:600;">
                <span style="color:${C.orange}; margin-right:6px;">#${i + 1}</span>
                <span style="color:#fff;">${p.page === '/' ? 'Home Page (/)' : p.page}</span>
              </td>
              <td style="text-align:right; font-weight:800; color:${C.blue};">${p.views}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>` : `
        <p style="color:${C.textMuted}; font-size:13px; margin:0;">No pageview logs available for this period.</p>
      `}
    </div>

    <!-- Recent Form Leads (if any) -->
    ${recentLeads && recentLeads.length > 0 ? `
    <div class="section" style="background:rgba(168,85,247,0.06);">
      <h3 class="section-title" style="color:#D8B4FE;">📩 New Leads Received (Past 24 Hours)</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Phone</th>
            <th>Service / Area</th>
            <th style="text-align:right;">Time</th>
          </tr>
        </thead>
        <tbody>
          ${recentLeads.map(l => `
            <tr>
              <td style="font-weight:700; color:#fff;">${l.name}</td>
              <td><a href="tel:${l.phone}" style="color:${C.green}; text-decoration:none; font-weight:700;">${l.phone}</a></td>
              <td style="color:#E2E8F0; font-size:12px;">${l.service}${l.area ? ' (' + l.area + ')' : ''}</td>
              <td style="text-align:right; color:${C.textMuted}; font-size:11px;">${l.time}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>` : ''}

    <!-- Top Conversion Pages -->
    <div class="section">
      <h3 class="section-title">🔥 Where Clients Reached Out (WhatsApp & Calls)</h3>
      ${topClickPages && topClickPages.length > 0 ? `
      <table class="data-table">
        <thead>
          <tr>
            <th>Page</th>
            <th style="text-align:center;">WhatsApp</th>
            <th style="text-align:center;">Calls</th>
            <th style="text-align:right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${topClickPages.map((p, i) => `
            <tr>
              <td style="font-weight:600;">
                <span style="color:${C.orange}; margin-right:6px;">#${i + 1}</span>
                <span style="color:#fff;">${p.page === '/' ? 'Home Page (/)' : p.page}</span>
              </td>
              <td style="text-align:center;"><span class="badge badge-wa">${p.whatsapp}</span></td>
              <td style="text-align:center;"><span class="badge badge-call">${p.calls}</span></td>
              <td style="text-align:right; font-weight:800; color:#fff;">${p.total}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>` : `
        <p style="color:${C.textMuted}; font-size:13px; margin:0;">No click events in this 24-hour cycle.</p>
      `}
    </div>

    <!-- Device Breakdown -->
    <div class="section">
      <h3 class="section-title">📱 Device Breakdown</h3>
      <div style="display:table; width:100%;">
        <div style="display:table-cell; width:50%; padding-right:8px;">
          <div style="background:${C.cardLight}; border-radius:12px; padding:12px; text-align:center; border:1px solid ${C.border};">
            <div style="font-size:18px;">📱 Mobile</div>
            <div style="color:#fff; font-size:20px; font-weight:900; margin-top:4px;">${mobilePct}%</div>
            <div style="color:${C.textMuted}; font-size:11px;">${mobileCount} actions</div>
          </div>
        </div>
        <div style="display:table-cell; width:50%; padding-left:8px;">
          <div style="background:${C.cardLight}; border-radius:12px; padding:12px; text-align:center; border:1px solid ${C.border};">
            <div style="font-size:18px;">💻 Desktop</div>
            <div style="color:#fff; font-size:20px; font-weight:900; margin-top:4px;">${desktopPct}%</div>
            <div style="color:${C.textMuted}; font-size:11px;">${desktopCount} actions</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Link to Admin -->
    <div style="padding:20px 24px; text-align:center; background:${C.bg};">
      <a href="https://www.amscivilwork.in/admin" style="display:inline-block; background:linear-gradient(135deg, ${C.orange}, ${C.orangeDk}); color:#fff; text-decoration:none; padding:12px 28px; border-radius:10px; font-weight:800; font-size:13px; letter-spacing:0.5px;">
        Open Admin CRM Dashboard →
      </a>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p style="margin:0 0 6px; font-weight:700; color:#fff;">AMS Civil Construction Mumbai</p>
      <p style="margin:0; opacity:0.6;">Automated Daily Report • 1 Single Consolidated Digest • Zero ISR Load</p>
    </div>
  </div>
</body>
</html>
`;
}
