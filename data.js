// data.js - Static data for Royal Bath Luxury Bathroom Accessories

const INITIAL_CATEGORIES = [
  { id: 'Rails', name: 'Towel Rails', icon: '📋' },
  { id: 'Shower', name: 'Showers & Mixers', icon: '🚿' },
  { id: 'Taps', name: 'Luxury Taps', icon: '🚰' },
  { id: 'Mirrors', name: 'Design Mirrors', icon: '🪞' },
  { id: 'Sinks', name: 'Premium Sinks', icon: '🏺' },
  { id: 'Bath', name: 'Bespoke Bathtubs', icon: '🛁' },
  { id: 'Accessories', name: 'Accessories', icon: '🧴' },
  { id: 'Hooks', name: 'Wall Hooks', icon: '🪝' },
  { id: 'Textiles', name: 'Royal Textiles', icon: '🧶' }
];

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Royal Bronze Towel Rail",
    category: "Rails",
    price: 18500,
    discount: 15,
    image: "https://images.unsplash.com/photo-1608651061499-ff031fbf6645?w=800&q=80&fit=crop&auto=format",
    description: "Handcrafted solid bronze towel rail with a slim, space-saving profile. Corrosion-resistant and polished to a rich luster.",
    stock: 12,
    rating: 4.8,
    isFeatured: true
  },
  {
    id: 2,
    name: "Minimalist Soap Dispenser & Tray Set",
    category: "Accessories",
    price: 6800,
    discount: 10,
    image: "https://images.unsplash.com/photo-1674632633951-34a050fc0b95?w=800&q=80&fit=crop&auto=format",
    description: "Premium soap dispenser and marble tray set. Elegant, refillable pump designed to add a spa-like finish to your vanity.",
    stock: 25,
    rating: 4.5,
    isFeatured: true
  },
  {
    id: 3,
    name: "Aero Silver Rain Shower Head",
    category: "Shower",
    price: 32000,
    discount: 20,
    image: "https://images.unsplash.com/photo-1566446896748-6075a87760c1?w=800&q=80&fit=crop&auto=format",
    description: "Ultra-slim silver shower head with rain flow technology. Designed for high pressure and water conservation.",
    stock: 8,
    rating: 4.9,
    isFeatured: true
  },
  {
    id: 4,
    name: "Imperial Gold Basin Tap",
    category: "Taps",
    price: 24500,
    discount: 12,
    image: "https://images.unsplash.com/photo-1564518823603-52e037eff010?w=800&q=80&fit=crop&auto=format",
    description: "Stunning 24k gold-plated brass faucet. Curved spout with smooth single-handle ceramic cartridge flow control.",
    stock: 15,
    rating: 4.7,
    isFeatured: true
  },
  {
    id: 5,
    name: "Luxury Bathroom Counter & Tumbler Set",
    category: "Accessories",
    price: 9500,
    discount: 0,
    image: "https://images.unsplash.com/photo-1685084844860-5d94e6c82939?w=800&q=80&fit=crop&auto=format",
    description: "Complete vanity organizer set including toothbrush holder, tumbler, and tray in custom sand-blasted glass finish.",
    stock: 18,
    rating: 4.6,
    isFeatured: false
  },
  {
    id: 6,
    name: "Royal Bronze Framed Arch Mirror",
    category: "Mirrors",
    price: 29000,
    discount: 15,
    image: "https://images.unsplash.com/photo-1560828343-a0b3d8864d1b?w=800&q=80&fit=crop&auto=format",
    description: "Symmetric arch mirror framed in custom-finished antique bronze. Copper-free backing prevents silvering damage.",
    stock: 6,
    rating: 4.8,
    isFeatured: true
  },
  {
    id: 7,
    name: "Egyptian Cotton Towel Suite",
    category: "Textiles",
    price: 8500,
    discount: 10,
    image: "https://images.unsplash.com/photo-1737054718383-68055423d164?w=800&q=80&fit=crop&auto=format",
    description: "Ultra-plush Egyptian cotton towel set (2 bath, 2 hand, 2 face). 800 GSM luxury weight for unmatched softness.",
    stock: 30,
    rating: 4.7,
    isFeatured: false
  },
  {
    id: 8,
    name: "Classic Bronze Wall Robe Hook",
    category: "Hooks",
    price: 3500,
    discount: 0,
    image: "assets/classic_bronze_hook.jpg",
    description: "Hand-buffed antique bronze finish wall hook, crafted from pure heavy-cast solid brass. Heavy-duty mounting system supports plush bath sheets with timeless vintage charm.",
    stock: 40,
    rating: 4.4,
    isFeatured: false
  },
  {
    id: 9,
    name: "Signature Freestanding Acrylic Tub",
    category: "Bath",
    price: 185000,
    discount: 25,
    image: "https://images.unsplash.com/photo-1753605788101-04d1e653e74a?w=800&q=80&fit=crop&auto=format",
    description: "Ergonomic double-slipper freestanding bathtub. Crafted from high-density white acrylic reinforced with fiberglass.",
    stock: 4,
    rating: 5.0,
    isFeatured: true
  },
  {
    id: 10,
    name: "Slim Gold Toilet Roll Holder",
    category: "Accessories",
    price: 5900,
    discount: 5,
    image: "https://images.unsplash.com/photo-1584458289616-9377eb69b0bd?w=800&q=80&fit=crop&auto=format",
    description: "Modern minimalist toilet roll holder in polished gold. Sleek wall mount that occupies minimal space.",
    stock: 22,
    rating: 4.5,
    isFeatured: false
  },
  {
    id: 11,
    name: "Matte Black Rain Shower Column",
    category: "Shower",
    price: 48000,
    discount: 15,
    image: "https://images.unsplash.com/photo-1613849925362-38fb4c16ff36?w=800&q=80&fit=crop&auto=format",
    description: "Premium matte black shower system featuring overhead rain shower, handheld wand, and digital temperature control mixer.",
    stock: 7,
    rating: 4.9,
    isFeatured: true
  },
  {
    id: 12,
    name: "Empress Gold & Marble Sink",
    category: "Sinks",
    price: 72000,
    discount: 10,
    image: "https://images.unsplash.com/photo-1564540583246-934409427776?w=800&q=80&fit=crop&auto=format",
    description: "Stunning washbasin carved from a single piece of Calacatta marble, featuring a polished gold-plated outer rim.",
    stock: 5,
    rating: 4.9,
    isFeatured: true
  },
  {
    id: 13,
    name: "Monarch Pedestal Basin",
    category: "Sinks",
    price: 54000,
    discount: 15,
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80&fit=crop&auto=format",
    description: "Stately pedestal basin inspired by Neoclassical design. Smooth vitrified glaze prevents stains and build-up.",
    stock: 9,
    rating: 4.6,
    isFeatured: false
  },
  {
    id: 14,
    name: "Aero Matte Black Basin Mixer",
    category: "Taps",
    price: 19500,
    discount: 10,
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80&fit=crop&auto=format",
    description: "Sleek matte black mixer faucet with a tall gooseneck spout, ideal for vessel sinks. Easy clean aerator.",
    stock: 14,
    rating: 4.7,
    isFeatured: false
  },
  {
    id: 15,
    name: "Premium Gold Heated Towel Rack",
    category: "Rails",
    price: 34000,
    discount: 18,
    image: "assets/gold_heated_towel_rack.jpg",
    description: "Indulge in royal comfort. Premium gold-plated wall-mounted heated towel rack equipped with a smart digital timer and energy-efficient heating rods. Dries and warms your linens to perfection.",
    stock: 3,
    rating: 4.8,
    isFeatured: false
  },
  {
    id: 16,
    name: "Royal Copper Slipper Tub",
    category: "Bath",
    price: 245000,
    discount: 20,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80&fit=crop&auto=format",
    description: "Exquisite hand-hammered double slipper copper bathtub. Retains heat for hours, providing the ultimate luxury soak.",
    stock: 2,
    rating: 5.0,
    isFeatured: true
  },
  {
    id: 17,
    name: "Backlit LED Circular Vanity Mirror",
    category: "Mirrors",
    price: 26500,
    discount: 10,
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80&fit=crop&auto=format",
    description: "Frameless smart circular mirror with dimmable perimeter LED strip, built-in defogger, and touch sensor controls.",
    stock: 10,
    rating: 4.7,
    isFeatured: false
  },
  {
    id: 18,
    name: "Imperial Double Brass Robe Hook",
    category: "Hooks",
    price: 4200,
    discount: 0,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80&fit=crop&auto=format",
    description: "Premium heavy-cast brass double wall hook. Elegant traditional styling to hang heavy robes or bath sheets.",
    stock: 32,
    rating: 4.5,
    isFeatured: false
  },
  {
    id: 19,
    name: "Luxury Scent Diffuser & Bath Salts Set",
    category: "Accessories",
    price: 7800,
    discount: 10,
    image: "assets/scent_diffuser_salts.jpg",
    description: "Elevate your bath ambiance. Curated organic reed diffuser and premium mineral-rich bath salts in decorative crystal bottles. Infused with soothing notes of French Lavender and warm Mysore Sandalwood.",
    stock: 20,
    rating: 4.6,
    isFeatured: false
  },
  {
    id: 20,
    name: "Gold Toothbrush & Tumbler Station",
    category: "Accessories",
    price: 8900,
    discount: 15,
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80&fit=crop&auto=format",
    description: "Sophisticated vanity organizer in brushed gold finish. Secure holds for up to four brushes and a rinse glass.",
    stock: 16,
    rating: 4.5,
    isFeatured: false
  },
  {
    id: 21,
    name: "Waffle Linen Bath Mat Set",
    category: "Textiles",
    price: 4900,
    discount: 0,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80&fit=crop&auto=format",
    description: "Extremely absorbent waffle weave linen bath mats. Quick-drying and textured to massage tired feet.",
    stock: 24,
    rating: 4.3,
    isFeatured: false
  },
  {
    id: 22,
    name: "Handcrafted Organic Soap Set",
    category: "Accessories",
    price: 2900,
    discount: 0,
    image: "assets/organic_soap_set.jpg",
    description: "Nourish your skin with purity. Set of three triple-milled cold-process organic soap bars, enriched with natural Shea Butter, organic Raw Honey, and botanical essences. Packaged in premium artisanal paper wrappers.",
    stock: 50,
    rating: 4.8,
    isFeatured: false
  },
  {
    id: 23,
    name: "Starlight Under-Counter Sink",
    category: "Sinks",
    price: 36000,
    discount: 12,
    image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=80&fit=crop&auto=format",
    description: "Under-mount ceramic basin with deep bowl architecture to avoid splashing. Extremely durable vitreous glaze.",
    stock: 11,
    rating: 4.7,
    isFeatured: false
  },
  {
    id: 24,
    name: "Gold-Trimmed Wall Towel Ring",
    category: "Rails",
    price: 7200,
    discount: 8,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80&fit=crop&auto=format",
    description: "A compact towel ring featuring brass construction with a gorgeous gold inlay detail. Ideal for hand towels.",
    stock: 19,
    rating: 4.6,
    isFeatured: false
  },
  {
    id: 25,
    name: "Matte Black Robe & Towel Hook",
    category: "Hooks",
    price: 2800,
    discount: 0,
    image: "assets/matte_black_hook.jpg",
    description: "Sleek industrial sophistication. A solid brass towel hook finished in a premium matte black powder coating. Features a clean slim profile to fit any contemporary bathroom.",
    stock: 45,
    rating: 4.4,
    isFeatured: false
  },
  {
    id: 26,
    name: "Gold-Plated Handheld Bidet",
    category: "Taps",
    price: 14500,
    discount: 10,
    image: "https://images.unsplash.com/photo-1564518823603-52e037eff010?w=800&q=80&fit=crop&auto=format",
    description: "Premium bidet spray gun finished in 24k polished gold-plating. High-grade brass build with variable pressure trigger.",
    stock: 15,
    rating: 4.7,
    isFeatured: false
  },
  {
    id: 27,
    name: "Imperial Calacatta Gold Wall Hook",
    category: "Hooks",
    price: 4900,
    discount: 10,
    image: "assets/luxury_gold_hook.jpg",
    description: "Premium solid gold-plated brass wall hook, handcrafted in slim minimalist style. Looks magnificent mounted on Calacatta marble vanity backgrounds.",
    stock: 20,
    rating: 4.9,
    isFeatured: true
  },
  {
    id: 28,
    name: "Royal Matte Black Dual Robe Hook",
    category: "Hooks",
    price: 3800,
    discount: 0,
    image: "assets/luxury_black_hook.jpg",
    description: "Sleek double robe hook in executive matte black finish. Excellent weight and corrosion-resistant coating designed for luxury master spas.",
    stock: 25,
    rating: 4.8,
    isFeatured: true
  }
];

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: "Salman Khan",
    location: "DHA Phase 6, Lahore",
    rating: 5,
    comment: "The Imperial Gold Tap is absolutely stunning! The finish is flawless, and it matches my marble vanity perfectly. Highly recommended brand for luxury builds.",
    date: "2026-06-15"
  },
  {
    id: 2,
    name: "Dr. Ayesha Rehman",
    location: "Model Town, Lahore",
    rating: 5,
    comment: "Excellent quality and outstanding customer service. I bought the freestanding acrylic tub, and the delivery was smooth. The thickness and finish of the tub is superior.",
    date: "2026-06-28"
  },
  {
    id: 3,
    name: "Zainab Shah",
    location: "Bahria Town, Lahore",
    rating: 4,
    comment: "Bought towels and bath accessories. The towels are incredibly soft and absorb water instantly. Online pricing was exactly the same as their Model Town showroom.",
    date: "2026-07-02"
  },
  {
    id: 4,
    name: "Omar Farooq",
    location: "Gulberg III, Lahore",
    rating: 5,
    comment: "Superb sleek designs. The matte black rain shower system is the highlight of my new guest bathroom. Smooth flow, easy installation, and gorgeous look.",
    date: "2026-07-10"
  }
];

