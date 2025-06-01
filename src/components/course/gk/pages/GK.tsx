import { useState } from "react";
import GuessThePicture from "../templates/GuessThePicture";

const GK: React.FC = () => {
  const [topic, setTopic] = useState<string>();

  return (
    <div className="page-gk my-3">
      {topic === undefined && (
        <button
          className="btn btn-outline-dark mx-auto w-75 my-5 d-block"
          onClick={() => setTopic("picture")}
        >
          Guess the picture
        </button>
      )}

      {topic === "picture" && <GuessThePicture />}
    </div>
  );
};

export default GK;
