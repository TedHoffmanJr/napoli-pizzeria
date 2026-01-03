// Script to verify the arancini image update worked
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function verifyAranciniUpdate() {
  console.log('🔍 Verifying arancini image update...\n');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // Fetch the arancini item with its image
    const { data: menuItems, error } = await supabase
      .from('menu_items')
      .select(`
        id,
        name,
        images:item_images(id, image_url)
      `)
      .eq('name', 'Arancini');

    if (error) {
      throw error;
    }

    if (!menuItems || menuItems.length === 0) {
      console.error('❌ Arancini item not found');
      return;
    }

    const arancini = menuItems[0];
    console.log(`✅ Found arancini item (ID: ${arancini.id})`);

    if (arancini.images && arancini.images.length > 0) {
      const image = arancini.images[0];
      console.log(`📸 Current image URL: ${image.image_url}`);

      if (image.image_url.includes('item_003_arancini.webp')) {
        console.log('✅ SUCCESS: Image URL has been updated to the new compressed image!');
      } else {
        console.log('⚠️  WARNING: Image URL does not appear to be the new compressed image');
      }
    } else {
      console.log('❌ No images found for arancini item');
    }

  } catch (error) {
    console.error('❌ Error verifying update:', error.message);
  }
}

verifyAranciniUpdate();