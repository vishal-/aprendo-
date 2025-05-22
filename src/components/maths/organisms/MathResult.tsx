import { useMemo } from "react";
import Operator from "../atoms/Operator";
import type { MProblem } from "../constants/math.interfaces";
import { calculatePercentage } from "../../utils/math.utils";
import { FaPercent } from "react-icons/fa";

interface MathResultProps {
  problems: MProblem[];
  onReset: () => void;
  operation: string;
}

const MathResult: React.FC<MathResultProps> = ({
  problems,
  onReset,
  operation
}) => {
  const correctAnswers = useMemo(() => {
    return problems.filter(({ answer, solution }) => answer === solution);
  }, [problems]);

  return (
    <div>
      <h3 className="text-center my-3">Results</h3>

      <table className="table">
        <thead>
          <tr className="table-primary">
            <th>#</th>
            <th>Problem</th>
            <th>Solution</th>
            <th>Your answer</th>
            <th>&#160;</th>
          </tr>
        </thead>
        <tbody>
          {problems.map(({ operand1, operand2, answer, solution }, i) => (
            <tr
              key={`result_${operand1}_${operand2}_${answer}`}
              className={solution === answer ? "table-success" : "table-danger"}
            >
              <td>{i + 1}</td>
              <td>
                {operand1}
                <Operator operation={operation} />
                {operand2}
              </td>
              <td className="text-center">{solution}</td>
              <td className="text-center h6">{answer}</td>
              <td>&#160;</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="text-center my-3">Summary</h4>

      <ul className="list-group my-3 mx-3">
        <li className="list-group-item">
          Total problems:
          <span className="h6 mx-3">{problems.length}</span>
        </li>
        <li className="list-group-item">
          Correct answers:
          <span className="h6 mx-3">{correctAnswers.length}</span>
        </li>
        <li className="list-group-item">
          Incorrect answers:
          <span className="h6 mx-3">
            {problems.length - correctAnswers.length}
          </span>
        </li>
        <li className="list-group-item h5">
          Success rate:
          <span className="ms-3 me-1">
            {calculatePercentage(correctAnswers.length, problems.length)}
          </span>
          <FaPercent />
        </li>
      </ul>

      <div className="text-center">
        <button className="btn btn-dark" onClick={onReset}>
          End task
        </button>
      </div>
    </div>
  );
};

export default MathResult;
