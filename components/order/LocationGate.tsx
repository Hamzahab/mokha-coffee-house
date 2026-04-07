'use client';

import { useState } from 'react';
import { useCart } from './CartProvider';
import { LocationPicker } from './LocationPicker';

export function LocationGate() {
  const { location } = useCart();
  const [dismissed, setDismissed] = useState(false);

  if (location || dismissed) return null;

  return <LocationPicker onConfirm={() => setDismissed(true)} />;
}
