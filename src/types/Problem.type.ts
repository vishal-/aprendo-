// A single problem type definition
export interface ProblemType {
    id?: number; // problem_type_id from DB
    code: string; // machine-readable identifier (e.g., "mcq_single")
    title: string; // human-readable label (e.g., "Multiple Choice - Single Correct")
    description?: string; // optional explanation
    offlineOnly: boolean; // can be used in paper exams?
}

export enum ProblemTypeCode {
    MCQ_SINGLE = "mcq_single",
    MCQ_MULTIPLE = "mcq_multiple",
    TRUE_FALSE = "true_false",
    FILL_BLANK = "fill_blank",
    MATCH = "match",
    ORDER = "order",
    NUMERICAL = "numerical",
    SHORT_ANSWER = "short_answer",
    CLOZE = "cloze",
    HOTSPOT = "hotspot",
    ESSAY = "essay",
    CASE_STUDY = "case_study",
    DIAGRAM = "diagram",
    CODING = "coding",
    PROJECT = "project"
}
