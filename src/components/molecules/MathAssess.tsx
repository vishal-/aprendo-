import React from "react";
import type { MSetup } from "../constants/math.interfaces";
import { getRandom } from "../utils/math.utils";

interface MathAssessProps {
  params: MSetup;
}

const MathAssess: React.FC<MathAssessProps> = ({ params }) => {
  const { operation } = params;

  const num1 = getRandom(1, 100);
  const num2 = getRandom(1, 100);

  return (
    <div>
      {operation}
      <div> {num1}</div>
      <div>+ {num2}</div>
      <div>____</div>
    </div>
  );
};

export default MathAssess;
