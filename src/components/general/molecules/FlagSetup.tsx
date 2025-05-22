interface FlagSetupProps {
  onStart: () => void;
}

const FlagSetup: React.FC<FlagSetupProps> = ({ onStart }) => {
  return (
    <div>
      <h3>Identify the flags</h3>

      <button className="btn btn-primary my-3" onClick={onStart}>
        Start
      </button>
    </div>
  );
};

export default FlagSetup;
