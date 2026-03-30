import type { CatalogMenuItem } from './types';

export function formatCents(cents: number, currency = 'CAD'): string {
  return `${currency}$${(cents / 100).toFixed(2)}`;
}

export function formatItemPrice(item: CatalogMenuItem): string {
  const prices = item.variations.map((v) => v.priceCents);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const currency = item.variations[0]?.currency ?? 'CAD';
  if (min === max) return formatCents(min, currency);
  return `${formatCents(min, currency)} - ${formatCents(max, currency)}`;
}

export function formatItemPriceFrom(item: CatalogMenuItem): string {
  const prices = item.variations.map((v) => v.priceCents);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const currency = item.variations[0]?.currency ?? 'CAD';
  if (min === max) return formatCents(min, currency);
  return `from ${formatCents(min, currency)}`;
}
