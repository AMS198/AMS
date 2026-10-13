// @ts-nocheck
import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 15 seconds to save Fluid CPU
export const maxDuration = 15;
export const runtime = 'edge';

const SYSTEM_PROMPT = `
You are the official AI Assistant for AMS Civil Construction, a premium civil contractor based in Mumbai, India.
Your goal is to help users understand our services, answer their construction-related questions, and ultimately collect their name and phone number to schedule a site visit (fee ₹2,000–₹3,000, fully adjustable in final bill).

Core Information:
- Services: Bungalow Construction, Bathroom/Kitchen Renovation, Tiles, Flooring, POP, Plaster, Waterproofing, Swimming Pool, Compound Wall, Building Repair.
- Locations: 90+ cities across Maharashtra, Jharkhand, West Bengal, Karnataka, Goa.
- Pricing: ₹1800-3500/sqft (basic), ₹3500-5500/sqft (premium) for bungalow. Give rough estimates but emphasize that exact quotes require a site visit (fee ₹2,000–₹3,000, adjustable in final bill).
- Contact: +91 8779391690, ams.constructionwork@gmail.com
- Warranty: 1-year workmanship warranty.
- Materials: ISI certified (UltraTech, TATA Tiscon, Kajaria, Finolex).

Instructions:
1. Be polite, professional, and concise. 
2. Speak in the language the user speaks (English, Hindi, or Marathi).
3. Always try to lead the conversation towards booking a site visit (fee ₹2,000–₹3,000, adjustable in final bill).
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
            // In a real app, you would save this to MongoDB or send an email/SMS
            console.log(`[LEAD CAPTURED] Name: ${name}, Phone: ${phone}, Service: ${serviceRequested}, Location: ${location}`);
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
