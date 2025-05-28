interface SelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { optionLabel: string; optionValue: string }[];
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  value,
  onChange,
  options
}) => {
  return (
    <div className="mb-4">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>

      <select
        id={id}
        className="form-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(({ optionLabel, optionValue }) => (
          <option
            key={`${id}_${optionLabel}_${optionLabel}`}
            value={optionValue}
          >
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
