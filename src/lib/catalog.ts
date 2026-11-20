/**
 * Charu Tender menu catalog.
 *
 * `verified: true`  → item name + price were read directly off the Charu Tender
 *                     menu-board photograph (primary source of truth).
 * `verified: false` → price was NOT legible on the board, so this is a clearly
 *                     marked PROTOTYPE / DEMO value, badged in the UI.
 */

export type CategoryId =
  | "all"
  | "tender-coconut"
  | "sugarcane"
  | "amla"
  | "juices"
  | "fruits"
  | "combos"
  | "specials";

export type ArtVariant =
  | "coconut-open"
  | "coconut-tall"
  | "shake-glass"
  | "shake-coconut"
  | "pulp"
  | "icecream"
  | "bottle"
  | "cane-glass"
  | "cane-stalks"
  | "juice"
  | "combo-cane"
  | "combo-coconut"
  | "papaya"
  | "banana"
  | "pineapple"
  | "watermelon"
  | "pomegranate"
  | "fruit-bowl";

export interface Product {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: Exclude<CategoryId, "all">;
  art: ArtVariant;
  tone?: string;
  verified: boolean;
  tag?: "bestseller" | "offer" | "new";
}

export interface Category {
  id: CategoryId;
  label: string;
}

export const CATEGORIES: Category[] = [
  { id: "all", label: "All" },
  { id: "tender-coconut", label: "Tender Coconut" },
  { id: "sugarcane", label: "Sugarcane" },
  { id: "amla", label: "Amla" },
  { id: "juices", label: "Fresh Juices" },
  { id: "fruits", label: "Fruits" },
  { id: "combos", label: "Combos" },
  { id: "specials", label: "Specials" },
];

const p = (
  id: string,
  name: string,
  price: number,
  category: Product["category"],
  art: ArtVariant,
  desc: string,
  extra: Partial<Product> = {},
): Product => ({
  id,
  name,
  price,
  category,
  art,
  desc,
  verified: true,
  ...extra,
});

const demo = (o: Partial<Product>): Partial<Product> => ({ ...o, verified: false });

