export interface MSetup {
  operation: string;
  timeLimit: number;
  size: number;
}

export interface MProblem {
  operand1: number;
  operand2: number;
  solution: number;
  answer?: number;
  options: number[];
}
