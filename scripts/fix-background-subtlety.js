const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../docs/menu/napoli-menu-tti-prompts-CORRECTED.csv');

// Subtle backgrounds - oven is just part of the atmosphere, not focal point
const backgrounds = [
  // Background 1: Kitchen atmosphere with oven as subtle element
  `Shot from slightly above at 55-degree angle, as if standing at counter taking photo. Background is pizzeria kitchen shows softly blurred gray walls with partial view of stainless steel equipment including pizza oven far in background, all very out of focus. Clean modern pizzeria kitchen atmosphere. Natural daylight from front windows. Food takes up 60% of frame centered for flexible cropping. --no people, no hands, no logos, no text, no writing, no brand names, no decorations, no signage`,
  
  // Background 2: Prep area focus
  `Shot from slightly above at 55-degree angle, as if standing at counter taking photo. Background is pizzeria prep area shows softly blurred gray walls and clean prep surfaces with minimal equipment visible, all very out of focus. Clean modern pizzeria kitchen atmosphere. Natural daylight from front windows. Food takes up 60% of frame centered for flexible cropping. --no people, no hands, no logos, no text, no writing, no brand names, no decorations, no signage`,
  
  // Background 3: Simple kitchen view
  `Shot from slightly above at 55-degree angle, as if standing at counter taking photo. Background is pizzeria kitchen shows softly blurred gray walls with little to no italian theme decor that gives a clean modern pizzeria kitchen atmosphere. Natural daylight from front windows. Food takes up 60% of frame centered for flexible cropping. --no people, no hands, no logos, no text, no writing, no brand names, no decorations, no signage`
];

// Pizza backgrounds - also subtle, oven not focal point
const pizzaBackgrounds = [
  // Pizza Background 1: Kitchen atmosphere
  `Shot from slightly above at 55-degree angle to show the LARGE size of this authentic NY-style pizza. Pizza fills 65% of frame showing its impressive size. Background is pizzeria kitchen shows softly blurred gray walls with subtle hint of equipment in far background, all very out of focus. Natural daylight highlights the pillowy crust and bubbling cheese. --no people, no hands, no logos, no text, no writing, no brand names`,
  
  // Pizza Background 2: Simple and clean
  `Shot from slightly above at 55-degree angle to show the LARGE size of this authentic NY-style pizza. Pizza fills 65% of frame showing its impressive size. Background is pizzeria prep area shows softly blurred gray walls and clean surfaces, all very out of focus. Natural daylight highlights the pillowy crust and bubbling cheese. --no people, no hands, no logos, no text, no writing, no brand names`
];

function fixBackgroundSubtlety() {
  try {
    console.log('🎯 Fixing backgrounds - making oven subtle, not focal point...');
    
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
        let foodDescription = match[4];
        const aspectRatio = match[5];
        const dimensions = match[6];
        
        // Update food description to ensure proper distance and framing
        if (!foodDescription.includes('Shot from 2-3 feet away')) {
          // Keep existing description but ensure proper camera specs
          foodDescription = foodDescription.replace(
            /Shot from.*?f\/2\.8\./g,
            'Shot from 2-3 feet away with 85mm lens, f/2.8.'
          );
          
          // If no camera specs found, add them
          if (!foodDescription.includes('85mm lens')) {
            foodDescription = foodDescription + ' Shot from 2-3 feet away with 85mm lens, f/2.8.';
          }
        }
        
        // Determine which background to use
        let backgroundToUse;
        const isPizza = category.toLowerCase().includes('pizza');
        
        if (isPizza) {
          // Alternate between subtle pizza backgrounds
          const pizzaIndex = (i - 1) % pizzaBackgrounds.length;
          backgroundToUse = pizzaBackgrounds[pizzaIndex];
        } else {
          // Rotate through subtle regular backgrounds
          const bgIndex = (i - 1) % backgrounds.length;
          backgroundToUse = backgrounds[bgIndex];
        }
        
        // Reconstruct the line
        const newLine = `${itemId},${itemName},${category},"${foodDescription}","${backgroundToUse}",${aspectRatio},${dimensions}`;
        updatedLines.push(newLine);
        
        if (i <= 3) {
          console.log(`✏️  Updated ${itemName} - subtle background, no oven focus`);
        }
      } else {
        console.log(`⚠️  Line ${i} couldn't be parsed, keeping original`);
        updatedLines.push(line);
      }
    }
    
    // Write back to file
    fs.writeFileSync(csvPath, updatedLines.join('\n'), 'utf-8');
    
    console.log(`\n✅ Successfully updated ${updatedLines.length - 1} items!`);
    console.log('\n🎯 Key improvements:');
    console.log('   • Pizza oven NO LONGER focal point - just subtle background element');
    console.log('   • Backgrounds are VERY out of focus (proper bokeh)');
    console.log('   • Clean, modern pizzeria atmosphere');
    console.log('   • Gray walls, minimal decor');
    console.log('   • Food takes 60-65% of frame');
    console.log('   • Proper camera distance: 2-3 feet with 85mm lens');
    console.log('\n✨ Result: Food is the hero, background provides atmosphere without distraction');
    
  } catch (error) {
    console.error('❌ Error fixing background subtlety:', error.message);
  }
}

// Run the fix
fixBackgroundSubtlety();