// Simple test script to verify Supabase connection
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('Testing Supabase connection...\n');
  
  // Check environment variables
  console.log('Environment variables:');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Missing');
  console.log('\n');

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Missing required environment variables!');
    return;
  }

  // Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // Test 1: Simple query
    console.log('Test 1: Checking if MenuCategory table exists...');
    const { data, error, count } = await supabase
      .from('MenuCategory')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Error:', error.message);
      console.error('Details:', error);
    } else {
      console.log('✅ Table exists! Row count:', count);
    }

    // Test 2: Get categories
    console.log('\nTest 2: Fetching categories...');
    const { data: categories, error: catError } = await supabase
      .from('MenuCategory')
      .select('id, name, active')
      .limit(5);
    
    if (catError) {
      console.error('❌ Error:', catError.message);
    } else {
      console.log('✅ Found', categories?.length, 'categories');
      categories?.forEach(cat => console.log(`  - ${cat.name} (active: ${cat.active})`));
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

testConnection();