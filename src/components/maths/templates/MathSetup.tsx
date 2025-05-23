import Button from "../../common/atoms/Button";
import type { MSetup } from "../constants/math.interfaces";
import { MathOperation } from "../constants/math.enum";
import Select from "../../common/atoms/Select";
import MainMenuBtn from "../../common/atoms/MainMenuBtn";

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
  const { operation, timeLimit, size } = params;

  const operationOptions = Object.keys(MathOperation).map((o) => ({
    optionLabel: o,
    optionValue: MathOperation[o]
  }));

  const timeLimitOptions = Array.from({ length: 20 }, (_, i) => {
    const optionValue = `${i ? i * 5 : 1}`;

    return {
      optionLabel: optionValue,
      optionValue
    };
  });

  const operandSizeOptions = Array.from({ length: 9 }, (_, i) => {
    const optionValue = `${i + 1}`;

    return {
      optionLabel: `${optionValue} digit`,
      optionValue
    };
  });

  return (
    <div>
      <div className="my-3">
        <Select
          id="select-operation"
          label="Choose your adventure:"
          options={operationOptions}
          value={operation}
          onChange={(value) => setParams({ ...params, operation: value })}
        />
      </div>

      <div className="my3">
        <Select
          id="select-time-limit"
          label="Time limit (in minutes):"
          options={timeLimitOptions}
          value={timeLimit.toString()}
          onChange={(value) =>
            setParams({ ...params, timeLimit: parseInt(value, 10) })
          }
        />
      </div>

      <div className="my-3">
        <Select
          id="select-operand-size"
          label="Operand size"
          options={operandSizeOptions}
          value={size.toString()}
          onChange={(value) =>
            setParams({ ...params, size: parseInt(value, 10) })
          }
        />
      </div>

      <div className="text-center mt-3">
        <Button label="Start" onClick={() => setStarted(true)} />
      </div>

      <MainMenuBtn />
    </div>
  );
};

export default MathSetup;
