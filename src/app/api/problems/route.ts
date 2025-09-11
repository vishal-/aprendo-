import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Handle batch insert for admins
    if (Array.isArray(body)) {
      if (user.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      const problemsData = [];
      for (const problem of body) {
        if (!problem.subtopicId) {
          return NextResponse.json({ error: 'Subtopic is required for all problems' }, { status: 400 });
        }
        const subtopic = await prisma.subtopic.findUnique({
          where: { id: problem.subtopicId },
          include: { topic: { include: { subject: { include: { course: true } } } } }
        });
        if (!subtopic) {
          return NextResponse.json({ error: `Subtopic with id ${problem.subtopicId} not found` }, { status: 404 });
        }
        problemsData.push({
          ...problem,
          courseId: subtopic.topic.subject.course.id,
          subjectId: subtopic.topic.subject.id,
          topicId: subtopic.topic.id,
          ownerId: user.uid
        });
      }

      await prisma.problem.createMany({
        data: problemsData,
      });

      return NextResponse.json({ success: true, count: problemsData.length });
    }

    // Handle single problem insert
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

    const subtopic = await prisma.subtopic.findUnique({
      where: { id: subtopicId },
      include: { topic: { include: { subject: { include: { course: true } } } } }
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
        ownerId: user.uid
      }
    });

    return NextResponse.json({ success: true, data: problem });
  } catch (error) {
    console.error('Error creating problem:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
