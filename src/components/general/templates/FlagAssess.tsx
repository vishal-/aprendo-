import { useEffect, useState } from "react";
import { ChallengeState } from "../../common/constants/app.enums";
import FlagSetup from "../molecules/FlagSetup";
import countries from "../../../assets/json/nations.json";
import flags from "../../../assets/json/flags.json";
import type { FlagListType, FProblem } from "../constants/general.interfaces";
import { getFlagProblem } from "../functions/flag.functions";
import FlagProblemCard from "./FlagProblemCard";
import FlagResult from "./FlagResult";

const FlagAssess = () => {
  const [currentState, setCurrentState] = useState(ChallengeState.Stopped);
  const [problemIndex, setProblemIndex] = useState<number>(-1);
  const [problems, setProblems] = useState<FProblem[]>([]);

  useEffect(() => {
    if (countries.length > 1 && Object.keys(flags).length > 1) {
      setCurrentState(ChallengeState.Ready);
    }
  }, []);

  const addProblem = () => {
    setProblems([
      ...problems,
      getFlagProblem(
        countries,
        problems.map(({ country }) => country)
      )
    ]);

    setProblemIndex(problemIndex + 1);
  };

  const setAnswer = (index: number, answer: string) => {
    const newProblems = [...problems];

    newProblems[index].answer = answer;

    setProblems(newProblems);
  };

  const onFinish = () => {
    setCurrentState(ChallengeState.Finished);
  };

  const onPrevious = () => setProblemIndex(problemIndex - 1);

  const onNext = () => {
    if (problems[problemIndex + 1] === undefined) {
      addProblem();
    } else {
      setProblemIndex(problemIndex + 1);
    }
  };

  const onStart = () => {
    addProblem();
    setCurrentState(ChallengeState.Running);
  };

  return (
    <div>
      {currentState === ChallengeState.Ready && <FlagSetup onStart={onStart} />}

      {currentState === ChallengeState.Running && (
        <FlagProblemCard
          onFinish={onFinish}
          onNext={onNext}
          onPrevious={onPrevious}
          setAnswer={setAnswer}
          problems={problems}
          problemIndex={problemIndex}
          flagList={flags as FlagListType}
        />
      )}

      {currentState === ChallengeState.Finished && (
        <FlagResult problems={problems} flagList={flags as FlagListType} />
      )}
    </div>
  );
};

export default FlagAssess;
