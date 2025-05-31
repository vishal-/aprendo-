import React, { useMemo } from "react";
import type { ResultsType } from "../../constants/wizard.types";
import MainMenuBtn from "../atoms/MainMenuBtn";
import { FaPercent } from "react-icons/fa6";
import { calculatePercentage } from "../../utils/math.utils";

interface ResponseSummaryProps {
  cols: ResultsType;
  results: ResultsType[];
}

const ResponseSummary: React.FC<ResponseSummaryProps> = ({ cols, results }) => {
  const correctAnswers = useMemo(() => {
    return results.filter(({ isCorrect }) => isCorrect);
  }, [results]);

  return (
    <>
      <h3 className="text-center my-3">Results</h3>

      <table className="table">
        <thead>
          <tr className="table-primary">
            <th>#</th>
            <th style={{ maxWidth: "30%" }}>{cols["problem"]}</th>
            <th>{cols["solution"]}</th>
            <th>{cols["answer"]}</th>
            <th>&#160;</th>
          </tr>
        </thead>

        <tbody>
          {results.map(({ problem, solution, answer, isCorrect }, i) => (
            <tr
              key={`result_${solution}_${answer}`}
              className={isCorrect ? "table-success" : "table-danger"}
            >
              <td>{i + 1}</td>
              <td>{problem}</td>
              <td>{solution}</td>
              <td>{answer}</td>
              <td>{isCorrect ? "✅" : "❌"}</td>
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
