// Test script to list all tables in Supabase
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function listTables() {
  console.log('Checking Supabase tables...\n');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // Query to get all table names from PostgreSQL
    const { data, error } = await supabase
      .rpc('get_table_names', {})
      .single();
    
    if (error) {
      // If RPC doesn't exist, try a different approach
      console.log('Trying alternative method to list tables...\n');
      
      // Try common table names (case variations)
      const tableTests = [
        'MenuCategory',
        'menucategory', 
        'menu_category',
        'MenuItem',
        'menuitem',
        'menu_item',
        'ItemVariant',
        'itemvariant',
        'item_variant',
        'CategoryInfo',
        'categoryinfo',
        'category_info'
      ];

      for (const tableName of tableTests) {
        const { error: testError } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);
        
        if (!testError) {
          console.log(`✅ Found table: ${tableName}`);
        }
      }
    } else {
      console.log('Tables found:', data);
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

listTables();