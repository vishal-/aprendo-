import { MathOperation } from "../constants/math.enum";

interface OperatorProps {
  operation: string;
}

const Operator: React.FC<OperatorProps> = ({ operation }) => {
  switch (operation) {
    case MathOperation.Addition:
      return <span className="mx-3">+</span>;
    case MathOperation.Subtraction:
      return <span className="mx-3">-</span>;
    case MathOperation.Multiplication:
      return <span className="mx-3">x</span>;
    case MathOperation.Division:
      return <span className="mx-3">÷</span>;
    default:
      return <span className="mx-3">?</span>;
  }
};

export default Operator;
