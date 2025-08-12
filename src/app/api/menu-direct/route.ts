/* eslint-disable @typescript-eslint/no-explicit-any */
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

    console.log('Supabase client created, testing connection...');
    
    // Test basic connectivity
    const { error: testError } = await supabase
      .from('MenuCategory')
      .select('count')
      .limit(1);
      
    if (testError) {
      console.error('Supabase connection test failed:', testError);
      throw testError;
    }
    
    console.log('Connection test passed, fetching categories...');

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
      categoryInfo: categoryInfo?.filter((info: any) => info.categoryId === category.id) || [],
      items: (category.items || [])
        .filter((item: any) => item.available)
        .sort((a: any, b: any) => a.displayOrder - b.displayOrder)
        .map((item: any) => ({
          id: item.id,
          categoryId: item.categoryId,
          name: item.name,
          italianName: item.italianName,
          description: item.description,
          basePrice: Number(item.basePrice),
          displayOrder: item.displayOrder,
          featured: item.featured,
          available: item.available,
          variants: (item.variants || []).map((variant: any) => ({
            id: variant.id,
            itemId: variant.itemId,
            variantName: variant.variantName,
            priceModifier: Number(variant.priceModifier),
          })),
          images: (item.images || []).map((image: any) => ({
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
    
    // Better error serialization
    let errorMessage = 'Unknown error';
    let errorDetails = {};
    
    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = {
        name: error.name,
        message: error.message,
        stack: error.stack
      };
    } else if (typeof error === 'object' && error !== null) {
      errorMessage = JSON.stringify(error);
      errorDetails = error;
    } else {
      errorMessage = String(error);
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      details: {
        ...errorDetails,
        method: 'supabase-direct'
      },
      environment: {
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        supabaseUrlPrefix: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
      }
    }, { status: 500 });
  }
}