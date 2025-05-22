import Operator from "../atoms/Operator";
import type { MProblem, MSetup } from "../constants/math.interfaces";

interface MathProblemCardProps {
  problemIndex: number;
  problems: MProblem[];
  setProblems: (p: MProblem[]) => void;
  params: MSetup;
}

const MathProblemCard: React.FC<MathProblemCardProps> = ({
  problemIndex,
  problems,
  params,
  setProblems
}) => {
  const selectAnswer = (index: number, answer: number) => {
    const temp = [...problems];

    temp[index] = { ...problems[index], answer };

    setProblems(temp);
  };

  return (
    <div className="row my-3">
      <div className="text-center h5">Problem #{problemIndex + 1}</div>
      <div className="col-6 offset-2 my-3 text-end h3">
        <div className="ls-1"> {problems[problemIndex].operand1}</div>
        <div className="ls-1">
          <Operator operation={params.operation} />
          {problems[problemIndex].operand2}
        </div>
        <hr />
        <hr />
      </div>

      <div className="text-center">
        {problems[problemIndex].options.map((option: number) => (
          <button
            key={`option_${problemIndex}_${option}`}
            className={`btn ${
              option === problems[problemIndex].answer
                ? "btn-secondary"
                : "btn-outline-secondary"
            } mx-2 my-2`}
            onClick={() => selectAnswer(problemIndex, option)}
          >
            {option.toString()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MathProblemCard;
