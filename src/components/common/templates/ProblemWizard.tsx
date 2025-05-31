import React, { useCallback, useEffect } from "react";
import StartCancel from "../atoms/StartCancel";
import {
  ChallengeState,
  type ChallengeStateType
} from "../constants/app.enums";
import { useHeader } from "../../../context/HeaderContext";
import { useFooter } from "../../../context/FooterContext";
import { defaultFooterParams } from "../../../context/context.defaults";
import timeupImg from "../../../assets/images/time_up.png";
import { getTimeByMinutes } from "../../utils/app.utils";
import type { ResultsType } from "../../constants/wizard.types";
import ResponseSummary from "./ResponseSummary";

interface ProblemWizardProps {
  title: string;
  wizardState: ChallengeStateType;
  setWizardState: (state: ChallengeStateType) => void;
  readyElement: React.ReactElement;
  problemElement: React.ReactElement;
  resultElement?: React.ReactElement;
  stoppedElement: React.ReactElement;
  timeUpElement?: React.ReactElement;
  onStart?: () => void;
  onCancel?: () => void;
  disableStart?: boolean;
  timeLimit?: number;
  responseParams?: {
    cols: ResultsType;
    results: ResultsType[];
  };
  onNext?: () => void;
  onPrevious?: () => void;
}

const ProblemWizard: React.FC<ProblemWizardProps> = ({
  title,
  wizardState,
  setWizardState,
  timeLimit = 0,
  readyElement,
  onStart,
  onCancel,
  resultElement,
  problemElement,
  stoppedElement,
  timeUpElement,
  disableStart,
  responseParams,
  onNext,
  onPrevious
}) => {
  const { setHeaderParams, timer } = useHeader();
  const { setFooterParams } = useFooter();

  const startChallenge = () => {
    onStart?.();

    if (timeLimit) {
      const time = getTimeByMinutes(timeLimit);
      timer.restart(time, true);
    }
  };

  /**
   *  Finish the challenge
   *  1. Set the current state to finished
   *  2. Pause the timer
   */
  const onFinish = useCallback(() => {
    setWizardState(ChallengeState.Finished);
    timer.pause();
  }, [setWizardState, timer]);

  useEffect(() => {
    setHeaderParams({
      title: title,
      showHome: false,
      onTimerExpire: () => setWizardState(ChallengeState.TimeUp)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  /**
   * Updated footer params
   */
  useEffect(() => {
    if (wizardState === ChallengeState.Running) {
      setFooterParams({
        showFooter: true,
        onFinish,
        onNext,
        onPrevious
      });
    } else {
      setFooterParams({ ...defaultFooterParams });
    }
  }, [onFinish, onNext, onPrevious, setFooterParams, wizardState]);

  return (
    <div className="problem-wizard p-1">
      {wizardState === ChallengeState.Ready && (
        <>
          {readyElement}

          <StartCancel
            disableStart={disableStart}
            onStart={startChallenge}
            onCancel={onCancel}
          />
        </>
      )}

      {wizardState === ChallengeState.Stopped && <>{stoppedElement}</>}

      {wizardState === ChallengeState.Running && <>{problemElement}</>}

      {wizardState === ChallengeState.TimeUp &&
        (timeUpElement ? (
          <>{timeUpElement}</>
        ) : (
          <div className="text-center my-3 py-3">
            <div className="h3 mb-3">
              <img src={timeupImg} className="img-fluid" />
            </div>

            <button className="btn btn-secondary" onClick={onFinish}>
              Finish
            </button>
          </div>
        ))}

      {wizardState === ChallengeState.Finished &&
        ((resultElement && <>{resultElement}</>) ||
          (responseParams ? (
            <ResponseSummary
              cols={responseParams?.cols}
              results={responseParams?.results}
            />
          ) : (
            <></>
          )))}
    </div>
  );
};

export default ProblemWizard;
