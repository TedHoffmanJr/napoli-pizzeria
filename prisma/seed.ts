import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

// Category configurations  
const categoryConfigs = {
  'Appetizers': {
    displayOrder: 1,
    subtitle: null,
    categoryInfo: []
  },
  'Salads': {
    displayOrder: 2,
    subtitle: 'Choice of Dressing',
    categoryInfo: [
      { infoType: 'dressings', infoText: 'House Italian Vinaigrette • Ranch • Blue Cheese' }
    ]
  },
  'Wings': {
    displayOrder: 3,
    subtitle: 'Available Sauces',
    categoryInfo: [
      { infoType: 'sauces', infoText: 'Mild • Medium • Hot • Honey BBQ • Garlic Butter' },
      { infoType: 'included', infoText: 'All orders include Blue Cheese • Extra Blue Cheese $0.75 • Split Order (2 sauces) $1.25' }
    ]
  },
  'Cold Subs': {
    displayOrder: 4,
    subtitle: 'Served on 12" Baked Hoagie Roll',
    categoryInfo: [
      { infoType: 'included', infoText: 'All subs include: Lettuce • Tomato • Onion • Italian Vinaigrette' }
    ]
  },
  'Hot Subs': {
    displayOrder: 5,
    subtitle: 'Served on 12" Baked Hoagie Roll',
    categoryInfo: []
  },
  'Specialty Items': {
    displayOrder: 6,
    subtitle: null,
    categoryInfo: [
      { infoType: 'toppings', infoText: 'Calzone Additional Toppings $1.25: Pepperoni • Sausage • Meatballs • Bacon • Chicken • Mushrooms • Onions • Green Peppers • Spinach • Broccoli • Pineapple • Extra Cheese • Garlic' }
    ]
  },
  'Pizza': {
    displayOrder: 7,
    subtitle: 'Available Toppings',
    categoryInfo: [
      { infoType: 'toppings', infoText: 'Pepperoni • Italian Sausage • Meatball • Bacon • Grilled or Breaded Chicken • Ham • Green Peppers • Onion • Mushroom • Broccoli • Pineapple • Fresh Garlic • Black Olive • Banana Peppers • Roasted Red Peppers • Anchovies • Extra Cheese' }
    ]
  },
  'Specialty Pizza': {
    displayOrder: 8,
    subtitle: 'Gourmet Pizza Creations',
    categoryInfo: []
  },
  'Entrees': {
    displayOrder: 9,
    subtitle: 'Served with 2 Garlic Knots',
    categoryInfo: [
      { infoType: 'options', infoText: 'Gluten Free Pasta Available' }
    ]
  },
  'Baked Dishes': {
    displayOrder: 10,
    subtitle: 'Gluten Free Pasta Available',
    categoryInfo: [
      { infoType: 'options', infoText: 'Gluten Free Pasta Available' }
    ]
  },
  'Beverages': {
    displayOrder: 11,
    subtitle: null,
    categoryInfo: []
  },
  'Desserts': {
    displayOrder: 12,
    subtitle: null,
    categoryInfo: []
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
        name: categoryName as string,
        subtitle: config.subtitle,
        sharedOptions: null, // Remove this since we're using CategoryInfo table
        displayOrder: config.displayOrder,
      },
    });
    categoryMap.set(categoryName as string, category.id);
    console.log(`Created category: ${categoryName}`);

    // Create category info entries
    for (const info of config.categoryInfo) {
      await prisma.categoryInfo.create({
        data: {
          categoryId: category.id,
          infoType: info.infoType,
          infoText: info.infoText,
        },
      });
    }
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