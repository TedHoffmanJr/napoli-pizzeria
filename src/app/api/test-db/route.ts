import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export async function GET() {
  try {
    console.log('Testing database connection...');
    console.log('DATABASE_URL present:', !!process.env.DATABASE_URL);
    console.log('DATABASE_URL (first 50 chars):', process.env.DATABASE_URL?.substring(0, 50));
    
    // Test simple connection
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Basic query result:', result);
    
    // Test if menu tables exist
    const categoryCount = await prisma.menuCategory.count();
    console.log('Category count:', categoryCount);
    
    const itemCount = await prisma.menuItem.count();
    console.log('Item count:', itemCount);
    
    return NextResponse.json({
      success: true,
      database: {
        connected: true,
        categoryCount,
        itemCount,
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
      }
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      details: {
        name: error instanceof Error ? error.name : 'Unknown',
        stack: error instanceof Error ? error.stack : undefined
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
      }
    }, { status: 500 });
  }
}