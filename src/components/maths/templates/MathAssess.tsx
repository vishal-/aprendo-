import React, { useEffect, useState } from "react";
import type { MProblem, MSetup } from "../constants/math.interfaces";
import { getProblem } from "../../utils/math.utils";
import { useTimer } from "react-timer-hook";
import { ChallengeState } from "../constants/math.enum";
import MathHeader from "../organisms/MathHeader";
import MathProblemCard from "../organisms/MathProblemCard";
import MathFooter from "../organisms/MathFooter";
import MathTimeUp from "../organisms/MathTimeUp";
import MathResult from "../organisms/MathResult";

interface MathAssessProps {
  params: MSetup;
  onReset: () => void;
}

const MathAssess: React.FC<MathAssessProps> = ({ params, onReset }) => {
  const { operation, size, timeLimit } = params;

  const [problemIndex, setIndex] = useState<number>(-1);
  const [currentState, setCurrentState] = useState(ChallengeState.Stopped);
  const [problems, setProblems] = useState<MProblem[]>([]);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 60 * timeLimit);

  const timer = useTimer({
    expiryTimestamp: time,
    autoStart: false,
    onExpire: () => setCurrentState(ChallengeState.TimeUp)
  });

  useEffect(() => {
    if (problems.length === 0) {
      setProblems([getProblem(operation, size)]);
      setIndex(0);
      timer.start();
      setCurrentState(ChallengeState.Running);
    }
  }, [operation, problems.length, size, timer]);

  const onNext = () => {
    if (problems[problemIndex + 1] === undefined) {
      setProblems([...problems, getProblem(operation, size)]);
    }

    setIndex(problemIndex + 1);
  };

  const onFinish = () => {
    if (timer.isRunning) timer.pause();
    setCurrentState(ChallengeState.Finished);
  };

  return (
    <div className="math-board">
      {currentState === ChallengeState.Running && (
        <>
          <MathHeader timer={timer} />

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
        <MathResult
          problems={problems}
          operation={operation}
          onReset={onReset}
        />
      )}
    </div>
  );
};

export default MathAssess;
