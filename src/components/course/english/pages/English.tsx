import { useEffect, useState } from "react";
import { useHeader } from "../../../../context/HeaderContext";
import SpellItOut from "../templates/SpellItOut";
// import ProblemWizard from "../../../common/templates/ProblemWizard";

const Topics = {
  Spell: "Spell it out"
};

const English = () => {
  const [topic, setTopic] = useState<(typeof Topics)[keyof typeof Topics]>();

  const { setHeaderParams } = useHeader();

  useEffect(() => {
    setHeaderParams({
      title: "English",
      showHome: true,
      onTimerExpire: () => undefined
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-english">
      {topic === undefined && (
        <button
          className="btn btn-outline-dark w-75 mx-auto d-block my-5"
          onClick={() => setTopic(Topics.Spell)}
        >
          Spell the picture
        </button>
      )}

      {topic === Topics.Spell && <SpellItOut />}
    </div>
  );
};

export default English;
