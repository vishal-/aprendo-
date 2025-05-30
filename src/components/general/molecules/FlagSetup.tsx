import StartCancel from "../../common/atoms/StartCancel";

interface FlagSetupProps {
  onStart?: () => void;
}

const FlagSetup: React.FC<FlagSetupProps> = ({ onStart }) => (
  <div className="m-3">
    <h3 className="mb-3">Identify the flags</h3>

    <StartCancel onStart={onStart} onCancel={() => undefined} />
  </div>
);

export default FlagSetup;
