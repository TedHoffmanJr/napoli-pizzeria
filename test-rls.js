// Test with RLS bypass
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function testRLS() {
  console.log('Testing with different auth modes...\n');
  
  // Test 1: Service role with schema option
  console.log('1. Service Role (should bypass RLS):');
  const supabaseService = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      db: {
        schema: 'public'
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );

  const { data: serviceData, error: serviceError } = await supabaseService
    .from('menu_categories')
    .select('*')
    .limit(1);
  
  if (serviceError) {
    console.log('   ❌ Error:', serviceError.message);
    console.log('   Details:', serviceError);
  } else {
    console.log('   ✅ Success! Data:', serviceData);
  }

  // Test 2: Anon key
  console.log('\n2. Anon Key (subject to RLS):');
  const supabaseAnon = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: anonData, error: anonError } = await supabaseAnon
    .from('menu_categories')
    .select('*')
    .limit(1);
  
  if (anonError) {
    console.log('   ❌ Error:', anonError.message);
  } else {
    console.log('   ✅ Success! Data:', anonData);
  }

  // Test 3: Check if we need to specify schema differently
  console.log('\n3. Testing with direct schema reference:');
  const { data: schemaData, error: schemaError } = await supabaseService
    .schema('public')
    .from('menu_categories')
    .select('*')
    .limit(1);
  
  if (schemaError) {
    console.log('   ❌ Error:', schemaError.message);
  } else {
    console.log('   ✅ Success! Data:', schemaData);
  }
}

testRLS().catch(console.error);