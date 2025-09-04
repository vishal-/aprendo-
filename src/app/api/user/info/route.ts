import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUidFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const uid = await getUidFromToken(request);

    if (!uid) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userDetails = await prisma.userDetails.findUnique({
      where: { uid },
    });

    return NextResponse.json({ success: true, data: userDetails });
  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const uid = await getUidFromToken(request);

    if (!uid) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { email, displayName, profilePicture, phone, role, termsAccepted } = body;

    if (!email || !displayName || !termsAccepted) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const userDetails = await prisma.userDetails.upsert({
      where: { uid: uid },
      update: {
        displayName,
        profilePicture: profilePicture || "",
        phone: phone || "",
        role,
        termsAccepted,
        termsAcceptedAt: termsAccepted ? new Date() : new Date(),
      },
      create: {
        uid,
        email,
        displayName,
        profilePicture: profilePicture || "",
        phone: phone || "",
        phoneVerified: false,
        role,
        termsAccepted,
        termsAcceptedAt: new Date(),
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