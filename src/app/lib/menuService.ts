import { MenuCategory, MenuItem } from './menuData';

// Database response types
interface DbVariant {
  variantName: string;
  priceModifier: number;
}

interface DbImage {
  imageUrl: string;
}

interface DbMenuItem {
  id: number;
  name: string;
  italianName?: string;
  description: string;
  basePrice: number;
  variants: DbVariant[];
  images: DbImage[];
  available: boolean;
  featured: boolean;
  displayOrder: number;
}

interface DbCategoryInfo {
  id: number;
  infoType: string;
  infoText: string;
}

interface DbMenuCategory {
  name: string;
  subtitle?: string;
  sharedOptions?: string;
  displayOrder: number;
  categoryInfo: DbCategoryInfo[];
  items: DbMenuItem[];
}

/**
 * Fetch menu data from database API
 */
export async function getMenuData(): Promise<MenuCategory[]> {
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
      categoryInfo: dbCategory.categoryInfo,
      items: dbCategory.items.map((dbItem: DbMenuItem): MenuItem => ({
        id: dbItem.id.toString(),
        name: dbItem.name,
        italian_name: dbItem.italianName,
        description: dbItem.description,
        category: dbCategory.name,
        base_price: dbItem.basePrice,
        size_variants: dbItem.variants.reduce((acc: Record<string, number>, variant: DbVariant) => {
          acc[variant.variantName] = variant.priceModifier;
          return acc;
        }, {} as Record<string, number>),
        images: dbItem.images.map((img: DbImage) => img.imageUrl),
        available: dbItem.available,
        featured: dbItem.featured,
        display_order: dbItem.displayOrder,
      })),
    }));
  } catch (error) {
    console.error('Database menu fetch failed:', error);
    throw error;
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