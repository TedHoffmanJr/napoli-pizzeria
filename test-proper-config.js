// Test proper Supabase client configuration
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function testProperConfig() {
  console.log('Testing proper Supabase client configuration...\n');
  
  // Test 1: Standard configuration with explicit options
  console.log('1. Standard client with explicit schema:');
  const supabase1 = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { persistSession: false },
      global: { headers: { 'Prefer': 'return=representation' } },
      db: { schema: 'public' }
    }
  );

  try {
    const { data, error } = await supabase1
      .from('menu_categories')
      .select('id, name')
      .limit(3);
    
    if (error) {
      console.log('   ❌ Error:', error.message, error.code);
    } else {
      console.log('   ✅ Success! Categories:', data);
    }
  } catch (e) {
    console.log('   ❌ Exception:', e.message);
  }

  // Test 2: Direct REST API call (bypass supabase-js)
  console.log('\n2. Direct REST API call:');
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/menu_categories?select=id,name&limit=3`,
      {
        headers: {
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log('   ✅ Direct REST Success! Categories:', data);
    } else {
      const error = await response.text();
      console.log('   ❌ Direct REST Error:', response.status, error);
    }
  } catch (e) {
    console.log('   ❌ Direct REST Exception:', e.message);
  }

  // Test 3: Check if PostgREST is working
  console.log('\n3. PostgREST health check:');
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    });
    
    console.log('   PostgREST status:', response.status);
    const text = await response.text();
    console.log('   PostgREST response:', text.substring(0, 200));
  } catch (e) {
    console.log('   ❌ PostgREST Exception:', e.message);
  }
}

testProperConfig().catch(console.error);