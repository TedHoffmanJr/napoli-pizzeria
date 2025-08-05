// Menu item image mapping - maps menu item IDs to actual image filenames
const menuImageMap: Record<string, string> = {
  // Items with actual photos
  'item_015': 'chicken-parmigiana.jpg', // Chicken Parmigiana
  'item_032': 'pizza-cheese.jpg', // Napolitana - Thin Crust
  'item_039': 'pizza-margherita.jpg', // Margherita Pizza  
  'item_043': 'pizza-grandmas.jpg', // Grandma's Pizza
  'item_034': 'tomato-pie.jpg', // Napoli's Homemade Tomato Pie
  'item_042': 'pizza-utica-greens.jpg', // Utica Greens Pizza
  'item_046': 'stromboli.jpg', // Stromboli
  // Add pepperoni pizza variants
  'item_035': 'pizza-pepperoni.jpg', // Chicken Wing Pizza (use pepperoni as fallback)
  'item_036': 'pizza-pepperoni-sausage.jpg', // Chicken Bacon Ranch Pizza
};

// Fallback images for categories when no specific image exists
const categoryFallbacks: Record<string, string> = {
  'Pizza': 'pizza-margherita.jpg',
  'Specialty Pizza': 'pizza-grandmas.jpg', 
  'Entrees': 'chicken-parmigiana.jpg',
  'Hot Subs': 'stromboli.jpg',
  'Cold Subs': 'stromboli.jpg',
  'Specialty Items': 'stromboli.jpg',
  'Baked Dishes': 'chicken-parmigiana.jpg',
  'Appetizers': 'pizza-cheese.jpg',
  'Wings': 'pizza-pepperoni.jpg',
  'Salads': 'pizza-margherita.jpg',
  'Beverages': 'pizza-cheese.jpg',
  'Desserts': 'pizza-cheese.jpg',
};

// Get the correct image path for a menu item
export function getMenuItemImage(itemId: string, itemName: string, category: string): string {
  // Check if we have a specific image for this item
  if (menuImageMap[itemId]) {
    return `/menuPics/${menuImageMap[itemId]}`;
  }
  
  // Try to match by name patterns for common items
  const lowerName = itemName.toLowerCase();
  
  if (lowerName.includes('chicken parm')) {
    return '/menuPics/chicken-parmigiana.jpg';
  }
  if (lowerName.includes('margherita')) {
    return '/menuPics/pizza-margherita.jpg';
  }
  if (lowerName.includes('grandma')) {
    return '/menuPics/pizza-grandmas.jpg';
  }
  if (lowerName.includes('utica greens')) {
    return '/menuPics/pizza-utica-greens.jpg';
  }
  if (lowerName.includes('tomato pie')) {
    return '/menuPics/tomato-pie.jpg';
  }
  if (lowerName.includes('stromboli')) {
    return '/menuPics/stromboli.jpg';
  }
  if (lowerName.includes('pepperoni') && lowerName.includes('sausage')) {
    return '/menuPics/pizza-pepperoni-sausage.jpg';
  }
  if (lowerName.includes('pepperoni')) {
    return '/menuPics/pizza-pepperoni.jpg';
  }
  if (lowerName.includes('cheese') && category.includes('Pizza')) {
    return '/menuPics/pizza-cheese.jpg';
  }
  
  // Fall back to category-based image
  if (categoryFallbacks[category]) {
    return `/menuPics/${categoryFallbacks[category]}`;
  }
  
  // Final fallback
  return '/menuPics/pizza-margherita.jpg';
}

// Get all available menu images for fallback rotation
export function getAvailableMenuImages(): string[] {
  return [
    '/menuPics/pizza-margherita.jpg',
    '/menuPics/pizza-cheese.jpg', 
    '/menuPics/chicken-parmigiana.jpg',
    '/menuPics/pizza-grandmas.jpg',
    '/menuPics/stromboli.jpg',
    '/menuPics/tomato-pie.jpg',
    '/menuPics/pizza-pepperoni.jpg',
    '/menuPics/pizza-utica-greens.jpg',
    '/menuPics/pizza-pepperoni-sausage.jpg',
  ];
}