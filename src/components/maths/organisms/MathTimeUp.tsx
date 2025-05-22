import Button from "../../common/atoms/Button";
import timeupImg from "../../../../public/images/time_up.png";

const MathTimeUp: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  return (
    <div className="text-center my-3 py-3">
      <div className="h3 mb-3">
        <img src={timeupImg} className="img-fluid" />
      </div>

      <Button label="FINISH" onClick={onFinish} />
    </div>
  );
};

export default MathTimeUp;
