import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUidFromToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const uid = await getUidFromToken(request);
    if (!uid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      typeCode,
      statement,
      answer,
      explanation,
      difficulty,
      suggestedPoints,
      suggestedTime,
      isPublic,
      isActive,
      subtopicId,
      media,
      metadata
    } = body;

    if (!subtopicId) {
      return NextResponse.json({ error: 'Subtopic is required' }, { status: 400 });
    }

    // Get the subtopic with its full hierarchy
    const subtopic = await prisma.subtopic.findUnique({
      where: { id: subtopicId },
      include: {
        topic: {
          include: {
            subject: {
              include: {
                course: true
              }
            }
          }
        }
      }
    });

    if (!subtopic) {
      return NextResponse.json({ error: 'Subtopic not found' }, { status: 404 });
    }

    const problem = await prisma.problem.create({
      data: {
        typeCode,
        statement,
        answer,
        explanation,
        difficulty,
        suggestedPoints,
        suggestedTime,
        isPublic,
        isActive,
        courseId: subtopic.topic.subject.course.id,
        subjectId: subtopic.topic.subject.id,
        topicId: subtopic.topic.id,
        subtopicId: subtopic.id,
        media: media || {},
        metadata: metadata || {},
        ownerId: uid
      }
    });

    return NextResponse.json({ success: true, data: problem });
  } catch (error) {
    console.error('Error creating problem:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}