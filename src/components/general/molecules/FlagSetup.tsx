import Button from "../../common/atoms/Button";

interface FlagSetupProps {
  onStart: () => void;
  isReady: boolean;
}

const FlagSetup: React.FC<FlagSetupProps> = ({ onStart, isReady }) => (
  <div className="m-3">
    <h3 className="mb-3">Identify the flags</h3>

    {isReady && <Button label="Start" onClick={onStart} />}
  </div>
);

export default FlagSetup;
