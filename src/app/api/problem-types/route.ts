import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const problemTypes = await prisma.problemType.findMany({
      orderBy: { code: 'asc' }
    });

    return NextResponse.json({ success: true, data: problemTypes });
  } catch (error) {
    console.error('Error fetching problem types:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}