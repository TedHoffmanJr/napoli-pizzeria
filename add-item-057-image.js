// Script to add image URL for item_057 (Three Berry Cake)
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function addItem057Image() {
  console.log('🍰 Adding Three Berry Cake image to database...\n');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // First, check if the item exists and what category it's in
    console.log('🔍 Finding Three Berry Cake item...');

    const { data: menuItems, error: findError } = await supabase
      .from('menu_items')
      .select(`
        id,
        name,
        category:menu_categories!menu_items_category_id_fkey(name),
        images:item_images(id, image_url)
      `)
      .eq('id', 57);

    if (findError) {
      throw findError;
    }

    if (!menuItems || menuItems.length === 0) {
      console.error('❌ Item 57 not found in database');
      return;
    }

    const item = menuItems[0];
    console.log(`✅ Found item: ${item.name} (ID: ${item.id})`);
    console.log(`📂 Category: ${item.category?.name || 'Unknown'}`);

    // Check if image already exists
    if (item.images && item.images.length > 0) {
      console.log(`📸 Current images found: ${item.images.length}`);
      item.images.forEach((img, index) => {
        console.log(`  ${index + 1}. ${img.image_url}`);
      });

      console.log('⚠️  Item already has images. Skipping image addition.');
      return;
    }

    // Add the new image
    const imageUrl = '/menu-images-compressed/desserts/item_057_3_berry_cake.webp';
    console.log(`📸 Adding new image URL: ${imageUrl}`);

    const { error: insertError } = await supabase
      .from('item_images')
      .insert({
        item_id: 57,
        image_url: imageUrl,
        alt_text: '3 Berry Cake - Napoli Pizzeria',
        is_primary: true
      });

    if (insertError) {
      throw insertError;
    }

    console.log('✅ Successfully added item_057 image URL!');

    // Verify the addition
    console.log('\n🔍 Verifying the addition...');
    const { data: verifyData, error: verifyError } = await supabase
      .from('item_images')
      .select('*')
      .eq('item_id', 57);

    if (verifyError) {
      throw verifyError;
    }

    console.log(`✅ Verified: Found ${verifyData.length} image(s) for item 57`);
    verifyData.forEach(img => {
      console.log(`  - ID: ${img.id}, URL: ${img.image_url}, Order: ${img.display_order}`);
    });

    console.log('\n🎉 Item_057 image addition completed successfully!');

  } catch (error) {
    console.error('❌ Error adding item_057 image:', error.message);
    console.error('Full error:', error);
  }
}

addItem057Image();