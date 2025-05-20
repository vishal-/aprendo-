import React from "react";
import type { MSetup } from "../constants/math.interfaces";
import { getRandom } from "../utils/math.utils";
import PrevNext from "../atoms/PrevNext";

interface MathAssessProps {
  params: MSetup;
}

const MathAssess: React.FC<MathAssessProps> = ({ params }) => {
  const { operation } = params;

  const num1 = getRandom(1, 100);
  const num2 = getRandom(1, 100);

  return (
    <div className="math-board">
      <div className="m-head"></div>

      <div className="m-body">
        <div> {num1}</div>
        <div>+ {num2}</div>
        <div>____</div>
      </div>

      <div className="m-foot position-absolute bottom-0 p-0 w-100">
        <PrevNext onPrevious={() => undefined} onNext={() => undefined} />
      </div>
    </div>
  );
};

export default MathAssess;
