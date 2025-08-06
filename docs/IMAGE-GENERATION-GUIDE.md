# 🎨 Napoli Image Generation Guide

## Overview
Professional food photography generation using Google's Imagen 4 API. All images are optimized for:
- **16:9 aspect ratio** (Toast POS compatible)
- **Professional restaurant quality**
- **Italian heritage backgrounds**
- **Consistent lighting and composition**

## Quick Setup

### 1. Get Your API Key
- Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
- Create a new API key
- Add to your environment:
```bash
# Add to .env.local (NEVER commit this!)
GOOGLE_API_KEY=your_api_key_here
```

### 2. Available Commands

```bash
# List all categories
npm run images:categories

# Generate single image
node scripts/imagen-generator.js single item_001

# Generate category (max 4 images)
node scripts/imagen-generator.js category "Appetizers"

# Generate specific count for category  
node scripts/imagen-generator.js category "Pizza" 2

# Generate ALL menu images (55 items)
npm run images:all
```

## Workflow Recommendations

### Phase 1: Test & Refine
1. **Generate 1 image**: `node scripts/imagen-generator.js single item_001`
2. **Review quality and style**
3. **Adjust prompts if needed** (edit the CSV)
4. **Iterate until perfect**

### Phase 2: Category-by-Category  
```bash
# Generate 4 appetizers
node scripts/imagen-generator.js category "Appetizers"

# Review results, then continue
node scripts/imagen-generator.js category "Pizza" 4
node scripts/imagen-generator.js category "Entrees" 4
# ... etc
```

### Phase 3: Full Generation
```bash
# Generate all 55 menu items
npm run images:all
```

## Image Specifications

### Technical Details
- **Aspect Ratio**: 16:9 (1920x1080)
- **Format**: High-quality JPEG
- **Distance**: 2-3 feet from food
- **Lens**: 85mm equivalent, f/2.8
- **Composition**: Food takes 60-70% of frame
- **Background**: Italian heritage elements in soft bokeh

### Background Elements
- Light gray walls
- Vintage Napoli travel poster (blurred)
- Classic Italian olive oil bottles on distant shelves
- Stainless steel counter surface
- Natural daylight from pizzeria windows

## Output Structure

```
public/
└── ai-images/
    ├── item_001_chicken-tenders.jpg
    ├── item_002_utica-greens.jpg
    ├── item_023_napolitana-thin-crust.jpg
    └── generation-report.json
```

## Cost Estimation

### Imagen 4 Pricing (2025)
- **Per Image**: ~$0.04
- **55 Menu Items**: ~$2.20 total
- **With Iterations**: Budget $5-10 for perfect results

### Rate Limits
- **Images per minute**: Varies by tier
- **Built-in delays**: 2 seconds between images, 5 seconds between categories
- **Batch generation**: Up to 4 images per request

## Troubleshooting

### Common Issues

**"API Error: 403"**
```bash
# Check your API key
echo $GOOGLE_API_KEY
```

**"No image data received"**
- API might be overloaded, try again in a few minutes
- Check your prompt isn't too complex

**"Rate limit exceeded"**
- Built-in delays should prevent this
- Wait 5-10 minutes and retry

**Poor image quality**
- Review the CSV prompts
- Add more specific details
- Adjust lighting/composition terms

### Manual Prompt Testing
Use the single image command to test prompt changes:
```bash
node scripts/imagen-generator.js single item_001
```

## Advanced Usage

### Custom Batch Sizes
```bash
# Generate 2 images for Pizza category
node scripts/imagen-generator.js category "Pizza" 2
```

### Specific Items
```bash
# Generate just the signature items
node scripts/imagen-generator.js single item_025  # Tomato Pie
node scripts/imagen-generator.js single item_030  # Margherita
node scripts/imagen-generator.js single item_033  # Utica Greens Pizza
```

### Report Analysis
After generation, check `public/ai-images/generation-report.json` for:
- Success/failure rates
- Category breakdowns
- Timestamps

## Integration with Website

Once generated, images automatically work with the menu system:
- `MenuImage` component handles fallbacks
- 16:9 aspect ratio fits perfectly in menu cards
- Professional quality enhances conversion rates

## Tips for Best Results

1. **Start small**: Generate 1-2 images first
2. **Review carefully**: Quality over quantity
3. **Iterate prompts**: Adjust CSV if needed
4. **Batch smartly**: 4 images per category works well
5. **Monitor costs**: Track API usage
6. **Test integration**: Verify images work in menu

---

**Ready to generate professional food photography for Napoli Pizzeria! 🍕**