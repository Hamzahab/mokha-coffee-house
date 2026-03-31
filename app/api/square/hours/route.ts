import { NextResponse } from 'next/server';
import { getSquareClient } from '@/lib/square/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locationId = searchParams.get('locationId');

  if (!locationId) {
    return NextResponse.json({ error: 'Missing locationId' }, { status: 400 });
  }

  try {
    const client = getSquareClient();
    const response = await client.locations.get({ locationId });
    const location = response.location;

    if (!location?.businessHours?.periods) {
      return NextResponse.json({ periods: [] });
    }

    const periods = location.businessHours.periods.map((p) => ({
      dayOfWeek: p.dayOfWeek,
      startLocalTime: p.startLocalTime,
      endLocalTime: p.endLocalTime,
    }));

    return NextResponse.json({
      periods,
      timezone: location.timezone ?? 'America/Edmonton',
    });
  } catch (error) {
    console.error('[Square Hours]', error);
    return NextResponse.json(
      { error: 'Failed to fetch business hours' },
      { status: 500 },
    );
  }
}
