import Select from "./Select";

const timeLimitOptions = Array.from({ length: 16 }, (_, i) => {
  const optionValue = `${i + 1}`;

  return {
    optionLabel: optionValue,
    optionValue
  };
});

const PickTime: React.FC<{ value: string; onChange: (v: string) => void }> = ({
  value,
  onChange
}) => (
  <Select
    label="Time limit:"
    value={value}
    onChange={onChange}
    options={timeLimitOptions}
  />
);

export default PickTime;
