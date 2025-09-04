import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { uid, email, displayName, profilePicture, phone, role, termsAccepted } = body;

    if (!uid || !email || !displayName || !termsAccepted) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const userDetails = await prisma.user.upsert({
      where: { id: uid },
      update: {
        name: displayName,
        image: profilePicture || null,
        // Add other fields as needed based on your schema
      },
      create: {
        id: uid,
        email,
        name: displayName,
        image: profilePicture || null,
        // Add other fields as needed based on your schema
      },
    });

    return NextResponse.json({ success: true, data: userDetails });
  } catch (error) {
    console.error('Error saving user details:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}