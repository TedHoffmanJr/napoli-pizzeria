const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../public/ai-images');

// All menu categories for organized folders
const categories = [
  'Appetizers',
  'Salads', 
  'Wings',
  'Cold Subs',
  'Hot Subs',
  'Specialty Items',
  'Pizza',
  'Specialty Pizza',
  'Entrees',
  'Baked Dishes',
  'Beverages',
  'Desserts'
];

function setupCategoryFolders() {
  try {
    console.log('📁 Setting up organized category folders...');
    
    // Ensure base directory exists
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
      console.log(`✅ Created base directory: ${baseDir}`);
    }
    
    // Create category folders
    categories.forEach(category => {
      const folderName = category.toLowerCase().replace(/\s+/g, '-');
      const folderPath = path.join(baseDir, folderName);
      
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`📂 Created folder: ${folderName}`);
      } else {
        console.log(`✓ Folder exists: ${folderName}`);
      }
    });
    
    console.log('\n✅ All category folders ready!');
    console.log('\n📂 Folder structure:');
    console.log('public/ai-images/');
    categories.forEach(category => {
      const folderName = category.toLowerCase().replace(/\s+/g, '-');
      console.log(`  ├── ${folderName}/`);
    });
    
    console.log('\n🎯 Ready for organized image generation by category!');
    
  } catch (error) {
    console.error('❌ Error setting up folders:', error.message);
  }
}

// Run the setup
setupCategoryFolders();