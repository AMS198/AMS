// src/data/siteData.ts
// Central data store for services, projects, testimonials, FAQs.
// In production this would come from MongoDB via API routes.

/* ─────────────────────────────────────────────────────────────── */
/*  TYPE DEFINITIONS                                              */
/* ─────────────────────────────────────────────────────────────── */

export interface Service {
  id: string;
  title: string;
  slug: string;
  icon: string;          // Lucide icon name
  shortDesc: string;
  description: string;
  benefits: string[];
  image: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  status: 'ongoing' | 'completed';
  category: string;
  location: string;
  description: string;
  images: string[];
  completedDate?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  avatar: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

/* ─────────────────────────────────────────────────────────────── */
/*  SERVICES                                                      */
/* ─────────────────────────────────────────────────────────────── */

export const services: Service[] = [
  {
    id: '1',
    title: 'Bungalow Construction',
    slug: 'bungalow-construction',
    icon: 'Home',
    shortDesc: 'End-to-end bungalow construction and all related civil work.',
    description:
      'We offer comprehensive bungalow construction and turnkey turnkey civil solutions. From foundation to roof, including structural planning, RCC work, infrastructure, and all related civil requirements, we handle everything under one roof. Our team ensures your bungalow is built to the highest standards with all infrastructural needs met.',
    benefits: [
      'Turnkey civil & infrastructural solutions',
      'Municipal-approved design & structural drawings',
      'Premium quality materials with warranty',
      'Dedicated project manager assigned',
      'On-time delivery guarantee',
    ],
    image: '/images/bungalow-construction.jpg',
  },
  {
    id: '9',
    title: 'Full Interior Civil Work',
    slug: 'full-interior-work',
    icon: 'LayoutTemplate',
    shortDesc: 'Complete interior transformations and structural fit-outs.',
    description:
      'Our full interior civil services cover everything from internal wall partitioning and structural changes to complete finishing. We manage demolition, debris removal, new wall construction, and all base-level civil requirements for luxury interiors.',
    benefits: [
      'Comprehensive structural interior changes',
      'Expert debris management & site prep',
      'High-precision wall & ceiling work',
      'Seamless integration with designers',
    ],
    image: '/images/interior-work.jpg',
  },
  {
    id: '10',
    title: 'Swimming Pool Work',
    slug: 'swimming-pool-work',
    icon: 'Waves',
    shortDesc: 'Professional RCC swimming pool construction & waterproofing.',
    description:
      'We specialise in the construction of designer swimming pools, including excavation, RCC structure, advanced waterproofing, and premium tile/marble finishing. We ensure a leak-proof, durable pool structure with high-quality filtration systems.',
    benefits: [
      'Specialised multi-layer waterproofing',
      'RCC structural leak-proof guarantee',
      'Premium glass & mosaic tile finishing',
      'End-to-end filtration & plumbing setup',
    ],
    image: '/images/swimming-pool.jpg',
  },
  {
    id: '11',
    title: 'Compound Wall & Gates',
    slug: 'compound-wall-work',
    icon: 'Fence',
    shortDesc: 'Secure RCC compound walls and designer entry gates.',
    description:
      'Protect your property with strong RCC compound walls and custom-designed entry gates. We handle foundation work, stone/brick masonry, professional plastering, and gate installation with a focus on security and aesthetics.',
    benefits: [
      'Strong RCC foundations for walls',
      'Custom designer gate installations',
      'Perimeter security enhancements',
      'Weather-resistant external finishes',
    ],
    image: '/images/compound-wall-real.jpg',
  },
  {
    id: '12',
    title: 'Repair & Restoration',
    slug: 'building-repair-work',
    icon: 'Hammer',
    shortDesc: 'Structural repairs, crack filling & building maintenance.',
    description:
      'We provide essential building repair and restoration services, including structural strengthening, external plaster repair, crack filling, and damp-proofing. Extend the life of your property with our expert maintenance solutions.',
    benefits: [
      'Structural integrity assessments',
      'High-grade crack filling & sealing',
      'External building restoration',
      'Corrosion & damp-proof treatments',
    ],
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
  },
  {
    id: '2',
    title: 'Bathroom Renovation',
    slug: 'bathroom-renovation',
    icon: 'Bath',
    shortDesc: 'Transform your bathroom with modern design & waterproofing.',
    description:
      'Our bathroom renovation specialists handle complete remodelling including waterproofing, tiles, sanitary fixtures, plumbing, false ceilings, and lighting. We create spa-like spaces that are functional, stylish, and durable.',
    benefits: [
      'Expert waterproofing with 5-year guarantee',
      'Wide selection of tiles & fixtures',
      'Plumbing & electrical included',
      'Dust-free work process',
      'Completed within 7–14 days',
    ],
    image: '/images/bathroom-renovation.jpg',
  },
  {
    id: '3',
    title: 'Tiles Work',
    slug: 'tiles-work',
    icon: 'Grid3X3',
    shortDesc: 'Expert tile laying for floors, walls & feature areas.',
    description:
      'Our skilled tilesetters work with vitrified, ceramic, marble, natural stone, and mosaic tiles. From complex patterns to simple grids, we deliver precise, gap-free installations with premium grout and adhesives.',
    benefits: [
      'Precise laser-level alignment',
      'All tile types & sizes supported',
      'Premium weatherproof grout',
      'Both residential & commercial',
      'Minimum wastage guarantee',
    ],
    image: '/images/tiles-work.jpg',
  },
  {
    id: '4',
    title: 'Kitchen Work',
    slug: 'kitchen-work',
    icon: 'ChefHat',
    shortDesc: 'Modular kitchens & full kitchen renovation services.',
    description:
      'From modular kitchen installations to complete kitchen remodels, we handle cabinetry, countertops, backsplash tiles, plumbing, electrical, and chimney/hood fitting. Create your dream kitchen within budget.',
    benefits: [
      'Modular & semi-modular options',
      'Premium hardware & soft-close fittings',
      'Custom countertop materials',
      'Integrated appliance planning',
      '3D design preview before work starts',
    ],
    image: '/images/kitchen-work.jpg',
  },
  {
    id: '5',
    title: 'Flooring Work',
    slug: 'flooring-work',
    icon: 'Layers',
    shortDesc: 'Flawless flooring in marble, granite, vitrified & more.',
    description:
      'We lay all types of flooring — marble, granite, vitrified tiles, wooden laminates, epoxy, and IPS cement flooring. Our team ensures a perfectly level base, strong adhesion, and a smooth flawless finish.',
    benefits: [
      'Level base preparation included',
      'All materials available',
      'Anti-skid treatment optional',
      'Seamless joins & edges',
      'Polishing & sealing finish',
    ],
    image: '/images/flooring-work.jpg',
  },
  {
    id: '6',
    title: 'Wall Work',
    slug: 'wall-work',
    icon: 'Paintbrush',
    shortDesc: 'Textured finishes, stone cladding & premium wall treatments.',
    description:
      'Our wall specialists provide brick cladding, stone veneers, textured paints, dado tiles, wall putty and premium interior/exterior paint finishes. Elevate any room with statement walls that last.',
    benefits: [
      'Interior & exterior finishes',
      'Natural & manufactured stone options',
      'Texture paint by trained artists',
      'Damp-proof treatments',
      'Quick turnaround – no disruption',
    ],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80',
  },
  {
    id: '7',
    title: 'POP Work',
    slug: 'pop-work',
    icon: 'Sparkles',
    shortDesc: 'Creative Plaster of Paris false ceilings & cornices.',
    description:
      'Our POP artists craft intricate false ceilings, cornice mouldings, dome features, partition walls, and decorative elements in Plaster of Paris. Add elegance and conceal wiring with beautifully finished POP work.',
    benefits: [
      'Custom ceiling designs',
      'LED cove lighting integration',
      'Crack-resistant formulations',
      'Smooth paint-ready surfaces',
      'Quick installation process',
    ],
    image: '/images/pop-work.jpg',
  },
  {
    id: '8',
    title: 'Plaster Work',
    slug: 'plaster-work',
    icon: 'Wrench',
    shortDesc: 'Internal & external plastering with a perfect finish.',
    description:
      'We apply internal sand plaster, gypsum plaster, and external cement plastering with proper curing to ensure strong adhesion, smooth surfaces, and long-term resistance to cracks. The foundation of a beautiful finish.',
    benefits: [
      'Internal & external plaster',
      'Gypsum & cement plaster options',
      'Proper curing process followed',
      'Crack-free guarantee',
      'Ready-to-paint finish',
    ],
    image: '/images/plaster-work.jpg',
  },
  {
    id: '13',
    title: 'Painting Work',
    slug: 'painting',
    icon: 'Paintbrush',
    shortDesc: 'Interior & exterior painting with premium paint brands.',
    description:
      'Our professional painting services cover both interior and exterior surfaces. We use premium paints from Asian Paints, Berger, and Nerolac for long-lasting, vibrant finishes. From texture painting and stencil work to waterproof exterior coats, we handle all painting requirements with precision and clean execution.',
    benefits: [
      'Premium paint brands (Asian Paints, Berger, Nerolac)',
      'Interior & exterior painting expertise',
      'Texture, stencil & designer wall painting',
      'Proper surface preparation & priming',
      'Clean, dust-free execution process',
    ],
    image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=800&q=80',
  },
  {
    id: '14',
    title: 'Waterproofing',
    slug: 'waterproofing',
    icon: 'Wrench',
    shortDesc: 'Advanced waterproofing for terraces, bathrooms & basements.',
    description:
      'We provide multi-layer waterproofing solutions for terraces, bathrooms, basements, and water tanks. Using industry-leading products from Dr. Fixit, Fosroc, and SikaFlex, we ensure complete protection against seepage and dampness. Our waterproofing comes with a 5-year leak-proof guarantee.',
    benefits: [
      '5-year leak-proof guarantee',
      'Multi-layer waterproofing systems',
      'Premium products (Dr. Fixit, Fosroc, Sika)',
      'Terrace, bathroom & basement specialisation',
      'Post-application inspection & testing',
    ],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
  {
    id: '15',
    title: 'Modular Kitchen',
    slug: 'modular-kitchen',
    icon: 'ChefHat',
    shortDesc: 'Custom modular kitchens with smart storage and premium finish.',
    description:
      'We design and install high-quality modular kitchens tailored to your cooking style. Complete with smart storage pull-outs, soft-close hinges, quartz countertops, and seamless chimney integration.',
    benefits: [
      'Custom 3D design & planning',
      'Marine-grade waterproof plywood',
      'Premium Hettich/Hafele hardware',
      'Stain-resistant quartz countertops',
      'Factory-finish seamless edges',
    ],
    image: '/images/kitchen-work.jpg',
  },
  {
    id: '16',
    title: 'Hall Design',
    slug: 'hall-design',
    icon: 'LayoutTemplate',
    shortDesc: 'Luxury hall and living room design with POP & lighting.',
    description:
      'Transform your hall into a luxurious living space. We handle TV unit civil work, POP false ceilings with cove lighting, premium marble flooring, and elegant wall textures for a grand entrance.',
    benefits: [
      'Custom TV unit & showcase framing',
      'Designer POP false ceilings',
      'Ambient & mood lighting setup',
      'Premium wall textures & wallpaper',
      'Italian marble laying & polishing',
    ],
    image: '/images/interior-work.jpg',
  },
  {
    id: '17',
    title: 'Bedroom Remodeling',
    slug: 'bedroom-remodeling',
    icon: 'Bed',
    shortDesc: 'Complete bedroom makeovers and civil remodeling.',
    description:
      'Turn your bedroom into a relaxing retreat. We provide complete remodeling including wardrobe civil framing, attached bathroom renovation, false ceilings, and wooden or vitrified flooring.',
    benefits: [
      'Wardrobe & storage civil framing',
      'Attached bathroom overhauls',
      'Wooden laminate flooring',
      'Soundproofing & insulation',
      'Relaxing ambient lighting',
    ],
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
  },
  {
    id: '18',
    title: 'Interior Design',
    slug: 'interior-design',
    icon: 'Sparkles',
    shortDesc: 'End-to-end luxury interior design & execution.',
    description:
      'A complete turnkey interior design service. We conceptualize the layout, select the themes, and our civil team executes the structural changes, false ceilings, flooring, and finishing to perfection.',
    benefits: [
      'Turnkey design to execution',
      'Space planning & optimization',
      'Premium material selection',
      'Dedicated project manager',
      'On-time handover',
    ],
    image: '/images/interior-work.jpg',
  },
  {
    id: '19',
    title: '1BHK & 2BHK Renovation',
    slug: '1bhk-2bhk-renovation',
    icon: 'Home',
    shortDesc: 'Smart, space-saving complete civil and interior remodeling for 1BHK & 2BHK flats.',
    description:
      'Optimize your 1BHK or 2BHK apartment with our smart renovation services. We handle everything from space-saving civil alterations, flooring, and modular kitchens to complete painting and electrical upgrades.',
    benefits: [
      'Space-saving civil planning',
      'Quick project completion',
      'Smart storage solutions',
      'Affordable complete packages',
      'Zero-hassle turnkey execution',
    ],
    image: '/images/interior-work.jpg',
  },
  {
    id: '20',
    title: '3BHK & 4BHK Luxury Interiors',
    slug: '3bhk-4bhk-luxury-interiors',
    icon: 'Sparkles',
    shortDesc: 'Premium end-to-end luxury civil and interior work for large 3BHK & 4BHK homes.',
    description:
      'We bring luxury and grandeur to large 3BHK, 4BHK, and 5BHK apartments. From Italian marble flooring and intricate POP false ceilings to high-end bathroom remodels and custom modular kitchens, we deliver perfection.',
    benefits: [
      'High-end Italian marble laying',
      'Custom luxury false ceilings',
      'Premium bathroom makeovers',
      'Advanced smart-home wiring',
      'Dedicated senior project manager',
    ],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  },
  {
    id: '21',
    title: 'Terrace Renovation & Roofing',
    slug: 'terrace-renovation',
    icon: 'Sun',
    shortDesc: 'Terrace waterproofing, tiling, and complete roof makeovers.',
    description:
      'Transform your terrace into a usable, beautiful space while protecting your home from leaks. We provide multi-layer terrace waterproofing, heat-reflective tiling, and custom civil roofing solutions.',
    benefits: [
      '5-Year leak-proof guarantee',
      'Heat-reflective terrace tiles',
      'Slope alignment for drainage',
      'Crack filling & polymer coating',
      'Usable roof-garden civil prep',
    ],
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
  },
  {
    id: '22',
    title: 'Simple Kitchen Civil Work',
    slug: 'simple-kitchen-work',
    icon: 'ChefHat',
    shortDesc: 'Traditional and simple kitchen setups with granite and Kadappa stone.',
    description:
      'Not looking for modular? We build highly durable, traditional, and simple kitchens using Kadappa vertical supports, strong granite countertops, and basic tiling tailored to heavy Indian cooking.',
    benefits: [
      'Heavy-duty Kadappa stone base',
      'Premium granite countertop',
      'Easy-to-clean backsplash tiles',
      'Strong plumbing for sinks',
      'Highly affordable and durable',
    ],
    image: '/images/kitchen-work.jpg',
  },
  {
    id: '23',
    title: 'Gym Renovation',
    slug: 'gym-renovation',
    icon: 'Wrench',
    shortDesc: 'Complete civil and interior remodeling for commercial and home gyms.',
    description:
      'We upgrade and renovate existing gyms with heavy-duty civil work. From sound-proofing and rubberized flooring for heavy weights, to mirrored walls, proper ventilation, and locker room makeovers.',
    benefits: [
      'Heavy-duty rubber flooring',
      'Wall-to-wall mirror installation',
      'Acoustic and soundproofing work',
      'Locker room & bathroom overhaul',
      'High-grade electrical & HVAC prep',
    ],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
  },
  {
    id: '24',
    title: 'New Gym Construction',
    slug: 'new-gym-construction',
    icon: 'Building2',
    shortDesc: 'Turnkey civil construction for new commercial fitness centers.',
    description:
      'Starting a new gym? We provide end-to-end turnkey civil construction tailored for fitness centers. We handle structural reinforcement for heavy machines, custom layouts for cardio/weight sections, reception areas, and specialized plumbing for spa/shower facilities.',
    benefits: [
      'Structural reinforcement for weights',
      'Custom zoning (Cardio, Weights, Spa)',
      'Reception & juice bar civil work',
      'Premium locker room construction',
      'Turnkey handover',
    ],
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80',
  },
  {
    id: '25',
    title: 'Office Renovation',
    slug: 'office-renovation',
    icon: 'Briefcase',
    shortDesc: 'Modernize your workspace with professional office remodeling.',
    description:
      'We upgrade and renovate existing offices to create a modern, productive workspace. Our services cover everything from acoustic ceilings and glass partitions to ergonomic electrical setups and premium carpeting or vitrified flooring.',
    benefits: [
      'Modern glass partitions & cabins',
      'Acoustic false ceilings',
      'Ergonomic electrical & networking',
      'Carpet & premium vitrified flooring',
      'Quick execution with minimal downtime',
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
  {
    id: '26',
    title: 'New Office Construction',
    slug: 'new-office-construction',
    icon: 'Building',
    shortDesc: 'Turnkey civil and interior build-out for new corporate offices.',
    description:
      'Setting up a new commercial space? We provide complete turnkey civil and interior construction for new offices. From bare-shell civil preparation to high-end corporate interiors, reception design, and HVAC/networking integration.',
    benefits: [
      'Bare-shell to fully-furnished turnkey',
      'Custom reception & boardroom design',
      'Complete HVAC & networking integration',
      'Commercial grade plumbing & washrooms',
      'Dedicated project management',
    ],
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80',
  },
];

/* ─────────────────────────────────────────────────────────────── */
/*  PROJECTS                                                      */
/* ─────────────────────────────────────────────────────────────── */

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Sharma Residence – Bungalow',
    slug: 'sharma-residence',
    status: 'completed',
    category: 'Bungalow Construction',
    location: 'Borivali West, Mumbai',
    description:
      'A 2,400 sq.ft. ground + 1 floor bungalow with premium finishes, modular kitchen, 3 bathrooms, and a garden terrace. Completed in 11 months.',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    ],
    completedDate: 'December 2023',
  },
  {
    id: 'p2',
    title: 'Mehta Apartment – Full Interior',
    slug: 'mehta-apartment',
    status: 'completed',
    category: 'Interior Work',
    location: 'Andheri East, Mumbai',
    description:
      'Complete 3BHK interior including modular kitchen, 2 bathroom renovations, custom wardrobes, POP ceilings, and Italian marble flooring.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
    ],
    completedDate: 'March 2024',
  },
  {
    id: 'p3',
    title: 'Patel Kitchen Renovation',
    slug: 'patel-kitchen',
    status: 'completed',
    category: 'Kitchen Work',
    location: 'Kandivali East, Mumbai',
    description:
      'Modern L-shaped modular kitchen with quartz countertops, anti-skid floor tiles, backsplash tiles, and integrated chimney & hob.',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    ],
    completedDate: 'August 2024',
  },
  {
    id: 'p4',
    title: 'Gupta Villa – New Construction',
    slug: 'gupta-villa',
    status: 'ongoing',
    category: 'Bungalow Construction',
    location: 'Mira Road, Mumbai',
    description:
      'A G+2 villa spanning 3,600 sq.ft. with premium limestone facade, roof garden, home theatre, and 4-car parking. 65% complete.',
    images: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
    ],
  },
  {
    id: 'p5',
    title: 'Desai Bathroom Suite',
    slug: 'desai-bathroom',
    status: 'completed',
    category: 'Bathroom Renovation',
    location: 'Thane West',
    description:
      'Luxury master bathroom with Italian marble, rainfall shower, freestanding tub, LED mirror, and teak wood vanity. Waterproofed to the highest standard.',
    images: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    ],
    completedDate: 'January 2025',
  },
  {
    id: 'p6',
    title: 'Rajput Commercial Complex',
    slug: 'rajput-commercial',
    status: 'ongoing',
    category: 'Commercial Construction',
    location: 'Malad West, Mumbai',
    description:
      'A 5-floor mixed-use commercial building with ground-floor retail, office spaces above, and a terrace café. Structural work in progress.',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
    ],
  },
];

