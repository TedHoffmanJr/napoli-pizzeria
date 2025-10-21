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
      .from('menu_categories')
      .select('count')
      .limit(1);
      
    if (testError) {
      console.error('Supabase connection test failed:', testError);
      throw testError;
    }
    
    console.log('Connection test passed, fetching categories...');

    // Fetch categories with items
    const { data: categories, error: categoriesError } = await supabase
      .from('menu_categories')
      .select(`
        *,
        items:menu_items(*,
          variants:item_variants(*),
          images:item_images(*)
        )
      `)
      .eq('active', true)
      .order('display_order');

    if (categoriesError) {
      throw categoriesError;
    }

    console.log('Categories fetched:', categories?.length);

    // Fetch category info
    const { data: categoryInfo, error: infoError } = await supabase
      .from('category_info')
      .select('*')
      .order('category_id');

    if (infoError) {
      throw infoError;
    }

    console.log('Category info fetched:', categoryInfo?.length);

    // Transform the data to match your frontend format
    const menuData = categories?.map(category => ({
      name: category.name,
      subtitle: category.subtitle,
      shared_options: category.shared_options,
      display_order: category.display_order,
      categoryInfo: categoryInfo?.filter((info: any) => info.category_id === category.id).map((info: any) => ({
        id: info.id,
        infoType: info.info_type,
        infoText: info.info_text
      })) || [],
      items: (category.items || [])
        .filter((item: any) => item.available)
        .sort((a: any, b: any) => a.display_order - b.display_order)
        .map((item: any) => ({
          id: item.id.toString(),
          name: item.name,
          italian_name: item.italian_name,
          description: item.description,
          specialNotice: item.special_notice,
          category: category.name,
          base_price: Number(item.base_price),
          size_variants: (item.variants || []).reduce((acc: any, variant: any) => {
            acc[variant.variant_name] = Number(variant.price_modifier);
            return acc;
          }, {}),
          images: (item.images || []).map((image: any) => image.image_url),
          available: item.available,
          featured: item.featured,
          display_order: item.display_order,
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