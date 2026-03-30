// Quick script to fetch your Square location IDs
import { config } from 'dotenv';
import { getSquareClient } from '../lib/square/client';

// Load .env.local
config({ path: '.env.local' });

async function getLocations() {
  try {
    const client = getSquareClient();
    const response = await client.locations.list();
    
    console.log('\n=== Your Square Locations ===\n');
    
    for (const location of response.locations ?? []) {
      console.log(`Name: ${location.name}`);
      console.log(`ID: ${location.id}`);
      console.log(`Address: ${location.address?.addressLine1}`);
      console.log(`City: ${location.address?.locality}`);
      console.log('---');
    }
  } catch (error) {
    console.error('Error fetching locations:', error);
  }
}

getLocations();
