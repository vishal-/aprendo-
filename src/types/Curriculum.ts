// Base curriculum entity types
export interface Course {
  id: number;
  name: string;
  isBase: boolean;
  ownerId: string;
}

export interface Subject {
  id: number;
  name: string;
  isBase: boolean;
  ownerId: string;
  courseId: number;
}

export interface Topic {
  id: number;
  name: string;
  isBase: boolean;
  ownerId: string;
  subjectId: number;
}

export interface Subtopic {
  id: number;
  name: string;
  isBase: boolean;
  ownerId: string;
  topicId: number;
}

// Nested types for API responses
export interface SubtopicData {
  id: number;
  name: string;
}

export interface TopicData {
  id: number;
  name: string;
  subtopics: SubtopicData[];
}

export interface SubjectData {
  id: number;
  name: string;
  topics: TopicData[];
}

export interface CourseData {
  id: number;
  name: string;
  subjects: SubjectData[];
}

// Tree node for UI components
export interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  level: number;
}