// Script to update image URL for ID 20 in item_images table
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function updateImageId20() {
  console.log('🍰 Updating image URL for ID 20 in item_images table...\n');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // First, check what's currently at ID 20
    console.log('🔍 Checking current image at ID 20...');

    const { data: currentData, error: findError } = await supabase
      .from('item_images')
      .select('*')
      .eq('id', 20)
      .single();

    if (findError) {
      throw findError;
    }

    console.log('Current image record:');
    console.log(`  ID: ${currentData.id}`);
    console.log(`  Item ID: ${currentData.item_id}`);
    console.log(`  Current URL: ${currentData.image_url}`);
    console.log(`  Alt Text: ${currentData.alt_text}`);
    console.log(`  Is Primary: ${currentData.is_primary}`);

    // Update the image URL
    const newImageUrl = '/menu-images-compressed/desserts/item_057_three-berry-cake.webp';
    console.log(`\n📸 Updating to new image URL: ${newImageUrl}`);

    const { error: updateError } = await supabase
      .from('item_images')
      .update({ image_url: newImageUrl })
      .eq('id', 20);

    if (updateError) {
      throw updateError;
    }

    console.log('✅ Successfully updated image URL for ID 20!');

    // Verify the update
    console.log('\n🔍 Verifying the update...');
    const { data: verifyData, error: verifyError } = await supabase
      .from('item_images')
      .select('*')
      .eq('id', 20)
      .single();

    if (verifyError) {
      throw verifyError;
    }

    console.log('Updated image record:');
    console.log(`  ID: ${verifyData.id}`);
    console.log(`  Item ID: ${verifyData.item_id}`);
    console.log(`  New URL: ${verifyData.image_url}`);
    console.log(`  Alt Text: ${verifyData.alt_text}`);

    console.log('\n🎉 Image ID 20 update completed successfully!');

  } catch (error) {
    console.error('❌ Error updating image ID 20:', error.message);
    console.error('Full error:', error);
  }
}

updateImageId20();