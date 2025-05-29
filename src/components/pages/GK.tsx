import { useState } from "react";
import FlagAssess from "../general/templates/FlagsWizard";

const GK: React.FC = () => {
  const [topic, setTopic] = useState<string>();

  return (
    <div className="text-center my-3">
      {topic === undefined && (
        <button
          className="btn btn-outline-dark kalnia-glaze"
          onClick={() => setTopic("flags")}
        >
          Flags
        </button>
      )}

      {topic === "flags" && <FlagAssess />}
    </div>
  );
};

export default GK;
