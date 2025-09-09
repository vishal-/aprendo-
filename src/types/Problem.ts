export interface Problem {
    id?: number; // problem_id from DB
    typeCode: string; // e.g., "mcq_single"
    statement: string; // problem possibly in rich text or HTML
    answer: string; // solution answer, possibly rich text or HTML
    explanation: string; // solution explanation, possibly rich text or HTML
    difficulty?: 'easy' | 'medium' | 'hard';
    suggestedPoints?: number; // points assigned for correct answer
    suggestedTime?: number; // estimated time to solve in minutes
    media: Record<string, unknown>;
    metadata?: Record<string, unknown>; // additional info 
    ownerId: string; // user ID of the creator
    isPublic: boolean; // visibility status
    isActive: boolean; // active/inactive status
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProblemOptions {
    id?: number; // option_id from DB
    ProblemId: number; // associated problem_id
    content: string; // option text, possibly rich text or HTML
    isCorrect: boolean; // indicates if this option is correct
    media?: Record<string, unknown>; // optional media URL
    metadata?: Record<string, unknown>; // additional info
    updatedAt?: Date;
}
