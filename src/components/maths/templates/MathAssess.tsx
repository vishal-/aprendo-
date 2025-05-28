import React, { useCallback, useEffect, useState } from "react";
import type { MProblem, MSetup } from "../constants/math.interfaces";
import { getProblem } from "../../utils/math.utils";
import MathProblemCard from "../organisms/MathProblemCard";
import MathFooter from "../organisms/MathFooter";
import MathTimeUp from "../organisms/MathTimeUp";
import MathResult from "../organisms/MathResult";
import { ChallengeState } from "../../common/constants/app.enums";
import { useHeader } from "../../../context/HeaderContext";

const MathAssess: React.FC<{ params: MSetup }> = ({ params }) => {
  const { operation, size, timeLimit } = params;
  const [currentState, setCurrentState] = useState(ChallengeState.Stopped);

  const [problemIndex, setIndex] = useState<number>(-1);
  const [problems, setProblems] = useState<MProblem[]>([]);

  const { setHeaderParams, headerParams, timer } = useHeader();

  const onFinish = useCallback(() => {
    if (timer.isRunning) timer.pause();
    setCurrentState(ChallengeState.Finished);
  }, [timer]);

  useEffect(() => {
    if (problems.length === 0 && !timer.isRunning) {
      setProblems([getProblem(operation, size)]);
      setIndex(0);

      const time = new Date();
      time.setSeconds(time.getSeconds() + 60 * timeLimit);

      timer.restart(time, true);

      setHeaderParams({
        ...headerParams,
        showHome: false,
        onExpire: onFinish
      });
      setCurrentState(ChallengeState.Running);
    }
  }, [
    headerParams,
    onFinish,
    operation,
    problems.length,
    setHeaderParams,
    size,
    timeLimit,
    timer
  ]);

  const onNext = () => {
    if (problems[problemIndex + 1] === undefined) {
      setProblems([...problems, getProblem(operation, size)]);
    }

    setIndex(problemIndex + 1);
  };

  return (
    <div className="math-board">
      {currentState === ChallengeState.Running && (
        <>
          <MathProblemCard
            problemIndex={problemIndex}
            problems={problems}
            setProblems={setProblems}
            params={params}
          />

          <MathFooter
            onFinish={onFinish}
            onNext={onNext}
            onPrevious={() => setIndex(problemIndex - 1)}
            problemIndex={problemIndex}
          />
        </>
      )}

      {currentState === ChallengeState.TimeUp && (
        <MathTimeUp onFinish={onFinish} />
      )}

      {currentState === ChallengeState.Finished && (
        <MathResult problems={problems} operation={operation} />
      )}
    </div>
  );
};

export default MathAssess;
