// ============================================================
// Instamart Mock Data + rules-based InstaRestocker logic
// (frontend-only, no backend, no API calls)
// ============================================================

// -- Product images (grocery product-style photos) --
export const IMG = {
  bread: "https://images.unsplash.com/photo-1534620808146-d33bb39128b2?w=400&q=80",
  milk: "https://images.unsplash.com/photo-1553301803-768cd4a59b9c?w=400&q=80",
  cream: "https://images.unsplash.com/photo-1633893215271-f7e1fca081ad?w=400&q=80",
  yogurt: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=400&q=80",
  eggs: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&q=80",
  chips: "https://images.unsplash.com/photo-1708746333890-8e775f97f0a6?w=400&q=80",
  chocolate: "https://images.unsplash.com/photo-1623660053975-cf75a8be0908?w=400&q=80",
  candy: "https://images.unsplash.com/photo-1598188080888-42dfffa02287?w=400&q=80",
  watermelon: "https://images.unsplash.com/photo-1581074817932-af423ba4566e?w=400&q=80",
  orange: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=400&q=80",
  drink: "https://images.unsplash.com/photo-1648569883125-d01072540b4c?w=400&q=80",
  icecream: "https://images.pexels.com/photos/9227980/pexels-photo-9227980.jpeg?w=400&q=80",
  paneer: "https://images.unsplash.com/photo-1683314573422-649a3c6ad784?w=400&q=80",
  butter: "https://images.unsplash.com/photo-1587185717368-4d92f8de4ad2?w=400&q=80",
};

// -- Product grid (Screen 1) --
export const PRODUCTS = [
  {
    id: "p1",
    name: "Fruit-tella Strawberry Flavour Candy",
    brand: "Fruit-tella",
    weight: "2 pieces",
    price: 69,
    mrp: 70,
    discount: 1,
    image: IMG.candy,
  },
  {
    id: "p2",
    name: "Eggoz White Herbal Feed Eggs",
    brand: "Eggoz",
    weight: "6 pieces",
    price: 77,
    mrp: 78,
    discount: 0,
    image: IMG.eggs,
  },
  {
    id: "p3",
    name: "Mother Dairy Toned Milk",
    brand: "Mother Dairy",
    weight: "500 ml x 2",
    price: 54,
    mrp: 54,
    discount: 0,
    image: IMG.milk,
  },
  {
    id: "p4",
    name: "The Health Factory Zero Maida Bread",
    brand: "The Health Factory",
    weight: "350 g",
    price: 55,
    mrp: 65,
    discount: 15,
    image: IMG.bread,
  },
  {
    id: "p5",
    name: "The Health Factory Zero Maida Whole Wheat",
    brand: "The Health Factory",
    weight: "250 g",
    price: 63,
    mrp: 70,
    discount: 10,
    image: IMG.bread,
  },
  {
    id: "p6",
    name: "Nestle KitKat 2 Finger Wafer Bar",
    brand: "Nestle",
    weight: "18.6 g",
    price: 20,
    mrp: 20,
    discount: 0,
    image: IMG.chocolate,
  },
  {
    id: "p7",
    name: "Lay's India's Magic Masala Chips",
    brand: "Lay's",
    weight: "50 g",
    price: 20,
    mrp: 20,
    discount: 0,
    image: IMG.chips,
  },
  {
    id: "p8",
    name: "Amul Gold Pasteurised Full Cream Milk",
    brand: "Amul",
    weight: "500 ml x 2",
    price: 66,
    mrp: 66,
    discount: 0,
    image: IMG.milk,
  },
  {
    id: "p9",
    name: "Amul Fresh Cream",
    brand: "Amul",
    weight: "250 ml",
    price: 78,
    mrp: 82,
    discount: 5,
    image: IMG.cream,
  },
  {
    id: "p10",
    name: "Mother Dairy Mishti Doi",
    brand: "Mother Dairy",
    weight: "400 g",
    price: 45,
    mrp: 50,
    discount: 10,
    image: IMG.yogurt,
  },
];

// -- Summer Store category tiles (Screen 1) --
export const CATEGORY_TILES = [
  { id: "c1", label: "Drinks & coolers", image: IMG.drink, bg: "#E3F2FD" },
  { id: "c2", label: "Ice creams & kulfis", image: IMG.icecream, bg: "#F3E5F5" },
  { id: "c3", label: "Seasonal harvests", image: IMG.watermelon, bg: "#E8F5E9" },
  { id: "c4", label: "Dairy delights", image: IMG.butter, bg: "#FFF3E0" },
];

// -- Default items already in the cart (Screens 1 & 2) --
export const INITIAL_CART = [
  { id: "p2", qty: 1 },
  { id: "p3", qty: 1 },
];

// ============================================================
// InstaRestocker source dataset (mock purchase history)
// lastBoughtDays  = days since the item was last purchased
// cycleLength     = typical number of days it lasts before depletion
// perishable      = true for perishables (milk, bread, curd...)
// ============================================================
export const RESTOCK_ITEMS = [
  {
    id: "r1",
    name: "Zero Maida Bread \u2013 Simply Whole Wheat Pack",
    brand: "The Health Factory",
    weight: "250 g",
    price: 51,
    mrp: 66,
    discount: 7,
    image: IMG.bread,
    perishable: true,
    lastBoughtDays: 4,
    cycleLength: 3,
    options: [
      { weight: "350 g", price: 55, mrp: 66, per: "\u20b915.7/100 g", discount: 15 },
      { weight: "250 g", price: 51, mrp: 66, per: "\u20b920.4/100 g", discount: 7 },
    ],
  },
  {
    id: "r2",
    name: "Gold Pasteurised Full Cream Milk",
    brand: "Amul",
    weight: "500 ml x 2",
    price: 66,
    mrp: 66,
    discount: 0,
    image: IMG.milk,
    perishable: true,
    lastBoughtDays: 3,
    cycleLength: 3,
    options: null,
  },
  {
    id: "r3",
    name: "Fresh Cream",
    brand: "Amul",
    weight: "250 ml",
    price: 78,
    mrp: 82,
    discount: 5,
    image: IMG.cream,
    perishable: true,
    lastBoughtDays: 3,
    cycleLength: 5,
    options: null,
  },
  {
    id: "r4",
    name: "Mishti Doi",
    brand: "Mother Dairy",
    weight: "400 g",
    price: 45,
    mrp: 50,
    discount: 10,
    image: IMG.yogurt,
    perishable: true,
    lastBoughtDays: 4,
    cycleLength: 2,
    options: null,
  },
];

// ------------------------------------------------------------
// Rules engine: compute a restock status + urgency for an item
// ------------------------------------------------------------
export function computeRestockStatus(item) {
  const daysUntil = item.cycleLength - item.lastBoughtDays; // <0 = already out

  let text = "";
  let tone = "warn"; // controls colour highlight
  let highlight = "";

  if (daysUntil < 0) {
    const ago = Math.abs(daysUntil);
    highlight = ago === 1 ? "yesterday" : `${ago} days ago`;
    text = "You ran out";
    tone = "danger";
  } else if (daysUntil === 0) {
    highlight = "today";
    text = "You will run out";
    tone = "danger";
  } else if (item.perishable && daysUntil <= 3) {
    highlight = daysUntil === 1 ? "tomorrow" : `in ${daysUntil} days`;
    text = "You will run out";
    tone = "warn";
  } else {
    highlight = "in a week";
    text = "You might need to buy it again";
    tone = "info";
  }

  return {
    ...item,
    daysUntil,
    lastBoughtLabel: `${item.lastBoughtDays} days ago`,
    statusText: text,
    statusHighlight: highlight,
    tone,
  };
}

// Purchasable variants from restocker "options" (e.g. 350 g / 250 g bread sizes)
export const RESTOCK_OPTION_PRODUCTS = RESTOCK_ITEMS.flatMap((r) =>
  (r.options || []).map((o, i) => ({
    id: `${r.id}-opt-${i}`,
    name: `${r.brand} ${r.name}`,
    brand: r.brand,
    weight: o.weight,
    price: o.price,
    mrp: o.mrp,
    discount: o.discount,
    image: r.image,
  }))
);

// Sort by urgency: already-out first, then soonest to run out
export function getRestockPredictions() {
  return RESTOCK_ITEMS.map(computeRestockStatus).sort(
    (a, b) => a.daysUntil - b.daysUntil
  );
}
