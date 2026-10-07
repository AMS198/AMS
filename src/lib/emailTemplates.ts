// src/lib/emailTemplates.ts
// Professional premium branded HTML email templates for AMS Civil Construction

export interface EnquiryData {
  name:    string;
  phone:   string;
  email?:  string | null;
  service: string;
  address?: string | null;
  location?: string | null;
  message?: string | null;
  source:  string; // 'contact-form' | 'quote-popup' | 'scroll-lead'
}

/* ─────────────────────────────────────────────────────────────────
   Shared brand colours / tokens
   Refined for a more premium, high-contrast look
───────────────────────────────────────────────────────────────── */
const C = {
  bg:        '#0B1120', // Deep Navy
  card:      '#111827', // Rich Slate
  border:    '#1E2D45', // Subdued Border
  orange:    '#F97316', // Vibrant Orange
  orangeDk:  '#EA580C', // Deep Orange
  white:     '#FFFFFF',
  textMuted: '#94A3B8',
  textLight: '#CBD5E1',
  green:     '#10B981',
};

// Social Media Links
const SOCIAL = {
  fb:    'https://www.facebook.com/profile.php?id=61570712849063',
  insta: 'https://www.instagram.com/amscivilwork/',
  wa:    'https://wa.me/918779391690',
  web:   'https://www.amscivilwork.in'
};

const LOGO_URL = 'https://www.amscivilwork.in/logo.png';

// Social Icons (using high-quality flat icons from a reliable CDN)
const ICON = {
  fb:    'https://cdn-icons-png.flaticon.com/512/733/733547.png',
  insta: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png',
  wa:    'https://cdn-icons-png.flaticon.com/512/733/733585.png',
  web:   'https://cdn-icons-png.flaticon.com/512/1006/1006771.png'
};

const now = () => {
  const d = new Date();
  return d.toLocaleString('en-IN', {
    timeZone:    'Asia/Kolkata',
    day:         '2-digit',
    month:       'short',
    year:        'numeric',
    hour:        '2-digit',
    minute:      '2-digit',
    hour12:      true,
  });
};

