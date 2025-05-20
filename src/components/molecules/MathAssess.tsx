import React, { useEffect, useState } from "react";
import type { MProblem, MSetup } from "../constants/math.interfaces";
import { getProblem } from "../utils/math.utils";
import PrevNext from "../atoms/PrevNext";
import { useTimer } from "react-timer-hook";

interface MathAssessProps {
  params: MSetup;
}

const MathAssess: React.FC<MathAssessProps> = ({ params }) => {
  const { timeLimit } = params;
  const [problemIndex, setIndex] = useState<number>(-1);
  const [problems, setProblems] = useState<MProblem[]>([]);
  const [timeUp, setTimeUp] = useState<boolean>(false);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 60 * timeLimit);

  const timer = useTimer({
    expiryTimestamp: time,
    autoStart: false,
    onExpire: () => setTimeUp(true)
  });

  useEffect(() => {
    if (problems.length === 0) {
      setProblems([getProblem()]);
      setIndex(0);
      timer.start();
    }
  }, [problems.length, timer]);

  const onNext = () => {
    if (problems[problemIndex + 1] === undefined) {
      setProblems([...problems, getProblem()]);
    }

    setIndex(problemIndex + 1);
  };

  const onPrevious = () => setIndex(problemIndex - 1);

  return (
    <div className="math-board">
      {timer.isRunning && (
        <>
          <div className="m-head">
            Time remaining: {timer.minutes} : {timer.seconds}
          </div>

          <div className="m-body row">
            <div className="col-4 offset-3 text-end">
              <div> {problems[problemIndex].operand1}</div>
              <div>+ {problems[problemIndex].operand2}</div>
              <hr />
              <hr />
            </div>
          </div>

          <div className="m-foot position-absolute bottom-0 p-0 w-100">
            <PrevNext
              onPrevious={onPrevious}
              onNext={onNext}
              showPrevious={problemIndex > 0}
            />
          </div>
        </>
      )}

      {timeUp && <div className="m-body">Time up!</div>}
    </div>
  );
};

export default MathAssess;
