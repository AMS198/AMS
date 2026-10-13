// src/data/localContent.ts
// Generates unique, varied content for area×service pages
// Each combination produces different text to avoid thin/duplicate content penalties

import type { LocationData } from './locations';

interface ServiceInfo {
  title: string;
  slug: string;
  description: string;
  benefits: string[];
}

/* ── Utility: Deterministic Hash ──────────────────────────────── */
export function getSeededRandom(seedStr: string): number {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    const char = seedStr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash) / 2147483647; // normalize to 0-1
}

/* ── Zone-specific context ────────────────────────────────────── */
export const zoneContext: Record<string, string[]> = {
  'South Mumbai':   [
    'one of Mumbai\'s most prestigious neighbourhoods',
    'a historically rich and premium real estate market',
    'the heart of legacy Mumbai architecture'
  ],
  'Western Line':   [
    'a rapidly developing residential corridor',
    'one of the most active real estate zones in Mumbai',
    'a bustling suburban district with modern housing needs'
  ],
  'Central Line':   [
    'a thriving commercial-residential hub',
    'a rapidly transforming central suburb',
    'the backbone of Mumbai\'s industrial and residential growth'
  ],
  'Navi Mumbai':    [
    'a modern planned city with contemporary infrastructure',
    'a growing township with high demand for premium finishes',
    'the future of systematic urban development'
  ],
  'Maharashtra':    [
    'a key city with a booming real estate sector',
    'a rapidly expanding urban center',
    'a region with unique climatic and architectural requirements'
  ],
  'Jharkhand':      [
    'a growing urban centre with increasing construction demand',
    'a rapidly industrializing region needing robust civil work',
    'an emerging real estate market'
  ],
  'West Bengal':    [
    'a vibrant metropolitan region with a rich architectural heritage',
    'a cultural hub with specific structural needs',
    'a rapidly modernizing state with deep historical roots'
  ],
  'Karnataka':      [
    'a fast-growing Indian city with high demand for premium work',
    'a tech-driven urban center expanding rapidly',
    'a region blending modern IT parks with luxury housing'
  ],
  'Goa':            [
    'a coastal paradise with unique architectural styles',
    'a major hub for luxury villas and renovation work',
    'a region demanding specialized coastal weatherproofing'
  ],
};

