import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PrevNextProps {
  onPrevious: () => void;
  onNext: () => void;
  showPrevious?: boolean;
  showNext?: boolean;
}

const PrevNext: React.FC<PrevNextProps> = ({
  onPrevious,
  onNext,
  showPrevious = true,
  showNext = true
}) => {
  return (
    <div className="d-flex justify-content-between my-1 mx-1">
      {showPrevious && (
        <button
          className="btn btn-sm btn-outline-dark border-0"
          onClick={onPrevious}
        >
          <FaChevronLeft />
          <span>&#160;&#160;&#160;Previous</span>
        </button>
      )}

      {showNext && (
        <button
          className="btn btn-sm btn-outline-dark border-0"
          onClick={onNext}
        >
          <span>Next&#160;&#160;&#160;</span>
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default PrevNext;
