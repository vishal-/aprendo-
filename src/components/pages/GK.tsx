import { useState } from "react";
import FlagAssess from "../general/templates/FlagAssess";

const GK: React.FC = () => {
  const [topic, setTopic] = useState<string>();

  return (
    <div>
      {topic === undefined && (
        <button className="btn btn-primary" onClick={() => setTopic("flags")}>
          Flags
        </button>
      )}

      {topic === "flags" && <FlagAssess />}
    </div>
  );
};

export default GK;
