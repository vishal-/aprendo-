import React from "react";

interface KeypadProps {
  onKeySelect: (k: string) => void;
}

const Keypad: React.FC<KeypadProps> = ({ onKeySelect }) => {
  const keys = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(i + 65)
  );

  return (
    <div className="keypad my-3 d-flex flex-wrap justify-content-center">
      {keys.map((k) => (
        <button
          key={`key-${k}`}
          className="btn btn-lg btn-outline-primary m-2"
          onClick={() => onKeySelect(k.toString())}
        >
          {k}
        </button>
      ))}
    </div>
  );
};

export default Keypad;
