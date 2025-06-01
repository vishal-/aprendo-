import React from "react";
import type { MathProblemType } from "../constants/math.types";
import Operator from "../atoms/Operator";

interface BasicMathProblemProps {
  problemList: MathProblemType[];
  setProblemList: (pl: MathProblemType[]) => void;
  currentIndex: number;
  operation: string;
}

const BasicMathProblem: React.FC<BasicMathProblemProps> = ({
  problemList,
  setProblemList,
  currentIndex,
  operation
}) => {
  const selectAnswer = (index: number, answer: number) => {
    const temp = [...problemList];

    temp[index] = { ...problemList[index], answer };

    setProblemList(temp);
  };

  return (
    <div className="row my-3">
      <div className="text-center h5">Problem #{currentIndex + 1}</div>
      <div className="col-6 offset-2 my-3 text-end h3">
        <div className="ls-1"> {problemList[currentIndex].operand1}</div>
        <div className="ls-1">
          <Operator operation={operation} />
          {problemList[currentIndex].operand2}
        </div>
        <hr />
        <hr />
      </div>

      <div className="text-center">
        {problemList[currentIndex].options.map((option: number) => (
          <button
            key={`option_${currentIndex}_${option}`}
            className={`btn ${
              option === problemList[currentIndex].answer
                ? "btn-secondary"
                : "btn-outline-secondary"
            } mx-2 my-2`}
            onClick={() => selectAnswer(currentIndex, option)}
          >
            {option.toString()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BasicMathProblem;
