import { useState } from "react";
import { ChallengeState } from "../../common/constants/app.enums";
import FlagSetup from "../molecules/FlagSetup";

const FlagAssess = () => {
  const [currentState, setCurrentState] = useState(ChallengeState.Stopped);

  const onStart = () => {
    setCurrentState(ChallengeState.Running);
  };

  return (
    <div>
      {currentState === ChallengeState.Stopped && (
        <FlagSetup onStart={onStart} />
      )}
    </div>
  );
};

export default FlagAssess;
