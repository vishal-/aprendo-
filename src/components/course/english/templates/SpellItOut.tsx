import { useState } from "react";
import ProblemWizard from "../../../common/templates/ProblemWizard";
import {
  ChallengeState,
  type ChallengeStateType
} from "../../../common/constants/app.enums";
import Choices from "../../../common/atoms/Choices";
import PickTime from "../../../common/atoms/PickTime";

const SpellItOut = () => {
  const [wizardState, setWizardState] = useState<ChallengeStateType>(
    ChallengeState.Stopped
  );
  const [category, setCategory] = useState<string>();
  const [timeLimit, setTimeLimit] = useState<number>(2);

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
        options={[
          ["Fruits", "fruits"],
          ["Vegetables", "vegetables"]
        ]}
        selected={category}
        onChange={(value) => setCategory(value)}
      />

      <button
        className="btn my-3 btn-primary"
        disabled={category === undefined}
        onClick={() => setWizardState(ChallengeState.Ready)}
      >
        Next
      </button>
    </div>
  );

  return (
    <>
      <ProblemWizard
        title="Spell it out"
        timeLimit={timeLimit}
        wizardState={wizardState}
        setWizardState={setWizardState}
        readyElement={readyElement}
        onStart={() => setWizardState(ChallengeState.Running)}
        onCancel={() => undefined}
        disableStart={timeLimit === undefined}
        problemElement={<></>}
        stoppedElement={stoppedElement}
      />
    </>
  );
};
export default SpellItOut;
