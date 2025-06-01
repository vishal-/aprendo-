export const MathOperation: Record<string, string> = {
  Addition: "Plus",
  Subtraction: "Minus",
  Multiplication: "Multiply",
  Division: "Divide"
};

export const Operators = {
  [MathOperation.Addition]: "+",
  [MathOperation.Subtraction]: "-",
  [MathOperation.Multiplication]: "x",
  [MathOperation.Division]: "÷"
};

export interface MathProblemType {
  operand1: number;
  operand2: number;
  solution: number;
  answer?: number;
  options: number[];
}
