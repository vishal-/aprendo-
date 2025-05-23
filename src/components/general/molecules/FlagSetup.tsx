import MainMenuBtn from "../../common/atoms/MainMenuBtn";

interface FlagSetupProps {
  onStart: () => void;
}

const FlagSetup: React.FC<FlagSetupProps> = ({ onStart }) => {
  return (
    <div>
      <h3>Identify the flags</h3>

      <button className="btn btn-primary my-3 w-75" onClick={onStart}>
        Start
      </button>

      <MainMenuBtn />
    </div>
  );
};

export default FlagSetup;
