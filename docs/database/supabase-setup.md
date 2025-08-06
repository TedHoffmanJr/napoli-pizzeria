# Supabase Database Setup Guide

## ✅ Your Database Schema is Already Supabase-Ready!

Your Prisma schema in `prisma/schema.prisma` is **fully compatible** with Supabase PostgreSQL. No changes needed!

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization (create one if needed)
4. Project settings:
   - **Name**: `napoli-pizzeria`
   - **Database Password**: Generate strong password (save this!)
   - **Region**: US East (closest to your users)
   - **Pricing**: Start with Free tier

## Step 2: Get Connection String

1. In your Supabase project dashboard
2. Go to **Settings** → **Database**
3. Scroll down to **Connection string**
4. Select **URI** tab
5. Copy the connection string (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
   ```

## Step 3: Configure Environment

Create `.env.local` file in project root:

```bash
# Database Configuration
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres"

# Menu Data Source (start with false, switch to true after migration)
NEXT_PUBLIC_USE_DATABASE=false

# Resend Email (already configured)
RESEND_API_KEY="re_XVS4D1HP_7LBC13LJH9vzFk81WwDr6g34"
```

## Step 4: Install Dependencies & Run Migration

```bash
# Install new database dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push schema to Supabase (creates tables)
npm run db:push

# Seed with your menu data
npm run db:seed
```

## Step 5: Verify Database

1. In Supabase dashboard → **Table Editor**
2. You should see:
   - `menu_categories` (12 categories)
   - `menu_items` (55+ items)  
   - `item_variants` (size options)
   - `item_images` (empty for now)

## Step 6: Switch to Database Mode

In `.env.local`, change:
```bash
NEXT_PUBLIC_USE_DATABASE=true
```

Restart dev server:
```bash
npm run dev
```

Your menu will now load from Supabase! 🚀

## Rollback Plan

If anything goes wrong, instantly revert:
```bash
NEXT_PUBLIC_USE_DATABASE=false
```

Site returns to static menu immediately.

## Benefits After Migration

✅ **Real-time Updates**: Change prices without code deployment
✅ **Category Management**: Update shared info (sauces, toppings) in one place  
✅ **Admin Panel Ready**: Foundation for Mike to manage menu
✅ **Analytics Ready**: Track popular items, A/B test descriptions
✅ **Seasonal Menus**: Easy to add/remove items

## Next: Admin Panel Development

Once database is live, we can build:
- Menu management interface (`/admin/menu`)
- Photo upload system
- Price bulk update tools  
- Analytics dashboard

**Estimated setup time: 15-20 minutes**