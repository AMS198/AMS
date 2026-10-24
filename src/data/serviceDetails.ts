// src/data/serviceDetails.ts
// Comprehensive, premium detailing for each of the 14 services
// Designed to eliminate thin content, maximize dwell time, and rank high on Google

export interface ServiceDetail {
  slug: string;
  intro: string;
  detailedProcess: string;
  steps: { title: string; desc: string }[];
  materials: string[];
  pricingGuide: string;
}

export const serviceDetailsData: Record<string, ServiceDetail> = {
  'bungalow-construction': {
    slug: 'bungalow-construction',
    intro: 'Building your dream bungalow is a once-in-a-lifetime journey. AMS Civil Construction brings over 10+ years of luxury residential building experience in Mumbai, turning architectural blueprints into strong, magnificent, and beautifully finished realities.',
    detailedProcess: 'Our bungalow construction process is comprehensive, starting from soil testing and heavy-duty structural engineering to architectural mapping and premium interior finishing. We manage all municipal approvals, RCC structure layouts, brick masonry, concealed high-grade wiring, plumbing routing, and premium external plastering. Every bungalow we build is custom-designed to withstand Mumbai\'s heavy monsoon, using corrosion-resistant steel and advanced concrete mixes.',
    steps: [
      { title: 'Step 1: Planning & Approvals', desc: 'Soil testing, structural calculations, detailed 3D design mapping, and municipal licensing coordination.' },
      { title: 'Step 2: Foundation & RCC Frame', desc: 'Heavy excavation, deep pile/footing foundations, and high-strength concrete framing.' },
      { title: 'Step 3: Brickwork & Utilities', desc: 'High-quality red brick/AAC block masonry, concealed electrical conduit layouts, and plumbing pipe routing.' },
      { title: 'Step 4: Plastering & Finishes', desc: 'Internal gypsum plastering, external sand-faced cement plaster, high-end tiling, painting, and fitting.' }
    ],
    materials: ['UltraTech / ACC Cement', 'TATA Tiscon / JSW Steel', 'Kajaria / Somany Tiles', 'Finolex Pipes & Polycab Wires'],
    pricingGuide: 'Bungalow construction pricing is calculated on a per-square-foot basis, ranging from basic, premium, to luxury specifications. Our estimates are fully transparent with zero hidden costs.'
  },
  'full-interior-work': {
    slug: 'full-interior-work',
    intro: 'Transform your living spaces into a masterpiece of utility and design. Our full-scale interior civil work covers complete home remodeling, partition alterations, high-end ceilings, electrical rerouting, and custom finishing.',
    detailedProcess: 'We work closely with interior architects to implement the structural backbone of premium interiors. This includes internal wall demolition, lightweight concrete blocks partitioning, designer false ceilings, premium electrical conduit laying, sanitary ware installation, and custom surface leveling. We coordinate every trade seamlessly to ensure that the civil base matches the aesthetic design perfectly.',
    steps: [
      { title: 'Step 1: Structural Alterations', desc: 'Safe dismantling of redundant walls and space re-alignment as per architect plans.' },
      { title: 'Step 2: Framing & Utilities', desc: 'Ceiling framework installation, plumbing lines redirection, and high-load electrical wiring.' },
      { title: 'Step 3: Surface Preparation', desc: 'Wall plaster leveling, micro-plaster application, and precision floor leveling.' },
      { title: 'Step 4: High-End Finishes', desc: 'Premium tiling/granite layouts, POP molding, wall putty application, and luxury paint coats.' }
    ],
    materials: ['Saint-Gobain Gyproc Gypsum', 'Greenply / CenturyPly Marine Plywood', 'Polycab / Havells FRLS Wires', 'Kajaria Vitrified Tiles'],
    pricingGuide: 'Interior civil work pricing varies based on flat BHK size, materials selected, and customized design specifications. Contact us to schedule a site visit and get a detailed quotation.'
  },
  'swimming-pool-work': {
    slug: 'swimming-pool-work',
    intro: 'Add a luxurious oasis to your property. We specialize in engineering high-end private and residential swimming pools with structural integrity, leak-proof guarantees, and top-tier filtration systems.',
    detailedProcess: 'Swimming pool engineering requires maximum precision. We manage the entire excavation, specialized RCC double-mesh structural framing, high-density concrete pouring, triple-layer waterproofing, non-skid mosaic tiling, and the integration of automated filtration plants, underwater LED lighting, and safe drainage pipes.',
    steps: [
      { title: 'Step 1: Excavation & Shoring', desc: 'Precise ground digging, perimeter marking, and steel shoring to hold the earth secure.' },
      { title: 'Step 2: Double-Mesh RCC Pouring', desc: 'High-grade concrete pouring over a dense, heavy-duty double steel reinforcement cage.' },
      { title: 'Step 3: Triple-Layer Waterproofing', desc: 'Applying crystalline and flexible membrane waterproofing coatings, followed by 10-day flood testing.' },
      { title: 'Step 4: Mosaics & Filtration', desc: 'Premium glass mosaic tiles laying, filtration plant setup, underwater LED lights wiring, and final testing.' }
    ],
    materials: ['Dr. Fixit / Sika Waterproofing System', 'Glass Mosaic Tiles', 'Astral / Finolex Heavy Duty Pipes', 'Premium Filtration Pumps'],
    pricingGuide: 'Swimming pool construction costs depend on dimensions, shape complexity, soil composition, and selected automation (heaters, salt-chlorinators). Request a site visit for detailed planning.'
  },
  'compound-wall-work': {
    slug: 'compound-wall-work',
    intro: 'Secure and elevate your property boundary with a strong, imposing, and aesthetically designed compound wall. We build durable boundary structures engineered to withstand ground movements and weather impacts.',
    detailedProcess: 'We engineer compound walls with deep RCC foundation footings, concrete columns, and heavy-duty brick/stone masonry to prevent structural cracks or tilting over time. We also offer decorative external finishes including natural stone cladding, groove plastering, weather-shield paint coats, and custom main gate installations.',
    steps: [
      { title: 'Step 1: Footing Excavation', desc: 'Digging deep foundation trenches at regular intervals to establish heavy-duty concrete footings.' },
      { title: 'Step 2: RCC Framing & Plinth', desc: 'Erecting steel-reinforced concrete columns and casting a strong plinth beam to support the brickwork.' },
      { title: 'Step 3: Brick Masonry', desc: 'Laying premium red bricks or high-strength solid concrete blocks with proper mortar mixture ratios.' },
      { title: 'Step 4: Plaster & Cladding', desc: 'Applying sand-faced cement plaster, natural stone/tiles cladding, and final weather-coat painting.' }
    ],
    materials: ['Ultratech Cement', 'TATA Steel Rebars', 'Solid Block / Premium Flyash Bricks', 'Asian Paints Apex Ultima'],
    pricingGuide: 'Compound wall building costs are calculated on running feet basis, depending heavily on the height, foundation depth requirements, and decorative cladding chosen.'
  },
  'building-repair-work': {
    slug: 'building-repair-work',
    intro: 'Restore and extend the lifespan of older buildings by 20+ years. Our building restoration specialists carry out professional structural auditing, column jacketing, polymer plastering, and leak cures.',
    detailedProcess: 'Older structures suffer from carbonation, steel rust expansion, and plaster decay. We use advanced chemical engineering to cure these issues: exposing corroded steel, removing rust, treating it with anti-rust primers, executing micro-concrete column/beam jacketing, and applying high-strength polymer-modified mortar to restore structural strength.',
    steps: [
      { title: 'Step 1: Demolition & Steel Exposure', desc: 'Carefully chipping loose concrete to expose the corroded structural steel bars.' },
      { title: 'Step 2: Rust Removal & Priming', desc: 'Sand-blasting or wire-brushing the steel, followed by zinc-rich epoxy rust-preventative primer coating.' },
      { title: 'Step 3: Column Jacketing', desc: 'Adding new steel reinforcements around weakened columns, fixing formwork, and pouring micro-concrete.' },
      { title: 'Step 4: Polymer Plastering', desc: 'Applying high-bond polymer modified mortar (PMM) and executing external paint finishes.' }
    ],
    materials: ['Fosroc / BASF Repair Mortar', 'Epoxy Rust Primers', 'Micro-Concrete Mixes', 'Asian Paints Damp Proof'],
    pricingGuide: 'Building repair costs depend on the severity of structural damage and columns affected. We perform detailed site auditing to provide structural restore estimates.'
  },
  'bathroom-renovation': {
    slug: 'bathroom-renovation',
    intro: 'Say goodbye to damp walls, cracked tiles, and outdated plumbing. Our expert bathroom renovation service delivers beautiful, leak-proof, and modern bathrooms with a written 5-year waterproofing guarantee.',
    detailedProcess: 'A bathroom is only as good as its waterproofing. Our process is meticulous: we dismantle the old setup, reroute the entire concealed plumbing with premium CPVC pipes, apply a robust triple-layer polyurethane waterproofing coating, lay anti-skid floor tiles, fix designer wall tiles with epoxy grouting, and install modern premium sanitary fixtures.',
    steps: [
      { title: 'Step 1: Demolition & Scraping', desc: 'Dismantling old tiles, concrete base, and plumbing lines down to the core brick structure.' },
      { title: 'Step 2: Plumbing & Concealed Piping', desc: 'Concealed CPVC hot/cold water pipes routing, wall-hung commode bracket installation, and diverter fittings.' },
      { title: 'Step 3: 3-Layer Waterproofing', desc: 'Applying chemical waterproof coatings, executing a 24-hour pond test, and pouring slope screed concrete.' },
      { title: 'Step 4: Premium Tiling & Fixtures', desc: 'Laying anti-skid floor tiles, epoxy grouted wall tiles, fixing commodes, washbasins, and chrome fixtures.' }
    ],
    materials: ['Astral CPVC / Supreme Pipes', 'Dr. Fixit 301 / Fastflex', 'Kajaria Ceramic Wall Tiles', 'Jaquar / Kohler Sanitary Ware'],
    pricingGuide: 'Bathroom remodeling pricing is highly customizable, depending on flat sizes, selected tile ranges, and sanitary ware brands. We provide clear, itemized quotes.'
  },
  'tiles-work': {
    slug: 'tiles-work',
    intro: 'Flawless, laser-aligned tiling elevates the look of any home. We specialize in installing all varieties of premium tiles — vitrified, ceramic, porcelain, mosaic, and natural stone — with perfect grout lines.',
    detailedProcess: 'Tiling requires master craftsmanship and proper surface leveling. We use high-accuracy laser aligners to map layouts, select high-bond dry adhesive mixtures for maximum durability, apply correct spacing spacers, and fill tile joints with stain-proof, waterproof epoxy grout that doesn\'t turn yellow over time.',
    steps: [
      { title: 'Step 1: Layout & Laser Leveling', desc: 'Checking wall/floor alignment using professional 3D laser cross-line levelers.' },
      { title: 'Step 2: Adhesive Application', desc: 'Spreading high-performance polymer-modified tile adhesives using notched trowels for 100% void-free bonding.' },
      { title: 'Step 3: Precision Tiles Laying', desc: 'Placing tiles with spacers, tapping with rubber mallets to ensure solid backing and zero hollow hollow spots.' },
      { title: 'Step 4: Epoxy Joint Grouting', desc: 'Removing spacers, cleaning joints, and filling them with premium waterproof epoxy grout mixtures.' }
    ],
    materials: ['Kajaria / Somany Vitrified Tiles', 'Laticrete / Roff Tile Adhesives', 'Stain-free Epoxy Grout Systems', 'Leveling Clip Spacers'],
    pricingGuide: 'Tiling work is priced per square foot for labor and material. The rate varies depending on tile sizes (large-format slabs take specialized labor).'
  },
  'kitchen-work': {
    slug: 'kitchen-work',
    intro: 'Design a highly functional, beautiful kitchen tailored to Indian cooking habits. We build heavy-duty quartz/granite countertops, modular frameworks, and execute durable civil kitchen remodeling.',
    detailedProcess: 'We specialize in both traditional and modular civil kitchen setups. We build strong L-shaped or parallel granite kitchen counters supported by strong Kadappa stone vertical slabs, lay customized backsplash tiles, execute plumbing connections for sinks and water purifiers, and create custom provisions for modern chimneys, hobs, and dishwashers.',
    steps: [
      { title: 'Step 1: Countertop Framing', desc: 'Fabricating a strong load-bearing under-structure using Kadappa stone supports.' },
      { title: 'Step 2: Granite / Quartz Laying', desc: 'Selecting, cutting, and placing premium granite/quartz slabs with double-edge bullnose polishing.' },
      { title: 'Step 3: Plumbing & Electric Outlets', desc: 'Laying sink inlet/outlet CPVC piping, gas pipe conduits, and high-amp electric sockets for microwaves.' },
      { title: 'Step 4: Backsplash Tiling', desc: 'Installing designer wall tiles up to lintel height behind the stove area to enable easy cleaning.' }
    ],
    materials: ['Premium Quartz / Black Granite Slabs', 'Kajaria Backsplash Wall Tiles', 'Astral PVC / CPVC Pipes', 'Nirali Stainless Steel Sinks'],
    pricingGuide: 'Kitchen civil work is calculated based on running feet of countertop, stone variety selected, and wall tiling area. Estimates are tailored to your BHK size.'
  },
  'flooring-work': {
    slug: 'flooring-work',
    intro: 'Add elegance under your feet with luxury flooring. We specialize in laying premium Italian marble, heavy-duty Indian granite, wooden laminates, and large-format vitrified tiles.',
    detailedProcess: 'A luxury floor requires absolute flat leveling and specialized polishing. We handle the entire sub-floor leveling, lay marble slabs using specialized white cement mixes to prevent discoloration, execute precise diamond-segment grinding, and complete mirror-finish polishing to make the floor shine for decades.',
    steps: [
      { title: 'Step 1: Floor Sub-base Setup', desc: 'Chipping old flooring, cleaning the base slab, and preparing a leveled cement-sand mortar bed.' },
      { title: 'Step 2: Marble / Slab Layout', desc: 'Sorting and layout mapping marble slabs to ensure uniform natural vein flow across the room.' },
      { title: 'Step 3: White Cement Fixing', desc: 'Fixing the slabs using premium grade white cement mixtures mixed with polymer high-bond liquids.' },
      { title: 'Step 4: Mirror Diamond Polishing', desc: 'Running 7 rounds of diamond grinding pads of varying grits, followed by tin oxide mirror polish.' }
    ],
    materials: ['Italian Marble / Granite Slabs', 'Birla A1 White Cement', 'Laticrete Adhesive Mixes', 'Diamond Polishing Compounds'],
    pricingGuide: 'Flooring costs depend on material chosen (Italian marble has a higher material and labor polish cost than vitrified tiles). Contact us for a free catalog.'
  },
  'wall-work': {
    slug: 'wall-work',
    intro: 'Create durable brick walls, partition layouts, and premium external stone cladding. We build high-strength brick masonry walls with structural plastering that blocks dampness.',
    detailedProcess: 'We specialize in internal wall partitions, heavy-duty load-bearing red brick walls, lightweight AAC block installations, external granite stone cladding, and custom groove-cut architectural plaster. Every wall is reinforced with proper cement mortar mixture ratios and cured properly to prevent settlement cracks.',
    steps: [
      { title: 'Step 1: Alignment & Erection', desc: 'Marking layouts with plumb-bobs and erecting brick/block walls using high-grade cement-sand mortar.' },
      { title: 'Step 2: Reinforcement Lintels', desc: 'Casting horizontal RCC plinths/lintel beams over doors and windows to distribute load safely.' },
      { title: 'Step 3: 2-Coat Plastering', desc: 'Applying a rough cement backing coat, followed by a smooth finish cement-sand plaster coat.' },
      { title: 'Step 4: Putty & Surface Prep', desc: 'Applying 2 coats of acrylic wall putty and smooth sanding to prepare the wall for final paint.' }
    ],
    materials: ['AAC Lightweight Blocks / Red Bricks', 'Ultratech Cement', 'Birla White Wall Care Putty', 'Epoxy Anchor Chemicals'],
    pricingGuide: 'Wall construction is calculated on a square-foot or cubic-foot basis. Pricing varies by wall thickness (4-inch partitions vs 9-inch load-bearing walls).'
  },
  'pop-work': {
    slug: 'pop-work',
    intro: 'Add architectural elegance with designer false ceilings and intricate cornice molding. Our master POP artists design smooth, crack-resistant ceiling structures with seamless paint preparation.',
    detailedProcess: 'We build durable POP false ceilings using sturdy rust-resistant GI metal grids suspended securely from the slab. Over this framework, we fix high-density POP sheet boards or apply premium Plaster of Paris by hand, sculpting beautiful coves for LED strip lights, spot cutouts, and traditional cornices.',
    steps: [
      { title: 'Step 1: Metal Grid Framing', desc: 'Fixing rust-proof galvanized iron (GI) sections to the slab using expansion fasteners for a solid grid.' },
      { title: 'Step 2: Board Fixing & Jointing', desc: 'Screwing high-density plasterboards to the metal grid, leaving small gaps for expansion.' },
      { title: 'Step 3: Hand POP Plastering', desc: 'Applying multiple coats of Plaster of Paris by hand to ensure a flat, smooth, and seamless finish.' },
      { title: 'Step 4: Cove & Spot Cuts', desc: 'Cutting precise spots for LED downlights and crafting light coves for ambient indirect lighting.' }
    ],
    materials: ['Sakarni / Gypsona POP Plaster', 'Saint-Gobain GI Channel Sections', 'Rust-resistant drywall screws', 'Fiberglass Joint Tape'],
    pricingGuide: 'POP false ceiling work is priced per square foot. Standard cove designs are highly affordable, while customized multi-step ceilings are quote-based.'
  },
  'plaster-work': {
    slug: 'plaster-work',
    intro: 'Get perfectly smooth, damp-proof, and crack-free walls. We apply high-grade internal gypsum plaster and external sand-faced cement plaster with proper water-curing cycles.',
    detailedProcess: 'Plastering is vital to protect bricks from moisture and provide a paint-ready base. We use premium gypsum plaster for internal walls (which dries fast, is crack-resistant, and requires no water curing) and heavy-duty double-coat sand-faced cement-sand mortar mixes with waterproofing additives for external facades.',
    steps: [
      { title: 'Step 1: Surface Scrubbing', desc: 'Cleaning brickwork joints, removing dust, and washing the wall to ensure strong plaster adhesion.' },
      { title: 'Step 2: Plaster Level Indicators', desc: 'Fixing plaster level pads at regular intervals to establish an absolute flat vertical target plane.' },
      { title: 'Step 3: Gypsum / Cement Application', desc: 'Applying gypsum paste (internal) or cement-sand mortar (external) using trowels and levels.' },
      { title: 'Step 4: Levelling & Troweling', desc: 'Running straight-edge levels across the wall and sponge-troweling the surface for a smooth finish.' }
    ],
    materials: ['Saint-Gobain Gyproc Elite Plaster', 'Ultratech Cement', 'Sieved River Sand / Crush Sand', 'Sika Latex High-bond Liquid'],
    pricingGuide: 'Plastering work is priced per square foot for labor and material. Rates depend on internal gypsum vs external double-coat cement requirements.'
  },
  'painting': {
    slug: 'painting',
    intro: 'Brighten and protect your property with a luxury, dust-free paint job. We provide professional interior and exterior painting services using premium brands and thorough wall preparation.',
    detailedProcess: 'A great paint job is 80% surface preparation. Our team seals structural cracks with specialized sealants, cures dampness issues, applies two coats of premium acrylic wall putty, sands the surfaces flat using dust-controlled sanders, applies a high-bond primer, and finishes with two coats of premium luxury emulsion paints.',
    steps: [
      { title: 'Step 1: Sanding & Cleaning', desc: 'Scraping old loose paint, treating damp wall spots, and sanding the walls to a flat matte finish.' },
      { title: 'Step 2: Acrylic Putty Application', desc: 'Applying 2 coats of premium acrylic wall putty to fill minor pores and create a glass-like base.' },
      { title: 'Step 3: Primer Coating', desc: 'Applying a high-bond interior/exterior primer coat to seal the putty and ensure uniform paint absorption.' },
      { title: 'Step 4: Dual Paint Coats', desc: 'Applying 2 coats of premium luxury emulsion paints using microfiber rollers for a brush-free finish.' }
    ],
    materials: ['Asian Paints Royale / Apex Ultima', 'Berger Silk Luxury Emulsion', 'Birla White Putty', 'Dr. Fixit Crack X Paste'],
    pricingGuide: 'Painting pricing is calculated on a per-square-foot basis. Emulsion paint selection ( Royale Luxury vs Standard Distemper) dictates final cost.'
  },
  'waterproofing': {
    slug: 'waterproofing',
    intro: 'Stop water seepage and protect your building structure. We specialize in advanced multi-layer waterproofing for terraces, bathrooms, basements, and external walls with a written leak-proof guarantee.',
    detailedProcess: 'We analyze leak sources using moisture meters and resolve them permanently. Our waterproofing is rigorous: we remove weak concrete, seal cracks with high-tensile epoxy sealants, apply 3 coats of acrylic-polymer modified cementitious coatings or flexible polyurethane elastomeric membranes, lay protective cement screed layers, and conduct comprehensive flood testing.',
    steps: [
      { title: 'Step 1: Surface Chipping & Prep', desc: 'Exposing the parent concrete slab, removing loose dust, and cleaning pores using high-pressure blowers.' },
      { title: 'Step 2: Crack Epoxy Injection', desc: 'Opening structural hair-cracks into V-grooves and sealing them with high-bond polyurethane sealants.' },
      { title: 'Step 3: Chemical Membrane Coating', desc: 'Applying 3 coats of flexible polymer modified cementitious or liquid elastomeric PU membrane.' },
      { title: 'Step 4: Protective Mortar Screed', desc: 'Casting a protective cement-sand screed layer with correct slope alignment toward drain pipes.' }
    ],
    materials: ['Dr. Fixit Fastflex / Coal Tar Epoxy', 'Fosroc Brushbond Systems', 'SikaFlex Crack Sealants', 'Fiberglass Mesh Reinforcements'],
    pricingGuide: 'Waterproofing is priced on a running feet or square foot basis. It includes a written warranty, and costs depend on the water exposure level of the site.'
  },
  'modular-kitchen': {
    slug: 'modular-kitchen',
    intro: 'Upgrade to a smart, sleek, and highly functional modular kitchen. We build robust kitchens that perfectly combine civil durability with modern modular aesthetics.',
    detailedProcess: 'We prepare the kitchen base with strong Kadappa stone vertical supports and lay premium quartz or granite tops. Then, we integrate factory-made, water-resistant marine plywood cabinets with soft-close mechanisms, tandem boxes, and sleek acrylic finishes. All electrical and plumbing lines are seamlessly concealed for appliances.',
    steps: [
      { title: 'Step 1: 3D Layout & Planning', desc: 'Mapping out the kitchen triangle for stove, sink, and fridge for maximum efficiency.' },
      { title: 'Step 2: Civil Base Setup', desc: 'Fixing Kadappa supports, laying granite tops, and executing concealed plumbing.' },
      { title: 'Step 3: Carcass & Shutters', desc: 'Installing marine-grade plywood boxes and fixing acrylic or laminate shutters.' },
      { title: 'Step 4: Hardware & Appliances', desc: 'Fitting Hettich/Hafele channels, tandem drawers, chimneys, and built-in hobs.' }
    ],
    materials: ['CenturyPly Marine Grade Plywood', 'Hettich / Hafele Hardware', 'Premium Quartz Countertops', 'Kajaria Backsplash Tiles'],
    pricingGuide: 'Modular kitchen pricing depends on the size (L-shape, U-shape, parallel), shutter finish (acrylic/laminate), and hardware brands chosen.'
  },
  'hall-design': {
    slug: 'hall-design',
    intro: 'Your hall is the center of your home. We design and execute grand living spaces with stunning ceilings, luxury flooring, and beautiful TV unit backdrops.',
    detailedProcess: 'We start by leveling the floor for premium Italian marble or large-format vitrified tiles. We then erect custom TV unit frames, install intricate POP false ceilings with concealed wiring for cove lights, and finish the walls with premium textures or stone cladding to create a luxurious ambiance.',
    steps: [
      { title: 'Step 1: Civil Alterations', desc: 'Modifying partitions and laying concealed electrical conduits for home theaters and ACs.' },
      { title: 'Step 2: Flooring Installation', desc: 'Laying large format tiles or Italian marble with mirror-finish polishing.' },
      { title: 'Step 3: Ceiling & TV Unit', desc: 'Crafting POP false ceilings and building structural frames for TV and display units.' },
      { title: 'Step 4: Painting & Textures', desc: 'Applying Royal Emulsion paints and feature wall textures for a premium look.' }
    ],
    materials: ['Italian Marble', 'Asian Paints Royale Play', 'Gyproc False Ceiling', 'Polycab Audio/Video Wiring'],
    pricingGuide: 'Hall design costs are estimated based on floor area, ceiling design complexity, and the type of flooring material selected.'
  },
  'bedroom-remodeling': {
    slug: 'bedroom-remodeling',
    intro: 'Transform your bedroom into a peaceful, luxurious retreat. Our bedroom remodeling covers everything from civil wardrobe framing to soundproofing and flooring.',
    detailedProcess: 'We completely overhaul the bedroom space. This includes laying warm wooden laminate or vitrified flooring, building strong civil frames for floor-to-ceiling wardrobes, executing attached bathroom renovations, and installing ambient false ceilings to create a relaxing atmosphere.',
    steps: [
      { title: 'Step 1: Space Optimization', desc: 'Re-aligning walls or doors to maximize usable space for beds and wardrobes.' },
      { title: 'Step 2: Flooring & Civil Base', desc: 'Installing wooden laminate flooring and executing civil changes for attached baths.' },
      { title: 'Step 3: Wardrobe & Ceiling', desc: 'Building custom wardrobe structures and installing POP ceilings with soft lighting.' },
      { title: 'Step 4: Finishing Touches', desc: 'Premium painting, fixing designer electrical switches, and installing custom doors.' }
    ],
    materials: ['Pergo Wooden Laminates', 'Greenply Plywood', 'Asian Paints Luxury Emulsion', 'Legrand / Anchor Roma Switches'],
    pricingGuide: 'Bedroom remodeling is priced per square foot, with additional costs for attached bathroom renovations and customized woodwork.'
  },
  'interior-design': {
    slug: 'interior-design',
    intro: 'Experience seamless turnkey interior design and execution. We blend aesthetics with robust civil engineering to create spaces that are as beautiful as they are durable.',
    detailedProcess: 'Our turnkey service means we handle everything from the initial 3D design concept to the final handover. Our civil teams work hand-in-hand with our designers to execute structural changes, false ceilings, specialized flooring, custom furniture frameworks, and high-end wall finishes without any miscommunication.',
    steps: [
      { title: 'Step 1: Consultation & 3D Design', desc: 'Understanding your vision and creating photorealistic 3D renders of the space.' },
      { title: 'Step 2: Core Civil Work', desc: 'Executing demolition, wall building, plumbing, electrical rerouting, and flooring.' },
      { title: 'Step 3: Carpentry & Fabrication', desc: 'Building custom furniture, modular kitchens, wardrobes, and structural frames.' },
      { title: 'Step 4: Final Finishing', desc: 'Polishing, painting, cleaning, and handing over a ready-to-move-in space.' }
    ],
    materials: ['Premium Vitrified/Marble Flooring', 'Marine Grade Plywood', 'High-end Sanitary Ware', 'Luxury Paint Finishes'],
    pricingGuide: 'Turnkey interior design is typically quoted as a comprehensive package based on the BHK size and the luxury level (Standard, Premium, Ultra-Luxury).'
  },
  '1bhk-2bhk-renovation': {
    slug: '1bhk-2bhk-renovation',
    intro: 'Maximize your space and comfort. We specialize in renovating 1BHK and 2BHK apartments with smart civil modifications, modern flooring, and efficient layouts.',
    detailedProcess: 'We analyze the layout of your 1BHK/2BHK to make it feel larger. Our work includes removing unnecessary partitions, laying bright vitrified tiles to reflect light, upgrading old plumbing and electricals, and finishing with space-saving modular civil structures.',
    steps: [
      { title: 'Step 1: Space Planning', desc: 'Designing layouts to maximize usable floor area in compact apartments.' },
      { title: 'Step 2: Civil Demolition', desc: 'Safely removing old flooring, kitchen platforms, and bathroom fittings.' },
      { title: 'Step 3: Core Upgrades', desc: 'Installing concealed copper wiring and leak-proof CPVC plumbing.' },
      { title: 'Step 4: Finishing', desc: 'Laying large-format vitrified tiles, painting, and handing over.' }
    ],
    materials: ['Kajaria Vitrified Tiles', 'Polycab Wiring', 'Asian Paints Royale', 'Standard CP/Sanitary fittings'],
    pricingGuide: 'We offer fixed-price, highly affordable packages specifically designed for complete 1BHK and 2BHK home renovations.'
  },
  '3bhk-4bhk-luxury-interiors': {
    slug: '3bhk-4bhk-luxury-interiors',
    intro: 'Grand homes require grand execution. We provide premium, luxury civil and interior solutions tailored for large 3BHK, 4BHK, and 5BHK residences and bungalows.',
    detailedProcess: 'Large homes involve complex project management. We execute high-end Italian marble flooring, intricate multi-level POP ceilings, luxury bathroom suite civil work, and heavy-duty smart home electrical networking. Every detail is overseen by a senior civil engineer.',
    steps: [
      { title: 'Step 1: Premium Layout Planning', desc: 'Coordinating with architects for master suites, living areas, and open kitchens.' },
      { title: 'Step 2: Luxury Flooring', desc: 'Diamond-polished Italian marble or high-end wooden flooring installation.' },
      { title: 'Step 3: Custom Ceiling & Lighting', desc: 'Elaborate POP work with integrated coves for ambient and chandelier lighting.' },
      { title: 'Step 4: High-End Bathrooms', desc: 'Complete civil prep for jacuzzis, rain showers, and premium imported tiles.' }
    ],
    materials: ['Italian Marble', 'Saint-Gobain Gypsum', 'Kohler/Grohe Concealed Fittings', 'Teak Wood Frames'],
    pricingGuide: 'Luxury renovations are priced based on the premium materials selected and the high degree of custom craftsmanship required.'
  },
  'terrace-renovation': {
    slug: 'terrace-renovation',
    intro: 'Protect your home from leaks while creating a beautiful outdoor space. We provide multi-layer terrace waterproofing and heat-reflective tiling.',
    detailedProcess: 'A leaking terrace can damage the entire building. We chip the old surface to the concrete slab, apply advanced polyurethane or cementitious waterproofing membranes, fix the drainage slope (screed), and lay heat-reflective terrace tiles to keep your top floor cool.',
    steps: [
      { title: 'Step 1: Surface Chipping', desc: 'Removing the old, damaged IPS or brick-bat coba down to the RCC slab.' },
      { title: 'Step 2: Crack Sealing', desc: 'Injecting epoxy sealants into visible structural cracks.' },
      { title: 'Step 3: Membrane Waterproofing', desc: 'Applying a 3-layer elastomeric waterproofing coat with fiber mesh reinforcement.' },
      { title: 'Step 4: Protective Tiling', desc: 'Laying heat-reflective cool tiles with waterproof epoxy grouting.' }
    ],
    materials: ['Dr. Fixit Newcoat', 'Fosroc Sealants', 'Johnson Endura Cool Roof Tiles', 'Polyurethane Membranes'],
    pricingGuide: 'Terrace work is priced per square foot, heavily depending on whether you choose just waterproofing or waterproofing + cool tiles.'
  },
  'simple-kitchen-work': {
    slug: 'simple-kitchen-work',
    intro: 'Durable, easy-to-maintain, and highly affordable. We build traditional Indian kitchens designed to withstand heavy daily cooking.',
    detailedProcess: 'For clients who prefer traditional setups over modular woodwork, we build ultra-strong kitchen bases using vertical Kadappa stone slabs. We lay premium granite tops, secure stainless steel sinks with strong plumbing, and install easy-to-clean ceramic tiles on the walls.',
    steps: [
      { title: 'Step 1: Kadappa Framing', desc: 'Erecting a solid stone under-structure for the kitchen platform.' },
      { title: 'Step 2: Granite Installation', desc: 'Laying and cementing black or coloured granite slabs perfectly level.' },
      { title: 'Step 3: Wall Tiling', desc: 'Fixing ceramic tiles up to 2 feet or lintel level above the counter.' },
      { title: 'Step 4: Plumbing & Sink', desc: 'Installing heavy-duty Nirali sinks and connecting leak-proof CPVC pipes.' }
    ],
    materials: ['Kadappa Stone', 'Black/Telephone Black Granite', 'Nirali SS Sink', 'Ceramic Wall Tiles'],
    pricingGuide: 'Simple kitchen civil work is highly cost-effective and is priced based on the running feet of the granite counter required.'
  }
};
