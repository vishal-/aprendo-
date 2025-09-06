import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUidFromToken } from '@/lib/auth';

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  level: number;
}

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
    await prisma.curriculumRelation.deleteMany({
      where: { ownerId: uid }
    });

    // Process and save the curriculum hierarchy
    await processCurriculumLevel(curriculum, uid, null, null, null, null);

    return NextResponse.json({ success: true, message: 'Curriculum saved successfully' });
  } catch (error) {
    console.error('Error saving curriculum:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function processCurriculumLevel(
  nodes: TreeNode[],
  ownerId: string,
  courseId: number | null,
  subjectId: number | null,
  topicId: number | null,
  subtopicId: number | null
) {
  for (const node of nodes) {
    let newCourseId = courseId;
    let newSubjectId = subjectId;
    let newTopicId = topicId;
    let newSubtopicId = subtopicId;

    // Create the appropriate entity based on level
    switch (node.level) {
      case 0: // Course
        const course = await prisma.course.create({
          data: {
            name: node.name,
            isBase: true,
            ownerId: ownerId
          }
        });
        newCourseId = course.id;
        break;

      case 1: // Subject
        const subject = await prisma.subject.create({
          data: {
            name: node.name,
            isBase: true,
            ownerId: ownerId
          }
        });
        newSubjectId = subject.id;
        break;

      case 2: // Topic
        const topic = await prisma.topic.create({
          data: {
            name: node.name,
            isBase: true,
            ownerId: ownerId
          }
        });
        newTopicId = topic.id;
        break;

      case 3: // Subtopic
        const subtopic = await prisma.subtopic.create({
          data: {
            name: node.name,
            isBase: true,
            ownerId: ownerId
          }
        });
        newSubtopicId = subtopic.id;
        break;
    }

    // Create curriculum relation
    await prisma.curriculumRelation.create({
      data: {
        courseId: newCourseId,
        subjectId: newSubjectId,
        topicId: newTopicId,
        subtopicId: newSubtopicId,
        ownerId: ownerId
      }
    });

    // Process children recursively
    if (node.children && node.children.length > 0) {
      await processCurriculumLevel(
        node.children,
        ownerId,
        newCourseId,
        newSubjectId,
        newTopicId,
        newSubtopicId
      );
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const uid = await getUidFromToken(request);
    if (!uid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch curriculum for the user
    const relations = await prisma.curriculumRelation.findMany({
      where: { ownerId: uid },
      include: {
        course: true,
        subject: true,
        topic: true,
        subtopic: true
      }
    });

    // Build hierarchy from relations
    const curriculum = buildCurriculumHierarchy(relations);

    return NextResponse.json({ success: true, data: curriculum });
  } catch (error) {
    console.error('Error fetching curriculum:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function buildCurriculumHierarchy(relations: any[]): TreeNode[] {
  const courseMap = new Map<number, TreeNode>();
  const subjectMap = new Map<number, TreeNode>();
  const topicMap = new Map<number, TreeNode>();

  // Build courses
  relations.forEach(rel => {
    if (rel.course && !courseMap.has(rel.course.id)) {
      courseMap.set(rel.course.id, {
        id: `course_${rel.course.id}`,
        name: rel.course.name,
        level: 0,
        children: []
      });
    }
  });

  // Build subjects and link to courses
  relations.forEach(rel => {
    if (rel.subject && rel.courseId) {
      if (!subjectMap.has(rel.subject.id)) {
        const subjectNode: TreeNode = {
          id: `subject_${rel.subject.id}`,
          name: rel.subject.name,
          level: 1,
          children: []
        };
        subjectMap.set(rel.subject.id, subjectNode);
        
        const course = courseMap.get(rel.courseId);
        if (course) {
          course.children!.push(subjectNode);
        }
      }
    }
  });

  // Build topics and link to subjects
  relations.forEach(rel => {
    if (rel.topic && rel.subjectId) {
      if (!topicMap.has(rel.topic.id)) {
        const topicNode: TreeNode = {
          id: `topic_${rel.topic.id}`,
          name: rel.topic.name,
          level: 2,
          children: []
        };
        topicMap.set(rel.topic.id, topicNode);
        
        const subject = subjectMap.get(rel.subjectId);
        if (subject) {
          subject.children!.push(topicNode);
        }
      }
    }
  });

  // Build subtopics and link to topics
  relations.forEach(rel => {
    if (rel.subtopic && rel.topicId) {
      const subtopicNode: TreeNode = {
        id: `subtopic_${rel.subtopic.id}`,
        name: rel.subtopic.name,
        level: 3
      };
      
      const topic = topicMap.get(rel.topicId);
      if (topic) {
        if (!topic.children) topic.children = [];
        topic.children.push(subtopicNode);
      }
    }
  });

  return Array.from(courseMap.values());
}