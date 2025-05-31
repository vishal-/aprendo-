import React from "react";

interface KeypadProps {
  onKeySelect: (k: string) => void;
  className?: string;
}

const Keypad: React.FC<KeypadProps> = ({ onKeySelect, className = "" }) => {
  const keys = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(i + 65)
  );

  return (
    <div
      className={`keypad d-flex flex-wrap justify-content-center ${className}`}
    >
      {keys.map((k) => (
        <button
          key={`key-${k}`}
          className="btn btn-outline-primary m-2"
          onClick={() => onKeySelect(k.toString())}
        >
          {k}
        </button>
      ))}
    </div>
  );
};

export default Keypad;
