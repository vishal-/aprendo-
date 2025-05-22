import React, { useEffect, useState } from "react";
import type { MProblem, MSetup } from "../constants/math.interfaces";
import { getProblem } from "../../utils/math.utils";
import PrevNext from "../../common/atoms/PrevNext";
import { useTimer } from "react-timer-hook";
import Button from "../../common/atoms/Button";
import timeupImg from "../../../../public/images/time_up.png";
import { ChallengeState } from "../constants/math.enum";
import Operator from "../atoms/Operator";

interface MathAssessProps {
  params: MSetup;
  onReset: () => void;
}

const MathAssess: React.FC<MathAssessProps> = ({ params, onReset }) => {
  const { timeLimit } = params;
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
      setProblems([getProblem(params.operation)]);
      setIndex(0);
      timer.start();
      setCurrentState(ChallengeState.Running);
    }
  }, [params.operation, problems.length, timer]);

  const onNext = () => {
    if (problems[problemIndex + 1] === undefined) {
      setProblems([...problems, getProblem(params.operation)]);
    }

    setIndex(problemIndex + 1);
  };

  const onPrevious = () => setIndex(problemIndex - 1);

  const onFinish = () => {
    if (timer.isRunning) timer.pause();
    setCurrentState(ChallengeState.Finished);
  };

  const selectAnswer = (index: number, answer: number) => {
    const temp = [...problems];

    temp[index] = { ...problems[index], answer };

    setProblems(temp);
  };

  return (
    <div className="math-board">
      {currentState === ChallengeState.Running && (
        <>
          <div className="text-bg-warning text-center py-3 border-bottom">
            <div className="">
              <div>Time left</div>
              <span className="badge mx-1 text-bg-dark">
                {timer.totalSeconds}
              </span>
              <div>seconds</div>
            </div>
          </div>

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
      )}

      {currentState === ChallengeState.TimeUp && (
        <div className="text-center my-3 py-3">
          <div className="h3 mb-3">
            <img src={timeupImg} className="img-fluid" />
          </div>

          <Button label="FINISH" onClick={onFinish} />
        </div>
      )}

      {currentState === ChallengeState.Finished && (
        <div>
          {problems.map((p: MProblem, i: number) => (
            <div
              key={`problem_${p.operand1}_${p.operand2}`}
              className="my-3 py-3"
            >
              <div>Problem #{i + 1}</div>
              <div>
                {p.operand1} + {p.operand2} = {p.solution}
              </div>
              <div>Your answer: {p.answer}</div>
            </div>
          ))}

          <button className="btn btn-link" onClick={onReset}>
            End task
          </button>
        </div>
      )}
    </div>
  );
};

export default MathAssess;