const INITIAL_COUPONS = [
  { code: "ROYAL10", discountPercent: 10, description: "Get 10% off site-wide" },
  { code: "LAHORE20", discountPercent: 20, description: "Special 20% discount code for grand launch" },
  { code: "GOLDVIP", discountPercent: 15, description: "Exclusive 15% VIP customer discount" }
];

const INITIAL_CUSTOMERS = [
  { id: 1, name: "Salman Khan", email: "salman.khan@gmail.com", phone: "0321-4567891", address: "DHA Phase 6", ordersCount: 4, spent: 104000 },
  { id: 2, name: "Dr. Ayesha Rehman", email: "ayesha.r@gmail.com", phone: "0300-8877665", address: "Model Town", ordersCount: 2, spent: 239000 },
  { id: 3, name: "Zainab Shah", email: "zainab.s@outlook.com", phone: "0333-1122334", address: "Bahria Town", ordersCount: 1, spent: 18000 },
  { id: 4, name: "Omar Farooq", email: "omar.farooq@yahoo.com", phone: "0345-9988776", address: "Gulberg III", ordersCount: 3, spent: 89000 },
  { id: 5, name: "Fatima Bilal", email: "fatima.bilal@gmail.com", phone: "0302-3344556", address: "Johar Town", ordersCount: 1, spent: 7800 },
  { id: 6, name: "Bilal Butt", email: "bilal.butt@gmail.com", phone: "0322-7778899", address: "Model Town", ordersCount: 0, spent: 0 }
];

const INITIAL_ORDERS = [
  {
    id: "RB-8401",
    customerName: "Salman Khan",
    customerEmail: "salman.khan@gmail.com",
    customerPhone: "0321-4567891",
    customerAddress: "House 122, Block Y, DHA Phase 6, Lahore",
    date: "2026-07-10",
    amount: 104000,
    status: "Delivered",
    items: [
      { id: 4, name: "Imperial Gold Basin Tap", quantity: 2, price: 21560 }, 
      { id: 12, name: "Empress Gold & Marble Sink", quantity: 1, price: 64800 }
    ]
  },
  {
    id: "RB-8402",
    customerName: "Dr. Ayesha Rehman",
    customerEmail: "ayesha.r@gmail.com",
    customerPhone: "0300-8877665",
    customerAddress: "House 45-B, Sector C, Model Town, Lahore",
    date: "2026-07-11",
    amount: 239000,
    status: "Shipped",
    items: [
      { id: 9, name: "Signature Freestanding Acrylic Tub", quantity: 1, price: 138750 },
      { id: 16, name: "Royal Copper Slipper Tub", quantity: 1, price: 196000 }
    ]
  },
  {
    id: "RB-8403",
    customerName: "Zainab Shah",
    customerEmail: "zainab.s@outlook.com",
    customerPhone: "0333-1122334",
    customerAddress: "House 89, Sector Tulip, Bahria Town, Lahore",
    date: "2026-07-13",
    amount: 18000,
    status: "Pending",
    items: [
      { id: 7, name: "Egyptian Cotton Towel Suite", quantity: 2, price: 7650 },
      { id: 22, name: "Handcrafted Organic Soap Set", quantity: 1, price: 2900 }
    ]
  },
  {
    id: "RB-8404",
    customerName: "Omar Farooq",
    customerEmail: "omar.farooq@yahoo.com",
    customerPhone: "0345-9988776",
    customerAddress: "Flat 4, Madison Square, Gulberg III, Lahore",
    date: "2026-07-13",
    amount: 89000,
    status: "Pending",
    items: [
      { id: 11, name: "Matte Black Rain Shower Column", quantity: 2, price: 40800 },
      { id: 10, name: "Slim Gold Toilet Roll Holder", quantity: 1, price: 5605 }
    ]
  },
  {
    id: "RB-8405",
    customerName: "Fatima Bilal",
    customerEmail: "fatima.bilal@gmail.com",
    customerPhone: "0302-3344556",
    customerAddress: "House 303, Block R, Johar Town, Lahore",
    date: "2026-07-14",
    amount: 7800,
    status: "Delivered",
    items: [
      { id: 19, name: "Luxury Scent Diffuser & Bath Salts Set", quantity: 1, price: 7020 }
    ]
  }
];

const SALES_HISTORICAL_DATA = {
  daily: [
    { date: "07-08", sales: 240000 },
    { date: "07-09", sales: 180000 },
    { date: "07-10", sales: 410000 },
    { date: "07-11", sales: 530000 },
    { date: "07-12", sales: 290000 },
    { date: "07-13", sales: 480000 },
    { date: "07-14", sales: 590000 }
  ],
  weekly: [
    { date: "Week 24", sales: 1200000 },
    { date: "Week 25", sales: 1850000 },
    { date: "Week 26", sales: 2300000 },
    { date: "Week 27", sales: 2700000 }
  ],
  monthly: [
    { date: "Feb 2026", sales: 4500000 },
    { date: "Mar 2026", sales: 5800000 },
    { date: "Apr 2026", sales: 6200000 },
    { date: "May 2026", sales: 7100000 },
    { date: "Jun 2026", sales: 8500000 },
    { date: "Jul 2026 (MTD)", sales: 4980000 }
  ]
};
