import { Product, EquipmentCategory } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'bbk-001',
    sku: 'BBK-STV-4B-01',
    name: 'GETRA 4-Burner Gas Open Range with Cabinet Stainless Steel',
    category: 'Kompor & Burner',
    brand: 'GETRA',
    price: 13800000,
    originalPriceEstimate: 26500000,
    status: 'READY',
    condition: 'Bekas Original',
    conditionRating: 8.8,
    location: 'Jakarta Barat (Daan Mogot)',
    powerType: 'Gas',
    powerWattage: 'Low & Medium Pressure LPG (4 x 20.000 BTU)',
    dimensions: '70 x 80 x 85 cm',
    material: 'Heavy Duty Stainless Steel 304',
    summary: 'Kompor komersial 4 tungku heavy duty bekas resto western, api biru merata, tatakan cast iron tebal & kokoh.',
    description: 'Unit kompor 4 burner merk GETRA bekas pemakaian restoran steak & pasta selama ~1,5 tahun. Kondisi bodi stainless mulus tanpa penyok mayor, burner cup dan pilot jet sudah dibersihkan dan disetel ulang. Api biru stabil dan kencang. Bagian bawah dilengkapi kabinet penyimpanan panci/wajan.',
    testedFunctions: [
      'Semua 4 burner api biru stabil',
      'Knob gas putar lancar & presisi',
      'Tatakan besi cor utuh tanpa retak',
      'Pipa manifold gas bebas kebocoran (sudah soap test)',
      'Bodi stainless bersih & bebas karat structural'
    ],
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1000&q=80'
    ],
    dateAdded: '2026-08-10',
    previousUsage: 'Ex-Restoran Western Senopati (1,5 tahun operasional)',
    adminInternalNotes: 'Kondisi sangat mulus, owner resto tutup cabang.',
    adminTelegramRef: 'TG-SUPPLIER-JKT-B-883',
    featured: true
  },
  {
    id: 'bbk-002',
    sku: 'BBK-FRY-GAS-17',
    name: 'Crown Horeca 17L Double Basket Gas Deep Fryer',
    category: 'Deep Fryer',
    brand: 'Crown Horeca',
    price: 6200000,
    originalPriceEstimate: 11500000,
    status: 'READY',
    condition: 'Rekondisi Siap Pakai',
    conditionRating: 9.0,
    location: 'Tangerang (Cipondoh)',
    powerType: 'Gas',
    powerWattage: 'LPG Gas + 220V Pilot Ignition',
    dimensions: '50 x 65 x 95 cm',
    material: 'Stainless Steel Tebal',
    summary: 'Deep fryer komersial 17 liter 2 keranjang, thermostat otomatis responsif, tangki minyak bersih.',
    description: 'Deep fryer gas merk Crown Horeca kapasitas tank 17 liter dengan sistem drain valve di bawah. Sangat cocok untuk usaha fried chicken, kentang goreng cafe, atau snack bar. Thermostat kontrol suhu presisi sudah diganti baru (original replacement).',
    testedFunctions: [
      'Pemanasan minyak cepat mencapai 180°C (< 8 menit)',
      'Thermostat otomatis cut-off berfungsi akurat',
      'Kran pembuangan minyak (drain valve) rapat tanpa rembes',
      'Termasuk 2 unit keranjang frying stainless original'
    ],
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80'
    ],
    dateAdded: '2026-08-11',
    previousUsage: 'Ex-Franchise Ayam Crispy (9 bulan)',
    adminInternalNotes: 'Thermostat baru diganti teknisi.',
    adminTelegramRef: 'TG-SUPPLIER-TNG-92',
    featured: true
  },
  {
    id: 'bbk-003',
    sku: 'BBK-OVN-DECK-02',
    name: 'Sinar Himawari 1 Deck 2 Tray Gas Deck Oven (Digital Timer)',
    category: 'Oven & Bakery',
    brand: 'Sinar Himawari',
    price: null, // Empty price state: Requires consultation / Hubungi Admin
    originalPriceEstimate: 18500000,
    status: 'READY',
    condition: 'Bekas Original',
    conditionRating: 8.7,
    location: 'Jakarta Timur (Cakung)',
    powerType: 'Gas & Listrik',
    powerWattage: 'Gas LPG + Listrik Kontrol 100 Watt (220V)',
    dimensions: '134 x 90 x 65 cm',
    material: 'Stainless Steel Food Grade + Peredam Panas Rockwool',
    summary: 'Oven gas deck komersial kapasitas 2 loyang (40x60 cm), kontrol api atas-bawah independen, panel digital mulus.',
    description: 'Oven deck komersial untuk bakery, pastry, atau kue basah. Menggunakan bahan bakar gas LPG hemat dan kontrol digital panel elektrik 220V untuk pengaturan suhu api atas dan api bawah secara terpisah. Pemanasan stabil menghasilkan kematangan roti merata.',
    testedFunctions: [
      'Solenoid valve gas & sensor pemantik api otomatis normal',
      'Suhu api atas dan bawah dapat diatur presisi 30°C - 300°C',
      'Lampu penerangan ruang oven menyala terang',
      'Pintu kaca ganda tempered glass bersih & rapat'
    ],
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1000&q=80'
    ],
    dateAdded: '2026-08-08',
    previousUsage: 'Ex-Artisan Bakery Bintaro',
    adminInternalNotes: 'Harga nego tipis, barang titipan pemilik bakery.',
    adminTelegramRef: 'TG-OWNER-DIRECT-JKT-14',
    featured: true
  },
  {
    id: 'bbk-004',
    sku: 'BBK-CHL-UPR-4D',
    name: 'Berjaya 4-Door Stainless Upright Chiller Commercial 1100L',
    category: 'Chiller & Freezer',
    brand: 'Berjaya Steel',
    price: 19500000,
    originalPriceEstimate: 38000000,
    status: 'READY',
    condition: 'Rekondisi Siap Pakai',
    conditionRating: 9.2,
    location: 'Jakarta Barat (Kebon Jeruk)',
    powerType: 'Listrik',
    powerWattage: '650 Watt (220V / 50Hz)',
    dimensions: '120 x 80 x 195 cm',
    material: 'Full Stainless Steel Exterior & Interior',
    summary: 'Upright chiller 4 pintu kapasitas jumbo ~1100 liter, kompresor original dingin cepat (0°C s/d +8°C), rak kokoh.',
    description: 'Chiller lemari pendingin komersial 4 pintu merk Berjaya Malaysia. Unit sudah melalui overhaul kompresor, flushing pipa evaporator, pengisian freon baru R134a, dan tes ketahanan suhu 24 jam nonstop. Suhu dingin merata sempurna untuk sayur, daging marinasi, dan bahan baku resto.',
    testedFunctions: [
      'Suhu stabil di range +2°C hingga +5°C (digital controller Dixell)',
      'Kompresor halus & amper listrik normal di 3.1A',
      'Karet gasket pintu 4 sisi lentur & rapat',
      'Dilengkapi 6 susun rak kawat dilapisi PE tebal'
    ],
    images: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1000&q=80'
    ],
    dateAdded: '2026-08-09',
    previousUsage: 'Ex-Restoran Hotel Bintang 3',
    adminInternalNotes: 'Kompresor baru diflushing, dingin prima.',
    adminTelegramRef: 'TG-SUPPLIER-BDG-08',
    featured: true
  },
  {
    id: 'bbk-005',
    sku: 'BBK-ICE-MKR-120',
    name: 'Hoshizaki Crescent Ice Maker 120kg/24hr (Modular + Bin)',
    category: 'Ice Maker & Minuman',
    brand: 'Hoshizaki',
    price: null, // Empty price state: Tanyakan Harga
    originalPriceEstimate: 62000000,
    status: 'READY',
    condition: 'Like New / Ex-Display',
    conditionRating: 9.5,
    location: 'Tangerang Selatan (Serpong)',
    powerType: 'Listrik',
    powerWattage: '850 Watt (220V / 50Hz)',
    dimensions: '76 x 83 x 160 cm (Head + Bin)',
    material: 'Stainless Steel Anti Korosi Hoshizaki Quality',
    summary: 'Mesin es batu kristal Hoshizaki kapasitas 120 kg/hari dengan storage bin stainless, bentuk es sabit bening & awet padat.',
    description: 'Unit ice maker legendaris Hoshizaki ex-display pameran hotel horeca. Kondisi kosmetik 95% mulus seperti baru. Menghasilkan es sabit (crescent cube) bening keras yang sangat disukai coffee shop dan bar premium karena lambat mencair.',
    testedFunctions: [
      'Siklus panen es berjalan otomatis 22-25 menit/batch',
      'Sensor batas tampung bin (bin switch) berfungsi presisi',
      'Evaporator stainless utuh bersih tanpa kerak kapur',
      'Pompa air & solenoid inlet lancar'
    ],
    images: [
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=1000&q=80'
    ],
    dateAdded: '2026-08-05',
    previousUsage: 'Ex-Display Unit Showroom (Low Running Hours)',
    adminInternalNotes: 'Rare item kondisi 95%+, prioritas client coffee shop chain.',
    adminTelegramRef: 'TG-OFFICIAL-EX-DISP-41',
    featured: true
  },
  {
    id: 'bbk-006',
    sku: 'BBK-FAB-TBL-180',
    name: 'Meja Kerja Dapur Stainless Steel 304 (180 x 70 x 85 cm) with Undershelf & Backsplash',
    category: 'Stainless Fabrication',
    brand: 'Custom Heavy Duty SS304',
    price: 3400000,
    originalPriceEstimate: 5800000,
    status: 'READY',
    condition: 'Bekas Original',
    conditionRating: 8.9,
    location: 'Bekasi (Tambun)',
    powerType: 'Manual / Tanpa Daya',
    dimensions: '180 x 70 x 85 cm (+ Backsplash 15 cm)',
    material: 'Food Grade Stainless Steel SUS 304 Tebal 1.2 mm',
    summary: 'Meja kerja dapur resto stainless 304 tebal, anti karat air garam/bumbu, rangka pipa bulat kokoh dengan adjustable feet.',
    description: 'Meja preparasi stainless steel grade 304 asli (sudah diuji larutan reagent stainless). Plat tebal 1.2mm diperkuat kayu penopang tahan air di bawah plat agar tidak berisik saat memotong/mencincang. Kaki meja dilengkapi sepatu karet pengatur ketinggian lantai.',
    testedFunctions: [
      'Konstruksi las argon kuat & tidak goyang',
      'Bahan SUS 304 asli tahan asam & garam',
      'Permukaan top table rata & minim baret dalam',
      'Adjustable feet 4 titik berfungsi lancar untuk lantai tidak rata'
    ],
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80'
    ],
    dateAdded: '2026-08-12',
    previousUsage: 'Ex-Kitchen Catering Event',
    adminInternalNotes: 'Stok ada 2 unit identik.',
    adminTelegramRef: 'TG-SUPPLIER-BKS-109',
    featured: false
  },
  {
    id: 'bbk-007',
    sku: 'BBK-MIX-PLN-20L',
    name: 'Sinmag SM-201 Planetary Mixer Bakery 20 Liter (3 Speed + 3 Whisk Attachments)',
    category: 'Mesin Pemroses Makanan',
    brand: 'Sinmag',
    price: 11200000,
    originalPriceEstimate: 21000000,
    status: 'READY',
    condition: 'Rekondisi Siap Pakai',
    conditionRating: 9.0,
    location: 'Jakarta Barat (Meruya)',
    powerType: 'Listrik',
    powerWattage: '750 Watt (220V / 50Hz)',
    dimensions: '55 x 60 x 88 cm',
    material: 'Cast Iron Body + Stainless Bowl SUS304',
    summary: 'Mixer adonan roti & cake 20L heavy duty, gearbox baja kuat 3 percepatan, komplit 3 mata pengaduk.',
    description: 'Planetary mixer merk ternama Sinmag kapasitas bowl 20 liter. Sangat handal untuk mengaduk adonan roti (kapasitas tepung kering hingga 3 kg) atau whip cream dan cake batter. Oli transmisi baru diganti, suara gigi halus tanpa dengung.',
    testedFunctions: [
      '3 percepatan (Low, Medium, High) bertransmisi presisi',
      'Safety microswitch pelindung mangkok berfungsi normal',
      'Tuas pengangkat bowl (crank lift) ringan & terkunci kokoh',
      'Termasuk 3 pengaduk: Spiral Hook, Flat Beater, Wire Whip'
    ],
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1000&q=80'
    ],
    dateAdded: '2026-08-07',
    previousUsage: 'Ex-Cafe & Cake Studio',
    adminInternalNotes: 'Oli gear sudah dikuras dan diisi baru.',
    adminTelegramRef: 'TG-SUPPLIER-JKT-W-55',
    featured: true
  },
  {
    id: 'bbk-008',
    sku: 'BBK-SHW-CK-120',
    name: 'Fomac Curved Glass Cake Showcase Chiller 120 cm Black Base',
    category: 'Showcase & Display',
    brand: 'Fomac',
    price: 8900000,
    originalPriceEstimate: 16800000,
    status: 'READY',
    condition: 'Bekas Original',
    conditionRating: 8.7,
    location: 'Jakarta Selatan (Fatmawati)',
    powerType: 'Listrik',
    powerWattage: '450 Watt (220V)',
    dimensions: '120 x 68 x 122 cm',
    material: 'Curved Tempered Glass with Anti-Condensation Heater + Marble Base',
    summary: 'Showcase kue kaca lengkung 120cm, pemanas kaca anti embun aktif, lampu LED warm white elegan untuk display cafe.',
    description: 'Etalase pendingin display kue, pastry, dan minuman untuk cafe. Dilengkapi heater kawat kaca depan yang mencegah kondensasi embun agar produk tetap terlihat jelas dan mewah. Suhu dingin stabil di kisaran 2°C s/d 8°C.',
    testedFunctions: [
      'Pemanas kaca depan aktif mencegah embun saat udara lembab',
      'Suhu dingin merata di semua 3 tingkat display rak kaca',
      'Lampu LED display menyala sempurna',
      'Pintu geser belakang (sliding door) meluncur mulus'
    ],
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1000&q=80'
    ],
    dateAdded: '2026-08-04',
    previousUsage: 'Ex-Coffee Shop SCBD',
    adminInternalNotes: 'Lampu LED diganti warm baru biar menarik.',
    adminTelegramRef: 'TG-SUPPLIER-JKT-S-301',
    featured: false
  },
  {
    id: 'bbk-009',
    sku: 'BBK-EXH-BLW-03',
    name: 'Centrifugal Exhaust Blower Kitchen CKE 3 HP (High Static Pressure)',
    category: 'Exhaust & Blower',
    brand: 'CKE Fans',
    price: 4750000,
    originalPriceEstimate: 8200000,
    status: 'READY',
    condition: 'Rekondisi Siap Pakai',
    conditionRating: 9.1,
    location: 'Tangerang (Karawaci)',
    powerType: 'Listrik',
    powerWattage: '2.200 Watt / 3 Phase (380V) or 1 Phase Rewired',
    dimensions: '60 x 55 x 70 cm',
    material: 'Heavy Galvanized Steel Casing + Forward Curved Impeller',
    summary: 'Blower hisap asap dapur resto kapasitas 3 HP hisapan kuat untuk exhaust hood panjang 2.5 - 4 meter.',
    description: 'Blower sentrifugal dapur komersial untuk menghisap asap masakan berat (Chinese food wok range, grill, deep fryer). Motor dinamo sudah di-balancing ulang, bearing bearing SKF baru, dan impeller dibersihkan tuntas dari endapan minyak.',
    testedFunctions: [
      'Getaran minim (sudah dynamic balancing impeller)',
      'Bearing baru suara halus dan tidak panas berlebih',
      'Daya hisap CFM kuat teruji di ducting 12 inch',
      'Gulungan dinamo tembaga original bukan gulung ulang murah'
    ],
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80'
    ],
    dateAdded: '2026-08-06',
    previousUsage: 'Ex-Restoran Chinese Food Kelapa Gading',
    adminInternalNotes: 'Bearing baru diganti SKF original.',
    adminTelegramRef: 'TG-SUPPLIER-TNG-112',
    featured: false
  },
  {
    id: 'bbk-010',
    sku: 'BBK-SNK-2BW-150',
    name: 'Commercial Double Bowl Sink Stainless 304 with Drainboard (150 x 70 x 85 cm)',
    category: 'Washing & Sink',
    brand: 'Custom Kitchen Fabrication',
    price: 3600000,
    originalPriceEstimate: 6500000,
    status: 'READY',
    condition: 'Bekas Original',
    conditionRating: 8.8,
    location: 'Jakarta Utara (Pluit)',
    powerType: 'Manual / Tanpa Daya',
    dimensions: '150 x 70 x 85 cm (Bowl 45x45x30 cm per lubang)',
    material: 'Stainless Steel SUS 304 Tebal 1.2 mm',
    summary: 'Bak cuci piring 2 lubang dalam + sayap tirisan stainless 304, lubang afur standar 3.5 inch, kokoh anti goyang.',
    description: 'Sink cuci komersial 2 bowl dalam (kedalaman 30 cm) sangat cocok untuk mencuci panci stock pot besar resto, loyang, atau wadah gastronorm. Dilengkapi backsplash 15 cm mencegah percikan air ke dinding dapur.',
    testedFunctions: [
      'Las-lasan bowl rapat & anti bocor (tes genang 24 jam)',
      'Plat SUS 304 food grade tebal & anti karat',
      'Afur keranjang penyaring sisa makanan bersih & lengkap',
      'Undershelf bawah kuat untuk menaruh rak piring/jerigen sabun'
    ],
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    dateAdded: '2026-08-03',
    previousUsage: 'Ex-Central Kitchen Cloud Catering',
    adminInternalNotes: 'Kondisi plat kinclong tanpa kerak membandel.',
    adminTelegramRef: 'TG-SUPPLIER-JKT-N-19',
    featured: false
  },
  {
    id: 'bbk-011',
    sku: 'BBK-CHL-UCT-180',
    name: 'Under-Counter Chiller Stainless 3-Door with Flat Prep Top (180 cm)',
    category: 'Chiller & Freezer',
    brand: 'Nayati / Mastercool',
    price: 16800000,
    originalPriceEstimate: 32000000,
    status: 'SOLD',
    condition: 'Bekas Original',
    conditionRating: 9.0,
    location: 'Jakarta Selatan',
    powerType: 'Listrik',
    powerWattage: '480 Watt (220V)',
    dimensions: '180 x 75 x 85 cm',
    material: 'Full Heavy Duty Stainless Steel 304',
    summary: 'Chiller bawah meja 3 pintu stainless, bagian atas berfungsi sebagai meja kerja dapur resto.',
    description: 'Under counter chiller 3 pintu kombinasi meja kerja. Efisiensi ruang dapur maksimal karena bagian atas bisa dipakai menaruh cutting board, blender, atau plating station. Unit ini telah terjual kepada resto mitra kami di Tebet.',
    testedFunctions: [
      'Suhu stabil 2°C - 6°C',
      'Top table stainless 304 solid',
      'Kompresor Danfoss original'
    ],
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1000&q=80'
    ],
    dateAdded: '2026-07-28',
    previousUsage: 'Ex-Italian Bistro Kemang',
    adminInternalNotes: 'SOLD ke Mas Dimas (Tebet) tgl 12 Ags.',
    adminTelegramRef: 'TG-ARCHIVED-SOLD-09',
    featured: false
  },
  {
    id: 'bbk-012',
    sku: 'BBK-SLC-MT-300',
    name: 'Sirman Meat Slicer Semi-Automatic 300mm (12 Inch Blade) Made in Italy',
    category: 'Mesin Pemroses Makanan',
    brand: 'Sirman',
    price: 7800000,
    originalPriceEstimate: 17500000,
    status: 'READY',
    condition: 'Bekas Original',
    conditionRating: 9.3,
    location: 'Surabaya (Gudang Transit Rungkut)',
    powerType: 'Listrik',
    powerWattage: '275 Watt (220V)',
    dimensions: '60 x 50 x 45 cm',
    material: 'Anodized Aluminum Alloy Body + Hard Chromed Blade',
    summary: 'Mesin pengiris daging beku & shabu-shabu pisau 12 inch Sirman Italia, irisan presisi 0 - 13 mm, built-in sharpener.',
    description: 'Meat slicer komersial standar restoran all-you-can-eat shabu & yakiniku. Pisau baja krom keras tajam buatan Italia dengan batu asahan bawaan di kepala mesin. Carriage geser sangat enteng dan presisi.',
    testedFunctions: [
      'Ketebalan irisan bisa diatur presisi dari 0.5 mm hingga 13 mm',
      'Batu asah terpasang rapi & siap mengasah mata pisau kapan saja',
      'Motor bertenaga tidak melambat saat mengiris daging semi-frozen',
      'Safety guard akrilik pelindung tangan terpasang utuh'
    ],
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1000&q=80'
    ],
    dateAdded: '2026-08-09',
    previousUsage: 'Ex-Japanese Shabu Resto (Mall Surabaya)',
    adminInternalNotes: 'Bisa dikirim via KIB Cepat atau ekspedisi cargo ke Jakarta/Jawa.',
    adminTelegramRef: 'TG-SUPPLIER-SBY-44',
    featured: false
  }
];