/* ── Service-specific deep paragraphs templates ───────────────── */
const serviceDeepContent: Record<string, ((loc: LocationData, rand: number) => string)[]> = {
  'bungalow-construction': [
    (loc, rand) => `Building a bungalow in ${loc.name} requires a deep understanding of local soil conditions and ${loc.district} municipal building codes. Especially in the ${loc.zone} region, our structural engineers design foundations tailored to the terrain around ${loc.landmarks[0] || loc.name}. We handle everything from architectural planning to the final coat of paint, ensuring a premium build.`,
    (loc, rand) => `When constructing a bungalow in ${loc.name}, attention to detail and robust materials are paramount. In ${loc.district}, where weather patterns impact structures, our team ensures your property near ${loc.landmarks[0] || loc.name} stands strong. We manage RCC frameworks, plumbing, electricals, and custom external finishes for homes in ${loc.zone}.`,
    (loc, rand) => `A dream bungalow in ${loc.name} needs the best civil contractors. We serve the ${loc.district} area, specifically focusing on the ${loc.zone} belt. Whether your plot is near ${loc.landmarks[0] || loc.name} or elsewhere in ${loc.name}, we provide end-to-end bungalow construction, from robust foundations to luxury interiors.`
  ],
  'full-interior-work': [
    (loc, rand) => `Full interior civil work in ${loc.name} demands precision and a thorough understanding of ${loc.district} building structures. Whether it's a flat near ${loc.landmarks[0] || loc.name} or a row house in ${loc.zone}, our teams manage internal demolition, wall partitioning, and false ceilings seamlessly.`,
    (loc, rand) => `Transform your space with expert full interior civil work in ${loc.name}. We specialize in executing complex interior overhauls in the ${loc.district} area. Our team ensures that apartments and commercial spaces near ${loc.landmarks[0] || loc.name} receive flawless floorings, electrical routing, and ceiling treatments.`,
    (loc, rand) => `In the competitive real estate market of ${loc.name} (${loc.zone}), premium interior civil work is essential. We partner with top architects to deliver high-quality finishing for properties near ${loc.landmarks[0] || loc.name}. From concealed plumbing to custom wall treatments, we handle it all.`
  ],
  'swimming-pool-work': [
    (loc, rand) => `Swimming pool construction in ${loc.name} involves specialized excavation and heavy-duty RCC shell building. Our team considers the local water table levels near ${loc.landmarks[0] || loc.name} and the soil composition in ${loc.district} to engineer leak-proof pools.`,
    (loc, rand) => `Building a durable swimming pool in ${loc.name} requires expert waterproofing and structural design. We cater to luxury villas and resorts in the ${loc.district} area, particularly around ${loc.landmarks[0] || loc.name}. Our pools feature multi-layer waterproofing and premium mosaic finishing.`,
    (loc, rand) => `Enjoy a custom-designed swimming pool at your property in ${loc.name}. Serving the ${loc.zone} region, we handle everything from digging and RCC work to advanced filtration system installation. Properties near ${loc.landmarks[0] || loc.name} can rely on our 10-year leak-proof structural guarantee.`
  ],
  'compound-wall-work': [
    (loc, rand) => `A sturdy compound wall is essential for property security in ${loc.name}. Our teams build RCC-reinforced compound walls with deep foundations suited to the soil type found in ${loc.district}. From brick masonry to stone cladding, we secure properties near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Enhance your property's boundary in ${loc.name} with our expert compound wall construction. We understand the specific zoning regulations of ${loc.district} and deliver robust boundary walls for estates around ${loc.landmarks[0] || loc.name}. Choose from exposed brick, plaster finish, or decorative stone.`,
    (loc, rand) => `Security starts with a solid foundation. In ${loc.name}, we construct highly durable compound walls tailored for the ${loc.zone} climate. Whether you need a simple block wall or a high-security reinforced structure near ${loc.landmarks[0] || loc.name}, our execution is flawless.`
  ],
  'bathroom-renovation': [
    (loc, rand) => `Bathroom renovation in ${loc.name} goes beyond aesthetics—it requires expert waterproofing and precise plumbing rerouting. We understand local water pressure conditions in ${loc.district}. Our specialists near ${loc.landmarks[0] || loc.name} handle complete overhauls with a 5-year waterproofing guarantee.`,
    (loc, rand) => `Upgrade your bathroom in ${loc.name} with our complete renovation services. For apartments and homes in ${loc.district}, specifically around ${loc.landmarks[0] || loc.name}, we manage demolition, concealed plumbing, anti-skid tiling, and modern sanitary ware installation.`,
    (loc, rand) => `A luxury bathroom remodel in ${loc.name} requires specialized civil work. Operating across ${loc.zone}, we ensure your new bathroom near ${loc.landmarks[0] || loc.name} features perfect slopes, premium tile finishing, and robust leak-prevention systems that last decades.`
  ],
  'kitchen-work': [
    (loc, rand) => `Kitchen renovation in ${loc.name} combines functionality with modern design. Our teams near ${loc.landmarks[0] || loc.name} specialize in granite/quartz countertop fitting, backsplash tile work, and plumbing for modern appliances suited for ${loc.district} homes.`,
    (loc, rand) => `The kitchen is the heart of your home in ${loc.name}. We provide expert civil modifications for modular kitchen setups across ${loc.district}. From shifting electrical points to laying heavy-duty floor tiles near ${loc.landmarks[0] || loc.name}, we ensure a perfect base for your kitchen.`,
    (loc, rand) => `Planning a kitchen overhaul in ${loc.name}? Our civil contractors handle the messy work with precision. Serving the ${loc.zone} area, we prepare your space near ${loc.landmarks[0] || loc.name} with flawless plastering, granite platforms, and customized plumbing layouts.`
  ],
  'tiles-work': [
    (loc, rand) => `Professional tiles work in ${loc.name} requires laser-level precision. Our tiling specialists working near ${loc.landmarks[0] || loc.name} use diamond-cut tools and premium adhesives. Whether it's vitrified tiles or Italian marble for a project in ${loc.district}, we deliver flawless joints.`,
    (loc, rand) => `Achieve a perfect finish with our expert tiling services in ${loc.name}. We cater to residential and commercial spaces across ${loc.district}, ensuring zero hollow sounds and perfect levelling. Properties near ${loc.landmarks[0] || loc.name} trust our flawless execution.`,
    (loc, rand) => `From anti-skid bathroom tiles to grand living room marble, our tiling work in ${loc.name} is unmatched in the ${loc.zone} area. We use high-grade epoxy grouting for projects near ${loc.landmarks[0] || loc.name}, ensuring longevity and ease of maintenance.`
  ],
  'flooring-work': [
    (loc, rand) => `Flooring installation in ${loc.name} demands expertise with the material you choose. Our flooring specialists near ${loc.landmarks[0] || loc.name} begin with thorough sub-floor levelling. In ${loc.district}, we've completed numerous projects delivering mirror-smooth finishes.`,
    (loc, rand) => `Transform your floors in ${loc.name} with our premium flooring solutions. Whether you prefer Italian marble, granite, or wooden laminates in ${loc.district}, our team ensures a perfectly leveled installation. We are highly active near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Durable and aesthetic flooring is crucial for properties in ${loc.name}. Serving the ${loc.zone} belt, we handle everything from IPS flooring to high-end vitrified tile laying. Our precision work near ${loc.landmarks[0] || loc.name} guarantees a stunning result.`
  ],
  'painting': [
    (loc, rand) => `Professional painting services in ${loc.name} cover both interior and exterior surfaces. Our painters near ${loc.landmarks[0] || loc.name} begin with thorough surface preparation. In ${loc.district}, we consider the local climate to select formulations that resist peeling and dampness.`,
    (loc, rand) => `Give your property in ${loc.name} a fresh lease of life with our expert painting services. Serving the ${loc.district} region, our teams near ${loc.landmarks[0] || loc.name} apply high-quality putty, primer, and weather-resistant external paints tailored for the ${loc.zone} climate.`,
    (loc, rand) => `We provide premium interior and exterior painting in ${loc.name}. Our meticulous process ensures flawless walls for homes and offices near ${loc.landmarks[0] || loc.name}. By using top-tier brands, we ensure long-lasting vibrancy despite the humidity in ${loc.district}.`
  ],
  'waterproofing': [
    (loc, rand) => `Waterproofing in ${loc.name} is critical for protecting your property against water seepage. Our specialists near ${loc.landmarks[0] || loc.name} use multi-layer systems. Whether it's a terrace or bathroom in ${loc.district}, we deliver a 5-year leak-proof guarantee.`,
    (loc, rand) => `Stop leaks permanently with our advanced waterproofing solutions in ${loc.name}. The weather in ${loc.district} demands robust protection. We apply crystalline and membrane waterproofing for terraces and basements, especially for structures near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Don't let monsoon damage your property in ${loc.name}. We provide specialized chemical waterproofing across the ${loc.zone} region. From injection grouting to elastomeric coatings, our work near ${loc.landmarks[0] || loc.name} ensures a completely dry interior.`
  ],
};

