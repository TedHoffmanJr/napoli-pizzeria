#!/usr/bin/env node

/**
 * Napoli Pizzeria - Database Migration Script
 * 
 * This script helps migrate from static menu data to Supabase database
 * Run with: node scripts/migrate-to-database.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🍕 Napoli Pizzeria - Database Migration Tool\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ Error: .env.local file not found!');
  console.log('📋 Please:');
  console.log('1. Copy .env.local.example to .env.local');
  console.log('2. Add your Supabase DATABASE_URL');
  console.log('3. Run this script again\n');
  process.exit(1);
}

// Read environment file
const envContent = fs.readFileSync(envPath, 'utf8');
if (!envContent.includes('DATABASE_URL=') || envContent.includes('[YOUR-PASSWORD]')) {
  console.error('❌ Error: DATABASE_URL not configured properly!');
  console.log('📋 Please update your .env.local file with actual Supabase connection string\n');
  process.exit(1);
}

console.log('✅ Environment configuration found');

// Function to run command and handle errors
function runCommand(command, description) {
  console.log(`🔄 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed\n`);
  } catch (error) {
    console.error(`❌ Error during: ${description}`);
    console.error(error.message);
    process.exit(1);
  }
}

// Migration steps
console.log('🚀 Starting database migration...\n');

// Step 1: Install dependencies
runCommand('npm install', 'Installing dependencies');

// Step 2: Generate Prisma client
runCommand('npm run db:generate', 'Generating Prisma client');

// Step 3: Push schema to database
runCommand('npm run db:push', 'Creating database tables');

// Step 4: Seed with menu data
runCommand('npm run db:seed', 'Importing menu data');

// Step 5: Update environment to use database
console.log('🔄 Updating environment to use database...');
const updatedEnv = envContent.replace(
  'NEXT_PUBLIC_USE_DATABASE=false',
  'NEXT_PUBLIC_USE_DATABASE=true'
);
fs.writeFileSync(envPath, updatedEnv);
console.log('✅ Environment updated\n');

console.log('🎉 Migration completed successfully!');
console.log('📋 Next steps:');
console.log('1. Restart your dev server: npm run dev');
console.log('2. Visit your site - menu now loads from Supabase!');
console.log('3. Check Supabase dashboard to see your data');
console.log('4. Generate food photos using the prompts in docs/menu/');
console.log('\n🔄 To rollback: Change NEXT_PUBLIC_USE_DATABASE=false in .env.local');
console.log('🍕 Happy pizza making!\n');