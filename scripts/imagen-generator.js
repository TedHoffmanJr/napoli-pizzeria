const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
function loadEnvFile() {
  const envPath = path.join(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          process.env[key] = valueParts.join('=');
        }
      }
    });
  }
}

// Load environment variables
loadEnvFile();

class NapoliImageGenerator {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.ai = new GoogleGenAI({ apiKey });
    this.outputDir = path.join(__dirname, '../public/ai-images');
    this.csvPath = path.join(__dirname, '../docs/menu/napoli-menu-tti-prompts-CORRECTED.csv');
    
    // Model configurations
    this.models = {
      standard: 'imagen-4.0-generate-preview-06-06', 
      ultra: 'imagen-4.0-ultra-generate-preview-06-06'
    };
    
    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async generateSingleImage(itemId, itemName, category, foodDescription, backgroundDescription, options = {}) {
    const {
      model = 'standard',
      numberOfImages = model === 'ultra' ? 1 : 3,
      aspectRatio = '16:9'
    } = options;
    
    // Enhanced prompt with your inspiration style
    const styleEnhancement = `Professional restaurant food photography, shot with 85mm lens at f/2.8 from 3-4 feet distance. Shallow depth of field with creamy bokeh background. Clean, minimalist styling. Food takes 50-60% of frame for flexible cropping. Warm, natural lighting.`;
    const prompt = `${styleEnhancement} ${foodDescription} ${backgroundDescription}`;
    
    console.log(`🎨 Generating ${numberOfImages} image(s) for ${itemName} using ${model} model...`);
    console.log(`📝 Prompt: ${prompt.substring(0, 120)}...`);
    
    try {
      const modelName = this.models[model];
      
      const response = await this.ai.models.generateImages({
        model: modelName,
        prompt: prompt,
        config: {
          numberOfImages: numberOfImages,
          aspectRatio: aspectRatio,
          personGeneration: 'dont_allow'
        }
      });
      
      if (response.generatedImages && response.generatedImages.length > 0) {
        const savedFiles = [];
        
        // Create category folder
        const categoryFolder = category.toLowerCase().replace(/\s+/g, '-');
        const categoryPath = path.join(this.outputDir, categoryFolder);
        if (!fs.existsSync(categoryPath)) {
          fs.mkdirSync(categoryPath, { recursive: true });
        }

        response.generatedImages.forEach((imageData, index) => {
          const suffix = response.generatedImages.length > 1 ? `_v${index + 1}` : '';
          const filename = `${itemId}_${itemName.toLowerCase().replace(/[^a-z0-9]/g, '-')}${suffix}.png`;
          const filepath = path.join(categoryPath, filename);
          
          // Save the base64 image data
          if (imageData.image && imageData.image.imageBytes) {
            const buffer = Buffer.from(imageData.image.imageBytes, 'base64');
            fs.writeFileSync(filepath, buffer);
            console.log(`✅ Generated: ${categoryFolder}/${filename}`);
            savedFiles.push({ filename, filepath });
          }
        });
        
        return { success: true, files: savedFiles, count: savedFiles.length };
      }
      
      throw new Error('No image data received from API');
      
    } catch (error) {
      console.error(`❌ Failed to generate ${itemName}:`, error.message);
      return { success: false, error: error.message };
    }
  }

