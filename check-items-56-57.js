// Check current state of items 56 and 57
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function checkItems() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  console.log('📋 Checking current state of items 56 and 57...\n');

  // Check menu items
  const { data: items } = await supabase
    .from('menu_items')
    .select('id, name')
    .in('id', [56, 57])
    .order('id');

  console.log('Menu items:');
  items.forEach(item => {
    console.log(`  ID: ${item.id}, Name: ${item.name}`);
  });

  // Check existing images
  const { data: images } = await supabase
    .from('item_images')
    .select('*')
    .in('item_id', [56, 57])
    .order('item_id');

  console.log('\nExisting image records:');
  if (images.length === 0) {
    console.log('  No images found for items 56 or 57');
  } else {
    images.forEach(img => {
      console.log(`  Image ID: ${img.id}, Item ID: ${img.item_id}`);
      console.log(`    URL: ${img.image_url}`);
      console.log(`    Alt: ${img.alt_text}`);
    });
  }
}

checkItems();