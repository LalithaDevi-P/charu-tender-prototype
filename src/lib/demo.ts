import type { Order } from "@/store/shop";

/** Real business details supplied with the prototype. */
export const BIZ = {
  name: "CHARU TENDER",
  kannada: "ಚಾರು ಎಳನೀರು",
  tagline: "Fresh • Natural • Healthy",
  phone: "07026117709",
  phoneDisplay: "070261 17709",
  phoneHref: "tel:+917026117709",
  addressLines: [
    "56 & 57, near Sangam Circle, 3rd Stage,",
    "Vijay Nagar 3rd Stage, Vijayanagar,",
    "Hutagalli, Karnataka 570017",
  ],
  addressSingle:
    "56 & 57, near Sangam Circle, 3rd Stage, Vijay Nagar 3rd Stage, Vijayanagar, Hutagalli, Karnataka 570017",
  hours: "Open daily · 8:00 AM – 10:00 PM",
  rating: 4.8,
  reviews: 55,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Charu+Tender+Vijayanagar+Hutagalli+Karnataka+570017",
};

/** Prototype-only demo credentials — printed on the login screens. */
export const DEMO_CREDENTIALS = {
  staff: { email: "staff@charutender.in", password: "charu123" },
  owner: { email: "owner@charutender.in", password: "charu123" },
};

const MIN = 60_000;

export const SEED_ORDERS: Order[] = [
  {
    id: "CT-1025",
    customer: { name: "Rahul", phone: "98450 11223" },
    type: "pickup",
    payment: "upi",
    channel: "online",
    status: "new",
    items: [
      { id: "tc-round", name: "Tender Coconut Round", price: 50, qty: 2 },
      { id: "cane-medium", name: "Sugarcane Medium", price: 20, qty: 1 },
    ],
    subtotal: 120,
    discount: 0,
    deliveryFee: 0,
    total: 120,
    createdAt: Date.now() - 6 * MIN,
    note: "Please add extra pepper.",
  },
  {
    id: "CT-1024",
    customer: { name: "Priya Shetty", phone: "99001 44521" },
    type: "delivery",
    address: "No. 12, 4th Cross, Vijayanagar 3rd Stage",
    landmark: "Near the bus stop",
    payment: "cash",
    channel: "online",
    status: "preparing",
    items: [
      { id: "tc-shake-icecream", name: "Tender Coconut Shake with Ice Cream", price: 100, qty: 1 },
      { id: "fruit-papaya", name: "Fresh Papaya · 1 kg", price: 30, qty: 1 },
    ],
    subtotal: 130,
    discount: 0,
    deliveryFee: 20,
    total: 150,
    createdAt: Date.now() - 14 * MIN,
  },
  {
    id: "CT-1023",
    customer: { name: "Manjunath H", phone: "90080 77123" },
    type: "pickup",
    payment: "upi",
    channel: "online",
    status: "ready",
    items: [
      { id: "cane-large", name: "Sugarcane Large", price: 35, qty: 2 },
      { id: "tc-pulp", name: "Tender Coconut Pulp", price: 40, qty: 1 },
    ],
    subtotal: 110,
    discount: 10,
    deliveryFee: 0,
    total: 100,
    createdAt: Date.now() - 22 * MIN,
  },
  {
    id: "CT-1022",
    customer: { name: "Sneha Rao", phone: "96325 80091" },
    type: "delivery",
    address: "78, Sangam Circle Road, Hutagalli",
    landmark: "Opposite the temple",
    payment: "card",
    channel: "online",
    status: "completed",
    items: [
      { id: "combo-cane-beetroot", name: "Cane + Beetroot", price: 35, qty: 2 },
      { id: "tc-shake-250", name: "Tender Coconut Shake (250ml)", price: 70, qty: 1 },
    ],
    subtotal: 140,
    discount: 0,
    deliveryFee: 20,
    total: 160,
    createdAt: Date.now() - 41 * MIN,
  },
  {
    id: "CT-1021",
    customer: { name: "Counter Walk-in", phone: "—" },
    type: "pickup",
    payment: "cash",
    channel: "counter",
    status: "completed",
    items: [{ id: "tc-round", name: "Tender Coconut Round", price: 50, qty: 3 }],
    subtotal: 150,
    discount: 0,
    deliveryFee: 0,
    total: 150,
    createdAt: Date.now() - 52 * MIN,
  },
  {
    id: "CT-1020",
    customer: { name: "Counter Walk-in", phone: "—" },
    type: "pickup",
    payment: "upi",
    channel: "counter",
    status: "completed",
    items: [
      { id: "tc-large", name: "Tender Coconut Large", price: 100, qty: 1 },
      { id: "cane-medium", name: "Sugarcane Medium", price: 20, qty: 1 },
    ],
    subtotal: 120,
    discount: 0,
    deliveryFee: 0,
    total: 120,
    createdAt: Date.now() - 68 * MIN,
  },
  {
    id: "CT-1019",
    customer: { name: "Arun Kumar", phone: "97400 33218" },
    type: "pickup",
    payment: "upi",
    channel: "online",
    status: "completed",
    items: [
      { id: "tc-shake-250", name: "Tender Coconut Shake (250ml)", price: 70, qty: 2 },
      { id: "fruit-pineapple", name: "Pineapple · Whole", price: 60, qty: 1 },
    ],
    subtotal: 200,
    discount: 0,
    deliveryFee: 0,
    total: 200,
    createdAt: Date.now() - 95 * MIN,
  },
  {
    id: "CT-1018",
    customer: { name: "Counter Walk-in", phone: "—" },
    type: "pickup",
    payment: "card",
    channel: "counter",
    status: "completed",
    items: [{ id: "cane-medium", name: "Sugarcane Medium", price: 20, qty: 4 }],
    subtotal: 80,
    discount: 0,
    deliveryFee: 0,
    total: 80,
    createdAt: Date.now() - 124 * MIN,
  },
  {
    id: "CT-1017",
    customer: { name: "Deepa Naik", phone: "94488 21007" },
    type: "delivery",
    address: "21, 2nd Stage, Vijay Nagar",
    landmark: "Above the pharmacy",
    payment: "cash",
    channel: "online",
    status: "completed",
    items: [
      { id: "combo-coconut-amla", name: "Coconut + Amla", price: 60, qty: 2 },
      { id: "fruit-banana", name: "Banana Bunch", price: 40, qty: 1 },
    ],
    subtotal: 160,
    discount: 0,
    deliveryFee: 20,
    total: 180,
    createdAt: Date.now() - 160 * MIN,
  },
  {
    id: "CT-1016",
    customer: { name: "Counter Walk-in", phone: "—" },
    type: "pickup",
    payment: "cash",
    channel: "counter",
    status: "completed",
    items: [
      { id: "tc-round", name: "Tender Coconut Round", price: 50, qty: 2 },
      { id: "cane-large", name: "Sugarcane Large", price: 35, qty: 1 },
    ],
    subtotal: 135,
    discount: 0,
    deliveryFee: 0,
    total: 135,
    createdAt: Date.now() - 190 * MIN,
  },
];

/** Baseline numbers used by the owner dashboard so the demo opens on realistic KPIs. */
export const BASE_STATS = {
  sales: 8450,
  orders: 42,
  online: 16,
  counter: 26,
  productsSold: 126,
  onlineSales: 3720,
  counterSales: 4730,
};

export const SALES_SERIES = [
  { day: "Mon", sales: 6120, online: 2410, counter: 3710 },
  { day: "Tue", sales: 7240, online: 2980, counter: 4260 },
  { day: "Wed", sales: 6880, online: 2620, counter: 4260 },
  { day: "Thu", sales: 8010, online: 3390, counter: 4620 },
  { day: "Fri", sales: 9340, online: 4120, counter: 5220 },
  { day: "Sat", sales: 11250, online: 5240, counter: 6010 },
  { day: "Sun", sales: 8450, online: 3720, counter: 4730 },
];

export const TOP_PRODUCTS = [
  { name: "Tender Coconut Round", units: 38, revenue: 1900 },
  { name: "Sugarcane Medium", units: 31, revenue: 620 },
  { name: "Tender Coconut Shake with Ice Cream", units: 17, revenue: 1700 },
  { name: "Cane + Beetroot", units: 14, revenue: 490 },
  { name: "Fresh Papaya · 1 kg", units: 11, revenue: 330 },
  { name: "Tender Coconut Large", units: 9, revenue: 900 },
];

export const CATEGORY_SALES = [
  { name: "Tender Coconut", value: 3980 },
  { name: "Sugarcane", value: 1840 },
  { name: "Combos", value: 1290 },
  { name: "Fresh Juices", value: 780 },
  { name: "Fruits", value: 560 },
];

export const REVIEWS = [
  {
    name: "Suresh K",
    initials: "SK",
    rating: 5,
    when: "2 weeks ago",
    text: "Best tender coconut in the Vijayanagar area. They trim it fresh right in front of you and the pulp is always soft.",
  },
  {
    name: "Meera R",
    initials: "MR",
    rating: 5,
    when: "a month ago",
    text: "We ordered trimmed tender coconut for a family function. Delivery was on time and the quality was consistent for every single coconut.",
  },
  {
    name: "Naveen G",
    initials: "NG",
    rating: 4,
    when: "a month ago",
    text: "Sugarcane juice is genuinely fresh and they don't over-add ginger. Nice clean shop with seating inside.",
  },
  {
    name: "Anitha P",
    initials: "AP",
    rating: 5,
    when: "2 months ago",
    text: "Tender coconut shake with ice cream is the highlight. Reasonable rates and very polite staff.",
  },
  {
    name: "Kiran B",
    initials: "KB",
    rating: 5,
    when: "3 months ago",
    text: "Papaya and seasonal fruits are always fresh. This has become our regular Saturday stop.",
  },
];

export const GALLERY = [
  {
    src: "shop-exterior",
    title: "Shop Exterior",
    caption: "The Charu Tender frontage at Sangam Circle, Vijayanagar.",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "menu-board",
    title: "Menu Board",
    caption: "Our full menu — sugarcane, tender coconut and combos.",
    span: "",
  },
  {
    src: "hero-coconut",
    title: "Tender Coconut",
    caption: "Trimmed fresh, served chilled with a paper straw.",
    span: "",
  },
  {
    src: "counter",
    title: "Billing Counter",
    caption: "Order, pay by cash, UPI or card at the counter.",
    span: "lg:col-span-2",
  },
  {
    src: "shop-interior",
    title: "Inside the Shop",
    caption: "Air conditioned seating with wooden tables.",
    span: "",
  },
  {
    src: "benefit-wall",
    title: "About Our Coconut",
    caption: "How Charu Tender sources and supplies tender coconut.",
    span: "",
  },
  {
    src: "fruit-shelves",
    title: "Fresh Fruits",
    caption: "Papaya, banana and seasonal fruit stocked daily.",
    span: "lg:col-span-2",
  },
  {
    src: "shake-table",
    title: "Shake & Pulp",
    caption: "Coconut shake with ice cream beside fresh pulp.",
    span: "lg:col-span-2",
  },
];
