import StartCancel from "../../common/atoms/StartCancel";

interface FlagSetupProps {
  onStart: () => void;
  isReady: boolean;
}

const FlagSetup: React.FC<FlagSetupProps> = ({ onStart, isReady }) => (
  <div className="m-3">
    <h3 className="mb-3">Identify the flags</h3>

    {isReady && <StartCancel onStart={onStart} onCancel={() => undefined} />}
  </div>
);

export default FlagSetup;
