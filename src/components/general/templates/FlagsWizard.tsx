import { useState, useCallback, useEffect, useMemo } from "react";
import {
  ChallengeState,
  type ChallengeStateType
} from "../../common/constants/app.enums";
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
  const [currentState, setCurrentState] = useState<ChallengeStateType>(
    ChallengeState.Stopped
  );
  const [problemIndex, setProblemIndex] = useState<number>(-1);
  const [problems, setProblems] = useState<FlagProblemType[]>([]);
  const [bufferFlag, setBufferFlag] = useState<FlagProblemType>();

  const { setHeaderParams, timer } = useHeader();
  const { setFooterParams } = useFooter();

  const countryList = useMemo(
    () => problems.map(({ country }) => country),
    [problems]
  );

  const addProblem = useCallback(
    (callback?: () => void) => {
      if (bufferFlag) {
        setProblems((prev) => [...prev, { ...bufferFlag }]);
        setBufferFlag(undefined);
        callback?.();
      }
    },
    [bufferFlag]
  );

  const setAnswer = (index: number, answer: string) => {
    const newProblems = [...problems];
    newProblems[index].answer = answer;
    setProblems(() => [...newProblems]);
  };

  /**
   *  Finish the challenge
   *  1. Set the current state to finished
   *  2. Pause the timer
   */
  const onFinish = useCallback(() => {
    setCurrentState(ChallengeState.Finished);
    timer.pause();
  }, [timer]);

  /**
   *  Go to the next problem
   *  1. If there are no more problems, add a new problem
   *  2. If there are more problems, go to the next problem
   */
  const onNext = useMemo(
    () =>
      problems[problemIndex + 1] === undefined
        ? () => addProblem(() => setProblemIndex(problemIndex + 1))
        : () => setProblemIndex(problemIndex + 1),
    [addProblem, problemIndex, problems]
  );

  /**
   *  Go to the previous problem
   */
  const onPrevious = useMemo(
    () =>
      problemIndex > 0 ? () => setProblemIndex(problemIndex - 1) : undefined,
    [problemIndex]
  );

  /**
   *  Start the challenge
   */
  const onStart = useMemo(
    () =>
      bufferFlag === undefined
        ? undefined
        : () => {
            addProblem();
            setCurrentState(ChallengeState.Running);
            setProblemIndex(problemIndex + 1);

            const time = getTimeByMinutes();
            timer.restart(time, true);
          },
    [addProblem, bufferFlag, problemIndex, timer]
  );

  /**
   *  When the component loads, preload an image and add a new
   *  problem to the buffer
   */
  useEffect(() => {
    if (bufferFlag === undefined) {
      const newProblem = getFlagProblem(countries, countryList);
      const src = (flags as FlagListType)[newProblem.country].image;

      preloadImage(`https://c8t3.c10.e2-5.dev/flags/imgs/${src}`)
        .then(() => {
          setBufferFlag({ ...newProblem });

          if (currentState === ChallengeState.Stopped) {
            setCurrentState(ChallengeState.Ready);
          }
        })
        .catch(() => {
          console.error("error while loading image");
        });
    }
  }, [bufferFlag, countryList, currentState]);

  /**
   *  When the component loads, set the header params
   */
  useEffect(() => {
    setHeaderParams({
      showHome: false,
      title: "Flags",
      onTimerExpire: onFinish
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Updated footer params
   */
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
        <FlagSetup onStart={onStart} />
      )}

      {currentState === ChallengeState.Running && (
        <FlagProblemCard
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
