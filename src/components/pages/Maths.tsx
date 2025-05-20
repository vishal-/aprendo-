import React, { useState } from "react";
import { MathOperation } from "../constants/math.enum";
import Button from "../atoms/Button";

const Maths: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [operation, setOperation] = useState<string>(MathOperation.Addition);
  const [tpq, setTpq] = useState<number>(Infinity);

  const time = Array.from({ length: 20 }, (_, k) => (k ? 5 * k : 1));

  return (
    <div>
      {started ? (
        <div>test</div>
      ) : (
        <div>
          <div>
            Choose your adventure:
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
            >
              {Object.keys(MathOperation).map((o) => {
                return <option value={MathOperation[o]}>{o}</option>;
              })}
            </select>
          </div>

          <div>
            Time limit (in minutes):
            <select
              value={tpq.toString()}
              onChange={(e) => setTpq(parseInt(e.target.value))}
            >
              <option value={Infinity}>{Infinity}</option>
              {time.map((t) => (
                <option value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <Button label="Start" onClick={() => setStarted(true)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Maths;
