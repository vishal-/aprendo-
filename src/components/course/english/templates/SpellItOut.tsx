import { useEffect, useMemo, useState } from "react";
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

  const getReady = () => {
    if (json) updateDataset(json);
    setWizardState(ChallengeState.Ready);
  };

  const onStart = () => {
    if (bufferProblem) {
      setProblemList([{ ...bufferProblem }]);
      setBufferProblem(undefined);
      setWizardState(ChallengeState.Running);
      setCurrentIndex(0);
    }
  };

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
            word: item.label.toUpperCase(),
            answer: ""
          });
        });
      }
    }
  }, [bufferProblem, dataset, problemList]);

  const readyElement = (
    <div className="px-5">
      <PickTime
        onChange={(v) => setTimeLimit(parseInt(v, 10))}
        value={`${timeLimit}`}
      />
    </div>
  );

  const stoppedElement = (
    <div className="m-5">
      <Choices
        title="Select a category"
        options={SpellOptions}
        selected={category}
        onChange={(value) => setCategory(value)}
      />

      <button
        className="btn my-3 btn-primary"
        disabled={category === undefined}
        onClick={getReady}
      >
        Next
      </button>
    </div>
  );

  const responseParams = useMemo(() => {
    return {
      cols: {
        problem: "Problem",
        solution: "Solution",
        answer: "Answer",
        isCorrect: false
      },
      results: [
        {
          problem: "Problem",
          solution: "Solution",
          answer: "Answer",
          isCorrect: true
        }
      ]
    };
  }, []);

  return (
    <>
      <ProblemWizard
        title="Spell it out"
        timeLimit={timeLimit}
        wizardState={wizardState}
        setWizardState={setWizardState}
        readyElement={readyElement}
        onStart={onStart}
        onCancel={() => undefined}
        disableStart={timeLimit === undefined}
        problemElement={
          <SpellProblem problemList={problemList} currentIndex={currentIndex} />
        }
        stoppedElement={stoppedElement}
        responseParams={responseParams}
        onNext={() => undefined}
        onPrevious={() => undefined}
      />
    </>
  );
};
export default SpellItOut;
