# 🔑 Google Gemini API Key Setup

## Step 1: Get Your API Key

1. Go to **[Google AI Studio](https://aistudio.google.com/app/apikey)**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated key (starts with `AIza...`)

## Step 2: Set Up Environment Variable

### Option A: Add to .env.local (Recommended)
```bash
# Create or edit .env.local file in your project root
GOOGLE_API_KEY=your_api_key_here
```

### Option B: Set Windows Environment Variable
```cmd
# In Command Prompt (temporary for session)
set GOOGLE_API_KEY=your_api_key_here

# Or PowerShell (temporary for session)  
$env:GOOGLE_API_KEY="your_api_key_here"
```

### Option C: Set Permanent Windows Environment Variable
1. Press `Win + R`, type `sysdm.cpl`, press Enter
2. Click **"Environment Variables"**
3. Under **"User variables"**, click **"New"**
4. Variable name: `GOOGLE_API_KEY`
5. Variable value: `your_api_key_here`
6. Click **"OK"** and restart Command Prompt

## Step 3: Verify Setup

```bash
# Test if key is accessible
cd "C:\Dev Projects\napoli"
node -e "console.log('API Key:', process.env.GOOGLE_API_KEY ? 'Set ✅' : 'Missing ❌')"
```

## Step 4: Test Image Generation

```bash
# Generate a single test image
node scripts/imagen-generator.js single item_001 --model=standard --count=1
```

## ⚠️ Important Security Notes

1. **NEVER commit your API key to Git**
2. **Keep .env.local in .gitignore** (already done)
3. **Don't share your key publicly**
4. **Monitor your API usage** at Google AI Studio

## 💰 Cost Information

- **Imagen 3**: ~$0.04 per image
- **55 menu items**: ~$2.20 total (1 image each)
- **With variations**: ~$6.60 total (3 images each)
- **Free tier**: Limited usage available

## 🆘 Troubleshooting

**"API Error: 403"**
- Check your API key is correct
- Verify billing is set up in Google Cloud Console

**"Command not found"** 
- Make sure you're in the project directory: `cd "C:\Dev Projects\napoli"`

**"API Key not found"**
- Restart your terminal after setting environment variables
- Double-check the variable name: `GOOGLE_API_KEY`

## ✅ You're Ready!

Once your API key is set up, you can generate images by category:

```bash
# List all categories
node scripts/imagen-generator.js categories

# Generate appetizers (2 variations each)
node scripts/imagen-generator.js category "Appetizers" 6 --model=standard --count=2

# Generate pizza items (1 high-quality each)  
node scripts/imagen-generator.js category "Pizza" --model=ultra --count=1
```

Images will be saved in organized folders:
- `public/ai-images/appetizers/`
- `public/ai-images/pizza/`
- `public/ai-images/specialty-pizza/`
- etc.