import { useCallback, useMemo, useState } from "react";
import ProblemWizard from "../../../common/templates/ProblemWizard";
import {
  ChallengeState,
  type ChallengeStateType
} from "../../../common/constants/app.enums";
import { Choices, PickTime, Select } from "../../../common/atoms";
import useDefaults from "../../../../hooks/useDefaults";
import {
  MathOperation,
  Operators,
  type MathProblemType
} from "../constants/math.types";
import { getProblem } from "../../../utils/math.utils";
import BasicMathProblem from "../organisms/BasicMathProblem";

const OperationOptions = [
  { label: "Addition", value: MathOperation.Addition },
  { label: "Subtraction", value: MathOperation.Subtraction }
];

const PlusMinus = () => {
  const [wizardState, setWizardState] = useState<ChallengeStateType>(
    ChallengeState.Ready
  );
  const [operation, setOperation] = useState<string>(OperationOptions[0].value);
  const [timeLimit, setTimeLimit] = useState<number>(1);
  const [operandSize, setOperandSize] = useState<number>(3);
  const [problemList, setProblemList] = useState<MathProblemType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const { resetNav } = useDefaults();

  const addProblem = useCallback(() => {
    const problem = getProblem(operation, operandSize);
    setProblemList((prev) => [...prev, problem]);
  }, [operandSize, operation]);

  const onStart = () => {
    addProblem();
    setWizardState(ChallengeState.Running);
    setCurrentIndex(0);
  };

  const onPrevious = useMemo(
    () =>
      currentIndex > 0 ? () => setCurrentIndex(currentIndex - 1) : undefined,
    [currentIndex]
  );

  const onNext = useCallback(() => {
    if (problemList[currentIndex + 1] === undefined) {
      addProblem();
    }

    setCurrentIndex(currentIndex + 1);
  }, [addProblem, currentIndex, problemList]);

  const responseParams = useMemo(
    () => ({
      cols: {
        problem: "Problem",
        solution: "Solution",
        answer: "Your Answer",
        isCorrect: true
      },
      results: problemList.map(({ operand1, operand2, solution, answer }) => ({
        problem: `${operand1} ${Operators[operation]} ${operand2}`,
        solution: `${solution}`,
        answer: answer ? answer + "" : "",
        isCorrect: solution === answer
      }))
    }),
    [operation, problemList]
  );

  const readyElement = (
    <div className="px-5">
      <Choices
        options={OperationOptions}
        onChange={(v) => setOperation(v)}
        title="Choose your adventure"
        selected={operation}
      />

      <div className="my-1">&#160;</div>

      <PickTime
        onChange={(v) => setTimeLimit(parseInt(v, 10))}
        value={`${timeLimit}`}
      />

      <Select
        title="Number of digits (operand size)"
        value={`${operandSize}`}
        onChange={(n) => setOperandSize(parseInt(n, 10))}
        options={Array.from({ length: 9 }, (_, i) => ({
          label: `${i + 1} digit`,
          value: `${i + 1}`
        }))}
      />
    </div>
  );

  console.log(problemList);

  return (
    <ProblemWizard
      title={`Maths`}
      timeLimit={timeLimit}
      wizardState={wizardState}
      setWizardState={setWizardState}
      readyElement={readyElement}
      onCancel={resetNav}
      onStart={onStart}
      problemElement={
        <BasicMathProblem
          problemList={problemList}
          setProblemList={setProblemList}
          operation={operation}
          currentIndex={currentIndex}
        />
      }
      onNext={onNext}
      onPrevious={onPrevious}
      stoppedElement={<></>}
      responseParams={responseParams}
    />
  );
};

export default PlusMinus;
