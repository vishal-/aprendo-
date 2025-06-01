import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ChallengeState,
  type ChallengeStateType
} from "../../../common/constants/app.enums";
import ProblemWizard from "../../../common/templates/ProblemWizard";
import { Choices, PickTime } from "../../../common/atoms";
import json from "../../../../assets/json/flags.json";
import type { GkDatasetType, GKProblemType } from "../constants/gk.types";
import useDefaults from "../../../../hooks/useDefaults";
import { preloadImage } from "../../../utils/app.utils";
import {
  getRandomFromDataset,
  getRandomOptionsFromDataset
} from "../../../utils/random.utils";
import GuessPictureProblem from "../organisms/GuessPictureProblem";

const CategoryList = [
  { label: "Flags", value: "flag" },
  { label: "Logos", value: "logo" }
];

const GuessThePicture: React.FC = () => {
  const [wizardState, setWizardState] = useState<ChallengeStateType>(
    ChallengeState.Stopped
  );
  const [category, setCategory] = useState<string>(CategoryList[0].value);
  const [timeLimit, setTimeLimit] = useState<number>(1);
  const [dataset, updateDataset] = useState<GkDatasetType[]>([]);
  const [problemList, setProblemList] = useState<GKProblemType[]>([]);
  const [bufferProblem, setBufferProblem] = useState<GKProblemType>();
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const { resetNav } = useDefaults();

  const getReady = () => {
    if (json) {
      const ds = Object.keys(json).map((c: string) => ({
        image: (json as Record<string, Record<string, string>>)[c].image,
        thumbnail: (json as Record<string, Record<string, string>>)[c]
          .thumbnail,
        label: c
      }));

      updateDataset(ds);
    }

    setWizardState(ChallengeState.Ready);
  };

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
    addProblem(() => {
      setWizardState(ChallengeState.Running);
      setCurrentIndex(0);
      setBufferProblem(undefined);
    });
  };

  const onCancel = () => resetNav();

  const setAnswer = (ans: string) => {
    const updatedList = [...problemList];
    updatedList[currentIndex].answer = ans;
    setProblemList(updatedList);
  };

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

  const stoppedElement = (
    <div className="mx-5 px-5">
      <Choices
        title="Choose your adventure"
        selected={category}
        options={CategoryList}
        onChange={(c) => setCategory(c)}
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

  const readyElement = (
    <div className="px-5">
      <PickTime
        onChange={(v) => setTimeLimit(parseInt(v, 10))}
        value={`${timeLimit}`}
      />
    </div>
  );

  useEffect(() => {
    if (dataset.length > 0 && bufferProblem === undefined) {
      const item = getRandomFromDataset(
        dataset,
        problemList.map(({ label }) => label)
      ) as GkDatasetType;

      if (item) {
        preloadImage(`https://c8t3.c10.e2-5.dev/flags/imgs/${item.image}`)
          .then(() => {
            setBufferProblem({
              image: item.image,
              thumbnail: item.thumbnail || item.image,
              label: item.label,
              answer: "",
              options: getRandomOptionsFromDataset(dataset, item.label, 6)
            });
          })
          .catch(() => resetNav());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bufferProblem, dataset]);

  const responseParams = useMemo(() => {
    return {
      cols: {
        problem: "Picture",
        solution: "Name",
        answer: "Answer",
        isCorrect: false
      },
      results: problemList.map(({ thumbnail, label, answer }) => ({
        problem: (
          <img
            src={`https://c8t3.c10.e2-5.dev/flags/thumbs/${thumbnail}`}
            className="img-fluid"
          />
        ),
        solution: label,
        answer: answer,
        isCorrect: answer === label
      }))
    };
  }, [problemList]);

  return (
    <ProblemWizard
      title={`Guess the ${category}`}
      timeLimit={timeLimit}
      wizardState={wizardState}
      setWizardState={setWizardState}
      stoppedElement={stoppedElement}
      readyElement={readyElement}
      onCancel={onCancel}
      onStart={onStart}
      disableStart={bufferProblem === undefined}
      problemElement={
        <GuessPictureProblem
          problemList={problemList}
          currentIndex={currentIndex}
          setAnswer={setAnswer}
        />
      }
      onNext={onNext}
      onPrevious={onPrevious}
      responseParams={responseParams}
    />
  );
};

export default GuessThePicture;
