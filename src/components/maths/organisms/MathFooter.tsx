import Button from "../../common/atoms/Button";
import PrevNext from "../../common/atoms/PrevNext";

interface MathFooterProps {
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
  problemIndex: number;
}

const MathFooter: React.FC<MathFooterProps> = ({
  onPrevious,
  onNext,
  onFinish,
  problemIndex
}) => {
  return (
    <div className="position-absolute bottom-0 mb-3 p-0 w-100">
      <PrevNext
        onPrevious={onPrevious}
        onNext={onNext}
        showPrevious={problemIndex > 0}
      />
      <div className="mt-3 text-center">
        <Button label="FINISH" onClick={onFinish} />
      </div>
    </div>
  );
};

export default MathFooter;
