// Verify tables with correct names
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function verifyTables() {
  console.log('Verifying database tables...\n');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // Test 1: Check menu_categories
    console.log('Checking menu_categories table...');
    const { data: categories, error: catError } = await supabase
      .from('menu_categories')
      .select('*')
      .limit(3);
    
    if (catError) {
      console.error('❌ Error:', catError.message);
    } else {
      console.log('✅ Found', categories?.length || 0, 'categories');
      categories?.forEach(cat => console.log(`  - ${cat.name}`));
    }

    // Test 2: Check menu_items
    console.log('\nChecking menu_items table...');
    const { data: items, error: itemError } = await supabase
      .from('menu_items')
      .select('*')
      .limit(3);
    
    if (itemError) {
      console.error('❌ Error:', itemError.message);
    } else {
      console.log('✅ Found', items?.length || 0, 'items');
      items?.forEach(item => console.log(`  - ${item.name}`));
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

verifyTables();