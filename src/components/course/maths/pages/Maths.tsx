import React, { useState } from "react";
import PlusMinus from "../templates/PlusMinus";

const Topics = {
  PlusMinus: "Add and Subtract",
  Multiplication: "Multiplication",
  Division: "Division"
};

const Maths: React.FC = () => {
  const [topic, setTopic] = useState<string>();

  return (
    <div className="page-maths">
      {topic === undefined && (
        <button
          className="btn btn-outline-dark w-75 mx-auto d-block my-5"
          onClick={() => setTopic(Topics.PlusMinus)}
        >
          {Topics.PlusMinus}
        </button>
      )}

      {topic === Topics.PlusMinus && <PlusMinus />}
    </div>
  );
};

export default Maths;