export const PRODUCTS: Product[] = [
  /* ── TENDER COCONUT ─────────────────────────────────────────── */
  p(
    "tc-round",
    "Tender Coconut Round",
    50,
    "tender-coconut",
    "coconut-open",
    "Freshly trimmed round tender coconut, served chilled with a straw.",
    { tag: "bestseller" },
  ),
  p(
    "tc-standard",
    "Tender Coconut Standard",
    50,
    "tender-coconut",
    "coconut-tall",
    "Our everyday standard trim — light, cool and naturally refreshing.",
  ),
  p(
    "tc-large",
    "Tender Coconut Large",
    100,
    "tender-coconut",
    "coconut-tall",
    "Extra large tender coconut with plenty of water and soft pulp.",
    { tag: "bestseller" },
  ),
  p(
    "tc-shake-250",
    "Tender Coconut Shake (250ml)",
    70,
    "tender-coconut",
    "shake-glass",
    "Coconut pulp, kallu sakkare and cashew, blended fresh.",
  ),
  p(
    "tc-shake-large",
    "Tender Coconut Shake (Large)",
    100,
    "tender-coconut",
    "shake-glass",
    "A bigger serving of our signature coconut shake.",
    demo({}),
  ),
  p(
    "tc-shake-icecream",
    "Tender Coconut Shake with Ice Cream",
    100,
    "tender-coconut",
    "shake-coconut",
    "Coconut pulp, kallu sakkare, cashew and a scoop of ice cream.",
    { tag: "bestseller" },
  ),
  p(
    "tc-shake-mix",
    "Shake with Ice Cream Mix & Dry Fruits",
    130,
    "tender-coconut",
    "shake-glass",
    "Shake topped with ice cream and a generous mix of dry fruits.",
  ),
  p(
    "tc-pulp",
    "Tender Coconut Pulp",
    40,
    "tender-coconut",
    "pulp",
    "Thick, soft tender coconut pulp scooped fresh to order.",
  ),
  p(
    "tc-icecream-2",
    "2 Scoop Ice Cream",
    60,
    "tender-coconut",
    "icecream",
    "Two cool scoops — the perfect finish to your coconut break.",
  ),
  p(
    "tc-parcel-500",
    "Coconut Water Parcel · ½ Litre",
    195,
    "tender-coconut",
    "bottle",
    "Fresh coconut water packed to travel. Best enjoyed chilled.",
    demo({}),
  ),
  p(
    "tc-parcel-1l",
    "Coconut Water Parcel · 1 Litre",
    205,
    "tender-coconut",
    "bottle",
    "One litre of fresh coconut water, sealed for the road.",
    demo({}),
  ),
  p(
    "tc-pepper",
    "Tender Coconut Pepper",
    65,
    "specials",
    "pulp",
    "Tender coconut pulp tossed with pepper and a hint of spice.",
    demo({}),
  ),

  /* ── SUGARCANE ──────────────────────────────────────────────── */
  p(
    "cane-medium",
    "Sugarcane Medium",
    20,
    "sugarcane",
    "cane-glass",
    "Cold pressed sugarcane juice, filtered and served fresh.",
    { tag: "bestseller" },
  ),
  p(
    "cane-large",
    "Sugarcane Large",
    35,
    "sugarcane",
    "cane-glass",
    "A larger glass of our natural, no-addition sugarcane juice.",
  ),
  p(
    "cane-parcel-500",
    "Sugarcane Parcel · ½ Litre",
    140,
    "sugarcane",
    "bottle",
    "Sealed parcel of fresh sugarcane juice for later.",
    demo({}),
  ),
  p(
    "cane-parcel-1l",
    "Sugarcane Parcel · 1 Litre",
    155,
    "sugarcane",
    "bottle",
    "One litre parcel — ideal for sharing at home or work.",
    demo({}),
  ),

  /* ── AMLA ───────────────────────────────────────────────────── */
  p(
    "amla-juice",
    "Fresh Amla Juice",
    40,
    "amla",
    "juice",
    "Freshly pressed Indian gooseberry, sharp and clean.",
    { tone: "#9CC64B", ...demo({}) },
  ),
  p(
    "amla-shot",
    "Amla Ginger Shot",
    30,
    "amla",
    "juice",
    "A small, strong measure of amla with fresh ginger.",
    { tone: "#8FB93F", ...demo({}) },
  ),
  p(
    "amla-masala",
    "Amla Masala Juice",
    50,
    "amla",
    "juice",
    "Amla balanced with light masala and a pinch of salt.",
    { tone: "#A8C96A", ...demo({}) },
  ),

  /* ── FRESH JUICES ───────────────────────────────────────────── */
  p(
    "juice-beetroot",
    "Beetroot Juice",
    40,
    "juices",
    "juice",
    "Deep, earthy beetroot pressed fresh — no sugar added.",
    { tone: "#B3244B", ...demo({}) },
  ),
  p(
    "juice-carrot",
    "Carrot Juice",
    40,
    "juices",
    "juice",
    "Sweet carrot juice, bright and naturally smooth.",
    { tone: "#E4761B", ...demo({}) },
  ),
  p(
    "juice-pineapple",
    "Pineapple Juice",
    40,
    "juices",
    "juice",
    "Tangy pineapple pressed to order with a fresh finish.",
    { tone: "#EDBE2E", ...demo({}) },
  ),
  p(
    "juice-watermelon",
    "Watermelon Juice",
    40,
    "juices",
    "juice",
    "Cool, hydrating watermelon juice — pure summer in a glass.",
    { tone: "#E5576B", ...demo({}) },
  ),
  p(
    "juice-mint",
    "Mint & Coriander Juice",
    40,
    "juices",
    "juice",
    "Green herbs blended light and refreshing.",
    { tone: "#3E9A5E", ...demo({}) },
  ),

  /* ── FRUITS ─────────────────────────────────────────────────── */
  p(
    "fruit-papaya",
    "Fresh Papaya · 1 kg",
    30,
    "fruits",
    "papaya",
    "Ripe, sweet papaya. Today's counter offer — ₹1 kg at ₹30.",
    { tag: "offer" },
  ),
  p(
    "fruit-banana",
    "Banana Bunch",
    40,
    "fruits",
    "banana",
    "Fresh local bananas, hand picked every morning.",
    demo({}),
  ),
  p(
    "fruit-pineapple",
    "Pineapple · Whole",
    60,
    "fruits",
    "pineapple",
    "Whole ripe pineapple, peeled and cut free on request.",
    demo({}),
  ),
  p(
    "fruit-watermelon",
    "Watermelon · 1 kg",
    40,
    "fruits",
    "watermelon",
    "Chilled watermelon cut fresh at the counter.",
    demo({}),
  ),
  p(
    "fruit-pomegranate",
    "Pomegranate · 1 kg",
    90,
    "fruits",
    "pomegranate",
    "Firm, ruby pomegranates selected daily.",
    demo({}),
  ),
  p(
    "fruit-bowl",
    "Seasonal Fruit Bowl",
    70,
    "fruits",
    "fruit-bowl",
    "A mixed bowl of the freshest fruit of the day.",
    demo({}),
  ),

  /* ── COMBOS · combo with cane ───────────────────────────────── */
  p(
    "combo-cane-beetroot",
    "Cane + Beetroot",
    35,
    "combos",
    "combo-cane",
    "Sugarcane pressed with fresh beetroot.",
    { tone: "#B3244B" },
  ),
  p(
    "combo-cane-carrot",
    "Cane + Carrot",
    35,
    "combos",
    "combo-cane",
    "Sugarcane pressed with sweet carrot.",
    { tone: "#E4761B" },
  ),
  p(
    "combo-cane-amla",
    "Cane + Amla",
    35,
    "combos",
    "combo-cane",
    "Sugarcane with amla for a sharper, cleaner finish.",
    { tone: "#9CC64B" },
  ),
  p(
    "combo-cane-knolkhol",
    "Cane + Knol Khol",
    35,
    "combos",
    "combo-cane",
    "Sugarcane pressed with fresh knol khol.",
    { tone: "#7FA65A" },
  ),
  p(
    "combo-cane-mirchi",
    "Cane + Mirchi",
    35,
    "combos",
    "combo-cane",
    "A green chilli kick cut through cold sugarcane.",
    { tone: "#4E9A46" },
  ),
  p(
    "combo-cane-mint",
    "Cane + Mint Leaves",
    35,
    "combos",
    "combo-cane",
    "Sugarcane blended with cooling mint leaves.",
    { tone: "#3E9A5E" },
  ),
  p(
    "combo-cane-pineapple",
    "Cane + Pineapple",
    35,
    "combos",
    "combo-cane",
    "Sugarcane pressed with tangy pineapple.",
    { tone: "#EDBE2E" },
  ),

  /* ── COMBOS · combo with coconut ────────────────────────────── */
  p(
    "combo-coconut-beetroot",
    "Coconut + Beetroot",
    60,
    "combos",
    "combo-coconut",
    "Tender coconut water finished with fresh beetroot.",
    { tone: "#B3244B" },
  ),
  p(
    "combo-coconut-carrot",
    "Coconut + Carrot",
    60,
    "combos",
    "combo-coconut",
    "Tender coconut water with sweet carrot.",
    { tone: "#E4761B" },
  ),
  p(
    "combo-coconut-amla",
    "Coconut + Amla",
    60,
    "combos",
    "combo-coconut",
    "Tender coconut water with amla.",
    { tone: "#9CC64B" },
  ),
  p(
    "combo-coconut-knolkhol",
    "Coconut + Knol Khol",
    60,
    "combos",
    "combo-coconut",
    "Tender coconut water with knol khol.",
    { tone: "#7FA65A" },
  ),
  p(
    "combo-coconut-mirchi",
    "Coconut + Mirchi",
    60,
    "combos",
    "combo-coconut",
    "Tender coconut water with a green chilli edge.",
    { tone: "#4E9A46" },
  ),
  p(
    "combo-coconut-mint",
    "Coconut + Mint Leaves",
    60,
    "combos",
    "combo-coconut",
    "Tender coconut water with fresh mint.",
    { tone: "#3E9A5E" },
  ),
  p(
    "combo-coconut-pineapple",
    "Coconut + Pineapple",
    60,
    "combos",
    "combo-coconut",
    "Tender coconut water with pineapple.",
    { tone: "#EDBE2E" },
  ),

  /* ── SPECIALS ───────────────────────────────────────────────── */
  p(
    "special-cane-pepper",
    "Sugarcane Pepper",
    35,
    "specials",
    "cane-glass",
    "Classic sugarcane juice sharpened with black pepper.",
  ),
  p(
    "special-cane-coconut-mix",
    "Sugarcane Tender Coconut Mix",
    40,
    "specials",
    "combo-cane",
    "Half cane, half coconut water — our two signatures together.",
    { tag: "new" },
  ),
  p(
    "special-bcakm",
    "B C A K M",
    40,
    "specials",
    "combo-cane",
    "Beetroot · Carrot · Amla · Knol Khol · Mirchi, pressed together.",
  ),
  p(
    "special-bckm",
    "B C K M",
    65,
    "specials",
    "combo-coconut",
    "Beetroot · Carrot · Knol Khol · Mirchi over tender coconut.",
  ),
  p(
    "special-mixed-veg",
    "Mixed Vegetable Juice",
    50,
    "juices",
    "juice",
    "A daily blend of fresh vegetables from the counter.",
    { tone: "#5F9E4E", ...demo({}) },
  ),
];

export const productById = (id: string): Product | undefined =>
  PRODUCTS.find((x) => x.id === id);

export const byCategory = (cat: CategoryId): Product[] =>
  cat === "all" ? PRODUCTS : PRODUCTS.filter((x) => x.category === cat);

export const searchProducts = (query: string, cat: CategoryId = "all"): Product[] => {
  const q = query.trim().toLowerCase();
  const base = byCategory(cat);
  if (!q) return base;
  return base.filter(
    (x) =>
      x.name.toLowerCase().includes(q) ||
      x.desc.toLowerCase().includes(q) ||
      x.category.replace("-", " ").includes(q),
  );
};

export const inr = (n: number): string =>
  "₹" + Math.round(n).toLocaleString("en-IN");

export const DELIVERY_FEE = 20;

export const categoryLabel = (id: CategoryId): string =>
  CATEGORIES.find((c) => c.id === id)?.label ?? "All";
