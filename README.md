# 🏗️ Mandal Civil Work & Construction — Website

**Owner:** Kedar Mandal  
**Phone:** +91 91026 15343  
**Stack:** Next.js 14 · Tailwind CSS · MongoDB Atlas · Cloudinary · Nodemailer

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local (already pre-filled — just verify values)
# File is included in this zip. See .env.local

# 3. Start dev server
npm run dev
# → http://localhost:3000

# 4. Build for production
npm run build && npm start
```

---

## 🔐 Admin Login

Go to **http://localhost:3000/admin**

| Field | Value |
|---|---|
| Username | Configured in `.env.local` |
| Password | Configured in `.env.local` |

To change: edit the constants at the top of `src/app/admin/page.tsx`

---

## ✅ What's Fully Working

| Feature | Status |
|---|---|
| Add / Edit / Delete projects via Admin | ✅ Saves to MongoDB |
| Project image upload | ✅ Uploads to Cloudinary |
| Contact form | ✅ Saves to MongoDB + sends email |
| Quote popup | ✅ Saves to MongoDB + sends email |
| Live enquiries in Admin | ✅ Pulled from MongoDB in real-time |
| Enquiry status update | ✅ new → contacted → converted |
| WhatsApp float button | ✅ Opens chat with Kedar's number |
| All pages responsive | ✅ Mobile + desktop |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              ← Home
│   ├── about/page.tsx        ← About Kedar Mandal
│   ├── services/page.tsx     ← 8 services
│   ├── projects/page.tsx     ← Portfolio with filter
│   ├── gallery/page.tsx      ← Lightbox gallery
│   ├── contact/page.tsx      ← Contact form + map
│   ├── admin/page.tsx        ← Login + full dashboard
│   └── api/
│       ├── contact/route.ts  ← MongoDB + email
│       ├── quote/route.ts    ← MongoDB + email
│       ├── upload/route.ts   ← Cloudinary image upload
│       ├── projects/
│       │   ├── route.ts      ← GET all / POST new
│       │   └── [id]/route.ts ← PUT update / DELETE
│       └── enquiries/route.ts← GET + PATCH status
├── lib/
│   ├── mongodb.ts            ← MongoDB singleton
│   └── cloudinary.ts        ← Cloudinary upload helper
├── components/
│   ├── layout/Navbar.tsx
│   ├── layout/Footer.tsx
│   ├── ui/WhatsAppButton.tsx
│   └── ui/QuotePopup.tsx
└── data/siteData.ts          ← Static content (services, testimonials, FAQs)
```

---

## 🌐 Deployment (Vercel — Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Add all `.env.local` values to **Vercel → Settings → Environment Variables**.

---

## 📞 Contact Info in Site

All contact details are updated throughout the codebase:
- **Phone:** +91 91026 15343
- **Owner:** Kedar Mandal
- **Company:** Mandal Civil Work & Construction
- **Email:** mandalnitesh654@gmail.com

To update them globally: search and replace `9102615343` / `Kedar Mandal` in the codebase.











