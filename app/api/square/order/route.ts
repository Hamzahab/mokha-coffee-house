import { NextResponse } from 'next/server';
import { createCheckout } from '@/lib/square/checkout';
import type { OrderPayload } from '@/lib/square/types';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderPayload;

    if (!body.locationId || !body.lineItems?.length) {
      return NextResponse.json(
        { error: 'Missing locationId or lineItems' },
        { status: 400 },
      );
    }

    const result = await createCheckout({
      locationId: body.locationId,
      lineItems: body.lineItems,
      customerName: body.customerName || 'Guest',
      customerPhone: body.customerPhone,
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
