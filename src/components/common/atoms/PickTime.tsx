import Select from "./Select";

const timeLimitOptions = Array.from({ length: 16 }, (_, i) => {
  const value = `${i + 1}`;

  return {
    label: `${value} minutes`,
    value
  };
});

const PickTime: React.FC<{ value: string; onChange: (v: string) => void }> = ({
  value,
  onChange
}) => (
  <Select
    title="Time limit"
    value={value}
    onChange={onChange}
    options={timeLimitOptions}
  />
);

export default PickTime;