/* ── Generate unique paragraph based on location seed ──────── */
export function generateLocalParagraph(loc: LocationData, svc: ServiceInfo): string {
  const rand = getSeededRandom(loc.slug + svc.slug + 'para');
  const generators = serviceDeepContent[svc.slug];
  
  if (generators && generators.length > 0) {
    const idx = Math.floor(rand * generators.length);
    return generators[idx](loc, rand);
  }

  // Fallback dynamic templates for missing services
  const fallbacks = [
    `AMS Civil Construction brings specialised ${svc.title.toLowerCase()} expertise to ${loc.name}, ${loc.district}. Our experienced teams near ${loc.landmarks[0] || loc.name} understand the specific construction requirements of ${loc.zone} and deliver premium results with locally sourced materials and proven techniques.`,
    `Looking for reliable ${svc.title.toLowerCase()} in ${loc.name}? We serve the entire ${loc.district} area, providing top-tier workmanship. Whether you are situated near ${loc.landmarks[0] || loc.name} or in the wider ${loc.zone} region, we ensure durable, high-quality execution tailored to local standards.`,
    `For expert ${svc.title.toLowerCase()} in ${loc.name}, AMS Civil Construction is the trusted choice. We have deep experience handling projects across ${loc.district}, particularly around ${loc.landmarks[0] || loc.name}. Our focus on quality ensures your ${loc.zone} property receives the best possible service.`
  ];
  return fallbacks[Math.floor(rand * fallbacks.length)];
}

