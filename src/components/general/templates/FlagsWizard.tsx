import { useState, useCallback } from "react";
import { ChallengeState } from "../../common/constants/app.enums";
import FlagSetup from "../molecules/FlagSetup";
import countries from "../../../assets/json/nations.json";
import flags from "../../../assets/json/flags.json";
import type {
  FlagListType,
  FlagProblemType
} from "../constants/general.interfaces";
import { getFlagProblem } from "../functions/flag.functions";
import FlagProblemCard from "./FlagProblemCard";
import FlagResult from "./FlagResult";
import { preloadImage } from "../../utils/app.utils";

const FlagsWizard = () => {
  const [currentState, setCurrentState] = useState(ChallengeState.Stopped);
  const [problemIndex, setProblemIndex] = useState<number>(-1);
  const [problems, setProblems] = useState<FlagProblemType[]>([]);

  const addProblem = useCallback(
    (onAdd?: () => void) => {
      const newProblem = getFlagProblem(
        countries,
        problems.map(({ country }) => country)
      );

      const src = (flags as FlagListType)[newProblem.country].image;

      preloadImage(`https://c8t3.c10.e2-5.dev/flags/imgs/${src}`)
        .then(() => {
          console.log("image loaded successfully...", src);
          setProblems((prev) => [...prev, newProblem]);
          onAdd?.();
        })
        .catch(() => {
          console.error("error while loading image");
        });
    },
    [problems]
  );

  if (
    countries.length > 1 &&
    Object.keys(flags).length > 1 &&
    problems.length === 0
  ) {
    addProblem(() => {
      setCurrentState(ChallengeState.Ready);
    });
  }

  const setAnswer = (index: number, answer: string) => {
    const newProblems = [...problems];

    newProblems[index].answer = answer;

    setProblems(() => [...newProblems]);
  };

  const onLoad = () => {
    if (problems[problemIndex + 1] === undefined) {
      addProblem();
    }
  };

  // const onFinish = () => {
  //   setCurrentState(ChallengeState.Finished);
  // };

  // const onPrevious = () => setProblemIndex(problemIndex - 1);

  // const onNext = () => {
  //   if (problems[problemIndex + 1] === undefined) {
  //     addProblem(() => undefined);
  //   } else {
  //     setProblemIndex(problemIndex + 1);
  //   }
  // };

  const onStart = () => {
    if (problems[problemIndex + 1] !== undefined) {
      setProblemIndex(problemIndex + 1);
      setCurrentState(ChallengeState.Running);
    }
  };

  return (
    <div>
      {(currentState === ChallengeState.Stopped ||
        currentState === ChallengeState.Ready) && (
        <FlagSetup
          onStart={onStart}
          isReady={currentState === ChallengeState.Ready}
        />
      )}

      {currentState === ChallengeState.Running && (
        <FlagProblemCard
          onLoad={onLoad}
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

export default FlagsWizard;