  async generateBatchByCategory(categoryName, maxImages = 4, options = {}) {
    console.log(`🍕 Generating images for category: ${categoryName}`);
    
    const menuItems = this.loadMenuItems();
    const categoryItems = menuItems.filter(item => item.category === categoryName);
    
    if (categoryItems.length === 0) {
      console.log(`❌ No items found for category: ${categoryName}`);
      return;
    }
    
    const batch = categoryItems.slice(0, maxImages);
    console.log(`📦 Processing ${batch.length} items from ${categoryName}...`);
    console.log(`🎛️ Using ${options.model || 'standard'} model with ${options.numberOfImages || '3'} variations each`);
    
    const results = [];
    for (const item of batch) {
      const result = await this.generateSingleImage(
        item.itemId,
        item.itemName,
        item.category,
        item.foodDescription,
        item.backgroundDescription,
        options
      );
      results.push({ ...item, ...result });
      
      // Add delay to respect rate limits
      const delay = options.model === 'ultra' ? 3000 : 2000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    const totalImages = results.reduce((sum, r) => sum + (r.count || 0), 0);
    console.log(`\n🎉 Batch complete for ${categoryName}:`);
    console.log(`✅ Success: ${results.filter(r => r.success).length} items`);
    console.log(`📸 Total images: ${totalImages}`);
    console.log(`❌ Failed: ${results.filter(r => !r.success).length}`);
    
    return results;
  }

  async generateAllImages(options = {}) {
    console.log('🚀 Starting full menu image generation...');
    
    const menuItems = this.loadMenuItems();
    const categories = [...new Set(menuItems.map(item => item.category))];
    
    console.log(`📋 Found ${categories.length} categories with ${menuItems.length} total items`);
    console.log(`🎛️ Using ${options.model || 'standard'} model`);
    
    const allResults = [];
    for (const category of categories) {
      console.log(`\n=== ${category} ===`);
      const results = await this.generateBatchByCategory(category, 999, options); // No limit
      allResults.push(...results);
      
      // Longer delay between categories
      console.log('⏱️  Waiting 5 seconds before next category...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    this.generateReport(allResults);
  }

  loadMenuItems() {
    try {
      const csvContent = fs.readFileSync(this.csvPath, 'utf-8');
      const lines = csvContent.split('\n').slice(1); // Skip header
      
      return lines
        .filter(line => line.trim())
        .map(line => {
          // Better CSV parsing using regex
          const match = line.match(/^([^,]+),([^,]+),([^,]+),"([^"]+)","([^"]*)",([^,]+),(.+)$/);
          if (match) {
            return {
              itemId: match[1],
              itemName: match[2], 
              category: match[3],
              foodDescription: match[4],
              backgroundDescription: match[5],
              aspectRatio: match[6],
              dimensions: match[7]
            };
          }
          return null;
        })
        .filter(Boolean);
    } catch (error) {
      console.error('❌ Error loading menu items:', error.message);
      return [];
    }
  }

  listCategories() {
    const menuItems = this.loadMenuItems();
    const categories = [...new Set(menuItems.map(item => item.category))];
    
    console.log('📋 Available categories:');
    categories.forEach((cat, index) => {
      const count = menuItems.filter(item => item.category === cat).length;
      console.log(`  ${index + 1}. ${cat} (${count} items)`);
    });
    
    return categories;
  }

  generateReport(results) {
    const report = {
      timestamp: new Date().toISOString(),
      total: results.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      categories: {}
    };
    
    // Group by category
    results.forEach(item => {
      if (!report.categories[item.category]) {
        report.categories[item.category] = { total: 0, successful: 0, failed: 0 };
      }
      report.categories[item.category].total++;
      if (item.success) {
        report.categories[item.category].successful++;
      } else {
        report.categories[item.category].failed++;
      }
    });
    
    const reportPath = path.join(this.outputDir, 'generation-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('\n📊 GENERATION REPORT');
    console.log('===================');
    console.log(`Total Images: ${report.total}`);
    console.log(`✅ Successful: ${report.successful}`);
    console.log(`❌ Failed: ${report.failed}`);
    console.log(`📁 Report saved: ${reportPath}`);
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🍕 Napoli Image Generator - Powered by Imagen 4

Usage:
  node scripts/imagen-generator.js <command> [options]

Commands:
  categories              List all available categories
  single <item_id> [options]  Generate single image by item ID  
  category <category> [count] [options]  Generate images for a category
  all [options]           Generate all menu images

Options:
  --model=standard|ultra  Choose Imagen model (default: standard)
  --count=1-4            Number of variations (1-4 for standard, 1 for ultra)
  --aspect=16:9|4:3|1:1  Aspect ratio (default: 16:9)
  
Environment:
  GOOGLE_API_KEY         Your Gemini API key (required)
  
Examples:
  node scripts/imagen-generator.js categories
  node scripts/imagen-generator.js single item_001 --model=standard --count=3
  node scripts/imagen-generator.js single item_001 --model=ultra --count=1
  node scripts/imagen-generator.js category "Appetizers" 4 --model=standard --count=2
  node scripts/imagen-generator.js category "Pizza" --model=ultra --count=1
  node scripts/imagen-generator.js all --model=standard --count=4
    `);
    return;
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error('❌ Error: GOOGLE_API_KEY environment variable is required');
    console.log('💡 Get your API key from: https://aistudio.google.com/app/apikey');
    return;
  }

  // Parse options
  const parseOptions = (args) => {
    const options = {};
    args.forEach(arg => {
      if (arg.startsWith('--model=')) {
        options.model = arg.split('=')[1];
      } else if (arg.startsWith('--count=')) {
        options.numberOfImages = parseInt(arg.split('=')[1]);
      } else if (arg.startsWith('--aspect=')) {
        options.aspectRatio = arg.split('=')[1];
      }
    });
    return options;
  };

  const generator = new NapoliImageGenerator(apiKey);
  const command = args[0];
  const options = parseOptions(args);

  // Validate model and count combination
  if (options.model === 'ultra' && options.numberOfImages > 1) {
    console.log('⚠️  Ultra model only supports 1 image. Setting count to 1.');
    options.numberOfImages = 1;
  }

  switch (command) {
    case 'categories':
      generator.listCategories();
      break;
      
    case 'single':
      if (args[1] && !args[1].startsWith('--')) {
        const menuItems = generator.loadMenuItems();
        const item = menuItems.find(i => i.itemId === args[1]);
        if (item) {
          await generator.generateSingleImage(
            item.itemId, item.itemName, item.category,
            item.foodDescription, item.backgroundDescription, options
          );
        } else {
          console.error(`❌ Item ${args[1]} not found`);
        }
      } else {
        console.error('❌ Please specify an item ID');
      }
      break;
      
    case 'category':
      if (args[1] && !args[1].startsWith('--')) {
        const maxImages = (args[2] && !args[2].startsWith('--')) ? parseInt(args[2]) : 4;
        await generator.generateBatchByCategory(args[1], maxImages, options);
      } else {
        console.error('❌ Please specify a category name');
      }
      break;
      
    case 'all':
      await generator.generateAllImages(options);
      break;
      
    default:
      console.error(`❌ Unknown command: ${command}`);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = NapoliImageGenerator;