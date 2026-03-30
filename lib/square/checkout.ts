import { getSquareClient } from './client';
import type { OrderPayload } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

export async function createCheckout(payload: OrderPayload) {
  const client = getSquareClient();

  const lineItems = payload.lineItems.map((li) => ({
    catalogObjectId: li.variationId,
    quantity: String(li.quantity),
    modifiers: li.modifierIds.map((modId) => ({
      catalogObjectId: modId,
    })),
  }));

  const response = await client.checkout.paymentLinks.create({
    idempotencyKey: crypto.randomUUID(),
    order: {
      locationId: payload.locationId,
      lineItems,
      fulfillments: [
        {
          type: 'PICKUP',
          pickupDetails: {
            scheduleType: 'ASAP',
            recipient: {
              displayName: payload.customerName,
              phoneNumber: payload.customerPhone,
            },
          },
        },
      ],
    },
    checkoutOptions: {
      redirectUrl: `${BASE_URL}/order/confirmation`,
      allowTipping: true,
    },
  });

  const checkoutUrl = response.paymentLink?.url;
  const orderId = response.paymentLink?.orderId;

  if (!checkoutUrl) {
    throw new Error('Failed to create checkout link');
  }

  return { checkoutUrl, orderId };
}
