// ---------------------------------------------------------------------------
// Normalized types that bridge Square's raw API response and our frontend.
// These are intentionally decoupled from the Square SDK types so the UI layer
// never depends on Square internals — making the whole ordering system
// portable to any POS provider.
// ---------------------------------------------------------------------------

export interface CatalogCategory {
  id: string;
  name: string;
  ordinal: number;
  items: CatalogMenuItem[];
}

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface CatalogMenuItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  categoryIds: string[];
  variations: ItemVariation[];
  modifierLists: ModifierList[];
  onSale: boolean;
  stockStatus: StockStatus;
}

export interface ItemVariation {
  id: string;
  name: string;
  priceCents: number;
  currency: string;
}

export interface ModifierList {
  id: string;
  name: string;
  selectionType: 'SINGLE' | 'MULTIPLE';
  minSelected: number;
  maxSelected: number;
  modifiers: Modifier[];
}

export interface Modifier {
  id: string;
  name: string;
  priceCents: number;
  currency: string;
}

// ---- Cart types ----

export interface CartItem {
  id: string; // client-generated unique id for this cart line
  itemId: string;
  itemName: string;
  variationId: string;
  variationName: string;
  modifiers: CartModifier[];
  quantity: number;
  unitPriceCents: number; // variation price + modifier prices
  currency: string;
  imageUrl: string | null;
}

export interface CartModifier {
  id: string;
  name: string;
  priceCents: number;
}

// ---- Order payload (client -> API route) ----

export interface OrderPayload {
  locationId: string;
  lineItems: OrderLineItem[];
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupAt?: string; // ISO 8601
}

export interface OrderLineItem {
  variationId: string;
  modifierIds: string[];
  quantity: number;
}

// ---- Location ----

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
}