/* ─────────────────────────────────────────────────────────────── */
/*  TESTIMONIALS                                                  */
/* ─────────────────────────────────────────────────────────────── */

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Rajesh Sharma',
    location: 'Borivali, Mumbai',
    rating: 5,
    text: 'AMS Civil Construction turned our dream home into reality. The team was punctual, professional, and the quality of work exceeded our expectations. Not a single day\'s delay on our bungalow project!',
    service: 'Bungalow Construction',
    avatar: 'RS',
  },
  {
    id: 't2',
    name: 'Priya Mehta',
    location: 'Andheri, Mumbai',
    rating: 5,
    text: 'Our 3BHK transformation is absolutely stunning. The modular kitchen and Italian marble flooring have completely elevated our home. Best construction team in Mumbai!',
    service: 'Interior Work',
    avatar: 'PM',
  },
  {
    id: 't3',
    name: 'Suresh Patel',
    location: 'Kandivali, Mumbai',
    rating: 5,
    text: 'The bathroom renovation was done in just 10 days — way ahead of schedule. The waterproofing is perfect and the Italian marble looks gorgeous. Highly recommend!',
    service: 'Bathroom Renovation',
    avatar: 'SP',
  },
  {
    id: 't4',
    name: 'Anita Desai',
    location: 'Thane',
    rating: 5,
    text: 'The POP ceiling work in our living room is a masterpiece. The cove lighting integration was done perfectly. Many guests mistake it for high-end interior design work.',
    service: 'POP Work',
    avatar: 'AD',
  },
  {
    id: 't5',
    name: 'Vikram Gupta',
    location: 'Mira Road',
    rating: 4,
    text: 'Solid workmanship on our villa project. The team is very responsive and keeps us updated at every stage. Thrilled with the progress and quality of materials used.',
    service: 'Bungalow Construction',
    avatar: 'VG',
  },
  {
    id: 't6',
    name: 'Nisha Joshi',
    location: 'Mulund, Mumbai',
    rating: 5,
    text: 'The flooring team did an outstanding job with our marble installation. Zero gaps, perfect level, and the polishing is mirror-smooth. Worth every rupee!',
    service: 'Flooring Work',
    avatar: 'NJ',
  },
];

