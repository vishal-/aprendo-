import type {
  FlagListType,
  FlagProblemType
} from "../constants/general.interfaces";
import { useMemo } from "react";
import { calculatePercentage } from "../../utils/math.utils";
import { FaPercent } from "react-icons/fa6";
import MainMenuBtn from "../../common/atoms/MainMenuBtn";

interface FlagResultProps {
  problems: FlagProblemType[];
  flagList: FlagListType;
}

const FlagResult: React.FC<FlagResultProps> = ({ problems, flagList }) => {
  const correctAnswers = useMemo(() => {
    return problems.filter(({ country, answer }) => country === answer);
  }, [problems]);

  return (
    <div>
      <h3 className="text-center my-3">Results</h3>

      <table className="table">
        <thead>
          <tr className="table-primary">
            <th>#</th>
            <th>Flag</th>
            <th>Country</th>
            <th>Your answer</th>
            <th>&#160;</th>
          </tr>
        </thead>
        <tbody>
          {problems.map(({ country, answer }, i) => (
            <tr
              key={`result_${country}_${answer}`}
              className={country === answer ? "table-success" : "table-danger"}
            >
              <td>{i + 1}</td>
              <td style={{ width: "6rem" }}>
                <img
                  src={`https://c8t3.c10.e2-5.dev/flags/thumbs/${flagList[country].thumbnail}`}
                  className="img-fluid"
                  alt={flagList[country].thumbnail}
                />
              </td>
              <td className="text-center">{country}</td>
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

      <MainMenuBtn />
    </div>
  );
};

export default FlagResult;
