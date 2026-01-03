// Script to check if Tortellini alla Vacca is in the database
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function checkTortellini() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // Search for Tortellini item
    const { data: items, error } = await supabase
      .from('menu_items')
      .select(`
        *,
        category:menu_categories!menu_items_category_id_fkey(name),
        images:item_images(image_url),
        variants:item_variants(*)
      `)
      .or('name.ilike.%tortellini%,id.eq.56');

    if (error) throw error;

    if (items && items.length > 0) {
      console.log(`Found ${items.length} item(s):\n`);

      items.forEach(item => {
        console.log(`Item ID: ${item.id}`);
        console.log(`Name: ${item.name}`);
        console.log(`Italian Name: ${item.italian_name || 'N/A'}`);
        console.log(`Description: ${item.description || 'N/A'}`);
        console.log(`Category: ${item.category?.name || 'Unknown'}`);
        console.log(`Base Price: $${item.base_price}`);
        console.log(`Available: ${item.available}`);
        console.log(`Featured: ${item.featured}`);
        console.log(`Display Order: ${item.display_order}`);

        if (item.images && item.images.length > 0) {
          console.log('Images:');
          item.images.forEach(img => console.log(`  - ${img.image_url}`));
        }

        if (item.variants && item.variants.length > 0) {
          console.log('Variants:');
          item.variants.forEach(v => console.log(`  - ${v.variant_name}: $${v.price_modifier}`));
        }

        console.log('---');
      });
    } else {
      console.log('No Tortellini item found in the database.');
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkTortellini();