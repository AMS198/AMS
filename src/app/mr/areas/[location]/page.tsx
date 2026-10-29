// src/app/mr/areas/[location]/page.tsx
// Dynamic SSR: Renders on demand to completely bypass Vercel Data Cache (0 ISR Reads)
export const revalidate = false;
export const dynamicParams = true;

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getLocation, locations } from '@/data/locations';
import { services } from '@/data/siteData';
import { MapPin, CheckCircle, ArrowRight, Star, ShieldCheck, Clock, Users, HardHat, Navigation } from 'lucide-react';
import { WhatsAppLogo, PhoneLogo } from '@/components/ui/BrandIcons';
import ModernCTA from '@/components/ui/ModernCTA';
import { getDb } from '@/lib/mongodb';
import { getSeededRandom, zoneContext } from '@/data/localContent';



export async function generateMetadata(props: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const params = await props.params;
  const loc = getLocation(params.location);
  if (!loc) return { title: 'Not Found' };

  const title = `${loc.name} Civil Contractor in Marathi | सर्वोत्कृष्ट कंत्राटदार [2026]`;
  const description = `⭐ 4.9/5 रेटिंग. ${loc.name}, ${loc.district} मधील नंबर 1 सिव्हिल कन्स्ट्रक्शन कंपनी. घर बांधणी, नूतनीकरण (Renovation) आणि इंटिरियरसाठी संपर्क साधा.`;

  return {
    title,
    description,
    keywords: [
      `${loc.name} civil contractor marathi`,
      `${loc.name} madhye thekedar`,
      `${loc.name} ghar bandhani`,
      `${loc.name} construction company`,
      `${loc.name} best civil work`
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.amscivilwork.in/mr/areas/${loc.slug}`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `${loc.name} मधील बांधकाम` }],
    },
    alternates: {
      canonical: `https://www.amscivilwork.in/mr/areas/${loc.slug}`,
      languages: {
        'en-IN': `https://www.amscivilwork.in/areas/${loc.slug}`,
        'hi-IN': `https://www.amscivilwork.in/hi/areas/${loc.slug}`,
        'mr-IN': `https://www.amscivilwork.in/mr/areas/${loc.slug}`,
        'x-default': `https://www.amscivilwork.in/areas/${loc.slug}`,
      },
    },
  };
}

