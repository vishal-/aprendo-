export interface FlagProblemType {
  country: string;
  answer: string;
  options: string[];
  // image: Image;
}

export type FlagListType = Record<string, { image: string; thumbnail: string }>;
