// scripts/add-all-blogs.js
// Inserts all 3 remaining high-intent SEO blogs into MongoDB

const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Please provide MONGODB_URI');
  process.exit(1);
}

const blogs = [
  /* ── 1. POP vs Gypsum False Ceiling ── */
  {
    title: 'POP vs Gypsum False Ceiling in Mumbai Flats: Cost, Durability & Best Choice (2026 Guide)',
    slug: 'pop-vs-gypsum-false-ceiling-mumbai-guide-2026',
    excerpt: 'Confused between POP (Plaster of Paris) and Gypsum boards for your Mumbai flat ceiling? Discover the exact 2026 cost per sq ft, moisture resistance in Mumbai coastal weather, installation timeline, durability, and lighting designs.',
    featuredImage: '/images/pop-work.jpg',
    author: 'AMS Interior & Civil Team',
    seoKeywords: 'POP false ceiling Mumbai, gypsum false ceiling cost per sq ft Mumbai 2026, pop vs gypsum difference, false ceiling contractor Mumbai, cove lighting false ceiling rates, gypsum board vs plaster of paris',
    locationTags: ['Andheri', 'Bandra', 'Borivali', 'Goregaon', 'Thane', 'Kandivali', 'Powai', 'Dadar'],
    published: true,
    publishDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    content: `
A modern false ceiling is no longer just a luxury—for Mumbai apartments, it has become a functional necessity. Whether you are moving into a new flat or renovating an older residence in **<a href="/areas/andheri" class="text-orange-500 font-bold hover:underline">Andheri</a>**, **<a href="/areas/bandra" class="text-orange-500 font-bold hover:underline">Bandra</a>**, **<a href="/areas/borivali" class="text-orange-500 font-bold hover:underline">Borivali</a>**, or **<a href="/areas/thane" class="text-orange-500 font-bold hover:underline">Thane</a>**, a dropped ceiling is essential for:
- Concealing ugly electrical conduits, AC copper pipes, and beam drops.
- Creating sophisticated ambient cove lighting and magnetic track lights.
- Thermal insulation against Mumbai's intense coastal summer heat.
- Acoustic noise reduction between apartment floors.

However, the most common dilemma homeowners face is: **"Should I go with Gypsum Board False Ceiling or traditional POP (Plaster of Paris)?"**

In this comprehensive guide, our interior civil specialists compare both materials across cost, durability, humidity resistance, and speed of installation.

---

## ⚡ What is a Gypsum Board False Ceiling?

Gypsum ceilings are built using pre-fabricated, factory-manufactured boards (most commonly **Saint-Gobain Gyproc** or USG Boral). The core contains hydrated calcium sulfate pressed between heavy industrial paper sheets.

- **How it's installed:** Metal GI framing channels (perimeter channels, intermediate channels, and ceiling sections) are suspended from the true ceiling slab using anchor fasteners. The 12.5mm gypsum sheets are screwed directly into the frame. Joints are taped using specialized fiber mesh tape and finished with jointing compound.
- **Key Advantage:** It is a **dry construction process**. A standard 2 BHK apartment ceiling can be completely framed and sheeted in just **3 to 5 days** with minimal dust and zero water curing.

---

## 🏛️ What is a POP (Plaster of Paris) False Ceiling?

POP is a semi-dehydrated gypsum powder. When mixed with water on-site, it forms a quick-setting paste that hardens into a rigid solid.

- **How it's installed:** A steel metal framework or chicken wire mesh is suspended from the slab. Skilled artisans apply the wet POP paste in multiple layers by hand, smoothing it with trowels.
- **Key Advantage:** Because it is applied in a wet, malleable state, POP allows for **unlimited architectural freedom**—circular domes, organic curved coves, classical cornices, floral medallions, and stepped relief patterns that rigid boards cannot easily replicate.

---

## 📊 Head-to-Head Comparison: POP vs Gypsum in 2026

| Parameter | Gypsum Board Ceiling | POP (Plaster of Paris) Ceiling |
| :--- | :--- | :--- |
| **Material Cost (2026 MMR Rate)** | **₹95 – ₹130 / sq. ft.** (Standard plain) | **₹115 – ₹160 / sq. ft.** |
| **With Cove / Profile Lighting** | **₹135 – ₹175 / sq. ft.** | **₹155 – ₹210 / sq. ft.** |
| **Installation Speed** | **Fast (3–5 days)** for 1000 sq ft flat | **Slow (8–14 days)** (Requires drying) |
| **Dust & Mess on Site** | Very low (dry boards, only joint sanding) | High (wet mixing, splatters on walls/floor) |
| **Joint Visibility / Cracking** | Minor hairline cracks if poor tape used | Virtually zero joint lines when fully cured |
| **Moisture Resistance (Mumbai Climate)** | High (use **Green Moisture-Resistant Boards**) | Prone to softening if exposed to water leaks |
| **Design Flexibility** | Best for straight lines, boxes & magnetic tracks | Best for curves, arches & ornate cornices |

---

## 🌧️ Mumbai Climate Factor: Humidity & Salty Air

Mumbai's air carries an average relative humidity of **70% to 90%** during the monsoons. This moisture plays a critical role in ceiling longevity:

1. **In Living Rooms and Bedrooms:** Both Gypsum and POP perform exceptionally well provided there is no external roof/sunken slab seepage from the flat above.
2. **In Kitchens & Bathrooms:** Never use standard white gypsum boards or raw POP. We strictly install **Green Moisture-Resistant (MR) Gypsum Boards** (which contain silicone additives) to prevent mold, mildew, and board sagging.
3. **If Your Building Has Known Seepage Issues:** Solve the structural waterproofing first before doing any ceiling work! Explore our **<a href="/services/waterproofing" class="text-orange-500 font-bold hover:underline">Structural Waterproofing Services</a>** to ensure zero water damage.

---

## 💡 Room-by-Room Recommendations

- **Living & Dining Area:** **Gypsum Ceiling with LED Profile Channels.** Straight-line modern minimalism with warm 3000K indirect cove light creates a stunning illusion of height and luxury. Check our **<a href="/services/pop-work" class="text-orange-500 font-bold hover:underline">POP & False Ceiling Portfolio</a>**.
- **Master Bedroom:** **Gypsum with Acoustic Backing.** Clean ceiling with recessed COB spotlights over wardrobes and reading corners.
- **Pooja Room or Heritage Style Villas:** **Handcrafted POP.** Intricate carved borders, traditional lotus motifs, and layered cornices look richer in authentic POP.
- **Kitchen:** **Moisture-Resistant Gypsum.** Easy to wipe clean, heat-resistant, and provides neat cutouts for high-suction chimney ducting and exhaust fans. Learn more about our **<a href="/services/kitchen-work" class="text-orange-500 font-bold hover:underline">Modular Kitchen Civil Solutions</a>**.

---

## 🛠️ Complete False Ceiling Cost Estimate (For 2 BHK - Approx 600 Sq Ft Ceiling Area)

If you have a standard 2 BHK in Mumbai:
- **Gypsum Framing & Board Fixing (600 sq ft @ ₹110/sq ft):** ₹66,000
- **LED Cove Trough & Profile Grooving:** ₹14,000
- **Acrylic Putty + Primer + 2 Coats Premium Emulsion Paint:** ₹18,000
- **Electrical Wiring & Point Making:** ₹12,000
- **Total Estimated Budget:** **₹1,10,000 – ₹1,25,000** (Turnkey completion in 6 to 8 days).

You can compute your exact flat area cost in under 30 seconds using our **<a href="/calculator" class="text-orange-500 font-bold hover:underline">Free Online Cost Calculator</a>**.

---

## 🏆 Why Hire AMS Civil Construction?

- ✅ **Certified Heavy-Gauge GI Channels:** We never compromise with flimsy 0.35mm local framing. We strictly use 0.50mm+ hot-dipped galvanized GI channels to prevent ceiling sag.
- ✅ **Laser Leveling:** Precision laser levels ensure 100% horizontal accuracy across large halls.
- ✅ **Clean Site Handover:** Protected flooring with bubble wrap and complete debris clearance upon completion.

Ready to transform your home with a flawless designer ceiling? **<a href="/contact" class="text-orange-400 font-bold hover:underline">Contact our design engineers today</a>** or call **<a href="tel:+918779391690" class="text-orange-400 font-bold hover:underline">+91 87793 91690</a>** for a free on-site ceiling measurement!
`
  },

  /* ── 2. 1 BHK & 2 BHK Flat Renovation Cost in Mumbai ── */
  {
    title: '1 BHK & 2 BHK Flat Renovation Cost in Mumbai (2026 Detailed Breakdown & Checklist)',
    slug: '1bhk-2bhk-flat-renovation-cost-mumbai-2026',
    excerpt: 'Complete 2026 cost guide for renovating a 1 BHK or 2 BHK resale or new apartment in Mumbai. Realistic civil work, plumbing, tiling, kitchen, electrical, and painting budgets with zero hidden surprises.',
    featuredImage: '/images/interior-work.jpg',
    author: 'AMS Residential Civil Team',
    seoKeywords: '1 BHK flat renovation cost Mumbai, 2 BHK flat renovation cost Mumbai 2026, full flat renovation estimate, civil contractor for flat renovation Mumbai, society renovation permission cost, flat remodeling Mumbai',
    locationTags: ['Bandra', 'Andheri', 'Borivali', 'Ghatkopar', 'Mulund', 'Thane', 'Malad', 'Dadar', 'Kalyan'],
    published: true,
    publishDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    content: `
Buying a home in Mumbai—whether an older resale apartment in **<a href="/areas/dadar" class="text-orange-500 font-bold hover:underline">Dadar</a>**, **<a href="/areas/bandra" class="text-orange-500 font-bold hover:underline">Bandra</a>**, **<a href="/areas/borivali" class="text-orange-500 font-bold hover:underline">Borivali</a>**, or a builder-handed flat in **<a href="/areas/thane" class="text-orange-500 font-bold hover:underline">Thane</a>** and **<a href="/areas/kalyan" class="text-orange-500 font-bold hover:underline">Kalyan</a>**—is usually followed by one big challenge: **complete renovation**.

Older buildings constructed 15 to 30 years ago feature corroded GI water pipes, outdated ceramic tiles, cramped kitchens, and weak electrical wiring that cannot support modern air conditioners or heavy appliances.

If you are planning to renovate your flat, here is the realistic **2026 cost breakdown for civil, tiling, plumbing, modular kitchen, and painting works** in Mumbai.

---

## 💰 2026 Summary: Total Renovation Cost in Mumbai

Depending on the scale of renovation (Cosmetic Refresh vs Complete Structural Overhaul):

| Apartment Size | Carpet Area | Basic Renovation (Paint, Minor Tile & Bath) | Full Civil Overhaul (Piping, Tiling, Bath, Kitchen, POP) | Luxury Renovation (Italian Marble, Veneer, Automation) |
| :--- | :--- | :--- | :--- | :--- |
| **1 BHK Flat** | 400 – 550 sq ft | **₹2.8L – ₹4.0 Lakhs** | **₹5.0L – ₹7.5 Lakhs** | **₹9.5L – ₹14.0 Lakhs** |
| **2 BHK Flat** | 650 – 850 sq ft | **₹4.5L – ₹6.5 Lakhs** | **₹8.0L – ₹12.5 Lakhs** | **₹15.0L – ₹24.0 Lakhs** |
| **3 BHK Flat** | 950 – 1300 sq ft | **₹6.5L – ₹9.5 Lakhs** | **₹13.0L – ₹18.5 Lakhs** | **₹25.0L – ₹40.0+ Lakhs** |

> 📌 **Need an instant budget estimate?** Calculate exact costs for your carpet area with our **<a href="/calculator" class="text-orange-500 font-bold hover:underline">Civil Renovation Cost Calculator</a>**.

---

## 🔍 Detailed Component-wise Cost Breakdown

Let us examine where every rupee goes during a comprehensive full-flat renovation:

### 1. Demolition, Breaking & Debris Disposal (₹30,000 – ₹65,000)
- **Work Included:** Breaking old floor tiles, bathroom dado tiles, kitchen platforms, chipping plaster, and removing old door frames.
- **Mumbai Debris Rules:** Municipal corporations (BMC/TMC/KDMC) strictly fine societies for dumping debris outside. Debris must be bagged in gunny sacks and transported to designated dumping grounds via private tipper trucks (₹3,500 – ₹5,000 per truck trip).

### 2. Complete Flooring & Tiling (₹1,10,000 – ₹2,40,000)
- **Living & Bedrooms:** Installing modern 4ft x 2ft (1200x600mm) glazed vitrified tiles (GVT) or marble-finish slabs over a 2-inch leveling screed.
- **Skilled Labour:** High-quality tile leveling spacers and polymer adhesive (Roff / Bal Endura) prevent hollow sounds or popped tiles. Explore our **<a href="/services/flooring-work" class="text-orange-500 font-bold hover:underline">Flooring & Tiling Work</a>**.

### 3. Complete Bathroom Remodeling (₹80,000 – ₹1,65,000 per Bathroom)
Bathrooms in Mumbai resale flats are the number one source of building seepage. A full bathroom remodel includes:
- Chipping down to the parent RCC sunken slab.
- Applying a multi-layer **<a href="/services/waterproofing" class="text-orange-500 font-bold hover:underline">Brickbat Coba Waterproofing</a>** with polymer coating.
- 100% brand-new concealed CPVC/UPVC water lines (Astral/Supreme) and diverters.
- Anti-skid floor tiles and full-height 7-foot wall tiles.
- Premium sanitaryware (Jaquar / Kohler / Hindware wall-hung commode and basin). Check our specialized **<a href="/services/bathroom-renovation" class="text-orange-500 font-bold hover:underline">Bathroom Renovation Services</a>**.

### 4. Modular Kitchen Platform & Civil Setup (₹90,000 – ₹2,20,000)
- **Civil Counter:** Heavy-duty black galaxy granite or composite quartz countertop with 45-degree chamfered edge.
- **Backsplash & Plumbing:** Subway tiles or full-slab splashback, double-bowl stainless steel sink (Nirali), and concealed point for water purifier and dishwasher.
- **Cabinetry:** Marine-grade BWP (Boiling Water Proof) ply with anti-scratch acrylic or soft-close laminate drawers. Read our **<a href="/services/kitchen-work" class="text-orange-500 font-bold hover:underline">Modular Kitchen Guide</a>**.

### 5. Concealed Electrical Rewiring (₹45,000 – ₹95,000)
- Replacing aged, brittle aluminium wiring with fire-retardant copper wires (Polycab/Finolex).
- Creating new wall-chased switch boxes with modular plates (Anchor Roma / Schneider).
- Dedicated 16A/25A heavy lines for 1.5-ton ACs, geysers, microwaves, and washing machines.

### 6. Painting & POP False Ceiling (₹75,000 – ₹1,80,000)
- Scraping walls, applying 2 coats of Birla White wall putty, primer, and 2 to 3 coats of washable acrylic emulsion (Asian Paints Royale / Tractor Emulsion).
- Modern designer **<a href="/services/pop-work" class="text-orange-500 font-bold hover:underline">POP False Ceiling</a>** with warm LED cove and downlights.

---

## 🏢 Mumbai Housing Society Rules You Must Know

Before banging the first hammer, ensure you comply with standard Mumbai Cooperative Housing Society (CHS) guidelines:
1. **Renovation NOC & Indemnity Bond:** Submit written application detailing the scope of work (especially plumbing and tile breaking).
2. **Refundable Security Deposit:** Most societies require ₹25,000 to ₹1,00,000 security deposit before issuing lift usage permissions.
3. **Working Hours:** Strict timings (typically 9:30 AM to 1:00 PM, and 2:30 PM to 6:00 PM). Noisy drill/hammer work is strictly prohibited on Sundays and public holidays.
4. **Lift Protection:** Protect society passenger lift with hard foam sheets or MDF boards to prevent scratches.

---

## 💡 How Working With AMS Civil Construction Saves You ₹1,00,000+

- **Zero Subcontractor Margins:** We have in-house civil mistris, tile setters, plumbers, and electricians. No commission agents.
- **Fixed-Price Contract:** We issue a comprehensive BOQ (Bill of Quantities) upfront. No mid-project price escalations.
- **Guaranteed Completion Timelines:** 1 BHK completed in 30–40 days; 2 BHK completed in 45–60 days.

Ready to give your Mumbai flat a stunning, durable transformation? **<a href="/contact" class="text-orange-500 font-bold hover:underline">Schedule a Free Site Inspection</a>** or call **<a href="tel:+918779391690" class="text-orange-400 font-bold hover:underline">+91 87793 91690</a>** today!
`
  },

  /* ── 3. How to Fix Wall Seepage & Paint Peeling ── */
  {
    title: 'How to Fix Wall Seepage & Paint Peeling in Mumbai Flats: Permanent Civil Solutions (2026)',
    slug: 'wall-seepage-paint-peeling-treatment-mumbai-flats',
    excerpt: 'Tired of wall putty bubbling and paint peeling every monsoon? Simple repainting will not fix it. Here is the permanent civil engineering treatment for internal seepage, bathroom leaks, and external wall hairline cracks in Mumbai apartments.',
    featuredImage: '/images/plaster-work.jpg',
    author: 'AMS Structural Waterproofing Team',
    seoKeywords: 'wall seepage solution Mumbai, paint peeling repair Mumbai flats, waterproofing contractor Mumbai, dampness treatment walls, external wall cracks civil repair, efflorescence treatment, salt bubbling on walls',
    locationTags: ['Mumbai', 'South Mumbai', 'Worli', 'Bandra', 'Andheri', 'Thane', 'Navi Mumbai', 'Dadar'],
    published: true,
    publishDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    content: `
Every year after the heavy Mumbai monsoon, thousands of homeowners witness the same frustrating sight: expensive wall paint bubbling up, plaster turning powdery and falling off, white salt deposits (efflorescence) blooming across walls, and a damp, musty smell in bedrooms.

Most residents call a local painter who merely scrapes off the loose paint, slaps on a layer of waterproof putty, and repaints. **Within 60 to 90 days, the exact same dampness returns.**

Why? Because **paint peeling is only a symptom—not the disease**. Moisture is trapped deep inside the brick masonry and concrete beams. Unless the root source of water ingress is treated with proper civil waterproofing techniques, repainting is simply throwing money down the drain.

Here is the definitive guide by our structural civil engineers on diagnosing and permanently curing wall seepage in Mumbai apartments.

---

## 🔬 The 4 Main Sources of Seepage in Mumbai Buildings

Before applying any chemicals, you must identify where the moisture originates:

### 1. Leaking Sunken Slabs From Bathrooms Above
- **Symptom:** Yellowish water rings, damp patches, or active water droplets on your bathroom or bedroom ceiling.
- **Cause:** The waterproofing membrane of the upper floor bathroom has failed around the drain trap (nahani trap) or concealed hot-water CPVC joints.
- **Solution:** Requires specialized non-destructive pressure grouting of joints or re-waterproofing the sunken slab. Explore our **<a href="/services/bathroom-renovation" class="text-orange-500 font-bold hover:underline">Bathroom Renovation & Waterproofing</a>**.

### 2. Building External Wall Hairline Cracks
- **Symptom:** Damp patches on external-facing walls that intensify during heavy rain accompanied by gusty coastal winds.
- **Cause:** Mumbai's temperature swings expand and contract cement plaster, creating micro-fissures. Wind-driven rain penetrates these cracks like a sponge.

### 3. Unsealed Window Frame Perimeters
- **Symptom:** Water pooling on window sills, dampness right underneath sliding window tracks, and peeling paint along window corners.
- **Cause:** Dried-up, cracked silicone sealant between the aluminium/UPVC window frame and external plaster sill.

### 4. Capillary Action / Rising Dampness
- **Symptom:** Blistering paint up to 3 to 4 feet from the floor level in Ground or 1st-floor flats.
- **Cause:** Lack of a proper Damp Proof Course (DPC) membrane during original construction, allowing groundwater to rise up through porous brickwork.

---

## 🛠️ The Permanent 5-Step Civil Treatment (Not Just Paint!)

Here is the exact protocol our team uses to guarantee dry, pristine walls:

\`\`\`
[1. Locate Root Cause] ➔ [2. Hack Infected Plaster] ➔ [3. Crystalline Chemical Coat] ➔ [4. Polymer Plastering] ➔ [5. Breathable Finish]
\`\`\`

### Step 1: Fix the Source First
Never treat the wall until the source is sealed. If a pipeline is leaking inside the wall, a plumber must locate it via pressure testing and replace the broken elbow or coupling.

### Step 2: Hack Down to the Bare Brick/RCC Substrate
Do not just scrape paint! The existing salt-infected plaster has lost its chemical bond. We chisel away the damaged plaster **6 inches beyond the damp patch** until sound red brick or concrete is exposed.

### Step 3: Salt Neutralization & Crystalline Slurry
The bare masonry is wire-brushed and treated with an efflorescence-neutralizing chemical. Then, we apply 2 cross-coats of an **elastomeric polymer crystalline slurry** (such as Dr. Fixit Fastflex or Fosroc Brushbond). The active chemicals penetrate deep into the capillaries of the concrete, forming insoluble crystals that permanently block water pores.

### Step 4: Re-Plastering with Polymer Bonding Agent
We replaster the area using a 1:4 cement-sand mortar mixed with an integral waterproofing compound (Dr. Fixit Pidiproof LW+) and SBR latex bonding agent. This ensures the new patch bonds seamlessly to the surrounding wall without shrinkage cracks. Discover our **<a href="/services/plaster-work" class="text-orange-500 font-bold hover:underline">Plastering & Masonry Services</a>**.

### Step 5: Breathable Putty & Anti-Fungal Topcoat
Once cured, we apply water-resistant white cement-based putty followed by an anti-fungal acrylic emulsion that allows the wall to "breathe" without trapping vapor.

---

## ⚖️ How to Handle Seepage From Upper-Floor Neighbours in Mumbai CHS

In cooperative housing societies, 80% of ceiling seepage is caused by the upstairs flat's washroom. If you face resistance from your neighbour:
1. **BMC / CHS By-Law Rule:** Under Model Bye-Laws of Mumbai Co-operative Housing Societies (Bye-law No. 160), repairs to internal plumbing and terrace/sunken slab leaks must be facilitated. If the leak affects another flat, the society management can legally inspect and order repairs.
2. **Non-Destructive PU Injection Grouting:** You do not always need to break your neighbour's luxury tiles! We can inject hydrophobic Polyurethane (PU) resin under high pressure directly from **your ceiling**, which expands 20x upon contact with water and seals the leak from below. Learn about our **<a href="/services/waterproofing" class="text-orange-500 font-bold hover:underline">PU Injection Grouting Services</a>**.

---

## 💵 Seepage Repair Costs in Mumbai (2026 Price Guide)

- **External Crack Filling & Elastomeric Coating:** ₹35 – ₹55 per sq. ft.
- **Internal Wall Deep Chemical Plaster Treatment:** ₹65 – ₹95 per sq. ft.
- **Window Perimeter Silicone & Polymer Grouting:** ₹450 – ₹850 per window.
- **PU Pressure Injection Grouting (Per Port/Nozzle):** ₹1,200 – ₹1,800 per nozzle point.
- **Complete Bathroom Strip & Re-waterproofing:** ₹25,000 – ₹45,000 per washroom.

---

## 🏆 Protect Your Home Today With AMS Civil Construction

Stop wasting money on temporary paint touch-ups that peel away every monsoon. Get a certified civil engineer to inspect your property with moisture detection meters.

- 📞 **Direct Call:** **<a href="tel:+918779391690" class="text-orange-400 font-bold hover:underline">+91 87793 91690</a>** / **<a href="tel:+919004298911" class="text-orange-400 font-bold hover:underline">+91 90042 98911</a>**
- 💬 **WhatsApp Us Photos:** Send pictures of your damp walls on **<a href="https://wa.me/918779391690?text=Hi%20AMS%20Civil!%20I%20have%20wall%20seepage%20issues%20in%20my%20flat%20and%20need%20an%20inspection." target="_blank" class="text-green-400 font-bold hover:underline">WhatsApp (+91 87793 91690)</a>** for an instant preliminary diagnosis!
- 🌐 **Online Estimate:** Try our **<a href="/calculator" class="text-orange-500 font-bold hover:underline">Renovation Calculator</a>** or book a **<a href="/free-consultation" class="text-orange-500 font-bold hover:underline">Free Site Consultation</a>**.
`
  }
];

async function insertAllBlogs() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db('mandal_civil');
    const collection = db.collection('blogs');

    for (const blog of blogs) {
      const existing = await collection.findOne({ slug: blog.slug });
      if (existing) {
        await collection.updateOne({ slug: blog.slug }, { $set: blog });
        console.log('✅ Updated existing blog:', blog.title);
      } else {
        const res = await collection.insertOne(blog);
        console.log('✅ Created new blog with ID:', res.insertedId, '-', blog.title);
      }
    }
    console.log('\n🎉 All blogs successfully inserted into MongoDB!');
  } catch (err) {
    console.error('❌ Error inserting blogs:', err);
  } finally {
    await client.close();
  }
}

insertAllBlogs();
