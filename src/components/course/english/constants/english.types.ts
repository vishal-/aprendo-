export interface EnglishDataSetType extends Record<string, unknown> {
  label: string;
  image: string;
  thumbnail?: string;
}

export interface SpellItProblemType {
  image: string;
  thumbnail: string;
  word: string;
  answer: string;
}
