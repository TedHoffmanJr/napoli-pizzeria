const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../docs/menu/napoli-menu-tti-prompts-CORRECTED.csv');

// Better background - no Italian decor, just clean pizza shop
const improvedBackground = `Shot from slightly above at 45-degree angle, as if standing at counter taking photo. Clean stainless steel counter surface. Background shows softly blurred gray walls and partial view of stainless steel pizza oven in far distance, all in smooth bokeh. Simple, clean pizzeria kitchen atmosphere. Natural daylight from front windows. Food takes up 50-60% of frame centered for flexible cropping. --no people, no hands, no logos, no text, no writing, no brand names, no decorations, no signage`;

// Special description for pizza items
const pizzaBackground = `Shot from slightly above at 45-degree angle to show the LARGE size of this authentic NY-style pizza. Clean stainless steel counter surface. Pizza fills 60-70% of frame showing its impressive size. Background shows softly blurred gray walls and stainless steel pizza oven in distance. Natural daylight highlights the pillowy crust and bubbling cheese. --no people, no hands, no logos, no text, no writing, no brand names`;

function fixAllBackgrounds() {
  try {
    console.log('🔧 Fixing ALL background descriptions...');
    
    // Read the CSV file
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n');
    
    // Keep header
    const header = lines[0];
    const updatedLines = [header];
    
    // Process each data line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) {
        updatedLines.push(line);
        continue;
      }
      
      // Split carefully on ","
      const match = line.match(/^([^,]+),([^,]+),([^,]+),"([^"]+)","[^"]*",([^,]+),(.+)$/);
      
      if (match) {
        const itemId = match[1];
        const itemName = match[2];
        const category = match[3];
        const foodDescription = match[4];
        const aspectRatio = match[5];
        const dimensions = match[6];
        
        // Use pizza-specific background for pizza items
        const isPizza = category.toLowerCase().includes('pizza');
        const backgroundToUse = isPizza ? pizzaBackground : improvedBackground;
        
        // Enhance pizza descriptions
        let enhancedFoodDesc = foodDescription;
        if (isPizza && !foodDescription.includes('LARGE')) {
          enhancedFoodDesc = foodDescription.replace(
            'pizza',
            'LARGE authentic NY-style pizza with pillowy crust edges and bubbling cheese'
          );
        }
        
        // Reconstruct the line
        const newLine = `${itemId},${itemName},${category},"${enhancedFoodDesc}","${backgroundToUse}",${aspectRatio},${dimensions}`;
        updatedLines.push(newLine);
        
        if (i <= 5) {
          console.log(`✏️  Updated ${itemName}`);
        }
      } else {
        console.log(`⚠️  Line ${i} couldn't be parsed, keeping original`);
        updatedLines.push(line);
      }
    }
    
    // Write back to file
    fs.writeFileSync(csvPath, updatedLines.join('\n'), 'utf-8');
    
    console.log(`\n✅ Successfully updated ${updatedLines.length - 1} items!`);
    console.log('\n🎯 New style features:');
    console.log('   • Camera angle: Slightly above (45°) like standing at counter');
    console.log('   • Clean background: Gray walls, stainless steel oven');
    console.log('   • NO Italian decor, oil bottles, or decorations');
    console.log('   • Pizza items: Emphasized LARGE size, pillowy crust, bubbling cheese');
    console.log('   • Professional framing: 50-60% of frame for flexibility');
    
  } catch (error) {
    console.error('❌ Error updating backgrounds:', error.message);
  }
}

// Run the fix
fixAllBackgrounds();