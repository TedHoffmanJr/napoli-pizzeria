export interface MenuItem {
  id: string;
  name: string;
  italian_name?: string;
  description?: string;
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
  items: MenuItem[];
}

// Database-compatible interfaces (for future migration)
export interface DbMenuItem {
  id: number;
  categoryId: number;
  name: string;
  italianName?: string;
  description?: string;
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
  itemId: number;
  variantName: string;
  priceModifier: number;
}

export interface ItemImage {
  id: number;
  itemId: number;
  imageUrl: string;
  altText?: string;
  isPrimary: boolean;
}

// Raw menu data from CSV
const rawMenuData: MenuItem[] = [
  {
    id: "item_001", name: "Chicken Tenders", italian_name: "", description: "Chicken Tenders (5-6) Choice of Sauce", category: "Appetizers", base_price: 9.99, size_variants: {}, images: [], available: true, featured: false, display_order: 1
  },
  {
    id: "item_002", name: "Utica Greens", italian_name: "", description: "Pancetta - Hot Cherry Peppers - Salami Greens", category: "Appetizers", base_price: 10.99, size_variants: {}, images: [], available: true, featured: false, display_order: 2
  },
  {
    id: "item_003", name: "Arancini", italian_name: "Arancini", description: "With Marinara Sauce", category: "Appetizers", base_price: 9.99, size_variants: {}, images: [], available: true, featured: false, display_order: 3
  },
  {
    id: "item_004", name: "Garlic Bread", italian_name: "", description: "Add Cheese - .50", category: "Appetizers", base_price: 2.75, size_variants: {}, images: [], available: true, featured: false, display_order: 4
  },
  {
    id: "item_005", name: "Buffalo Style Wings", italian_name: "", description: "Mild - Medium - Hot - Honey BBQ - Garlic Butter. Split orders 1.25. All orders come with Blue Cheese. Extra Blue Cheese .75", category: "Wings", base_price: 13.99, size_variants: {"10pc": 13.99, "20pc": 26.99, "50pc": 39.99}, images: [], available: true, featured: false, display_order: 5
  },
  {
    id: "item_006", name: "Boneless Wings", italian_name: "", description: "Mild - Medium - Hot - Honey BBQ - Garlic Butter. Split orders 1.25. All orders come with Blue Cheese. Extra Blue Cheese .75", category: "Wings", base_price: 14, size_variants: {"10pc": 14.00, "20pc": 26.00}, images: [], available: true, featured: false, display_order: 6
  },
  {
    id: "item_007", name: "Tossed Salad", italian_name: "", description: "Dressings: House Italian Vinaigrette - Ranch - Blue Cheese. Iceberg Lettuce - Olives - Roasted Red Peppers - Cucumbers - Cherry Tomatoes - Croutons", category: "Salads", base_price: 7.99, size_variants: {}, images: [], available: true, featured: false, display_order: 7
  },
  {
    id: "item_008", name: "Antipasto", italian_name: "Antipasto", description: "Iceberg Lettuce - Olives - Cherry Tomatoes - Roasted Red Peppers - Fresh Mozzarella - Banana Peppers - Ham - Salami - Provolone Cheese", category: "Salads", base_price: 14.99, size_variants: {}, images: [], available: true, featured: false, display_order: 8
  },
  {
    id: "item_009", name: "Caprese", italian_name: "Caprese", description: "Fresh Mozzarella Cubed and Layered with Cherry Tomatoes - Fresh Basil Leaves - Topped off with a Drizzle of Balsamic Glaze - Extra Virgin Olive Oil and Pecorino Romano Cheese", category: "Salads", base_price: 8.99, size_variants: {}, images: [], available: true, featured: false, display_order: 9
  },
  {
    id: "item_010", name: "Grilled Chicken", italian_name: "", description: "A 6oz Piece of Chicken on Top of a Bed of Iceberg Lettuce Garnished with Cherry Tomatoes - Cucumbers - Kalamata Olives", category: "Salads", base_price: 10.99, size_variants: {}, images: [], available: true, featured: false, display_order: 10
  },
  {
    id: "item_011", name: "Soda", italian_name: "", description: "Proudly Serving Coca-Cola Products", category: "Beverages", base_price: 0, size_variants: {"20 oz": 0.00, "2 Liter": 0.00}, images: [], available: true, featured: false, display_order: 11
  },
  {
    id: "item_012", name: "Bottled Water", italian_name: "", description: "Bottled Water", category: "Beverages", base_price: 0, size_variants: {}, images: [], available: true, featured: false, display_order: 12
  },
  {
    id: "item_013", name: "Assorted Juices", italian_name: "", description: "Assorted Juices", category: "Beverages", base_price: 0, size_variants: {}, images: [], available: true, featured: false, display_order: 13
  },
  {
    id: "item_014", name: "Spaghetti or Mezzi Rigatoni Pasta", italian_name: "Spaghetti o Mezzi Rigatoni", description: "A Classic Favorite - A Generous Portion of Rummo Pasta cooked Al Dente with marinara sauce. Add Two Housemade Meatballs or Sausage Links 3.00. (Gluten Free Pasta) Served with 2 Garlic Knots", category: "Entrees", base_price: 13.99, size_variants: {}, images: [], available: true, featured: false, display_order: 14
  },
  {
    id: "item_015", name: "Chicken Parmigiana", italian_name: "Pollo Parmigiana", description: "Freshly Breaded Chicken Breast Served over Spaghetti or Rigatoni Pasta with Mozzarella Cheese", category: "Entrees", base_price: 16.99, size_variants: {}, images: [], available: true, featured: false, display_order: 15
  },
  {
    id: "item_016", name: "Eggplant Parmigiana", italian_name: "Melanzane Parmigiana", description: "Thinly Sliced Eggplant layered with Marinara - Mozzarella Baked to Perfection over Spaghetti or Rigatoni Pasta", category: "Entrees", base_price: 16.99, size_variants: {}, images: [], available: true, featured: false, display_order: 16
  },
  {
    id: "item_017", name: "Chicken & Greens", italian_name: "Pollo e Verdure", description: "Freshly Prepared Chicken Breast Sauteed Golden Brown Topped off with a slice of Ham - Provolone Cheese Baked and Served with a side of Rigatoni and a Generous Portion of Utica Greens and Italian Cheeses", category: "Entrees", base_price: 16.99, size_variants: {}, images: [], available: true, featured: false, display_order: 17
  },
  {
    id: "item_018", name: "Chicken Riggies", italian_name: "Pollo Riggies", description: "Tender Pieces of Chicken Breast Cherry Peppers Red Onion - Pancetta in a Vodka Sauce with Rigatoni", category: "Entrees", base_price: 16.99, size_variants: {}, images: [], available: true, featured: false, display_order: 18
  },
  {
    id: "item_019", name: "Chicken Alfredo with Broccoli", italian_name: "Pollo Alfredo con Broccoli", description: "Chicken Alfredo with Broccoli", category: "Entrees", base_price: 16.99, size_variants: {}, images: [], available: true, featured: false, display_order: 19
  },
  {
    id: "item_020", name: "Italian Sub", italian_name: "Panino Italiano", description: "On a 12\" Baked Hoagie Roll - Ham - Salami - Pepperoni - Provolone Cheese - Lettuce - Tomato - Onion - Italian Vinaigrette Dressing", category: "Cold Subs", base_price: 10.99, size_variants: {}, images: [], available: true, featured: false, display_order: 20
  },
  {
    id: "item_021", name: "Chicken Parm Sub", italian_name: "Panino Pollo Parmigiana", description: "", category: "Hot Subs", base_price: 10.99, size_variants: {}, images: [], available: true, featured: false, display_order: 21
  },
  {
    id: "item_022", name: "Meatball Sub", italian_name: "Panino Polpette", description: "On a 12\" Baked Hoagie Roll", category: "Hot Subs", base_price: 10.99, size_variants: {}, images: [], available: true, featured: false, display_order: 22
  },
  {
    id: "item_023", name: "Sausage Sub", italian_name: "Panino Salsiccia", description: "On a 12\" Baked Hoagie Roll", category: "Hot Subs", base_price: 10.99, size_variants: {}, images: [], available: true, featured: false, display_order: 23
  },
  {
    id: "item_024", name: "Eggplant Sub", italian_name: "Panino Melanzane", description: "On a 12\" Baked Hoagie Roll", category: "Hot Subs", base_price: 10.99, size_variants: {}, images: [], available: true, featured: false, display_order: 24
  },
  {
    id: "item_025", name: "Napoli's Chicken & Greens Sub", italian_name: "Panino Pollo e Verdure Napoli", description: "On a 12\" Baked Hoagie Roll - Add Cheese 1.50", category: "Hot Subs", base_price: 10.99, size_variants: {}, images: [], available: true, featured: false, display_order: 25
  },
  {
    id: "item_026", name: "Cannoli", italian_name: "Cannoli", description: "Filled to Order", category: "Desserts", base_price: 0, size_variants: {}, images: [], available: true, featured: false, display_order: 26
  },
  {
    id: "item_027", name: "Hemstrought's Half Moons", italian_name: "", description: "Pack of 4", category: "Desserts", base_price: 0, size_variants: {}, images: [], available: true, featured: false, display_order: 27
  },
  {
    id: "item_028", name: "N.Y. Style Cheesecake", italian_name: "", description: "New York Style Cheesecake", category: "Desserts", base_price: 0, size_variants: {}, images: [], available: true, featured: false, display_order: 28
  },
  {
    id: "item_029", name: "Tiramisu", italian_name: "Tiramisu", description: "Classic Italian Tiramisu", category: "Desserts", base_price: 0, size_variants: {}, images: [], available: true, featured: false, display_order: 29
  },
  {
    id: "item_030", name: "Chocolate Chip Cookies", italian_name: "", description: "Chocolate Chip Cookies", category: "Desserts", base_price: 0, size_variants: {}, images: [], available: true, featured: false, display_order: 30
  },
  {
    id: "item_031", name: "Chocolate Cake", italian_name: "", description: "Chocolate Cake", category: "Desserts", base_price: 0, size_variants: {}, images: [], available: true, featured: false, display_order: 31
  },
  {
    id: "item_032", name: "Napolitana - Thin Crust", italian_name: "Pizza Napolitana", description: "Classic thin crust pizza with cheese", category: "Pizza", base_price: 13, size_variants: {"12\"": 13.00, "16\"": 17.00}, images: [], available: true, featured: false, display_order: 32
  },
  {
    id: "item_033", name: "Sicilian - Thick Crust", italian_name: "Pizza Siciliana", description: "8 slice 12\"x16\" Cheese thick crust pizza", category: "Pizza", base_price: 22.5, size_variants: {}, images: [], available: true, featured: false, display_order: 33
  },
  {
    id: "item_034", name: "Napoli's Homemade Tomato Pie", italian_name: "Pizza al Pomodoro della Casa", description: "Choice of Toppings. 12\" - 2.75, 16\" - 3.25. Pepperoni - Italian Sausage - Meatball - Bacon - Grilled or Breaded Chicken - Ham - Green Peppers - Onion - Mushroom - Broccoli - Pineapple - Fresh Garlic - Black Olive - Banana Peppers - Roasted Red Peppers - Anchovies - Extra Cheese", category: "Pizza", base_price: 17.5, size_variants: {}, images: [], available: true, featured: true, display_order: 34
  },
  {
    id: "item_035", name: "Chicken Wing Pizza", italian_name: "Pizza Chicken Wing", description: "12\" - 17.99, 16\" - Price listed. Mild, Medium or Hot Sauce. Topped With Breaded Chicken and Mozzarella", category: "Specialty Pizza", base_price: 21.99, size_variants: {"12\"": 17.99, "16\"": 21.99}, images: [], available: true, featured: false, display_order: 35
  },
  {
    id: "item_036", name: "Chicken Bacon Ranch Pizza", italian_name: "Pizza Pollo Bacon Ranch", description: "Ranch Dressing Base Topped with Breaded Chicken Mozzarella Cheese - Bacon - Drizzled with Ranch Dressing", category: "Specialty Pizza", base_price: 21.99, size_variants: {}, images: [], available: true, featured: false, display_order: 36
  },
  {
    id: "item_037", name: "Primavera Pizza", italian_name: "Pizza Primavera", description: "White or Red Sauce Base - Topped with Broccoli Cherry Tomatoes - Spinach - Mozzarella Pecorino Romano and other cheese", category: "Specialty Pizza", base_price: 21.99, size_variants: {}, images: [], available: true, featured: false, display_order: 37
  },
  {
    id: "item_038", name: "Hawaiian Pizza", italian_name: "Pizza Hawaiana", description: "Pineapple Rings - Bacon - Ham", category: "Specialty Pizza", base_price: 21.99, size_variants: {}, images: [], available: true, featured: false, display_order: 38
  },
  {
    id: "item_039", name: "Margherita Pizza", italian_name: "Pizza Margherita", description: "Fresh Garlic Base - Cherry Tomatoes - Fresh Basil Loaded with Mozzarella - Pecorino Romano Cheese Drizzled with Balsamic Glaze", category: "Specialty Pizza", base_price: 21.99, size_variants: {}, images: [], available: true, featured: true, display_order: 39
  },
  {
    id: "item_040", name: "Chicken Parmigiana Pizza", italian_name: "Pizza Pollo Parmigiana", description: "Tender strips of Breaded Chicken on a Red Sauce Smothered with Mozzarella Topped with Fresh Basil", category: "Specialty Pizza", base_price: 21.99, size_variants: {}, images: [], available: true, featured: false, display_order: 40
  },
  {
    id: "item_041", name: "Napoli's Old Fashioned Pizza", italian_name: "Pizza Old Fashioned Napoli", description: "Mozzarella Base - Topped with our Homemade Marinara Sauce or Pizza Sauce", category: "Specialty Pizza", base_price: 20.99, size_variants: {}, images: [], available: true, featured: false, display_order: 41
  },
  {
    id: "item_042", name: "Utica Greens Pizza", italian_name: "Pizza Utica Greens", description: "Our Own Homemade Utica Greens - On a White Garlic Base - Topped with Mozzarella - Italian Cheeses", category: "Specialty Pizza", base_price: 22.99, size_variants: {}, images: [], available: true, featured: true, display_order: 42
  },
  {
    id: "item_043", name: "Grandma's Pizza", italian_name: "Pizza della Nonna", description: "Sicilian Crust Dough - EVOO - Basil - Fresh Mozzarella - Topped with Tomato Sauce - Italian Cheese - Dash of Oregano", category: "Specialty Pizza", base_price: 21.99, size_variants: {}, images: [], available: true, featured: true, display_order: 43
  },
  {
    id: "item_044", name: "Napoli's Special Pizza", italian_name: "Pizza Speciale Napoli", description: "5 Toppings of Your Choice On a Red or White Sauce", category: "Specialty Pizza", base_price: 23.99, size_variants: {}, images: [], available: true, featured: false, display_order: 44
  },
  {
    id: "item_045", name: "Cheese Calzone", italian_name: "Calzone al Formaggio", description: "We Start with Ricotta and Mozzarella Cheese. Toppings 1.25: Pepperoni - Sausage - Meatballs - Bacon - Chicken - Mushrooms - Onions - Green Peppers - Spinach Broccoli - Pineapple - Extra Cheese - Garlic", category: "Specialty Items", base_price: 8.99, size_variants: {}, images: [], available: true, featured: false, display_order: 45
  },
  {
    id: "item_046", name: "Stromboli", italian_name: "Stromboli", description: "Ham - Pepperoni - Green Peppers - Mozzarella Cheese", category: "Specialty Items", base_price: 8.99, size_variants: {}, images: [], available: true, featured: false, display_order: 46
  },
  {
    id: "item_047", name: "Pepperoni Roll", italian_name: "Panino Pepperoni", description: "Pepperoni - Italian Seasoning - Mozzarella", category: "Specialty Items", base_price: 7.99, size_variants: {}, images: [], available: true, featured: false, display_order: 47
  },
  {
    id: "item_048", name: "Chicken Wing Calzone", italian_name: "Calzone Chicken Wing", description: "Mozzarella - Ricotta - Mixed with Breaded Chicken Wing Sauce of Your Choice Mild/Medium/Hot/BBQ", category: "Specialty Items", base_price: 10.99, size_variants: {}, images: [], available: true, featured: false, display_order: 48
  },
  {
    id: "item_049", name: "Homemade Garlic Knots", italian_name: "Nodi all'Aglio della Casa", description: "Homemade Garlic Knots", category: "Specialty Items", base_price: 0.99, size_variants: {}, images: [], available: true, featured: false, display_order: 49
  },
  {
    id: "item_050", name: "Stuffed Shells", italian_name: "Conchiglie Ripiene", description: "4 Jumbo Shells - Homemade Marinara Sauce Smothered in Mozzarella. (Gluten Free Pasta)", category: "Baked Dishes", base_price: 11.99, size_variants: {}, images: [], available: true, featured: false, display_order: 50
  },
  {
    id: "item_051", name: "Manicotti", italian_name: "Manicotti", description: "3 Tubular Shape Pasta Homemade Marinara Smothered in Mozzarella", category: "Baked Dishes", base_price: 11.99, size_variants: {}, images: [], available: true, featured: false, display_order: 51
  },
  {
    id: "item_052", name: "Baked Ravioli", italian_name: "Ravioli al Forno", description: "5 Large Ricotta Filled Raviolis Homemade Marinara Sauce Topped with Mozzarella and Baked", category: "Baked Dishes", base_price: 11.99, size_variants: {}, images: [], available: true, featured: false, display_order: 52
  },
  {
    id: "item_053", name: "Lasagna", italian_name: "Lasagna", description: "Homemade Layers - Ricotta - Mozzarella Beef Lots of Homemade Sauce Baked to Perfection", category: "Baked Dishes", base_price: 13.99, size_variants: {}, images: [], available: true, featured: false, display_order: 53
  },
  {
    id: "item_054", name: "Baked Ziti", italian_name: "Ziti al Forno", description: "Mezzi Rigatoni Pasta cooked Al Dente Smothered in Sauce - Topped with Mozzarella Baked to a Golden Brown. ADD SAUSAGE LINKS OR MEATBALLS 1.50/each", category: "Baked Dishes", base_price: 11.99, size_variants: {}, images: [], available: true, featured: false, display_order: 54
  }
];

