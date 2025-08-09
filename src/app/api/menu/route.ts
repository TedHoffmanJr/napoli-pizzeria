import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export async function GET() {
  try {
    console.log('Starting menu API request...');
    console.log('DATABASE_URL configured:', !!process.env.DATABASE_URL);
    console.log('Environment:', process.env.NODE_ENV);
    
    const categories = await prisma.menuCategory.findMany({
      where: { active: true },
      include: {
        items: {
          where: { available: true },
          include: {
            variants: true,
            images: true,
          },
          orderBy: { displayOrder: 'asc' },
        },
      },
      orderBy: { displayOrder: 'asc' },
    });

    // Get category info (dressings, sauces, etc.)
    const categoryInfo = await prisma.categoryInfo.findMany({
      orderBy: { categoryId: 'asc' },
    });

    // Transform to match frontend interface
    const menuData = categories.map(category => {
      // Get category info for this category
      const catInfo = categoryInfo.filter(info => info.categoryId === category.id);
      
      return {
        id: category.id,
        name: category.name,
        subtitle: category.subtitle,
        sharedOptions: category.sharedOptions,
        displayOrder: category.displayOrder,
        active: category.active,
        categoryInfo: catInfo.map(info => ({
          id: info.id,
          categoryId: info.categoryId,
          infoType: info.infoType,
          infoText: info.infoText,
        })),
        items: category.items.map(item => ({
          id: item.id,
          categoryId: item.categoryId,
          name: item.name,
          italianName: item.italianName,
          description: item.description,
          basePrice: Number(item.basePrice),
          displayOrder: item.displayOrder,
          featured: item.featured,
          available: item.available,
          category: {
            id: category.id,
            name: category.name,
            subtitle: category.subtitle,
            sharedOptions: category.sharedOptions,
            displayOrder: category.displayOrder,
            active: category.active,
            items: [], // Avoid circular reference
          },
          variants: item.variants.map(variant => ({
            id: variant.id,
            itemId: variant.itemId,
            variantName: variant.variantName,
            priceModifier: Number(variant.priceModifier),
          })),
          images: item.images.map(image => ({
            id: image.id,
            itemId: image.itemId,
            imageUrl: image.imageUrl,
            altText: image.altText,
            isPrimary: image.isPrimary,
          })),
        })),
      };
    });

    return NextResponse.json({ categories: menuData });
  } catch (error) {
    console.error('Error fetching menu:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { 
        error: 'Failed to fetch menu data',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}