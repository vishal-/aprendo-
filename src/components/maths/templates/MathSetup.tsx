import React from "react";
import { MathOperation } from "../constants/math.enum";
import Button from "../../common/atoms/Button";
import type { MSetup } from "../constants/math.interfaces";

interface MathSetupProps {
  params: MSetup;
  setParams: (m: MSetup) => void;
  setStarted: (s: boolean) => void;
}

const MathSetup: React.FC<MathSetupProps> = ({
  params,
  setParams,
  setStarted
}) => {
  const time = Array.from({ length: 20 }, (_, k) => (k ? 5 * k : 1));
  const { operation, timeLimit } = params;

  return (
    <div>
      <div>
        Choose your adventure:
        <select
          value={operation}
          onChange={(e) => setParams({ ...params, operation: e.target.value })}
        >
          {Object.keys(MathOperation).map((o) => (
            <option key={MathOperation[o]} value={MathOperation[o]}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div>
        Time limit (in minutes):
        <select
          value={timeLimit.toString()}
          onChange={(e) =>
            setParams({ ...params, timeLimit: parseInt(e.target.value) })
          }
        >
          <option value={Infinity}>{Infinity}</option>
          {time.map((t) => (
            <option key={`time_limit_${t}`} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Button label="Start" onClick={() => setStarted(true)} />
      </div>
    </div>
  );
};

export default MathSetup;
