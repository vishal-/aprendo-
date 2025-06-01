import { useMemo } from "react";
import { getRandomId } from "../../utils/random.utils";

interface SelectProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

const Select: React.FC<SelectProps> = ({ title, value, onChange, options }) => {
  const id = useMemo(() => getRandomId(), []);

  return (
    <div className="mb-4">
      <label className="form-label" htmlFor={id}>
        {title}
      </label>

      <select
        id={id}
        className="form-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option
            key={`${id}_${option.label}_${option.label}`}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
