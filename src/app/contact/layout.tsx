// src/app/contact/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact AMS Civil Construction | Book a Site Visit in Mumbai',
  description:
    'Contact AMS Civil Construction for all your construction and renovation needs in Mumbai. Call +91 87793 91690 or +91 90042 98911 to schedule a Free Site Visit (Diwali Offer till 15 Nov; nominal visit fee applicable post offer, adjustable in bill). Response within 24 hours guaranteed.',
  keywords: [
    'contact civil contractor Mumbai',
    'construction company phone number Mumbai',
    'hire building contractor Mumbai',
    'request site visit construction Mumbai',
    'AMS civil construction address',
    'construction company contact number',
    'builder enquiry Mumbai',
  ],
  openGraph: {
    title: 'Contact AMS Civil Construction — Book a Site Visit Today',
    description:
      'Call +91 87793 91690 or WhatsApp us to book a site visit. AMS Civil Construction serves all Mumbai areas.',
    url: 'https://www.amscivilwork.in/contact',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Contact AMS Civil Construction Mumbai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact AMS Civil Construction Mumbai',
    description: 'Site visit & competitive quote. Call +91 87793 91690 or +91 90042 98911.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.amscivilwork.in/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