export const CATEGORIES: { name: EquipmentCategory; icon: string; countDesc: string }[] = [
  { name: 'Semua', icon: 'LayoutGrid', countDesc: 'Semua Kategori' },
  { name: 'Kompor & Burner', icon: 'Flame', countDesc: '4/6 Burner, Kwali Range, Stock Pot' },
  { name: 'Deep Fryer', icon: 'Utensils', countDesc: 'Gas & Electric Fryer 17L-30L' },
  { name: 'Oven & Bakery', icon: 'Layers', countDesc: 'Deck Oven, Convection, Proofer' },
  { name: 'Chiller & Freezer', icon: 'Snowflake', countDesc: 'Upright, Undercounter, Chest' },
  { name: 'Showcase & Display', icon: 'Maximize2', countDesc: 'Cake Showcase, Warmer, Cold Bar' },
  { name: 'Stainless Fabrication', icon: 'Table', countDesc: 'Meja Kerja, Rak Susun, Wall Shelf' },
  { name: 'Exhaust & Blower', icon: 'Wind', countDesc: 'Hood Dapur, Blower Sirocco & Centrifugal' },
  { name: 'Mesin Pemroses Makanan', icon: 'Cpu', countDesc: 'Mixer 20L/30L, Slicer, Dough Sheeter' },
  { name: 'Ice Maker & Minuman', icon: 'Coffee', countDesc: 'Mesin Es Batu Kristal & Blender Cafe' },
  { name: 'Washing & Sink', icon: 'Droplets', countDesc: 'Double Sink, Greasetrap, Dishwasher' }
];

export const LOCATION_OPTIONS = [
  'Semua Lokasi',
  'Jakarta Barat',
  'Jakarta Selatan',
  'Jakarta Timur',
  'Jakarta Utara',
  'Tangerang / Tangsel',
  'Bekasi',
  'Surabaya / Jawa Timur'
];

export const CONDITION_OPTIONS = [
  'Semua Kondisi',
  'Bekas Original',
  'Rekondisi Siap Pakai',
  'Like New / Ex-Display',
  'Baru Sisa Proyek / Lelang'
];

export const POWER_TYPE_OPTIONS = [
  'Semua Sumber Daya',
  'Gas',
  'Listrik',
  'Gas & Listrik',
  'Manual / Tanpa Daya'
];
