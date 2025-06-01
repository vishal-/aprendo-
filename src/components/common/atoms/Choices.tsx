import { useMemo } from "react";
import { getRandomId } from "../../utils/random.utils";

interface ChoicesProps {
  title?: string;
  options: { label: string; value: string }[];
  selected?: string;
  onChange: (value: string) => void;
}

const Choices: React.FC<ChoicesProps> = ({
  title,
  options,
  onChange,
  selected
}) => {
  const id = useMemo(() => getRandomId(), []);

  return (
    <div className="text-start">
      {title && <h5 className="mb-3">{title}</h5>}

      {options.map(({ label, value }) => (
        <div key={`choice-key-${id}-${value}`} className="form-check my-2">
          <input
            className="form-check-input"
            type="radio"
            name={`choice-${id}`}
            id={`choice-${id}-${value}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            checked={value === selected}
          />
          <label className="form-check-label" htmlFor={`choice-${id}-${value}`}>
            {label}
          </label>
        </div>
      ))}
    </div>
  );
};
export default Choices;