// Parse menu data and organize by categories
export function getMenuData(): MenuCategory[] {
  // Group items by category
  const categoryMap = new Map<string, MenuItem[]>();
  
  rawMenuData.forEach(item => {
    if (!categoryMap.has(item.category)) {
      categoryMap.set(item.category, []);
    }
    categoryMap.get(item.category)!.push(item);
  });
  
  // Convert to array and sort by display order
  const categories: MenuCategory[] = Array.from(categoryMap.entries()).map(([name, items]) => ({
    name,
    items: items.sort((a, b) => a.display_order - b.display_order)
  }));
  
  // Sort categories by the first item's display order
  return categories.sort((a, b) => {
    const aOrder = a.items[0]?.display_order || 0;
    const bOrder = b.items[0]?.display_order || 0;
    return aOrder - bOrder;
  });
}

// Get featured items
export function getFeaturedItems(): MenuItem[] {
  return rawMenuData.filter(item => item.featured).sort((a, b) => a.display_order - b.display_order);
}

// Get items by category
export function getItemsByCategory(category: string): MenuItem[] {
  return rawMenuData
    .filter(item => item.category === category && item.available)
    .sort((a, b) => a.display_order - b.display_order);
}

// Get all categories
export function getCategories(): string[] {
  const categories = new Set(rawMenuData.map(item => item.category));
  return Array.from(categories).sort();
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