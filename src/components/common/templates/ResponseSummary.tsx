import React, { useMemo } from "react";
import type { ResultsType } from "../../constants/wizard.types";
import MainMenuBtn from "../atoms/MainMenuBtn";
import { FaPercent } from "react-icons/fa6";
import { calculatePercentage } from "../../utils/math.utils";

interface ResponseSummaryProps {
  cols: ResultsType;
  results: ResultsType[];
  problemIsImage?: boolean;
}

const ResponseSummary: React.FC<ResponseSummaryProps> = ({
  cols,
  results,
  problemIsImage = false
}) => {
  const correctAnswers = useMemo(() => {
    return results.filter(({ isCorrect }) => isCorrect);
  }, [results]);

  const problemStyle: React.CSSProperties = problemIsImage
    ? {}
    : { width: "5%" };

  return (
    <>
      <h3 className="text-center my-3">Results</h3>

      <table className="table">
        <thead>
          <tr className="table-primary">
            <th className="text-center">#</th>
            <th style={problemStyle} className="text-center">
              {cols["problem"]}
            </th>
            <th className="text-center">{cols["solution"]}</th>
            <th className="text-center">{cols["answer"]}</th>
            <th>&#160;</th>
          </tr>
        </thead>

        <tbody>
          {results.map(({ problem, solution, answer, isCorrect }, i) => (
            <tr
              key={`result_${solution}_${answer}`}
              className={isCorrect ? "table-success" : "table-danger"}
            >
              <td className="text-center">{i + 1}</td>
              <td className="text-center">{problem}</td>
              <td className="text-center">{solution}</td>
              <td className="text-center">{answer}</td>
              <td className="text-center">{isCorrect ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="text-center my-3">Summary</h4>

      <ul className="list-group my-3 mx-3">
        <li className="list-group-item">
          Total problems:
          <span className="h6 mx-3">{results.length}</span>
        </li>
        <li className="list-group-item">
          Correct answers:
          <span className="h6 mx-3">{correctAnswers.length}</span>
        </li>
        <li className="list-group-item">
          Incorrect answers:
          <span className="h6 mx-3">
            {results.length - correctAnswers.length}
          </span>
        </li>
        <li className="list-group-item h5">
          Success rate:
          <span className="ms-3 me-1">
            {calculatePercentage(correctAnswers.length, results.length)}
          </span>
          <FaPercent />
        </li>
      </ul>

      <MainMenuBtn />
    </>
  );
};

export default ResponseSummary;