/* ── Generate varied "why choose us" points per combo ─────── */
export function generateWhyChooseUs(loc: LocationData, svc: ServiceInfo): { title: string; desc: string }[] {
  const rand = getSeededRandom(loc.slug + svc.slug + 'why');
  const zContexts = zoneContext[loc.zone] || ['a growing region'];
  const contextStr = zContexts[Math.floor(rand * zContexts.length)];
  const nearbyList = loc.nearby.slice(0, 3).join(', ');

  const pools = {
    expertise: [
      {
        title: `Local Expertise in ${loc.name}`,
        desc: `We've been serving ${loc.name} — ${contextStr} — for years. Our teams know the municipal regulations of ${loc.district} and deliver projects that sail through approvals.`,
      },
      {
        title: `Deep Roots in ${loc.district}`,
        desc: `Our understanding of ${loc.name}'s specific architectural needs sets us apart. We source materials locally and understand the structural nuances of the ${loc.zone} area.`,
      }
    ],
    specialists: [
      {
        title: `${svc.title} Specialists`,
        desc: `Unlike general contractors, we have dedicated ${svc.title.toLowerCase()} specialists who focus exclusively on this craft. Every project near ${loc.landmarks[0] || loc.name} gets a senior supervisor.`,
      },
      {
        title: `Master Craftsmen for ${svc.title}`,
        desc: `Our team handling ${svc.title.toLowerCase()} in ${loc.name} consists of highly trained artisans and engineers. We guarantee superior finish quality for your property.`,
      }
    ],
    response: [
      {
        title: `Quick Response in ${loc.zone}`,
        desc: `With active teams across ${nearbyList}, and ${loc.name}, we respond within 24 hours for site visits. Emergency structural repairs get same-day attention.`,
      },
      {
        title: `Fast Execution in ${loc.name}`,
        desc: `We deploy localized teams from within ${loc.district} to ensure your project near ${loc.landmarks[0] || loc.name} is completed swiftly without compromising on quality.`,
      }
    ],
    pricing: [
      {
        title: 'Transparent Pricing',
        desc: `Every ${svc.title.toLowerCase()} project in ${loc.name} gets an itemized quote before we start. No hidden charges, no surprise add-ons. What we quote is what you pay.`,
      },
      {
        title: 'Fixed Rate Guarantee',
        desc: `We provide rock-solid estimates for ${svc.title.toLowerCase()} in ${loc.name}. Our detailed BOQ (Bill of Quantities) ensures you know exactly where every rupee goes.`,
      }
    ]
  };

  // Deterministically pick one from each pool
  return [
    pools.expertise[Math.floor(getSeededRandom(loc.slug + svc.slug + 'e') * pools.expertise.length)],
    pools.specialists[Math.floor(getSeededRandom(loc.slug + svc.slug + 's') * pools.specialists.length)],
    pools.response[Math.floor(getSeededRandom(loc.slug + svc.slug + 'r') * pools.response.length)],
    pools.pricing[Math.floor(getSeededRandom(loc.slug + svc.slug + 'p') * pools.pricing.length)],
  ];
}

