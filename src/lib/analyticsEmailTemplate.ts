// src/lib/analyticsEmailTemplate.ts
// Branded HTML email template for 24-Hour Daily Lead & Click Analytics Report

export interface DailyReportData {
  date: string;
  period: string; // e.g. "Last 24 Hours"
  whatsappClicks: number;
  callClicks: number;
  newLeads: number;
  totalInteractions: number;
  topClickPages: { page: string; total: number; whatsapp: number; calls: number }[];
  sources: { label: string; type: string; count: number }[];
  mobileCount: number;
  desktopCount: number;
  recentLeads?: { name: string; phone: string; service: string; time: string }[];
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
  blue:      '#3B82F6',
  white:     '#FFFFFF',
  textMuted: '#94A3B8',
};

export function analyticsReportHtml(data: DailyReportData): string {
  const {
    date,
    period,
    whatsappClicks,
    callClicks,
    newLeads,
    totalInteractions,
    topClickPages,
    sources,
    mobileCount,
    desktopCount,
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
  <title>24-Hour Daily Performance Report</title>
  <style>
    body { margin:0; padding:0; background-color:#070B14; font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#CBD5E1; }
    .wrapper { max-width:640px; margin:24px auto; background-color:${C.card}; border-radius:18px; overflow:hidden; border:1px solid ${C.border}; box-shadow:0 25px 50px -12px rgba(0,0,0,0.5); }
    .hero-banner { background:linear-gradient(135deg, #EA580C 0%, #C2410C 50%, #1E2D45 100%); padding:32px 24px; text-align:center; color:#fff; }
    .metric-grid { display:table; width:100%; border-collapse:collapse; background:${C.bg}; }
    .metric-cell { display:table-cell; width:33.33%; padding:20px 12px; text-align:center; border-right:1px solid ${C.border}; }
    .metric-cell:last-child { border-right:none; }
    .metric-val { font-size:32px; font-weight:900; line-height:1.1; }
    .metric-lbl { font-size:11px; text-transform:uppercase; letter-spacing:1px; color:${C.textMuted}; font-weight:700; margin-top:6px; }
    .section { padding:24px 28px; border-bottom:1px solid ${C.border}; }
    .section-title { font-size:15px; font-weight:800; color:#fff; margin:0 0 16px; text-transform:uppercase; letter-spacing:0.5px; }
    table.data-table { width:100%; border-collapse:collapse; font-size:13px; }
    table.data-table th { text-align:left; padding:8px 10px; color:${C.textMuted}; font-size:11px; text-transform:uppercase; border-bottom:1px solid ${C.border}; }
    table.data-table td { padding:10px 10px; border-bottom:1px solid rgba(255,255,255,0.05); color:#E2E8F0; }
    .badge { display:inline-block; padding:3px 8px; border-radius:12px; font-size:11px; font-weight:700; }
    .badge-wa { background:rgba(37,211,102,0.15); color:#25D366; }
    .badge-call { background:rgba(249,115,22,0.15); color:#F97316; }
    .footer { background:${C.bg}; padding:24px; text-align:center; font-size:11px; color:${C.textMuted}; }
  </style>
</head>
<body>
  <div class="wrapper">
    <!-- Header -->
    <div class="hero-banner">
      <div style="font-size:11px; font-weight:800; letter-spacing:3px; text-transform:uppercase; opacity:0.9;">AMS Civil Construction</div>
      <h1 style="margin:8px 0 4px; font-size:24px; font-weight:900;">📊 24-Hour Activity & Clicks Report</h1>
      <p style="margin:0; font-size:13px; opacity:0.85;">📅 ${date} • ${period}</p>
    </div>

    <!-- Core Metrics Highlights -->
    <div class="metric-grid">
      <div class="metric-cell">
        <div class="metric-val" style="color:${C.green};">${whatsappClicks}</div>
        <div class="metric-lbl">💬 WhatsApp Clicks</div>
      </div>
      <div class="metric-cell">
        <div class="metric-val" style="color:${C.orange};">${callClicks}</div>
        <div class="metric-lbl">📞 Call Clicks</div>
      </div>
      <div class="metric-cell">
        <div class="metric-val" style="color:${C.blue};">${newLeads}</div>
        <div class="metric-lbl">📩 Form Leads</div>
      </div>
    </div>

    <!-- Summary Box -->
    <div style="padding:16px 28px; background:rgba(249,115,22,0.06); border-bottom:1px solid ${C.border};">
      <div style="font-size:13px; color:#E2E8F0;">
        🔥 Total customer engagement in the last 24 hours: <strong style="color:${C.white}; font-size:15px;">${totalInteractions} client actions</strong>.
      </div>
    </div>

    <!-- Top Pages Generating Clicks -->
    <div class="section">
      <h3 class="section-title">📍 Top Pages Bringing Enquiries</h3>
      ${topClickPages && topClickPages.length > 0 ? `
      <table class="data-table">
        <thead>
          <tr>
            <th>Page URL</th>
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
                <span style="color:#fff;">${p.page === '/' ? '/ (Home)' : p.page}</span>
              </td>
              <td style="text-align:center;"><span class="badge badge-wa">${p.whatsapp}</span></td>
              <td style="text-align:center;"><span class="badge badge-call">${p.calls}</span></td>
              <td style="text-align:right; font-weight:800; color:#fff;">${p.total}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>` : `
        <p style="color:${C.textMuted}; font-size:13px; margin:0;">No click events recorded during this period.</p>
      `}
    </div>

    <!-- Click Source Distribution -->
    <div class="section">
      <h3 class="section-title">🔘 Where Users Clicked</h3>
      ${sources && sources.length > 0 ? `
      <table class="data-table">
        <thead>
          <tr>
            <th>Button / Placement</th>
            <th>Type</th>
            <th style="text-align:right;">Clicks</th>
          </tr>
        </thead>
        <tbody>
          ${sources.map(s => `
            <tr>
              <td style="font-weight:600; text-transform:capitalize;">${s.label.replace(/_/g, ' ')}</td>
              <td>
                ${s.type === 'whatsapp' 
                  ? '<span class="badge badge-wa">WhatsApp</span>' 
                  : '<span class="badge badge-call">Call</span>'}
              </td>
              <td style="text-align:right; font-weight:800; color:#fff;">${s.count}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>` : `
        <p style="color:${C.textMuted}; font-size:13px; margin:0;">No button data yet.</p>
      `}
    </div>

    <!-- Device Breakdown -->
    <div class="section">
      <h3 class="section-title">📱 Device Breakdown</h3>
      <div style="display:table; width:100%;">
        <div style="display:table-cell; width:50%; padding-right:8px;">
          <div style="background:${C.cardLight}; border-radius:12px; padding:14px; text-align:center; border:1px solid ${C.border};">
            <div style="font-size:20px;">📱 Mobile</div>
            <div style="color:#fff; font-size:22px; font-weight:900; margin-top:4px;">${mobilePct}%</div>
            <div style="color:${C.textMuted}; font-size:11px;">${mobileCount} clicks</div>
          </div>
        </div>
        <div style="display:table-cell; width:50%; padding-left:8px;">
          <div style="background:${C.cardLight}; border-radius:12px; padding:14px; text-align:center; border:1px solid ${C.border};">
            <div style="font-size:20px;">💻 Desktop</div>
            <div style="color:#fff; font-size:22px; font-weight:900; margin-top:4px;">${desktopPct}%</div>
            <div style="color:${C.textMuted}; font-size:11px;">${desktopCount} clicks</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Link to Admin -->
    <div style="padding:24px 28px; text-align:center; background:${C.bg};">
      <a href="https://www.amscivilwork.in/admin" style="display:inline-block; background:linear-gradient(135deg, ${C.orange}, ${C.orangeDk}); color:#fff; text-decoration:none; padding:12px 28px; border-radius:10px; font-weight:800; font-size:13px; letter-spacing:0.5px;">
        Open Admin Dashboard →
      </a>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p style="margin:0 0 6px; font-weight:700; color:#fff;">AMS Civil Construction Mumbai</p>
      <p style="margin:0; opacity:0.6;">Automated 24-Hour System Report • Zero Server Overhead • ISR Safe</p>
    </div>
  </div>
</body>
</html>
`;
}
