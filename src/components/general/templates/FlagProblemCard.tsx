import { useEffect, useMemo } from "react";
import type {
  FlagListType,
  FlagProblemType
} from "../constants/general.interfaces";

interface FlagProblemCardProps {
  problems: FlagProblemType[];
  problemIndex: number;
  flagList: FlagListType;
  setAnswer: (n: number, s: string) => void;
  onLoad: (i?: number) => void;
}

const FlagProblemCard: React.FC<FlagProblemCardProps> = ({
  problems,
  problemIndex,
  flagList,
  setAnswer,
  onLoad
}) => {
  const [problem, flag] = useMemo(() => {
    return [problems[problemIndex], flagList[problems[problemIndex].country]];
  }, [flagList, problemIndex, problems]);

  useEffect(() => {
    onLoad(problemIndex);
  }, [onLoad, problemIndex]);

  return (
    <>
      <div className="text-center mt-3">
        <h3>Flag #{problemIndex + 1}</h3>

        <div className="text-center mb-3 px-5">
          <img
            src={`https://c8t3.c10.e2-5.dev/flags/imgs/${flag.image}`}
            className="img-fluid"
            alt="flag"
          />
        </div>

        <div className="my-3 p-3 d-flex flex-wrap justify-content-center">
          {problem.options.map((option) => (
            <div key={`flag_option_${option}`} className="m-3">
              <button
                className={`btn ${
                  problem.answer === option
                    ? "btn-secondary"
                    : "btn-outline-secondary"
                }`}
                onClick={() => setAnswer(problemIndex, option)}
              >
                {option}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FlagProblemCard;
