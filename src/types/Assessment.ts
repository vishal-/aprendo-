
export type AssessmentMode = 'online' | 'offline';
export type AssessmentStatus = 'draft' | 'published' | 'disabled';

export interface AssessmentQuestionRef {
    id: number;
    points: number;
    time_limit_seconds?: number; // optional
}

export interface AssessmentSection {
    title: string;
    order: number;
    questions: AssessmentQuestionRef[];
}

export interface Assessment {
    id?: number;
    mode: AssessmentMode;
    courseId: number;       // e.g., "Grade 5"
    title: string;
    description?: string;
    instructions?: string;
    duration: number;
    maximumMarks: number;
    sections: AssessmentSection[];
    ownerId: number;
    isPublic: boolean;
    status: AssessmentStatus;
    start: string;
    end: string;
    createdAt?: string;
    updatedAt?: string;
}
