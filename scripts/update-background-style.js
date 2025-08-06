const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../docs/menu/napoli-menu-tti-prompts-CORRECTED.csv');

// New background based on inspiration image analysis
const improvedBackground = `Shot on clean stainless steel counter. Professional restaurant photography with 85mm lens at f/2.8, 3-4 feet from subject. Shallow depth of field creating smooth, creamy bokeh. Background shows softly blurred light gray walls with minimal, subtle Italian elements barely visible in deep background - perhaps a single vintage olive oil bottle on distant shelf. Clean, uncluttered composition. Natural diffused lighting. Food should occupy 50-60% of frame for flexible cropping and zoom functionality. --no visible signage, no readable text, no people, no hands, no cluttered walls, no excessive decorations`;

function updateBackgroundStyle() {
  try {
    console.log('🎨 Updating background style based on inspiration images...');
    
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
      const foodDescription = parts[3];
      const aspectRatio = parts[5];
      const dimensions = parts[6].replace(/"$/, '');
      
      // Use improved background
      const backgroundDescription = `"${improvedBackground}"`;
      
      // Reconstruct the line
      return `${itemId},"${itemName}","${category}","${foodDescription}",${backgroundDescription},"${aspectRatio}","${dimensions}"`;
    });
    
    // Write back to file
    fs.writeFileSync(csvPath, updatedLines.join('\n'), 'utf-8');
    
    console.log('✅ Successfully updated background style!');
    console.log('🎯 New style features:');
    console.log('   • Better distance: 3-4 feet for flexible cropping');
    console.log('   • Clean composition: Food takes 50-60% of frame');
    console.log('   • Minimal background: Light gray walls, subtle elements');
    console.log('   • Professional specs: 85mm lens, f/2.8, smooth bokeh');
    console.log('   • Improved negatives: No excessive signage or clutter');
    console.log('   • Inspired by your reference images but cleaner');
    
  } catch (error) {
    console.error('❌ Error updating background style:', error.message);
  }
}

// Run the update
updateBackgroundStyle();