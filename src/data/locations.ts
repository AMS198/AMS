// src/data/locations.ts
// All Mumbai service areas — each gets its own SEO-optimised page at /areas/[location]

export interface LocationData {
  slug:      string;
  name:      string;
  zone:      string;
  district:  string;
  pincode?:  string;
  landmarks: string[];
  nearby:    string[];
}

export const locations: LocationData[] = [
  /* ── South Mumbai ───────────────────────────────────────── */
  { slug:'dadar',        name:'Dadar',        zone:'South Mumbai',  district:'Mumbai City',   pincode:'400014', landmarks:['Dadar Station','Shivaji Park','Dadar Market'],              nearby:['Prabhadevi','Mahalaxmi','Worli'] },
  { slug:'lower-parel',  name:'Lower Parel',  zone:'South Mumbai',  district:'Mumbai City',   pincode:'400013', landmarks:['Phoenix Mills','High Street Phoenix','Palladium Mall'],       nearby:['Prabhadevi','Worli','Mahalaxmi'] },
  { slug:'worli',        name:'Worli',         zone:'South Mumbai',  district:'Mumbai City',   pincode:'400018', landmarks:['Worli Sea Face','Bandra-Worli Sea Link','Nehru Science Centre'], nearby:['Lower Parel','Prabhadevi','Mahalaxmi'] },
  { slug:'prabhadevi',   name:'Prabhadevi',   zone:'South Mumbai',  district:'Mumbai City',   pincode:'400025', landmarks:['Siddhivinayak Temple','Prabhadevi Station'],                nearby:['Dadar','Worli','Lower Parel'] },
  { slug:'colaba',       name:'Colaba',        zone:'South Mumbai',  district:'Mumbai City',   pincode:'400005', landmarks:['Gateway of India','Taj Hotel','Colaba Causeway'],            nearby:['Marine Lines','Fort','Churchgate'] },
  { slug:'fort',         name:'Fort',          zone:'South Mumbai',  district:'Mumbai City',   pincode:'400001', landmarks:['Flora Fountain','CSMT','Bombay High Court'],                 nearby:['Colaba','Marine Lines','Churchgate'] },
  { slug:'marine-lines', name:'Marine Lines',  zone:'South Mumbai',  district:'Mumbai City',   pincode:'400002', landmarks:['Marine Drive','Girgaon Chowpatty','Mumbai University'],      nearby:['Colaba','Churchgate','Tardeo'] },
  { slug:'byculla',      name:'Byculla',       zone:'South Mumbai',  district:'Mumbai City',   pincode:'400027', landmarks:['Byculla Zoo','Byculla Station','Bhau Daji Lad Museum'],     nearby:['Sion','Mahalaxmi','Dadar'] },
  { slug:'mahalaxmi',   name:'Mahalaxmi',     zone:'South Mumbai',  district:'Mumbai City',   pincode:'400011', landmarks:['Mahalaxmi Temple','Mahalaxmi Racecourse','Haji Ali'],        nearby:['Lower Parel','Worli','Dadar'] },
  { slug:'churchgate',  name:'Churchgate',    zone:'South Mumbai',  district:'Mumbai City',   pincode:'400020', landmarks:['Churchgate Station','Eros Cinema','Rajabai Clock Tower'],     nearby:['Marine Lines','Fort','Colaba'] },
  { slug:'tardeo',      name:'Tardeo',        zone:'South Mumbai',  district:'Mumbai City',   pincode:'400007', landmarks:['Tardeo AC Market','Haji Ali Dargah','Tata Memorial Hospital'], nearby:['Mahalaxmi','Lower Parel','Marine Lines'] },
  { slug:'parel',       name:'Parel',         zone:'South Mumbai',  district:'Mumbai City',   pincode:'400012', landmarks:['Parel Station','Lodha World One','Peninsula Towers'],        nearby:['Dadar','Lower Parel','Byculla'] },
  { slug:'mahim',       name:'Mahim',         zone:'South Mumbai',  district:'Mumbai City',   pincode:'400016', landmarks:['Mahim Beach','Mahim Fort','Mahim Causeway'],                 nearby:['Dadar','Bandra','Matunga'] },
  { slug:'matunga',     name:'Matunga',       zone:'South Mumbai',  district:'Mumbai City',   pincode:'400019', landmarks:['Matunga Station','Five Gardens','King Circle'],              nearby:['Dadar','Sion','Mahim'] },

  /* ── Western Line ───────────────────────────────────────── */
  { slug:'bandra',       name:'Bandra',        zone:'Western Line',  district:'Mumbai Suburban',pincode:'400050', landmarks:['Bandra West','Pali Hill','Carter Road','Bandstand','Linking Road','BKC'], nearby:['Khar','Santacruz','Andheri','Worli'] },
  { slug:'khar',         name:'Khar',           zone:'Western Line',  district:'Mumbai Suburban',pincode:'400052', landmarks:['Khar Road Station','Khar West','Linking Road','Khar Gymkhana','Khar Danda'], nearby:['Bandra','Santacruz','Juhu','Vile Parle'] },
  { slug:'santacruz',   name:'Santacruz',      zone:'Western Line',  district:'Mumbai Suburban',pincode:'400054', landmarks:['Santacruz West','JVPD Scheme','Kalina','Airport Area'], nearby:['Khar','Vile Parle','Andheri','Juhu'] },
  { slug:'vile-parle',  name:'Vile Parle',     zone:'Western Line',  district:'Mumbai Suburban',pincode:'400057', landmarks:['Vile Parle West','N.M. College','Irla Market','ISKCON Juhu Area'], nearby:['Juhu','Santacruz','Andheri'] },
  { slug:'andheri',     name:'Andheri',        zone:'Western Line',  district:'Mumbai Suburban',pincode:'400058', landmarks:['Andheri West','Lokhandwala Complex','Versova','Oshiwara','SEEPZ'], nearby:['Juhu','Jogeshwari','Vile Parle','Goregaon'] },
  { slug:'juhu',        name:'Juhu',           zone:'Western Line',  district:'Mumbai Suburban',pincode:'400049', landmarks:['Juhu Tara Road','JVPD Scheme','Juhu Beach','ISKCON Temple','Prithvi Theatre'], nearby:['Vile Parle','Andheri','Santacruz','Khar'] },
  { slug:'jogeshwari',  name:'Jogeshwari',     zone:'Western Line',  district:'Mumbai Suburban',pincode:'400060', landmarks:['Jogeshwari Caves','Jogeshwari Station','Andheri Link Road'], nearby:['Andheri','Goregaon','Borivali'] },
  { slug:'goregaon',    name:'Goregaon',       zone:'Western Line',  district:'Mumbai Suburban',pincode:'400063', landmarks:['Film City','Oberoi Mall','Aarey Colony'],                   nearby:['Jogeshwari','Malad','Andheri'] },
  { slug:'malad',       name:'Malad',          zone:'Western Line',  district:'Mumbai Suburban',pincode:'400064', landmarks:['Infinity Mall','Malad Station','Orion Business Park'],       nearby:['Goregaon','Kandivali','Borivali'] },
  { slug:'kandivali',   name:'Kandivali',      zone:'Western Line',  district:'Mumbai Suburban',pincode:'400067', landmarks:['Kandivali Station','Growel 101 Mall','Thakur Village'],     nearby:['Malad','Borivali','Dahisar'] },
  { slug:'borivali',    name:'Borivali',       zone:'Western Line',  district:'Mumbai Suburban',pincode:'400092', landmarks:['Sanjay Gandhi National Park','Borivali Station','Raghuleela Mall'], nearby:['Kandivali','Dahisar','Mira Road'] },
  { slug:'dahisar',     name:'Dahisar',        zone:'Western Line',  district:'Mumbai Suburban',pincode:'400068', landmarks:['Dahisar Station','Dahisar Check Naka','Sanjay Gandhi Park'],  nearby:['Borivali','Mira Road','Bhayandar'] },
  { slug:'mira-road',   name:'Mira Road',      zone:'Western Line',  district:'Thane',          pincode:'401107', landmarks:['Mira Road Station','Big Bazaar Mira Road','Kashimira'],       nearby:['Dahisar','Bhayandar','Borivali'] },
  { slug:'bhayandar',   name:'Bhayandar',      zone:'Western Line',  district:'Thane',          pincode:'401101', landmarks:['Bhayandar Station','Golden Nest Circle','Uttan'],            nearby:['Mira Road','Vasai','Nalasopara'] },
  { slug:'vasai',       name:'Vasai',          zone:'Western Line',  district:'Palghar',        pincode:'401202', landmarks:['Vasai Fort','Vasai Station','Vasai Road'],                   nearby:['Bhayandar','Nalasopara','Virar'] },
  { slug:'naigaon',     name:'Naigaon',        zone:'Western Line',  district:'Palghar',        pincode:'401208', landmarks:['Naigaon Station','Juchandra','Sun City'],                    nearby:['Vasai','Bhayandar','Nalasopara'] },
  { slug:'nalasopara',  name:'Nalasopara',     zone:'Western Line',  district:'Palghar',        pincode:'401203', landmarks:['Nalasopara Station','Tulinj','Pelhar'],                     nearby:['Vasai','Virar','Bhayandar'] },
  { slug:'virar',       name:'Virar',          zone:'Western Line',  district:'Palghar',        pincode:'401303', landmarks:['Virar Station','Arnala Beach','Virar Fort'],                 nearby:['Nalasopara','Vasai','Bhayandar'] },

  /* ── Central Line ───────────────────────────────────────── */
  { slug:'sion',        name:'Sion',           zone:'Central Line',  district:'Mumbai City',   pincode:'400022', landmarks:['Sion Fort','Sion Station','Dharavi'],                       nearby:['Kurla','Byculla','Dadar'] },
  { slug:'kurla',       name:'Kurla',          zone:'Central Line',  district:'Mumbai Suburban',pincode:'400070', landmarks:['Kurla Station','Phoenix Marketcity','BKC'],                 nearby:['Sion','Ghatkopar','Bandra'] },
  { slug:'ghatkopar',   name:'Ghatkopar',      zone:'Central Line',  district:'Mumbai Suburban',pincode:'400077', landmarks:['Ghatkopar Metro','R-City Mall','Tilaknagar'],               nearby:['Kurla','Vikhroli','Mulund'] },
  { slug:'vikhroli',    name:'Vikhroli',       zone:'Central Line',  district:'Mumbai Suburban',pincode:'400083', landmarks:['Vikhroli Station','Godrej Colony','Eastern Express Highway'],nearby:['Ghatkopar','Bhandup','Kurla'] },
  { slug:'powai',       name:'Powai',          zone:'Central Line',  district:'Mumbai Suburban',pincode:'400076', landmarks:['Powai Lake','Hiranandani Gardens','IIT Bombay'],             nearby:['Vikhroli','Bhandup','Andheri'] },
  { slug:'chembur',     name:'Chembur',        zone:'Central Line',  district:'Mumbai Suburban',pincode:'400071', landmarks:['Chembur Station','Diamond Garden','RCF Colony'],             nearby:['Kurla','Ghatkopar','Sion'] },
  { slug:'bhandup',     name:'Bhandup',        zone:'Central Line',  district:'Mumbai Suburban',pincode:'400078', landmarks:['Bhandup Station','Bhandup Industrial Area','Powai Lake'],   nearby:['Vikhroli','Mulund','Thane'] },
  { slug:'mulund',      name:'Mulund',         zone:'Central Line',  district:'Mumbai Suburban',pincode:'400080', landmarks:['Mulund Station','R Mall Mulund','LBS Road'],                nearby:['Bhandup','Thane','Vikhroli'] },
  { slug:'thane',       name:'Thane',          zone:'Central Line',  district:'Thane',          pincode:'400601', landmarks:['Thane Station','Korum Mall','Upvan Lake','Viviana Mall'],    nearby:['Mulund','Dombivli','Navi Mumbai'] },
  { slug:'dombivli',    name:'Dombivli',       zone:'Central Line',  district:'Thane',          pincode:'421201', landmarks:['Dombivli Station','Xperia Mall','MIDC Dombivli'],            nearby:['Thane','Kalyan','Ulhasnagar'] },
  { slug:'kalyan',      name:'Kalyan',         zone:'Central Line',  district:'Thane',          pincode:'421301', landmarks:['Kalyan Station','Kalyan Fort','Metro Junction Mall'],        nearby:['Dombivli','Thane','Ulhasnagar'] },

  /* ── Navi Mumbai ────────────────────────────────────────── */
  /* ── Navi Mumbai (Missing Nodes) ────────────────────────── */
  { slug:'vashi',          name:'Vashi',           zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400703', landmarks:['Vashi Station','Inorbit Mall','Palm Beach Road'],          nearby:['Nerul','Airoli','Thane'] },
  { slug:'nerul',          name:'Nerul',            zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400706', landmarks:['Nerul Station','Seawoods Grand Central','Pandavkada Waterfalls'], nearby:['Vashi','Belapur','Koparkhairane'] },
  { slug:'belapur',        name:'Belapur',          zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400614', landmarks:['CBD Belapur Station','Belapur Fort','DY Patil Stadium'],   nearby:['Nerul','Kharghar','Panvel'] },
  { slug:'airoli',         name:'Airoli',           zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400708', landmarks:['Airoli Station','Airoli Bridge','TCS Campus Airoli'],       nearby:['Vashi','Ghansoli','Thane'] },
  { slug:'ghansoli',       name:'Ghansoli',         zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400701', landmarks:['Ghansoli Station','Reliance Corporate Park','ONGC Colony'], nearby:['Airoli','Koparkhairane','Vashi'] },
  { slug:'koparkhairane',  name:'Koparkhairane',    zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400709', landmarks:['Kopar Khairane Station','Millennium Business Park'],       nearby:['Ghansoli','Vashi','Nerul'] },
  { slug:'kharghar',       name:'Kharghar',         zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'410210', landmarks:['Central Park Kharghar','Golf Course','Utsav Chowk'],        nearby:['Belapur','Panvel','Nerul'] },
  { slug:'panvel',         name:'Panvel',           zone:'Navi Mumbai', district:'Raigad',       pincode:'410206', landmarks:['Panvel Station','Aamby Valley City','Khopoli Road'],        nearby:['Belapur','Kharghar','Navi Mumbai'] },
  { slug:'navi-mumbai',    name:'Navi Mumbai',      zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400703', landmarks:['CBD Belapur','Vashi','Nerul','Palm Beach Road'],          nearby:['Thane','Vashi','Nerul'] },

  /* ── Thane & Beyond (Missing Nodes) ─────────────────────── */
  { slug:'ulhasnagar',    name:'Ulhasnagar',     zone:'Central Line',  district:'Thane',          pincode:'421001', landmarks:['Ulhasnagar Market','Ulhasnagar Station'],               nearby:['Kalyan','Dombivli','Ambernath'] },
  { slug:'ambernath',     name:'Ambernath',      zone:'Central Line',  district:'Thane',          pincode:'421501', landmarks:['Shiv Temple Ambernath','Ambernath Station'],           nearby:['Ulhasnagar','Badlapur'] },
  { slug:'badlapur',      name:'Badlapur',       zone:'Central Line',  district:'Thane',          pincode:'421503', landmarks:['Badlapur Station','Barvi Dam'],                       nearby:['Ambernath','Ulhasnagar'] },

  /* ── Pune & Maharashtra (Extended) ───────────────────────── */
  { slug:'pune',             name:'Pune',             zone:'Maharashtra', district:'Pune',      pincode:'411001', landmarks:['Shaniwar Wada','Aga Khan Palace','Pune Station','Magarpatta City'], nearby:['Lonavala','Hadapsar','Pimpri Chinchwad'] },
  { slug:'hadapsar',         name:'Hadapsar',         zone:'Maharashtra', district:'Pune',      pincode:'411028', landmarks:['Magarpatta City','Amanora Mall','Serum Institute'],           nearby:['Pune','Pimpri Chinchwad','Lonavala'] },
  { slug:'pimpri-chinchwad', name:'Pimpri Chinchwad', zone:'Maharashtra', district:'Pune',      pincode:'411018', landmarks:['Auto Cluster','Bird Valley Park','Pavana River'],              nearby:['Pune','Hadapsar','Lonavala'] },
  { slug:'lonavala',         name:'Lonavala',         zone:'Maharashtra', district:'Pune',      pincode:'410401', landmarks:['Tiger Point','Bhushi Dam','Lonavala Station'],               nearby:['Pune','Pimpri Chinchwad','Hadapsar'] },
  { slug:'nasik',            name:'Nasik',            zone:'Maharashtra', district:'Nasik',     pincode:'422001', landmarks:['Kalaram Temple','Trimbakeshwar','Sula Vineyards','Panchavati'],       nearby:['Pune','Aurangabad'] },
  { slug:'nagpur',           name:'Nagpur',           zone:'Maharashtra', district:'Nagpur',    pincode:'440001', landmarks:['Deekshabhoomi','Zero Mile Marker','Futala Lake'],                 nearby:['Aurangabad','Nasik'] },
  { slug:'aurangabad',       name:'Aurangabad',       zone:'Maharashtra', district:'Aurangabad',pincode:'431001', landmarks:['Bibi Ka Maqbara','Panchakki','Prozone Mall'],                    nearby:['Nasik','Nagpur'] },

  /* ── Jharkhand & West Bengal (Extended) ──────────────────── */
  { slug:'ranchi',    name:'Ranchi',    zone:'Jharkhand', district:'Ranchi',         pincode:'834001', landmarks:['Pahari Mandir','Rock Garden','Jagannath Temple','Ranchi Lake'],  nearby:['Namkum','Bariatu'] },
  { slug:'namkum',    name:'Namkum',    zone:'Jharkhand', district:'Ranchi',         pincode:'834010', landmarks:['Namkum Railway Station','RK Mission'],                       nearby:['Ranchi','Bariatu'] },
  { slug:'bariatu',   name:'Bariatu',   zone:'Jharkhand', district:'Ranchi',         pincode:'834009', landmarks:['RIMS Ranchi','Bariatu Hill'],                                nearby:['Ranchi','Namkum'] },
  { slug:'jamshedpur',name:'Jamshedpur',zone:'Jharkhand', district:'East Singhbhum', pincode:'831001', landmarks:['Jubilee Park','Tata Steel','Dimna Lake','Bistupur'],         nearby:['Sakchi','Dhanbad'] },
  { slug:'sakchi',    name:'Sakchi',    zone:'Jharkhand', district:'East Singhbhum', pincode:'831001', landmarks:['Sakchi Market','Tata Steel Gate'],                          nearby:['Jamshedpur','Dhanbad'] },
  { slug:'dhanbad',   name:'Dhanbad',   zone:'Jharkhand', district:'Dhanbad',         pincode:'826001', landmarks:['ISM Dhanbad','Coal Mines','Bank More'],                        nearby:['Jamshedpur','Asansol'] },
  { slug:'asansol',   name:'Asansol',   zone:'West Bengal', district:'Paschim Bardhaman',pincode:'713301', landmarks:['Ghagar Buri Chandi Temple','Maithon Dam'],                   nearby:['Kolkata','Dhanbad'] },
  { slug:'kolkata',   name:'Kolkata',   zone:'West Bengal', district:'Kolkata', pincode:'700001', landmarks:['Victoria Memorial','Howrah Bridge','Park Street','Salt Lake Sector V'], nearby:['Asansol'] },

  /* ── Mumbai Micro-Markets (Hyperlocal SEO) ────────────── */
  // South Mumbai Posh Areas
  { slug:'malabar-hill', name:'Malabar Hill', zone:'South Mumbai', district:'Mumbai City', pincode:'400006', landmarks:['Hanging Gardens','Banganga Tank'], nearby:['Walkeshwar','Kemps Corner','Peddar Road'] },
  { slug:'cuffe-parade', name:'Cuffe Parade', zone:'South Mumbai', district:'Mumbai City', pincode:'400005', landmarks:['World Trade Centre','Taj President'], nearby:['Colaba','Nariman Point'] },
  { slug:'peddar-road', name:'Peddar Road', zone:'South Mumbai', district:'Mumbai City', pincode:'400026', landmarks:['Jaslok Hospital','Sophia College'], nearby:['Breach Candy','Kemps Corner','Altamount Road'] },
  { slug:'nepean-sea-road', name:'Nepean Sea Road', zone:'South Mumbai', district:'Mumbai City', pincode:'400036', landmarks:['Priyadarshini Park'], nearby:['Malabar Hill','Breach Candy'] },
  { slug:'breach-candy', name:'Breach Candy', zone:'South Mumbai', district:'Mumbai City', pincode:'400026', landmarks:['Breach Candy Hospital','Amarsons Garden'], nearby:['Peddar Road','Kemps Corner'] },
  { slug:'walkeshwar', name:'Walkeshwar', zone:'South Mumbai', district:'Mumbai City', pincode:'400006', landmarks:['Walkeshwar Temple','Raj Bhavan'], nearby:['Malabar Hill'] },
  { slug:'altamount-road', name:'Altamount Road', zone:'South Mumbai', district:'Mumbai City', pincode:'400026', landmarks:['Antilia'], nearby:['Kemps Corner','Peddar Road'] },
  { slug:'nariman-point', name:'Nariman Point', zone:'South Mumbai', district:'Mumbai City', pincode:'400021', landmarks:['NCPA','Trident Hotel'], nearby:['Churchgate','Cuffe Parade'] },
  { slug:'wadala', name:'Wadala', zone:'South Mumbai', district:'Mumbai City', pincode:'400031', landmarks:['Wadala TT','IMAX Big Cinemas','Five Gardens'], nearby:['Matunga','Dadar','Sion'] },

  // Western Suburbs Hyperlocal
  { slug:'lokhandwala', name:'Lokhandwala', zone:'Western Line', district:'Mumbai Suburban', pincode:'400053', landmarks:['Lokhandwala Complex','Infinity Mall'], nearby:['Andheri','Oshiwara','Versova'] },
  { slug:'oshiwara', name:'Oshiwara', zone:'Western Line', district:'Mumbai Suburban', pincode:'400104', landmarks:['Oshiwara Police Station','Mega Mall'], nearby:['Lokhandwala','Goregaon'] },
  { slug:'yari-road', name:'Yari Road', zone:'Western Line', district:'Mumbai Suburban', pincode:'400061', landmarks:['Yari Road','Versova Beach'], nearby:['Versova','Seven Bungalows'] },
  { slug:'versova', name:'Versova', zone:'Western Line', district:'Mumbai Suburban', pincode:'400061', landmarks:['Versova Beach','Versova Metro'], nearby:['Yari Road','Andheri'] },
  { slug:'pali-hill', name:'Pali Hill', zone:'Western Line', district:'Mumbai Suburban', pincode:'400050', landmarks:['Pali Market','Carter Road'], nearby:['Bandra','Khar'] },
  { slug:'carter-road', name:'Carter Road', zone:'Western Line', district:'Mumbai Suburban', pincode:'400050', landmarks:['Carter Road Promenade'], nearby:['Pali Hill','Bandra'] },
  { slug:'bandra-kurla-complex', name:'Bandra Kurla Complex (BKC)', zone:'Western Line', district:'Mumbai Suburban', pincode:'400051', landmarks:['Jio World Drive','Maker Maxity'], nearby:['Bandra','Kurla'] },
  { slug:'jvpd-scheme', name:'JVPD Scheme', zone:'Western Line', district:'Mumbai Suburban', pincode:'400049', landmarks:['Juhu Gymkhana','Ecole Mondiale'], nearby:['Juhu','Vile Parle'] },
  { slug:'mindspace', name:'Mindspace Malad', zone:'Western Line', district:'Mumbai Suburban', pincode:'400064', landmarks:['Inorbit Mall Malad','Mindspace IT Park'], nearby:['Malad','Goregaon'] },
  { slug:'thakur-village', name:'Thakur Village', zone:'Western Line', district:'Mumbai Suburban', pincode:'400101', landmarks:['Thakur College','Dream Park'], nearby:['Kandivali','Borivali'] },
  { slug:'ic-colony', name:'I.C. Colony', zone:'Western Line', district:'Mumbai Suburban', pincode:'400103', landmarks:['Immaculate Conception Church'], nearby:['Borivali','Dahisar'] },

  // Central & Thane Hyperlocal
  { slug:'hiranandani-gardens', name:'Hiranandani Gardens', zone:'Central Line', district:'Mumbai Suburban', pincode:'400076', landmarks:['Hiranandani Hospital','Galleria Mall'], nearby:['Powai','Vikhroli'] },
  { slug:'raheja-vihar', name:'Raheja Vihar', zone:'Central Line', district:'Mumbai Suburban', pincode:'400072', landmarks:['Raheja Vihar Complex'], nearby:['Powai','Chandivali'] },
  { slug:'chandivali', name:'Chandivali', zone:'Central Line', district:'Mumbai Suburban', pincode:'400072', landmarks:['Chandivali Studio','Nahar Amrit Shakti'], nearby:['Powai','Saki Naka'] },
  { slug:'tilak-nagar', name:'Tilak Nagar', zone:'Central Line', district:'Mumbai Suburban', pincode:'400089', landmarks:['Tilak Nagar Station','Lokmanya Tilak Terminus'], nearby:['Chembur','Ghatkopar'] },
  { slug:'garodia-nagar', name:'Garodia Nagar', zone:'Central Line', district:'Mumbai Suburban', pincode:'400077', landmarks:['Garodia Nagar','R City Mall'], nearby:['Ghatkopar','Vidyavihar'] },
  { slug:'hiranandani-estate', name:'Hiranandani Estate', zone:'Central Line', district:'Thane', pincode:'400607', landmarks:['The Walk','Hiranandani Hospital Thane'], nearby:['Thane','Ghodbunder Road'] },
  { slug:'ghodbunder-road', name:'Ghodbunder Road', zone:'Central Line', district:'Thane', pincode:'400615', landmarks:['Suraj Water Park','Kasarvadavali'], nearby:['Thane','Hiranandani Estate'] },
  { slug:'majiwada', name:'Majiwada', zone:'Central Line', district:'Thane', pincode:'400601', landmarks:['Viviana Mall','Jupiter Hospital'], nearby:['Thane','Ghodbunder Road'] },

  // Navi Mumbai Hyperlocal
  { slug:'palm-beach-road', name:'Palm Beach Road', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400706', landmarks:['NRI Complex','Jewel of Navi Mumbai'], nearby:['Nerul','Belapur','Vashi'] },
  { slug:'seawoods', name:'Seawoods', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400706', landmarks:['Seawoods Grand Central Mall','Seawoods Estates'], nearby:['Nerul','Belapur'] },

  // Harbour Line & Eastern Suburbs
  { slug:'gtb-nagar', name:'GTB Nagar', zone:'Harbour Line', district:'Mumbai City', pincode:'400037', landmarks:['Guru Tegh Bahadur Nagar Station'], nearby:['Sion','Wadala'] },
  { slug:'chunabhatti', name:'Chunabhatti', zone:'Harbour Line', district:'Mumbai Suburban', pincode:'400022', landmarks:['Chunabhatti Station'], nearby:['Sion','Kurla'] },
  { slug:'govandi', name:'Govandi', zone:'Harbour Line', district:'Mumbai Suburban', pincode:'400043', landmarks:['Govandi Station','Deonar'], nearby:['Chembur','Mankhurd'] },
  { slug:'mankhurd', name:'Mankhurd', zone:'Harbour Line', district:'Mumbai Suburban', pincode:'400088', landmarks:['Mankhurd Station'], nearby:['Govandi','Vashi'] },
  { slug:'sewri', name:'Sewri', zone:'Harbour Line', district:'Mumbai City', pincode:'400015', landmarks:['Sewri Fort','Sewri Mudflats'], nearby:['Wadala','Parel'] },
  { slug:'cotton-green', name:'Cotton Green', zone:'Harbour Line', district:'Mumbai City', pincode:'400033', landmarks:['Cotton Green Station'], nearby:['Reay Road','Sewri'] },
  { slug:'reay-road', name:'Reay Road', zone:'Harbour Line', district:'Mumbai City', pincode:'400010', landmarks:['Reay Road Station'], nearby:['Dockyard Road','Cotton Green'] },
  { slug:'dockyard-road', name:'Dockyard Road', zone:'Harbour Line', district:'Mumbai City', pincode:'400010', landmarks:['Dockyard Road Station'], nearby:['Sandhurst Road','Reay Road'] },
  { slug:'sandhurst-road', name:'Sandhurst Road', zone:'Harbour Line', district:'Mumbai City', pincode:'400009', landmarks:['Sandhurst Road Station'], nearby:['Masjid Bunder','Byculla'] },
  { slug:'masjid-bunder', name:'Masjid Bunder', zone:'South Mumbai', district:'Mumbai City', pincode:'400003', landmarks:['Masjid Bunder Station','Crawford Market'], nearby:['CST','Sandhurst Road'] },

  // Western Suburbs - East/West Specific
  { slug:'bandra-east', name:'Bandra East', zone:'Western Line', district:'Mumbai Suburban', pincode:'400051', landmarks:['Kala Nagar','Bandra Court'], nearby:['BKC','Khar East'] },
  { slug:'bandra-west', name:'Bandra West', zone:'Western Line', district:'Mumbai Suburban', pincode:'400050', landmarks:['Linking Road','Hill Road'], nearby:['Pali Hill','Khar West'] },
  { slug:'santacruz-east', name:'Santacruz East', zone:'Western Line', district:'Mumbai Suburban', pincode:'400055', landmarks:['Kalina','Vakola'], nearby:['Vile Parle East','Kurla'] },
  { slug:'santacruz-west', name:'Santacruz West', zone:'Western Line', district:'Mumbai Suburban', pincode:'400054', landmarks:['Juhu Road','Linking Road Ext'], nearby:['Juhu','Khar West'] },
  { slug:'andheri-east', name:'Andheri East', zone:'Western Line', district:'Mumbai Suburban', pincode:'400069', landmarks:['MIDC','SEEPZ','Marol'], nearby:['Powai','Jogeshwari East'] },
  { slug:'andheri-west', name:'Andheri West', zone:'Western Line', district:'Mumbai Suburban', pincode:'400053', landmarks:['Lokhandwala','DN Nagar'], nearby:['Versova','Jogeshwari West'] },
  { slug:'goregaon-east', name:'Goregaon East', zone:'Western Line', district:'Mumbai Suburban', pincode:'400063', landmarks:['Aarey Milk Colony','Gokuldham'], nearby:['Malad East','Jogeshwari East'] },
  { slug:'goregaon-west', name:'Goregaon West', zone:'Western Line', district:'Mumbai Suburban', pincode:'400104', landmarks:['Bangur Nagar','Motilal Nagar'], nearby:['Malad West','Oshiwara'] },
  { slug:'malad-east', name:'Malad East', zone:'Western Line', district:'Mumbai Suburban', pincode:'400097', landmarks:['Dindoshi','Kurar Village'], nearby:['Goregaon East','Kandivali East'] },
  { slug:'malad-west', name:'Malad West', zone:'Western Line', district:'Mumbai Suburban', pincode:'400064', landmarks:['Chincholi Bunder','Evershine Nagar'], nearby:['Kandivali West','Mindspace'] },
  { slug:'kandivali-east', name:'Kandivali East', zone:'Western Line', district:'Mumbai Suburban', pincode:'400101', landmarks:['Lokhandwala Township','Akurli Road'], nearby:['Thakur Village','Malad East'] },
  { slug:'kandivali-west', name:'Kandivali West', zone:'Western Line', district:'Mumbai Suburban', pincode:'400067', landmarks:['Mahavir Nagar','Charkop'], nearby:['Borivali West','Malad West'] },
  { slug:'borivali-east', name:'Borivali East', zone:'Western Line', district:'Mumbai Suburban', pincode:'400066', landmarks:['National Park','Magathane'], nearby:['Dahisar East','Kandivali East'] },
  { slug:'borivali-west', name:'Borivali West', zone:'Western Line', district:'Mumbai Suburban', pincode:'400092', landmarks:['Gorai','Yogi Nagar'], nearby:['Dahisar West','I.C. Colony'] },
  { slug:'dahisar-east', name:'Dahisar East', zone:'Western Line', district:'Mumbai Suburban', pincode:'400068', landmarks:['Rawalpada'], nearby:['Borivali East','Mira Road'] },
  { slug:'dahisar-west', name:'Dahisar West', zone:'Western Line', district:'Mumbai Suburban', pincode:'400068', landmarks:['Kandarpada'], nearby:['Borivali West','Mira Road'] },
  
  // Extended Palghar & Vasai-Virar Belt
  { slug:'vasai-east', name:'Vasai East', zone:'Western Line', district:'Palghar', pincode:'401208', landmarks:['Evershine City','Gokhivare'], nearby:['Vasai West','Nalasopara East'] },
  { slug:'vasai-west', name:'Vasai West', zone:'Western Line', district:'Palghar', pincode:'401202', landmarks:['Vasai Fort','Bhabola'], nearby:['Vasai East','Nalasopara West'] },
  { slug:'virar-east', name:'Virar East', zone:'Western Line', district:'Palghar', pincode:'401305', landmarks:['Phoolpada','Manvelpada'], nearby:['Virar West','Nalasopara East'] },
  { slug:'virar-west', name:'Virar West', zone:'Western Line', district:'Palghar', pincode:'401303', landmarks:['Global City','Arnala'], nearby:['Virar East','Nalasopara West'] },
  { slug:'palghar', name:'Palghar', zone:'Western Line', district:'Palghar', pincode:'401404', landmarks:['Palghar Station','Shirgaon'], nearby:['Boisar','Kelva'] },
  { slug:'dahanu', name:'Dahanu', zone:'Western Line', district:'Palghar', pincode:'401601', landmarks:['Dahanu Beach'], nearby:['Boisar'] },

  // Central Line Extended
  { slug:'vidyavihar', name:'Vidyavihar', zone:'Central Line', district:'Mumbai Suburban', pincode:'400077', landmarks:['Somaiya Campus'], nearby:['Ghatkopar','Kurla'] },
  { slug:'kanjurmarg', name:'Kanjurmarg', zone:'Central Line', district:'Mumbai Suburban', pincode:'400042', landmarks:['Kanjurmarg Station','Lodha Aurum'], nearby:['Bhandup','Vikhroli'] },
  { slug:'nahur', name:'Nahur', zone:'Central Line', district:'Mumbai Suburban', pincode:'400078', landmarks:['Nahur Station'], nearby:['Mulund','Bhandup'] },
  { slug:'mulund-east', name:'Mulund East', zone:'Central Line', district:'Mumbai Suburban', pincode:'400081', landmarks:['Navghar Road','Mhada Colony'], nearby:['Mulund West','Thane East'] },
  { slug:'mulund-west', name:'Mulund West', zone:'Central Line', district:'Mumbai Suburban', pincode:'400080', landmarks:['LBS Marg','Yogi Hills'], nearby:['Mulund East','Thane West'] },
  { slug:'thane-east', name:'Thane East', zone:'Central Line', district:'Thane', pincode:'400603', landmarks:['Kopri'], nearby:['Thane West','Mulund East'] },
  { slug:'thane-west', name:'Thane West', zone:'Central Line', district:'Thane', pincode:'400601', landmarks:['Upvan Lake','Naupada'], nearby:['Thane East','Majiwada'] },
  { slug:'kalwa', name:'Kalwa', zone:'Central Line', district:'Thane', pincode:'400605', landmarks:['Kalwa Bridge','Parsik Hill'], nearby:['Thane','Mumbra'] },
  { slug:'mumbra', name:'Mumbra', zone:'Central Line', district:'Thane', pincode:'400612', landmarks:['Mumbra Station','Kausa'], nearby:['Kalwa','Diva'] },
  { slug:'diva', name:'Diva', zone:'Central Line', district:'Thane', pincode:'400612', landmarks:['Diva Station'], nearby:['Mumbra','Dombivli'] },
  { slug:'titwala', name:'Titwala', zone:'Central Line', district:'Thane', pincode:'421605', landmarks:['Titwala Ganesh Mandir'], nearby:['Kalyan','Asangaon'] },
  { slug:'karjat', name:'Karjat', zone:'Central Line', district:'Raigad', pincode:'410201', landmarks:['Karjat Station','ND Studios'], nearby:['Neral','Khopoli'] },

  // Navi Mumbai Extended
  { slug:'sanpada', name:'Sanpada', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400705', landmarks:['Sanpada Station','Palm Beach Road'], nearby:['Vashi','Juinagar'] },
  { slug:'juinagar', name:'Juinagar', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400705', landmarks:['Juinagar Station'], nearby:['Sanpada','Nerul'] },
  { slug:'kamothe', name:'Kamothe', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'410209', landmarks:['Mansarovar Station'], nearby:['Kharghar','Kalamboli'] },
  { slug:'kalamboli', name:'Kalamboli', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'410218', landmarks:['Kalamboli Circle'], nearby:['Kamothe','Panvel'] },
  { slug:'ulwe', name:'Ulwe', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'410206', landmarks:['Bamandongri Station','Navi Mumbai Airport Area'], nearby:['Belapur','Seawoods'] },
  { slug:'taloja', name:'Taloja', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'410208', landmarks:['Taloja MIDC','Taloja Metro'], nearby:['Kharghar','Kalamboli'] },

  // South / Central Mumbai Extensions
  { slug:'kalbadevi', name:'Kalbadevi', zone:'South Mumbai', district:'Mumbai City', pincode:'400002', landmarks:['Kalbadevi Market','Mangaldas Market'], nearby:['Bhuleshwar','Marine Lines'] },
  { slug:'bhuleshwar', name:'Bhuleshwar', zone:'South Mumbai', district:'Mumbai City', pincode:'400002', landmarks:['Bhuleshwar Market'], nearby:['Kalbadevi','Charni Road'] },
  { slug:'charni-road', name:'Charni Road', zone:'South Mumbai', district:'Mumbai City', pincode:'400004', landmarks:['Charni Road Station','Girgaon'], nearby:['Grant Road','Marine Lines'] },
  { slug:'girgaon', name:'Girgaon', zone:'South Mumbai', district:'Mumbai City', pincode:'400004', landmarks:['Girgaon Chowpatty'], nearby:['Charni Road','Malabar Hill'] },

  // Missing South Mumbai & Central
  { slug:'dharavi', name:'Dharavi', zone:'Central Line', district:'Mumbai City', pincode:'400017', landmarks:['Dharavi Leather Market','Sion Bandra Link Road'], nearby:['Sion','Bandra'] },
  { slug:'antop-hill', name:'Antop Hill', zone:'Harbour Line', district:'Mumbai City', pincode:'400037', landmarks:['Antop Hill Wadala','CGS Colony'], nearby:['Wadala','Sion'] },
  { slug:'agripada', name:'Agripada', zone:'South Mumbai', district:'Mumbai City', pincode:'400011', landmarks:['Agripada Police Station','YMCA'], nearby:['Mumbai Central','Byculla'] },
  { slug:'chinchpokli', name:'Chinchpokli', zone:'South Mumbai', district:'Mumbai City', pincode:'400011', landmarks:['Chinchpokli Station','Kasturba Hospital'], nearby:['Byculla','Parel'] },
  { slug:'currey-road', name:'Currey Road', zone:'South Mumbai', district:'Mumbai City', pincode:'400013', landmarks:['Currey Road Station','Lal Baug'], nearby:['Lower Parel','Chinchpokli'] },
  { slug:'kamathipura', name:'Kamathipura', zone:'South Mumbai', district:'Mumbai City', pincode:'400008', landmarks:['Grant Road East'], nearby:['Grant Road','Mumbai Central'] },
  { slug:'umerkhadi', name:'Umerkhadi', zone:'South Mumbai', district:'Mumbai City', pincode:'400009', landmarks:['Sandhurst Road'], nearby:['Dongri','Masjid Bunder'] },
  { slug:'dongri', name:'Dongri', zone:'South Mumbai', district:'Mumbai City', pincode:'400009', landmarks:['Char Nul'], nearby:['Umerkhadi','Sandhurst Road'] },
  { slug:'mumbai-central', name:'Mumbai Central', zone:'South Mumbai', district:'Mumbai City', pincode:'400008', landmarks:['Mumbai Central Station','Nair Hospital'], nearby:['Tardeo','Agripada'] },

  // Missing Western Suburbs East/West
  { slug:'vile-parle-east', name:'Vile Parle East', zone:'Western Line', district:'Mumbai Suburban', pincode:'400057', landmarks:['Domestic Airport','Dinarnath Mangeshkar Hall'], nearby:['Vile Parle West','Santacruz East'] },
  { slug:'vile-parle-west', name:'Vile Parle West', zone:'Western Line', district:'Mumbai Suburban', pincode:'400056', landmarks:['Mithibai College','Juhu Scheme'], nearby:['Vile Parle East','Juhu'] },
  { slug:'khar-east', name:'Khar East', zone:'Western Line', district:'Mumbai Suburban', pincode:'400051', landmarks:['Khar Station East','Bandra Terminus'], nearby:['Khar West','Bandra East'] },
  { slug:'khar-west', name:'Khar West', zone:'Western Line', district:'Mumbai Suburban', pincode:'400052', landmarks:['Khar Gymkhana','Linking Road'], nearby:['Khar East','Bandra West'] },
  { slug:'jogeshwari-east', name:'Jogeshwari East', zone:'Western Line', district:'Mumbai Suburban', pincode:'400060', landmarks:['Jogeshwari Caves','JVLR'], nearby:['Jogeshwari West','Andheri East'] },
  { slug:'jogeshwari-west', name:'Jogeshwari West', zone:'Western Line', district:'Mumbai Suburban', pincode:'400102', landmarks:['Oshiwara','S.V. Road'], nearby:['Jogeshwari East','Andheri West'] },
  
  // Missing Central / Eastern Suburbs
  { slug:'kurla-east', name:'Kurla East', zone:'Central Line', district:'Mumbai Suburban', pincode:'400024', landmarks:['Nehru Nagar','Kurla Station East'], nearby:['Kurla West','Chembur'] },
  { slug:'kurla-west', name:'Kurla West', zone:'Central Line', district:'Mumbai Suburban', pincode:'400070', landmarks:['Phoenix Marketcity','Bandra Kurla Complex'], nearby:['Kurla East','Sion'] },
  { slug:'ghatkopar-east', name:'Ghatkopar East', zone:'Central Line', district:'Mumbai Suburban', pincode:'400077', landmarks:['Pant Nagar','Garodia Nagar'], nearby:['Ghatkopar West','Vidyavihar'] },
  { slug:'ghatkopar-west', name:'Ghatkopar West', zone:'Central Line', district:'Mumbai Suburban', pincode:'400086', landmarks:['R City Mall','Amrut Nagar'], nearby:['Ghatkopar East','Vikhroli'] },
  { slug:'vikhroli-east', name:'Vikhroli East', zone:'Central Line', district:'Mumbai Suburban', pincode:'400083', landmarks:['Kannamwar Nagar','Tagore Nagar'], nearby:['Vikhroli West','Kanjurmarg'] },
  { slug:'vikhroli-west', name:'Vikhroli West', zone:'Central Line', district:'Mumbai Suburban', pincode:'400079', landmarks:['Godrej Vikhroli','Surya Nagar'], nearby:['Vikhroli East','Ghatkopar West'] },
  { slug:'kanjurmarg-east', name:'Kanjurmarg East', zone:'Central Line', district:'Mumbai Suburban', pincode:'400042', landmarks:['Kanjur Village'], nearby:['Kanjurmarg West','Vikhroli East'] },
  { slug:'kanjurmarg-west', name:'Kanjurmarg West', zone:'Central Line', district:'Mumbai Suburban', pincode:'400078', landmarks:['Lodha Aurum','Naval Dockyard Colony'], nearby:['Kanjurmarg East','Bhandup West'] },
  { slug:'bhandup-east', name:'Bhandup East', zone:'Central Line', district:'Mumbai Suburban', pincode:'400042', landmarks:['Bhandup Village'], nearby:['Bhandup West','Nahur'] },
  { slug:'bhandup-west', name:'Bhandup West', zone:'Central Line', district:'Mumbai Suburban', pincode:'400078', landmarks:['LBS Marg Bhandup','Dreams Mall'], nearby:['Bhandup East','Nahur'] },
  { slug:'nahur-east', name:'Nahur East', zone:'Central Line', district:'Mumbai Suburban', pincode:'400042', landmarks:['Nahur Station East'], nearby:['Nahur West','Mulund East'] },
  { slug:'nahur-west', name:'Nahur West', zone:'Central Line', district:'Mumbai Suburban', pincode:'400078', landmarks:['Nahur Station West'], nearby:['Nahur East','Mulund West'] },
  { slug:'sion-east', name:'Sion East', zone:'Central Line', district:'Mumbai City', pincode:'400022', landmarks:['Sion Hospital','Pratiksha Nagar'], nearby:['Sion West','Chunabhatti'] },
  { slug:'sion-west', name:'Sion West', zone:'Central Line', district:'Mumbai City', pincode:'400022', landmarks:['Sion Fort','Dharavi'], nearby:['Sion East','Matunga'] },

  // Missing Harbour / Trombay / Saki Naka etc
  { slug:'trombay', name:'Trombay', zone:'Harbour Line', district:'Mumbai Suburban', pincode:'400088', landmarks:['BARC','Trombay Village'], nearby:['Mankhurd','Chembur'] },
  { slug:'deonar', name:'Deonar', zone:'Harbour Line', district:'Mumbai Suburban', pincode:'400088', landmarks:['TISS','Deonar Abattoir'], nearby:['Govandi','Chembur'] },
  { slug:'chembur-east', name:'Chembur East', zone:'Harbour Line', district:'Mumbai Suburban', pincode:'400071', landmarks:['Diamond Garden','Chembur Camp'], nearby:['Chembur West','Govandi'] },
  { slug:'chembur-west', name:'Chembur West', zone:'Harbour Line', district:'Mumbai Suburban', pincode:'400089', landmarks:['Tilak Nagar','Pestom Sagar'], nearby:['Chembur East','Kurla'] },
  { slug:'shivaji-nagar', name:'Shivaji Nagar', zone:'Harbour Line', district:'Mumbai Suburban', pincode:'400043', landmarks:['Shivaji Nagar Govandi'], nearby:['Govandi','Deonar'] },
  { slug:'sakinaka', name:'Sakinaka', zone:'Western Line', district:'Mumbai Suburban', pincode:'400072', landmarks:['Sakinaka Metro','Asalpha'], nearby:['Andheri East','Chandivali'] },
  { slug:'asalpha', name:'Asalpha', zone:'Western Line', district:'Mumbai Suburban', pincode:'400084', landmarks:['Asalpha Metro','Ghatkopar West'], nearby:['Sakinaka','Ghatkopar'] },
  { slug:'marol', name:'Marol', zone:'Western Line', district:'Mumbai Suburban', pincode:'400059', landmarks:['Marol Naka','Seven Hills Hospital'], nearby:['Andheri East','Sakinaka'] },
  { slug:'chakala', name:'Chakala', zone:'Western Line', district:'Mumbai Suburban', pincode:'400099', landmarks:['Chakala Metro','JB Nagar'], nearby:['Andheri East','Marol'] },
  { slug:'midc-andheri', name:'MIDC Andheri', zone:'Western Line', district:'Mumbai Suburban', pincode:'400093', landmarks:['Andheri MIDC','Tolani Naka'], nearby:['SEEPZ','Andheri East'] },
  { slug:'seepz', name:'SEEPZ', zone:'Western Line', district:'Mumbai Suburban', pincode:'400096', landmarks:['SEEPZ Gate'], nearby:['MIDC Andheri','Jogeshwari East'] },
  { slug:'aarey-colony', name:'Aarey Colony', zone:'Western Line', district:'Mumbai Suburban', pincode:'400065', landmarks:['Aarey Milk Colony','Chhota Kashmir'], nearby:['Goregaon East','Marol'] },
  { slug:'dindoshi', name:'Dindoshi', zone:'Western Line', district:'Mumbai Suburban', pincode:'400097', landmarks:['Dindoshi Court','Oberoi Mall'], nearby:['Malad East','Goregaon East'] },
  { slug:'charkop', name:'Charkop', zone:'Western Line', district:'Mumbai Suburban', pincode:'400067', landmarks:['Charkop Sector 8'], nearby:['Kandivali West','Borivali West'] },
  { slug:'gorai', name:'Gorai', zone:'Western Line', district:'Mumbai Suburban', pincode:'400091', landmarks:['Gorai Beach','Essel World'], nearby:['Borivali West','Manori'] },
  { slug:'madh-island', name:'Madh Island', zone:'Western Line', district:'Mumbai Suburban', pincode:'400061', landmarks:['Madh Fort','Erangal Beach'], nearby:['Versova','Malad West'] },
  { slug:'erangal', name:'Erangal', zone:'Western Line', district:'Mumbai Suburban', pincode:'400061', landmarks:['Erangal Beach'], nearby:['Madh Island','Marve'] },
  { slug:'marve', name:'Marve', zone:'Western Line', district:'Mumbai Suburban', pincode:'400095', landmarks:['Marve Beach'], nearby:['Malad West','Manori'] },
  { slug:'manori', name:'Manori', zone:'Western Line', district:'Mumbai Suburban', pincode:'400095', landmarks:['Manori Beach'], nearby:['Gorai','Marve'] },
  { slug:'aksa', name:'Aksa', zone:'Western Line', district:'Mumbai Suburban', pincode:'400095', landmarks:['Aksa Beach'], nearby:['Malad West','Madh Island'] },

  // Missing Mira-Bhayandar & Vasai-Virar
  { slug:'mira-road-east', name:'Mira Road East', zone:'Western Line', district:'Thane', pincode:'401107', landmarks:['Shanti Park','Kanakia'], nearby:['Mira Road West','Dahisar East'] },
  { slug:'mira-road-west', name:'Mira Road West', zone:'Western Line', district:'Thane', pincode:'401107', landmarks:['Mira Road Station West'], nearby:['Mira Road East','Bhayandar West'] },
  { slug:'bhayandar-east', name:'Bhayandar East', zone:'Western Line', district:'Thane', pincode:'401105', landmarks:['Navghar Road','Jesal Park'], nearby:['Bhayandar West','Mira Road East'] },
  { slug:'bhayandar-west', name:'Bhayandar West', zone:'Western Line', district:'Thane', pincode:'401101', landmarks:['Maxus Mall','Gorai Road'], nearby:['Bhayandar East','Mira Road West'] },
  { slug:'nalasopara-east', name:'Nalasopara East', zone:'Western Line', district:'Palghar', pincode:'401209', landmarks:['Tulinj Road','Capital Mall'], nearby:['Nalasopara West','Vasai East'] },
  { slug:'nalasopara-west', name:'Nalasopara West', zone:'Western Line', district:'Palghar', pincode:'401203', landmarks:['Sopara Village','Chakreshwar Mahadev'], nearby:['Nalasopara East','Virar West'] },
  { slug:'naigaon-east', name:'Naigaon East', zone:'Western Line', district:'Palghar', pincode:'401208', landmarks:['Juchandra'], nearby:['Naigaon West','Vasai East'] },
  { slug:'naigaon-west', name:'Naigaon West', zone:'Western Line', district:'Palghar', pincode:'401202', landmarks:['Umela','Sun City'], nearby:['Naigaon East','Vasai West'] },

  // Extreme Western Line (Beyond Virar)
  { slug:'vaitarna', name:'Vaitarna', zone:'Western Line', district:'Palghar', pincode:'401102', landmarks:['Vaitarna River','Vaitarna Station'], nearby:['Saphale','Virar'] },
  { slug:'saphale', name:'Saphale', zone:'Western Line', district:'Palghar', pincode:'401102', landmarks:['Saphale Station','Edvan Beach'], nearby:['Kelve Road','Vaitarna'] },
  { slug:'kelve-road', name:'Kelve Road', zone:'Western Line', district:'Palghar', pincode:'401401', landmarks:['Kelva Beach','Kelve Road Station'], nearby:['Palghar','Saphale'] },
  { slug:'umroli', name:'Umroli', zone:'Western Line', district:'Palghar', pincode:'401404', landmarks:['Umroli Station'], nearby:['Boisar','Palghar'] },
  { slug:'vangaon', name:'Vangaon', zone:'Western Line', district:'Palghar', pincode:'401103', landmarks:['Vangaon Station'], nearby:['Dahanu','Boisar'] },

  // Central Line (Kalyan to Kasara & Khopoli)
  { slug:'csmt', name:'CSMT', zone:'South Mumbai', district:'Mumbai City', pincode:'400001', landmarks:['Chhatrapati Shivaji Maharaj Terminus'], nearby:['Fort','Masjid Bunder'] },
  { slug:'kopar', name:'Kopar', zone:'Central Line', district:'Thane', pincode:'421202', landmarks:['Kopar Station','Kopar Khairane'], nearby:['Dombivli','Diva'] },
  { slug:'thakurli', name:'Thakurli', zone:'Central Line', district:'Thane', pincode:'421201', landmarks:['Thakurli Station','Chole Village'], nearby:['Kalyan','Dombivli'] },
  { slug:'shahad', name:'Shahad', zone:'Central Line', district:'Thane', pincode:'421103', landmarks:['Shahad Station','Birla Mandir'], nearby:['Kalyan','Ambivli'] },
  { slug:'ambivli', name:'Ambivli', zone:'Central Line', district:'Thane', pincode:'421102', landmarks:['Ambivli Station','NRC Colony'], nearby:['Shahad','Titwala'] },
  { slug:'khadavli', name:'Khadavli', zone:'Central Line', district:'Thane', pincode:'421302', landmarks:['Khadavli Station','Bhatsa River'], nearby:['Titwala','Vasind'] },
  { slug:'vasind', name:'Vasind', zone:'Central Line', district:'Thane', pincode:'421604', landmarks:['Vasind Station','Mahuli Fort'], nearby:['Khadavli','Asangaon'] },
  { slug:'asangaon', name:'Asangaon', zone:'Central Line', district:'Thane', pincode:'421601', landmarks:['Asangaon Station','Manas Mandir'], nearby:['Vasind','Atgaon'] },
  { slug:'atgaon', name:'Atgaon', zone:'Central Line', district:'Thane', pincode:'421601', landmarks:['Atgaon Station'], nearby:['Asangaon','Khardi'] },
  { slug:'khardi', name:'Khardi', zone:'Central Line', district:'Thane', pincode:'421601', landmarks:['Khardi Station'], nearby:['Atgaon','Kasara'] },
  { slug:'kasara', name:'Kasara', zone:'Central Line', district:'Thane', pincode:'421602', landmarks:['Kasara Ghat','Kasara Station'], nearby:['Khardi','Igatpuri'] },
  { slug:'vithalwadi', name:'Vithalwadi', zone:'Central Line', district:'Thane', pincode:'421301', landmarks:['Vithalwadi Station'], nearby:['Kalyan','Ulhasnagar'] },
  { slug:'vangani', name:'Vangani', zone:'Central Line', district:'Thane', pincode:'421503', landmarks:['Vangani Station','Bhagirath Waterfall'], nearby:['Badlapur','Shelu'] },
  { slug:'shelu', name:'Shelu', zone:'Central Line', district:'Raigad', pincode:'410201', landmarks:['Shelu Station'], nearby:['Vangani','Neral'] },
  { slug:'neral', name:'Neral', zone:'Central Line', district:'Raigad', pincode:'410101', landmarks:['Neral Station','Matheran Toy Train'], nearby:['Shelu','Bhivpuri Road'] },
  { slug:'bhivpuri-road', name:'Bhivpuri Road', zone:'Central Line', district:'Raigad', pincode:'410201', landmarks:['Bhivpuri Waterfall'], nearby:['Neral','Karjat'] },
  { slug:'palasdari', name:'Palasdari', zone:'Central Line', district:'Raigad', pincode:'410201', landmarks:['Palasdari Dam'], nearby:['Karjat','Kelavli'] },
  { slug:'kelavli', name:'Kelavli', zone:'Central Line', district:'Raigad', pincode:'410203', landmarks:['Kelavli Station'], nearby:['Palasdari','Dolavli'] },
  { slug:'dolavli', name:'Dolavli', zone:'Central Line', district:'Raigad', pincode:'410203', landmarks:['Dolavli Station'], nearby:['Kelavli','Lowjee'] },
  { slug:'lowjee', name:'Lowjee', zone:'Central Line', district:'Raigad', pincode:'410203', landmarks:['Lowjee Station'], nearby:['Dolavli','Khopoli'] },
  { slug:'khopoli', name:'Khopoli', zone:'Central Line', district:'Raigad', pincode:'410203', landmarks:['Imagicaa','Khopoli Station'], nearby:['Lowjee','Khandala'] },

  // Harbour & Trans-Harbour Line additions
  { slug:'vadala-road', name:'Vadala Road', zone:'Harbour Line', district:'Mumbai City', pincode:'400031', landmarks:['Vadala Road Station'], nearby:['Sewri','Kings Circle'] },
  { slug:'kings-circle', name:'Kings Circle', zone:'Harbour Line', district:'Mumbai City', pincode:'400019', landmarks:['Kings Circle Station','Matunga'], nearby:['Vadala Road','Mahim'] },
  { slug:'mansarovar', name:'Mansarovar', zone:'Harbour Line', district:'Navi Mumbai', pincode:'410209', landmarks:['Mansarovar Station'], nearby:['Kharghar','Khandeshwar'] },
  { slug:'khandeshwar', name:'Khandeshwar', zone:'Harbour Line', district:'Navi Mumbai', pincode:'410206', landmarks:['Khandeshwar Station','Kamothe'], nearby:['Mansarovar','Panvel'] },
  { slug:'digha-gaon', name:'Digha Gaon', zone:'Trans-Harbour', district:'Navi Mumbai', pincode:'400708', landmarks:['Digha Gaon Station'], nearby:['Thane','Airoli'] },
  { slug:'rabale', name:'Rabale', zone:'Trans-Harbour', district:'Navi Mumbai', pincode:'400701', landmarks:['Rabale MIDC','Rabale Station'], nearby:['Airoli','Ghansoli'] },
  { slug:'turbhe', name:'Turbhe', zone:'Trans-Harbour', district:'Navi Mumbai', pincode:'400705', landmarks:['Turbhe MIDC','Turbhe Station'], nearby:['Koparkhairane','Sanpada'] },
  
  // Uran Line (New Local Line)
  { slug:'sagar-sangam', name:'Sagar Sangam', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400706', landmarks:['Sagar Sangam Station'], nearby:['Seawoods','Targhar'] },
  { slug:'targhar', name:'Targhar', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'410206', landmarks:['Navi Mumbai International Airport'], nearby:['Sagar Sangam','Bamandongri'] },
  { slug:'bamandongri', name:'Bamandongri', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'410206', landmarks:['Ulwe Node'], nearby:['Targhar','Kharkopar'] },
  { slug:'kharkopar', name:'Kharkopar', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'410206', landmarks:['Kharkopar Station'], nearby:['Bamandongri','Gavan'] },
  { slug:'gavan', name:'Gavan', zone:'Navi Mumbai', district:'Raigad', pincode:'410206', landmarks:['Gavan Station'], nearby:['Kharkopar','Ranjanpada'] },
  { slug:'ranjanpada', name:'Ranjanpada', zone:'Navi Mumbai', district:'Raigad', pincode:'410206', landmarks:['Ranjanpada Station'], nearby:['Gavan','Nhava Sheva'] },
  { slug:'nhava-sheva', name:'Nhava Sheva', zone:'Navi Mumbai', district:'Raigad', pincode:'400707', landmarks:['JNPT Port'], nearby:['Ranjanpada','Dronagiri'] },
  { slug:'dronagiri', name:'Dronagiri', zone:'Navi Mumbai', district:'Raigad', pincode:'400702', landmarks:['Dronagiri Node'], nearby:['Nhava Sheva','Uran'] },

  // --- SUPER MICRO-MARKETS (Chhote Chhote Areas & Colonies) ---

  // Bhiwandi & Surrounding (Massive Hub)
  { slug:'bhiwandi', name:'Bhiwandi', zone:'Thane', district:'Thane', pincode:'421302', landmarks:['Bhiwandi Powerloom','Kalyan Naka'], nearby:['Kalher','Kalyan'] },
  { slug:'kalher', name:'Kalher', zone:'Thane', district:'Thane', pincode:'421302', landmarks:['Kalher Village','Thane-Bhiwandi Road'], nearby:['Kasheli','Bhiwandi'] },
  { slug:'kasheli', name:'Kasheli', zone:'Thane', district:'Thane', pincode:'421302', landmarks:['Kasheli Bridge'], nearby:['Thane','Kalher'] },
  { slug:'mankoli', name:'Mankoli', zone:'Thane', district:'Thane', pincode:'421302', landmarks:['Mankoli Naka','Lodha Upper Thane'], nearby:['Bhiwandi','Dombivli'] },
  { slug:'anjurphata', name:'Anjurphata', zone:'Thane', district:'Thane', pincode:'421302', landmarks:['Anjurphata Circle'], nearby:['Bhiwandi','Mankoli'] },

  // Thane Micro-Markets
  { slug:'vartak-nagar', name:'Vartak Nagar', zone:'Thane', district:'Thane', pincode:'400606', landmarks:['Vartak Nagar Naka','Korum Mall'], nearby:['Upvan','Wagle Estate'] },
  { slug:'wagle-estate', name:'Wagle Estate', zone:'Thane', district:'Thane', pincode:'400604', landmarks:['Wagle Industrial Estate','Mulund Check Naka'], nearby:['Vartak Nagar','Mulund'] },
  { slug:'manpada-thane', name:'Manpada (Thane)', zone:'Thane', district:'Thane', pincode:'400607', landmarks:['Tikuji-Ni-Wadi','Ghodbunder Road'], nearby:['Kapurbawdi','Majiwada'] },
  { slug:'kapurbawdi', name:'Kapurbawdi', zone:'Thane', district:'Thane', pincode:'400607', landmarks:['Kapurbawdi Junction','High Street Mall'], nearby:['Majiwada','Balkum'] },
  { slug:'balkum', name:'Balkum', zone:'Thane', district:'Thane', pincode:'400608', landmarks:['Balkum Naka','Lodha Amara'], nearby:['Kapurbawdi','Dhokali'] },
  { slug:'kolshet', name:'Kolshet', zone:'Thane', district:'Thane', pincode:'400607', landmarks:['Kolshet Road','Lodha Sterling'], nearby:['Manpada','Dhokali'] },
  { slug:'kharegaon', name:'Kharegaon', zone:'Thane', district:'Thane', pincode:'400605', landmarks:['Kharegaon Naka'], nearby:['Kalwa','Parsik Nagar'] },
  { slug:'parsik-nagar', name:'Parsik Nagar', zone:'Thane', district:'Thane', pincode:'400605', landmarks:['Parsik Hill','Kharegaon'], nearby:['Kalwa','Mumbra'] },

  // Kalyan/Dombivli/Badlapur Micro-Markets
  { slug:'palava-city', name:'Palava City', zone:'Central Line', district:'Thane', pincode:'421204', landmarks:['Lodha Palava','Xperia Mall'], nearby:['Dombivli','Shilphata'] },
  { slug:'shilphata', name:'Shilphata', zone:'Central Line', district:'Thane', pincode:'421204', landmarks:['Shilphata Junction'], nearby:['Palava City','Mumbra'] },
  { slug:'khadakpada', name:'Khadakpada', zone:'Central Line', district:'Thane', pincode:'421301', landmarks:['Khadakpada Circle','Godrej Hills'], nearby:['Kalyan West','Titwala'] },
  { slug:'kolsewadi', name:'Kolsewadi', zone:'Central Line', district:'Thane', pincode:'421306', landmarks:['Kolsewadi Naka'], nearby:['Kalyan East','Vithalwadi'] },
  { slug:'kulgaon', name:'Kulgaon', zone:'Central Line', district:'Thane', pincode:'421503', landmarks:['Kulgaon Badlapur'], nearby:['Badlapur','Katrap'] },
  { slug:'katrap', name:'Katrap', zone:'Central Line', district:'Thane', pincode:'421503', landmarks:['Katrap Vidyalaya'], nearby:['Badlapur','Shirgaon'] },

  // Navi Mumbai Micro-Markets
  { slug:'new-panvel', name:'New Panvel', zone:'Navi Mumbai', district:'Raigad', pincode:'410206', landmarks:['New Panvel Bridge','Khanda Colony'], nearby:['Panvel','Khandeshwar'] },
  { slug:'khanda-colony', name:'Khanda Colony', zone:'Navi Mumbai', district:'Raigad', pincode:'410206', landmarks:['Khanda Colony Naka'], nearby:['New Panvel','Mansarovar'] },
  { slug:'karanjade', name:'Karanjade', zone:'Navi Mumbai', district:'Raigad', pincode:'410206', landmarks:['Karanjade Node'], nearby:['Panvel','JNPT Road'] },

  // Vasai-Virar-Palghar Micro-Markets
  { slug:'global-city-virar', name:'Global City Virar', zone:'Western Line', district:'Palghar', pincode:'401303', landmarks:['Club One','Yazoo Park'], nearby:['Virar West','Arnala'] },
  { slug:'arnala', name:'Arnala', zone:'Western Line', district:'Palghar', pincode:'401302', landmarks:['Arnala Beach','Arnala Fort'], nearby:['Virar West','Agashi'] },
  { slug:'agashi', name:'Agashi', zone:'Western Line', district:'Palghar', pincode:'401301', landmarks:['Agashi Jain Temple'], nearby:['Arnala','Virar West'] },
  { slug:'bolinj', name:'Bolinj', zone:'Western Line', district:'Palghar', pincode:'401303', landmarks:['Bolinj Naka'], nearby:['Virar West','Global City'] },
  { slug:'yashvant-viva', name:'Yashvant Viva Township', zone:'Western Line', district:'Palghar', pincode:'401209', landmarks:['Viva Township Nalasopara East'], nearby:['Nalasopara East','Vasai East'] },
  { slug:'evershine-city', name:'Evershine City', zone:'Western Line', district:'Palghar', pincode:'401208', landmarks:['Evershine City Vasai East'], nearby:['Vasai East','Gokhivare'] },
  { slug:'bhabola', name:'Bhabola', zone:'Western Line', district:'Palghar', pincode:'401202', landmarks:['Bhabola Naka'], nearby:['Vasai West','Sandor'] },
  { slug:'sandor', name:'Sandor', zone:'Western Line', district:'Palghar', pincode:'401201', landmarks:['Sandor Church'], nearby:['Vasai West','Bhabola'] },
  { slug:'tarapur', name:'Tarapur', zone:'Western Line', district:'Palghar', pincode:'401502', landmarks:['Tarapur MIDC','TAPS'], nearby:['Boisar','Kumbhavali'] },

  // Mumbai Suburbs Micro-Markets
  { slug:'ballard-estate', name:'Ballard Estate', zone:'South Mumbai', district:'Mumbai City', pincode:'400001', landmarks:['Mint Road','Custom House'], nearby:['Fort','CSMT'] },
  { slug:'kala-ghoda', name:'Kala Ghoda', zone:'South Mumbai', district:'Mumbai City', pincode:'400001', landmarks:['Jehangir Art Gallery'], nearby:['Fort','Colaba'] },
  { slug:'cumballa-hill', name:'Cumballa Hill', zone:'South Mumbai', district:'Mumbai City', pincode:'400026', landmarks:['Kemps Corner','August Kranti Marg'], nearby:['Peddar Road','Breach Candy'] },
  { slug:'kherwadi', name:'Kherwadi', zone:'Western Line', district:'Mumbai Suburban', pincode:'400051', landmarks:['Kherwadi Signal','Bandra East'], nearby:['BKC','Kala Nagar'] },
  { slug:'kalina', name:'Kalina', zone:'Western Line', district:'Mumbai Suburban', pincode:'400029', landmarks:['Mumbai University','Kalina Market'], nearby:['Santacruz East','Kurla'] },
  { slug:'vakola', name:'Vakola', zone:'Western Line', district:'Mumbai Suburban', pincode:'400055', landmarks:['Vakola Bridge'], nearby:['Santacruz East','Kalina'] },
  { slug:'four-bungalows', name:'Four Bungalows', zone:'Western Line', district:'Mumbai Suburban', pincode:'400053', landmarks:['Good Shepherd Church','DN Nagar'], nearby:['Andheri West','Seven Bungalows'] },
  { slug:'seven-bungalows', name:'Seven Bungalows', zone:'Western Line', district:'Mumbai Suburban', pincode:'400061', landmarks:['Nana Nani Park','Versova'], nearby:['Andheri West','Yari Road'] },
  { slug:'dn-nagar', name:'DN Nagar', zone:'Western Line', district:'Mumbai Suburban', pincode:'400053', landmarks:['DN Nagar Metro'], nearby:['Andheri West','Juhu'] },
  { slug:'poonam-nagar', name:'Poonam Nagar', zone:'Western Line', district:'Mumbai Suburban', pincode:'400093', landmarks:['Poonam Nagar Andheri East'], nearby:['JVLR','Mahakali'] },
  { slug:'mahakali-caves-road', name:'Mahakali Caves Road', zone:'Western Line', district:'Mumbai Suburban', pincode:'400093', landmarks:['Mahakali Caves'], nearby:['Andheri East','SEEPZ'] },
  { slug:'thakur-complex', name:'Thakur Complex', zone:'Western Line', district:'Mumbai Suburban', pincode:'400101', landmarks:['Thakur Complex Kandivali East'], nearby:['Thakur Village','Kandivali East'] },
  { slug:'lokhandwala-township', name:'Lokhandwala Township', zone:'Western Line', district:'Mumbai Suburban', pincode:'400101', landmarks:['Lokhandwala Foundation School'], nearby:['Kandivali East','Akuli Road'] },
  { slug:'royal-palms', name:'Royal Palms', zone:'Western Line', district:'Mumbai Suburban', pincode:'400065', landmarks:['Royal Palms Golf Course','Aarey'], nearby:['Goregaon East','Marol'] },
  { slug:'gokuldham', name:'Gokuldham', zone:'Western Line', district:'Mumbai Suburban', pincode:'400063', landmarks:['Gokuldham Temple'], nearby:['Goregaon East','Yashodham'] },
  { slug:'yashodham', name:'Yashodham', zone:'Western Line', district:'Mumbai Suburban', pincode:'400063', landmarks:['Yashodham High School'], nearby:['Gokuldham','Goregaon East'] },
  { slug:'bangur-nagar', name:'Bangur Nagar', zone:'Western Line', district:'Mumbai Suburban', pincode:'400090', landmarks:['Bangur Nagar Metro','Goregaon West'], nearby:['Goregaon West','Malad West'] },
  { slug:'evershine-nagar', name:'Evershine Nagar', zone:'Western Line', district:'Mumbai Suburban', pincode:'400064', landmarks:['Evershine Nagar Malad West'], nearby:['Malad West','Mindspace'] },
  { slug:'orlem', name:'Orlem', zone:'Western Line', district:'Mumbai Suburban', pincode:'400064', landmarks:['Our Lady of Lourdes Church'], nearby:['Malad West','Kandivali West'] },
  { slug:'mulund-camp', name:'Mulund Camp', zone:'Central Line', district:'Mumbai Suburban', pincode:'400082', landmarks:['Mulund Camp Market'], nearby:['Mulund West','Thane'] },
  // --- HYPER-LOCAL MICRO-MARKETS (Gali, Naka, Gaothan & Colonies) ---

  // South / Central Mumbai Core Areas
  { slug:'bhendi-bazaar', name:'Bhendi Bazaar', zone:'South Mumbai', district:'Mumbai City', pincode:'400003', landmarks:['Bhendi Bazaar', 'Null Bazaar'], nearby:['Dongri','Crawford Market'] },
  { slug:'zaveri-bazaar', name:'Zaveri Bazaar', zone:'South Mumbai', district:'Mumbai City', pincode:'400002', landmarks:['Jewellery Market'], nearby:['Kalbadevi','Bhuleshwar'] },
  { slug:'crawford-market', name:'Crawford Market', zone:'South Mumbai', district:'Mumbai City', pincode:'400001', landmarks:['Mahatma Jyotiba Phule Mandai'], nearby:['CSMT','Marine Lines'] },
  { slug:'kalachowki', name:'Kalachowki', zone:'South Mumbai', district:'Mumbai City', pincode:'400033', landmarks:['Cotton Green Station','Abhyudaya Nagar'], nearby:['Parel','Chinchpokli'] },
  { slug:'jacob-circle', name:'Jacob Circle (Saat Rasta)', zone:'South Mumbai', district:'Mumbai City', pincode:'400011', landmarks:['Saat Rasta','Mahalaxmi Station'], nearby:['Mahalaxmi','Agripada'] },
  { slug:'hindu-colony', name:'Hindu Colony (Dadar)', zone:'South Mumbai', district:'Mumbai City', pincode:'400014', landmarks:['Ruia College','Dadar TT'], nearby:['Dadar','Matunga'] },
  { slug:'parsi-colony', name:'Parsi Colony (Dadar)', zone:'South Mumbai', district:'Mumbai City', pincode:'400014', landmarks:['Five Gardens'], nearby:['Matunga','Dadar'] },
  { slug:'shivaji-park', name:'Shivaji Park', zone:'South Mumbai', district:'Mumbai City', pincode:'400028', landmarks:['Shivaji Park Ground'], nearby:['Dadar','Mahim'] },
  { slug:'worli-koliwada', name:'Worli Koliwada', zone:'South Mumbai', district:'Mumbai City', pincode:'400030', landmarks:['Worli Fort','Sea Link'], nearby:['Worli','Prabhadevi'] },
  { slug:'sion-koliwada', name:'Sion Koliwada', zone:'Central Line', district:'Mumbai City', pincode:'400022', landmarks:['GTB Nagar Station'], nearby:['Sion','Antop Hill'] },

  // Western Suburbs - Extremely Local
  { slug:'bandra-reclamation', name:'Bandra Reclamation', zone:'Western Line', district:'Mumbai Suburban', pincode:'400050', landmarks:['Lilavati Hospital','Mount Mary'], nearby:['Bandra West','Mahim'] },
  { slug:'khar-danda', name:'Khar Danda', zone:'Western Line', district:'Mumbai Suburban', pincode:'400052', landmarks:['Danda Village'], nearby:['Khar West','Carter Road'] },
  { slug:'juhu-tara', name:'Juhu Tara Road', zone:'Western Line', district:'Mumbai Suburban', pincode:'400049', landmarks:['Juhu Beach'], nearby:['Juhu','Santacruz West'] },
  { slug:'milan-subway', name:'Milan Subway', zone:'Western Line', district:'Mumbai Suburban', pincode:'400054', landmarks:['Milan Subway Vile Parle'], nearby:['Vile Parle East','Santacruz East'] },
  { slug:'irla', name:'Irla', zone:'Western Line', district:'Mumbai Suburban', pincode:'400056', landmarks:['Alfa Store','Irla Market'], nearby:['Vile Parle West','Andheri West'] },
  { slug:'sher-e-punjab', name:'Sher-e-Punjab', zone:'Western Line', district:'Mumbai Suburban', pincode:'400093', landmarks:['Tolani College','Sher E Punjab Colony'], nearby:['Andheri East','Mahakali'] },
  { slug:'aram-nagar', name:'Aram Nagar', zone:'Western Line', district:'Mumbai Suburban', pincode:'400061', landmarks:['Aram Nagar Versova'], nearby:['Versova','Seven Bungalows'] },
  { slug:'shastri-nagar', name:'Shastri Nagar', zone:'Western Line', district:'Mumbai Suburban', pincode:'400053', landmarks:['Lokhandwala Backroad'], nearby:['Andheri West','Oshiwara'] },
  { slug:'chincholi-bunder', name:'Chincholi Bunder', zone:'Western Line', district:'Mumbai Suburban', pincode:'400064', landmarks:['Chincholi Bunder Road'], nearby:['Malad West','Mindspace'] },
  { slug:'malwani', name:'Malwani', zone:'Western Line', district:'Mumbai Suburban', pincode:'400095', landmarks:['Malwani Gate 1-8'], nearby:['Malad West','Marve'] },
  { slug:'kurar-village', name:'Kurar Village', zone:'Western Line', district:'Mumbai Suburban', pincode:'400097', landmarks:['Kurar Police Station'], nearby:['Malad East','Pathanwadi'] },
  { slug:'poisar', name:'Poisar', zone:'Western Line', district:'Mumbai Suburban', pincode:'400101', landmarks:['Poisar Gymkhana'], nearby:['Kandivali East','Kandivali West'] },
  { slug:'mahavir-nagar', name:'Mahavir Nagar', zone:'Western Line', district:'Mumbai Suburban', pincode:'400067', landmarks:['Kamla Vihar Sports Club'], nearby:['Kandivali West','Borivali West'] },
  { slug:'shimpoli', name:'Shimpoli', zone:'Western Line', district:'Mumbai Suburban', pincode:'400092', landmarks:['Shimpoli Signal'], nearby:['Borivali West','Vazira'] },
  { slug:'vazira-naka', name:'Vazira Naka', zone:'Western Line', district:'Mumbai Suburban', pincode:'400092', landmarks:['Vazira Naka Borivali'], nearby:['Borivali West','Shimpoli'] },
  { slug:'magathane', name:'Magathane', zone:'Western Line', district:'Mumbai Suburban', pincode:'400066', landmarks:['Magathane Depot'], nearby:['Borivali East','Dahisar East'] },
  { slug:'kandarpada', name:'Kandarpada', zone:'Western Line', district:'Mumbai Suburban', pincode:'400068', landmarks:['Dahisar Link Road'], nearby:['Dahisar West','IC Colony'] },

  // Eastern Suburbs - Extremely Local
  { slug:'nehru-nagar', name:'Nehru Nagar (Kurla)', zone:'Central Line', district:'Mumbai Suburban', pincode:'400024', landmarks:['Kurla East Dairy'], nearby:['Kurla East','Chembur'] },
  { slug:'kamani', name:'Kamani (Kurla)', zone:'Central Line', district:'Mumbai Suburban', pincode:'400070', landmarks:['Kamani Junction'], nearby:['Kurla West','Sakinaka'] },
  { slug:'saki-vihar', name:'Saki Vihar Road', zone:'Central Line', district:'Mumbai Suburban', pincode:'400072', landmarks:['L&T Powai'], nearby:['Sakinaka','Powai'] },
  { slug:'kannamwar-nagar', name:'Kannamwar Nagar', zone:'Central Line', district:'Mumbai Suburban', pincode:'400083', landmarks:['Vikhroli East'], nearby:['Vikhroli East','Tagore Nagar'] },
  { slug:'parksite', name:'Parksite (Vikhroli)', zone:'Central Line', district:'Mumbai Suburban', pincode:'400079', landmarks:['Parksite Colony'], nearby:['Vikhroli West','Powai'] },
  { slug:'bhatwadi', name:'Bhatwadi', zone:'Central Line', district:'Mumbai Suburban', pincode:'400084', landmarks:['Ghatkopar West'], nearby:['Ghatkopar West','Asalpha'] },
  { slug:'sarvodaya-nagar', name:'Sarvodaya Nagar', zone:'Central Line', district:'Mumbai Suburban', pincode:'400080', landmarks:['Mulund West'], nearby:['Mulund West','Bhandup West'] },

  // Thane Micro-Markets - Extreme Local
  { slug:'vasant-vihar', name:'Vasant Vihar (Thane)', zone:'Thane', district:'Thane', pincode:'400610', landmarks:['Vasant Vihar Thane'], nearby:['Pokhran Road','Manpada'] },
  { slug:'pokhran-road', name:'Pokhran Road (1 & 2)', zone:'Thane', district:'Thane', pincode:'400610', landmarks:['Upvan Lake','TCS Olympus'], nearby:['Vasant Vihar','Vartak Nagar'] },
  { slug:'kasarvadavali', name:'Kasarvadavali', zone:'Thane', district:'Thane', pincode:'400615', landmarks:['Kasarvadavali Naka','GB Road'], nearby:['Waghbil','Owale'] },
  { slug:'waghbil', name:'Waghbil', zone:'Thane', district:'Thane', pincode:'400615', landmarks:['Suraj Water Park'], nearby:['Kasarvadavali','Hiranandani Estate'] },
  { slug:'kopri-thane', name:'Kopri (Thane East)', zone:'Thane', district:'Thane', pincode:'400603', landmarks:['Thane East Station Area'], nearby:['Thane East','Mulund East'] },

  // Mira-Bhayandar & Vasai-Virar - Deep Local
  { slug:'shanti-park', name:'Shanti Park', zone:'Western Line', district:'Thane', pincode:'401107', landmarks:['Shanti Park Mira Road'], nearby:['Mira Road East','Kanakia'] },
  { slug:'kanakia', name:'Kanakia (Mira Road)', zone:'Western Line', district:'Thane', pincode:'401107', landmarks:['Kanakia Police Station'], nearby:['Shanti Park','Beverly Park'] },
  { slug:'golden-nest', name:'Golden Nest', zone:'Western Line', district:'Thane', pincode:'401105', landmarks:['Golden Nest Circle'], nearby:['Bhayandar East','Mira Road'] },
  { slug:'navghar-road', name:'Navghar Road', zone:'Western Line', district:'Thane', pincode:'401105', landmarks:['Bhayandar East'], nearby:['Bhayandar East','Jesal Park'] },
  { slug:'pelhar', name:'Pelhar', zone:'Western Line', district:'Palghar', pincode:'401208', landmarks:['Pelhar Dam','Highway'], nearby:['Nalasopara East','Vasai East'] },
  { slug:'phoolpada', name:'Phoolpada', zone:'Western Line', district:'Palghar', pincode:'401305', landmarks:['Virar East'], nearby:['Virar East','Manvelpada'] },

  // Navi Mumbai - Deep Local
  { slug:'apmc-market', name:'APMC Market (Vashi)', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'400703', landmarks:['APMC Market'], nearby:['Vashi','Turbhe'] },
  { slug:'roadpali', name:'Roadpali', zone:'Navi Mumbai', district:'Navi Mumbai', pincode:'410218', landmarks:['Roadpali Kalamboli'], nearby:['Kalamboli','Kamothe'] },
  { slug:'takka', name:'Takka (Panvel)', zone:'Navi Mumbai', district:'Raigad', pincode:'410206', landmarks:['Panvel Old City'], nearby:['Panvel','Khanda Colony'] },

  /* ── Others ────────────────────────────────────────────── */
  { slug:'bangalore', name:'Bangalore', zone:'Karnataka', district:'Bengaluru', pincode:'560001', landmarks:['Lalbagh','Cubbon Park','Bangalore Palace','MG Road','Indiranagar'],   nearby:['Mysore','Davangere'] },
  { slug:'mysore',    name:'Mysore',    zone:'Karnataka', district:'Mysuru',    pincode:'570001', landmarks:['Mysore Palace','Chamundi Hills','Brindavan Gardens'],                nearby:['Bangalore','Davangere'] },
  { slug:'davangere', name:'Davangere', zone:'Karnataka', district:'Davangere', pincode:'577001', landmarks:['Davanagere Benne Dosa Hotels','Kunduvada Kere','Glass House'],      nearby:['Bangalore','Mysore'] },

  /* ── Goa (Extended) ─────────────────────────────────────── */
  { slug:'panjim',    name:'Panjim',    zone:'Goa', district:'North Goa', pincode:'403001', landmarks:['Immaculate Conception Church','Fontainhas','Miramar Beach'], nearby:['Margao','Calangute'] },
  { slug:'margao',    name:'Margao',    zone:'Goa', district:'South Goa', pincode:'403601', landmarks:['Colva Beach','Madgaon Station','Borda'], nearby:['Panjim','Vasco'] },

  /* ── West Bengal (Extended) ─────────────────────────────── */
  { slug:'siliguri',  name:'Siliguri',  zone:'West Bengal', district:'Darjeeling', pincode:'734001', landmarks:['Hong Kong Market','Vega Circle Mall','Salugara Monastery'], nearby:['Kolkata','Asansol'] },
  { slug:'uran',      name:'Uran',      zone:'Navi Mumbai', district:'Raigad', pincode:'400702', landmarks:['Uran Beach','JNPT','Pirwadi Beach'], nearby:['Belapur','Panvel','Navi Mumbai'] },
  { slug:'vasco',     name:'Vasco',     zone:'Goa', district:'South Goa', pincode:'403802', landmarks:['Baina Beach','Mormugao Port','Bogmalo Beach'], nearby:['Margao','Panjim'] },
  { slug:'paithan',   name:'Paithan',   zone:'Maharashtra', district:'Aurangabad', pincode:'431107', landmarks:['Jayakwadi Dam','Dnyaneshwar Udyan'], nearby:['Aurangabad','Waluj'] },
  { slug:'waluj',     name:'Waluj',     zone:'Maharashtra', district:'Aurangabad', pincode:'431136', landmarks:['MIDC Waluj','Waluj Lake'], nearby:['Aurangabad','Paithan'] },
  { slug:'kamptee',   name:'Kamptee',   zone:'Maharashtra', district:'Nagpur', pincode:'441001', landmarks:['Dragon Palace Temple','Kamptee Cantonment'], nearby:['Nagpur'] },
  { slug:'raniganj',  name:'Raniganj',  zone:'West Bengal', district:'Paschim Bardhaman', pincode:'713347', landmarks:['Raniganj Market','Mejia Bridge'], nearby:['Asansol','Dhanbad'] },

  /* ── Karnataka (Extended — 404 Fix) ──────────────────────── */
  { slug:'whitefield',      name:'Whitefield',      zone:'Karnataka', district:'Bengaluru', pincode:'560066', landmarks:['ITPL','Phoenix Marketcity Whitefield','Graphite India'], nearby:['Bangalore','Koramangala'] },
  { slug:'electronic-city', name:'Electronic City',  zone:'Karnataka', district:'Bengaluru', pincode:'560100', landmarks:['Infosys Campus','Wipro Campus','Electronic City Flyover'], nearby:['Bangalore','Koramangala'] },
  { slug:'koramangala',     name:'Koramangala',      zone:'Karnataka', district:'Bengaluru', pincode:'560034', landmarks:['Forum Mall','Koramangala BDA Complex','Jyoti Nivas College'], nearby:['Bangalore','Whitefield','Electronic City'] },
  { slug:'hunsur',          name:'Hunsur',           zone:'Karnataka', district:'Mysuru',    pincode:'571105', landmarks:['Hunsur Lake','Lakshmikanthaswamy Temple','Hunsur Bus Stand'], nearby:['Mysore','Bangalore'] },
  { slug:'mandya',          name:'Mandya',           zone:'Karnataka', district:'Mandya',    pincode:'571401', landmarks:['KRS Dam','Sugar Factory','Mandya Town Hall'], nearby:['Mysore','Bangalore'] },

  /* ── Jharkhand (Extended — 404 Fix) ──────────────────────── */
  { slug:'mango',     name:'Mango',     zone:'Jharkhand', district:'East Singhbhum', pincode:'831012', landmarks:['Mango Market','Dimna Lake Road','Mango Station'], nearby:['Jamshedpur','Sakchi','Adityapur'] },
  { slug:'sindri',    name:'Sindri',    zone:'Jharkhand', district:'Dhanbad',         pincode:'828122', landmarks:['Sindri Fertilizer Factory','Sindri Market'], nearby:['Dhanbad','Jharia'] },
  { slug:'hatia',     name:'Hatia',     zone:'Jharkhand', district:'Ranchi',          pincode:'834003', landmarks:['Hatia Station','Hatia Dam','Ranchi Ring Road'], nearby:['Ranchi','Namkum','Bariatu'] },
  { slug:'adityapur', name:'Adityapur', zone:'Jharkhand', district:'Seraikela-Kharsawan', pincode:'831013', landmarks:['Adityapur Industrial Area','Gamharia Bridge'], nearby:['Jamshedpur','Sakchi','Mango'] },
  { slug:'jharia',    name:'Jharia',    zone:'Jharkhand', district:'Dhanbad',         pincode:'828111', landmarks:['Jharia Coalfield','Jharia Market','Tisra Falls'], nearby:['Dhanbad','Sindri'] },

  /* ── West Bengal (Extended — 404 Fix) ────────────────────── */
  { slug:'salt-lake',  name:'Salt Lake',  zone:'West Bengal', district:'Kolkata',           pincode:'700091', landmarks:['Salt Lake Sector V','Nicco Park','Central Park'], nearby:['Kolkata','New Town','Howrah'] },
  { slug:'howrah',     name:'Howrah',     zone:'West Bengal', district:'Howrah',             pincode:'711101', landmarks:['Howrah Bridge','Howrah Station','Belur Math'], nearby:['Kolkata','Salt Lake'] },
  { slug:'new-town',   name:'New Town',   zone:'West Bengal', district:'Kolkata',            pincode:'700156', landmarks:['Eco Park','Axis Mall','Biswa Bangla Gate'], nearby:['Kolkata','Salt Lake'] },
  { slug:'durgapur',   name:'Durgapur',   zone:'West Bengal', district:'Paschim Bardhaman', pincode:'713201', landmarks:['Durgapur Steel Plant','Kumar Mangalam Park','City Centre Durgapur'], nearby:['Asansol','Raniganj'] },

  /* ── Maharashtra (Extended — 404 Fix) ────────────────────── */
  { slug:'boisar',     name:'Boisar',     zone:'Maharashtra', district:'Palghar',     pincode:'401501', landmarks:['Boisar Station','Tarapur Atomic Power Station','MIDC Tarapur'], nearby:['Virar','Vasai','Nalasopara'] },
  { slug:'igatpuri',   name:'Igatpuri',   zone:'Maharashtra', district:'Nasik',       pincode:'422403', landmarks:['Vipassana Centre','Bhatsa Dam','Tringalwadi Fort'], nearby:['Nasik','Sinnar'] },
  { slug:'sinnar',     name:'Sinnar',     zone:'Maharashtra', district:'Nasik',       pincode:'422103', landmarks:['Sinnar MIDC','Gondeshwar Temple','Sinnar Lake'], nearby:['Nasik','Igatpuri'] },
  { slug:'deolali',    name:'Deolali',    zone:'Maharashtra', district:'Nasik',       pincode:'422401', landmarks:['Deolali Camp','Artillery Centre','Deolali Market'], nearby:['Nasik','Igatpuri','Sinnar'] },
  { slug:'grant-road', name:'Grant Road', zone:'South Mumbai', district:'Mumbai City', pincode:'400007', landmarks:['Grant Road Station','Nana Chowk','Opera House'], nearby:['Tardeo','Marine Lines','Churchgate'] },
  { slug:'wardha',     name:'Wardha',     zone:'Maharashtra', district:'Wardha',      pincode:'442001', landmarks:['Sewagram Ashram','Wardha Station','Bor Wildlife Sanctuary'], nearby:['Nagpur','Kamptee'] },

  /* ── Goa (Extended — 404 Fix) ────────────────────────────── */
  { slug:'calangute',  name:'Calangute',  zone:'Goa', district:'North Goa', pincode:'403516', landmarks:['Calangute Beach','St. Alex Church','Baga Beach'], nearby:['Panjim','Margao'] },

  /* ── Mumbai MMR (50 New High-Demand Posh & Micro-Market Locations) ── */
  { slug:'khar-road',          name:'Khar Road',             zone:'Western Line',  district:'Mumbai Suburban', pincode:'400052', landmarks:['Khar Road Station','Linking Road','Khar Gymkhana'], nearby:['Bandra','Khar West','Santacruz'] },
  { slug:'juhu-circle',        name:'Juhu Circle',           zone:'Western Line',  district:'Mumbai Suburban', pincode:'400049', landmarks:['Juhu Circle','JVPD Scheme','Chandan Cinema'], nearby:['Juhu','Andheri West','Vile Parle'] },
  { slug:'gulmohar-road',      name:'Gulmohar Road Juhu',    zone:'Western Line',  district:'Mumbai Suburban', pincode:'400049', landmarks:['Gulmohar Road','Juhu Scheme','Mukesh Patel College'], nearby:['Juhu','JVPD Scheme','Vile Parle West'] },
  { slug:'ruia-park',          name:'Ruia Park Juhu',        zone:'Western Line',  district:'Mumbai Suburban', pincode:'400049', landmarks:['Ruia Park','Juhu Tara Road','Sun-n-Sand'], nearby:['Juhu','Santacruz West','Bandra'] },
  { slug:'hill-road',          name:'Hill Road Bandra',      zone:'Western Line',  district:'Mumbai Suburban', pincode:'400050', landmarks:['Hill Road','Elco Market','Holy Family Hospital'], nearby:['Bandra West','Bandstand','Pali Hill'] },
  { slug:'turner-road',        name:'Turner Road Bandra',    zone:'Western Line',  district:'Mumbai Suburban', pincode:'400050', landmarks:['Turner Road','Waterfield Road','Bandra West'], nearby:['Pali Hill','Perry Cross Road','Carter Road'] },
  { slug:'waterfield-road',    name:'Waterfield Road Bandra',zone:'Western Line',  district:'Mumbai Suburban', pincode:'400050', landmarks:['Waterfield Road','Pali Hill Junction','Linking Road'], nearby:['Bandra West','Turner Road','Khar West'] },
  { slug:'mount-mary',         name:'Mount Mary Bandra',     zone:'Western Line',  district:'Mumbai Suburban', pincode:'400050', landmarks:['Mount Mary Basilica','Bandstand Promenade','SRK Mannat'], nearby:['Bandra West','Pali Hill','Bandstand'] },
  { slug:'perry-cross-road',   name:'Perry Cross Road Bandra',zone:'Western Line', district:'Mumbai Suburban', pincode:'400050', landmarks:['Perry Cross Road','Pali Hill','Gymkhana Area'], nearby:['Carter Road','Bandra West','Turner Road'] },
  { slug:'chimbai',            name:'Chimbai Bandra',        zone:'Western Line',  district:'Mumbai Suburban', pincode:'400050', landmarks:['Chimbai Beach','St. Andrews Road','Hill Road'], nearby:['Bandra West','Bandstand','Pali Hill'] },
  { slug:'sv-road-bandra',     name:'SV Road Bandra',        zone:'Western Line',  district:'Mumbai Suburban', pincode:'400050', landmarks:['SV Road Bandra','Lucky Restaurant','Bandra Mosque'], nearby:['Bandra Station','Khar','BKC'] },
  { slug:'versova-beach',      name:'Versova Beach',         zone:'Western Line',  district:'Mumbai Suburban', pincode:'400061', landmarks:['Versova Beach','Rock Beach','Fisheries University Road'], nearby:['Versova','Yari Road','Lokhandwala'] },
  { slug:'link-road-andheri',  name:'Link Road Andheri',     zone:'Western Line',  district:'Mumbai Suburban', pincode:'400053', landmarks:['Andheri Link Road','Infinity Mall Link Road','Citi Mall'], nearby:['Lokhandwala','Oshiwara','Versova'] },
  { slug:'andheri-kurla-road', name:'Andheri Kurla Road',    zone:'Western Line',  district:'Mumbai Suburban', pincode:'400059', landmarks:['Chakala Metro','Courtyard Marriott','MIDC Junction'], nearby:['Chakala','Marol','Kurla'] },
  { slug:'marol-naka',         name:'Marol Naka',            zone:'Western Line',  district:'Mumbai Suburban', pincode:'400059', landmarks:['Marol Naka Metro','Marol Fire Brigade','Seven Hills Hospital'], nearby:['Andheri East','Sakinaka','MIDC Andheri'] },
  { slug:'seepz-andheri',      name:'SEEPZ Andheri',         zone:'Western Line',  district:'Mumbai Suburban', pincode:'400096', landmarks:['SEEPZ Gate 1','JVLR Junction','MIDC Central Road'], nearby:['MIDC Andheri','Jogeshwari East','Powai'] },
  { slug:'veera-desai-road',   name:'Veera Desai Road',      zone:'Western Line',  district:'Mumbai Suburban', pincode:'400053', landmarks:['Veera Desai Industrial Estate','Country Club','Fun Republic'], nearby:['Andheri West','Oshiwara','Lokhandwala'] },
  { slug:'juhu-lane',          name:'Juhu Lane Andheri',     zone:'Western Line',  district:'Mumbai Suburban', pincode:'400058', landmarks:['Juhu Lane','Andheri Station West','Bhavans College Road'], nearby:['Andheri West','Vile Parle West','Juhu'] },
  { slug:'santacruz-station',  name:'Santacruz Station Area',zone:'Western Line',  district:'Mumbai Suburban', pincode:'400054', landmarks:['Santacruz Station West','Podar School Road','Station Road'], nearby:['Santacruz West','Khar','Kalina'] },
  { slug:'vile-parle-station', name:'Vile Parle Station Area',zone:'Western Line', district:'Mumbai Suburban', pincode:'400057', landmarks:['Vile Parle Station West','Nehru Road','Subhash Road'], nearby:['Vile Parle West','Juhu','Santacruz'] },
  { slug:'mindspace-goregaon', name:'Mindspace Goregaon',    zone:'Western Line',  district:'Mumbai Suburban', pincode:'400104', landmarks:['Mindspace Tech Park','Inorbit Malad Road','Link Road'], nearby:['Goregaon West','Malad West','Bangur Nagar'] },
  { slug:'link-road-malad',    name:'Link Road Malad',       zone:'Western Line',  district:'Mumbai Suburban', pincode:'400064', landmarks:['Malad Link Road','Evershine Mall','Chincholi Bunder'], nearby:['Malad West','Mindspace Malad','Kandivali West'] },
  { slug:'marve-road',         name:'Marve Road Malad',      zone:'Western Line',  district:'Mumbai Suburban', pincode:'400095', landmarks:['Marve Road','Mith Chowki','Malad Station Link'], nearby:['Malad West','Charkop','Orlem'] },
  { slug:'charkop-sector-8',   name:'Charkop Sector 8',      zone:'Western Line',  district:'Mumbai Suburban', pincode:'400067', landmarks:['Charkop Market','Sector 8 Garden','Charkop Naka'], nearby:['Charkop','Kandivali West','Gorai'] },
  { slug:'thakur-complex-kandivali', name:'Thakur Complex Kandivali', zone:'Western Line', district:'Mumbai Suburban', pincode:'400101', landmarks:['Thakur College of Science','Complex Market','Western Express Highway'], nearby:['Kandivali East','Thakur Village','Lokhandwala Kandivali'] },
  { slug:'lokhandwala-kandivali', name:'Lokhandwala Complex Kandivali', zone:'Western Line', district:'Mumbai Suburban', pincode:'400101', landmarks:['Lokhandwala Foundation School','Akurli Road','Centrium Mall'], nearby:['Kandivali East','Thakur Complex','Samata Nagar'] },
  { slug:'gorai-beach',        name:'Gorai Beach Area',      zone:'Western Line',  district:'Mumbai Suburban', pincode:'400091', landmarks:['Gorai Jetty','EsselWorld Ferry Point','Gorai Creek'], nearby:['Borivali West','Gorai','Madh Island'] },
  { slug:'shimpoli-road',      name:'Shimpoli Road Borivali',zone:'Western Line',  district:'Mumbai Suburban', pincode:'400092', landmarks:['Shimpoli Road','Goyal Shopping Centre','Kastur Park'], nearby:['Borivali West','Charkop','Vazira Naka'] },
  { slug:'eksar-road',         name:'Eksar Road Borivali',   zone:'Western Line',  district:'Mumbai Suburban', pincode:'400092', landmarks:['Eksar Metro Station','Eksar Village','Dev Nagar'], nearby:['Borivali West','IC Colony','Mandapeshwar'] },
  { slug:'mandapeshwar',       name:'Mandapeshwar Borivali', zone:'Western Line',  district:'Mumbai Suburban', pincode:'400103', landmarks:['Mandapeshwar Caves','Dahisar Bridge','Gymkhana Road'], nearby:['Borivali West','IC Colony','Dahisar West'] },
  { slug:'hatkesh',            name:'Hatkesh Mira Road',     zone:'Western Line',  district:'Thane',           pincode:'401107', landmarks:['Hatkesh Industrial Area','GCC Club Road','Kashimira'], nearby:['Mira Road','Silver Park','Pleasant Park'] },
  { slug:'silver-park',        name:'Silver Park Mira Road', zone:'Western Line',  district:'Thane',           pincode:'401107', landmarks:['Silver Park Signal','Mira Bhayandar Road','Thakur Mall'], nearby:['Mira Road','Hatkesh','Shanti Nagar'] },
  { slug:'shanti-nagar',       name:'Shanti Nagar Mira Road',zone:'Western Line',  district:'Thane',           pincode:'401107', landmarks:['Shanti Nagar Sector 1','Sector 3 Market','Srishti Road'], nearby:['Mira Road','Beverly Park','Silver Park'] },
  { slug:'pleasant-park',      name:'Pleasant Park Mira Road',zone:'Western Line', district:'Thane',           pincode:'401107', landmarks:['Pleasant Park Naka','Jangid Complex','Poonam Sagar'], nearby:['Mira Road','Shanti Park','Hatkesh'] },
  { slug:'beverly-park',       name:'Beverly Park Mira Road',zone:'Western Line',  district:'Thane',           pincode:'401107', landmarks:['Beverly Park Circle','Kanakiya Road','Cinemax Mira Road'], nearby:['Mira Road','Shanti Nagar','Silver Park'] },
  { slug:'maxus-mall-road',    name:'Maxus Mall Road Bhayandar', zone:'Western Line', district:'Thane',        pincode:'401101', landmarks:['Maxus Mall','Bhayandar West Flyover','150 Feet Road'], nearby:['Bhayandar West','Navghar Road','Golden Nest'] },
  { slug:'vasai-link-road',    name:'Vasai Link Road',       zone:'Western Line',  district:'Palghar',         pincode:'401202', landmarks:['Vasai Link Road','Dattani Square Mall','Babola Naka'], nearby:['Vasai West','Sandor','Nalasopara'] },
  { slug:'yazoo-park-virar',   name:'Yazoo Park Global City',zone:'Western Line',  district:'Palghar',         pincode:'401303', landmarks:['Yazoo Park','Global City Club','Rustomjee Township'], nearby:['Virar West','Bolinj','Arnala'] },
  { slug:'cuffe-parade-west',  name:'Cuffe Parade West',     zone:'South Mumbai',  district:'Mumbai City',     pincode:'400005', landmarks:['Maker Towers','President Hotel Area','World Trade Centre'], nearby:['Cuffe Parade','Colaba','Nariman Point'] },
  { slug:'nariman-point-cbd',  name:'Nariman Point CBD',     zone:'South Mumbai',  district:'Mumbai City',     pincode:'400021', landmarks:['Air India Building','NCPA','Vidhan Bhavan Area'], nearby:['Nariman Point','Churchgate','Marine Lines'] },
  { slug:'bkc-g-block',        name:'BKC G Block',           zone:'Western Line',  district:'Mumbai Suburban', pincode:'400051', landmarks:['Jio World Centre','US Consulate Area','ONE BKC'], nearby:['Bandra Kurla Complex (BKC)','Bandra East','Kurla West'] },
  { slug:'hiranandani-powai',  name:'Hiranandani Powai',     zone:'Central Line',  district:'Mumbai Suburban', pincode:'400076', landmarks:['Galleria Mall Powai','Rodas Enclave','Heritage Garden'], nearby:['Powai','Chandivali','Kanjurmarg West'] },
  { slug:'kanjurmarg-station', name:'Kanjurmarg Station Area',zone:'Central Line', district:'Mumbai Suburban', pincode:'400042', landmarks:['Kanjurmarg Station West','LBS Marg','Runwal Bliss'], nearby:['Kanjurmarg','Bhandup West','Vikhroli West'] },
  { slug:'naupada-char-rasta', name:'Naupada Char Rasta',    zone:'Central Line',  district:'Thane',           pincode:'400602', landmarks:['Char Rasta Thane','Gokhale Road','Naupada Market'], nearby:['Thane West','Panchpakhadi','Teen Hath Naka'] },
  { slug:'panchpakhadi-west',  name:'Panchpakhadi West',     zone:'Central Line',  district:'Thane',           pincode:'400602', landmarks:['Kachrali Lake','Thane Municipal Corporation','Service Road'], nearby:['Panchpakhadi','Naupada','Vartak Nagar'] },
  { slug:'kolshet-road',       name:'Kolshet Road Thane',    zone:'Central Line',  district:'Thane',           pincode:'400607', landmarks:['Lodha Amara','Kolshet Industrial Area','Highland Haven'], nearby:['Majiwada','Balkum','Ghodbunder Road'] },
  { slug:'seawoods-grand-central', name:'Seawoods Grand Central', zone:'Navi Mumbai', district:'Navi Mumbai',  pincode:'400706', landmarks:['Grand Central Mall','Seawoods Railway Station','Sector 40'], nearby:['Nerul','CBD Belapur','Kharghar'] },
  { slug:'dronagiri-uran',     name:'Dronagiri Uran',        zone:'Navi Mumbai',   district:'Raigad',          pincode:'400702', landmarks:['Dronagiri Railway Station','JNPT Port Area','Bokadvira'], nearby:['Uran','Ulwe','Panvel'] },
  { slug:'kalamboli-junction', name:'Kalamboli Junction',    zone:'Navi Mumbai',   district:'Raigad',          pincode:'410218', landmarks:['Kalamboli Circle','Steel Market Kalamboli','Mumbai-Pune Expressway Start'], nearby:['Kamothe','Kharghar','Panvel'] },
  { slug:'taloja-phase-1',     name:'Taloja Phase 1',        zone:'Navi Mumbai',   district:'Raigad',          pincode:'410208', landmarks:['Taloja Metro Station','MIDC Taloja','Ghot Camp Road'], nearby:['Kharghar','Kamothe','Panvel'] },
];

export function normalizeSlug(slug: string): string {
  return slug.toLowerCase().trim().replace(/\s+/g, '-');
}

export function getLocation(slug: string): LocationData | undefined {
  const normalized = normalizeSlug(slug);
  return locations.find(l => l.slug === normalized);
}

export function getStaticLocationPaths() {
  return locations.map(l => ({ params: { location: l.slug } }));
}
