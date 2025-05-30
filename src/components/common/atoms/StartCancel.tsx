interface StartCancelProps {
  onStart: () => void;
  onCancel: () => void;
}

const StartCancel: React.FC<StartCancelProps> = ({ onStart, onCancel }) => {
  return (
    <div className="d-flex justify-content-center">
      <button className="btn btn-primary mx-3" onClick={onStart}>
        Start
      </button>
      <button className="btn btn-danger mx-3" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default StartCancel;