/* ─────────────────────────────────────────────────────────────── */
/*  FAQs                                                          */
/* ─────────────────────────────────────────────────────────────── */

export const faqs: FAQ[] = [
  {
    question: 'What areas in Mumbai do you serve?',
    answer:
      'We serve all areas of Mumbai, Navi Mumbai, and Thane including Borivali, Andheri, Kandivali, Malad, Goregaon, Mira Road, Mulund, Thane, Navi Mumbai and beyond.',
  },
  {
    question: 'How do I get a free quote for my project?',
    answer:
      'Simply click the "Get Free Quote" button on any page, fill in your requirements, and our team will call you within 24 hours. Alternatively, WhatsApp us directly for a faster response.',
  },
  {
    question: 'Do you provide a warranty on your work?',
    answer:
      'Yes! We provide a 1-year workmanship warranty on all construction work. Waterproofing comes with a 5-year guarantee. Material warranties are as per the manufacturer\'s terms.',
  },
  {
    question: 'How long does a bathroom renovation take?',
    answer:
      'A standard bathroom renovation typically takes 7–14 days depending on the scope. We provide a detailed timeline before starting and keep you updated throughout.',
  },
  {
    question: 'Do you handle approvals and permissions?',
    answer:
      'Yes, we assist with local municipal approvals, structural drawings, and all necessary permissions for new construction projects.',
  },
  {
    question: 'Can I visit your previous project sites?',
    answer:
      'Absolutely! We can arrange site visits to our completed projects (with homeowner permission) so you can see our quality first-hand. Contact us to schedule a visit.',
  },
  {
    question: 'What is your payment structure?',
    answer:
      'We follow a milestone-based payment structure — typically 25% on agreement, 25% on foundation completion, 25% on structural completion, and 25% on handover. Terms are flexible for small interior projects.',
  },
  {
    question: 'Do you supply materials or should I buy them?',
    answer:
      'We offer both options. We can procure all materials at competitive rates through our supplier network, or work with client-supplied materials. Most clients prefer us to handle procurement for ease and price advantage.',
  },
  {
    question: 'Mere area mein sabse accha contractor kaun hai?',
    answer:
      'Agar aap Mumbai, Navi Mumbai, ya Thane mein hain, toh AMS Civil Construction sabse bharosemand naam hai. Humare paas 10+ saal ka anubhav aur 200+ happy clients hain.',
  },
  {
    question: 'Bathroom renovation ka kharcha kitna aata hai?',
    answer:
      'Bathroom renovation ka cost aapke pasand ke tiles aur fixtures par nirbhar karta hai. Aam taur par, basic se premium tak ka kharcha ₹40,000 se ₹1,50,000 tak ho sakta hai. Hum detailed itemized quote free mein dete hain.',
  },
  {
    question: 'Bungalow banane mein kitna time lagta hai?',
    answer:
      'Ek standard bungalow (lagbhag 2000 sq ft) banane mein aam taur par 8 se 12 mahine lagte hain, jisme foundation se leke interior finishing tak sab shamil hota hai.',
  },
  {
    question: 'AMS Civil ka phone number kya hai?',
    answer:
      'Aap humein +91 8779391690 par direct call ya WhatsApp kar sakte hain. Humari team aapki sahayata ke liye hamesha taiyar hai.',
  },
  {
    question: 'Construction cost calculator kaise use kare?',
    answer:
      'Humari website par /calculator page par jaakar aap apna plot size aur material quality (Standard, Premium, Luxury) select karein, aur aapko turant estimated cost mil jayegi.',
  }
];

