// Script to upload Three Berry Cake image to Supabase Storage and update database
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function uploadImageToSupabase() {
  console.log('☁️ Uploading Three Berry Cake image to Supabase Storage...\n');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // Read the local image file
    const imagePath = 'public/menu-images-compressed/desserts/item_057_3_berry_cake.webp';
    console.log(`📁 Reading image file: ${imagePath}`);

    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image file not found: ${imagePath}`);
    }

    const imageBuffer = fs.readFileSync(imagePath);
    console.log(`✅ Image file loaded (${imageBuffer.length} bytes)`);

    // Upload to Supabase Storage
    const fileName = 'item_057.webp';
    const storagePath = `desserts/${fileName}`;

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

    // Update the database with the Supabase URL
    console.log('\n📝 Updating database with Supabase URL...');

    const { error: updateError } = await supabase
      .from('item_images')
      .update({ image_url: supabaseUrl })
      .eq('id', 20);

    if (updateError) {
      throw updateError;
    }

    console.log('✅ Database updated successfully!');

    // Verify the final result
    console.log('\n🔍 Verifying final result...');
    const { data: verifyData, error: verifyError } = await supabase
      .from('item_images')
      .select('*')
      .eq('id', 20)
      .single();

    if (verifyError) {
      throw verifyError;
    }

    console.log('Final database record:');
    console.log(`  ID: ${verifyData.id}`);
    console.log(`  Item ID: ${verifyData.item_id}`);
    console.log(`  Image URL: ${verifyData.image_url}`);
    console.log(`  Alt Text: ${verifyData.alt_text}`);

    console.log('\n🎉 Upload and database update completed successfully!');
    console.log(`🔗 The image is now accessible at: ${supabaseUrl}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  }
}

uploadImageToSupabase();