export default async function LocationPageMarathi(props: { params: Promise<{ location: string }> }) {
  const params = await props.params;
  const loc = getLocation(params.location);
  if (!loc) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `AMS Civil Construction — ${loc.name} (Marathi)`,
    description: `${loc.name} मधील विश्वासार्ह सिव्हिल कंत्राटदार.`,
    telephone: ['+918779391690'],
    url: `https://www.amscivilwork.in/mr/areas/${loc.slug}`,
    areaServed: [loc.name, ...loc.nearby],
  };

  const trustStats = [
    { icon: Clock, label: '10+ वर्षे', desc: 'अनुभव' },
    { icon: CheckCircle, label: '200+', desc: 'प्रोजेक्ट्स' },
    { icon: Users, label: '200+', desc: 'आनंदी ग्राहक' },
    { icon: Star, label: '4.9/5', desc: 'रेटिंग' },
  ];

  // Dynamic Content for Entropy
  const layoutSeed = getSeededRandom(loc.slug + 'mr');
  const paras = [
    `AMS Civil Construction ${loc.name} मध्ये उत्कृष्ट बांधकाम आणि नूतनीकरण (renovation) सेवा प्रदान करते. बंगला बांधणीपासून ते किचन पर्यंत, आम्ही 10+ वर्षांच्या अनुभवासह काम करतो.`,
    `जर आपण ${loc.name} (${loc.district}) मध्ये विश्वासार्ह सिव्हिल कंत्राटदार शोधत असाल, तर AMS Civil Construction हा सर्वोत्तम पर्याय आहे. आम्ही विशेषतः ${loc.landmarks[0] || loc.name} जवळ काम करतो.`,
    `${loc.name} मध्ये प्रीमियम सिव्हिल कामासाठी आम्ही ओळखले जातो. घर बांधणी असो वा नूतनीकरण, आमची टीम ${loc.zone} भागात सर्वोत्तम गुणवत्ता देते.`
  ];
  const selectedPara = paras[Math.floor(layoutSeed * paras.length)];

  return (
    <main className="min-h-screen bg-[#080D1A] font-body">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative pt-40 pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 blur-[120px]" />
        <div className="relative z-10 container-custom">
          <nav className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400 mb-8">
            <Link prefetch={false} href="/" className="hover:text-orange-400">मुख्य पृष्ठ (Home)</Link>
            <ArrowRight size={10} className="opacity-50" />
            <Link prefetch={false} href="/areas" className="hover:text-orange-400">सेवा क्षेत्र</Link>
            <ArrowRight size={10} className="opacity-50" />
            <span className="text-orange-400 font-medium">{loc.name}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold mb-6">
              <MapPin size={14} /> सेवा क्षेत्र: {loc.zone}
            </div>

            <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-7xl leading-[1.1] mb-6">
              {loc.name} मधील #1 सिव्हिल <br />
              <span className="text-gradient">कंत्राटदार (Contractor)</span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mb-10">
              {selectedPara}
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="tel:+918779391690" className="btn-primary px-8 py-4 gap-3">
                <PhoneLogo className="w-5 h-5 fill-white" /> कॉल करा
              </a>
              <a href={`https://wa.me/918779391690?text=Namaskar!%20Mala%20${encodeURIComponent(loc.name)}%20madhe%20civil%20kaam%20havey.%20Please%20quote%20pathva.`} target="_blank" rel="noopener noreferrer" className="btn-outline px-8 py-4 gap-3 bg-white/5 group">
                <WhatsAppLogo className="w-5 h-5 fill-[#F97316] group-hover:fill-white transition-colors" /> व्हॉट्सॲप (WhatsApp)
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
              {trustStats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1 p-4 rounded-xl bg-white/5 border border-white/10">
                  <stat.icon className="w-5 h-5 text-orange-400 mb-2" />
                  <span className="text-white font-bold text-xl">{stat.label}</span>
                  <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">{stat.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Internal Linking Mesh for nearby areas */}
      <section className="section-y bg-[#0B1120]">
        <div className="container-custom">
           <h3 className="text-white font-bold mb-6 flex items-center gap-2 text-xl">
             <MapPin className="text-orange-400" /> {loc.name} जवळची आमची कामे
           </h3>
           <div className="flex flex-wrap gap-3">
             {loc.nearby.slice(0, 8).map(near => {
                const nearLoc = getLocation(near);
                if (!nearLoc) return null;
                return (
                  <Link key={near} href={`/mr/areas/${nearLoc.slug}`} prefetch={false}
                    className="px-5 py-3 text-sm font-medium text-slate-300 hover:text-white border border-white/10 hover:border-orange-500/50 rounded-xl transition-all bg-white/5">
                    {nearLoc.name} मध्ये सिव्हिल काम
                  </Link>
                );
             })}
           </div>
        </div>
      </section>

      <section className="py-16 bg-[#080D1A] border-t border-white/5">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={layoutSeed > 0.5 ? "order-2" : "order-1"}>
              <div className="section-label">{loc.name} मधील सिव्हिल काम</div>
              <h2 className="font-display text-3xl lg:text-4xl text-white mt-4 mb-6">
                आम्हाला का निवडावे? <span className="text-gradient">AMS Civil</span>
              </h2>
              <div className="space-y-6 text-slate-400 leading-relaxed">
                <p>
                  {loc.name} मध्ये एक विश्वासार्ह कंत्राटदार शोधणे कठीण असू शकते. AMS Civil Construction तुम्हाला 100% पारदर्शक किंमतीवर दर्जेदार काम देते.
                  {layoutSeed > 0.5 ? ` आम्ही विशेषतः ${loc.landmarks[0] || loc.name} च्या परिसरात अनेक प्रकल्प यशस्वीपणे पूर्ण केले आहेत.` : ''}
                </p>
              </div>
              <div className="flex flex-wrap gap-6 mt-10">
                <div className="flex items-center gap-2 text-orange-400 font-bold"><CheckCircle size={18} /> 100% दर्जेदार साहित्य</div>
                <div className="flex items-center gap-2 text-orange-400 font-bold"><CheckCircle size={18} /> कुशल कामगार</div>
                <div className="flex items-center gap-2 text-orange-400 font-bold"><CheckCircle size={18} /> वेळेवर काम पूर्ण</div>
              </div>
            </div>

            <div className={`bg-white/5 rounded-3xl p-8 border border-white/10 ${layoutSeed > 0.5 ? 'order-1' : 'order-2'}`}>
                <h3 className="text-white font-bold text-xl mb-4">आमची वैशिष्ट्ये</h3>
                <ul className="space-y-4 text-slate-400">
                    <li className="flex gap-3"><Star className="text-orange-400 flex-shrink-0 mt-1" size={16}/> {loc.district} मध्ये 200+ पेक्षा जास्त प्रकल्पांचे यशस्वी काम.</li>
                    <li className="flex gap-3"><Star className="text-orange-400 flex-shrink-0 mt-1" size={16}/> कोणत्याही छुप्या शुल्काशिवाय (Hidden Costs) स्पष्ट कोटेशन.</li>
                    <li className="flex gap-3"><Star className="text-orange-400 flex-shrink-0 mt-1" size={16}/> प्रत्यक्ष कामावर सुपरवायझरची 100% देखरेख.</li>
                </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y relative overflow-hidden bg-[#0B1120]">
        <div className="container-custom relative z-10">
          <ModernCTA 
            title={`आपण ${loc.name} मध्ये घर बांधू किंवा नूतनीकरण करू इच्छिता?`}
            subtitle={`आजच मोफत साईट व्हिजिट आणि एस्टीमेटसाठी आम्हाला कॉल करा.`}
            description={`आमची टीम ${loc.district} मध्ये काम करते आणि महानगरपालिकेचे नियम चांगल्या प्रकारे समजते. कोणत्याही छुप्या शुल्काशिवाय आपले बजेट जाणून घ्या.`}
          />
        </div>
      </section>
    </main>
  );
}
