import { MathOperation } from "../maths/constants/math.enum";
import type { MProblem } from "../maths/constants/math.interfaces";

export const getRandom = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const calculatePercentage = (n: number, m: number): number =>
  Math.round((n / m) * 10000) / 100;

export const createListOfRandomNumbers = (
  n: number,
  size: number = 4,
  variation: number = 10
): number[] => {
  const numbers = [n];

  while (numbers.length < size) {
    const random = getRandom(n - variation, n + variation);
    if (numbers.indexOf(random) === -1) numbers.push(random);
  }

  return numbers.sort(() => Math.random() - 0.5);
};

export const getProblem = (operation: string, size: number = 4): MProblem => {
  const min = Math.pow(10, size - 1);
  let operand1 = getRandom(min, min * 10 - 1);
  let operand2 = 1;
  let solution = 0;

  switch (operation) {
    case MathOperation.Addition: {
      operand2 = getRandom(min, min * 10 - 1);
      solution = operand1 + operand2;
      break;
    }
    case MathOperation.Subtraction: {
      operand2 = getRandom(min / 10, operand1 - 1);
      solution = operand1 - operand2;
      break;
    }
    case MathOperation.Multiplication: {
      operand2 = getRandom(1, 10);
      solution = operand1 * operand2;
      break;
    }
    case MathOperation.Division: {
      operand2 = getRandom(1, 10);
      operand1 = operand2 * getRandom(1, 10);
      solution = Math.floor(operand1 / operand2);
      break;
    }
  }

  return {
    operand1,
    operand2,
    solution,
    options: createListOfRandomNumbers(solution, 6, 10)
  };
};
