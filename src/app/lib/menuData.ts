export interface MenuItem {
  id: string;
  name: string;
  italian_name?: string;
  description?: string;
  specialNotice?: string;
  badge?: string;
  category: string;
  base_price: number;
  size_variants: Record<string, number>;
  images: string[];
  available: boolean;
  featured: boolean;
  display_order: number;
}

export interface MenuCategory {
  name: string;
  subtitle?: string;        // "Choice of Dressing", "Available Sauces"
  shared_options?: string;  // Common options shared across category items
  display_order: number;
  categoryInfo?: CategoryInfo[];
  items: MenuItem[];
}

export interface CategoryInfo {
  id: number;
  infoType: string;  // "dressings", "sauces", "toppings", etc.
  infoText: string;
}

// Database-compatible interfaces
export interface DbMenuItem {
  id: number;
  categoryId: number;
  name: string;
  italianName?: string;
  description?: string;
  specialNotice?: string;
  badge?: string;
  basePrice: number;
  displayOrder: number;
  featured: boolean;
  available: boolean;
  category: DbMenuCategory;
  variants: ItemVariant[];
  images: ItemImage[];
}

export interface DbMenuCategory {
  id: number;
  name: string;
  subtitle?: string;
  sharedOptions?: string;
  displayOrder: number;
  active: boolean;
  items: DbMenuItem[];
}

export interface ItemVariant {
  id: number;
  menuItemId: number;
  variantName: string;
  priceModifier: number;
}

export interface ItemImage {
  id: number;
  menuItemId: number;
  imageUrl: string;
  displayOrder: number;
}

// Format price
export function formatPrice(price: number): string {
  if (price === 0) return "Call for Pricing";
  return `$${price.toFixed(2)}`;
}

// Get size variants as formatted string
export function getSizeVariantsString(sizeVariants: Record<string, number>): string {
  if (Object.keys(sizeVariants).length === 0) return "";
  
  const variants = Object.entries(sizeVariants)
    .map(([size, price]) => {
      if (price === 0) return `${size}: Call for pricing`;
      return `${size}: ${formatPrice(price)}`;
    })
    .join(", ");
  
  return variants;
}