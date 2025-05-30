import { useState, useCallback, useEffect } from "react";
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
import { getTimeByMinutes, preloadImage } from "../../utils/app.utils";
import { useFooter } from "../../../context/FooterContext";
import { defaultFooterParams } from "../../../context/context.defaults";
import { useHeader } from "../../../context/HeaderContext";

const FlagsWizard = () => {
  const [currentState, setCurrentState] = useState(ChallengeState.Stopped);
  const [problemIndex, setProblemIndex] = useState<number>(-1);
  const [problems, setProblems] = useState<FlagProblemType[]>([]);

  const { setHeaderParams, timer } = useHeader();
  const { setFooterParams } = useFooter();

  const addProblem = useCallback(
    (onAdd?: () => void) => {
      const newProblem = getFlagProblem(
        countries,
        problems.map(({ country }) => country)
      );

      const src = (flags as FlagListType)[newProblem.country].image;

      preloadImage(`https://c8t3.c10.e2-5.dev/flags/imgs/${src}`)
        .then(() => {
          setProblems((prev) => [...prev, newProblem]);
          onAdd?.();
        })
        .catch(() => {
          console.error("error while loading image");
        });
    },
    [problems]
  );

  const setAnswer = (index: number, answer: string) => {
    const newProblems = [...problems];

    newProblems[index].answer = answer;

    setProblems(() => [...newProblems]);
  };

  const onFinish = useCallback(() => {
    setCurrentState(ChallengeState.Finished);
    timer.pause();
  }, [timer]);

  const onNext = useCallback(
    () =>
      problems[problemIndex + 1] === undefined
        ? () => addProblem(() => setProblemIndex(problemIndex + 1))
        : () => setProblemIndex(problemIndex + 1),
    [addProblem, problemIndex, problems]
  );

  const onPrevious = useCallback(
    () =>
      problemIndex > 0 ? () => setProblemIndex(problemIndex - 1) : undefined,
    [problemIndex]
  );

  const onLoad = () => {
    if (problems[problemIndex + 1] === undefined) {
      addProblem();
    }
  };

  const onStart = () => {
    if (problems[problemIndex + 1] !== undefined) {
      setProblemIndex(problemIndex + 1);
      setCurrentState(ChallengeState.Running);
      const time = getTimeByMinutes();
      timer.restart(time, true);
    }
  };

  // On initial component load - set header title
  useEffect(() => {
    if (
      countries.length > 1 &&
      Object.keys(flags).length > 1 &&
      problems.length === 0
    ) {
      addProblem(() => {
        setCurrentState(ChallengeState.Ready);
        setHeaderParams({
          showHome: false,
          title: "Flags",
          onTimerExpire: onFinish
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show footer when showing the problems
  useEffect(() => {
    if (currentState === ChallengeState.Running) {
      setFooterParams({
        showFooter: true,
        onFinish,
        onNext,
        onPrevious
      });
    } else {
      setFooterParams({ ...defaultFooterParams });
    }
  }, [currentState, onFinish, onNext, onPrevious, setFooterParams]);

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
