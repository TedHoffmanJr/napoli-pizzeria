import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

// Category configurations with shared information
const categoryConfigs = {
  'Appetizers': {
    displayOrder: 1,
    subtitle: null,
    sharedOptions: null
  },
  'Salads': {
    displayOrder: 2,
    subtitle: 'Choice of Dressing',
    sharedOptions: 'House Italian Vinaigrette • Ranch • Blue Cheese'
  },
  'Wings': {
    displayOrder: 3,
    subtitle: 'Available Sauces',
    sharedOptions: 'Mild • Medium • Hot • Honey BBQ • Garlic Butter • All orders include Blue Cheese • Extra Blue Cheese $0.75'
  },
  'Cold Subs': {
    displayOrder: 4,
    subtitle: 'Served on 12" Baked Hoagie Roll',
    sharedOptions: 'All subs include: Lettuce • Tomato • Onion • Italian Vinaigrette'
  },
  'Hot Subs': {
    displayOrder: 5,
    subtitle: 'Served on 12" Baked Hoagie Roll',
    sharedOptions: null
  },
  'Specialty Items': {
    displayOrder: 6,
    subtitle: null,
    sharedOptions: 'Calzone Additional Toppings $1.25: Pepperoni • Sausage • Meatballs • Bacon • Chicken • Mushrooms • Onions • Green Peppers • Spinach • Broccoli • Pineapple • Extra Cheese • Garlic'
  },
  'Pizza': {
    displayOrder: 7,
    subtitle: 'Available Toppings',
    sharedOptions: 'Pepperoni • Italian Sausage • Meatball • Bacon • Grilled or Breaded Chicken • Ham • Green Peppers • Onion • Mushroom • Broccoli • Pineapple • Fresh Garlic • Black Olive • Banana Peppers • Roasted Red Peppers • Anchovies • Extra Cheese'
  },
  'Specialty Pizza': {
    displayOrder: 8,
    subtitle: 'Gourmet Pizza Creations',
    sharedOptions: null
  },
  'Entrees': {
    displayOrder: 9,
    subtitle: 'Served with 2 Garlic Knots',
    sharedOptions: 'Gluten Free Pasta Available'
  },
  'Baked Dishes': {
    displayOrder: 10,
    subtitle: 'Gluten Free Pasta Available',
    sharedOptions: null
  },
  'Beverages': {
    displayOrder: 11,
    subtitle: null,
    sharedOptions: null
  },
  'Desserts': {
    displayOrder: 12,
    subtitle: null,
    sharedOptions: null
  }
};

async function main() {
  console.log('Start seeding...');

  // Read the cleaned CSV file
  const csvPath = path.join(process.cwd(), 'docs', 'menu', 'cleaned-menu.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  // Create categories first
  const categoryMap = new Map<string, number>();
  const uniqueCategories = [...new Set(records.map((record: any) => record.category))];

  for (const categoryName of uniqueCategories) {
    const config = categoryConfigs[categoryName as keyof typeof categoryConfigs] || {
      displayOrder: 999,
      subtitle: null,
      sharedOptions: null
    };

    const category = await prisma.menuCategory.create({
      data: {
        name: categoryName,
        subtitle: config.subtitle,
        sharedOptions: config.sharedOptions,
        displayOrder: config.displayOrder,
      },
    });
    categoryMap.set(categoryName, category.id);
    console.log(`Created category: ${categoryName}`);
  }

  // Create menu items
  for (const record of records) {
    const categoryId = categoryMap.get(record.category);
    if (!categoryId) {
      console.error(`Category not found: ${record.category}`);
      continue;
    }

    const menuItem = await prisma.menuItem.create({
      data: {
        categoryId,
        name: record.name,
        italianName: record.italian_name || null,
        description: record.description || null,
        basePrice: parseFloat(record.base_price),
        displayOrder: parseInt(record.display_order),
        featured: record.featured === 'TRUE',
        available: record.available === 'TRUE',
      },
    });

    // Parse and create size variants
    if (record.size_variants && record.size_variants !== '{}') {
      try {
        const variants = JSON.parse(record.size_variants.replace(/"/g, '"'));
        for (const [variantName, price] of Object.entries(variants)) {
          await prisma.itemVariant.create({
            data: {
              itemId: menuItem.id,
              variantName,
              priceModifier: parseFloat(price as string),
            },
          });
        }
      } catch (error) {
        console.error(`Error parsing variants for ${record.name}:`, error);
      }
    }

    console.log(`Created item: ${record.name}`);
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });