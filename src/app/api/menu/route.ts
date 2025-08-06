import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import type { DbMenuCategory } from '@/lib/menuData';

export async function GET() {
  try {
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

    // Transform to match frontend interface
    const menuData: DbMenuCategory[] = categories.map(category => ({
      id: category.id,
      name: category.name,
      subtitle: category.subtitle,
      sharedOptions: category.sharedOptions,
      displayOrder: category.displayOrder,
      active: category.active,
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
    }));

    return NextResponse.json({ categories: menuData });
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu data' },
      { status: 500 }
    );
  }
}