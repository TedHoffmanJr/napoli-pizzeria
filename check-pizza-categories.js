// Script to check pizza categories in database
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function checkPizzaCategories() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // Check all categories
    const { data: categories, error: catError } = await supabase
      .from('menu_categories')
      .select('*')
      .order('display_order');

    if (catError) throw catError;

    console.log('All categories:');
    categories.forEach(cat => {
      console.log(`  - ${cat.name} (ID: ${cat.id}, Order: ${cat.display_order})`);
      if (cat.subtitle) console.log(`    Subtitle: ${cat.subtitle}`);
      if (cat.shared_options) console.log(`    Shared Options: ${cat.shared_options}`);
    });

    // Check Pizza categories specifically
    const pizzaCategories = categories.filter(c =>
      c.name.toLowerCase().includes('pizza')
    );

    console.log('\nPizza categories found:', pizzaCategories.length);

    for (const pizzaCat of pizzaCategories) {
      console.log(`\nCategory: ${pizzaCat.name} (ID: ${pizzaCat.id})`);

      // Get category info
      const { data: info, error: infoError } = await supabase
        .from('category_info')
        .select('*')
        .eq('category_id', pizzaCat.id);

      if (!infoError && info && info.length > 0) {
        console.log('  Category Info:');
        info.forEach(i => {
          console.log(`    - ${i.info_type}: ${i.info_text}`);
        });
      }
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkPizzaCategories();