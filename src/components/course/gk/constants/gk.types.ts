export interface GkDatasetType extends Record<string, unknown> {
  label: string;
  image: string;
  thumbnail?: string;
}

export interface GKProblemType {
  image: string;
  thumbnail: string;
  label: string;
  answer: string;
  options: string[];
}
