// Debug Supabase connection step by step
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function debug() {
  console.log('=== SUPABASE DEBUG ===\n');
  
  // 1. Check credentials
  console.log('1. Credentials Check:');
  console.log('   URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('   Service Key:', process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20) + '...');
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        persistSession: false
      }
    }
  );

  // 2. Try different table name formats
  console.log('\n2. Testing Table Name Formats:');
  const tableTests = [
    'MenuCategory',
    'menu_category', 
    'menu_categories',
    'Menu_Category',
    'MENU_CATEGORIES'
  ];

  for (const table of tableTests) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (!error) {
        console.log(`   ✅ Found table: ${table}`);
        console.log(`      Data:`, data);
      } else {
        console.log(`   ❌ ${table}: ${error.message}`);
      }
    } catch (e) {
      console.log(`   ❌ ${table}: ${e.message}`);
    }
  }

  // 3. Try RPC to list all tables
  console.log('\n3. Trying to list all tables via RPC:');
  const { data: tables, error: rpcError } = await supabase
    .rpc('get_tables', {})
    .single();
  
  if (rpcError) {
    console.log('   RPC not available, trying raw SQL...');
    
    // 4. Try raw SQL
    const { data: sqlResult, error: sqlError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
    
    if (sqlError) {
      console.log('   ❌ SQL Error:', sqlError.message);
    } else {
      console.log('   Tables found:', sqlResult);
    }
  } else {
    console.log('   Tables:', tables);
  }
}

debug().catch(console.error);