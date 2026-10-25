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
  'building-repair-work': [
    (loc, rand) => `Building repair and structural restoration in ${loc.name} requires certified civil engineers experienced in handling aged concrete and monsoon weather distress. Operating across ${loc.district}, our crews near ${loc.landmarks[0] || loc.name} perform non-destructive concrete tests, polymer mortar crack filling, column jacketing, and external structural rehabilitation to ensure your building remains solid and safe for decades.`,
    (loc, rand) => `Keep your residential society or commercial complex in ${loc.name} compliant and structurally sound with our comprehensive building repair services. Serving the ${loc.zone} belt, we remediate structural cracks, rebar corrosion, and water ingress around ${loc.landmarks[0] || loc.name}. All repair work is executed under senior civil supervision with rigorous quality audits.`,
    (loc, rand) => `From external plaster restoration to complete structural strengthening in ${loc.name}, AMS Civil Construction is the trusted choice across ${loc.district}. We provide itemized structural audit estimates for housing societies near ${loc.landmarks[0] || loc.name}, delivering long-lasting structural integrity with guaranteed materials.`
  ],
  'wall-work': [
    (loc, rand) => `Expert wall construction and masonry in ${loc.name} demands laser-aligned precision and resilient bonding. Whether you need AAC block partition walls, natural stone cladding, or decorative brickwork for properties near ${loc.landmarks[0] || loc.name}, our skilled masons in ${loc.district} ensure durable, vibration-resistant results.`,
    (loc, rand) => `Upgrade your interior or exterior walls in ${loc.name} with our specialized wall treatments. From damp-proof base coats to Italian textured finishes around ${loc.landmarks[0] || loc.name}, we provide complete wall civil solutions tailored to the ${loc.zone} environment.`,
    (loc, rand) => `Strong, crack-resistant walls are the backbone of every durable building in ${loc.name}. We construct internal room dividers, boundary walls, and designer feature facades across ${loc.district}. Count on our team near ${loc.landmarks[0] || loc.name} for high-grade mortar mixing and flawless alignment.`
  ],
  'pop-work': [
    (loc, rand) => `Elevate your living spaces with designer Plaster of Paris (POP) false ceilings in ${loc.name}. Our master artisans craft intricate ceiling profiles, cove lighting troughs, and decorative cornices for luxury homes and offices near ${loc.landmarks[0] || loc.name}. We use crack-resistant, genuine Gyproc/Saint-Gobain plaster formulations suited for ${loc.district}.`,
    (loc, rand) => `Transform ordinary rooms into architectural statements with custom POP work in ${loc.name}. Serving the ${loc.zone} region, our ceiling specialists create sleek minimalist designs, acoustic baffles, and LED channel integrations for flats and villas near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Looking for pristine, seamless false ceiling execution in ${loc.name}? We handle everything from heavy-gauge GI framing to mirror-smooth POP finishing across ${loc.district}. Our team near ${loc.landmarks[0] || loc.name} ensures clean, quick installation with zero ceiling sag guarantee.`
  ],
  'plaster-work': [
    (loc, rand) => `Flawless plastering in ${loc.name} is the essential canvas for paint and wallpaper. Our plastering teams in ${loc.district} deliver sand-faced external cement plastering with proper water-curing, as well as super-smooth internal gypsum plastering for properties near ${loc.landmarks[0] || loc.name}, preventing hairline cracks permanently.`,
    (loc, rand) => `Whether it is repairing peeling external walls or preparing interior surfaces in ${loc.name}, AMS Civil Construction delivers superior plaster finishes across ${loc.zone}. We use polymer-modified admixtures for buildings near ${loc.landmarks[0] || loc.name} to withstand seasonal temperature variations.`,
    (loc, rand) => `Get perfectly plumbed, 90-degree right-angled walls with our professional plastering services in ${loc.name}. Trusted by developers and homeowners in ${loc.district}, our plasterers near ${loc.landmarks[0] || loc.name} adhere strictly to multi-coat application and curing standards.`
  ],
  'modular-kitchen': [
    (loc, rand) => `Design your dream modular kitchen in ${loc.name} with marine-grade waterproof BWP plywood and premium German hardware from Hafele and Hettich. Operating across ${loc.district}, we specialize in space-efficient L-shaped, U-shaped, and parallel kitchen layouts customized for properties near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `A modern modular kitchen in ${loc.name} should seamlessly blend ergonomics with high durability for Indian cooking. Our turnkey installations in ${loc.zone} include custom quartz countertops, soft-close tandem boxes, and integrated chimney exhaust routing near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Upgrade to a luxury modular kitchen in ${loc.name} with complete civil prep. We manage plumbing line shifting, electrical power socket additions, and anti-stain tile backsplashes for apartments near ${loc.landmarks[0] || loc.name}, all delivered with a 10-year hardware warranty.`
  ],
  'hall-design': [
    (loc, rand) => `Create an unforgettable first impression with bespoke hall and living room design in ${loc.name}. Our civil interior team in ${loc.district} builds custom floating TV media consoles, designer acoustic paneling, and Italian marble flooring for premium residences near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Living room civil renovations in ${loc.name} require a master touch. We specialize in open-concept living-dining integrations, multi-tiered POP ceilings with smart mood lighting, and stone veneer accents for apartments throughout ${loc.zone}, especially around ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `From space-planning to luxury finishing, our hall design services in ${loc.name} elevate the heart of your home. We coordinate all base civil restructuring, hidden cable conduits, and floor leveling across ${loc.district} for flawless execution near ${loc.landmarks[0] || loc.name}.`
  ],
  'bedroom-remodeling': [
    (loc, rand) => `Turn your bedroom in ${loc.name} into a serene, private sanctuary. Our bedroom remodeling specialists in ${loc.district} provide complete civil upgrades including wardrobe masonry framing, soundproof door installations, concealed air-conditioning ducting, and attached bathroom renovations near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Optimize your bedroom layout in ${loc.name} with space-efficient civil alterations. From wooden laminate flooring to acoustic wall paneling and indirect cove lighting, we craft restful master bedrooms tailored to properties in ${loc.zone} near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Revitalize your bedroom in ${loc.name} with turnkey civil craftsmanship. We manage demolition of outdated fixtures, wall damp-proofing, and custom bedside feature walls for homes near ${loc.landmarks[0] || loc.name}, keeping the workspace clean and dust-managed.`
  ],
  'interior-design': [
    (loc, rand) => `Experience bespoke turnkey interior design and civil fit-outs in ${loc.name}. We integrate 3D architectural visualization with precise structural masonry, premium flooring, and custom modular woodwork across ${loc.district}. Our team works with elite homeowners near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `From raw shell to ready-to-move luxury home, our turnkey interior design in ${loc.name} eliminates all coordination stress. Serving ${loc.zone}, we handle demolition, electrical planning, plumbing, ceiling design, and Italian marble polishing near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Exceptional interior design in ${loc.name} begins with solid civil engineering. AMS Civil Construction delivers impeccably finished residential and commercial interiors in ${loc.district}, ensuring your space near ${loc.landmarks[0] || loc.name} is functional, stunning, and on schedule.`
  ],
  '1bhk-2bhk-renovation': [
    (loc, rand) => `Maximize every square foot of your 1BHK or 2BHK flat in ${loc.name} with our specialized space-optimization renovation packages. We manage smart kitchen expansion, compact bathroom overhauls, vitrified tile laying, and POP ceilings for housing complexes across ${loc.district} near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Renovating a 1BHK or 2BHK in ${loc.name} requires quick turnaround and zero disruption to neighbors. Our agile crews in ${loc.zone} complete turnkey civil transformations within 21 to 35 days near ${loc.landmarks[0] || loc.name}, delivering high-end aesthetics on a transparent budget.`,
    (loc, rand) => `Give your compact apartment in ${loc.name} a complete modern makeover. From internal non-loadbearing wall adjustments to complete rewiring and waterproof bathroom remodeling, we cater to families in ${loc.district} living near ${loc.landmarks[0] || loc.name}.`
  ],
  '3bhk-4bhk-luxury-interiors': [
    (loc, rand) => `For expansive 3BHK, 4BHK, and duplex penthouses in ${loc.name}, AMS Civil Construction delivers ultra-luxury civil interiors. Our master stonecraft artisans lay book-matched imported Italian marble, install multi-zone acoustic false ceilings, and craft bespoke ensuite bathrooms across ${loc.district} near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Luxury residential interiors in ${loc.name} demand uncompromising perfection and white-glove project management. We serve high-net-worth homeowners across ${loc.zone}, overseeing structural fit-outs, smart automation civil conduit routing, and designer finishes near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Elevate your spacious 3BHK or 4BHK residence in ${loc.name} with turnkey luxury craftsmanship. With dedicated senior architects and structural engineers deployed across ${loc.district}, we ensure your residence near ${loc.landmarks[0] || loc.name} achieves international standards of refinement.`
  ],
  'terrace-renovation': [
    (loc, rand) => `Transform your exposed terrace in ${loc.name} into an elegant roof garden or outdoor entertainment deck while ensuring 100% leak-proof security. Our specialized terrace renovation teams in ${loc.district} apply elastomeric fiber-reinforced membranes, slope corrective screeding, and cool-roof heat-reflective tiles near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Stop terrace seepage permanently in ${loc.name} with our certified civil solutions. Serving ${loc.zone}, we build waterproof parapet walls, install brickbat coba or polyurethane waterproof coatings, and lay weather-proof vitrified outdoor pavers for properties near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Upgrade your rooftop in ${loc.name} with modern pergolas, waterproof planters, and non-slip tiles. We protect buildings across ${loc.district} from harsh monsoons and intense sun, backed by a written 5-year leak-proof warranty for projects near ${loc.landmarks[0] || loc.name}.`
  ],
  'simple-kitchen-work': [
    (loc, rand) => `Looking for a sturdy, traditional kitchen built to withstand heavy daily use in ${loc.name}? We construct robust Kadappa stone-supported kitchen platforms with polished black or brown granite countertops, deep stainless steel sink fittings, and easy-clean ceramic wall tiles across ${loc.district} near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Simple kitchen civil work in ${loc.name} provides unmatched durability at an affordable cost. Our experienced masons in ${loc.zone} install solid masonry counters, concealed plumbing lines, and anti-skid flooring for rental homes and residences near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Get a hygienic, long-lasting kitchen platform in ${loc.name} built within days. AMS Civil Construction provides cost-effective granite and masonry kitchen remodeling across ${loc.district}, ensuring durable workmanship for homes near ${loc.landmarks[0] || loc.name}.`
  ],
  'gym-renovation': [
    (loc, rand) => `Commercial and residential gym renovations in ${loc.name} require specialized civil reinforcement to handle heavy weight drops and high impact. In ${loc.district}, we install high-density shock-absorbing rubber gym flooring, acoustic sound-deadening wall partitions, and reinforced mirror wall framing near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Modernize your fitness center in ${loc.name} with complete civil and interior refurbishment. Our team in ${loc.zone} reconfigures locker rooms, builds luxury shower facilities with advanced waterproofing, and handles heavy HVAC civil ducting near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Turn any space into a high-performance training facility in ${loc.name}. We provide specialized civil floor leveling, industrial-grade electrical wiring for cardio equipment, and moisture-resistant wall coatings for fitness centers in ${loc.district} near ${loc.landmarks[0] || loc.name}.`
  ],
  'new-gym-construction': [
    (loc, rand) => `Setting up a new commercial gym in ${loc.name}? AMS Civil Construction provides turnkey civil construction from raw commercial floor to grand opening. In ${loc.district}, we engineer structural floor load distribution for heavy selectorized machines, cardio zones, and CrossFit turf areas near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Build an industry-leading fitness center in ${loc.name} with customized zoning for weights, functional training, luxury changing rooms, and wellness steam rooms. Serving ${loc.zone}, our civil crews manage all plumbing, heavy electrical panels, and sound isolation near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `End-to-end gym civil construction in ${loc.name} executed with speed and durability. We handle structural modifications, reception desk masonry, and high-impact rubberized installations across ${loc.district} for gym owners near ${loc.landmarks[0] || loc.name}.`
  ],
  'office-renovation': [
    (loc, rand) => `Revamp your corporate workspace in ${loc.name} to foster productivity and modern collaboration. We provide turnkey commercial office civil renovations across ${loc.district}, including acoustic glass partitioning, commercial modular carpet flooring, ceiling grids, and data server room civil framing near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Fast-track office renovations in ${loc.name} with zero operational downtime. Our teams in ${loc.zone} execute night-shift and weekend civil works for IT parks and commercial buildings near ${loc.landmarks[0] || loc.name}, delivering clean, immaculate handovers on strict deadlines.`,
    (loc, rand) => `From executive boardrooms to modern open workstations, we deliver high-spec commercial civil renovations in ${loc.name}. We upgrade electrical conduits, install fire-resistant ceiling systems, and modernize pantry facilities across ${loc.district} near ${loc.landmarks[0] || loc.name}.`
  ],
  'new-office-construction': [
    (loc, rand) => `Building a new corporate headquarters or branch office in ${loc.name}? AMS Civil Construction manages turnkey commercial construction from bare-shell fit-out to complete ready-to-occupy handover. We handle heavy power distributions, server room fireproofing, and acoustic zoning across ${loc.district} near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Execute your new office build in ${loc.name} with top-tier civil contracting. Serving commercial hubs across ${loc.zone}, we engineer durable floor leveling, structural mezzanine additions, and prestige reception areas for corporate clients near ${loc.landmarks[0] || loc.name}.`,
    (loc, rand) => `Scale your business in ${loc.name} with a custom-built, future-ready office. We coordinate all civil engineering, municipal fire-safety standards, HVAC ducting, and luxury executive suites across ${loc.district} near ${loc.landmarks[0] || loc.name}.`
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
      a: `The cost of ${svc.title.toLowerCase()} in ${loc.name} (${loc.district}) varies based on area size, material grade, and design complexity. Standard projects start at ₹150/sq.ft. and premium work goes up to ₹450+/sq.ft. We provide site visits near ${loc.landmarks[0] || loc.name} (100% Free under Diwali Offer till 15 Nov; nominal visit fee applicable post offer, adjustable in bill). Call +91 87793 91690 to book.`,
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
      a: `AMS Civil Construction has 10+ years of construction expertise, 200+ completed projects, and a 4.9/5 client satisfaction rating. In ${loc.name}, we combine deep local knowledge of ${loc.district} building codes with premium materials and skilled craftsmen. Our ${loc.pincode ? `teams near PIN ${loc.pincode}` : `local teams`} are available for same-week site visits.`,
    },
    {
      q: `${loc.name} mein ${svc.title.toLowerCase()} ka rate kya hai?`,
      a: `${loc.name} mein ${svc.title.toLowerCase()} ka rate project ke size aur material pe depend karta hai. Standard kaam ₹150/sq.ft. se shuru hota hai aur premium quality ka ₹450+/sq.ft. tak jata hai. Exact rate ke liye AMS Civil Construction ko call karein: +91 87793 91690. Hum ${loc.name} mein site visit provide karte hain (Diwali Offer ke tahat 100% Free till 15 Nov; post offer nominal fee bill mein adjustable hoti hai).`,
    },
    {
      q: `${loc.name} mein best ${svc.title.toLowerCase()} contractor kaun hai?`,
      a: `${loc.name} aur ${loc.district} mein AMS Civil Construction sabse trusted ${svc.title.toLowerCase()} contractor hai. 10+ saal ka experience, 200+ completed projects, aur 4.9/5 rating. Hum ${loc.nearby.slice(0, 3).join(', ')} mein bhi service dete hain. Abhi call karein: +91 87793 91690.`,
    },
    {
      q: `What warranty does AMS provide for ${svc.title.toLowerCase()} in ${loc.name}?`,
      a: `AMS Civil Construction provides a comprehensive 1-year workmanship warranty on all ${svc.title.toLowerCase()} projects in ${loc.name}. Waterproofing work comes with a 5-year guarantee. All materials used carry manufacturer warranties. We also offer post-completion support for any maintenance needs.`,
    },
    {
      q: `Can I get an estimate for ${svc.title.toLowerCase()} near ${loc.landmarks[0] || loc.name}?`,
      a: `Absolutely. We offer site visits and detailed estimations for properties near ${loc.landmarks[0] || loc.name} and across ${loc.district} (100% Free Diwali Offer till 15 Nov; nominal visit fee applicable post offer, adjustable in bill). Our supervisor will measure the area and discuss material choices with you directly on-site.`,
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
