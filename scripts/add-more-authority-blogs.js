// scripts/add-more-authority-blogs.js
// Inserts 3 more massive-search authority blogs into MongoDB

const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Please provide MONGODB_URI');
  process.exit(1);
}

const blogs = [
  /* ── 1. Curing Period for Concrete ── */
  {
    title: 'Curing Period for Concrete: Slabs, Columns & Plaster (Days, Methods & Mistakes to Avoid)',
    slug: 'curing-period-for-concrete-slabs-columns-plaster-guide',
    excerpt: 'How many days should you cure concrete slabs, columns, and plaster? Discover the standard IS 456 curing schedules for OPC and PPC cement, ponding vs gunny bag methods, and why under-curing causes permanent structural cracks and leakage.',
    featuredImage: '/images/plaster-work.png',
    author: 'AMS Concrete Technology & Quality Assurance Cell',
    seoKeywords: 'concrete curing days IS 456, slab curing time days, column curing with gunny bags, plaster curing period, minimum curing days for OPC PPC cement, curing mistakes in house construction',
    locationTags: ['Mumbai', 'Thane', 'Navi Mumbai', 'Pune', 'Maharashtra', 'India'],
    published: true,
    publishDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    content: `
Ask any veteran civil engineer the secret to a crack-free, leak-proof home that stands strong for 100 years, and they will give you a single word: **CURING**.

You can purchase the most expensive UltraTech 53-grade cement and Tata Tiscon 550D TMT steel, but if your site workers fail to cure the concrete properly during the first 14 to 21 days, **the concrete can permanently lose up to 50% of its designed compressive strength**, leading to shrinkage cracks, surface dusting, and chronic monsoon leakage.

In this guide, our concrete quality engineers explain the exact **Indian Standard (IS 456:2000)** curing timelines for slabs, columns, beams, and plaster, along with the best practical curing methods.

---

## 🔬 What is Concrete Curing & Why is It Crucial?

Concrete does not dry to become hard—**it cures through a chemical exothermic reaction called "Hydration"**. 

When water is added to cement, calcium silicate hydrate (C-S-H) gel forms, interlocking microscopic crystals into solid rock. This hydration process releases heat. If water evaporates too rapidly due to hot sun or coastal wind, hydration stops prematurely, leaving behind millions of porous voids and microscopic shrinkage cracks.

---

## 📅 Official IS 456:2000 Curing Timelines (Quick Reference Table)

| Structural Element | OPC (Ordinary Portland Cement) | PPC / PSC (Blended Fly Ash / Slag Cement) | Best Practical Curing Method |
| :--- | :--- | :--- | :--- |
| **RCC Roof Slab (Chhat)** | **Minimum 14 Days** | **Minimum 21 Days** | **Ponding Method** (2-inch standing water bunds) |
| **RCC Columns & Pillars** | **14 Days** | **14 – 21 Days** | **Wet Hessian / Gunny Bags wrapped around column** |
| **RCC Beams & Chajjas** | **14 Days** | **14 – 21 Days** | **Wet Hessian covering & continuous spraying** |
| **Brick Masonry Walls** | **7 – 10 Days** | **10 – 14 Days** | **Hose pipe pressure spray (3 times daily)** |
| **Internal & External Plaster** | **10 – 14 Days** | **14 – 21 Days** | **Fine mist / shower spray (Morning & Evening)** |
| **PCC Ground Flooring Bed** | **10 Days** | **14 Days** | **Ponding with water or moist sand beds** |

> 📌 **Why PPC / Blended Cement Needs More Curing Days:** Most homeowners today use PPC (Portland Pozzolana Cement with fly ash) because it resists coastal salt attacks. However, pozzolanic reactions are slower. **PPC must be cured for at least 21 days** to achieve its full rock-hard density!

---

## 🛠️ The 3 Best Curing Methods Used on Sites

### 1. Ponding Method (The Gold Standard for Roof Slabs)
- **How it's done:** Within 24 hours of slab casting (as soon as the surface hardens), workers construct small 2-inch high mortar bunds (*Kyaris* or *Pats*) dividing the slab into 10x10 foot squares. The compartments are filled with 1.5 to 2 inches of clean standing water and kept submerged continuously for **14 to 21 days**.
- **Crucial Rule:** Never allow the pond to dry out. Refill every morning and evening.

### 2. Wet Gunny Bags / Hessian Cloth (For Vertical Columns & Beams)
- **How it's done:** Vertical columns cannot hold standing ponds of water. Wrap jute hessian bags tightly around the entire perimeter of the column and secure with binding wire. 
- **Frequency:** Wet the bags thoroughly with a hose pipe at least **3 to 4 times a day** so the hessian remains continuously moist like a damp sponge.

### 3. Membrane Curing Compounds (For Water-Scarce Sites)
- **How it's done:** On remote plots where tanker water is limited, workers spray an acrylic/wax-based liquid curing compound (e.g., Sika Antisol or Fosroc Concure) immediately after formwork removal. It forms a temporary impermeable membrane that seals 95% of internal moisture inside the concrete. Read our **<a href="/services/waterproofing" class="text-orange-500 font-bold hover:underline">Waterproofing Protocols</a>**.

---

## ⚠️ 4 Costly Curing Mistakes Homeowners Make

1. **Stopping Curing After Just 3 to 5 Days:** Many contractors rush to strike formwork and stop watering within 5 days. At 7 days, concrete has only achieved **65% of its strength**. Full design strength is reached only past 21 days!
2. **Direct Heavy Jet Spray on Fresh Plaster:** Blasting high-pressure water onto plaster that is less than 24 hours old washes away the cement slurry, creating sandy, crumbly surfaces. Always use a gentle shower nozzle. Explore our **<a href="/services/plaster-work" class="text-orange-500 font-bold hover:underline">Plastering & Masonry Services</a>**.
3. **Using Muddy or Saline Borewell Water:** In coastal zones like Vasai-Virar, water with high chloride/salt content corrodes internal steel reinforcement. Always test curing water for neutral pH (6.5 to 8.0).
4. **Striking Slab Shuttering Too Early:** Never remove bottom slab props before **14 days** (for spans up to 4.5m) and **21 days** (for spans over 4.5m).

---

## 🏆 Plan Your Construction With AMS Civil Construction

Quality construction is in the details. At **AMS Civil Construction**, our on-site structural engineers enforce strict daily curing logs and digital slump tests on every project.

- Check your construction budget with our **<a href="/calculator" class="text-orange-500 font-bold hover:underline">Free Cost Calculator</a>**.
- Review our **<a href="/packages" class="text-orange-500 font-bold hover:underline">Turnkey Construction Packages</a>**.
- Or **<a href="/contact" class="text-orange-500 font-bold hover:underline">Book an On-Site Engineering Visit</a>** with our team today!
`
  },

  /* ── 2. Earthquake-Resistant House Construction ── */
  {
    title: 'How to Build an Earthquake-Resistant House in Maharashtra (Zone 3 & 4 Seismic Rules)',
    slug: 'how-to-build-earthquake-resistant-house-maharashtra-seismic-guide',
    excerpt: 'Maharashtra sits in moderate to severe seismic zones. Learn the core civil engineering rules for building an earthquake-resistant bungalow or building: ductile detailing, plinth & lintel bands, column stirrups spacing, and soil safety.',
    featuredImage: '/images/bungalow-construction.png',
    author: 'AMS Seismic Engineering & Structural Division',
    seoKeywords: 'earthquake resistant house construction India, seismic zone 3 Maharashtra building rules, ductile detailing IS 13920, plinth band lintel band earthquake, column ring spacing earthquake, structural engineer earthquake design',
    locationTags: ['Mumbai', 'Thane', 'Navi Mumbai', 'Pune', 'Palghar', 'Maharashtra', 'India'],
    published: true,
    publishDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    content: `
Maharashtra has a long geological history of seismic activity—from the catastrophic 1993 Killari (Latur) earthquake to the 1967 Koyna tremor. Most of the Mumbai Metropolitan Region (MMR), Thane, Palghar, Raigad, and the coastal Konkan belt are officially classified under **Seismic Zone III (Moderate Damage Risk)**, while parts of western Maharashtra border **Zone IV**.

When constructing a multi-storey family bungalow or residential apartment, **earthquake resistance is not an optional luxury—it is life safety insurance**.

Earthquakes do not kill people; collapsing buildings do. Here is a definitive guide on how certified structural engineers design and construct earthquake-resistant homes in compliance with **IS 1893:2016** and **IS 13920:2016**.

---

## 🏛️ What Makes a Building "Earthquake-Resistant"?

An earthquake-resistant structure is not designed to be 100% rigid and immovable. If a building is too rigid, seismic shear waves will shatter it like glass.

Instead, a well-engineered home is designed with **"Ductility"**—the structural framework can flex, sway, and absorb seismic energy without sudden catastrophic collapse, allowing occupants to safely exit.

---

## 🧱 5 Essential Structural Safeguards for Seismic Safety

### 1. Simple, Symmetrical Architectural Geometry
- **The Rule:** Symmetrical square or rectangular floor plans perform vastly better than irregular L-shaped, T-shaped, or U-shaped buildings.
- **Why:** During an earthquake, ground shaking creates torsional twisting forces in asymmetric structures. If an L-shape is necessary, engineers insert a **Seismic Expansion Joint** dividing the structure into two independent vibrating rectangles.

### 2. Reinforced Concrete Horizontal Bands (Tie Bands)
In load-bearing or framed masonry structures, continuous reinforced horizontal bands act like steel belts binding the building together:
- **Plinth Band:** Cast at the ground foundation level to prevent differential settlement during soil liquefaction.
- **Lintel Band:** Continuous RCC band cast across all door and window tops to prevent diagonal shear cracks.
- **Roof / Slab Band:** Tied monolithically into the columns to transfer seismic forces evenly.

### 3. Ductile Detailing of Column Stirrups (IS 13920 Standard)
The most common point of building failure during tremors is the column-beam junction:
- **135-Degree Hook Bends:** Traditional stirrups (rings) have weak 90-degree hooks that open up under ground shaking. Seismic design strictly mandates **135-degree hooks with a 10d extension** embedded deep into the concrete core.
- **Dense Ring Spacing Near Beam Junctions:** Stirrup spacing must be condensed to **100mm (4 inches)** within the top and bottom 600mm of every column, where shear forces peak.

### 4. Soil Testing & Proper Foundation Depth
- Soft coastal alluvial soils and black cotton clay amplify earthquake waves.
- Soil bearing capacity (SBC) testing is mandatory before foundation design. In weak soils, isolated footings must be tied together with **continuous grade beams or raft foundations** so the entire house moves as a single solid unit during tremors. Learn about our **<a href="/services/bungalow-construction" class="text-orange-500 font-bold hover:underline">Bungalow Structural Engineering</a>**.

### 5. High-Ductility TMT Rebar (Fe 500D / 550D)
Always specify steel with the **"D" designation** (e.g., Tata Tiscon 550D or JSW Neosteel). The "D" stands for **Ductility**—these bars have a minimum elongation percentage of 16% to 18%, allowing them to stretch and absorb seismic shocks without snapping.

---

## 🏢 The Danger of "Soft Storeys" (Open Ground Floor Parking)

In Mumbai and suburbs, most buildings leave the ground floor completely open as stilt parking, with masonry walls starting only from the 1st floor.

- **The Danger:** This creates a dangerous structural vulnerability known as a **"Soft Storey"**. Under lateral earthquake force, the unbraced ground-floor columns can buckle sideways, causing the upper floors to pancake down.
- **The Engineering Solution:** Certified civil contractors reinforce stilt parking columns with **thick shear walls or RC diagonal bracing** to ensure equal lateral stiffness. Read our **<a href="/services/plaster-work" class="text-orange-500 font-bold hover:underline">Structural Concrete Services</a>**.

---

## 💡 Does Earthquake Resistance Increase Construction Costs?

**By barely 3% to 5%!**
Incorporating earthquake-resistant ductile detailing (135-degree hooks, tie beams, and proper grade steel) only adds a negligible cost during original construction:
- For a ₹50 Lakh bungalow project, the extra seismic reinforcement typically costs **only ₹1.2 Lakh to ₹1.8 Lakh**.
- Retrofitting a damaged building after an earthquake costs ten times more!

---

## 🏆 Build Confidently With AMS Civil Construction

At **AMS Civil Construction**, every residential and commercial project is vetted by licensed structural engineers in strict compliance with Bureau of Indian Standards (BIS) seismic codes:
- Full soil testing and load distribution analysis.
- Certified Fe 550D steel and M25/M30 concrete mixes.
- Transparent BOQs and structural stability certification.

Planning to build an independent bungalow or apartment in Mumbai, Thane, or Navi Mumbai?
- Compute your budget on our **<a href="/calculator" class="text-orange-500 font-bold hover:underline">Free Cost Calculator</a>**.
- Check our **<a href="/packages" class="text-orange-500 font-bold hover:underline">Turnkey Packages</a>**.
- Or **<a href="/contact" class="text-orange-500 font-bold hover:underline">Contact our structural team</a>** for a free engineering blueprint review!
`
  },

  /* ── 3. Tiles vs Marble vs Granite Flooring ── */
  {
    title: 'Tiles vs Marble vs Granite Flooring: Cost, Durability & Best Choice (2026 Guide)',
    slug: 'tiles-vs-marble-vs-granite-flooring-cost-comparison-2026',
    excerpt: 'Deciding between Vitrified Tiles, Indian Marble, Italian Marble, and Granite for your home flooring? Comprehensive 2026 price breakdown per sq ft, installation costs, scratch resistance, and room-by-room recommendations.',
    featuredImage: '/images/flooring-work.png',
    author: 'AMS Flooring & Interior Finishing Division',
    seoKeywords: 'tiles vs marble flooring cost India 2026, Italian marble vs vitrified tiles, granite flooring cost per sq ft, best flooring for living room India, GVT tiles laying cost, flooring contractor Mumbai',
    locationTags: ['Mumbai', 'Thane', 'Navi Mumbai', 'Pune', 'Maharashtra', 'India'],
    published: true,
    publishDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    content: `
Flooring sets the entire visual tone, luxury quotient, and practical comfort of your home. It is also one of the most permanent interior investments you will ever make—unlike wall paint or curtains, changing your flooring requires hacking down to the slab, generating tons of debris, and vacating your home.

The three primary contenders for Indian residential flooring are:
1. **Glazed Vitrified Tiles (GVT / PGVT)**
2. **Natural Indian & Italian Marble**
3. **Natural Granite**

Which material suits your budget, withstands daily kitchen stains and heavy foot traffic, and retains its luster over decades?

Here is the complete **2026 cost, durability, and maintenance comparison** from our seasoned flooring civil specialists.

---

## 📊 Comprehensive Head-to-Head Comparison Table

| Flooring Material | Material Cost (Per Sq. Ft.) | Laying & Polishing Cost | Total Installed Cost (Per Sq. Ft.) | Scratch & Stain Resistance | Maintenance Required |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Glazed Vitrified Tiles (GVT / PGVT)** | **₹55 – ₹110** | ₹35 – ₹45 (Adhesive/Mortar) | **₹90 – ₹155 / sq ft** | **Very High** (Stain & scratch proof) | Zero (Simple wet mop) |
| **Large Format Slabs (800x1600mm / 4x2)** | **₹85 – ₹160** | ₹45 – ₹60 (Laser leveling) | **₹130 – ₹220 / sq ft** | **Very High** (Seamless look) | Zero maintenance |
| **Indian Marble (Makrana / Morwad)** | **₹80 – ₹180** | ₹90 – ₹140 (Laying + Mirror polish) | **₹170 – ₹320 / sq ft** | Moderate (Porous, absorbs turmeric/oil) | High (Periodic diamond polish) |
| **Italian Marble (Botticino / Statuario)** | **₹350 – ₹1,200+** | ₹140 – ₹220 (Epoxy resin + Polish) | **₹490 – ₹1,420+ / sq ft** | Low to Moderate (Soft, luxurious stone) | High (Specialized stone sealers) |
| **Natural Granite (South Black / Tan Brown)**| **₹95 – ₹220** | ₹55 – ₹80 (Laying + Edge chamfer) | **₹150 – ₹300 / sq ft** | **Immense** (Virtually indestructible) | Very Low |

---

## 🌟 1. Glazed Vitrified Tiles (GVT): The Modern Practical Champion

Vitrified tiles are manufactured by hydraulic pressing of silica, quartz, and feldspar fired at over 1,200°C, producing a dense, glass-like non-porous body.

### The Advantages:
- **100% Stain & Scratch Resistant:** Spill hot tea, coffee, turmeric, or oil—vitrified tiles do not absorb stains (water absorption is less than 0.05%).
- **Seamless Marble Look:** Modern high-definition digital printing reproduces authentic Italian Statuario, Calacatta, and Onyx vein patterns at 1/10th the price!
- **Fast Installation:** A standard 2 BHK flat can be completely tiled in **4 to 6 days** without noisy stone-grinding polishing. Explore our **<a href="/services/flooring-work" class="text-orange-500 font-bold hover:underline">Flooring & Tiling Work</a>**.

---

## 🏛️ 2. Natural Marble: The Symbol of Timeless Royalty

Nothing compares to the authentic tactile feel, cool temperature, and unique natural veining of genuine marble:
- **Indian Marble:** Quarried in Rajasthan (Makrana, Morwad, Wonder White). Harder than Italian marble, economical, and durable.
- **Italian Marble:** Quarried in Italy (Bottochino, Carrara, Dyna). Famous for crystalline translucence, delicate veining, and supreme prestige.

### The Trade-Offs:
- **Porous & Acid-Sensitive:** Being calcium carbonate, raw marble reacts instantly with lemon juice, vinegar, or harsh phenyl cleaners, leaving etched dull spots.
- **Complex Installation:** Italian marble requires skilled artisans, fiberglass mesh backing, epoxy pinhole filling, and an intensive **7-stage diamond polish** that takes 2 to 3 weeks.

---

## 🪨 3. Natural Granite: The Indestructible Workhorse

Formed from cooling volcanic magma, granite is one of the hardest natural minerals on Earth.
- **Best Use:** Kitchen platforms, door & window frame cladding, internal staircase steps, and high-traffic outdoor balconies.
- **Heat & Scratch Immunity:** You can place hot cooking pans directly on a granite counter without fear of cracking or scorch marks. Check our **<a href="/services/kitchen-work" class="text-orange-500 font-bold hover:underline">Modular Kitchen Civil Services</a>**.

---

## 💡 Room-by-Room Flooring Recommendation

| Room / Area | Best Flooring Choice | Why It Works |
| :--- | :--- | :--- |
| **Living & Dining Hall** | **Large Format GVT (800x1600mm) or Italian Marble** | Creates an expansive, grand, and luminous luxury feel. |
| **Bedrooms** | **Wooden-finish Vitrified Plank Tiles or Matte GVT** | Adds warmth, cozy ambiance, and slip-free comfort. |
| **Kitchen Floor & Counter** | **Black Galaxy Granite Counter + Anti-skid GVT Tiles** | 100% immune to boiling oil splatters, turmeric stains, and dropped utensils. |
| **Bathrooms & Balconies** | **Anti-Skid Matte Vitrified Tiles with Epoxy Grouting** | Prevents slippery falls and stops water seepage completely. Explore our **<a href="/services/bathroom-renovation" class="text-orange-500 font-bold hover:underline">Bathroom Renovation Services</a>**. |
| **Staircases & Window Sills**| **Chamfered Jet Black Granite or Quartz Stone** | Heavy edge impact resistance that never chips. |

---

## 🏆 Flawless Flooring Execution With AMS Civil Construction

Whether laying imported Italian marble or large 6-foot vitrified slabs, precision leveling is paramount. At **AMS Civil Construction**:
- We use **motorized laser levels and polymer tile adhesives (Roff/Laticrete)** to guarantee zero lip-page (uneven tile edges) and 100% solid bed compaction without hollow hollow spots.
- Complete stone crystallization polishing and edge chamfering.

Planning to renovate your home flooring or build from scratch?
- Compute your budget on our **<a href="/calculator" class="text-orange-500 font-bold hover:underline">Free Cost Calculator</a>**.
- Check our **<a href="/packages" class="text-orange-500 font-bold hover:underline">Turnkey Packages</a>**.
- Or **<a href="/contact" class="text-orange-500 font-bold hover:underline">Schedule an On-Site Flooring Consultation</a>** with our specialists today!
`
  }
];

async function insertMoreBlogs() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db('mandal_civil');
    const collection = db.collection('blogs');

    for (const blog of blogs) {
      const existing = await collection.findOne({ slug: blog.slug });
      if (existing) {
        await collection.updateOne({ slug: blog.slug }, { $set: blog });
        console.log('✅ Updated existing authority blog:', blog.title);
      } else {
        const res = await collection.insertOne(blog);
        console.log('✅ Created new authority blog with ID:', res.insertedId, '-', blog.title);
      }
    }
    console.log('\n🎉 All 3 More Authority Blogs successfully published into MongoDB!');
  } catch (err) {
    console.error('❌ Error inserting blogs:', err);
  } finally {
    await client.close();
  }
}

insertMoreBlogs();
