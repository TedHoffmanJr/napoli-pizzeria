// Remove old "Gluten Free Pasta Available" text from Entrees and Baked Dishes
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function removeOldGlutenFreeText() {
  console.log('🗑️ Removing old gluten-free text from Entrees and Baked Dishes...\n');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // Check current category info for Entrees (9) and Baked Dishes (10)
    const { data: currentInfo, error: fetchError } = await supabase
      .from('category_info')
      .select('*')
      .in('category_id', [9, 10]);

    if (fetchError) throw fetchError;

    console.log('Current category info:');
    currentInfo.forEach(info => {
      console.log(`  ID: ${info.id}, Category: ${info.category_id}, Type: ${info.info_type}, Text: ${info.info_text}`);
    });

    // Remove records with "Gluten Free Pasta Available" text
    const glutenFreeRecords = currentInfo.filter(info =>
      info.info_text.includes('Gluten Free Pasta Available')
    );

    if (glutenFreeRecords.length > 0) {
      console.log('\n🗑️ Removing old gluten-free text records...');

      for (const record of glutenFreeRecords) {
        const { error: deleteError } = await supabase
          .from('category_info')
          .delete()
          .eq('id', record.id);

        if (deleteError) throw deleteError;
        console.log(`✅ Removed record ID ${record.id}: "${record.info_text}"`);
      }
    } else {
      console.log('\n✅ No old gluten-free text records found to remove');
    }

    // Verify removal
    console.log('\n🔍 Verifying removal...');
    const { data: verifyData, error: verifyError } = await supabase
      .from('category_info')
      .select('*')
      .in('category_id', [9, 10]);

    if (verifyError) throw verifyError;

    console.log('Remaining category info:');
    if (verifyData.length === 0) {
      console.log('  No category info remaining');
    } else {
      verifyData.forEach(info => {
        console.log(`  ID: ${info.id}, Category: ${info.category_id}, Type: ${info.info_type}, Text: ${info.info_text}`);
      });
    }

    console.log('\n🎉 Old gluten-free text removal completed!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

removeOldGlutenFreeText();