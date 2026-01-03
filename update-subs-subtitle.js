// Script to update the subtitle for Cold Subs and Hot Subs categories
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function updateSubsSubtitles() {
  console.log('🥪 Updating subs category subtitles...\n');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    const newSubtitle = 'Served on a Freshly Baked Ciabatta Roll';

    // Update Cold Subs category
    console.log('Updating Cold Subs subtitle...');
    const { error: coldSubsError } = await supabase
      .from('menu_categories')
      .update({ subtitle: newSubtitle })
      .eq('name', 'Cold Subs');

    if (coldSubsError) {
      throw coldSubsError;
    }
    console.log('✅ Cold Subs subtitle updated');

    // Update Hot Subs category
    console.log('Updating Hot Subs subtitle...');
    const { error: hotSubsError } = await supabase
      .from('menu_categories')
      .update({ subtitle: newSubtitle })
      .eq('name', 'Hot Subs');

    if (hotSubsError) {
      throw hotSubsError;
    }
    console.log('✅ Hot Subs subtitle updated');

    // Verify the updates
    console.log('\n🔍 Verifying updates...');
    const { data: categories, error: verifyError } = await supabase
      .from('menu_categories')
      .select('name, subtitle')
      .in('name', ['Cold Subs', 'Hot Subs']);

    if (verifyError) {
      throw verifyError;
    }

    categories.forEach(cat => {
      console.log(`${cat.name}: "${cat.subtitle}"`);
    });

    console.log('\n🎉 Subs subtitles updated successfully!');

  } catch (error) {
    console.error('❌ Error updating subtitles:', error.message);
  }
}

updateSubsSubtitles();