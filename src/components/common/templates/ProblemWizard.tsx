import React, { useCallback, useEffect } from "react";
import {
  ChallengeState,
  type ChallengeStateType
} from "../constants/app.enums";
import { useHeader } from "../../../context/HeaderContext";
import StartCancel from "../atoms/StartCancel";
import { getTimeByMinutes } from "../../utils/app.utils";
import { useFooter } from "../../../context/FooterContext";
import { defaultFooterParams } from "../../../context/context.defaults";
import MainMenuBtn from "../atoms/MainMenuBtn";

interface ProblemWizardProps {
  title: string;
  wizardState: ChallengeStateType;
  setWizardState: (state: ChallengeStateType) => void;
  readyElement: React.ReactElement;
  problemElement: React.ReactElement;
  resultElement: React.ReactElement;
  stoppedElement: React.ReactNode;
  onStart?: () => void;
  onCancel?: () => void;
  disableStart?: boolean;
  timeLimit?: number;
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
  disableStart
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
      onTimerExpire: () => undefined
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
        onNext: undefined,
        onPrevious: undefined
      });
    } else {
      setFooterParams({ ...defaultFooterParams });
    }
  }, [onFinish, setFooterParams, wizardState]);

  return (
    <div className="p-1">
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

      {wizardState === ChallengeState.Finished && (
        <>
          {resultElement}

          <MainMenuBtn />
        </>
      )}
    </div>
  );
};

export default ProblemWizard;
