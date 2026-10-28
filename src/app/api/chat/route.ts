// @ts-nocheck
import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { getDb } from '@/lib/mongodb';
import nodemailer from 'nodemailer';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const SYSTEM_PROMPT = `
You are the official AI Assistant for AMS Civil Construction, a premium civil contractor based in Mumbai, India.
Your goal is to help users understand our services, answer their construction-related questions, and ultimately collect their name and phone number to schedule a Free Site Visit (100% Free under Diwali Special Offer till 15 Nov; nominal visit fee applicable post offer, adjustable in final bill).

Core Information:
- Services: Bungalow Construction, Bathroom/Kitchen Renovation, Tiles, Flooring, POP, Plaster, Waterproofing, Swimming Pool, Compound Wall, Building Repair.
- Locations: 90+ cities across Maharashtra, Jharkhand, West Bengal, Karnataka, Goa.
- Pricing: ₹1800-3500/sqft (basic), ₹3500-5500/sqft (premium) for bungalow. Give rough estimates but emphasize that exact quotes are given after a site visit (100% Free under Diwali Offer till 15 Nov).
- Contact: +91 8779391690, ams.constructionwork@gmail.com
- Warranty: 1-year workmanship warranty.
- Materials: ISI certified (UltraTech, TATA Tiscon, Kajaria, Finolex).

Instructions:
1. Be polite, professional, and concise. 
2. Speak in the language the user speaks (English, Hindi, or Marathi).
3. Always try to lead the conversation towards booking a 100% Free Site Visit under the Diwali Special Offer (valid till 15 Nov).
4. When you are ready to book a site visit, ask for their name and 10-digit WhatsApp number.
5. If they provide their name and phone number, use the \`bookSiteVisit\` tool to save their details and tell them our senior engineer will contact them shortly on WhatsApp.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google('gemini-1.5-flash'),
      system: SYSTEM_PROMPT,
      messages,
      tools: {
        bookSiteVisit: tool({
          description: 'Book a site visit when the user provides their name and phone number.',
          parameters: z.object({
            name: z.string().describe('The name of the customer'),
            phone: z.string().describe('The 10-digit phone number of the customer'),
            serviceRequested: z.string().optional().describe('What service they are looking for'),
            location: z.string().optional().describe('Where they want the work done'),
          }),
          execute: async ({ name, phone, serviceRequested, location }) => {
            console.log(`[LEAD CAPTURED] Name: ${name}, Phone: ${phone}, Service: ${serviceRequested}, Location: ${location}`);

            // 1. Save directly to MongoDB enquiries collection
            try {
              const db = await getDb();
              await db.collection('enquiries').insertOne({
                name: (name || 'Valued Client').trim(),
                phone: (phone || '').trim(),
                service: (serviceRequested || 'Site Visit Consultation').trim(),
                location: (location || 'Mumbai & MMR').trim(),
                status: 'new',
                source: 'ai-chatbot',
                createdAt: new Date(),
              });
            } catch (dbErr) {
              console.error('[AI Chat] Failed to persist lead to MongoDB:', dbErr);
            }

            // 2. Send instant email notification to admin
            if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
              try {
                const transporter = nodemailer.createTransport({
                  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
                  port: Number(process.env.EMAIL_PORT) || 587,
                  secure: false,
                  auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                  },
                });

                await transporter.sendMail({
                  from: `"AMS AI Assistant" <${process.env.EMAIL_USER}>`,
                  to: process.env.EMAIL_TO || process.env.EMAIL_USER,
                  subject: `🤖 New AI Chatbot Lead — ${name} (+91 ${phone})`,
                  html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
                      <h2 style="color: #ea580c; margin-top: 0;">New Lead Captured by SmartBot AI</h2>
                      <p>A visitor just booked a site visit through the website AI chat assistant:</p>
                      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 140px;">Name:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${name}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><a href="tel:+91${phone}" style="color: #ea580c; font-weight: bold;">+91 ${phone}</a> | <a href="https://wa.me/91${phone}" style="color: #16a34a; font-weight: bold;">WhatsApp Chat</a></td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Service:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${serviceRequested || 'General Consultation'}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Location:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${location || 'Mumbai'}</td></tr>
                        <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Timestamp:</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td></tr>
                      </table>
                    </div>
                  `,
                });
              } catch (mailErr) {
                console.warn('[AI Chat] Failed to send email alert:', mailErr);
              }
            }

            return {
              success: true,
              message: `Site visit booked successfully for ${name}. Our engineer will contact them on ${phone}.`,
            };
          },
        }),
      },
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return new Response('Failed to generate response. Please ensure GOOGLE_GENERATIVE_AI_API_KEY is set in .env.local.', { status: 500 });
  }
}
