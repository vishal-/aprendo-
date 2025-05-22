import React from "react";
import type { useTimerResultType } from "react-timer-hook/dist/types/src/useTimer";

const MathHeader: React.FC<{ timer: useTimerResultType }> = ({ timer }) => {
  return (
    <div className="text-bg-warning text-center py-3 border-bottom">
      <div className="">
        <div>Time left</div>
        <span className="badge mx-1 text-bg-dark">{timer.totalSeconds}</span>
        <div>seconds</div>
      </div>
    </div>
  );
};

export default MathHeader;
