import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Budget from '@/lib/models/Budget';

// Add this export to make the route dynamic
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Fetching budgets...');
    const budgets = await Budget.find({});
    console.log('Successfully fetched budgets');
    return NextResponse.json(budgets);
  } catch (error) {
    console.error('GET budgets error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch budgets',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    const data = await request.json();
    console.log('Received budget data:', data);
    
    console.log('Creating budget...');
    const budget = await Budget.create(data);
    console.log('Successfully created budget');
    return NextResponse.json(budget);
  } catch (error) {
    console.error('POST budget error:', error);
    return NextResponse.json({ 
      error: 'Failed to create budget',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}