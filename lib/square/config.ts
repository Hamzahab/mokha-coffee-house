// ---------------------------------------------------------------------------
// Ordering configuration — edit these to control what the /order page shows.
// Square's "Most popular" section and category display order are site-builder
// features NOT exposed via the Catalog API, so we maintain them here.
// ---------------------------------------------------------------------------

/**
 * Items to feature in the "Most popular" carousel at the top of /order.
 * Matched case-insensitively against item names from the catalog.
 */
export const FEATURED_ITEM_NAMES: string[] = [
  'Adani Tea',
  'Caramel Milk Cake',
  'Baklava',
  'Iced Spanish Latte',
];

/**
 * Display order for categories. Lower numbers appear first.
 * Keys are matched case-insensitively against category names from the catalog.
 * Any category not listed here will appear after the listed ones,
 * sorted alphabetically.
 */
export const CATEGORY_DISPLAY_ORDER: Record<string, number> = {
  'hot beverages': 1,
  'cold beverages': 2,
  'desserts  -  bakery  &   food': 3,
  'cake & pie': 4,
  'retail': 5,
};

// ---------------------------------------------------------------------------
// /menu page — curated highlight sections (The Bridge layout).
// Each section surfaces a few standout items from the live catalog alongside
// editorial copy. Items matched case-insensitively by name; only items with
// an image are shown. If fewer than the requested count have images, we
// backfill from the listed Square categories.
// ---------------------------------------------------------------------------

export interface MenuHighlight {
  key: string;
  heading: string;
  description: string;
  itemNames: string[];
  squareCategories: string[];
}

export const MENU_HIGHLIGHTS: MenuHighlight[] = [
  {
    key: 'coffee-tea',
    heading: 'Coffee & Tea',
    description:
      'Single-origin espresso, signature lattes, and traditional brews.',
    itemNames: ['Adani Tea', 'Spanish Latte', 'Hot Salted Caramel Macchiato'],
    squareCategories: ['hot beverages', 'cold beverages'],
  },
  {
    key: 'kitchen',
    heading: 'Kitchen',
    description:
      'House-made desserts and seasonal plates, made to share.',
    itemNames: ['Umm Ali', 'Caramel Milk Cake', 'Honeycomb'],
    squareCategories: ['desserts  -  bakery  &   food', 'cake & pie'],
  },
];
