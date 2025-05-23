import { useMemo } from "react";
import Button from "../../common/atoms/Button";
import PrevNext from "../../common/atoms/PrevNext";
import type { FlagListType, FProblem } from "../constants/general.interfaces";

interface FlagProblemCardProps {
  problems: FProblem[];
  problemIndex: number;
  flagList: FlagListType;
  onNext: () => void;
  onPrevious: () => void;
  setAnswer: (n: number, s: string) => void;
  onFinish: () => void;
}

const FlagProblemCard: React.FC<FlagProblemCardProps> = ({
  problems,
  problemIndex,
  flagList,
  onNext,
  onPrevious,
  onFinish,
  setAnswer
}) => {
  const [problem, flag] = useMemo(() => {
    return [problems[problemIndex], flagList[problems[problemIndex].country]];
  }, [flagList, problemIndex, problems]);

  return (
    <>
      <div className="text-center mt-3">
        <h3>Flag #{problemIndex + 1}</h3>

        <div className="text-center mb-3 px-3">
          <img
            src={`https://c8t3.c10.e2-5.dev/flags/imgs/${flag.image}`}
            className="img-fluid"
            alt="flag"
          />
        </div>

        <div className="my-3">
          {problem.options.map((option) => (
            <div key={`flag_option_${option}`} className="my-3">
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
      <div className="position-absolute bottom-0 mb-3 p-0 w-100">
        <PrevNext
          onPrevious={onPrevious}
          onNext={onNext}
          showPrevious={problemIndex > 0}
        />
        <div className="mt-3 text-center">
          <Button label="FINISH" onClick={onFinish} />
        </div>
      </div>
    </>
  );
};

export default FlagProblemCard;
