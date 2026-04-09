import type { CatalogObject } from 'square';
import { getSquareClient } from './client';
import { CATEGORY_DISPLAY_ORDER, FEATURED_ITEM_NAMES } from './config';
import type {
  CatalogCategory,
  CatalogMenuItem,
  ItemVariation,
  Modifier,
  ModifierList,
} from './types';

// ---------------------------------------------------------------------------
// Fetch the full catalog from Square and normalize it into a frontend-friendly
// shape: CatalogCategory[] with nested items, variations, modifiers, and images.
// ---------------------------------------------------------------------------

export async function fetchCatalog(locationId?: string): Promise<CatalogCategory[]> {
  const client = getSquareClient();

  const response = await client.catalog.search({
    objectTypes: ['ITEM', 'CATEGORY'],
    includeRelatedObjects: true,
    limit: 1000,
  });

  const objects = response.objects ?? [];
  const related = response.relatedObjects ?? [];
  const all = [...objects, ...related];

  const imageMap = buildImageMap(all);
  const modifierListMap = buildModifierListMap(all);
  const categoryMap = buildCategoryMap(all);

  const items = objects.filter(
    (o): o is CatalogObject.Item => o.type === 'ITEM',
  );

  const trackedVariationIds: string[] = [];
  const variationThresholds = new Map<string, number>();

  const onlineSiteChannel = process.env.SQUARE_ONLINE_SITE_CHANNEL_ID;

  const menuItems: CatalogMenuItem[] = items
    .filter((item) => !item.isDeleted)
    .filter((item) => isAvailableAtLocation(item, locationId))
    .filter((item) => isOnlineItem(item, onlineSiteChannel))
    .map((item) => {
      const normalized = normalizeItem(item, imageMap, modifierListMap);
      for (const v of item.itemData?.variations ?? []) {
        if (v.type === 'ITEM_VARIATION' && v.itemVariationData?.trackInventory) {
          trackedVariationIds.push(v.id);
          const threshold = Number(v.itemVariationData.inventoryAlertThreshold ?? 0n);
          variationThresholds.set(v.id, threshold);
        }
      }
      return normalized;
    });

  const stockMap = await withTimeout(
    fetchInventoryCounts(client, trackedVariationIds, locationId),
    1200,
    new Map<string, number>(),
  );
  applyStockStatus(menuItems, stockMap, variationThresholds);

  const categories = groupByCategory(menuItems, categoryMap);
  const featured = buildFeaturedCategory(menuItems);
  if (featured) categories.unshift(featured);
  return categories;
}

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  fallback: T,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<T>((resolve) => {
    timer = setTimeout(() => resolve(fallback), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timer!);
  }
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function isAvailableAtLocation(obj: CatalogObject, locationId?: string): boolean {
  if (!locationId) return true;

  if (obj.presentAtAllLocations !== false) {
    return !(obj.absentAtLocationIds ?? []).includes(locationId);
  }
  return (obj.presentAtLocationIds ?? []).includes(locationId);
}

function isOnlineItem(item: CatalogObject.Item, channelId?: string): boolean {
  if (!channelId) return true;
  return (item.itemData?.channels ?? []).includes(channelId);
}

function buildImageMap(objects: CatalogObject[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const obj of objects) {
    if (obj.type === 'IMAGE' && obj.imageData?.url) {
      map.set(obj.id, obj.imageData.url);
    }
  }
  return map;
}

function buildModifierListMap(objects: CatalogObject[]): Map<string, ModifierList> {
  const map = new Map<string, ModifierList>();
  for (const obj of objects) {
    if (obj.type !== 'MODIFIER_LIST' || !obj.modifierListData) continue;

    const data = obj.modifierListData;
    const modifiers: Modifier[] = (data.modifiers ?? [])
      .filter((m): m is CatalogObject.Modifier => m.type === 'MODIFIER')
      .filter((m) => !m.modifierData?.hiddenOnline)
      .map((m) => ({
        id: m.id,
        name: m.modifierData?.name ?? '',
        priceCents: Number(m.modifierData?.priceMoney?.amount ?? 0n),
        currency: m.modifierData?.priceMoney?.currency ?? 'CAD',
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const minSelected = Number(data.minSelectedModifiers ?? -1n);
    const maxSelected = Number(data.maxSelectedModifiers ?? -1n);

    map.set(obj.id, {
      id: obj.id,
      name: data.name ?? '',
      selectionType: data.selectionType === 'SINGLE' ? 'SINGLE' : 'MULTIPLE',
      minSelected: minSelected <= 0 ? 0 : minSelected,
      maxSelected: maxSelected <= 0 ? modifiers.length : maxSelected,
      modifiers,
    });
  }
  return map;
}

interface CategoryInfo {
  id: string;
  name: string;
}

function buildCategoryMap(objects: CatalogObject[]): Map<string, CategoryInfo> {
  const map = new Map<string, CategoryInfo>();
  for (const obj of objects) {
    if (obj.type === 'CATEGORY' && obj.categoryData && obj.id) {
      if (obj.categoryData.onlineVisibility !== true) continue;
      if (obj.categoryData.categoryType === 'KITCHEN_CATEGORY') continue;
      if (obj.categoryData.isTopLevel === true) continue;
      map.set(obj.id, {
        id: obj.id,
        name: obj.categoryData.name ?? 'Other',
      });
    }
  }
  return map;
}

// ---------------------------------------------------------------------------
// Inventory
// ---------------------------------------------------------------------------

type SquareClient = ReturnType<typeof getSquareClient>;

async function fetchInventoryCounts(
  client: SquareClient,
  variationIds: string[],
  locationId?: string,
): Promise<Map<string, number>> {
  const stockMap = new Map<string, number>();
  if (variationIds.length === 0) return stockMap;

  try {
    const batchSize = 100;
    for (let i = 0; i < variationIds.length; i += batchSize) {
      const batch = variationIds.slice(i, i + batchSize);
      const page = await client.inventory.batchGetCounts({
        catalogObjectIds: batch,
        locationIds: locationId ? [locationId] : undefined,
        states: ['IN_STOCK'],
      });

      for await (const count of page) {
        if (count.catalogObjectId && count.quantity != null) {
          const qty = parseFloat(count.quantity);
          const existing = stockMap.get(count.catalogObjectId) ?? 0;
          stockMap.set(count.catalogObjectId, existing + qty);
        }
      }
    }
  } catch {
    // Inventory API may not be enabled; fall back to all in-stock
  }

  return stockMap;
}

function applyStockStatus(
  items: CatalogMenuItem[],
  stockMap: Map<string, number>,
  thresholds: Map<string, number>,
): void {
  if (stockMap.size === 0) return;

  for (const item of items) {
    let trackedCount = 0;
    let outCount = 0;
    let hasLowStock = false;

    for (const v of item.variations) {
      if (!thresholds.has(v.id)) continue; // not inventory-tracked
      trackedCount++;

      const qty = stockMap.get(v.id) ?? 0;
      const threshold = thresholds.get(v.id) ?? 0;

      if (qty <= 0) {
        outCount++;
      } else if (threshold > 0 && qty <= threshold) {
        hasLowStock = true;
      }
    }

    if (trackedCount === 0) continue; // no tracked variations — assume in_stock

    if (outCount >= trackedCount) {
      item.stockStatus = 'out_of_stock';
    } else if (hasLowStock) {
      item.stockStatus = 'low_stock';
    }
  }
}

// ---------------------------------------------------------------------------
// Normalization
// ---------------------------------------------------------------------------

function normalizeItem(
  item: CatalogObject.Item,
  imageMap: Map<string, string>,
  modifierListMap: Map<string, ModifierList>,
): CatalogMenuItem {
  const data = item.itemData!;

  const imageUrl =
    resolveImageUrl(item.imageId, data.imageIds, imageMap) ?? null;

  const variations: ItemVariation[] = (data.variations ?? [])
    .filter((v): v is CatalogObject.ItemVariation => v.type === 'ITEM_VARIATION')
    .map((v) => ({
      id: v.id,
      name: v.itemVariationData?.name ?? '',
      priceCents: Number(v.itemVariationData?.priceMoney?.amount ?? 0n),
      currency: v.itemVariationData?.priceMoney?.currency ?? 'CAD',
    }));

  const modifierLists: ModifierList[] = (data.modifierListInfo ?? [])
    .filter((info) => info.enabled !== false)
    .map((info) => {
      const list = modifierListMap.get(info.modifierListId);
      if (!list) return null;

      const minOverride = info.minSelectedModifiers;
      const maxOverride = info.maxSelectedModifiers;

      return {
        ...list,
        minSelected:
          minOverride != null && minOverride >= 0
            ? minOverride
            : list.minSelected,
        maxSelected:
          maxOverride != null && maxOverride > 0
            ? maxOverride
            : list.maxSelected,
      };
    })
    .filter((l): l is ModifierList => l !== null);

  const categoryIds: string[] = [];
  if (data.categories && data.categories.length > 0) {
    for (const cat of data.categories) {
      if (cat.id) categoryIds.push(cat.id);
    }
  }
  if (categoryIds.length === 0) {
    categoryIds.push(data.categoryId ?? 'uncategorized');
  }

  return {
    id: item.id,
    name: data.name ?? '',
    description: data.descriptionPlaintext ?? data.description ?? '',
    imageUrl,
    categoryIds,
    variations,
    modifierLists,
    onSale: false,
    stockStatus: 'in_stock',
  };
}

function resolveImageUrl(
  imageId: string | undefined,
  imageIds: string[] | null | undefined,
  imageMap: Map<string, string>,
): string | undefined {
  if (imageId) {
    const url = imageMap.get(imageId);
    if (url) return url;
  }
  if (imageIds) {
    for (const id of imageIds) {
      const url = imageMap.get(id);
      if (url) return url;
    }
  }
  return undefined;
}

function buildFeaturedCategory(
  items: CatalogMenuItem[],
): CatalogCategory | null {
  if (FEATURED_ITEM_NAMES.length === 0) return null;

  const lowerNames = FEATURED_ITEM_NAMES.map((n) => n.toLowerCase());
  const nameOrder = new Map(lowerNames.map((n, i) => [n, i]));

  const featured = items
    .filter((item) => nameOrder.has(item.name.toLowerCase()))
    .sort(
      (a, b) =>
        (nameOrder.get(a.name.toLowerCase()) ?? 999) -
        (nameOrder.get(b.name.toLowerCase()) ?? 999),
    );

  if (featured.length === 0) return null;

  return {
    id: '__featured__',
    name: 'Most popular',
    ordinal: -1,
    items: featured,
  };
}

function categoryDisplayOrder(name: string): number {
  return CATEGORY_DISPLAY_ORDER[name.toLowerCase()] ?? 999;
}

function groupByCategory(
  items: CatalogMenuItem[],
  categoryMap: Map<string, CategoryInfo>,
): CatalogCategory[] {
  const grouped = new Map<string, CatalogMenuItem[]>();

  for (const item of items) {
    for (const catId of item.categoryIds) {
      if (!categoryMap.has(catId)) continue;
      const list = grouped.get(catId) ?? [];
      list.push(item);
      grouped.set(catId, list);
    }
  }

  const byName = new Map<string, CatalogCategory>();

  for (const [catId, catItems] of grouped) {
    const info = categoryMap.get(catId);
    const key = (info?.name ?? 'Other').toLowerCase();
    const existing = byName.get(key);

    if (existing) {
      const seen = new Set(existing.items.map((i) => i.id));
      for (const item of catItems) {
        if (!seen.has(item.id)) existing.items.push(item);
      }
    } else {
      byName.set(key, {
        id: catId,
        name: info?.name ?? 'Other',
        ordinal: categoryDisplayOrder(info?.name ?? 'Other'),
        items: catItems,
      });
    }
  }

  const categories = Array.from(byName.values());
  categories.sort((a, b) => {
    if (a.ordinal !== b.ordinal) return a.ordinal - b.ordinal;
    return a.name.localeCompare(b.name);
  });
  return categories;
}
