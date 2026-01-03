// Script to upload Tortellini alla Vodka image to Supabase Storage and add to database
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function uploadTortelliniImage() {
  console.log('🍝 Uploading Tortellini alla Vodka image to Supabase Storage...\n');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // Read the local image file
    const imagePath = 'public/menu-images-compressed/baked-dishes/item_056_tortellini_ala_vodka.webp';
    console.log(`📁 Reading image file: ${imagePath}`);

    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image file not found: ${imagePath}`);
    }

    const imageBuffer = fs.readFileSync(imagePath);
    console.log(`✅ Image file loaded (${imageBuffer.length} bytes)`);

    // Upload to Supabase Storage
    const fileName = 'item_056.webp';
    const storagePath = `baked-dishes/${fileName}`;

    console.log(`☁️ Uploading to Supabase Storage: menu-images/${storagePath}`);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('menu-images')
      .upload(storagePath, imageBuffer, {
        contentType: 'image/webp',
        upsert: true // This will overwrite if the file already exists
      });

    if (uploadError) {
      throw uploadError;
    }

    console.log('✅ Upload successful:', uploadData);

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('menu-images')
      .getPublicUrl(storagePath);

    const supabaseUrl = urlData.publicUrl;
    console.log(`🔗 Supabase public URL: ${supabaseUrl}`);

    // Add new image record for item 56 (Tortellini alla Vodka)
    console.log('\n📝 Adding new image record for item 56 (Tortellini alla Vodka)...');

    const { data: insertData, error: insertError } = await supabase
      .from('item_images')
      .insert({
        item_id: 56,
        image_url: supabaseUrl,
        alt_text: 'Tortellini ala Vodka - Napoli Pizzeria',
        is_primary: true
      })
      .select();

    if (insertError) {
      throw insertError;
    }

    console.log('✅ New image record created:', insertData[0]);

    // Verify the final result
    console.log('\n🔍 Verifying final result...');
    const { data: verifyData, error: verifyError } = await supabase
      .from('item_images')
      .select('*')
      .in('item_id', [56, 57])
      .order('item_id');

    if (verifyError) {
      throw verifyError;
    }

    console.log('Final image records for items 56 and 57:');
    verifyData.forEach(img => {
      console.log(`  Image ID: ${img.id}, Item ID: ${img.item_id}`);
      console.log(`    URL: ${img.image_url}`);
      console.log(`    Alt: ${img.alt_text}`);
      console.log('');
    });

    console.log('🎉 Tortellini alla Vodka image upload and database addition completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  }
}

uploadTortelliniImage();