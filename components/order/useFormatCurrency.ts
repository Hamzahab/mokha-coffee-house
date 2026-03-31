'use client';

import { useCallback } from 'react';
import { useCart } from './CartProvider';
import { formatCents } from '@/lib/square/format';

export function useFormatCurrency() {
  const { items } = useCart();
  const currency = items[0]?.currency ?? 'CAD';
  const fmt = useCallback(
    (cents: number) => formatCents(cents, currency),
    [currency],
  );
  return fmt;
}
