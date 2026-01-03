// Script to update the image URL for item_018 (Napoli's Chicken & Greens Sub)
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function updateItem018Image() {
  console.log('🥪 Updating Napoli\'s Chicken & Greens Sub image...\n');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // First, find the item with ID 18
    console.log('🔍 Finding Napoli\'s Chicken & Greens Sub item...');

    const { data: menuItems, error: findError } = await supabase
      .from('menu_items')
      .select(`
        id,
        name,
        images:item_images(id, image_url)
      `)
      .eq('id', 18);

    if (findError) {
      throw findError;
    }

    if (!menuItems || menuItems.length === 0) {
      console.error('❌ Item 18 not found in database');
      return;
    }

    const item = menuItems[0];
    console.log(`✅ Found item: ${item.name} (ID: ${item.id})`);

    if (!item.images || item.images.length === 0) {
      console.error('❌ No images found for this item');
      return;
    }

    const currentImage = item.images[0];
    console.log(`📸 Current image URL: ${currentImage.image_url}`);

    // Update the image URL to the new one
    const newImageUrl = '/menu-images-compressed/hot-subs/item_018_napoli-s-chicken---greens-sub.webp';
    console.log(`📸 Updating to new image URL: ${newImageUrl}`);

    const { error: updateError } = await supabase
      .from('item_images')
      .update({ image_url: newImageUrl })
      .eq('id', currentImage.id);

    if (updateError) {
      throw updateError;
    }

    console.log('✅ Successfully updated item_018 image URL!');

    // Verify the update
    console.log('\n🔍 Verifying the update...');
    const { data: verifyData, error: verifyError } = await supabase
      .from('item_images')
      .select('image_url')
      .eq('id', currentImage.id)
      .single();

    if (verifyError) {
      throw verifyError;
    }

    console.log(`✅ Verified new image URL: ${verifyData.image_url}`);
    console.log('\n🎉 Item_018 image update completed successfully!');

  } catch (error) {
    console.error('❌ Error updating item_018 image:', error.message);
    console.error('Full error:', error);
  }
}

updateItem018Image();