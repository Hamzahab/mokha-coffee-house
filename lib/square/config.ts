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
