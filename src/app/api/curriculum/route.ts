import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUidFromToken } from '@/lib/auth';
import { TreeNode, CourseData } from '@/types/Curriculum';

export async function POST(request: NextRequest) {
  try {
    const uid = await getUidFromToken(request);
    if (!uid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { curriculum } = body;

    if (!curriculum || !Array.isArray(curriculum)) {
      return NextResponse.json({ error: 'Invalid curriculum data' }, { status: 400 });
    }

    // Process and save the curriculum hierarchy with upserts
    await upsertCurriculumLevel(curriculum, uid);

    return NextResponse.json({ success: true, message: 'Curriculum saved successfully' });
  } catch (error) {
    console.error('Error saving curriculum:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function upsertCurriculumLevel(nodes: TreeNode[], ownerId: string) {
  for (const courseNode of nodes) {
    if (courseNode.level !== 0) continue;

    const courseId = courseNode.id.startsWith('course_') 
      ? parseInt(courseNode.id.replace('course_', ''))
      : undefined;

    const course = await prisma.course.upsert({
      where: { id: courseId || -1 },
      update: { name: courseNode.name },
      create: {
        name: courseNode.name,
        isBase: true,
        ownerId: ownerId
      }
    });

    if (courseNode.children) {
      for (const subjectNode of courseNode.children) {
        if (subjectNode.level !== 1) continue;

        const subjectId = subjectNode.id.startsWith('subject_')
          ? parseInt(subjectNode.id.replace('subject_', ''))
          : undefined;

        const subject = await prisma.subject.upsert({
          where: { id: subjectId || -1 },
          update: { name: subjectNode.name },
          create: {
            name: subjectNode.name,
            isBase: true,
            ownerId: ownerId,
            courseId: course.id
          }
        });

        if (subjectNode.children) {
          for (const topicNode of subjectNode.children) {
            if (topicNode.level !== 2) continue;

            const topicId = topicNode.id.startsWith('topic_')
              ? parseInt(topicNode.id.replace('topic_', ''))
              : undefined;

            const topic = await prisma.topic.upsert({
              where: { id: topicId || -1 },
              update: { name: topicNode.name },
              create: {
                name: topicNode.name,
                isBase: true,
                ownerId: ownerId,
                subjectId: subject.id
              }
            });

            if (topicNode.children) {
              for (const subtopicNode of topicNode.children) {
                if (subtopicNode.level !== 3) continue;

                const subtopicId = subtopicNode.id.startsWith('subtopic_')
                  ? parseInt(subtopicNode.id.replace('subtopic_', ''))
                  : undefined;

                await prisma.subtopic.upsert({
                  where: { id: subtopicId || -1 },
                  update: { name: subtopicNode.name },
                  create: {
                    name: subtopicNode.name,
                    isBase: true,
                    ownerId: ownerId,
                    topicId: topic.id
                  }
                });
              }
            }
          }
        }
      }
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const uid = await getUidFromToken(request);
    if (!uid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch curriculum hierarchy for the user or base data
    const courses = await prisma.course.findMany({
      where: {
        OR: [
          { ownerId: uid },
          { isBase: true }
        ]
      },
      include: {
        subjects: {
          where: {
            OR: [
              { ownerId: uid },
              { isBase: true }
            ]
          },
          include: {
            topics: {
              where: {
                OR: [
                  { ownerId: uid },
                  { isBase: true }
                ]
              },
              include: {
                subtopics: {
                  where: {
                    OR: [
                      { ownerId: uid },
                      { isBase: true }
                    ]
                  }
                }
              }
            }
          }
        }
      }
    });

    // Build hierarchy from nested data
    const curriculum = buildCurriculumHierarchy(courses);

    return NextResponse.json({ success: true, data: curriculum });
  } catch (error) {
    console.error('Error fetching curriculum:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function buildCurriculumHierarchy(courses: CourseData[]): TreeNode[] {
  return courses.map(course => ({
    id: `course_${course.id}`,
    name: course.name,
    level: 0,
    children: course.subjects.map((subject) => ({
      id: `subject_${subject.id}`,
      name: subject.name,
      level: 1,
      children: subject.topics.map((topic) => ({
        id: `topic_${topic.id}`,
        name: topic.name,
        level: 2,
        children: topic.subtopics.map((subtopic) => ({
          id: `subtopic_${subtopic.id}`,
          name: subtopic.name,
          level: 3
        }))
      }))
    }))
  }));
}