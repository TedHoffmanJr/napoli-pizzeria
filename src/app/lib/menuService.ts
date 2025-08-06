import { MenuCategory, MenuItem, DbMenuCategory, DbMenuItem } from './menuData';
import { getMenuData as getStaticMenuData } from './menuData';

// Environment flag to switch between static and database
const USE_DATABASE = process.env.NEXT_PUBLIC_USE_DATABASE === 'true';

/**
 * Unified menu service that can switch between static and database sources
 */
export async function getMenuData(): Promise<MenuCategory[]> {
  if (USE_DATABASE) {
    return getMenuFromDatabase();
  } else {
    return getStaticMenuData();
  }
}

/**
 * Fetch menu data from database API
 */
async function getMenuFromDatabase(): Promise<MenuCategory[]> {
  try {
    const response = await fetch('/api/menu');
    if (!response.ok) {
      throw new Error('Failed to fetch menu from database');
    }
    
    const { categories } = await response.json();
    
    // Transform database format to frontend format
    return categories.map((dbCategory: DbMenuCategory): MenuCategory => ({
      name: dbCategory.name,
      subtitle: dbCategory.subtitle,
      shared_options: dbCategory.sharedOptions,
      display_order: dbCategory.displayOrder,
      items: dbCategory.items.map((dbItem: DbMenuItem): MenuItem => ({
        id: dbItem.id.toString(),
        name: dbItem.name,
        italian_name: dbItem.italianName,
        description: dbItem.description,
        category: dbCategory.name,
        base_price: dbItem.basePrice,
        size_variants: dbItem.variants.reduce((acc, variant) => {
          acc[variant.variantName] = variant.priceModifier;
          return acc;
        }, {} as Record<string, number>),
        images: dbItem.images.map(img => img.imageUrl),
        available: dbItem.available,
        featured: dbItem.featured,
        display_order: dbItem.displayOrder,
      })),
    }));
  } catch (error) {
    console.error('Database menu fetch failed, falling back to static data:', error);
    return getStaticMenuData();
  }
}

/**
 * Get featured items
 */
export async function getFeaturedItems(): Promise<MenuItem[]> {
  const menuData = await getMenuData();
  return menuData
    .flatMap(category => category.items)
    .filter(item => item.featured)
    .sort((a, b) => a.display_order - b.display_order);
}

/**
 * Get items by category
 */
export async function getItemsByCategory(categoryName: string): Promise<MenuItem[]> {
  const menuData = await getMenuData();
  const category = menuData.find(cat => cat.name === categoryName);
  return category?.items || [];
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<string[]> {
  const menuData = await getMenuData();
  return menuData.map(category => category.name);
}