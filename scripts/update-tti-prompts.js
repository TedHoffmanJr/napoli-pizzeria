const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../docs/menu/napoli-menu-tti-prompts-CORRECTED.csv');

// Improved background template with Italian heritage elements
const newBackgroundTemplate = `Shot on a stainless steel counter. Natural daylight coming in from front pizzeria windows. Background shows softly blurred light gray walls with subtle Italian heritage elements - a vintage Napoli travel poster and classic Italian olive oil bottles on distant shelves, all in pleasing bokeh. Authentic pizzeria atmosphere. --no people, no hands, no logos, no text, no writing, no brand names, no fake menus`;

// Distance/sizing template to add to food descriptions
const sizeTemplate = ` Shot from 2-3 feet away with 85mm lens, f/2.8. Food item centered and takes up 60-70% of frame to allow for flexible cropping and zooming.`;

function updateTTIPrompts() {
  try {
    console.log('📸 Updating TTI prompts with better sizing and Italian heritage backgrounds...');
    
    // Read the CSV file
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n');
    
    // Process each line (skip header)
    const updatedLines = lines.map((line, index) => {
      if (index === 0 || !line.trim()) return line; // Skip header and empty lines
      
      const parts = line.split('","');
      if (parts.length < 6) return line; // Skip malformed lines
      
      // Parse CSV fields (handling quoted fields)
      const itemId = parts[0].replace(/^"/, '');
      const itemName = parts[1];
      const category = parts[2];
      let foodDescription = parts[3];
      let backgroundDescription = parts[4];
      const aspectRatio = parts[5];
      const dimensions = parts[6].replace(/"$/, '');
      
      // Add sizing info to food description if not already present
      if (!foodDescription.includes('Shot from 2-3 feet away')) {
        foodDescription = foodDescription + sizeTemplate;
      }
      
      // Update background description
      backgroundDescription = `"${newBackgroundTemplate}"`;
      
      // Reconstruct the line
      return `${itemId},"${itemName}","${category}","${foodDescription}",${backgroundDescription},"${aspectRatio}","${dimensions}"`;
    });
    
    // Write back to file
    fs.writeFileSync(csvPath, updatedLines.join('\n'), 'utf-8');
    
    console.log('✅ Successfully updated all TTI prompts!');
    console.log(`📝 Updated ${updatedLines.length - 1} menu items`);
    console.log('🎨 New features:');
    console.log('   • Distance/sizing specs: 2-3 feet away, 85mm lens, f/2.8');
    console.log('   • Food centered at 60-70% of frame for flexible cropping');
    console.log('   • Italian heritage background elements (Napoli poster, olive oil bottles)');
    console.log('   • Light gray walls for better contrast');
    console.log('   • Consistent professional photography specs');
    
  } catch (error) {
    console.error('❌ Error updating TTI prompts:', error.message);
  }
}

// Run the update
updateTTIPrompts();