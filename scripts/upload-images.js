#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase client with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Images to upload (mapping local file to Supabase path)
const imagesToUpload = [
  {
    localPath: 'public/menu-images-compressed/salads/item_008_antipasto-salad.webp',
    supabasePath: 'menu-images/salads/item_008.webp',
    description: 'Antipasto Salad'
  },
  {
    localPath: 'public/menu-images-compressed/salads/item_009_caprese-salad.webp',
    supabasePath: 'menu-images/salads/item_009.webp',
    description: 'Caprese Salad'
  },
  {
    localPath: 'public/menu-images-compressed/entrees/item_040_chicken-riggies.webp',
    supabasePath: 'menu-images/entrees/item_040.webp',
    description: 'Chicken Riggies'
  },
  {
    localPath: 'public/menu-images-compressed/specialty-items/item_021_pepperoni-roll.webp',
    supabasePath: 'menu-images/specialty-items/item_021.webp',
    description: 'Pepperoni Roll'
  }
];

async function uploadImage(localPath, supabasePath, description) {
  try {
    console.log(`\n📤 Uploading ${description}...`);
    console.log(`   Local: ${localPath}`);
    console.log(`   Supabase: ${supabasePath}`);

    // Check if local file exists
    if (!fs.existsSync(localPath)) {
      throw new Error(`Local file not found: ${localPath}`);
    }

    // Read the file
    const fileBuffer = fs.readFileSync(localPath);
    console.log(`   File size: ${(fileBuffer.length / 1024).toFixed(1)} KB`);

    // Upload to Supabase (this will overwrite existing files)
    const { data, error } = await supabase.storage
      .from('menu-images')
      .upload(supabasePath, fileBuffer, {
        contentType: 'image/webp',
        upsert: true // This overwrites existing files
      });

    if (error) {
      throw error;
    }

    console.log(`   ✅ Success! Uploaded to: ${data.path}`);

    // Get the public URL to verify
    const { data: publicUrlData } = supabase.storage
      .from('menu-images')
      .getPublicUrl(supabasePath);

    console.log(`   🔗 Public URL: ${publicUrlData.publicUrl}`);
    return true;

  } catch (error) {
    console.error(`   ❌ Error uploading ${description}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting Napoli menu image uploads to Supabase...\n');

  let successCount = 0;
  let totalCount = imagesToUpload.length;

  for (const image of imagesToUpload) {
    const success = await uploadImage(image.localPath, image.supabasePath, image.description);
    if (success) {
      successCount++;
    }

    // Add a small delay between uploads
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n📊 Upload Summary:`);
  console.log(`   ✅ Successful: ${successCount}/${totalCount}`);
  console.log(`   ❌ Failed: ${totalCount - successCount}/${totalCount}`);

  if (successCount === totalCount) {
    console.log(`\n🎉 All images uploaded successfully!`);
    console.log(`💡 The website should now display your new images.`);
  } else {
    console.log(`\n⚠️  Some uploads failed. Please check the errors above.`);
  }
}

main().catch(console.error);