
export type AssessmentMode = 'online' | 'offline';
export type AssessmentStatus = 'draft' | 'published' | 'disabled';

export interface AssessmentQuestionRef {
    id?: number;
    sectionId: number;
    problemId: number;
    points: number;
    timeLimitSeconds?: number;
}

export interface AssessmentSection {
    id?: number;
    assessmentId?: number;
    title: string;
    order: number;
    questions?: AssessmentQuestionRef[];
}

export interface Assessment {
    id?: number;
    mode: AssessmentMode;
    courseId: number;
    title: string;
    description?: string;
    instructions?: string;
    duration: number; // in minutes
    maximumMarks: number;
    ownerId?: string;
    isPublic: boolean;
    status: AssessmentStatus;
    start: Date | string;
    end: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sections?: AssessmentSection[];
}
