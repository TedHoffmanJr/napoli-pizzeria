import { MenuCategory, MenuItem } from './menuData';

/**
 * Fetch menu data from database API
 */
export async function getMenuData(): Promise<MenuCategory[]> {
  try {
    const response = await fetch('/api/menu-direct');
    if (!response.ok) {
      throw new Error('Failed to fetch menu from database');
    }
    
    const data = await response.json();
    
    // The menu-direct API already returns the data in the correct format
    return data.categories;
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