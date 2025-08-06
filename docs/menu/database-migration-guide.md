# Database Migration Guide

## Current Status: ✅ Ready for Database Migration

Your menu system is now **database-ready** with backward compatibility. You can switch between static and database sources with a single environment variable.

## Migration Steps

### 1. Choose Database Provider

**Recommended: Vercel Postgres** (easiest for deployment)
```bash
# In Vercel dashboard, add Postgres addon
# Copy connection string to .env.local
```

**Alternative: Supabase** (great free tier)
```bash
# Create project at supabase.com
# Copy PostgreSQL connection string
```

### 2. Set Up Environment
```bash
# Copy example file
cp .env.local.example .env.local

# Add your database URL
DATABASE_URL="your_database_connection_string"
```

### 3. Install Dependencies & Generate Client
```bash
npm install
npm run db:generate
```

### 4. Create Database & Seed Data
```bash
# Push schema to database
npm run db:push

# Import your menu data
npm run db:seed
```

### 5. Switch to Database Mode
```bash
# In .env.local, change to:
NEXT_PUBLIC_USE_DATABASE=true
```

### 6. Test Migration
```bash
npm run dev
# Verify menu loads from database
```

## Enhanced Features Available After Migration

### Category Management
- **Shared Information**: Dressing choices, wing sauces, pizza toppings
- **Subtitles**: "Choice of Dressing", "Available Sauces"
- **Clean Descriptions**: No more repetitive text

### Mike's Admin Panel (Future)
```
/admin/menu
├── Categories (with shared options)
├── Menu Items (clean editing)
├── Pricing (bulk updates)
├── Images (photo management)
└── Availability (toggle items on/off)
```

## Rollback Plan
If issues arise, simply change:
```bash
NEXT_PUBLIC_USE_DATABASE=false
```
Site will instantly revert to static menu data.

## Database Schema Summary

```sql
menu_categories
├── id, name, subtitle, shared_options
├── display_order, active
└── created_at, updated_at

menu_items  
├── id, category_id, name, italian_name
├── description, base_price
├── display_order, featured, available
└── created_at, updated_at

item_variants
├── id, item_id, variant_name
└── price_modifier

item_images
├── id, item_id, image_url
├── alt_text, is_primary
```

## Benefits After Migration

✅ **Immediate Updates**: Price changes without code deployment
✅ **Better Organization**: Category-level shared information  
✅ **Future Admin Panel**: Mike can manage menu himself
✅ **Seasonal Menus**: Easy to add/remove items
✅ **Analytics Ready**: Track popular items, pricing experiments
✅ **POS Integration**: Ready for future restaurant POS systems

## Next Steps After Migration

1. **Admin Panel Development** (~8 hours)
2. **Image Upload System** (~4 hours)  
3. **Menu Analytics Dashboard** (~6 hours)
4. **Seasonal Menu Templates** (~3 hours)

The foundation is built - migration takes ~30 minutes!