/* ─────────────────────────────────────────────────────────────── */
/*  STATS                                                         */
/* ─────────────────────────────────────────────────────────────── */

export const stats = [
  { value: '10+', label: 'Years of Experience' },
  { value: '200+', label: 'Projects Completed' },
  { value: '200+', label: 'Happy Families' },
  { value: '98%', label: 'Client Satisfaction' },
];

/* ─────────────────────────────────────────────────────────────── */
/*  GALLERY IMAGES                                                */
/* ─────────────────────────────────────────────────────────────── */

export const galleryImages = [
  { src: '/images/bungalow-construction.jpg', alt: 'Bungalow Exterior', category: 'Bungalow' },
  { src: '/images/bathroom-renovation.jpg', alt: 'Luxury Bathroom', category: 'Bathroom' },
  { src: '/images/kitchen-work.jpg', alt: 'Modular Kitchen', category: 'Kitchen' },
  { src: '/images/tiles-work.jpg', alt: 'Floor Tiles', category: 'Tiles' },
  { src: '/images/interior-work.jpg', alt: 'Living Room', category: 'Interior' },
  { src: '/images/pop-work.jpg', alt: 'POP Ceiling', category: 'POP' },
  { src: '/images/flooring-work.jpg', alt: 'Marble Flooring', category: 'Flooring' },
  { src: '/images/swimming-pool.jpg', alt: 'Swimming Pool', category: 'Pool' },
  { src: '/images/plaster-work.jpg', alt: 'Plaster Work', category: 'Plaster' },
  { src: '/images/compound-wall-real.jpg', alt: 'Compound Wall', category: 'Wall' },
];
