export interface FProblem {
  country: string;
  answer: string;
  options: string[];
}

export type FlagListType = Record<string, { image: string; thumbnail: string }>;
