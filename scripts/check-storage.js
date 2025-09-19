#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase client with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkStorageFiles() {
  try {
    console.log('🔍 Checking Supabase storage files...\n');

    // List files in the salads folder
    const { data: saladsFiles, error: saladsError } = await supabase.storage
      .from('menu-images')
      .list('salads', {
        limit: 100,
        offset: 0
      });

    if (saladsError) {
      console.error('Error listing salads files:', saladsError);
      return;
    }

    console.log('📁 Files in salads folder:');
    saladsFiles.forEach(file => {
      console.log(`   ${file.name} - ${new Date(file.updated_at).toLocaleString()} - ${(file.metadata?.size || 0 / 1024).toFixed(1)} KB`);
    });

    // List files in the entrees folder
    const { data: entreesFiles, error: entreesError } = await supabase.storage
      .from('menu-images')
      .list('entrees', {
        limit: 100,
        offset: 0
      });

    if (entreesError) {
      console.error('Error listing entrees files:', entreesError);
      return;
    }

    console.log('\n📁 Files in entrees folder:');
    entreesFiles.forEach(file => {
      console.log(`   ${file.name} - ${new Date(file.updated_at).toLocaleString()} - ${(file.metadata?.size || 0 / 1024).toFixed(1)} KB`);
    });

    // List files in the specialty-items folder
    const { data: specialtyFiles, error: specialtyError } = await supabase.storage
      .from('menu-images')
      .list('specialty-items', {
        limit: 100,
        offset: 0
      });

    if (specialtyError) {
      console.error('Error listing specialty-items files:', specialtyError);
      return;
    }

    console.log('\n📁 Files in specialty-items folder:');
    specialtyFiles.forEach(file => {
      console.log(`   ${file.name} - ${new Date(file.updated_at).toLocaleString()} - ${(file.metadata?.size || 0 / 1024).toFixed(1)} KB`);
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

checkStorageFiles();