const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../docs/menu/napoli-menu-tti-prompts-CORRECTED.csv');

// Create 3 different background variations for variety
const backgrounds = [
  // Background 1: Large pizza oven focus
  `Shot from 55-degree angle, as if standing at counter taking photo. Clean stainless steel counter surface. Background shows softly blurred gray walls and LARGE commercial stainless steel pizza oven with multiple deck levels in far distance, all in smooth bokeh. Simple, clean pizzeria kitchen atmosphere. Natural daylight from front windows. Food takes up 50-60% of frame centered for flexible cropping. --no people, no hands, no logos, no text, no writing, no brand names, no decorations, no signage`,
  
  // Background 2: Pizza prep station
  `Shot from 55-degree angle, as if standing at counter taking photo. Clean stainless steel counter surface. Background shows softly blurred clean pizza prep station with ingredient containers and pizza boxes stacked neatly on shelves, all in smooth bokeh. Professional pizzeria kitchen atmosphere. Natural daylight from front windows. Food takes up 50-60% of frame centered for flexible cropping. --no people, no hands, no logos, no text, no writing, no brand names, no decorations, no signage`,
  
  // Background 3: Mixed view
  `Shot from 55-degree angle, as if standing at counter taking photo. Clean stainless steel counter surface. Background shows softly blurred view with partial LARGE commercial pizza oven on one side and clean prep area on the other, all in smooth bokeh. Authentic pizzeria kitchen atmosphere. Natural daylight from front windows. Food takes up 50-60% of frame centered for flexible cropping. --no people, no hands, no logos, no text, no writing, no brand names, no decorations, no signage`
];

// Special pizza backgrounds emphasizing the large oven
const pizzaBackgrounds = [
  // Pizza Background 1: Showcase the large oven
  `Shot from 55-degree angle to show the LARGE size of this authentic NY-style pizza. Clean stainless steel counter surface. Pizza fills 60-70% of frame showing its impressive size. Background shows softly blurred LARGE commercial stainless steel pizza oven with multiple deck levels. Natural daylight highlights the pillowy crust and bubbling cheese. --no people, no hands, no logos, no text, no writing, no brand names`,
  
  // Pizza Background 2: With pizza boxes
  `Shot from 55-degree angle to show the LARGE size of this authentic NY-style pizza. Clean stainless steel counter surface. Pizza fills 60-70% of frame showing its impressive size. Background shows softly blurred stack of pizza boxes and partial view of LARGE commercial oven. Natural daylight highlights the pillowy crust and bubbling cheese. --no people, no hands, no logos, no text, no writing, no brand names`
];

function updateTo55Degree() {
  try {
    console.log('📐 Updating to 55-degree angle with varied backgrounds...');
    
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
        
        // Determine which background to use
        let backgroundToUse;
        const isPizza = category.toLowerCase().includes('pizza');
        
        if (isPizza) {
          // Alternate between pizza backgrounds
          const pizzaIndex = (i - 1) % pizzaBackgrounds.length;
          backgroundToUse = pizzaBackgrounds[pizzaIndex];
        } else {
          // Rotate through regular backgrounds for variety
          const bgIndex = (i - 1) % backgrounds.length;
          backgroundToUse = backgrounds[bgIndex];
        }
        
        // Reconstruct the line
        const newLine = `${itemId},${itemName},${category},"${foodDescription}","${backgroundToUse}",${aspectRatio},${dimensions}`;
        updatedLines.push(newLine);
        
        if (i <= 5) {
          console.log(`✏️  Updated ${itemName} with background variation ${(i - 1) % 3 + 1}`);
        }
      } else {
        console.log(`⚠️  Line ${i} couldn't be parsed, keeping original`);
        updatedLines.push(line);
      }
    }
    
    // Write back to file
    fs.writeFileSync(csvPath, updatedLines.join('\n'), 'utf-8');
    
    console.log(`\n✅ Successfully updated ${updatedLines.length - 1} items!`);
    console.log('\n🎯 New improvements:');
    console.log('   • Camera angle: 55-degree (better perspective)');
    console.log('   • LARGE commercial pizza oven (accurate to actual kitchen)');
    console.log('   • Varied backgrounds:');
    console.log('     - Background 1: Large commercial oven with multiple decks');
    console.log('     - Background 2: Clean pizza prep station with ingredients');
    console.log('     - Background 3: Mixed view with oven and prep area');
    console.log('   • Pizza items alternate between oven and pizza box backgrounds');
    console.log('   • More realistic and varied compositions');
    
  } catch (error) {
    console.error('❌ Error updating angles and backgrounds:', error.message);
  }
}

// Run the update
updateTo55Degree();