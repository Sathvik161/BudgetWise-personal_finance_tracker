import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Transaction from '@/lib/models/Transaction';

// Add this export to make the route dynamic
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Fetching transactions...');
    const transactions = await Transaction.find({}).sort({ date: -1 });
    console.log('Successfully fetched transactions');
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('GET transaction error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch transactions',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    const data = await request.json();
    console.log('Received transaction data:', data);
    
    // Ensure date is properly formatted
    const formattedData = {
      ...data,
      date: new Date(data.date)
    };
    
    console.log('Creating transaction with data:', formattedData);
    const transaction = await Transaction.create(formattedData);
    console.log('Successfully created transaction');
    return NextResponse.json(transaction);
  } catch (error) {
    console.error('POST transaction error:', error);
    return NextResponse.json({ 
      error: 'Failed to create transaction',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}