/* ── Generate unique FAQs per combo (includes Hindi/Hinglish) ── */
export function generateFAQs(loc: LocationData, svc: ServiceInfo): { q: string; a: string }[] {
  const rand = getSeededRandom(loc.slug + svc.slug + 'faq');
  
  const pool = [
    {
      q: `What is the cost of ${svc.title.toLowerCase()} in ${loc.name}?`,
      a: `The cost of ${svc.title.toLowerCase()} in ${loc.name} (${loc.district}) varies based on area size, material grade, and design complexity. Standard projects start at ₹150/sq.ft. and premium work goes up to ₹450+/sq.ft. We provide site visits near ${loc.landmarks[0] || loc.name} (fee ₹2,000–₹3,000, fully adjustable in your final bill). Call +91 87793 91690 to book.`,
    },
    {
      q: `How long does ${svc.title.toLowerCase()} take in ${loc.name}?`,
      a: `Project timelines for ${svc.title.toLowerCase()} in ${loc.name} depend on scope. A standard residential project takes 7–30 days, while larger works can take 2–6 months. We provide a detailed milestone schedule and our ${loc.zone} teams ensure on-time delivery with weekly progress updates.`,
    },
    {
      q: `Do you serve areas near ${loc.name} for ${svc.title.toLowerCase()}?`,
      a: `Yes! Besides ${loc.name}, our ${svc.title.toLowerCase()} teams actively serve ${loc.nearby.join(', ')}. We maintain dedicated crews across ${loc.district} so you get fast response and consistent quality regardless of the exact location.`,
    },
    {
      q: `Why is AMS the best ${svc.title.toLowerCase()} contractor in ${loc.name}?`,
      a: `AMS Civil Construction has 25+ years of construction expertise, 350+ completed projects, and a 4.9/5 client satisfaction rating. In ${loc.name}, we combine deep local knowledge of ${loc.district} building codes with premium materials and skilled craftsmen. Our ${loc.pincode ? `teams near PIN ${loc.pincode}` : `local teams`} are available for same-week site visits.`,
    },
    {
      q: `${loc.name} mein ${svc.title.toLowerCase()} ka rate kya hai?`,
      a: `${loc.name} mein ${svc.title.toLowerCase()} ka rate project ke size aur material pe depend karta hai. Standard kaam ₹150/sq.ft. se shuru hota hai aur premium quality ka ₹450+/sq.ft. tak jata hai. Exact rate ke liye AMS Civil Construction ko call karein: +91 87793 91690. Hum ${loc.name} mein site visit provide karte hain (fee ₹2,000–₹3,000, final bill mein adjustable).`,
    },
    {
      q: `${loc.name} mein best ${svc.title.toLowerCase()} contractor kaun hai?`,
      a: `${loc.name} aur ${loc.district} mein AMS Civil Construction sabse trusted ${svc.title.toLowerCase()} contractor hai. 25+ saal ka experience, 350+ completed projects, aur 4.9/5 rating. Hum ${loc.nearby.slice(0, 3).join(', ')} mein bhi service dete hain. Abhi call karein: +91 87793 91690.`,
    },
    {
      q: `What warranty does AMS provide for ${svc.title.toLowerCase()} in ${loc.name}?`,
      a: `AMS Civil Construction provides a comprehensive 1-year workmanship warranty on all ${svc.title.toLowerCase()} projects in ${loc.name}. Waterproofing work comes with a 5-year guarantee. All materials used carry manufacturer warranties. We also offer post-completion support for any maintenance needs.`,
    },
    {
      q: `Can I get an estimate for ${svc.title.toLowerCase()} near ${loc.landmarks[0] || loc.name}?`,
      a: `Absolutely. We offer site visits and detailed estimations for properties near ${loc.landmarks[0] || loc.name} and across ${loc.district} (fee ₹2,000–₹3,000, adjustable in final bill). Our supervisor will measure the area and discuss material choices with you directly on-site.`,
    }
  ];

  // Deterministically shuffle the pool and pick 4
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(getSeededRandom(loc.slug + svc.slug + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Ensure at least one Hindi FAQ is included if we're in Maharashtra/Hindi belt
  // For simplicity, just return the first 4 of the seeded shuffled array.
  return shuffled.slice(0, 4);
}