/* ─────────────────────────────────────────────────────────────────
   ADMIN ALERT EMAIL
   Sent to: ams.constructionwork@gmail.com
───────────────────────────────────────────────────────────────── */
export function adminAlertHtml(data: EnquiryData): string {
  const { name, phone, email, service, address, location, message, source } = data;
  
  let tag = '📩 Contact Form Enquiry';
  if (source === 'quote-popup') tag = '🏗️ Free Quote Request';
  if (source === 'scroll-lead')  tag = '✨ New Scroll Lead';

  const waUrl = `https://wa.me/91${phone}?text=Hi%20${encodeURIComponent(name)}!%20Thank%20you%20for%20contacting%20AMS%20Civil%20Construction.%20We%20have%20received%20your%20request%20for%20${encodeURIComponent(service)}.%20Our%20team%20will%20call%20you%20shortly.`;

  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body { margin:0; padding:0; background-color:#f8fafc; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    .container { max-width:600px; margin: 32px auto; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.05); }
    .header { background:linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDk} 100%); padding:40px 36px; color:#ffffff; }
    .content { padding:36px; background-color:#ffffff; }
    .details-table { width:100%; border-collapse:collapse; margin-bottom:24px; }
    .details-table td { padding:14px 0; border-bottom:1px solid #f1f5f9; }
    .label { color:#64748b; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1px; width:120px; }
    .value { color:#0f172a; font-size:15px; font-weight:600; }
    .tag-badge { display:inline-block; background-color:#fef3c7; color:#d97706; padding:4px 12px; border-radius:20px; font-size:11px; font-weight:700; margin-bottom:12px; }
    .footer { background-color:#1e293b; padding:40px 36px; color:#94a3b8; text-align:center; }
    .btn { display:inline-block; padding:14px 28px; border-radius:8px; font-weight:700; text-decoration:none; margin-right:10px; font-size:13px; }
    .btn-primary { background-color:${C.orange}; color:#ffffff; }
    .btn-wa { background-color:#25D366; color:#ffffff; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:15px;">
        <img src="${LOGO_URL}" alt="AMS Logo" width="45" height="45" style="border-radius:4px; background:#fff; padding:2px;">
        <p style="margin:0; opacity:0.9; font-size:12px; letter-spacing:3px; text-transform:uppercase; font-weight:700;">AMS Civil Construction</p>
      </div>
      <h1 style="margin:8px 0 0; font-size:28px; font-weight:800;">New Lead Received!</h1>
    </div>

    <div class="content">
      <div class="tag-badge">${tag}</div>
      <p style="margin:0 0 24px; color:#64748b; font-size:13px;">Received on ${now()} IST</p>

      <table class="details-table">
        <tr>
          <td class="label">Client</td>
          <td class="value">${name}</td>
        </tr>
        <tr>
          <td class="label">Phone</td>
          <td class="value"><a href="tel:+91${phone}" style="color:${C.orange}; text-decoration:none;">+91 ${phone}</a></td>
        </tr>
        ${email ? `
        <tr>
          <td class="label">Email</td>
          <td class="value"><a href="mailto:${email}" style="color:${C.orange}; text-decoration:none;">${email}</a></td>
        </tr>` : ''}
        <tr>
          <td class="label">Service</td>
          <td class="value"><span style="color:${C.orange};">${service}</span></td>
        </tr>
        ${location ? `
        <tr>
          <td class="label">Location</td>
          <td class="value">${location}</td>
        </tr>` : ''}
        ${address ? `
        <tr>
          <td class="label" style="vertical-align:top;">Address</td>
          <td class="value">${address}</td>
        </tr>` : ''}
        ${message ? `
        <tr>
          <td class="label" style="vertical-align:top;">Message</td>
          <td class="value" style="font-weight:400; line-height:1.6;">${message}</td>
        </tr>` : ''}
      </table>

      <div style="margin-top:32px;">
        <a href="tel:+91${phone}" class="btn btn-primary">📞 Call Client</a>
        <a href="${waUrl}" target="_blank" class="btn btn-wa">💬 WhatsApp</a>
      </div>
    </div>

    <div class="footer">
      <p style="margin:0; font-size:13px; color:#ffffff; font-weight:600;">AMS Civil Construction Mumbai</p>
      <p style="margin:8px 0 24px; font-size:12px;">Expert Civil & Interior Solutions for 20+ Years</p>
      
      <div style="margin-bottom:24px;">
        <a href="${SOCIAL.fb}" style="display:inline-block; margin:0 10px;"><img src="${ICON.fb}" width="24" height="24" alt="Facebook"></a>
        <a href="${SOCIAL.insta}" style="display:inline-block; margin:0 10px;"><img src="${ICON.insta}" width="24" height="24" alt="Instagram"></a>
        <a href="${SOCIAL.wa}" style="display:inline-block; margin:0 10px;"><img src="${ICON.wa}" width="24" height="24" alt="WhatsApp"></a>
      </div>

      <p style="margin:0; font-size:11px; opacity:0.6;">© ${new Date().getFullYear()} AMS Civil Construction. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
}

/* ─────────────────────────────────────────────────────────────────
   CLIENT THANK-YOU AUTO-REPLY EMAIL
   Sent to: client's email (if provided)
───────────────────────────────────────────────────────────────── */
export function clientAutoReplyHtml(data: EnquiryData): string {
  const { name, phone, service, location } = data;

  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body { margin:0; padding:0; background-color:#f1f5f9; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    .container { max-width:600px; margin: 32px auto; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 20px 40px rgba(0,0,0,0.08); }
    .header { background-color:${C.bg}; padding:48px 40px; text-align:center; color:#ffffff; }
    .content { padding:40px; }
    .summary-card { background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:24px; margin:24px 0; }
    .footer { background-color:#f8fafc; padding:40px; text-align:center; border-top:1px solid #e2e8f0; }
    .feature-grid { display:table; width:100%; margin:32px 0; }
    .feature-item { display:table-cell; width:33.33%; padding:0 10px; text-align:center; }
    .feature-icon { width:40px; height:40px; margin-bottom:12px; }
    .feature-text { font-size:12px; font-weight:700; color:#1e293b; text-transform:uppercase; letter-spacing:0.5px; }
    .btn-wa { display:inline-block; background-color:#25D366; color:#ffffff; padding:14px 32px; border-radius:50px; font-weight:700; text-decoration:none; font-size:14px; box-shadow:0 4px 12px rgba(37,211,102,0.3); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="margin:0 auto 20px; width:70px; height:70px; background-color:#ffffff; border-radius:15px; display:flex; align-items:center; justify-content:center; overflow:hidden; border:3px solid ${C.orange};">
        <img src="${LOGO_URL}" alt="AMS Logo" width="60" height="60" style="object-contain:center;">
      </div>
      <p style="margin:0; font-size:12px; letter-spacing:4px; text-transform:uppercase; font-weight:700; color:${C.orange};">AMS Civil Construction</p>
      <h1 style="margin:12px 0 0; font-size:32px; font-weight:800;">Thank You, ${name}!</h1>
      <p style="margin:16px 0 0; font-size:16px; opacity:0.8; line-height:1.6;">We've received your enquiry for <strong style="color:${C.orange};">${service}</strong>. Our expert team will contact you within 24 hours.</p>
    </div>

    <div class="content">
      <h3 style="margin:0 0 16px; font-size:18px; color:#0f172a;">Submission Details</h3>
      <div class="summary-card">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:8px 0; color:#64748b; font-size:13px; font-weight:600; width:100px;">Service</td>
            <td style="padding:8px 0; color:#0f172a; font-size:14px; font-weight:700;">${service}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; color:#64748b; font-size:13px; font-weight:600;">Phone</td>
            <td style="padding:8px 0; color:#0f172a; font-size:14px; font-weight:700;">+91 ${phone}</td>
          </tr>
          ${location ? `
          <tr>
            <td style="padding:8px 0; color:#64748b; font-size:13px; font-weight:600;">Location</td>
            <td style="padding:8px 0; color:#0f172a; font-size:14px;">${location}</td>
          </tr>` : ''}
        </table>
      </div>

      <div class="feature-grid">
        <div class="feature-item">
          <div style="font-size:24px; margin-bottom:8px;">⚡</div>
          <div class="feature-text">Fast Response</div>
        </div>
        <div class="feature-item">
          <div style="font-size:24px; margin-bottom:8px;">💎</div>
          <div class="feature-text">Premium Quality</div>
        </div>
        <div class="feature-item">
          <div style="font-size:24px; margin-bottom:8px;">🏠</div>
          <div class="feature-text">Expert Team</div>
        </div>
      </div>

      <div style="text-align:center; margin-top:40px;">
        <p style="margin:0 0 20px; font-size:14px; color:#64748b;">Need immediate assistance?</p>
        <a href="https://wa.me/918779391690" class="btn-wa">Chat on WhatsApp</a>
      </div>
    </div>

    <div class="footer">
      <p style="margin:0 0 20px; font-size:14px; color:#0f172a; font-weight:700;">Connect With Us</p>
      <div style="margin-bottom:32px;">
        <a href="${SOCIAL.fb}" style="display:inline-block; margin:0 12px; text-decoration:none;">
          <img src="${ICON.fb}" width="28" height="28" alt="Facebook">
        </a>
        <a href="${SOCIAL.insta}" style="display:inline-block; margin:0 12px; text-decoration:none;">
          <img src="${ICON.insta}" width="28" height="28" alt="Instagram">
        </a>
        <a href="${SOCIAL.web}" style="display:inline-block; margin:0 12px; text-decoration:none;">
          <img src="${ICON.web}" width="28" height="28" alt="Website">
        </a>
      </div>
      
      <p style="margin:0; font-size:12px; color:#94a3b8; line-height:1.6;">
        © ${new Date().getFullYear()} AMS Civil Construction Mumbai.<br>
        Bungalow Construction • Bathroom Renovation • Kitchen Work • Tiles & More
      </p>
    </div>
  </div>
</body>
</html>`;
}
