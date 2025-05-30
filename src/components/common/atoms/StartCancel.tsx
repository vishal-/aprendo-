import { FaChevronLeft } from "react-icons/fa";

interface StartCancelProps {
  onStart?: () => void;
  disableStart?: boolean;
  onCancel?: () => void;
}

const StartCancel: React.FC<StartCancelProps> = ({
  onStart,
  disableStart = false,
  onCancel
}) => {
  return onStart === undefined && onCancel === undefined ? (
    <></>
  ) : (
    <div className="d-flex justify-content-center">
      {onCancel && (
        <>
          <button
            className="btn btn-danger"
            disabled={onCancel === undefined}
            onClick={onCancel}
          >
            <FaChevronLeft /> Back
          </button>

          <div className="mx-3">&#160;</div>
        </>
      )}

      {onStart && (
        <button
          className="btn btn-primary"
          disabled={disableStart}
          onClick={onStart}
        >
          Start
        </button>
      )}
    </div>
  );
};

export default StartCancel;
