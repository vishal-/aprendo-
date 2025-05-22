export interface MSetup {
  operation: string;
  timeLimit: number;
}

export interface MProblem {
  operand1: number;
  operand2: number;
  solution: number;
  answer?: number;
  options: number[];
}
