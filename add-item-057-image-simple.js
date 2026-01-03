// Simple script to add image for item_057
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function addItem057ImageSimple() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    console.log('🍰 Adding Three Berry Cake image...');

    const { data, error } = await supabase
      .from('item_images')
      .insert({
        item_id: 57,
        image_url: '/menu-images-compressed/desserts/item_057_3_berry_cake.webp',
        alt_text: '3 Berry Cake - Napoli Pizzeria',
        is_primary: true
      })
      .select();

    if (error) {
      throw error;
    }

    console.log('✅ Successfully added image:', data);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

addItem057ImageSimple();