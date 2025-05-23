import React, { useState } from "react";
import { MathOperation } from "../maths/constants/math.enum";
import MathSetup from "../maths/templates/MathSetup";
import MathAssess from "../maths/templates/MathAssess";
import "../../assets/styles/math.scss";
import type { MSetup } from "../maths/constants/math.interfaces";

const defaultParams = {
  operation: MathOperation.Addition,
  timeLimit: 1,
  size: 3
};

const Maths: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [params, setParams] = useState<MSetup>({ ...defaultParams });

  return (
    <div>
      {started ? (
        <MathAssess params={params} />
      ) : (
        <MathSetup
          params={params}
          setParams={setParams}
          setStarted={setStarted}
        />
      )}
    </div>
  );
};

export default Maths;
