# Database Migration Checklist

## ✅ Pre-Migration Setup Complete

- [x] **Prisma schema** configured for Supabase PostgreSQL
- [x] **Seed script** ready with enhanced menu data  
- [x] **API routes** created (`/api/menu`)
- [x] **Environment toggle** system implemented
- [x] **Email routing** updated to ted@growwithagp.com
- [x] **Photo prompts** generated with consistent backgrounds

## 🚀 Migration Process

### Phase 1: Supabase Setup (5 minutes)
- [ ] Create Supabase project at supabase.com
- [ ] Copy PostgreSQL connection string
- [ ] Update `.env.local` with DATABASE_URL
- [ ] Verify connection string format

### Phase 2: Database Migration (5 minutes)  
- [ ] Run automated migration script: `node scripts/migrate-to-database.js`
  - Installs dependencies
  - Generates Prisma client  
  - Creates database tables
  - Imports menu data
  - Updates environment to use database

### Phase 3: Verification (5 minutes)
- [ ] Restart dev server: `npm run dev`
- [ ] Verify menu loads from database
- [ ] Check Supabase Table Editor shows data:
  - `menu_categories`: 12 rows
  - `menu_items`: 55+ rows
  - `item_variants`: Size options
- [ ] Test category subtitles display (salad dressings, wing sauces, etc.)
- [ ] Verify featured items work
- [ ] Test form submissions go to ted@growwithagp.com

### Phase 4: Photo Generation (Optional)
- [ ] Use prompts from `docs/menu/consolidated-photo-prompts.md`
- [ ] Generate 57 professional food photos
- [ ] Upload to `/public/menuPics/`
- [ ] Update image mapping in database

## 🎯 Success Criteria

✅ **Menu loads from Supabase database**
✅ **Category subtitles display properly**  
✅ **Shared options shown (dressings, sauces, toppings)**
✅ **Featured items highlight correctly**
✅ **Forms email to ted@growwithagp.com**
✅ **Site performance unchanged**

## 🔄 Rollback Plan

If any issues occur:
1. Change `.env.local`: `NEXT_PUBLIC_USE_DATABASE=false`
2. Restart dev server
3. Site instantly reverts to static data

## 📈 Benefits After Migration

✅ **Real-time Menu Updates**: Change prices/descriptions without code deployment
✅ **Category Management**: Update shared info (wing sauces, pizza toppings) once
✅ **Admin Panel Foundation**: Ready for Mike's self-service menu management
✅ **Analytics Capability**: Track popular items, test different descriptions
✅ **Seasonal Menus**: Easy to add/remove items for holidays or specials
✅ **Future POS Integration**: Ready to connect with restaurant point-of-sale systems

## 🛠️ Future Development Options

**Immediate (1-2 weeks):**
- Admin panel for menu management
- Photo upload system
- Bulk pricing tools

**Medium-term (1-2 months):**
- Menu analytics dashboard
- A/B testing for descriptions
- Seasonal menu templates

**Long-term (3-6 months):**  
- Customer favorites tracking
- Integration with ordering systems
- Multi-location menu management

## 📞 Support

Questions about migration? Check:
- `docs/database/supabase-setup.md` - Detailed setup guide
- `docs/menu/consolidated-photo-prompts.md` - Photo generation
- Supabase documentation at docs.supabase.com

**Total estimated time: 15-20 minutes** 🚀