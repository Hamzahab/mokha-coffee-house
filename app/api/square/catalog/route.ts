import { NextResponse } from 'next/server';
import { fetchCatalog } from '@/lib/square/catalog';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('locationId') ?? undefined;

    const categories = await fetchCatalog(locationId);

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('[Square Catalog]', error);
    return NextResponse.json(
      { error: 'Failed to fetch catalog' },
      { status: 500 },
    );
  }
}
