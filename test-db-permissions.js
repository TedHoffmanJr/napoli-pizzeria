// Test database permissions and roles
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function testPermissions() {
  console.log('Testing database permissions...\n');

  // Test with anon key first
  const supabaseAnon = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // Test with service key
  const supabaseService = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  console.log('1. Testing table access with anon key:');
  try {
    const { data, error } = await supabaseAnon
      .from('menu_categories')
      .select('id, name')
      .limit(1);
    
    if (error) {
      console.log('   ❌ Anon key error:', error.message);
    } else {
      console.log('   ✅ Anon key works! Data:', data);
    }
  } catch (e) {
    console.log('   ❌ Anon key exception:', e.message);
  }

  console.log('\n2. Checking what we can access with service key:');
  
  // Try different approaches
  const testQueries = [
    { name: 'Basic select', query: () => supabaseService.from('menu_categories').select('*').limit(1) },
    { name: 'With explicit schema', query: () => supabaseService.schema('public').from('menu_categories').select('*').limit(1) },
    { name: 'Count only', query: () => supabaseService.from('menu_categories').select('*', { count: 'exact', head: true }) }
  ];

  for (const test of testQueries) {
    try {
      const { data, error, count } = await test.query();
      if (error) {
        console.log(`   ❌ ${test.name}: ${error.message}`);
      } else {
        console.log(`   ✅ ${test.name}: Success! Count: ${count}, Data: ${data?.length || 0} items`);
      }
    } catch (e) {
      console.log(`   ❌ ${test.name} exception: ${e.message}`);
    }
  }
}

testPermissions().catch(console.error);