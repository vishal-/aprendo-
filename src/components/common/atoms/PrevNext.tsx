import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PrevNextProps {
  onPrevious?: () => void;
  onNext?: () => void;
}

const PrevNext: React.FC<PrevNextProps> = ({ onPrevious, onNext }) => (
  <div
    className={
      onPrevious === undefined && onNext === undefined
        ? "d-none"
        : `d-flex justify-content-between`
    }
  >
    {(onPrevious !== undefined && (
      <button className="btn btn-outline-dark border-0" onClick={onPrevious}>
        <FaChevronLeft />
        <span>&#160;&#160;&#160;Previous</span>
      </button>
    )) || <span>&#160;</span>}

    {onNext !== undefined && (
      <button className="btn btn-outline-dark border-0" onClick={onNext}>
        <span>Next&#160;&#160;&#160;</span>
        <FaChevronRight />
      </button>
    )}
  </div>
);

export default PrevNext;
