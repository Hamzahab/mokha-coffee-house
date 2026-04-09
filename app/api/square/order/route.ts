import { NextResponse } from 'next/server';
import { createCheckout } from '@/lib/square/checkout';
import type { OrderPayload } from '@/lib/square/types';

const MAX_QTY_PER_ITEM = 20;
const MAX_LINE_ITEMS = 50;

const rateMap = new Map<string, number[]>();
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateMap.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  rateMap.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again shortly.' },
        { status: 429 },
      );
    }

    const body = (await request.json()) as OrderPayload;

    if (!body.locationId || !Array.isArray(body.lineItems) || body.lineItems.length === 0) {
      return NextResponse.json(
        { error: 'Missing locationId or lineItems' },
        { status: 400 },
      );
    }

    if (body.lineItems.length > MAX_LINE_ITEMS) {
      return NextResponse.json(
        { error: `Order cannot exceed ${MAX_LINE_ITEMS} items` },
        { status: 400 },
      );
    }

    for (const li of body.lineItems) {
      if (!li.variationId || typeof li.quantity !== 'number' || li.quantity < 1 || li.quantity > MAX_QTY_PER_ITEM) {
        return NextResponse.json(
          { error: `Invalid line item. Quantity must be between 1 and ${MAX_QTY_PER_ITEM}.` },
          { status: 400 },
        );
      }
    }

    if (!body.customerName?.trim() || !body.customerPhone?.trim() || !body.customerEmail?.trim()) {
      return NextResponse.json(
        { error: 'Name, phone, and email are required' },
        { status: 400 },
      );
    }

    const result = await createCheckout({
      locationId: body.locationId,
      lineItems: body.lineItems,
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerEmail: body.customerEmail,
      pickupAt: body.pickupAt,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[Square Order]', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 },
    );
  }
}
