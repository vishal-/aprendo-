import React, { useState } from "react";
import { MathOperation } from "../constants/math.enum";
import MathSetup from "../molecules/MathSetup";
import MathAssess from "../molecules/MathAssess";
import "../../assets/styles/math.scss";

const Maths: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [params, setParams] = useState({
    operation: MathOperation.Addition,
    timeLimit: 5
  });

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
