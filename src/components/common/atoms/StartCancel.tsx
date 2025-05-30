import { FaChevronLeft } from "react-icons/fa";

interface StartCancelProps {
  onStart?: () => void;
  onCancel?: () => void;
}

const StartCancel: React.FC<StartCancelProps> = ({ onStart, onCancel }) => {
  return (
    <div className="d-flex justify-content-center">
      <button
        className="btn btn-danger"
        disabled={onCancel === undefined}
        onClick={onCancel}
      >
        <FaChevronLeft /> Back
      </button>

      <div className="mx-3">&#160;</div>

      <button
        className="btn btn-primary"
        disabled={onStart === undefined}
        onClick={onStart}
      >
        Start
      </button>
    </div>
  );
};

export default StartCancel;
