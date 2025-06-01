import { useCallback, useEffect, useMemo, useState } from "react";
import ProblemWizard from "../../../common/templates/ProblemWizard";
import {
  ChallengeState,
  type ChallengeStateType
} from "../../../common/constants/app.enums";
import { Choices, PickTime } from "../../../common/atoms";
import type {
  EnglishDataSetType,
  SpellItProblemType
} from "../constants/english.types";
import { getRandomFromDataset } from "../../../utils/random.utils";
import { preloadImage } from "../../../utils/app.utils";
import json from "../../../../assets/json/fruits.json";
import SpellProblem from "../organisms/SpellProblem";
import { useNavigate } from "react-router-dom";
import { HashRoutes } from "../../../config";

const SpellOptions = [
  { label: "Fruits", value: "fruits" },
  { label: "Vegetables", value: "vegetables" }
];

const SpellItOut = () => {
  const [wizardState, setWizardState] = useState<ChallengeStateType>(
    ChallengeState.Stopped
  );
  const [category, setCategory] = useState<string>(SpellOptions[0].value);
  const [timeLimit, setTimeLimit] = useState<number>(1);
  const [dataset, updateDataset] = useState<EnglishDataSetType[]>([]);
  const [problemList, setProblemList] = useState<SpellItProblemType[]>([]);
  const [bufferProblem, setBufferProblem] = useState<SpellItProblemType>();
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const navigate = useNavigate();

  const getReady = () => {
    if (json) updateDataset(json);
    setWizardState(ChallengeState.Ready);
  };

  const setAnswer = (ans: string) => {
    const updatedList = [...problemList];
    updatedList[currentIndex].answer = ans;
    setProblemList(updatedList);
  };

  const readyElement = (
    <div className="px-5">
      <PickTime
        onChange={(v) => setTimeLimit(parseInt(v, 10))}
        value={`${timeLimit}`}
      />
    </div>
  );

  const stoppedElement = (
    <div className="m-5 px-5">
      <Choices
        title="Select a category"
        options={SpellOptions}
        selected={category}
        onChange={(value) => setCategory(value)}
      />

      <button
        className="btn mt-5 btn-primary w-100"
        disabled={category === undefined}
        onClick={getReady}
      >
        Next
      </button>
    </div>
  );

  const addProblem = useCallback(
    (callback?: () => void) => {
      if (bufferProblem) {
        setProblemList((prev) => [...prev, { ...bufferProblem }]);
        callback?.();
      }
    },
    [bufferProblem]
  );

  const onStart = () => {
    if (bufferProblem) {
      addProblem(() => {
        setWizardState(ChallengeState.Running);
        setCurrentIndex(0);
        setBufferProblem(undefined);
      });
    }
  };

  const responseParams = useMemo(() => {
    return {
      problemIsImage: true,
      cols: {
        problem: "Image",
        solution: "Name",
        answer: "Answer",
        isCorrect: false
      },
      results: problemList.map(({ word, answer, image }) => ({
        problem: <img src={image} className="img-fluid" />,
        solution: word,
        answer: answer,
        isCorrect: answer === word.toUpperCase()
      }))
    };
  }, [problemList]);

  const onNext = useMemo(
    () =>
      problemList[currentIndex + 1] === undefined
        ? () =>
            addProblem(() => {
              setCurrentIndex(currentIndex + 1);
              setBufferProblem(undefined);
            })
        : () => setCurrentIndex(currentIndex + 1),
    [addProblem, currentIndex, problemList]
  );

  const onPrevious = useMemo(
    () =>
      currentIndex > 0 ? () => setCurrentIndex(currentIndex - 1) : undefined,
    [currentIndex]
  );

  useEffect(() => {
    if (dataset.length > 0 && bufferProblem === undefined) {
      const item = getRandomFromDataset(
        dataset,
        problemList.map(({ word }) => word)
      ) as EnglishDataSetType;

      if (item) {
        preloadImage(item.image).then(() => {
          setBufferProblem({
            image: item.image,
            thumbnail: item.thumbnail || item.image,
            word: item.label,
            answer: ""
          });
        });
      }
    }
  }, [bufferProblem, dataset, problemList]);

  return (
    <>
      <ProblemWizard
        title="Spell it out"
        timeLimit={timeLimit}
        wizardState={wizardState}
        setWizardState={setWizardState}
        readyElement={readyElement}
        onStart={onStart}
        onCancel={() => navigate(HashRoutes.English)}
        disableStart={timeLimit === undefined && bufferProblem === undefined}
        problemElement={
          <SpellProblem
            problemList={problemList}
            currentIndex={currentIndex}
            onAnswer={(w) => setAnswer(w)}
          />
        }
        stoppedElement={stoppedElement}
        responseParams={responseParams}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    </>
  );
};
export default SpellItOut;
