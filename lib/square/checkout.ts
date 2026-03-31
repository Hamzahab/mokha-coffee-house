import { getSquareClient } from './client';
import type { OrderPayload } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

/** Strip non-digits, prepend +1 if missing country code (Canadian/US default). */
function toE164(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('1') && digits.length === 11) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  return `+${digits}`;
}

export async function createCheckout(payload: OrderPayload) {
  const client = getSquareClient();

  const lineItems = payload.lineItems.map((li) => ({
    catalogObjectId: li.variationId,
    quantity: String(li.quantity),
    modifiers: li.modifierIds.map((modId) => ({
      catalogObjectId: modId,
    })),
  }));

  const isScheduled = !!payload.pickupAt;
  const phoneE164 = toE164(payload.customerPhone);

  const response = await client.checkout.paymentLinks.create({
    idempotencyKey: crypto.randomUUID(),
    order: {
      locationId: payload.locationId,
      lineItems,
      fulfillments: [
        {
          type: 'PICKUP',
          pickupDetails: {
            scheduleType: isScheduled ? 'SCHEDULED' : 'ASAP',
            ...(isScheduled && { pickupAt: payload.pickupAt }),
            recipient: {
              displayName: payload.customerName,
              phoneNumber: phoneE164,
              emailAddress: payload.customerEmail,
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
