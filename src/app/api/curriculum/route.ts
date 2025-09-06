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

    // Clear existing curriculum for this user
    await prisma.course.deleteMany({
      where: { ownerId: uid }
    });

    // Process and save the curriculum hierarchy
    await processCurriculumLevel(curriculum, uid);

    return NextResponse.json({ success: true, message: 'Curriculum saved successfully' });
  } catch (error) {
    console.error('Error saving curriculum:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function processCurriculumLevel(nodes: TreeNode[], ownerId: string) {
  for (const courseNode of nodes) {
    if (courseNode.level !== 0) continue;

    // Create course
    const course = await prisma.course.create({
      data: {
        name: courseNode.name,
        isBase: true,
        ownerId: ownerId
      }
    });

    // Process subjects
    if (courseNode.children) {
      for (const subjectNode of courseNode.children) {
        if (subjectNode.level !== 1) continue;

        const subject = await prisma.subject.create({
          data: {
            name: subjectNode.name,
            isBase: true,
            ownerId: ownerId,
            courseId: course.id
          }
        });

        // Process topics
        if (subjectNode.children) {
          for (const topicNode of subjectNode.children) {
            if (topicNode.level !== 2) continue;

            const topic = await prisma.topic.create({
              data: {
                name: topicNode.name,
                isBase: true,
                ownerId: ownerId,
                subjectId: subject.id
              }
            });

            // Process subtopics
            if (topicNode.children) {
              for (const subtopicNode of topicNode.children) {
                if (subtopicNode.level !== 3) continue;

                await prisma.subtopic.create({
                  data: {
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

    // Fetch curriculum hierarchy for the user
    const courses = await prisma.course.findMany({
      where: { ownerId: uid },
      include: {
        subjects: {
          include: {
            topics: {
              include: {
                subtopics: true
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