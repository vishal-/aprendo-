import Button from "../../common/atoms/Button";

interface FlagSetupProps {
  onStart: () => void;
}

const FlagSetup: React.FC<FlagSetupProps> = ({ onStart }) => (
  <div className="my-3">
    <h3 className="mb-3">Identify the flags</h3>

    <Button label="Start" onClick={onStart} />
  </div>
);

export default FlagSetup;
