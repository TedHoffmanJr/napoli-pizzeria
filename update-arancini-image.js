// Script to update the arancini image URL in the database
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function updateAranciniImage() {
  console.log('🍛 Updating arancini image in database...\n');

  // Check environment variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Missing required environment variables!');
    console.log('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
    return;
  }

  // Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // First, let's find the arancini item and its current image
    console.log('🔍 Finding arancini item in database...');

    const { data: menuItems, error: findError } = await supabase
      .from('menu_items')
      .select(`
        id,
        name,
        images:item_images(id, image_url)
      `)
      .eq('name', 'Arancini');

    if (findError) {
      throw findError;
    }

    if (!menuItems || menuItems.length === 0) {
      console.error('❌ Arancini item not found in database');
      return;
    }

    const aranciniItem = menuItems[0];
    console.log(`✅ Found arancini item with ID: ${aranciniItem.id}`);

    if (!aranciniItem.images || aranciniItem.images.length === 0) {
      console.error('❌ No images found for arancini item');
      return;
    }

    const currentImage = aranciniItem.images[0];
    console.log(`📸 Current image URL: ${currentImage.image_url}`);

    // Update the image URL to the new compressed image
    const newImageUrl = '/menu-images-compressed/appetizers/item_003_arancini.webp';
    console.log(`📸 Updating to new image URL: ${newImageUrl}`);

    const { error: updateError } = await supabase
      .from('item_images')
      .update({ image_url: newImageUrl })
      .eq('id', currentImage.id);

    if (updateError) {
      throw updateError;
    }

    console.log('✅ Successfully updated arancini image URL!');

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
    console.log('\n🎉 Arancini image update completed successfully!');

  } catch (error) {
    console.error('❌ Error updating arancini image:', error.message);
    console.error('Full error:', error);
  }
}

updateAranciniImage();