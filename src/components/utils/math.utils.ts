import type { MProblem } from "../constants/math.interfaces";

export const getRandom = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getProblem = (): MProblem => {
  const operand1 = getRandom(100, 999);
  const operand2 = getRandom(100, 999);

  return {
    operand1,
    operand2,
    solution: operand1 + operand2
  };
};
