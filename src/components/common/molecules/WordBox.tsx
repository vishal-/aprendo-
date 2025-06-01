import React from "react";
import { FaBackspace } from "react-icons/fa";

interface WordBoxProps {
  size: number;
  word: string;
  className?: string;
  onChange: (s: string) => void;
}

const WordBox: React.FC<WordBoxProps> = ({
  size = 1,
  word,
  className = "",
  onChange
}) => {
  return (
    <div className={className}>
      <div className="my-1">
        {Array.from({ length: size }, (w, i) => (
          <span
            style={{
              width: "2.1rem",
              height: "2.1rem",
              textAlign: "center"
            }}
            key={`alphabet-${word}-${i}-${w}`}
            className="d-inline-block ms-1 bg-primary-subtle h3 rounded-2 align-top"
            data-val={w}
          >
            {word[i]}
          </span>
        ))}
      </div>

      <div className="my-1">
        <button
          className="btn btn-outline-danger border-0 w-25"
          onClick={() => onChange("")}
        >
          Clear all
        </button>
        <button
          className="btn btn-outline-danger border-0 w-25"
          onClick={() => onChange(word.slice(0, -1))}
        >
          <FaBackspace />
        </button>
      </div>
    </div>
  );
};

export default WordBox;
