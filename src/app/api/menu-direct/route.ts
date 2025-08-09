import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    console.log('Testing direct Supabase connection...');
    
    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    console.log('Supabase client created, fetching categories...');

    // Fetch categories with items
    const { data: categories, error: categoriesError } = await supabase
      .from('MenuCategory')
      .select(`
        *,
        items:MenuItem(*,
          variants:ItemVariant(*),
          images:ItemImage(*)
        )
      `)
      .eq('active', true)
      .order('displayOrder');

    if (categoriesError) {
      throw categoriesError;
    }

    console.log('Categories fetched:', categories?.length);

    // Fetch category info
    const { data: categoryInfo, error: infoError } = await supabase
      .from('CategoryInfo')
      .select('*')
      .order('categoryId');

    if (infoError) {
      throw infoError;
    }

    console.log('Category info fetched:', categoryInfo?.length);

    // Transform the data to match your frontend format
    const menuData = categories?.map(category => ({
      id: category.id,
      name: category.name,
      subtitle: category.subtitle,
      sharedOptions: category.sharedOptions,
      displayOrder: category.displayOrder,
      active: category.active,
      categoryInfo: categoryInfo?.filter(info => info.categoryId === category.id) || [],
      items: (category.items || [])
        .filter(item => item.available)
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map(item => ({
          id: item.id,
          categoryId: item.categoryId,
          name: item.name,
          italianName: item.italianName,
          description: item.description,
          basePrice: Number(item.basePrice),
          displayOrder: item.displayOrder,
          featured: item.featured,
          available: item.available,
          variants: (item.variants || []).map(variant => ({
            id: variant.id,
            itemId: variant.itemId,
            variantName: variant.variantName,
            priceModifier: Number(variant.priceModifier),
          })),
          images: (item.images || []).map(image => ({
            id: image.id,
            itemId: image.itemId,
            imageUrl: image.imageUrl,
            altText: image.altText,
            isPrimary: image.isPrimary,
          })),
        }))
    })) || [];

    console.log('Transformed data:', menuData.length, 'categories');

    return NextResponse.json({ 
      success: true,
      categories: menuData,
      method: 'supabase-direct'
    });

  } catch (error) {
    console.error('Direct Supabase fetch failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      details: {
        name: error instanceof Error ? error.name : 'Unknown',
        method: 'supabase-direct'
      },
      environment: {
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      }
    }, { status: 500 });
  }
}